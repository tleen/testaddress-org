'use strict';

var cheerio = require('cheerio'),
express = require('express'),
moment = require('moment'),
request = require('request');


var router = module.exports = express.Router();

/* call test address url, get result, replace statically generated dates with now */
router.use('*', function(req, res, next){
  var dest = 'http://testaddress.org' + req.originalUrl;
  request(dest, function(err, response, body){

    if(err) return next(err);

    res.header(response.headers);
    res.status(response.statusCode);
    switch(response.headers['content-type']){

      case 'application/json':
        var data = JSON.parse(body);
        data.generated = new Date();
        return res.json(data);

      case 'text/html':       
        var $ = cheerio.load(body);
        var format = $('html').attr('data-date-format-visual');
        var now = moment();    
        var visual = now.format(format);
      
        $('*[data-date-generated]').attr('data-date-generated', now.toISOString());
        $('meta[data-date-generated]').attr('content', visual);
        $('body *[data-date-generated]').html(visual);

        return res.send($.html());

      default:
        return res.send(body);
    }
  });
});
