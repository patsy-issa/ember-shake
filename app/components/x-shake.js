import Ember from 'ember';
import config from 'ember-shake/config/environment';

const {
  Component,
  inject
} = Ember;

export default Component.extend({
  model: null,

  connected: false,

  socketIOService: inject.service('socket-io'),

  init() {
    window.addEventListener('shake', this.shakeHandler.bind(this));
    let socket = this.get('socketIOService').socketFor('http://169.254.100.103:3000/');

    socket.on('connect', this.connected, this);
    socket.on('match', this.matchHandler, this);
    return this._super(...arguments);
  },

  matchHandler(payload) {
    alert('potato');
    console.log(payload);
  },

  connected() {
    this.set('connected', true);
  },

  shakeHandler() {
    let socket = this.get('socketIOService').socketFor('http://169.254.100.103:3000/');

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
