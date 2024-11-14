"use server"

import prisma from "@/db"
import { CreateSC } from "../types/subCategory" // Import du type pour les sous-catégories
import { Prisma } from "@prisma/client"
import { imageUploader, deleteImage } from "@/lib/file-uploader"
import { object } from "zod"

// Création d'une sous-catégorie
export async function createSC(data: CreateSC, bannerImageFile?: File) {
    try {
        if (bannerImageFile) {


            //on telecharge le fichier image sur cloudinary
            const result = await imageUploader(bannerImageFile, "banières-des-sous-categories")
            //on assigne le public_id a l'url de la baniere
            data.bannerImageUrl = result.publicId
        }
        await prisma.subCategory.create({
            data
        })
        return { message: 'Sous-catégorie créée avec succès !' }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error('Une sous-catégorie avec ce nom existe déjà')
            }
        }
        throw new Error('Erreur interne du serveur')
    }
}

// Récupération de toutes les sous-catégories
export async function getAllSC() {
    try {
        const result = await prisma.subCategory.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                visible: true
            }
        })
        return result
    } catch (error) {
        throw new Error('Erreur interne du serveur')
    }
}

// Mise à jour d'une sous-catégorie
export async function updateSC(data: CreateSC, id: number, bannerImageFile?: File) {
    try {
        if (bannerImageFile) {
            //si nous avons un fichier image pour la banière on supprime l'anciene
            await deleteImage(data.bannerImageUrl) //car le formulaire sera soumit avec l'anciene le public_id courant
            //on telecharge la nouvelle image sur cloudinary
            const result = await imageUploader(bannerImageFile, "banières-des-sous-categories")
            //on met a jour le bannerImageUrl avec le public id retourner pour cette nouvelle image
            data.bannerImageUrl = result.publicId
        }
        await prisma.subCategory.update({
            data,
            where: { id }
        })
        return { message: 'Mise à jour effectuée avec succès !' }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error("Une sous-catégorie avec ce nom existe déjà")
            }
        }
        throw new Error('Erreur interne du serveur')
    }
}

// Suppression d'une ou plusieurs sous-catégories
export async function deleteSC(ids: number[]) {
    try {
        // on recupere les enregistrements a supprimer
        const res = await prisma.subCategory.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            select: {
                bannerImageUrl: true
            }
        })
        //on cree un tableau de public_ids a partir de ces enregistrement
        const public_ids = res.map(object => object.bannerImageUrl) as string[]
        //on supprime maintenant toutes les images associe a ces enregistrements sur cloudinary
        await deleteImage(undefined, public_ids)
        const result = await prisma.subCategory.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })
        if (result.count === 0) {
            throw new Error("Aucune sous-catégorie trouvée pour suppression")
        }
        return { message: 'Suppression effectuée avec succès' }
    } catch (error) {
        throw new Error("Erreur interne du serveur")
    }
}
