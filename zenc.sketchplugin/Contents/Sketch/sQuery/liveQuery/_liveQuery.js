// liveQuery
// @shortcut cmd '

var onRun = function(context) {
  @import '../sQuery/sQuery.js';
  @import '../sQuery/plugins/sQuery.areGroups.js';
  @import '../sQuery/plugins/sQuery.areShapes.js';
  @import '../sQuery/plugins/sQuery.move.js';
  @import '../sQuery/plugins/sQuery.parentRoot.js';
  @import '../sQuery/plugins/sQuery.removeEmptyGroupsRecursive.js';

  var doc = context.document;
  var sq = [doc askForUserInput:"sQuery?" initialValue:"*"];

  var sel = context.selection;

    if (sel[0].class() == "MSArtboardGroup") {

      // Query
      if(sq == "*") {
        $("*").UISelect();
      }

      // Query
      if(sq == "t" || sq == "text" || sq == "textlayers") {
        $("%textLayers%").UISelect();
      }

      // Query
      if(sq == "v" || sq == "s" || sq == "shapes") {
        $("%shapes%").UISelect();
      }

      // Query
      if(sq == "h") {
        $("%hierarchy%").UISelect();
      }

      // Query
      if(sq == "g" || sq == "groups") {
        $("%groups%").UISelect();
      }

      // Query
      if(sq == "i" || sq == "images" || sq == "img" || sq == "imgs") {
        $("%images%").UISelect();
      }

      // Query
      if(sq == "l" || sq == "layers") {
        var shapes = $("%shapes%");
        var images = $("%images%");
        var text = $("%textLayers%");
        $("*").areShapes().areImages().areTextLayers().UISelect();
      }

    } else {

      log("SELECCION")
      var SELECTED = $("%selected%");

      // Query
      if(sq == "*") { }

      // Query
      if(sq == "t" || sq == "text" || sq == "textlayers") {
        SELECTED.filter(function(){
          log("ok")
          return this.class() == "MSTextLayer";
        }).UISelect();
      }

      // Query
      if(sq == "v" || sq == "s" || sq == "shapes") {
        SELECTED.areShapes().UISelect();
      }

      // Query
      if(sq == "h") {
        $("%hierarchy%").UISelect();
      }

      // Query
      if(sq == "g" || sq == "groups") {
        $("%groups%").UISelect();
      }

      // Query
      if(sq == "i" || sq == "images" || sq == "img" || sq == "imgs") {
        $("%images%").UISelect();
      }

      // Query
      if(sq == "l" || sq == "layers") {
        var shapes = $("%shapes%");
        var images = $("%images%");
        var text = $("%textLayers%");
        $("*").areShapes().areImages().areTextLayers().UISelect();
      }

    }

}
