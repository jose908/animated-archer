/**
 * MeasurementController
 *
 * @description :: Server-side logic for managing Measurements
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  newMeasurement: function (req, res) {

    Sensor.findOne({sensorId: req.param('sensor')}).exec(function findSensor(err, foundSensor) {

      var count = 0;
      if (foundSensor) {

        MeasurementType.find().exec(function findMeasurementsType(err, foundTypes) {

          for (var i in foundTypes) {

            if (req.param(foundTypes[i].shortName)) {

              Measurement.create({
                sensorId: req.param('sensor'),
                epoch: req.param('counter'),
                measurementTypeId: foundTypes[i].measurementTypeId,
                sensorReading: req.param(foundTypes[i].shortName)
              })
                .exec(function createMeasurement(err, createdMeasurement) {
                  count++;
                  if (foundTypes.length == count ) {
                    Measurement.publishCreate(createdMeasurement);
                  }
                  sails.log.info('Measurement with type:' + foundTypes[i].name + ' created for sensorId:' + req.param('sensor') );

                });

            }

          }
          return res.ok('0|' + req.param('sensor') + '|');


        });

      }

      else {

        sails.log.info('Sensor was not found for sensor with Id:' + req.param('sensor'));
        return res.ok('1|' + req.param('sensor') + '|');

      }

    });

  },

  getSelectedMeasurement: function (req, res) {

    Measurement.find({where: {
      sensorId: req.param('sensorId'), measurementTypeId: req.param('measurementTypeId'),
      createDate: {'>': req.param('from'), '<': req.param('to')}}, sort: 'createDate ASC'
    }).exec(function findCB(err, found) {

      return res.json(found);

    });
  },

  getAllMeasurement: function (req,res) {

    Measurement.find().exec(function findMeasurement(err, found) {

      if(req.isSocket) {
        Measurement.watch(req);
      }
      return res.ok();

    });


  }



};

