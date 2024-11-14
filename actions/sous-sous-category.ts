"use server"

import prisma from "@/db"
import { CreateSSC } from "@/types/subSubCategory"
import { Prisma } from "@prisma/client"
import { imageUploader, deleteImage } from "@/lib/file-uploader"

// Création d'une sous-sous-catégorie
export async function createSSC(data: CreateSSC, bannerImageFile: File) {
    try {
        // Téléchargement de l'image sur Cloudinary
        const result = await imageUploader(bannerImageFile, "banières-des-sous-sous-categories")
        // Assignation du public_id comme URL de la bannière
        data.bannerImageUrl = result.publicId
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
            where: {
                visible: true
            }
        })
        return result
    } catch (error) {
        throw new Error('Erreur interne du serveur')
    }
}

// Mise à jour d'une sous-sous-catégorie
export async function updateSSC(data: CreateSSC, id: number, bannerImageFile?: File) {
    try {
        if (bannerImageFile) {
            // Suppression de l'ancienne image si elle existe
            await deleteImage(data.bannerImageUrl)
            // Téléchargement de la nouvelle image
            const result = await imageUploader(bannerImageFile, "banières-des-sous-sous-categories")
            // Mise à jour du bannerImageUrl avec le public_id de la nouvelle image
            data.bannerImageUrl = result.publicId
        }
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
        // Récupération des enregistrements à supprimer
        const res = await prisma.subSubCategory.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            select: {
                bannerImageUrl: true
            }
        })
        // Création d'un tableau de public_ids pour les supprimer de Cloudinary
        const public_ids = res.map(object => object.bannerImageUrl) as string[]
        // Suppression des images associées sur Cloudinary
        await deleteImage(undefined, public_ids)
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
