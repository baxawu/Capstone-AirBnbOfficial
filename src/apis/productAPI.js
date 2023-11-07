import fetcher from "./fetcher";

export async function getDetails(id){
    try {
        const response= await fetcher.get(`/api/phong-thue/${id}`, {
        })

        return response.data.content
    } catch (error) {
        throw error.response.data.content
    }
}

export const datPhong= async (payload) => {
    try {
        const response = await fetcher.post("/api/dat-phong", payload)
        return response.data.content
    } catch (error) {
        throw error.response.data?.content
    }
}
export async function getphong(id){
    try {
        const response= await fetcher.get(`/api/dat-phong/${id}`, {
        })

        return response.data.content
    } catch (error) {
        throw error.response.data.content
    }
}
