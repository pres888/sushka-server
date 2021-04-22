// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // mode: 'development',
    mode: 'production',
    optimization: {
        usedExports: true,
    },
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement',
        template: path.resolve(__dirname, './src/index.html'), // шаблон
        filename: 'index.html', // название выходного файла
      }),
    ],
    module: {
        rules: [
            // CSS, PostCSS, Sass
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            // {
            //     test: /\.css|\.s(c|a)ss$/,
            //     use: [{
            //         loader: 'lit-scss-loader',
            //         options: {
            //             minify: true, // defaults to false
            //         },
            //     }, 'extract-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            // },
        ],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        clean: true,
    },
}
