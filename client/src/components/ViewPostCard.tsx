import React from 'react'
import type { DialogContextProps } from "@/components/UserPostDialogue"
import { Text, Image, Stack, Card } from '@chakra-ui/react'
import type { Post } from '@/types';

const BASE_URL = "http://localhost:3000";

function ViewPostCard({ post }: DialogContextProps<Post>) {
  return (
    <>
      <Card.Root maxWidth="full" overflow="hidden" borderWidth="2px" borderRadius="md" padding='2' borderColor="grey.300" boxShadow="md" >
        <Stack alignItems="center" justifyContent="center" marginTop="4" gap="8">
          <Text fontSize="4xl" fontWeight="bold">{post.title}</Text>
          {post.author && <Text fontSize="md" fontWeight="semibold">{post.author.name || "user"} - {post.author.email}</Text>}
          {post.imageUrl && <Image src={`${BASE_URL}${post.imageUrl}`} alt={post.title} />}
          <Text fontSize="md">{post.description}</Text>
        </Stack >
      </Card.Root >
    </>
  )
}

export default ViewPostCard;