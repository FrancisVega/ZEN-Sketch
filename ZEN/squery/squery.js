  ///////////////////////////////////////////////////////////////////////////////////////////////  //                                                                                           //  //  sQuery 0.1                                                                               //  //                                                                                           //  ///////////////////////////////////////////////////////////////////////////////////////////////  var sQuery, $;  var doc = context.document;  var app = NSApplication.sharedApplication();(function(){  /*   * Constructor   */  sQuery = $ = function(selector) {    return new SQUERY(selector);  };  /**   * ...   * @param {object} sel Document, Artboard o Grupo desde el que rellenar el array con las capas   */  allLayers = [];  function fillArray(sel) {    var layers = sel.layers();    var len = layers.length();    for (var i=0; i < len; i++) {      var layer = layers.objectAtIndex(i);      if ([layer class] == MSLayerGroup) {        allLayers.push(layer);        fillArray(layer);      } else {        allLayers.push(layer);      }    }  }  /**   * ...   * @param {string|object} selector El selector   * @return {sQuery}   */  var SQUERY = function(selector) {    // this    this.typename =  "sQuery";    this.version = "0.1";    this.autor = "Francis Vega";    this.layers = [];    // vars    var _docs = [];    var _layers = [];    var len;    var i;    var keyChar = "%";    // this    this.typename =  "psdQuery";    this.version = "1.0";    this.autor = "Francis Vega";    this.layers = [];    /**     * ...     * @param {...} paramName ...     * @return {...} ...     */    function showMessage(message) {      doc.showMessage(message);    }    /**     * Filtra el array de capas para dejar solo aquellas que coincidan en el tipo (klass)     * @param {object|string} klass Determina el tipo de capa a filtrar     * @return {[MSLayerClass]}     * @example     * filterLayersByClass(MSLayerGroup);     * @example     * filterLayersByClass("*");     */    function filterLayersByClass(klass) {      var _layers = [];      //allLayers = [];      fillArray(doc.currentPage().currentArtboard());      //allLayers.reverse();      if (typeof(klass) == "object") {        var layer;        var len = allLayers.length;        _layers = [];        for(i=0; i<len; i++) {          layer = allLayers[i];          if(sQuery().is(layer, klass)) {            _layers.push(layer);          }        }        return _layers;      }      if (typeof(klass) == "string") {        switch(klass) {          case "*":            return allLayers;          case "selected":            var _mslayers = context.selection;            _layers = [];            for(i=0; i<_mslayers.count(); i++) {              _layers.push(_mslayers.objectAtIndex(i));            }            return _layers;        }      }    }    if (typeof selector === "string") {      switch(selector) {        case "*":          _layers = filterLayersByClass("*");          break;        case "%groups%":          _layers = filterLayersByClass(MSLayerGroup);          break;        case "%shapes%":          _layers = filterLayersByClass(MSShapeGroup);          break;        case "%images%":          _layers = filterLayersByClass(MSBitmapLayer);          break;        case "%textLayer%":          _layers = filterLayersByClass(MSTextLayer);          break;        case "%selected%":          _layers = filterLayersByClass("selected");          break;        default:          showMessage("(sQuery) Error!. Unknow selector: " + selector);          break;      }    }/* * *    if (typeof selector === "object") { *      _layers = [selector]; *    } */    this.layers = _layers.slice();    this.length = _layers.length;    // Return self object    return this;  };  /* @sQuery API */  sQuery.fn = SQUERY.prototype = {    /**     * ...     * @param {object} layer Un objeto MSLayer con la capa     * @param {object} theClass El nombre de la clase de capa     * @return {bool}     */    is: function(layer, theClass){      var klass = [layer class];      return klass === theClass;    },    /**     * ...     * @param {object} layer Un objeto MSLayer con la capa     * @return {bool}     */    isPage: function(layer){      return SQUERY.prototype.is(layer, MSPage);    },    /**     * ...     * @param {object} layer Un objeto MSLayer con la capa     * @return {bool}     */    isArtboard: function(layer){      return SQUERY.prototype.is(layer, MSArtboardGroup);    },    /**     * ...     * @param {object} layer Un objeto MSLayer con la capa     * @return {bool}     */    isGroup: function(layer){      return SQUERY.prototype.is(layer, MSLayerGroup);    },    /**     * ...     * @param {object} layer Un objeto MSLayer con la capa     * @return {bool}     */    isText: function(layer){      return SQUERY.prototype.is(layer, MSTextLayer);    },    /**     * ...     * @param {object} layer Un objeto MSLayer con la capa     * @return {bool}     */    isShape: function(layer){      return SQUERY.prototype.is(layer, MSShapeGroup);    },    /**     * ...     * @param {object} layer Un objeto MSLayer con la capa     * @return {bool}     */    isImageLayer: function(layer) {      return SQUERY.prototype.is(layer, MSBitmapLayer);    },    /**     * Itera por cada uno de los elementos previamente seleccionados y devuelve el elemento     * @param {function} callback Una función a la que each llama por cada iteración     * @return {sQuery}     */    each: function(callback) {      for(var i = 0; i < this.layers.length; ++i) {        callback.call(this.layers[i], i);      }      return this;    },    /**     * Itera por cada uno de los elementos filtrando los que devuelvan true     * @param {function} callback Una función a la que filter llama por cada iteración     * @return {sQuery}     */    filter: function(callback) {      var r = [];      var k;      for(var i = 0; i < this.layers.length; ++i) {        k = callback.call(this.layers[i], i);        if (k){          r.push(this.layers[i]);        }      }      this.layers = r.slice();      return this;    },    /**     * ...     * @param {string} name Cadena de texto con el nuevo nombre de las capas     * @return {sQuery}     */    rename: function(name) {      for (var i=0; i<this.layers.length; i++) {        this.layers[i].name = name;      }      return this;    },    /**     * ...     * @return {sQuery}     */    isLocked: function(neg) {      var _layers = [];      for (var i=0; i<this.layers.length; i++) {        if (this.layers[i].isLocked()) {          _layers.push(this.layers[i]);        }      }      this.layers = _layers.slice();      return this;    },    /**     * ...     * @param {string} str Cadena de texto que buscará en las capas     * @return {sQuery}     */    startsWith: function(str) {      var _layers = [];      var strLen = str.length;      var layerName;      for (var i=0; i<this.layers.length; i++) {        layerName = this.layers[i].name();        if(layerName.substr(0, strLen) == str) {          _layers.push(this.layers[i]);        }      }      this.layers = _layers.slice();      return this;    },    /**     * ...     * @param {string} str Cadena de texto que buscará en el nombre de la capa     * @return {sQuery}     */    endsWith: function(str) {      var _layers = [];      var strLen = str.length;      var layerName;      for (var i=0; i<this.layers.length; i++) {        layerName = this.layers[i].name();        layerNameLen = layerName.length();        if(layerName.substr(layerNameLen-strLen, layerNameLen) == str) {          _layers.push(this.layers[i]);        }      }      this.layers = _layers.slice();      return this;    },    /**     * ...     * @param {string} str Cadena de texto que buscará en el nombre de la capa     * @return {sQuery}     */    contains: function(str) {      var _layers = [];      var layerName;      for (var i=0; i<this.layers.length; i++) {        layerName = this.layers[i].name();        if(layerName.split(str).length > 1) {          _layers.push(this.layers[i]);        }      }      this.layers = _layers.slice();      return this;    },    /**     * ...     * @return {sQuery}     */    UISelect: function(){      // Primero deseleccionamos todo      doc.currentPage().deselectAllLayers();        for (var i=0; i<this.layers.length; i++) {          this.layers[i].select_byExpandingSelection(true, true);        }      return this;    },    /**     * ...     * @return {sQuery}     */    brothers: function(){      var bigBrother = this.layers[0];      var bigParent = bigBrother.parentGroup();      var brothers = bigParent.layers();      var _layers = [];      for (var i=0; i<brothers.count(); i++) {        _layers.push(brothers.objectAtIndex(i));      }      this.layers = _layers.slice();      return this;    },    /**     * ...     * @return {sQuery}     */    childs: function() {      var parent = this.layers[0];      var childs = parent.layers();      var _layers = [];      for (var i=0; i<childs.count(); i++) {        _layers.push(childs.objectAtIndex(i));      }      this.layers = _layers.slice();      return this;    },    /**     * ...     * @return {sQuery}     */    descendants: function() {      var _layers = [];      allLayers = [];      fillArray(this.layers[0]);      this.layers = allLayers.slice();      return this;    },    /**     * ...     * @param {string} name El nombre de las capas que queremos seleccionar     * @return {sQuery}     */    withName: function(name) {      var _layers = [];      for (var i=0; i<this.layers.length; i++) {        if (this.layers[i].name() == name) {          _layers.push(this.layers[i]);        }      }      this.layers = _layers.slice();      return this;    },    /**     * ...     * @return {sQuery}     */    hasClickThrought: function() {      var _layers = [];      for (var i=0; i<this.layers.length; i++) {        if (this.layers[i].hasClickThrough() == 1) {          _layers.push(this.layers[i]);        }      }      this.layers = _layers.slice();      return this;    },    /**     * ...     * @return {sQuery}     */    setHasClickThrough: function() {      for (var i=0; i<this.layers.length; i++) {        this.layers[i].setHasClickThrough(0);      }      return this;    },    /**     * ...     * @return {sQuery}     */    toggleClickThrought: function() {      for (var i=0; i<this.layers.length; i++) {        this.layers[i].setHasClickThrough(!this.layers[i].hasClickThrough());      }      return this;    },    /**     * ...     * @return {sQuery}     */    isEmpty: function() {      var _layers = [];      for (var i=0; i<this.layers.length; i++) {        if (this.isGroup(this.layers[i].class())) {          if (this.layers[i].layers().length() === 0) {            _layers.push(this.layers[i]);          }        }      }      this.layers = _layers.slice();      return this;    },    /**     * ...     * @return {sQuery}     */    isVisible: function() {      var _layers = [];      for (var i=0; i<this.layers.length; i++) {        if(this.layers[i].isVisible()) {          _layers.push(this.layers[i]);        }      }      this.layers = _layers.slice();      return this;    },    /**     * ...     * @return {sQuery}     */    isHidden: function() {      var _layers = [];      for (var i=0; i<this.layers.length; i++) {        if(!this.layers[i].isVisible()) {          _layers.push(this.layers[i]);        }      }      this.layers = _layers.slice();      return this;    },    /**     * ...     * @return {sQuery}     */    show: function() {      for (var i=0; i<this.layers.length; i++) {        this.layers[i].setIsVisible(true);      }      return this;    },    /**     * ...     * @return {sQuery}     */    hide: function() {      for (var i=0; i<this.layers.length; i++) {        this.layers[i].setIsVisible(false);      }      return this;    },    /**     * ...     * @return {sQuery}     */    lock: function() {      for (var i=0; i<this.layers.length; i++) {        this.layers[i].setIsLocked(true);      }      return this;    },    /**     * ...     * @return {sQuery}     */    unlock: function() {      for (var i=0; i<this.layers.length; i++) {        this.layers[i].setIsLocked(false);      }      return this;    },    /**     * ...     * @param {name} name El nombre de la nueva capa     * @return {sQuery}     */    duplicate: function(name) {      return this;    },    /**     * ...     * @return {sQuery}     */    remove: function() {      for (var i=0; i<this.layers.length; i++) {        this.layers[i].parentGroup().removeLayer(this.layers[i]);      }      return this;    },    /**     * ...     * @return {sQuery}     */    getLayer: function() {      return this.layers[0];    },    /**     * ...     * @param {number} val Valor de opacidad de 0 a 100     * @return {sQuery}     */    opacity: function(val) {      var layer = this.layers[0];      val = val / 100;      if (val) {        for (var i=0; i<this.layers.length; i++) {          this.layers[i].style().contextSettings().setOpacity(val);        }      } else {        return layer.style().contextSettings().opacity() * 100;      }      return this;    }  };})();