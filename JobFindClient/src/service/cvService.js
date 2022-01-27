import axios from "../axios";


//==================CV==========================//
const createNewCv = (data) => {
    return axios.post(`/api/create-new-cv`, data)
}
const getAllListCvByPostService = (data) => {
    return axios.get(`/api/get-all-list-cv-by-post?limit=${data.limit}&offset=${data.offset}&postId=${data.postId}`)
}
const getDetailCvService = (id) => {
    return axios.get(`/api/get-detail-cv-by-id?cvId=${id}`)
}
export {
    createNewCv, getAllListCvByPostService, getDetailCvService
}