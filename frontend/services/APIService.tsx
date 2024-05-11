import { ImageUpload, SearchParams } from "@/services/Interfaces"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getImageList() {
    const response = await fetch(API_URL + '/images/')
    return response.json();
}

export async function postImage(params : ImageUpload){
    const formData = new FormData()
    if(params.file)formData.append('file', params.file)
    formData.append('title', params.title)
    if(params.description)formData.append('description', params.description)
    formData.append('author', params.author)
    formData.append('signature', params.signature)

    const response = await fetch(API_URL + '/images/', {
        method: 'POST',
        body: formData
    })

    return response.json()
}