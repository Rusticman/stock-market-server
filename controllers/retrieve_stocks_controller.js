const yahooFinance = require('yahoo-finance');
const dataModel = require('../data');
const Stock = require('../model/stocks');
const colour = require('./colour_controller');

module.exports = function(req,res,next){

  const symbol = req.params.symbol.toUpperCase();
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const startDate = (year - 1) + "-" + (month + 1) + "-" + day;
  const endDate = year + "-" + month + "-" + day;


  yahooFinance.historical({
    symbol: symbol,
    from: startDate,
    to: endDate,
    period: 'm'
  }, function (err, results) {
    if(err){
      throw err;
    }
    if(results.length === 0){
      return res.send({success:false})//remember to catch no results on client end
    }
  const stockArr = [];

  results.forEach((elem) => {

    stockArr.push(elem.open);
  })

  var firstColour = colour.pickColour();
  var  secondColour = colour.pickColour();

  var fillColour = colour.rgbColour(secondColour,0.2);

const  dataObj = dataModel.data;
      dataObj.label = symbol;
      dataObj.data = stockArr;
      dataObj.borderColor = "#346e93";
      dataObj.backgroundColor = fillColour;
      dataObj.pointBorderColor = firstColour;
      dataObj.poinBackgroundColor = secondColour;
  /*    dataObj.pointHoverBackgroundColor = firstColour;
      dataObj.pointHoverBorderColor = secondColour;*/
      dataObj.fill = true;


  const stock = new Stock({
    stockSymbol: symbol
  })

yahooFinance.snapshot({
  symbol: symbol,
  fields: ['s', 'n']
}, function (err, snapshot) {
      dataObj.name = snapshot.name; //get the symbols name


  stock.save(function(err){
    if(err){
      console.error('there was an error saving the symbol')
      return res.send({success:false})
    }
    return res.send({success:dataObj})
  })
});
  });

}
