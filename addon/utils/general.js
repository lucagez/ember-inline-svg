// converts slash paths to dot paths so nested hash values can be fetched with Ember.get
// foo/bar/baz -> foo.bar.baz
export function dottify(path = '') {
  return path.replace(/^\//g, '').replace(/\//g, '.');
}

// maybe this should be a component with tagName: 'svg' and strip the outer <svg> tag
// so we can use standard component class stuff?
export function applyClass(svg = '', klass) {
  if (!klass) { return svg; }

  // now we have 2 problems...
  return svg.replace('<svg', '<svg class="'+klass+'"');
}

// add/update title to svg
export function applyTitle(svg = '', title) {
  if (!title) { return svg; }

  if (svg.indexOf('<title>') !== -1) {
    return svg.replace(/<title>(.*?)<\/title>/gm, `<title>${title}</title>`);
  } else {
    return svg.replace('</svg>', `<title>${title}</title></svg>`);
  }
}

function isChrome() {
  const agent = ((window.navigator || {}).userAgent || '');
  return !!window.chrome && /chrome/i.test(agent) && !/edge/i.test(agent);
}

// manual polyfill:
// => `assert` is not supported on old IE and safari iOS
const { error } = console;

const noop = function() {}

// The following is a non-throwing assert
// It will show a red error message in the console but will not stop the rest
// of the application to render properly
const assertCondition = function(condition, message) {
  if (!condition) {
    error(message);
  }
}

export const assert = isChrome() ? assertCondition : noop;
