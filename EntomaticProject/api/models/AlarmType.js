/**
* AlarmType.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'entomaticDb',
  tableName: 'alarm_type',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    alarmTypeId: {
      primaryKey: true,
      type: 'integer',
      required: true,
      columnName: 'alarm_type_id'
    },
    name: {
      type: 'string',
      required: true,
      columnName: 'name'
    },
    alarms: {
      collection: 'alarm',
      via: 'alarmTypeId'
    }
  }

};

