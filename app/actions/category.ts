"use server"

import prisma from "@/db"
import { CreateC } from "../types/category"
import { Prisma } from "@prisma/client"
import { Result } from "postcss"
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