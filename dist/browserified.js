(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var lR = ALLEX.execSuite.libRegistry;
lR.register('allex_imageregistrylib', require('.')(ALLEX));

},{".":5}],2:[function(require,module,exports){
function createImageRegistry (lib, ImageSlot) {
  'use strict';

  var Map = lib.Map;

  function ImageRegistry () {
    Map.call(this);
  }
  lib.inherit(ImageRegistry, Map);
  ImageRegistry.prototype.destroy = function () {
    lib.containerDestroyAll (this);
    Map.prototype.destroy.call(this);
  };

  ImageRegistry.prototype.drop = function (image) {
    return this.remove(image);
  };

  ImageRegistry.prototype._createNewImageSlot = function (image) {
    var s = this.get(image);
    if (!s){
      s = new ImageSlot();
      this.add(image, s);
    }
    return s;
  };

  ImageRegistry.prototype.storeImage = function (image, animation, frame, img) {
    var s = this._createNewImageSlot (image);
    s.update(animation, frame, img);
  };

  return ImageRegistry;
};

module.exports = createImageRegistry;

},{}],3:[function(require,module,exports){
function createImageSequence (lib) {
  'use strict';

  function ImageSequence (){
    this.frames = [];
  }
  ImageSequence.prototype.destroy = function () {
    var im = null;
    if (this.frames) {
      for (var i = 0; i < this.frames.length; i++) {
        im = this.frames[i];
        if (!im) continue;
        this.frames[i] = null;
        im.onload = null;
        im.onerror = null;
        im = null;
      }
    }
    this.frames = null;
  };

  ImageSequence.prototype.add = function (frame, image) {
    this.frames[frame] = image;
  };

  ImageSequence.prototype.sanitize = function () {
    this.frames = this.frames.filter(lib.isVal);
  };

  return ImageSequence;
}

module.exports = createImageSequence;

},{}],4:[function(require,module,exports){
function createImageSlot (lib, ImageSequence) {
  'use strict';

  var Map = lib.Map;

  function dodestroy (item) {
    if (!(item && lib.isFunction(item.destroy))) return;
    item.destroy();
    item = null;
  }

  function ImageSlot () {
    Map.call(this);
  }
  lib.inherit(ImageSlot, Map);
  ImageSlot.prototype.destroy = function () {
    this.traverse(dodestroy);
    Map.prototype.destroy.call(this);
  };

  ImageSlot.prototype.recordEmptyAnimation = function (image, animation) {
    this.add(animation, null);
  };

  ImageSlot.prototype.update = function (animation, frame, image) {
    var a = this.get(animation);
    if (!a) {
      a = new ImageSequence();
      this.add(animation, a);
    }
    a.add(frame, image);
  };

  ImageSlot.prototype.sanitize = function () {
    this.traverse(lib.doMethod.bind(lib, 'sanitize', null));
  };

  return ImageSlot;
}

module.exports = createImageSlot;

},{}],5:[function(require,module,exports){
function createLib (execlib) {
  'use strict';
   var lib = execlib.lib;
   var ImageSequence = require('./imagesequencecreator')(lib),
    ImageSlot = require('./imageslotcreator')(lib, ImageSequence),
    ImageRegistry = require('./imageregistrycreator')(lib, ImageSlot);

  return ImageRegistry;
}

module.exports = createLib;

},{"./imageregistrycreator":2,"./imagesequencecreator":3,"./imageslotcreator":4}]},{},[1]);
