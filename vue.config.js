const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html',
        }
    },
    chainWebpack: config => {
      config.resolve.alias
        .set('@', resolve('./examples'))
        .set('@components', resolve('./components'))
        .set('@templates', resolve('./examples/templates'));
    },
    devServer: {
        overlay: {
            "warnings": false,
            "errors": false
        }
    }
};
