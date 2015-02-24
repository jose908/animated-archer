/**
 * SensorRecordController
 *
 * @description :: Server-side logic for managing sensorrecords
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  newRecord: function (req, res) {

    SensorRecord.create(req.body).exec(console.log);
    res.send(req.body);
  }
};

