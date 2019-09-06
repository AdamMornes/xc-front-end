import webpack from 'webpack';
import config from './webpack.config';
import MiniCssExtractPlugin  from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import outputNames from './env/output';
import { postCssLoader, cssLoader, sassLoader } from './env/style-loaders';

config.mode = "production";

config.module.rules = config.module.rules.concat([
    {
        test: /\.s?css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
            },
            cssLoader,
            postCssLoader,
            sassLoader
        ],
    }
]);

config.devtool = '#source-map';

config.optimization = {
    splitChunks: {
        cacheGroups: {
            default: false,
            vendors: {
                name: outputNames.vendors,
                test: /[\\/]node_modules[\\/].*\.js$/,
                chunks: 'initial'
            }
        }
    },
    minimizer: [
        new UglifyJsPlugin({
            sourceMap: true,
            extractComments: true,
            uglifyOptions: {
                warnings: false,
                mangle: {
                    reserved: ['$super', '$', 'jQuery', 'JQuery', 'exports', 'require']
                }
            }
        }),

        new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                map: {
                    inline: false,
                    annotation: true
                }
            }
        })
    ]
}

config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),

    new MiniCssExtractPlugin({
        filename: 'styles/[name].min.css'
    })
]);

module.exports = config;