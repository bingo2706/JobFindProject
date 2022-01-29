import db from "../models/index";
const cloudinary = require('../utils/cloudinary');
const { Op, and } = require("sequelize");
let handleCreateNewAllCode = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.type || !data.value || !data.code) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {

                let res = await db.Allcode.findOne({
                    where: { code: data.code }
                })

                if (res) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Mã code đã tồn tại !'
                    })
                } else {
                    let imageUrl = ""
                    if (data.image) {
                        const uploadedResponse = await cloudinary.uploader.upload(data.image, {
                            upload_preset: 'dev_setups'
                        })
                        imageUrl = uploadedResponse.url
                    }
                    await db.Allcode.create({
                        type: data.type,
                        value: data.value,
                        code: data.code,
                        image: imageUrl
                    })
                }

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
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {

                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                })
                resolve({
                    errCode: 0,
                    data: allcode
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let handleUpdateAllCode = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.value || !data.code || !data.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let res = await db.Allcode.findOne({
                    where: {
                        id: data.id
                    },
                    raw: false
                })
                if (res) {
                    let imageUrl = ""
                    if (data.image) {
                        const uploadedResponse = await cloudinary.uploader.upload(data.image, {
                            upload_preset: 'dev_setups'
                        })
                        imageUrl = uploadedResponse.url
                        res.image = imageUrl
                    }
                    res.value = data.value
                    res.code = data.code
                    await res.save();
                }
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
let getDetailAllCodeById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let data = await db.Allcode.findOne({
                    where: { id: id }
                })
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let handleDeleteAllCode = (allcodeId) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!allcodeId) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing required parameters !`
                })
            } else {
                let foundAllCode = await db.Allcode.findOne({
                    where: { id: allcodeId }
                })
                if (!foundAllCode) {
                    resolve({
                        errCode: 2,
                        errMessage: `The allCode isn't exist`
                    })
                }
                await db.Allcode.destroy({
                    where: { id: allcodeId }
                })
                resolve({
                    errCode: 0,
                    message: `The allCode is deleted`
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let getListAllCodeService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.type || !data.limit || !data.offset) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {

                let allcode = await db.Allcode.findAndCountAll({
                    where: { type: data.type },
                    offset: +data.offset,
                    limit: +data.limit
                })
                resolve({
                    errCode: 0,
                    data: allcode.rows,
                    count: allcode.count
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getListJobTypeAndCountPost = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = await db.Post.findAll({
                where: {
                    statusId: 'S1'
                },
                include: [
                    { model: db.Allcode, as: 'jobTypeData', attributes: ['value', 'code', 'image'] },
                ],
                attributes: ['category_job_id', [db.sequelize.fn('COUNT', db.sequelize.col('category_job_id')), 'amount']],
                group: ['category_job_id'],
                order: [["amount", "ASC"]],
                limit: +data.limit,
                offset: +data.offset,
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: res
            })
        }
        catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleCreateNewAllCode: handleCreateNewAllCode,
    getAllCodeService: getAllCodeService,
    handleUpdateAllCode: handleUpdateAllCode,
    getDetailAllCodeById: getDetailAllCodeById,
    handleDeleteAllCode: handleDeleteAllCode,
    getListAllCodeService: getListAllCodeService,
    getListJobTypeAndCountPost: getListJobTypeAndCountPost
}