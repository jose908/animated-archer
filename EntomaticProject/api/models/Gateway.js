/**
* Gateway.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'entomaticDb',
  tableName: 'gateway',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {

    gatewayId: {
      type: 'integer',
      primaryKey: true,
      columnName: 'gateway_id',
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
    sensor: {
      collection: 'sensor',
      via: 'gatewayId'
    }




  }
};

