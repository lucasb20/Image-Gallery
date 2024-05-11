"use client"

import { getImage, getImageURL } from "@/services/APIService"
import { ImageInfo } from "@/services/Interfaces"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home({ params }: { params: { id: number } }) {
    const [img, setImg] = useState<ImageInfo | undefined>()

    useEffect(() => {
      getImage(params.id)
      .then(data => {
          setImg(data)
      })
    }, [])

    return (
      <>
      {
        img ? (<>
        <h1 className="title">{img.title}</h1>
        <Image width={480} height={360} alt={img.title} src={getImageURL(img)} priority />
        <p className="author">{img.author}</p>
        <p className="description">{img.description ? img.description : "No description provided."}</p>
        <p className="created">{img.created}</p>
        <p className="signhash">{img.signature}</p>
        </>) : ( <p>Loading</p> )
      }
      <Link href={"/"}>Back</Link>
      </>
    )
  }
  