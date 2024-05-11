"use client"

import { getImageList, getImageURL } from "@/services/APIService"
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
                return (<><a href={`/${img.id}/`} key={img.id}>
                    <Image src={getImageURL(img)} width={160} height={120} alt={img.title} key={img.id}/>
                </a>
                <span>{img.title}</span>
                </>)
            })}
        </div>
    )
}