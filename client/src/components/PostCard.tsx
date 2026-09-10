import React from 'react'
import { Card, Image, Stack, Text } from '@chakra-ui/react'
import type { PostCardProps } from '@/types'


function PostCard({ post }: PostCardProps) {
    const BASE_URL = "http://localhost:3000"

    return (
        <Card.Root maxWidth="full" height="72" overflow="hidden" borderWidth="2px" margin="2" borderRadius="md" boxShadow="xl" borderColor="grey.300" boxShadowColor="white" _hover={{ borderColor: "white", cursor: "pointer" }} >
            {post.imageUrl && <Image src={`${BASE_URL}${post.imageUrl}`} fit="cover" maxHeight="1/3" />}
            <Card.Body gap="2">
                <Card.Title fontSize="2xl">{post.title}</Card.Title>
                <Card.Description>
                    <Stack width="full">
                        <Text fontSize="sm" fontWeight="semibold">
                            {post.author.name || "user"} - {post.author.email}
                        </Text>
                        <Text truncate fontSize="md" color="gray.50">
                            {post.description}
                        </Text>
                    </Stack>
                </Card.Description>
            </Card.Body>
            <Card.Footer gap="1">
                <Text fontSize="sm" color="gray.500">
                    Likes/Tags
                </Text>
            </Card.Footer>
        </Card.Root>
    )
}

export default PostCard