/**
 * AlarmController
 *
 * @description :: Server-side logic for managing Alarms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  newAlarm: function (req, res) {

    Sensor.findOne({sensorId: req.param('sensor')}).exec(function findSensor(err, foundSensor) {

      if (foundSensor) {

        AlarmType.findOne({shortName: req.param('alarm_type')}).exec(function findMeasurementsType(err, foundType) {

          if (foundType) {

            Alarm.create({
              sensorId: req.param('sensor'),
              value: req.param('value'),
              alarmTypeId: foundType.alarmTypeId
            }).exec(function createCB(err, created) {

              sails.log.info('NewAlarm inserted for sensorId:' + req.param('sensor') + ' of type:' + foundType.name);
              Alarm .publishCreate(created);
              return res.ok('0|' + req.param('sensor') + '|');
            });
          }
          else {
            sails.log.info('NewAlarm: AlarmType was not found' );
            return res.ok('1|' + req.param('sensor') + '|');
          }
        });
      }
      else {

        sails.log.info('NewAlarm: Sensor with sensorId:' + req.param('sensor') + 'was not found' );
        return res.ok('1|' + req.param('sensor') + '|');

      }
    });

  },

  getUnviewedAlarms: function (req, res) {

    Alarm.find({viewed: false}).populate('alarmTypeId').populate('sensorId').exec(function createCB(err,created) {

      return res.json(created);

    });
  },

  setViewedAlarm: function (req, res) {

    Alarm.update({alarmId: req.param('params')}, {viewed: true}).exec(function createCB(err, updated) {
      Alarm.publishUpdate(updated[0].alarmId);
     return res.ok();
    });
  },

  getSelectedAlarms: function (req, res) {



      Alarm.find({sensorId: req.param('sensorId'),alarmTypeId: req.param('alarmTypeId')}).populate('alarmTypeId').exec(function findAlarms (err,found){

        res.json(found);

      });





  }









};

