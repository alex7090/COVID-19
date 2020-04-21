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

function getData() {
    var data;
    return data;
}

router.get('/github/', (req, res) => {
    var parsed;
    var options = {
        owner: 'CSSEGISandData',
        repo: 'COVID-19',
        branch: 'master' // defaults to master
    };
    var gc = new githubContent(options);
    gc.file('csse_covid_19_data/csse_covid_19_daily_reports/04-19-2020.csv', function (err, file) {
        if (err) return console.log(err);
        console.log(file.path);
        var data = file.contents.toString('utf8');
        csv(data, function (err, output) {
            parsed = output;

            tmp = d3.csvParse(data);
            //console.log(JSON.stringify(tmp));

            var Confirmed = d3.sum(tmp, function (d) { return d.Confirmed; });
            var Deaths = d3.sum(tmp, function (d) { return d.Deaths; });
            var Recovered = d3.sum(tmp, function (d) { return d.Recovered; });
            var Active = d3.sum(tmp, function (d) { return d.Active; });
            console.log(Confirmed);

            //  res.send(parsed);
            console.log(parsed);
            res.render('main_page', {
                confirmed: Confirmed,
                deaths: Deaths,
                recovered: Recovered,
                active: Active
            });
        })

    });
});

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

router.get('/API', function (req, res) {
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