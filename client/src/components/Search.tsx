import { LuSearch } from "react-icons/lu"
import { useState } from "react";
import { InputGroup, Input } from '@chakra-ui/react'
import useDebounce from "@/hooks/useDebounce";

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const q = useDebounce(searchQuery);
    return (
        <>
            <InputGroup endAddon={<LuSearch size="14" />} _hover={{ cursor: "pointer" }} >
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
