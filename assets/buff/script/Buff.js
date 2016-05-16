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

    // use this for initialization
    onLoad: function() {

    }
});
