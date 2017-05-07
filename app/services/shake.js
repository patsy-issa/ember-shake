import Ember from 'ember';
import config from 'ember-shake/config/environment';

const {
  inject,
  Service
} = Ember;

export default Service.extend({
  /**
   * @property profile
   */
  profile: null,

  /**
   * @property connected
   * @type {Boolean}
   * @default false
   */
  connected: false,

  /**
   * @property socketIOService
   * @type {SocketIO.Client}
   * @default {Ember.InjectedProperty}
   */
  socketIOService: inject.service('socket-io'),

  init() {
    window.addEventListener('shake', this.shakeHandler.bind(this));
    let socket = this.get('socketIOService').socketFor(config.shake.server);
    socket.on('connect', this.connect, this);
    socket.on('disconnect', this.disconnect, this);
    socket.on('match', this.matchHandler, this);
    return this._super(...arguments);
  },

  disconnect() {
    this.set('connected', false);
  },

  matchHandler(payload) {
    alert('potato');
    console.log(payload);
  },

  connect() {
    this.set('connected', true);
  },

  shakeHandler() {
    let socket = this.get('socketIOService').socketFor(config.shake.server);

    // navigator.geolocation.getCurrentPosition(function({ latitude, longitude }) {
      socket.emit('shake', {
        latitude: 10,
        longitude: 10,
        ...this.get('model')
      });
    // });
    this.set('potato', 'YOU ARE SHAKING');
  },

  willDestroy() {
    window.removeEventListener('shake');
    return this._super(...arguments);
  }
});
