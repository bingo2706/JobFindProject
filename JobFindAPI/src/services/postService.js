import db from "../models/index";


let handleCreateNewPost = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.category_job_id || !data.address_id || !data.salary_job_id || !data.amount || !data.time_end || !data.category_joblevel_id || !data.companyId
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
                    address_id: data.address_id,
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
            if (!data.name || !data.category_job_id || !data.address_id || !data.salary_job_id || !data.amount || !data.time_end || !data.category_joblevel_id
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
                    post.address_id = data.address_id
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
let handleActivePost = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing required parameters !`
                })
            } else {
                let foundPost = await db.Post.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (foundPost) {
                    foundPost.statusId = 'S1'
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
                    where: { company_id: data.companyId },
                    include: [
                        { model: db.Allcode, as: 'jobTypeData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'workTypeData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'salaryTypeData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'jobLevelData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'expTypeData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'genderPostData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'statusPostData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'provinceData', attributes: ['value', 'code'] },
                    ],
                    raw: true,
                    nest: true
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
let getDetailPostById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {

                let post = await db.Post.findOne({
                    where: { id: id, statusId: 'S1' },
                    include: [
                        { model: db.Allcode, as: 'jobTypeData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'workTypeData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'salaryTypeData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'jobLevelData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'expTypeData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'genderPostData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'statusPostData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'provinceData', attributes: ['value', 'code'] },
                    ],
                    raw: true,
                    nest: true
                })
                let company = await db.Company.findOne({
                    where: { id: post.company_id }
                })
                post.companyData = company
                resolve({
                    errCode: 0,
                    data: post,
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getFilterPost = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let objectFilter = {
                where: { statusId: 'S1' },
                include: [
                    { model: db.Allcode, as: 'jobTypeData', attributes: ['value', 'code'] },
                    { model: db.Allcode, as: 'workTypeData', attributes: ['value', 'code'] },
                    { model: db.Allcode, as: 'salaryTypeData', attributes: ['value', 'code'] },
                    { model: db.Allcode, as: 'jobLevelData', attributes: ['value', 'code'] },
                    { model: db.Allcode, as: 'expTypeData', attributes: ['value', 'code'] },
                    { model: db.Allcode, as: 'genderPostData', attributes: ['value', 'code'] },
                    { model: db.Allcode, as: 'statusPostData', attributes: ['value', 'code'] },
                    { model: db.Allcode, as: 'provinceData', attributes: ['value', 'code'] },
                ],
                order: [["createdAt", "ASC"]],
                raw: true,
                nest: true
            }
            if (data.limit && data.offset) {
                objectFilter.limit = +data.limit
                objectFilter.offset = +data.offset
            }
            if (data.category_job_id && data.category_job_id !== 'ALL') objectFilter.where = { category_job_id: data.category_job_id }
            if (data.address_id && data.address_id !== 'ALL') objectFilter.where = { ...objectFilter.where, address_id: data.address_id }
            if (data.salary_job_id && data.salary_job_id !== 'ALL') objectFilter.where = { ...objectFilter.where, salary_job_id: data.salary_job_id }
            if (data.category_joblevel_id && data.category_joblevel_id !== 'ALL') objectFilter.where = { ...objectFilter.where, category_joblevel_id: data.category_joblevel_id }
            if (data.category_worktype_id && data.category_worktype_id !== 'ALL') objectFilter.where = { ...objectFilter.where, category_worktype_id: data.category_worktype_id }
            if (data.experience_job_id && data.experience_job_id !== 'ALL') objectFilter.where = { ...objectFilter.where, experience_job_id: data.experience_job_id }
            if (data.sortName === "true") objectFilter.order = [["name", "ASC"]]

            let res = await db.Post.findAndCountAll(objectFilter)

            for (let i = 0; i < res.rows.length; i++) {
                res.rows[i].company = await db.Company.findOne({ where: { id: res.rows[i].company_id } })
            }

            resolve({
                errCode: 0,
                data: res.rows,
                count: res.count
            })


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
    getDetailPostById: getDetailPostById,
    handleActivePost: handleActivePost,
    getFilterPost: getFilterPost
}