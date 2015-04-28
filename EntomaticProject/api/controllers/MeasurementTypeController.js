/**
 * MeasurementTypeController
 *
 * @description :: Server-side logic for managing Measurementtypes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  getMeasurementTypes: function (req, res) {

    MeasurementType.find({}).exec(function findCB(err, found) {

      res.json(found);


    });

  }

}
