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

          Sensor.update({mac: req.param('id')},{updateDate: new Date()}).exec (function (err,updatedGateway ) {

            sails.log.info('Sensor with mac:' + req.param('id') + 'storing new date...');
            return res.ok('0|' + foundSensor.mac + '|' + foundSensor.sensorId + '|');
          });

        }
        else {

          sails.log.info('No gateway was found for sensor with mac:' + req.param('id'));

          AlarmType.findOne({shortName: 'bsa'}).exec(function findMeasurementsType(err, foundType) {

            if (foundType) {

              Alarm.create({
                value: req.param('id'),
                alarmTypeId: foundType.alarmTypeId
              }).exec(function createCB(err, created) {
                Alarm .publishCreate(created);
                sails.log.info('New Alarm created');

              });
            }
          });
          return res.ok('1|' + req.param('id') + '|');
        }
      }
      else {

        Gateway.findOne({
          mac: req.param('idgw')}).exec(function foundGateway (err, foundGateway) {

          if (foundGateway) {

            Sensor.create({latitude: req.param('lat'), longitude: req.param('lon'), mac: req.param('id'), gatewayId:foundGateway.gatewayId }).exec (function createdSensor (err, createdSensor) {
              Sensor.publishCreate(createdSensor);

              sails.log.info('New sensor created with mac:' + createdSensor.mac);
              return res.ok('0|' + createdSensor.mac + '|' + createdSensor.sensorId + '|');

            });

            }
          else {

            sails.log.info('Something wrong has happened creating new Sensor');

            AlarmType.findOne({shortName: 'bsa'}).exec(function findMeasurementsType(err, foundType) {

              if (foundType) {

                Alarm.create({
                  value: req.param('id'),
                  alarmTypeId: foundType.alarmTypeId
                }).exec(function createCB(err, created) {
                  Alarm .publishCreate(created);
                  sails.log.info('New Alarm created');

                });
              }
            });
            return res.ok('1|' + req.param('id') + '|');


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
      Sensor.find({where:{}, sort: req.param('query')}).populate('gatewayId').exec(function findCB(err,found){
        if(req.isSocket) {
          Sensor.watch(req);
        }
       return res.json(found);
      });

    }

    }

};

