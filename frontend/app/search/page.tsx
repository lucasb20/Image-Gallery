"use client"

import { getImageList } from "@/services/APIService"
import { ImageInfo } from "@/services/Interfaces"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home(){
    const [imgs, setImgs] = useState<ImageInfo[]>([])

    const API_URL = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        getImageList({})
        .then(data => {
            setImgs(data)
        })
    }, [])

    return(
        <>
            <div className="image-wrapper">
                {imgs.map((img, index) => {
                    return (<><a key={img.id} href={`/${img.id}/`}>
                        <Image src={`${API_URL}/images/${img.id}.${img.extension}`} width={160} height={120} alt={img.title}/>
                    </a>
                    <p>{img.title}</p>
                    <p>{img.author}</p>
                    <p>{img.created}</p>
                    </>)
                })}
            </div>
            <Link href={"/"}>Back</Link>
        </>
    )
}