var fs = require('fs');
var path = require('path');
var Routers = module.exports = {};

module.exports = function (app){
    var load = function(path, name) {
        if (name) {
            return require(path + name)(app);
        }
        return require(path)(app);
    };

    fs.readdirSync(__dirname + '/controllers').forEach(function (filename) {
        if (!/\.js$/.test(filename)) {
            return;
        }
        var name = path.basename(filename, '.js');
        var _load = load.bind(null, './controllers/', name);

        Routers.__defineGetter__(name, _load);
    });

    // app.get('/', index);
    app.get('/', function (req, res) {
        return res.render('index', {title: 'Unitconvert'});
    });

    // app.get('/', function(req, res) {
    //     res.send('halo');
    // });

}
