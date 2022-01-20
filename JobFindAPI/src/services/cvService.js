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

module.exports = {
    handleCreateCv: handleCreateCv
}