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
        this.buffTimer();
    },
    
    onServer: function() {
        Socket.on('b-enter', user => {
            this.pool.createTank(user.data);
        });
        Socket.on('b-leave', user => {
            this.pool.tanksSet.remove(user.data);
        });
        Socket.on('b-direction', user => {
            this.pool.changeTankMotion(user);
        });
        Socket.on('b-fire', user => {
            this.pool.tankFire(user);
        });
    },
    
    buffTimer: function() {
        var index = 0;
        this.schedule(function() {
            this.unscheduleAllCallbacks();
            window.Global.buffsSet.clear();
            // this.pool.createBuff(index % 4);
            // this.pool.createBuff((index + 1) % 4);
            // this.pool.createBuff(0);
            // this.pool.createBuff(1);
            // this.pool.createBuff(2);
            index++;
        }, 2);
    }
});
