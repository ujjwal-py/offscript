import { LuSearch } from "react-icons/lu"
import { InputGroup, Input } from '@chakra-ui/react'

import { useOptionStore } from '@/store/postStore';

function Search() {
    const setSearchValue = useOptionStore((state) => state.setQ)
    const searchValue = useOptionStore((state) => state.q)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }


    return (
        <>
            <InputGroup endAddon={<LuSearch size="14" />} _hover={{ cursor: "pointer" }} >
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
