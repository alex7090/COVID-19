const express = require('express');
const router = express.Router();
const githubContent = require('github-content');
const curl = require('curlrequest');
const csv = require('csv-parse')
const d3 = require("d3");
var fs = require("fs");
const _ = require("lodash");
var request = require('request');
var getJSON = require('get-json');
var http = require('follow-redirects').http;

function get_json(options, cb) {
    http.request(options, function (res) {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            //            console.log(body);
            var price = JSON.parse(body);
            var result = price;
            cb(null, result);
        });

        res.on('error', cb);
    })
        .on('error', cb)
        .end();
}

router.get('/alex', function (req, res) {
    var api_resp = '';
    var options = {
        host: 'covid19-server.chrismichael.now.sh',
        port: 80,
        path: '/api/v1/AllReports',
        method: 'GET'
    }
    get_json(options, function (err, result) {
        if (err) {
            return console.log('Error while trying to get price: ', err);
        }
        console.log(result.reports[0].cases)
        
        res.render('main_page', {
            data: result.reports[0].table,
            confirmed: result.reports[0].cases,
            deaths: result.reports[0].deaths,
            recovered: result.reports[0].recovered,
            active: result.reports[0].cases
        });
    });

});

router.get('/humza', function (req, res) {
    var api_resp = '';
    var options = {
        host: 'covid19-server.chrismichael.now.sh',
        port: 80,
        path: '/api/v1/AllReports',
        method: 'GET'
    }
    get_json(options, function (err, result) {
        if (err) {
            return console.log('Error while trying to get price: ', err);
        }
        console.log(result.reports[0].cases)
        
        res.render('tabs', {
        });
    });

});


router.get('/clement', function (req, res) {
    var api_resp = '';
    var options = {
        host: 'covid19-server.chrismichael.now.sh',
        port: 80,
        path: '/api/v1/AllReports',
        method: 'GET'
    }
    get_json(options, function (err, result) {
        if (err) {
            return console.log('Error while trying to get price: ', err);
        }
        console.log(result.reports[0].cases)
        
        res.render('graph', {
            confirmed: result.reports[0].cases,
            deaths: result.reports[0].deaths,
            recovered: result.reports[0].recovered,
            active: result.reports[0].cases
        });
    });

});



router.get('/benji', function (req, res) {
    var api_resp = '';
    var options = {
        host: 'covid19-server.chrismichael.now.sh',
        port: 80,
        path: '/api/v1/AllReports',
        method: 'GET'
    }
    get_json(options, function (err, result) {
        if (err) {
            return console.log('Error while trying to get price: ', err);
        }
        console.log(result.reports[0].cases)
        
        res.render('main_page', {
            confirmed: result.reports[0].cases,
            deaths: result.reports[0].deaths,
            recovered: result.reports[0].recovered,
            active: result.reports[0].cases
        });
    });

});



module.exports = router;