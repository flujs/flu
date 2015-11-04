
'use strict';

/**
 * Module dependencies.
 */

const debug = require('debug')('flu:application');
const Emitter = require('events');
const net = require('net');
const Socket = require('./socket');

/**
 * Expose `Application` class.
 * Inherits from `Emitter.prototype`.
 */

module.exports = class Application extends Emitter {

  /**
   * Initialize a new `Application`.
   *
   * @api public
   */

  constructor() {
    super();
    this.rooms = [];
    this.sockets = {};
    this.on('data', data => {
      debug(data);
    });
  }

  /**
   * Shorthand for:
   *
   *    net.createServer(app.callback()).listen(...)
   *
   * @param {Mixed} ...
   * @return {Server}
   * @api public
   */

  listen() {
    debug('listen');
    const server = net.createServer(this.callback());
    return server.listen.apply(server, arguments);
  }

  /**
   * Return a socket handler callback
   * for node's native net server.
   *
   * @return {Function}
   * @api public
   */

  callback() {
    return client => {
      let socket = new Socket(this, client);
      this.sockets[socket.id] = socket;
      this.emit('connection', socket);
    };
  }

  /**
   * Joins a room.
   *
   * @param {String} room
   * @param {Function}
   * @return {Socket} self
   * @api public
   */

  join(id, room) {
    if (!this.rooms[room]) this.rooms[room] = [];
    if (~this.rooms[room].indexOf(id)) return this;
    this.rooms[room].push(id);
    return this;
  }

  leave(id, room) {
    let idx = this.rooms[room].indexOf(id);
    if (idx >= 0) {
      this.rooms[room].splice(idx, 1);
    }
    return this;
  }

  to(room) {
    debug(room);
    return this;
  }
};
