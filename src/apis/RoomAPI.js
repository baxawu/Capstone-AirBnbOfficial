import fetcher from "./fetcher";

export async function getComeRooms(comeId) {
    try {
        const response = await fetcher.get("/api/dat-phong", {
            params: {
                ngayDen: comeId
            }
        });
        return response.data.content;

    } catch (error) {
        throw error.response.data.content;
    }
}

export async function getLeaveRooms(leaveId) {
    try {
        const response = await fetcher.get("/api/dat-phong", {
            params: {
                ngayDi: leaveId
            }
        });
        return response.data.content;

    } catch (error) {
        throw error.response.data.content;
    }
}


export async function getRooms() {
    try {
        const response = await fetcher.get("/api/dat-phong", {
            params: {
                id: "",
            }
        })
        return response.data.content
    } catch (error) {
        throw error.response.data.content;
    };
}
