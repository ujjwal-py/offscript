import { Flex, NativeSelect, Text } from "@chakra-ui/react"
import Search from "./Search";
import { useOptionStore } from "@/store/postStore";

function SearchOptions() {
    const { sortBy, setSortBy, order, setOrder } = useOptionStore();

    return (
        <>
            <Flex flexDirection={{ base: "column", md: "row" }} justifyContent="space-between" mb="4" mt="4" padding="2" gap="4"  >
                <Search />
                <Flex gap="4" alignItems="center" justifyContent={{ base: "flex-start", md: "flex-end" }} mt={{ base: "4", md: "0" }}>
                    <Text fontSize="sm" fontWeight="semibold">Options:</Text>
                    <NativeSelect.Root size="sm" width="240px" >
                        <NativeSelect.Field
                            placeholder="Select sorting option"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.currentTarget.value as "updatedAt" | "likes")}>
                            <option value="updatedAt">Date</option>
                            <option value="likes">Likes</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    <NativeSelect.Root size="sm" width="240px" >
                        <NativeSelect.Field
                            placeholder="Choose order"
                            value={order}
                            onChange={(e) => setOrder(e.currentTarget.value as "desc" | "asc")}>
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Flex>
            </Flex>
        </>
    )
}

export default SearchOptions
