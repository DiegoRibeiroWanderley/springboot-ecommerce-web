import { Button, createTheme, FormControl, InputLabel, MenuItem, Select, ThemeProvider, Tooltip } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { FaArrowUp } from "react-icons/fa";
import { FiArrowDown, FiArrowUp, FiRefreshCcw } from "react-icons/fi";
import { MdSearch } from "react-icons/md"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#F06292",
            },
        },
    });

    const categories = [
        { categoryId: 1, categoryName: "Music" },
        { categoryId: 2, categoryName: "Albun" }
    ]

    const [searchParams] = useSearchParams()
    const pathName = useLocation().pathname
    const navigate = useNavigate()
    const inputRef = useRef(null)

    const [category, setCategory] = useState(searchParams.get("category") || "all");
    const [sortOrder, setSortOrder] = useState(searchParams.get("sortBy") || "asc");
    const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value
        const params = new URLSearchParams(searchParams)

        if (selectedCategory === "all") {
            params.delete("category")
        } else {
            params.set("category", selectedCategory)
        }
        navigate(`${pathName}?${params}`)

        setCategory(selectedCategory)
    }

    const toggleSortOrder = () => {
        const params = new URLSearchParams(searchParams)
        const newOrder = sortOrder === "asc" ? "desc" : "asc"

        params.set("sortBy", newOrder)
        navigate(`${pathName}?${params}`)
        setSortOrder(newOrder)
    }

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            searchParams.set('keyword', inputRef.current.value)
            navigate(`${pathName}?${searchParams.toString()}`)

            if (inputRef.current.value === "") {
                searchParams.delete("keyword")
                navigate(`${pathName}?${searchParams.toString()}`)
            }
        }
    }

    const handleClearFilters = () => {
        inputRef.current.value = null
        navigate({ pathname : window.location.pathname })
    }

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all"
        const currentSortOrder = searchParams.get("sortBy") || "asc"
        const currentKeyword = searchParams.get("keyword") || ""

        setCategory(currentCategory)
        setSortOrder(currentSortOrder)
        setKeyword(currentKeyword)
    }, [searchParams])
    
    return (
        <div className="flex lg:flex-row justify-between gap-4">
            {/* SEARCH BAR */}
            <div className="relative flex items-center 2xl:w-112.5 sm:w-105">
                <input
                    type="text"
                    placeholder="Search Products"
                    ref={inputRef}
                    onKeyDown={handleSearch}
                    className="border border-pink-300 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-pink-400" />
                <MdSearch className="absolute left-3 text-2xl text-pink-950"/>
            </div>

            {/* CATEGORY SELECTION */}
            <div className="flex sm:flex-row flex-col gap-4 items-center">
                <FormControl
                    variant="outlined"
                    size="small">
                    <InputLabel 
                        id="category-select-label"
                        sx={{
                            color: "#f06292",
                            "&.Mui-focused": {color: "#e91e63"}
                        }}>
                        Category
                    </InputLabel>
                    <Select
                        className="min-w-30 max-w-30"
                        sx={{
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: "#f06292"
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: "#e91e63"
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: "#e91e63"
                            }
                        }}
                        labelId="category-select-label"
                        value={category}
                        onChange={handleCategoryChange}
                        label="category">
                        <MenuItem value="all">All</MenuItem>
                        {categories.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>
                                {item.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* SORT BUTTON AND CLEAR FILTER */}
                <ThemeProvider theme={theme}>
                    <Tooltip title="Sorted by price: ascending">
                        <Button 
                            onClick={toggleSortOrder}
                            variant="contained" 
                            className="flex items-center gap-2 h-10">
                            Sort By
                            {sortOrder === "asc" ? <FiArrowUp size={23} /> : <FiArrowDown size={23} />}
                        </Button>
                    </Tooltip>
                    <button 
                        onClick={handleClearFilters}
                        className="flex items-center gap-2 bg-rose-800 text-white px-3 py-2 rounded-md hover:bg-rose-900">
                        <FiRefreshCcw className="font-semibold" size={16}/>
                        <span className="font-semibold">Clear Filter</span>
                    </button>
                </ThemeProvider>

            </div>
        </div>
    )
}

export default Filter