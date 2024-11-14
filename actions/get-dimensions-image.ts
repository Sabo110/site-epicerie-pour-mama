"use server"

import sharp from 'sharp'

export async function getDimensionsBanner(file: File) {
    try {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        // Utiliser Sharp pour obtenir les métadonnées (dimensions)
        const metadata = await sharp(buffer).metadata()
        // Retourner les dimensions de l'image
        if (metadata.width != 1080 || metadata.height != 350) {
            return false
        }
        return true
    } catch (error) {
        throw new Error('Erreur lors de l\'extraction des dimensions')
    }
}