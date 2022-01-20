import cvService from '../services/cvService';

let handleCreateNewCV = async (req, res) => {
    try {
        let data = await cvService.handleCreateCv(req.body);
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
    handleCreateNewCV: handleCreateNewCV
}