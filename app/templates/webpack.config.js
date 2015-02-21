var path = require("path");
var webpack = require("webpack");


module.exports = {
    cache: true,
    context: path.join(__dirname, 'public'),

    entry: {
        app: path.join(__dirname, 'public', 'app', 'app.js')
        //vendor: []
    },

    output: {
        path: path.join(__dirname, 'public', 'dist'),
        filename: '[name].js'
    },

    externals: {
        underscore: '_',
        jquery: 'jQuery',
        angular: 'angular'
    },

    module: {
        loaders: [
            {test: /\.html/, loaders: ["html"]},
            {test: /\.css$/, loaders: ["style", "css"]}
        ]
    },

    resolve: {
        alias: {},
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.html', '.js', '.json', '.coffee'],
        // Tell webpack to look in node_modules, then bower_components when resolving dependencies
        // If your bower component has a package.json file, this is all you need.
        modulesDirectories: [
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'public', 'vendor')
        ]

    },

    plugins: [
        new webpack.ProvidePlugin({
            _: 'underscore',
            $: "jquery",
            jQuery: "jquery",
            "windows.jQuery": "jquery"
        }),

        //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),

        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        )
    ]

};
