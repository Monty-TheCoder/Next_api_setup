// basic strct for the base api which you can use when ever you can add
import { getAppToken } from "@/utils/getToken";
import { getUserId, getAuthToken } from "./getAuthToken";
const baseUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;
const customFetch = async (url: string, options: RequestInit = {}): Promise<any> => {
    const authToken = await getAuthToken();
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${authToken}`
    };
    const response = await fetch(`${baseUrl}${url}`, {
        ...options,
        headers,
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} : ${response.statusText}`);
    }
    const jsonResponse = await response.json();
    return jsonResponse;
};
export const get = async (url: string, options: RequestInit = {}): Promise<any> => {// this is the get method
    return customFetch(url, { ...options, method: 'GET' });
};
export const post = async (url: string, body: any, options: RequestInit = {}): Promise<any> => {// this is the post method
    const app_token = getAppToken();
    const userId = await getUserId();

    return customFetch(url, {
        ...options,
        method: 'POST',
        body: JSON.stringify({
            ...body,
            app_token: app_token || "",
            user_id: userId || ""
        }),
        headers: {
            ...options.headers,
            'Content-Type': 'application/json',
        }
    });
};

export default customFetch;

