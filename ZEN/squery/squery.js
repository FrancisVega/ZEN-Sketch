var doc = context.document;var sQuery, $;(function(){  sQuery = $ = function(selector) {    return new SQUERY(selector);  };  allLayers = [];  function fillArray(sel) {    var layers = sel.layers();    var len = layers.length();    for (var i=0; i < len; i++) {      var layer = layers.objectAtIndex(i);      if ([layer class] == MSLayerGroup) {        allLayers.push(layer);        fillArray(layer);      } else {        allLayers.push(layer);      }    }  };  var SQUERY = function(selector) {    // this    this.typename =  "sQuery";    this.version = "0.1";    this.autor = "Francis Vega";    this.layers = [];    // vars    var _docs = [];    var _layers = [];    var len;    var i;    var keyChar = "%";    // this    this.typename =  "psdQuery";    this.version = "1.0";    this.autor = "Francis Vega";    this.layers = [];    /**     * Filtra el array de capas para dejar solo aquellas que coincidan en el tipo (klass)     * @param {object|string} klass Determina el tipo de capa a filtrar     * @return {[MSLayerClass]}     * @example     * filterLayersByClass(MSLayerGroup);     * @example     * filterLayersByClass("*");     */    function filterLayersByClass(klass) {      allLayers = [];      fillArray(doc.currentPage().currentArtboard());      // Chapucilla      if (typeof(klass) == "object") {        var _layers = [];        var layer;        var len = allLayers.length;        for(i=0; i<len; i++) {          layer = allLayers[i];          if(sQuery().is(layer, klass)) {            _layers.push(layer);          }        }        return _layers;      }      if (typeof(klass) == "string") {        switch(klass) {          case "*":            return allLayers;            break;          case "selected":            var _mslayers = context.selection;            var _layers = [];            for(var i=0; i<_mslayers.count(); i++) {              _layers.push(_mslayers.objectAtIndex(i));            }            return _layers;            break;        }      }    };    if (typeof selector === "string") {      switch(selector) {        case "*":          _layers = filterLayersByClass("*");          break;        case "%groups%":          _layers = filterLayersByClass(MSLayerGroup);          break;        case "%shapes%":          _layers = filterLayersByClass(MSShapeGroup);          break;        case "%images%":          _layers = filterLayersByClass(MSBitmapLayer);          break;        case "%textLayer%":          _layers = filterLayersByClass(MSTextLayer);          break;        case "%selected%":          _layers = filterLayersByClass("selected");          break;        default:          break;      }    }    this.layers = _layers.slice();    this.length = _layers.length;    // Return self object    return this;  };  /* @psdQuery API */  sQuery.fn = SQUERY.prototype = {    is: function(layer, theClass){      var klass = [layer class];      return klass === theClass;    },    isPage: function(layer){      return SQUERY.prototype.is(layer, MSPage);    },    isArtboard: function(layer){      return SQUERY.prototype.is(layer, MSArtboardGroup);    },    isGroup: function(layer){      return SQUERY.prototype.is(layer, MSLayerGroup);    },    isText: function(layer){      return SQUERY.prototype.is(layer, MSTextLayer);    },    isShape: function(layer){      return SQUERY.prototype.is(layer, MSShapeGroup);    },    isImageLayer: function(layer) {      return SQUERY.prototype.is(layer, MSBitmapLayer);    },     //@LOOP METHODS     /**     * Itera por cada uno de los elementos previamente seleccionados y devuelve el elemento     * @param {function} callback Una función a la que each llama por cada iteración     * @return {this} Devuelve this     */    each: function(callback) {      for(var i = 0; i < this.layers.length; ++i) {        callback.call(this.layers[i], i);      }      return this;    },    /**     * Itera por cada uno de los elementos filtrando los que devuelvan true     * @param {function} callback Una función a la que filter llama por cada iteración     * @return {this} Devuelve this     */    filter: function(callback) {      var r = [];      var k;      for(var i = 0; i < this.layers.length; ++i) {        k = callback.call(this.layers[i], i);        if (k){          r.push(this.layers[i]);        }      }      this.layers = r.slice();      return this;    },    rename: function(name) {      for (var i=0; i<this.layers.length; i++) {        this.layers[i].name = name;      }      return this;    },    isLocked: function(neg) {      var _layers = [];      for (var i=0; i<this.layers.length; i++) {        if (this.layers[i].isLocked()) {          _layers.push(this.layers[i]);        }      }      this.layers = _layers.slice();      return this;    },    startsWith: function(str) {      var _layers = [];      var strLen = str.length;      var layerName;      for (var i=0; i<this.layers.length; i++) {        layerName = this.layers[i].name();        if(layerName.substr(0, strLen) == str) {          _layers.push(this.layers[i]);        }      }      this.layers = _layers.slice();      return this;    },    endsWith: function(str) {      var _layers = [];      var strLen = str.length;      var layerName;      for (var i=0; i<this.layers.length; i++) {        layerName = this.layers[i].name();        layerNameLen = layerName.length();        if(layerName.substr(layerNameLen-strLen, layerNameLen) == str) {          _layers.push(this.layers[i]);        }      }      this.layers = _layers.slice();      return this;    },    contains: function(str) {      var _layers = [];      var layerName;      for (var i=0; i<this.layers.length; i++) {        layerName = this.layers[i].name();        if(layerName.split(str).length > 1) {          _layers.push(this.layers[i]);        }      }      this.layers = _layers.slice();      return this;    },    UISelect: function(){      // Primero deseleccionamos todo      doc.currentPage().deselectAllLayers()        for (var i=0; i<this.layers.length; i++) {          this.layers[i].select_byExpandingSelection(true, true);        }      return this;    },    brothers: function(){      var bigBrother = this.layers[0];      var bigParent = bigBrother.parentGroup();      var brothers = bigParent.layers();      var _layers = [];      for (var i=0; i<brothers.count(); i++) {        _layers.push(brothers.objectAtIndex(i));      }      this.layers = _layers.slice();      return this;    },    childs: function() {    },    descendants: function() {      return this;    },    isEmpty: function() {    },    isHidden: function() {      return this;    },    show: function() {      return this;    },    hide: function() {      return this;    },    lock: function() {      return this;    },    unlock: function() {      return this;    },    duplicate: function(name) {      return this;    },    remove: function() {      return this;    },    visible: function(val) {      return this;    },    opacity: function(val) {      return this;    },    addGroup: function(name) {      return this;    },    addTextLayer: function(userInput) {      return this;    }  };})();