import { Pagination } from "@mui/material"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

const Paginations = ({numberOfPages, totalProducts}) => {
    const [searchParams] = useSearchParams()
    const pathname = useLocation().pathname
    const params = new URLSearchParams(searchParams)
    const navigate = useNavigate()

    const paramValue = searchParams.get("pageNumber") 
        ? Number(searchParams.get("pageNumber")) 
        : 0

    const onChangeHandler = (event, value) => {
        params.set("pageNumber", (value - 1).toString())
        navigate(`${pathname}?${params}`)
    }

    return (
        <Pagination 
            count={numberOfPages} 
            page={paramValue + 1}
            defaultPage={1} 
            siblingCount={0} 
            boundaryCount={2}
            shape="rounded"
            onChange={onChangeHandler} />
    )
}

export default Paginations