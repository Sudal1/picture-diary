module.exports = {
    devServer: {
        hot: true,
        proxy: {
            '/app': {
                "target": 'http://nick-space.site'
            }
        }
    }
}