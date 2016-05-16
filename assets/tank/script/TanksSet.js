var Tank = require('tank.class');
var Position = require('position');
var _ = require('lodash');

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
    
    create: function(user) {
        var tank = new Tank(this.prefab, window.Global.pool.playground, this.createPosition(), user);
        this.cache[user.uid] = tank;
        return tank;
    },
    
    remove: function(user) {
        if (this.cache[user.uid]) {
            this.cache[user.uid].remove();
            window.Global.pool.removeNode('tank' + user.uid);
        }
        
        
        // to fix
        // if (this.cache[user.uid]) {
        //     this.cache[user.uid].component.destroy(); 
        //     delete this.cache[user.uid];
        // }
    },
    
    createPosition: function() {
        return Position.createUnoccupiedPosition(_.toArray(this.cache));
    },

    onLoad: function() {
        
    }
});
