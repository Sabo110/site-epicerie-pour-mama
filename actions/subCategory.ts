"use server"

import prisma from "@/db"
import { CreateSC } from "../types/subCategory" // Import du type pour les sous-catégories
import { Prisma } from "@prisma/client"


// Création d'une sous-catégorie
export async function createSC(data: CreateSC) {
    try {
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
        })
        return result
    } catch (error) {
        throw new Error('Erreur interne du serveur')
    }
}

// Mise à jour d'une sous-catégorie
export async function updateSC(data: CreateSC, id: number) {
    try {
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

//recuperer une seule sous categorie
export async function getOSC(slug: string) {
    try {
        const result = await prisma.subCategory.findUniqueOrThrow({
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