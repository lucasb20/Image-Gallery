"use client"

import { getImageList } from "@/services/APIService"
import { ImageInfo } from "@/services/Interfaces"
import Image from "next/image"
import { useEffect, useState } from "react"

export function ListWrapper(){
    const [imgs, setImgs] = useState<ImageInfo[]>([])

    const API_URL = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        getImageList({})
        .then(data => {
            setImgs(data)
        })
    }, [])

    return(
        <div className="image-wrapper">
            {imgs.map((img, index) => {
                return (<a href={`/${img.id}/`} key={img.id}>
                    <Image src={`${API_URL}/images/${img.id}.${img.extension}`} width={160} height={120} alt={img.title} key={img.id}/>
                </a>)
            })}
        </div>
    )
}