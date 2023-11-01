
import axios from "axios";
import { API_URL } from "./API_URL";

export const photoUpload = (e) => {
    
    let token = localStorage.getItem('authToken')

    const uploadData = new FormData();

    uploadData.append("image", e.target.files[0]);

    return axios.post(`${API_URL}/new-photo`, uploadData, {
        headers: { Authorization: `Bearer ${token}` }
    })

}