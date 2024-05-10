
import { getImage } from "@/services/APIService"
import { ImageInfo } from "@/services/Interfaces"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Home({ params }: { params: { id: number } }) {
    const [img, setImg] = useState<ImageInfo | undefined>()
    const API_URL = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
      getImage({id: params.id})
      .then(data => {
          setImg(data[0])
      })
    }, [])

    return (
      <>
      {
        img ? (<>
        <h1 className="title">{img.title}</h1>
        <Image width={480} height={360} alt={img.title} src={`${API_URL}/${img.id}/`} />
        <p className="author">{img.author}</p>
        <p className="description">{img.description ? img.description : "No description provided."}</p>
        <p className="created">{img.created}</p>
        <p className="signhash">{img.signature}</p>
        </>) : ( <p>Loading</p> )
      }
      </>
    )
  }
  