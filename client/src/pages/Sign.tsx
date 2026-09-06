import React, { useState } from 'react'
import { api } from '../Api'
import { useAuth } from '../context/UserContext';
type SignInBody = {
    name?: string,
    email: string,
    password: string
}
type mode = "signin" | "signup";

function Sign() {
    const [mode, setMode] = useState<mode>("signup");
    const { login } = useAuth();
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
            const res = mode === "signin" ? await api.post("/signin", formData) : await api.post("/signup", formData);
            login(); // context
            setFormData({
                name: "",
                email: "",
                password: ""
            })
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <div className='m-2'>
            <form onSubmit={handleSubmit}
                className='grid grid-rows-4 gap-4 p-2 bg-cyan-600 text-white text-2xl '>
                {mode === "signup" &&
                    <div className='grid grid-cols-2 '>
                        <label>Name</label>
                        <input type='text'
                            name="name"
                            value={formData.name}
                            placeholder='Enter your name'
                            onChange={handleChange}
                            className='bg-cyan-950' />
                    </div>
                }
                <div className='grid grid-cols-2 '>
                    <label>Email</label>
                    <input type='text'
                        name="email"
                        value={formData.email}
                        placeholder='Enter your email'
                        onChange={handleChange}
                        className='bg-cyan-950' />
                </div>
                <div className='grid grid-cols-2 '>
                    <label>Password</label>
                    <input type='password'
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Enter your password'
                        className='bg-cyan-950' />
                </div >
                <button type='submit'
                    className='bg-cyan-950 cursor-pointer' >
                    Sign in
                </button>


            </form >
            {mode === "signup" ?
                <button className='text-2xl' onClick={() => setMode("signin")}>Already registered? Login here</button>
                :
                <button className='text-2xl' onClick={() => setMode("signup")}>Register a new account here</button>
            }
        </div >
    )
}

export default Sign