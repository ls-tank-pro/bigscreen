cc.Class({
    extends: cc.Component,

    properties: {
        tanksSet: {
            default: null,
            type: cc.Component
        },
        playground: {
            default: null,
            type: cc.Component
        },
        nodePool: {
            default: {}
        }
    },
    
    createTank: function(user) {
        var tank = this.tanksSet.create(user);
        this.nodePool['tank' + user.uid] = tank;
    },
    
    removeTank: function(user, completely) {
        this.tanksSet.remove(user);
        delete this.nodePool['tank' + user.uid];
    },
    
    changeTankMotion: function(user) {
        if (this.nodePool['tank' + user.uid]) {
            this.nodePool['tank' + user.uid].changeMotionState(user.data.direction);    
        }
        
    },
    
    onLoad: function() {
        
    }
});
