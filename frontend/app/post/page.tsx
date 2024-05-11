"use client"

import Postform from "@/components/PostForm"
import Link from "next/link"
import "@/app/globals.css"

export default function Home() {
    return (
        <>
            <Postform />
            <Link href={"/"}>Back</Link>
        </>
    )
  }