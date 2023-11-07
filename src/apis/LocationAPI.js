import fetcher from "./fetcher";

export async function getLocation(){
    try {
        const response= await fetcher.get("/api/vi-tri")

        return response.data.content
    } catch (error) {
        throw error.response.data.content
    }
}

export async function getComeDate(){
    try {
        const response= await fetcher.get("/api/dat-phong")
        console.log('response',response);

        return response.data.content
    } catch (error) {
        throw error.response.data.content
    }
}

export async function getLeaveDate(){
    try {
        const response= await fetcher.get("/api/dat-phong")
        return response.data.content
    } catch (error) {
        throw error.response.data.content
    }
}

export async function getPeople(){
    try {
        const response= await fetcher.get("/api/dat-phong")
        return response.data.content
    } catch (error) {
        throw error.response.data.content
    }
}

export async function getLocationFind(){
    try {
        const response= await fetcher.get("/api/vi-tri/phan-trang-tim-kiem")
        return response.data.content
    } catch (error) {
        throw error.response.data.content
    }
}









