import Ember from 'ember';

const {
  Controller
} = Ember;

export default Controller.extend({
  actions: {
    delete(record) {
      record.deleteRecord();
      record.save();
    }
  }
});
