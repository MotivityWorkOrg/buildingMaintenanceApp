// Refer http://mongoosejs.com/docs/populate.html
//http://stackoverflow.com/questions/12211138/creating-custom-object-id-in-mongodb
//http://stackoverflow.com/questions/13857203/cant-get-data-from-database-after-multiple-schema-declared-mongoose-express

var mongoose = require('mongoose'), Schema = mongoose.Schema;
mongoose.set('debug', true);
//var myConnection = mongoose.createConnection('localhost', 'building');

var SampleSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    note: String
});

module.exports = mongoose.model('sample', SampleSchema);

/*var MaintenanceSchema = new mongoose.Schema({
    id:String,
    name:String,
    description:String,
    amount:String,
    flats:[{ type: Schema.Types.ObjectId, ref: 'Flat' }],
    tenant:[{ type: Schema.Types.ObjectId, ref: 'Tenant' }],
    miscellaneousExpenditure:[{ type: Schema.Types.ObjectId, ref: 'Miscellaneous' }],
    period:String,
    paymentDate: Date,
    createdBy:String,
    updatedBy:String,
    createdDate:Date,
    updatedDate:Date
});*/

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
    _id: String,
    paymentDate: Date,
    amount: String,
    description: String,
    category:String,
    createUpdate:{ type: Schema.Types.ObjectId, ref: 'CreateUpdate' }
});

var IncomeSchema = new mongoose.Schema({
    _id: String,
    paymentDate: Date,
    amount: String,
    description: String,
    category:String,
    createUpdate:{ type: Schema.Types.ObjectId, ref: 'CreateUpdate' }
});

var CreateUpdateSchema = new mongoose.Schema({
    createdBy:String,
    updatedBy:String,
    createdDate:Date,
    updatedDate:Date
});

var flatSchema = new mongoose.Schema({
    flatId:String,
    ownerName:String,
    phoneNumber:String,
    emailId:String,
    isOccupied:Boolean,
    createdBy:String,
    updatedBy:String,
    createdDate:Date,
    updatedDate:Date
});

var TenantSchema = new mongoose.Schema({
    flatId:String,
    name:String,
    phoneNumber:String,
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
var CreateUpdateModel = mongoose.model('CreateUpdate', CreateUpdateSchema);
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
    CreateUpdate: CreateUpdateModel,
    Expenses: ExpensesModel,
    Income: IncomeModel,
    Users: UsersModel,
    Months: MonthsModel,
    IncomeTypes: IncomeTypesModel,
    ExpensesTypes: ExpensesTypesModel
};