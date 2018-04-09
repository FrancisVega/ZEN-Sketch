// Ordena un array de capas según su posición horizontal, de menor a mayor.
// Función para la función sort().
const sortByHorizontalPosition = (a, b) => a.frame().left() - b.frame().left();

const writeFile = (filename, the_string) => {
  const path =[@"" stringByAppendingString: filename];
  const str = [@"" stringByAppendingString: the_string];
  str.dataUsingEncoding_(NSUTF8StringEncoding).writeToFile_atomically_(path, true)
}

// Get slice
const getSlice = artboard => {
  const sliceLayerAncestry = MSImmutableLayerAncestry.ancestryWithMSLayer(artboard);
  const rect = MSSliceTrimming.trimmedRectForLayerAncestry(sliceLayerAncestry);
  const slices = MSExportRequest.exportRequestsFromExportableLayer_inRect_useIDForName(artboard, rect, false);
  return slices[0];
}

// Export slice
const exportSlice = (doc, slice, filename) => {
  doc.saveArtboardOrSlice_toFile(slice, filename + "." + slice.format());
}

// Copy to clipboard
function copyToPasteboard ( string ) {
  const pasteboard = NSPasteboard.generalPasteboard();
  pasteboard.clearContents();
  pasteboard.setString_forType( NSMutableString.stringWithString( string ), NSPasteboardTypeString );
}

const exportArboardsWithTemplate = ( artboards, template ) => {

  const previzFolder = "/.previz";
  const path = NSHomeDirectory() + previzFolder;
  copyToPasteboard(`${path}/previz.html` );


  let finalSelection;
  if (artboards.length == 1) {
    finalSelection = [context.document.currentPage().currentArtboard()];
  }
  if (artboards.length > 1) {
    finalSelection = artboards;
  }
  if (artboards.length < 1) {
    [doc showMessage: "💩 Select at least one artboard"];
    return false;
  }

  // Artboard
  finalSelection.slice().filter(ab => ab.class() == "MSArtboardGroup").sort(sortByHorizontalPosition)
    .map(function( artboard, idx, array ) {
      const artboardHeight = artboard.frame().height();
      const artboardWidth = artboard.frame().width();
      const currentArtboard = artboard;
      //const currentArtboardName = currentArtboard.name().replace(/[^a-zA-Z0-9]/g,'')

      if(idx == array.length - 1) {
        next = ""
      } else {
        next = idx + 1;
      }

      const htmlName = idx == 0 ? "previz.html" : "previz" + idx + ".html"
      const imageName = htmlName.split(".html")[0];

      // Export
      const exportImageFilePath = path + "/" + imageName;
      exportSlice( context.document, getSlice(currentArtboard), exportImageFilePath );

      const contentTemplate = template
        .replace(/{{htmlName}}/g, htmlName)
        .replace(/{{artboardWidth}}/g, artboardWidth + "px")
        .replace(/{{artboardHeight}}/g, artboardHeight + "px")
        .replace(/{{next}}/g, next)
        .replace(/{{imageName}}/g, imageName)
        .replace(/{{imageFormat}}/g, getSlice(currentArtboard).format())

      writeFile(`${path}/${htmlName}`, contentTemplate);

    }) // End Map

  return true;
}
