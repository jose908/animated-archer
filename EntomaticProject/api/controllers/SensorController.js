/**
 * SensorController
 *
 * @description :: Server-side logic for managing Sensors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  newSensor: function (req, res) {


    Sensor.create({latitude: req.body.latitude, longitude: req.body.longitude, mac: req.body.mac}).exec(function createCB(err, created) {

    if( err == null) {
      console.log('Created new sensor record with id '+ created.sensorId + ' at ' + created.createDate);
      Sensor.publishCreate(created);
      res.ok({sensorId: created.sensorId});
    }
     else {
      console.log(err);
      res.badRequest();
    }

    });

  },
  getSensors: function(req,res) {

    if (req.param('sensorId')) {

      Sensor.findOne({sensorId:req.param('sensorId') }).exec(function findCB(err,found) {

        res.json(found);

      });
    }
    else {
      Sensor.find({}).exec(function findCB(err,found){
        if(req.isSocket) {
          Sensor.watch(req);
        }
        res.json(found);
      });

    }

    }

};

