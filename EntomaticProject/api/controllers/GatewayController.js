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

        return res.ok('0|'+ moment(foundGateway.createDate).format("YYYYMMDDHHmmss") + '|' + foundGateway.mac + '|*CLOS*');

      }
      else {

        Gateway.create({latitude: req.param('lat'), longitude: req.param('lon'), mac: req.param('idgw')}).exec (function createdGateway (err, createdGateway) {
        //if not, we insert the new gateway
          if(createdGateway) {

            return res.ok('0|'+ moment(createdGateway.createDate).format("YYYYMMDDHHmmss") + '|' + createdGateway.mac + '|*CLOS*');

          }
          if (err) {

           return res.ok('1|' +req.param('idgw') + '|*CLOS*');

          }

        });

      }

    });



  }

}

