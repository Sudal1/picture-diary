module.exports = {
    devServer: {
        hot: true,
        proxy: {
            '/app': {
                "target": 'http://nick-space.site'
            },
            '/predict': {
                "target": 'http://localhost:5000',
                changeOrigin: true
            }
        },
        headers: { 'Access-Control-Allow-Origin': '*' }
    }
}