"use client"

import { getImageList } from "@/services/APIService"
import { ImageInfo } from "@/services/Interfaces"
import Image from "next/image"
import { useEffect, useState } from "react"

export function ListWrapper(){
    const [imgs, setImgs] = useState<ImageInfo[]>([])

    useEffect(() => {
        getImageList()
        .then(data => {
            setImgs(data)
        })
    }, [])

    return(
        <div className="image-wrapper">
            {imgs.map((img, index) => {
                return <Image src={`${img.id}.${img.extension}`} width={200} height={200} alt={img.title} key={img.id}/>
            })}
        </div>
    )
}