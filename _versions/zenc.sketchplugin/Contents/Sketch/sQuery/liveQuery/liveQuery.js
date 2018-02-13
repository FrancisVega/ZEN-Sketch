// liveQuery
// @shortcut cmd ¡

var onRun = function(context) {
  @import '../sQuery.js';

  const doc = context.document;
  let sq = [doc askForUserInput:'sQuery?' initialValue:''].toLowerCase();

  switch (sq) {
    case '':
    case 'shapes':
    case 'shape':
    case 's':
    case 'l':
    case 'v':
      $('%selected%').filter(function() {
        return this.class() == 'MSShapeGroup';
      }).UISelect();
      break;

    case 'group':
    case 'groups':
    case 'g':
      $('%selected%').filter(function() {
        return this.class() == 'MSLayerGroup';
      }).UISelect();
      break;

    case 'text':
    case 'texts':
    case 't':
      $('%selected%').filter(function() {
        return this.class() == 'MSTextLayer';
      }).UISelect();
      break;

    case 'image':
    case 'images':
    case 'i':
      $('%selected%').filter(function() {
        return this.class() == 'MSBitmapLayer';
      }).UISelect();
      break;

    default:
      $('%selected%').filter(function() {
        return this.class() == 'MSShapeGroup';
      }).UISelect();
      break;
  }
}
