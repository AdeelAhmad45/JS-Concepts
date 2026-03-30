// private methods
const kiranaStore = (function(){
    let itemCount = 0;
    const goDown = [];

    return {
        add(name){
            itemCount++;
            goDown.push(name);
            return `Sharma ji stock items: ${name}`;
        },
        count(){
            return itemCount;
        },
        list(){
            return goDown.slice();
        }
    }
})()

// console.log(kiranaStore.add('Tea Packs 10'));
// console.log(kiranaStore.add('Mint 10kg'));
// console.log('Count', kiranaStore.count());
// console.log('List',kiranaStore.add('Tea Packs 10'));

const accountBook = (function(){
    const records = [];
    let accessLog = [];

    function logAccess(action){
        accessLog.push(`[${new Date().toISOString().slice(0, 10)}] - ${action}`)
    }

    function store(doc){
        logAccess(`Stored : ${doc}` )
        records.push(doc)
    }

    function retrieve(index){
        logAccess(`Retrieved: ${index}`)
        return records[index] || 'Not found'
    }

    function getAccessCount(){
        return records.length
    }

    function getAccessLog(){
        return accessLog.slice();

    }
    return {
        store,
        retrieve,
        count: getAccessCount,
        log: getAccessLog
    }
})()

accountBook.store('Rice 5kg')
accountBook.store('Breads 4 packets')
/*
console.log('Sharma ji retrieved : ', accountBook.retrieve(0));
console.log('Count: ', accountBook.count());
console.log('Log: ', accountBook.log().length);
console.log('Type of log access', typeof accountBook.logAccess);
*/

// simulation 
const SharmaMart = {};

SharmaMart.Inventory = (function(){
    function unitPrice(totalPrice, quatity){
        return totalPrice / quatity
    }

    function totalWeight(totalPerWeight, quatity){
        return totalPerWeight * quatity
    }

    // export {unitPrice, totalPerWeight}
    return {unitPrice, totalWeight}
})()

SharmaMart.BillingCalculator = (function(Inv){
    function bulkDiscount(pricePerKg, kgs){
        const totalweight = Inv.totalWeight(pricePerKg,kgs)
        return `${(totalweight * 0.95).toFixed(1)} after 5% bulk discount`
    }
    return {bulkDiscount}
})(SharmaMart.Inventory)

console.log(SharmaMart.BillingCalculator.bulkDiscount(70, 50));
console.log('Store Module: ', Object.keys(SharmaMart));
console.log('Inventory Api: ', Object.keys(SharmaMart.Inventory));

