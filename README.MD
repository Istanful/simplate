# Simplate
Simplate is a simple JavaScript HTML builder with templates. With less than a hundred lines Simplate is the perfect solution if you want to write HTML in javascript without struggling with string interpolation or boring Javascript HTML nodes.

# A simple example
```JavaScript
var template = new Simplate((props) => [
  ['h1', {}, props.title],
  ['p', { className: 'paragraph' }, props.content]
]);

template.render({
  title: 'Simplate is a simple JavaScript HTML builder',
  content: 'It can build HTML nodes from JavaScript Objects!'
}, document);
```

# Getting started
Simplate always construct vanilla [JavaScript HTML nodes](https://www.w3schools.com/js/js_htmldom_nodes.asp) which means
you can combine it with jQuery or just go plain vanilla!

## Building HTML nodes
You can construct an element like so:
```JavaScript
Simplate.DOM.build([
  ['h1', {}, 'Simplate is awesome!']
]);
```

Which will return a node representing:
```HTML
<div>
  <h1>Simplate is awesome!</h1>
</div>
```

As you can see the content was wrapped in a div tag.
This is because any node created must also have a parent node.
If you already have an element to append the content to you can provide it
as a parameter.

```JavaScript
var contentWrapper = document.GetElementById('content');
Simplate.DOM.build([
  ['h1', {}, 'Simplate is awesome!']
], contentWrapper);
```

You can add attributes to the node by providing an object.
The content must then be provided with the `innerHTML` attribute.
```JavaScript
Simplate.DOM.build([
  ['p', { className: 'paragraph' }, 'Wow, this is handy']
]);
```

## Creating templates
To create a template you provide an anonymous function that returns the structure used to build the content. The function will be passed the `props` object which will contain any dynamic content you want to output.
```JavaScript
var template = new Simplate((props) => [
  ['h1', {}, props.title],
  ['p', { className: 'paragraph' }, props.content]
]);
```

By calling render on the template you obtain a HTML node just like you would when calling `Template.DOM.build`

Given the previous template you call:
```JavaScript
template.render({ title: 'My title', content: 'My paragraph' });
```

Would return a node representing:
```HTML
<div>
  <h1>My title</h1>
  <p>My paragraph</p>
</div>
```

Just like with the `Template.DOM.build` function you can provide an optional wrapper.
```JavaScript
var contentWrapper = document.GetElementById('content-wrapper');
template.render({
  title: 'My title',
  paragraph: 'My paragraph'
}, contentWrapper);
```
