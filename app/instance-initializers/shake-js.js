import config from 'ember-shake/config/environment';

let {
  shake: {
    threshold,
    timeout
  }
} = config;

export function initialize() {
  let shake = new Shake({
    threshold,
    timeout
  });

  shake.start();
}

export default {
  name: 'shake-js',
  initialize
};
