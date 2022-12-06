const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: "./index.html"
        }),
        new CopyPlugin({
            patterns: [
                {from: "src/templates/auth", to: "templates"},
                {from: "index.css", to: "styles"},
                {from: "src/static/images", to: "images"},
            ],
        }),
    ],
};