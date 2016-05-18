function killstreaks(winner) {
    var nickname = winner.nickname;
    var kill = winner.kill > 5 ? 5 : winner.kill;
    var count = ['双', '三', '四', '五'][kill - 2];
    
    return `${nickname}完成了${count}杀！`;
}

function firstBlood(winner) {
    var nickname = winner.nickname;
    return `${nickname}获得了第一滴血`;
}

function kill(winner, loser) {
    var winnerNickName = winner.nickname;
    var loserNickName = loser.nickname;
    var capacity = loser.capacity;
    
    return `${winnerNickName}击毁了${loserNickName}，获得了${capacity * 50}钻石`;
}


cc.Class({
    extends: cc.Component,

    properties: {
        data: {
            default: {}
        },
        killstreaksTimer: {
            default: {}
        },
        display: {
            default: null,
            type: cc.Label
        }
    },

    onLoad: function() {
        this.scoreStrings = [];
        this.firstBlood = true;
        
        
        setInterval(() => {
            if (this.scoreStrings.length) {
                this.display.string = this.scoreStrings.shift();
            }
            
        }, 2 * 1000);
    },
    
    putUser: function(user) {
        this.data[user.uid] = {
            nickname: user.nickname,
            kill: 0,
            capacity: user.head + user.body + user.wheel + 3
        };
    },
    
    removeUser: function(uid) {
        clearTimeout(this.killstreaksTimer[uid]);
        delete this.data[uid];
    },
    
    createData: function(winnerUid, loserUid) {
        var winner = this.data[winnerUid];
        var loser = this.data[loserUid];
        
        winner.kill++;
        
        this.killstreaksTimer[winnerUid] = setTimeout(() => {
            winner.kill = 0;   
        }, 60 * 1000);
        
        loser.kill = 0;
        
        if (this.killstreaksTimer[loserUid]) {
            clearTimeout(this.killstreaksTimer[loserUid]);
        }
        
        this.scoreStrings.push(kill(winner, loser));
        
        if (winner.kill >= 2) {
            this.scoreStrings.push(killstreaks(winner));
        }
        
        if (this.firstBlood) {
            this.scoreStrings.push(firstBlood(winner));  
            this.firstBlood = false;
        }
        
    }
});
