import StorageObject from 'ember-local-storage/local/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      firstName: 'John',
      lastName: 'do',
      twitter: '@johndo',
      email: 'john.do@example.com'
    };
  }
});

export default Storage;
