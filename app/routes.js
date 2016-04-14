var BuildingInfo = require('./models/BuildingSchemas');

/*
var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    db;

var mongoClient = new MongoClient(new Server('localhost', 27017));
// Connection URL
mongoClient.connect(function(err, mongoClient) {
    db = mongoClient.db("building");
    db.collection('months', {strict:true}, function(err, collection) {
        if (err) {
            console.log("The 'employees' collection doesn't exist. Creating it with sample data...");
            populateMonths();
        }
    });
});

*/

/*function getBuildingInfo(res) {
    BuildingInfo.find(function (err, maintenance) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
            console.log("The 'maintenance' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
        res.json(maintenance); // return all buildingInformation in JSON format
    });
}*/

function getPopulateExpenses(res){
    BuildingInfo.Expenses.find(function (err, expenses) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
            console.log("The 'expenses' collection doesn't exist. Creating it with sample data...");
            //populateExpenses();
        }
        console.log("Expenses getting From ++", expenses);
        res.json(expenses); // return all buildingInformation in JSON format
    });
}

function getPopulateMonths(res){
    //var monthsModel = mongoose.model('months');
    BuildingInfo.Months.find(function(err, months){
        if(err){
            res.send(err);
            console.log("The 'months' collection doesn't exist. Creating it with sample data...");
            //populateMonths();
        }
        console.log("Months .. ", months);

        res.json(months); // return all months in JSON format
    });
}


function getPopulateExpensesTypes(res){
    BuildingInfo.ExpensesTypes.find(function(err, expensesTypes){
        if(err){
            res.send(err);
            console.log("The 'ExpensesTypes' collection doesn't exist. Creating it with sample data...");
        }
        console.log("ExpensesTypes .. ", expensesTypes);

        res.json(expensesTypes);
    });
}


function getPopulateIncomeTypes(res){
    BuildingInfo.IncomeTypes.find(function(err, incomeTypes){
        if(err){
            res.send(err);
            console.log("The 'IncomeTypes' collection doesn't exist. Creating it with sample data...");
        }
        console.log("incomeTypes .. ", incomeTypes);

        res.json(incomeTypes);
    });
}
module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all maintenance
    /*app.get('/api/expensesInfo', function (req, res) {
        // use mongoose to get all buildingInformation in the database
        getPopulateExpenses(res);
    });*/

    app.get('/api/expensesInfo', function (req, res) {
        getPopulateExpenses(res);
    });

    app.get('/api/months', function(req, res){
       getPopulateMonths(res);
    });

    app.post('/api/addMonth', function(req, res){
        // create a information comes from AJAX request from Angular
        BuildingInfo.Months.create({
            _id: req.body.id,
            fullName: req.body.fullName,
            shortName: req.body.shortName
        }, function (err, month) {
            if (err)
                res.send(err);
            console.log("Inserted Month is+++ ", month);
            // get and return all the Months after you create another
            getPopulateMonths(res);
        });
    });

    app.post('/api/addExpense', function (req, res) {
        //console.log("Expenses Request ++ ",req.body);
        BuildingInfo.Expenses.create({
            _id: req.body.id,
            paymentDate: req.body.paymentDate,
            amount: req.body.amount,
            description:req.body.description,
            category:req.body.category
        }, function (err, expense) {
            if (err)
                res.send(err);
            //console.log("Inserted Expense is+++ ",expense);
           // getPopulateExpenses(res);
        });
    });

    app.get('/api/expensesTypes', function (req, res) {
        getPopulateExpensesTypes(res);
    });

    app.get('/api/incomeTypes', function (req, res) {
        getPopulateIncomeTypes(res);
    });

    app.post('/api/addExpensesType', function (req, res) {
        BuildingInfo.ExpensesTypes.create({
            _id: req.body.id,
            type: req.body.type
        }, function (err, expense) {
            if (err){
                res.send(err);
            }
            getPopulateExpensesTypes(res);
        });
    });

    app.post('/api/addIncomeType', function (req, res){
        BuildingInfo.IncomeTypes.create({
            _id: req.body.id,
            type: req.body.type
        }, function (err, expense) {
            if (err){
                res.send(err);
            }
            getPopulateIncomeTypes(res);
        });
    });
    /*app.create('/api/buildingMaintenance', function (req, res) {
        
    });

    app.update('/api/buildingMaintenance', function (req, res) {
        
    });
    
    app.delete('/api/buildingMaintenance/:flatId', function (req, res) {

    })*/
};

/*------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.

var populateExpenses = function(){
    console.log(" populate Expenses ... ");
    var expenses = [
        {
            _id:'1',
            paymentDate: new Date(),
            amount: '3000.00',
            description: '',
            category: 'Watchman Salary',
            createUpdate: {
                createdBy: 'GHarsha',
                createdDate:new Date()
            }
        },
        {
            _id:'2',
            paymentDate: new Date(),
            amount: '1608.00',
            description: '',
            category: 'Electricity Bill',
            createUpdate: {
                createdBy: 'GHarsha',
                createdDate:new Date()
            }
        },
        {
            _id:'3',
            paymentDate: new Date(),
            amount: '1052.00',
            description: '',
            category: 'Water Bill',
            createUpdate: {
                createdBy: 'GHarsha',
                createdDate:new Date()
            }
        },
        {
            _id:'4',
            paymentDate: new Date(),
            amount: '3000',
            description: 'Colors and Brooms',
            category: 'Utilities',
            createUpdate: {
                createdBy: 'GHarsha',
                createdDate:new Date()
            }
        }
    ];
};

var populateIncomes = function(){
    console.log(" populate Expenses ... ");
    var incomes = [
        {
            _id:'1',
            paymentDate: new Date(),
            amount: '1000',
            description: 'F102',
            category: 'Flat Maintenance',
            createUpdate: {
                createdBy: 'GHarsha',
                createdDate:new Date()
            }
        },
        {
            _id:'2',
            paymentDate: new Date(),
            amount: '1000',
            description: 'Bal brought down from Dec, 15',
            category: 'Other Income',
            createUpdate: {
                createdBy: 'GHarsha',
                createdDate:new Date()
            }
        }
    ]
};

var populateMonths = function () {
    console.log(" populate Months ... ");
    return [
        {
            _id:'1',
            fullName: 'January',
            shortName: 'Jan'
        },
        {
            _id:'2',
            fullName: 'February',
            shortName: 'Feb'
        },
        {
            _id:'3',
            fullName: 'March',
            shortName: 'Mar'
        },
        {
            _id:'4',
            fullName: 'April',
            shortName: 'Apr'
        },
        {
            _id:'5',
            fullName: 'May',
            shortName: 'May'
        },
        {
            _id:'6',
            fullName: 'June',
            shortName: 'Jun'
        },
        {
            _id:'7',
            fullName: 'July',
            shortName: 'Jul'
        },
        {
            _id:'8',
            fullName: 'August',
            shortName: 'Aug'
        },
        {
            _id:'9',
            fullName: 'September',
            shortName: 'Sep'
        },
        {
            _id:'10',
            fullName: 'October',
            shortName: 'Oct'
        },
        {
            _id:'11',
            fullName: 'November',
            shortName: 'Nov'
        },
        {
            _id:'12',
            fullName: 'December',
            shortName: 'Dec'
        }
    ];
};