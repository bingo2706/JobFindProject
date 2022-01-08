import express from "express";
import userController from '../controllers/userController';
import allcodeController from '../controllers/allcodeController';
import companyController from '../controllers/companyController';
let router = express.Router();

let initWebRoutes = (app) => {

    //=====================API USER==========================//
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/update-user', userController.handleUpdateUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.post('/api/login', userController.handleLogin)
    router.post('/api/changepassword', userController.handleChangePassword)
    router.get('/api/get-all-user', userController.getAllUser)
    router.get('/api/get-detail-user-by-id', userController.getDetailUserById)

    //===================API ALLCODE========================//
    router.post('/api/create-new-all-code', allcodeController.handleCreateNewAllCode)
    router.put('/api/update-all-code', allcodeController.handleUpdateAllCode)
    router.delete('/api/delete-all-code', allcodeController.handleDeleteAllCode)
    router.get('/api/get-all-code', allcodeController.getAllCodeService)
    router.get('/api/get-list-allcode', allcodeController.getListAllCodeService)
    router.get('/api/get-detail-all-code-by-id', allcodeController.getDetailAllCodeById)

    //==================API COMPANY=========================//
    router.post('/api/create-new-company', companyController.handleCreateNewCompany)
    router.put('/api/update-company', companyController.handleUpdateCompany)
    router.delete('/api/delete-company', companyController.handleDeleteCompany)
    return app.use("/", router);
}

module.exports = initWebRoutes;