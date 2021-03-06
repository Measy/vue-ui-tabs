const path = require('path');
const AutoPrefixer = require('autoprefixer');
const webpack = require('webpack');
const px2rem = require('postcss-px2rem');
const px2remConfigs = {
    remUnit: 37.5,
    forcePxComment: '!px',
    keepComment: '!no',
    baseDpr: 1
};
const result = {};
/**
 * 配置启动文件地址
 * @type {*|Promise.<*>}
 */
result.entry = {
    'index': [path.resolve(__dirname, '../src/index')]
};
/**
 * 配置输出文件地址和输出文件模式
 * @type {{path: (*|Promise.<*>), filename: string, libraryTarget: string}}
 */
result.output = {
    path: './build',
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

module.exports = result;
