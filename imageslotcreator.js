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
