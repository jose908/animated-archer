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

    Gateway.findOne({
      mac: req.param('idgw')}).exec(function foundGateway (err, foundGateway) {
        //if so, we send to the gateway the current inserted value
      if(foundGateway) {

        Gateway.update({mac: req.param('idgw')},{updateDate: new Date()}).exec (function (err,updatedGateway ) {

          return res.ok('0|' + moment(updatedGateway.updateDate).format("YYYYMMDDHHmmss") + '|' + req.param('idgw') + '|');

        });

      }
      else {

        Gateway.create({latitude: req.param('lat'), longitude: req.param('lon'), mac: req.param('idgw')}).exec (function createdGateway (err, createdGateway) {
        //if not, we insert the new gateway
          if(createdGateway) {

            return res.ok('0|'+ moment(createdGateway.createDate).format("YYYYMMDDHHmmss") + '|' + createdGateway.mac + '|');

          }
          if (err) {

           return res.ok('1|' +req.param('idgw') + '|');

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

