class QuadTree {
    
    constructor(bounds, level = 0) {
        this.objs = {};
        this.nodes = [];
        this.level = level;
        this.bounds = bounds;
    }
    
    getIndex(rect) {
        rect = rect[Object.keys(rect)[0]];
        var bounds = this.bounds;
        
        var onTop = rect.y - rect.halfSize.y >= bounds.cy;
        var onBottom = rect.y + rect.halfSize.y <= bounds.cy;
        var onLeft = rect.x + rect.halfSize.x <= bounds.cx;
        var onRight = rect.x - rect.halfSize.x >= bounds.cx;
        
        if (onTop && onRight) return 0;
        if (onTop && onLeft) return 1;
        if (onBottom && onLeft) return 2;
        if (onBottom && onRight) return 3;
        return -1;
    }
    
    split() {
        var level = this.level;
        var bounds = this.bounds;
        var cWidth = bounds.width / 2;
        var cHeight = bounds.height / 2;
        
        this.nodes.push(
            new QuadTree({width: cWidth, height: cHeight, cx: cWidth / 2, cy: cHeight / 2}, level + 1),
            new QuadTree({width: cWidth, height: cHeight, cx: -cWidth / 2, cy: cHeight / 2}, level + 1),
            new QuadTree({width: cWidth, height: cHeight, cx: -cWidth / 2, cy: -cHeight / 2}, level + 1),
            new QuadTree({width: cWidth, height: cHeight, cx: cWidth / 2, cy: -cHeight / 2}, level + 1)
        );
    }
    
    insert(rect) {
        var objs = this.objs;
        var i;
        var index;
        
        if (this.nodes.length) {
            index = this.getIndex(rect);
            if (index !== -1) {
                this.nodes[index].insert(rect);
                return;
            }
        }
        
        objs[Object.keys(rect)[0]] = rect[Object.keys(rect)[0]];

        if (!this.nodes.length &&
            Object.keys(this.objs).length > QuadTree.MAX_OBJECTS) {
            
            
            this.split();
            
            for (i in objs) {
                var _rect = {
                    [i]: objs[i]
                };
                index = this.getIndex(_rect);
                if (index !== -1) {
                    this.nodes[index].insert(_rect);
                    delete objs[i];
                }
            }
        }
    }
    
    retrieve(rect) {
        var result = {};
        var index;
        
        if (this.nodes.length) {
            index = this.getIndex(rect);
            if (index !== -1) {
                result = Object.assign(result, this.nodes[index].retrieve(rect));
            }
        }
        
        result = Object.assign(result, this.objs);
        
        return result;
    }
}

QuadTree.MAX_OBJECTS = 2;


var tree = new QuadTree({width: 1680, height: 1200, cx: 0, cy: 0});


var a = {
    a: {x: -50, y: 50, halfSize: {x: 38, y: 38}}
};

var b = {
    b: {x: 50, y: 50, halfSize: {x: 38, y: 38}}
};

var c = {
    c: {x: 50, y: -50, halfSize: {x: 38, y: 38}}
};

var d = {
    d: {x: -50, y: -50, halfSize: {x: 38, y: 38}}
};

tree.insert(a);
tree.insert(b);
tree.insert(c);
tree.insert(d);

// var r = tree.retrieve({
//     e: {x: -100, y: -100, halfSize: {x: 38, y: 38}}
// });

// console.log(r);

// console.log(tree);


