const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, options) => {

    let production = options.mode === 'production';

    let API_HOST_AUTH = production ? 'http://api-auth-url' : 'https://helmetsauth-stage.diwo.tech/1.0';
    let API_HOST = production ? 'http://api-url' : 'https://helmetsapi-stage.diwo.tech/1.0';

    return {
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[hash:8].js',
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.(jpg|jpeg|png)$/,
                    use: {
                        loader: 'url-loader'
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2,
                                modules: {
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                }
                            }
                        },
                        'sass-loader',
                    ],
                },
            ]
        },
        resolve: {
            extensions: [
                '.js',
                '.jsx'
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "./src/assets/index.html"
            }),
            new CopyPlugin({
                patterns: [{
                    context: 'src/',
                    from: "assets/css/*",
                    to: ".",
                },
                    // {
                    //     context: 'src/',
                    //     from: "assets/img/**/*",
                    //     to: ".",
                    // },
                    {
                        context: 'src/',
                        from: "assets/img/favicons/*",
                        to: ".",
                    },
                    {
                        context: 'src/',
                        from: "assets/js/*",
                        to: ".",
                    },
                    {
                        context: 'src/',
                        from: "assets/lib/**/*",
                        to: ".",
                    }
                ]
            }),
            new webpack.DefinePlugin({
                'process.env.API_HOST_AUTH': JSON.stringify(API_HOST_AUTH),
                'process.env.API_HOST': JSON.stringify(API_HOST)
            }),
        ],
        devServer: {
            contentBase: "./dist",
            historyApiFallback: true,
            hot: true,
        }
    };
}
