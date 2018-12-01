var Simplate = function(structure) {
	this.structure = structure;
	this.render = function(props, wrapper) {
		return Simplate.DOM.build(this.structure(props), wrapper);
	}
}

Simplate.DOM = function() {};
Simplate.DOM.build = function(content, wrapper) {
	var wrapper = wrapper || document.createElement('div');
	return Simplate.DOM.builderFor(content).build(content, wrapper);
}

Simplate.DOM.builderFor = function(content) {
  switch (content.constructor.name) {
    case 'Array':
      return Simplate.DOM.ArrayBuilder;
      break;
    default:
      return Simplate.DOM.PlainBuilder;
  }
}

Simplate.DOM.ArrayBuilder = function() {};
Simplate.DOM.ArrayBuilder.build = function(content, wrapper) {
  var tagOrStructure = content[0];
  var attributes = content[1] || {};
  var children = content[2] || '';
  var element;

  if (tagOrStructure.constructor.name == 'Array') {
    content.forEach((structure) => {
      Simplate.DOM.build(structure, wrapper);
    });
    return wrapper;
  }

  if (Simplate.supportedTag(tagOrStructure)) {
    element = document.createElement(tagOrStructure);
    wrapper.appendChild(element);
  }

  Simplate.DOM.build(children, element);

	for (var key in attributes) {
    element[key] = attributes[key];
	}

	return wrapper;
}

Simplate.DOM.PlainBuilder = function() {};
Simplate.DOM.PlainBuilder.build = function(content, wrapper) {
		wrapper.innerHTML = content;
		return wrapper;
}

Simplate.supportedTag = function(key) {
	return Simplate.supportedTags.includes(key);
}

Simplate.supportedTags   =   [
	'a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside',
	'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'big', 'blockquote', 'body',
	'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col',
	'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir',
	'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font',
	'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'head',
	'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label',
	'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav',
	'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p',
	'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp',
	'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong',
	'style', 'sub', 'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template',
	'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u',
	'ul', 'var', 'video', 'wbr'
];
