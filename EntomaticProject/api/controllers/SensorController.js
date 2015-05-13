/**
 * SensorController
 *
 * @description :: Server-side logic for managing Sensors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  newSensor: function (req, res) {

    Sensor.findOne({
      mac: req.param('id')}).populate('gatewayId').exec(function foundSensor (err, foundSensor) {

      if (foundSensor) {

        if (req.param('idgw') == foundSensor.gatewayId.mac ) {

          return res.ok('0|' + foundSensor.mac + '|' + foundSensor.sensorId + '|' + '*CLOS*');

        }
        else {

          return res.ok('1|' + foundSensor.mac + '|' + '*CLOS*');

        }
      }
      else {

        Gateway.findOne({
          mac: req.param('idgw')}).exec(function foundGateway (err, foundGateway) {

          if (foundGateway) {

            Sensor.create({latitude: req.param('lat'), longitude: req.param('lon'), mac: req.param('id'), gatewayId:foundGateway.gatewayId }).exec (function createdSensor (err, createdSensor) {

             return res.ok('0|' + createdSensor.mac + '|' + createdSensor.sensorId + '|' + '*CLOS*');

            });

            }
          else {

           return res.ok('1|' + req.param('id') + '|' + '*CLOS*');

          }

        });
      }



    });

  },


  getSensors: function(req,res) {

    if (req.param('sensorId')) {

      Sensor.findOne({sensorId:req.param('sensorId') }).exec(function findCB(err,found) {

       return res.json(found);

      });
    }
    else {
      Sensor.find({}).exec(function findCB(err,found){
        if(req.isSocket) {
          Sensor.watch(req);
        }
       return res.json(found);
      });

    }

    }

};

