import axios from "../axios";


//==================USER==========================//
const getAllUsers = (data) => {
    return axios.get(`/api/get-all-user?limit=${data.limit}&offset=${data.offset}`)

}
const createNewUser = (data) => {
    return axios.post(`/api/create-new-user`, data)

}
const UpdateUserService = (data) => {
    return axios.put(`/api/update-user`, data)

}
const DeleteUserService = (userId) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: userId
        }
    })

}
const checkUserPhoneService = (userPhone) => {
    return axios.delete(`/api/check-phonenumber-user`, {
        data: {
            phonenumber: userPhone
        }
    })

}
const getDetailUserById = (id) => {
    return axios.get(`/api/get-detail-user-by-id?id=${id}`)

}
const handleLoginService = (data) => {
    return axios.post(`/api/login`, data)

}

const handleChangePassword = (data) => {
    return axios.post(`/api/changepassword`, data)
}

//===============ALL CODE========================//
const getAllCodeService = (type) => {
    return axios.get(`/api/get-all-code?type=${type}`)

}
const getListAllCodeService = (data) => {
    return axios.get(`/api/get-list-allcode?type=${data.type}&limit=${data.limit}&offset=${data.offset}`)

}

const getListJobTypeAndCountPost = (data) => {
    return axios.get(`/api/get-list-job-count-post?limit=${data.limit}&offset=${data.offset}`)

}

const createAllCodeService = (data) => {
    return axios.post(`/api/create-new-all-code`, data)

}

const getDetailAllcodeById = (id) => {
    return axios.get(`/api/get-detail-all-code-by-id?id=${id}`)

}
const UpdateAllcodeService = (data) => {
    return axios.put(`/api/update-all-code`, data)

}
const DeleteAllcodeService = (allcodeId) => {
    return axios.delete(`/api/delete-all-code`, {
        data: {
            id: allcodeId
        }
    })
}
//================================== COMPANY ============================
const createCompanyService = (data) => {
    return axios.post(`/api/create-new-company`, data)

}
const getDetailCompanyByUserId = (userId) => {
    return axios.get(`/api/get-detail-company-by-userId?userId=${userId}`)

}
const updateCompanyService = (data) => {
    return axios.put(`/api/update-company`, data)

}
const RecruitmentService = (data) => {
    return axios.put(`/api/add-user-company`, data)

}
const getAllUserByCompanyIdService = (data) => {
    return axios.get(`/api/get-all-user-by-company_id?companyId=${data.companyId}&limit=${data.limit}&offset=${data.offset}`)

}
const QuitCompanyService = (data) => {
    return axios.put(`/api/quit-company`, data)

}

//======================== POST ====================================//

const createPostService = (data) => {
    return axios.post(`/api/create-new-post`, data)

}
const updatePostService = (data) => {
    return axios.put(`/api/update-post`, data)

}
const activePostService = (data) => {
    return axios.put(`/api/active-post`, data)

}
const banPostService = (postId) => {
    return axios.delete(`/api/ban-post`, {
        data: {
            id: postId
        }
    })
}
const getAllPostByAdminService = (data) => {
    return axios.get(`/api/get-list-post-admin?companyId=${data.companyId}&limit=${data.limit}&offset=${data.offset}`)

}
const getDetailPostByIdService = (id) => {
    return axios.get(`/api/get-detail-post-by-id?id=${id}`)
}
const getListPostService = (data) =>{
    return axios.get(`/api/get-filter-post?limit=${data.limit}&offset=${data.offset}&category_job_id=${data.category_job_id}&address_id=${data.address_id}&salary_job_id=${data.salary_job_id}&category_joblevel_id=${data.category_joblevel_id}&category_worktype_id=${data.category_worktype_id}&experience_job_id=${data.experience_job_id}&sortName=${data.sortName}`)
}
export {
    DeleteAllcodeService, UpdateAllcodeService, getDetailAllcodeById, createAllCodeService, getListAllCodeService, getAllCodeService,
    getAllUsers, createNewUser, UpdateUserService, DeleteUserService, getDetailUserById, handleChangePassword, handleLoginService,
    createCompanyService, getDetailCompanyByUserId, updateCompanyService, RecruitmentService, getAllUserByCompanyIdService, QuitCompanyService,
    createPostService, updatePostService, banPostService, getAllPostByAdminService, getDetailPostByIdService, activePostService, checkUserPhoneService,getListPostService,
    getListJobTypeAndCountPost
}