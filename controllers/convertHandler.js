require('dotenv').config(); // Load environment variables from .env

console.log('NODE_ENV:', process.env.NODE_ENV); // Debug the environment variable

function ConvertHandler() {
  
  this.getNum = function (input) {
    const numRegex = /^(\d+(\.\d+)?(\/\d+(\.\d+)?)?)?/;
    const match = input.match(numRegex);
  
    if (!match || input.includes('//') || (input.match(/\//g) || []).length > 1) {
      return 'invalid number';
    }
  
    const result = match[0] || '1';
    return eval(result);
  };
 
  
  this.getUnit = function (input) {
    let result;
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);
  
    if (match) {
      result = match[0].toLowerCase();
      const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
  
      if (!validUnits.includes(result)) {
        result = 'invalid unit';
      } else if (result === 'l') {
        result = 'L'; // Ensure 'l' is returned as 'L'
      }
    } else {
      result = 'invalid unit';
    }
    return result;
  };
  
  
  
  this.getReturnUnit = function (initUnit) {
    const unitPairs = {
      gal: 'L', // Return 'L' instead of 'l'
      l: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs',
    };
  
    return unitPairs[initUnit.toLowerCase()];
  };
  
  
  
  
  this.spellOutUnit = function (unit) {
    const unitNames = {
      gal: 'gallons',
      L: 'liters', // Map 'L' correctly to 'liters'
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms',
    };
  
    return unitNames[unit === 'l' ? 'L' : unit.toLowerCase()];
  };
  
  
  
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;
  
  this.convert = function (initNum, initUnit) {
    let result;
  
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = 'invalid unit';
    }
  
    return parseFloat(result.toFixed(5));
  };
  
  
  // Returns a descriptive string of the conversion
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
