var Buff = require('buff.class');

cc.Class({
    extends: cc.Component,

    properties: {
        prefab: {
            default: null,
            type: cc.Prefab
        },
        cache: {
            default: {}
        }
    },

    onLoad: function() {
        this.index = 0;
        var attack = new Buff(this.prefab, window.Global.pool.playground, 0, 0);
        var defense = new Buff(this.prefab, window.Global.pool.playground, 0, 1);
        var speed = new Buff(this.prefab, window.Global.pool.playground, 0, 2);
        var hp = new Buff(this.prefab, window.Global.pool.playground, 0, 3);
        
        this.cache = {
            attack: attack,
            defense: defense,
            speed: speed,
            hp: hp
        };
    },
    
    create: function(subType) {
        // this.clear();
        var position = window.Global.tanksSet.createPosition();
        subType = ['attack', 'defense', 'speed', 'hp'][subType];
        var buff = this.cache[subType];
        buff.uid = this.index++;
        buff.appendToPlayground(position);
        
        return buff;
    },
    
    clear: function() {
        for (var i in this.cache) {
            
            this.cache[i].node.removeFromParent();
            window.Global.pool.removeNode('buff' + this.cache[i].uid);
        }
    }
    
    // remove: function() {
        
    // }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
