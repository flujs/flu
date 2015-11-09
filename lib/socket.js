
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
    ['connect', 'data', 'end', 'timeout', 'error', 'drain', 'close'].forEach(fn => {
      this.client.on(fn, data => {
        this.emit(fn, data);
      });
    });
    this.client.on('close', () => {
      this.leaveAll();
    });
  }

  join(room) {
    debug('joining room', room);
    if (~this.rooms.indexOf(room)) return this;
    this.app.join(this.id, room);
    this.rooms.push(room);
    console.log(this.rooms);
    return this;
  }

  leave(room) {
    debug('leave room', room);
    this.app.leave(this.id, room);
    let idx = this.rooms.indexOf(room);
    if (idx >= 0) {
      this.rooms.splice(idx, 1);
    }
    return this;
  }
  leaveAll() {
    debug(this.id, 'leaveAll');
    this.rooms.forEach(room => {
      this.app.leave(this.id, room);
    });
    this.rooms = [];
    this.app.delete(this.id);
  }
};
