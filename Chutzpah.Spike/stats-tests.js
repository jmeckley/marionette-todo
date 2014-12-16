/// <chutzpah_reference  path='../../../WebSites/marionette-todo/Scripts/todo.js'/>

describe('Stats Model', function () {
    beforeEach(function () {
        this.module = app.todo;
        this.sut = new this.module.Stats();
    });

    it('should have default values', function () {
        var sut = this.sut;

        expect(sut.get('done')).toBe(0);
        expect(sut.get('remaining')).toBe(0);
        expect(sut.get('total')).toBe(0);
    });
    
    describe(' - updateValues ', function () {
        beforeEach(function () {
            var todos = new this.module.TodoList();
            todos.add({ done: true }, { silent: true });
            todos.add({ done: false }, { silent: true });
            todos.add({ done: false }, { silent: true });

            this.sut.updateValues(todos);
        });
        
        it('should be able to update done', function () {
            expect(this.sut.get('done')).toBe(1);
        });

        it('should be able to update remaining', function () {
            expect(this.sut.get('remaining')).toBe(2);
        });

        it('should be able to update total', function () {
            expect(this.sut.get('total')).toBe(3);
        });
    });

    describe(' - clearCompleted ', function() {
        beforeEach(function() {
            var self = this;

            self.result = false;
            this.module.eventAggregator.once('todos:completed', function() {
                self.result = true;
            });

            this.sut.clearCompleted();
        });

        it('should trigger todods:completed event', function () {
            expect(this.result).toBe(true);
        });
    });
});