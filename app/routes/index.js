import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model() {
    return [{
      fullName: 'Paul Spieker',
      company: 'SuitePad GmbH',
      twitter: 'paul_spieker',
      note: 'foo bar'
    }, {
      fullName: 'Mr. Sth.',
      company: 'Something GmbH',
      twitter: 'something',
      note: 'foo bar'
    }]
  }
});
