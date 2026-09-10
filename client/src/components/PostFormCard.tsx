import type { UserPost } from "@/types";
import {
    Card, Input, Stack, Field,
    Textarea, FileUpload, RadioCard,
    HStack, Button
} from "@chakra-ui/react"
import { useState } from "react"
import { HiUpload } from 'react-icons/hi'
import { api } from "@/Api";
import axios from "axios";

type PostFromCardProps = {
    post: UserPost,
    setRefresh?: React.Dispatch<React.SetStateAction<boolean>>,
    usage: "create" | "update"
}

type ApiValidationError = {
    message: string;
    Errors?: string;
};

function PostFormCard({ post, setRefresh, usage }: PostFromCardProps) {
    const [image, setImage] = useState<File | null>(null);
    const [data, setData] = useState<UserPost>(post);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async () => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("published", data.published ? "publish" : "draft");

        if (data.description) {
            formData.append("description", data.description);
        }
        if (image) {
            formData.append("image", image);
        }
        try {
            let res;
            if (usage === "create") {
                res = await api.post("/new-post", formData);
            } else {
                res = await api.put(`/update-post/${data.id}`, formData);
            }
            console.log(res.data);
            if (setRefresh) {
                setRefresh((prev) => !prev);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Status:", err.response?.status);
                console.error("Validation response:", err.response?.data);
                console.error("Validation errors:", err.response?.data?.Errors);
            } else {
                console.error(err);
            }

        }
    }
    return (
        <Card.Root maxWidth="full" margin="2" borderWidth="1px" borderColor="gray.200" borderRadius="md" boxShadow="md">
            <Card.Header>
                <Card.Title>{usage === "create" ? "Create" : "Update"}  Post</Card.Title>
                <Card.Description>You can create a new post here. Fill in the details and submit
                </Card.Description>
            </Card.Header>
            <Card.Body>
                <Stack gap="3" w="full">
                    <Field.Root >
                        <Field.Label>
                            <Field.RequiredIndicator />
                            Post Title
                        </Field.Label>
                        <Input placeholder="Enter post title"
                            name="title"
                            value={data.title}
                            onChange={handleChange} />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Description</Field.Label>
                        <Textarea placeholder="Enter post description"
                            name="description"
                            value={data.description}
                            onChange={handleChange} />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Upload an Image for Post</Field.Label>
                        <FileUpload.Root accept={["image/*"]}
                            onFileChange={(details) => { setImage(details.acceptedFiles[0] ?? null) }}>
                            <FileUpload.HiddenInput />
                            <FileUpload.Trigger asChild>
                                <Button variant="outline" size="sm">
                                    <HiUpload /> Upload file
                                </Button>
                            </FileUpload.Trigger>
                            <FileUpload.List />
                        </FileUpload.Root>
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Save as Draft?</Field.Label>
                        <RadioCard.Root value={data.published ? "publish" : "draft"}
                            onValueChange={(e) => {
                                if (e.value === null) return;
                                setData((prev) => ({
                                    ...prev,
                                    published: e.value === "publish" ? true : false,
                                }));
                            }}
                            name="published">
                            <HStack align="strech">
                                <RadioCard.Item value="draft" >
                                    <RadioCard.ItemHiddenInput />
                                    <RadioCard.ItemControl>
                                        <RadioCard.ItemText>Yes</RadioCard.ItemText>
                                        <RadioCard.ItemIndicator />
                                    </RadioCard.ItemControl>
                                </RadioCard.Item>
                                <RadioCard.Item value="publish">
                                    <RadioCard.ItemHiddenInput />
                                    <RadioCard.ItemControl>
                                        <RadioCard.ItemText>No</RadioCard.ItemText>
                                        <RadioCard.ItemIndicator />
                                    </RadioCard.ItemControl>
                                </RadioCard.Item>
                            </HStack>
                        </RadioCard.Root>
                    </Field.Root>

                </Stack>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                <Button onClick={handleSubmit} variant="solid">{data.published ? "Publish" : "Draft"}</Button>
            </Card.Footer>
        </Card.Root >
    )
}


export default PostFormCard