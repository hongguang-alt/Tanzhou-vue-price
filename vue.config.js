module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000/api',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}