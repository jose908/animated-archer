/**
 * Sensor.js
 *
 * @description :: Model for the master sensor table.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {


  connection: 'entomaticDb',
  tableName: 'sensor',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {

    sensorId: {
      primaryKey: true,
      type: 'integer',
      columnName: 'sensor_id',
      autoIncrement : true
    },
    latitude: {
      type: 'float',
      required: true,
      columnName: 'latitude'
    },
    longitude: {
      type: 'float',
      required: true,
      columnName: 'longitude'
    },
    mac: {
      type: 'string',
      required: true,
      columnName: 'mac'
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
    },
    measurements: {
      collection: 'Measurement',
      via: 'sensorId'
    },
    alarms: {
      collection: 'Alarm',
      via: 'sensorId'
    },
    gatewayId: {
      model: 'Gateway',
      columnName: 'gateway_id'
    }

  }


};

