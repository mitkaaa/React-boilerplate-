'use strict'

var webpackConfig = require('../webpack.config'),
    webpackConfigProduction = require('../webpack.production.config'),
    config = require('../config'),
    webpack = require('webpack'),
    gutil = require('gulp-util'),
    WebpackDevServer = require('webpack-dev-server')

module.exports = function (gulp) {
    var server = {}
    
    gulp.task('webpack', function () {
        //webpackConfig.entry = webpackConfig.entry.concat(['webpack-dev-server/client?http://localhost:' + webpackConfig.port + '/', 'webpack/hot/dev-server'])
        webpackConfig.watch = true
        webpackConfig.plugins = webpackConfig.plugins.concat([
            new webpack.SourceMapDevToolPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ])
        webpackConfig.devtool = 'eval'

        server.instance = new WebpackDevServer(webpack(webpackConfig), {
            contentBase: config.PATH.STATIC,
            //publicPath: 'http://localhost:4242/target/assets/',
            stats: {
                chunks: false,
                colors: true
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Expires': '-1',
                'Cache-Control': 'private, no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache'
            },
            
            lazy: true,
            
            hot: true
        })
            
        server.instance.listen(webpackConfig.port, function (err) {
            if (err) {
                throw new gutil.PluginError('Webpack', err)
            }

            gutil.log(gutil.colors.cyan('[Webpack]'), 'server avaliable at http://localhost:'+webpackConfig.port+'/')
            
        })
    })
    
    

    gulp.task('webpack:production', function (callback) {
        webpack(webpackConfigProduction, function(err, stats) {
            if(err) throw new gutil.PluginError("webpack", err);
            gutil.log('[Webpack]', 'Output:\n' + stats.toString({
                chunks: false,
			    colors: true
            }))
        })
    })

    return server
}
