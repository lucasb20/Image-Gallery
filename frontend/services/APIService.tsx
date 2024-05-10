import { ImageUpload, SearchParams } from "@/services/Interfaces"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getImageList({ id = "", signature, author, ord_desc }: SearchParams) {
    let url = `${API_URL}/images/?`;

    url += `id=${id}`
    if(signature)url += `&signature=${signature}`
    if(author)url += `&author=${author}`
    if(ord_desc)url += `&ord_desc=true`

    const response = await fetch(url);
    return response.json();
}

export async function postImage(params : ImageUpload){
    let url = API_URL
    if(!url)return undefined
    url += `?title=${params.title}`
    if(params.description) url += `&description=${params.description}`
    url += `&author=${params.author}`
    url += `&signature=${params.signature}/`
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            file: params.file
        })
    })
    return response.json()
}