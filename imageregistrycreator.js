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
