const months = ["Jan", "March", "April", "June"];


// Usunięcie immutable:
const monthsResult = months.filter(m => m !== 'March');
console.log('monthsResult', monthsResult);
console.log('months', months);
console.log('To nie ta sama referencja', monthsResult === months)


// Usunięcie mutujące !!!
months.splice(1, 1);
console.log(months);

