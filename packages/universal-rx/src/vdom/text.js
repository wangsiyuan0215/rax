import Host from './host';

/**
 * Text Component
 */
class TextComponent {
  constructor(element) {
    this._currentElement = element;
    this._text = '' + element;
  }

  mountComponent(parent, context, childMounter) {
    this._parent = parent;
    this._context = context;
    this._mountID = Host.mountID++;

    // Weex dom operation
    let nativeNode = this.getNativeNode();

    if (childMounter) {
      childMounter(nativeNode, parent);
    } else {
      Host.driver.appendChild(nativeNode, parent);
    }

    let component = {
      _internal: this
    };

    return component;
  }

  unmountComponent(shouldNotRemoveChild) {
    if (this._nativeNode && !shouldNotRemoveChild) {
      Host.driver.removeChild(this._nativeNode, this._parent);
    }

    this._currentElement = null;
    this._nativeNode = null;
    this._parent = null;
    this._context = null;
    this._text = null;
  }

  updateComponent(prevElement, nextElement, context) {
    // Replace current element
    this._currentElement = nextElement;
    Host.driver.updateText(this.getNativeNode(), nextElement);
  }

  getNativeNode() {
    if (this._nativeNode == null) {
      this._nativeNode = Host.driver.createText(this._text);
    }
    return this._nativeNode;
  }
}

export default TextComponent;
