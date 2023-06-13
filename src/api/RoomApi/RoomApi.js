import axios from "axios";

const roomInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/rooms/',
})
export const roomApi = {
    createRoom(name) {
        return roomInstance.post('create',{name}).then(response=>response.data);
    },
    connectToRoom(name,code) {
        return roomInstance.post('connect',{name,code}).then(response=>response.data);
    }
}