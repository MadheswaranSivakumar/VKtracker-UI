import axios from "axios";
const API_URL = 'http://127.0.0.1:5000/api'

export const getCaseLog = async (payload) => {
    try {

        console.log("Input_payload - ",payload)

        const apiResponse = await axios.post(
            `${API_URL}/dashboard/allClientCaseLog`,
            payload,
            { headers: {}}
        )
        console.log(apiResponse, 'ress')
        return apiResponse
    } catch (err) {
        return err.response
    }
}