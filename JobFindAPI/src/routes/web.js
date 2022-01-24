import express from "express";
import userController from '../controllers/userController';
import allcodeController from '../controllers/allcodeController';
import companyController from '../controllers/companyController';
import postController from '../controllers/postController';
import cvController from '../controllers/cvController'
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
    router.delete('/api/check-phonenumber-user', userController.checkUserPhone)

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
    router.put('/api/add-user-company', companyController.handleAddUserCompany)
    router.get('/api/get-list-company', companyController.getListCompany)
    router.get('/api/get-detail-company-by-id', companyController.getDetailCompanyById)
    router.get('/api/get-detail-company-by-userId', companyController.getDetailCompanyByUserId)
    router.get('/api/get-all-user-by-company_id', companyController.getAllUserByCompanyId)
    router.put('/api/quit-company', companyController.handleQuitCompany)

    //==================API CV==========================//
    router.post('/api/create-new-cv', cvController.handleCreateNewCV)



    //==================API POST==========================//
    router.post('/api/create-new-post', postController.handleCreateNewPost)
    router.put('/api/update-post', postController.handleUpdatePost)
    router.put('/api/active-post', postController.handleActivePost)
    router.delete('/api/ban-post', postController.handleBanPost)
    router.get('/api/get-list-post-admin', postController.getListPostByAdmin)
    router.get('/api/get-detail-post-by-id', postController.getDetailPostById)


    return app.use("/", router);

}

module.exports = initWebRoutes;