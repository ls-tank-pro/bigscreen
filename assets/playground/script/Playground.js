cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Sprite
        },
        bgList: {
            default: [],
            type: cc.SpriteFrame
        },
        playground: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function() {
        this.bg.spriteFrame = this.bgList[0];
    }
});
