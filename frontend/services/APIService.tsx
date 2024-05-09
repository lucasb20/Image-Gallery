import { ImageInfo } from "@/services/Interfaces"

const API_URL = 'http://localhost:5000'

export async function getImageList(){
    const response = await fetch(`${API_URL}/images/`)
    return response.json()
}