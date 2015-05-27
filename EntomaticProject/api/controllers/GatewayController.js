/**
 * GatewayController
 *
 * @description :: Server-side logic for managing gateways
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  newGateway: function (req, res) {

    //we find if the new gateway request is already inserted in the DB using the mac
    var moment = require('moment');
    sails.log.info('New Gateway Request');

    Gateway.findOne({
      mac: req.param('idgw')}).exec(function foundGateway (err, foundGateway) {
        //if so, we send to the gateway the current inserted value
      if(foundGateway) {

        Gateway.update({mac: req.param('idgw')},{updateDate: new Date()}).exec (function (err,updatedGateway ) {

          sails.log.info('Gateway with mac:' +  req.param('idgw') + ' is already stored - sending new system date');
          return res.ok('0|' + moment(updatedGateway.updateDate).format("YYYYMMDDHHmmss") + '|' + req.param('idgw') + '|');

        });

      }
      else {

        Gateway.create({latitude: req.param('lat'), longitude: req.param('lon'), mac: req.param('idgw')}).exec (function createdGateway (err, createdGateway) {
        //if not, we insert the new gateway
          if(createdGateway) {

            sails.log.info('New gateway created with mac:' +  req.param('idgw'));
            return res.ok('0|'+ moment(createdGateway.createDate).format("YYYYMMDDHHmmss") + '|' + createdGateway.mac + '|');

          }
          if (err) {

            sails.log.info('Something wrong has happened creating new GateWay');

            AlarmType.findOne({shortName: 'bga'}).exec(function findMeasurementsType(err, foundType) {

              if (foundType) {

                Alarm.create({
                  value: req.param('idgw'),
                  alarmTypeId: foundType.alarmTypeId
                }).exec(function createCB(err, created) {
                  Alarm .publishCreate(created);
                  sails.log.info('New Alarm created');

                });
              }
            });
            return res.ok('1|' + req.param('idgw') + '|');

          }

        });

      }

    });

  },

  getGateways: function(req,res) {

      Gateway.find({}).populate('sensor').exec(function findGateway(err,found){

        return res.json(found);
      });

    },

  getDailyReport: function (req,res) {

    var moment = require('moment');


    Gateway.count().exec (function countGateway (err, totalGateways) {

      Sensor.count().exec (function countSensor (err, totalSensor) {

        Measurement.find({createDate:{'>': moment().subtract(1, 'days').startOf('day')._d }}).populate('measurementTypeId').exec( function findMeasurement (err,foundMeasurement) {

          return res.json ({
          countGateways: totalGateways,
          countSensor: totalSensor,
            lastMeasurement: foundMeasurement});

          });

        });


      });

  }



}

