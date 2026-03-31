const stationClock = {
    _hour: 12,
    _minute: 0,

    tick(){
        this._minute += 1
        if (this._minute >= 60) {
            this._minute = 0
            this._hour = (this._hour % 12) + 1
        }
    },
    
    time(){
        const h = String(this._hour).padStart(2, "0")
        const m = String(this._minute).padStart(2, "0")
        return `${h}:${m}`
    }

}

console.log("Sharma ji Clock", stationClock.time())
stationClock.tick()
stationClock.tick()
console.log("Time after two tick: ",stationClock.time());

const platform1 = stationClock
const platform2 = stationClock

// console.log("Same Instance", platform1 === platform2);

const stationBell = (function(){
    let ringCount = 0;

   const instance = {
        ring(){
            ringCount++
            return `Sharma ji rings the bell ${ringCount}`
        },
        total(){
            return ringCount
        }
   }

   return instance;
})()

console.log("Station bell ring", stationBell.ring());
console.log("Station bell ring", stationBell.ring());
console.log("Ring Count: ", stationBell.total());


class ClockMechanism {
    constructor(){
        if (ClockMechanism._instance) {
            return ClockMechanism._instance
        }
        this.gears = 42
        this.wound = false
        ClockMechanism._instance = this
    }

    wind(){
        this.wound = true
        return `Change the state true`
    }

    status(){
        return `Gears: ${this.gears} Wound: ${this.wound}`
    }

    static getInstance(){
        if (!ClockMechanism._instance) {
            new ClockMechanism()  
        }
        return ClockMechanism._instance
    }

}

ClockMechanism.instance = null;
const mech1 = new ClockMechanism() 
const mech2 = new ClockMechanism() 
// console.log("Same or not", mech1 === mech2);


function createStaticConfig(){
    const config = {
        platform: 8,
        tracks: 12,
        junction: "Secunderabad"
    }
    return Object.freeze(config)

}

const stationConfig = createStaticConfig()
console.log("Plateform: ", stationConfig.platform);
stationConfig.platform = 4
console.log("Plateform: ", stationConfig.platform);








