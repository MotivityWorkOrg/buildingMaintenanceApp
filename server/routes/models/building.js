// Refer http://mongoosejs.com/docs/populate.html
//http://stackoverflow.com/questions/12211138/creating-custom-object-id-in-mongodb
//http://stackoverflow.com/questions/13857203/cant-get-data-from-database-after-multiple-schema-declared-mongoose-express

var mongoose = require('mongoose'), Schema = mongoose.Schema;
mongoose.set('debug', true);

var UserSchema = new mongoose.Schema({
    userName: String,
    password: { value : String, version: String, salt : String },
    isAdmin: Boolean,
    loggedDate: Date
});

var MonthsSchema = new mongoose.Schema({
    _id: String,
    fullName: String,
    shortName: String
});

var ExpensesSchema = new mongoose.Schema({
    period:String,
    paymentDate: Date,
    amount: String,
    description: String,
    category:String,
    createdBy:String,
    updatedBy:String,
    createdDate:Date,
    updatedDate:Date
});

var IncomeSchema = new mongoose.Schema({
    period: String,
    paymentDate: Date,
    amount: String,
    description: String,
    category:String,
    flatNo:String,
    createdBy:String,
    updatedBy:String,
    createdDate:Date,
    updatedDate:Date
});

var flatSchema = new mongoose.Schema({
    _id:String,
    ownerName:String,
    phoneNumber:Number,
    altNumber:Number,
    emailId:String,
    isOccupied:Boolean,
    tenant: {type: mongoose.Schema.Types.String, ref: 'TenantModel'},
    createdBy:String,
    updatedBy:String,
    createdDate:Date,
    updatedDate:Date
});

var TenantSchema = new mongoose.Schema({
    _id:String,
    tenantName:String,
    phoneNumber:Number,
    altNumber:Number,
    emailId:String,
    createdBy:String,
    updatedBy:String,
    createdDate:Date,
    updatedDate:Date
});

var expensesTypesSchema = new mongoose.Schema({
    _id: String,
    type:String
});

var incomeTypesSchema = new mongoose.Schema({
    _id: String,
    type:String
});

//module.exports = mongoose.model('Maintenance', MaintenanceSchema);
var FlatModel = mongoose.model('Flat', flatSchema);
var TenantModel = mongoose.model('Tenant', TenantSchema);
var ExpensesModel = mongoose.model('Expenses', ExpensesSchema);
var IncomeModel = mongoose.model('Income', IncomeSchema);
var UsersModel = mongoose.model('Users', UserSchema);
var MonthsModel = mongoose.model('Months', MonthsSchema);
var ExpensesTypesModel = mongoose.model('ExpensesTypes', expensesTypesSchema);
var IncomeTypesModel = mongoose.model('IncomeTypes', incomeTypesSchema);
//module.exports = monthsModel;

module.exports = {
    Flat: FlatModel,
    Tenant: TenantModel,
    Expenses: ExpensesModel,
    Income: IncomeModel,
    Users: UsersModel,
    Months: MonthsModel,
    IncomeTypes: IncomeTypesModel,
    ExpensesTypes: ExpensesTypesModel
};