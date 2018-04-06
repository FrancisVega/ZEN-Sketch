// @format
// Seleccionas las capas / grupos hijas
// @shortcut alt cmd g

var onRun = function(context) {

  const artboard = context.selection[0];
  artboard.select_byExpandingSelection(0, 0);
  artboard.layers().slice().map((layer) => layer.select_byExpandingSelection(true, true));

}
