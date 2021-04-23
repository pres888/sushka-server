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
    // devServer: {
    //     contentBase: './dist',
    //     hot: true,
    // },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        port: 9000,
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
            {
                test: /\.(scss|css)$/,
                // include: path.resolve(__dirname, "src/ui"),
                exclude: path.resolve(__dirname, "./src/main.scss"),
                use: [{
                    loader: 'lit-scss-loader',
                    options: {
                        minify: true, // defaults to false
                        // minify: false, // defaults to false
                    },
                }, 'extract-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            // CSS, PostCSS, Sass
            {
                test: /\.(scss|css)$/,
                include: path.resolve(__dirname, "./src/main.scss"),
                // test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: 'asset/resource',
            },
            // {
            //     test: /\.(png|jpe?g|gif)$/i,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //         },
            //     ],
            // },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              type: 'asset/resource',
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        clean: true,
    },
}
