"use server"

import { cookies } from "next/headers";

export const getAuthToken = async () => {
    const token = cookies().get('token')?.value
    return token;
}

export const getUserId = async () => {
    const id = cookies().get('userId')?.value
    return id;
}
