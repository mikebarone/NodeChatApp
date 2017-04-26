const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node'
        },
        {
            id: '2',
            name: 'Marta',
            room: 'Java'
        },
        {
            id: '3',
            name: 'Tommy',
            room: 'Node'
        }];
    });

    it('Should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Mike',
            room: 'Dev Room'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        
        expect(users.users).toEqual([user]);
    });

    it('Should return names for Node', () => {
        var userList = users.getUserList('Node');
        expect(userList).toEqual(['Mike', 'Tommy']);
    });

    it('Should remove user', () => {

        var userOne = users.users[0]; 
        var userTwo = users.users[1]; 
        var userTree = users.users[2]; 

        var resUser = users.removeUser(userTwo.id);
        expect(resUser).toEqual(userTwo);
        expect(users.users).toEqual([userOne,userTree]);
    });

    it('Should not remove user', () => {

        var userOne = users.users[0]; 
        var userTwo = users.users[1]; 
        var userTree = users.users[2]; 

        var resUser = users.removeUser('44');
        expect(resUser).toNotExist();
        expect(users.users).toEqual([userOne,userTwo,userTree]);
    });

    it('Should get user', () => {

        var userTwo = users.users[1]; 

        var resUser = users.getUser(userTwo.id);
        expect(resUser).toEqual(userTwo);
    });

    it('Should not get user', () => {

        var resUser = users.getUser('44');
        expect(resUser).toNotExist();
    });
});