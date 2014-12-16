/// <chutzpah_reference  path="math/calculator.js"/>

describe('Calculator - Add ', function () {
    beforeEach(function() {
        this.sut = new calculator();
    });

    it('should total numbers together', function () {
        var result = this.sut.add(2, 3);

        expect(result).toBe(5);
    });
});