import { ImageUpload, SearchParams } from "@/services/Interfaces"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getImageList( params: SearchParams ) {
    let url = `${API_URL}/images/`;
    let count = 0

    if(params.id || params.signature || params.signature || params.ord_desc)
        url += '?'

    if(params.id){
        url += `id=${params.id}`
        count += 1
    }
    if(params.author){
        if(count !== 0)url+='&'
        url += `author=${params.author}`
        count += 1
    }
    if(params.signature){
        if(count !== 0)url+='&'
        url += `signature=${params.signature}`
        count += 1
    }
    if(params.ord_desc){
        if(count !== 0)url+='&'
        url += `ord_desc=true`
    }

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