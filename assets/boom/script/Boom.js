cc.Class({
    extends: cc.Component,

    properties: {
        boomAudio: {
            default: null,
            url: cc.AudioClip
        },
    },
    
    onBoomEnd: function() {
        this.node.removeFromParent();
        window.Global.boomsSet.putItem(this.node);
    },
    
    onLoad: function() {
        
    },
    
    onEnable: function() {
        var anim = this.getComponent(cc.Animation);
        anim.play();
        cc.audioEngine.playEffect(this.boomAudio, false);
    }
});
