import axios from "axios";
import { BASE_URL } from "@/config"

const url: string = `${BASE_URL}/v1`;
console.log(url)

export const api = axios.create({
    baseURL: url,
    withCredentials: true
})