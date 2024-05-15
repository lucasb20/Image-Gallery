"use client"

import { ListWrapper } from "@/components/ListWrapper";
import Link from "next/link";
import "@/app/styles.css"

export default function Home() {
  return (
    <div className="container">
      <h1>Image Gallery</h1>
      <ul>
        <li><Link href={"/post"}>Image Submit</Link></li>
      </ul>
      <ListWrapper />
    </div>
  )
}
