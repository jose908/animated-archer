/**
 * MeasurementTypeController
 *
 * @description :: Server-side logic for managing Measurementtypes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  getMeasurementTypes: function (req, res) {

    MeasurementType.find({}).exec(function findCB(err, found) {

      return res.json(found);

    });

  },

  newMeasurementType: function (req, res) {

    MeasurementType.findOne({
      or : [
        { name: req.param('name') },
        { shortName: req.param('shortName') }
      ]
    }).exec (function foundTypes (err,types) {

      if(types) {

        return res.badRequest('Inserted Measurement Type is already in use');

      }
      else {

        MeasurementType.create({
          name: req.param('name'),
          shortName: req.param('shortName'),
          units: req.param('units')
        }).exec(function createType (err, createdType) {

          if(createdType) {

            return res.json({measurementTypeId: createdType.measurementTypeId});

          }
          else {

            return res.negotiate(err);
          }

        });

      }

    });

  }


}
