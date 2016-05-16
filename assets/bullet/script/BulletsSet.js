var Bullet = require('bullet.class');
var index = 0;
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
    
    create: function(user, position, direction) {
        var bullet = new Bullet(this.prefab, window.Global.pool.playground, position, user, direction);
        return {
            bullet, 
            index: index++
        };
    },
    
    remove: function(index) {
        window.Global.pool.removeNode('bullet' + index);
    },
    
    onLoad: function() {

    }
});
