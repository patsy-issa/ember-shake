import Ember from 'ember';

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

  actions: {
    delete(record) {
      record.deleteRecord();
      record.save();
    }
  }
});
