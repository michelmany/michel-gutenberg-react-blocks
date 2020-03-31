const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = (env, argv) => {
    function isDevelopment() {
        return argv.mode === "development";
    }

    var config = {
        entry: {
            "editor.blocks": "./src/index.js",
            "frontend.blocks": "./src/frontend.js"
        },
        output: {
            filename: "js/[name].js",
            pathinfo: false
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false
                        }
                    },
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        map: {
                            inline: false,
                            annotation: true
                        }
                    }
                })
            ]
        },
        plugins: [
            new ProgressBarPlugin(),
            new CleanWebpackPlugin(),
            new MiniCSSExtractPlugin({
                chunkFilename: "[id].css",
                filename: chunkData => {
                    return chunkData.chunk.name === "frontend.blocks"
                        ? "css/blocks.style.css"
                        : "css/blocks.editor.css";
                }
            }),
            new BrowserSyncPlugin(
                {
                    proxy: "localhost",
                    files: ["**/*.css"]
                },
                { reload: false }
            )
        ],
        devtool: isDevelopment() ? "cheap-module-eval-source-map" : false,
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    include: path.resolve(__dirname, "src"),
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["@babel/preset-env", { 
                                    targets: { 
                                        node: 6,
                                        ie: "11" 
                                        } 
                                    }
                                ],
                                [
                                    "@babel/preset-react",
                                    {
                                        pragma: "wp.element.createElement",
                                        pragmaFrag: "wp.element.Fragment",
                                        development: isDevelopment()
                                    }
                                ]
                            ],
                            plugins: ["@babel/plugin-proposal-class-properties", "lodash"]
                        }
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCSSExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: false
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [autoprefixer()]
                            }
                        },
                        "sass-loader"
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        esModule: false,
                        outputPath: "images"
                    }
                }
            ]
        },
        externals: {
            react: "React",
            "react-dom": "ReactDOM",
            jquery: "jQuery",
            "@wordpress/blocks": ["wp", "blocks"],
            "@wordpress/editor": ["wp", "editor"],
            "@wordpress/components": ["wp", "components"],
            "@wordpress/elements": ["wp", "elements"]
        }
    };
    return config;
};
