const yahooFinance = require('yahoo-finance');
const data = require('../data');
const Stock = require('../model/stocks');

const colour = require('./colour_controller');

module.exports = function(req,res,next){

Stock.find({},function(err,results){

  if(err){
    console.error('there was an error retrieving all the symbols')
    res.send({success:false})
  }

  if(results.length === 0){
    return res.send({success:false})
  }

  const symbolArray = [];

  results.forEach(function(elem){

    symbolArray.push(elem.stockSymbol);
  });console.log("symbolArray",symbolArray);

  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const startDate = (year - 1) + "-" + (month + 1) + "-" + day;
  const endDate = year + "-" + month + "-" + day;

  yahooFinance.historical({
    symbols:symbolArray,
    from: startDate,
    to: endDate,
    period: 'm'
  }, function (err, results) {
    if(err){console.log('failing here')
      throw err;
    }
    if(results === []){
      return res.send({success:false})//remember to catch no results on client end
    }

    yahooFinance.snapshot({
      symbols: symbolArray,
      fields: ['s', 'n']
    }, function (err, snapshotArray) { //get the symbols name

var counter = 0; //used to get correct name from snapshotArray
var reorganisedResults = [];
  for (var prop in results){
    var stockArr = [];
    results[prop].forEach(function(elem,i){
        stockArr.push(elem.open)
    })

var firstColour = colour.pickColour();
var  secondColour = colour.pickColour();

var fillColour = colour.rgbColour(secondColour,0.2);

    var  data = {
          label: prop,
          fill: true,//change fill to be translucent bordercolour
          borderColor: "#346e93",//this is line colour. should be same as fill
          backgroundColor:fillColour,
          pointBorderColor:firstColour,
          pointBackgroundColor: secondColour,
          pointBorderWidth: 1,
        /*  pointHoverRadius: 5,
          pointHoverBackgroundColor: firstColour,
          pointHoverBorderColor: secondColour,
          pointHoverBorderWidth: 2, */
          pointRadius: 5,
          pointHitRadius: 20,
          data: stockArr,
          spanGaps: true,
          name:snapshotArray[counter].name
      }

       reorganisedResults.push(data);
       counter++;
  }


return res.send({success:reorganisedResults})
})
})
})

}
