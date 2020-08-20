const webpack = require("webpack")
const htmlWebpackPlugin = require("html-webpack-plugin")
// 该插件的主要作用是清除前次打包文件。没有hash时，这个插件体现不出来效果
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const happyThreadPool = HappyPack.ThreadPool({
    size: 4
});
var path = require('path')
var dirName = process.cwd()
const svgDirs = [
    //path.resolve(dirname, 'node_modules/antd-mobile/lib')
    require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
    path.resolve(dirname, 'src/common/img/svg'), // 2. 自己私人的 svg 存放目录
    // ...newSvgFiles
];
module.exports = function getConfig(opt,isMobile){
    var isHash = opt.isHash || false,
        jsFilename = "js/index_[name]" + (isHash ? ".[hash:8]" : "") + "_v2.js",
        jsChunkFilename = "js/[name]" + (isHash ? ".[chunkhash:8]" : "") + "_v2.chunk.js",
        cssFilename = "css/[name]" + (isHash ? ".[contenthash:8]" : "") + "_v2.css",
        imgFilename = "images/[name]" + (isHash ? ".[hash:8]" : "") + "_v2.[ext]",
        commonjsFilename = "js/common" + (isHash ? ".[chunkhash:8]" : "") + "_v2.js",
        publicPath = opt.publicPath || "//www.mycorp-corp.com/projctname",
        publicLibPath = opt.publicLibPath,
        outLibPath = opt.outLibPath,
        outPath = opt.outPath,
        cleanPath = opt.clean;
    return {
        entry: {
            index:['babel-polyfill','./src/pages/index.js']
        },
        output:{
            path : path.resolve(dirName,outPath),
            publicPath: publicPath,
            filename : jsFilename,
            chunkFilename:jsChunkFilename,// 决定 non-entry chunk(非入口 chunk) 的名称
            // imgFilename:"images/[name]" + (isHash ? ".[hash:8]" : "") + ".[ext]",//[name]代表源文件名称，[ext]代表源文件后缀，这样打包出来的文件就和原来的文件名称相同了。这种配置的语法叫做placeholder，也叫占位符
            sourceMapFilename: "[file].map",
        },
        resolve:{
            modules: ['node_modules', path.join(__dirname, './node_modules')],
            extensions: ['.js', '.web.js', '.json'],
            alias:{
                'react-dom': isDebug ? '@hot-loader/react-dom' : 'react-dom',
                // api$: path.resolve(dirname, './src/common/js/api.js'),
                '@ant-design/icons/lib/dist$': path.resolve(__dirname, '../alias/antd/icon/lib/dist.js'),
                views: path.resolve(dirName,'./src/views'),
                common: path.resolve(dirName,'./src/common'),
                store: path.resolve(dirName,'./src/store'),
                api: path.resolve(dirname, './src/api'),
                action: path.resolve(dirname, './src/store/action'),
            }
        },
        module:{
            rules:[
                {
                    test:/\.js$/,
                    exclude:/node_modules/,
                    include:[path.resolve(dirName,'./src')],
                    // use:[{
                    //     loader:'babel-loader'
                    // }]
                    use: 'happypack/loader?id=js'
                },
                {
                    test: /api.js$/,
                    use: {
                        loader: StringReplacePlugin.replace({
                            replacements: [{
                                pattern: /<!-- @env -->/ig,
                                replacement: function (match, p1, offset, string) {
                                    return process.env.NODE_ENV;
                                }
                            }, {
                                pattern: /<!-- @localhost -->/ig,
                                replacement: function (match, p1, offset, string) {
                                    return isMobile ? getIP() : '0.0.0.0';
                                }
                            }]
                        })
                    }
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|jpg|svg|gif|otf)$/,
                    use: {
                        loader: "url-loader",//区别file-loader:file-loader会打包处理jpg文件，并且放到输出的目录中。区别在于 url-loader 会把图片转为base64，而不是单独打包出一张图片。当图片较大时，会使js文件太大，加载变慢，导致页面出现空白。
                        options: {
                            name: imgFilename,//让打包出来的图片名称和引入名称相同
                            limit: 8 * 1024//图片超过8*1024字节，就用和file-loader相同的方式打包，url-loader最佳实践
                        }
                    },
                    exclude: svgDirs
                },
                {
                    test: /\.svg$/,
                    use: ['svg-sprite-loader', {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                { removeTitle: true },
                                { convertColors: { shorthex: true } },
                                { convertPathData: true },
                                { cleanupAttrs: true },
                                { removeComments: true },
                                { removeDesc: true },
                                { removeUselessDefs: true },
                                { removeEmptyAttrs: true },
                                { removeHiddenElems: true },
                                { removeEmptyText: true }
                            ]
                        }
                    }],
                    include: svgDirs // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
                },
            ]
        },
        plugins:[
            new CleanWebpackPlugin([cleanPath], {
                "root": dirname
            }),
            // new LodashModuleReplacementPlugin(),
            new CopyWebpackPlugin([{
                context: 'src/',
                from: 'page/favicon.ico',
                to: './'
            }, {
                context: 'src/',
                from: 'page/middle.html',
                to: './'
            }], {}),
            new HtmlWebpackPlugin({
                template: './src/page/index.html',
                filename: 'index.html',
                excludeChunks: ['netSale'],
            }),
            new StringReplacePlugin(),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.DefinePlugin({
                'process.env':{
                    'NODE_ENV':JSON.stringify(process.env.NODE_ENV)
                }
            }),
            new htmlWebpackPlugin({
                template:'./src/pages/index.html',
                filename:'index.html'
            }),
            // new ManifestPlugin({
            //     fileName: 'asset-manifest.json',
            //     publicPath: publicPath,
            //     generate: (seed, files) => {
            //         const manifestFiles = files.reduce(function (manifest, file) {
            //             manifest[file.name] = file.path;
            //             return manifest;
            //         }, seed);

            //         return {
            //             files: manifestFiles,
            //         };
            //     },
            // }),
            new ModuleNotFoundPlugin(path.resolve(__dirname, './')),
            new HappyPack({
                id: 'js',
                verbose: false,
                threadPool: happyThreadPool,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: CACHE_PATH,
                            cacheCompression: !isDebug,
                            presets: [
                                ['@babel/preset-env', {
                                    "targets": {
                                        "browsers": [
                                            'last 10 Chrome versions',
                                            'last 5 Firefox versions',
                                            "Safari >= 6",
                                            'ie > 8',
                                        ]
                                    },
                                    "debug": false,
                                    "useBuiltIns": "entry",//"usage", // babel编绎的时候不用整个 polyfills , 只加载你使用 polyfills
                                    "corejs": 2,
                                    "include": ["es7.promise.finally", "es7.symbol.async-iterator", "es6.array.sort"],

                                }], '@babel/preset-react'],
                            plugins: [
                                '@babel/plugin-syntax-dynamic-import',
                                [
                                    '@babel/plugin-proposal-decorators',
                                    {
                                        legacy: true
                                    }
                                ],
                                [
                                    '@babel/plugin-proposal-class-properties',
                                    {
                                        loose: true
                                    }
                                ],
                                [
                                    '@babel/plugin-transform-runtime',
                                    {
                                        helpers: false,
                                        corejs: 2,
                                    }
                                ],
                                '@babel/plugin-transform-async-to-generator',
                                ["import", { "style": true, "libraryName": "antd-mobile" }, 'antd-mobile'],
                                ["import", { "style": true, "libraryName": "antd" }, 'antd'],
                                // ["import", {
                                //     "libraryName": "react-corp-design-mobile",
                                //     "libraryDirectory": "",
                                //     "camel2DashComponentName": false,
                                //     // "customName": (name) => {
                                //     //     return `react-corp-design-mobile/lib/${name}`;
                                //     // },
                                // }, "react-corp-design-mobile"],
                                // ["import", {
                                //     "libraryName": "corp-design-mobile",
                                //     "camel2DashComponentName": false,
                                //     "customName": (name) => {
                                //         return `corp-design-mobile/lib/name`;
                                //     },
                                // }, 'corp-design-mobile'],
                                // ['import', {
                                //     libraryName: 'corp-ui-mobile',
                                //     libraryDirectory: 'lib/components',
                                //     style: function style(path) {
                                //       return `${path}/index.css`;
                                //     }
                                // }],
                                'react-hot-loader/babel',
                                'lodash',
                                'recharts'
                            ]
                        }
                    }
                ]
            })
        ],
        // Some libraries import Node modules but don't use them in the browser.
        // Tell Webpack to provide empty mocks for them so importing them works.
        node: {
            module: 'empty',
            dgram: 'empty',
            dns: 'mock',
            fs: 'empty',
            http2: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty',
        }
    }
}