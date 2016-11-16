const Stock = require('../model/stocks');

module.exports = function(req,res,next){

const symbol = req.params.symbol.toUpperCase();

  Stock.remove({stockSymbol:symbol},function(err){

    if(err){
      res.send({success:false});
      console.error('failed to delete item');
      return;
    }

    return res.send({success:true});
  })
}
