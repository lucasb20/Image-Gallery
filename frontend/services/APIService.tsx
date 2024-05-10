import { ImageInfo, ImageUpload } from "@/services/Interfaces"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getImageList(){
    const response = await fetch(`${API_URL}/images/`)
    return response.json()
}

export async function getImage({ id } : { id: number }){
    const response = await fetch(`${API_URL}/images/?id=${id}`)
    return response.json()
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

export function getImageListMock(){
    const test : ImageInfo[] = []
    for(let i = 0; i < 20; i++){
        test[i] = {
            id: i,
            author: "lucas",
            created: "0",
            extension: "jpg",
            title: "titulo",
            signature: "SOMETHWEHUHTRE25555222666",
        }
    }
    return test
}