import db from "../models/index";

let handleCreateNewCompany = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.phonenumber || !data.address || !data.thumbnail || !data.coverimage || !data.description || !data.amountemployer) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                await db.Company.create({
                    name: data.name,
                    thumbnail: data.thumbnail,
                    coverimage: data.coverimage,
                    description: data.description,
                    website: data.website,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    amountemployer: data.amountemployer,
                    taxnumber: data.taxnumber
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
    handleCreateNewCompany: handleCreateNewCompany
}