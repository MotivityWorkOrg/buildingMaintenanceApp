var BuildingInfo = require('./models/BuildingSchemas');

function getBuildingInfo(res) {
    BuildingInfo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
}

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/buildingInfo', function (req, res) {
        // use mongoose to get all todos in the database
        getBuildingInfo(res);
    });

    /*app.create('/api/buildingMaintenance', function (req, res) {
        
    });
    
    app.update('/api/buildingMaintenance', function (req, res) {
        
    });
    
    app.delete('/api/buildingMaintenance/:flatId', function (req, res) {

    })*/
};