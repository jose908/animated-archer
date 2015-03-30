/**
 * Measurement.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  connection: 'entomaticDb',
  tableName: 'measurement',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {

    measurementId: {
      type: 'integer',
      primaryKey: true,
      columnName: 'measurement_id',
      autoIncrement : true
    },
    sensorId: {
      model: 'Sensor',
      columnName: 'sensor_id'
    },
    counter: {
      type: 'integer',
      required: true,
      columnName: 'counter'
    },
    sensorReading: {
      type: 'string',
      required: true,
      columnName: 'sensor_reading'
    },
    measurementTypeId: {
      model: 'MeasurementType',
      columnName: 'measurement_type_id'
    },
    createDate: {
      type: 'datetime',
      required: true,
      columnName: 'create_date',
      defaultsTo: function () {
        return new Date();
      }
    },
    updateDate: {
      type: 'datetime',
      required: true,
      columnName: 'update_date',
      defaultsTo: function () {
        return new Date();
      }
    }

  }
};

