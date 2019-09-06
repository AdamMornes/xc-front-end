import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import marked from 'marked';
import paths from './env/paths';

const renderer = new marked.Renderer();

module.exports = {
    devtool: 'inline-cheap-module-source-map',
    entry: {},
    output: {
        filename: 'scripts/[name].min.js',
        chunkFilename: 'scripts/[name].min.js',
        publicPath: '/',
        path: paths.prod
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': paths.src,
            'demo': paths.demo,
            'assets': `${paths.src}/assets`,
            '~': path.resolve('./')
        }
    },
    externals: {
        jquery: 'jQuery'
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'eslint-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'highlight-loader'
                    },
                    {
                        loader: 'markdown-loader',
                        options: {
                            renderer
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${paths.demo}/app/index.html`,
            filename: 'index.html',
            inject: 'body',
            hash: true
        }),

        new StyleLintPlugin({
            configFile: '.stylelintrc.json',
            failOnError: false,
            quiet: false
        }),
        
        new webpack.LoaderOptionsPlugin({
            eslint: {
                failOnWarning: false,
                failOnError: true
            }
        }),

        new webpack.DefinePlugin({
            $: 'window.jQuery'
        }),

        new VueLoaderPlugin()
    ]
}