"use server"

import prisma from "@/db"
import { CreateC } from "../types/category"
import { Prisma } from "@prisma/client"
import { deleteImage, imageUploader } from "@/lib/file-uploader"

//creons une categorie
export async function createC(data: CreateC, imageFile: File) {
    //cette variable sera a true si le telechargement c'est bien passe sur cloudinary
    let success = false
    let pi = ""
    try {
        //telechargement du fichier image en bd
        const result = await imageUploader(imageFile, "bannières-de-catégorie")
        success = true
        pi = result.publicId
        console.log(`success vaut : ${success} true et pi vaut : ${pi}`);
        await prisma.category.create({
            data: {
                name: data.name,
                slug: data.slug,
                visible: data.visible,
                imageUrl: result.publicId
            }
        })
        return { message: 'catégorie crée avec succès !' }
    } catch (error) {
        //si succes vaut true cela veux dire qu'il y'a eu probleme au niveau de la creation de l'enregistrement cote prisma
        if (success) {
            //on supprime l'image telecharge car la creation en bd n'a pas eu lieu
            await deleteImage(pi)
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error('Une catégorie avec ce nom existe déjà')
            }
        }
        console.log("le erreur : " + error);
        
        throw new Error('Erreur interne du serveur')
    }
}

//recupere toute les categories
export async function getAllC() {
    try {
        const result = await prisma.category.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                visible: true
            },
            include: {
                subCategories: {
                    include: {
                        subSubCategories: true
                    }
                }
            }
        })
        return result
    } catch (error) {
        throw new Error('Erreur interne du serveur')
    }
}

//mise a jour d'une categorie
export async function updateC(data: CreateC, id: number, imageFile?: File, public_id?: string) {
    try {
        //si nous avons un fichier image et un public id alors on supprimer l'actuel qui se trouve sur cloudinary a partir de son public id
        if (imageFile && public_id) {
            await deleteImage(public_id)
            //je telecharge la nouvelle image
            const result = await imageUploader(imageFile, "bannières-de-catégorie")
            await prisma.category.update({
                where: { id },
                data: {
                    name: data.name,
                    slug: data.slug,
                    visible: data.visible,
                    imageUrl: result.publicId
                }
            })
        } else {
            await prisma.category.update({
                data,
                where: { id }
            })
        }
        return { message: 'mise à jour éffectué avec succès !' }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error("une catégorie avec ce nom existe déjà")
            }
        }
        throw new Error('Erreur interne du serveur')
    }
}

//supprimer une catégorie ou plusieurs
export async function deleteC(ids: number[]) {
    try {
        const result = await prisma.category.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })
        if (result.count === 0) {
            throw new Error("Erreur interne du serveur")
        }
        return { message: 'supprimé avec succès' }
    } catch (error) {
        throw new Error("Erreur interne du serveur")
    }
}

//on recupere une categorie
export async function getOC(slug: string) {
    try {
        const result = await prisma.category.findUniqueOrThrow({
            where: {
                slug
            }
        })
        return result
    } catch (error) {
        throw new Error("Erreur interne du serveur")
    }
}