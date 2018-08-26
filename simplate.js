var Simplate = function(structure) {
	this.structure = structure;
	this.render = function(props, wrapper) {
		return Simplate.DOM.build(this.structure(props), wrapper);
	}
}

Simplate.DOM = function() {};
Simplate.DOM.builderFor = function(content) {
	if (typeof content === 'object') {
		return Simplate.DOM.ObjectBuilder;
	}
	return Simplate.DOM.PlainBuilder;
}

Simplate.DOM.build = function(content, wrapper) {
	wrapper = wrapper || document.createElement('div');
	return Simplate.DOM.builderFor(content).build(content, wrapper);
}

Simplate.DOM.ObjectBuilder = function() {};
Simplate.DOM.ObjectBuilder.build = function(content, wrapper) {
	for (var key in content) {
		if (Simplate.supportedTag(key)) {
			var newWrapper = document.createElement(key);
			var domObj = Simplate.DOM.build(content[key], newWrapper);
			wrapper.appendChild(domObj);
		} else {
			wrapper[key] = content[key];
		}
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