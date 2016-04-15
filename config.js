var os = require('os')

module.exports = {
    PATH: {
        APP: __dirname,
        BACKSIDE: __dirname + '/server',
        FRONTSIDE: __dirname + '/development/js',
        STATIC: __dirname + '/static'
    },
    
    host: os.hostname(),
    port: 8080

}
