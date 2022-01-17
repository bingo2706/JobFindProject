import db from "../models/index";
const cloudinary = require('../utils/cloudinary');
let handleCreateNewCompany = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.phonenumber || !data.address || !data.thumbnail || !data.coverimage || !data.description || !data.amountemployer || !data.userId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                if (data.thumbnail && data.coverimage) {
                    let thumbnailUrl = ""
                    let coverimageUrl = ""
                    const uploadedThumbnailResponse = await cloudinary.uploader.upload(data.thumbnail, {
                        upload_preset: 'dev_setups'
                    })
                    const uploadedCoverImageResponse = await cloudinary.uploader.upload(data.coverimage, {
                        upload_preset: 'dev_setups'
                    })
                    thumbnailUrl = uploadedThumbnailResponse.url
                    coverimageUrl = uploadedCoverImageResponse.url
                }


                let company = await db.Company.findOne({
                    name: data.name,
                    thumbnail: thumbnailUrl,
                    coverimage: coverimageUrl,
                    description: data.description,
                    website: data.website,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    amountemployer: data.amountemployer,
                    taxnumber: data.taxnumber
                })
                let user = await db.User.find({
                    where: { id: data.userId },
                    raw: false
                })
                if (user) {
                    user.company_id = company.id
                    await user.save()
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
let handleUpdateCompany = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.phonenumber || !data.address || !data.thumbnail || !data.coverimage || !data.description || !data.amountemployer) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let res = await db.Company.findOne({
                    where: {
                        id: data.id
                    },
                    raw: false
                })
                if (res) {
                    if (data.thumbnail) {
                        let thumbnailUrl = ""
                        const uploadedThumbnailResponse = await cloudinary.uploader.upload(data.thumbnail, {
                            upload_preset: 'dev_setups'
                        })
                        thumbnailUrl = uploadedThumbnailResponse.url
                        res.thumbnail = thumbnailUrl
                    }
                    if (data.coverimage) {
                        let coverImageUrl = ""
                        const uploadedcoverImageResponse = await cloudinary.uploader.upload(data.coverimage, {
                            upload_preset: 'dev_setups'
                        })
                        coverImageUrl = uploadedcoverImageResponse.url
                        res.coverimage = coverImageUrl
                    }

                    res.name = data.name
                    res.thumbnail = data.thumbnail
                    res.coverimage = data.coverimage
                    res.description = data.description
                    res.website = data.website
                    res.address = data.address
                    res.amountemployer = data.amountemployer
                    res.taxnumber = data.taxnumber
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
let handleDeleteCompany = (companyId) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!companyId) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing required parameters !`
                })
            } else {
                let foundCompany = await db.Company.findOne({
                    where: { id: companyId }
                })
                if (!foundCompany) {
                    resolve({
                        errCode: 2,
                        errMessage: `The company isn't exist`
                    })
                }
                await db.Company.destroy({
                    where: { id: companyId }
                })
                resolve({
                    errCode: 0,
                    message: `The company is deleted`
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let handleAddUserCompany = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId || !data.companyId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let user = await db.User.findOne({
                    where: {
                        id: data.id
                    },
                    raw: false
                })
                if (user) {
                    user.company_id = data.companyId
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
let getListCompany = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.limit || !data.offset) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {

                let company = await db.Company.findAndCountAll({
                    offset: +data.offset,
                    limit: +data.limit
                })
                resolve({
                    errCode: 0,
                    data: company.rows,
                    count: company.count
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getDetailCompanyById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {

                let company = await db.Company.findOne({
                    where: { id: id }
                })
                let user = await db.User.findOne({
                    where: {
                        company_id: company.id
                    }
                })
                company.postData = await db.Post.findAll({
                    where: { userId: user.id }
                })
                resolve({
                    errCode: 0,
                    data: company,

                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleCreateNewCompany: handleCreateNewCompany,
    handleUpdateCompany: handleUpdateCompany,
    handleDeleteCompany: handleDeleteCompany,
    handleAddUserCompany: handleAddUserCompany,
    getListCompany: getListCompany,
    getDetailCompanyById: getDetailCompanyById
}