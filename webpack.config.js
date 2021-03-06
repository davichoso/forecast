var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
                        ]
                    }
                }
            }
            , {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
              },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
}