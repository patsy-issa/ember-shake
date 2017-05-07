import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

const { Controller } = Ember;

export default Controller.extend({
  profile: storageFor('profile')
});
