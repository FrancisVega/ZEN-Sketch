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

const exportArboardsWithTemplate = ( artboards, template ) => {

  const previzFolder = "/.previz";
  const path = NSHomeDirectory() + previzFolder;

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
    .map(function( artboard, idx, array ){
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
      const pngName = htmlName.split(".html")[0];

      // Export
      const exportImageFilePath = path + "/" + pngName;
      exportSlice( context.document, getSlice(currentArtboard), exportImageFilePath );

      let contentTemplate;
      if ( template == "desktop" ) {
        contentTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Zen Previz - ${htmlName}</title>
          <style>
            * { padding:0; margin:0; }
            .previz-image { width: 100%; }
            @media (min-width: ${artboardWidth}px) {
              .previz-image {
                display: block;
                margin: 0 auto;
                width: ${artboardWidth}px;
                height: ${artboardHeight}px;
              }
            }
            </style>
        </head>
        <body>
        <div class="previz">
          <a href="previz${next}.html">
            <img class="previz-image" src=${pngName}.${getSlice(currentArtboard).format()}>
          </a>
        </div>
        </body>
        </html>`;
      }

      if (template == "mobile") {
        contentTemplate = `<!DOCTYPE html>
          <html>
          <head>
            <title>Zen Previz - ${pngName}</title>
            <style>
              .img {
              }
              * {
                padding:0;
                margin:0;
              }
              .previz-image {
                width: 100%;
                margin:0 auto;
              }
            </style>
          </head>
          <body>
          <div class="img">
            <a href="previz${next}.html">
              <img class="previz-image" src=${pngName}.${getSlice(currentArtboard).format()}>
            </a>
          </div>
          </body>
          </html>`;
      }

      if (template == "simple") {
        contentTemplate = `<!DOCTYPE html>
          <html>
          <head>
            <title>Zen Previz - ${pngName}</title>
            <style>
              * {
                padding:0;
                margin:0;
              }
              .previz {
                display: flex;
              }
              .previz-image {
                width: ${artboardWidth}px;
                height: ${artboardHeight}px;
              }
              </style>
          </head>
          <body>
          <div class="previz">
            <a href="previz${next}.html">
              <img class="previz-image" src=${pngName}.${getSlice(currentArtboard).format()}>
            </a>
          </div>
          </body>
          </html>`;
      }

      writeFile(path + "/" + htmlName, contentTemplate);

    }) // End Map

  return true;
}
