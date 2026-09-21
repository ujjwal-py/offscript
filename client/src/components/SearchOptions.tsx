import { Flex, NativeSelect, Text } from "@chakra-ui/react"
import Search from "./Search";
import { useOptionStore } from "@/store/postStore";

function SearchOptions() {
    const { sortBy, setSortBy, order, setOrder } = useOptionStore();

    return (
        <>
            <Flex
                width="full"
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="space-between"
                mb="4"
                mt="4"
                padding={{ base: "2", md: "4" }}
                gap="4"
            >
                <Search />
                <Flex
                    width="full"
                    gap="4"
                    alignItems={{ base: "stretch", sm: "center" }}
                    justifyContent={{ base: "flex-start", md: "flex-end" }}
                    flexDirection={{ base: "column", sm: "row" }}
                    mt={{ base: "0", md: "0" }}
                >
                    <Text fontSize="sm" fontWeight="semibold" flexShrink="0">Options:</Text>
                    <NativeSelect.Root size="sm" width={{ base: "full", sm: "240px" }}>
                        <NativeSelect.Field
                            placeholder="Select sorting option"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.currentTarget.value as "updatedAt" | "likes")}>
                            <option value="updatedAt">Date</option>
                            <option value="likes">Likes</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    <NativeSelect.Root size="sm" width={{ base: "full", sm: "240px" }}>
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
