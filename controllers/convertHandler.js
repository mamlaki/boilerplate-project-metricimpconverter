function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;

    if (input && input.match(/^[\d./]+/)) {
      try {
        const fractionCount = input.split('/')
        if (fractionCount.length > 2) {
          throw new Error('Invalid input. Double fractions are not allowed.')
        }
        
        result = eval(input.match(/^[\d./]+/)[0])
      } catch (err) {
        result = null
      }
    } else {
      result = 1
    }

    return result
  };
  
  this.getUnit = function(input) {
    const units = ['gal', 'l', 'lbs', 'kg', 'mi', 'km']
    const match = input.match(/[a-zA-Z]+$/)

    let result = match ? match[0].toLowerCase() : null;
    
    if (units.includes(result)) {
      if (result === 'l') {
        return result.toUpperCase()
      } else {
        return result
      }
    } else {
      return null
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'lbs': 'kg',
      'mi': 'km'
    }

    if (initUnit !== 'L') {
      initUnit = initUnit.toLowerCase()
    }

    if (unitMap[initUnit]) {
      return unitMap[initUnit]
    } else {
      const reverseUnit = Object.keys(unitMap).find(key => unitMap[key] === initUnit)
      return reverseUnit || null
    }
  };

  this.spellOutUnit = function(unit) {
    const unitNames = {
      'gal': 'gallons',
      'l': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    }
    
    return unitNames[unit.toLowerCase()] || null;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const conversions = {
      'gal': initNum * galToL,
      'l': initNum / galToL,
      'lbs': initNum * lbsToKg,
      'kg': initNum / lbsToKg,
      'mi': initNum * miToKm,
      'km': initNum / miToKm
    }
    
    return Number(conversions[initUnit.toLowerCase()].toFixed(5)) || null;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const spelledOutInitUnit = this.spellOutUnit(initUnit)
    const spelledOutReturnUnit = this.spellOutUnit(returnUnit)

    let result = `${initNum} ${spelledOutInitUnit} converts to ${returnNum} ${spelledOutReturnUnit}`

    return result
  };
  
}

module.exports = ConvertHandler;
