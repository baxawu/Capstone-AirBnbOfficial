import fetcher from "./fetcher";

export async function getComment(maphong){
    try {
        const response= await fetcher.get(`/api/binh-luan/lay-binh-luan-theo-phong/${maphong}`)

        return response.data.content
    } catch (error) {
        throw error.response.data.content
    }
}
