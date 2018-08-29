module.exports = {
        ensureAuthenticated: function(req, res, next) {
            if(req.isAuthenticated()) {
                return next()
            }
            return next(new Error('Not allowed'))
        }
}