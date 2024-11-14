import { v2 as cloudinary } from 'cloudinary';


// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

interface CloudinaryUploadResult {
    public_id: string
    [key: string]: any
}

export async function imageUploader(file: File, dossier: string) {
    try {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: `site-internet-mama/images/${dossier}`, resource_type: 'image' },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result as CloudinaryUploadResult)
                }
            )
            uploadStream.end(buffer)
        })
        return { publicId: result.public_id }
    } catch (error) {
        throw new Error("Erreur lors du téléchargement de l'image")
    }
}

export async function deleteImage(public_id?: string, public_ids?: string[]) {
    try {
        if (public_id) {
            await cloudinary.api.delete_resources([public_id],
                { type: 'upload', resource_type: 'image' }
            )
        } else if (public_ids) {
            await cloudinary.api.delete_resources(public_ids,
                { type: 'upload', resource_type: 'image' }
            )
        }
        return true
    } catch (error) {
        throw new Error('Une erreur lors de la suppression du fichier')
    }
}


