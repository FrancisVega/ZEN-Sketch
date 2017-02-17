var onRun = function(context) {
  const getArtboardFromLayer = layer => {
    let parent = layer.parentGroup()
    if(parent.class() == 'MSArtboardGroup') {
      artboard = parent
    } else {
      getArtboardFromLayer(parent)
    }
    return artboard
  }

  // Put a layer in Artboard root
  function parentToRoot(layer) {
    if (layer.parentGroup().class() != 'MSArtboardGroup') {
      // Get the artboard
      const artboard = getArtboardFromLayer(layer);
      const parent = layer.parentGroup();
      // Get layer absolute position
      const x = layer.absoluteRect().x() - artboard.absoluteRect().x();
      const y = layer.absoluteRect().y() - artboard.absoluteRect().y();
      // Parent to it
      artboard.addLayers([layer]);
      // Remove from previous parent
      parent.removeLayer(layer);
      // Position new layer
      layer.frame().setX(x);
      layer.frame().setY(y);
    }
  }

  context.selection.slice().map(layer => parentToRoot(layer))

}
