"use client"

import { getImage, getImageURL } from "@/services/APIService"
import { ImageInfo } from "@/services/Interfaces"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import "@/app/styles.css"
import "@/app/[id]/styles.css"
import myImageLoader from "@/services/Loader"

export default function Home({ params }: { params: { id: number } }) {
    const [img, setImg] = useState<ImageInfo | undefined>()

    useEffect(() => {
      getImage(params.id)
      .then(data => {
          setImg(data)
      })
    }, [])

    const setTime = (utcTime : string) => {
      const utcTimeDate = new Date(utcTime)
      return utcTimeDate.toUTCString()
    }

    return (
      <div className="image-detail">
        {
        img ? (<>
        <div><Image loader={myImageLoader} alt={img.title} src={getImageURL(img)} fill priority /></div>
        <p className="title">{img.title}</p>
        <p className="author">author: {img.author}</p>
        <p className="description">description: {img.description ? img.description : "No description provided."}</p>
        <p className="created">create at: {setTime(img.created)}</p>
        <p className="signhash">signature: {img.signature}</p>
        </>) : ( <p>Loading</p> )
      }
      <Link href={"/"}>Back</Link>
      </div>
    )
  }
  