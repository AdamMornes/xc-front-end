import webpack from 'webpack';
import config from './webpack.config';
import paths from './env/paths';
import { styleLoader, cssLoader, sassLoader } from './env/style-loaders';

config.mode = 'development';

config.entry.app = [
    'webpack-hot-middleware/client?reload=true',
    `${paths.demo}/index.js`
];

config.module.rules = config.module.rules.concat([
    {
        test: /\.css$/,
        use: [
            styleLoader,
            cssLoader
        ]
    },
    {
        test: /\.scss$/,
        use: [
            styleLoader,
            cssLoader,
            sassLoader
        ]
    }
]);

config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
]);

module.exports = config;