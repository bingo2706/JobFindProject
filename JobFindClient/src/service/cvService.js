import axios from "../axios";


//==================CV==========================//
const createNewCv = (data) => {
    return axios.post(`/api/create-new-cv`,data)

}

export {
    createNewCv
}