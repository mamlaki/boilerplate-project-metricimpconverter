'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const num = convertHandler.getNum(req.query.input)
    const unit = convertHandler.getUnit(req.query.input)

    if ((num === null && unit === null) || (num === null) || (unit === null)) return res.json('invalid number and unit')

    const convertedNum = convertHandler.convert(num, unit)
    const returnUnit = convertHandler.getReturnUnit(unit)

    const message = convertHandler.getString(num, unit, convertedNum, returnUnit)

    res.json({ 
      initNum: num, 
      initUnit: unit, 
      returnNum: convertedNum, 
      returnUnit: returnUnit, 
      string: message
    })
  })
};
