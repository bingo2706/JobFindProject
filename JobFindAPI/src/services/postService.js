import db from "../models/index";


let handleCreateNewPost = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.category_job_id || !data.address || !data.salary_job_id || !data.amount || !data.time_end || !data.category_joblevel_id || !data.companyId
                || !data.category_worktype_id || !data.experience_job_id || !data.genderId || !data.descriptionHTML || !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                await db.Post.create({
                    name: data.name,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    statusId: "S1",
                    category_job_id: data.category_job_id,
                    address: data.address,
                    salary_job_id: data.salary_job_id,
                    amount: data.amount,
                    time_end: data.time_end,
                    category_joblevel_id: data.category_joblevel_id,
                    category_worktype_id: data.category_worktype_id,
                    experience_job_id: data.experience_job_id,
                    genderPostCode: data.genderId,
                    company_id: data.companyId
                })

                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let handleUpdatePost = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.category_job_id || !data.address || !data.salary_job_id || !data.amount || !data.time_end || !data.category_joblevel_id
                || !data.category_worktype_id || !data.experience_job_id || !data.genderId || !data.descriptionHTML || !data.descriptionMarkdown || !data.id
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let post = await db.Post.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (post) {
                    post.name = data.name
                    post.category_job_id = data.category_job_id
                    post.address = data.address
                    post.salary_job_id = data.salary_job_id
                    post.amount = data.amount
                    post.time_end = data.time_end
                    post.category_joblevel_id = data.category_joblevel_id
                    post.category_worktype_id = data.category_worktype_id
                    post.experience_job_id = data.experience_job_id
                    post.genderPostCode = data.genderId
                    post.descriptionHTML = data.descriptionHTML
                    post.descriptionMarkdown = data.descriptionMarkdown

                    await post.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'ok'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Bài đăng không tồn tại !'
                    })
                }





            }
        } catch (error) {
            reject(error)
        }
    })
}
let handleBanPost = (postId) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!postId) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing required parameters !`
                })
            } else {
                let foundPost = await db.Post.findOne({
                    where: { id: postId },
                    raw: false
                })
                if (foundPost) {
                    foundPost.statusId = 'S2'
                    await foundPost.save()
                    resolve({
                        errCode: 0,
                        message: 'ok'
                    })
                }
            }

        } catch (error) {
            reject(error)
        }
    })
}
let getListPostByAdmin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.limit || !data.offset || !data.companyId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {

                let post = await db.Post.findAndCountAll({
                    offset: +data.offset,
                    limit: +data.limit,
                    where: { company_id: data.companyId, statusId: 'S1' }
                })
                resolve({
                    errCode: 0,
                    data: post.rows,
                    count: post.count
                })
            }
        } catch (error) {
            reject(error)
        }
    })


}

let getDetailPost = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.post_id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {

                let post = await db.Post.findOne({
                    where: { id: data.postId, statusId: 'S1' },
                    raw: false
                })
                let company = await db.Company.findOne({
                    where: {id: post.company_id},
                    raw: false
                })
                resolve({
                    errCode: 0,
                    post: post,
                    company: company
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleCreateNewPost: handleCreateNewPost,
    handleUpdatePost: handleUpdatePost,
    handleBanPost: handleBanPost,
    getListPostByAdmin: getListPostByAdmin,
    getDetailPost : getDetailPost
}