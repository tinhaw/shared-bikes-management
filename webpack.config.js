const path=require('path');
const htmlWebpackplugin=require('html-webpack-plugin');

module.exports={
    devtool: 'source-map',
    entry:{
        main:path.resolve(__dirname,'src/index.js')
    },
    output:{
        filename:'js/[name]-bundle.js',
        path:path.resolve(__dirname,'dist'),
    },
    mode:'development',
    plugins:[
        new htmlWebpackplugin({
            template:path.resolve(__dirname,'src/index.temp.html'),
            filename:'index.html'
        })
    ],
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                loader:'babel-loader',
                exclude:/node_modules/,
                
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.less$/,
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'less-loader',
                        options: { 
                            javascriptEnabled: true ,
                            modifyVars:{
                                "@primary-color":"#1DA57A"
                            }
                        } 
                    }
                ]
            },
            {
                test:/\.(png|jpg|gif|jpeg)$/i,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:"[name].[ext]",
                            outputPath:'static/image',
                        }
                    }
                ]
            }
        ]
    },
    resolve:{
        extensions: [".js", ".json", ".jsx"],
        // alias:{
        //     components$:path.resolve(__dirname,'src/components')
        // }
    },

    
}