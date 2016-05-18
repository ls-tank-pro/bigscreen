var level = {
    head: [1, 2, 3, 4, 5, 6],
    body: [5, 8, 11, 14, 17, 20],
    wheel: [200, 220, 240, 260, 280, 300]
};

cc.Class({
    extends: cc.Component,

    properties: {
        explosionAudio: {
            default: null,
            url: cc.AudioClip
        },
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
        },
        hpLine: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function() {
        this.buffAnim = this.buffContainer.getComponent(cc.Animation);
        this.buffs.forEach(buff => buff.active = false);
        this.buffTimer = [false, false, false];
    },
    
    getBuff: function() {
        return this.buffTimer;  
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
        }, 10 * 1000);
        
        if (this.buffTimer.filter(item => item !== false).length === 1) {
            this.buffAnim.play();
        }
    },
    
    lateUpdate: function(dt) {
        var x = this.velocity.x;
        var y = this.velocity.y;
        this.node.x += x * dt * (this.getBuff()[2] !== false ? 2 : 1);
        this.node.y += y * dt * (this.getBuff()[2] !== false ? 2 : 1);
    },
    
    updateHpLine: function() {
        this.hpLine.width = this.hp / this.maxHp * 90;
    },
    
    explosion: function() {
        cc.audioEngine.playEffect(this.explosionAudio, false);
    },
    
    onDestroy: function() {
    },
    
    init: function(equip, nickname) {
        this.nickname.string = nickname;
        this.speed = level.wheel[equip.wheel];
        
        this.maxHp = level.body[equip.body];
        this.hp = level.body[equip.body];
        
        
        this.head.spriteFrame = this.heads[equip.head];
        this.body.spriteFrame = this.bodys[equip.body];
        this.wheelPre.spriteFrame = this.wheelsPre[equip.wheel];
        this.wheelNext.spriteFrame = this.wheelsNext[equip.wheel];
        
        
    }
});
