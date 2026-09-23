import { useCallback, useEffect, useState } from "react";
import { Badge, Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { api } from "@/Api";
import { useOptionStore, type AdminPost, type PostStatus } from "@/store/postStore";
import Search from "@/components/Search";
import AdminPostCard from "@/components/AdminPostCard";
import PostDialogue from "@/components/PostDialogue";
import { toaster } from "@/components/ui/toaster";
import LoadingScreen from "@/components/LoadingScreen";

type AdminStatus = Extract<PostStatus, "PUBLISHED" | "REJECTED" | "REMOVED">;
type PendingResponse = { posts: AdminPost[] };

function AdminPostDetails({ post }: { post: AdminPost }) {
    return (
        <Stack gap="5" padding={{ base: "2", md: "6" }}>
            <Badge
                width="fit-content"
                colorPalette={post.status === "PENDING" ? "orange" : "green"}
            >
                {post.status}
            </Badge>
            <Heading size={{ base: "lg", md: "2xl" }} textAlign="center">
                {post.title}
            </Heading>
            <Text textAlign="center" color="fg.muted">
                By {post.author.name || post.author.email}
            </Text>
            {post.imageUrl && (
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    maxH="55vh"
                    objectFit="contain"
                />
            )}
            <Text whiteSpace="pre-line">
                {post.description || "No description provided."}
            </Text>
        </Stack>
    );
}

function AdminDashboard() {
    const q = useOptionStore((state) => state.q);
    const sortBy = useOptionStore((state) => state.sortBy);
    const order = useOptionStore((state) => state.order);
    const [pendingPosts, setPendingPosts] = useState<AdminPost[]>([]);
    const [publishedPosts, setPublishedPosts] = useState<AdminPost[]>([]);
    const [pendingLoading, setPendingLoading] = useState(true);
    const [publishedLoading, setPublishedLoading] = useState(false);

    const refreshPending = useCallback(async () => {
        setPendingLoading(true);
        try {
            const response = await api.get<PendingResponse>("/pending-posts");
            setPendingPosts(response.data.posts);
        } finally {
            setPendingLoading(false);
        }
    }, []);

    const refreshPublished = useCallback(async () => {
        if (!q.trim()) {
            setPublishedPosts([]);
            return;
        }

        setPublishedLoading(true);
        try {
            const response = await api.get<AdminPost[]>("/search-public", {
                params: { q, sort_by: sortBy, order },
            });
            setPublishedPosts(response.data);
        } finally {
            setPublishedLoading(false);
        }
    }, [q, sortBy, order]);

    useEffect(() => {
        refreshPending().catch(() => undefined);
    }, [refreshPending]);

    useEffect(() => {
        refreshPublished().catch(() => setPublishedPosts([]));
    }, [refreshPublished]);

    const changeStatus = async (post: AdminPost, status: AdminStatus) => {
        await api.put(`/update-post-status/${post.id}`, { status });
        toaster.create({
            title: `Post ${status.toLowerCase()}`,
            type: "success",
        });
        await refreshPending();
        await refreshPublished();
    };

    return (
        <Stack gap="8" padding={{ base: "4", md: "8" }} minH="100vh" bg="bg">
            <Heading size="xl">Admin Dashboard</Heading>

            <Box>
                <Heading size="lg" marginBottom="4">Pending posts</Heading>
                {pendingLoading ? <LoadingScreen message="Loading posts or data please wait" /> : pendingPosts.length === 0 ? (
                    <Text color="fg.muted">There are no pending posts.</Text>
                ) : (
                    <Box as="ul" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pendingPosts.map((post) => (
                            <PostDialogue
                                key={post.id}
                                post={post}
                                usage="view"
                                refetch={refreshPending}
                                trigger={
                                    <AdminPostCard
                                        post={post}
                                        pending
                                        onStatusChange={(status) => changeStatus(post, status)}
                                    />
                                }
                                DialogContent={() => <AdminPostDetails post={post} />}
                            />
                        ))}
                    </Box>
                )}
            </Box>

            <Box>
                <Heading size="lg" marginBottom="4">Search published posts</Heading>
                <Search />
                {publishedLoading ? <LoadingScreen message="Loading posts or data please wait" /> : !q.trim() ? (
                    <Text color="fg.muted" marginTop="4">Search by title to manage published posts.</Text>
                ) : publishedPosts.length === 0 ? (
                    <Text color="fg.muted" marginTop="4">No published posts matched your search.</Text>
                ) : (
                    <Box as="ul" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" marginTop="4">
                        {publishedPosts.map((post) => (
                            <PostDialogue
                                key={post.id}
                                post={post}
                                usage="view"
                                refetch={refreshPublished}
                                trigger={
                                    <AdminPostCard
                                        post={post}
                                        onStatusChange={(status) => changeStatus(post, status)}
                                    />
                                }
                                DialogContent={() => <AdminPostDetails post={post} />}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        </Stack>
    );
}

export default AdminDashboard
