import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/features/symbol';
import 'core-js/features/map';
import 'core-js/features/array/fill';
import 'core-js/features/array/includes';
import 'core-js/features/array/map';
import 'core-js/features/array/find';
import 'core-js/features/array/for-each';
import 'core-js/features/string/code-point-at';
import 'core-js/features/string/from-code-point';
import 'core-js/features/string/replace';
import 'core-js/features/string/trim';
import 'core-js/features/string/trim-start';
import 'core-js/features/string/includes';
import 'core-js/features/number/is-integer';
import 'core-js/features/number/is-nan';
import 'core-js/features/regexp/replace';
import 'core-js/features/regexp/search';
import 'core-js/features/regexp/match';
import 'core-js/features/object/values';
import 'core-js/features/object/keys';
import 'core-js/features/object/entries';
import 'unorm';
import './utils/date';

// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
(function(arr) {
  arr.forEach(function(item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode === null) {
          return;
        }
        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
