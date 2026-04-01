const foreignWeatherApi = {
    fetch_weather(city_name){
        return {
            city_name,
            temp_fahrenheit: 72,
            wind_speed_mph: 5,
            condition: "Partialy_cloudy",
        }
    }
}

class WeatherAdapter {
    constructor(foreignApi){
        this._api = foreignApi
    }

    getWeather(city){
        const raw = this._api.fetch_weather(city)
        return {
            city: raw.city_name,
            tempCelsius: Math.round((raw.temp_fahrenheit - 32) * (5/9)),
            wind_kmh: Math.round((raw.wind_speed_mph) * 1.6),
            condition: raw.condition
        }
    }
}

// const weather = new WeatherAdapter(foreignWeatherApi)
// const reports = weather.getWeather("jaipur")
// console.log(reports);

const POKEDEX_API = {
    fetch_pokedex(name){
        return {
            name,
            type: "Electric",
            abilities: ["Static", "Lightning Rod"],
            baseStats: {
            hp: 35,
            attack: 55,
            defense: 40,
            speed: 90
            }
        }    
    }
}

class PokedexAdapter {
    constructor(pokedexApi){
        this._api = pokedexApi
    }

    getPokedex(poke_name){
        const val = this._api.fetch_pokedex(poke_name)
        return {
            poke_name: val.name,
            type: val.type,
            abilities: val.abilities,
            baseStats: val.baseStats

        }
    }
}

// const pokedex = new PokedexAdapter(POKEDEX_API)
// const poke_char = pokedex.getPokedex("Pickachu")
// console.log(poke_char);


const localStorageSim = (() => {
    const store = new Map()
    return {
        getItem(key){
            return store.has(key) ? store.get(key) : null;
        },
        setItem(key, value){
            return store.set(key, String(value));
        },
        getLength(){
            return store.size;
        },
        clear(){
            store.clear()
            return store.size;
        }

    }
})()

class AsyncStorageAdapter {
    constructor(syncStorage){
        this._storage = syncStorage
    }
    async getItem(key){
        const raw = this._storage.getItem(key)
        try {
            return JSON.parse(raw);
        } catch (error) {
            return raw
        }
    }

    async setItem(key, value){
        
        const raw = this._storage.setItem(key, JSON.stringify(value));
        return raw;
    }

    async getLength(){
        const raw = this._storage.getLength();
        return raw;
    }

    async clear(){
        const raw = this._storage.clear();
        return raw;
    }
}

async function runAsyncStorageDemo(){
    const storage = new AsyncStorageAdapter(localStorageSim)
    await storage.setItem("admin", {name: "Ramesh", password: "Alex@12344"})
    await storage.setItem("buyer", {name: "Mukesh", password: "Alex@12344"})
    await storage.setItem("seller", {name: "Suresh", password: "Alex@12344"})
    await storage.setItem("user", {name: "Alex", password: "Alex@12344"})
    await storage.getItem("user")
    await storage.getLength();
    await storage.clear();
   
}

runAsyncStorageDemo()