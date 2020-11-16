function mdietz(transactions, roundingFactor, emv)
{
    
    // beginning market value
    var bmv = 0;
    
    // Sort by date
    transactions.sort(function(a, b){
        var da = new Date(a.date);
        var db = new Date(b.date);
        if (da > db) return 1;
        if (da < db) return -1;
        return 0;
    });
    
    // Total cashflows
    var flows = transactions.reduce(function(sum, current){
        return sum + (-1 * current.cashflow);
    }, 0);
    
    // Calculate the date difference
    var firstDate = transactions[0].date;
    var lastDate = transactions[ transactions.length - 1 ].date;
    var days = 1 + Math.floor(( new Date(lastDate) - new Date(firstDate)) / (1000*60*60*24));
    
    // Total weighted cashflows
    var weightedFlows = transactions.reduce(function(acc, t){
        
        if (t.cashflow == 0) return acc + 0;
        
        var cashflow = -1 * t.cashflow;
        var diff = 1 + Math.floor(( new Date(t.date) - new Date(firstDate)) / (1000*60*60*24));
        var weight = 1 - (diff / days);
        var rounded = weight.toFixed(roundingFactor);
        var weightedFlow = rounded * cashflow;
        
        return acc + weightedFlow;
        
    }, 0);
    
    // Modified Dietz
    var nonAnnualized = (emv-bmv-flows) / (bmv+weightedFlows);
    var annualized = Math.pow((1+nonAnnualized), (365/(days-1))) - 1;
    
    return {
        nonAnnualized: parseFloat(nonAnnualized.toFixed(roundingFactor)),
        annualized: parseFloat(annualized.toFixed(roundingFactor)),
        f: flows,
        fw: weightedFlows,
        numDays: days
    };
    
}

// Test
var roundingFactor = 8;
var endingMarketValue = 2295000;

var transactions = [
    { date: "2016-03-14", cashflow: -50000 },
    { date: "2016-03-31", cashflow: 0 },
    { date: "2016-04-03", cashflow: 25000 },
    { date: "2016-01-31", cashflow: 0 },
    { date: "2016-02-01", cashflow: -1250000 },
    { date: "2016-02-16", cashflow: 150000 },
    { date: "2016-02-28", cashflow: -75000 },
    { date: "2016-03-05", cashflow: -250000 },
    { date: "2016-01-01", cashflow: -1000000 },
    { date: "2016-01-15", cashflow: 10000 },
    { date: "2016-05-08", cashflow: -250000 },
    { date: "2016-06-12", cashflow: 100000 },
    { date: "2016-06-12", cashflow: 250000 },
    { date: "2016-06-30", cashflow: 0 },
    { date: "2016-07-11", cashflow: 150000 }
];

console.log('mdietz', mdietz(transactions, roundingFactor, endingMarketValue));
