import { getImageList, getImageURL } from "@/services/APIService"
import { ImageInfo, SearchParams } from "@/services/Interfaces"
import Image from "next/image"
import { FormEvent, useEffect, useState } from "react"

export function ListWrapper(){
    const [imgs, setImgs] = useState<ImageInfo[]>([])
    const [query, setQuery] = useState<SearchParams>({})
    const [pagesList, setPagesList] = useState<number[]>([])

    useEffect(() => {
        getImageList(query)
        .then(data => {
            setImgs(JSON.parse(data.items))
            setQuery({
                page: data.page
            })
            const auxList: number[] = []
            for (let i = 0; i < data.pages; i++) {
                auxList.push(i + 1)
            }
            setPagesList(auxList)
        })
    }, [])

    useEffect(() => {
        getImageList(query)
        .then(data => {
            setImgs(JSON.parse(data.items))
        })
    }, [query.page])

    const handlerSubmit = (e : FormEvent) => {
        e.preventDefault()
        getImageList(query)
        .then(data => {
            setImgs(JSON.parse(data.items))
            if(data.pages !== pagesList.length){
                const auxList: number[] = []
                for (let i = 0; i < data.pages; i++) {
                    auxList.push(i + 1)
                }
                setPagesList(auxList)
            }
        })
    }

    return(
        <>
            <form onSubmit={handlerSubmit} className="queryForm">
                <input type="text" value={query.text} onChange={e => {
                    if(e.target.value !== ""){
                        setQuery({
                            ...query,
                            text: e.target.value
                        })
                    }
                    else{
                        const new_query = {...query}
                        delete new_query.text
                        setQuery(new_query)    
                    }
                }}
                placeholder="Search..."
                />
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
                        delete new_query.ord_desc
                        setQuery(new_query)
                    }
                }}>
                    <option value="newset">Newset</option>
                    <option value="oldest">Oldest</option>
                </select>
                <button type="submit">Search</button>
            </form>
            <div className="image-wrapper">
                {imgs.map((img, index) => {
                    return (<div className="image-item" key={img.id}><a href={`/${img.id}/`}>
                        <Image src={getImageURL(img)} width={500} height={500} alt={img.title}/>
                        </a>
                        <span>{img.title}</span>
                    </div>)
                })}
            </div>
            <ul className="pagination">
                {
                    pagesList.map((page, index) => {
                        return(
                            page == query.page? <li key={page} className="active">{page}</li> : <li key={page} onClick={() => {setQuery({...query, page: page})}}>{page}</li>
                        )
                    })
                }
            </ul>
        </>
    )
}