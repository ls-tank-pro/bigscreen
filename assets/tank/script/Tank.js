var level = {
    head: [1, 2, 3, 4, 5, 6],
    body: [5, 6, 7, 8, 9, 10],
    wheel: [200, 220, 240, 260, 280, 300]
};

cc.Class({
    extends: cc.Component,

    properties: {
        buffs: {
            default: [],
            type: cc.Node
        },
        buffContainer: {
            default: null,
            type: cc.Node
        },
        nickname: {
            default: null,
            type: cc.Label
        },
        heads: {
            default: [],
            type: cc.SpriteFrame
        },
        bodys: {
            default: [],
            type: cc.SpriteFrame
        },
        wheelsPre: {
            default: [],
            type: cc.SpriteFrame
        },
        wheelsNext: {
            default: [],
            type: cc.SpriteFrame
        },
        head: {
            default: null,
            type: cc.Sprite
        },
        body: {
            default: null,
            type: cc.Sprite
        },
        wheelPre: {
            default: null,
            type: cc.Sprite
        },
        wheelNext: {
            default: null,
            type: cc.Sprite
        }
    },

    onLoad: function() {
        this.buffAnim = this.buffContainer.getComponent(cc.Animation);
        this.buffs.forEach(buff => buff.active = false);
        this.buffTimer = [false, false, false];
    },
    
    getBuff: function() {
        return this.buff;  
    },
    
    addBuff: function(index) {
        if (this.buffTimer[index]) {
            clearTimeout(this.buffTimer[index]);   
        } else {
            this.buffs[index].active = true;
        }
        
        this.buffTimer[index] = setTimeout(() => {
            this.buffTimer[index] = false;
            this.buffs[index].active = false;
            
            if (this.buffTimer.filter(item => item === false).length === 3) {
                this.buffAnim.stop();
            }
        }, 5 * 1000);
        
        if (this.buffTimer.filter(item => item !== false).length === 1) {
            this.buffAnim.play();
        }
    },

    // update: function(dt) {
        
    // },
    
    lateUpdate: function(dt) {
        var x = this.velocity.x;
        var y = this.velocity.y;
        this.node.x += x * dt;
        this.node.y += y * dt;
    },
    
    onDestroy: function() {
    },
    
    init: function(equip, nickname) {
        this.nickname.string = nickname;
        this.speed = level.wheel[equip.wheel];
        
        this.head.spriteFrame = this.heads[equip.head];
        this.body.spriteFrame = this.bodys[equip.body];
        this.wheelPre.spriteFrame = this.wheelsPre[equip.wheel];
        this.wheelNext.spriteFrame = this.wheelsNext[equip.wheel];
        
        
    }
});
