import db from "../models/index";
import bcrypt from "bcryptjs";
const cloudinary = require('../utils/cloudinary');
const salt = bcrypt.genSaltSync(10);

let hashUserPasswordFromBcrypt = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error)
        }
    })
}
let checkUserPhone = (userPhone) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userPhone) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            } else {
                let user = await db.User.findOne({
                    where: { phonenumber: userPhone }
                })
                if (user) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }


        } catch (error) {
            reject(error)
        }
    })
}
let handleCreateNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.phonenumber || !data.lastName || !data.firstName || !data.password) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let check = await checkUserPhone(data.phonenumber);
                if (check === true) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Số điện thoại đã tồn tại !'
                    })
                } else {
                    let imageUrl = ""
                    let hashPassword = await hashUserPasswordFromBcrypt(data.password);
                    if (data.image) {
                        const uploadedResponse = await cloudinary.uploader.upload(data.image, {
                            upload_preset: 'dev_setups'
                        })
                        imageUrl = uploadedResponse.url
                    }
                    await db.User.create({
                        password: hashPassword,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        roleId: data.roleId,
                        genderId: data.genderId,
                        phonenumber: data.phonenumber,
                        image: imageUrl,
                        dob: data.dob,
                        statusId: 'S1',

                    })
                    resolve({
                        errCode: 0,
                        message: 'OK'
                    })
                }

            }

        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!userId) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing required parameters !`
                })
            } else {
                let foundUser = await db.User.findOne({
                    where: { id: userId }
                })
                if (!foundUser) {
                    resolve({
                        errCode: 2,
                        errMessage: `The user isn't exist`
                    })
                }
                await db.User.destroy({
                    where: { id: userId }
                })
                resolve({
                    errCode: 0,
                    message: `The user is deleted`
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: `Missing required parameters`
                })
            } else {
                let user = await db.User.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (user) {
                    user.firstName = data.firstName
                    user.lastName = data.lastName
                    user.address = data.address
                    user.roleId = data.roleId
                    user.genderId = data.genderId
                    user.dob = data.dob
                    if (data.image) {
                        let imageUrl = ""
                        const uploadedResponse = await cloudinary.uploader.upload(data.image, {
                            upload_preset: 'dev_setups'
                        })
                        imageUrl = uploadedResponse.url
                        user.image = imageUrl
                    }
                    await user.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Update the user succeeds!'
                    })
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: 'User not found!'
                    })
                }
            }

        } catch (error) {
            reject(error)
        }
    })
}
let handleLogin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.phonenumber || !data.password) {
                resolve({
                    errCode: 4,
                    errMessage: 'Missing required parameters!'
                })
            }
            else {
                let userData = {};

                let isExist = await checkUserPhone(data.phonenumber);

                if (isExist === true) {
                    let user = await db.User.findOne({
                        attributes: ['phonenumber', 'roleId', 'password', 'firstName', 'lastName', 'id', 'image', 'company_id'],
                        where: { phonenumber: data.phonenumber, statusId: 'S1' },
                        raw: true
                    })
                    if (user) {
                        let check = await bcrypt.compareSync(data.password, user.password);
                        if (check) {
                            userData.errCode = 0;
                            userData.errMessage = 'Ok';

                            delete user.password;
                            userData.user = user;
                        } else {
                            userData.errCode = 3;
                            userData.errMessage = 'Số điện thoại hoặc mật khẩu không chính xác';
                        }
                    } else {
                        userData.errCode = 2;
                        userData.errMessage = 'User not found!'
                    }
                } else {
                    userData.errCode = 1;
                    userData.errMessage = `Số điện thoại hoặc mật khẩu không chính xác`
                }
                resolve(userData)
            }


        } catch (error) {
            reject(error)
        }
    })
}
let handleChangePassword = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.password || !data.oldpassword) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let user = await db.User.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (await bcrypt.compareSync(data.oldpassword, user.password)) {
                    if (user) {
                        user.password = await hashUserPasswordFromBcrypt(data.password);
                        await user.save();
                    }
                    resolve({
                        errCode: 0,
                        errMessage: 'ok'
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Mật khẩu cũ không chính xác'
                    })
                }

            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.limit || !data.offset) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {

                let res = await db.User.findAndCountAll({
                    where: { statusId: 'S1' },
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
let getDetailUserById = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userid) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            } else {
                let res = await db.User.findOne({
                    where: { id: userid, statusId: 'S1' },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Allcode, as: 'roleData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'genderData', attributes: ['value', 'code'] },
                    ],
                    raw: true,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: res
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    handleCreateNewUser: handleCreateNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    handleLogin: handleLogin,
    handleChangePassword: handleChangePassword,
    getAllUser: getAllUser,
    getDetailUserById: getDetailUserById,
    checkUserPhone: checkUserPhone
}