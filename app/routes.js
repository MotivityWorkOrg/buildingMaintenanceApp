var BuildingInfo = require('./models/BuildingSchemas');

function getPopulateExpenses(res){
    BuildingInfo.Expenses.find(function (err, expenses) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
            console.log("The 'expenses' collection doesn't exist. Creating it with sample data...");
            //populateExpenses();
        }
        //console.log("Expenses getting From ++", expenses);
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
        //console.log("Months .. ", months);
        res.json(months); // return all months in JSON format
    });
}


function getPopulateExpensesTypes(res){
    BuildingInfo.ExpensesTypes.find(function(err, expensesTypes){
        if(err){
            res.send(err);
            console.log("The 'ExpensesTypes' collection doesn't exist. Creating it with sample data...");
        }
        //console.log("ExpensesTypes .. ", expensesTypes);
        res.json(expensesTypes);
    });
}


function getPopulateIncomeTypes(res){
    BuildingInfo.IncomeTypes.find(function(err, incomeTypes){
        if(err){
            res.send(err);
            console.log("The 'IncomeTypes' collection doesn't exist. Creating it with sample data...");
        }
        //console.log("incomeTypes .. ", incomeTypes);
        res.json(incomeTypes);
    });
}

function getSavedIncomes(res){
    BuildingInfo.Income.find(function(err, incomes){
        if(err){
            res.send(err);
            console.log("The 'incomes' collection doesn't exist. Creating it with sample data...");
        }
        //console.log("imcomes .. ", incomes);
        res.json(incomes);
    });
}

function getSavedExpenses(res){
    BuildingInfo.Expenses.find(function(err, expenses){
        if(err){
            res.send(err);
            console.log("The 'expenses' collection doesn't exist. Creating it with sample data...");
        }
        //console.log("expenses .. ", expenses);
        res.json(expenses);
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
        console.log("Expenses Request ++ ",req.body);
        BuildingInfo.Expenses.create({
            paymentDate: req.body.paymentDate,
            amount: req.body.amount,
            description:req.body.comments,
            category:req.body.category,
            period:req.body.period,
            createdDate:req.body.createdDate,
            createdBy:req.body.createdBy
        }, function (err, expense) {
            if (err)
                res.send(err);
            //console.log("Inserted Expense is+++ ",expense);
           getPopulateExpenses(res);
        });
    });

    app.post('/api/addIncome', function(req, res){
        console.log("Expenses Request ++ ",req.body);
        BuildingInfo.Income.create({
            paymentDate: req.body.paymentDate,
            amount: req.body.amount,
            description:req.body.comments,
            category:req.body.category,
            period:req.body.period,
            createdDate:req.body.createdDate,
            createdBy:req.body.createdBy
        }, function (err, income) {
            if (err)
                res.send(err);
            //console.log("Inserted Expense is+++ ",income);
            getPopulateIncomeTypes(res);
        });
    });

    app.get('/api/incomes', function(req, res){
        getSavedIncomes(res);
    });

    app.get('/api/expenses', function(req, res){
        getSavedExpenses(res);
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
