/// <chutzpah_reference  path='../../../WebSites/marionette-todo/Scripts/todo.js'/>

describe('Todo Model', function () {
    beforeEach(function () {
        this.module = app.todo;
        this.sut = new this.module.Todo();
    });

    it('should have default values', function () {
        var sut = this.sut;

        expect(sut.get('title')).toBe('empty todo...');
        expect(sut.get('order')).toBe(0);
        expect(sut.get('done')).toBe(false);
    });
    
    describe(' - toggle ', function () {
        beforeEach(function () {
            var sut = this.sut;

            this.storage = sut.localStorage;

            sut.toggle();
        });

        afterEach(function () {
            this.storage.destroy(this.sut);
        });

        it('should be able to toggle done', function () {
            expect(this.sut.get('done')).toBe(true);
        });

        it('should save the model', function () {
            var result = this.storage.find(this.sut).done;

            expect(result).toBe(true);
        });
    });
});