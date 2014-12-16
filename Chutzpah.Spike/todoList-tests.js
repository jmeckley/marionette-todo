/// <chutzpah_reference  path='../../../WebSites/marionette-todo/Scripts/todo.js'/>

describe('TodoList Model', function () {
    beforeEach(function () {
        this.module = app.todo;
        this.sut = new this.module.TodoList();
    });

    describe('- done', function () {
        beforeEach(function () {
            this.sut.add({ done: false });
            this.sut.add({ done: true });
            this.sut.add({ done: true });
        });

        it('should return completed todos', function() {
            var result = this.sut.done().length;

            expect(result).toBe(2);
        });
    });

    describe('- remaining', function () {
        beforeEach(function () {
            this.sut.add({ done: false });
            this.sut.add({ done: false });
            this.sut.add({ done: true });
        });

        it('should return uncompleted todos', function () {
            var result = this.sut.remaining().length;

            expect(result).toBe(2);
        });
    });

    describe('- nextOrder', function () {
        it('should return 1 when no items are in the list', function () {
            var result = this.sut.nextOrder();

            expect(result).toBe(1);
        });

        it('should return 3 when last order number is 2', function () {
            this.sut.add({ order: 2 });

            var result = this.sut.nextOrder();

            expect(result).toBe(3);
        });
    });

    describe('- clearCompleted', function () {
        beforeEach(function () {
            this.sut.add({ done: false });
            this.sut.add({ done: true });
            this.sut.add({ done: true });

            this.sut.clearCompleted();
        });

        it('should remove all todos that are marked done', function () {

            var result = this.sut.length;

            expect(result).toBe(1);
        });
    });

    describe('- comparer', function () {
        beforeEach(function () {
            this.sut.add({ order: 3 });
            this.sut.add({ order: 1 });
            this.sut.add({ order: 2 });
        });

        it('should sort by order', function () {
            var result = this.sut.map(function(x) { return x.get('order'); });

            expect(result).toEqual([1,2,3]);
        });
    });

    describe('- todos:completed event triggered', function () {
        beforeEach(function () {
            this.sut.add({ done: false });
            this.sut.add({ done: true });
            this.sut.add({ done: true });

            this.module.eventAggregator.trigger('todos:completed');
        });

        it('should clear completed todo items from the collection', function() {
            var result = this.sut.length;

            expect(result).toBe(1);
        });
    });

    describe('- events', function () {
        beforeEach(function() {
            var self = this;

            this.todo = new this.module.Todo();
            this.module.eventAggregator.on('todos:changed', function (todos) {
                self.result = todos;
            });

        });

        describe('- add event triggered', function () {
            beforeEach(function () {
                this.sut.add(this.todo);
            });

            it('should trigger todos:changed event', function () {
                expect(this.result).toEqual(this.sut);
            });
        });

        describe('- remove event triggered', function () {
            beforeEach(function () {
                this.sut.add(this.todo, { silent: true });
                this.sut.remove(this.todo);
            });

            it('should trigger todos:changed event', function () {
                expect(this.result).toEqual(this.sut);
            });
        });

        describe('- change:done event triggered', function () {
            beforeEach(function () {
                this.sut.add(this.todo, { silent: true });
                this.todo.set('done', true);
            });

            it('should trigger todos:changed event', function () {
                expect(this.result).toEqual(this.sut);
            });
        });

        describe('- change:title event triggered', function () {
            beforeEach(function () {
                this.sut.add(this.todo, { silent: true });
                this.todo.set('title', 'new title');
            });

            it('should not trigger todos:changed event', function () {
                expect(this.result).not.toEqual(this.sut);
            });
        });
    });
});