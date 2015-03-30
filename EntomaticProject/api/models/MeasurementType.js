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
      required: true,
      columnName: 'measurement_type_id'
    },
    name: {
      type: 'string',
      required: true,
      columnName: 'name'
    },
    measurements: {
      collection: 'measurement',
      via: 'measurementTypeId'
    }

  }
};

