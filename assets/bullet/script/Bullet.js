cc.Class({
    extends: cc.Component,

    properties: {
        bullet: {
            default: null,
            type: cc.Sprite
        },
        bullets: {
            default: [],
            type: cc.SpriteFrame
        }
    },

    init: function(fireLevel) {
        this.bullet.spriteFrame = this.bullets[fireLevel];
    },
    
    onLoad: function() {
        
    },
    
    onDestroy: function() {
        this.node.destroy();
    },
    
    update: function(dt) {
        if (this.node.x > 840 || this.node.x < -840 || this.node.y > 600 || this.node.y < -600) {
            return this.node.emit('outOfPlayground');
        }
        this.node.x += this.velocity.x * dt;
        this.node.y += this.velocity.y * dt;
    }

});
