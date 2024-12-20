"use server"

import prisma from "@/db"
import { CreateP } from "../types/product"
import { Prisma } from "@prisma/client"
import { imageUploader, deleteImage } from "@/lib/file-uploader"

// Création d'un produit
export async function createP(data: CreateP, imageFile: File) {
    let successUpload = false
    let pi = ""
    try {
        // Télécharge l'image sur Cloudinary
        const result = await imageUploader(imageFile, "images-des-produits")
        successUpload = true
        pi = result.publicId
        // Assigne le public_id au champ imageUrl
        data.imageUrl = result.publicId
        await prisma.product.create({
            data
        })
        return { message: 'Produit créé avec succès !' }
    } catch (error) {
        //si l'image a bien ete telecharger , donc l'erreur provient surement de notre bd
        if (successUpload) {
            //on supprime l'image telecharge
            await deleteImage(pi)
            console.log("cue");

        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error('Un produit avec ce nom existe déjà')
            }
        }
        throw new Error('Erreur interne du serveur')
    }
}

// Récupération de tous les produits
export async function getAllP() {
    try {
        const result = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                subCategory: {
                    include: {
                        products: true
                    }
                },
                subSubCategory: {
                    include: {
                        products: true
                    }
                }
            }
        })
        return result
    } catch (error) {
        throw new Error('Erreur interne du serveur')
    }
}

// Mise à jour d'un produit
export async function updateP(data: CreateP, id: number, imageFile?: File) {
    let successUpload = false
    let pi = ""
    try {
        if (imageFile) {
            // Supprime l'ancienne image
            await deleteImage(data.imageUrl) // en utilisant le public_id actuel
            // Télécharge la nouvelle image sur Cloudinary
            const result = await imageUploader(imageFile, "images-des-produits")
            successUpload = true
            pi = result.publicId
            // Met à jour imageUrl avec le public_id de la nouvelle image
            data.imageUrl = result.publicId
        }
        await prisma.product.update({
            data,
            where: { id }
        })
        return { message: 'Mise à jour effectuée avec succès !' }
    } catch (error) {
        if (successUpload) {
            await deleteImage(pi)
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error("Un produit avec ce nom existe déjà")
            }
        }
        throw new Error('Erreur interne du serveur')
    }
}

// Suppression d'un ou plusieurs produits
export async function deleteP(ids: number[]) {
    try {
        // Récupère les enregistrements à supprimer
        const res = await prisma.product.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            select: {
                imageUrl: true
            }
        })
        // Crée un tableau de public_ids à partir des enregistrements
        const public_ids = res.map(object => object.imageUrl) as string[]
        // Supprime toutes les images associées sur Cloudinary
        await deleteImage(undefined, public_ids)
        const result = await prisma.product.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })
        if (result.count === 0) {
            throw new Error("Aucun produit trouvé pour suppression")
        }
        return { message: 'Suppression effectuée avec succès' }
    } catch (error) {
        throw new Error("Erreur interne du serveur")
    }
}

//recuperer un seul produit
export async function getOP(slug: string) {
    try {
        const result = await prisma.product.findUniqueOrThrow({
            where: {
                slug
            },
            include: {
                subCategory: {
                    include: {
                        products: {
                            include: {
                                subCategory: true,
                                subSubCategory: true
                            }
                        },
                        category: true
                    }
                },
                subSubCategory: {
                    include: {
                        products: {
                            include: {
                                subCategory: true,
                                subSubCategory: true
                            }
                        },
                        subCategory: {
                            include: {
                                category: true
                            }
                        }
                    }
                }
            }
        })
        return result
    } catch (error) {
        throw new Error('Erreur interne du serveur')
    }
}

//recherche d'un produit a partir d'un nom en ignorant la casse
export async function searchP(name: string) {
    try {
        const result = await prisma.product.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive' //pour ignorer la case
                }
            },
            include: {
                subCategory: true,
                subSubCategory: true
            }
        })
        return result
    } catch (error) {
        throw new Error('Erreur interne du serveur')
    }
}
