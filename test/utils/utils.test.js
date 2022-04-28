const chai = require("chai");
const expect = chai.expect;
const {timeWithZero, validateCoordinates} = require("../../dist-test/btrz-map-test").testAPI.Utils;

describe("Utils", () => {

  describe("validateCoordinates", () => {
    it("Should throw exception when latitude is less than -90", () => {
      const wrongValue = "-91.00009";
      expect(() => validateCoordinates({
        latitude: wrongValue,
        longitude: "150.26598"
      })).to.throw(`${wrongValue} is not a valid latitude. Should be between -90 and 90`)
    });

    it("Should throw exception when longitude is greater than 180", () => {
      const wrongValue = 180.00009;
      expect(() => validateCoordinates({
        latitude: 15.2326568,
        longitude: wrongValue
      })).to.throw(`${wrongValue} is not a valid longitude. Should be between -180 and 180`)
    });

    it("Should throw exception when latitude is not a number", () => {
      const wrongValue = "";
      expect(() => validateCoordinates({
        latitude: wrongValue,
        longitude: "150.26598"
      })).to.throw(`${wrongValue} is not a valid latitude. Should be between -90 and 90`)
    });
  });

  describe("timeWithZero", () => {
    it("it should add a zero to the time", () => {
      let result = timeWithZero(9);
      expect(result).to.eql("09");

      result = timeWithZero(0);
      expect(result).to.eql("00");

      result = timeWithZero(5);
      expect(result).to.eql("05");
    });

    it("it should not add a zero because it already has 2 digits", () => {
      let result = timeWithZero(10);
      expect(result).to.eql("10");

      result = timeWithZero(14);
      expect(result).to.eql("14");
    });
  });
});
