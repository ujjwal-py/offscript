import PostCard from '@/components/PostCard';
import useFetch from '../hooks/useFetch';
import type { HomePost } from '@/store/postStore';
import PostDialogue from '@/components/PostDialogue';
import ViewPostCard from '@/components/ViewHomePostCard';
import { useEffect, useState } from 'react';
import { usePostStore } from '@/store/postStore';
import { useOptionStore } from '@/store/postStore';
import {
    ButtonGroup,
    IconButton,
    Pagination,
    Text,
    Box,
    Flex
} from "@chakra-ui/react"
import { LuChevronRight, LuChevronLeft } from "react-icons/lu"
import { useAuthStore } from '@/store/authStore';
import { api } from '@/Api';
import SearchOptions from '@/components/SearchOptions';


function Home() {
    const [page, setPage] = useState<number>(1);
    const posts = usePostStore((state) => state.posts);
    const setPosts = usePostStore((state) => state.setPosts);
    const q = useOptionStore((state) => state.q);
    const order = useOptionStore((state) => state.order);
    const sort_by = useOptionStore((state) => state.sortBy);

    const postsUrl = q.trim() ? "/search-public" : "/posts"; // if searchbox is empty then defaults to simple fetch
    const { data, loading, refetch } = useFetch<HomePost[]>(postsUrl,
        { q, page, sort_by, order });
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);


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
        <Flex direction="column" bg="bg" minH="100vh">
            <Text textAlign="center" fontSize="4xl" fontWeight="bold">Home Feed</Text>
            <SearchOptions />

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
                margin="auto"
                pageSize={2}
                defaultPage={1}
                page={page}
                bg="bg.subtle"
                marginBottom="4"
                maxW="calc(100vw - 2rem)"
                overflowX="auto"

                onPageChange={(e) => setPage(e.page)}>

                <ButtonGroup variant="outline" size="md" width="max-content" flexWrap="nowrap">
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
        </Flex>
    )
}

export default Home
