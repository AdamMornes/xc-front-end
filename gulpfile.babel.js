'use strict';

import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import browserSync from 'browser-sync';
import del from 'del';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import colorsSupported from 'supports-color';
import historyApiFallback from 'connect-history-api-fallback';
import log from 'fancy-log';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import PluginError from 'plugin-error';
import paths from './config/env/paths';
import outputNames from './config/env/output';

const setupCopyWebpackPlugin = (dir, isProd = false) => {
    const ignore = isProd ? ['demo/**/*'] : [];
    let patterns = [
        { 
            from: `${paths.src}/assets/fonts`, 
            to: `${dir}/fonts` 
        },
        { 
            from: `${paths.src}/assets/images`, 
            to: `${dir}/images`, 
            ignore
        }
    ]
    const plugin = [
        new CopyWebpackPlugin([ ...patterns ])
    ]
    return plugin;
}

/**
 * Description: Deletes dist/prod folder and contents
 *
 * Usage: gulp clean-prod | gulp clean-demo
 */

const clean = cb => del(paths.prod)
    .then(dirs => {
        log.info('[clean]', dirs);
        cb();
    });

export const cleanProdTask = gulp.task('clean-prod', gulp.series(clean));

const cleanDist = cb => del([paths.dist])
    .then(dirs => {
        log.info('[clean]', dirs);
        cb();
    });

export const cleanDistTask = gulp.task('clean-demo', gulp.series(cleanDist));

/**
 * Description: Starts a development server.
 *
 * Usage: gulp dev
 */
const startDevServer = () => {
    const config = require('./config/webpack.dev.config');
    const compiler = webpack(config);

    browserSync({
        port: process.env.PORT || 3000,
        open: false,
        server: {
            baseDir: paths.src
        },
        middleware: [
            historyApiFallback(),
            webpackDevMiddleware(compiler, {
                stats: {
                    colors: colorsSupported,
                    chunks: false,
                    modules: false
                },
                publicPath: config.output.publicPath
            }),
            webpackHotMiddleware(compiler)
        ]
    });
}

export const dev = gulp.series(startDevServer);

/**
 * Description: Build the production site out as minified assets
 *
 * Usage: gulp prod
 */
const buildProd = (cb) => {
    const config = setEntry(
        require('./config/webpack.dist.config'),
        paths.src
    );

    config.plugins = config.plugins.concat(setupCopyWebpackPlugin(paths.prod, true));
    config.output.publicPath = '/assets/';

    build(config, cb);
}

export const prod  = gulp.series(clean, buildProd);

/**
 * Description: Serves dist directory built from gulp demo.
 *
 * Usage: gulp serve
 */
const startDemoServer = () => {
    browserSync({
        port: process.env.PORT || 3000,
        open: false,
        server: {
            baseDir: paths.dist
        }
    });
}

export const serve = gulp.series(startDemoServer);

/**
 * Description: Build and serve the Demo site out as minified assets
 *
 * Usage: gulp demo
 */
const buildDemo = (cb) => {
    let config = setEntry(
        require('./config/webpack.dist.config'),
        paths.demo
    );

    config.output.path = paths.dist;
    config.plugins = config.plugins.concat(setupCopyWebpackPlugin(`${paths.dist}/assets`, false));

    build(config, cb);
}

export const demo = gulp.series(cleanDist, buildDemo, startDemoServer);

// Adds entry path to webpack config file
function setEntry(config, entryPath) {
    config.entry[outputNames.scripts] = path.join(entryPath, 'index.js');
    return config;
}

// Builds distribution assets
function build(config, cb) {
    webpack(config, (err, stats) => {
        if(err) {
            throw new PluginError('webpack', err);
        }

        log('[webpack]', stats.toString({
            colors: colorsSupported,
            hash: false,
            version: false,
            timings: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: true,
            warnings: true,
            publicPath: false
        }));

        cb();
    })
}