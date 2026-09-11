import React, { useEffect, useState } from 'react'
import { Button, Card, Field, Input, Stack, Text } from '@chakra-ui/react'
import { api } from '../Api'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
type SignInBody = {
    name?: string,
    email: string,
    password: string
}
type mode = "signin" | "signup";

function Sign() {
    const navigate = useNavigate();
    const [mode, setMode] = useState<mode>("signup");
    const { user, login } = useAuth();
    const [formData, setFormData] = useState<SignInBody>({
        name: "",
        email: "",
        password: ""
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (mode === "signin") {
                await api.post("/signin", formData)
            }
            else {
                await api.post("/signup", formData);
            }
            login(); // context
            setFormData({
                name: "",
                email: "",
                password: ""
            })
            // console.log(res.data);
            navigate("/profile")

        } catch (err) {
            console.log(err);
        }

    }
    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user])
    const isSignUp = mode === "signup";

    return (
        <Card.Root maxWidth="md" margin="4" mx="auto" borderWidth="1px" borderColor="gray.200" borderRadius="md" boxShadow="md">
            <Card.Header>
                <Card.Title textAlign="center">
                    {isSignUp ? "Create an account" : "Welcome back"}
                </Card.Title>
                <Card.Description textAlign="center">
                    {isSignUp ? "Sign up to get started" : "Sign in to continue"}
                </Card.Description>
            </Card.Header>

            <form onSubmit={handleSubmit}>
                <Card.Body>
                    <Stack gap="4" w="full">
                        {isSignUp &&
                            <Field.Root required>
                                <Field.Label>Name</Field.Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    placeholder="Enter your name"
                                    onChange={handleChange}
                                />
                            </Field.Root>
                        }

                        <Field.Root required>
                            <Field.Label>Email</Field.Label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="Enter your email"
                                onChange={handleChange}
                            />
                        </Field.Root>

                        <Field.Root required>
                            <Field.Label>Password</Field.Label>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                placeholder="Enter your password"
                                onChange={handleChange}
                            />
                        </Field.Root>
                    </Stack>
                </Card.Body>

                <Card.Footer flexDirection="column" gap="3">
                    <Button type="submit" width="full">
                        {isSignUp ? "Sign up" : "Sign in"}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setMode(isSignUp ? "signin" : "signup")}
                    >
                        <Text>
                            {isSignUp ? "Already registered? Sign in" : "Need an account? Sign up"}
                        </Text>
                    </Button>
                </Card.Footer>
            </form>
        </Card.Root>
    )
}

export default Sign
