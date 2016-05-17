class Buff {
    constructor(prefab, playground, uid, subType) {
        this.playground = playground;
        this.uid = uid;
        this.type = 'Buff';
        
        this.subType = subType;
        
        this.impactFlag = 4;
        this.impactFlags = 2;
        
        this.node = cc.instantiate(prefab);
        this.component = this.node.getComponent('Buff');
        
        this.component.halfSize = {
            x: 30,
            y: 30
        };
        
        this.component.init(subType);
    }
    
    get x() {
        return this.node.x;
    }
    
    get y() {
        return this.node.y;
    }
    
    get halfSize() {
        return {
            x: 30,
            y: 30
        };
    }
    
    appendToPlayground(position) {
        this.node.setPosition(position);
        this.playground.node.addChild(this.node);
    }
    
    remove() {
        this.node.removeFromParent();
        window.Global.pool.removeNode('buff' + this.uid);
    }
    
}

module.exports = Buff;