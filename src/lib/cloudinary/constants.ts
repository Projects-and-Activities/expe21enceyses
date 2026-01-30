import { CLOUDINARY_BASE_URL } from "./config";

// Cloudinary image constants
export const CLOUDINARY_IMAGES = {
  // Logos
  coloredLogo: `${CLOUDINARY_BASE_URL}/colored-logo.png`,
  coloredLogoInverted: `${CLOUDINARY_BASE_URL}/colored-logo-inverted.png`,
  logo: `${CLOUDINARY_BASE_URL}/logo.png`,
  logoDark: `${CLOUDINARY_BASE_URL}/logoDark.png`,
  
  // Event images
  hackfest: `${CLOUDINARY_BASE_URL}/hackfest.png`,
  ctalks: `${CLOUDINARY_BASE_URL}/ctalks.png`,
  pfjf: `${CLOUDINARY_BASE_URL}/pfjf.png`,
  
  // UI elements
  star: `${CLOUDINARY_BASE_URL}/star.png`,
  handTransparentLeft: `${CLOUDINARY_BASE_URL}/hand_transparent_left.png`,
  handTransparentRight: `${CLOUDINARY_BASE_URL}/hand_transparent_right.png`,
} as const;