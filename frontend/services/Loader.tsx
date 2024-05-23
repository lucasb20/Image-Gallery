'use client'
 
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function myImageLoader({ src } : { src: string }) {
  return `${API_URL}/images/file/${src}`
}
