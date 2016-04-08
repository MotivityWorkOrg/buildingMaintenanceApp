// Refer http://mongoosejs.com/docs/populate.html
//http://stackoverflow.com/questions/12211138/creating-custom-object-id-in-mongodb

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var SampleSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    note: String
});

module.exports = mongoose.model('sample', SampleSchema);

var MaintenanceSchema = new mongoose.Schema({
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

var MiscellaneousSchema = new mongoose.Schema({
    flatId:String,
    description:String,
    amount:String,
    period:String,
    createdBy:String,
    updatedBy:String,
    createdDate:Date,
    updatedDate:Date
});

module.exports = mongoose.model('Maintenance', MaintenanceSchema);
module.exports = mongoose.model('Flat', flatSchema);
module.exports = mongoose.model('Tenant', TenantSchema);
module.exports = mongoose.model('Miscellaneous', MiscellaneousSchema);