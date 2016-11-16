const RetrieveStocks = require('./controllers/retrieve_stocks_controller');
const AllStocks = require('./controllers/all_stocks_controller');
const DeleteCompany = require('./controllers/delete_company_controller');

module.exports = function(app){

  app.get('/stocks/:symbol', RetrieveStocks);

  app.get('/allstocks', AllStocks);

  app.delete('/deletecompany/:symbol',DeleteCompany);

}
