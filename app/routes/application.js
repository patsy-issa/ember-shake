import Ember from 'ember';

const {
  inject,
  Route
} = Ember;

export default Route.extend({
  shake: inject.service(),

  activate() {
    this.get('shake');
  }
});
