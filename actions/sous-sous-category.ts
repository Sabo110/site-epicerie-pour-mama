"use server"

import prisma from "@/db"
import { CreateSSC } from "@/types/subSubCategory"
import { Prisma } from "@prisma/client"
import { imageUploader, deleteImage } from "@/lib/file-uploader"

// Création d'une sous-sous-catégorie
export async function createSSC(data: CreateSSC) {
    try {
        await prisma.subSubCategory.create({
            data
        })
        return { message: 'Sous-sous-catégorie créée avec succès !' }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error('Une sous-sous-catégorie avec ce nom existe déjà')
            }
        }
        throw new Error('Erreur interne du serveur')
    }
}

// Récupération de toutes les sous-sous-catégories
export async function getAllSSC() {
    try {
        const result = await prisma.subSubCategory.findMany({
            orderBy: {
                createdAt: 'desc'
            },
        })
        return result
    } catch (error) {
        throw new Error('Erreur interne du serveur')
    }
}

// Mise à jour d'une sous-sous-catégorie
export async function updateSSC(data: CreateSSC, id: number) {
    try {
        await prisma.subSubCategory.update({
            data,
            where: { id }
        })
        return { message: 'Mise à jour effectuée avec succès !' }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error("Une sous-sous-catégorie avec ce nom existe déjà")
            }
        }
        throw new Error('Erreur interne du serveur')
    }
}

// Suppression d'une ou plusieurs sous-sous-catégories
export async function deleteSSC(ids: number[]) {
    try {
        const result = await prisma.subSubCategory.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })
        if (result.count === 0) {
            throw new Error("Aucune sous-sous-catégorie trouvée pour suppression")
        }
        return { message: 'Suppression effectuée avec succès' }
    } catch (error) {
        throw new Error("Erreur interne du serveur")
    }
}

//recuperer une seule sous sous categorie
export async function getOSSC(slug: string) {
    try {
        const result = await prisma.subSubCategory.findUniqueOrThrow({
            where: {
                slug
            },
            include: {
                products: {
                    include: {
                        subCategory: true,
                        subSubCategory: true
                    }
                }
            }
        })
        return result
    } catch (error) {
        throw new Error("Erreur interne du serveur")
    }
}
