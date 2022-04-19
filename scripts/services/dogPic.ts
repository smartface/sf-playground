import { AxiosResponse } from "axios";
import { axiosCaller, scDogPic } from ".";

export type dogApiData = {
    message: string; // contains the url of a random dog pic
    status: string;
}

export async function getDogPic(): Promise<dogApiData> {
    try {
        const response: dogApiData = await scDogPic.request('/api/breeds/image/random', {
            method: "GET"
        });
        return response;

    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getDogPicWithAxios(): Promise<dogApiData> {
    try {
        const response: AxiosResponse<dogApiData> = await axiosCaller.get('/api/breeds/image/random');
        return response.data;

    } catch (err) {
        console.error(err);
        throw err;
    }
}