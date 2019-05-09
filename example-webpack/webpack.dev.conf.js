const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.js')

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 8081,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: 'css.map'
        })
    ]
})

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
})
