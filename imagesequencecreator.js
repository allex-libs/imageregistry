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
