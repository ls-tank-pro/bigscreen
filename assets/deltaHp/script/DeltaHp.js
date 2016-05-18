cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Label
        }
    },
    
    onBoomEnd: function() {
        this.node.removeFromParent();
        window.Global.deltaHpSet.putItem(this.node);
    },
    
    onLoad: function() {
    },
    
    onEnable: function() {
        this.bg.string = this.node.deltaHp;
        var anim = this.getComponent(cc.Animation);
        anim.play();
    }
});
