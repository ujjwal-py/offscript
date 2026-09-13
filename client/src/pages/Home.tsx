import PostCard from '@/components/PostCard';
import useFetch from '../hooks/useFetch';
import type { Post } from '@/types';
import UserPostDialogue from '@/components/UserPostDialogue';
import ViewPostCard from '@/components/ViewPostCard';
import { useState } from 'react';
import {
    AbsoluteCenter, ButtonGroup,
    IconButton, Pagination,
    NativeSelect, Text,
    Flex, Input, InputGroup
} from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight, LuSearch } from "react-icons/lu"


function Home() {
    const [page, setPage] = useState<number>(1);
    const [sortBy, setSortBy] = useState<"updatedAt" | "title">("updatedAt");
    const [order, setOrder] = useState<"desc" | "asc">("desc");
    const { data, loading, refetch } = useFetch<Post[]>("/posts", { page: page, sort_by: sortBy, order: order });
    console.log("Home data:", data);

    return (
        <div>
            <Text textAlign="center" fontSize="4xl" fontWeight="bold">Posts</Text>
            <Flex flexDirection={{ base: "column", md: "row" }} justifyContent="space-between" mb="4" mt="4" padding="2" gap="4"  >
                <InputGroup startAddon={<LuSearch size="14" />}>
                    <Input size="md" placeholder="Search posts..." />
                </InputGroup>
                <Flex gap="4" alignItems="center" justifyContent={{ base: "flex-start", md: "flex-end" }} mt={{ base: "4", md: "0" }}>
                    <Text fontSize="sm" fontWeight="semibold">Options:</Text>
                    <NativeSelect.Root size="sm" width="240px" >
                        <NativeSelect.Field
                            placeholder="Select sorting option"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.currentTarget.value as "updatedAt" | "title")}>
                            <option value="updatedAt">Date</option>
                            <option value="title">Title</option>
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




            {!loading ? <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {data?.map((post) => (

                    <UserPostDialogue post={post}
                        trigger={<PostCard post={post} />}
                        DialogContent={ViewPostCard} usage="view"
                        refetch={refetch}

                    />
                ))}
            </ul>
                :
                <h2>Hold on we are fetching posts</h2>}
            <footer>
                <AbsoluteCenter axis="horizontal">
                    <Pagination.Root count={20} pageSize={2} defaultPage={1} page={page} onPageChange={(e) => setPage(e.page)}>
                        <ButtonGroup variant="outline" size="md">
                            <Pagination.PrevTrigger asChild>
                                <IconButton>
                                    <LuChevronLeft />
                                </IconButton>
                            </Pagination.PrevTrigger>

                            <Pagination.Items
                                render={(page) => (
                                    <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                                        {page.value}
                                    </IconButton>
                                )}
                            />

                            <Pagination.NextTrigger asChild>
                                <IconButton>
                                    <LuChevronRight />
                                </IconButton>
                            </Pagination.NextTrigger>
                        </ButtonGroup>
                    </Pagination.Root>
                </AbsoluteCenter>
            </footer>



        </div>
    )



}

export default Home