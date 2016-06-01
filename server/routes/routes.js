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
            flatNo: req.body.flatNo,
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
            }
        );
    });

    app.get('/api/incomes', function (req, res) {
        var query = BuildingInfo.Income.find({'period': req.query['period']});
        query.exec(function (err, incomes) {
            if (err) {
                res.send(err);
                console.log("The 'incomes' collection doesn't exist. Creating it with sample data...");
            }
            //console.log("imcomes .. ", incomes);
            res.json(incomes);
        });
    });

    app.get('/api/expenses', function (req, res) {
        var query = BuildingInfo.Expenses.find({'period': req.query['period']});
        query.exec(function (err, expenses) {
            if (err) {
                console.log("The 'expenses' collection doesn't exist. Creating it with sample data...");
                if (res.status == 404) {
                    return res.status(404).send('fancy server side error message!');
                }
                res.send(err);
            }
            //console.log("expenses .. ", expenses);
            res.json(expenses);
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
        //console.log("Getting Flat Req Body..  ", req.body.flat);
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
        if (!req.body.flat.isOccupied) {
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
                console.log("asdf asdfj " + tenant);
                //res.send(tenant);
            });
        }
    });

    app.post('/api/updateFlat', function (req, res) {
        //console.log("Getting Flat Req Body..  ", req.body.flat);
        BuildingInfo.Flat.findOneAndUpdate({_id: req.body.flat.flatNumber},
            req.body.flat,
            function (err, flat) {
                // as per stack overflow mongoose cann't handle multiple responses in one time.
                //http://stackoverflow.com/questions/36856038/cannot-place-multiple-get-requests-on-nodejs-servers
                if (req.body.flat.isOccupied) {
                    if (err) {
                        res.send(err);
                    }
                    res.send(flat);
                }
            }
        );
        if (!req.body.flat.isOccupied) {
            //console.log("In Tenant Info +++ ", req.body.tenant);
            BuildingInfo.Tenant.findOneAndUpdate({_id: req.body.tenant.flatNumber},
                req.body.tenant,
                function (err, tenant) {
                    if (err) {
                        res.send(err);
                    }
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

    app.delete('/api/deleteExpense', function (req, res) {
        var query = BuildingInfo.Expenses.findByIdAndRemove({_id: req.query['itemId']});
        query.exec(function (err, expense) {
                if (err) {
                    res.send(err);
                }
                res.send(expense);
            }
        )
    });

    app.delete('/api/deleteIncome', function (req, res) {
        var query = BuildingInfo.Income.findByIdAndRemove({_id: req.query['itemId']});
        query.exec(function (err, tenant) {
                if (err) {
                    res.send(err);
                }
                res.send(tenant);
            }
        )
    });

    app.get('/api/flatsInfo', function (req, res) {
        BuildingInfo.FlatInfo.find(function (err, flatInfo) {
            if (err) {
                res.send(err);
                console.log("The 'Tenant' collection doesn't exist. Creating it with sample data...");
            }
            res.json(flatInfo);
        });
    });

    app.post('/api/addFlatsInfo', function (req, res) {
        BuildingInfo.FlatInfo.create({
            _id: req.body.id,
            flatNo: req.body.flatNo
        }, function (err, flat) {
            if (err) {
                res.send(err);
            }
            res.send(flat);
        })
    });
};

/**
 * Cron job to calculate total expenditure and total incomes for last month.
 * @type {*|CronJob}
 */
var CronJob = require('cron').CronJob;
var job = new CronJob('00 00 12 1 * *', function () {
    callMonthlyInfo()
}, null, true, "Asia/Kolkata");
job.start();
//rule = '0 0/2 * 1/1 * ? *';
//

function callMonthlyInfo() {
    var period = dateFormat(new Date());
    console.log("Month Period  ", period, " < --- >  ", dateFormat(new Date()));
    var query = BuildingInfo.Income.find({'period': period});
    query.exec(function (err, incomes) {
        if (err) {
            res.send(err);
            console.log("The 'incomes' collection doesn't exist. Creating it with sample data...");
        }
        //console.log("incomes .. ", incomes);
        var totalIncome = calculateTotal(incomes);
        console.log("Total Income is ::: ", totalIncome);
        callMonthlyExpenditure(totalIncome, period);
    });
}

function callMonthlyExpenditure(totalIncome, period) {
    var query = BuildingInfo.Expenses.find({'period': period});
    query.exec(function (err, expenses) {
        if (err) {
            console.log("The 'expenses' collection doesn't exist. Creating it with sample data...");
            if (res.status == 404) {
                return res.status(404).send('fancy server side error message!');
            }
            res.send(err);
        }
        //console.log("expenses .. ", expenses);
        var totalExpenditure = calculateTotal(expenses);
        fillMonthlyReport(totalIncome, totalExpenditure);
    });
}

function fillMonthlyReport(totalIncome, totalExpenditure) {
    var totalOverFlowAmount = totalIncome - totalExpenditure;
    BuildingInfo.MonthlyDetail.create({
        totalIncome: totalIncome,
        totalExpenditure: totalExpenditure,
        total: totalOverFlowAmount,
        date: new Date()
    })
}
/**
 * Scheduler Will call every month 1 day, we required last month
 * income and expenditure info
 * @param date
 * @returns {string}
 */
function dateFormat(date) {
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthIndex = date.getMonth() - 1;
    var year = date.getFullYear();
    return monthNames[monthIndex] + '/' + year;
}

function calculateTotal(data) {
    var total = 0.0;
    data.forEach(function (entry) {
        total += Number(entry.amount);
    });
    return total;
}
/**
 * -----------------------------------------------------------------------------------------------
 * Populate database with sample data -- Only used once: the first time the application is started.
 * You'd typically not find this code in a real-life app, since the database would already exist.
 *
 **/