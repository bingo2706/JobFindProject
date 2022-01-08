import companyService from '../services/companyService';

let handleCreateNewCompany = async (req, res) => {
    try {
        let data = await companyService.handleCreateNewCompany(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let handleUpdateCompany = async (req, res) => {
    try {
        let data = await companyService.handleUpdateCompany(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let handleDeleteCompany = async (req, res) => {
    try {
        let data = await companyService.handleDeleteCompany(req.body.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
module.exports = {
    handleCreateNewCompany: handleCreateNewCompany,
    handleDeleteCompany: handleDeleteCompany,
    handleUpdateCompany: handleUpdateCompany

}