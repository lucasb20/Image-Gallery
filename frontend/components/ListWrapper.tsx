"use client"

import { getImageList, getImageListMock } from "@/services/APIService"
import { ImageInfo } from "@/services/Interfaces"
import Image from "next/image"
import { useEffect, useState } from "react"

export function ListWrapper(){
    const [imgs, setImgs] = useState<ImageInfo[]>([])

    useEffect(() => {
        /*getImageList()
        .then(data => {
            setImgs(data)
        })*/
        setImgs(getImageListMock())
    }, [])

    return(
        <div className="image-wrapper">
            {imgs.map((img, index) => {
                return <Image src={`/lizzy.jpg`} width={160} height={120} alt={img.title} key={img.id}/>
            })}
        </div>
    )
}