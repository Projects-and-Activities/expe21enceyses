import { v2 as cloudinary } from 'cloudinary';
import {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
} from '$env/static/private';

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
})

export async function uploadToCloudinary(file: File, teamName: string, fileType: 'requirements' | 'payment'): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(base64String, {
      folder: 'hackfest-registrations',
      public_id: `${teamName}_${fileType}_${Date.now()}`,
      resource_type: 'auto'
    }, (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        reject(error);
      } else if (result && result.secure_url) {
        resolve(result.secure_url);
      } else {
        const missingUrlError = new Error('Cloudinary upload did not return a secure_url');
        console.error('Cloudinary upload error:', missingUrlError, 'Result:', result);
        reject(missingUrlError);
      }
    });
  });
}