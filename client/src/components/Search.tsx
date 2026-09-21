import { LuSearch } from "react-icons/lu"
import { useState } from "react";
import { InputGroup, Input } from '@chakra-ui/react'
import useDebounce from "@/hooks/useDebounce";

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    useDebounce(searchQuery);
    return (
        <>
            <InputGroup width="full" endAddon={<LuSearch size="14" />} _hover={{ cursor: "pointer" }} >
                <Input size="md"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </InputGroup>
        </>
    )
}

export default Search
