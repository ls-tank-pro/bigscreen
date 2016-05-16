function carve(rect, bounds) {
    var result = {};
    var key = Object.keys(rect)[0];
    rect = rect[key];
    
    var carveX = bounds.cx >= rect.x - rect.halfSize.x && bounds.cx <= rect.x + rect.halfSize.x;
    var carveY = bounds.cy >= rect.y - rect.halfSize.y && bounds.cy <= rect.x + rect.halfSize.y;
    
    if (carveX && carveY) {
        
        result[key + '0'] = {
            x: bounds.cx + (rect.x + rect.halfSize.x - bounds.cx) / 2,
            y: bounds.cy + (rect.y + rect.halfSize.y - bounds.cy) / 2,
            halfSize: {
                x: (rect.x + rect.halfSize.x - bounds.cx) / 2,
                y: (rect.y + rect.halfSize.y - bounds.cy) / 2
            }
        };
        
        result[key + '1'] = {
            x: bounds.cx - (rect.halfSize.x - rect.x - bounds.cx) / 2,
            y: bounds.cy + (rect.y + rect.halfSize.y - bounds.cy) / 2,
            halfSize: {
                x: (rect.halfSize.x - rect.x - bounds.cx) / 2,
                y: (rect.y + rect.halfSize.y - bounds.cy) / 2
            }
        };
        
        result[key + '2'] = {
            x: bounds.cx - (rect.halfSize.x - rect.x - bounds.cx) / 2,
            y: bounds.cy - (rect.halfSize.y - rect.y - bounds.cy) / 2,
            halfSize: {
                x: (rect.halfSize.x - rect.x - bounds.cx) / 2,
                y: (rect.halfSize.y - rect.y - bounds.cy) / 2
            }
        };
        
        result[key + '3'] = {
            x: bounds.cx + (rect.x + rect.halfSize.x - bounds.cx) / 2,
            y: bounds.cy - (rect.halfSize.y - rect.y - bounds.cy) / 2,
            halfSize: {
                x: (rect.x + rect.halfSize.x - bounds.cx) / 2,
                y: (rect.halfSize.y - rect.y - bounds.cy) / 2
            }
        };
        
    } else if (carveX) {
        result[key + 'right'] = {
            x: bounds.cx + (rect.x + rect.halfSize.x - bounds.cx) / 2,
            y: rect.y,
            halfSize: {
                x: (rect.x + rect.halfSize.x - bounds.cx) / 2,
                y: rect.halfSize.y
            }
        };
        
        result[key + 'left'] = {
            x: bounds.cx - (rect.halfSize.x - rect.x - bounds.cx) / 2,
            y: rect.y,
            halfSize: {
                x: (rect.halfSize.x - rect.x - bounds.cx) / 2,
                y: rect.halfSize.y
            }
        };
    } else if (carveY) {
        result[key + 'top'] = {
            x: rect.x,
            y: bounds.cy + (rect.y + rect.halfSize.y - bounds.cy) / 2,
            halfSize: {
                x: rect.halfSize.x,
                y: (rect.y + rect.halfSize.y - bounds.cy) / 2
            }
        };
        
        result[key + 'bottom'] = {
            x: rect.x,
            y: bounds.cy - (rect.halfSize.y - rect.y - bounds.cy) / 2,
            halfSize: {
                x: rect.halfSize.x,
                y: (rect.halfSize.y - rect.y - bounds.cy) / 2
            }
        };
        
        
    }  
    
    return result;
}

function isInner(rect, bounds) {
    var key = Object.keys(rect)[0];
    rect = rect[key];
    
    var isInX = rect.x <= bounds.cx + bounds.width / 2 && rect.x >= bounds.cx - bounds.width / 2;
    var isInY = rect.y <= bounds.cy + bounds.height / 2 && rect.y >= bounds.cy - bounds.height / 2;
    
    return isInX && isInY;
}

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
        var arr;
        var i;
        
        if (this.nodes.length) {
            index = this.getIndex(rect);
            if (index !== -1) {
                result = Object.assign(result, this.nodes[index].retrieve(rect));
            } else {
                arr = carve(rect, this.bounds);
                for (i in arr) {
                    index = this.getIndex({
                        [i]: arr[i]
                    });
                    result = Object.assign(result, this.nodes[index].retrieve({
                        [i]: arr[i]
                    }));
                }
            }
        }
        
        result = Object.assign(result, this.objs);
        return result;
    }
    
    refresh(root) {
        var objs = this.objs;
        var rect, index, i, j, len;
        
        root = root || this;
        
        for (i in objs) {
            rect = {
                [i]: objs[i]
            };
            
            index = this.getIndex(rect);
            if (index !== -1) {
                if (!isInner(rect, this.bounds)) {
                    if (this !== root) {
                        console.log('refresh...');
                        root.insert(rect);
                        delete objs[i];
                    }
                } else if (this.nodes.length) {
                    this.nodes[index].insert(rect);
                    delete objs[i];
                }
            }
            
        }
        
        for (j = 0, len = this.nodes.length; j < len; j++) {
            this.nodes[j].refresh(root);
        }
    }
    
    remove(rect) {
        var key = Object.keys(rect)[0];
        var objs = this.objs;
        var index;
        
        if (this.nodes.length) {
            index = this.getIndex(rect);
            if (index !== -1) {
                this.nodes[index].remove(rect);
                return;
            }
        }
        
        delete objs[key];
    }
}

QuadTree.MAX_OBJECTS = 10;


module.exports = new QuadTree({width: 1680, height: 1200, cx: 0, cy: 0});


