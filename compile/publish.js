const path = require('path');
const AutoPrefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const result = {};
const px2rem = require('postcss-px2rem');
/**
 * 此处有bug，issue https://github.com/songsiqi/px2rem/issues/2
 *
 * 折中解法，把标识前面加`!`，/*! 开头的注释是webpack关键字：https://github.com/webpack/less-loader#usage
 *
 */
const px2remConfigs = {
    remUnit: 37.5,
    forcePxComment: '!px',
    keepComment: '!no',
    baseDpr: 1
};
/**
 * 配置启动文件地址
 * @type {*|Promise.<*>}
 */
result.entry = {
    'index': [path.resolve(__dirname, '../src/publish/index')]
};
/**
 * 配置输出文件地址和输出文件模式
 * @type {{path: (*|Promise.<*>), filename: string, libraryTarget: string}}
 */
result.output = {
    path: './publish',
    filename: '[name].js'
};

result.module = {};

/**
 * 配置loaders
 * @type {*[]}
 */
result.module.loaders = [
    { test: /\.js|\.jsx$/, exclude: /node_modules/, loader: "babel" },
    { test: /\.css$/, loader: "style!css!postcss" },
    { test: /\.scss$/, loader: "style!css!postcss!sass" },
    { test: /\.vue$/, exclude: /node_modules/, loader: "vue-loader" }
];
/**
 * autoprefix
 * @returns {*[]}
 */
result.postcss = () => {
    return [
        px2rem(px2remConfigs),
        AutoPrefixer({browsers: ['last 20 versions']})
    ];
};

result.vue = {
    postcss: [
        px2rem(px2remConfigs),
        AutoPrefixer({browsers: ['last 20 versions']})
    ]
};

result.plugins = [];
result.plugins.push(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/publish/index.html'),
    filename: './index.html'
}));


module.exports = result;
