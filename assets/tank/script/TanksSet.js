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
        pool: {
            default: null,
            type: cc.Component
        },
        cache: {
            default: {}
        }
    },
    
    create: function(user) {
        var tank = new Tank(this.prefab, this.pool.playground, this.createPosition(), user);
        this.cache[user.uid] = tank;
        return tank;
    },
    
    remove: function(user) {
        if (this.cache[user.uid]) this.cache[user.uid].node.active = false;
        
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
