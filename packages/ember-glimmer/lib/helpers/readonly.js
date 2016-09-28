/**
@module ember
@submodule ember-glimmer
*/
import { UPDATE } from '../utils/references';
import { unMut } from './mut';


/**
  The `readonly` helper let's you specify that when you updated a value passed in
  to a child component, it does not update in the parent component.
  
  ### Values (numbers, strings)
  
  To specify that a parameter is read-only, when invoking the child `Component`:
  
    ```javascript
  // my-parent.js
  export default Component.extend({
    totalClicks: 3
  });
  ```
  
  ```handlebars
  {{totalClicks}} // -> 3
  {{my-child childClickCount=(readonly totalClicks)}}
  ```
  
  Now, when you update `childClickCount`:
  
  ```javascript
  // my-child.js
  export default Component.extend({
    click() {
      this.incrementProperty('childClickCount');
    }
  });
  ```
  
  The value updates in the child component, but not the parent component:
  
  ```handlebars
  // my-child.hbs
  {{childClickCount}} // -> 4
  ```
  
  ```handlebars
  // my-parent.hbs
  {{totalClicks}} // -> 3
  {{my-child childClickCount=(readonly totalClicks)}}
  ```
  
  ### References (Objects, Arrays)
  
  Notice that while this works for values like numbers and strings, because
  they're immutable, it won't work for Object and Array. Think of it as the
  ES6 `const` keyword.
 
  @method readonly
  @param {Object} [attr] the read-only attribute.
  @for Ember.Templates.helpers
  @public
*/
export default function(vm, args) {
  let ref = unMut(args.positional.at(0));

  let wrapped = Object.create(ref);

  wrapped[UPDATE] = undefined;

  return wrapped;
}
