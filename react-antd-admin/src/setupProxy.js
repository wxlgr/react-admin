
//代理配置文件，解决跨域问题

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3030',
      changeOrigin: true,
    })
  );
  
  app.use(
    '/upload',
    createProxyMiddleware({
      target: 'http://localhost:3030',
      changeOrigin: true,
    })
  );
};