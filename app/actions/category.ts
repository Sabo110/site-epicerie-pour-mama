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
        return {message: 'catégorie crée avec succès !'}
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error('Une catégorie avec ce nom existe déjà')
            }
        }
        throw new Error('Erreur interne du serveur')
    }
}