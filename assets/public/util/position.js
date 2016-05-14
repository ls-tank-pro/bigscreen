exports.isRangeIn = function(target, min, max) {
    return target >= min && target <= max;
};


exports.getRandomPosition = function(maxSize) {
    var maxX = maxSize.width / 2 - 42;
    var maxY = maxSize.height / 2 - 42;
    var randX = cc.randomMinus1To1() * maxX;
    var randY = cc.randomMinus1To1() * maxY;
        
    return cc.p(randX, randY);
};

exports.createUnoccupiedPosition = function(tanksSet) {
    var tempPosition = exports.getRandomPosition({width: 400, height: 400});
    
    var positionIsOccupied = tanksSet.some(function(tank) {
        var max = { x: tank.x + 84, y: tank.y + 84 };
        var min = { x: tank.x - 84, y: tank.y - 84 };
        
        return exports.isRangeIn(tempPosition.x, min.x, max.x) && exports.isRangeIn(tempPosition.y, min.y, max.y);
    });
    
    
    if (positionIsOccupied) return exports.createUnoccupiedPosition(tanksSet);
    else return tempPosition;
};