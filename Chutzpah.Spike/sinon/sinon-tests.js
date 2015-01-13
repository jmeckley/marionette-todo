/// <chutzpah_reference  path="sinon-server-1.12.2.js" />
/// <chutzpah_reference  path="lib/typeOf.js" />
/// <chutzpah_reference  path="lib/spy.js" />
/// <chutzpah_reference  path="lib/call.js" />
/// <chutzpah_reference  path="lib/behavior.js" />
/// <chutzpah_reference  path="lib/stub.js" />
/// <chutzpah_reference  path="lib/mock.js" />
/// <chutzpah_reference  path="lib/collection.js" />
/// <chutzpah_reference  path="lib/assert.js" />
/// <chutzpah_reference  path="lib/sandbox.js" />
/// <chutzpah_reference  path="lib/test.js" />
/// <chutzpah_reference  path="lib/test_case.js" />
/// <chutzpah_reference  path="lib/assert.js" />
/// <chutzpah_reference  path="lib/match.js" />
/// <chutzpah_reference  path="lib/times_in_words.js" />
/// <chutzpah_reference  path="jasmine-sinon.js" />

describe('chutzpah ', function () {
    beforeEach(function() {
        this.sut = sinon;
    });

    it('should load sinon', function () {
        var result = this.sut;

        expect(result).toBeDefined();
    });

    it('should load sinon spy', function () {
        var result = this.sut.spy;

        expect(result).toBeDefined();
    });

    it('should load sinon server', function () {
        var result = sinon.fakeServer;

        expect(result).toBeDefined();
    });
});

describe('sinon fake server', function () {
    beforeEach(function () {
        this.server = sinon.fakeServer.create();
        this.server.respondWith('GET', '/todo/items', [ 200, { 'Content-Type': 'application/json' }, '{"id":1,"title":"test"}' ]);

        this.sut = $.ajax({ url: '/todo/items' });

        this.server.respond();
    });

    afterEach(function () {
        this.server.restore();
    });

    it('should be able to fake the ajax call', function () {
        this.sut.success(function (result) {
            expect(result).toEqual({ id: 1, title: 'test' });
        });
    });
});

describe('sinon spy on $.ajax', function () {
    beforeEach(function () {
        this.sut = sinon.spy($, 'ajax');
    });

    afterEach(function () {
        $.ajax.restore();
    });

    it('should be able to fake the call', function () {
        var params = { url: '/todo/items' };

        this.sut(params);

        expect(this.sut).toHaveBeenCalledWith(params);
    });
});