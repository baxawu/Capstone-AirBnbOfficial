import fetcher from "./fetcher"


export const signin= async (payload) => {
    try {
        const response = await fetcher.post("/api/auth/signin", payload)
        return response.data.content
    } catch (error) {
        throw error.response.data?.content
    }
}

export const signup= async (payload) => {
    try {
        const response = await fetcher.post("/api/auth/signup", payload)
        return response.data.content
    } catch (error) {
        throw error.response.data?.content
    }
}


export const getuser= async (payload) => {
    try {
        const response = await fetcher.post("/user", payload)
        return response.data.content
    } catch (error) {
        throw error.response.data?.content
    }
}
