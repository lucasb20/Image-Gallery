"use client"

import Postform from "@/components/PostForm"
import Link from "next/link"

export default function Home() {
    

    return (
        <>
            <Postform />
            <Link href={"/"}>Back</Link>
        </>
    )
  }