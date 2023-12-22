const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Read and Return', () => {
    // Whole Number
    test('convertHandler should correctly read a whole number input.', () => {
      assert.equal(convertHandler.getNum('3mi'), 3, 'Whole number not being read correctly.')
    })
    // Decimal Number
    test('convertHandler should correctly read a decimal number input.', () => {
      assert.equal(convertHandler.getNum('3.1mi'), 3.1, 'Decimal number not being read correctly.')
    })
    // Fraction
    test('convertHandler should correctly read a fractional input.', () => {
      assert.equal(convertHandler.getNum('3/4mi'), 0.75, 'Fractional input not being read correctly.')
    })
    // Fraction w/ decimal
    test('convertHandler should correctly read a fractional input with a decimal.', () => {
      assert.equal(convertHandler.getNum('3/6.4'), 0.46875, 'Fractional input with a decimal not being read correctly.')
    })
    // Double fraction error check
    test('convertHandler should correctly return an error on a double-fraction.', () => {
      assert.isNull(convertHandler.getNum('3/2/3'), 'Double fractions should return null.')
    })
    // Default to 1
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
      assert.equal(convertHandler.getNum(), 1, 'Input should default to 1 if no input is provided.')
    })
    
    // Read valid units
    test('convertHandler should correctly read each valid input unit', () => {
      assert.equal(convertHandler.getUnit('gal'), 'gal', 'gal is not being read correctly.')
      assert.equal(convertHandler.getUnit('l'), 'L', 'L is not being read correctly.')
      assert.equal(convertHandler.getUnit('L'), 'L', 'L is not being read correctly.')
      assert.equal(convertHandler.getUnit('lbs'), 'lbs', 'lbs is not being read correctly.')
      assert.equal(convertHandler.getUnit('kg'), 'kg', 'kg is not being read correctly.')
      assert.equal(convertHandler.getUnit('mi'), 'mi', 'mi is not being read correctly.')
      assert.equal(convertHandler.getUnit('km'), 'km', 'km is not being read correctly.')
    })
    // Invalid unit error check
    test('convertHandler should correctly return an error for an invalid input unit.', () => {
      assert.isNull(convertHandler.getUnit('f'), 'Invalid units should return null.')
    })
    // Return the correct unit based on valid input
    test('convertHandler should return the correct return unit for each valid input unit.', () => {
      assert.equal(convertHandler.getReturnUnit('gal'), 'L', 'gal should return L')
      assert.equal(convertHandler.getReturnUnit('L'), 'gal', 'L should return gal')
      
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg', 'lbs should return kg')
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs', 'kg should return lbs')

      assert.equal(convertHandler.getReturnUnit('mi'), 'km', 'mi should return km')
      assert.equal(convertHandler.getReturnUnit('km'), 'mi', 'km should return km')
    })
    // Return correct spelled out unit
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons', 'gal should return gallons.')
      assert.equal(convertHandler.spellOutUnit('l'), 'liters', 'L should return litres.')
      assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds', 'lbs should return pounds.')
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms', 'kg should return kilograms.')
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles', 'mi should return miles.')
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers', 'km should return kilometers.')
    })
  })

  suite('Conversions', () => {
    // gal to L
    test('convertHandler should correctly convert gal to L', () => {
      assert.equal(convertHandler.convert(3, 'gal'), 11.35623, 'gal is not converting to L correctly.')
    })
    // L to gal
    test('convertHandler should correctly convert L to gal', () => {
      assert.equal(convertHandler.convert(3, 'L'), 0.79252, 'L is not converting to gal correctly.')
    })

    // mi to km
    test('convertHandler should correctly convert mi to km', () => {
      assert.equal(convertHandler.convert(3, 'mi'), 4.82802, 'mi is not converting to km correctly.')
    })
    // km to mi
    test('convertHandler should correctly convert km to mi', () => {
      assert.equal(convertHandler.convert(3, 'km'), 1.86412, 'km is not converting to mi correctly.')
    })

    // lbs to kg
    test('convertHandler should correctly convert lbs to kg', () => {
      assert.equal(convertHandler.convert(3, 'lbs'), 1.36078, 'lbs is not converting to kg correctly.')
    })
    // kg to lbs
    test('convertHandler should correctly convert kg to lbs', () => {
      assert.equal(convertHandler.convert(3, 'kg'), 6.61387, 'kg is not converting to lbs correctly.')
    })

    
  })
});