// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // mode: 'development',
    mode: 'production',
    optimization: {
        usedExports: true,
    },
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
        editor: path.resolve(__dirname, './src/editor.js'),
    },
    resolve: {
      extensions: ['.js', '.json']
    },
    // Uncomment this if u dont want use old browsers.
    // resolve: {
    //     alias: {
    //         'lit-html/lib/shady-render.js': path.resolve(__dirname, './node_modules/lit-html/lit-html.js')
    //     }
    // },
    devtool: 'inline-source-map',
    // devtool: 'eval-source-map',
    // devtool: false,
    // devServer: {
    //     contentBase: './dist',
    //     hot: true,
    // },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // compress: true,
        compress: false,
        hot: true,
        port: 9000,
      },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Sushka application',
        template: path.resolve(__dirname, './src/index.html'), // шаблон
        chunks: ['main'],
        filename: 'index.html', // название выходного файла
      }),
      new HtmlWebpackPlugin({
        title: 'Sushka page editor application',
        template: path.resolve(__dirname, './src/editor.html'), // шаблон
        chunks: ['editor'],
        filename: 'editor.html', // название выходного файла
      }),
      new CopyWebpackPlugin({
        patterns: [
          // ...fileToCopy,
          {
            from: path.resolve(__dirname, 'public/'),
            to: path.resolve(__dirname, 'dist/')
          }
        ]
      }),
    ],
    module: {
        rules: [
            {
              test: /\.js$/,
              loader: 'babel-loader'
            },
            {
                test: /\.tepmlate\.js$/,
                loader: 'minify-template-literal-loader',
                options: {
                  caseSensitive: true,
                  collapseWhitespace: true
                }
            },
            {
                test: /\.(scss|css)$/,
                // include: path.resolve(__dirname, "src/ui"),
                exclude: [path.resolve(__dirname, "./src/main.scss"),path.resolve(__dirname, "./src/editor.scss")],
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
                include: [path.resolve(__dirname, "./src/main.scss"), path.resolve(__dirname, "./src/editor.scss")],
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
        // filename: '[name].bundle.js',
        filename: '[name].[contenthash:8].bundle.js',
        clean: true,
    },
}
