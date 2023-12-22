const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  // Valid GET request
  test('Convert a valid input such as 10L: GET request to /api/convert.', (done) => {
    chai.request(server).keepOpen().get('/api/convert?input=10l').end((err, res) => {
      assert.equal(res.status, 200)
      done()
    })
  })
  // Invalid unit GET request
  test('Convert an invalid input such as 32g: GET request to /api/convert.', (done) => {
    chai.request(server).keepOpen().get('/api/convert?input=32g').end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.text, '"invalid unit"', 'The wrong error message is being rendered.')
      done()
    })
  })
  // Invalid number GET request
  test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.', (done) => {
    chai.request(server).keepOpen().get('/api/convert?input=3/7.2/4kg').end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.text, '"invalid number"', 'The wrong error message is being rendered.')
      done()
    })
  })
  // Invalid number and unit GET request
  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', (done) => {
    chai.request(server).keepOpen().get('/api/convert?input=3/7.2/4kilomegagram').end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.text, '"invalid number and unit"', 'The wrong error message is being rendered.')
      done()
    })
  })
  // No number GET request
  test('Convert with no number such as kg: GET request to /api/convert.', (done) => {
    chai.request(server).keepOpen().get('/api/convert?input=kg').end((err, res) => {
      assert.equal(res.status, 200)
      
      let resObject = JSON.parse(res.text)
      assert.equal(resObject.initNum, 1, 'Default number should be 1 when no number is provided.')
      assert.equal(resObject.initUnit, 'kg', 'Unit should be kg.')
      assert.equal(resObject.returnNum, 2.20462, '1 should be converted correctly based on the unit provided.')
      assert.equal(resObject.returnUnit, 'lbs', 'When kg is being converted it should convert to lbs.')
      assert.equal(resObject.string, '1 kilograms converts to 2.20462 pounds', 'When kg is being converted to lbs the string should reflect the conversion in plain language.')
      
      done()
    })
  })
});
