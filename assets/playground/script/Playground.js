var Socket = require('socket');

cc.Class({
    extends: cc.Component,

    properties: {
        pool: {
            default: null,
            type: cc.Component
        }
    },

    onLoad: function() {
        Socket.connect();
        this.onServer();
        
    },
    
    onServer: function() {
        Socket.on('b-enter', user => {
            this.pool.createTank(user.data);
        });
        Socket.on('b-leave', user => {
            this.pool.removeTank(user.data);
        });
        Socket.on('b-direction', user => {
            this.pool.changeTankMotion(user);
        });
        Socket.on('b-fire', user => {
            this.pool.tankFire(user);
        });
    }
});
