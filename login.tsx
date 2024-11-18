//call the api with post method when you need and pass the data

export const login = async (loginData: ILogin) => {
    try {
        const res = await post('/login', loginData);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error("Unable to fetch  . " + error);
    }
}
