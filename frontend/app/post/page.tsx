"use client"

import { postImage } from "@/services/APIService"
import { ImageUpload } from "@/services/Interfaces"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function Home() {
    const [formdata, setFormdata] = useState<ImageUpload>({
        title: "",
        description: "",
        author: "",
        signature: "",
        file: null
    })
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormdata(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if(file){
            setFormdata(prevState => ({
                ...prevState,
                file
            }))
        }
    }

    const handlerSubmit = (e: FormEvent) => {
        e.preventDefault()
        postImage(formdata)
        .then(data => {
            router.push("/")
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <>
          <form onSubmit={handlerSubmit} encType="multipart/form-data">
              <div>
                  <label htmlFor="title">Title:</label>
                  <input type="text" name="title" id="title" value={formdata.title} onChange={handleChange} required maxLength={256}/>
              </div>
              <div>
                  <label htmlFor="description">Description:</label>
                  <textarea name="description" id="description" value={formdata.description} onChange={handleChange}></textarea>
              </div>
              <div>
                  <label htmlFor="author">Author:</label>
                  <input type="text" name="author" id="author" value={formdata.author} onChange={handleChange} required/>
              </div>
              <div>
                  <label htmlFor="sign">Signature:</label>
                  <input type="text" name="signature" id="signature" value={formdata.signature} onChange={handleChange} required/>
              </div>
              <div>
                  <label htmlFor="file">Image:</label>
                  <input type="file" name="file" id="file" onChange={handleFileChange} required/>
              </div>
              <div>
                  <button type="reset">Reset</button>
                  <button type="submit">Submit</button>
              </div>
          </form>
        <Link href={"/"}>Back</Link>
        </>
    )
  }