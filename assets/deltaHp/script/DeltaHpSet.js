cc.Class({
    extends: cc.Component,

    properties: {
        prefab: {
            default: null,
            type: cc.Prefab
        },
        cache: {
            default: []
        }
    },
    
    onLoad: function() {
        for (var i = 0; i < 20; i++) {
            this.cache.push(this.createItem());
        }
    },
    
    createItem: function() {
        return cc.instantiate(this.prefab);
    },
    
    getItem: function(position, deltaHp) {
        var item;
        if (this.cache.length) {
            item = this.cache.pop();
        } else {
            item = this.createItem();
        }
        item.setPosition(position);
        item.deltaHp = deltaHp;
        
        item.parent = window.Global.pool.playground.node;
        
    },
    
    putItem: function(item) {
        this.cache.push(item);
    }
});
