import PostCard from '@/components/PostCard';
import useFetch from '../hooks/useFetch';
import type { HomePost } from '@/store/postStore';
import PostDialogue from '@/components/PostDialogue';
import ViewPostCard from '@/components/ViewHomePostCard';
import { useEffect, useState } from 'react';
import { usePostStore } from '@/store/postStore';
import {
    ButtonGroup,
    IconButton,
    Pagination,
    Text,
    Box,
    Stack
} from "@chakra-ui/react"
import { LuChevronRight, LuChevronLeft } from "react-icons/lu"
import { useAuthStore } from '@/store/authStore';
import { api } from '@/Api';
import SearchOptions from '@/components/SearchOptions';


function Home() {
    const [page, setPage] = useState<number>(1);
    const { posts, setPosts } = usePostStore();
    const [sortBy, setSortBy] = useState<"updatedAt" | "likes">("likes");
    const [order, setOrder] = useState<"desc" | "asc">("desc");
    const { data, loading, refetch } = useFetch<HomePost[]>("/posts",
        { page: page, sort_by: sortBy, order: order });
    const { user, setUser } = useAuthStore();

    useEffect(() => {
        if (data) {
            setPosts(data);
        }

    }, [data])

    useEffect(() => { // need to check if the user is signed in or not to
        // fix the posts liking without sigin
        if (user) return;

        api.get("/me")
            .then((response) => {
                setUser(response.data);
            })
            .catch(() => {
                // User is not authenticated
                console.log("not authenticated")
            });
    }, [user, setUser]);

    return (
        <Stack alignItems="center" bg="bg" minH="100vh">
            <Text textAlign="center" fontSize="4xl" fontWeight="bold">Posts</Text>
            <SearchOptions sortBy={sortBy}
                setSortBy={setSortBy}
                order={order}
                setOrder={setOrder}
            />

            {!loading && posts ? <Box as="ul" className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' bg="bg" >
                {posts.map((post) => (
                    <PostDialogue
                        key={post.id}
                        post={post}
                        trigger={<PostCard post={post} />}
                        DialogContent={ViewPostCard} usage="view"
                        refetch={refetch}
                    />
                ))}
            </Box>
                :
                <h2 className="text-cyan-200">Hold on we are fetching posts</h2>}

            <Pagination.Root count={20}
                pageSize={2}
                defaultPage={1}
                page={page}
                bg="bg.subtle"
                marginBottom="4"

                onPageChange={(e) => setPage(e.page)}>

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
        </Stack>
    )
}

export default Home