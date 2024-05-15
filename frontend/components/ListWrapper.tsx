import { getImageList, getImageURL } from "@/services/APIService"
import { ImageInfo, SearchParams } from "@/services/Interfaces"
import Image from "next/image"
import { useEffect, useState } from "react"

export function ListWrapper(){
    const [imgs, setImgs] = useState<ImageInfo[]>([])
    const [query, setQuery] = useState<SearchParams>({})

    useEffect(() => {
        getImageList(query)
        .then(data => {
            setImgs(data)
        })
    }, [])

    return(
        <>
            <form>
                <input type="text" value={query.text} onChange={e => {
                    if(e.target.value !== ""){
                        setQuery({
                            ...query,
                            text: e.target.value
                        })
                    }
                }}
                placeholder="Search..."
                style={{ padding: '10px', width: '200px', marginBottom: '20px' }}
                />
                <label htmlFor="teste"></label>
                <select name="order" id="order" onChange={e => {
                    console.log(e.target.value, typeof e.target.value)
                    if(e.target.value === "oldest"){
                        setQuery({
                            ...query,
                            ord_desc: "true"
                        })
                    }
                    else{
                        const new_query = {
                            ...query
                        }
                        if(query.ord_desc) delete new_query.ord_desc
                        setQuery(new_query)
                    }
                }}>
                    <option value="newset">Newset</option>
                    <option value="oldest">Oldest</option>
                </select>
            </form>
            <div className="image-wrapper">
                {imgs.map((img, index) => {
                    return (<div className="image-item"><a href={`/${img.id}/`} key={img.id}>
                        <Image src={getImageURL(img)} width={500} height={500} alt={img.title}/>
                        </a>
                        <span>{img.title}</span>
                    </div>)
                })}
            </div>
        </>
    )
}