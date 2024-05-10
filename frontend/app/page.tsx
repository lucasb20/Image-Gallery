import { ListWrapper } from "@/components/ListWrapper";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Image Gallery</h1>
      <nav>
        <ul>
          <li><Link href={"/post"}>Image Submit</Link></li>
          <li><Link href={"/search"}>Search Page</Link></li>
        </ul>
      </nav>
      <ListWrapper />
    </>
  )
}
