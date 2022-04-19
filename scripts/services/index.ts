import ServiceCall from "@smartface/extension-utils/lib/service-call"
import axios from "axios"

export const scDogPic = new ServiceCall({
    baseUrl: "https://dog.ceo",
    logEnabled: true,
    headers: {
        apiVersion: "1.0"
    }
})

export const axiosCaller = axios.create({
    baseURL: "https://dog.ceo"
})