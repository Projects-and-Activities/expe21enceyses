import {
    PUBLIC_CLOUDINARY_CLOUD_NAME,
    PUBLIC_CLOUDINARY_UPLOAD_PRESET
} from '$env/static/public';

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`;

export async function uploadToCloudinary(
    file: File,
    teamName: string,
    fileType: 'requirements' | 'payment'
): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'hackfest-registrations');
    formData.append('public_id', `${teamName}_${fileType}_${Date.now()}`);

    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
            `Cloudinary upload failed: ${errorData?.error?.message ?? response.statusText}`
        );
    }

    const result = await response.json();

    if (!result.secure_url) {
        throw new Error('Cloudinary upload did not return a secure_url');
    }

    return result.secure_url;
}
