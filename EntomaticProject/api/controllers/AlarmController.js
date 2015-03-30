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
  }

};

