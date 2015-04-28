/**
 * AlarmController
 *
 * @description :: Server-side logic for managing Alarms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  newAlarm: function (req, res) {

    var isOk  = true;

    Alarm.create({sensorId: req.body.sensor, value: req.body.value, alarmTypeId: 1}).exec(function createCB(err, created) {

      if (err == null) {
        Alarm.publishCreate(created);
        console.log('Created new Alarm with id ' + created.sensorId + ' at ' + created.createDate);

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
  },

  getUnviewedAlarms: function (req, res) {

    Alarm.find({viewed: false}).populate('alarmTypeId').exec(function createCB(err,created) {

      res.json(created);

    });
  },

  setViewedAlarm: function (req, res) {

    Alarm.update({alarmId: req.param('params')}, {viewed: true}).exec(function createCB(err, updated) {
      Alarm.publishUpdate(updated[0].alarmId);
      res.ok();
    });

  }



};

