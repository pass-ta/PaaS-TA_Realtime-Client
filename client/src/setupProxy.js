const { createProxyMiddleware } = require('http-proxy-middleware')
const { createDispatchHook } = require('react-redux')

module.export = function(app) {
    app.use(
        "socket.io",
        createProxyMiddleware({
            target: "https://development--pedantic-einstein-75bdbe.netlify.app/",
            changeOrigin: true

        })
    )
}