
export interface ImageBase{
    title: string
    description?: string
    author: string
    signature: string
}

export interface ImageInfo extends ImageBase{
    id: number
    extension: string
    created: string
}

export interface ImageUpload extends ImageBase{
    file: File | null
}

export interface SearchParams{
    id?: string
    author?: string
    signature?: string
    ord_desc?: string
}