cc.Class({
    extends: cc.Component,

    properties: {
        buff: {
            default: null,
            type: cc.Sprite
        },
        buffs: {
            default: [],
            type: cc.SpriteFrame
        }
    },
    
    init: function(subType) {
        this.buff.spriteFrame = this.buffs[subType];
    },
    
    onLoad: function() {
           
    }
});
