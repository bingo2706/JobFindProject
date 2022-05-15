import db from "../models/index";

let handleCreateCv = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.user_id || !data.file || !data.post_id || !data.description) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                await db.Cv.create({
                    user_id: data.user_id,
                    file: data.file,
                    post_id: data.post_id,
                    isChecked: 0,
                    description: data.description
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
let getAllListCvByPost = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.postId || !data.limit || !data.offset) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let cv = await db.Cv.findAndCountAll({
                    where: { post_id: data.postId },
                    limit: +data.limit,
                    offset: +data.offset,
                    raw: true,
                    attributes: {
                        exclude: ['file']
                    },
                })
                for (let i = 0; i < cv.rows.length; i++) {
                    cv.rows[i].userData = await db.User.findOne({
                        where: { id: cv.rows[i].user_id }
                    })
                    if (cv.rows[i].isChecked == 1) {
                        cv.rows[i].isChecked == true
                    } else cv.rows[i].isChecked == false
                }
                resolve({
                    errCode: 0,
                    data: cv.rows,
                    count: cv.count
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getDetailCvById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.cvId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let cv = await db.Cv.findOne({
                    where: { id: data.cvId },
                    raw: false
                })
                let userData = await db.User.findOne({ where: { id: cv.user_id } })
                cv.isChecked = 1

                if (cv.file) {
                    cv.file = new Buffer(cv.file, 'base64').toString('binary');
                }

                await cv.save()

                resolve({
                    errCode: 0,
                    data: cv,
                    userData: userData
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllCvByUserId = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId || !data.limit || !data.offset) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let cv = await db.Cv.findAndCountAll({
                    where: { user_id: data.userId },
                    limit: +data.limit,
                    offset: +data.offset,
                    raw: true,
                })
                for (let i = 0; i < cv.rows.length; i++) {
                    cv.rows[i].postData = await db.Post.findOne({
                        where: { id: cv.rows[i].post_id },
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
                }
                resolve({
                    errCode: 0,
                    data: cv.rows,
                    count: cv.count
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleCreateCv: handleCreateCv,
    getAllListCvByPost: getAllListCvByPost,
    getDetailCvById: getDetailCvById,
    getAllCvByUserId: getAllCvByUserId
}