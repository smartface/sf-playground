import ServiceCall from "@smartface/extension-utils/lib/service-call"

export const scDogPic = new ServiceCall({
    baseUrl: "https://dog.ceo",
    logEnabled: true,
    headers: {
        apiVersion: "1.0"
    }
})