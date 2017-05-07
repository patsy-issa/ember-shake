import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

const {
  Controller,
  inject
} = Ember;

export default Controller.extend({
  /**
   * @property shake
   * @type {Service.Shake}
   * @default {Ember.InjectedProperty}
   */
  shake: inject.service(),

  profile: storageFor('profile'),

  actions: {
    shake() {
      this.get('shake').shakeHandler();
    }
  }
});
