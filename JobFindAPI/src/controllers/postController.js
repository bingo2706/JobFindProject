import postService from '../services/postService';

let handleCreateNewPost = async (req, res) => {
    try {
        let data = await postService.handleCreateNewPost(req.body);
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
    handleCreateNewPost: handleCreateNewPost
}