import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { fetchProcuts } from "../store/actions"

const useProductFilter = () => {
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const params = new URLSearchParams()

        const currentPage = searchParams.get("page") 
            ? Number(searchParams.get("page")) 
            : 1

        params.set("pageNumber", currentPage - 1)

        const sortOrder = searchParams.get("sortBy") || "asc"
        const category = searchParams.get("category") || null
        const keyword = searchParams.get("keyword") || null

        params.set("sortBy", "price")
        params.set("sortOrder", sortOrder)

        if (category) {
            params.set("category", category)
        }

        if (keyword) {
            params.set("keywword", keyword)
        }

        const queryString = params.toString()
        console.log("QUERY STRING", queryString);

        dispatch(fetchProcuts(queryString))
        
    }, [dispatch, searchParams])
}

export default useProductFilter