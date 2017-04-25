const expect = require('expect');
const messages = require('./messages');

var {generateMessage} = require('./messages'); 
var {generateLocationMessage} = require('./messages'); 

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var res = messages.generateMessage('Mike','Hello');

        expect(res.from).toEqual('Mike');
        expect(res.text).toEqual('Hello');
        expect(res.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        var lat = '45.34';
        var lon = '-73.22';
        var res = messages.generateLocationMessage('Mike', lat, lon);

        expect(res.from).toEqual('Mike');
        expect(res.url).toEqual(`https://www.google.com/maps?=${lat},${lon}`);
        expect(res.createdAt).toBeA('number');
    });
});