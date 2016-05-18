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
        for (var i = 0; i < 10; i++) {
            this.cache.push(this.createItem());
        }
    },
    
    createItem: function() {
        return cc.instantiate(this.prefab);
    },
    
    getItem: function(position) {
        var boom;
        if (this.cache.length) {
            boom = this.cache.pop();
        } else {
            boom = this.createItem();
        }
        boom.setPosition(position);
        boom.parent = window.Global.pool.playground.node;
    },
    
    putItem: function(boom) {
        this.cache.push(boom);
    }
});
