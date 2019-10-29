import { htmlSafe } from '@ember/string';
import { get } from '@ember/object';

import {
  dottify,
  applyClass,
  applyTitle,
  assert
} from 'ember-inline-svg/utils/general';

export function inlineSvg(svgs, path, options) {
  var jsonPath = dottify(path);
  var svg = get(svgs, jsonPath) || get(svgs, jsonPath.slice(0, -4));

  assert(svg, `No SVG found for ${path}`);

  if (!svg) {
    svg = '<svg></svg>'
  }

  svg = applyClass(svg, options.class);
  svg = applyTitle(svg, options.title)

  return htmlSafe(svg);
}
