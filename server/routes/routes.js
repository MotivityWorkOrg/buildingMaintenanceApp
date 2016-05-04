var BuildingInfo = require('./models/building');
var mongoose = require('mongoose');

function getPopulateExpenses(res) {
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

function getPopulateMonths(res) {
    //var monthsModel = mongoose.model('months');
    BuildingInfo.Months.find(function (err, months) {
        if (err) {
            res.send(err);
            console.log("The 'months' collection doesn't exist. Creating it with sample data...");
            //populateMonths();
        }
        //console.log("Months .. ", months);
        res.json(months); // return all months in JSON format
    });
}


function getPopulateExpensesTypes(res) {
    BuildingInfo.ExpensesTypes.find(function (err, expensesTypes) {
        if (err) {
            res.send(err);
            console.log("The 'ExpensesTypes' collection doesn't exist. Creating it with sample data...");
        }
        //console.log("ExpensesTypes .. ", expensesTypes);
        res.json(expensesTypes);
    });
}


function getPopulateIncomeTypes(res) {
    BuildingInfo.IncomeTypes.find(function (err, incomeTypes) {
        if (err) {
            res.send(err);
            console.log("The 'IncomeTypes' collection doesn't exist. Creating it with sample data...");
        }
        //console.log("incomeTypes .. ", incomeTypes);
        res.json(incomeTypes);
    });
}

function getSavedIncomes(res) {
    BuildingInfo.Income.find(function (err, incomes) {
        if (err) {
            res.send(err);
            console.log("The 'incomes' collection doesn't exist. Creating it with sample data...");
        }
        //console.log("imcomes .. ", incomes);
        res.json(incomes);
    });
}

function getSavedExpenses(res) {
    BuildingInfo.Expenses.find(function (err, expenses) {
        if (err) {
            res.send(err);
            console.log("The 'expenses' collection doesn't exist. Creating it with sample data...");
        }
        //console.log("expenses .. ", expenses);
        res.json(expenses);
    });
}

function getAllFlatsInfo(res) {
    //console.log('Find Mongoose Collection ... ',mongoose.connection.db.collection);
    BuildingInfo.Flat.find(function (err, flats) {
        if (err) {
            res.send(err);
            console.log("The 'Flats' collection doesn't exist. Creating it with sample data...");
        }
        //console.log("flats .. ", expenses);
        res.json(flats);
    });
}

function getTenantInfo(res) {
    BuildingInfo.Tenant.find(function (err, tenant) {
        if (err) {
            res.send(err);
            console.log("The 'Tenant' collection doesn't exist. Creating it with sample data...");
        }
        //console.log("tenant .. ", expenses);
        res.json(tenant);
    });
}

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all maintenance

    app.get('/api/expensesInfo', function (req, res) {
        getPopulateExpenses(res);
    });

    app.get('/api/months', function (req, res) {
        getPopulateMonths(res);
    });

    app.post('/api/addMonth', function (req, res) {
        // create a information comes from AJAX request from Angular
        BuildingInfo.Months.create({
            _id: req.body.id,
            fullName: req.body.fullName,
            shortName: req.body.shortName
        }, function (err, month) {
            if (err)
                res.send(err);
            // get and return all the Months after you create another
            res.send(month)
        });
    });

    app.post('/api/addExpense', function (req, res) {
        BuildingInfo.Expenses.create({
            paymentDate: req.body.paymentDate,
            amount: req.body.amount,
            description: req.body.description,
            category: req.body.category,
            period: req.body.period,
            createdDate: req.body.createdDate,
            createdBy: req.body.createdBy
        }, function (err, expense) {
            if (err)
                res.send(err);
            //console.log("Inserted Expense is+++ ",expense);
            res.send(expense);
        });
    });

    app.post('/api/updateExpenses', function (req, res) {
        BuildingInfo.Expenses.findOneAndUpdate(
            {_id: req.body.objectId},
            req.body,
            function (err, expense) {
                if (err)
                    res.send(err);
                //console.log("Inserted Expense is+++ ",expense);
                res.send(expense);
            });
    });

    app.post('/api/addIncome', function (req, res) {
        BuildingInfo.Income.create({
            paymentDate: req.body.paymentDate,
            amount: req.body.amount,
            description: req.body.description,
            category: req.body.category,
            period: req.body.period,
            createdDate: req.body.createdDate,
            flatNo: req.body.flat,
            createdBy: req.body.createdBy
        }, function (err, income) {
            if (err)
                res.send(err);
            //console.log("Inserted Expense is+++ ",income);
            res.send(income);
        });
    });

    app.post('/api/updateIncome', function (req, res) {
        BuildingInfo.Income.findOneAndUpdate(
            {_id: req.body.objectId},
            req.body,
            function (err, income) {
                if (err)
                    res.send(err);
                //console.log("Inserted Expense is+++ ",income);
                res.send(income);
            });
    });

    app.get('/api/incomes', function (req, res) {
        getSavedIncomes(res);
    });

    app.get('/api/expenses', function (req, res) {
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
            if (err) {
                res.send(err);
            }
            res.send(expense);
        });
    });

    app.post('/api/addIncomeType', function (req, res) {
        BuildingInfo.IncomeTypes.create({
            _id: req.body.id,
            type: req.body.type
        }, function (err, incomeType) {
            if (err) {
                res.send(err);
            }
            res.send(incomeType);
        });
    });

    app.post('/api/addFlat', function (req, res) {
        //console.log("Getting Flat Req Body..  ", req.body);
        BuildingInfo.Flat.create({
            _id: req.body.flat.flatNumber,
            ownerName: req.body.flat.ownerName,
            phoneNumber: req.body.flat.phoneNumber,
            altNumber: req.body.flat.altNumber,
            emailId: req.body.flat.emailId,
            isOccupied: req.body.flat.isOccupied,
            tenant: req.body.flat.flatNumber,
            createdBy: req.body.flat.createdBy,
            createdDate: req.body.flat.createdDate
        }, function (err, flat) {
            if (err) {
                res.send(err);
            }
            res.send(flat);
        });
        if (!req.body.isOccupied) {
            //console.log("In Tenant Info +++ ", req.body.tenant);
            BuildingInfo.Tenant.create({
                _id: req.body.tenant.flatNumber,
                tenantName: req.body.tenant.tenantName,
                phoneNumber: req.body.tenant.phoneNumber,
                altNumber: req.body.tenant.altNumber,
                emailId: req.body.tenant.emailId,
                createdBy: req.body.tenant.createdBy,
                createdDate: req.body.tenant.createdDate
            }, function (err, tenant) {
                if (err) {
                    res.send(err);
                }
                res.send(tenant);
            });
        }
    });

    app.post('/api/updateFlat', function (req, res) {
        console.log("Getting Flat Req Body..  ", req.body);
        BuildingInfo.Flat.findOneAndUpdate({_id: req.body.flat.flatNumber},
            req.body.flat,
            function (err, flat) {
                if (err)
                    res.send(err);
                res.send(flat);
            }
        );
        if (!req.body.isOccupied) {
            console.log("In Tenant Info +++ ", req.body.tenant);
            BuildingInfo.Tenant.findOneAndUpdate({_id: req.body.tenant.flatNumber},
                req.body.tenant,
                function (err, tenant) {
                    if (err)
                        res.send(err);
                    res.send(tenant);
                }
            )
        }
    });

    app.get('/api/flats', function (req, res) {
        getAllFlatsInfo(res);
    });

    app.get('/api/tenant', function (req, res) {
        getTenantInfo(res);
    });

    /*app.create('/api/buildingMaintenance', function (req, res) {

     });

     app.update('/api/buildingMaintenance', function (req, res) {

     });

     app.delete('/api/buildingMaintenance/:flatId', function (req, res) {

     })*/
};

/**
 * -----------------------------------------------------------------------------------------------
 * Populate database with sample data -- Only used once: the first time the application is started.
 * You'd typically not find this code in a real-life app, since the database would already exist.
 *
 **/