/**
 * Measurement.js
 *
 * @description :: The measurement model for storing the measurements from the sensor
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
    epoch: {
      type: 'integer',
      required: true,
      columnName: 'epoch'
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

