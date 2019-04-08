function createLib (execlib) {
  'use strict';
   var lib = execlib.lib;
   var ImageSequence = require('./imagesequencecreator')(lib),
    ImageSlot = require('./imageslotcreator')(lib, ImageSequence),
    ImageRegistry = require('./imageregistrycreator')(lib, ImageSlot);

  return ImageRegistry;
}

module.exports = createLib;
