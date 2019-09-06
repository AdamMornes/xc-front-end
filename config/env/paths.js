import path from 'path';

const root = path.resolve('.');
const main = '';
const output = '';

const paths = {
    src: path.join(root, `${main}/src`),
    demo: path.join(root, `${main}/demo`),
    dist: path.join(root, `${main}/dist`), // This is where the gulp demo task will publish to
    prod: path.join(root, `${output}/dist`)
};

export default paths;
