"use client"

import { getImageList } from "@/services/APIService"
import { ImageInfo } from "@/services/Interfaces"
import Image from "next/image"
import { useEffect, useState } from "react"

export function Home(){
    const [imgs, setImgs] = useState<ImageInfo[]>([])

    useEffect(() => {
        getImageList({})
        .then(data => {
            setImgs(data)
        })
    }, [])

    return(
        <div className="image-wrapper">
            {imgs.map((img, index) => {
                return (<><a key={img.id} href={`/${img.id}/`}>
                    <Image src={`/lizzy.jpg`} width={160} height={120} alt={img.title}/>
                </a>
                <p>{img.title}</p>
                <p>{img.author}</p>
                <p>{img.created}</p>
                </>)
            })}
        </div>
    )
}