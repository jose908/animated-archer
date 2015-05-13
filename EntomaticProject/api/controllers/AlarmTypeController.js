/**
 * AlarmTypeController
 *
 * @description :: Server-side logic for managing Alarmtypes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  newAlarmType: function (req, res) {

  AlarmType.findOne({
    or : [
      { name: req.param('name') },
      { shortName: req.param('shortName') }
    ]
  }).exec(function findAlarmType(err, alarmType) {

    if(alarmType) {

      return res.badRequest('Inserted Alarm Type is already in use');

    }
    else {

      AlarmType.create({name:req.param('name'), shortName: req.param('shortName')}).exec (function createAlarmType (err, createdAlarmType) {

        if(createdAlarmType) {

          return res.json({alarmTypeId : createdAlarmType.alarmTypeId});
        }
        else {

          return res.negotiate(err);

        }

      });


    }



  });



}

};

