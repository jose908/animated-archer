/**
 * MeasurementController
 *
 * @description :: Server-side logic for managing Measurements
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  newMeasurement: function (req, res) {

    var isOk  = true;
    //temperature
    Measurement.create({sensorId: req.body.sensor, counter: req.body.counter, sensorReading: req.body.temperature, measurementTypeId: 1}).exec(function createCB(err, created) {

      if (err == null) {
        console.log('Created new sensor reading with id ' + created.sensorId + ' at' + created.createDate);
      }
      else {
        console.log(err);
        isOk = false;
      }
    });
      //relative humidity
      Measurement.create({sensorId: req.body.sensor, counter: req.body.counter, sensorReading: req.body.temperature, measurementTypeId: 2}).exec(function createCB(err, created) {

        if (err == null) {
          console.log('Created new sensor reading with id ' + created.sensorId + ' at' + created.createDate);
        }
        else {
          console.log(err);
          isOk = false;
        }
      });
      //light
        Measurement.create({sensorId: req.body.sensor, counter: req.body.counter, sensorReading: req.body.temperature, measurementTypeId: 3}).exec(function createCB(err, created) {

          if (err == null) {
            console.log('Created new sensor reading with id ' + created.sensorId + ' at' + created.createDate);
          }
          else {
            console.log(err);
            isOk = false;
          }
        });
        //voltage
          //relative humidity
          Measurement.create({sensorId: req.body.sensor, counter: req.body.counter, sensorReading: req.body.temperature, measurementTypeId: 4}).exec(function createCB(err, created) {

            if( err == null) {
              console.log('Created new sensor reading with id '+ created.sensorId + ' at' + created.createDate);
            }
            else {
              console.log(err);
              isOk = false;
            }
          });
    if(isOk) {
      res.ok();
    }
    else {
      res.badRequest();
    }

  }



};

