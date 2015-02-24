/**
* SensorRecord.js
*
* @description :: Model class for the sensor reading.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'entomaticDb',
  attributes: {

    id: {
      type: 'integer',
      required: true
    },

    type: {
      type: 'string',
      required: true
    },
    reading: {
      type: 'float',
      required: true
    },
    date: {
      type: 'datetime',
      required: true
    }

  }
};

