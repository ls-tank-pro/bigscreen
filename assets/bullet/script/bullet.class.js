class Bullet {
    constructor(prefeb, playground, position, user, direction) {
        this.uid = user.uid;
        this.fireLevel = user.data.fire ;
        this.type = 'Bullet';
        
        this.impactFlag = 1;
        this.impactFlags = 3;
        
        this.node = cc.instantiate(prefeb);
        this.component = this.node.getComponent('Bullet');
        
        this.component.speed = 200;
        this.component.velocity = { x: 0, y: 0 };
        
        this.component.init(this.fireLevel);
        this.setHalfSize();
        
        this.rotate(direction);
        this.setMotionState(direction);
        this.appendToPlayground(playground, position);
        
        this.addListener();
    }
    
    setHalfSize() {
        var _node = this.node.children[0];
        
        this.component.halfSize = {
            x: _node.width / 2,
            y: _node.height / 2
        };
    }
    
    get x() {
        return this.node.x;
    }
    
    get y() {
        return this.node.y;
    }
    
    get halfSize() {
        return this.component.halfSize;
    }
    
    get attack() {
        return (this.fireLevel + 1) * (this.strengthen ? 2 : 1)
    }
    
    addListener() {
        this.node.on('outOfPlayground', this.remove, this);
        this.node.on('impact', this.beImpact, this);
    }
    
    beImpact(event) {
        this.remove();
    }
    
    remove() {
        this.node.off('outOfPlayground', this.remove, this);
        this.component.destroy();
        window.Global.bulletsSet.remove(this.index);
    }
    
    appendToPlayground(playground, position) {
        this.node.setPosition(position);
        playground.node.addChild(this.node);
    }
    
    rotate(direction) {
        var deg = [0, 90, 180, 270];
        
        this.node.rotation = deg[direction];
    }
    
    setMotionState(direction) {
        var velocity = [
            { x: 0, y: this.component.speed },
            { x: this.component.speed, y: 0 },
            { x: 0, y: -this.component.speed },
            { x: -this.component.speed, y: 0 },
        ];
        
        this.component.velocity = velocity[direction];
    }
}

module.exports = Bullet;