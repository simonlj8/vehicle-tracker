import axios from "axios";

const API_URL = "http://localhost:8080"

export const getCars = async () => {
    const response = await axios.get(`${API_URL}/cars`);
    return response.data;
}

export const assignCar = async (createIdResolver, driverId) => {
    const response = await axios.post(`${API_URL}/assigments`, {
        carId,
        driverId,
    });

    return response.data;
}