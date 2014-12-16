/// <chutzpah_reference  path="../../../WebSites/marionette-todo/Scripts/app.js"/>

describe("Todo Appliation", function () {
    beforeEach(function() {
        this.sut = window.app;
    });

    it("should not be null", function () {
        expect(this.sut).not.toBeNull();
    });
});