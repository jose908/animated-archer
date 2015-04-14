/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    user: {
      type: 'string',
      required: true
    },

    encryptedPassword: {
      type: 'string',
      required: true
    },

    lastLoggedIn: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    },

    isAdmin: {
      type: 'boolean',
      required: true
    }
  }
};
