/**
 * MeasurementType.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  connection: 'entomaticDb',
  tableName: 'measurement_type',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    measurementTypeId: {
      primaryKey: true,
      type: 'integer',
      autoIncrement : true,
      columnName: 'measurement_type_id'
    },
    name: {
      type: 'string',
      required: true,
      columnName: 'name'
    },
    shortName: {
      type: 'string',
      required: true,
      columnName: 'short_name'
    },
    units: {
      type: 'string',
      required: true,
      columnName: 'units'
    },


    measurements: {
      collection: 'measurement',
      via: 'measurementTypeId'
    }

  }
};

