import fetcher from "./fetcher";

export async function searchNearBy(){
    try {
        const response= await fetcher.get("/api/phong-thue/phan-trang-tim-kiem", {
            params: {
                pageIndex:1,
                pageSize:8,
                
            }
        })

        return response.data.content
    } catch (error) {
        throw error.response.data.content
    }
}
