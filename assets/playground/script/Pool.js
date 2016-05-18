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
        buffsSet: {
            default: null,
            type: cc.Component
        },
        boomsSet: {
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
        bullet.bullet.strengthen = _tank.component.getBuff()[0] !== false;
        
        ImpactTree.insert({
            ['bullet' + bullet.index]: bullet.bullet
        });
    },
    
    createBuff: function(subType) {
        var buff = this.buffsSet.create(subType);
        this.nodePool['buff' + buff.uid] = buff;
        
        ImpactTree.insert({
            ['buff' + buff.uid]: buff
        });
        
    },
    
    removeNode: function(key) {
        if (this.nodePool[key]) {
            ImpactTree.remove({
                [key]: this.nodePool[key]
            });
            delete this.nodePool[key];
        }
    },
    
    checkImpact: function() {
        var hasBeenCheckImpact = [];
        for (var key in this.nodePool) {
            
            hasBeenCheckImpact.push(key);
            
            var result = ImpactTree.retrieve({
                [key]: this.nodePool[key]
            });
            
            
            for (var index in result) {
                if (hasBeenCheckImpact.indexOf(index) !== -1) {
                    continue;
                }
                
                var me = result[index];
                var target = this.nodePool[key];
                
                if (!target) {
                    continue;
                }
                
                if (me.uid !== target.uid) {
                    if (me.impactFlag & target.impactFlags) {
                        
                        var maxX = me.halfSize.x + target.halfSize.x;
                        var maxY = me.halfSize.y + target.halfSize.y;
                        
                        var offsetX = Math.abs(me.x - target.x);
                        var offsetY = Math.abs(me.y - target.y);
                        
                        if (offsetX < maxX && offsetY < maxY) {
                            me.node.emit('impact', target);
                            target.node.emit('impact', me);
                        }
                    }
                }
            }
        }  
    },
    
    onLoad: function() {
        window.Global = {
            tanksSet: this.tanksSet,
            bulletsSet: this.bulletsSet,
            buffsSet: this.buffsSet,
            boomsSet: this.boomsSet,
            pool: this
        };
    },
    
    update: function(dt) {
        ImpactTree.refresh();
        this.checkImpact();
    }
});
