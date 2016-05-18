class Tank {
    constructor(prefab, playground, position, user) {
        this.uid = user.uid;
        this.type = 'Tank';
        this.nickname = user.nickname;
        
        this.impactFlag = 2;
        this.impactFlags = 7;
        
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
        
        this.component.init(this.equip, this.nickname);
        
        this.appendToPlayground(playground, position);
        
        this.addListener();
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
    
    getPosition() {
        return {
            x: this.node.x,
            y: this.node.y
        };
    }
    
    addListener() {
        this.node.on('impact', this.beImpact, this);
    }
    
    beImpact(event) {
        if (event.detail.type === 'Bullet') {
            var attack = event.detail.attack;
            var defense = this.component.getBuff()[1] ? 2 : 1;
            var deltaHp = - (attack / defense);
            
            event.detail.remove();
            
            this.updateHp(deltaHp);
            this.checkIsDead(deltaHp);
            
        } else if (event.detail.type === 'Tank') {
            this.component.velocity = { x: -(this.component.velocity.x), y: -(this.component.velocity.y)};
        } else if (event.detail.type === 'Buff') {
            this.component.addBuff(event.detail.subType);
            event.detail.remove();
        }
        
    }
    
    updateHp(deltaHp) {
        this.component.hp += deltaHp;
        this.component.updateHpLine();
    }
    
    checkIsDead(deltaHp) {
        var position = this.getPosition();
        if (this.component.hp <= 0) {
            
            
            this.remove();
            window.Global.pool.removeNode('tank' + this.uid);
            
            window.Global.boomsSet.getItem(position);
        }
        this.component.explosion();
        window.Global.deltaHpSet.getItem(position, deltaHp);
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
    
    remove() {
        this.node.active = false;
    }
}

module.exports = Tank;