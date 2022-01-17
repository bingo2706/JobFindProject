import db from "../models/index";
const cloudinary = require('../utils/cloudinary');

let handleCreateNewPost = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.category_job_code || !data.address || !data.salary || !data.amount || !data.time_end || !data.category_joblevel_code || !data.userId
                || !data.category_worktype_id || !data.experience || !data.genderPostCode || !data.descriptionHTML || !data.descriptionMarkdown
            ) {
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

module.exports = {
    handleCreateNewPost: handleCreateNewPost
}