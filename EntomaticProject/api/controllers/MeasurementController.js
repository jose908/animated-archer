/**
 * MeasurementController
 *
 * @description :: Server-side logic for managing Measurements
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  newMeasurement: function (req, res) {

    Sensor.findOne({sensorId: req.param('sensor')}).exec(function findSensor (err,foundSensor) {

      if(foundSensor) {

        MeasurementType.find().exec (function findMeasurementsType (err,foundTypes) {

            for (var i in foundTypes) {

              if (req.param(foundTypes[i].shortName)) {

                Measurement.create({sensorId: req.param('sensor'), epoch: req.param('counter'),measurementTypeId: foundTypes[i].measurementTypeId, sensorReading: req.param(foundTypes[i].shortName)})
                  .exec(function createMeasurement(err,createdMeasurement) {});

              }

            }
          return res.ok('0|'+ req.param('sensor') + '|' + '*CLOS*');


          });

      }

      else {

        return res.ok('1|'+ req.param('sensor') + '|' + '*CLOS*');

      }

    });

  },

  getSelectedMeasurement: function(req,res) {

    Measurement.find( {sensorId: req.param('sensorId') , measurementTypeId: req.param('measurementTypeId') ,
      createDate: { '>': req.param('from'), '<': req.param('to')}}).exec(function findCB(err,found) {

     return res.json(found);

    });
  }






};

