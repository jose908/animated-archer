/**
* Alarm.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'entomaticDb',
  tableName: 'alarm',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {

    alarmId: {
      type: 'integer',
      primaryKey: true,
      columnName: 'alarm_id',
      autoIncrement : true
    },
    sensorId: {
      model: 'Sensor',
      columnName: 'sensor_id'
    },

    value: {
      type: 'string',
      required: true,
      columnName: 'value'
    },
    alarmTypeId: {
      model: 'AlarmType',
      columnName: 'alarm_type_id'
    },
    viewed: {
      type: 'boolean',
      columnName: 'viewed',
      defaultsTo: 'false'
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

