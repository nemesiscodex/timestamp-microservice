'use strict';

var path = process.cwd();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
];
var unix = /^\d+$/;
var natural = /^\w+ \d+, \d+$/;
module.exports = function(app) {
    app.route('/')
        .get(function(req, res) {
            res.sendFile(path + '/public/index.html');
        });
    app.param('date', function(req, res, next, dateParam) {
		var obj = {};
		var isUnix = unix.exec(dateParam);
		var isNatural = natural.exec(dateParam);
		var date;
		if(isUnix){
			date = new Date(parseInt(dateParam));
		}else if(isNatural){
			date = new Date(dateParam);
		}

        if (isUnix || isNatural) {
			obj.unix = date.getTime();
            obj.natural = months[date.getMonth()] + " " + date.getDate() +
                ", " + date.getFullYear();
        } else {
			obj.unix = null;
			obj.natural = null;
        }
		res.type('application/json');
		res.send(obj);
		next();
    });
    app.route('/:date')
        .get(function(req, res) {
        });
};
