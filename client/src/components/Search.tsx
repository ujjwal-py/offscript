import React, { useState } from 'react'
import { LuSearch } from "react-icons/lu"
import { InputGroup, Input } from '@chakra-ui/react'
import { usePostStore } from '@/store/postStore';
import { api } from '@/Api';

type SearchProps = {
    sortBy: "likes" | "updatedAt";
    order: "asc" | "desc";
}

function Search({ sortBy, order }: SearchProps) {
    const [searchValue, setSearchValue] = useState("");
    const setPosts = usePostStore((state) => state.setPosts);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }
    const handleSearch = async () => {
        try {
            const response = await api.get("/search-public", { params: { q: searchValue, sort_by: sortBy, order } });
            setPosts(response.data);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <InputGroup endAddon={<LuSearch size="14" />} onClick={handleSearch} _hover={{ cursor: "pointer" }} >
                <Input size="md"
                    placeholder="Search posts..."
                    value={searchValue}
                    onChange={handleChange}
                />
            </InputGroup>
        </>
    )
}

export default Search