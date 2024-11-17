const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  
  // Test for whole number input
  test('Should correctly read a whole number input', function () {
    assert.strictEqual(convertHandler.getNum('32kg'), 32);
  });

  // Test for decimal number input
  test('Should correctly read a decimal number input', function () {
    assert.strictEqual(convertHandler.getNum('3.5mi'), 3.5);
  });

  // Test for fractional input
  test('Should correctly read a fractional input', function () {
    assert.strictEqual(convertHandler.getNum('1/2lbs'), 0.5);
  });

  // Test for fractional input with a decimal
  test('Should correctly read a fractional input with a decimal', function () {
    assert.strictEqual(convertHandler.getNum('5.4/3mi'), 5.4 / 3);
  });

  // Test for double-fraction (error case)
  test('Should correctly return an error on a double-fraction', function () {
    assert.strictEqual(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  // Test for default numerical input of 1
  test('Should correctly default to a numerical input of 1 when no numerical input is provided', function () {
    assert.strictEqual(convertHandler.getNum('kg'), 1);
  });

  // Test for valid input units
  test('Should correctly read each valid input unit', function () {
    const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const inputUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']; // Accept both cases
    inputUnits.forEach((unit, index) => {
      assert.strictEqual(convertHandler.getUnit(unit), validUnits[index]);
    });
  });
  

  // Test for invalid input unit
  test('Should correctly return an error for an invalid input unit', function () {
    assert.strictEqual(convertHandler.getUnit('34meters'), 'invalid unit');
  });

  // Test for return units
  test('Should return the correct return unit for each valid input unit', function () {
    const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const returnUnits = ['L', 'gal', 'km', 'mi', 'kg', 'lbs']; // Ensure 'L' is returned
    inputUnits.forEach((unit, index) => {
      assert.strictEqual(convertHandler.getReturnUnit(unit), returnUnits[index]);
    });
  });
  
  

  // Test for spelled-out string unit
  test('Should correctly return the spelled-out string unit for each valid input unit', function () {
    const inputUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const spelledOutUnits = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    inputUnits.forEach((unit, index) => {
      assert.strictEqual(convertHandler.spellOutUnit(unit), spelledOutUnits[index]);
    });
  });
  

  // Conversion tests
  test('Should correctly convert gal to L', function () {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
  });

  test('Should correctly convert L to gal', function () {
    assert.approximately(convertHandler.convert(1, 'l'), 0.26417, 0.00001);
  });

  test('Should correctly convert mi to km', function () {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
  });

  test('Should correctly convert km to mi', function () {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001);
  });

  test('Should correctly convert lbs to kg', function () {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.00001);
  });

  test('Should correctly convert kg to lbs', function () {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
  });

});
