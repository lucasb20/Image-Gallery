import { ImageInfo, ImageUpload, SearchParams } from "@/services/Interfaces"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getImage(id : number){
    const url = `${API_URL}/images/first/?id=${id}`
    const response = await fetch(url)
    return response.json();
}

export async function getImageList(params : SearchParams) {
    const body : SearchParams = {}
    if(params.page)body.page = params.page
    if(params.text)body.text = params.text
    if(params.ord_desc)body.ord_desc = "true"

    const response = await fetch(API_URL + '/images/page/', {
        method: 'POST',
        body: JSON.stringify(body)
    })
    
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

export function getImageURL(img : ImageInfo){
    return `${img.id}.${img.extension}`
}