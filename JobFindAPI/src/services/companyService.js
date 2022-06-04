import db from "../models/index";
const cloudinary = require('../utils/cloudinary');

let checkUserPhone = (userPhone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { phonenumber: userPhone }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let handleCreateNewCompany = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.phonenumber || !data.address || !data.thumbnail || !data.coverimage || !data.descriptionHTML || !data.descriptionMarkdown || !data.amountemployer || !data.userId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let thumbnailUrl = ""
                let coverimageUrl = ""
                if (data.thumbnail && data.coverimage) {

                    const uploadedThumbnailResponse = await cloudinary.uploader.upload(data.thumbnail, {
                        upload_preset: 'dev_setups'
                    })
                    const uploadedCoverImageResponse = await cloudinary.uploader.upload(data.coverimage, {
                        upload_preset: 'dev_setups'
                    })
                    thumbnailUrl = uploadedThumbnailResponse.url
                    coverimageUrl = uploadedCoverImageResponse.url
                }


                let company = await db.Company.create({
                    name: data.name,
                    thumbnail: thumbnailUrl,
                    coverimage: coverimageUrl,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    website: data.website,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    amountemployer: data.amountemployer,
                    taxnumber: data.taxnumber
                })
                let user = await db.User.findOne({
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
            if (!data.id || !data.name || !data.phonenumber || !data.address || !data.thumbnail || !data.coverimage || !data.descriptionHTML || !data.descriptionMarkdown || !data.amountemployer) {
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
                    res.descriptionHTML = data.descriptionHTML
                    res.descriptionMarkdown = data.descriptionMarkdown
                    res.website = data.website
                    res.address = data.address
                    res.amountemployer = data.amountemployer
                    res.taxnumber = data.taxnumber
                    res.phonenumber = data.phonenumber
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
            if (!data.phonenumber || !data.companyId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let isExist = await checkUserPhone(data.phonenumber);
                if (isExist === true) {
                    let user = await db.User.findOne({
                        where: {
                            phonenumber: data.phonenumber
                        },
                        raw: false
                    })
                    if(user.roleId != 'EMPLOYER'){
                        resolve({
                            errCode: 1,
                            errMessage: 'Tài khoản không có quyền là nhà tuyển dụng'
                        })
                    }else if(user.company_id >0){
                        resolve({
                            errCode: 3,
                            errMessage: 'Nhân viên đã có công ty'
                        })  
                    }
                    else {
                        user.company_id = data.companyId
                        await user.save()
                        resolve({
                            errCode: 0,
                            errMessage: 'ok'
                        })
                    }
                    
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Số điện thoại không tồn tại !'
                    })
                }


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


                company.postData = await db.Post.findAll({
                    where: { company_id: company.id },
                    order: [['createdAt', 'DESC']],
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
                    data: company,

                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getDetailCompanyByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let user = await db.User.findOne({
                    where: {
                        id: userId
                    }
                })
                let company = await db.Company.findOne({
                    where: { id: user.company_id }
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
let getAllUserByCompanyId = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.limit || !data.offset || !data.companyId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {

                let res = await db.User.findAndCountAll({
                    where: { statusId: 'S1', company_id: data.companyId },
                    limit: +data.limit,
                    offset: +data.offset,
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Allcode, as: 'roleData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'genderData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'statusData', attributes: ['value', 'code'] },
                    ],
                    raw: true,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: res.rows,
                    count: res.count
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let handleQuitCompany = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {


                let user = await db.User.findOne({
                    where: {
                        id: data.userId
                    },
                    raw: false
                })
                if (user) {
                    user.company_id = null
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
module.exports = {
    handleCreateNewCompany: handleCreateNewCompany,
    handleUpdateCompany: handleUpdateCompany,
    handleDeleteCompany: handleDeleteCompany,
    handleAddUserCompany: handleAddUserCompany,
    getListCompany: getListCompany,
    getDetailCompanyById: getDetailCompanyById,
    getDetailCompanyByUserId: getDetailCompanyByUserId,
    getAllUserByCompanyId: getAllUserByCompanyId,
    handleQuitCompany: handleQuitCompany
}