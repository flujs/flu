
'use strict';

/**
 * Module dependencies.
 */

const debug = require('debug')('flu:socket');
const Emitter = require('events');
const uuid = require('uuid');

/**
 * Expose `Socket` class.
 * Inherits from `Emitter.prototype`.
 */

module.exports = class Socket extends Emitter {
  /**
   * Initialize a new `Socket`.
   *
   * @api public
   */

  constructor(app, client) {
    super();
    this.app = app;
    this.client = client;
    this.rooms = [];
    this.id = uuid.v4();
    this.client.on('data', data => {
      this.emit('data', data);
    });
  }

  join(room) {
    debug('joining room %s', room);
    if (~this.rooms.indexOf(room)) return this;
    this.app.join(this.id, room);
    this.rooms.push(room);
    return this;
  }

  leave(room) {
    debug('leave room %s', room);
    this.app.leave(this.id, room);
    let idx = this.rooms.indexOf(room);
    if (idx >= 0) {
      this.rooms.splice(idx, 1);
    }
    return this;
  }
};
