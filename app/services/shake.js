import Ember from 'ember';
import config from 'ember-shake/config/environment';

const {
  inject,
  run,
  Service
} = Ember;

const TIMEOUT   = 5000;
const TIME_STEP = TIMEOUT / 100; // Progress has 100 steps

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
    this.set('waitProgress', null);
    if (this.get('_timer')) {
      run.cancel(this.get('_timer'));
    }
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
    if (this.get('waitProgress')) {
      return;
    }

    this.set('waitProgress', 1);

    let socket = this.get('socketIOService').socketFor(config.shake.server);

    navigator.geolocation.getCurrentPosition((position) => {
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
        fullName: `John do ${randInt}`,
        twitter: `potato${randInt}`,
        company: `Potato ${randInt} GmbH`
      };

      socket.emit('shake', payload);

      this.set('_timer', run.later(this, this._updateProgress, TIME_STEP));
    });
  },

  willDestroy() {
    window.removeEventListener('shake');
    return this._super(...arguments);
  },

  _updateProgress() {
    this.incrementProperty('waitProgress');
    if (this.get('waitProgress') > 100) {
      this.set('waitProgress', null);
    } else {
      this.set('_timer', run.later(this, this._updateProgress, TIME_STEP));
    }
  }
});
