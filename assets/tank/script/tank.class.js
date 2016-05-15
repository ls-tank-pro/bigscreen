class Tank {
    constructor(prefab, playground, position, user) {
        this.uid = user.uid;
        this.type = 'Tank';
        this.nickname = user.nickname;
        
        this.node = cc.instantiate(prefab);
        this.component = this.node.getComponent('Tank');
        
        this.component.velocity = { x: 0, y: 0 };
        this.component.direction = 0;
        this.component.halfSize = { x: 38, y: 38 };
        
        this.equip = {
            head: user.head,
            body: user.body,
            wheel: user.wheel
        };
        
        this.component.init(this.equip);
        
        this.appendToPlayground(playground, position);
    }
    
    get x() {
        return this.node.x;
    }
    
    get y() {
        return this.node.y;
    }
    
    get halfSize() {
        return {x: 38, y: 38};
    }
    
    appendToPlayground(playground, position) {
        this.node.setPosition(position);
        playground.node.addChild(this.node);
    }
    
    rotate(direction) {
        var deg = [0, 90, 180, 270];
        
        this.node.children[3].runAction(cc.rotateTo(0.1, deg[direction]));
    }
    
    changeMotionState(direction) {
        var velocity = [
            { x: 0, y: this.component.speed },
            { x: this.component.speed, y: 0 },
            { x: 0, y: -this.component.speed },
            { x: -this.component.speed, y: 0 },
            { x: 0, y: 0 }
        ];
        
        this.component.velocity = velocity[direction];
        
        if (direction !== 4) {
            this.component.direction = direction;
            this.rotate(direction);
        }
    }
}

module.exports = Tank;