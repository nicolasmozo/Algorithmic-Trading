'use strict';
const ccxt = require('ccxt');
const axios = require('axios').default;
require("dotenv").config();
const fetch = require('node-fetch');
const SMA = require('technicalindicators').SMA;
const EMA = require('technicalindicators').EMA;
const crypto = require('crypto');
const { request } = require('http');
const { clearInterval } = require('timers');

// TO MODIFY ------------------------------------
let side_market = "buy";
let confirmation_price = 1458;
// ----------------------------------------------
start();
// connects to FTX using API 
async function start() {
    let ftx = new ccxt.ftx
        ({
            'apiKey': process.env.apiKey,
            'secret': process.env.secret,
        })
    const exchangeId = 'ftx'
        , exchangeClass = ccxt[exchangeId]
        , exchange = new exchangeClass
            ({
                'apiKey': process.env.apiKey,
                'secret': process.env.secret,
            })
}
let dateUTCTimeStamp = 0;
let dateUTCTimeStampx = 0;
let currentDateUTCTimeStamp = 0;
let currentDateUTCTimeStampx = 0;
let currentTime;
function getDateInUTCTimestamp() {
    const date = new Date();
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth() + 1;
    var monthCurrent = date.getUTCMonth();
    var day = date.getUTCDate() - 1;
    var dayCurrent = date.getUTCDate();
    var hour = date.getUTCHours();
    var minute = date.getUTCMinutes();
    var second = date.getUTCSeconds();
    var localTime = date.toLocaleTimeString();
    currentTime = localTime;
    currentDateUTCTimeStampx = Date.UTC(year, monthCurrent, dayCurrent, hour, minute, second);
    currentDateUTCTimeStamp = currentDateUTCTimeStampx.toString().substr(0, currentDateUTCTimeStampx.toString().length - 4);
    dateUTCTimeStampx = Date.UTC(year, month, day, hour, minute, second);
    dateUTCTimeStamp = dateUTCTimeStampx.toString().substr(0, dateUTCTimeStampx.toString().length - 4);
}

getDateInUTCTimestamp();

const ftxAPI = 'https://ftx.com/api/markets/ETH-PERP/candles?resolution=14400&start_time=' + dateUTCTimeStamp;
let lastClosing;

// getData() pulls an array of historical closing values of ETH-PERP in periods of 4H
async function getData() {
    const arr = [];
    let response = await fetch(ftxAPI);
    let data = await response.json();
    //console.log(data);
    let obj = data.result;
    for (let i = 0, len = obj.length; i < len; i++) {
        arr.push(obj[i].close);
    }
    console.log(lastClosing = arr[arr.length - 2]);
    prices_comparison();
}

function prices_comparison() {
    if (side_market == "buy") {
        if (lastClosing > confirmation_price) {
            buy();
        }
        else {
            console.log("not yet");
        }
    }
    else if (side_market = "sell") {
        if (lastClosing < confirmation_price) {
            sell();
        }
        else {
            console.log("not yet");
        }
    }
    else {
        console.log("CHECK side_market");
    }
}

let symbol = "ETH/USD:USD";
let amount = 
function buy()
{
    ftx.id, ftx.createMarketOrder(symbol, 'buy', amountLastTrade);
}

function sell()
{
    ftx.id, ftx.createMarketOrder(symbol, 'sell', amountLastTrade);
}

let myInterval = setInterval(getData, 5000);
function run() {
    myInterval;
}

function stopInterval() {
    clearInterval(myInterval);
}
run();
