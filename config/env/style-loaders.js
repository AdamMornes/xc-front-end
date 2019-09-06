import globImporter from 'node-sass-glob-importer';

export const styleLoader = {
    loader: 'style-loader',
    options: {
        sourceMap: true
    }
};

export const postCssLoader = {
    loader: 'postcss-loader',
    options: {
        sourceMap: true
    }
};

export const cssLoader = {
    loader: 'css-loader',
    options: {
        url: false,
        sourceMap: true
    }
};

export const sassLoader = {
    loader: 'sass-loader',
    options: {
        importer: globImporter(),
        includePaths: [
            'src/',
            'node_modules/'
        ],
        sourceMap: true
    }
};