const postsService = require('../services/posts-service')

class PostController {
    async createPost(req, res, next) {
        try {
            const newPost = await postsService.createPost(req.body, req.user.id)
            res.redirect('/', {user: req.user})
        } catch(err) {
            next(err)
        }
    }
    async getOnePost(req, res, next) {
        try {
            const post = await postsService.getOnePost(req.params.slug)
            console.log(post)
            res.render('post.ejs', {post: post})
        } catch(err) {
            next(err)
        }
    }
}

module.exports = new PostController()