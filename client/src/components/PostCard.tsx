import React from 'react'
import { Card, Image, Stack, Text } from '@chakra-ui/react'
import type { PostCardProps } from '@/types'
import { BsSuitHeartFill } from 'react-icons/bs'
import { BASE_URL } from "@/config"


function PostCard({ post }: PostCardProps) {


    return (
        <Card.Root maxWidth="full" height="72" overflow="hidden" borderWidth="2px" margin="2" borderRadius="md" boxShadow="xl" borderColor="bg.muted" boxShadowColor="bg.subtle" _hover={{ borderColor: "bg.inverted", cursor: "pointer" }} >
            {post.imageUrl && <Image src={`${BASE_URL}${post.imageUrl}`} fit="cover" maxHeight="1/3" />}
            <Card.Body gap="2">
                <Card.Title display="flex" justifyContent="space-between" alignItems="center">
                    <Text fontSize="2xl" fontWeight="bold">
                        {post.title}
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" display="flex" alignItems="center" gap="1">
                        <BsSuitHeartFill /> {post.Likes?.length || 0}
                    </Text>
                </Card.Title>

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