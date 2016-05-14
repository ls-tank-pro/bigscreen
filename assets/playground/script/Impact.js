var _ = require('../../public/lib/lodash.js');

function isInner(rect, bounds) {
    // todo
}

function QuadTree(bounds, level) {
    this.objects = [];
    this.nodes = [];
    this.level = level || 0;
    this.bounds = bounds;
}

QuadTree.prototype.MAX_OBJECTS = 10;
QuadTree.prototype.MAX_LEVELS = 5;

QuadTree.prototype.getIndex = function(rect) {
    var bounds = this.bounds;
    
    var onTop = rect.y - rect.halfSize.y >= bounds.y;
    var onBottom = rect.y + rect.halfSize.y <= bounds.y;
    var onLeft = rect.x + rect.halfSize.x <= bounds.x;
    var onRight = rect.x - rect.halfSize.x >= bounds.x;
    
    if (onTop && !onLeft && !onRight) return [0, 1];
    if (onRight && !onTop && !onBottom) return [0, 3];
    if (onBottom && !onLeft && !onRight) return [2, 3];
    if (onLeft && !onTop && !onBottom) return [1, 2];
    
    if (onTop && onRight) return [0];
    if (onTop && onLeft) return [1];
    if (onBottom && onLeft) return [2];
    if (onBottom && onRight) return [3];
    
    return [0, 1, 2, 3];
    
    
};

QuadTree.prototype.split = function() {
    var level = this.level;
    var bounds = this.bounds;
    
    var cWidth = bounds.width / 2;
    var cHeight = bounds.height / 2;
    
    this.nodes.push(
        new QuadTree({width: cWidth, height: cHeight, x: cWidth / 2, y: cHeight / 2}, level + 1),
        new QuadTree({width: cWidth, height: cHeight, x: -cWidth / 2, y: cHeight / 2}, level + 1),
        new QuadTree({width: cWidth, height: cHeight, x: -cWidth / 2, y: -cHeight / 2}, level + 1),
        new QuadTree({width: cWidth, height: cHeight, x: cWidth / 2, y: -cHeight / 2}, level + 1)
    );
};

QuadTree.prototype.insert = function(rect) {
    var objs = this.objects;
    var i, index;
    
    if (this.nodes.length) {
        index = this.getIndex(rect);
        
        index.forEach(value => {
            this.nodes[value].insert(rect);
        });
        
        return;
    }
    
    objs.push(rect);
    
    if (!this.nodes.length &&
        this.objects.length > this.MAX_OBJECTS &&
        this.level < this.MAX_LEVELS) {
        
        this.split();
        
        for (i = objs.length - 1; i >= 0; i--) {
            index = this.getIndex(objs[i]);
            
            index.forEach(value => {
                this.nodes[value].insert(objs.splice(i, 1)[0]);
            });
        }
    }
};

QuadTree.prototype.retrieve = function(rect) {
    var result = [];
    var index;
    var arr;
    var i;
    
    if (this.nodes.length) {
        index = this.getIndex(rect);
        
        result = result.concat(index.map(value => {
            return this.nodes[value].retrieve(rect)
        }))
    }
    
    result = result.concat(this.objects);
    
    return _.flattenDeep(result);
    
};

var tree = new QuadTree({width: 1680, height: 1200, x: 0, y: 0});


// tree.split();
// tree.nodes[0].split();
// tree.nodes[1].split();
// tree.nodes[2].split();
// tree.nodes[3].split();

// tree.insert({x: -50, y: 50, halfSize: {x: 38, y: 38}}); // 1
// tree.insert({x: -100, y: 50, halfSize: {x: 38, y: 38}}); // 2
// tree.insert({x: 50, y: 50, halfSize: {x: 38, y: 38}}); // 3
// tree.insert({x: 50, y: -50, halfSize: {x: 38, y: 38}}); // 4
// tree.insert({x: -50, y: -50, halfSize: {x: 38, y: 38}}); // 5
// tree.insert({x: -50, y: 0, halfSize: {x: 38, y: 38}}); // 6


// var r = tree.retrieve({x: 0, y: 0, halfSize: {x: 38, y: 38}});
// console.log(r);
