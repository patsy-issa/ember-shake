import Ember from 'ember';
import config from 'ember-shake/config/environment';

const {
  inject,
  Service
} = Ember;

export default Service.extend({
  store: inject.service(),

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

  /**
   * @method init
   */
  init() {
    window.addEventListener('shake', this.shakeHandler.bind(this));
    let socket = this.get('socketIOService').socketFor(config.shake.server);
    socket.on('connect', this.connect, this);
    socket.on('disconnect', this.disconnect, this);
    socket.on('match', this.matchHandler, this);

    return this._super(...arguments);
  },

  /**
   * @method matchHandler
   */
  matchHandler({ content }) {
    let contact = this.get('store').createRecord('contact', content);
    contact.save();
  },

  /**
   * @method connect
   */
  connect() {
    this.set('connected', true);
  },

  disconnect() {
    this.set('connected', false);
  },

  shakeHandler() {
    let socket = this.get('socketIOService').socketFor(config.shake.server);

    navigator.geolocation.getCurrentPosition(function(position) {
      let {
        coords: {
          latitude,
          longitude
        }
      } = position;

      let randInt = Math.floor(Math.random() * 100);
      let payload = {
        latitude,
        longitude,
        name: `John do ${randInt}`,
        twitter: `potato${randInt}`,
        company: `Potato ${randInt} GmbH`
      };

      socket.emit('shake', payload);
    });
  },

  willDestroy() {
    window.removeEventListener('shake');
    return this._super(...arguments);
  }
});
