import { Button, Card, HStack, Text } from "@chakra-ui/react";
import type { AdminPost, PostStatus } from "@/store/postStore";

type AdminPostCardProps = {
    post: AdminPost;
    onStatusChange: (status: Extract<PostStatus, "PUBLISHED" | "REJECTED" | "REMOVED">) => void;
    pending?: boolean;
};

function AdminPostCard({ post, onStatusChange, pending = false }: AdminPostCardProps) {
    return (
        <Card.Root
            maxWidth="full"
            size="sm"
            overflow="hidden"
            bg="bg.muted"
            borderWidth="1px"
            margin="2"
            borderRadius="lg"
            borderColor="bg.emphasized"
            _hover={{ borderColor: "bg.inverted", cursor: "pointer" }}
        >
            <Card.Body gap="1">
                <Card.Title fontSize="lg">{post.title}</Card.Title>
                <Text fontSize="sm" color="fg.muted">
                    By {post.author.name || post.author.email}
                </Text>
            </Card.Body>
            <Card.Footer justifyContent="space-between" gap="2" flexWrap="wrap">
                <Text fontSize="sm" color="gray.500">
                    {post.status} · {post.updatedAt.slice(0, 10)}
                </Text>
                <HStack gap="2" onClick={(event) => event.stopPropagation()}>
                    {pending ? (
                        <>
                            <Button size="sm" colorPalette="green" onClick={() => onStatusChange("PUBLISHED")}>
                                Approve
                            </Button>
                            <Button size="sm" colorPalette="red" variant="outline" onClick={() => onStatusChange("REJECTED")}>
                                Reject
                            </Button>
                        </>
                    ) : (
                        <Button size="sm" colorPalette="red" variant="outline" onClick={() => onStatusChange("REMOVED")}>
                            Remove
                        </Button>
                    )}
                </HStack>
            </Card.Footer>
        </Card.Root>
    );
}

export default AdminPostCard;
