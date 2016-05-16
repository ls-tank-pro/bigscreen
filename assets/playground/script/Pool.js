var ImpactTree = require('Impact');

cc.Class({
    extends: cc.Component,

    properties: {
        tanksSet: {
            default: null,
            type: cc.Component
        },
        bulletsSet: {
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
        
        ImpactTree.insert({
            ['tank' + user.uid]: tank
        });
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
    
    tankFire: function(user) {
        var _tank = this.nodePool['tank' + user.uid];
        var position = _tank.getPosition();
        var direction = _tank.component.direction;
        
        var bullet = this.bulletsSet.create(user, position, direction);
        
        this.nodePool['bullet' + bullet.index] = bullet.bullet;
        bullet.bullet.index = bullet.index;
        
        ImpactTree.insert({
            ['bullet' + bullet.index]: bullet.bullet
        });
    },
    
    removeNode: function(key) {
        ImpactTree.remove({
            [key]: this.nodePool[key]
        });
        delete this.nodePool[key];
    },
    
    onLoad: function() {
        window.Global = {
            tanksSet: this.tanksSet,
            bulletsSet: this.bulletsSet,
            pool: this
        };
        
        // to test
        window.tree = ImpactTree;
    },
    
    update: function(dt) {
        ImpactTree.refresh();
    }
});
