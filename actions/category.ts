"use server"

import prisma from "@/db"
import { CreateC } from "../types/category"
import { Prisma } from "@prisma/client"

//creons une categorie
export async function createC(data: CreateC) {
    try {
        await prisma.category.create({
            data
        })
        return { message: 'catégorie crée avec succès !' }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error('Une catégorie avec ce nom existe déjà')
            }
        }
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
            }
        })
        return result
    } catch (error) {
        throw new Error('Erreur interne du serveur')
    }
}

//mise a jour d'une categorie
export async function updateC(data: CreateC, id: number) {
    try {
        await prisma.category.update({
            data,
            where: {id}
        })
        return {message: 'mise à jour éffectué avec succès !'}
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
        return {message: 'supprimé avec succès'}
    } catch (error) {
        throw new Error("Erreur interne du serveur")
    }
}