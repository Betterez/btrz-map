const chai = require("chai");
const expect = chai.expect;
const {timeWithZero} = require("../../dist-test/btrz-map-test").testAPI.Utils;

describe("Utils", () => {
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
