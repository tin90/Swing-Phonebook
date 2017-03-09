//=================================================================
// JavaScript requires: emxUICore.js
// Copyright (c) 1992-2015 Dassault Systemes.
// All Rights Reserved.
//=================================================================
// Global Constants
// Minimum column width. Column width cannot be resized below this
getTopWindow().sb=this;
var sbPage=this;
var onlySBContentRefresh = false;
var useAutoFilterSlideIn = true;
var persistGlobal = false;
// Minimum column width. Column width cannot be resized below this
var COL_MIN = 40;
var LAST_TABLE_COL_WIDTH = 50;
var LAST_TREE_COL_WIDTH = 50;
var TREE_FIRST_COL_WIDTH = 200;
var COLORIZATION_COL_WIDTH = 30;
var cellWrapVal;
// Event related variables
var EVENT_OBJECT, EVENT_TARGET, EVENT_CUR_TARGET, EVENT_TYPE, EVENT_EXEC_STOPBUBBLE, EVENT_EXEC_CANCEL, EVENT_LEFT_BUTTON;
// attach and detach event handler functions
var attachEventHandler, detachEventHandler;
// IE or Mozilla
var strUserAgent = navigator.userAgent.toLowerCase();
var isIE = (strUserAgent.indexOf("msie") > -1 && strUserAgent.indexOf("opera") == -1) || !!strUserAgent.match(/trident.*rv[ :]*11\./);
var sortColumnList = "";
var globalStrData = "";
var reloadCellType = new Array();
var aGetAllArthimeticExpOnColumns = new Array();
var forTab = null;
var applyCheck = false;
var manualExpand = false;
var CHECK_BOX_WIDTH=30;
var CHK_BOX_DIFF=13;
var CHK_BOX_WIDTH=20;
var ICON_WIDTH=20;
var CELL_PADDING_WIDTH=10;
var colsInSecondRow = 0;
var SORT_ARROW_WIDTH = 20;
var SUBMIT_URL_PREV_REQ_IN_PROCESS = false;
var previousLastRowDrawn = 0;
var previousFirstRowDrawn = 0;
//Start: Cross Highlight Changes
var selectHandler = "";
var bodyClass = "UNASSIGNED";
//End: Cross Highlight Changes

var fastloadinIE = false;

if (isIE) {
    // IE-Specific Constants
    EVENT_OBJECT = "event";
    EVENT_TARGET = "event.srcElement";
    EVENT_CUR_TARGET = "event.srcElement";
    EVENT_TYPE = "event.type";
    EVENT_EXEC_STOPBUBBLE = "event.cancelBubble = true";
    EVENT_EXEC_CANCEL = "event.returnValue = false";
    EVENT_LEFT_BUTTON = 1;
    if(isIE11){
        EVENT_LEFT_BUTTON = 0;
    }
} else {
    // Netscape-Specific Constants
    EVENT_OBJECT = "arguments[0]";
    EVENT_TARGET = "arguments[0].target";
    EVENT_CUR_TARGET = "arguments[0].currentTarget";
    EVENT_TYPE = "arguments[0].type";
    EVENT_EXEC_STOPBUBBLE = "arguments[0].preventBubble(); arguments[0].stopPropagation()";
    EVENT_EXEC_CANCEL = "arguments[0].preventDefault()";
    EVENT_LEFT_BUTTON = 0;
} //End: if (isIE)
attachEventHandler = function (objElement, strEvent, fnHandler) {
    objElement.addEventListener(strEvent, fnHandler, false);
}
detachEventHandler = function (objElement, strEvent, fnHandler) {
    objElement.removeEventListener(strEvent, fnHandler, false);
}
//Array to store last accessed sort direction
var arrSortDir = new Array();
var lSortColumnName = new Array();
var lSortColumnDirection = new Array();
//Array to store filter column names
var filterColumnNames = [];
//XML structure to post to server for updates
var arrObjectId=new Array();
var postDataXML = emxUICore.createXMLDOM();
postDataXML.loadXML("<mxRoot/>");
// Array to store undo value
var arrUndoRows = new Object();
// current selected row
var currentRow = null;
// current selected cell
var currentCell = {
        target:null,
        cellIndex:null,
        tableName:null,
        prvsTableName:null,
        position:null
    };
// current selected column
var currentColumnPosition = null;
var currentFormfield = null;
var currentHiddenFormfield = null;
var currentFloatingDiv = null;
//rightside tableArray
var tableArray = new Array();
var hiddenFrame = null;
var editedCellArray = new Array();
var hasRunMassUpdate = false;
var objApplet = null;
var XMLDOM = null;
var sortColumnName = "";
var sortDirection = "";
var appletReady = false;
var oXML = null;
var oImageXML = null;
var oXSLTable = null;
var oXSLTree = null;
var oXSLTableHeader = null;
var oXSLTreeHeader = null;
var oXSLToolbar = null;
var preFetchPageSize = 50;
var maxFullDrawRows = 250;
var pageFactor = 1, firstRow = 0,pageSize = 0, totalRows = null, windowSize = 0, windowFirstRow = 1,scrollPageSize = 0;
var lastSelection = null;
var lastPreFetchPos = -1;
var lastSelectedradio = null;
var aDisplayRows = null;
var aMassUpdate = new Array();
var preProcessJPO = null;
var preProcessURL = null;
var postProcessJPO = null;
var postProcessURL = null;
var cancelProcessJPO = null;
var cancelProcessURL = null;
var outputFormat = null;
var currrentSelectedColumn = null;
var firstTime = false;
var bExpandOperation = true;
var expandLevel = "1";
var previousExpand = null;
var bFullTextSearch = false;
var scrollbarWidth = 0;
var objFrame = null;
var fullTextSearchObj = null;
if(getTopWindow().FullSearch){ fullTextSearchObj = getTopWindow().FullSearch; } else if(parent.FullSearch) { fullTextSearchObj = parent.FullSearch; };
var typeahedRef;
var normalCheckedCheckbox = null;
var shiftCheckedCheckbox = null;
//For edit Functions
var lastOperation = "";
var cutFlag=0;
var copyFlag = 0;
var resqFlag=0;
var pasteFlag=0;
var afterAutoFilter = false;
var previousFilteredNodesXML = null;
var aPastedRowsChecked = new Array();
var aCopiedRowsChecked = new Array();
var aUndoPasteOrResqRows = new Array();
var hasMergedCells = false;
var iconSortUpArrow = "<img border=\"0\" src='images/utilSortArrowUp.png'/>";
var iconSortDownArrow = "<img border=\"0\" src='images/utilSortArrowDown.png'/>";
var iconFilterApplied = "<img border=\"0\" src='images/iconColHeadFilterApplied.gif'/>";
var splitPos = 1;
var isCellClicked = false;
var configuredTableName = "";
var forTab = null;
var justNavigating = false;
var displayView = "detail";
var curPageCounter = 1; //Used for fill page feature
var spellCheckerURL = "";//spellChecker
var spellCheckerLang = "";//spellChecker
var hasImageorProgramHTML = false;

//End: Global Constants
// Class Definitions
//Class emxEditableTable
function emxEditableTable(){
    // Properties
    this.divPageHead = null;
    this.divListHead = null;
    this.tblListHead = null;
    this.divListBody = null;
    this.tblListBody = null;
    this.divTreeHead = null;
    this.tblTreeHead = null;
    this.divTreeBody = null;
    this.tblTreeBody = null;
    this.divDivider  = null;
    this.divBottom   = null;
    this.mxDivTable = null;
    this.mxDivTree = null;
    this.mxDivGrabberHead = null;
    this.mxDivGrabberBody = null;
    this.mxDivPostData = null;
    this.mxDivFoot = null;
    this.curCol      = null;
    this.curColXML   = null;
    this.colInResize = null;
    this.mouseX      = -1;
    this.mode        = "view";
    this.processing  = false;
    this.divCenterDiv   = null;
    this.divThumbnail   = null;
    this.divTreeGraph   = null;
    this.divTNPageContent   = null;
    this.massUpdate = null;
    this.expandFilter = false;
    this.mx_objectCount = null;
    this.mx_preFetchProgress = null;
    this.mx_resultCount = null;
    this.divTablewidth = "";
    //this.rowhgt =34;
    this.rowhgt =0;
    this.columnwidth = -1;
}
emxEditableTable.drop = function _drop(ev) {
    ev.preventDefault();
    var $fromTarget = jQuery(ev.target),
        data = ev.dataTransfer.getData("text/ds-json"),
        tmpWidgetObj, listOfFields = [],
        key, fnCallback, tmpId, newObj, messagebox,
        offset = $fromTarget.offset();
    data = JSON.parse(data);
    data.widgetName = $fromTarget.attr('data-drop');
    //data.column = colMap.getColumnByIndex($fromTarget.attr('position')-1).name;
    data.dropId = $fromTarget.closest('tr').attr('o');
    console.log(":::drop data:::");
    console.dir(data);

    //require the widget files to upload to service
    // require(["../widget/scripts/bpsWidgetAPIs",
    //     "../widget/scripts/bpsWidgetSave"
    // ],
    //function(bpsWidgetAPIs, bpsWidgetSave) {

    tmpWidgetObj = {
        "name": data.widgetName,
        "datarecords": {
            "name": data.widgetName,
            "csrf": {
                "name": "ENO_CSRF_TOKEN",
                "value": "U9QY-ETL4-SPRW-XCE0-C2ML-WC2R-BCWL-08T6"
            },
            "datagroups": [],
            "widgetType": "datarecords"
        },
        "widgetType": "list"
    };

    for (key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            listOfFields.push({
                name: key,
                value: {
                    disPlayValue: data[key],
                    actualValue: data[key]
                }
            });
        }
    }
    console.log("adding fields to Object");
    tmpId = bpsWidgetAPIs.addObject(tmpWidgetObj, null, listOfFields);
    newObj = bpsWidgetAPIs.getObject(tmpWidgetObj, tmpId);
    fnCallback = function(data) {
        var message = data ? 'Your data has been succesfully updated' : 'Your data failed to update';
        message += (newObj.updateMessage) ? ': ' + newObj.updateMessage : '' ;
        console.log("in service callback");
        console.dir(data);
        console.log("newObj");
        console.dir(newObj);
        messagebox(message, data);
    };
    messagebox = function(msg, bDoRefresh) {
        var $popup = jQuery('<div></div>')
        //.html(JSON.stringify(data))
            .css({
                    'position': 'absolute',
                    '-moz-border-radius': '5px',
                    'border-radius': '5px',
                    'padding': '0 12px',
                    'background-color': '#3A6EBB',
                    'color': 'whitesmoke',
                    'font-weight': 'bold',
                    'line-height': '22px',
                    'width': '300px',
                    'left': offset.left-150,
                    'top': offset.top
        })
        .text(msg)
            .appendTo('body');
        setTimeout(function() {
            $popup.fadeOut();
            setTimeout(function() {
                $popup.remove();
                if (bDoRefresh) {
                    location.href = location.href;
                }
            }, 2000);
        }, 5000);
    };
    //create dummy enoviaServer, constants
    enoviaServer = {
        getUrl: function() {
            return 'https://vdevpril414am.ds:8443/ematrix';
        },
        getParams: function() {
            return "debug=true";
        }
    };
    bpsWidgetConstants = {
        str: {
            NetworkError: "Network error",
            WidgetUpdateError: "WidgetUpdateError"
        }
    };
    console.log("calling service");
    bpsWidgetAPIs.applyUpdates(tmpWidgetObj, fnCallback, false);
    // });

};
emxEditableTable.allowDrop = function _allowDrop(ev) {
    ev.preventDefault();
};

function toggleProgress(visibility){
    var progressDiv,progressLoadingDiv;
    if(frameElement!=null && frameElement!= 'undefined'){
        if(isIE){
            progressDiv = jQuery("#imgProgressDivChannel", frameElement.offsetParent.offsetParent);
            progressLoadingDiv = jQuery("#imgLoadingProgressDiv", frameElement.offsetParent.offsetParent);
        }else{
            progressDiv = jQuery("#imgProgressDivChannel", frameElement.parentNode.parentNode);
	     progressLoadingDiv = jQuery("#imgLoadingProgressDiv", frameElement.parentNode.parentNode);
        }
	}else{
	   progressDiv=jQuery("#imgLoadingProgressDivPortal")
	   progressLoadingDiv=jQuery("#imgProgressDivPortal")
        }
        if(progressDiv.length > 0){
            progressDiv.get(0).style.visibility = visibility;
        }
	if(progressLoadingDiv.length > 0){
		    progressLoadingDiv.get(0).style.visibility = visibility;
    }
}
emxEditableTable.cleanEditableTable = function _cleanEditableTable(){
    var divBody = document.getElementById("mx_divBody");
    if(divBody){
        while (divBody.hasChildNodes())
        {
            divBody.removeChild(divBody.firstChild);
        }

        divBody.innerHTML = "";
        divBody.parentNode.removeChild(divBody);
        divBody = null;
    }

    var divMassUpdate = document.getElementById("divMassUpdate");
    if(divMassUpdate){
        while (divMassUpdate.hasChildNodes())
        {
            divMassUpdate.removeChild(divMassUpdate.firstChild);
        }
        divMassUpdate.innerHTML = "";
        divMassUpdate.parentNode.removeChild(divMassUpdate);
        divMassUpdate = null;
    }

    var divToolbarContainer = document.getElementById("divToolbarContainer");
    if(divToolbarContainer){
        while (divToolbarContainer.hasChildNodes())
        {
            divToolbarContainer.removeChild(divToolbarContainer.firstChild);
        }
        divToolbarContainer.innerHTML = "";
        divToolbarContainer.parentNode.removeChild(divToolbarContainer);
        divToolbarContainer = null;
    }


    var pageHeadDiv = document.getElementById("pageHeadDiv");
    if(pageHeadDiv){
        while (pageHeadDiv.hasChildNodes())
        {
            pageHeadDiv.removeChild(pageHeadDiv.firstChild);
        }
        pageHeadDiv.innerHTML = "";
        pageHeadDiv.parentNode.removeChild(pageHeadDiv);
        pageHeadDiv = null;
    }

    pageHeadDiv = document.getElementById("mx_objectCount");
    if(pageHeadDiv){
        while (pageHeadDiv.hasChildNodes())
        {
            pageHeadDiv.removeChild(pageHeadDiv.firstChild);
        }

        pageHeadDiv.innerHTML = "";
        pageHeadDiv.parentNode.removeChild(pageHeadDiv);
        pageHeadDiv = null;
    }else{
        pageHeadDiv = getTopWindow().document.getElementById("mx_objectCount");
        if(pageHeadDiv){
             pageHeadDiv.innerHTML = "";
        }
    }

    pageHeadDiv = document.getElementById("mx_preFetchProgress");
    if(pageHeadDiv){
        while (pageHeadDiv.hasChildNodes())
        {
            pageHeadDiv.removeChild(pageHeadDiv.firstChild);
        }

        pageHeadDiv.innerHTML = "";
        pageHeadDiv.parentNode.removeChild(pageHeadDiv);
        pageHeadDiv = null;
    }


    pageHeadDiv = document.getElementById("divPostData");
    if(pageHeadDiv){
        while (pageHeadDiv.hasChildNodes())
        {
            pageHeadDiv.removeChild(pageHeadDiv.firstChild);
        }

        pageHeadDiv.innerHTML = "";
        pageHeadDiv.parentNode.removeChild(pageHeadDiv);
        pageHeadDiv = null;
    }



    while (document.body.hasChildNodes())
    {
        document.body.removeChild(document.body.firstChild);
    }



    this.divPageHead = null;
    this.divListHead = null;
    this.tblListHead = null;
    this.divListBody = null;
    this.tblListBody = null;
    this.divTreeHead = null;
    this.tblTreeHead = null;
    this.divTreeBody = null;
    this.tblTreeBody = null;
    this.divDivider  = null;
    this.divBottom   = null;
    this.mxDivTable = null;
    this.mxDivTree = null;
    this.mxDivGrabberHead = null;
    this.mxDivGrabberBody = null;
    this.mxDivPostData = null;
    this.mxDivFoot = null;
    this.curCol      = null;
    this.curColXML   = null;
    this.colInResize = null;
    this.mouseX      = -1;
    this.mode        = "view";
    this.processing  = false;
    this.divCenterDiv   = null;
    this.massUpdate = null;
    this.expandFilter = false;
    this.mx_objectCount = null;
    this.mx_preFetchProgress = null;
    this.mx_resultCount = null;
    getTopWindow().sb = null;
}

emxEditableTable.prototype.loadTextSearchResults = function _loadTextSearchResults(filters,params,clearselections,resetCurrentPage, customTable){
    editableTable.divListBody.scrollTop = 0;
    turnOnProgress();
    resetParameter("filters", encodeURIComponent(filters));
    if(resetCurrentPage == true){
        resetParameter("currentPage", 1);
    }

    this.loadData(params);

    if(fullTextSearchObj) {
        if(!clearselections && fullTextSearchObj.getRememberSelection()) {
            var isrowChecked = false;
            var selrowNodes = emxUICore.selectNodes(fullTextSearchObj.selRowsXML, "/mxRoot/r");
            if(selrowNodes != null){
                isrowChecked = true;
                for (var i = 0;  i < selrowNodes.length; i++) {
                    var oid = selrowNodes[i].getAttribute("o");
                    var selnode = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@o ='" + oid + "']");
                    if(selnode != null) {
                        selnode.setAttribute("checked", "checked");
                    }
                }
            }
        } else {
            fullTextSearchObj.selRowsXML.loadXML("<mxRoot/>");
        }
    }else{
        RefreshTableHeaders();
    }
    rebuildView();
    if(customTable)
    {
      var objectId  = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name = 'objectId']");
      showIcon(timeStamp,"structureBrowser",objectId != null ? emxUICore.getText(objectId) : "");
    }

    var isIndentedView = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='isIndentedView']/text()");
    turnOffProgress();

    var obj = document.getElementById("listHidden");
    if (obj)
    {
        listHidden.document.location.href = "../common/emxMQLNoticeWrapper.jsp";
    }
    if(fullTextSearchObj) {
        fullTextSearchObj.enableFormSearchButton();
    }
    if(fullTextSearchObj && fullTextSearchObj.getTagsMode()=="true"){
        fullTextSearchObj.openTagNavigation(false);
    }
    setTimeout("removeHiddenToolbarItems()", 500);
}

emxEditableTable.prototype.handleDrawTagsFTS = function _handleDrawTagsFTS(searchParameters) {
    var aSBRowNodes = [],
        postData;
    this.aSBRowNodes = jQuery("r[o]", oXML).not("[rg]").not("[calc]");
    jQuery(this.aSBRowNodes).map(function(index) {
        aSBRowNodes[index] = this.getAttribute("o");
    });

    postData= searchParameters;
    if(aSBRowNodes.length > 0) {
       var objTagXml = emxUICore.getXMLDataPost("../resources/bps/sbtagdata/sbtagdatasearch", postData);
        var tagObj = bpsTagNavSBInit.buildJSONTagData(objTagXml, aSBRowNodes);
        return tagObj;
    }
}

emxEditableTable.prototype.loadData = function _loadData(params,objectID) {
    firstRow = 0;
    try{
        toolbarData = getToolbarData(editableTable.expandFilter);
        if(urlParameters.indexOf("amp;") >= 0){
            do {
                urlParameters = urlParameters.replace("amp;", "");
            } while(urlParameters.indexOf("amp;") >= 0);
        }
        try{
        	if(objectID){
				reloadGSB = true;
        		var url2 = urlParameters.substring(urlParameters.indexOf('objectId'));
        		urlParameters = urlParameters.substring(0,urlParameters.indexOf('objectId')) + "objectId="+objectID+ url2.substring(url2.indexOf('&'));
        		onlySBContentRefresh  = objectID;
        	}
        }catch(e){}
        // Get xml data to draw table rows by expanding object id
        oXML = emxUICore.getXMLDataPost("emxFreezePaneGetData.jsp?"
                + "&fpTimeStamp=" + timeStamp
                + "&firstTime=true"
                + "&reset=true", urlParameters + toolbarData + (params ? "&" + params : "") );

        //ElapsedTimer.timeCheck(emxUICore.selectNodes(oXML, "/mxRoot/rows//r").length + " rows")
        checkActionError(oXML);

        clearAndUpdateColMap(oXML);
		if(fullTextSearchObj){
			processRowGroupingToolbarCommand("resetComboMap");
			processRowGroupingToolbarCommand("processInitialGrouping");
		}
        // Select only rows that are able to be displayed
        // The rows which are expanded directly from root node cannot be made hidden --> @level = '0'
        // The rows which doesn't have any parent row unexpanded will be visible --> count(ancestor::r[not(@display) or @display = 'none']) = '0')
        aDisplayRows = getDisplayRows();
        // Count total rows and update XML
        // transformation will use this input for pagination
        totalRows = aDisplayRows.length;
        var nTotalRows = oXML.createElement("setting");
        nTotalRows.setAttribute("name", "total-rows");
        emxUICore.setText(nTotalRows, totalRows);
        oXML.documentElement.appendChild(nTotalRows);

        // First row will be 0 initially, update XML
        // transformation will use this input for pagination
        var nFirstRow = oXML.createElement("setting");
        nFirstRow.setAttribute("name", "first-row");
        emxUICore.setText(nFirstRow, firstRow);
        oXML.documentElement.appendChild(nFirstRow);


        var ntophiddenrowheight = oXML.createElement("setting");
        ntophiddenrowheight.setAttribute("name", "tophiddenHeight");
        emxUICore.setText(ntophiddenrowheight, 0);
        oXML.documentElement.appendChild(ntophiddenrowheight);

        var nbottomhiddenrowheight = oXML.createElement("setting");
        nbottomhiddenrowheight.setAttribute("name", "bottomhiddenHeight");
        emxUICore.setText(nbottomhiddenrowheight, 0);
        oXML.documentElement.appendChild(nbottomhiddenrowheight);
        // page size will be three times window size enough buffer so that scrolling
        // will be smooth
        // transformation will use this input for pagination
        var nPageSize = oXML.createElement("setting");
        nPageSize.setAttribute("name", "page-size");
        emxUICore.setText(nPageSize, scrollPageSize);        
        oXML.documentElement.appendChild(nPageSize);
        var isIndentedView = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='isIndentedView']/text()");
        var nFilteredRows = oXML.createElement("setting");
        nFilteredRows.setAttribute("name", "numberOfObjectsFiltered");
        oXML.documentElement.appendChild(nFilteredRows);
        // Update the oXML with mode information
        // First time Structure loads in the view mode
        var strMode = oXML.createElement("setting");
        strMode.setAttribute("name", "sbMode");
        emxUICore.setText(strMode, editableTable.mode);
        oXML.documentElement.appendChild(strMode);

        var nodeismob = oXML.createElement("setting");
        nodeismob.setAttribute("name", "isMobile");
        if(getTopWindow().isMobile  || getTopWindow().isPCTouch){
            emxUICore.setText(nodeismob, "true");
        }else{
            emxUICore.setText(nodeismob, "false");
        }
        oXML.documentElement.appendChild(nodeismob);

        var isIEValue = isIE ? 'true' : 'false';
        var strIE = oXML.createElement("setting");
        strIE.setAttribute("name", "isIE");
        emxUICore.setText(strIE, isIEValue);
        oXML.documentElement.appendChild(strIE);

        if(objectID){

        	//UKU: apply filter during initial load.
            applyExistingAutoFilterSelections(true);
            //UKU - row grouping initial load.
            processRowGroupingToolbarCommand("processInitialGrouping");

	        var  nNode = emxUICore.selectNodes(oXML, "/mxRoot/columns//column/settings//setting[@name='Input Type']");
	        for(var k=0;k<nNode.length;k++){
	            var nCloneNode = nNode[k].cloneNode(true);
	            nCloneNode.setAttribute("name","Default Input Type");
	            nNode[k].parentNode.appendChild(nCloneNode);
	        }

	        var displayViewSetting = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='displayView']/text()");
	        spellCheckerURL = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='spellCheckerURL']/text()");
	        spellCheckerURL = spellCheckerURL != null ? emxUICore.getText(spellCheckerURL) : "";

	        spellCheckerLang = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='spellCheckerLang']/text()");
	        spellCheckerLang = spellCheckerLang != null ? emxUICore.getText(spellCheckerLang) : "";

	        var strDisplayView = "details";
	        if(displayViewSetting != null) {
	            //FIX for IR-076357V6R2012
	            strDisplayView = displayViewSetting.data;

	            var iIndex = strDisplayView.indexOf(",");
	            if (iIndex != -1) {
	                strDisplayView = strDisplayView.substring(0,iIndex);
	            }
	        }

	        var readCol = emxUICore.selectNodes(oXML, "columns//column/settings//setting[@name='Editable']/text()");
	        for(var m=0; m < readCol.length; m++){
	        	if("true" == readCol[m].nodeValue){
	        		setRequestSetting("AllAreNonEditableCols", "false");
	        		break;
	        	}else{
	        		setRequestSetting("AllAreNonEditableCols", "true");
	        	}
	        }

	        if(strDisplayView){
	            if(strDisplayView == "details") strDisplayView = "detail";
	            if(strDisplayView == "thumbnails") strDisplayView = "thumbnail";
	            if(strDisplayView == "tree"){ strDisplayView = "tree";reloadGSB = true;}
	        } else {
	            strDisplayView = "detail";
	        }
	        bodyClass = document.body.className ? document.body.className : "";

	        var cellWrap = getParameter("cellwrap");

	    	if(emxUIConstants.STORAGE_SUPPORTED){
	    		var tablename = getTableNameFromXML();//getRequestSetting('table');
	    		var storage = $.localStorage;
	    		strDisplayView = storage.isEmpty('SB',tablename, 'displayView') ? strDisplayView : storage.get('SB',tablename, 'displayView');
	    		cellWrap = storage.isEmpty('SB',tablename, 'cellwrap') ? cellWrap : storage.get('SB',tablename, 'cellwrap');
	    	}

			var colorColumn = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='colorize']");
			if (colorColumn) {
				colorColumn = emxUICore.getText(colorColumn);
				var index = colMap.getColumnIndex(colorColumn);
				if (index) {
					bpsSBFilter.applyFacetColors(oXML, index - 1);
				}
			}

	    	if(strDisplayView == "tree"){ reloadGSB = true;}

	        if(strDisplayView != "detail" && totalRows > 0){
	            showDisplayView(strDisplayView);
	        } else {
	            showDisplayView("detail");
	        }

	        if(cellWrap == "true"){
	        	toggleWrapIcon("iconActionWordWrapOn","iconActionWordWrapOff",emxUIConstants.STR_WRAP,emxUIConstants.STR_UNWRAP);
	        }else{
	        	toggleWrapIcon("iconActionWordWrapOff","iconActionWordWrapOn",emxUIConstants.STR_UNWRAP,emxUIConstants.STR_WRAP);
	        }

			//Start:Cross Highlight Changes
			selectHandler = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='selectHandler']/text()");
			selectHandler = selectHandler ? selectHandler.nodeValue : "";
			//End:Cross Highlight Changes


        setTimeout("turnOffProgress()",10);
			if(portalMode == "true"){
				setTimeout("toggleProgress('hidden')", 100);
			}
			if(fullTextSearchObj && fullTextSearchObj.getTagsMode()=="true"){
				var topAccessWin = bpsTagNavConnector.getTNWindow();
				topAccessWin.jQuery(topAccessWin.document).unbind('sb_selection_changed.bps_fts');
				topAccessWin.jQuery(topAccessWin.document).bind('sb_selection_changed.bps_fts',editableTable.handleTagCollectFTS);
			}

		    jQuery(document).bind('SB_SELECTED', function (e, data) {
		        try {
		        	if(getTopWindow().emxUIAutoFilter){
		                getTopWindow().emxUIAutoFilter._syncFilterToSB(e, data);
		                toggleCustTLB();
		        	}
		        } catch (e) {
		            // do nothing
		        }
		    });
		    jQuery('body').click(function () {
		        jQuery(document).trigger('SB_SELECTED', [window]);
		    });

			var afterExpandJS = getParameter("afterExpandJS");
	        if (afterExpandJS && afterExpandJS.length > 0) {
	            eval(afterExpandJS + "('0')");
	            var firstLevelRows = emxUICore.selectNodes(oXML, "/mxRoot/rows/r/r");
	            for(var i = 0; i < firstLevelRows.length; i++) {
					var rowId = firstLevelRows[i].getAttribute("id");
					eval(afterExpandJS + "('" + rowId + "')");
				}
	        }

        	rebuildView();
        	/*$('#emxTableFormSB').attr('style','display:block;');
        	$('#FancyTree-loading').attr('style','display:none;');*/
        }  //JUK_end

        setTimeout("turnOffProgress()",10);

    }
    catch(e){
        alert(e.message);
    }
}

function clearAndUpdateColMap(nXML){
    colMap = new columnMap();
    objCol = null;
    var nColumns = emxUICore.selectNodes(nXML.documentElement,"/mxRoot/columns//column");
    for(var itr = 0; itr < nColumns.length; itr++){
        var nCol = nColumns[itr];
        var colName = nCol.getAttribute("name");
        var colType = nCol.getAttribute("type");
        var colLabel = nCol.getAttribute("label");
        objCol = colMap.addColumn(colName,colType,colLabel);
        var nSettings = emxUICore.selectNodes(nCol,"settings//setting");
        /*adding the setting*/
        for(var i = 0; i < nSettings.length; i++){
            var nSetting = nSettings[i];
            var settingName = nSetting.getAttribute("name");
            var settingValue = emxUICore.getText(nSetting);
            objCol.setSetting(settingName,settingValue);
        }
        /*adding the attributes*/
        var nAttributes = nCol.attributes;
        for(var j = 0; j < nAttributes.length; j++){
            var nAttrib = nAttributes[j];
            var attribName = nAttrib.nodeName;
            var attribValue = nAttrib.nodeValue;
            objCol.setAttribute(attribName,attribValue);
        }
        var nRangeValues = emxUICore.selectNodes(nCol,"RangeValues/setting");
        /*adding the range values*/
        for(var k = 0; k < nRangeValues.length; k++){
            var nRangeVal = nRangeValues[k];
            var rangeValName = nRangeVal.getAttribute("name");
            var rangeValValue = emxUICore.getText(nRangeVal);
            objCol.setRangeValues(rangeValName,rangeValValue);
        }
    }
}

/*
** This function is called on load of the page showing structure browser
** It initializes table variables and draws first page.
*/

emxEditableTable.prototype.init = function __init(){
    var functable = document.getElementById("functionstable");
    parent.ids = parent.ids ? parent.ids : "~";
    var wh = 0;
    firstTime = true;

    if(isIE){
        wh = (parseInt(getWindowHeight()) <= 1)?0:-1;
    }else{
        wh = (parseInt(getWindowHeight()));
    }
    if(wh == 0){
        setTimeout("editableTable.init()",100);
        return;
    }

    // Initialize all the div variables for easy access.
    setInitialHeight();

    //oXML = emxUICore.getXMLData("emxFreezePaneGetData.jsp?requestData=true&fpTimeStamp=" + timeStamp);
    //emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='expandFilter']/text()");
    /*
    Following code reads divtoolbar elements values and appends to strData variable
    which will be passed to emxUIFreezePaneGetData.jsp. This enables to pass expandFilter value to
    UITableIndented.java
    */

    var strData = "";
    var expandFilter = document.getElementById("expandFilter");
    if (expandFilter && expandFilter.value == "true"){
             this.expandFilter = true;
    }
    if(portalMode == "true"){
        if(isIE){
            setTimeout("toggleProgress('visible')",50);
        }else{
            toggleProgress("visible");
        }
    }else{
        turnOnProgress();
    }
    /*
    Following code block checks whether all the toolbars are rendered or not
    start
    */
    var urlParamToolbars = document.getElementById("toolbar");
    var isToolbarLoaded = true;
    var validToolbarName = false;
    if (urlParamToolbars){
        var strToolbars = urlParamToolbars.value;
        var customToolbars = strToolbars.split(",");
        for (itr = 0 ; itr < customToolbars.length ; itr++) {
            var customToolbar = "";
            if (itr == 0) {
                customToolbar = document.getElementById("divToolbar");
                //SLM incident 363603
                validToolbarName=true;
                if (expandFilter) {
                    eleObj = document.getElementById("emxExpandFilter");
                }
            }
            else {
                var strToolbarName1 = customToolbars[itr].replace(/\W/g,"_");
                var strToolbarName2 = getJSVariableName(customToolbars[itr]);

                if (strToolbarName1 == strToolbarName2) {
                    if(isFullSearch == "true"){
                    customToolbar = document.getElementById(customToolbars[itr]);
                    } else{
                        customToolbar = getTopWindow().document.getElementById(customToolbars[itr]);
                    }
                    validToolbarName=true;
                }else{
                    validToolbarName=false;
                }
            }
            // SLM incident 363603
            if(itr==0 || isFullSearch == "true"){
            if(validToolbarName == true && (customToolbar == null || customToolbar.innerHTML == '')) {
                isToolbarLoaded = false;
                break;
            }
        }
    }
    }
    //There is toolbar parameter passed and the toolbar divs are not loaded just recall init method
    if (!isToolbarLoaded && urlParamToolbars != null) {
            setTimeout("editableTable.init()",100);
            return;
        }
    //end

    strData = getToolbarData(editableTable.expandFilter);
    globalStrData=strData;
    addOrHideHeaderItems();

    try{

        // Get display window height
        //windowSize = Math.ceil(editableTable.divListBody.clientHeight / rowHeight);

        // determine page size.
        //pageSize = windowSize * pageFactor + 1;

        // Get table xsl
        //oXSLTable = emxUICore.getXMLData("emxFreezePaneTableFragment.xsl");

        // Get tree xsl
        //oXSLTree = emxUICore.getXMLData("emxFreezePaneTreeFragment.xsl");

         //Modified for scroll performance
         oXSLTable = emxUICore.GetXSLRemote("emxFreezePaneTableFragment.xsl");
         oXSLTree  = emxUICore.GetXSLRemote("emxFreezePaneTreeFragment.xsl");
         oXSLTableHeader  = emxUICore.GetXSLRemote("emxFreezePaneTableHeaderFragment.xsl");
         oXSLTreeHeader  = emxUICore.GetXSLRemote("emxFreezePaneTreeHeaderFragment.xsl");
         oXSLToolbar = emxUICore.GetXSLRemote("emxFreezePaneToolbarFragment.xsl");
         //Transformation.Init(oXSLTable,oXSLTree, oXSLTableHeader, oXSLTreeHeader, oXSLToolbar);

         // Added for State Persistence
        var persist = getParameter("persist");
        if(!persist || persist == ""){
           persist = "false";
        }
        // Get xml data to draw table rows by expanding object id
        var initUrl = "emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp + "&objectId=" + objectId + "&firstTime=" + firstTime + strData +"&IsStructureCompare=" + isStructureCompare;

        var cachedSortCOlumnName = getTopWindow().getPersistenceData("sortColumnName", getParameter("selectedTable"));
        if(cachedSortCOlumnName != null && cachedSortCOlumnName != 'undefined')
        {
        	sortColumnName = cachedSortCOlumnName;
        	sortDirection = getTopWindow().getPersistenceData("sortDirection", getParameter("selectedTable"));
        	initUrl += "&sortColumnName=" + sortColumnName + "&sortDirection=" + sortDirection;
        }

        if(getTopWindow().info && persist == "true"){
        	initUrl += "&persist="+persist;
        	oXML = emxUICore.getXMLDataPost(initUrl);
            mergePersistData();
        }else{
        	oXML = emxUICore.getXMLDataPost(initUrl);
         }

        //ElapsedTimer.timeCheck(emxUICore.selectNodes(oXML, "/mxRoot/rows//r").length + " rows");

        var errorNode = emxUICore.selectSingleNode(oXML, "/mxRoot/error");
        if(errorNode){
            var errorMsg = emxUICore.getText(errorNode);
            if(errorMsg && errorMsg.indexOf("No Content in the timeStamp") != -1){
                return;
            }
        }

        bFullTextSearch = getRequestSetting('fullTextSearch') == 'true';

        //gqh: apply filter during initial load.
        applyExistingAutoFilterSelections(true);
        //gqh - row grouping initial load.
        processRowGroupingToolbarCommand("processInitialGrouping");
        checkActionError(oXML);

        var groupHeader = emxUICore.selectSingleNode(oXML,"//setting[@name='Group Header']/text()");

        // Select only rows that are able to be displayed
        // The rows which are expanded directly from root node cannot be made hidden --> @level = '0'
        // The rows which doesn't have any parent row unexpanded will be visible --> count(ancestor::r[not(@display) or @display = 'none']) = '0')
        aDisplayRows = getDisplayRows();
        // Count total rows and update XML
        // transformation will use this input for pagination
        totalRows = aDisplayRows.length;
        var nTotalRows = oXML.createElement("setting");
        nTotalRows.setAttribute("name", "total-rows");
        emxUICore.setText(nTotalRows, totalRows);
        oXML.documentElement.appendChild(nTotalRows);

        // First row will be 0 initially, update XML
        // transformation will use this input for pagination
        var nFirstRow = oXML.createElement("setting");
        nFirstRow.setAttribute("name", "first-row");
        emxUICore.setText(nFirstRow, firstRow);
        oXML.documentElement.appendChild(nFirstRow);

        // page size will be three times window size enough buffer so that scrolling will be smooth
        // transformation will use this input for pagination
        var nPageSize = oXML.createElement("setting");
        nPageSize.setAttribute("name", "page-size");
        emxUICore.setText(nPageSize, scrollPageSize);        
        oXML.documentElement.appendChild(nPageSize);

        var ntophiddenrowheight = oXML.createElement("setting");
        ntophiddenrowheight.setAttribute("name", "tophiddenHeight");
        emxUICore.setText(ntophiddenrowheight, 0);
        oXML.documentElement.appendChild(ntophiddenrowheight);

        var nodeismob = oXML.createElement("setting");
        nodeismob.setAttribute("name", "isMobile");
        if(getTopWindow().isMobile  || getTopWindow().isPCTouch){
            emxUICore.setText(nodeismob, "true");
        }else{
            emxUICore.setText(nodeismob, "false");
        }
        oXML.documentElement.appendChild(nodeismob);

        var bottomheight = totalRows - firstRow - scrollPageSize;
        if(bottomheight < 0){
            bottomheight = -(bottomheight);
        }
        bottomheight = bottomheight * rowHeight;

        var nbottomhiddenrowheight = oXML.createElement("setting");
        nbottomhiddenrowheight.setAttribute("name", "bottomhiddenHeight");
        emxUICore.setText(nbottomhiddenrowheight, bottomheight);
        oXML.documentElement.appendChild(nbottomhiddenrowheight);

        var isIndentedView = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='isIndentedView']/text()");
        var nFilteredRows = oXML.createElement("setting");
        nFilteredRows.setAttribute("name", "numberOfObjectsFiltered");
        oXML.documentElement.appendChild(nFilteredRows);

        // Update the oXML with mode information
        // First time Structure loads in the view mode
        var strMode = oXML.createElement("setting");
        strMode.setAttribute("name", "sbMode");
        emxUICore.setText(strMode, editableTable.mode);
        oXML.documentElement.appendChild(strMode);

        var isIEValue = isIE ? 'true' : 'false';
        var strIE = oXML.createElement("setting");
        strIE.setAttribute("name", "isIE");
        emxUICore.setText(strIE, isIEValue);
        oXML.documentElement.appendChild(strIE);

        var  nNode = emxUICore.selectNodes(oXML, "/mxRoot/columns//column/settings//setting[@name='Input Type']");
        for(var k=0;k<nNode.length;k++){
            var nCloneNode = nNode[k].cloneNode(true);
            nCloneNode.setAttribute("name","Default Input Type");
            nNode[k].parentNode.appendChild(nCloneNode);
        }

        var displayViewSetting = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='displayView']/text()");
        spellCheckerURL = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='spellCheckerURL']/text()");
        spellCheckerURL = spellCheckerURL != null ? emxUICore.getText(spellCheckerURL) : "";

        spellCheckerLang = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='spellCheckerLang']/text()");
        spellCheckerLang = spellCheckerLang != null ? emxUICore.getText(spellCheckerLang) : "";

        var strDisplayView = "details";
        if(displayViewSetting != null) {
            //FIX for IR-076357V6R2012
            strDisplayView = displayViewSetting.data;

            var iIndex = strDisplayView.indexOf(",");
            if (iIndex != -1) {
                strDisplayView = strDisplayView.substring(0,iIndex);
            }
        }

        var readCol = emxUICore.selectNodes(oXML, "columns//column/settings//setting[@name='Editable']/text()");
        for(var m=0; m < readCol.length; m++){
            if("true" == readCol[m].nodeValue){
                setRequestSetting("AllAreNonEditableCols", "false");
                break;
            }else{
                setRequestSetting("AllAreNonEditableCols", "true");
            }
        }

        if(strDisplayView){
            if(strDisplayView == "details") strDisplayView = "detail";
            if(strDisplayView == "thumbnails") strDisplayView = "thumbnail";
            if(strDisplayView == "tree") strDisplayView = "tree";
        } else {
            strDisplayView = "detail";
        }
        bodyClass = document.body.className ? document.body.className : "";

        var cellWrap = getParameter("cellwrap");

        if(emxUIConstants.STORAGE_SUPPORTED){
            var tablename = getTableNameFromXML();//getRequestSetting('table');
            var storage = $.localStorage;
            strDisplayView = storage.isEmpty('SB',tablename, 'displayView') ? strDisplayView : storage.get('SB',tablename, 'displayView');
            cellWrap = storage.isEmpty('SB',tablename, 'cellwrap') ? cellWrap : storage.get('SB',tablename, 'cellwrap');
        }

        if(strDisplayView != "detail" && totalRows > 0){
            showDisplayView(strDisplayView);
        } else {
            showDisplayView("detail");
        }

        if(cellWrap == "true"){
			cellWrapVal = true;
            toggleWrapIcon("iconActionWordWrapOn","iconActionWordWrapOff",emxUIConstants.STR_WRAP,emxUIConstants.STR_UNWRAP);
        }else{
			cellWrapVal = false;
            toggleWrapIcon("iconActionWordWrapOff","iconActionWordWrapOn",emxUIConstants.STR_UNWRAP,emxUIConstants.STR_WRAP);
        }

        //Start:Cross Highlight Changes
        selectHandler = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='selectHandler']/text()");
        selectHandler = selectHandler ? selectHandler.nodeValue : "";
        //End:Cross Highlight Changes
    }catch(objError){
        alert(emxUIConstants.STR_JS_Init + " " + objError.message)
           //IR-058044V6R2011x
        if(fullTextSearchObj) {
            fullTextSearchObj.enableFormSearchButton();
            fullTextSearchObj.splashFrame.style.display="block";
            fullTextSearchObj.results.style.display="none";
           }

    }

    setTimeout("turnOffProgress()", 10);
    if(portalMode == "true"){
        setTimeout("toggleProgress('hidden')", 100);
    }
    if(fullTextSearchObj && fullTextSearchObj.getTagsMode()=="true"){
        var topAccessWin = bpsTagNavConnector.getTNWindow();
        topAccessWin.jQuery(topAccessWin.document).unbind('sb_selection_changed.bps_fts');
        topAccessWin.jQuery(topAccessWin.document).bind('sb_selection_changed.bps_fts',editableTable.handleTagCollectFTS);
    }

    jQuery(document).bind('SB_SELECTED', function (e, data) {
        try {
            if(getTopWindow().emxUIAutoFilter){
                getTopWindow().emxUIAutoFilter._syncFilterToSB(e, data);
                toggleCustTLB();
            }
        } catch (e) {
            // do nothing
        }
    });
    jQuery('body').click(function () {
        jQuery(document).trigger('SB_SELECTED', [window]);
    });

    if(!editableTable.socket){
    	editableTable.socket = new UWA.Utils.InterCom.Socket();
    }

    editableTable.socket.subscribeServer('enovia.bus.server', getTopWindow());
    editableTable.socket.addListener('objectChanged', function (data) {
    	var oid = data.oid;
    	if(!oid){
    		return;
    	}
    	var nRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@o='" + oid + "']");
    	emxEditableTable.refreshRowByRowId(jQuery.map(nRows, function(row){
    		return row.getAttribute("id");
    	}));
    });
	if(Browser.CHROME)
	{
		//freeze colorization column
	    jQuery(editableTable.divTreeBody).on("scroll", function(event){
	    	jQuery('td[position="-1"]', "#treeBodyTable").css("left", editableTable.divTreeBody.scrollLeft);
	    	jQuery('td[position="-1"], th[position="-1"]', "#treeHeadTable").css("left", editableTable.divTreeBody.scrollLeft);
	    });
	}
	enableScrollOnDrop([editableTable.divTreeBody, editableTable.divListBody]);

	fastloadinIE = emxUIConstants.fastloadSBinIE;
	var isfastloadinIE = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='fastloadinIE']/text()");
	if(isfastloadinIE)
	{
		if(isfastloadinIE.nodeValue == 'true') {
			fastloadinIE = true;
		} else {
			fastloadinIE = false;
		}
	}

	var defaultRowHgt = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='defaultRowHeight']/text()");
	if(defaultRowHgt)
	{
		this.rowhgt = new Number(defaultRowHgt.nodeValue);
	}

};

function isTrue(val) {
    return String(val).toLowerCase() == 'true';
}

function _getSetting(xml, basePath, name) {
    var nSetting = emxUICore.selectSingleNode(xml, basePath + "/setting[@name = '" + name + "']");
    if (!nSetting) {
        return null;
    } else {
        return emxUICore.getText(nSetting);
    }
}

function _setSetting(xml, basePath, name, value) {
    var nBase = emxUICore.selectSingleNode(xml, basePath);

    var nSetting = emxUICore.selectSingleNode(nBase, "setting[@name = '" + name + "']");
    if (!nSetting) {
        nSetting = xml.createElement("setting");
        nSetting.setAttribute("name", name);
        emxUICore.setText(nSetting, value);
        nBase.appendChild(nSetting)
        return null;
    } else {
        var old= emxUICore.getText(nSetting);
        emxUICore.setText(nSetting,value);
        return old;
    }
}

function getRequestSetting(name) {
    return _getSetting(oXML, "/mxRoot/requestMap", name);
}

function setRequestSetting(name, value) {
    return _setSetting(oXML, "/mxRoot/requestMap", name, value);
}

function getGlobalSetting(name) {
    return _getSetting(oXML, "/mxRoot", name);
}

function setGlobalSetting(name, value){
    return _setSetting(oXML, "/mxRoot", name, value);
}

function checkActionError(oXML){
    var action = emxUICore.selectSingleNode(oXML, "/mxRoot/action/text()");
    if (action) {
        if (action.nodeValue == "error") {
            var message = emxUICore.selectSingleNode(oXML, "/mxRoot/message/text()").nodeValue;
            emxUICore.throwError(emxUIConstants.STR_JS_FromServer + " " + message);
        } else if (action.nodeValue == "logout") {
            doLogout();
        }
    }
}

function doLogout(){
    if (window.getWindowOpener()) {
        window.getWindowOpener().location.reload(); // closes all windows and goes to emxLogin.jsp
    } else {
        try {
            closeAllChildWindows();
            window.closeWindow();
        } catch (e) {
        }
    }
}

function calcMaxFullDrawRows() {
    var numCols = emxUICore.selectNodes(oXML, "/mxRoot/columns/column").length;
    //Even limit of 10000 can be taken since IE's  rendering is fast
    //var maxFullDrawCells = isIE ? 5000 : 5000;
    //maxFullDrawRows = maxFullDrawCells / numCols;
    maxFullDrawRows = getMaxCellsToDraw() / numCols;
	if(numCols <= 3 && maxFullDrawRows > 200){
		maxFullDrawRows = 200;
	}
}


function getPageSize(){
	var actualPageSize = pageSize;		
	if(gblScrollPageSize != "clientDefault" && !isNaN(gblScrollPageSize * 1) ){
		actualPageSize = gblScrollPageSize;
	}	
console.log("gblScrollPageSize="+gblScrollPageSize);
console.log("actualPageSize="+actualPageSize);
console.log("pageSize="+pageSize);

	return (actualPageSize * 1);
}

function getMaxCellsToDraw(){
	var maxCellsToDraw = 5000;		
	if(gblMaxCellsToDraw != "clientDefault" && !isNaN(gblMaxCellsToDraw * 1) ){
		maxCellsToDraw = gblMaxCellsToDraw;
	}	
console.log("gblMaxCellsToDraw="+gblMaxCellsToDraw);
console.log("maxCellsToDraw="+maxCellsToDraw);
	return (maxCellsToDraw*1);
}

function updateDrawnRowNumbers(firstRow){
	previousLastRowDrawn = firstRow + scrollPageSize - 1;
	previousFirstRowDrawn = firstRow;
}

function setFilterIconStatus(){
    var isFiltered,hasUserFiltered; 
    if(sbPage){
		isFiltered	= jQuery('setting[name="isFiltered"]', sbPage.oXML);
		hasUserFiltered	 = jQuery('column[userfiltered = "true"]', sbPage.oXML);
	} else {
		isFiltered = jQuery('setting[name="isFiltered"]', getTopWindow().sb.oXML);
		hasUserFiltered = jQuery('column[userfiltered = "true"]', getTopWindow().sb.oXML);
	}
    if(hasUserFiltered.length >0 || isFiltered.length > 0){
        jQuery("img[src='../common/images/iconActionFilter.png']").attr("src", "../common/images/iconActionFiltersApplied.png");
    }else{
        jQuery("img[src='../common/images/iconActionFiltersApplied.png']").attr("src", "../common/images/iconActionFilter.png");
    }
}

function insertSortArrows(){

    clearAllSortArrows();

    getSortDirection();

    for(var sl = 0; sl < lSortColumnName.length; sl++){
        if(lSortColumnName[sl] && lSortColumnName[sl] != 'undefined') {
            var id = lSortColumnName[sl] + '_sort';
            var elem = document.getElementById(id);
            if(lSortColumnDirection[sl] != null && typeof lSortColumnDirection[sl] != 'undefined'){
                if(elem){
                    if(lSortColumnDirection[sl]== "ascending"){
                        elem.className="sort-ascend status";
                    }else{
                        elem.className="sort-descend status";
                    }
                }
            }
        }
    }

    setFilterIconStatus();
}

function clearAllSortArrows(){
    for(var colM = 0; colM < colMap.columns.length; colM++){
        var columnName = colMap.columns[colM].name;
        if(columnName){
            var elem = document.getElementById(columnName+"_sort");
            if(elem){
             elem.className = "";
             }
        }
    }
}

function getSortDirection(){
    var sortDirection = new Array();
    var sortNamesLength = lSortColumnName.length;

    if(sortNamesLength == 1){
        var dir0 = "ascending";
        if(lSortColumnDirection[0] != null && typeof lSortColumnDirection[0] != 'undefined'){
            dir0 = lSortColumnDirection[0] == "descending" ? "descending" : "ascending";
        }
        sortDirection.push(dir0);
    }

    if(sortNamesLength == 2){
        var dir0 = "ascending";
        if(lSortColumnDirection[0] != null && typeof lSortColumnDirection[0] != 'undefined'){
            dir0 = lSortColumnDirection[0] == "descending" ? "descending" : "ascending";
        }
        sortDirection.push(dir0);

        var dir1 = dir0;
        if(lSortColumnDirection[1] != null && typeof lSortColumnDirection[1] != 'undefined'){
            dir1 = lSortColumnDirection[1] == "descending" ? "descending" : "ascending";
        }
        sortDirection.push(dir1);
    }

    if(sortNamesLength == 3){
        var dir0 = "ascending";
        if(lSortColumnDirection[0] != null && typeof lSortColumnDirection[0] != 'undefined'){
            dir0 = lSortColumnDirection[0] == "descending" ? "descending" : "ascending";
        }
        sortDirection.push(dir0);

        var dir1 = dir0;
        if(lSortColumnDirection[1] != null && typeof lSortColumnDirection[1] != 'undefined'){
            dir1 = lSortColumnDirection[1] == "descending" ? "descending" : "ascending";
        }
        sortDirection.push(dir1);

        var dir2 = null;
        if(lSortColumnDirection[2] != null && typeof lSortColumnDirection[2] != 'undefined'){
            dir2 = lSortColumnDirection[2] == "ascending" ? "ascending" : "descending";
        }else{
            dir2 = dir0 == dir1 ? dir0 : "ascending";
        }
        sortDirection.push(dir2);
    }
    lSortColumnDirection = sortDirection;
}

function clearAllFilterIcons(){
    for(var colM = 0; colM < colMap.columns.length; colM++){
        var columnName = colMap.columns[colM].name;
        if(columnName){
            var elem = document.getElementById(columnName+"_filter");
            if(elem){
                elem.className="";
            }
        }
    }
}

function insertFilterIcons(){

    clearAllFilterIcons();

    if (filterColumnNames) {
            for(var colM = 0; colM < colMap.columns.length; colM++){
            var columnName = colMap.columns[colM].name;
            if(columnName){
                for (var i = 0; i < filterColumnNames.length; i++) {
                    if(filterColumnNames[i] == columnName) {
                        var elem = document.getElementById(columnName+"_filter");
                        if(elem){
                            elem.className="filtered status";
                            break;
                        }
                    }
                }
            }
        }
            FreezePaneUtils.adjustTreeColumns();
            FreezePaneUtils.adjustTableColumns();
    }
}

/*
Function removes all the hidden elements that exists on the form for each of the toolbar command items
*/
function removeHiddenToolbarItems()
{
    var toolbars = document.getElementById("toolbar");
    if (!toolbars)
    {
        return;
    }
    var strToolbars = toolbars.value;
    var customToolbars = strToolbars.split(",");
    var dataPstdiv = editableTable.mxDivPostData;

    for (var itr = 0; itr < customToolbars.length ; itr++) {
        var customToolbar = "";
        if (itr == 0) {
            customToolbar = document.getElementById("divToolbar"); // div for the default toolbar
        }else{
             var strToolbarName1 = customToolbars[itr].replace(/\W/g,"_");
             var strToolbarName2= getJSVariableName(customToolbars[itr]);
                if (strToolbarName1 == strToolbarName2)
                {
                if(isFullSearch == "true"){
            customToolbar = document.getElementById(customToolbars[itr]); //div for the custom toolbars
                }else{
                    customToolbar = getTopWindow().document.getElementById(customToolbars[itr]); //div for the custom toolbars
                }
            }else{
                    continue;
                }
        }
        if(customToolbar){
        var custinputelements = customToolbar.getElementsByTagName("input"); //get the textboxes and buttons on the toolbar
        for (var itr1 = 0; itr1 < custinputelements.length; itr1++) {
            var hiddenElements=dataPstdiv.getElementsByTagName("input");

            for (var itr2=0;itr2 < hiddenElements.length;itr2++ ) {
                if (hiddenElements[itr2].name==custinputelements[itr1].name) {
                        dataPstdiv.removeChild(hiddenElements[itr2]);//// remove the hidden element from div named divPostDat
                        break;
                }
            }
        }
        var custinputelements = customToolbar.getElementsByTagName("select"); //get the comboboxes on the toolbar

        for (var itr1 = 0; itr1 < custinputelements.length; itr1++) {
            var hiddenElements=dataPstdiv.getElementsByTagName("input");

            for (var itr2=0;itr2 <hiddenElements.length;itr2++ ) {
                if (hiddenElements[itr2].name==custinputelements[itr1].name) {
                        dataPstdiv.removeChild(hiddenElements[itr2]); // remove the hidden element from div named divPostDat
                        break;
                }
            }
        }
    }
}
}

    function getToolbarData(expand, connector) {
        var data = "";
        var strData = "";
        var eleObj = "";
        var defConnector = "|";
        if((typeof connector != 'undefined') && (connector.length != 0)){
            defConnector = connector;
        }
           var toolbars = document.getElementById("toolbar");

        if (toolbars == null) { // If no toolbar is passed as URL Parameter
            if (expand) {
                eleObj = getExpandFilterSelect();
                if(!eleObj) {
                    setTimeout(function(){ getToolbarData(expand) },10);
                }
                else {
                    strData = "&toolbarData=expandLevel=" + eleObj.value;
                    strData += "|emxExpandFilter=" + eleObj.value;
                }
            }
            return strData;
        }

           var strToolbars = toolbars.value;
           var customToolbars = strToolbars.split(",");

        // Fetch the data on the toolbars.
        for (var itr = 0; itr < customToolbars.length ; itr++) {
        var customToolbar = "";

        if (itr == 0) {
            customToolbar = document.getElementById("divToolbar"); // div for the default toolbar
        }
        else {
             var strToolbarName1 = customToolbars[itr].replace(/\W/g,"_");
             var strToolbarName2= getJSVariableName(customToolbars[itr]);
                if (strToolbarName1 == strToolbarName2) {
                    if(isFullSearch == "true"){
                    customToolbar = document.getElementById(customToolbars[itr]); //div for the custom toolbars
                }else{
                        customToolbar = getTopWindow().document.getElementById(customToolbars[itr]); //div for the custom toolbars
                    }
                }else{
                    continue;
                }
        }

        if (expand && itr == 0) {
            var eleObj = getExpandFilterSelect();
            if(urlParameters.indexOf("expandLevel=") > -1 ){
                var expLevel = urlParameters.indexOf("expandLevel=");
                var custexpandURL = urlParameters.substring(expLevel);
                if(urlParameters.indexOf("&", expLevel+1) > -1){
                   custexpandURL = urlParameters.substring(expLevel, urlParameters.indexOf("&", expLevel+1));
                  }
                expandLevel = custexpandURL.substring(custexpandURL.lastIndexOf("=")+1);
                eleObj.value = expandLevel;
             }
            if(!applyCheck){
                 if((!(urlParameters.indexOf("expandLevel=") > -1)) && eleObj[0] ){
                    eleObj.value = eleObj[0].value;
                }
            }
            strData = "&toolbarData=expandLevel=" + eleObj.value;
            strData += "|emxExpandFilter=" + eleObj.value;
        }
        if (customToolbar) {
        var custinputelements = customToolbar.getElementsByTagName("input"); //get the textboxes and buttons on the toolbar
                    for (var itr1 = 0; itr1 < custinputelements.length; itr1++) {
                        if(custinputelements[itr1].type == 'button' || custinputelements[itr1].className == 'form-control') {
                            continue;
                        }
                        if (data == "") {
                            data = custinputelements[itr1].name + "=" + encodeURIComponent(custinputelements[itr1].value);
                        }
                        else {
                            data += defConnector+ custinputelements[itr1].name + "=" + encodeURIComponent(custinputelements[itr1].value);
                        }
                    }
        custinputelements = customToolbar.getElementsByTagName("select"); // get the combobox on the toolbar
                    for (var itr2 = 0; itr2 < custinputelements.length; itr2++) {
                        if (data != "") {
                            data += defConnector+ custinputelements[itr2].name + "=" + encodeURIComponent(custinputelements[itr2].value);
                        }
                        else {
                            data = custinputelements[itr2].name + "=" + encodeURIComponent(custinputelements[itr2].value);
                        }
                    }
                }
        }
        if (strData !="" && data != "") {
            strData += defConnector+data;
        }
        else if(strData == "") {
            strData = "&toolbarData="+data;
        }

        return strData;
    }

    function  getJSVariableName(toolbarName)
    {
        var strToolbar = toolbarName;
        var iIndex = toolbarName.indexOf("/");
        if (iIndex != -1) {
            strToolbar = toolbarName.substring(iIndex + 1);
        }
        strToolbar.replace(/\s|-/g, "_");
        return strToolbar;
    }


    function initExpand( expandByDefault) {
    //Do not expand nodes when persist is true
        var persist = getParameter("persist");
        if(persist == "true"){
            return;
        }
           // modified  for Structure Compare with SYNC
        if (expandByDefault && (editableTable.expandFilter  || (isStructureCompare == "TRUE"))){
            /*
             If user selects the expand level from the expand filter and selects Refresh button, the page will get refreshed.
             In this case expand level will be the level value that user selected.
            */
            if(isStructureCompare == "TRUE"){
                expandLevel = structureCompareLevel;
            }else{
                var selectedLevel = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='previousExpandLevel']/text()");
                if (selectedLevel && selectedLevel.nodeValue != "Specify") {
                    expandLevel = selectedLevel.nodeValue;
                    updateExpandFilter(expandLevel);
                }else{
                    var expandObject = document.getElementById("emxExpandFilter");
                    if (expandObject) {
                        expandLevel = expandObject.value;
                        if (expandLevel == "") {
                            expandLevel = "1";
                        }
                    }
                }
            }

            if (!allLevelCheck(true)) {
                //this is moved from showDetailsView.
                RefreshView(true);
                return;
            }

            var nRows = emxUICore.selectNodes(oXML, "/mxRoot/rows/r");

            //For loop is required for multiple root object
            for (var itr = 0; itr < nRows.length; itr++){
                nRows[itr].setAttribute("expandedLevels", expandLevel);
            }
            var nRowsTotal = emxUICore.selectNodes(oXML, "/mxRoot/rows//r");
        }

               callToBuildColumValues("firstTime",true);
            rebuildView();

if(fullTextSearchObj) {
            if( fullTextSearchObj.getTagsMode()!="true" ){
            fullTextSearchObj.enableFormSearchButton();
            fullTextSearchObj.loadNavigationContent();
            }else{
                fullTextSearchObj.loadTaxonomies();
            }
        }

        addHiddenTreeVScrollBar();
    }

var levelids = new Array();
var levelsExpanded = 1;
function getXMLRows(timeStamp1, whereExp, expandLevelId)
{
    if (!allLevelCheck(false)){
        finishLongOperation();
        return oXML;
    }

    var strURL = "";
    if (!bExpandOperation)
    {
        return;
    }
    var xPath = "";

    if (expandLevelId)
    {
        xPath = "//r[@id = '" + expandLevelId + "']";
        levelids.push(expandLevelId);
    }
    else
    {
        for (var xpathItr = 0; xpathItr < levelsExpanded + 1; xpathItr++)
        {
            xPath = xPath + "/r"
        }
        //var nRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@id = '0']");
        var nRows = emxUICore.selectNodes(oXML, "/mxRoot/rows/" + xPath);
        if (nRows.length == 0) {
             nRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r");
        }
        if (nRows != null) {
            for (var itr = 0; itr < nRows.length; itr++) {
                arguments[0] = nRows[itr].getAttribute("id");
                levelids.push(arguments[0]);
            }
        }
    }
    bExpandOperation = true;
    whereExp = "&fpTimeStamp=" + timeStamp + "&IsStructureCompare="+isStructureCompare + whereExp;
    expandObjects("emxFreezePaneGetData.jsp", whereExp);
}

/*
 ** Disable expand Menus
 */
function disableExpandMenus(){
    var index = 0, len = objMainToolbar.items.length;
    for(index; index < len; index++){
        if(objMainToolbar.items[index].url == "javascript:expandAll()" || objMainToolbar.items[index].icon == "../common/images/iconActionSetNodeExpansionLevel.png"){
            objMainToolbar.items[index].disable();
            objMainToolbar.items[index].listLink = true;
        }
    }
}

function disableExpandAllMenus(){
    var index = 0, len = objMainToolbar.items.length;
    for(index; index < len; index++){
        if(objMainToolbar.items[index].url == "javascript:expandAll()" || objMainToolbar.items[index].icon == "../common/images/iconActionSetNodeExpansionLevel.png"){
            objMainToolbar.items[index].disable();
            objMainToolbar.items[index].listLink = false;
        }
    }
}

function enableExpandMenus(){
    var index = 0, len = objMainToolbar.items.length;
    for(index; index < len; index++){
        if(objMainToolbar.items[index].url == "javascript:expandAll()" || objMainToolbar.items[index].icon == "../common/images/iconActionSetNodeExpansionLevel.png"){
            objMainToolbar.items[index].enable();
            objMainToolbar.items[index].listLink = false;
        }
    }
}
/*
 * Filters root nodes of a structure browser
 * @param filteredNodes
 */
function filterNodes(filteredNodes, lXML){
    try{
    lXML = lXML || oXML;
    afterAutoFilter = true;
    var setDisplayNone = true;
    var noObjectsFiltered = 0;
    var allRootNodes = null;
    var filteredNodesXML = null;
    var isIndentedView = emxUICore.selectSingleNode(lXML,"//requestMap/setting[@name='isIndentedView']/text()");
    if(typeof filteredNodes!="undefined" && filteredNodes != null)
    {
        filteredNodesXML = emxUICore.createXMLDOM();
        filteredNodesXML.loadXML("<mxFiltered>" + filteredNodes + "</mxFiltered>");
    }else
    {
        filteredNodesXML = previousFilteredNodesXML;
        setDisplayNone = false;
    }
    if(isIndentedView && isIndentedView.nodeValue == 'true')
    {
        allRootNodes = emxUICore.selectNodes(lXML, "/mxRoot/rows//r[@level = '0']");
    }else
    {
        allRootNodes = emxUICore.selectNodes(lXML, "/mxRoot/rows//r");
    }
    if(filteredNodesXML!=null && allRootNodes!=null){
        var filteredRootNodes = emxUICore.selectNodes(filteredNodesXML, "/mxFiltered/row");
        for(var i=0; i<allRootNodes.length; i++)
        {
            var filterRootNode = false;
            for(var j=0; j<filteredRootNodes.length; j++)
            {
                if(allRootNodes[i].getAttribute("o") == filteredRootNodes[j].getAttribute("id"))
                {
                    var isRelIDDefined = (filteredRootNodes[j].getAttribute("relId") == null ) ? false : true;
                    if((isRelIDDefined && (allRootNodes[i].getAttribute("r") == filteredRootNodes[j].getAttribute("relId")))
                        || (!isRelIDDefined)){
                        filterRootNode = true;
                        break;
                    }

                }
            }
            if(filterRootNode == true)
            {
                noObjectsFiltered++;
                allRootNodes[i].setAttribute('filter','false');
                if(setDisplayNone == true)
                {
                    allRootNodes[i].setAttribute('display','none');
                }
            }else
            {
                //filtered out
                allRootNodes[i].setAttribute('filter','true');
                if(setDisplayNone == true)
                {
                    allRootNodes[i].setAttribute('display','none');
                }
            }
        }
    }
    var nFilteredRootNodes = emxUICore.selectSingleNode(lXML, "/mxRoot/setting[@name = 'numberOfObjectsFiltered']");
    emxUICore.setText(nFilteredRootNodes, noObjectsFiltered);
    previousFilteredNodesXML = filteredNodesXML;

    //gqh - row grouping post filter.
    processRowGroupingToolbarCommand();

    rebuildView();
    }catch(objError){
        alert(emxUIConstants.STR_JS_FilteredNodes + " " + objError.message)
    }
}
/*
 * Shows all root nodes of a structure browser
 * @param setDisplayNone
 */
function showAllRootNodes(setDisplayNone,lXML){
    try{
        lXML = lXML || oXML;
        afterAutoFilter = true;
        var allRootNodes = null;
        var isIndentedView = emxUICore.selectSingleNode(lXML,"//requestMap/setting[@name='isIndentedView']/text()");
        if(isIndentedView && isIndentedView.nodeValue == 'true')
        {
            allRootNodes = emxUICore.selectNodes(lXML, "/mxRoot/rows//r[@level = '0']");
        }else
        {
            allRootNodes = emxUICore.selectNodes(lXML, "/mxRoot/rows//r");
        }
        for(var index=0; index<allRootNodes.length; index++)
        {
            allRootNodes[index].setAttribute('filter','false');
            if(setDisplayNone){
                allRootNodes[index].setAttribute('display','none');
            }
        }
        var nFilteredRootNodes = emxUICore.selectSingleNode(lXML, "/mxRoot/setting[@name = 'numberOfObjectsFiltered']");
        emxUICore.setText(nFilteredRootNodes, allRootNodes.length.toString());
        previousFilteredNodesXML = null;
        //gqh - post filter all records.
        processRowGroupingToolbarCommand();
        rebuildView();
    }catch(objError){
        alert(emxUIConstants.STR_JS_ShowAllRootNodes + " " + objError.message)
    }
}

var _currentSlideInId = new Date().getTime();

/**
 * calls emxFreezePaneAutoFilterController.jsp
 * @param autoFilterDisplayURL
 */
function doAttachDitachCustTLB(){
    var divSlideIn = jQuery('div#leftSlideIn', getTopWindow().document);

    var customToolbars = (getTopWindow().hiddenCustToolbars == undefined) ? [] :  getTopWindow().hiddenCustToolbars;
    for(toolbarIdx=0; toolbarIdx < customToolbars.length; toolbarIdx++){
        divSlideIn.append(customToolbars.get(toolbarIdx));
    }

    var allCustomFilters = jQuery('div[name=custTLB]', divSlideIn);
    for(var i=0; i<allCustomFilters.length; i++){
        allCustomFilters[i].setAttribute('style','display: none');
    }

    var toolbarsSetting = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name = 'toolbar']");
    var allToolbars = isIE ? toolbarsSetting.text : toolbarsSetting.textContent;
    allToolbars = allToolbars.split(",");
    var divId = "";
    for(i=0; i<allToolbars.length; i++){
        if(i == 1){
            divId = allToolbars[i];
        }else if(i != 0){
            divId += "|" + allToolbars[i];
        }
    }

    var expr = "div[id=" + "\"" + divId + "\"" + "].facet.form";
    var customToolbar = jQuery(expr, divSlideIn);
    customToolbar.css('display','block');

    jQuery('div#FilterBody', divSlideIn).prepend(customToolbar);
}

function toggleCustTLB(){
    var leftSlideIn = jQuery('div#leftSlideIn', getTopWindow().document);
    var filterBody = jQuery('div#FilterBody', leftSlideIn);
    var toHideCustTLB = jQuery('div[name=custTLB]', filterBody);
    toHideCustTLB.hide();
    leftSlideIn.append(toHideCustTLB);

    var toolbarsSetting = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name = 'toolbar']");
    var allToolbars = isIE ? toolbarsSetting.text : toolbarsSetting.textContent;
    allToolbars = allToolbars.split(",");
    var toShowCustTLBId = "";
    for(i=0; i<allToolbars.length; i++){
        if(i == 1){
            toShowCustTLBId = allToolbars[i];
        }else if(i != 0){
            toShowCustTLBId += "|" + allToolbars[i];
        }
    }

    var expr = "div[id=" + "\"" + toShowCustTLBId + "\"" + "].facet.form";
    var customToolbar = jQuery(expr, leftSlideIn);
    customToolbar.css('display','block');

    jQuery('div#FilterBody', leftSlideIn).prepend(customToolbar);
}

function showAutoFilterDisplay(autoFilterDisplayURL){
    clearAllCheckedItems();
    if(isDataModified())
    {
        if(!confirm(emxUIConstants.STR_PENDING_EDITS_MESSAGE))
        {
            return;
        }
        resetEdits();
    }
    if (!useAutoFilterSlideIn)
    {
        showModalDialog(autoFilterDisplayURL,"750","600",true);
    } else {
        var ts = new Date().getTime();//prevent caching of filter page in IE
        _currentSlideInId = ts;
        getTopWindow().sb = this;
        //if the compass is on then "transform" string will be assigned to CX.
        //this can be seen in emxUIConstantsJavascriptInclude.jsp line 768
        //if compass is not on then we display the refinements in a popup
        if (bFullTextSearch || typeof getTopWindow().showSlideInDialog == 'undefined'){
            showModalDialog('emxAutoFilterPopup.jsp?no-cache='+ts, '750','600',true);
        } else {
            var autoFilterSlideIn = jQuery('div#leftSlideIn', getTopWindow().document);
            getTopWindow().hiddenCustToolbars = jQuery('div[name=custTLB]', autoFilterSlideIn);

            getTopWindow().showSlideInDialog.mode = "refinements";
            getTopWindow().showSlideInDialog('../common/emxAutoFilter.html?sector=play&no-cache='+ts, null, null, "left", 325);
        }
    }
}

function applyExistingAutoFilterSelections(forceRefresh)
{
    var oTop = bpsTagNavConnector.getTNWindow();
    //we need to determine if we are filtering in refinement or tag navigator
    //if (oTop && oTop.showSlideInDialog && oTop.showSlideInDialog.mode == "tag navigator") {
    if (!bFullTextSearch && emxUIConstants.STR_QUERY_TYPE == "Indexed" && oTop && oTop.showSlideInDialog) {
        oTop.jQuery(oTop.document).trigger("sb_data_changed.bps_sb");
        if (oTop.showSlideInDialog.mode == "tag navigator") {
            return;
        }
    }

    if (!useAutoFilterSlideIn) {
        return;
    }

    var isAutoFilterSlidein = (getTopWindow().emxUISlideIn && getTopWindow().emxUISlideIn.current_slidein)
                ? (getTopWindow().emxUISlideIn.current_slidein.dir == "left")
                : false;
    var isSlideinVisible = (getTopWindow().emxUISlideIn) ? !getTopWindow().emxUISlideIn.is_closed : false;

    try {
            if (isSlideinVisible && isAutoFilterSlidein) {
            //refresh AF window if slide in is open and was opened ftom this SB unless force refresh which is will take over the slide in.
            if (forceRefresh && !bFullTextSearch) {
                showAutoFilterDisplay();
            } else if (getTopWindow().autoFilterWindow && getTopWindow().autoFilterWindow.emxUIAutoFilter) {
                getTopWindow().autoFilterWindow.emxUIAutoFilter.refreshFilterView();
            }
        } else if (getTopWindow().autoFilterWindow && getTopWindow().autoFilterWindow.emxUIAutoFilter.isRefined() == true) {
            getTopWindow().autoFilterWindow.emxUIAutoFilter.refreshFilterView();
        }
    } catch (e) {
        // do nothing
    }

}

/* clears all checked Items
 * This method clears all checked Items before applying filter
 */
function clearAllCheckedItems(){
    var checkedItems =getCheckedCheckboxes();
    for (var item in checkedItems)
     {
        postDataStore(item, "remove");
     }
    parent.ids = "~";
    var checkedRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked']");
    unRegisterSelectedRows(checkedRows);
}
/*
 * This function returns displayRows after filtering and sets the total number of objects after filtering
 * in mxRoot/setting[@name = 'total-rows']
 */
function getDisplayRowsAfterFiltering(){
    var rowsToBeShown = null;
    var objectCount = 0;
    var nTotalRows = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name = 'total-rows']");

    var singleRoot = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id ='0']");
    if(singleRoot){
    	if(isStructureCompare == "TRUE"){
    		rowsToBeShown = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[ (not(@filter) or @filter != 'true') and (@level = '0' or count(ancestor::r[not(@display) or @display = 'none']) = '0') and not(@displayRow='false')]");
    	}else{
    rowsToBeShown = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[ (not(@filter) or @filter != 'true') and (@level = '0' or count(ancestor::r[not(@display) or @display = 'none']) = '0')]");
    	}
    	
    }else{
        rowsToBeShown = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[ (not(@filter) or @filter != 'true') and ( count(ancestor::r[not(@display) or @display = 'none']) = '0')]");
    }

    objectCount = rowsToBeShown.length;
    emxUICore.setText(nTotalRows, objectCount);
    
    return rowsToBeShown;
}

/*
 * To merge the oXML with persistant data
 */
function mergePersistData(){
     var tempXML = getTopWindow().info["oldXML"];
     lastSelection = getTopWindow().info["lastSelection"];
     var allRows = emxUICore.selectNodes(tempXML, "/mxRoot/rows//r");
     var newXMLRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r");
     var allRowSel  =  _getSetting(tempXML, "/mxRoot", "allRowSelected");
     if(allRowSel){
     var allRowSelected = oXML.createElement("setting");
     allRowSelected.setAttribute("name", "allRowSelected");
     emxUICore.setText(allRowSelected, allRowSel);
     oXML.documentElement.appendChild(allRowSelected);
     }
     for (var i = 0; i < newXMLRows.length; i++) {
         var levelId = newXMLRows[i].getAttribute("id");
         var oldRow = emxUICore.selectSingleNode(tempXML, "/mxRoot/rows//r[@id = '" + levelId + "']");
         var display = oldRow.getAttribute("display");
         var checked = oldRow.getAttribute("checked");
         var expandedLevels = oldRow.getAttribute("expandedLevels");
         var filter = oldRow.getAttribute("filter");
         var rg = oldRow.getAttribute("rg");
         var calcRows = oldRow.getAttribute("calc");
         if(display != "" && display != "null" && display != null){
             newXMLRows[i].setAttribute("display", display);
         }
         if(checked != "" && checked != "null" && checked != null){
         newXMLRows[i].setAttribute("checked", checked);
         }
         if(expandedLevels != "" && expandedLevels != "null" && expandedLevels != null){
         newXMLRows[i].setAttribute("expandedLevels", expandedLevels);
         }

     }

}

/*
** This function will apply table and tree xsl on the xml
** and displays both the parts in their appropriate divs
** It also takes care of pagination
*/

function rebuildView(adjPanes){
    if(isDataModified()){
        showExpandFilter(false);
       }else{
        showExpandFilter(true);
    }
	if(typeof adjPanes=='undefined'){
		adjPanes = true;
	}
    recomputeViewport();

    var numFetched = fillupColumns(aDisplayRows, firstRow, firstRow + scrollPageSize /* + 1  */);

    if (numFetched != 0) {
        lastPreFetchPos = firstRow + scrollPageSize;
                    }

    bFullListDrawn = false;
    bFullTreeDrawn = false;

    calcMaxFullDrawRows();
    if(getTopWindow().isMobile){
        setTimeout(function () {// needs a small timeout for the iPad
    RefreshView(true);
        }, 100);
    } else {
    	RefreshView(adjPanes);
    }

    RefreshObjectCounts();

	if(adjPanes){
    adjustPanes();
}

}

//Added for bug : 347247
function manageTableRowIds(aRows)
{
    var toolBarFrame = this;
    if (toolBarFrame && toolBarFrame.toolbars && toolBarFrame.toolbars.setListLinks) {
       toolBarFrame.toolbars.setListLinks( aRows.length > 0,'structureBrowser', editableTable.mode);
    }

    var hiddenStoredIds = [];
    var viewSelectedIds = [];
    for (var di = 0; di < aRows.length; di++)
    {
        var id = aRows[di].getAttribute("id");
        var oid = aRows[di].getAttribute("o");
        var relid = aRows[di].getAttribute("r");
        var parentId = aRows[di].getAttribute("p");
        if (relid == null || relid == "null") {
            relid = "";
        }
        if (parentId == null || parentId == "null") {
            parentId = "";
        }
        viewSelectedIds.push(relid + "|" + oid + "|" + parentId + "|" + id);
    }

    var emxTableRowIds = jQuery('input[name=emxTableRowId]',editableTable.mxDivPostData);
    for(var ri = 0 ; ri < emxTableRowIds.length ; ri++) {
        hiddenStoredIds.push(emxTableRowIds[ri].value);
    }

    if( hiddenStoredIds.length != viewSelectedIds.length )
    {
        var filteredRemove = filterArray(hiddenStoredIds,viewSelectedIds);
        for(var fi = 0; fi < filteredRemove.length ; fi++)
        {
            postDataStore(filteredRemove[fi], "remove");
        }
        var filteredAdd = filterArray(viewSelectedIds,hiddenStoredIds);
        for(var fi = 0; fi < filteredAdd.length ; fi++)
        {
            postDataStore(filteredAdd[fi], "add");
        }
    }
}

function has( array, val )
{
  for ( var ai = 0, len = array.length; ai < len; ai++ )
        if ( array[ai] == val )
                return true;
    return false;
}

function filterArray(first,second)
{
    var filtered = [];
    for(var fi = 0 , sz = first.length ; fi < sz; fi++)
    {
        if(!has(second,first[fi]))
            filtered.push(first[fi]);
    }
    return filtered;
}

function countSelectedObjects(){
    var aRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[((@level = '0' or count(ancestor::r[not(@display) or @display = 'none']) = '0') and @checked = 'checked' and not(@rg) and not(@calc))]");
    var selectedLen = aRows.length;
    var displayString = "";
    //Added for bug : 347247
    manageTableRowIds(aRows);
    if(selectedLen > 0){
        displayString = ", " + selectedLen + " " + selectedString;
    }

    return displayString;
}

function totalObjectCount(showObjectsString){
    //var aObjCount = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[((@level = '0' or count(ancestor::r[not(@display) or @display = 'none']) = '0') and (not(@filter) or @filter != 'true') and not(@calc))]");
    var aObjCount = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[((@level = '0' or count(ancestor::r[not(@display) or @display = 'none']) = '0') and (not(@filter) or @filter != 'true') and not(@rg) and not(@calc))]");
    var objCount = aObjCount.length;
    var displayString = "";

    if (showObjectsString != null && !showObjectsString) {
        return displayString = "" + objCount;
    }
    if(objCount > 0){
        if(objCount == 1){
            return displayString = "1 " + objectString;
        }else {
            return displayString = "" + objCount + " " + objectsString;
        }
    }

    return displayString;
}

var headeropen = true;
function toggleheader(){
    var topheight = "";
    if(headeropen){
        headeropen = false;
        if(editableTable.divPageHead){
            topheight = editableTable.divPageHead.firstChild.offsetHeight + "px";
        }
    }else{
        headeropen = true;
        if(editableTable.divPageHead){
            topheight = editableTable.divPageHead.offsetHeight + "px";
        }
    }

    document.getElementById("mx_divBody").style.top = topheight;
    document.getElementById("mx_divThumbnailBody").style.top = topheight;
    document.getElementById("mx_divTreeGraphBody").style.top = topheight;
    return;
}
/*
** Sets initial height
*/
function setInitialHeight(obj){

    try{

        var topheight = "";

        if(editableTable.divPageHead){
            topheight = editableTable.divPageHead.offsetHeight + "px";
        }

        //editableTable.mxDivTable.style.top = topheight;
        //editableTable.mxDivTree.style.top = topheight;
        //editableTable.divGrabber.style.top = topheight;
        document.getElementById("mx_divBody").style.top = topheight;
        editableTable.divTreeGraph.style.top = topheight;
        editableTable.divThumbnail.style.top = topheight;
		var divTreWidth =editableTable.mxDivTree.offsetWidth;//juk-udayt
		var divTabWidth =editableTable.mxDivTable.offsetWidth;
        if(isIE && editableTable.mx_resultCount){
            var tree = (divTreWidth == "" ) ? 0 : divTreWidth;
            var table = (divTabWidth == "" )? 0 : divTabWidth;
            // Commented for Showing result header proper
            //editableTable.mx_resultCount.style.width =  parseInt(tree) + parseInt(table) + 50 + "px";
        }
        editableTable.divTablewidth = editableTable.mxDivTable.clientWidth;
        //For showing Result header in Thumbnails View
        //editableTable.divThumbnail.style.top = editableTable.divPageHead.offsetHeight + 19 + "px";

            var pgFoot = document.getElementById("divPageFoot");
            var bottompos = "0px";
            if(pgFoot){
                bottompos = pgFoot.clientHeight + "px";
                editableTable.divCenterDiv.style.bottom = bottompos;
            } else {
                if(bFullTextSearch) {
                    editableTable.divCenterDiv.style.bottom = bottompos;
                }
            }
    }catch(e){

    }
}

function adjustTableHeight(){
    var delay = 500;
    if(hasMergedCells){
        delay = 1000;
    }
    setTimeout("_delay_adjustTableHeight()" , delay);
}

function _delay_adjustTableHeight(){

    try{

        var currentTableDiv = editableTable.divListBody;
        var otherTableDiv = editableTable.divTreeBody;

        var currentHeadDiv = editableTable.divListHead;
        var otherHeadDiv = editableTable.divTreeHead;

        var currentTable = currentHeadDiv.getElementsByTagName("table")[0];
        var otherTable = otherHeadDiv.getElementsByTagName("table")[0];
        //sync group header heights
        var nLength = currentTable.rows.length;
        for(var i = 1; i < nLength; i++){
            var cRow = currentTable.rows[i];
            var oRow = otherTable.rows[i];
            oRow.style.height = "";
            cRow.style.height = "";
            var headerHeight = "";
            var otherSideHeaderHeight = isMoz ? oRow.clientHeight : oRow.offsetHeight;
            var currentSideHeaderHeight = isMoz ? cRow.clientHeight : cRow.offsetHeight;

            var rowheight;
            if(currentSideHeaderHeight >= otherSideHeaderHeight){
                rowheight = currentSideHeaderHeight;
                oRow.style.height = currentSideHeaderHeight + "px";
            }else{
                rowheight = otherSideHeaderHeight;
                cRow.style.height = otherSideHeaderHeight + "px";
            }

            if(i == (nLength -1)){
                var graberTop = editableTable.divListBody.offsetTop - rowheight;
                editableTable.mxDivGrabberBody.style.top = graberTop + "px";
            }
        }
        //sync table tops
        if(currentHeadDiv.offsetHeight >= otherHeadDiv.offsetHeight){
            currentTableDiv.style.top = currentHeadDiv.offsetHeight + currentHeadDiv.offsetTop + "px";
            otherTableDiv.style.top = currentHeadDiv.offsetHeight + currentHeadDiv.offsetTop + "px";
        }else{
            currentTableDiv.style.top = otherHeadDiv.offsetHeight + otherHeadDiv.offsetTop + "px";
            otherTableDiv.style.top = otherHeadDiv.offsetHeight + otherHeadDiv.offsetTop + "px";
        }

    }catch(e){

    }
}

function setInitialHeightForConsolidatedSearch()
{
        editableTable.divCenterDiv.style.position ="absolute";

        editableTable.divCenterDiv.style.top =  "7px";
        editableTable.divCenterDiv.style.left = "-1px";

        editableTable.divCenterDiv.style.right = "-3px";
        variance = -47;

        bodyHeight = document.body.offsetHeight -10;

        if (isIE)   {
            editableTable.divCenterDiv.style.left = "-2px";
            editableTable.divCenterDiv.style.top =   "-2px";
            editableTable.divCenterDiv.style.right = "17px";
            variance = -50;
            bodyHeight = bodyHeight-15;
         } else
         {
            bodyHeight = bodyHeight - variance;
         }

        /*if(document.getElementById('imgProgressDiv')){
                document.getElementById('imgProgressDiv').style.display = 'none';
        }*/

        if(document.getElementById('listHidden')){
                document.getElementById('listHidden').style.display = 'none';
        }

        return bodyHeight;
}

//fixing the grabber position
function setGrabberPosition(){
    var divTree = document.getElementById("mx_divTree");
    var divTreeHead = document.getElementById("mx_divTreeHead");
    var tblTreeHead = divTreeHead.getElementsByTagName("table")[0];
    var divTable = document.getElementById("mx_divTable");
    var divTreeBody = document.getElementById("mx_divTreeBody");
    var divGrabber = document.getElementById("mx_divGrabber");
    var windowWidth = parseInt(emxUICore.getWinWidth(getTopWindow()));//window width
    var freezePaneWidth = 0;
    var pos = Math.round(windowWidth*0.85);
    var isReport = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='reportType']/text()");
    var sizerWidth = (getTopWindow().isMobile  || getTopWindow().isPCTouch) ? 23 : 2;

    freezePaneWidth = getTopWindow().getPersistenceData("FreezePaneWidth", getTablename());

	var hiddenRowWidth = 0;

    for (var itr = 0; itr < tblTreeHead.rows[0].cells.length; itr++)
    {
        hiddenRowWidth = hiddenRowWidth + parseInt(jQuery(tblTreeHead.rows[0].cells[itr]).attr("width"));
    }

    if(freezePaneWidth != null && freezePaneWidth != "")
	{
		var lastColu = tblTreeHead.rows[0].cells[tblTreeHead.rows[0].cells.length-2];
		var treeLastColWid = parseInt(lastColu.width)+freezePaneWidth-hiddenRowWidth;
		if(treeLastColWid<COL_MIN){
			lastColu.width = COL_MIN;
		}
		else{
			lastColu.width = treeLastColWid;
		}
	}else
	{
		freezePaneWidth=hiddenRowWidth;
    }

    //Incase of structure compare the FreezePane grabber is placed in the middle of the screen
    if(isStructureCompare == "TRUE" && !(isReport.nodeValue == "Unique_toLeft_Report" || isReport.nodeValue == "Unique_toRight_Report")){
        pos = Math.round(windowWidth*0.5);
    } else if(freezePaneWidth < pos){
        pos = freezePaneWidth ;
    }
    divTree.style.width = pos + "px";
    //divTreeHead.style.width = pos + 16 + "px";
    //divTreeBody.style.width = pos + 16 + "px";

    divGrabber.style.left = pos + sizerWidth+"px";
    divTable.style.left = pos + 3 +"px";
}
/*
** Map object.properties to Divs
*/
emxEditableTable.prototype.initDivDomVars = function __initDivDomVars(){
    this.divPageHead = document.getElementById("pageHeadDiv");
    this.divListHead = document.getElementById("mx_divTableHead");
    this.divListBody = document.getElementById("mx_divTableBody");
    this.divTreeHead = document.getElementById("mx_divTreeHead");
    this.divTreeBody = document.getElementById("mx_divTreeBody");
    this.divGrabber = document.getElementById("mx_divGrabber");
    this.divDivider  = document.getElementById("divider");
    this.divBottom   = document.getElementById("bottomDiv");
    this.divCenterDiv   = document.getElementById("mx_divBody");
    this.massUpdate   = document.getElementById("divMassUpdate");
    this.mxDivTable = document.getElementById("mx_divTable");
    this.mxDivTree = document.getElementById("mx_divTree");
    this.mxDivGrabberHead = document.getElementById("mx_divGrabberHead");
    this.mxDivGrabberBody = document.getElementById("mx_divGrabberBody");
    this.mxDivFoot = document.getElementById("divPageFoot");
    this.mxDivPostData = document.getElementById("divPostData");
    this.mx_objectCount = document.getElementById('mx_objectCount');
    this.mx_preFetchProgress = document.getElementById('mx_preFetchProgress');
    if(bFullTextSearch){
        this.mx_resultCount = parent.document.getElementById('mx_resultCount');
    }else{
        this.mx_resultCount = document.getElementById('mx_resultCount');
    }
    this.divThumbnail   = document.getElementById("mx_divThumbnailBody");
    this.divTreeGraph   = document.getElementById("mx_divTreeGraphBody");
}

/*
** Map object.properties to tables
*/
emxEditableTable.prototype.initDomVars = function __initDomVars(){
    this.tblListHead = this.divListHead.getElementsByTagName("table")[0];
    this.tblListBody = this.divListBody.getElementsByTagName("table")[0];
    this.tblTreeHead = this.divTreeHead.getElementsByTagName("table")[0];
    this.tblTreeBody = this.divTreeBody.getElementsByTagName("table")[0];
};

emxEditableTable.prototype.restoreViewState = function __restoreViewState () {
    var sizerWidth = (getTopWindow().isMobile  || getTopWindow().isPCTouch) ? 20 : 2;
    if (this.tblListHead.rows.length > 0 && this.tblListHead && this.tblListBody) {
        var sum = 0;
        var nCellLength = this.tblListHead.rows[0].cells.length;
        for (var itr = 0; itr < nCellLength; itr+=2) {
            var tempwidth = parseInt(this.tblListHead.rows[0].cells[itr].width) + sizerWidth;
            sum += tempwidth;
            if(this.tblListBody.rows[0] && this.tblListBody.rows[0].cells[itr/2]){
                this.tblListBody.rows[0].cells[itr/2].width = tempwidth;
            }
        }
        this.tblListHead.setAttribute("width", sum);
        this.tblListBody.setAttribute("width", sum);
    }
    if (this.tblTreeHead && this.tblTreeBody) {
        var sum = 0;
        var nCellLength = this.tblTreeHead.rows[0].cells.length;
        if(nCellLength > 2){

	var colorizeSetting = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name='colorize']");
	if(colorizeSetting != null && emxUICore.getText(colorizeSetting).toLowerCase() === 'yes'){
		jQuery(this.tblTreeHead.rows[0].cells[0]).attr("width", COLORIZATION_COL_WIDTH);
		jQuery(this.tblTreeHead.rows[0].cells[1]).attr("width", 1);
	}
	else{
		jQuery(this.tblTreeHead.rows[0].cells[0]).attr("width", 1);
		jQuery(this.tblTreeHead.rows[0].cells[1]).attr("width", 1);
	}
        }
        for (var itr = 0; itr < nCellLength; itr+=2) {
	    var tempwidth =  parseInt(jQuery(this.tblTreeHead.rows[0].cells[itr]).attr("width")) + (itr == 0 ? 0: sizerWidth);
            sum += tempwidth;
            if(this.tblTreeBody.rows[0] && this.tblTreeBody.rows[0].cells[itr/2]){
                this.tblTreeBody.rows[0].cells[itr/2].width = tempwidth;
            }
        }
        this.tblTreeHead.setAttribute("width",sum);
        this.tblTreeBody.setAttribute("width",sum);
        this.tblTreeBody.parentNode.setAttribute("width", sum);
    }
}

/**
 * Assign Event Handlers
 */
//IE Memory leak Fix-Start
emxEditableTable.prototype.attachOrDetachEventHandlers = function __attachOrDetachEventHandlers(boolValue,cleanEvents){
    var fAttachOrDetach = null;
	var clearEventFlag = false;
    if(boolValue){
        fAttachOrDetach = attachEventHandler;
    }else{
        fAttachOrDetach = detachEventHandler;
		clearEventFlag=true;
	}
    // Event to resize columns in table
    var rowNo = 1;
    if(!this.tblListHead || !this.tblTreeHead)
        return;
    var tbody = this.tblListHead.tBodies[0];
    if(!this.tblTreeHead.tBodies[0]){
        return;
    }

    if (tbody.rows[1].className == "mx_group-header")
    {
        rowNo = 2;
    }

    for (var i=2; i < tbody.rows[rowNo].cells.length; i += 2) {
        //alert(tbody.rows[2].cells[i-1].className);
        fAttachOrDetach(tbody.rows[rowNo].cells[i-1], "mousedown",onListEvent);

        var hasSecondRow = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name = 'HasMergedCell']");
        if(emxUICore.getText(hasSecondRow) == 'true' && tbody.rows[rowNo+1] && typeof tbody.rows[rowNo+1].cells[i-1] != 'undefined'){
            fAttachOrDetach(tbody.rows[rowNo+1].cells[i-1], "mousedown",onListEvent);
        }
    }
    rowNo = 1;
    if (this.tblTreeHead.tBodies[0].rows[1].className == "mx_group-header")
    {
        rowNo = 2;
    }
    // Event to resize columns in tree
    for (var i=4; i < this.tblTreeHead.tBodies[0].rows[rowNo].cells.length; i += 2) {
        fAttachOrDetach(this.tblTreeHead.tBodies[0].rows[rowNo].cells[i-1], "mousedown",onListEvent);

        var hasSecondRow = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name = 'HasMergedCell']");
        if(emxUICore.getText(hasSecondRow) == 'true' && this.tblTreeHead.tBodies[0].rows[rowNo+1] && typeof this.tblTreeHead.tBodies[0].rows[rowNo+1].cells[i-1] != 'undefined'){
            fAttachOrDetach(this.tblTreeHead.tBodies[0].rows[rowNo+1].cells[i-1], "mousedown",onListEvent);
        }
    }

    // Table area
    fAttachOrDetach(this.divListBody, "scroll", onScroll);

    // Tree area
    fAttachOrDetach(this.divTreeBody, "scroll", onScroll);

    // event to popup input control in edit mode
    fAttachOrDetach(this.tblListBody, "click", getCell);
    //Bug 354686
    //fAttachOrDetach(this.divTreeBody, "click", getCell);
    fAttachOrDetach(this.tblTreeBody, "click", getCell);

    //event to handle the right click menu
    fAttachOrDetach(this.tblListBody, "contextmenu", function(evt) {
		                                                               clickRight(evt, getParameter("appendRMBMenu"));
		                                                           }
		           );
    fAttachOrDetach(this.tblTreeBody, "contextmenu", function(evt) {
		                                                               clickRight(evt, getParameter("appendRMBMenu"));
		                                                           }
		           );
    //event to handle the row highlight
    fAttachOrDetach(this.tblListBody, "mouseup", highlightRow);
    fAttachOrDetach(this.tblTreeBody, "mouseup", highlightRow);
    // event to launch the popup the div
    fAttachOrDetach(this.tblListBody, "mouseover", launchDiv);
    fAttachOrDetach(this.tblTreeBody, "mouseover", launchDiv);
    // event to destroy popup the div
    fAttachOrDetach(this.tblListBody, "mouseout", closeDiv);
    fAttachOrDetach(this.tblTreeBody, "mouseout", closeDiv);
    /* Commented while merging HF40 to 2010 - thinking this code is not required. If required, please uncomment
    Added for Bug Id-348188
    this.divListBody.onclick = function () {
     if ( !isCellClicked )   {
            removeCurrentFloatingDiv ();
        }
        isCellClicked=false;
    }
    */

    // window
    fAttachOrDetach(window, "resize", onResize);

    if (boolValue) {
        sbSplitterDrag = new SplitterDragger();

        sbSplitterDrag.initElement('mx_divGrabber');
        sbSplitterDrag.initElement('mx_divGrabberHead');
    }

    if(isIE && cleanEvents && clearEventFlag){
		this.unbindAllEvents(this.tblListBody);
		this.unbindAllEvents(this.tblTreeBody);
    }
}

emxEditableTable.prototype.unbindAllEvents = function __unbindAllEvents(tableDom) {
		try{
			jQuery(tableDom).andSelf().unbind().die();

			var allTdTag = jQuery(tableDom).find("td");
			for(var i=0;i<allTdTag.length;i++){
				jQuery(allTdTag[i]).andSelf().unbind().die();
			}
		}catch(e){

		}
}
//IE Memory leak Fix-End
/**
 * Sets properties needed for resizing columns
 * @param objEvent The Event Object
 * @param iColNum The index of the column to move
 */
emxEditableTable.prototype.handleBeginColResize = function __handleBeginColResize(objEvent, iColNum,tableName) {
    var tbl = tableName == "headTable" ? this.tblListHead.tBodies[0] : tbl = this.tblTreeHead.tBodies[0];

    //var cells = tbl.rows[2] ? tbl.rows[2].cells : tbl.rows[1].cells;
    var cells = tbl.rows[0].cells;
    var rowNo = 1;
    if(tbl.rows[1].className == "mx_group-header") {
        rowNo = 2;
    }
    var headCells = tbl.rows[rowNo].cells;
    var canResize = headCells[iColNum-1].className == "mx_separator";
    if (cells) {
        if (canResize) {
                return;
            }
        this.curCol = cells[iColNum];
        this.colInResize = cells[iColNum-1];
    }

    //this.curColXML = Math.floor((iColNum - 1) / 2) + 1;
    var curcellid  = this.colInResize.id;
    this.curColXML = curcellid.substr("ROW_".length);
    this.mouseX = objEvent.clientX;
    this.captureMouse();
}
/**
 * Capture or release the mouse event for IE
 */
if(isIE){
    emxEditableTable.prototype.captureMouse = function __captureMouse() {
        this.curCol.setCapture();
        this.curCol.onmousemove = onListEvent;
        this.curCol.onmouseup = onListEvent;
    }
    emxEditableTable.prototype.releaseMouse = function __releaseMouse() {
        this.curCol.releaseCapture();
        this.curCol.onmousemove = null;
        this.curCol.onmouseup = null;
    }
/**
 * Capture or release the mouse event for Moz
 */
}else{
    emxEditableTable.prototype.captureMouse = function __captureMouse() {
        window.captureEvents(Event.MOUSEUP | Event.MOUSEMOVE);
        attachEventHandler(window, "mousemove", onListEvent);
        attachEventHandler(window, "mouseup", onListEvent);
    }
    emxEditableTable.prototype.releaseMouse = function __releaseMouse() {
        window.releaseEvents(Event.MOUSEUP | Event.MOUSEMOVE);
        detachEventHandler(window, "mousemove", onListEvent);
        detachEventHandler(window, "mouseup", onListEvent);
    }
}
/**
 * adjust the column width along with inner TDs(label,sort,filter)
 */
function adjustColWidth (tblhd,cellIndex,actualWidth,colcurIdx) {
     var tableWidth=0;
     var sortWidth=0;
     var filterWidth=0;
     var remainWidth;
     var tblhdr = "";
     var hasCheckBox = false;
     var j = 0;
     removeCurrentFloatingDiv();
     if (tblhd.rows[1].className == "mx_group-header") {
         j = 2;
        } else {
         j = 1;
        }
     for(; j < tblhd.rows.length; j++){
         remainWidth=actualWidth;
         tblhdr=tblhd.rows[j];
    if (tblhdr.childNodes[cellIndex] != null &&
             tblhdr.childNodes[cellIndex].firstChild != null &&
            tblhdr.childNodes[cellIndex].firstChild.rows != null &&
             tblhdr.childNodes[cellIndex].firstChild.rows[0].cells.length>1){
        tblhdr.childNodes[cellIndex].firstChild.width=remainWidth-CELL_PADDING_WIDTH;//cell padding
        tableWidth=tblhdr.childNodes[cellIndex].firstChild.width;
        var reqdTD= tblhdr.childNodes[cellIndex].firstChild.rows[0];//.cells[j];
        for(var i=0;i<reqdTD.cells.length;i++){
            var tdId=reqdTD.cells[i].id;
            if(i == 0 && tdId == ""){
                hasCheckBox = true;
            }
            if(!(i == 0 && tdId == "")){
                if(reqdTD.cells[i].className == "sort-ascend status" || reqdTD.cells[i].className == "sort-descend status" ){
                    remainWidth= remainWidth-ICON_WIDTH;
                    reqdTD.cells[i].width=ICON_WIDTH;
                    sortWidth=reqdTD.cells[i].width;
                } else if(reqdTD.cells[i].className == "filtered status") {
                    remainWidth= remainWidth-ICON_WIDTH;
                    reqdTD.cells[i].width=ICON_WIDTH;
                    filterWidth=reqdTD.cells[i].width;
                } else {
                    remainWidth= remainWidth;
                    reqdTD.cells[i].width="";
                }
            }
        }
        remainWidth= remainWidth-CELL_PADDING_WIDTH;

        if(tblhd.offsetParent.id === "treeHeadTable" && colcurIdx == 1  && hasCheckBox == true) {
                 reqdTD.cells[0].width = CHECK_BOX_WIDTH;
                 reqdTD.cells[1].width = remainWidth - CHECK_BOX_WIDTH;
        } else {
            reqdTD.cells[0].width=remainWidth ;
        }
    }
     }
     _setSetting(oXML, "/mxRoot/columns/column[" + colcurIdx + "]/settings", "lblWidth", remainWidth);
     _setSetting(oXML, "/mxRoot/columns/column[" + colcurIdx + "]/settings", "tblWidth", tableWidth);
     _setSetting(oXML, "/mxRoot/columns/column[" + colcurIdx + "]/settings", "sortWidth", sortWidth);
     _setSetting(oXML, "/mxRoot/columns/column[" + colcurIdx + "]/settings", "filterWidth", filterWidth);
}


/* this sets inner TDS of table column header on rrefresh mode*/
function resetColWidth(tblhdr,cellIndex,actualWidth,colcurIdx,splitCount){

    var tableWidth=0;
    var sortWidth=0;
    var filterWidth=0;
    var remainWidth=actualWidth;
    var ischkbox=false;

        var headerTable=jQuery('th',tblhdr)[cellIndex];
        if(headerTable && headerTable.rows && headerTable.rows[0].cells.length>1){
        headerTable.width=remainWidth-CELL_PADDING_WIDTH;
        tableWidth=headerTable.width;
        var reqdTD= headerTable.rows[0];
        for(var i=0;i<reqdTD.cells.length;i++){
            var tdId=reqdTD.cells[i].id;
            if(tdId == ""){
                ischkbox=true;
            } else {
                if(reqdTD.cells[i].className == "sort-ascend status" || reqdTD.cells[i].className == "sort-descend status" ){
                    remainWidth= remainWidth-ICON_WIDTH;
                    reqdTD.cells[i].width=ICON_WIDTH;
                    sortWidth=reqdTD.cells[i].width;
                }else if(reqdTD.cells[i].className == "filtered status") {
                    remainWidth= remainWidth-ICON_WIDTH;
                    reqdTD.cells[i].width=ICON_WIDTH;
                    filterWidth=reqdTD.cells[i].width;
                } else {
                    remainWidth= remainWidth;
                    reqdTD.cells[i].width="";
                }
            }
        }
        remainWidth= remainWidth-CELL_PADDING_WIDTH;
        if(ischkbox){
            reqdTD.cells[0].width=CHECK_BOX_WIDTH;
            if(splitCount == 1){
                reqdTD.cells[1].width=reqdTD.cells[1].offsetWidth;
            } else {
                reqdTD.cells[1].width = remainWidth - CHECK_BOX_WIDTH;
            }
        }else {
            reqdTD.cells[0].width=remainWidth;
        }
    }
    _setSetting(oXML, "/mxRoot/columns/column[" + colcurIdx + "]/settings", "lblWidth", remainWidth);
    _setSetting(oXML, "/mxRoot/columns/column[" + colcurIdx + "]/settings", "tblWidth", tableWidth);
    _setSetting(oXML, "/mxRoot/columns/column[" + colcurIdx + "]/settings", "sortWidth", sortWidth);
    _setSetting(oXML, "/mxRoot/columns/column[" + colcurIdx + "]/settings", "filterWidth", filterWidth);
}
/**
 * Removes the height attribute from each rows in table and Tree
 * Should be called before modifying the column widths which may result in wrapping.
 */
function resetTreeTableHeights(){
    for(var i =1; i < editableTable.tblListBody.rows.length; i++){
        editableTable.tblListBody.rows[i].removeAttribute('height');
        editableTable.tblTreeBody.rows[i].removeAttribute('height');
    }
}

/**
 * Moves the column
 * @param objEvent The Event Object
 */
emxEditableTable.prototype.handleColResize = function __handleColResize(objEvent){

        resetTreeTableHeights();

    try {
         var ppparentNodeId = this.curCol.parentNode.parentNode.parentNode.id;
         var tblhead = (ppparentNodeId == "headTable" ? this.tblListHead : this.tblTreeHead);
         var tblbody = (ppparentNodeId == "headTable" ? this.tblListBody : this.tblTreeBody);

         tblhd = tblhead.tBodies[0];
         tbl = tblbody.tBodies[0];

         var iDiffX = objEvent.clientX - this.mouseX;
         //getTopWindow().console.log('clientX='+objEvent.clientX, 'mouseX='+this.mouseX, 'iDiffX='+iDiffX );
         //var iCurColWidth = parseInt(tbl.rows[0].cells[this.colInResize.cellIndex].getAttribute("width"));
         var iCurColWidth = parseInt(tbl.rows[0].cells[(this.colInResize.cellIndex)/2].getAttribute("width"));
         //getTopWindow().console.log('iCurColWidth=', iCurColWidth);
         var iNewColWidth = iCurColWidth + iDiffX;
         //getTopWindow().console.log('iNewColWidth=', iNewColWidth);
         var cellIndex=this.colInResize.cellIndex;
         var newWidth=0;
         newWidth=iNewColWidth;
         var tableWidth=0;
         var sortWidth=0;
         var filterWidth=0;
         var sizerWidth = (getTopWindow().isMobile  || getTopWindow().isPCTouch) ? 20 : 2;
         if (iNewColWidth >= COL_MIN) {
             tblhd.rows[0].cells[this.colInResize.cellIndex].setAttribute("width", iNewColWidth - sizerWidth);
             tbl.rows[0].cells[(this.colInResize.cellIndex)/2].setAttribute("width", iNewColWidth);
             adjustColWidth (tblhd,cellIndex,iNewColWidth,this.curColXML);
            }
        this.mouseX = objEvent.clientX;
        this.columnwidth = iNewColWidth - sizerWidth;

        _setSetting(oXML, "/mxRoot/columns/column[" + this.curColXML + "]/settings", "Width", iNewColWidth - sizerWidth);
       // setColumnWidth(tblhd,cellIndex,iNewColWidth);
        adjustWithCellWidth(tblhead);
        adjustWithCellWidth(tblbody);
        adjustTableHeight();

    } catch (e) {
        //getTopWindow().console.warn(e.toString());
            }
            }

function setLocalStorageforColumnwidth( Colindex , value)
{
        var colname = colMap.getColumnByIndex(Colindex - 1).name;
        getTopWindow().setPersistenceData(colname,value , getTablename());
}

function getLocalStorageforColumnwidth( Colname )
{
	return getTopWindow().getPersistenceData(Colname, getTablename());
}

function adjustWithCellWidth(objTable){
    var arrCells = objTable.tBodies[0].rows[0].cells;
    var sum = 0;
    for (var i = 0; i < arrCells.length; i++) {
        sum += parseInt(jQuery(arrCells[i]).attr("width"));
    }
    objTable.width= sum;
}

emxEditableTable.prototype.adjustLastColumn = function __adjustLastColumn(headTable, bodyTable, isTree){
    if (!headTable || !bodyTable) {
        return;
    }
    if(!headTable.tBodies[0]){
        //IE7 gives null value
        headTable = this.divTreeHead.getElementsByTagName("table")[0];
        if(!headTable.tBodies[0]){
            return;
        }
    }
    if(!bodyTable.tBodies[0]){
        return;
    }

    var tblcontainer = this.divListBody;
    var treeBody;
    if(isTree){
        tblcontainer = this.divTreeBody;
        treeHead= this.divTreeHead;
        treeBody=this.divTreeBody;
    }

    var headCells = headTable.tBodies[0].rows[0].cells;
    var bodyCells = bodyTable.tBodies[0].rows[0].cells;

    var resizeHeadColIndex = bodyCells.length - 1;

    var minColWidth=0;
    if(isTree){
        minColWidth = COL_MIN;
    }else{
        minColWidth = LAST_TABLE_COL_WIDTH > COL_MIN ? LAST_TABLE_COL_WIDTH:COL_MIN ;
    }

    var sum = 0;
	var cntrWidth = tblcontainer.offsetWidth;
    for (var itr = 0; itr < resizeHeadColIndex; itr++) {
      sum += parseInt(jQuery(bodyCells[itr]).attr("width"));
      if(sum > cntrWidth ){
          return;
      }
    }

    var targetWidth = cntrWidth - sum;//tblcontainer.offsetWidth 

    if(targetWidth > minColWidth){
        headCells[resizeHeadColIndex * 2].width = targetWidth;
        bodyCells[resizeHeadColIndex].width = targetWidth;
        bodyTable.width = sum + targetWidth;
        //store the last col width in xml
        var curcellid  = headCells[resizeHeadColIndex * 2].id;
        var lastColIndex = curcellid.substr("ROW_".length);
        _setSetting(oXML, "/mxRoot/columns/column[" + lastColIndex + "]/settings", "Width", targetWidth);
    adjustWithCellWidth(headTable);
    adjustWithCellWidth(bodyTable);
    if(isTree){
        if(resizeHeadColIndex == 0){
                editableTable.tblTreeBody.style.tableLayout = "auto";
                editableTable.tblTreeHead.width = editableTable.tblTreeBody.offsetWidth;
        }
    }
}
}


emxEditableTable.prototype.adjustTableLastColumn = function (){
    this.adjustLastColumn(this.tblListHead, this.tblListBody, false);
}

emxEditableTable.prototype.adjustTreeLastColumn = function (){
    this.adjustLastColumn(this.tblTreeHead, this.tblTreeBody, true);
}

//Class columnMap
function columnMap(){
    this.columns = new Array();
}
/**
 * Adds columns to the columns array
 * @param name The actual name of the column
 * @param type The Matrix type
 * @param label The display text for the column
 * @return A column object
 */
function replaceSpecialChars(tempName){
    tempName = tempName.replace(/&amp;/g,"&");
    tempName = tempName.replace(/&lt;/g,"<");
    tempName = tempName.replace(/&gt;/g,">");
     return tempName;
}

columnMap.prototype.getColumnIndex = function __getColumnIndex(name){
	return this.columns[name].index;
}

columnMap.prototype.addColumn = function __addColumn(name,type,label){
    name=replaceSpecialChars(name);
    var oCol = new column(name,type,label);
    this.columns[this.columns.length] = oCol;
    this.columns[name] = oCol;
    this.columns[name].index = this.columns.length;
    return oCol
}
/**
 * Get column by index
 * @param iIndex The column index
 * @return The column index
 */
columnMap.prototype.getColumnByIndex = function __getColumnByIndex(iIndex){
    return this.columns[iIndex];
}
/**
 * Get column by name
 * @param name The column name
 * @return The column name
 */
columnMap.prototype.getColumnByName = function __getColumnByName(name){
    return this.columns[name];
}

columnMap.prototype.getDefaultValueMap = function __getDefaultValueMap(){
    var defaultMap = {};
    for(var i = 0; i < this.columns.length; i++)
    {
        var oCol     = this.columns[i];
        defaultMap[oCol.name] = oCol.getAttribute("defaultValue");
    }
    return defaultMap;
}

columnMap.prototype.getDefaultValues = function __getDefaultValues(markup){
    var defaults  = [];
    var attribute = markup == "new" ? "defNewValue" : "defExnValue";
    for(var i = 0; i < this.columns.length; i++)
    {
        defaults.push(this.columns[i].getAttribute(attribute));
    }
    return defaults;
}

columnMap.prototype.getDefaultDisplayValues = function __getDefaultDisplayValues(markup){
    var defaults  = [];
    var attribute = markup == "new" ? "defNewDisplayValue" : "defExnDisplayValue";
    for(var i = 0; i < this.columns.length; i++)
    {
        defaults.push(this.columns[i].getAttribute(attribute));
    }
    return defaults;
}

//Class column
function column(name,type,label){
    this.name = name;
    this.type = type;
    this.label = label;
    this.settings = new Array();
    this.rangeValues = new Object();
    this.groupedRangeValues = new Object();
    this.attributeValues = new Object();
}
/**
 * Add a setting to a column
 * @param name The setting name
 * @param val The setting value
 */
column.prototype.setSetting = function __setSetting(name,val){
    this.settings[name] = val;
}
/**
 * Get a setting from a column
 * @param name The setting name
 * @return The value for the named setting
 */
column.prototype.getSetting = function __getSetting(name){
    return this.settings[name];
}
/**
 * Add a rangeValue to a column
 * @param name The rangeValue name
 * @param val The rangeValue value
 */
column.prototype.setRangeValues = function __setRangeValues(name,val){
    name=replaceSpecialChars(name);
    val=replaceSpecialChars(val);
    this.rangeValues[name] = val;
}
/**
 * Add a groupedRangeValue to a column
 * @param name The groupedRangeValue name
 * @param val The groupedRangeValue value
 */
column.prototype.setGroupedRangeValues = function __setGroupedRangeValues(name,val){
    name=replaceSpecialChars(name);
    val=replaceSpecialChars(val);
    this.groupedRangeValues[name] = val;
}
/**
 * Get a rangeValue from a column
 * @param name The rangeValue name
 * @return The value for the named rangeValue
 */
column.prototype.getRangeValues = function __getRangeValues(name){
    return this.rangeValues[name];
}
/**
 * Add an attribute to a column
 * @param name The attribute name
 * @param val The attribute value
 */
column.prototype.setAttribute = function __setAttribute(name,val){
    this.attributeValues[name] = val;
}
/**
 * Get an attribute to a column
 * @param name The attribute name
 * @param val The attribute value
 */
column.prototype.getAttribute = function __getAttribute(name){
    return this.attributeValues[name];
}

function _delay_expandNLevels(){
    applyCheck = true;
    var arrRows, row, rowLen, i=0,arrIds=[];

    var searchquery = null;
    if (fullTextSearchObj){
        var wTop = getTopWindow();
        searchquery = new wTop.Query(fullTextSearchObj.getContentUrl());
    }
    resetUrlParameters("expandLevel",expandLevel,searchquery);

    if(!singleRoot){
        arrRows = getCheckedRows();
        rowLen = arrRows.length;
        if(rowLen > 0){
            for(i; i < rowLen; i++){//get the ids of each row
                row = arrRows[i];
                arrIds.push(row.getAttribute("id"));
            }
            emxEditableTable.expand(arrIds,expandLevel);
        }
    }else{
        emxEditableTable.expand(["0"],expandLevel);
    }
    fnTemp();

}

function expandNLevels(){
    if(portalMode == "true"){
            toggleProgress("visible");
    }else{
        turnOnProgress();
    }
    setTimeout("_delay_expandNLevels()",25);
}

function _delay_expandAll(){
    var arrRows, row, rowLen, i=0, arrIds=[];
    var elemObj = getExpandFilterSelect();
    if(elemObj.value != "All"){
        elemObj.value = "All";
        if(elemObj.onchange){
            elemObj.onchange();
        }
        applyCheck = true;
        resetParameter("expandLevel",expandLevel);
    }
    if(!singleRoot){
        arrRows = getCheckedRows();
        rowLen = arrRows.length;
        if(rowLen > 0){
            for(i; i < rowLen; i++){//get the ids of each row
                row = arrRows[i];
                arrIds.push(row.getAttribute("id"));
            }
            emxEditableTable.expand(arrIds,"All");
        }
    }else{
        emxEditableTable.expand(["0"],"All");
    }
}
function expandAll(){
	reloadGSB = true;
    if(portalMode == "true"){
            toggleProgress("visible");
    }else{
        turnOnProgress();
    }
    setTimeout("_delay_expandAll()",25);
}
var bToggleInProgress = false;
/**
 * toggle tree nodes open and closed
 * @param arguments[0] unique row id
 */
 //modified for 327648 to diplay the clock when the (+) or (-) in EBOM structure is clicked.
function toggle(rowId){
	reloadGSB = true;
    if(portalMode == "true"){
        toggleProgress("visible");
    }else{
        turnOnProgress();
    }
    manualExpand = true;
    //ElapsedTimer.reset("toggle");
    bToggleInProgress = true;

    if(isStructureCompare == "TRUE" ){

    	var isExpandSC = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='expandFilter']/text()");
    	var reprotType = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='reportType']/text()");

    	if(isExpandSC == null || reprotType == null){
    		return;
    	}else if(isExpandSC && reprotType){
    		if("true" != isExpandSC.nodeValue || "Complete_Summary_Report" != reprotType.nodeValue){
    			return;
    		}
    	}
    }

    setTimeout(function(){toggle2(rowId);});
}

function toggle3(rowId){
    if(portalMode == "true"){
        toggleProgress("visible");
    }else{
        turnOnProgress();
    }
    manualExpand = true;
    //ElapsedTimer.reset("toggle");
    bToggleInProgress = true;

    if(isStructureCompare == "TRUE"){
        return;
    }
    return toggle2(rowId);
}

function getExpandedLevel(nRow) {
    if (nRow.tagName != "r") {
        return "0";
    }
    var el = nRow.getAttribute("expandedLevels");
    if (el) {
        return el;
    } else {
        var pel = getExpandedLevel(nRow.parentNode);
        if (pel == "All") {
            return pel;
        } else {
            return "" + (parseInt(pel) - 1);
        }
    }
}

var toggleClicked = false;
function toggle2(rowId){
    //ElapsedTimer.enter('toggle2');

    var dirRelType = "";
    var direction = "";
    //get to and from

    //memory Leak Kir Start
    var toObj = document.getElementById("to");
    var fromObj = document.getElementById("from");
    var toVal = toObj?toObj.checked:0;
    var fVal = fromObj?fromObj.checked:0;
    //memory Leak Kir End

    var nRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + rowId + "']");
    var display = nRow.getAttribute("display");

    if (toVal && fVal && expandLevel == "All" && display != "block"){
        alert(emxUIConstants.STR_ALLLEVEL_ERROR);
        turnOffProgress();
        if(portalMode == "true"){
            setTimeout("toggleProgress('hidden')", 100);
        }
        //ElapsedTimer.exit('toggle2' + emxUIConstants.STR_ALLLEVEL_ERROR);
        return;
    }
    if (toObj) {
        if(toVal && fVal){
            resetParameter("direction","both");
            dirRelType += "&direction=both";
            direction = "both";
        }else if(toVal){
            resetParameter("direction","to");
            dirRelType += "&direction=to";
        }else if(fVal){
            resetParameter("direction","from");
            dirRelType += "&direction=from";
        }else{
            resetParameter("direction","both");
            dirRelType += "&direction=both";
            direction = "both";
        }
    }

    fromObj = null;
    toObj = null;
    //get filters type
    var formItem = document.getElementById("select_type");
    var typeFilter = (formItem && formItem.options)?formItem[formItem.selectedIndex].value:0;

    if(typeFilter){
        resetParameter("selectedType",typeFilter);
        dirRelType += "&selectedType=" + typeFilter;
    }
    //relationship
    formItem = document.getElementById("select_relationship");
    var relFilter = (formItem && formItem.options)?formItem[formItem.selectedIndex].value:0;
    formItem = null;
    if(relFilter){
        resetParameter("selectedRelationship",relFilter);
        dirRelType += "&selectedRelationship=" + relFilter;
    }

    // Get the row being expanded or collapsed and toggle it's status
    display = (!display || display == "none") ? "block" : "none";
    nRow.setAttribute("display", display);

    // Check if row has already been expanded
    // if not then query server to get expanded nodes
    var expand = nRow.getAttribute("expand");
    var updateTableCache = "false";
    var toolbarData = "";

    if (editableTable.expandFilter || editableTable.customFilter){

        toolbarData = getToolbarData(editableTable.expandFilter);

        if (editableTable.expandFilter){

            expandLevel = getExpandFilterSelect().value;


            var expandedLevel = getExpandedLevel(nRow);

            var strID = nRow.getAttribute("id");
            if (display == "block" &&
                expandLevel != expandedLevel &&
                expandLevel + ',' + expandedLevel != "All,All")
            {
                expand = false;
                updateTableCache = "true";
            }
        }

        if ( (expand && toolbarData != globalStrData && display == "block")){
            expand = false;
            updateTableCache = "true";
        }

    if (!expand) {
            var childNodes = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@id ='" + strID + "']/r");
            for (var itr = 0; itr < childNodes.length; itr++){
                childNodes[itr].parentNode.removeChild(childNodes[itr]);
            }
        }
    }

    if(toolbarData == "") {
        toolbarData = "&toolbarData=";
    }


    if(display == "block"){
        globalStrData = toolbarData;
    }

    if (!expand) {

        //displayMask();
        var whereExp = "&levelId=" + rowId + dirRelType;
        bExpandOperation = true;
        var oLocalXML = null;
        //var requestMap = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='expandFilter']/text()");


            //displayMask();//addMask();
            oLocalXML = emxUICore.getXMLData("emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp +
                                    "&levelId=" + rowId + dirRelType + toolbarData+"|updateTableCache=" + updateTableCache+"&IsStructureCompare="+isStructureCompare);

            //ElapsedTimer.timeCheck("oLocalXML 1: " + emxUICore.selectNodes(oLocalXML, "/mxRoot/rows//r").length + " rows")

            if(editableTable.mode == "edit" && ((preProcessURL && preProcessURL !="") || (preProcessJPO && preProcessJPO !="")))
            {
                var action = processHookIn("pre", rowId);

                if (action.toLowerCase() == "stop") {
                    return;
                }

                    oLocalXML = emxUICore.getXMLDataPost("emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp +
                                                 "&levelId=" + rowId + dirRelType + toolbarData+"&IsStructureCompare="+isStructureCompare);
                    //ElapsedTimer.timeCheck("oLocalXML 2: " + emxUICore.selectNodes(oLocalXML, "/mxRoot/rows//r").length + " rows")
            }
            nRow.setAttribute("expandedLevels", expandLevel);
            setTimeout("finishLongOperation(true)", 10);

        if (oLocalXML ) {
                var aAllTempRows = emxUICore.selectNodes(oLocalXML, "/mxRoot/rows//r");
                //ElapsedTimer.timeCheck("counted sAllTempRows: " + aAllTempRows.length);
                for(var p=0;p<aAllTempRows.length;p++){
                    if(aAllTempRows[p].getAttribute("display")==null)
                        aAllTempRows[p].setAttribute("display","block");
                }

            var aAllRows = emxUICore.selectNodes(oLocalXML, "/mxRoot/rows/r");
            for (var i = 0; i < aAllRows.length; i++) {
                nRow.appendChild(aAllRows[i].cloneNode(true));
            }
            oLocalXML = null;

            //gqh: apply filter selections to newly expanded objects.
            applyExistingAutoFilterSelections();
        }

        nRow.setAttribute("expand", "true");
        /* Added for calc rows Feature */
        callToBuildColumValues("firstTime",true);
    }

    // As row has been expanded or collapsed, the display rows will change
    // so recalculate display rows again.
    aDisplayRows = getDisplayRows();
    totalRows = aDisplayRows.length;
    var nTotalRows = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name = 'total-rows']");
    emxUICore.setText(nTotalRows, totalRows);

    // redraw table and tree part
    /*369019*/

    if (!expand) {
        PreFetch(firstRow + scrollPageSize - 1);
    }
    if(isIE){
        setTimeout("rebuildView()",100);
    } else {
        //setTimeout("rebuildView()",100);
        if (editableTable.divTreeGraph.style.display == "none") {
            rebuildView();
        }

    }
    if (editableTable.divTreeGraph.style.display == "none") {
        doCheckSelectAll();
    }
    listHidden.document.location.href = "../common/emxMQLNoticeWrapper.jsp";
    turnOffProgress();
    if(portalMode == "true"){
        setTimeout("toggleProgress('hidden')", 100);
    }
    //ElapsedTimer.exit('toggle2' + " normal");
    var afterExpandJS = getParameter("afterExpandJS");
    if (!expand && afterExpandJS && afterExpandJS.length > 0) {
		eval(afterExpandJS + "('" + rowId + "')");
	}
    return(nRow);
}

/*
** Get window height
*/
function getWindowHeight(objWin) {
    objWin = (objWin == null ? window : objWin);
    if (isIE) {
        return objWin.document.body.clientHeight;
    } else {
        return objWin.innerHeight;
    }
}

/*
** Get window width
*/
function getWindowWidth(objWin) {
    objWin = (objWin == null ? window : objWin);
    if (isIE) {
        return objWin.document.body.clientWidth;
    } else {
        return objWin.innerWidth;
    }
}

/*
** route events that happen on the table to the correct handler
*/
function onListEvent() {
    var objEvent = eval(EVENT_OBJECT);
    if(isMoz)
    {
        // Prevent text selection etc. if mouse strays
        objEvent.preventDefault();
        objEvent.stopPropagation();
    }

    switch(objEvent.type) {
        // Column resize in action
        case "mousemove":
            if (objEvent.button == EVENT_LEFT_BUTTON) {
                switch(eval(EVENT_TARGET).tagName) {
                    case "TH":
                    case "TD":
                    case "A":
                        editableTable.handleColResize(objEvent);
                    break;
                    default:
                }
            }
        break;
        // column resize start
        case "mousedown":
            if (objEvent.button == EVENT_LEFT_BUTTON) {
                switch(eval(EVENT_CUR_TARGET).tagName) {
                    case "TH":
                    case "TD":
                        var tableName = ""+eval(EVENT_CUR_TARGET).parentNode.parentNode.parentNode.id;
                        editableTable.handleBeginColResize(objEvent, eval(EVENT_CUR_TARGET).cellIndex,tableName);
                        break;
                    default:
                }
            }
            break;
        // end of column resize
        case "mouseup":
            var currTarget = null;
            if(eval(EVENT_CUR_TARGET) != null && eval(EVENT_CUR_TARGET).tagName != null){
                currTarget = eval(EVENT_CUR_TARGET);
            }else if(objEvent.originalTarget != null && objEvent.originalTarget.tagName != null){
                currTarget = objEvent.originalTarget;
            }
            /*switch(currTarget.tagName) {
                case "TH":
                case "TD":*/

            if (objEvent.button == EVENT_LEFT_BUTTON) {
                editableTable.releaseMouse();
                editableTable.curCol = null;
                editableTable.mouseX = null;
                editableTable.colInResize = null;
            }
            bFullTreeDrawn = false;
            RefreshView();
            adjustTableHeight();
            editableTable.adjustTreeLastColumn();
            editableTable.adjustTableLastColumn();
            clearAndUpdateColMap(oXML);
            setLocalStorageforColumnwidth(editableTable.curColXML, editableTable.columnwidth);
            break;
    }
}

//variable indicates start of scroll
var bScrollStarted = false;
var nListBodyST = null;
/*
** The function to draw next or prev page on scrolling
*/
/*function scroll() {
    ////ElapsedTimer.enter();  noise...
    // Added for Bug Id- 348188
    if(currentFormfield || currentHiddenFormfield || currentFloatingDiv){
        removeCurrentFloatingDiv();
}
    // synchronize vpos of tree and list
    editableTable.divTreeBody.scrollTop  = editableTable.divListBody.scrollTop;

    var boolScroll = nListBodyST != editableTable.divListBody.scrollTop;
    nListBodyST = editableTable.divListBody.scrollTop;

    // adjust table head as per scroll
    editableTable.tblListHead.style.position="relative";
    editableTable.tblListHead.style.left = -editableTable.divListBody.scrollLeft+"px";
    editableTable.tblTreeHead.style.position="relative";
    editableTable.tblTreeHead.style.left = -editableTable.divTreeBody.scrollLeft+"px";

    ////ElapsedTimer.exit(boolScroll);
    return boolScroll;
}
*/

// adding if condition as $ function is present in emxTypeAhead.js also
/*if(!window.$) {
    function $(id) {
        return document.getElementById(id);
    }
}*/

function addHiddenTreeVScrollBar(phase) {
        setTimeout("adjustPanes()", 100);
}

var lastScrollTop = null;
function adjustPanes() {
    if(displayView != "detail") return;
    var newX = parseInt(jQuery('#mx_divGrabber').get(0).style.left);
        jQuery('#mx_divTree').get(0).style.width = newX /*+ scrollbarWidth*/ + 'px';
        jQuery('#mx_divTable').get(0).style.left = newX + jQuery('#mx_divGrabber').get(0).clientWidth + 'px';
        jQuery('#mx_divTreeHead').get(0).style.width = newX + 16 + 'px';
        jQuery('#mx_divTreeBody').get(0).style.width = newX + 16 + 'px';


   getTopWindow().setPersistenceData("FreezePaneWidth",newX , getTablename());
    editableTable.adjustTreeLastColumn();
    editableTable.adjustTableLastColumn();
    //FreezePaneUtils.adjustTableColumns();
    //synchTreeandTable();
    adjustTableHeight();
}



var resizeDelay = 200;
var resizeTimeout = null;
var isresized = false ;

function onResize() {
    var resizeObject = emxUICore.getEvent();
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    //scrollTimeout = setTimeout("thumbnailOnScrollTimeout()", resizeDelay );
    resizeTimeout = setTimeout("onResizeTimeout()", resizeDelay);
}

function onResizeTimeout() {

    var objWindowShade = getTopWindow().findFrame(getTopWindow(),'windowShadeFrame');
    var objFS =  (objWindowShade && objWindowShade.FullSearch) ? objWindowShade.FullSearch : getTopWindow().FullSearch;
    var objWin = objWindowShade ? objWindowShade : getTopWindow() ;
    if(objFS && objWin.jQuery("#searchPanel").is(':visible')){
        adjustSearchLeftPanelLayout(objWin);
    }

    //ElapsedTimer.reset('onResizeTimeout');
    //ElapsedTimer.enter('onResizeTimeout');
    setInitialHeight();

    // Get display window height
    windowSize = Math.ceil(editableTable.divListBody.clientHeight / rowHeight);

    // determine page size.
    pageSize = windowSize * pageFactor + 1;
    scrollPageSize = getPageSize();
    FreezePaneUtils.adjustTableColumns();
    isresized = true;
    rebuildView();
    //ElapsedTimer.exit('onResizeTimeout');
}

function sbToolbarResize(){
    if(editableTable.mode == "edit"){
        //Iterate through toolbars [Added to support Structure Browser - Edit Mode Toolbar]
        for(var toolbarIndex=0; toolbarIndex<toolbars.length; toolbarIndex++){
            var currentToolbar = toolbars[toolbarIndex];
            if(toolbarIndex == 2){
                continue;
            }else if(toolbarIndex !=0){
                //if Mode Setting is defined on first Toolbar,it is ignored .
                // Mode check for toolbars
                var currentToolbarMode = currentToolbar.getMode();
                if(currentToolbarMode == "view"){
                    // Hide the toolbar
                    var hiddenToolbar = getTopWindow().document.getElementById(currentToolbar.name);
                    hiddenToolbar.style.display = "none";
                    continue;
                }else if(currentToolbarMode == "edit"){
                    //show the toolbar
                    var hiddenToolbar = getTopWindow().document.getElementById(currentToolbar.name);
                    hiddenToolbar.style.display = "block";
                }
            }
            disableOrEnableToolbarItems(currentToolbar, "view", "edit", true);
        }

        var objEditIcon = findToolbarItem(objMainToolbar,"viewMode()");
        if(objEditIcon){
            if(objEditIcon.element){
                toggleEditButton(objEditIcon,"iconActionEdit","iconActionDisableEdit",emxUIConstants.STR_ENABLE_EDIT, emxUIConstants.STR_DISABLE_EDIT, emxUIConstants.STR_EDIT, emxUIConstants.STR_VIEW);
                objEditIcon.url = "javascript:void(viewMode())";
            }else{
                var objOverflowEditIcon = findOverflowItem(objMainToolbar,"viewMode()"); ;
                var objTR = objOverflowEditIcon.rowElement;
                var objDIV = objTR.firstChild;
                var objDIV1 = objTR.lastChild;
                // Replace the image name
                objDIV.innerHTML = objDIV.innerHTML.replace(/iconActionEdit/g, "iconActionDisableEdit");
                // replace the text
                objDIV1.innerHTML = objDIV1.innerHTML.replace(emxUIConstants.STR_ENABLE_EDIT, emxUIConstants.STR_DISABLE_EDIT);
                if(objEditIcon.element && objEditIcon.element.title) {
                    objEditIcon.element.title = emxUIConstants.STR_DISABLE_EDIT;
                }
                objEditIcon.url = "javascript:void(viewMode())";
                objOverflowEditIcon.url = "javascript:void(viewMode())";
            }
        }

        var filterDiv = document.getElementById("divFilter");
        if(filterDiv){
            filterDiv.style.display = "none";
        }

        var divPageFootButtons = document.getElementById("divPageFootButtons");
        if(divPageFootButtons){
            divPageFootButtons.style.display = "none";
        }
        var massUpdateDiv = document.getElementById("divMassUpdate");
        if(massUpdateDiv){
            massUpdateDiv.style.display = "block";
            if(isMoz){
                editableTable.divCenterDiv.style.display = "none";
                editableTable.divCenterDiv.style.display = "block";
                editableTable.divTreeHead.style.display = "none";
                editableTable.divTreeHead.style.display = "block";
            }
        }
    }else{
        //Iterate through toolbars [Added to support Structure Browser - Edit Mode Toolbar]
        for(var toolbarIndex=0; toolbarIndex<toolbars.length; toolbarIndex++){
            var currentToolbar = toolbars[toolbarIndex];
            if(toolbarIndex == 2){
                continue;
            }else if(toolbarIndex != 0){
                //if Mode Setting is defined on first toolbar,it is ignored .
                //Mode check for Toolbars
                var currentToolbarMode = currentToolbar.getMode();
                if(currentToolbarMode == "edit"){
                    //Hide the toolbar
                    var hiddenToolbar = getTopWindow().document.getElementById(currentToolbar.name);
                    hiddenToolbar.style.display = "none";
                    continue;
                }else if(currentToolbarMode == "view"){
                    //Show the toolbar
                    var hiddenToolbar = getTopWindow().document.getElementById(currentToolbar.name);
                    hiddenToolbar.style.display = "block";
                }
            }
            disableOrEnableToolbarItems(currentToolbar, "edit", "view", true);
        }

        var objEditIcon = findToolbarItem(objMainToolbar,"editMode()");

        if(objEditIcon){
            if(objEditIcon.element){
                toggleEditButton(objEditIcon,"iconActionDisableEdit","iconActionEdit",emxUIConstants.STR_DISABLE_EDIT,emxUIConstants.STR_ENABLE_EDIT,emxUIConstants.STR_VIEW,emxUIConstants.STR_EDIT);
                objEditIcon.url = "javascript:void(editMode())";
            }else{
                var objOverflowEditIcon = findOverflowItem(objMainToolbar,"editMode()"); ;

                var objTR = objOverflowEditIcon.rowElement;

                var objDIV = objTR.firstChild;
                var objDIV1 = objTR.lastChild;
                // Replace the image name
                objDIV.innerHTML = objDIV.innerHTML.replace(/iconActionDisableEdit/g, "iconActionEdit");
                // replace the text
                objDIV1.innerHTML = objDIV1.innerHTML.replace(emxUIConstants.STR_DISABLE_EDIT, emxUIConstants.STR_ENABLE_EDIT);
                if(objEditIcon.element && objEditIcon.element.title) {
                    objEditIcon.element.title = emxUIConstants.STR_ENABLE_EDIT;
                }
                objEditIcon.url = "javascript:void(editMode())";
                objOverflowEditIcon.url = "javascript:void(editMode())";
            }
        }
        var filterDiv = document.getElementById("divFilter");
            if(filterDiv){
                filterDiv.style.display = "block";
            }
            var divPageFootButtons = document.getElementById("divPageFootButtons");
            if(divPageFootButtons){
                divPageFootButtons.style.display = "block";
            }

            var massUpdateDiv = document.getElementById("divMassUpdate");
            if(massUpdateDiv && massUpdateDiv.style.display == 'block'){
                massUpdateDiv.style.display = "none";
                if(isMoz){
                    editableTable.divCenterDiv.style.display = "none";
                    editableTable.divCenterDiv.style.display = "block";
                    editableTable.divTreeHead.style.display = "none";
                    editableTable.divTreeHead.style.display = "block";
                }
            }
    }

    setFilterIconStatus();

    //first get it from localstorage if not found get it from url parameter
    var cellWrap = getParameter("cellwrap");
    if(emxUIConstants.STORAGE_SUPPORTED){
        var tablename = getTableNameFromXML();
        var storage = $.localStorage;
        cellWrap = storage.isEmpty('SB',tablename, 'cellwrap') ? cellWrap : storage.get('SB',tablename, 'cellwrap');
    }

    if(cellWrap == "true"){
        toggleWrapIcon("iconActionWordWrapOn","iconActionWordWrapOff",emxUIConstants.STR_WRAP,emxUIConstants.STR_UNWRAP);
    }else{
        toggleWrapIcon("iconActionWordWrapOff","iconActionWordWrapOn",emxUIConstants.STR_UNWRAP,emxUIConstants.STR_WRAP);
    }
}

var gblScrTop = 0;
var scrollDelay = 200;
var scrollTimeout = null;
var adjustTimeout = null;
var scrollObject = null;
//variable indicates start of scroll
var bScrollStarted = false;


function onScroll()
{
    bScrollStarted = true;

    if(currentFormfield && !isIE && !forTab){
        if(currentFormfield.onblur){
            currentFormfield.onblur();
        }
    }
    if(!forTab && (currentFormfield || currentHiddenFormfield || currentFloatingDiv)){
        setTimeout("removeCurrentFloatingDiv()",100);
    }
    var boolScroll = lastScrollTop != editableTable.divListBody.scrollTop;
    lastScrollTop = editableTable.divListBody.scrollTop;

    // synchronize vpos of tree and list
    // adjust table head as per scroll
    if (adjustTimeout) {
        clearTimeout(adjustTimeout);
    }
    var adjustDelay = null;
    if(isIE){
        adjustDelay = 1;
    }else{
        adjustDelay = 10;
    }
	   
    if (emxUICore.getEvent().target == editableTable.divListBody) {
        adjustTimeout = setTimeout("editableTable.divTreeBody.scrollTop = (editableTable.divListBody.scrollTop)",adjustDelay);  

        editableTable.tblListHead.style.position="relative";
        editableTable.tblListHead.style.left = -editableTable.divListBody.scrollLeft+"px";

    } else {
        adjustTimeout = setTimeout("editableTable.divListBody.scrollTop = (editableTable.divTreeBody.scrollTop)",adjustDelay);
        editableTable.tblTreeHead.style.position="relative";
        editableTable.tblTreeHead.style.left = -editableTable.divTreeBody.scrollLeft+"px";
    }

    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
	var bVerticalMove = (gblScrTop - editableTable.divListBody.scrollTop) != 0;
	if(bVerticalMove && (!bFullListDrawn || !bFullTreeDrawn)){
		if(portalMode == "true"){
            toggleProgress("visible");
        }else{
    	    turnOnProgress();
        }
	}
	scrollTimeout = setTimeout(function(){onScrollTimeout(bVerticalMove)}, scrollDelay);
	//scrollTimeout = setTimeout(function(){onScrollTimeout(bVerticalMove)}, 50);
    //scrollTimeout = setTimeout("onScrollTimeout()", scrollDelay /*lastPreFetchPos < 0 ? 1 : scrollDelay*/);
    }

//function to trigger a event
function trigger(evt, args, e, fnCallback) {
    e = e || emxUICore.getEvent();
    args = args || {};
    return notify(args, e, self,fnCallback);
}

function notify(args, e, scope,fnCallback) {
    e = e || emxUICore.getEvent();
    scope = scope || this;
    return fnCallback.call(scope, e, args);
}

function onScrollTimeout(){
var time0 = new Date();
    // GetNextPage if there was any vertical movement
    var bVerticalMove = (gblScrTop - editableTable.divListBody.scrollTop) != 0;
	var bottomhiddenHgt = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name = 'bottomhiddenHeight']");
    if (bVerticalMove) {
          if ((!bFullListDrawn || !bFullTreeDrawn ) && ((emxUICore.getText(bottomhiddenHgt)!= "0")||(editableTable.divListBody.offsetHeight + editableTable.divListBody.scrollTop <=editableTable.divListBody.scrollHeight)) ) {
            GetNextPage();
        } else {
            if(editableTable.divTreeBody.firstChild.offsetHeight != editableTable.divListBody.firstChild.offsetHeight){
                //bFullTreeDrawn = false;
                RefreshViewScroll();
            }
            else{
                changeHeightSettings(true);
                bScrollStarted = false;
            }

        }
    }
	/*********************************************
	* Start for performance 20170228
	*********************************************/	
    //changeHeightSettings(true);
	/*********************************************
	* End for performance 20170228
	*********************************************/
    doCheckSelectAll();
    adjustTableHeight();
    forTab = false;

    //if findin active then do find in after scroll
    if((!bFullListDrawn || !bFullTreeDrawn) && emxEditableTable.findInCntrl && emxEditableTable.findInCntrl.isActive()) {
		emxEditableTable.findInCntrl.highlightResults();
	}
var time1 = new Date();
console.log(">>>onScrollTimeout="+(time1-time0) + "(" + (time1-time0) + ")");
}

function adjustAfterWrap(){
    var wrapTemp = wrapTemp? wrapTemp : 0;
     if(!isIE && wrapTemp == 1){
                for(var i =1; i < editableTable.tblListBody.rows.length; i++){
                    var listsideid = editableTable.tblListBody.rows[i].id;

                    var tempHeight = editableTable.rowhgt;
                    tempHeight = editableTable.tblListBody.rows[i].clientHeight;
                    if(tempHeight < editableTable.rowhgt){
                        tempHeight = editableTable.rowhgt;
                        editableTable.tblListBody.rows[i].height = editableTable.rowhgt;
                    }
                    var nRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + listsideid + "']");
                    if(nRow){
                        nRow.setAttribute("height", tempHeight);
            }
            }
                if(bFullListDrawn && bFullTreeDrawn){
                    aDisplayRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[(@level = '0' or count(ancestor::r[not(@display) or @display = 'none']) = '0')]");
                    DrawCompleteTree(aDisplayRows);
        }
                wrapTemp = 0;
    }
}

/*
** This function resets current column as unselected
*/
function resetSelectedColumn(currentCell){
    try {
        var selectedColumn = getSelectedColumn(currentCell);

        // set class from current column header
        var curheadclass = selectedColumn.className;
        curheadclass = curheadclass.replace(/\mx_current/g,'');
        selectedColumn.className = curheadclass;
    }catch(e){
        //do nothing
    }
}

function setSelectedColumn(currentCell)
{
    var selectedColumn = getSelectedColumn(currentCell);

    //set class from current cell
    /*var curclass = currentCell.target.className;
    currentCell.target.className = curclass + " mx_current";*/

    //set class from current column header
    var curheadclass = selectedColumn.className;
    if(curheadclass.indexOf('mx_required') == -1){
        selectedColumn.className = curheadclass + " mx_current";
                        }
                    }

function getSelectedColumn(){
    var rowNumber = currentCell.target.getAttribute("rowNumber");
    var tHead = null;
    if(isIE)
        editableTable.initDomVars();
    var diffMergedCell = hasMergedCells && rowNumber == 1 ? 1 : 0;
    if (currentCell.tableName == "bodyTable"){
        tHead = editableTable.tblListHead;
                    }
    if (currentCell.tableName == "treeBodyTable"){
        tHead = editableTable.tblTreeHead;
    }
    var theadLen = tHead.rows.length-diffMergedCell;
    return tHead.rows[theadLen-1].cells[currentCell.cellIndex * 2];
}

function editableCellsPresent(){
    var tblRows;
    var tblCols;
    if(arguments[0] == "tree"){
        tblRows = editableTable.tblTreeBody.rows;
    }else{
        tblRows = editableTable.tblListBody.rows;
    }
    for(var row=0; row<tblRows.length; row++){
        tblCols = tblRows[row].cells;
        for(var i=0; i<tblCols.length; i++){
            var cell = tblRows[row].cells[i];
            if(cell != null && cell.className.indexOf("mx_editable") != -1){
                return true;
            }
        }
    }
    return false;
}

function getCurrentSide()
{
    var tblBody = null;
    if(currentCell != null)
    {
        try{
        if(currentCell.target.parentNode.parentNode.parentNode.id == "treeBodyTable"){
            tblBody = editableTable.tblTreeBody;
        }else{
            tblBody = editableTable.tblListBody;
        }
        }catch(e){
            //TODO do it in a cleaner way
        }
    }

    return tblBody;
}
function isTypeAheadFound(){
    var typeAheadFirstChild=typeAheadDivGlobal.firstChild;
    if(typeAheadFirstChild==null || !typeAheadFirstChild.hasChildNodes()){
        return false;
    }
    if(jQuery(typeAheadFirstChild).find('table').children().length>0){
        if(!jQuery('#type_ahead').is(':visible')){
            return false;
        }
        return true;
    }
    return false;
}
function dispatchKeyEvent() {
    var objEvent = emxUICore.getEvent();
    currentCell.prvsTableName = currentCell.tableName;
    var tblBody;
    if(currentCell.target.parentNode == null) return;
    if (currentCell.target.parentNode.parentNode.parentNode.id == "treeBodyTable") {
        tblBody = editableTable.tblTreeBody;
    } else {
        tblBody = editableTable.tblListBody;
    }

    switch (objEvent.keyCode) {
        case 9: // TAB
            navRightLeftCell(objEvent, tblBody, objEvent.shiftKey);
            break;

        case 13: // ENTER
            if(objEvent.currentTarget.active){
                return;
            }
            justNavigating  = objEvent.target.tagName.toLowerCase() == "select";
            objEvent.preventDefault();
            objEvent.stopPropagation();
			if(!isTypeAheadFound()){
                upDownArrowKeyCell(tblBody, objEvent.keyCode == 38);
            }
            forTab  = true;
            break;

        case 37: // LEFT
            if(objEvent.target.active){
                return;
            }
            justNavigating  = objEvent.target.tagName.toLowerCase() == "select";
            navRightLeftCell(objEvent, tblBody, true);
            break;

        case 39: // RIGHT
            if(objEvent.currentTarget.active){
                return;
            }
            justNavigating  = objEvent.currentTarget.tagName.toLowerCase() == "select";
            navRightLeftCell(objEvent, tblBody, false);
            break;
        case 38: // UP
        case 40: // DOWN
            if(objEvent.currentTarget.active){
                return;
            }
            justNavigating  = objEvent.target.tagName.toLowerCase() == "select";
            objEvent.preventDefault();
            objEvent.stopPropagation();
			if(!(jQuery("#"+typeAheadDivGlobal.id).is(':visible'))){
				upDownArrowKeyCell(tblBody, objEvent.keyCode == 38);
			}
            if(!(typeAheadDivGlobal && typeAheadDivGlobal.hasChildNodes())){
                upDownArrowKeyCell(tblBody, objEvent.keyCode == 38);
            }
            forTab  = true;
            break;
        case 27: // ESC
            if (currentCell.target.parentNode) {
                //remove the floating formfield
                objEvent.preventDefault();
                objEvent.stopPropagation();
                //objEvent.target.parentNode.removeChild(objEvent.target);
                removeCurrentFloatingDiv();
            }
            break;
        default: //Any other key
               if(objEvent.target != null && objEvent.target.type == "textarea"){
                objEvent.target.active=true;
               }
    }
}

function navRightLeftCell(evt, objElem, blnGoLeft){
    evt.preventDefault();
    evt.stopPropagation();
    if(isIE){//ie can't pass events in timeouts
        tabCell(objElem, blnGoLeft);
    }else{//ff needs small timeout
        setTimeout(function(){ tabCell(objElem, blnGoLeft);},10);
    }
    forTab  = true;
}

function tabCell(tblBody, isShift){
    currentCell.prvsTableName = currentCell.tableName;

        var tempRowIndex = currentCell.target.parentNode.rowIndex;
        var tempColIndex = currentCell.cellIndex;

        var nr = -1;
        var nc = -1;
        var c;
        var rLen = tblBody.rows.length;
        var cLen = tblBody.rows[0].cells.length;


            updateText(currentCell.target, currentFormfield,currentCell.target.parentNode.id);

        //fix for row becomming zero after updateText method.
        if(tblBody.id == "treeBodyTable"){
            tblBody = editableTable.tblTreeBody;
        }else{
            tblBody = editableTable.tblListBody;
        }
        //fix end
        if(isShift){
            tempColIndex-=1;

            if(currentCell.tableName == "bodyTable"){
                for(;tempRowIndex > 0; tempRowIndex--){
                    var chngedTbl = false;
                    for(;tempColIndex >= -2; tempColIndex-=1){
                        if(!chngedTbl && tempColIndex < 0 && editableCellsPresent("tree")){
                            tblBody = editableTable.tblTreeBody;
                            currentCell.tableName = "treeBodyTable";
                            cLen = tblBody.rows[0].cells.length;
                            tempColIndex = cLen;
                            chngedTbl = true;
                        }
                        if(tempColIndex > -1 && tempRowIndex > -1){
                            c = tblBody.rows[tempRowIndex].cells[tempColIndex];
                        }
                        if(c != null && c.className.indexOf("mx_editable") != -1){
                            nr = tempRowIndex;
                            nc = tempColIndex;
                            currentCell.cellIndex = tempColIndex;
                            break;
                        }
                        if(tempRowIndex == 1 && tempColIndex == -2){
                            switch (currentCell.tableName) {
                            case "treeBodyTable":
                                if(editableCellsPresent()){
                                    tblBody = editableTable.tblListBody;
                                    currentCell.tableName = "bodyTable";
                                    tempRowIndex = rLen;
                                    cLen = tblBody.rows[0].cells.length;
                                }
                                break;

                            default:
                                if(editableCellsPresent("tree")){
                                    tblBody = editableTable.tblTreeBody;
                                    currentCell.tableName = "treeBodyTable";
                                    if(tempRowIndex+1 == rLen){
                                        cLen = tblBody.rows[0].cells.length;
                                        tempRowIndex = 0;
                                    }
                                }else{
                                    tempRowIndex = rLen-1;
                                    tempColIndex = tblBody.rows[0].cells.length+1;
                                }
                                break;
                            }
                        }
                    }

                    if(nr != -1)
                        break;

                    tempColIndex = cLen;
                }
            }
            if(currentCell.tableName == "treeBodyTable"){
                for(;tempRowIndex > 0; tempRowIndex--){
                    var chngedTbl = false;
                    for(;tempColIndex >= -2; tempColIndex-=1){
                        if(!chngedTbl && tempColIndex < 0 && editableCellsPresent()){
                            tblBody = editableTable.tblListBody;
                            currentCell.tableName = "bodyTable";
                            cLen = tblBody.rows[0].cells.length;
                            tempColIndex = cLen;
                            tempRowIndex--;
                            chngedTbl = true;
                        }
                        if(tempColIndex > -1 && tempRowIndex > -1){
                            c = tblBody.rows[tempRowIndex].cells[tempColIndex];
                        }
                        if(c != null && c.className.indexOf("mx_editable") != -1){
                            nr = tempRowIndex;
                            nc = tempColIndex;
                            currentCell.cellIndex = tempColIndex;
                            break;
                        }
                    }

                    if(nr != -1)
                        break;

                    tempColIndex = cLen;
                    if(tempRowIndex == 0){
                        tempRowIndex = tblBody.rows.length;
                    }
                }
            }
        } else {
        tempColIndex+=1;

        if(currentCell.tableName == "treeBodyTable" && editableCellsPresent() &&
            (currentCell.position >= splitPos || tempColIndex == splitPos)){

            tblBody = editableTable.tblListBody;
            currentCell.tableName = "bodyTable";
            tempColIndex = 0;
            cLen = tblBody.rows[0].cells.length;
        }

        for(;tempRowIndex < rLen; tempRowIndex++){
            for(;tempColIndex <= cLen; tempColIndex+=1){
                c = tblBody.rows[tempRowIndex].cells[tempColIndex];
                if(c != null && c.className.indexOf("mx_editable") != -1){
                    nr = tempRowIndex;
                    nc = tempColIndex;
                    break;
                }
            }

            if(nr != -1)
                break;

            if((cLen + 1) == tempColIndex){
                tempColIndex = 0;
                switch (currentCell.tableName) {
                case "treeBodyTable":
                    if(editableCellsPresent()){
                        tblBody = editableTable.tblListBody;
                        currentCell.tableName = "bodyTable";
                        tempRowIndex--;
                    }
                    break;

                default:
                    if(editableCellsPresent("tree")){
                        tblBody = editableTable.tblTreeBody;
                        currentCell.tableName = "treeBodyTable";
                        if(tempRowIndex+1 == rLen){
                            cLen = tblBody.rows[0].cells.length;
                            tempRowIndex = 0;
                        }
                    }else{
                        if(tempRowIndex+1 == rLen){
                            tempRowIndex = 0;
                        }
                    }
                    break;
                }

            }
        }
    }

    if(nr != -1){
        forTab = true;
        getCell(nr, nc);
    }
}

function upDownArrowKeyCell(tblBody, isUp){
    currentCell.prvsTableName = currentCell.tableName;

        var tempRowIndex = currentCell.target.parentNode.rowIndex;
        var tempColIndex = currentCell.cellIndex;
        var nr = -1;
        var nc = -1;
        var c;
        var rLen = tblBody.rows.length;
        var cLen = tblBody.rows[0].cells.length;
        updateText(currentCell.target, currentFormfield, currentCell.target.parentNode.id);

        //fix for row becomming zero after updateText method.
        if(tblBody.id == "treeBodyTable"){
            tblBody = editableTable.tblTreeBody;
        }else{
            tblBody = editableTable.tblListBody;
        }
        //fix end
    if (isUp) {
            tempRowIndex--;

        for (; tempColIndex >= -1; tempColIndex -= 1) {
                if(currentCell.tableName == "bodyTable" && tempColIndex < 0){
                    tblBody = editableTable.tblTreeBody;
                    currentCell.tableName = "treeBodyTable";
                    tempColIndex = tblBody.rows[0].cells.length + 1;
                }
                if(currentCell.tableName == "treeBodyTable" && tempColIndex < 0){
                    tblBody = editableTable.tblListBody;
                    currentCell.tableName = "bodyTable";
                    tempColIndex = tblBody.rows[0].cells.length + 2;
                }
                for(;tempRowIndex > 0; tempRowIndex--){
                    c = tblBody.rows[tempRowIndex].cells[tempColIndex];
                    if(c != null && c.className.indexOf("mx_editable") != -1){
                        nr = tempRowIndex;
                        nc = tempColIndex;
                        currentCell.cellIndex = tempColIndex;
                        break;
                    }
                }

                if(nr != -1)
                    break;

                tempRowIndex = rLen-1;
            }
        } else {
            tempRowIndex++;

            for(;tempColIndex < cLen; tempColIndex+=1){
                for(;tempRowIndex < rLen; tempRowIndex++){
                    c = tblBody.rows[tempRowIndex].cells[tempColIndex];
                    if(c != null && c.className.indexOf("mx_editable") != -1){
                        nr = tempRowIndex;
                        nc = tempColIndex;
                        currentCell.cellIndex = tempColIndex;
                        currentCell.position = new Number(c.getAttribute('position'));
                        break;
                    }
                }

                if(nr != -1)
                    break;


                if(currentCell.tableName == "treeBodyTable" && editableCellsPresent() && (tempColIndex+1) >= cLen){
                    tblBody = editableTable.tblListBody;
                    currentCell.tableName = "bodyTable";
                    tempColIndex = -1;
                    cLen = tblBody.rows[0].cells.length;
                }

                if(currentCell.tableName == "bodyTable" && tempRowIndex == rLen && (tempColIndex+1) >= cLen){
                    tblBody = editableTable.tblTreeBody;
                    currentCell.tableName = "treeBodyTable";
                    tempColIndex = -1;
                    cLen = tblBody.rows[0].cells.length;
                }

                tempRowIndex = 1;
            }
        }

        if(nr != -1){
            forTab  = true;
            getCell(nr, nc);
    }
}

/*
** This function pops up input HTML comtrol
** on the cells that are editable
*/
function getCell(){
    // Only in edit mode

    if(editableTable.mode != "edit"){
        return;
    }

    // remove any popup input fields if they exists
    if( currentFormfield || currentHiddenFormfield || currentFloatingDiv){
        removeCurrentFloatingDiv();
    }

    // Get the event
    var objEvent = null;
    var targetNode;
    var fromTypeAhead = false;

    if(arguments.length >=2 && arguments[0] != -1 && arguments[1] != -1){
        if(arguments.length == 3 & arguments[2] == true){
            fromTypeAhead = true;
        }
      var tblBody = (currentCell.tableName == "bodyTable")? editableTable.tblListBody : editableTable.tblTreeBody;
      targetNode = tblBody.rows[arguments[0]].cells[arguments[1]];
    } else {
        objEvent = emxUICore.getEvent();
      targetNode = objEvent.target;
    }

    // Get target name
    var targetName = targetNode.tagName.toLowerCase();
    if(emxUIRTE.RTE_TAGS.find(targetName) != -1){
        do{
        targetNode = targetNode.parentNode;
        targetName = targetNode.tagName.toLowerCase();
        }while(targetName != "td");
    }

    // added for first column editing

    if(targetName == "div" && targetNode.offsetParent.offsetParent.id == "treeBodyTable")
    {
       targetNode = targetNode.offsetParent;
    }

    if( (targetName == "th" || targetName == "td") && targetNode.offsetParent.offsetParent.offsetParent.id == "treeBodyTable")
    {
        targetNode = targetNode.offsetParent.offsetParent;
    }

    // end

    //test if this td is editable
    if(targetNode.className.indexOf("mx_editable") == -1){
        return;
    }
    if(targetName == "td" || targetName == "a" || targetName == "th" ||targetName=="div") {
        // if target is anchor then default the event
        if(targetName == "a"){
            objEvent.preventDefault();
        }

        //if target is <a> use the parent
        /*var targetNode = (targetName == "a")?objEvent.target.parentNode:objEvent.target;
        //test if this td is editable
        if(targetNode.className.indexOf("mx_editable") == -1){
            return;
        }*/

        /* IR-077746V6R2012 */
        /*
        if (isIE)
        {
            editableTable.mxDivTable.style.width="100%";
        }
        */
        if(currentCell.target != null){
            /*var tblToReset = currentCell.tableName;
            if(currentCell.prvsTableName && currentCell.prvsTableName != currentCell.tableName && objEvent.type != "click"){
                tblToReset = currentCell.prvsTableName;
            }
            resetSelectedColumn(tblToReset);*/
            resetSelectedColumn(currentCell);
        }
        //store currentNode
        currentCell.target = targetNode;
        currentCell.tableName = targetNode.offsetParent.id;
        currentCell.cellIndex = targetNode.cellIndex;
        currentCell.position = new Number(targetNode.getAttribute('position'));
        currrentSelectedColumn = targetNode.cellIndex;
        setSelectedColumn(currentCell);

        //store currentRow and column position
        var rowId = targetNode.parentNode.getAttribute("id");
        if(rowId=="" || rowId == null){
            return;
        }
        currentRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + rowId + "']");
        currentColumnPosition = targetNode.getAttribute("position");
       //added to restrict the user to edit the basic attributes on newly added row
       /*if(targetNode.className.indexOf("mx_editable-add") != -1){
            var columnInfo = emxUICore.selectSingleNode(oXML,"/mxRoot/columns")
            var columnChilds = columnInfo.childNodes;
            var columnType = columnChilds[currentColumnPosition-1].getAttribute("type");
                if(columnType == "businessobject"){
                    alert(emxUIConstants.STR_SBEDIT_NO_EDIT_OF_BASIC_NEWROW);
                    return;
                }

        }*/
        var selectedColumn  = null;
        var objColumn       = null;
        var inputType       = null;
        var rowNumber = targetNode.getAttribute("rowNumber");
//        var diffMergedCell = 0;
//        if(hasMergedCells){
//            diffMergedCell = 2;
//            if(rowNumber == 2){
//                diffMergedCell = 1;
//            }
//        }else{
//            diffMergedCell = 1;
//        }
        var diffMergedCell = hasMergedCells && rowNumber == 1 ? 1 : 0;

        if(targetNode.parentNode.parentNode.parentNode.id == "bodyTable"){
            var theadLen = editableTable.tblListHead.rows.length-diffMergedCell;
            selectedColumn = editableTable.tblListHead.rows[theadLen-1].cells[targetNode.cellIndex * 2];
        }else{
            var theadLen = editableTable.tblTreeHead.rows.length-diffMergedCell;
            selectedColumn = editableTable.tblTreeHead.rows[theadLen-1].cells[targetNode.cellIndex  * 2];
            }
        var onFocusHandler = null;
        if(selectedColumn.id.length > 0){
            objColumn = colMap.getColumnByName(selectedColumn.id);
            var status = currentRow.getAttribute("status");
            if(status == "new")
            {
                inputType = objColumn.getSetting("Add Input Type");
            }else if(status == "lookup")
            {
                inputType = objColumn.getSetting("Lookup Input Type");
            }
            if(inputType == null || inputType.length < 1)
            {
                inputType = objColumn.getSetting("Input Type");
            }

            onFocusHandler = objColumn.getSetting("OnFocus Handler");
        }
         //Added for onFocusHandler
        //Not to fire onFocus handler immediately after selecting a value from type ahead
         if(onFocusHandler && onFocusHandler.length > 0 && fromTypeAhead != true){
            var aOnFocusHandler =onFocusHandler.split(":");
            reloadCellType.push({Type :"onFocus",Target :objColumn.name});
            for(var k=0;k<aOnFocusHandler.length;k++){
                eval(aOnFocusHandler[k] + "('"+ rowId +"','"+ objColumn.name + "')");
            }
            reloadCellType.pop();
            inputType = objColumn.getSetting("Input Type");
        }

        //test for valid InputType
        if(inputType == null || inputType.length < 1){
            //commented for SB Inline Data Entry
            inputType = "textbox";
            //alert("invalid Input Type");
            //return;
        }
        //create floating div
        var name = "formfield" + new Date().getTime();

        var uomAssociated = objColumn.getSetting("UOMAssociated");
        if (uomAssociated != null && uomAssociated != undefined && uomAssociated.toLowerCase() == "true")
        {
            inputType = "dimension";
        }
        var value;
        if(isDynamicURLEnabled(objColumn) || ("program"==objColumn.type) || isInlineRow(currentRow)) {
            var objDOM = emxUICore.createXMLDOM();
            objDOM.loadXML(emxUICore.selectSingleNode(currentRow, "c[" + objColumn.index + "]").xml);
            var cNode = emxUICore.selectSingleNode(objDOM, "/c/text()");
            if(cNode) {
                value = cNode.nodeValue;
            }
        }
        var inputControlDirection = objColumn.getSetting('Input Control Direction');//Added BUG 365696
        var formfield  = getField(targetNode, inputType, objColumn, value, rowId);
        formfield.name = name;
        currentFormfield = formfield;
        if(currentFormfield != null){
            //add keyboard navigation
            attachEventHandler(currentFormfield, "keydown", dispatchKeyEvent);
            //we need to know whether the arrow keys are navigating the form
            //or the text within a field
            attachEventHandler(currentFormfield, "click", function(){if(currentFormfield != null){currentFormfield.active=true;}});
        }

        var floatingDiv = document.createElement("div");
        floatingDiv.name = "floatingDiv";
        floatingDiv.className = "formLayer";
        document.forms[0].appendChild(floatingDiv);
        document.forms[0].elements[name] = formfield;
        var cX = targetNode.offsetLeft;
        cX += targetNode.offsetParent.offsetLeft;
        cX += targetNode.offsetParent.offsetParent.offsetLeft;
        cX += targetNode.offsetParent.offsetParent.offsetParent.offsetLeft;
        cX += targetNode.offsetParent.offsetParent.offsetParent.offsetParent.offsetLeft;
        if( currentCell.position =="1")
            cX += 10 ;
        var scrollX = targetNode.offsetParent.offsetParent.scrollLeft;
        var cY = targetNode.offsetTop;
        cY += targetNode.offsetParent.offsetTop;
        cY += targetNode.offsetParent.offsetParent.offsetTop;
        cY += targetNode.offsetParent.offsetParent.offsetParent.offsetTop;
        cY += targetNode.offsetParent.offsetParent.offsetParent.offsetParent.offsetTop;
        var scrollY = targetNode.offsetParent.offsetParent.scrollTop;
        floatingDiv.style.visibility = "visible";
        floatingDiv.appendChild(formfield);
        /* added for tabbing feature */
    if(arguments.length == 2 ){
        var fieldWidth = formfield.offsetWidth;
        var fieldHeight = formfield.offsetHeight;
        var endOfFieldX = cX + fieldWidth;
        var endOfFieldY = cY + fieldHeight;
        var frameWidth = targetNode.offsetParent.offsetParent.offsetParent.clientWidth+targetNode.offsetParent.offsetParent.offsetParent.offsetLeft;
        if(isMoz)
        {
          frameWidth -= (targetNode.offsetParent.offsetParent.offsetWidth - targetNode.offsetParent.offsetParent.clientWidth);
        }
        var frameHeight = targetNode.offsetParent.offsetParent.offsetParent.clientHeight+targetNode.offsetParent.offsetParent.offsetParent.offsetTop;

        if(isMoz)
        {
          frameHeight -= (targetNode.offsetParent.offsetParent.offsetHeight - targetNode.offsetParent.offsetParent.clientHeight);
        }

        if((frameWidth + scrollX) < endOfFieldX)
        {
          //scrollX = targetNode.offsetParent.offsetParent.scrollLeft + (endOfFieldX - (frameWidth + targetNode.offsetParent.offsetParent.scrollLeft));
          //targetNode.offsetParent.offsetParent.scrollLeft = scrollX;
          var tempscrollX = targetNode.offsetParent.offsetParent.scrollLeft + (endOfFieldX - (frameWidth + targetNode.offsetParent.offsetParent.scrollLeft));
          targetNode.offsetParent.offsetParent.scrollLeft = tempscrollX;

        } else if(scrollX > targetNode.offsetLeft) {
          //scrollX = targetNode.offsetParent.offsetParent.scrollLeft - (scrollX-targetNode.offsetLeft);
          //targetNode.offsetParent.offsetParent.scrollLeft = scrollX;
          var tempscrollX = targetNode.offsetParent.offsetParent.scrollLeft - (scrollX-targetNode.offsetLeft);
          targetNode.offsetParent.offsetParent.scrollLeft = tempscrollX;

        }

        if((frameHeight + scrollY) < endOfFieldY)
        {
            //scrollY = targetNode.offsetParent.offsetParent.scrollTop + (endOfFieldY - (frameHeight + targetNode.offsetParent.offsetParent.scrollTop));
            //targetNode.offsetParent.offsetParent.scrollTop = scrollY;
            var tempscrollY = targetNode.offsetParent.offsetParent.scrollTop + (endOfFieldY - (frameHeight + targetNode.offsetParent.offsetParent.scrollTop));
            targetNode.offsetParent.offsetParent.scrollTop = tempscrollY;

        } else if(scrollY > targetNode.offsetTop) {
          //scrollY = targetNode.offsetParent.offsetParent.scrollTop - (scrollY-targetNode.offsetTop);
          //targetNode.offsetParent.offsetParent.scrollTop = scrollY;
          var tempscrollY = targetNode.offsetParent.offsetParent.scrollTop - (scrollY-targetNode.offsetTop);
          targetNode.offsetParent.offsetParent.scrollTop = tempscrollY;
        }
        //recalculate the scroll positions after changing the scroll bar
        scrollX = targetNode.offsetParent.offsetParent.scrollLeft;
        scrollY = targetNode.offsetParent.offsetParent.scrollTop;
     }
        /* Added for Additional Edit Controls */
        if(inputType == "boolean"){
            cX += 25;
            cY += 8;
        }

        floatingDiv.style.left = (cX-scrollX)+"px";
        floatingDiv.style.top = (cY-scrollY)+"px";

        //START BUG 365696
        var boxHeight = (emxUICore.getWindowHeight(getTopWindow())-cY+scrollY);
        var boxWidth = (emxUICore.getWindowWidth(getTopWindow())-cX+scrollX);
        if (boxHeight<300){
            boxHeight = 300;
        }
        if (boxWidth<300){
            boxWidth = 300
        }
        if ((inputType == "radiobutton" || inputType == "checkbox") && inputControlDirection != "horizontal"){
            floatingDiv.style.overflow = "auto";
            if(formfield != null && formfield.scrollHeight > boxHeight)
            {
                floatingDiv.style.height = (boxHeight-50) +"px";
            }
            currentFloatingDiv = floatingDiv;
        }
        else if ((inputType == "radiobutton" || inputType == "checkbox") && inputControlDirection == "horizontal"){
            floatingDiv.style.overflow = "auto";
            if(formfield != null && formfield.scrollWidth > boxWidth)
            {
                floatingDiv.style.width = (boxWidth-200) + "px";
            }
            currentFloatingDiv = floatingDiv;
            //floatingDiv.style.height = 100 +"px";
        }
        else if(inputType == "combobox" ){
            //IR-083625V6R2012
            //floatingDiv.style.overflow = "auto";
            //floatingDiv.style.height = (boxHeight-50) +"px";
            currentFloatingDiv = floatingDiv;
        }
        //END BUG 365696

        if (inputType == "dimension")
        {
            currentFormfield = formfield;
            currentFloatingDiv = floatingDiv;
        }

        if (inputType == "textarea" && currentFormfield.className == "rte"){
            var arr = jQuery('.rte').rte({
                css: ['../common/styles/emxUIDefault.css'],
                controls_rte: rte_toolbar,
                controls_html: html_toolbar,
                ok_cancel: true,
                callback: function(){
                    var self = this;
                    self.update_hidden_field();
                    updateText(targetNode, self.textarea, rowId);
                    jQuery('.formLayer').remove();
                }
            });
            currentFloatingDiv = jQuery('.formLayer').get(0);
            }
        if((floatingDiv.offsetHeight + floatingDiv.offsetTop) > getWindowHeight()){
             var floatingDivPos = getWindowHeight() - floatingDiv.offsetHeight - jQuery("#divPageFoot").height();
             floatingDiv.style.top = floatingDivPos +"px";
         }
         if(floatingDiv.offsetTop <  editableTable.divCenterDiv.offsetTop){
             floatingDiv.style.top = editableTable.divCenterDiv.offsetTop + "px";
         }
         if((floatingDiv.offsetWidth + floatingDiv.offsetLeft) > getWindowWidth()){
             var floatingDivPos = getWindowWidth() - floatingDiv.offsetWidth;
             floatingDiv.style.left = floatingDivPos > 0 ? floatingDivPos +"px" : 0 +"px";
         }
        //enable spell checker in textarea and RTE
        enableSpellChecker();

        //create the hidden field for <name>_msvalue
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type","hidden");

        //JOE - BEGIN (Fix for IR-117673V6R2012x)
        var rowObjectId = targetNode.parentNode.getAttribute("o");
        var rowRelId = targetNode.parentNode.getAttribute("r");
        if(rowObjectId != null){
            hiddenField.setAttribute("rowObjectId",rowObjectId);
        }

        if(rowRelId != null){
            hiddenField.setAttribute("rowRelId",rowRelId);
        }
        //JOE - END

        //add date picker if column is a date
        if(objColumn.getSetting("format").toLowerCase() == "date"){
            //set to readonly
            if(objColumn.getSetting("Allow Manual Edit") == null ||
                objColumn.getSetting("Allow Manual Edit").toLowerCase() != "true"){
                if (isIE) {
                    formfield.readOnly = "readOnly";
                }
                else {
                formfield.setAttribute("readonly","readonly");
                }
                addClass(formfield.parentNode, "disabled");
            }
            //name and register the hidden field
            hiddenField.name = name + "_msvalue";
            document.forms[0].appendChild(hiddenField);
            if(isIE){
                try {
                     document.forms[0].elements[name + "_msvalue"] = hiddenField;
                }catch(e){

                }

            }else{
                document.forms[0].elements[name + "_msvalue"] = hiddenField;
            }
            var anchor = document.createElement("a");
            /*
            showCalendar will take inputTime parameter to set the selected item in the calendar.
            The actual date value is read from the xml and passed to showCalendar method
            Start
            */
            var inputObj = emxUICore.selectSingleNode(currentRow, "c[" + objColumn.index + "]");
            var inputTime = "";
            if (inputObj) {

                //367300
                var status = inputObj.getAttribute("edited");

                if(status == "true")
                {
                    inputTime =  inputObj.getAttribute("msValueNew");
                }else
                {
                    inputTime =  inputObj.getAttribute("msValue");
                }

                if (inputTime!= null && inputTime != "") {
                    inputTime = new Number(inputTime);
                    var dateObj = new Date(inputTime);

                    var month = dateObj.getMonth() + 1;
                    var day = dateObj.getDate();
                    var year = dateObj.getFullYear();
                    var hours = dateObj.getHours();
                    var minutes = dateObj.getMinutes();
                    var seconds = dateObj.getSeconds();

                    var ampm = "AM";
                    if(new Number(hours) > 11 && new Number(hours) != 12){
                        hours = hours - 12;
                        ampm = "PM";
                    }
                    inputTime = month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds + " " + ampm;
                }
            }
            inputObj = null;
            /* End */

//!Added:For Enhanced Calendar Control:AEF:nr2:20-11-09
           var oid = targetNode.parentNode.getAttribute("o");
           var relId = targetNode.parentNode.getAttribute("r");
           var my_JSONStr = "{\"CalendarProgram\"" + ":" + "\"" + objColumn.getSetting('Calendar Program') + "\",";
           my_JSONStr += "\"CalendarFunction\"" + ":" + "\"" + objColumn.getSetting('Calendar Function') + "\",";
           my_JSONStr += "\"componentType\"" + ":" + "\"SB\",";
           my_JSONStr += "\"mode\"" + ":" + "\"" + editableTable.mode + "\",";
           my_JSONStr += "\"InputType\"" + ":" + "\"" + inputType + "\",";
           my_JSONStr += "\"format\"" + ":" + "\"" + objColumn.getSetting("format").toLowerCase() + "\",";
           my_JSONStr += "\"objectId\"" + ":" + "\"" + oid + "\",";
           my_JSONStr += "\"relationId\"" + ":" + "\"" + relId + "\",";
           //Added:25-01-10:nr2:IR-035216V6R2011
           my_JSONStr += "\"columnName\"" + ":" + "\"" + objColumn.name + "\",";
           //End:25-01-10:nr2:IR-035216V6R2011
           my_JSONStr += "\"calBeanTimeStamp\"" + ":" + "\"" + timeStamp + "\"}";
//End:For Enhanced Calendar Control:AEF:nr2:20-11-09

            //anchor.setAttribute("href","javascript:showCalendar('emxTableForm', '"+name+"', '" + inputTime + "','', function() { updateTextWithHelper('"+ rowId +"'); }");
            anchor.setAttribute("href","javascript:showCalendar('emxTableForm', '"+name+"', '" + inputTime + "','', function() { updateTextWithHelper('"+ rowId +"'); },'','','" + my_JSONStr +"')");
            var img = document.createElement("img");
            img.setAttribute("src","images/iconSmallCalendar.gif");
            img.setAttribute("alt","Date Picker");
            img.setAttribute("border","0");
            anchor.appendChild(img);
            floatingDiv.appendChild(anchor);
            currentFormfield = formfield;
            currentHiddenFormfield = hiddenField;
            currentFloatingDiv = floatingDiv;
        }
        //rangeHelper url
        if(objColumn.getAttribute("rangeHref") != undefined){
            //oid relid
            var oid = targetNode.parentNode.getAttribute("o");
            var relId = targetNode.parentNode.getAttribute("r");
            var rootNode = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name = 'objectId']");
            var rootObjectId = rootNode != null ? emxUICore.getText(rootNode) : "";
            //name and register the hidden field
            hiddenField.name = name + "_Actual";
            document.forms[0].appendChild(hiddenField);
            try{
            document.forms[0].elements[name + "_Actual"] = hiddenField;
            document.forms[0][name + "_Actual"] = hiddenField;
            }catch(e){
            }
            var rangeHref = objColumn.getAttribute("rangeHref");
            var popupSize = objColumn.getSetting("Popup Size");
            rangeHref = parseHrefValue(rangeHref);
            var suiteKey  = objColumn.getSetting("Registered Suite");
            var button = document.createElement("input");
            button.setAttribute("type","button");
            button.setAttribute("name","btnType");
            button.setAttribute("value","...");
            button.onclick = function(){
                var theLevel = currentRow.getAttribute("level");
                var ftsAppendParams = getFTSTypeAheadAppendParams(objColumn,formfield,hiddenField,configuredTableName,rowId,massUpdate);
                var fieldValues = emxEditableTable.getRowColumnValues(rowId);
                var fieldValuesParams = "fieldValues=" + encodeURIComponent(emxUICore.toJSONString(fieldValues));
                var appendParams = "formName=emxTableForm&fieldNameActual="+name+
                                        "_Actual&fieldNameDisplay="+name+
                                        "&objectId="+oid+"&relId="+relId+
                                        "&fieldName="+objColumn.getAttribute("name")+
                                        "&timeStamp="+timeStamp+
                                        "&uiType=structureBrowser"+
                                        "&rootObjectId="+rootObjectId+
                                        "&level="+theLevel+
                                        "&isFromChooser=true"+
                                        "&suiteKey="+suiteKey;
                if(rangeHref.indexOf('javascript:') == new Number(0)){
                    var lastIdx = new Number(rangeHref.indexOf(')'));
                    var fn = rangeHref.substring(0,lastIdx);
                    if((rangeHref.indexOf('();') + 1) != lastIdx){
                        fn = fn + ",";
                    }
                    fn = fn + "'" + appendParams + "'" +  rangeHref.substr(lastIdx);
                    rangeHref = eval(fn);
                    fn = null;
                }
                var allAddParams = appendParams + "&" + ftsAppendParams + "&" + fieldValuesParams;
                if(rangeHref.indexOf("emxFullSearch.jsp") > -1 ){
                    rangeHref = getDynamicSearchRefinements(rangeHref,objColumn.getAttribute("name"),getKeyValuePairs(allAddParams),true);
                }
                var targetWindowName = "NonModalWindow" + (new Date()).getTime();
                var intWidth = "800";
                var intHeight = "600";
                if(emxUIConstants.ARR_PopupWidth){
                    if(popupSize){
                        if( emxUIConstants.ARR_PopupWidth[popupSize]){
                            intWidth = emxUIConstants.ARR_PopupWidth[popupSize];
                            intHeight = emxUIConstants.ARR_PopupHeight[popupSize];
                        }
                    }
                }
				if(rangeHref.indexOf("?")>-1){
                	rangeHref = rangeHref + "&" + allAddParams;
                }
                else{
                	rangeHref = rangeHref + "?" + allAddParams;
                }
				if(rangeHref.indexOf("targetLocation=listHidden") > -1){
					var rangeHREFFrame = findFrame(getTopWindow(), 'listHidden');
					rangeHREFFrame.location.href = rangeHref;
				}else{
				showModalDialog(rangeHref);
				}
                watchForChange(name,formfield.value, rowId);
            };
            floatingDiv.appendChild(button);


            if(!objColumn.getSetting("Allow Manual Edit") || objColumn.getSetting("Allow Manual Edit").toLowerCase() != "true"){

                if (isIE) {
                    formfield.readOnly = "readOnly";
                }
                else {
                formfield.setAttribute("readonly","readonly");
                }
                addClass(formfield.parentNode, "disabled");
           }

            currentFormfield = formfield;
            currentHiddenFormfield = hiddenField;
            currentFloatingDiv = floatingDiv;
            var clearField = objColumn.getSetting("Show Clear Button");
            if(clearField != null && clearField.toLowerCase() == "true")
            {
                var HiddenInputField = hiddenField;
                var ActualInputField = formfield;
                var clear = document.createElement("input");
                clear.setAttribute("type","button");
                clear.setAttribute("name","btnClear");
                clear.setAttribute("value",clearString);
                //Fix for IR 034008 :Starts
                var checkShowClearBtn;

                clear.onclick = function(){
                    HiddenInputField.value = "";
                    ActualInputField.value = "";
                checkShowClearBtn ="true";
                    updateTextWithHelper(rowId);
                }
                ActualInputField.onchange=function()
                {
                 if(checkShowClearBtn == "true")
                 {
                     HiddenInputField.value = "";
                     ActualInputField.value = "";
                     checkShowClearBtn = "";
                 }
                }
                //Fix for IR 034008 :Ends
                floatingDiv.appendChild(clear);
            }
        }
        if(inputType != "listboxmanual" && inputType != "textarea" && inputType != "combobox"){
            getTypeAhead(objColumn,formfield,hiddenField,configuredTableName,rowId);
        }else if(inputType == "listboxmanual"){
            getTypeAhead(objColumn,document.getElementById("selectListManualTextBoxToKeyIn"),null,configuredTableName);
        }
        if(typeof objColumn.getSetting("Input Type") != "undefined"){
            setFocusOnComplexInputControls(objColumn.getSetting("Input Type"));
        }

        //must focus window first because of tabbing bug in Moz
        window.focus();

         /* Added for Additional Edit Controls */
        if(inputType == "boolean"){
            var checkbox = formfield.getElementsByTagName("input")[0];
            var checked  = checkbox.getAttribute("ischecked");
            if(checked  == "true") {
                checkbox.checked = true;
            }
        }

        if (inputType == "dimension")
        {
            var oId = currentRow.getAttribute("o") + objColumn.getAttribute("name");
            document.getElementById(oId).focus();
        }
        else
        {
            if(getTopWindow().isMobile){
                try {
                    formfield.focus();
                }catch(e){

                }
            }else{
            setTimeout(function() { try { formfield.focus();}catch(e){} }, 10);;
            }

            try{
                formfield.select()
            }catch(exc){
                //do nothing
            }
        }
        if (isIE)
        {
            editableTable.mxDivTable.style.width="";
        }
    }
}//End: getCell

function enableSpellChecker(){
    if(spellCheckerURL.length > 0 && emxUICore.isValidPageURL(spellCheckerURL)){
        var element = document.createElement("input");
        element.setAttribute("type", "button");
        element.setAttribute("value", emxUIConstants.SPELL_CHECK);
        element.setAttribute("name", "SpellCheck");
        element.setAttribute("title", emxUIConstants.SPELL_CHECK);

        var spellCheckDiv = document.createElement("div");
        spellCheckDiv.setAttribute("align", "center");
        spellCheckDiv.appendChild(element);

        jQuery("textarea:not('.rte')",currentFloatingDiv).after(spellCheckDiv);
        jQuery("div.rte-resizer", currentFloatingDiv).append(element);
        jQuery(':button[name=SpellCheck]').bind('mousedown',function(){
            startSpellCheck(this);
        });
}
}

emxEditableTable.onFinish = function(mSender){
    spellCheckWindow = false;
    if(mSender.className == "rte"){
        mSender.contentWindow.focus();
    }else{
        mSender.focus();
    }
}

var spellCheckWindow = false;
function startSpellCheck(event){
    spellCheckWindow = true;
    var spellCheckElem = jQuery("textarea:not('.rte')", event.parentNode.parentNode).get(0)?jQuery("textarea:not('.rte')", event.parentNode.parentNode).get(0):jQuery("iframe", event.parentNode.parentNode).get(0);
    if(spellCheckElem.id == "" ||  spellCheckElem.id == null){
        spellCheckElem.id = spellCheckElem.name != "" ? spellCheckElem.name : spellCheckElem.title;
    }

    doSpell({
    ctrl: spellCheckElem.id,
    lang: spellCheckerLang,
    onFinish:emxEditableTable.onFinish,
    onCancel:emxEditableTable.onFinish,
    onClose:emxEditableTable.onFinish
    });
    }

function setFocusOnComplexInputControls(inputType){
    if(currentFloatingDiv){
        var inputElements;
        if(inputType == "listboxmanual"){
            inputElements = currentFloatingDiv.getElementsByTagName("select");
        }else{
            inputElements = currentFloatingDiv.getElementsByTagName("input");
        }
      setTimeout(function() { try { inputElements[0].focus();}catch(e){} }, 10);
    }
}

var typeAheadDivGlobal = null;
function getTypeAhead(objColumn,formfield,hiddenField,configuredTableName,rowId,massUpdate){
    var tableName = configuredTableName;

    //get the type ahead program and function
    var vTypeAheadProgram = objColumn.getSetting("TypeAhead Program");
    var vTypeAheadFunction = objColumn.getSetting("TypeAhead Function");

    var vTypeAheadCharacterCount = objColumn.getSetting("TypeAhead Character Count");
    var vCharacterCount;
    var vRunProgram=emxUIConstants.STR_TYPEAHEAD_RUNPROGRAM;
    var isMassUpdate = massUpdate == true ? true : false;

    var vTypeAheadEnabled;
    vTypeAheadEnabled=emxUIConstants.STR_TYPEAHEAD_SYSTEM;
    if(vTypeAheadEnabled=="true"  && typeof objColumn.getSetting("TypeAhead") == "undefined"){
        vTypeAheadEnabled=true;
    }
    else{
        if(vTypeAheadEnabled=="true"  && objColumn.getSetting("TypeAhead").toLowerCase() != "false"){
            vTypeAheadEnabled=true;
        }
        else{
            vTypeAheadEnabled=false;
        }
    }

    if(vTypeAheadCharacterCount){
        vCharacterCount=vTypeAheadCharacterCount;
    }
    else{
        vCharacterCount=emxUIConstants.STR_TYPEAHEAD_CHARACTERCOUNT;
    }
    var vTypeAheadValidate = objColumn.getSetting("Type Ahead Validate") === "false" ? false : true;
    var rangeHref = objColumn.getAttribute("rangeHref");

    var selectionMode = "single";

    if(rangeHref && (rangeHref.indexOf("selection=multiple") > -1 || rangeHref.indexOf("SelectType=multiselect") > -1)) {
        selectionMode = "multiple";
    }

    // create the type ahead div
    var typeAheadDIV = document.createElement("div");
    typeAheadDivGlobal = typeAheadDIV ;
    typeAheadDIV.setAttribute("name", "type_ahead");
    typeAheadDIV.setAttribute("id", "type_ahead");
    typeAheadDIV.className="type-ahead";
    // add the div to the form
    document.forms[0].appendChild(typeAheadDIV);

    //JOE - BEGIN(Fix for IR-117673V6R2012x)
    var rowObjectId = "";
    var rowRelId = "";
    var hiddenFieldName = "";
    if(hiddenField){
        rowObjectId = hiddenField.getAttribute("rowObjectId");
        rowRelId = hiddenField.getAttribute("rowRelId");
        hiddenFieldName = hiddenField.name;
    }
    if(rowObjectId == null){
        rowObjectId = "";
    }

    if(rowRelId == null){
        rowRelId = "";
    }
    //JOE - END

    //var colMapXML = emxUICore.selectSingleNode(oXML,"/mxRoot/columns//column[@name='"+objColumn.getAttribute("name")+"']");
    var oXMLRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id='"+rowId+"']");
    var theLevel = (oXMLRow!=undefined)? oXMLRow.getAttribute("level"): "";

    // if the program and function for the type ahead function are specified get the values using that
    if(vTypeAheadProgram!=null && vTypeAheadFunction!=null && vRunProgram.toLowerCase() != "false" && vTypeAheadEnabled){
        if(vTypeAheadProgram === "emxTypeAheadFullSearch") {
            new Ajax.TypeAhead(formfield,typeAheadDIV, hiddenFieldName, "../emxTypeAheadFullSearch.jsp?program="+
                    vTypeAheadProgram+"&function="+vTypeAheadFunction+"&table="+formfield+"&field="+
                    objColumn.name+"&timeStamp="+this.timeStamp+"&uiType=structureBrowser"+"&rowObjectId="+rowObjectId+"&rowRelId="+rowRelId+"&level="+theLevel, new Array(),
                    new Array(),vCharacterCount, {},  vTypeAheadValidate, selectionMode, rangeHref, rowId, isMassUpdate);
        }
        else {
            new Ajax.TypeAhead(formfield,typeAheadDIV, hiddenField, "emxTableTypeAhead.jsp?program="+
                    vTypeAheadProgram+"&function="+vTypeAheadFunction+"&table="+formfield+"&column="+
                    hiddenField+"&rowObjectId="+rowObjectId+"&rowRelId="+rowRelId, new Array(), new Array(),vCharacterCount, {});
        }
    }
    else{
        // if the program and function for the type ahead function are not specified get the values using emxFreezepaneTypeAhead
        // use tableName for table and selectedColumn.id for column
        if(vTypeAheadEnabled){
            new Ajax.TypeAhead(formfield,typeAheadDIV, hiddenField, "emxTableTypeAhead.jsp?table="+tableName+"&column="+objColumn.getAttribute("name")+"&rowObjectId="+rowObjectId+"&rowRelId="+rowRelId, new Array(), new Array(),vCharacterCount, {});
        }
    }
}
function getFTSTypeAheadAppendParams(objColumn,formfield,hiddenField,configuredTableName,rowId,massUpdate){
    var vTypeAheadProgram = objColumn.getSetting("TypeAhead Program");
    var vTypeAheadFunction = objColumn.getSetting("TypeAhead Function");

    var rowObjectId = "";
    var rowRelId = "";
    var hiddenFieldName = "";
    if(hiddenField){
        rowObjectId = hiddenField.getAttribute("rowObjectId");
        rowRelId = hiddenField.getAttribute("rowRelId");
        hiddenFieldName = hiddenField.name;
    }
    if(rowObjectId == null){
        rowObjectId = "";
    }

    if(rowRelId == null){
        rowRelId = "";
    }

    var typeAheadAppendParams = "&fieldName="+
        objColumn.name+"&rowObjectId="+rowObjectId+"&rowRelId="+rowRelId;
    return typeAheadAppendParams;
}


/**
 * watch a field for the changed text
 */
function watchForChange(name, val, rowId){
    if(document.forms[0][name].value == val){
        setTimeout(function(){
            watchForChange(name, val, rowId);
        },1000);
    }else{
        updateTextWithHelper(rowId);
    }
}
/**
 * get the column for the currently selected cell
 *
 */
function getColumn(){
    //test VALIDATION
    var colIndex = currentColumnPosition-1;
    var theColumn = colMap.getColumnByIndex(colIndex);
    return theColumn;
}
//get DATE FIELD
function updateTextWithHelper(rowId,fromTypeAhead){
 if(!isDataModified()){
        disableExpandAllMenus();
      }
 if (!currentFormfield) {
  return;
 }
 var edited = false;
 var val = getValue(currentFormfield);
 var dispVal = val;
 var hiddenVal = getValue(currentHiddenFormfield);
 var validated = true;
 var theColumn = getColumn();
 var theValidator = theColumn.getSetting("Validate");

 if(theValidator && theValidator.length > 0){
     var  tempVal = escapeValueForEval(hiddenVal); // hiddenVal.replace(/(\r\n|\n|\r)/gm,"");
     validated = eval(theValidator + "('" +tempVal+ "','" + getStatus(getRow(rowId)) + "')");
 }
 var tempRowIndex = -1;
 var tempColIndex = -1;
 if(fromTypeAhead){
    tempRowIndex = currentCell.target.parentNode.rowIndex;
    tempColIndex = currentCell.cellIndex;
 }


    if(validated){
        var oldValue = null;
        if(isIE){
            oldValue = currentCell.target.innerText;
        }else{
            oldValue = currentCell.target.textContent;
        }
        //if(val.length > 0 && val != currentCell.target.innerHTML){
        if(val != currentCell.target.innerHTML){
            currentCell.target.innerHTML = currentFormfield.value;
            edited = true;
        }
        //if edited, store the new data and update local xmlData
        //if(val.length > 0 && hiddenVal.length > 0){
        if(edited){
            if(theColumn.getSetting("format")=="date"){
                var columnIndex = theColumn.index - 1;
                var date = encodeURI(val);
                var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp+"&IsStructureCompare=" + isStructureCompare+"&date="+date+"&columnIndex="+columnIndex;
                var childXML = emxUICore.getXMLDataPost(url, "&isdate=true");

                val = emxUICore.selectSingleNode(childXML, "/mxRoot/date/display/text()");
                hiddenVal = emxUICore.selectSingleNode(childXML, "/mxRoot/date/msvalue/text()");
                formatedDate = emxUICore.selectSingleNode(childXML, "/mxRoot/date/sortType/text()");

                val = val.nodeValue;
                hiddenVal = hiddenVal.nodeValue;
                formatedDate = formatedDate.nodeValue;
                currentCell.target.innerHTML = val;
                dispVal = val;
                val = {
                    displayValue:val,
                    actualValue:hiddenVal,
                    date:formatedDate,
                    attributeName:"msValue"
                    };
            } else {
                val = {
                    displayValue:val,
                    actualValue:hiddenVal,
                    attributeName:null
                    };
            }
        }
        if(edited){
            var curclass = currentCell.target.className;
            curclass = curclass + " mx_edited";
            if(status != "new" && status != "lookup")
                currentCell.target.className = curclass;
            updateXMLData(currentCell.target,oldValue,val);
            updatePostXML(currentCell.target,val);
            var onChangeHandler = theColumn.getSetting("On Change Handler");
            if(onChangeHandler && onChangeHandler.length > 0){
                reloadCellType.push({Type :"onChange",Target :theColumn.name});
                var aTemp = onChangeHandler.split(":");
                //lastUpdatedColumn = objColumn.name;
                //lastUpdatedColumnValue= cellValue;
                for(var k=0; k < aTemp.length; k++){
                    var  tempVal = escapeValueForEval(hiddenVal); //hiddenVal.replace(/(\r\n|\n|\r)/gm,"");
                    eval(aTemp[k]+"('" +tempVal+ "','"+ rowId +"','"+ theColumn.name + "')");
                }
                reloadCellType.pop();
            }else{
                rebuildView();
            }
            //store edited cell
            editedCellArray[editedCellArray.length] = currentCell.target;

            //Gayout the expand filter
            showExpandFilter(false);
        }
    }
    //update the tooltip with the selected value from range chooser
    currentCell.target.title=dispVal;
    //remove current floating div
    removeCurrentFloatingDiv();
    if(fromTypeAhead == true){
        getCell(tempRowIndex,tempColIndex, true);
    }

    //currentCell.className = "mx_editable-selected-edited";
    //rebuildView();
    syncSB();
}
function removeCurrentFloatingDiv(elementName){
    try{
    //remove currentFormfield
        if(currentFormfield && currentFormfield.parentNode){
            if(currentFormfield.parentNode.parentNode){
                currentFormfield.parentNode.parentNode.removeChild(currentFormfield.parentNode);
            } else {
                currentFormfield.parentNode.removeChild(currentFormfield);
            }
        }

        //remove currentHiddenFormfield
        if(currentHiddenFormfield && currentHiddenFormfield.parentNode){
            currentHiddenFormfield.parentNode.removeChild(currentHiddenFormfield);
        }
        if(currentFloatingDiv){
            //clear innerHTML
            currentFloatingDiv.innerHTML = "";
            //remove currentFloatingDiv
            if(currentFloatingDiv.parentNode){
                currentFloatingDiv.parentNode.removeChild(currentFloatingDiv);
            }
        }

        if (objFrame) {
            document.body.removeChild(objFrame);
        }

        if(typeAheadDivGlobal != null) {
            document.forms[0].removeChild(typeAheadDivGlobal);
            typeAheadDivGlobal = null;
        }
        var massUpdateDiv =document.getElementById("divMassUpdate");
        var massUpdateDivReset = document.getElementsByName("columnSelect");
        if(massUpdateDiv!= null && massUpdateDivReset[0] != null){
            massUpdateDivReset[0].value = "";
        }
        //reset to null
        currentFormfield = null;
        currentHiddenFormfield = null;
        currentFloatingDiv = null;
        //set the edited state (class)
    }catch(e){
        //do nothing
    }
}
function getField(objElm, type, objColumn, value, rowId, fromMassupdate){
    switch(type){
        case "textarea":
            return textArea(objElm, objColumn, value, rowId);
        break;
        case "textbox":
            return textField(objElm, objColumn, value, rowId);
        break;
        case "hidden":
            return hiddenField();
        break;
        case "listbox":
        case "combobox":
            return selectList(objElm, objColumn,type, rowId);
        break;
        case "listboxmanual":
            return selectListManualTextBox(objElm, objColumn,type, rowId, fromMassupdate);
        break;
        case "dimension":
            return dimensionField(objElm, objColumn, rowId);
        break;
         case "radiobutton":
        case "checkbox":
            return selectionControl(objElm, objColumn,type, rowId);
        break;
        case "boolean":
            return booleanControl(objElm, objColumn, rowId);
        break;
        default:
    }
}//End: getField

    function dimensionField(objTD, objColumn, rowId)
    {
        var floatingDiv1 = document.createElement("div");
        var objTable = document.createElement("table");
        var unitValue = "";
        var unitName = "";
        var oId = currentRow.getAttribute("o") + objColumn.getAttribute("name");

        if(objTD != null)
        {
            var textfield = document.createElement("input");
            textfield.setAttribute("type", "text");
            textfield.setAttribute("id", oId);
            var tdVal = getValueForColumn(objColumn.name);

            var index = tdVal.indexOf("(");
            var unitsDetails = "";
            if (index != -1)
            {
                unitsDetails = tdVal.substring(0, index);
            }
            else
            {
                unitsDetails = tdVal;
            }

            index = unitsDetails.indexOf(" ");
            var value = unitsDetails.substring(0, index);
            var unit = unitsDetails.substring(index + 1, unitsDetails.length);
            unit = trim(unit);

            textfield.setAttribute("inputvalue", value);
            textfield.setAttribute("inputunit", unit);
            unitValue = value;

            textfield.setAttribute("value", unitValue);

            var selectList = document.createElement("select");
            unitName = unit;
            var bFound = false;

            for(var key in objColumn.rangeValues)
            {
                selectList.options[selectList.options.length] = new Option(key,objColumn.rangeValues[key]);
                if(unitName == key)
                {
                    bFound = true;
                    selectList.options[selectList.options.length-1].selected = true;
                }
            }

            var doneButton = document.createElement("input");
            doneButton.value= emxUIConstants.STR_FPDONE;
            doneButton.type= "button";

            doneButton.onclick = function () { updateDimensionValue(objTD, textfield.value, selectList[selectList.selectedIndex].text, rowId); };
            var cancelButton = document.createElement("input");
            cancelButton.value= emxUIConstants.STR_FPCANCEL;
            cancelButton.type= "button";

            cancelButton.onclick = function () { removeCurrentFloatingDiv(); };

            var objTable = document.createElement("table");
            objTable.border = 1;
            objTable.cellPadding = 1;
            objTable.cellSpacing = 0;
            objTable.style.height = "auto";

            var objTBody = document.createElement("tbody");
            objTable.appendChild(objTBody);
            var objTR = document.createElement("tr");
            objTBody.appendChild(objTR);
            var objCol = document.createElement("td");
            objCol.appendChild(textfield);
            objTR.appendChild(objCol);

            objCol = document.createElement("td");
            objCol.appendChild(selectList);
            objTR.appendChild(objCol);

            var objRow = document.createElement("tr");
            objCol = document.createElement("td");
            objCol.colSpan="2";
            objCol.align = "right";
            objCol.appendChild(doneButton);
            objCol.appendChild(cancelButton);
            objRow.appendChild(objCol);
            objTBody.appendChild(objRow);
        }
        objTable.type = "UOM";
        return objTable;
    }
//TO Avoid two Clicks on Save/Reset/LookUp button when the cell is Edited.
function performInSingleClick(arguments,activeElement){
    var reqTarget ="";
    if(isMoz && arguments[0]){
        reqTarget = arguments[0].explicitOriginalTarget
    }
    else if(isIE && activeElement){
        reqTarget = activeElement;
    }else{
        return;
    }
    if(reqTarget.className == "mx_btn-reset"){
        resetEdits();
    }else if(reqTarget.className == "mx_btn-apply"){
        applyEdits();
    }else if(reqTarget.className == "mx_btn-lookup"){
        lookupAction()
    }
}

//create a text formfield
function textField(objTD,objColumn, value, rowId){
    keyPressedCode = -1;
    var textfield = document.createElement("input");
    textfield.setAttribute("type", "text");
    var isNFEnabled = objColumn.getSetting("isNF");
    var isPFEnabled = objColumn.getSetting("isPF");
    var symbol = "%";
    var currentColumn = "";

    if(objTD != null){
        var tdVal = null;
        var isEdited = (objTD.className.indexOf("edited") != -1) ?true:false;
        var isEditedAdded = (objTD.className.indexOf("mx_add") != -1) ?true:false;
        if(objTD.firstChild != null && (isEdited ||isEditedAdded)){


            if(objTD.getAttribute('position') != "1"){
                var reqdNode = objTD.firstChild;
                //modified for IR-300277.
                if(objTD.childNodes.length > 1  && (reqdNode.textContent==null || reqdNode.textContent=='undefined') && reqdNode.nodeType != 3){
                    reqdNode = reqdNode.nextSibling;
                }
                if(isNFEnabled == "true"){
                    currentColumn = emxUICore.selectSingleNode(oXML, " /mxRoot/rows//r[@id = '" + rowId + "'] /c["+currentColumnPosition+"]");
                    tdVal = currentColumn.getAttribute("newA");
                }else{
                if(isIE){
                       if(reqdNode.nodeValue!=null){
                        tdVal = reqdNode.nodeValue;
                    }else {
                        tdVal = reqdNode.innerText;
                    }
                }else{
                    tdVal = reqdNode.textContent;
                }
                }
                tdVal = tdVal == null ? "" : tdVal;
                tdVal = trim(tdVal);
            }else{
               if(isIE && isMinIE9){
                    var objTDActual = objTD.firstElementChild.firstElementChild.firstElementChild.firstElementChild.lastElementChild ;
                }else{
                var objTDActual = objTD.firstChild.firstChild.firstChild.firstChild.lastChild ;
                }
                if(isIE){
                    if(objTDActual.firstChild.nodeValue!=null)
                        tdVal = objTDActual.firstChild.nodeValue;
                    else
                        tdVal = objTDActual.firstChild.innerHTML;
                }else{
                    tdVal = objTDActual.firstChild.textContent;
                }
            }
        }else{
            if(isNFEnabled == "true"){
                currentColumn = emxUICore.selectSingleNode(oXML, " /mxRoot/rows//r[@id = '" + rowId + "'] /c["+currentColumnPosition+"]");
                tdVal = currentColumn.getAttribute("a");
        }else{
            tdVal = getTDValue(objTD, value);
        }

        }
        if(isPFEnabled == "true" && tdVal){
            tdVal = tdVal.indexOf("%")!= -1 ? tdVal.slice(0, tdVal.length-1): tdVal;
        }
        textfield.setAttribute("value", tdVal);

        if(objColumn.getSetting("format").toLowerCase() != "date" &&
                objColumn.getAttribute("rangeHref") == undefined){
            if(isMinFF3){
                textfield.onblur = function () {
                    if(keyPressedCode!=tabKeyCode){
                        updateText(objTD,this, rowId);
                        keyPressedCode = -1;
                        performInSingleClick(arguments);
                    }
                     if(typeAheadDivGlobal != null && typeAheadDivGlobal.title=="divClick") {
                             typeAheadDivGlobal.title="";
                     }else{
                    removeCurrentFloatingDiv();
                         }

                };
            }else{
                textfield.onblur = function () {
                    if(keyPressedCode!=tabKeyCode){
                        //document.activeElement needs to be assigned before calling updateText
                        var explicitOriginalTarget =  document.activeElement;
                        updateText(objTD,this, rowId);
                        keyPressedCode = -1;
                        performInSingleClick(arguments, explicitOriginalTarget);
                    }
                }
            }
        }

        var xisFulltypeAhead = (objColumn.getSetting("TypeAhead") == "true" &&
                objColumn.getSetting("TypeAhead Program") == "emxTypeAheadFullSearch");

        textfield.onchange = function () {
            var currentBlurFunction = textfield.onblur;
            textfield.onblur = function () {
             if(isIE || keyPressedCode!=tabKeyCode)
             {
                if(!xisFulltypeAhead)
                {
                    //document.activeElement needs to be assigned before calling updateText
                    var explicitOriginalTarget =  document.activeElement;
                    updateText(objTD,this, rowId);
                    keyPressedCode = -1;
                    if(typeahedRef){
                        typeahedRef.hide();
                    }
                    performInSingleClick(arguments, explicitOriginalTarget);
                    textfield.onblur = currentBlurFunction;
                }
             }
            };
        };
        textfield.onfocus = function () { this.select();};
        if(objColumn.getSetting("Auto Fit Cell") == "true" &&
                objColumn.getSetting("format").toLowerCase() != "date" &&
                objColumn.getAttribute("rangeHref") == undefined){
            var fieldWidth = jQuery(objTD).width() - 4;
            if(fieldWidth < 10){
                fieldWidth = 10;
            }
            jQuery(textfield).width(fieldWidth);
        }
    }
    return textfield;
}
//create a hidden formfield
function hiddenField(){
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    return hiddenField;
}
//create a textarea formfield
function textArea(objTD, objColumn, value, rowId){
    keyPressedCode = -1;
    var textfield = document.createElement("textarea");
    textfield.setAttribute("cols", 40);
    textfield.setAttribute("rows", 10);
    if(rowId != null) {
        var columnInfo = emxUICore.selectSingleNode(getRow(rowId), "c[" + (objColumn.index) + "]");
        //if(objColumn.getSetting("Rich Text Editor")== "true"){
        if(columnInfo.getAttribute("rte")== "true"){
            textfield.className = "rte";
        }
    }
    if(objTD != null){
        var tdVal = "";
        if(value && objTD.getAttribute('iFH') != "true"){
            tdVal = value;
        }else{
            tdVal = getValueForColumn(objColumn.name);
        }
        if(isIE) {
            textfield.innerText = tdVal;
        }else {
            textfield.textContent = tdVal;
        }
    }
    /* textfield.onchange = function () { updateText(objTD,this); }; */
    textfield.onblur = function () {
        if(keyPressedCode!=tabKeyCode){
            //document.activeElement needs to be assigned before calling updateText
            var explicitOriginalTarget =  document.activeElement;
            updateText(objTD, textfield, rowId);
            keyPressedCode = -1;
            performInSingleClick(arguments, explicitOriginalTarget);
        }
    };
    /* looks working both in IE & Firefox */
// Added by BMR
    textfield.onfocus = function () { this.select();};
    return textfield;
}


function booleanControl(objTD,objColumn,rowId)
{
    var table = [];
    table.push("<table type=\"checkbox\" bgcolor=\"#FFFFFF\" border=\"1\" >");
    table.push("<tbody><tr><td style=\"border-width:0px\">");
    table.push("</td></tr></tbody></table>");

    var checkbox  = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    var boolMatch = objColumn.getAttribute("BooleanMatch");
    boolMatch     = boolMatch.split("/");
    checkbox.setAttribute("trueValue",boolMatch[0]);
    checkbox.setAttribute("falseValue",boolMatch[1]);

    var tdVal = null;
    if(objTD != null) {
       if(objTD != null && objTD.firstChild != null) {
           tdVal = objTD.firstChild.nodeValue;
       }else {
           tdVal = getTDValue(objTD);
       }
       if(tdVal == boolMatch[0]) {
           checkbox.setAttribute("ischecked","true");
       }
    }

    var div = document.createElement("div");
    div.innerHTML = table.join("");
    div.firstChild.rows[0].cells[0].appendChild(checkbox);
    var ctable = div.firstChild;
    if(objTD != null) {
        checkbox.onblur = function () {
            //document.activeElement needs to be assigned before calling updateText
            var explicitOriginalTarget =  document.activeElement;
            updateText(objTD,ctable, rowId);
            performInSingleClick(arguments, explicitOriginalTarget);
        };
    }
    checkbox.onfocus = function () { this.select();};

    return div.firstChild;
}


function selectionControl(objTD,objColumn,type, rowId)
{
    var massupdate = objTD == null ? true : false;
    type = "radiobutton" == type ? "radio" : type;
    var vertical = objColumn.getSetting('Input Control Direction') == "horizontal" ? false : true;
    var table = [];
    var tdVal = null;
    if(objTD != null && objTD.firstChild != null){
        tdVal = objTD.firstChild.nodeValue;
    }else{
        tdVal = getTDValue(objTD);
    }
    tdVal      = tdVal != null ? tdVal.split(",") : [];
    var tdValues = {};
    for(var i = 0; i < tdVal.length; i++)
        tdValues[tdVal[i]] = "true";

    table.push("<table type=\"selection\" bgcolor=\"#FFFFFF\" border=\"1\"><tbody><tr><td>");
    table.push("<table border=\"0\" cellpadding=\"1\" cellspacing=\"1\"><tbody>");
    if(!vertical)
    table.push("<tr>");

     var colspan = 0;
     for(var key in objColumn.rangeValues) {

         if(vertical)
         table.push("<tr>");

         table.push("<td ");
         if(vertical)
         table.push(" width=\"20\" ");

         table.push(">");

        table.push("<input value=\""+ key +"\" id=\""+objColumn.name+"\" name=\""+objColumn.name+"\" type=\""+type+"\" ");

        if(typeof tdValues[objColumn.rangeValues[key]] == "string")
        table.push(" checked=\"true\" ");

        table.push("/></td><td>");
        table.push(key);
        table.push("</td>");

        if(vertical)
        table.push("</tr>");

        colspan += 2;
     }

     if(!vertical)
     table.push("</tr>");

    if(!massupdate) {
        table.push("<tr><td colspan=\""+colspan+"\" align=\"center\" style=\"text-align:center\">");
        table.push("</td></tr>");
    }

    table.push("</tbody></table></td></tr></tbody></table>");

    var div = document.createElement("div");
    div.innerHTML = table.join("");

    if(!massupdate) {

     var doneButton = document.createElement("input");
     doneButton.value= emxUIConstants.STR_FPDONE;
     doneButton.type= "button";

     var cancelButton = document.createElement("input");
     cancelButton.value= emxUIConstants.STR_FPCANCEL;
     cancelButton.type= "button";
     cancelButton.onclick = function () { removeCurrentFloatingDiv(); };

     var row = null;
     var rows = div.firstChild.rows[0].cells[0].firstChild.rows;
     if(!vertical)
        row  = rows[1];
     else
        row  = rows[rows.length -1];

     var cell = row.cells[0];
     cell.appendChild(doneButton);
     cell.appendChild(cancelButton);
     doneButton.onclick = function () {
          var values = [];
          var cboxes = this.parentNode.parentNode.parentNode.getElementsByTagName("input");
          for(var l = 0; l < cboxes.length; l++) {
              if(cboxes[l].checked)
              values.push(cboxes[l].value);
          }
         updateText(objTD, { type : "text", value : values.join(",") }, rowId);
         removeCurrentFloatingDiv();
      };
     }

    return div.firstChild;
}

//create a select-one formfield
function selectList(objTD,objColumn,type, rowId){

    var isListBox  = type == "listbox";
    var selectList = document.createElement("select");
    var multiple   = objColumn.getSetting("List Box Selection") == "single" ? false : true;
    if(multiple && isListBox) {
        selectList.setAttribute("multiple","multiple");
    }

    if(objTD != null){
        var ldVal="";
        //fix for IR-179522
        if(objTD.firstChild != null && objTD.firstChild.nodeValue != null && trim(objTD.firstChild.nodeValue)!= ""){
            ldVal = objTD.firstChild.nodeValue;
        }
            tdVal = getTDValueForSelectList(objTD);
     /*  if(tdVal == null){
            tdVal = getTDValueForSelectList(objTD);
        }*/
        selectList.onchange = function () {
            if(selectList.value == "manualEntryOptionDisplay"){//Added for Bug 301015
            var positionLeft = '';
            var positionTop = '';
            if (selectList.parentNode){
                positionLeft = this.parentNode.style.left;
                positionTop = this.parentNode.style.top;
                this.parentNode.parentNode.removeChild(this.parentNode);
            }
            var formfield  = getField(objTD,'textbox' , objColumn,tdVal, rowId);
            formfield.setAttribute("id", "txtBoxLevelId");
            currentFormfield = formfield;
            var floatingDiv = document.createElement("div");
            floatingDiv.name = "floatingDiv";
            floatingDiv.className = "formLayer";
            document.forms[0].appendChild(floatingDiv);
            document.forms[0].elements[name] = formfield;
            floatingDiv.style.top = positionTop;
            floatingDiv.style.left = positionLeft;
            floatingDiv.style.visibility = "visible";
            floatingDiv.appendChild(formfield);
            formfield.onblur = function (){
                if(this.value != "manualEntryOptionDisplay"){
                    //document.activeElement needs to be assigned before calling updateText
                    var explicitOriginalTarget =  document.activeElement;
                    updateText(objTD,this, rowId);
                    performInSingleClick(arguments, explicitOriginalTarget);
                }
            };
            formfield.focus();
            formfield.onfocus = function () { this.select();};
            }
        };

        //Start of mod by BMR
        //This is for an IE bug. When in IE and tabbing through the cell and when the input element is a selectList IE blur the element.
        // The code below is a quick fix to the issue.
        if(isIE && this.value != "manualEntryOptionDisplay")
        {
            var objEvent = emxUICore.getEvent();
            if(objEvent != null && (objEvent.keyCode==9 || objEvent.keyCode==38 || objEvent.keyCode==40))
            {
              selectList.onblur = function () {this.focus(); this.onblur = function () { updateText(objTD,this, rowId); }; };
            } else {
              selectList.onblur = function () {
                  //document.activeElement needs to be assigned before calling updateText
                  var explicitOriginalTarget =  document.activeElement;
                  updateText(objTD,this, rowId);
                  performInSingleClick(arguments, explicitOriginalTarget);
              };

            }
        } else {
            if(this.value != "manualEntryOptionDisplay"){
                  selectList.onblur = function () {
                      //document.activeElement needs to be assigned before calling updateText
                      var explicitOriginalTarget =  document.activeElement;
                      updateText(objTD,this, rowId);
                      performInSingleClick(arguments, explicitOriginalTarget);
                  };
            }
        }
//End of mod by BMR
        //retrieve range values
        var bFound = false;

        for(var key in objColumn.rangeValues){
                       // Modified for IR-021925V6R2011
            try{
                 selectList.options[selectList.options.length] = new Option(key,objColumn.rangeValues[key]); //add new option to end of "selectList"
                }
                catch(e){
                    var y=document.createElement('option');
                    y.text=key;
                    y.value=objColumn.rangeValues[key];
                    try{
                        selectList.add(y,null); // standards compliant
                    }
                    catch(ex){
                        selectList.add(y); // IE only
                    }
                }
                 if(!isListBox) {
                var kkey   = trim(key);
                    var ktdVal = "";
                    if(tdVal){
                    ktdVal = trim(tdVal);
                }
                    if(ktdVal == kkey ){
                        var value = objColumn.rangeValues[key];
                        for(var keyValue in objColumn.rangeValues){
                            var kValue = objColumn.rangeValues[keyValue];
                            if(value == kValue){
                    bFound = true;
                    selectList.options[selectList.options.length-1].selected = true;
                                break;
                            }
                        }
                    }
                //Fix for IR-019721V6R2011?
                if(tdVal== null){
                    var tdValue="";
                    if(isIE){
                        tdValue=objTD.innerText;
                    } else {
                        tdValue=objTD.textContent;
                    }
                    tdValue=trim(tdValue.replace(/\W/g," "));
                    var temp= new Array();
                    temp=tdValue.split(' ');
                    tdValue=trim(temp[0]);
                    if(kkey.indexOf(tdValue) != -1){
                        bFound = true;
                        if(selectList && selectList.options){
                        selectList.options[selectList.options.length-1].selected = true;
                        }
                    }
                }
                //end of IR-019721V6R2011
            }
        }
     // for IR-176008V6R2013x fix for manuaaly added entry in options
        if(ldVal && ldVal != ""){
             //Modified for IR-323565-3DEXPERIENCER2015x
             var optionValueTranslationFlag = true;
             for (var i=0; i<selectList.options.length; i++) {
                 if(selectList.options[i].text == ldVal){
                     optionValueTranslationFlag = false;
                     break;
                 }
             }

            if(optionValueTranslationFlag){
                var mlvalues = ldVal.split(",");
                for(var l = 0 ; l < mlvalues.length; l++){
                    mlvalues[l] = trim(mlvalues[l]);
                    if(!(objColumn.rangeValues[mlvalues[l]])){
                        //added for IR-179403V6R2013x
                        bFound =true;
                        //end
                        selectList.options[selectList.options.length] = new Option(mlvalues[l],mlvalues[l]);
                    }
                }
            }
        }
        //end
        if(isListBox) {
            var ltvalues = tdVal.split(",");
            for(var i = 0 ; i < selectList.options.length; i++) {
                for(var l = 0 ; l < ltvalues.length; l++){
                    var text = trim(selectList.options[i].text.replace(/\s/g,"_"));
                    var value = trim(ltvalues[l].replace(/\s/g,"_"));
                    if(text == value) {
                        selectList.options[i].selected = true;
                        bFound = true;
                        break;
                    }
                }
            }
        }

        if (!bFound) {
            // Added for bug no 345906
            if(tdVal!=null){
                // End
                selectList.options[selectList.options.length] = new Option(tdVal,tdVal);
                selectList.options[selectList.options.length-1].selected = true;
            }
        }
    } else {
        for(var key in objColumn.rangeValues){

            selectList.options[selectList.options.length] = new Option(key,objColumn.rangeValues[key]);
        }
    }
    if(((typeof objColumn.getSetting('Allow Manual Edit'))!="undefined")
        &&  objColumn.getSetting('Allow Manual Edit').toLowerCase() == 'true'){
        selectList.options[selectList.options.length] = new Option("~Add Manually~","manualEntryOptionDisplay")
    }

    //Modified START BUG 365696
    if(isListBox) {
        selectList.setAttribute("size","5");
    }
    //Modified END BUG 365696

    return selectList;
}

function selectListManualTextBox(objTD,objColumn,type, rowId, fromMassupdate){

    var multiple   = objColumn.getSetting("List Box Selection") == "multiple" ? true : false;
    if(!fromMassupdate){
    var doneButton = document.createElement("input");
    doneButton.setAttribute("type", "button");
    doneButton.setAttribute("name", "doneButton");
        doneButton.setAttribute("id", "selectListManualDoneButton");
    doneButton.setAttribute("value", emxUIConstants.STR_LISTBOXMANUAL_DONE);
    doneButton.className = "button";
    doneButton.onclick = function () {
                                    submitSelectedValues(doneButton,multiple,objTD,rowId);
                            };
    var cancelButton = document.createElement("input");
    cancelButton.setAttribute("type", "button");
    cancelButton.setAttribute("name", "cancelButton");
    cancelButton.setAttribute("value", emxUIConstants.STR_LISTBOXMANUAL_CANCEL);
    cancelButton.className = "button";
    cancelButton.onclick = function () {
                            removeCurrentFloatingDiv();
                            };
    }
    var listManualDiv = document.createElement("div");
    listManualDiv.setAttribute("type","selection");
    listManualDiv.setAttribute("id","listBoxManualDiv");
    attachEventHandler(listManualDiv, "keydown", function(){submitListboxManual(emxUICore.getEvent(),multiple,objTD,rowId);});
    listManualDiv.className = "input-layer list-other";

    var selectListManual = document.createElement("select");
    selectListManual.setAttribute("id", "selectListManual");

    if(multiple) {
        selectListManual.setAttribute("multiple","multiple");
    }

    if(objTD != null){
        var ldVal = "";
    //fix for IR-179522
        if(objTD.firstChild != null && objTD.firstChild.nodeValue != null && trim(objTD.firstChild.nodeValue)!= ""){
            ldVal = objTD.firstChild.nodeValue;
        }
        tdVal = getTDValueForSelectList(objTD);
        if(tdVal == null){
           tdVal = "";
        }
        selectListManual.onchange = function () {
            //optional
        };
        //retrieve range values

        for(var key in objColumn.rangeValues){
            selectListManual.options[selectListManual.options.length] = new Option(key,objColumn.rangeValues[key]);
        }
        var ltvalues = tdVal.split(",");
        // for IR-176008V6R2013x fix for manuaaly added entry in options
        if(ldVal && ldVal != ""){
        var mlvalues = ldVal.split(",");
        for(var l = 0 ; l < mlvalues.length; l++){
            mlvalues[l] = trim(mlvalues[l]);
                if(!(objColumn.rangeValues[mlvalues[l]])){
                    selectListManual.options[selectListManual.options.length] = new Option(mlvalues[l],mlvalues[l]);
                }
           }
        }
          //end
        for(var i = 0 ; i < selectListManual.options.length; i++) {
        ltvaluesSize = ltvalues.length;
            for(var l = 0 ; l < ltvaluesSize; l++)    {
                ltvalues[l] = trim(ltvalues[l]);
                if(selectListManual.options[i].text == ltvalues[l]) {
                    selectListManual.options[i].selected = true;
                    ltvalues.remove(ltvalues[l]);
                    l--;
                    ltvaluesSize--;
                    //break;
                }
            }
        }

        if(tdVal!=null){
            for(var l = 0 ; l < ltvalues.length; l++)    {
                selectListManual.options[selectListManual.options.length] = new Option(ltvalues[l],ltvalues[l]);
                selectListManual.options[selectListManual.options.length-1].selected = true;
            }
        }


    } else {
        for(var key in objColumn.rangeValues){
            selectListManual.options[selectListManual.options.length] = new Option(key,objColumn.rangeValues[key]);
        }
    }

    selectListManual.setAttribute("size","5");

    var objTable = document.createElement("table");
    var objTBody = document.createElement("tbody");
    objTable.appendChild(objTBody);
    var objTR1 = document.createElement("tr");
    var objCol = document.createElement("td");
    objCol.appendChild(selectListManual);
    objTR1.appendChild(objCol);

    var objTR2 = document.createElement("tr");
    var objCol = document.createElement("td");
    var textBoxToKeyIn = document.createElement("input");
    textBoxToKeyIn.setAttribute("id", "selectListManualTextBoxToKeyIn");
    textBoxToKeyIn.setAttribute("name", "selectListManualTextBoxToKeyIn")

    textBoxToKeyIn.type = "text";
    textBoxToKeyIn.value = "";
    objCol.appendChild(textBoxToKeyIn);
    objTR2.appendChild(objCol);

    if(multiple){
        var objTR4 = document.createElement("tr");
        objCol = document.createElement("td");
        var objSpan = document.createElement("span");
        objSpan.innerHTML = emxUIConstants.STR_LISTBOXMANUAL_CTRLCLICK;
        objSpan.className = "hint";
        objCol.appendChild(objSpan);
        objTR4.appendChild(objCol);
    }

    objTBody.appendChild(objTR1);//select
    if(multiple){
        objTBody.appendChild(objTR4);//span
    }
    objTBody.appendChild(objTR2);//textbox

    if(!fromMassupdate){
        var objTR3 = document.createElement("tr");
        objCol = document.createElement("td");
        objCol.className = "buttons";
        objCol.appendChild(doneButton);
        objCol.appendChild(cancelButton);
        objTR3.appendChild(objCol);
    objTBody.appendChild(objTR3);//done and cancel buttons
    }

    listManualDiv.appendChild(objTable);
    if(!fromMassupdate){
        currentFloatingDiv = listManualDiv;
    }
    setTimeout(function () { try { document.getElementById("selectListManual").focus();}catch(e){} }, 50);;
    return listManualDiv;
}

function submitSelectedValues(doneButton,multiple,objTD,rowId){
      var values = [];
      values.push(getValuesForSelectManualListBox(multiple, "display"));
      values.push(getValuesForSelectManualListBox(multiple, "actual"));
      updateText(objTD, { type : "text", value : values }, rowId);
      removeCurrentFloatingDiv();
}


function getValuesForSelectManualListBox(multiple, valueType){
      var values = [];
      var noneSelected =  true;
      var options = currentFloatingDiv.getElementsByTagName("select")[0].options;
      for(var l = 0; l < options.length; l++) {
          if(options[l].style.display != 'none' && options[l].selected){
            if(valueType == "display"){
                values.push(options[l].text);
            }else{
                values.push(options[l].value);
            }
            noneSelected = false;
            if(!multiple){
                break;
            }
          }
      }
      var keyInTextBox;
      var inputElements = currentFloatingDiv.getElementsByTagName("input");
      for(var i = 0; i < inputElements.length; i++) {
        if(inputElements[i].id == "selectListManualTextBoxToKeyIn"){
            keyInTextBox = inputElements[i];
        }
      }
      if(!multiple && keyInTextBox.value.indexOf(",") > -1){
        alert(emxUIConstants.STR_LISTBOXMANUAL_NO_MULTIPLE_VALUES);
        return;
      }
      if(noneSelected){
        return keyInTextBox.value;
      }else{
        if(multiple){
            var valuetoBeAppended = "";
            if(keyInTextBox.value.length > 0){
                //doubtful
                var keyInValues = keyInTextBox.value.split(",");
                var keyInValuesSize =  keyInValues.length;
                for(var i = 0 ; i < values.length; i++) {
                    for(var l = 0 ; l < keyInValuesSize; l++)    {
                        if(values[i] == keyInValues[l]) {
                            keyInValues.remove(keyInValues[l]);
                            l--;
                            keyInValuesSize--;
                            //break;
                        }
                    }
                }
                //doubtful
                if(keyInValues.length > 0){
                    valuetoBeAppended = ","+keyInValues.join(",");
                }
            }
            return values.join(",")+ valuetoBeAppended;
        }else{
            if(keyInTextBox.value.length == 0){
                return values.join(",");
            }else{
                return keyInTextBox.value;

            }
        }
      }
}

function submitListboxManual(objEvent,multiple,objTD,rowId) {
    if(objEvent.keyCode == "13"){
        submitSelectedValues(document.getElementById("selectListManualDoneButton"),multiple,objTD,rowId);
        objEvent.preventDefault();
        objEvent.stopPropagation();
    }
}



//get value of the TD
function getTDValue(objTD, value){
    try{
        var iFH = objTD.getAttribute('iFH') == "true";
        if(value && !iFH) {
            return value;
        }

        var orginalValueTag = jQuery('span.original-value', objTD);
        if(orginalValueTag.length > 0){
            objTD = orginalValueTag[0];
        }
        if(!iFH){
            return trim(jQuery(objTD).text());
        }else{
            return objTD.innerHTML;
        }
    }catch(e){
        return e.description;
    }
}

function updateDimensionValue(objElm, textValue, comboValue, rowId)
{
    var newObj = new Object();
    newObj.value = textValue + " " + comboValue;
    newObj.type = "text";
    updateText(objElm, newObj, rowId);

}
//update selected table cell with formfield information
//rowId is added to bug 376333
function updateText(objElm,obj, rowId){
    if(justNavigating){
        justNavigating = false;
        return;
    }
    if(spellCheckWindow){
        return;
    }
    if(isDataModified()){
        disableExpandAllMenus();
      }
    if(obj.parentNode && obj.parentNode.parentNode){
        if(obj.id == "processing") {
            return;
        } else {
            obj.id = "processing";
        }
    } else if(obj.tagName){
        return;
    }

    var validated = true;
    //var objTDText = getTDValue(objElm);
    var displayValue = "";
    var actualVal = "";
    var mxLinkValue = "";
    var val = "";
    var index = "";
    var unit = "";
    var value = "";
    var tmpVal = getValue(obj);

    var currCol = colMap.getColumnByIndex(currentColumnPosition-1);
    var isNFEnabled = currCol.getSetting("isNF");
    if(isNFEnabled == "true"){
        obj.value = getFormattedNumber(tmpVal);
    }
    var isPFEnabled = currCol.getSetting("isPF");
    var symbol = "%";

    var theColumn = getColumn();
    var objTDText;
    var attributeType;
    var decimalQtySetting = emxUIConstants.DECIMAL_QTY_SETTING;
    try {
        attributeType = theColumn.getSetting("attributeType");
            objTDText = getValueForColumn(theColumn.name);
                 mxLinkValue = getValueForColumn(theColumn.name, "true");
    }catch(e){
        objTDText = getTDValue(objElm, null);
    }
    if(typeof tmpVal == "string"){
        //BUG 344102
        if (attributeType == "real") {
             if (tmpVal.indexOf(decimalQtySetting) == -1){
                 index = tmpVal.indexOf(" ");
                 if(index  > 0) {
                     value = tmpVal.substring(0, index);
                     unit  = tmpVal.substring(index + 1, tmpVal.length);
                     displayValue = isNFEnabled == "true" ? obj.value : value + decimalQtySetting + "0" +" "+ unit;
                     actualVal = value + decimalQtySetting + "0" +" " +unit;
                 }else {
                     displayValue = isNFEnabled == "true" ? obj.value : tmpVal + decimalQtySetting + "0";
                     actualVal = tmpVal + decimalQtySetting + "0";
                 }
            }else {
                displayValue = isNFEnabled == "true" ? obj.value : tmpVal;
                actualVal = tmpVal;
            }
        }
        else {
            displayValue = isNFEnabled == "true" ? obj.value : tmpVal;
            actualVal = tmpVal;
        }
     }else{
        if(tmpVal){
            displayValue = tmpVal[0];
            actualVal  = tmpVal[1];
        }
    }
    if(isPFEnabled == "true" && displayValue != ""){
         displayValue = displayValue + symbol;
    }
    var isTypeAheadValidate = currCol.getSetting("Type Ahead Validate");
    if(isTypeAheadValidate && isTypeAheadValidate === "true"){
        return;
    }
    var originalval =  getTDValue(objElm, null);
    if(displayValue == "" && objTDText== "" ){
        objTDText = objElm.textContent;
        originalval = objElm.textContent;
    }
    var objOldVal = displayValue;
    var mxLinkFound = false;
    var inputType = "";
    var uomAssociated = theColumn.getSetting("UOMAssociated");
    if (uomAssociated != null && uomAssociated != undefined && uomAssociated.toLowerCase() == "true")
    {
        inputType = "dimension";

        var index = objTDText.indexOf("(");
        var objValue = "";
        if (index != -1)
        {
            objTDText = trim(objTDText.substring(0, index));
        }

        if (tmpVal != null && tmpVal != undefined)
        {
            index = tmpVal.indexOf(" ");
            if (index != -1)
            {
                var value = tmpVal.substring(0, index);
                var isRequired = theColumn.getSetting("Required");
                if(isRequired == "true" && trim(value).length == 0)
                {
                    alert(emxUIConstants.ERR_REQUIRED_FIELD);
                    turnOffProgress();
                    obj.id = "";
                    return;
                }
                var unit = tmpVal.substring(index + 1, tmpVal.length);
                actualVal = value + " " + theColumn.getSetting(trim(unit));
            }
        }
    }
    var isRequired = !(theColumn.getSetting("Required")== undefined || theColumn.getSetting("Required")=="false");
    if(objTDText == null || objTDText == 'undefined') {
        objTDText = '';
    }
    //var edited = !(objTDText == objOldVal && objElm.className.indexOf("edited") == -1);
    var preserveSpaces = theColumn.getSetting("Preserve Spaces");
    var kTDText = objTDText;
    var kOldVal = objOldVal;
    if(preserveSpaces != "true"){
        kTDText = objTDText==""? objTDText:emxUICore.trim(objTDText);
        kOldVal = objOldVal==""? objOldVal:emxUICore.trim(objOldVal);
    }
      var edited = (kTDText != kOldVal);
    if(obj.type == "UOM"){
        edited = false;
    }
    if(edited){
        var bContinue = true;
        if(isRequired){
            bContinue = (trim(actualVal).length > 0);
        }
        if(bContinue){
            if(isDynamicURLEnabled()) {
                mxLinkFound = true;
                var displayValueXml = emxUICore.createXMLDOM();
                displayValueXml.loadXML("<mxLinkRoot/>");
                var textNode = displayValueXml.createTextNode(displayValue);
                var theRoot = displayValueXml.documentElement;
                theRoot.appendChild(textNode);
                
                var responseText = emxUICore.getTextXMLDataPost("emxFreezePaneValidate.jsp?editType=normal&paramName=" + theColumn.name, displayValueXml.xml);
                var root = responseText.documentElement;
                xPath = "message/alert/text()";
                val = emxUICore.selectSingleNode(root,xPath).nodeValue;
                if(val && val != null && val != "") {
                    alert(val);
                }
                xPath = "message/displaylink/text()";
                displayValue = emxUICore.selectSingleNode(root,xPath).nodeValue;
            }
            var theValidator = theColumn.getSetting("Validate");
            if(theValidator && theValidator.length > 0){
                //added for the bug 329326

                lastUpdatedColumn = theColumn.name;
                lastUpdatedColumnValue= actualVal;
                 var tempActualVal = escapeValueForEval(actualVal);
                validated = eval(theValidator + "('" +tempActualVal+ "','" + getStatus(getRow(rowId)) + "')");

                if(validated == true){
                    var objVal = document.createTextNode(displayValue);
                    var tdVal = objElm.innerHTML;
                    var curRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id='"+rowId+"']");
                    curRow = curRow != null ? curRow : currentRow;
                    var curStatus = curRow != null ? curRow.getAttribute("status") : "";
                    if(displayValue == originalval || curStatus == "add") {
                        objElm.innerHTML = displayValue;
                    } else {
                        objElm.innerHTML = displayValue + " <span class='original-value'>" + originalval + "</span>";
                    }
                    //objElm.title = displayValue;
                    objElm.title = getTDValue(objElm, null);
                }else{
                    //remove the floating formfield
                    if (obj.parentNode && obj.parentNode.parentNode)
                    {
                        obj.parentNode.parentNode.removeChild(obj.parentNode);
                    }
                    //set the edited state (class)

                    return;
                }
            }else{
                var objVal = document.createTextNode(displayValue);
                var tdVal = objElm.innerHTML;
                if(displayValue == originalval) {
                    objElm.innerHTML = encodeAngularBracketsText(displayValue,true);
                } else {
                    objElm.innerHTML = encodeAngularBracketsText(displayValue,true) + " <span class='original-value'>" + encodeAngularBracketsText(originalval,true) + "</span>";
                }
                //objElm.title = displayValue;
                objElm.title = getTDValue(objElm, null);
            }
        }else{
            validated = false;
            edited = false;
            alert(emxUIConstants.ERR_REQUIRED_FIELD);
        }
    }
    if (obj.parentNode && obj.parentNode.parentNode)
    {
        //remove the floating formfield
        obj.parentNode.parentNode.removeChild(obj.parentNode);
    }
    var displayLinkValue;
    if(mxLinkFound) {
        xPath = "message/actual/text()";
        actualVal = emxUICore.selectSingleNode(root,xPath).nodeValue;
        xPath = "message/display/text()";
        displayLinkValue = displayValue;
        displayValue = emxUICore.selectSingleNode(root,xPath).nodeValue;
        //objTDText = objElm.innerHTML;
    }
    //a few tests to make sure we update the correct data
    //dates, rangeHref values etc.
    //Begin: data tests
    if(theColumn && theColumn.getSetting("format")=="date"){
        val = {
            displayValue:displayValue,
            actualValue:new Date(actualVal).getTime(),
            attributeName:"msValue"
        };
    }else{
        val = {
            displayValue:displayValue,
            actualValue:actualVal,
            attributeName:null
        };
    }
    //End: data tests
    //if edited, store the new data and update local xmlData
    if(edited && validated){
        if(status != "new" && status != "lookup"){
        //currentCell.target.className = "mx_editable-selected-current-edited";
        var cls = currentCell.target.className;
        cls = cls + " mx_edited";
        currentCell.target.className = cls;
        }
        updateXMLData(objElm,objTDText,displayValue, mxLinkValue, displayLinkValue,true);
        updatePostXML(objElm,val);
        callToBuildColumValues(theColumn.name);
        var onChangeHandler = theColumn.getSetting("On Change Handler");
        if(onChangeHandler && onChangeHandler.length > 0){
            var aTemp = onChangeHandler.split(":");
            reloadCellType.push({Type :"onChange",Target :theColumn.name});
            for(var k=0; k < aTemp.length;k++){
                var tempActVal = escapeValueForEval(actualVal);
                eval(aTemp[k]+"('" +tempActVal+ "', '" + rowId +"','"+ theColumn.name + "')");
            }
            reloadCellType.pop();
        }
        //store edited cell
        editedCellArray[editedCellArray.length] = objElm;

        //Grayout the expand filter
        showExpandFilter(false);

        //iconStatusChanged
        if(objElm.parentNode!=null){
        var parentid = objElm.parentNode.id;
        var elem = document.getElementById('icon_'+parentid);
        if(elem){
        var eleminnerHTML = elem.innerHTML;
        var status =  getStatus(getRow(rowId));
        if(eleminnerHTML.indexOf('iconStatusChanged') < 0 && status !== "add" && status !== "new" && status !== "lookup") {
            elem.innerHTML = eleminnerHTML + '<img height=\"16\" align=\"middle\" src=\"images/iconStatusChanged.gif\"/>&#160;';
        }
        }else{
            bFullTreeDrawn = false;
            RefreshView();
        }
        }
    }
    syncRowHeightsAfterEdit(rowId);
    if(calRowsPresent == "true"){
    /* Must call rebuildView to show newly calculated rows. Feature added in V6R2010 */
        rebuildView();
    }else{
        RefreshView();
        //rebuildView();
    }
    syncRowHeightsAfterEdit(rowId);
    adjustTableHeight();
    syncSB();
    if (inputType == "dimension")
    {
        removeCurrentFloatingDiv();
        return;
    }
}

function isDynamicURLValue(value) {
    return /(:openDynamicURLWindow|mailTo\s*:)/i.test(value);
}

function isDynamicURLEnabled(theColumn) {
    if(!theColumn) {
        theColumn = getColumn();
    }
    var dynamicURL = theColumn.getSetting("Dynamic URL");
    if(dynamicURL == "disable") {
        return false;
    }

    return true;
}

function setMxLinkText(objXML, value) {
    if(isIE) {
        objXML.text = value;
    } else {
        var objDOM = emxUICore.createXMLDOM();
        var nTextNode = objDOM.createTextNode(value);
        for(var i=0; i<objXML.childNodes.length; i++) {
            objXML.removeChild(objXML.childNodes[i]);
            i--;
        }
        if (objXML.lastChild) {
            objXML.replaceChild(nTextNode, objXML.lastChild);
        } else {
            objXML.appendChild(nTextNode);
        }
    }
}

//return values from formfields
function getValue(obj){
    var type = obj.type ? obj.type : obj.getAttribute("type");
    switch(type){
        case "textarea":
        case "text":
        case "hidden":
            return obj.value;
        break;
        case "select-one":
            if(obj.selectedIndex == -1){
                return new Array("","");
            } else {
            return new Array(obj[obj.selectedIndex].text,obj[obj.selectedIndex].value);
            }
        break;
        case "checkbox":
            var checkbox = obj.rows[0].cells[0].firstChild;
            return    checkbox.checked ? checkbox.getAttribute("trueValue") : checkbox.getAttribute("falseValue");
        break;
        case "select-multiple":
            var texts  = [];
            var values = [];
            for(var i = 0; i < obj.options.length; i++) {
              var opt = obj.options[i];
              if (opt.selected) {
                   values.push(opt.value);
                   texts.push(opt.text);
              }
            }
            return new Array(texts.join(","),values.join(","));
        break;
        case "selection" :

            if(obj.id == "listBoxManualDiv"){
                return getValuesForSelectManualListBox(obj.getElementsByTagName("select")[0].multiple);
            }else{
            var values = [];
              var sboxes = obj.getElementsByTagName("input");
              for(var l = 0; l < sboxes.length; l++) {
                  if(sboxes[l].checked)
                  values.push(sboxes[l].value);
              }
              return values.join(",");
            }
          break;
        default:
    }
}
/**
 * updates the postDataXML
 * objVal can be a string or object
 * example
 * objVal.displayValue = val
 * objVal.actualValue = hiddenVal
 * objVal.attributeName = "msValue"
 */
function updatePostXML(objElm,objVal,colIndex,dispColumnValue){
    //check objVal for value(s)
    var val = null;
    if(typeof objVal == "object"){
        val = objVal.actualValue;
        if(objVal.attributeName == "msValue"){
            val = objVal.displayValue;
        }
    }else{
        val = objVal;
    }
    //get the oid and relId from TR
    var theRow = null;
    if (objElm.nodeName == "r") {
        theRow = objElm;
    } else {
        theRow = objElm.parentNode;
    }
    var theOid = theRow.getAttribute("o");
    var theRelId = theRow.getAttribute("r");
    var theRowId = theRow.getAttribute("id");
    var oXMLRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id='"+theRowId+"']");
    var theParentId = oXMLRow.getAttribute("p");
    var theMarkup = oXMLRow.getAttribute("status");
    var theLevel = oXMLRow.getAttribute("level");

    //get the column name from the cellIndex
    var theColumn = null;
    var iTempIndex = null;
    if(colIndex != null){
        iTempIndex = colIndex;
        colIndex = colIndex - 1;
        theColumn = colMap.getColumnByIndex(colIndex);
    }else{
        theColumn = colMap.getColumnByIndex(objElm.getAttribute("position")-1);
        iTempIndex = objElm.getAttribute("position");
    }
    var theColumnName = theColumn.name;
    var oXMLCol = emxUICore.selectSingleNode(oXMLRow, "c[" + iTempIndex + "]");
    //add a new "object" node to the postDataXML
    var theRoot = postDataXML.documentElement;
    var newNode = null;
    //if no object node create object
    if (theRelId == null)
    {
        theRelId = "";
    }
    if (theParentId == null)
    {
        theParentId = "";
    }
    var columnInfo = emxUICore.selectSingleNode(oXML,"/mxRoot/columns")
    var columnChilds = columnInfo.childNodes;
    var isBasicAttribute = "false";
    var columnType = null;
    if(colIndex != null){
        columnType = columnChilds[colIndex].getAttribute("type");
    }else{
        columnType = columnChilds[currentColumnPosition-1].getAttribute("type");
    }
    if(columnType == "businessobject"){
        isBasicAttribute = "true";
    }
    var xPath = null;
    if(theMarkup=="add" && isBasicAttribute=="false"){
        xPath = "/mxRoot//object[@rowId='"+theRowId+"'][@objectId = '" + theOid +"'][@relId = '" + theRelId +"']";//added to search by row Id
    }
    else if(theMarkup == "new" || theMarkup == "lookup"){
        xPath = "/mxRoot//object[@rowId='"+theRowId+"'][@objectId = '" + theOid +"'][@relId = '" + theRelId +"']";//added to search by row Id
    }
    else{
        xPath = "/mxRoot/object[@rowId='"+theRowId+"'][@objectId = '" + theOid +"'][@relId = '" + theRelId +"']";//added to search by row Id
    }
    var existingNode = emxUICore.selectSingleNode(theRoot,xPath);


   // update in postdataxml
            var newNode = postDataXML.createElement("object");
               if(existingNode!=null){
                   // The column name may contain ' (single quote). Use " (double quotes) to enclose the name.
                    var colNode = emxUICore.selectSingleNode(existingNode,"column[@name=\""+theColumnName+"\"]");
                    if(colNode != null)
                    {
                        emxUICore.setText(colNode,val);
                        colNode.setAttribute("edited","true");
                        if(existingNode.getAttribute("markup")==null)
                        existingNode.setAttribute("markup","changed");

                    }else
                    {
                        colNode = postDataXML.createElement("column");
                        colNode.setAttribute("name",theColumnName);
                        colNode.setAttribute("edited","true");
                        var textNode = postDataXML.createTextNode(val);
                        colNode.appendChild(textNode);
                        if(existingNode.getAttribute("markup")==null)
                        existingNode.setAttribute("markup","changed");
                        existingNode.appendChild(colNode);
                    }
                }
                else{
                    var newNodeMarked=postDataXML.createElement("object");
                    newNodeMarked.setAttribute("rowId",theRowId);
                    newNodeMarked.setAttribute("objectId",theOid);
                    newNodeMarked.setAttribute("relId",theRelId);
                    newNodeMarked.setAttribute("parentId",theParentId);
                    newNodeMarked.setAttribute("markup","changed");
                    newNodeMarked.setAttribute("level",theLevel);

                    var colNode = postDataXML.createElement("column");
                    colNode.setAttribute("name",theColumnName);
                    colNode.setAttribute("edited","true");
                    var textNode = postDataXML.createTextNode(val);
                    colNode.appendChild(textNode);
                    newNodeMarked.appendChild(colNode);

                    theRoot.appendChild(newNodeMarked);
                }
                if(oXMLCol) {
                    if(dispColumnValue != undefined){
                         oXMLCol.setAttribute("newA",dispColumnValue);
                    }else{
                         oXMLCol.setAttribute("newA",val);
                    }
                }
}
function editMode(){

    if(displayView != "detail"){
        showDisplayView("detail");
    }

    var action = "";
    //if preprocess action is stop don't swith to edit mode
    if((preProcessURL && preProcessURL !="") || (preProcessJPO && preProcessJPO !=""))
    {
        action = processHookIn("pre");
        if(action=="stop"){
            return;
        }
    }
    var toolbar = document.getElementById("mxlinkiconId");
    if(toolbar) {
        toolbar.style.display = "block";
    }
    //Iterate through toolbars [Added to support Structure Browser - Edit Mode Toolbar]
    for(var toolbarIndex=0; toolbarIndex<toolbars.length; toolbarIndex++)
    {
        var currentToolbar = toolbars[toolbarIndex];
        if(toolbarIndex == 2)
        {
            continue;
        }else if(toolbarIndex !=0)
        {
             //if Mode Setting is defined on first Toolbar,it is ignored .
             // Mode check for toolbars
             var currentToolbarMode = currentToolbar.getMode();
             if(currentToolbarMode == "view")
             {
                  // Hide the toolbar
                  var hiddenToolbar = getTopWindow().document.getElementById(currentToolbar.name);
                  hiddenToolbar.style.display = "none";
                  continue;
             }else if(currentToolbarMode == "edit")
             {
                  //show the toolbar
                  var hiddenToolbar = getTopWindow().document.getElementById(currentToolbar.name);
                  hiddenToolbar.style.display = "block";
             }
         }
         disableOrEnableToolbarItems(currentToolbar, "view", "edit");
    }
    if((action.toLowerCase() == "continue") || (action == ""))
    {
        var cellWrap = getParameter("cellwrap");
        if(emxUIConstants.STORAGE_SUPPORTED){
            var tablename = getTableNameFromXML();
            var storage = $.localStorage;
            cellWrap = storage.isEmpty('SB',tablename, 'cellwrap') ? cellWrap : storage.get('SB',tablename, 'cellwrap');
        }

        var divCenterDiv = "mx_editable";
        if(cellWrap == "true"){
            divCenterDiv="mx_wrap-all mx_editable";
        }
        editableTable.divCenterDiv.className=divCenterDiv;
        var obj = findToolbarItem(objMainToolbar,"editMode()");
        if(obj)
        {
            if(obj.element){
                toggleEditButton(obj,"iconActionEdit","iconActionDisableEdit",emxUIConstants.STR_ENABLE_EDIT, emxUIConstants.STR_DISABLE_EDIT, emxUIConstants.STR_EDIT, emxUIConstants.STR_VIEW);
                obj.url = "javascript:void(viewMode())";
            }else{
                var objToggle = findOverflowItem(objMainToolbar,"editMode()");

                var objTR = objToggle.rowElement;
                var objDIV = objTR.firstChild;
                var objDIV1 = objTR.lastChild;
                // Replace the image name
                objDIV.innerHTML = objDIV.innerHTML.replace(/iconActionEdit/g, "iconActionDisableEdit");
                 // replace the text
                objDIV1.innerHTML = objDIV1.innerHTML.replace(emxUIConstants.STR_ENABLE_EDIT, emxUIConstants.STR_DISABLE_EDIT);
                if(obj.element && obj.element.title) {
                    obj.element.title = emxUIConstants.STR_DISABLE_EDIT;
                }

                obj.url = "javascript:void(viewMode())";
                objToggle.url = "javascript:void(viewMode())";
            }
        }
        //set mode
        editableTable.mode = "edit";
        postDataStore("edit","add","mode");

        var filterDiv = document.getElementById("divFilter");
        if(filterDiv){
            filterDiv.style.display = "none";
        }

        var divPageFootButtons = document.getElementById("divPageFootButtons");
            if(divPageFootButtons){
                divPageFootButtons.style.display = "none";
                //document.body.style.paddingBottom = "10px";
                /*if (isIE)
                {
                    document.body.style.paddingBottom = "10px";
                }
                else
                {
                    editableTable.mxDivTree.style.bottom = "60px";
                    editableTable.mxDivTable.style.bottom = "60px";
                    editableTable.divGrabber.style.bottom = "60px";
                }*/
            }
            var massUpdateDiv = document.getElementById("divMassUpdate");
            if(massUpdateDiv){
                massUpdateDiv.style.display = "block";
                if(isMoz){
                    editableTable.divCenterDiv.style.display = "none";
                    editableTable.divCenterDiv.style.display = "block";
                    //editableTable.divTreeHead.style.display = "none";
                    //editableTable.divTreeHead.style.display = "block";
                }
            }
        setInitialHeight();
    }

    // Update the oXML with mode information
    var strMode = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name = 'sbMode']");
    if(!strMode && !isStructureCompare == "TRUE"){
        strMode = oXML.createElement("setting");
        strMode.setAttribute("name", "sbMode");
        emxUICore.setText(strMode, editableTable.mode);
        oXML.documentElement.appendChild(strMode);
    }else{
        emxUICore.setText(strMode, editableTable.mode);
    }
    //Added to Handle preProcessJavaScript()
    if(preProcessJavaScript && preProcessJavaScript !=""){
        var aTemp = preProcessJavaScript.split(":");
        for(var k=0; k < aTemp.length;k++){
            eval(aTemp[k]+"()");
        }
    }
    RefreshTableHeaders();
    rebuildView();
	if(isIE){
    	syncSB();
    }else {
    	$(document).waitForImages(function(){
    		syncSB();
    	});
    }
    editableTable.adjustTreeLastColumn();
    if(getTopWindow().emxUIAutoFilter){
        getTopWindow().emxUIAutoFilter.cmdEnableDisableByMode(editableTable.mode);
    }
    if(isFirstTimeLoad=="FALSE") {
	    syncSB();
	}
}

//switch page into view mode
function viewMode(cancelHookIn,initialLoad){
    var doHookIn = true;
    if(typeof cancelHookIn != "undefined" && cancelHookIn){
        doHookIn = false;
    }
    if(isDataModified()){
        if(!confirm(emxUIConstants.STR_VIEW_MSG)){
            return;
        }

        resetEdits();
    }
    var hiddenModeEle = document.getElementById("edit");
    if(hiddenModeEle != null){
        postDataStore("mode", "remove");
    }
    showExpandFilter(true);
    var cellWrap = getParameter("cellwrap");
    if(emxUIConstants.STORAGE_SUPPORTED){
        var tablename = getTableNameFromXML();
        var storage = $.localStorage;
        cellWrap = storage.isEmpty('SB',tablename, 'cellwrap') ? cellWrap : storage.get('SB',tablename, 'cellwrap');
    }

    var divCenterClass = "";
    if(cellWrap == "true"){
        divCenterClass ="mx_wrap-all";
    }
    editableTable.divCenterDiv.className = divCenterClass;
    var toolbar = document.getElementById("mxlinkiconId");
    if(toolbar) {
        toolbar.style.display = "none";
    }
    if(((cancelProcessURL && cancelProcessURL != "") || (cancelProcessJPO && cancelProcessJPO != "")) && doHookIn) {
        processHookIn("cancel");
    }

    removeCurrentFloatingDiv();
    resetPreProcess();
    var obj = findToolbarItem(objMainToolbar,"viewMode()");
    //Iterate through toolbars [Added to support Structure Browser - Edit Mode Toolbar]
    for(var toolbarIndex=0; toolbarIndex<toolbars.length; toolbarIndex++)
    {
        var currentToolbar = toolbars[toolbarIndex];
        if(toolbarIndex == 2)
        {
            continue;
        }else if(toolbarIndex != 0)
        {
             //if Mode Setting is defined on first toolbar,it is ignored .
             //Mode check for Toolbars
             var currentToolbarMode = currentToolbar.getMode();
             if(currentToolbarMode == "edit")
             {
                  //Hide the toolbar
                  var hiddenToolbar = getTopWindow().document.getElementById(currentToolbar.name);
                  hiddenToolbar.style.display = "none";
                  continue;
             }else if(currentToolbarMode == "view")
             {
                  //Show the toolbar
                  var hiddenToolbar = getTopWindow().document.getElementById(currentToolbar.name);
                  hiddenToolbar.style.display = "block";
             }
         }
         disableOrEnableToolbarItems(currentToolbar, "edit", "view");
     }
    if(obj)
    {
        if(obj.element){
            toggleEditButton(obj,"iconActionDisableEdit","iconActionEdit",emxUIConstants.STR_DISABLE_EDIT,emxUIConstants.STR_ENABLE_EDIT,emxUIConstants.STR_VIEW,emxUIConstants.STR_EDIT);
            obj.url = "javascript:void(editMode())";
        }else{
            var objToggle = findOverflowItem(objMainToolbar,"viewMode()");
            var objTR = objToggle.rowElement;
            var objDIV = objTR.firstChild;
            var objDIV1 = objTR.lastChild;
            // Replace the image name
            objDIV.innerHTML = objDIV.innerHTML.replace(/iconActionDisableEdit/g, "iconActionEdit");

            // replace the text
            objDIV1.innerHTML = objDIV1.innerHTML.replace(emxUIConstants.STR_DISABLE_EDIT, emxUIConstants.STR_ENABLE_EDIT);

            if(obj.element && obj.element.title) {
                obj.element.title = emxUIConstants.STR_ENABLE_EDIT;
            }

            obj.url = "javascript:void(editMode())";
            objToggle.url = "javascript:void(editMode())";
        }
    }
    //set mode
    editableTable.mode = "view";
    //TODO check if edits have been applied
    var filterDiv = document.getElementById("divFilter");
    if(filterDiv){
        filterDiv.style.display = "block";
    }

     var divPageFootButtons = document.getElementById("divPageFootButtons");
        if(divPageFootButtons){
            divPageFootButtons.style.display = "block";
            //document.body.style.paddingBottom = "60px";
            /*if (isIE)
            {
            document.body.style.paddingBottom = "60px";
            }
            else
            {
                editableTable.mxDivTree.style.bottom = "60px";
                editableTable.mxDivTable.style.bottom = "60px";
                editableTable.divGrabber.style.bottom = "60px";
            }*/
        }

        var massUpdateDiv = document.getElementById("divMassUpdate");
        if(massUpdateDiv){
            massUpdateDiv.style.display = "none";
            if(isMoz){
                editableTable.divCenterDiv.style.display = "none";
                editableTable.divCenterDiv.style.display = "block";
                //editableTable.divTreeHead.style.display = "none";
                //editableTable.divTreeHead.style.display = "block";
            }
        }
    setInitialHeight();

    // Update the oXML with mode information
    var strMode = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name = 'sbMode']");
    if(!strMode && !isStructureCompare == "TRUE"){
        strMode = oXML.createElement("setting");
        strMode.setAttribute("name", "sbMode");
        emxUICore.setText(strMode, editableTable.mode);
        oXML.documentElement.appendChild(strMode);
    }else{
        emxUICore.setText(strMode, editableTable.mode);
    }
   if(!initialLoad){
    RefreshTableHeaders();
    rebuildView();
	if(isIE){
    	syncSB();
    }else {
    	$(document).waitForImages(function(){
    		syncSB();
    	});
    }
   }
    editableTable.adjustTreeLastColumn();
    if(getTopWindow().emxUIAutoFilter){
        getTopWindow().emxUIAutoFilter.cmdEnableDisableByMode(editableTable.mode);
    }
    if(isFirstTimeLoad=="FALSE") {
	    syncSB();
	}
}
/*
 * Enables or Disables Submenus and items in it to any level according to Mode Setting defined[Added to support
 * Structure Browser - Edit Mode Toolbar].
 * @param temp1
 * @param disableMode
 * @param enableMode
 */

function disableOrEnableSubMenusandCommands (currentItem, disableMode ,enableMode){
    var currentItemMode = null;
    var doIgnoreRowSelect = true;
    var enableRowSelectWithoutMode = false;
    if(typeof currentItem.listLink != 'undefined' && currentItem.listLink){
        if(parent.ids.length > 1)
        {
            doIgnoreRowSelect = true;
            enableRowSelectWithoutMode = true;
        }else{
            doIgnoreRowSelect = false;
        }
    }
    if(currentItem != null)
    {
          currentItemMode = currentItem.getMode();
          if(currentItemMode == disableMode)
          {
             currentItem.disable();
             return;
          }else if(currentItemMode == enableMode && doIgnoreRowSelect)
          {
             currentItem.enable();
          }else if(enableRowSelectWithoutMode){
              if(currentItem.dead == true){
                 currentItem.enable();
              }
          }
          if(currentItem.menu != null)
          {
              for(var j=0; j<currentItem.menu.items.length; j++)
              {
                  currentItemMode = currentItem.menu.items[j].getMode();
                  doIgnoreRowSelect = true;
                  enableRowSelectWithoutMode = false;
                  if(typeof currentItem.menu.items[j].listLink != 'undefined' && currentItem.menu.items[j].listLink){
                     if(parent.ids.length > 1)
                     {
                        doIgnoreRowSelect = true;
                        enableRowSelectWithoutMode = true;
                     }else{
                        doIgnoreRowSelect = false;
                     }
                  }
                  if(currentItemMode == disableMode)
                  {
                      currentItem.menu.items[j].disable();
                      continue;
                  }else if(currentItemMode == enableMode && doIgnoreRowSelect)
                  {
                      currentItem.menu.items[j].enable();
                  }else if(enableRowSelectWithoutMode){
                      if(currentItem.menu.items[j].dead == true){
                           currentItem.menu.items[j].enable();
                      }
                  }
                  if(currentItem.menu.items[j].menu != null)
                  {
                    disableOrEnableSubMenusandCommands(currentItem.menu.items[j], disableMode, enableMode);
                  }
              }
              return;
          }else
          {
          return;
          }
    }else
    {
        return;
    }
}

/*
 * Disables or Enables an Anchor element[Added to Support Structure Browser - Edit Mode Toolbar]
 * @param obj
 * @param disable
 */
function disableOrEnableAnchor(anchorElement, disable){
  var innerHTMLText = anchorElement.innerHTML;
  if(disable) {
      var href = anchorElement.getAttribute("href");
      if(href != null && href.indexOf("javascript:showCalendar") > -1) {
        innerHTMLText = innerHTMLText.replace('/iconSmallCalendar.gif', '/iconSmallCalendarDisabled.gif');
        anchorElement.innerHTML = innerHTMLText;
      }
      if(href && href != "" && href != null) {
         anchorElement.setAttribute('href_bak', href);
      }
      anchorElement.removeAttribute('href');
  } else {
      var href_bak = anchorElement.getAttribute("href_bak");
      if(href_bak != null && href_bak.indexOf("javascript:showCalendar") > -1){
        innerHTMLText = innerHTMLText.replace('/iconSmallCalendarDisabled.gif', '/iconSmallCalendar.gif');
        anchorElement.innerHTML = innerHTMLText;
      }
      if(anchorElement.getAttribute("href_bak")!= null) {
        anchorElement.setAttribute('href', anchorElement.attributes['href_bak'].nodeValue);
      }
  }
}
/*
 * Disables or Enables a HTML Control like textbox,combo box etc...[Added to Support Structure Browser - Edit Mode Toolbar]
 * @param htmlElement
 * @param value
 */
 function disableOrEnableHTMLElement(htmlElement, bDisabled) {
     if(htmlElement.element){
    if(isIE)
    {
        for(var childIndex=0; childIndex<htmlElement.element.children.length; childIndex++)
        {
            var htmlElementChild = htmlElement.element.children[childIndex];
            if(htmlElementChild.tagName == "A")
            {
                disableOrEnableAnchor(htmlElementChild,bDisabled);
            }else
            {
                htmlElementChild.disabled = bDisabled;
            }
        }
   }else
   {
       for(var childIndex=0; childIndex<htmlElement.element.childNodes.length; childIndex++)
       {
           var htmlElementChild = htmlElement.element.childNodes[childIndex];
           if(htmlElementChild.tagName == "A")
           {
                disableOrEnableAnchor(htmlElementChild,bDisabled);
           }else{
                htmlElementChild.disabled = bDisabled;
           }
       }
   }
   }
 }

 /*
 * Disables or Enables Toolbar Items[Added to Support Structure Browser - Edit Mode Toolbar]
 * @param disableMode
 * @param enableMode
 */
 function disableOrEnableToolbarItems(currentToolbar, disableMode ,enableMode){
     //Iterate through currentToolbar Items
     for(var toolbarItemIndex=0; toolbarItemIndex<currentToolbar.items.length; toolbarItemIndex++)
     {
         var toolbarCurrentItem = currentToolbar.items[toolbarItemIndex];
         var doIgnoreRowSelect = true;
         var enableRowSelectWithoutMode = false;
         if(typeof toolbarCurrentItem.listLink != 'undefined' && toolbarCurrentItem.listLink){
            if(isAnyRowChecked() && parent.ids.length > 1){
                doIgnoreRowSelect = true;
                enableRowSelectWithoutMode = true;
            }else{
                doIgnoreRowSelect = false;
            }
         }
         //Mode check for Items in Toolbar
         currentMode = toolbarCurrentItem.getMode();
         if(currentMode == disableMode)
         {
              toolbarCurrentItem.disable();
            //check for HTML control element
            if(toolbarCurrentItem.hasOwnProperty("htmlControl"))
            {
                 disableOrEnableHTMLElement(toolbarCurrentItem, true);
            }
            continue;
          }else if(currentMode == enableMode && doIgnoreRowSelect )
          {
              toolbarCurrentItem.enable();
            //check for HTML control element
            if(toolbarCurrentItem.hasOwnProperty("htmlControl"))
            {
                disableOrEnableHTMLElement(toolbarCurrentItem, false);
            }
          }else if(enableRowSelectWithoutMode){
              if(toolbarCurrentItem.enabled != true){
                 toolbarCurrentItem.enable();
              }
          }
          //if toolbarCurrentItem is a menu
          if (toolbarCurrentItem.menu != null)
          {
             for(var index=0; index<toolbarCurrentItem.menu.items.length; index++)
             {
                disableOrEnableSubMenusandCommands(toolbarCurrentItem.menu.items[index], disableMode, enableMode);
             }
           }
      }
 }

/*
* Appends the list of Ids that are modified to the postDataXML
*/
function appendIdNode(toggleArray){

    var objRelArray = new Array();
    var tempArray = new Array();
    // When a node is collapsed by clicking - icon, get the list of child nodes to be unreserved
    if(toggleArray)
    {
        objRelArray = toggleArray;
    }
    else
    {
        objRelArray = getObjectRelIds();
    }

    var theRoot = postDataXML.documentElement;
    var existingIdNode = emxUICore.selectSingleNode(theRoot,"/mxRoot/IdList");
    if(existingIdNode != null)
    {
    existingIdNode.parentNode.removeChild(existingIdNode);
    }
    var idListNode = postDataXML.createElement("IdList");

    idListNode.setAttribute("total", objRelArray.length);

    for(var i = 0; i < objRelArray.length; i++)
    {
        var tempArr = objRelArray[i].split("|");
        var objId = tempArr[0];
        var relId = tempArr[1];

        var idNode = postDataXML.createElement("Id");
        idNode.setAttribute("o", objId);
        idNode.setAttribute("r", relId);
        idListNode.appendChild(idNode);
    }

    theRoot.appendChild(idListNode);
    return objRelArray;
}

function isExpanded(currElement) {

    var rootDiv = document.getElementById("mx_divTreeBody");

    if(currElement!=null) {
        rootDiv = currElement;
    }

    var childRows = rootDiv.childNodes;
    var oLen = childRows.length;

    if(isIE)
    {
        for(var i = 0; i < oLen ; i++) {
           if((childRows[i] != null) && (childRows[i].getElementsByTagName("div")).length > 0 && childRows[i].style.display == "block")
           {
            return true;
           }
        }
    }
    else
    {
        for(var i = 0; i < oLen ; i++) {
           if(childRows[i].nodeType == 3)
           {
            continue;
           }
           if((childRows[i] != null) && (childRows[i].getElementsByTagName("div")).length > 0 && childRows[i].style.display == "block")
           {
            return true;
           }
        }
    }
    return false;
}

function getParentDiv(currElement) {

    if(currElement==null) {
        return document.getElementById("mx_divTreeBody");
    }

    if((currElement.id).indexOf('nodeDiv_children_')>=0) {
        return currElement;
    } else {
        return getParentDiv(currElement.parentNode);
    }
}

function setPreProcess(currElement) {

    var rootDiv = currElement;

    if(!rootDiv || rootDiv == null) {
        setPreProcess(document.getElementById("mx_divTreeBody"));
    } else {
        var childRows = rootDiv.childNodes;
        var oLen = childRows.length;
        if(isIE) {
            for(var i = 0; i < oLen ; i++) {
                if((childRows[i] != null) && (childRows[i].getElementsByTagName("div")).length > 0 && childRows[i].style.display == "block")
                {
                    childRows[i].setAttribute("preProcessDone","true");
                    setPreProcess(childRows[i]);
                }
            }
        } else {
            for(var i = 0; i < oLen ; i++) {
                if(childRows[i].nodeType == 3) {
                    continue;
                }
                if((childRows[i] != null) && (childRows[i].getElementsByTagName("div")).length > 0 && childRows[i].style.display == "block")
                {
                    childRows[i].setAttribute("preProcessDone","true");
                    setPreProcess(childRows[i]);
                }
            }
        }
    }
}

function resetPreProcess(currElement) {

    var rootDiv = currElement;

    if(!rootDiv || rootDiv == null) {
        resetPreProcess(editableTable.divListBody);
    } else {
        var childRows = rootDiv.childNodes;
        var oLen = childRows.length;
        if(isIE) {
            for(var i = 0; i < oLen ; i++) {
                    if((childRows[i] != null) && isElementNode(childRows[i]) && (childRows[i].getElementsByTagName("div")).length > 0) {
                    if(childRows[i].style.display == "block" || childRows[i].style.display == "none") {
                        if(childRows[i].getAttribute("preProcessDone")=="true") {
                            childRows[i].setAttribute("preProcessDone","false");
                            resetPreProcess(childRows[i]);
                        }
                    }
                }
            }
        } else {
            for(var i = 0; i < oLen ; i++) {
                if(childRows[i].nodeType == 3) {
                    continue;
                }
                if((childRows[i] != null) && isElementNode(childRows[i]) && (childRows[i].getElementsByTagName("div")).length > 0) {
                    if(childRows[i].style.display == "block" || childRows[i].style.display == "none") {
                        if(childRows[i].getAttribute("preProcessDone")=="true") {
                            childRows[i].setAttribute("preProcessDone","false");
                            resetPreProcess(childRows[i]);
                        }
                    }
                }
            }
        }
    }
}

var ELEMENT_NODE = 1;
var ATTRIBUTE_NODE = 2;
var TEXT_NODE = 3;
var CDATA_SECTION_NODE = 4;
var ENTITY_REFERENCE_NODE = 5;
var ENTITY_NODE = 6;
var PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
var DOCUMENT_TYPE_NODE = 10;
var DOCUMENT_FRAGMENT_NODE = 11;
var NOTATION_NODE = 12;

function isElementNode(objElem){
    if(objElem && objElem.nodeType && objElem.nodeType == ELEMENT_NODE){
        return true;
    }else{
        return false;
    }
}

/**
 * Calls the intermediate JSP for PostProcess
 */
function processHookIn(mode, levelId){
    var url = "emxFreezePaneProcessHookIn.jsp?timeStamp=" + timeStamp + "&mode=" + mode;
    if (levelId) {
        url += "&levelId=" + levelId;
    }

    if (mode == "pre") {
        if (preProcessURL) {
            url += "&hookInURL=" + preProcessURL;
        }
        if (preProcessJPO) {
            url += "&hookInJPO=" + preProcessJPO;
        }
    } else if (mode == "cancel") {
        if (cancelProcessURL) {
            url += "&hookInURL=" + cancelProcessURL;
        }
        if (cancelProcessJPO) {
            url += "&hookInJPO=" + cancelProcessJPO;
        }
    }
    url += getToolbarData(false);

    var xmlResponse = emxUICore.getXMLDataPost(url);
    try {
        var root = xmlResponse.documentElement;
        //Added for Bug - 342961
        var xPath = "action/text()";
        var action = emxUICore.selectSingleNode(root,xPath).nodeValue;
        action = action.toLowerCase();
        xPath = "message/text()";
        var msg = emxUICore.selectSingleNode(root,xPath).nodeValue;
        //Added for Bug - 342961
        if(msg && msg != null && msg != "" && action != "execscript") {
                alert(msg);
        }
        //Bug - 367368
        if (!levelId ) {
            switch (action) {
                case "refresh":
                    //refreshRows();
                    refreshStructureWithOutSort();
                    action = "continue";
                    break;
                case "execscript": //Added for Bug - 342961
                    //get the error node
                    if(msg && msg != null && msg != "") {
                       var jsObject = eval('(' + msg + ')');
                       jsObject.main();
                    }
                    action = "continue";
                    break;
                case "continue":
                case "stop":
                default:
                    //do nothing
                    break;
            }
        }
    } catch (e) {
        // handle exception
        alert(e.message);
    }
    return action;
}

/**
 * Calls the intermediate JSP for PreProcess
 */
 var readonlyArray = new Array();
function invokePreProcess(levelId){
    var url = "emxFreezePanePreProcess.jsp?fpTimeStamp=" + timeStamp;
    if (levelId) {
        url += "&levelId=" + levelId;
    }
    var xmlResponse = emxUICore.getXMLData(url);

    var root = xmlResponse.documentElement;
    var xPath = "message/text()";
    var msg = emxUICore.selectSingleNode(root,xPath).nodeValue;
    if(msg && msg != null && msg != "") {
        alert(msg);
    }
    xPath = "action/text()";
    var action = emxUICore.selectSingleNode(root,xPath).nodeValue;

    if(!levelId && (action.toLowerCase() == "continue") || (action == ""))
    {
        refreshRows();
    }
    return action;
}

/**
*sets the editMask attribute to true
*/
function setEditMask(strOid, strRelId, rEditable, timeStampValue, root){

    var xpath = "//r[@o='" + strOid +"'][@r='" + strRelId +"']/c";
    var cRows = emxUICore.selectNodes(root, xpath);

    // Updating cells by changing the classname
    var trArray = document.getElementById("tr2_" + strOid + strRelId + timeStampValue);
    var tdArray = new Array();
    if(trArray != null) {
        tdArray = trArray.getElementsByTagName("TD");
    }
    var len = tdArray.length;
    var count = 0;
    for(var i=0;i<len;i++)
    {
    if(tdArray[i].className != "mx_sizer")
    {
        var theCell = editableTable.tblListHead.tBodies[0].rows[0].cells[i];
        // Makes the cells readonly if either the objectId or the relId matches with the corresponding attributes
        if(tdArray[i].parentNode.getAttribute("o") == strOid || tdArray[i].parentNode.getAttribute("r") == strRelId){
            if(trim(rEditable.toLowerCase()) == "readonly") {
                if(tdArray[i].className.indexOf("mx_editable") > -1){
                    tdArray[i].className = "";
                }
            } else if(trim(rEditable.toLowerCase()) == "show") {
                if((theCell && (theCell.className.indexOf("mx_editable") > -1))) {
                    if(cRows[count].getAttribute("editMask") != "false" ) {
                        tdArray[i].className = "mx_editable";
                    }
                }
            }
            count++;
        }
    }
    }

}
/**
* Finds the toolbar menu item by its command name
* @param strCommand The command name
*/
function findMenu(strCommand){
    var menuLen = objMainToolbar.items.length;
    for(var i = 0; i < menuLen; i++){
        if(objMainToolbar.items[i].command == strCommand){
            return objMainToolbar.items[i];
        }
    }
return null;
}

function resetUrlParameters(param,value,query)
{
    if(query && query != null) {
        query.set(param, value);
    }
    resetParameter(param, value);
}

/**
* Reloads page with selected filter
* @param filter The new filter value
*/
function filterPage(objThis,persist, filterName, filterValue){
    if(isDataModified()){
        if(!confirm(emxUIConstants.STR_FILTER_MSG)){
            return;
        }

    }
    //modify persist behavior based on persistObjectIDs URL parameter
    var persistObjectIDs = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='persistObjectIDs']/text()");
    persistObjectIDs  = persistObjectIDs != null ? emxUICore.getText(persistObjectIDs) : "";
    persist = persistObjectIDs == "false"? persistObjectIDs : persist;

    if(editableTable.processing){
        return;
    }
    editableTable.processing = true;
    try{

        var searchquery = null;
        if (fullTextSearchObj){
            var wTop = getTopWindow();
            searchquery = new wTop.Query(fullTextSearchObj.getContentUrl());
        }

        var subHeader,header;
        subHeader  = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='subHeader']/text()");
        subHeader  = subHeader != null ? emxUICore.getText(subHeader) : "";
        subHeader = encodeURIComponent(subHeader);
        header     = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='header']/text()");
        header     = header != null ? emxUICore.getText(header) : "";
        //header = encodeURIComponent(header);
        resetParameter("subHeader", subHeader);
        resetParameter("header", header);
        // get sort column and sort direction

        if (filterName && filterName == "ProgramFilter") {
            resetUrlParameters("selectedProgram", filterValue,searchquery);
        }

        if (filterName && filterName == "TableFilter") {
            resetUrlParameters("selectedTable", filterValue,searchquery);
        }

        //set objectId back to original
        resetUrlParameters("objectId", objectId,searchquery);

        //get to and from
        var direction = "";
        if (getTopWindow().document.getElementById("to")) {
            var toVal = (getTopWindow().document.getElementById("to"))?getTopWindow().document.getElementById("to").checked:0;
            var fVal = (getTopWindow().document.getElementById("from"))?getTopWindow().document.getElementById("from").checked:0;
            if(toVal && fVal){
                resetUrlParameters("direction","both",searchquery);
                direction = "both";
            }else if(toVal){
                resetUrlParameters("direction","to",searchquery);
            }else if(fVal){
                resetUrlParameters("direction","from",searchquery);
            }else{
                resetUrlParameters("direction","both"),searchquery;
                direction = "both";
            }
        }
        //get filters type
        var formItem = getTopWindow().document.getElementById("select_type");
        var typeFilter = (formItem && formItem.options)?formItem[formItem.selectedIndex].value:0;
        if(typeFilter){
            resetUrlParameters("selectedType",typeFilter,searchquery);
        }
        //relationship
        formItem = getTopWindow().document.getElementById("select_relationship");
        var relFilter = (formItem && formItem.options)?formItem[formItem.selectedIndex].value:0;
        if(relFilter){
            resetUrlParameters("selectedRelationship",relFilter,searchquery);
        }

        if (direction == "both" && expandLevel == "All") {
            alert(emxUIConstants.STR_ALLLEVEL_ERROR);
            editableTable.processing = false;
            return;
        }
        resetUrlParameters("previousExpandLevel",expandLevel,searchquery);
        resetUrlParameters("expandLevel",expandLevel,searchquery);
        resetUrlParameters("dynamic","",searchquery);

        if(filterName && filterName == "ProgramMenuFilter"){
            changeProgram(filterValue);
        }

        var uniqueId = new Date().getTime();
        resetUrlParameters("uniqueId",uniqueId,searchquery);
        if(persist == "true"){
            persistGlobal =  true;
            resetUrlParameters("persist","true");
            resetUrlParameters("timeStamp",timeStamp);
            getTopWindow().info=[];
            getTopWindow().info["oldXML"] = oXML;
            getTopWindow().info["scrollTop"]= editableTable.divListBody.scrollTop;
            getTopWindow().info["lastSelection"]= lastSelection;
        }
        updateToolbarDataParams();
        if (fullTextSearchObj)
        {
            searchquery.set("dynamic", "true");
            fullTextSearchObj.setContentUrl(searchquery.toString());
            fullTextSearchObj.formSearch();
        } else {
            /*editableTable.loadData();
            RefreshTableHeaders();
            rebuildView();
            this.submitPostToSelfSB("../common/emxIndentedTable.jsp",urlParameters);*/
            reloadSBWithGet(urlParameters);
        }
        editableTable.processing = false;
    }catch(e){
        editableTable.processing = false;
    }
}

function changeProgram(programFilterList){
    var isInquiry = false;
    var isInquiryNode = emxUICore.selectSingleNode(oXML,"/mxRoot/tableControlMap//setting[@name='IsInquiry']/value");
    if(isInquiryNode != null){
        isInquiry = emxUICore.getText(isInquiryNode).toLowerCase() == 'true';
     }

    var strProgram = isInquiry == true ? "inquiry" : "program";
    var strProgramLabel =  isInquiry == true ? "inquiryLabel" : "programLabel";

    var programURL = programFilterList.split("|")[0];
    var labelURL = programFilterList.split("|")[1];
    resetParameter(strProgram, programURL);
    resetParameter(strProgramLabel, labelURL);
}


/**
* Updates the urlParameters with the current data on the toolbar
*
*/
function updateToolbarDataParams()
{
    var toolbarData = getToolbarData(editableTable.expandFilter);

    if (toolbarData == null||toolbarData == ""||toolbarData == "null") {
        return "";
    }else {
        // As getToolbarData returns string like toolbarData=<<list of parameter name value pair separated by '|'>>
        //consider the String after the first instance of '=' to get only the param name and values separated by '='

        toolbarData= toolbarData.substring(toolbarData.indexOf("=")+1, toolbarData.length);
        var dataArray = toolbarData.split("|");
        for (var itr=0; itr<dataArray.length; itr++) {
            var parameter=dataArray[itr].split("=");
            resetParameter(parameter[0],parameter[1]);
        }
    }
}

/**
 * This function update the requestMap xml node with the toolbar parameters
 * */
function updateRequestMapWithToolbarData(requestMap)
{
    var toolbarData = getToolbarData(editableTable.expandFilter);

    if (toolbarData != null && toolbarData != "" && toolbarData != "null") {
        toolbarData= toolbarData.substring(toolbarData.indexOf("=")+1, toolbarData.length);
        var dataArray = toolbarData.split("|");
        for (var itr=0; itr<dataArray.length; itr++) {
            var parameter=dataArray[itr].split("=");
            var paramNode = emxUICore.selectSingleNode(requestMap,"//setting[@name='"+parameter[0]+"']");
            if(paramNode != null){
                emxUICore.setText(paramNode,parameter[1]);
            }
        }
    }
}

emxEditableTable.appendToRequestMap = function __appendToRequestMap(param,value){
    var requestMap = emxUICore.selectSingleNode(oXML,"//requestMap");
    var paramNode = emxUICore.selectSingleNode(requestMap,"//setting[@name='"+param+"']");
    if(paramNode != null){
        emxUICore.setText(paramNode,value);
    }else{
        var nSetting = oXML.createElement("setting");
        nSetting.setAttribute("name", name);
        emxUICore.setText(nSetting, value);
        requestMap.appendChild(nSetting);
    }
 }



/**
* Sets the checkboxes checked status
* @param The header checkbox
*/
var stabox=false;
function setCheckboxStatus(objCheckbox,isFreezePaneTable){
    if(isFreezePaneTable){
        var checkboxList =  editableTable.divListBody.getElementsByTagName("input");
    }else{
        var checkboxList = editableTable.divTreeBody.getElementsByTagName("input");
    }
    var chkLen = checkboxList.length;
    for(var i = 0; i < chkLen; i++){
        if(checkboxList[i].type == "checkbox" && !checkboxList[i].disabled){
            checkboxList[i].checked = objCheckbox.checked;
        }
    }

        var columnInfo = emxUICore.selectSingleNode(oXML,"/mxRoot/columns")
        var columnChilds = columnInfo.childNodes;
        for(var index=0;index<columnChilds.length;index++){
                var columnType = columnChilds[index].getAttribute("typeofColumn");
                if(columnType == "checkbox"){
                    var CheckBoxcols = emxUICore.selectNodes(oXML,"//c["+ (index+1) +"][@a='false']");
                    for(j=0;j< CheckBoxcols.length; j++){
                         var disabledRow = CheckBoxcols[j].parentNode;
                         disabledRow.setAttribute("disableSelection", "true" );
                    }
                }
         }


    var nRows = null;
    //IR-042937V6R2011
    var nRowsAtLevel0 = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@level = '0' and not(@rg) and (not(@disableSelection) or @disableSelection != 'true')]");
    var hideRootSelection = getRequestSetting('hideRootSelection');
    if(nRowsAtLevel0.length == 1 && hideRootSelection == 'true'){
        nRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@level != '0' and (not(@disableSelection) or @disableSelection != 'true') and not(@calc)]");
    }else{
        nRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[(not(@disableSelection) or @disableSelection != 'true') and not(@calc)]");
    }
    doFreezePaneChecks(objCheckbox, nRows, 0, nRows.length);
    var disableRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[(@disableSelection = 'true')]");
    var disableRowsID = new Array();
    for(var i=0;i<disableRows.length;i++){
        disableRowsID[i]=disableRows[i].getAttribute("id");
    }
    //rebuildView();
    var allRowSelectedSetting = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name='allRowSelected']");
    if(!allRowSelectedSetting){
        var allRowSelected = oXML.createElement("setting");
        allRowSelected.setAttribute("name", "allRowSelected");
        emxUICore.setText(allRowSelected, objCheckbox.checked);
        oXML.documentElement.appendChild(allRowSelected);
    }else{
        emxUICore.setText(allRowSelectedSetting, objCheckbox.checked);
    }
    RefreshAllSelections(objCheckbox.checked,null,disableRowsID);
    //RefreshView();
}

function doCheckSelectAll(){
    var aCheckedRows = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[(((@level = '0'  and not(@filter='true')) or (@level != '0' and count(ancestor::r[@display = 'none']) = '0' and count(ancestor::r[@filter='true'])='0') )and @checked = 'checked')]").length;
    var nTotalRows = 0;
    var nRowsAtLevel0 = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@level = '0']");
    var hideRootSelection = getRequestSetting('hideRootSelection');
    var isIndentedView = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='isIndentedView']/text()");
    if(isIndentedView && isIndentedView.nodeValue == 'true')
    {
        if(nRowsAtLevel0.length == 1 && hideRootSelection == 'true'){
            nTotalRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[(@level !='0' and not(@filter='true')) or(@level!='0' and count(ancestor::r[@display='none'])='0' and count(ancestor::r[@filter='true'])='0')]").length;
        }else{
        nTotalRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[(@level='0' and not(@filter='true')) or(@level!='0' and count(ancestor::r[@display='none'])='0' and count(ancestor::r[@filter='true'])='0')]").length;
        }
    }else{
        nTotalRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[not(@filter='true')]").length;
    }
    var checkAll = true;
    if(nTotalRows==0 && aCheckedRows==0){
        return;
    }else{
        if (aCheckedRows == nTotalRows){
          checkAll = true;
        }else{
            checkAll = false;
        }

        var objForm = document.forms["emxTableForm"];
        if(objForm.chkList) {
            objForm.chkList.checked = checkAll;
        }
    }
}

/**
* Sets the checkboxes status in the rows passed, from the passed indexes.<br>
* @param objCheckbox checkbox
* @param nRows Rows (complete) of the structure
* @param startIndex Starting position of the rows for checking to start with
* @param endIndex Ending position of the rows for checking to stop
*/
function doFreezePaneChecks(objCheckbox, nRows, startIndex, endIndex){
	 if(getTopWindow().isfromIFWE){
		var lastOID = nRows[nRows.length-1].getAttribute("o");
		registerCheckedRowIdToCompass(lastOID);
	 }
    var selectedRowIds = new Array();
    var i = 0;
    for (var j = startIndex; j < endIndex; j++) {
        var relId = nRows[j].getAttribute("r");
        var oId = nRows[j].getAttribute("o");
        var pOId = nRows[j].getAttribute("p");
        var rowId = nRows[j].getAttribute("id");
        var disableSelection = nRows[j].getAttribute("disableSelection");
        var strID =  relId + "|" + oId + "|" + pOId + "|" + rowId ;
        selectedRowIds[i++] = strID;
        if(disableSelection != "true"){
        if(objCheckbox.checked){
        if(nRows[j]!= null && nRows[j].getAttribute("filter")!='true'){
            nRows[j].setAttribute("checked", "checked");
                if(fullTextSearchObj) {
                    fullTextSearchObj.appendToSelRows(nRows[j].getAttribute("o"));
        }

            registerCheckedRowIds(strID);
        }
        }else{
        if(nRows[j]!= null && nRows[j].getAttribute("filter")!='true'){
            nRows[j].setAttribute("checked", "");
                if(fullTextSearchObj) {
                    fullTextSearchObj.removeSelRows(nRows[j].getAttribute("o"));
                }
            unregisterCheckedRowIds(strID);
        }
        }
    }
    }

    /************** Cross Highlight Changes ***************/
    try {
         if(selectHandler && selectHandler.length > 0) {
             window[selectHandler](selectedRowIds.join(":"),objCheckbox.checked);
         }
    } catch(e){
    }
    /************** Cross Highlight Changes ***************/

    var toolBarFrame = this;
    if (toolBarFrame && toolBarFrame.toolbars && toolBarFrame.toolbars.setListLinks) {
        toolBarFrame.toolbars.setListLinks( objCheckbox.checked,'structureBrowser', editableTable.mode);
    }

}
/**
* Get all checked checkboxes
* @returns Named Array: array[oid|relIds] = checkbox object;
*/
function getCheckedCheckboxes(){
    var checkboxArray = new Object();
    var aRowsSelected = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@checked='checked' and not(@rg)]");
    var chkLen = aRowsSelected.length;
    for(var j = 0; j < chkLen; j++){
       var id = aRowsSelected[j].getAttribute("id");
       var oid = aRowsSelected[j].getAttribute("o");
       var relid = aRowsSelected[j].getAttribute("r");
       if (relid == null || relid == "null") {
          relid = "";
       }
       var parentId = aRowsSelected[j].getAttribute("p");
       if (parentId == null || parentId == "null") {
          parentId = "";
       }
       var totalRowInfo = relid + "|" + oid + "|" + parentId + "|" + id;
       checkboxArray[totalRowInfo] = totalRowInfo;
    }
    return checkboxArray;
}

function removeRows(cBoxArray){
    var strSelectedIds="";
    for(var i = 0; i < cBoxArray.length; i++) {
        var aIds = cBoxArray[i].split("|");
        var id = aIds[3];
        var nRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + id + "']");
        if(nRow == null) continue;
        nRow.parentNode.removeChild(nRow);
        //When row is removed that row should be removed from postDataXML also
        //start
        nRow = emxUICore.selectSingleNode(postDataXML, "/mxRoot/object[@id = '" + id + "']");
        if (nRow) {
            nRow.parentNode.removeChild(nRow);
        }
        //end
        if (i==0) {
            strSelectedIds = id;
        }
        else {
            strSelectedIds += ":" + id;
        }
    }

    var strData = "&sLevelIds=" + strSelectedIds;
    var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp+"&action=remove&IsStructureCompare="+isStructureCompare;
    aDisplayRows = getDisplayRows();
    var childXML = emxUICore.getDataPost(url, strData);
    // so recalculate display rows again.
    totalRows = aDisplayRows.length;
    var nTotalRows = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name = 'total-rows']");
    emxUICore.setText(nTotalRows, totalRows);

    // redraw table and tree part
        if (editableTable.divTreeGraph.style.display == "none") {
    rebuildView();
        }
        }
/*
** don't allow user to unselect both checkboxes
*/
function checkOneSelected(objCheckbox){
    var toVal = getTopWindow().document.getElementById("to").checked;
    var fromVal = getTopWindow().document.getElementById("from").checked;

    if (!toVal && !fromVal) {
        objCheckbox.checked = true;
        alert(emxUIConstants.ERR_SELECT_DIRECTION);
    }
}

function isAnyRowChecked(){
    var aRowsSelected = getCheckedRows();
    return (aRowsSelected.length > 0);
}

function getCheckedRows(){
    return emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@checked='checked']");
}

/*
** This function gets called on load event of hiddenFrame
** When toolbar action targets hidden frame,
** this function is used to get only if targeted JSP is returning XML
** This function reads xml and then takes action as per actions in the xml
*/
function getActionXML(){
    var root = null;
    if (isIE ) {
        if(isMinIE9 && listHidden.document) {
            var objXML = getXMLDoc(listHidden.document);
            if (objXML == null) {
                return;
            }
            root = objXML;
        } else if(listHidden.document.XMLDocument) {
            //For earlier versions of IE9
            var objXML = listHidden.document.XMLDocument;
            root = objXML;
        }else {
            return;
        }
    } else if (isMoz && listHidden.document.contentType == "text/xml") {
        root = listHidden.document;
    } else {
        return;
    }
    //get the status node
    var xPath = "action/text()";
    var actionNode = emxUICore.selectSingleNode(root,xPath);

    xPath = "action/@fromRMB";
    var fromRMB = emxUICore.selectSingleNode(root,xPath);
    fromRMB     = fromRMB != null ? fromRMB.nodeValue : "";

    if (actionNode) {
        var actionval = actionNode.nodeValue;
        var val = actionval;
        switch(actionval){
            case "remove":
            case "removeandrefresh":
                var checkboxes = null;
                var cBoxArray = new Array();
                var remdelstr = "";

                var itemxPath="item";
                var itemxPathNode = emxUICore.selectNodes(root,itemxPath);

                if(itemxPathNode.length != 0) {
                    if (fromRMB == "true") {
                        var id = itemxPathNode[0].getAttribute("id");
                        checkboxes = getCheckboxesById(id);
                    } else {
                        checkboxes = getCheckedCheckboxes();
                    }

                    for (var itr = 0; itr < itemxPathNode.length; itr++) {
                        var id = itemxPathNode[itr].getAttribute("id");
                        for (var e in checkboxes) {
                            var values="";
                            if(e.lastIndexOf("|")>0 && (e.length>e.lastIndexOf("|"))) {
                                values=e.substring(e.lastIndexOf("|")+1,e.length);
                            }
                            if(id==values) {
                                cBoxArray[cBoxArray.length] = e;
                                if(remdelstr.length > 0) {
                                    remdelstr += ",";
                                }
                                var aIds = e.split("|");
                                var id = aIds[1];
                                remdelstr += id;
                            }
                        }
                    }
                } else {
                    checkboxes = getCheckedCheckboxes();

                    //add to array
                    for (var e in checkboxes){
                        cBoxArray[cBoxArray.length] = e;
                        if(remdelstr.length > 0) {
                            remdelstr += ",";
                        }
                        var aIds = e.split("|");
                        var id = aIds[1];
                        remdelstr += id;
                    }
                }
                /* Code is added to honor the message element value returned from user start */
                xPath = "message/text()";
                val = emxUICore.selectSingleNode(root,xPath);
                if (val && trim(val.nodeValue) != "") {
                    alert(val.nodeValue);
                }
                //end
                removeRows(cBoxArray);
                if(actionval == "removeandrefresh") {
                    getTopWindow().deleteMultipleStructureNode(remdelstr);
                }

                var actionxPath = "action";
                var actionxPathNode = emxUICore.selectSingleNode(root,actionxPath);
                var refresh=actionxPathNode.getAttribute("refresh");
                if (refresh == 'true') {
                    //refreshRows();
                    refreshStructureWithOutSort();
                    rebuildView();
                }
                resetToolbarLinks();
            break;
            case "refresh":
                //refreshRows();
                refreshStructureWithOutSort();
                rebuildView();
            break;
            case "error":
                //get the error node
                xPath = "message/text()";
                val = emxUICore.selectSingleNode(root,xPath).nodeValue;
                alert(val);
            break;
            default:
            //do nothing;
        }
    }
    listHidden.document.location.href = "../common/emxMQLNoticeWrapper.jsp";
}
//Below API first converts any DOM nodes/Nodes from HTML document into XML String and later builds that XMLString into document.
//API best useful in case of IE9 where XMLDocument does not contain any XML, so if we have XMLDocument to this api which returns XML document
//This is applicable only for IE9 and above
function getXMLDoc(doc) {
    var objDOM = null;

    if(window.XMLSerializer) {
        var serializer = new XMLSerializer();
        xmlString = serializer.serializeToString(doc);
        try {
            objDOM = emxUICore.createXMLDOM();
                objDOM.loadXML(xmlString);
                objDOM = (objDOM.xml != "" && objDOM.xml != null && objDOM.firstChild.nodeName == "mxRoot") ? objDOM : null;
            } catch (e) {
                return null;
        }
    }
      return objDOM;
}

function getCheckboxesById(strID) {
    var checkboxArray = new Object();
    var aRowsSelected = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@id='"+strID+"']");
    var chkLen = aRowsSelected.length;
    for(var j = 0; j < chkLen; j++){
       var id = aRowsSelected[j].getAttribute("id");
       var oid = aRowsSelected[j].getAttribute("o");
       var relid = aRowsSelected[j].getAttribute("r");
       if (relid == null || relid == "null") {
          relid = "";
       }
       var parentId = aRowsSelected[j].getAttribute("p");
       if (parentId == null || parentId == "null") {
          parentId = "";
       }
       var totalRowInfo = relid + "|" + oid + "|" + parentId + "|" + id;
       checkboxArray[totalRowInfo] = totalRowInfo;
    }
    return checkboxArray;
}









/**
* Performs action on selected rows from database and client
* @param strActionURL The URL to process data
*/
function performDataAction(strActionURL,strRowSelect){
    //Modified for Bug : 353307
    turnOnProgress();
    var submitForm = document.emxTableForm;
    var rmbSubmit = false;
    if(strRowSelect != "undefined" && strRowSelect == "rmb") {
        rmbSubmit = true;
        submitForm = emxUICore.clonedForm(submitForm,document.body);
    }

    submitForm.target = "listHidden";
    submitForm.action = strActionURL;
    submitForm.method = "post";

    addSecureToken(submitForm);
    submitForm.submit();
    removeSecureToken(submitForm);

    if(rmbSubmit) {
        document.body.removeChild(submitForm);
    }
    if(strActionURL.indexOf("emxGenericDeleteProcess.jsp") == -1){
        turnOffProgress();
    }
}

/** Resets the toolbar links to disable */
function resetToolbarLinks(){
    var toolBarFrame = this;

    if (parent.ids && toolBarFrame && toolBarFrame.toolbars && toolBarFrame.toolbars.setListLinks) {
        parent.ids = "";
        toolBarFrame.toolbars.setListLinks(false,'structureBrowser', editableTable.mode);
    }
}

/**
* Performs action on selected rows from database and client and opens in a new window
* @param strActionURL The URL to process data
*/
function performPopupAction(strActionURL, bModal, iWidth, iHeight, checkboxes,strRowSelect){
    var objForm = document.forms[0];
    var objWindow;
    if(bModal == 'true'){
        if(isComponentPage(strActionURL)){
            if(isTreePage(strURL)){
                showModalDialog("emxNavigator.jsp", iWidth, iHeight, true);
            } else {
                showModalDialog("emxNavigatorDialog.jsp", iWidth, iHeight, true);
            }
            objWindow = findFrame(getTopWindow().modalDialog.contentWindow, "content");
        } else {
        showModalDialog("emxBlank.jsp", iWidth, iHeight, true);
        objWindow = getTopWindow().modalDialog.contentWindow;
        }
    }else{
        if(isComponentPage(strActionURL)){
            if(isTreePage(strURL)){
                objWindow = findFrame(showAndGetNonModalDialog("emxNavigator.jsp", iWidth, iHeight, true), "content");
            } else {
                objWindow = findFrame(showAndGetNonModalDialog("emxNavigatorDialog.jsp", iWidth, iHeight, true), "content");
            }
        } else {
        objWindow = showAndGetNonModalDialog("emxBlank.jsp", iWidth, iHeight, true);
    }
    }

    //Modified for Bug : 353307
    var rmbSubmit = false;
    if(strRowSelect != "undefined" && strRowSelect == "rmb") {
        rmbSubmit = true;
        objForm = emxUICore.clonedForm(objForm,document.body);
    }

    objForm.target = objWindow.name;
    objForm.action = strActionURL;
    objForm.method = "post";
    objForm.submit();

    if(rmbSubmit) {
        document.body.removeChild(objForm);
    }
}
/**
* Clears form
*
*/
function clearForm(objForm){
    var formLen = objForm.elements.length;
    for(var i = formLen-1; i >=0 ; i--){
        var elm1 = objForm.elements[i];
        if(elm1.type == 'hidden')
        {
            objForm.removeChild(elm1);
        }
    }
    var elm = document.createElement("input");
    elm.setAttribute("type","hidden");
    elm.setAttribute("name","csvData");
    objForm.appendChild(elm);
}


// Adds the selected rows as the hidden fields into the form and returns the size of the selected rows.
function addHiddenTableRowIds() {
    // Removes the previously selected rows from the form
    jQuery('input[name=emxTableRowId]').remove();
    // Adding the selected rows
    var nRows = null;
    if(fullTextSearchObj && fullTextSearchObj.getRememberSelection()) {
        nRows = emxUICore.selectNodes(fullTextSearchObj.selRowsXML,"/mxRoot/r");
    } else {
        nRows = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@checked='checked' and not (@rg)]");
    }

    for(var j = 0; j < nRows.length; j++){
        var id = nRows[j].getAttribute("id");
        var oid = nRows[j].getAttribute("o");
        var relid = nRows[j].getAttribute("r");
        if (relid == null || relid == "null") {
            relid = "";
        }
        var parentId = nRows[j].getAttribute("p");
        if (parentId == null || parentId == "null") {
            parentId = "";
        }
        if (id == null || id == "null") {
            id = "";
        }

        var strVal = relid + "|" + oid + "|" + parentId + "|" + id;

        if(nRows[j]!= null){
            hiddenEle = document.getElementById(strVal);
            if (hiddenEle == null)
            {
                hiddenEle = document.createElement("input");
                hiddenEle.setAttribute("type","hidden");
                hiddenEle.setAttribute("name","emxTableRowId");
                hiddenEle.setAttribute("id", strVal);
                hiddenEle.setAttribute("value", strVal);
                editableTable.mxDivPostData.appendChild(hiddenEle);
                document.forms["emxSubmitForm"].appendChild(jQuery(hiddenEle).clone().get(0));
            }
        }
    }
    return nRows.length;
}

//! Private Function submitFreezePaneData()
function submitFreezePaneData(strURL, strTarget, strRowSelect, bPopup, bModal, iWidth, iHeight, confirmationMessage, strPopupSize, slideinWidth){
    if(!this.emxUIConstants || !emxUIConstants.ARR_PopupWidth){
        emxUIConstants = getTopWindow().emxUIConstants;
        if(!this.emxUIConstants || !emxUIConstants.ARR_PopupWidth){
    		emxUIConstants = getTopWindow().getWindowOpener().getTopWindow().emxUIConstants;
            if(!this.emxUIConstants || !emxUIConstants.ARR_PopupWidth){
    			emxUIConstants = getTopWindow().getWindowOpener().getTopWindow().getWindowOpener().getTopWindow().emxUIConstants;
            }
        }
    }
    if(emxUIConstants.ARR_PopupWidth){
        if(strPopupSize){
            if( emxUIConstants.ARR_PopupWidth[strPopupSize]){
                iWidth = emxUIConstants.ARR_PopupWidth[strPopupSize];
                iHeight = emxUIConstants.ARR_PopupHeight[strPopupSize];
            } else {
                iWidth = emxUIConstants.ARR_PopupWidth['Default'];
                iHeight = emxUIConstants.ARR_PopupHeight['Default'];
            }
        } else {
            if(! emxUIConstants.ARR_PopupDimensions ['' + iWidth + 'x' + iHeight + '']){
                iWidth = emxUIConstants.ARR_PopupWidth['Default'];
                iHeight = emxUIConstants.ARR_PopupHeight['Default'];
            }
        }
    } else {
        iWidth = "812";
        iHeight = "500";
    }

    var deleteURLindex =  strURL.indexOf("emxGenericDeleteProcess.jsp");
    var massPromoteURLindex =  strURL.indexOf("emxMassPromoteDemoteProcess.jsp");
    var sbCompareURLindex =  strURL.indexOf("emxStructureCompare.jsp");
    if(deleteURLindex!= -1 || massPromoteURLindex!=-1){
        if(isDataModified()){
            alert(emxUIConstants.STR_SBEDIT_SAVE_THE_CHANGES);
            return;
        }
    }
    var checkboxes = getCheckedCheckboxes();
    var selectedCount = 0;
    for (var e in checkboxes){
        selectedCount++;
    }
    //Modified for Bug : 353307
    if(strRowSelect == "rmb"){
        selectedCount = 1;
    }

    var selectedCount = addHiddenTableRowIds();
    if (strRowSelect == "single" && selectedCount > 1 && strRowSelect != "rmb" ) {
            showError(emxUIConstants.ERR_SELECT_ONLY_ONE);
            return;
    } else if ((selectedCount == 0) && strRowSelect != "none" && strRowSelect != "rmb") {
            showError(emxUIConstants.ERR_NONE_SELECTED);
            return;
    }
    if(sbCompareURLindex != -1 && selectedCount > 2){
        alert(emxUIConstants.STR_COMPARE_SELECT_MINOBJECT);
        return;
    }
    if(confirmationMessage!=null && confirmationMessage!="undefined" && confirmationMessage!="null" && confirmationMessage!=""){
            if (confirmationMessage.indexOf("${TABLE_SELECTED_COUNT}") > 0){
                confirmationMessage = confirmationMessage.replace(new RegExp("\\$\\{TABLE_SELECTED_COUNT\\}","g"), selectedCount);
            }
            var bResponse=window.confirm(confirmationMessage);
            if(!bResponse){
                return;
            }
    }

    if(strRowSelect == "rmb")
    {
      strURL += "&isFromRMB=true";
    }
    var localToolbarData = getToolbarData(false,'&');
    localToolbarData = localToolbarData.substring(localToolbarData.indexOf('=')+1);
    var selectedIds = parent.ids;
    if(onlySBContentRefresh){
    	var url2 = strURL.substring(strURL.indexOf('objectId'));
    	strURL = strURL.substring(0,strURL.indexOf('objectId')) + "objectId="+onlySBContentRefresh+ url2.substring(url2.indexOf('&'));
    }

    if(strTarget == 'slidein'){
        //getTopWindow().submitToSlideInDialog(strURL+'&'+localToolbarData,bModal,strRowSelect,confirmationMessage,null,selectedIds);
    	submitList(strURL+'&'+localToolbarData,'slidein',strRowSelect,false,"","",confirmationMessage,null,"",selectedCount, '', slideinWidth);
    }else{
    if (bPopup) {
       // performPopupAction(strURL+'&'+localToolbarData, bModal, iWidth, iHeight, checkboxes,strRowSelect);
        submitList(strURL+'&'+localToolbarData,'popup',strRowSelect,bPopup, iWidth, iHeight, null,null,"",selectedCount, bModal);
    } else {
        performDataAction(strURL+'&'+localToolbarData,strRowSelect);
        }
    }
}
/**
* Posts XML data to server and performs server determined action
* @param strActionURL The URL to process data
*/
function performXMLDataPost(strActionURL, objXML){
    //add RequestMap
    var requestMap = emxUICore.selectSingleNode(oXML,"//requestMap");
    updateRequestMapWithToolbarData(requestMap);
    objXML.documentElement.appendChild(requestMap.cloneNode(true));
    //add Columns
    var columns = emxUICore.selectSingleNode(oXML,"//columns");
    objXML.documentElement.appendChild(columns.cloneNode(true));
    //send to server and parse reply
    var xmlResponse = emxUICore.getTextXMLDataPost(strActionURL, objXML.xml);
    try{
        var root = xmlResponse;
        //get the status node
        var xPath = "action/text()";
        var val = emxUICore.selectSingleNode(root,xPath).nodeValue;
        switch(val.toLowerCase()){
            case "update":
                //remove edited attr
                removeAttribute("edited","c");
                //resetCellClass();//if cells are sorted this won't work@@
                if(hasRunMassUpdate){
                    //resetEditableCells();//if cells are sorted this won't work@@
                    hasRunMassUpdate = false;
                }
                resetEditableCells();//for now, always run on update@@
                //create new postXML
                postDataXML.loadXML("<mxRoot/>");
                arrUndoRows = new Object();
                aMassUpdate = new Array();
            break;
            case "error":
                //get the error node
                xPath = "message/text()";
                val = emxUICore.selectSingleNode(root,xPath).nodeValue;

                if(val && val != null && val != "")
                {
                    var rowindex = val.indexOf("[rowId:");
                    if(rowindex != -1)
                    {
                        var rowId = val.substring(rowindex + 7,val.indexOf("]"));
                        val = val.replace("[rowId:" + rowId + "]","");
                        var error = "<mxRoot><object rowId=\"" + rowId + "\"><error><![CDATA[" + val + "]]></error></object></mxRoot>";
                        emxEditableTable.displayValidationMessages(error);
                    }else
                    {
                    alert(val);
                }
                }
            break;
            case "stop":
                //get the message node
                xPath = "message/text()";
                val = emxUICore.selectSingleNode(root,xPath).nodeValue;
                if(val && val != null && val != "") {
                alert(val);
                }
            break;
            case "continue":
                //get the message node
                xPath = "message/text()";
                val = emxUICore.selectSingleNode(root,xPath).nodeValue;

                if(val && val != null && val != "") {
                alert(val);
                }

                //remove edited attr
                removeAttribute("edited","c");
                //resetCellClass();//if cells are sorted this won't work@@
                if(hasRunMassUpdate){
                    //resetEditableCells();//if cells are sorted this won't work@@
                    hasRunMassUpdate = false;
                }
                resetEditableCells();//for now, always run on update@@
                //create new postXML
                postDataXML.loadXML("<mxRoot/>");
                arrUndoRows = new Object();
                aMassUpdate = new Array();
            break;
            case "refresh":
                //Added for BUG:354687
                   xPath = "message/text()";
                val = emxUICore.selectSingleNode(root,xPath).nodeValue;
                if(val && val != null && val != "") {
                    alert(val);
                }
                //End for BUG:354687
                
                if(isStructureCompare == "TRUE" ){
                	var data=emxUICore.selectSingleNode(xmlResponse,"/mxRoot/data");
                	var dataStatus=data.getAttribute("status");

                	if(dataStatus=="sync"){
                		updateoXMLForSync(xmlResponse);
                		syncDataXML.loadXML("<mxRoot/>");
                	}else{
                updateoXML(xmlResponse);
                postDataXML.loadXML("<mxRoot/>");
                	}
                	refreshStructureWithOutSort();

                }else{
                	updateoXML(xmlResponse);
                	postDataXML.loadXML("<mxRoot/>");
                	refreshStructureWithOutSort();
                	rebuildView();
                }
                
                arrUndoRows = new Object();
                aMassUpdate = new Array();
                //refreshRows();
               
                break;
            case "changed":
                updateoXML(xmlResponse);
                //create new postXML
                postDataXML.loadXML("<mxRoot/>");
                arrUndoRows = new Object();
                 break;
            case "success":
                    var data=emxUICore.selectSingleNode(xmlResponse,"/mxRoot/data");
                    var dataStatus=data.getAttribute("status");
                    //Added for BUG: 351041
                    xPath = "message/text()";
                    val = emxUICore.selectSingleNode(root,xPath).nodeValue;
                    if(val && val != null && val != "") {
                        alert(val);
                    }
                    //End for BUG:351041
                    if(dataStatus=="sync"){
                        updateoXMLForSync(xmlResponse);
                        syncDataXML.loadXML("<mxRoot/>");
                    }else{
                        updateoXML(xmlResponse);
                        //create new postXML
                        postDataXML.loadXML("<mxRoot/>");
                    }
                    arrUndoRows = new Object();
                    break;
            case "execscript"://Added for Bug - 342961
                //get the error node
                xPath = "message/text()";
                val = emxUICore.selectSingleNode(root,xPath).nodeValue;
                if(val && val != null && val != "") {
                   var jsObject = eval('(' + val + ')');
                   jsObject.main();
                }
            break;
            default:
            //do nothing;
        }
    }catch(e){
        if(xmlResponse && xmlResponse.indexOf("Error|:Session|:TimeOut") != -1){
            return;
        }else{
        alert(e.message);
    }
    }
    listHidden.document.location.href = "../common/emxMQLNoticeWrapper.jsp";
}
function resetCellClass(){
    var cell = editedCellArray.pop();
    while(cell){
        cell.className = "editable";
        cell = editedCellArray.pop();
    }
}
function resetEditableCells(){
    var tdArray = document.getElementsByTagName("TD");
    var len = tdArray.length;
    for(var i=0;i<len;i++){
        var curclass = tdArray[i].className;
        curclass = curclass.replace('mx_edited', '');
        tdArray[i].className = curclass;
    }
    tdArray = null;
}
/**
* For debugging
* Prints out xml string in new window
*/
function newDoc(oXML){
    var win = window.open();
    with(win.document){
    open()
    write(oXML.xml)
    close()
    }
}
/**
* Moz Bug#236596
* XSLT rendered select menus lose focus
* need to reset them onclick
*/
function focusTrick(e) {
    if(isMoz){
        try{
        self.focus();
        }catch(ex){
            //do nothing
        }
    }
}
/**
* Bug#367365
* When user clicks on mass update combo box, removes current floating div
*/
function massUpdateOnClick(){
    focusTrick();
    if(currentFormfield && currentFormfield.getAttribute("massUpdate")!= "true"){
        removeCurrentFloatingDiv(currentFormfield);
    }
}

function FreezePaneregisterByRowId(rowId) {
     var rowNode = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + rowId + "']");
     var oid = rowNode.getAttribute("o");
     var pid = rowNode.getAttribute("p");
     var rid = rowNode.getAttribute("r");
     var id = rowNode.getAttribute("id");
     FreezePaneregister(rid + "|" + oid + "|" + pid + "|" + id);
}

function FreezePaneunregisterByRowId(rowId) {
     var rowNode = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + rowId + "']");
     var oid = rowNode.getAttribute("o");
     var pid = rowNode.getAttribute("p");
     var rid = rowNode.getAttribute("r");
     var id = rowNode.getAttribute("id");
     FreezePaneunregister(rid + "|" + oid + "|" + pid + "|" + id);
}

//Redefined from UITableUtils to support
//freezePane table having no frames
//Methods for Tracking the selections
function FreezePaneregister(strID, selectCallBack) {

	if (typeof selectCallBack =="undefined") {
		selectCallBack = true;
	}
    var aId = strID.split("|");
    var id = aId[3];
    var rowNode = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + id + "']");
    if(getTopWindow().isfromIFWE){
    registerCheckedRowIdToCompass(aId[1]);
    }
    /************** Cross Highlight Changes ***************/
    try {
         if(selectCallBack && selectHandler && selectHandler.length > 0) {
             window[selectHandler](strID, true);
         }
    } catch(e){
    }
    /************** Cross Highlight Changes ***************/

    if(rowNode!= null && rowNode.getAttribute("filter")!='true' && rowNode.getAttribute("disableSelection")!='true'){
        rowNode.setAttribute("checked", "checked");
        lastSelection = id;
        lastSelectedradio = strID;
    }

        var toolBarFrame = this;
    var isRowChecked = isAnyRowChecked();
    if (toolBarFrame && toolBarFrame.toolbars && toolBarFrame.toolbars.setListLinks) {
        toolBarFrame.toolbars.setListLinks( isRowChecked,'structureBrowser', editableTable.mode);
    }
    registerCheckedRowIds(strID);
    //For Bug 366858
     if(fullTextSearchObj) {
        fullTextSearchObj.appendToSelRows(aId[1]);
     }
}
// Redefined from UITableUtils to support
// freezePane table having no frames
function FreezePaneunregister(strID, selectCallBack) {
	if (typeof selectCallBack =="undefined") {
		selectCallBack = true;
	}

    var aId = strID.split("|");
    var id = aId[3];

    var rowNode = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + id + "']");
    /************** Cross Highlight Changes Start***************/
    try {
        if(selectCallBack && selectHandler && selectHandler.length > 0){
            window[selectHandler](strID, false);
        }
    } catch(e){
    }
    /************** Cross Highlight Changes End***************/

    if(rowNode!= null && rowNode.getAttribute("filter")!='true'){
        rowNode.setAttribute("checked", "");
    }

        var toolBarFrame = this;
    var isRowChecked = isAnyRowChecked();
    if (toolBarFrame && toolBarFrame.toolbars && toolBarFrame.toolbars.setListLinks) {
            toolBarFrame.toolbars.setListLinks( isRowChecked,'structureBrowser', editableTable.mode);
    }
    unregisterCheckedRowIds(strID);
    //For Bug 366858
     if(fullTextSearchObj) {
         fullTextSearchObj.removeSelRows(aId[1]);
     }
}

//Method to scroll to the selected rowId item in structure browse
//This scroll doesnt work for thumbnail view as of now
function scrollToSelected(rowId) {

	if("TRUE"== isStructureCompare){
		// Get display window height
	    windowSize = Math.ceil(editableTable.divListBody.clientHeight / rowHeight);
	    var displayViewPageSize = windowSize * pageFactor;
	    var totalPageSize 		= firstRow + displayViewPageSize;
	    
	    var totalRows 	= aDisplayRows.length;
	    var topheight 	= 0;
	    var rowCount	= 1;
	    
	    for(var i =0; i < totalRows; i++) {
	    	var id = aDisplayRows[i].getAttribute("id");
	    	
	    	if(id == rowId) {
	    		break;
	    	}else{
	    		var tmpheight = parseInt(aDisplayRows[i].getAttribute("height"));
	    		if(!tmpheight){
	    			tmpheight = editableTable.rowhgt;
	    		}

	    		topheight = topheight + tmpheight;
	    	}
	    	
	    	rowCount++;
	    }
	    
	    var isScrolled = false;
	    if(firstRow >= rowCount){ //scroll up
	    	editableTable.divListBody.scrollTop = editableTable.divTreeBody.scrollTop = topheight;
	    	isScrolled = true;
	    }else if(totalPageSize < rowCount){ //srcoll down
	    	editableTable.divListBody.scrollTop = editableTable.divTreeBody.scrollTop = topheight;
	    	isScrolled = true;
	    }
	    
	    if(isScrolled){
	    	changeHeightSettings(isScrolled);
	    }
	}else{
    /* This code is commented because scrollIntoView(true) is not working for the rows already rendered.
     * Needs to be revisited with new logic for already rendered rows

    if(document.getElementById(rowId)) {
        //If row is already rendered, scroll to view
        setTimeout(function() {
            //document.getElementById(rowId).scrollIntoView(true);
            //editableTable.divListBody.scrollTop = editableTable.divTreeBody.scrollTop;
        },25);

    } else { */
        //If row is not rendered, scroll and draw page from that rowID node
        var topheight = 0;
        for(var i =0; i < aDisplayRows.length; i++) {
            var tmpheight = parseInt(aDisplayRows[i].getAttribute("height"));
            if(!tmpheight){
                tmpheight = editableTable.rowhgt;
            }
            if(aDisplayRows[i].getAttribute("id") == rowId) {
                editableTable.divListBody.scrollTop = editableTable.divTreeBody.scrollTop = topheight;
                break;
            } else {
                topheight = topheight + tmpheight;
            }
        }
    //}
}
}

function registerCheckedRowIdToCompass(oid){
	if(getTopWindow().isfromIFWE){
    	var physcicalid = JSON.parse(emxUICore.getData('../resources/bps/physicalids?oid_list=' + oid));
    	getTopWindow().registerIdtoCompass(physcicalid[0],getTopWindow().curSecCtx);
    	}
}
function registerCheckedRowIds(strID){
    var aId = strID.split("|");
    var relid = aId[0];
    if (relid == null || relid == "null") {
        relid = "";
    }
    var oid = aId[1];
    if (!parent.ids) {
        parent.ids = "~";
    }
    if (parent.ids.indexOf(relid + "|" + oid + "~") == -1) {
        parent.ids += relid + "|" + oid + "~";
    }

    if(getTopWindow().ds && getTopWindow().ds.isCompassOpen){
    	emxUICore.setIdtoCompass();
    }
}

function unregisterCheckedRowIds(strID){
    var aId = strID.split("|");
    var relid = aId[0];
    if (relid == null || relid == "null") {
        relid = "";
    }
    var oid = aId[1];
    var strTemp = parent.ids;
    if(strTemp == null || strTemp == 'undefined')
        return;
    //alert("~" + relid + "|" + oid + "~");
    if (strTemp.indexOf("~" + relid + "|" + oid + "~") > -1) {
            strTemp = strTemp.replace(relid + "|" + oid + "~", "");
            parent.ids = strTemp;
    }
    if (strTemp.indexOf("~" + "|" + oid + "~") > -1) {
        strTemp = strTemp.replace("|" + oid + "~", "");
        parent.ids = strTemp;
    }

    if(getTopWindow().ds && getTopWindow().ds.isCompassOpen){
    	emxUICore.setIdtoCompass();
    }
    if(getTopWindow().isfromIFWE){
        getTopWindow().unregisterIdtoCompass();

      }
}
/**
* Performs a check whether the SHIFT key is down or not
* @param event Event
* @return boolean Returns true if shift key is down, otherwise false
*/
function isShiftKeyDown(event){
    return (event.shiftKey == 1)? true: false;
}

function handleDragEnd(objThis,objectId){
    console.log(objectId);

    var widgetId = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='widgetId']/text()");
    //var firstColText = emxUICore.selectSingleNode(oXML, "/mxRoot/rows/r[@id='" + rowId + "']/c/text()");

    var data = {};
    //data.objectId =  objectId;
    data.objectId = '512.37162.13600.5957';
    //data.rowId =  rowId;
    //data.relId =  relId;
    //data.name = firstColText.nodeValue;
    data.name = 'ws1';

    var opts = {};
    opts.eventName = 'uwaSBRowSelectEvent';
    opts.socketName = widgetId;
    bpsUWAInterCom.dispatchUWAEvent(data, opts);
}

function dispatchUWASelectEvent(strID){
    if(getTopWindow().isfromIFWE){
    var aId = strID.split("|");
    //relid + "|" + oid + "|" + parentId + "|" + id
    var relId = aId[0];
    var objectId = aId[1];
    var rowId = aId[3];
    var widgetId = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='widgetId']/text()");
    var firstColText = emxUICore.selectSingleNode(oXML, "/mxRoot/rows/r[@id='" + rowId + "']/c/text()");

    var data = {};
    data.objectId =  objectId;
    data.rowId =  rowId;
    data.relId =  relId;
    data.name = firstColText.nodeValue;
    data.icon = 'http://ux-cloud.ux.dsone.3ds.com/3DExperienceIcons/Icons/Tiles/I_TeamWorkspace48x48.png';

    var opts = {};
    opts.eventName = 'uwaSBRowSelectEvent';
    opts.socketName = widgetId;
    bpsUWAInterCom.dispatchUWAEvent(data, opts);
}
}
// Redefined from UITableUtils to support
// freezePane table having no frames
function doFreezePaneCheckboxClick(objCheckbox, event) {
    if (objCheckbox.checked){
        //dispatchUWASelectEvent(objCheckbox.value);
        FreezePaneregister(objCheckbox.value);
        if(event && isShiftKeyDown(event)){
            shiftCheckedCheckbox = objCheckbox;
            doShiftCheckCheckboxes(normalCheckedCheckbox, shiftCheckedCheckbox);
            normalCheckedCheckbox = shiftCheckedCheckbox;
        }else{
            normalCheckedCheckbox = objCheckbox;
        }
    }else{
        FreezePaneunregister(objCheckbox.value);
        normalCheckedCheckbox = null;
    }
    //rebuildView();
    RefreshSelections(objCheckbox.value.split("|")[3], objCheckbox.checked);
}

/**
* Computes the starting and ending position of the rows to mark as checked
* @param startingCheckbox The checkbox for check marking to start with
* @param endingCheckbox The checkbox for check marking to end
*/
function doShiftCheckCheckboxes(startingCheckbox, endingCheckbox){
    var nRows = getDisplayRows();
    var startIndex = 0;
    var endIndex = 0;

    for (var i = 0; i < nRows.length; i++) {
        var id = nRows[i].getAttribute("id");
        var oid = nRows[i].getAttribute("o");
        var relid = nRows[i].getAttribute("r");
        if (relid == null || relid == "null") {
            relid = "";
        }
        var parentId = nRows[i].getAttribute("p");
        if (parentId == null || parentId == "null") {
            parentId = "";
        }

        var strValue = relid + "|" + oid + "|" + parentId + "|" + id;

        if(startingCheckbox && startingCheckbox.value == strValue){
            startIndex = i;
        }
        if(endingCheckbox && endingCheckbox.value == strValue){
            endIndex = i;
        }
    }

    if(startingCheckbox){
        if(startIndex > endIndex){
            var tempIndex = endIndex;
            endIndex = startIndex;
            startIndex = tempIndex;
        }

        //An object similar to checkbox having the property "checked=checked"
        function objCheckbox(){
            objCheckbox.prototype.checked = true;
        }

        //startIndex+1 because first checked one gets registered thru freezepaneregister()
        //and not to call selectHandler on first checked object twice
        doFreezePaneChecks(new objCheckbox(), nRows, startIndex+1, endIndex);

        for (var j = startIndex+1; j < endIndex; j++) {
            var id = nRows[j].getAttribute("id");
            var disableSelection = nRows[j].getAttribute("disableSelection");
            if(disableSelection != "true"){
            RefreshSelections(nRows[j].getAttribute("id"), true);
        }
    }
    }
    //rebuildView();
}

//for radio buttons
function doFreezePaneRadioClick(objCheckbox) {
    var aId = objCheckbox.value.split("|");
    var id = aId[3];

    if (lastSelection && lastSelection != id) {
        var rowNode = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + lastSelection + "']");
        rowNode.removeAttribute("checked");
        RefreshSelections(lastSelection, false);
    }

    if (objCheckbox.checked){
        FreezePaneregister(objCheckbox.value);
    }
    RefreshSelections(objCheckbox.value.split("|")[3], objCheckbox.checked);
}

function RefreshExportRows(outputFormat)
{
    var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp+"&IsStructureCompare="+isStructureCompare + "&outputFormat=" + outputFormat;
    var oRowsXML = emxUICore.getXMLDataPost(url);
    //set display attribute
    var aExpandedRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@display = 'block' and not(@rg)]");
    for (var i = 0; i < aExpandedRows.length; i++) {
        var levelId = aExpandedRows[i].getAttribute("id");
        var nRow = emxUICore.selectSingleNode(oRowsXML, "/mxRoot/rows//r[@id = '" + levelId + "']");
        if(nRow){
            nRow.setAttribute("display", "block");
        }
    }
    //set checked attribute
    aExpandedRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked = 'checked']");
    for (var i = 0; i < aExpandedRows.length; i++) {
        var levelId = aExpandedRows[i].getAttribute("id");
        emxUICore.selectSingleNode(oRowsXML, "/mxRoot/rows//r[@id = '" + levelId + "']").setAttribute("checked", "checked");
    }

    for (var i = 0; i < oXML.documentElement.childNodes.length; i++) {
        if (oXML.documentElement.childNodes[i].nodeName == "rows") {
            continue;
        }

        oRowsXML.documentElement.appendChild(oXML.documentElement.childNodes[i].cloneNode(true));
    }

    if(afterAutoFilter == true){
        if(previousFilteredNodesXML!=null){
            filterNodes(null,oRowsXML);
        }else{
            showAllRootNodes(false,oRowsXML);
        }
    }
    return oRowsXML;
}

function copyColumnValue(xml, columnName) {
	var index = colMap.getColumnIndex(columnName);
	var allRows = emxUICore.selectNodes(xml, "/mxRoot/rows//r");
	for (var i = 0; i < allRows.length; i++) {
		var id = allRows[i].getAttribute("id");
		var colDest = emxUICore.selectSingleNode(allRows[i], "c[" + index + "]");
		var colSrc = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + id + "']/c[" + index + "]");
		allRows[i].replaceChild(colSrc, colDest);
	}
}

function refreshRows(sortColumnName, sortDirection){
//This is used to store the column and direction information of multi column sorting into a JS object
    if(typeof sortColumnName!="undefined" && typeof sortDirection!="undefined")
    {
        var columnNames = sortColumnName.split(",");
        var columnDirections = sortDirection.split(",");

        if(typeof columnNames != "undefined"){
            lSortColumnName[0]  = null;
            lSortColumnName[1]  = null;
            lSortColumnName[2]  = null;

            for(var colCnt=0; colCnt<columnNames.length; colCnt++){
                lSortColumnName[colCnt] = columnNames[colCnt];
            }
        }
        if(typeof columnDirections != "undefined"){
            lSortColumnDirection[0] = null;
            lSortColumnDirection[1] = null;
            lSortColumnDirection[2] = null;

            for(var colDirCnt=0; colDirCnt<columnDirections.length; colDirCnt++){
                lSortColumnDirection[colDirCnt] = columnDirections[colDirCnt];
            }
        }

        insertSortArrows();
    }
setRequestMap(sortColumnName,sortDirection);
    var url = null;
    if (sortColumnName) {
        sortColumnList = sortColumnList + "," + sortColumnName;
        url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp + "&sortColumnName=" + sortColumnName + "&sortDirection=" + sortDirection+"&IsStructureCompare="+isStructureCompare;
    } else {
        url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp+"&IsStructureCompare="+isStructureCompare;
    }

  //Multi Column Sorting Store Values for Local Storage
    var configuredTableName = getRequestSetting('selectedTable');
    if(configuredTableName == null || configuredTableName == 'undefined' || configuredTableName == ""){
    	configuredTableName = getTableNameFromXML();
    }
    getTopWindow().setPersistenceData("sortColumnName",sortColumnName , configuredTableName);
    getTopWindow().setPersistenceData("sortDirection",sortDirection , configuredTableName);
    var oRowsXML = emxUICore.getXMLDataPost(url);
    //set display attribute
    var aExpandedRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@display = 'block' and not(@rg)]");
    for (var i = 0; i < aExpandedRows.length; i++) {
        var levelId = aExpandedRows[i].getAttribute("id");
        var nRow = emxUICore.selectSingleNode(oRowsXML, "/mxRoot/rows//r[@id = '" + levelId + "']");
        if(nRow){
            nRow.setAttribute("display", "block");
        }
    }
    //set checked attribute
    aExpandedRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked = 'checked']");
    for (var i = 0; i < aExpandedRows.length; i++) {
        var levelId = aExpandedRows[i].getAttribute("id");
        emxUICore.selectSingleNode(oRowsXML, "/mxRoot/rows//r[@id = '" + levelId + "']").setAttribute("checked", "checked");
    }

    for (var i = 0; i < oXML.documentElement.childNodes.length; i++) {
        if (oXML.documentElement.childNodes[i].nodeName == "rows") {
            continue;
        }

        oRowsXML.documentElement.appendChild(oXML.documentElement.childNodes[i].cloneNode(true));
    }
    //retaining the calculation rows
    var calculatedRows;
    var isAdvancedRGEnabled = emxUIConstants.ADVANCED_ROW_GROUPING_ENABLED;
    if(isAdvancedRGEnabled)
    	calculatedRows = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@calc and not(@rg)]");
    else
    	calculatedRows = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@calc]");

    aDisplayRows = getDisplayRows();
/*
    firstRow = 0;
    var nFirstRow = emxUICore.selectSingleNode(oRowsXML, "/mxRoot/setting[@name = 'first-row']");
    emxUICore.setText(nFirstRow, firstRow);
*/
    var booleanColumn = emxUICore.selectSingleNode(oXML, "/mxRoot/columns/column/settings/setting[@name = 'True Image']/../..");
    if (booleanColumn) {
        var booleanColumnName = booleanColumn.getAttribute("name");
        copyColumnValue(oRowsXML, booleanColumnName);
    }
    oXML = oRowsXML;
    //retaining the calculation rows
    var nRows = emxUICore.selectSingleNode(oXML,"/mxRoot/rows");
    for(var i=0; i<calculatedRows.length; i++) {
        var calcRow = calculatedRows[i];
        nRows.appendChild(calcRow);
    }
    //retaining the calculation rows
    if(afterAutoFilter == true){
        if(previousFilteredNodesXML!=null){
            filterNodes();
        }else{
            showAllRootNodes(false);
        }
    }
    callToBuildColumValues("firstTime",true);

    //gqh: apply filter post sort/
    applyExistingAutoFilterSelections();
    //gqh - row grouping post sort.
    processRowGroupingToolbarCommand();

    if(fullTextSearchObj){
        editableTable.divListBody.scrollTop = 0;
    }
    if(!isIE){
        //synchTreeandTable();
    }
    rebuildView();
    if(typeof sortColumnName!="undefined" && typeof sortDirection!="undefined") {
        insertSortArrows();
        //editableTable.adjustTableLastColumn();
        adjustTableHeight();
    }

}
//User Defined Table addition
function setRequestMap(sortColumnName,sortDirection)
{
    var url = null;
    if (sortColumnName) {
        sortColumnList = sortColumnList + "," + sortColumnName;
        url = "emxCustomTableUtility.jsp?mode=sort&uiType=structureBrowser&timeStamp=" + timeStamp + "&sortColumnName=" + sortColumnName + "&sortDirection=" + sortDirection;
    } else {
        url = "emxCustomTableUtility.jsp?mode=sort&uiType=structureBrowser&timeStamp=" + timeStamp;
    }
    emxUICore.getData(url);

}
//End

function sortTable(colNum){
    if(isDataModified()){
        alert(emxUIConstants.STR_SORTALERT);
        return;
    }
    turnOnProgress();
    var isFastSort = false;
    var fullTextSearch = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name = 'fullTextSearch']");
    var fullTextObjCount = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name = 'fullTextObjCount']");
    var configuredTableName = getRequestSetting('selectedTable');
    if(configuredTableName == null || configuredTableName == 'undefined' || configuredTableName == "")
    	configuredTableName = getTableNameFromXML();
    if(emxUICore.getText(fullTextSearch) == 'true'){
        var fullTextObjectCount = parseInt(emxUICore.getText(fullTextObjCount));
        if(fullTextObjectCount > emxUIConstants.STR_FASTSORT_THRESHOLD) {
               isFastSort = true;
        }
    }
    var alreadySorted = false;
    //colNum is passed in. Default value is 1
    colNum = (colNum == null)?1:colNum;
    var colName = colMap.getColumnByIndex(colNum-1).name;

    for(var colSorted=0; colSorted<lSortColumnName.length; colSorted++){
        if(colName == lSortColumnName[colSorted]) alreadySorted = true;
    }

    if(!alreadySorted){
    //retrieve or set sort direction
    if(typeof arrSortDir[colNum] == "undefined"){
        arrSortDir[colNum] = "ascending";
        }else{
            arrSortDir[colNum] = (arrSortDir[colNum] == "ascending")?"descending":"ascending";
        }

        if(!isFastSort){
        refreshRows(colName, arrSortDir[colNum]);
    }else{
            reloadSBForSort(colName, arrSortDir[colNum]);
        }

        getTopWindow().setPersistenceData("sortColumnName" , colName,  configuredTableName);
    	getTopWindow().setPersistenceData("sortDirection" , arrSortDir[colNum],  configuredTableName);
    }else{

        var sendColName = "";
        var sendColDire = "";

        if(typeof lSortColumnName[0] != "undefined" && lSortColumnName[0] != null){
            sendColName += lSortColumnName[0] + ",";
            if(colName == lSortColumnName[0]){
                lSortColumnDirection[0] = (lSortColumnDirection[0]=="ascending")?"descending":"ascending";
            }

            if(typeof lSortColumnName[1] != "undefined" && lSortColumnName[1] != null){
                if(colName == lSortColumnName[1]){
                    lSortColumnDirection[1] = (lSortColumnDirection[1]=="ascending")?"descending":"ascending";
                }
                sendColName += lSortColumnName[1] + ",";

                if(typeof lSortColumnName[2] != "undefined" && lSortColumnName[2] != null){
                    if(colName == lSortColumnName[2]){
                        lSortColumnDirection[2] = (lSortColumnDirection[2]=="ascending")?"descending":"ascending";
                    }
                    sendColName += lSortColumnName[2];
                }
            }
        }

        if(typeof lSortColumnDirection[0] != "undefined"){
            sendColDire += lSortColumnDirection[0] + ",";
            if(typeof lSortColumnDirection[1] != "undefined"){
                sendColDire += lSortColumnDirection[1] + ",";
                if(typeof lSortColumnDirection[2] != "undefined"){
                    sendColDire += lSortColumnDirection[2];
                }
            }
        }
        while(sendColName.indexOf(',') == sendColName.length-1){
            sendColName = sendColName.substring(0,sendColName.length-1);
        }
        var colNameArray = sendColName.split(",");
        var colDirArray = sendColDire.split(",");
        while(colDirArray.length > colNameArray.length ){
            colDirArray.pop();
        }
        sendColDire = colDirArray.toString();
         if(!isFastSort){
        refreshRows(sendColName, sendColDire);
        } else {
            reloadSBForSort(sendColName, sendColDire);
        }

        getTopWindow().setPersistenceData("sortColumnName" , sendColName,configuredTableName );
      	getTopWindow().setPersistenceData("sortDirection" , sendColDire,configuredTableName );
    }

    turnOffProgress();
}
/**
 * Reset the sort criteria
 */
function resetSortCriteria(colNum,sortDir){
    //use colNum -1 because colNum refers to the xml column's position() which
    //starts at 1 and colMap is an 0 based array
    var colName = colMap.getColumnByIndex(colNum-1).name;
    sortColumnName = colName;
    sortDirection = sortDir;
    resetParameter("sortColumnName", colName);
    resetParameter("sortDirection", sortDir);
}
/**
 * reset a parameter in urlParameters
 * @param parm The querystring parameter
 * @param val The parameter value
 */
function resetParameter(parm, val){
     if(urlParameters.indexOf("amp;") >= 0){
            while(urlParameters.indexOf("amp;") >= 0){
                urlParameters = urlParameters.replace("amp;", "");
            }
        }

    var arrURLparms = urlParameters.split("&");
    var len = arrURLparms.length;
    var count = 0;
    for(var i = 0; i < len; i++){
        arrURLparms[i] = arrURLparms[i].split("=");
        //only change the first matching parm
        if(arrURLparms[i][0] == parm && count == 0){
            count++;
            //set new value
            arrURLparms[i][1] = val;
        }
        arrURLparms[i] = arrURLparms[i].join("=");
    }
    urlParameters = arrURLparms.join("&");
    //if the count is still zero add param to end
    if(count == 0){
        urlParameters += ("&" + parm + "=" + val);
    }
    return urlParameters;
}
/**
 * reset a parameter in urlParameters
 * @param parm The querystring parameter
 * @param val The parameter value
 */
function getParameter(parm){
     if(urlParameters.indexOf("amp;") >= 0){
            while(urlParameters.indexOf("amp;") >= 0){
                urlParameters = urlParameters.replace("amp;", "");
            }
        }

    var arrURLparms = urlParameters.split("&");
    var len = arrURLparms.length;
    var retval = '';
    for(var i = 0; i < len; i++){
        arrURLparms[i] = arrURLparms[i].split("=");
        //only change the first matching parm
        if(arrURLparms[i][0] == parm){
            retval = arrURLparms[i][1];;
        }
    }
    return retval;
}
/**
 * checks if there have been changes to the data
 */
function isDataModified(){
    var retLength = 0;
    var root = postDataXML;
    var existingObjNode = emxUICore.selectSingleNode(root,"/mxRoot/object");
    if(existingObjNode != null)
    {
        retLength = postDataXML.documentElement.childNodes.length;
    }
    return retLength;
}
/**
 * close window
 */
function closeWindow(win){
    if(isDataModified()){
        if(!confirm(emxUIConstants.STR_CLOSE_MSG)){
            return;
        }
    }
    if (win) {
        win.open('emxCloseWindow.jsp', '_self');
    }
    else {
    getTopWindow().close();
}
}
/**
 * reset modified data back to original value
 */
function resetEdits() {
    aCopiedRowsChecked = new Array();
    aPastedRowsChecked = new Array();
    removeCurrentFloatingDiv();
    //if data is not modified, just return
    if(!isDataModified()){
        return;
    }
    enableExpandMenus();
    //IR-053537V6R2011x: If there are any custom changes made by applications, they can revert on click of Reset button. This reads the JavaScript function defined in the URL parameter onRest.
        var resetHook =  emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name='onReset']/text()");
        if(resetHook && "" != resetHook.text){
            resetHook = emxUICore.getText(resetHook);
            if(resetHook){
                eval(resetHook+"()");
            }
        }
       // resetting all the visual cues -start
       var MarkupxmlRows =emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@status='add' or @status='resequence' or @status='new' or @status='lookup']");
       var atempUndoRows = MarkupxmlRows;

       unRegisterSelectedRows(MarkupxmlRows);

       //Removing the added /resequce nodes
       for(var i=0;i<MarkupxmlRows.length;i++){
            MarkupxmlRows[i].parentNode.removeChild(MarkupxmlRows[i]);
       }

       var MarkupxmlRows =emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@status='cut']");
       //removing the visual cues of cut parts(s)
       for(var i=0;i<MarkupxmlRows.length;i++){
            MarkupxmlRows[i].removeAttribute("e");
            MarkupxmlRows[i].removeAttribute("status");
            MarkupxmlRows[i].removeAttribute("displayRow");
        }
       // resetting all the visual cues -END



        for (var rowid in arrUndoRows) {
            var columnInfo = arrUndoRows[rowid];
            for (var columnId in columnInfo) {
                var tempColumnId = new Number(columnId) + 1;
                xmlRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id = '" + rowid + "']/c[" +  tempColumnId + "]");
                if (xmlRow == null) {
                    continue;
                }
                var tempVal = columnInfo[columnId];
                try{
                if(isDynamicURLValue(tempVal)) {
                    var objDOM = emxUICore.createXMLDOM();
                    tempVal = tempVal.replace(/&/g, "&amp;");
                    tempVal = tempVal.replace(/&amp;amp;/g, "&amp;");
                    objDOM.loadXML(tempVal);
                    setMxLinkText(xmlRow, "");
                    var mxLinkValue = emxUICore.selectSingleNode(objDOM, "/mxRoot/mxLink");
                    xmlRow.appendChild(mxLinkValue);
                    var objDOMnew = emxUICore.createXMLDOM();
                    var mxLinkDisplayValue = emxUICore.selectSingleNode(objDOM, "/mxRoot/text()");
                    if(mxLinkDisplayValue) {
                        var objNewText = objDOMnew.createTextNode(mxLinkDisplayValue.nodeValue);
                        xmlRow.appendChild(objNewText);
                    }
                }
                else {
                    for(var itr=0; itr<xmlRow.childNodes.length; itr++) {
                        var childNode = xmlRow.childNodes[itr];
                        xmlRow.removeChild(childNode);
                        itr--;
                    }
                    tempVal = xmlRow.getAttribute("d");
                    //if val is a valid xml node isert it otherwise create text node
                    if(tempVal.indexOf("</") == -1 && tempVal.indexOf("/>") == -1){
                        throw "Not Formatted HTML";
                    }
                    //tempVal = emxUIRTE.get_rte_data(tempVal);
                        var objDOM = emxUICore.createXMLDOM();
                        objDOM.loadXML("<span>"+tempVal+"</span>");
                        var emxRTEValue = emxUICore.selectSingleNode(objDOM, "/span");
                        for(var itr=0; itr<emxRTEValue.childNodes.length; itr++) {
                            var childNode = emxRTEValue.childNodes[itr];
                            xmlRow.appendChild(childNode);
                            itr--;
                        }

                      //iFH as an attribute on cell to verify that the cell value is proper XHTML
                        xmlRow.setAttribute("iFH", "true");
                }
                }catch(e){
                    xmlRow.removeAttribute("iFH");
                    tempVal = xmlRow.getAttribute("d");
                    var htmlTest=/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/;
                    if(htmlTest.test(tempVal))
                    {
                        if(isIE)
                        {
                            var objDOM = emxUICore.createXMLDOM();
                            objDOM.loadXML(tempVal);
                            xmlRow.appendChild(objDOM.firstChild);
                        }
                        else
                        {
                            xmlRow.innerHTML=tempVal;
                        }
                    }
                    else
                    emxUICore.setText(xmlRow, tempVal);
                    //On reset if "date" attribute exists reset it with contents of  "a" which has the old value. Remove "newA" and "msValueNew".
                    if(xmlRow.getAttribute("date") != null){
                        xmlRow.setAttribute("date", xmlRow.getAttribute("a"));
                    }
                }
                xmlRow.removeAttribute("edited");
                xmlRow.removeAttribute("newA");
                xmlRow.removeAttribute("msValueNew");
                xmlRow.removeAttribute("d");
                xmlRow.parentNode.removeAttribute("status");
                xmlRow.parentNode.removeAttribute("e");
            }
        }
       var changedRXML =emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@status='changed']");
       //removing the visual cues of cut parts(s)
       for(var i=0;i<changedRXML.length;i++){
            changedRXML[i].removeAttribute("e");
            changedRXML[i].removeAttribute("status");
        }
        arrUndoRows = new Object();
           //To remove Undoing rows from cache
           removeRowsFromCache(atempUndoRows);
        postDataXML.loadXML("<mxRoot/>");
        aMassUpdate = new Array();
        callToBuildColumValues("add");
        callToBuildColumValues("resetEdits");

        //refresh row grouping after reset.
        processRowGroupingToolbarCommand();
        //synchTreeandTable();
        //RefreshView();
        rebuildView();
        //Gayout the expand filter
        showExpandFilter(true);
        syncSB();
}

/**
 * sends the postDataXML to the server for processing
 */
 var applyInProgress = false;
 function applyEdits(){
     if(!isDataModified()){
         return;
     }
    if(portalMode == "true"){
	  toggleProgress('visible')
    }else{
     turnOnProgress(true);
    }
    setTimeout(function(){applyEdits2()},25);
 }
 function applyEdits2(){     //if data is not modified, just return
     
   
     enableExpandMenus();
    if(!validateNewRows()) {
        turnOffProgress();
        return;
    }

     //validate all the attributes of the passted rows
     if(!validateAddedRowsOnApply()){
         turnOffProgress();
         return;
     }
     //375750- LG Copy From
     var hasValidataAllNode = emxUICore.selectSingleNode(oXML,"/mxRoot/tableControlMap//setting[@name='HasValidateAll']/value");
     var hasValidateAll = false;
     if(hasValidataAllNode != null){
         hasValidateAll = emxUICore.getText(hasValidataAllNode).toLowerCase() == 'true';
     }
     if(hasValidateAll){
         var arrFillupRows = [];
         var arrMarkupAddParentRows = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[child::r[@status = 'add']]");
         for(var itr = 0 ; itr < arrMarkupAddParentRows.length; itr++){
             var nMarkupAddParentRow = arrMarkupAddParentRows[itr];
             var arrChildAddRows = emxUICore.selectNodes(nMarkupAddParentRow,"r");
             arrFillupRows = arrFillupRows.concat(arrChildAddRows);
         }
         fillupColumns(arrFillupRows, 0, arrFillupRows.length);
     }
     //375750- LG Copy From
     //if there are validators for Apply Edits eval them
     if(!validateOnApply()){
         turnOffProgress();
         return;
     }

     /* applyInProgress flag added for bug:IR-012214V6R2010x */
     if(applyInProgress == false)
     {
         applyInProgress = true;
         //To send only the edited column information to the DB
         validateColumnsInfo();
         var applyURL = getRequestSetting('applyURL');
         if(applyURL != null && applyURL.length > 0){
             if(applyURL.indexOf('javascript:') != -1){
                 fn = applyURL + "();";
                 eval(fn);
             }else{
                 submitPostDataXML(applyURL);
             }
         }else{
            emxEditableTable.performXMLDataPost();
         }
         sortColumnList = "";
         applyInProgress = false;
     }

     setTimeout(function(){    //Gayout the expand filter
     showExpandFilter(true);
     rebuildView();
     //refresh row grouping after save
     processRowGroupingToolbarCommand("processPostApply");
     // test if there are filters to redraw
     applyExistingAutoFilterSelections();
     turnOffProgress();
	 syncSB();
     },0);
 }

emxEditableTable.performXMLDataPost = function __performXMLDataPost(){
    performXMLDataPost("emxFreezePaneProcessXML.jsp?timeStamp="+timeStamp+ "&strSortColumnNames=" + sortColumnList + getToolbarData(false), postDataXML);
 }

 function submitPostDataXML(applyURL)
 {
    var postXML    = postDataXML.cloneNode(true);
    var requestMap = emxUICore.selectSingleNode(oXML,"//requestMap");
    postXML.documentElement.appendChild(requestMap.cloneNode(true));
    var columns    = emxUICore.selectSingleNode(oXML,"//columns");
    postXML.documentElement.appendChild(columns.cloneNode(true));

    document.emxTableForm.csvData.value = "";
    document.emxTableForm.postDataXML.value = postXML.xml;
    document.emxTableForm.target = "listHidden";
    document.emxTableForm.action = applyURL;
    document.emxTableForm.method = "post";
    document.emxTableForm.submit();
    document.emxTableForm.postDataXML.value = "";
 }

/**
 * sets the edit mode onload
 */
var modeTries = 10;
function setMode(){
    try{
        editMode();
    }catch(e){
    //we need to give it a few tries because the menu
    //might not be loaded
        modeTries--;
        if(modeTries > 0){
            setTimeout("setMode()",500);
        }
    }
}
//MASS UPDATE FUNCTIONS
function massUpdate(objSelect){
    turnOnProgress();
    var txt = objSelect.options[objSelect.selectedIndex].value;
    if(txt == null || txt == ""){
        return;
    }
    if(currentFloatingDiv){
        removeCurrentFloatingDiv();
        objSelect.value=txt;
    }
    var floatingDiv = document.createElement("div");
    currentFloatingDiv = floatingDiv;
    var objColumn = colMap.getColumnByName(txt);
    var inputNode = emxUICore.selectSingleNode(oXML, "/mxRoot/columns/column[@name=\"" + txt + "\"]/settings/setting[@name=\"Default Input Type\"]/text()");
    if (inputNode == null || inputNode == undefined){
        inputNode = emxUICore.selectSingleNode(oXML, "/mxRoot/columns/column[@name=\"" + txt + "\"]/settings/setting[@name=\"Input Type\"]/text()");
    }
    var inputType = emxUICore.getText(inputNode);
    var form = document.createElement("form");
    form.name = "emxTableForm_2";
    document.forms["emxTableForm_2"] = form;
    document.body.appendChild(form);

    var formfield  = getField(null, inputType, objColumn, null, null, true);
    var uomAssociated = objColumn.getSetting("UOMAssociated");

    var selectField = null;
    if (uomAssociated != null && uomAssociated != undefined && uomAssociated == "true")
    {
        var newObj = new Object();
        var defaultUnit = objColumn.getSetting("Default Unit");
        if (defaultUnit == null || defaultUnit == undefined)
        {
            defaultUnit = "";
        }
        newObj.value = defaultUnit;
        selectField = getField(null, "combobox", objColumn);

        //To set the default unit in the drop down
        if (defaultUnit != null && defaultUnit != undefined && trim(defaultUnit) != "")
        {
            for(var key in objColumn.rangeValues)
            {
                key = objColumn.getSetting(key);
                if(defaultUnit == key)
                {
                    selectField.options[selectField.options.length-1].selected = true;
                    break;
                }
            }
        }
    }
    //override onblur
    formfield.onblur = null;
    formfield.onchange = null;
    //assigning name to the form field
    var name = "formfield" + new Date().getTime();
    formfield.name = name;

    var hiddenField  = getField(null, "hidden", objColumn);
    var applyToSel = document.createElement("input");
    applyToSel.setAttribute("type", "button");
    applyToSel.setAttribute("name", "applyToSel");
    applyToSel.setAttribute("value", emxUIConstants.STR_APPLYTOSELECTED);
    applyToSel.onclick = function () {
        recurseData('selected',objColumn.index,formfield, selectField);
        objSelect.value="";
        //document.body.removeChild(floatingDiv);
    };
    var selrowNodes = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@disableSelection ='true']");
    var nTotalRows = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name = 'total-rows']");
    var disableApplyToSel = (selrowNodes.length == emxUICore.getText(nTotalRows));

    if(disableApplyToSel){
        applyToSel.setAttribute("disabled", "true");
    }
    var applyToAll = document.createElement("input");
    applyToAll.setAttribute("type", "button");
    applyToAll.setAttribute("name", "applyToAll");
    applyToAll.setAttribute("value", emxUIConstants.STR_APPLYTOALL);
    applyToAll.onclick = function () {
        recurseData('all',objColumn.index,formfield, selectField);
        objSelect.value="";
        //document.body.removeChild(floatingDiv);
    };
    var xButton = document.createElement("input");
    xButton.setAttribute("type", "button");
    xButton.setAttribute("name", "xButton");
    xButton.setAttribute("value", "X");
    xButton.onclick = function () {
        document.body.removeChild(floatingDiv);
        objSelect.value="";
    };
    var buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("align", "center");
    buttonDiv.appendChild(applyToSel);
    buttonDiv.appendChild(applyToAll);
    buttonDiv.appendChild(xButton);
    floatingDiv.appendChild(buttonDiv);
    form.appendChild(formfield);
    if (selectField != null)
    {
        form.appendChild(selectField);
    }
    form.appendChild(hiddenField);
    //START BUG 365696
    var inputControlDirection = objColumn.getSetting('Input Control Direction');
    var buttonDivForm = document.createElement("div");
    buttonDivForm.setAttribute("align", "left");
    var boxHeight = (emxUICore.getWindowHeight(getTopWindow())-100);
    var boxWidth = (emxUICore.getWindowWidth(getTopWindow())-200);

    if(!isIE){
        var sbPanel = emxUICore.getEvent().offsetParent.offsetParent.offsetParent.offsetParent.clientHeight;
        var sbHeadPanel = emxUICore.getEvent().offsetParent.offsetParent.offsetParent.clientHeight;

        boxHeight = sbPanel - sbHeadPanel;
    }

    if (boxHeight<300){
        boxHeight = 300;
    }
    if (boxWidth<300){
        boxWidth = 300
    }
    if ((inputType == "radiobutton" || inputType == "checkbox") && inputControlDirection != "horizontal"){
        buttonDivForm.style.overflow = "auto";
        buttonDivForm.style.height = "270px";
        buttonDivForm.style.width = 130+"px";
    }
    else if ((inputType == "radiobutton" || inputType == "checkbox") && inputControlDirection == "horizontal"){
        buttonDivForm.style.overflowX = "auto";
        buttonDivForm.style.overflowY = "hidden";
        buttonDivForm.style.width = (boxWidth-200) + "px";
        buttonDivForm.style.height = 75 +"px";
    }
    else if(inputType == "combobox" ){
        //buttonDivForm.style.height = (boxHeight-490) +"px";
    }

    buttonDivForm.appendChild(form);
    floatingDiv.appendChild(buttonDivForm);
    //END BUG 365696

    //add date picker if column is a date
    if(objColumn.getSetting("format").toLowerCase() == "date"){
        //create floating div
        var name = "formfield" + new Date().getTime();
        //set to readonly
        if(objColumn.getSetting("Allow Manual Edit") == null ||
                objColumn.getSetting("Allow Manual Edit").toLowerCase() != "true"){
            if (isIE) {
                formfield.readOnly = "readOnly";
            }
            else {
                formfield.setAttribute("readonly","readonly");
            }
        }
        //name and register the  fields
//      Added:For Enhanced Calendar Control:AEF:nr2:20-11-09
        var oid = getRequestSetting('objectId');
        var relId = null;
        var my_JSONStr = "{\"CalendarProgram\"" + ":" + "\"" + objColumn.getSetting('Calendar Program') + "\",";
        my_JSONStr += "\"CalendarFunction\"" + ":" + "\"" + objColumn.getSetting('Calendar Function') + "\",";
        my_JSONStr += "\"componentType\"" + ":" + "\"SB\",";
        my_JSONStr += "\"mode\"" + ":" + "\"" + editableTable.mode + "\",";
        my_JSONStr += "\"InputType\"" + ":" + "\"" + inputType + "\",";
        my_JSONStr += "\"format\"" + ":" + "\"" + objColumn.getSetting("format").toLowerCase() + "\",";
        my_JSONStr += "\"objectId\"" + ":" + "\"" + oid + "\",";
        my_JSONStr += "\"relationId\"" + ":" + "\"" + relId + "\",";
        my_JSONStr += "\"calBeanTimeStamp\"" + ":" + "\"" + timeStamp + "\"}";
//      End:For Enhanced Calendar Control:AEF:nr2:20-11-09
        formfield.name = name + "";
        hiddenField.name = name + "_msvalue";
        form.appendChild(formfield);
        form.appendChild(hiddenField);
        var anchor = document.createElement("a");
        anchor.setAttribute("href",
                "javascript:showCalendar('emxTableForm_2', '"+name+"', '','','','','','" + my_JSONStr + "')");

        var img = document.createElement("img");
        img.setAttribute("src","images/iconSmallCalendar.gif");
        img.setAttribute("alt","Date Picker");
        img.setAttribute("border","0");
        anchor.appendChild(img);
        form.appendChild(anchor);
        formfield.setAttribute("massUpdate","true");
        currentFormfield = formfield;
        currentHiddenFormfield = hiddenField;
        currentFloatingDiv = floatingDiv;
    }
    //rangeHelper url
    if(objColumn.getAttribute("rangeHref") != undefined){
        var name = "formfield" + new Date().getTime();

        //name and register the hidden field
        formfield.name = name + "";
        hiddenField.name = name + "_Actual";
        try{
            form.elements[name + "_Actual"] = hiddenField;
            form[name + "_Actual"] = hiddenField;
            form.elements[name + ""] = formfield;
            form[name + ""] = formfield;
        }catch(e){
        }
        var rangeHref = objColumn.getAttribute("rangeHref");
        rangeHref = parseHrefValue(rangeHref);
        var intWidth = emxUIConstants.ARR_PopupWidth['Default'];
        var intHeight = emxUIConstants.ARR_PopupHeight['Default'];
        var popupSize  = objColumn.getSetting("Popup Size");
        var suiteKey  = objColumn.getSetting("Registered Suite");
        var button = document.createElement("input");
        var oid = getRequestSetting('objectId');
        button.setAttribute("type","button");
        button.setAttribute("name","btnType");
        button.setAttribute("value","...");
        button.onclick = function(){
            var appendParams = "formName=emxTableForm_2&fieldNameActual="+name+
            "_Actual&fieldNameDisplay="+name+
            "&suiteKey="+suiteKey+"&objectId="+oid;
            if(rangeHref.indexOf('javascript:') == new Number(0)){
                var lastIdx = new Number(rangeHref.indexOf(')'));
                var fn = rangeHref.substring(0,lastIdx);
                if((rangeHref.indexOf('();') + 1) != lastIdx){
                    fn = fn + ",";
                }
                fn = fn + "'" + appendParams + "'" +  rangeHref.substr(lastIdx);
                rangeHref = eval(fn);
                fn = null;
            } else {
                rangeHref += (rangeHref.indexOf('?') > -1 ? '&' : '?') + appendParams;
            }
            if(popupSize != null && popupSize != 'undefined' && popupSize != ''){
                showModalDialog(rangeHref, intWidth, intHeight, true, popupSize);
            } else {
                showChooser(rangeHref, intWidth, intHeight);
            }
        };

        var HiddenInputField = hiddenField;
        var ActualInputField = formfield;
        var clear = document.createElement("input");
        clear.setAttribute("type","button");
        clear.setAttribute("name","btnClear");
        clear.setAttribute("value",clearString);

        clear.onclick = function(){
            HiddenInputField.value = "";
            ActualInputField.value = "";
        }

        form.appendChild(button);
        form.appendChild(clear);

        if(!objColumn.getSetting("Allow Manual Edit") || objColumn.getSetting("Allow Manual Edit").toLowerCase() != "true"){
            if (isIE) {
                formfield.readOnly = "readOnly";
            }
            else {
                formfield.setAttribute("readonly","readonly");
            }
        }

        formfield.setAttribute("massUpdate","true");
        currentFormfield = formfield;
        currentHiddenFormfield = hiddenField;
        currentFloatingDiv = floatingDiv;
    }
    floatingDiv.className = "formLayer";
    document.body.appendChild(floatingDiv);

    var cX = 92;
    var cY = 96;

    if(isIE){
        var targetNode = emxUICore.getEvent().target.parentNode;
        cX = targetNode.offsetLeft;
        cX += 12;

        cY = targetNode.offsetTop;
        cY += targetNode.offsetParent.offsetTop;
        cY += targetNode.offsetParent.offsetParent.offsetTop;
        cY += targetNode.offsetParent.offsetParent.offsetParent.offsetTop;
        if(targetNode.offsetParent.offsetParent.offsetParent.offsetParent!=null){
            cY += targetNode.offsetParent.offsetParent.offsetParent.offsetParent.offsetTop;
        }
        cY += 25;
    } else {

        var reqdDiv = emxUICore.getEvent().offsetParent;
        while(reqdDiv != null && reqdDiv.id != "divMassUpdate" ){
            reqdDiv = reqdDiv.offsetParent;
        }
        cY = reqdDiv.offsetTop;
        cY += 25;
    }

    floatingDiv.style.top = cY + "px";
    floatingDiv.style.left = cX + "px";
    floatingDiv.style.visibility = "visible";
    try{
        document.forms["emxTableForm_2"] = form;
    }catch(e){
    }
    //must focus window first because of tabbing bug in Moz
    window.focus();
    formfield.focus();
    turnOffProgress();
    if((inputType == "listboxmanual") ){
        getTypeAhead(objColumn,document.getElementById("selectListManualTextBoxToKeyIn"),null,configuredTableName);
    }
    else if(inputType == "textbox" && uomAssociated != "true"){
        getTypeAhead(objColumn,formfield,hiddenField,configuredTableName,"",true);
    }
     if (inputType == "textarea"){
        var arr = jQuery('.rte').rte({
            controls_rte: rte_toolbar,
            controls_html: html_toolbar,
            callback: function(){
                var self = this;
                self.update_hidden_field();
                updateText(targetNode, self.textarea, rowId);
                jQuery('.formLayer').remove();
            }
        });
        enableSpellChecker();
     }
}

var massUpdateChache = [];
function massUpdateTypeAhead(vNewvalue){
    massUpdateChache[alertmassUpdateChache.length]=vNewvalue;
}

function ff() {
    return true;
}

function recurseData(strChoice, colIndex, formfield, selectField){
    turnOnProgress();
    if (strChoice == "selected") {
        //check if ANY rows are selected
        var aRowsChecked = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked']");
        if(aRowsChecked.length == 0){
            alert(emxUIConstants.ERR_NONE_SELECTED);
            document.body.removeChild(currentFloatingDiv);
            turnOffProgress();
            return;
        }
    }
    var theColumn = colMap.getColumnByIndex(colIndex-1);
    var columnType = theColumn.getSetting("Column Type");
    var fieldType = theColumn.getSetting("Field Type");
    var editAccessMask = theColumn.getSetting("Edit Access Mask");
    var editCheckRequired = false;
    if (editAccessMask && editAccessMask.length > 0 ||
        (columnType && (columnType == "businessobject" || columnType == "relationship") && fieldType && fieldType == "attribute")
       ) {
       editCheckRequired = true;
    }

    var oColumnXML = null;
    if (editCheckRequired) {
        var displayRowIds = "";
        for (var i = 0; i < aDisplayRows.length; i++) {
            var displayColumns = emxUICore.selectNodes(aDisplayRows[i], "c");
            if(displayColumns.length == 0) {
                if (displayRowIds.length == 0) {
                    displayRowIds = aDisplayRows[i].getAttribute("id");
                } else {
                    displayRowIds += ":" + aDisplayRows[i].getAttribute("id");
                }
            }
        }

        if (displayRowIds.length > 0) {
            oColumnXML = emxUICore.getXMLDataPost("emxFreezePaneGetData.jsp",
                                                  "fpTimeStamp=" + timeStamp +
                                                  "&massUpdateColumn=" + theColumn.name +
                                                  "&rowIds=" + displayRowIds+"&IsStructureCompare=" + isStructureCompare);
        }
    }

    //Gayout the expand filter
    showExpandFilter(false);

    hasRunMassUpdate = true;
    var validated = true;
    //get the value and or actual value
    var displayValue = "";
    var actualVal = "";
    var val = "";
    var value = "";
    var blnIsString = false;
    if(formfield.className == "rte"){
        value = jQuery('body',jQuery('iframe.rte').get(0).contentDocument).html().replace(/<[\/]{0,1}(span|A)[^><]*>/gi,"").replace(/&nbsp;/gi, " ").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&").replace(/<br>/gi, "<br/>");
    }else{
        value = getValue(formfield);
    }
    var formatedDate =null;
    // ETP: IR-164693: Clearing the value for date by setting it to "". If the value is empty for date, then skip processing and set hiddenVal and formatedDate to "".
    if(theColumn.getSetting("format")=="date"){
        var columnIndex = theColumn.index-1;
        if(value != ""){
        var date = encodeURI(value);
        var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp+"&IsStructureCompare=" + isStructureCompare+"&date="+date+"&columnIndex="+columnIndex;
        var childXML = emxUICore.getXMLDataPost(url, "&isdate=true");

        value = emxUICore.selectSingleNode(childXML, "/mxRoot/date/display/text()");
        hiddenVal = emxUICore.selectSingleNode(childXML, "/mxRoot/date/msvalue/text()");
        formatedDate = emxUICore.selectSingleNode(childXML, "/mxRoot/date/sortType/text()");

        value = value.nodeValue;
        hiddenVal = hiddenVal.nodeValue;
        formatedDate = formatedDate.nodeValue;
        }else{
            value = "";
            hiddenVal = "";
            formatedDate = "";
        }
    }

    var isNFEnabled = theColumn.getSetting("isNF");
    var isPFEnabled = theColumn.getSetting("isPF");
    var symbol = "%";
    var formattedPart ="";
    if(isNFEnabled == "true"){
        formattedPart = getFormattedNumber(value);
    }

    if(typeof value == "string"){
        displayValue = isNFEnabled == "true" ? formattedPart : value;
        actualVal = value;
        blnIsString = true;
    }else{
        displayValue = value[0];
        actualVal  = value[1];
    }
    if(isPFEnabled == "true" && displayValue != ""){
        displayValue = displayValue + symbol;
    }

    var mxLinkFound = false;
    var mxLinkDisplayValue;
    if(isDynamicURLEnabled(theColumn)) {
        mxLinkFound = true;

        var displayValueXml = emxUICore.createXMLDOM();
        displayValueXml.loadXML("<mxLinkRoot/>");
        var textNode = displayValueXml.createTextNode(displayValue);
        var theRoot = displayValueXml.documentElement;
        theRoot.appendChild(textNode);
        var responseText = emxUICore.getTextXMLDataPost("emxFreezePaneValidate.jsp?editType=mass&paramName=" + theColumn.name, displayValueXml.xml);

        var root = responseText;
        xPath = "message/alert/text()";
        val = emxUICore.selectSingleNode(root,xPath).nodeValue;
        if(val && val != null && val != "") {
            var result = confirm(val);
            if(result) {
                document.body.removeChild(currentFloatingDiv);
            }else {
                turnOffProgress();
                return;
            }
        }else {
            document.body.removeChild(currentFloatingDiv);
        }
        xPath = "message/displaylink/text()";
        displayValue = emxUICore.selectSingleNode(root,xPath).nodeValue;
        xPath = "message/display/text()";
        mxLinkDisplayValue = emxUICore.selectSingleNode(root,xPath).nodeValue;
    }
    if(mxLinkFound == false) {
        document.body.removeChild(currentFloatingDiv);
    }
    if(theColumn.getAttribute("rangeHref") != undefined)
    {
        actualVal = getValue(currentHiddenFormfield);
    }
    //get validator if defined
    var theValidator = theColumn.getSetting("Validate");
    //is this a required field???
    if(actualVal == "" && typeof actualUnit == "undefined" )
        {

            actualVal = displayValue;
        }
    var isRequired = theColumn.getSetting("Required");
    if(isRequired == "true" && trim(actualVal).length == 0)
    {
        alert(emxUIConstants.ERR_REQUIRED_FIELD);
        turnOffProgress();
        return;
    }

    if (selectField != null)
    {
        var displayUnit = selectField[selectField.selectedIndex].text;
        var actualUnit = theColumn.getSetting(trim(displayUnit));
        if(actualVal != null && typeof actualUnit == "undefined"  )
        {
            actualVal = actualVal + " " + displayUnit;
        }
        else
        {
            actualVal = actualVal + " " + actualUnit;
        }
        displayValue = displayValue + " " + displayUnit;
    }

    currentColumnPosition = colIndex;
    if (theValidator && theValidator.length > 0) {
        for (var i = 0; i < aDisplayRows.length; i++) {
            if (strChoice == "selected") {
                var isChecked = aDisplayRows[i].getAttribute("checked");
                if (!isChecked || isChecked != "checked") {
                    continue;
                }
            }

            //if editMask is true move to next row or if the status of the row is cut, i.e, if row is deleted
            var markUpStatus = aDisplayRows[i].getAttribute("status");
            var editMask = aDisplayRows[i].getAttribute("editMask");
            if((editMask && editMask == "false") || (markUpStatus && markUpStatus == "cut")) {
                continue;
            }
            if (editCheckRequired) {
                var columnInfo = emxUICore.selectSingleNode(aDisplayRows[i], "c[" + (colIndex) + "]");
                if (!columnInfo && oColumnXML!= null) {
                    var rowId = aDisplayRows[i].getAttribute("id");
                    columnInfo = emxUICore.selectSingleNode(oColumnXML, "/mxRoot/rows/r[@id='" + rowId + "']/c");
                }
                if(columnInfo)
                editMask = columnInfo.getAttribute("editMask");
                if(editMask && editMask == "false") {
                    continue;
                }
            }

            currentRow = aDisplayRows[i];
            //added for the bug 329326
            while(actualVal.indexOf("'")!=-1)
            {
                actualVal=actualVal.replace("'","&quot;");
            }
            //till here
            var  tempVal = escapeValueForEval(actualVal); //actualVal.replace(/(\r\n|\n|\r)/gm,"");
            if(theColumn.getSetting("format")=="date"){
                validated = eval(theValidator + "('" +getValue(currentHiddenFormfield)+ "','" + getStatus(currentRow) + "')");
            }else{
             validated = eval(theValidator + "('" +tempVal+ "','" + getStatus(currentRow) + "')");
            }
            //added for the bug 329326
            while(actualVal.indexOf("&quot;")!=-1)
            {
                actualVal=actualVal.replace("&quot;","'");
            }

            //till here
            if(validated == false){
               turnOffProgress();
               return;
            }
        }
    }

    //adjust colIndex for IE xpath
    for (var i = 0; i < aDisplayRows.length; i++) {

        if (strChoice == "selected") {
            //check if ANY rows are selected
            var aRowsChecked = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked']");
            if(aRowsChecked.length == 0){
                alert(emxUIConstants.ERR_NONE_SELECTED);
                break;
            }
            var isChecked = aDisplayRows[i].getAttribute("checked");
            if (!isChecked || isChecked != "checked") {
                continue;
            }
        }

        //if editMask is true move to next row or if the status of the row is cut, i.e, if row is deleted
        var markUpStatus = aDisplayRows[i].getAttribute("status");
        var editMask = aDisplayRows[i].getAttribute("editMask");
        if((editMask && editMask == "false") || (markUpStatus && markUpStatus == "cut")) {
            continue;
        }
        if (editCheckRequired) {
            var columnInfo = emxUICore.selectSingleNode(aDisplayRows[i], "c[" + (colIndex) + "]");
            if (!columnInfo && oColumnXML!= null) {
                var rowId = aDisplayRows[i].getAttribute("id");
                columnInfo = emxUICore.selectSingleNode(oColumnXML, "/mxRoot/rows/r[@id='" + rowId + "']/c");
            }
            if(columnInfo)
            editMask = columnInfo.getAttribute("editMask");
            if(editMask && editMask == "false") {
                continue;
            }
        }
        //Added for cell level Granularity
        if (true){
            var columnInfo = emxUICore.selectSingleNode(aDisplayRows[i], "c[" + (colIndex) + "]");
            if (!columnInfo && oColumnXML!= null) {
                var rowId = aDisplayRows[i].getAttribute("id");
                columnInfo = emxUICore.selectSingleNode(oColumnXML, "/mxRoot/rows/r[@id='" + rowId + "']/c");
            }
            if(columnInfo)
            editMask = columnInfo.getAttribute("editMask");
            if(editMask && editMask == "false") {
                continue;
            }
        }

        var sNewValue = null;
        if (selectField != null)
        {
            sNewValue = displayValue;
        }
        else
        {
            sNewValue = (displayValue == "")?" ":displayValue;
        }

        var columnInfo = emxUICore.selectSingleNode(aDisplayRows[i], "c[" + (colIndex) + "]");
        var sLevelId = aDisplayRows[i].getAttribute("id");
        if (columnInfo && aDisplayRows[i].getAttribute("calc")!='true') {
            columnInfo.setAttribute("edited", "true");
            if(aDisplayRows[i].getAttribute("status") == "add"){
                columnInfo.setAttribute("editedAfterAdd", "true");
            }

         // ETP: IR-164693: Clearing the value for date by setting it to "". formatedDate is set to "" in case of clearning date. So check if the value for formatedDate is not null.
            if(theColumn.getSetting("format")=="date" && formatedDate!=null){
                columnInfo.setAttribute("date", formatedDate);
                columnInfo.setAttribute("msValueNew", hiddenVal);
            }
            if(!arrUndoRows[sLevelId]) {
                arrUndoRows[sLevelId] = new Object();
            }
            if(!arrUndoRows[sLevelId][colIndex-1]&& arrUndoRows[sLevelId][colIndex-1]!="") {
                var objDOM = emxUICore.createXMLDOM();
                objDOM.loadXML(columnInfo.xml);
                var cNode = emxUICore.selectSingleNode(objDOM, "/c/mxLink");
                var val;
                if(cNode) {
                    var mxLinkValue = emxUICore.selectSingleNode(objDOM, "/c/text()");
                    arrUndoRows[sLevelId][colIndex-1] = "<mxRoot>" + cNode.xml + mxLinkValue.xml + "</mxRoot>";
                    columnInfo.setAttribute("d", mxLinkValue.xml);
                }else {
                    arrUndoRows[sLevelId][colIndex-1] = emxUICore.getText(columnInfo);
                    columnInfo.setAttribute("d",  emxUICore.getText(columnInfo));
                }
            }
            try{
            sNewValue = sNewValue.replace(/&/g, "&amp;");
            if(isDynamicURLValue(sNewValue)) {
                var objDOM = emxUICore.createXMLDOM();
                objDOM.loadXML("<mxRoot><mxLink>" + sNewValue + "</mxLink></mxRoot>");
                setMxLinkText(columnInfo, "");
                var mxLinkValue = emxUICore.selectSingleNode(objDOM, "/mxRoot/mxLink");
                columnInfo.appendChild(mxLinkValue);
                var objDOMnew = emxUICore.createXMLDOM();
                var objNewText = objDOMnew.createTextNode(mxLinkDisplayValue);
                columnInfo.appendChild(objNewText);
            }else {
                //emxUICore.setText(columnInfo, sNewValue);
                  for(var itr=0; itr<columnInfo.childNodes.length; itr++) {
                      var childNode = columnInfo.childNodes[itr];
                      columnInfo.removeChild(childNode);
                      itr--;
                  }
                    var objDOM = emxUICore.createXMLDOM();
                    objDOM.loadXML("<span>"+sNewValue+"</span>");
                    var emxRTEValue = emxUICore.selectSingleNode(objDOM, "/span");
                    for(var itr=0; itr<emxRTEValue.childNodes.length; itr++) {
                        var childNode = emxRTEValue.childNodes[itr];
                        columnInfo.appendChild(childNode);
                        itr--;
                    }
                  //iFH as an attribute on cell to verify that the cell value is proper XHTML
                    columnInfo.setAttribute("iFH", "true");
            }
            }catch(e){
             setMxLinkText(columnInfo, value);
        }

        } else if(aDisplayRows[i].getAttribute("calc")!='true'){
            var aMassUpdateColumn = aMassUpdate[aDisplayRows[i].getAttribute("id")];
            if (!aMassUpdateColumn) {
                aMassUpdateColumn = new Array();
                aMassUpdate[aDisplayRows[i].getAttribute("id")] = aMassUpdateColumn;
            }
            aMassUpdateColumn[colIndex] = sNewValue;
        }
        //Added for BUG :346345,346344,346342
        var status = aDisplayRows[i].getAttribute("status");
        if(status == "add"){
            aDisplayRows[i].setAttribute("status","add");
        }else if(status == "new" || status == "lookup") {
            //do nothing
        }
        else if(aDisplayRows[i].getAttribute("calc")!='true'){
            aDisplayRows[i].setAttribute("status","changed");
        }

        if(aDisplayRows[i].getAttribute("calc")!='true')
        {
           updatePostXML(aDisplayRows[i], actualVal, colIndex);
        }

        var onChangeHandler = theColumn.getSetting("On Change Handler");
        if(onChangeHandler && onChangeHandler.length > 0)
        {
            reloadCellType.push({Type :"onChange",Target :theColumn.name});
            var aTemp = onChangeHandler.split(":");
            var rowId = aDisplayRows[i].getAttribute("id");
            for(var k=0; k < aTemp.length; k++){
                var  tempVal = escapeValueForEval(sNewValue);
               eval(aTemp[k]+"('" +tempVal+ "','"+ rowId +"','"+ theColumn.name + "')");
            }
            reloadCellType.pop();
        }
    }
    callToBuildColumValues(theColumn.name);
    //synchTreeandTable();
    RefreshView();
    rebuildView();
    turnOffProgress();
}

function isReadonly(node)
{
    var arr = readonlyArray;
    var readonly = "false";
    for(var k = 0; k < arr.length; k++)
    {
        var temp = arr[k].split("|");
        if((temp[0] == node.parentNode.getAttribute("o")) && (temp[1] == node.parentNode.getAttribute("r"))) {
            if(temp[2].toLowerCase() == "readonly") {
                readonly = "true";
            }
        }
    }
    return readonly;
}

/**
 * removes attribute from editableTable.xmlData
 */
function removeAttribute(attr,strNode){
    var xpath = "//" + strNode +"[@" + attr + "]";
    var aNodes = emxUICore.selectNodes(oXML, xpath);
    for (var i = 0; i < aNodes.length; i++) {
        var node = aNodes[i];
        node.removeAttribute(attr);
    }
}
/*** TO BE REMOVED ***/
/**
 * updates applet.xmlData
 * objVal can be a string or object
 * example
 * objVal.displayValue = val
 * objVal.actualValue = hiddenVal
 * objVal.attributeName = "msValue"
 */
function updateXMLData(objElm,objOldVal,objVal, mxLinkOldValue, displayLinkValue, isEdited) {
    // update undo xml
    //get the column index
    var rowId = objElm.parentNode.getAttribute("id");
    var selectedColumn  = null;
    var objColumn       = null;
    var columnIndex       = null;
    var rowNumber = currentCell.target.getAttribute("rowNumber");
//    var diffMergedCell = 0;
//    if(hasMergedCells){
//        diffMergedCell = 2;
//        if(rowNumber == 2){
//            diffMergedCell = 1;
//        }
//    }else{
//        diffMergedCell = 1;
//  }
    var diffMergedCell = hasMergedCells && rowNumber == 1 ? 1 : 0;

    var theadLen = editableTable.tblListHead.rows.length-diffMergedCell;
    if(objElm.parentNode.parentNode.parentNode.id == "bodyTable"){
        selectedColumn = editableTable.tblListHead.rows[theadLen-1].cells[objElm.cellIndex * 2];
    }else{
        selectedColumn = editableTable.tblTreeHead.rows[theadLen-1].cells[objElm.cellIndex * 2];
    }
    if(selectedColumn.id.length > 0){
        objColumn = colMap.getColumnByName(selectedColumn.id);
        columnIndex = objColumn.index;
    }
    if(!arrUndoRows[rowId]) {
        arrUndoRows[rowId] = new Object();
    }
    if(!arrUndoRows[rowId][columnIndex-1] && arrUndoRows[rowId][columnIndex-1]!="") {
        var oldDispVal = objOldVal;
        if(mxLinkOldValue != "" && mxLinkOldValue) {
            objOldVal = "<mxRoot>" + mxLinkOldValue + objOldVal + "</mxRoot>";
        }
        arrUndoRows[rowId][columnIndex-1] = objOldVal;
        objOldVal = oldDispVal;
    }
    //check obj for value(s)
    var val = null;
    var actualVal = null;
    var attName = null;
    var date = null;
    switch(typeof objVal){
        case "string":
        val = objVal;
        break;
        case "object":
        val = objVal.displayValue;
        actualVal = objVal.actualValue;
        date = objVal.date;
        attName = objVal.attributeName;
        break;
        default:
        val = "";
    }
    //fetch oid relid
    var oid = objElm.parentNode.getAttribute("o");
    var relId = objElm.parentNode.getAttribute("r");
    var rowId = objElm.parentNode.getAttribute("id");
    //get the "Input Type" from the xsl generated colMap object
    var selectedColumn  = null;
    var objColumn       = null;
    var columnIndex       = null;
    var theadLen = editableTable.tblListHead.rows.length-diffMergedCell;
    if(objElm.parentNode.parentNode.parentNode.id == "bodyTable"){
        selectedColumn = editableTable.tblListHead.rows[theadLen-1].cells[objElm.cellIndex * 2];
    }else{
        selectedColumn = editableTable.tblTreeHead.rows[theadLen-1].cells[objElm.cellIndex * 2];
    }
    if(selectedColumn.id.length > 0){
        objColumn = colMap.getColumnByName(selectedColumn.id);
        columnIndex = objColumn.index;
    }
    //get a nodeList and change the value
    //build xpath
    if (relId == null)
    {
        relId = "";
    }
    // changed the XPath expression
    var xpath = "//r[@id='"+rowId+"'][@o='"+ oid +
                        "'][not(@r!='" + relId +
                        "')]/c[" + (columnIndex) +"]";
    //mark it as edited
    var nColumn = emxUICore.selectSingleNode(oXML, xpath);
    nColumn.setAttribute("edited", "true");

    var status = nColumn.parentNode.getAttribute("status");
    if(status =="add") {
        nColumn.parentNode.setAttribute("status","add");
        nColumn.setAttribute("editedAfterAdd", "true");
    }
    else if(status == "new" || status == "lookup" ) {
        //dont do anything
    }else {
        nColumn.parentNode.setAttribute("status","changed");
    }
    try{
    var objDOM = emxUICore.createXMLDOM();
        if(isIE && ("true" == nColumn.getAttribute("rte"))){
            objDOM.preserveWhiteSpace = true;
        }
    if(isDynamicURLValue(displayLinkValue)) {
        displayLinkValue = displayLinkValue.replace(/&/g, "&amp;");
        objDOM.loadXML("<mxRoot><mxLink>" + displayLinkValue + "</mxLink></mxRoot>");
        setMxLinkText(nColumn, "");
        var mxLinkValue = emxUICore.selectSingleNode(objDOM, "/mxRoot/mxLink");
        nColumn.appendChild(mxLinkValue);
        var objDOMnew = emxUICore.createXMLDOM();
        var objNewText = objDOMnew.createTextNode(val);
        nColumn.appendChild(objNewText);
        nColumn.removeAttribute("iFH");
    }else {
        for(var itr=0; itr<nColumn.childNodes.length; itr++) {
            var childNode = nColumn.childNodes[itr];
            nColumn.removeChild(childNode);
            itr--;
        }
      //if val is a valid xml node isert it otherwise create text node
        if(val.indexOf("</") == -1 && val.indexOf("/>") == -1){
            throw "Not Formatted HTML";
        }
            var rteVal = emxUIRTE.get_rte_data(val, getColumn().name);
            objDOM.loadXML("<span>"+rteVal+"</span>");
            var emxRTEValue = emxUICore.selectSingleNode(objDOM, "/span");
            for(var itr=0; itr<emxRTEValue.childNodes.length; itr++) {
                var childNode = emxRTEValue.childNodes[itr];
                nColumn.appendChild(childNode);
                itr--;
            }
          //iFH as an attribute on cell to verify that the cell value is proper XHTML
            nColumn.setAttribute("iFH", "true");
        }
    }catch(e){
        nColumn.removeAttribute("iFH");
        emxUICore.setText(nColumn, val);

    }
    //applet.setNodeValue(xpath, val);
    //applet.setAttributeValue(xpath, "edited", "true")
    if(attName != null){
        //applet.setAttributeValue(xpath, attName, actualVal);
        //367300
        attName = attName == "msValue" ? "msValueNew" : attName;
        nColumn.setAttribute(attName, actualVal);
        if(nColumn.getAttribute("d")==null)
        nColumn.setAttribute("d", objOldVal);
    }else{
        if(nColumn.getAttribute("d")==null ){
            if(objOldVal == null)  objOldVal ="";
            nColumn.setAttribute("d", objOldVal);
        }
    }

    if(date && date != null){
        nColumn.setAttribute("date", date);
    }
    if(!isEdited)
    callToBuildColumValues(objColumn.name);
}

function callToBuildColumValues(colName,tempBool,needRebuildView){
    try{
    if(calRowsPresent == "true"){
        if(colName && colName == "firstTime" && tempBool){
            for(var k=0;k<colMap.columns.length;k++){
                var hasArithExpr = colMap.columns[k].getSetting("Arithmetic Expression") != null;
                var hasCalcExpr = colMap.columns[k].getSetting("Calculation Expression") != null;
                if((colMap.columns[k].getSetting("Data Type")=="numeric") && (hasArithExpr || hasCalcExpr)){
                    aGetAllArthimeticExpOnColumns.push(colMap.columns[k].getSetting("Arithmetic Expression"));
                    aGetAllArthimeticExpOnColumns.push(colMap.columns[k].getSetting("Calculation Expression"));
                }
            }
            var aAllrows =  emxUICore.selectNodes(oXML,"/mxRoot/rows//r");
            fillupColumns(aAllrows,0,aAllrows.length);
            buildNumericColumValues();
            if(needRebuildView){
                rebuildView();
            }
        }else if(colName == "resetEdits"){
            parseArithmethicExpr();
        }else if(colName == "add"){
            buildNumericColumValues();
        }else{
            var boolTemp = false;
                var aCalRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@calc='true']");
                if(aCalRows.length > 0){
                    boolTemp = true;
                }
                if(!boolTemp){
               for(var ik=0;ik<aGetAllArthimeticExpOnColumns.length;ik++){
               //kyq added aGetAllArthimeticExpOnColumns[ik]
                   if(aGetAllArthimeticExpOnColumns[ik] && aGetAllArthimeticExpOnColumns[ik].indexOf(colName)!= -1){
                       boolTemp = true;
                       break;
                   }
               }
               }

               if(boolTemp){
                parseArithmethicExpr();
            }
        }
    }
    }catch(e){
    }
}
//End: MASS UPDATE
/**
 * export to excell
 * overrides common exportData method
 */
function fpExportData(){
    turnOnProgress();
    setTimeout(function(){fpExportData2()},25);
}
var saveAs = saveAs || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		}
		, is_safari = /constructor/i.test(view.HTMLElement)
		, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		, arbitrary_revoke_timeout = 1000 * 40 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, auto_bom = function(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
			}
			return blob;
		}
		, FileSaver = function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, force = type === force_saveable_type
				, object_url
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
						// Safari doesn't allow downloading of blob urls
						var reader = new FileReader();
						reader.onloadend = function() {
							var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
							var popup = view.open(url, '_blank');
							if(!popup) view.location.href = url;
							url=undefined; // release reference before dispatching
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					// don't create more object URLs than needed
					if (!object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (force) {
						view.location.href = object_url;
					} else {
						var opened = view.open(object_url, "_blank");
						if (!opened) {
							// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
							view.location.href = object_url;
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
			;
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function() {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		}
	;
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function(blob, name, no_auto_bom) {
			name = name || blob.name || "download";

			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name);
		};
	}

	FS_proto.abort = function(){};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
function fpExportData2(){
    var rowGrouping = emxUICore.selectNodes(oXML,"/mxRoot/setting[@name='groupLevel']");
    var bGroupingRows = false;
    if(rowGrouping && rowGrouping.length >0){
        bGroupingRows = true;
    }
    if(isDataModified() || isSynchDataModified()){
        alert(emxUIConstants.STR_SBEDIT_SAVE_THE_CHANGES);
        return;
    }
    outputFormat = "CSV";
    var winName = "listHidden";
    if(isStructureCompare){
        outputFormat = "HTML";
    }else{
        outputFormat = getExportFormat();
      }

    var lXML = oXML;
    if(outputFormat != "CSV"){
        if(isStructureCompare != "TRUE" && !bGroupingRows){
            lXML = RefreshExportRows(outputFormat);
        }
        var aRowNodes = emxUICore.selectNodes(lXML, "/mxRoot/rows//r");
        fillupColumns(aRowNodes, 0, aRowNodes.length);
        var aCalRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@calc='true']");
        var aRowsNode = emxUICore.selectSingleNode(lXML, "/mxRoot/rows");
        for(var ic = 0; ic < aCalRows.length; ic++){
            aRowsNode.appendChild(aCalRows[ic]);
        }
        var isCellsMerged = emxUICore.selectSingleNode(lXML,"//requestMap/setting[@name='HasMergedCell']/value/text()");
        if (isCellsMerged && isCellsMerged.nodeValue == "true") {
            var exportRows = emxUICore.selectSingleNode(lXML,"//setting[@name='exportToExcelRows']");
            if(exportRows == null){
                configureMergedCellsToExport();
                lXML = oXML;
            }
        }
        var XSLT = "emxFreezePaneCSV.xsl";
        if (outputFormat == "HTML"){
            XSLT = "emxFreezePaneExcelHTML.xsl";
        }
        if(isStructureCompare){
            XSLT = "emxFreezePaneStructureCompareExcelHTML.xsl";
        }
        var strCSV = null;
        var XSLT_DOM = emxUICore.getXMLData(XSLT);
            strCSV = emxUICore.transformToText(lXML,XSLT_DOM);
        document.emxTableForm.csvData.value = strCSV;
        if (outputFormat == "HTML"){
            if(isIE){
                winName = "_blank";
            }
		var headerStr =  emxUICore.selectNodes(oXML,"/mxRoot/tableControlMap/setting[@name='PageHeader']/text()")[0];
		var blob = new Blob([strCSV]);
        saveAs(blob, emxUICore.getText(headerStr)+Date.now()+".html");
        return;
        }
    } else{
        var groupData = new Array() ;
        var groupRowIndex = new Array() ;
        var tempRowIds = new Array() ;
        var aDisplayRows = getDisplayRows();
        var localeSeperators = getLocaleSeperators();
        for(var i=0;i<aDisplayRows.length;i++){
            var id = aDisplayRows[i].getAttribute("id");
            //Since we are not supporting export of grouped data for now, we are not sending Grouped Id's to the server.
            //And hence adding the below condition.
            if((id.indexOf('L') == -1) && (id.indexOf('cal') == -1)){
            tempRowIds.push(id);
            }
            if((id.indexOf('L') != -1)){

            	var colText = "";
            	for(var j=0; j<colMap.columns.length; j++) {

            		var cellText = "";
            		if(j!=0){
            			var calcSetting = colMap.columns[j].getSetting("RowGroupCalculation");

            			if(calcSetting != null){
            				var tempChildRowCellInfo = emxEditableTable.getCellValueByRowId(id, colMap.columns[j].name);
            				var text = tempChildRowCellInfo.value.current.display;
            				if(text==" " || text==""){
            					cellText = "0x08";
            				}else{
            					cellText = text;
            				}
            			}else{
            				cellText = "0x08";
            			}
            		}else{

            			var tempChildRowCellInfo = emxEditableTable.getCellValueByRowId(id, colMap.columns[j].name);
            			var text = tempChildRowCellInfo.value.current.display;

            			if(text==" " || text==""){
            				cellText = "0x08";
            			}else{
            				cellText = text;
            			}

            		}
            		if(colText!=""){
            			colText = colText+"_"+cellText;
            		}else{
            			colText = cellText+"("+aDisplayRows[i].getAttribute('count')+")";
            		}

            	}

            	if(localeSeperators==',')
            		colText = colText.replace(new RegExp(localeSeperators[0], 'g'), ".");
            	else
            		colText = colText.replace(new RegExp(",", 'g'), "");
            	groupData.push(colText);
            	groupData.push(aDisplayRows[i].getAttribute('count'));
            	groupRowIndex.push(i);

            	/*if(isIE){
                    if(aDisplayRows[i].firstChild.text==" " || aDisplayRows[i].firstChild.text==""){
                        groupData.push("0x08");
                    }else{
                        groupData.push(aDisplayRows[i].firstChild.text);
                    }
                }else{
                    if(aDisplayRows[i].firstChild.textContent==" " || aDisplayRows[i].firstChild.textContent==""){
                        groupData.push("0x08");
                    }else{
                        groupData.push(aDisplayRows[i].firstChild.textContent);
                    }
                }
                groupData.push(aDisplayRows[i].getAttribute('count'));
                groupRowIndex.push(i);*/
            }
        }
        var rowIds = tempRowIds.join("|");
        document.emxTableForm.rowIds.value = rowIds;
        document.emxTableForm.bGroupingRows.value = bGroupingRows;
        if(bGroupingRows){
            document.emxTableForm.groupData.value = groupData;
            document.emxTableForm.groupRowIndex.value = groupRowIndex;
        }
    }
    var subHeader = getRequestSetting('subHeader');
    var strURL = "emxFreezePaneExport.jsp?exportFormat=" + outputFormat + "&subHeader=" + subHeader+ "&sbMode="+editableTable.mode;
    if(fullTextSearchObj && fullTextSearchObj.selectedSearch!=null){
		strURL +="&selectedSaveSearch="+fullTextSearchObj.selectedSearch;
	}
	document.emxTableForm.target = winName;
    document.emxTableForm.action = strURL;
    document.emxTableForm.method = "post";
    document.emxTableForm.submit();
    outputFormat = null;
    turnOffProgress();
}

/*
 * sets Tab settings to display Merged cells
 */
function configureMergedCellsToExport(){
    var len = colMap.columns.length;
    var exportToCSV = oXML.createElement("setting");
    exportToCSV.setAttribute("name", "exportToExcelRows");
    oXML.documentElement.appendChild(exportToCSV);
    var row1 = oXML.createElement("exportRow");
    exportToCSV.appendChild(row1);
    var row2 = oXML.createElement("exportRow");
    exportToCSV.appendChild(row2);
    for(var expI = 0; expI < len; expI++){
        var rowNumber = colMap.columns[expI].getSetting("Row Number");
        var rowSpan = colMap.columns[expI].getSetting("Row Span");
        var colSpan = colMap.columns[expI].getSetting("Column Span");
        var blankCell = colMap.columns[expI].getSetting("BlankCell");
        var isExport = colMap.columns[expI].getSetting("Export");
        var cellR1 = oXML.createElement("cell");
        //row1.appendChild(cellR1);
        var cellR2 = oXML.createElement("cell");
        //row2.appendChild(cellR2);
        if(isExport != 'false'){
            if(rowNumber == 1){
                if(typeof colSpan != "undefined" && colSpan > 1){
                        var limit = (colSpan - 1)/2;
                        for(var index=0; index<limit; index++) {
                        var cell =  oXML.createElement("cell");
                        emxUICore.setText(cell,"BlankCell");
                        row1.appendChild(cell);
                        }
                }else{
                    emxUICore.setText(cellR1,expI + 1);
                    if(rowSpan ==2 || blankCell == 'true'){
                       emxUICore.setText(cellR2,"BlankCell");
                       row2.appendChild(cellR2);
                    }
                }
                row1.appendChild(cellR1);
                row2.appendChild(cellR2);
            }
            if(rowNumber == 2){
                emxUICore.setText(cellR2,expI + 1);
                row2.appendChild(cellR2);
                if(typeof colSpan != "undefined" && colSpan > 1){
                    var limit = (colSpan - 1)/2;
                    for(var index=0; index<limit; index++) {
                        var cell =  oXML.createElement("cell");
                        emxUICore.setText(cell,"BlankCell");
                        row2.appendChild(cell);

                    }
                }
            }
        }
    }
    for(var k=0; k<row1.childNodes.length; k++) {
        if(row1.childNodes[k].childNodes.length == 0){
            row1.removeChild(row1.childNodes[k]);
            k--;
        }
    }

    for(var k=0; k<row2.childNodes.length; k++) {
        if(row2.childNodes[k].childNodes.length == 0){
            row2.removeChild(row2.childNodes[k]);
            k--;
        }
    }
}
/**
 * get export format
 * csv,Text,HTML Preferences
 */
function getExportFormat(){
    var oXml = emxUICore.getXMLData("emxFreezePaneGetExportFormat.jsp");
    var rootNode = oXml;
    //check for error or notice
    var formatXpath = "format/text()";
    var node = emxUICore.selectSingleNode(rootNode,formatXpath);
    if(node != null){
        return node.nodeValue
    }else{
        return "";
    }
}

function fillupColumns(aRowNodes, nStart, nEnd, formatMode)
{
	var displayRowIds = "";
	var rowsWithNoColumns = new Array();
	var nIndex = 0;
	var diffCode = "";
	var ids = [];
	for (var i = nStart;  i < nEnd && i < aRowNodes.length; i++) {
		var displayColumns = emxUICore.selectNodes(aRowNodes[i], "c");
		if(calRowsPresent == "true"){
			var level = aRowNodes[i].getAttribute("level");
			if(LEAF < parseInt(level)){
				LEAF = parseInt(level);
			}
		}
		// If user selects PF icon, the column data need to be removed from XML
		if ( formatMode && formatMode != "HTML" && displayColumns.length > 0)
		{
			for (var itr = 0; itr < displayColumns.length; itr++){
				displayColumns[itr].parentNode.removeChild(displayColumns[itr]);
			}
			displayColumns = emxUICore.selectNodes(aRowNodes[i], "c");
		}

		if(displayColumns.length == 0) {
			ids.push( aRowNodes[i].getAttribute("id"));
			rowsWithNoColumns[nIndex] = aRowNodes[i];
			nIndex++;
		}
	}
	
	if (ids.length > 0) {
		displayRowIds = ids.join(":");
		var sUrlParam = "fpTimeStamp=" + timeStamp + "&rowIds=" + displayRowIds;
		if (outputFormat) {
			sUrlParam += "&outputFormat=" + outputFormat;
		}
		sUrlParam +="&IsStructureCompare=" + isStructureCompare;

		var oRowsXML = emxUICore.getXMLDataPost("../common/emxFreezePaneGetData.jsp", sUrlParam);

//		PreFetch( nEnd );  // start or re-start the prefetching process

		var oRows = oRowsXML.documentElement.childNodes[0];
		//Added for Structure Compare with SYNC
		//var isStructureCompare = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='IsStructureCompare']/text()");
		var isReport = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='reportType']/text()");

		for(var i = 0; i < oRows.childNodes.length && i < rowsWithNoColumns.length; i++) {
			var aColumnNodes = oRows.childNodes[i].childNodes;
			var updateRow = true;
			var diffCommon = false;

			for(var j = 0; j < oRows.childNodes[i].childNodes.length; j++) {
				var nNewColumn = oRows.childNodes[i].childNodes[j].cloneNode(true);

				//Added for Structure Compare with SYNC

				if ( isStructureCompare && isReport )
				{
					if ( isReport.nodeValue == "Difference_Only_Report" )
					{
						if (rowsWithNoColumns[i].getAttribute("matchresult") != null && rowsWithNoColumns[i].getAttribute("matchresult") == "common")
						{
							diffCommon = true;
							if ( nNewColumn.getAttribute("compareResult") != null && nNewColumn.getAttribute("compareResult") == "different"  )
							{
								updateRow = false;
							}
						}
					}
				}
				//END for Structure Compare with SYNC
				rowsWithNoColumns[i].appendChild(nNewColumn);

			}
			//Added for Structure Compare with SYNC
			if ( isStructureCompare && isReport ){

				if ( isReport.nodeValue == "Complete_Summary_Report" ){

					var diffCode = oRows.childNodes[i].getAttribute("diffcode");
					var disableFlag = oRows.childNodes[i].getAttribute("disableSelection");
					var matchresult = oRows.childNodes[i].getAttribute("matchresult");

					if(diffCode == null){
						diffCode = "";
					}

					if(disableFlag == null){
						disableFlag = "";
					}

					if(matchresult == null){
						matchresult = "";
					}

					rowsWithNoColumns[i].setAttribute("diffcode",diffCode);
					rowsWithNoColumns[i].setAttribute("matchresult",matchresult);
					rowsWithNoColumns[i].setAttribute("disableSelection", disableFlag);
				}
			}

			if(diffCommon ){
				if (updateRow){
					rowsWithNoColumns[i].setAttribute("displayRow","false");
					rowsWithNoColumns[i].setAttribute("disableSelection", "true");
				}
			}
			//END for Structure Compare with SYNC
		}
	}
	//ElapsedTimer.exit('fillupColumns: ' + ids.length);
	return ids.length;
}

function splitImg(canvas, tileWidth, tileHeight) {
    var ctx = canvas.getContext("2d");
    var imageWidth = canvas.width;
    var imageHeight = canvas.height;
    var tilesX = imageWidth / tileWidth;
    var tilesY = imageHeight / tileHeight;
    var nCol = Math.ceil( tilesX );
    var nRow = Math.ceil( tilesY );
    var totalTiles = tilesX * tilesY;
    var tiles = [];
    for(var i=0; i<nRow; i++) {
        tiles[i] = [];
        for(var j=0; j<nCol; j++) {
            tiles[i][j] = ctx.getImageData(j*tileWidth, i*tileHeight, tileWidth, tileHeight);
        }
    }
    return tiles;
}

function svgToCanvas(svgXml, readyCallback){ // readyCallback(svgCanvas)
    if(isIE){
        // Use canvg lib
        var svgCanvs = document.createElement('canvas');
        canvg(svgCanvs, svgXml, { renderCallback: function (dom) { // Firefox will show wrong svg position if use canvg lib
            readyCallback(svgCanvs);
        }});
    }
    else{
        // Use image approach
        var img = new Image(); // IE will have security error when calling ctx.getImageData on canvas containing this image
        img.src = 'data:image/svg+xml;base64,'+ btoa(svgXml);
        img.onload = function(){
            readyCallback(img);
        }
    }
}

function treeToImages(widthPx, heightPx, ready){
    var treeDiv = document.getElementById('mx_divTreeGraphBody');
    var divToPrint = window.controller.tree.el.el.cloneNode(true);
    divToPrint.id = 'mx_divTreeGraphBody';
    divToPrint.className = treeDiv.className;
    var div = document.createElement('div');
    div.appendChild(divToPrint);
    div.style.position = 'absolute';
    div.style.top = window.outerHeight + 'px';
    document.body.insertBefore(div, document.body.childNodes[0]);

    // Fix html2canvas svg style problem on chrome.
    var svgElemArr = divToPrint.getElementsByTagName('svg');
    var svgNode = svgElemArr[0];
    svgNode.setAttribute('stroke', 'black');
    svgNode.setAttribute('stroke-width', '0'); // hide svg when using html2canvs because html2canvs on Chrome can work with svg but IE cannot
    svgNode.setAttribute('fill', 'none');
    svgNode.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    html2canvas(divToPrint, {
		        useCORS: true,
        onrendered: function (canvas) {
            divToPrint.parentElement.removeChild(divToPrint);
            svgNode.setAttribute('stroke-width', '2');
            var svgXml = new XMLSerializer().serializeToString(svgNode);
            svgXml = svgXml.replace('<svg xmlns="http://www.w3.org/2000/svg"','<svg '); // remove duplicated xmlns
            svgToCanvas(svgXml, function(svgCanvas){
                var mergedCanvas = document.createElement('canvas');
                mergedCanvas.width = canvas.width;
                mergedCanvas.height = canvas.height;
                var mergedCanvasContext = mergedCanvas.getContext("2d");
                mergedCanvasContext.drawImage(svgCanvas, 0, 0);
                mergedCanvasContext.drawImage(canvas, 0, 0);
                var images = splitImg(mergedCanvas, widthPx, heightPx);
                ready(images);
            });
        }
    });
}

function openPrinterFriendlyPageForTree(){
    var tileWidth = 707; // Print width in px, good on A4
    var tileHeight = 1000; // Print height in px, good on A4
    treeToImages(tileWidth, tileHeight, function ready(tiles){
        var nRow = tiles.length;
        var nCol = tiles[0].length;
        var html = '<!DOCTYPE html><html><head><title>' + document.title + '</title>';
        html += '<style type="text/css" media="print">.no-print{display: none;}</style>';
        html += '<style type="text/css" media="screen">.print{display: none;}</style></head><body>';

        // Add no-print elements
        html += '<div class="no-print"><table style="border-spacing: 10px">';
        var canvas = document.createElement('canvas');
        canvas.width = tileWidth;
        canvas.height = tileHeight;
        var ctx = canvas.getContext("2d");
        for (var iRow=0; iRow<nRow; iRow++){
            html += '<tr>';
            for (var iCol=0; iCol<nCol; iCol++){
                ctx.putImageData(tiles[iRow][iCol], 0, 0);
                var imgUrl = canvas.toDataURL("image/png");
                html += '<td>';
                html += '<img style="border-width:1px;border-style:dashed;" src="' + imgUrl + '"><div style="page_break_before:always"/>';
                html += '</td>';
            }
            html += '</tr>';
        }
        html += '</table></div>';

        // Add print elements
        html += '<div class="print">';
        for (var iRow=0; iRow<nRow; iRow++){
            for (var iCol=0; iCol<nCol; iCol++){
                ctx.putImageData(tiles[iRow][iCol], 0, 0);
                var imgUrl = canvas.toDataURL("image/png");
                html += '<img src="' + imgUrl + '"><div style="page_break_before:always"/>';
            }
        }
        html += '</div></body></html>';
        openHtmlWindow(html);
    });
}

/**
 * overrides printerfriendly method
 */
function fpOpenPrinterFriendlyPage(){
	if(fullTextSearchObj && fullTextSearchObj.selectedSearch!=null && fullTextSearchObj.selectedSearch != undefined){
		var aRowNodesPageTitle = emxUICore.selectSingleNode(oXML, "/mxRoot/tableControlMap/setting[@name='pagetitle_string']");
		var savedQueryText = emxUICore.getText(aRowNodesPageTitle);
		savedQueryText=savedQueryText.replace("<PAGETITLE>",fullTextSearchObj.selectedSearch);
		var aPageHeader=emxUICore.selectSingleNode(oXML, "/mxRoot/tableControlMap/setting[@name='PageHeader']");
		emxUICore.setText(aPageHeader,savedQueryText);
	}
    if (displayView === "tree"){
        openPrinterFriendlyPageForTree();
        return;
    }

    //refreshRows();
    /*if(isDataModified()){
        alert(emxUIConstants.STR_SBEDIT_SAVE_THE_CHANGES);
        return;
    }*/
    var aRowNodes = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[not(@calc) and not(@rg)]");
    outputFormat = "HTML";
    // added for structure compare
    if(isStructureCompare != "TRUE" && calRowsPresent != "true"){
        fillupColumns(aRowNodes, 0, aRowNodes.length, outputFormat);
    }
    //outputFormat = null;
    var XSLT = "emxFreezePanePrinterFriendly.xsl";
    var XSLT_DOM = emxUICore.getXMLData(XSLT);
    var strHTML = emxUICore.transformToText(oXML,XSLT_DOM);
    openHtmlWindow(strHTML);
}

function openHtmlWindow(strHTML){
    strHTML = "<!DOCTYPE html>" + strHTML;
    var strFeatures = "scrollbars=yes,toolbar=yes,location=no,resizable=yes";
    var win = window.open('emxBlank.jsp', '_blank',strFeatures);
    win.document.open('text/html', '_blank');
    win.document.write(strHTML);
    win.document.close();
    var isMoz = Browser.MOZILLA_FAMILY;
    if(isMoz){
        win.document.oncontextmenu = function(){return false};
    }else{
        win.document.location.reload();
    }
    return win;
}
function validateOnApply(){
    //get Validators
    var arrValidator = getValidators();
    var len = arrValidator.length;
    if(len > 0){
        //store any error msg
        var msg = "";
        //loop through the validators
        //375750- LG Copy From
        var arrMkupParentRowIds = [];
        var arrMarkupParentRows = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[child::r[@status]]");
        for(var itr = 0; itr < arrMarkupParentRows.length; itr ++){
            arrMkupParentRowIds.push(arrMarkupParentRows[itr].getAttribute("id"));
        }
        for(var i = 0; i < len; i++){
            //loop through edited rows on validators index
            var index = arrValidator[i].getColumnIndex()+1;
            //375750- LG Copy From
            currentColumnPosition = index;
            //if(isIE){index--};
            //get the validator
            var theValidator = arrValidator[i].getColumnFunction();
            //build xpath
            var xpath = "//c["+ index +"][@edited = 'true']";
            //got root?
            var root = oXML;
            // get nodeList
            var nodeList = emxUICore.selectNodes(root,xpath);
            //apply validators
            var nodeListLen = nodeList.length;
            if(nodeListLen > 0){
                //375750- LG Copy From
                //dont call validate if ValidateAll=true
                var objColumn = colMap.getColumnByIndex(index - 1);
                var strValidateAll = objColumn.getSetting("ValidateAll");
                if(strValidateAll != null && strValidateAll == "true"){
                    //apply the validator
                    msg += eval(theValidator + "('" +arrMkupParentRowIds.join(":")+ "')");
                    //Added For IR-021267V6R2011
               if(msg.length > 0){
                break;
                    }
                    continue;
                }
                //375750- LG Copy From

                //loop through the nodelist
                for(var j = 0; j < nodeListLen; j++){
                    //set currentCell
                    //currentCell.target = nodeList[j];
                    //currentCell.target.setAttribute("position",index);
                    var cellVal = "";
                    var rowid = getId(nodeList[j].parentNode);
                    if(nodeList[j].lastChild){
                        cellVal = nodeList[j].lastChild.nodeValue;
                    }else{
                        cellVal = nodeList[j].nodeValue;
                    }
                    //apply the validator
                    var tempCellVal = escapeValueForEval(cellVal);
                    msg += eval(theValidator + "('" +tempCellVal+ "','"+ rowid +"')");
                }
            }
        }
        if(msg.length > 0){
            alert(msg);
            return false;
        }
    }
    return true;
}
function getValidators(){
    //create an array of validators and return them
    var validatorArray = new Array();
    //loop through columns
    var len = colMap.columns.length;
    for(var i = 0; i < len; i++){
        //get validators
        var setting = colMap.columns[i].getSetting("ValidateOnApply");
        if(!!setting){
            //create a validator object
            var objValidator = new validator();
            objValidator.setColumnIndex(i);
            objValidator.setColumnName(colMap.columns[i].name);
            objValidator.setColumnFunction(setting);
            validatorArray[validatorArray.length] = objValidator;
        }
    }
    return validatorArray;
}
/*
 * Created on Jun 2, 2005
 * @author jwilliams
 *
 * represents a validator to be used on "Apply Edits"
 */
function validator() {
    var columnIndex;
    var columnName;
    var columnFunction;
}
    /**
     * @return Returns the columnIndex.
     */
    validator.prototype.getColumnIndex = function __getColumnIndex() {
        return this.columnIndex;
    }
    /**
     * @param columnIndex The columnIndex to set.
     */
    validator.prototype.setColumnIndex = function __setColumnIndex() {
        this.columnIndex = arguments[0];
    }
    /**
     * @return Returns the columnName.
     */
    validator.prototype.getColumnName = function __getColumnName() {
        return this.columnName;
    }
    /**
     * @param columnName The columnName to set.
     */
    validator.prototype.setColumnName = function __setColumnName() {
        this.columnName = arguments[0];
    }
    /**
     * @return Returns the function.
     */
    validator.prototype.getColumnFunction = function __getColumnFunction() {
        return this.columnFunction;
    }
    /**
     * @param function The function to set.
     */
    validator.prototype.setColumnFunction = function __setColumnFunction() {
        this.columnFunction = arguments[0];
    }
/**
 * Send an array of values for the current nodes
 * sibling nodes
 */
function getColumnDataAtLevel(){

    var level = currentRow.getAttribute("level");
    var xpath = "r";
    var aRowsAtLevel = null;
    if (level == "0") {
        aRowsAtLevel = emxUICore.selectNodes(oXML, "/mxRoot/rows/r");
    } else {
        aRowsAtLevel = emxUICore.selectNodes(currentRow.parentNode, "r");
    }

    fillupColumns(aRowsAtLevel, 0, aRowsAtLevel.length);

    var returnArray = new Array();
    for(var i=0;i < aRowsAtLevel.length; i++){
        var lastobj = emxUICore.selectSingleNode(aRowsAtLevel[i], "c[" + currentColumnPosition + "]").lastChild;
        if (lastobj) {
            returnArray[i] = lastobj.nodeValue;
        }
        else {
            returnArray[i] = "";
        }
    }
    return returnArray;
}
/**
 * Send an array of values for the current nodes
 * sibling nodes
 */
function getActualColumnDataAtLevel(){
    var level = currentRow.getAttribute("level");
    var xpath = "r";
    var aRowsAtLevel = null;
    if (level == "0") {
        aRowsAtLevel = emxUICore.selectNodes(oXML, "/mxRoot/rows/r");
    } else {
        aRowsAtLevel = emxUICore.selectNodes(currentRow.parentNode, "/r");
    }

    fillupColumns(aRowsAtLevel, 0, aRowsAtLevel.length);

    var colIndex = currentColumnPosition;
    if(isIE){colIndex--};

    var returnArray = new Array();
    for(var i=0;i < aRowsAtLevel.length; i++){
        returnArray[i] = emxUICore.selectSingleNode(aRowsAtLevel[i], "c[" + colIndex + "]").getAttribute("a");
    }
    return returnArray;
}
/**
 * Send an array of values for the current nodes
 * sibling nodes
 * added for bug 375750
 */
function getActualChildColumnData(parentRowId,colName){
    var xpath = "r";
    var aRowsAtLevel = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@id = " + parentRowId + "]/r");
    var colIndex = null;
    if(colName == null || colName == ""){
        colIndex = currentColumnPosition;
    }else{
        var objColumn = colMap.getColumnByName(colName);
        colIndex = objColumn.index;
    }
    var returnArray = new Array();
    for(var i=0;i < aRowsAtLevel.length; i++){
        returnArray[i] = emxUICore.selectSingleNode(aRowsAtLevel[i], "c[" + colIndex + "]").getAttribute("a");
    }
    return returnArray;
}
/**
 * retrieves the value for a given row
 * for a specified column
 */
function getActualValueForColumn(colName){
    var aRows = new Array();
    aRows[0] = currentRow;
    fillupColumns(aRows, 0, aRows.length);

    var objColumn = colMap.getColumnByName(colName);
    var colIndex = objColumn.index;

    return (emxUICore.selectSingleNode(currentRow, "c[" + colIndex + "]").getAttribute("a"));
}
/**
 * retrieves the value for a given row
 * for a specified column
 */
function getValueForColumn(colName, mxLink){
    var aRows = new Array();
    aRows[0] = currentRow;
    fillupColumns(aRows, 0, aRows.length);

    var objColumn = colMap.getColumnByName(colName);
    if(mxLink == "true") {
        var objDOM = emxUICore.createXMLDOM();
        objDOM.loadXML(emxUICore.selectSingleNode(currentRow, "c[" + objColumn.index + "]").xml);
        var cNode = emxUICore.selectSingleNode(objDOM, "/c/mxLink");
        if(cNode) {
            return cNode.xml;
        }else {
            return "";
        }
    }
    var colIndex = objColumn.index;
    var isEdited = emxUICore.selectSingleNode(currentRow, "c[" + colIndex + "]").getAttribute("edited") == "true"?true:false;
    //return nothing if the row is newly added and the cell is not edited
    //if(currentRow.getAttribute("status") == 'add' &&  !isEdited){
      //  return "";
   // }
    var lastobj = emxUICore.selectSingleNode(currentRow, "c[" + colIndex + "]");
    var retValue = "";
    if(lastobj.getAttribute('iFH') == "true"){
        for(var i=0; i < lastobj.childNodes.length; i++){
            retValue = retValue + lastobj.childNodes[i].xml;
        }
        retValue = retValue.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&");
    }else{
        retValue = emxUICore.getText(lastobj);
    }

    return (retValue);
}

//stop enter key
var keyPressedCode = -1;
var tabKeyCode = 9;
function kH(e) {
    var pK = document.all? window.event.keyCode:e.which;
    var objEvent = emxUICore.getEvent();
    var targetName = objEvent.target.tagName.toLowerCase();
    if (targetName == "textarea"){
        return true;
    }
    return pK != 13;
}
document.onkeypress = kH;
if (document.layers) document.captureEvents(Event.KEYPRESS);
// Cleanup the session level table bean

function cleanupFPSession(){
  console.log("cleanup fp session");

 if(persistGlobal != true){
    if(editableTable.mode == "edit" && ((cancelProcessURL && cancelProcessURL != "") || (cancelProcessJPO && cancelProcessJPO != ""))) {
        processHookIn("cancel");
    }

    parent.ids="";
    var url = "emxFreezePaneCleanupSession.jsp?fpTimeStamp=" + timeStamp;
    emxUICore.getData(url);
    //IE Memory leak Fix-Start
        //editableTable.attachOrDetachEventHandlers(false);
        editableTable.attachOrDetachEventHandlers(false,true);
        postDataXML = null;
        this.emxEditableTable.cleanEditableTable();
        this.emxEditableTable = null;
    //IE Memory leak Fix-end
    }



}


function parseHrefValue(href) {
    href = href.replace(new RegExp("&amp;", "g"), "&");
    return href;
}

// Modified for Consolidated Search
//Additional parameter added for PowerView Enhancements  i.e.,linkName is the display name for the link dated 22Aug07
function link(colNum,oid,relId,parentId,linkName){
    var theColumn = colMap.getColumnByIndex(colNum-1);
    var onClick = theColumn.getSetting("OnClick Function");
    if(onClick){
    	eval(onClick+"('"+colNum+"','"+oid+"','"+relId+"','"+parentId+"','"+linkName+"')");
    	return;
    }
    var columnType = theColumn.getSetting("Column Type");
    var href = theColumn.getAttribute("href");
    href = parseHrefValue(href);
    var suiteKey = theColumn.getSetting("Registered Suite");

    var winWidth = theColumn.getSetting("Window Width");
    var winHeight = theColumn.getSetting("Window Height");
    var modal = theColumn.getSetting("Popup Modal");
    var target = theColumn.getSetting("Target Location");
    if (columnType!=null && columnType!="undefined" && columnType.toLowerCase() == "image" && !href || href == "") {
        href = "../components/emxImageManager.jsp?HelpMarker=emxhelpimagesview";
        winWidth = "850";
        winHeight = "650";
        modal = "false";
        target = "popup";
    }

    // added for Consolidated Search
    var collection = href.match("AEFCollectionsMenu");

    var param = "";

    if(collection != null && collection != "undefined" && collection != "" && collection == "AEFCollectionsMenu" ){
        if(href.indexOf("treeLabel") > -1){
            var indexOfTreeLabel =  href.indexOf("treeLabel");
            var indexOfNextParam =  href.indexOf("&", indexOfTreeLabel+1);
            if(indexOfNextParam > -1){
                href = href.replace(href.substring(indexOfTreeLabel, indexOfNextParam), "");
            }else{
                href = href.replace(href.substring(indexOfTreeLabel-1), "");
            }
        }
      	linkName = getCollectionName(relId.trim());

        param = "&treeLabel="+linkName;
    }else{
        param = "&objectId="+oid;
    }

    // ended for Consolidated Search

    href += "&relId="+relId+
            "&parentOID="+parentId+
            "&suiteKey="+suiteKey+param+"&jsTreeID=" + jsTreeID;

    if (target === "content" && href.indexOf("emxTree.jsp") > -1) {
        var pUrl = href.replace("emxTree.jsp", "emxNavigator.jsp");
        if (pUrl.indexOf("fromIFWE") == -1) {
            pUrl += "&fromIFWE=true";
        }

        if(!getTopWindow().setUWAPref){
        	var topNavRef = getTopWindow().getWindowOpener().getTopWindow();
        	if (topNavRef){
        		var popCount = 0;
        		while (!topNavRef.setUWAPref){
        			if (popCount > 2){
        				break;
        			}
        			topNavRef = topNavRef.getWindowOpener().getTopWindow();
        			popCount++;
        		}
        		if (topNavRef.setUWAPref){
        			topNavRef.setUWAPref('DefaultLocation',pUrl);
        		}
        	}
          } else{
              getTopWindow().setUWAPref('DefaultLocation',pUrl);
          }
    }
    var indentedTableBln = 'true';
//Additional parameter added for PowerView Enhancements  i.e.,linkName and indentedTableBln dated 22Aug07
    emxTableColumnLinkClick(href,winWidth,winHeight,modal,target, '', linkName, indentedTableBln, '', theColumn.getSetting("Slidein Width"));
    if(href.indexOf("emxRefreshChannel.jsp") > -1){
        //374279
        rebuildView();
        //RefreshView();
    }
}
// Ended for Consolidated Search
function getCollectionName(relId){
	var rowInfo= emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@r='"+relId+ "']");
	var colIndex = colMap.getColumnByName("Name");
	if(rowInfo && colIndex && colIndex.index > 0){
		return isIE ? rowInfo.childNodes[colIndex.index-1].text: rowInfo.childNodes[colIndex.index-1].textContent;
	}else{
		return "";
	}
}
//create editableTable object
var editableTable = new emxEditableTable;
function form2query(form) {
    var qb = new Query();
    for (var i00; i<form.elements.length; i++) {
        var el = form.elements[i];
        qb.append(el.name, el.value);
    }
    return qb.toString().substr(1);
}
function setSubmitURLRequestCompleted() {
    SUBMIT_URL_PREV_REQ_IN_PROCESS = false;
}
function setSubmitURLRequestInProcess() {
    SUBMIT_URL_PREV_REQ_IN_PROCESS = true;
}
function callSubmitURL(url, bSynch){
    if(SUBMIT_URL_PREV_REQ_IN_PROCESS) {
        alert(emxUIConstants.STR_URL_SUBMITTED);
        return;
    }

    var selectedCount = addHiddenTableRowIds();
    if(fullTextSearchObj){
        var notSelected = true;
        if(fullTextSearchObj.getRememberSelection()) {
            var rowNodes = emxUICore.selectNodes(fullTextSearchObj.selRowsXML, "/mxRoot/r");
            if(rowNodes != null) {
                notSelected = false;
            }
        } else {
            notSelected = selectedCount == 0;
        }
        if(notSelected){
            alert(emxUIConstants.ERR_NONE_SELECTED);
            return;
        }
    }
    var callbackFunc = getRequestSetting('callbackFunction');
    if (callbackFunc != null && callbackFunc != "") {
        try {
            eval(callbackFunc + '()');
        } catch (e) {
            alert(emxUIConstants.STR_CALLBACK_ERR+call+" "+emxUIConstants.STR_CALLBACK_MSG);
        }
    } else if (url != null && url != "") {
        if (bSynch) {
            var qStr = form2query(document.emxTableForm);
            var htm = emxUICore.getDataPost(url, qStr);
            var listHidden = document.getElementById('listHidden');
            if (isIE) {
                listHidden.contentWindow.document.write(htm);
            } else {
                listHidden.contentDocument.write(htm);
    }
        } else {
        document.emxTableForm.method="post";
        document.emxTableForm.target="listHidden";
        document.emxTableForm.action=url;
        addSecureToken(document.emxTableForm);
        document.emxTableForm.submit();
        removeSecureToken(document.emxTableForm);
        setSubmitURLRequestInProcess(true);
    }
    } else {
        // now what?
    }
}
function getExpandFilterSelect(){
        var expandFilterObj = document.getElementById("emxExpandFilter");
        if(isIE){
            var overflowmenu = toolbars[0].items[toolbars[0].items.length-1];
            if(overflowmenu && overflowmenu.menu != null){
                for(var i=0; i<overflowmenu.menu.items.length; i++) {
                    if("emxExpandFilter" == overflowmenu.menu.items[i].fieldName){
                        expandFilterObj = overflowmenu.menu.items[i].rowElement.getElementsByTagName("select")[0];
                    }
                }
            }
        }
      return expandFilterObj;
}
/*
When multiple objects are selected in different pages of the structure browser, all the selected are not submitted to the server.
So a hidden div is placed in emxFreezePaneLayout.xsl. For each selection and unselection of checkbox the emxTableRowId is added and removed to the divPostData
All the request map values are also added as the hidden elements to the divPostData. This way all the request varaibles loaded in init method are
always available to the submitted pages
*/
function postDataStore(strVal, mode, strName)
{
    var hiddenEle = null;
    if (mode == "add")
    {
            if(strName) {
                hiddenEle = document.getElementById(strName);
            } else {
            hiddenEle = document.getElementById(strVal);
            }

            if (hiddenEle == null)
            {
                hiddenEle = document.createElement("input");
                hiddenEle.setAttribute("type","hidden");
                if(strName != null || strName != undefined){
                    hiddenEle.setAttribute("name", strName);
                    hiddenEle.setAttribute("id", strName);
                } else {
                    hiddenEle.setAttribute("name","emxTableRowId");
                hiddenEle.setAttribute("id", strVal);
                }
                hiddenEle.setAttribute("value", strVal);
                editableTable.mxDivPostData.appendChild(hiddenEle);
            }
            //Added for Structure Compare-Starts
            var aId = strVal.split("|");
            var relid = aId[0];
            var oid = aId[1];
            var pid = aId[2];
            var id = aId[3];
            arrObjectId.push(oid);
        //Added for Structure Compare
        //this.divPostData.appendChild(hiddenEle);
    }
    else if (mode == "remove")
    {
        hiddenEle = document.getElementById(strVal);
        if (hiddenEle)
        {
            editableTable.mxDivPostData.removeChild(hiddenEle);
            //divPostData.removeChild(hiddenEle);
        }
        //Added for Structure comapre with sync
        var aId = strVal.split("|");
        var relid = aId[0];
        var oid = aId[1];
        var pid = aId[2];
        var id = aId[3];
        var length = arrObjectId.length;
        for ( var i= 0; i < length ; i++)
        {
            if (oid == arrObjectId[i])
            {
                 arrObjectId.splice(i,1);
             }
        }
        //ended for Structure comapre with sync
    }


}

    function selectMoreLevel(obj)
    {
        applyCheck = false;
        //if (!obj) {
        //obj = getExpandFilterSelect();
        //}

        var levelValue = getExpandFilterSelect().value;
        if (currentFormfield || currentFloatingDiv)
        {
            removeCurrentFloatingDiv();
        }
        expandLevel = levelValue;
        if (levelValue == "Specify")
        {
           /* objFrame = document.createElement("IFRAME");
            objFrame.frameBorder = 0;
            objFrame.src = "javascript:;";
            document.body.appendChild(objFrame);*/

            var floatingDiv = document.createElement("div");
            floatingDiv.name = "floatingDiv";
            floatingDiv.className = "formLayer";
            document.forms[0].appendChild(floatingDiv);
            //Bug#377563. Commented the line.Source/reference of name is not defined in the function
            //document.forms[0].elements[name] = formfield;

            floatingDiv.style.visibility = "visible";
            var formfield  = getLevelField();
            floatingDiv.appendChild(formfield);

            floatingDiv.style.top = findPosY(obj) + 15 + "px";
            floatingDiv.style.left = findPosX(obj) + 25 + "px";

           /* objFrame.style.width = floatingDiv.offsetWidth;
            objFrame.style.height = floatingDiv.offsetHeight;
            objFrame.style.top = floatingDiv.style.top;
            objFrame.style.left = floatingDiv.style.left;
            objFrame.style.position = "absolute";
            objFrame.style.display = "none";*/

            currentFormfield = formfield;
            currentFloatingDiv = floatingDiv;
            window.focus();
            document.getElementById("txtLevelId").focus();
        }
         // removed the code for fixing the IR-177430V6R2013x[IR-168354V6R2013x Reg]
    }

    function findPosX(obj)
    {
        var curleft = 0;
        if (obj.offsetParent) {
            while (obj.offsetParent) {
                curleft += obj.offsetLeft
                obj = obj.offsetParent;
            }
        }
        else if (obj.x) {
            curleft += obj.x;
        }
        return curleft;
    }

    function findPosY(obj)
    {
        var curtop = 0;
        if (obj.offsetParent) {
            while (obj.offsetParent) {
                curtop += obj.offsetTop
                obj = obj.offsetParent;
            }
        }
        else if (obj.y) {
            curtop += obj.y;
        }
        return curtop;
    }

    function getLevelField(objTD,objColumn, value)
    {
        var textfield = document.createElement("input");
        textfield.setAttribute("type", "text");
        textfield.setAttribute("id", "txtLevelId");
        textfield.setAttribute("value", emxUIConstants.STR_MORELEVEL_ENTERVALUE);
        textfield.onfocus = function () { this.select();};
        textfield.onclick = function(){
            if(this.value == enterValueString){
                this.value = '';
            }
        };
        //Commented and modified for bug 345358
        //textfield.onkeypress = function () { enterKey(textfield.value,event)};
        textfield.onkeypress = function (e) { enterKey(textfield.value,e)};

        var doneButton = document.createElement("input");
        doneButton.value= emxUIConstants.STR_FPDONE;
        doneButton.type= "button";
        doneButton.onclick = function () { updateLevelValue(textfield.value) };

        var cancelButton = document.createElement("input");
        cancelButton.value= emxUIConstants.STR_CLOSE;
        cancelButton.type= "button";
        cancelButton.onclick = function () {
            if(document.getElementById("emxExpandFilter")){
                document.getElementById("emxExpandFilter").selectedIndex = 0;
            }
            removeCurrentFloatingDiv();
        };

        var objTable = document.createElement("table");
        objTable.border = 0;
        objTable.cellPadding = 1;
        objTable.cellSpacing = 0;
        objTable.height = "100%";

        var objTBody = document.createElement("tbody");
        objTable.appendChild(objTBody);
        var objTR = document.createElement("tr");
        objTBody.appendChild(objTR);
        var objCol = document.createElement("td");
        objCol.appendChild(textfield);
        objTR.appendChild(objCol);

        objCol = document.createElement("td");
        objCol.colSpan="2";
        objCol.align = "right";
        objCol.appendChild(doneButton);
        objCol.appendChild(cancelButton);
        objTR.appendChild(objCol);

        return objTable;
    }

    /*function enterKey(moreLevelValue) {
                 if (window.event.keyCode == 13 || event.which == 13) {
             updateLevelValue(moreLevelValue);


        }
    }*/
  //Bug 345358
  function enterKey(moreLevelValue,e)
  {
        var keyPressed = document.all?window.event.keyCode:e.which;
        if(keyPressed==13)
        {
            updateLevelValue(moreLevelValue);
        }
  }
  //Ends 345358

    function updateLevelValue(moreLevelValue)
    {
    //Bug 345365
        var digitCheck = /^((\d)*)$/;
        var zeroCheck = /^([0]*)$/;
        if(digitCheck.test(moreLevelValue) && !zeroCheck.test(moreLevelValue))
        {
          updateExpandFilter(trim(moreLevelValue));
          var emxExpandFilterValue = "expandFilter";
          removeCurrentFloatingDiv(emxExpandFilterValue);
        }
        else
        {
            alert(emxUIConstants.STR_MORELEVEL_ERROR);
            document.getElementById("txtLevelId").focus();
            return;
        }
    }

    function updateExpandFilter(moreLevelValue)
    {
        var expandFilter = document.getElementById("emxExpandFilter");
        var isLevelExists = false;
        for (var levelItr = 0; levelItr < expandFilter.options.length; levelItr++)
        {
            var tempVal = expandFilter.options[levelItr].value;
            if (tempVal == moreLevelValue)
            {
                expandFilter.value = trim(moreLevelValue);
                isLevelExists = true;
                break;
            }
        }
        if (!isLevelExists)
        {
            expandFilter.options[expandFilter.options.length] = new Option(trim(moreLevelValue), trim(moreLevelValue));
            expandFilter.value = trim(moreLevelValue);
            var emxExpandFilterValue = "expandFilter";
            removeCurrentFloatingDiv(emxExpandFilterValue);
        }
        expandLevel = moreLevelValue;
    }

    // oeo IR 099056 - Holds whether stop button clicked for progress meter.
    var isStopButtonClicked = false;
    var dialogLayerOuterDiv, dialogLayerInnerDiv, objTable1, iframeEl;
function addMask() {
    //ElapsedTimer.enter();


        spanRowCounter = null;
        levelCounter = null;
        dialogLayerOuterDiv = document.createElement("div");
        dialogLayerOuterDiv.className = "mx_divLayerDialogMask";
        document.body.appendChild(dialogLayerOuterDiv);
        dialogLayerOuterDiv.style.opacity = 0;
        dialogLayerOuterDiv.style.filter = 'alpha(opacity=0)';

        dialogLayerInnerDiv = document.createElement("div");
        dialogLayerInnerDiv.className = "mx_alert";
        dialogLayerInnerDiv.setAttribute("id", "mx_divLayerDialog");

        dialogLayerInnerDiv.style.top = editableTable.divPageHead.offsetHeight + 10 + "px";
        dialogLayerInnerDiv.style.left = getWindowWidth()/3 + "px";
        dialogLayerInnerDiv.style.display = "none";
        document.body.appendChild(dialogLayerInnerDiv);

        var divLayerDialogHeader = document.createElement("div");
        divLayerDialogHeader.setAttribute("id", "mx_divLayerDialogHeader");
        if(isIE) {
            divLayerDialogHeader.innerText = emxUIConstants.STR_EXPAND_HEADERNSG1;
        }else {
            divLayerDialogHeader.textContent = emxUIConstants.STR_EXPAND_HEADERNSG1;
        }

        var divLayerDialogBody = document.createElement("div");
        divLayerDialogBody.setAttribute("id", "mx_divLayerDialogBody");

        var paraElement1 = document.createElement("p");

        var strMsg1 = emxUIConstants.STR_OBJMSG1A;
        if(isIE) {
        paraElement1.innerText = strMsg1;
        }else {
        paraElement1.textContent = strMsg1;
        }

        var spanElement1 = document.createElement("span");
        spanElement1.className = "mx_rows-retrieved";
        spanElement1.setAttribute("id", "mx_spanRowCounter");
        var spanElement2 = document.createElement("span");
        spanElement2.setAttribute("id", "mx_spanlevelCounter");

        paraElement1.appendChild(spanElement2);
        paraElement1.appendChild(spanElement1);

        var paraElement2 = document.createElement("p");
        paraElement2.className = "mx_processing-message";

        if(isIE) {
            paraElement2.innerText = emxUIConstants.STR_EXPAND_WAIT;
        }else {
            paraElement2.textContent = emxUIConstants.STR_EXPAND_WAIT;
        }

        divLayerDialogBody.appendChild(paraElement1);
        divLayerDialogBody.appendChild(paraElement2);

        var divLayerDialogFooter = document.createElement("div");
        divLayerDialogFooter.setAttribute("id", "mx_divLayerDialogFooter");


        objTable1 = document.createElement("table");
        objTable1.border = 0;
        objTable1.cellPadding = 0;
        objTable1.cellSpacing = 0;

        var objTBody = document.createElement("tbody");
        var objTR = document.createElement("tr");
        var objCol = document.createElement("td");
        divLayerDialogFooter.appendChild(objTable1);
        objTable1.appendChild(objTBody);
        objTBody.appendChild(objTR);

        objTR.appendChild(objCol);

        dialogLayerInnerDiv.appendChild(divLayerDialogHeader);
        dialogLayerInnerDiv.appendChild(divLayerDialogBody);
        dialogLayerInnerDiv.appendChild(divLayerDialogFooter);

    //ElapsedTimer.exit();
    }

    function removeMask(){
    //ElapsedTimer.enter();
    if (dialogLayerOuterDiv) {
        document.body.removeChild(dialogLayerInnerDiv);
        document.body.removeChild(dialogLayerOuterDiv);

        dialogLayerOuterDiv = null;
        dialogLayerInnerDiv = null;
    }
    //ElapsedTimer.exit();
}

function showMaskGradually(opacityCount){
    var opacityValue = (opacityCount > 5.0)? 5.0 : opacityCount;

    if(dialogLayerOuterDiv){
        dialogLayerOuterDiv.style.opacity = opacityValue/10;
        dialogLayerOuterDiv.style.filter = 'alpha(opacity=' + opacityValue*10 + ')';

        if(opacityValue >= 5.0){
            dialogLayerInnerDiv.style.opacity = 100.0;
            dialogLayerInnerDiv.style.filter = 'alpha(opacity=100)';
        }
        opacityCount += 0.1;
        setTimeout("showMaskGradually("+opacityCount+")",50);
    }
}
function showProgressDialog(){
    if(dialogLayerInnerDiv) {
        dialogLayerInnerDiv.style.display = "block";
    }
}
function displayMask(){
    addMask();
    setTimeout("showMaskGradually(0)",1000);
    setTimeout("showProgressDialog()",1500);
}

function finishLongOperation(mask) {
    //ElapsedTimer.enter();
//alert(//ElapsedTimer.stack()+ ': finish ');
        if (!bExpandOperation) {
        turnOffProgress();
        //ElapsedTimer.exit("NO-OP");
            return;
        }

        bExpandOperation = false;
        levelsExpanded = 0;
        childArray = new Array();
        levelids = new Array();
        totalObjects = 0;
        sExpandCriteria = null;
        if(!mask)
        rebuildView();

        //dialogLayerInnerDiv.removeChild(objTable1);
    if(!mask)
    removeMask();
        turnOffProgress();
    //ElapsedTimer.exit();
    }


    var tempVar = null;
    var childArray = new Array();
    var totalObjects = 0;
    var spanRowCounter = document.getElementById("mx_spanRowCounter");
    var levelCounter = document.getElementById("mx_spanlevelCounter");

function getDisplayRows() {
    return getDisplayRowsAfterFiltering();
}

function recomputeViewport() {

    // Count total rows and update XML
    // transformation will use this input for pagination
    // For all the rows in the display page get the column information.
    aDisplayRows = getDisplayRows();
    totalRows = aDisplayRows.length;
    setGlobalSetting('total-rows', totalRows);

    /*var hasSecondRow = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name = 'HasMergedCell']");
    if(emxUICore.getText(hasSecondRow) == 'true'){
        windowFirstRow = Math.round(editableTable.divListBody.scrollTop / (rowHeight*2));
    }else{
        windowFirstRow = Math.round(editableTable.divListBody.scrollTop / rowHeight);
    }*/

    //369019 - Code change
    //windowSize = Math.ceil(editableTable.divListBody.clientHeight / rowHeight);

    // deal with case where a bunch of rows were removed, and now window is actually
    // below last data row; in that case, move window up
    //if (windowFirstRow + windowSize > totalRows) {
        //windowFirstRow = totalRows - windowSize;

    if (windowFirstRow < 0) {
        windowFirstRow = 0;
    }
    //firstRow = windowFirstRow - 1;

    //}

    if (bFullTextSearch) {
        pageSize = 50;
        scrollPageSize = 50;
    } else {
        // page size will be pageFactor times window size
        // transformation will use this input for pagination
        pageSize = windowSize * pageFactor + 1;
    	scrollPageSize = getPageSize();
    }
    setGlobalSetting('page-size', scrollPageSize);

}

function expandObjsCallback(objDOM, curLevel){
    //ElapsedTimer.enter();
    // oeo IR 099056 - Turn on progress.
    turnOnProgress();
    if (curLevel) {
        if (editableTable.mode == "edit" && ((preProcessURL && preProcessURL != "") || (preProcessJPO && preProcessJPO != ""))) {
                    var action = processHookIn("pre", curLevel);

                    if (action.toLowerCase() == "stop") {
                finishLongOperation();
                //ElapsedTimer.exit("cb-1");
                        return;
                    }

                    objDOM = emxUICore.getXMLDataPost("emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp +
            "&levelId=" +
            curLevel +
            globalStrData +
            "&IsStructureCompare=" +
            isStructureCompare);
                }
        var aAllRows = emxUICore.selectNodes(objDOM, "/mxRoot/rows/r");
                var xPath = "/mxRoot/rows//r[@id = '" + curLevel + "']";

        var tempRow = emxUICore.selectSingleNode(oXML, xPath);
        if (tempRow) {
            for (var i = 0; i < aAllRows.length; i++) {
                childArray.push(aAllRows[i].getAttribute("id"));
                /* modified for IR-047543V6R2011 */
                //tempRow.appendChild(aAllRows[i].cloneNode(true));
                //totalObjects++;
                var currentId = aAllRows[i].getAttribute("id");
                if(emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + currentId + "']") == null)
                {
                    tempRow.appendChild(aAllRows[i].cloneNode(true));
                    totalObjects++;
                }
                /* end IR-047543V6R2011 */
            }
            tempRow.setAttribute("display", "block");
            tempRow.setAttribute("expand", "true");
        }

        if (spanRowCounter == null || levelCounter == null) {
                    spanRowCounter = document.getElementById("mx_spanRowCounter");
                    levelCounter = document.getElementById("mx_spanlevelCounter");
                }
        if (levelCounter != null) {
                if (isIE) {
                    levelCounter.innerText = " " + (levelsExpanded + 1) + " " + emxUIConstants.STR_OBJMSG2 + ": ";
                    spanRowCounter.innerText = totalObjects;
            } else {
                    levelCounter.textContent = " " + (levelsExpanded + 1) + " " + emxUIConstants.STR_OBJMSG2 + ": ";
                    spanRowCounter.textContent = totalObjects;
                }
        }
                if (levelids.length == 0){
                    levelsExpanded++;
                }
                expandObjects("emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp+"&IsStructureCompare="+isStructureCompare, sExpandCriteria);
    } else {
        finishLongOperation();
            }
    objHTTP = null;

    // oeo IR 099056 - Turn progress meter off only if interrupted.
    if (isStopButtonClicked)
        turnOffProgress();

    //ElapsedTimer.exit("cb-2");
    }

    var objHTTP = null;
    var sExpandCriteria = null;
    function expandObjects(strURL, whereExp) {
    //ElapsedTimer.enter('EO');
        if (!bExpandOperation) {
            if (objHTTP) {
                objHTTP.abort();
            }

            return;
        }
        objHTTP = null;
        if(typeof strURL != "string") {
            emxUICore.throwError("Required parameter strURL is null or not a string.");
        }

        if (levelids.length == 0 && ( (levelsExpanded < new Number(expandLevel)) || (childArray.length > 0 && expandLevel == "All") || isNaN(expandLevel)))
        {
            levelids = childArray;
            childArray = new Array();
        }
        else if (levelids.length == 0)
        {
            childArray = new Array();
            callToBuildColumValues("firstTime",true);
        finishLongOperation();
        }

        var levelId = "";
        var sPostData = "";
        if (levelids.length > 0)
        {
            levelId = levelids.pop();
            sPostData = "levelId=" + levelId;
            if (whereExp)
            {
                sExpandCriteria = whereExp;
                sPostData += whereExp;
            }
        }

    // objHTTP = emxUICore.createHttpRequest();
    // emxUICore.getAsyncXMLData(objHTTP, expandObjsCallback, levelId, strURL, sPostData);
    objHTTP = emxUICore.getXMLDataPost(strURL, sPostData, expandObjsCallback, levelId);
    //ElapsedTimer.exit('EO');
    };

    function showExpandFilter(bShow) {
        var filterObj = document.getElementById("emxExpandFilter");

        if (bShow && filterObj) {
            filterObj.removeAttribute("disabled");
            filterObj.setAttribute("title", "");
        }
        else if (!bShow && filterObj) {
            filterObj.setAttribute("disabled", "true");
            filterObj.setAttribute("title", emxUIConstants.STR_EXPAND_TOOLTIP);
        }
    }

    function allLevelCheck(initialLoading) {

        var result = true;

    var expandProgram = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='expandProgram']/text()");
    var program = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='program']/text()");
    var expandProgramMenu =  emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='expandProgramMenu']/text()");
        /*
        If it is multi root SB, program parameter will be available. So direction=both will not be applied in the
        initial loading of SB. Below is the check for this condition.
        */
        if ( (initialLoading && program == null && expandProgram == null && expandProgramMenu == null) || (!initialLoading && program))
        {
            var direction = "";
            if (document.getElementById("to")) {
                var toVal = (document.getElementById("to"))?document.getElementById("to").checked:0;
                var fVal = (document.getElementById("from"))?document.getElementById("from").checked:0;
                if(toVal && fVal){
                    direction = "both";
                }
                else if(toVal){
                    direction = "to";
                }
                else if(fVal){
                    direction = "from";
                }
                else{
                   direction = "both";
                }

                if (direction == "both" && expandLevel == "All") {
                    alert(emxUIConstants.STR_ALLLEVEL_ERROR);
                    turnOffProgress();
                    result = false;
                }
            }
            else {
                //result = false;
            }
            levelsExpanded = 1;
        }
        /*
        If it is multi root structure browser there is nothing like root object expanded one level.
        So the default levels expanded is 0.
        */
        if (program)
        {
            levelsExpanded = 0;
        }
        return result;
}

/*
* This API is exposed to apps for removal of rows
* @since V6R2010 - April 16, 2009
*/
emxEditableTable.removeRowsSelected = function __removeRowsSelected(rows){
    removeRows(rows);
}

/*
* This API is exposed to apps for Updating the subHeader dynamically.
* The string passed will be a plain string and it will be set as is. It should not contain any macros.
* The caller of this method should resolve any macros if he needs some dynamic values and pass only string value to this function.
* since V6R2013
* Author: zgx
*/
emxEditableTable.setSubHeader = function __setSubHeader(strSubHeader){
    $$("pageSubHeader").setAttribute("subHeaderOld", emxUICore.getText($$("pageSubHeader")));
    $$("pageSubHeader").innerHTML = "";
    emxUICore.setText($$("pageSubHeader"),strSubHeader);
    _setSetting(oXML, "/mxRoot/requestMap","subHeader", strSubHeader);
    _setSetting(oXML, "/mxRoot/tableControlMap","subHeader", strSubHeader);
}



emxEditableTable.addToSelectedMultiRoot = function __addToSelectedMultiRoot(xmlOut,selectAndUnselectRows){

	    var objDOM = emxUICore.createXMLDOM();
	    objDOM.loadXML(xmlOut);
	    emxUICore.checkDOMError(objDOM);


	    var pid = emxUICore.selectSingleNode(objDOM, "/mxRoot//item").getAttribute("pid");
	    var objectIds = emxUICore.selectSingleNode(objDOM, "/mxRoot//item").getAttribute("oid");
	    var name = emxUICore.selectSingleNode(objDOM, "/mxRoot//item").getAttribute("name");
	    var relIds = emxUICore.selectSingleNode(objDOM, "/mxRoot//item").getAttribute("relId");
	    var rowid = emxUICore.selectSingleNode(objDOM, "/mxRoot//item").getAttribute("id");
	    var directions = emxUICore.selectSingleNode(objDOM, "/mxRoot//item").getAttribute("direction");

	    var cids = objectIds + "|" + relIds + "|" + directions+"|name="+name+"_AT_LS_NAME2=";//to be revisited uku
	    var strData = "sLevelIds=0&cids="+ cids;
	    var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp + "&action=add" + "&dataStatus=success&IsStructureCompare=false";
	    var childXML = emxUICore.getXMLDataPost(url, strData);

	    var clonedNodes = emxUICore.selectNodes(childXML,"/mxRoot/rows//r");
	    var row = emxUICore.selectSingleNode(oXML,"/mxRoot/rows/r[@id='0,0']");
	    var newRow = row.cloneNode(false);

	    newRow.setAttribute("r",clonedNodes[0].getAttribute('r'));
	    newRow.setAttribute("p",clonedNodes[0].getAttribute('p'));
	    newRow.setAttribute("id",clonedNodes[0].getAttribute('id'));
	    newRow.setAttribute("o",clonedNodes[0].getAttribute('o'));
	    newRow.setAttribute("d",clonedNodes[0].getAttribute('d'));
	    newRow.setAttribute("checked","");
	    newRow.setAttribute("level",clonedNodes[0].getAttribute('level'));


	    var rowsContent = getNode(oXML, "/mxRoot/rows");
	    rowsContent.appendChild(newRow.cloneNode(true));

	    var newrow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows/r[@id='"+clonedNodes[0].getAttribute('id')+"']");
	    var newrows =[];newrows[0] = newrow;
	    fillupColumns(newrows, 0, newrows.length);

	        //refresh row grouping after add to selected
	        processRowGroupingToolbarCommand();
	        rebuildView();
	        //refreshStructureWithOutSort();

	}


emxEditableTable.addToSelected = function __addToSelected(xmlOut,selectAndUnselectRows){
    /*
    In SB-Flat version, user can not append the childs. The following if condition handles the case.
    */
    var isIndentedView = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='isIndentedView']/text()");
    if (isIndentedView && isIndentedView.nodeValue == "false") {
        return;
    }

    var objDOM = emxUICore.createXMLDOM();
    objDOM.loadXML(xmlOut);
    emxUICore.checkDOMError(objDOM);

    if(selectAndUnselectRows!= undefined){
    	for (var e=0;e< selectAndUnselectRows.length;e++){
    		FreezePaneregisterByRowId(selectAndUnselectRows[e]);
        }
    }

    var checkboxes = getCheckedCheckboxes();
    var cBoxArray = new Array();
    var strSelectedLevelIds = "";
    var strNewSelectedLevelIds = "";
    var items = new Object();
    var nRow = null;

    var cids="";
    for (var e in checkboxes){
        cBoxArray[cBoxArray.length] = e;
    }
    var fromRMB = emxUICore.selectSingleNode(objDOM, "/mxRoot/data").getAttribute("fromRMB");
    if(fromRMB != null && fromRMB == "true"){
        cBoxArray = new Array();
        var pid = emxUICore.selectSingleNode(objDOM, "/mxRoot//item").getAttribute("pid");
        var nParent = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@o = '" + pid + "']");
        var oid = nParent.getAttribute("o");
        var pid = nParent.getAttribute("p");
        var relid = nParent.getAttribute("r");
        var rowid = nParent.getAttribute("id");
        var emxRowId = relid+"|"+oid+"|"+pid+"|"+rowid;
        cBoxArray[cBoxArray.length] = emxRowId;
    } else if(cBoxArray.length == 0){
        var nRoot = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '0']");
        var oid = nRoot.getAttribute("o");
        var pid = nRoot.getAttribute("p");
        var relid = nRoot.getAttribute("r");
        var rowid = nRoot.getAttribute("id");
        var emxRowId = relid+"|"+oid+"|"+pid+"|"+rowid;
        cBoxArray[cBoxArray.length] = emxRowId;
    }
    /*
        <message> element value of user created XML
    */
    nRow = emxUICore.selectSingleNode(objDOM, "/mxRoot/message/text()");
    if (nRow && nRow.nodeValue != "")
    {
        alert(nRow.nodeValue);
        return;
    }
    dataStatus = emxUICore.selectSingleNode(objDOM, "/mxRoot/data").getAttribute("status");
    var actionMode = emxUICore.selectSingleNode(objDOM, "/mxRoot/data").getAttribute("pasteBelowOrAbove");
    var aExpandRowIds = new Array();
    // This code added for addToselected (ABOVE/BELOW) Feature
    if(actionMode && actionMode == "true"){
        var aAllRows = emxUICore.selectNodes(objDOM, "/mxRoot/data/item");
        for(var k=0;k<aAllRows.length;k++){
            var tempOID = aAllRows[k].getAttribute("oid");
            var tempRelID = aAllRows[k].getAttribute("relId");
            var tempPid = aAllRows[k].getAttribute("pid");
            var tempDir = aAllRows[k].getAttribute("direction");
            var RowEditable = aAllRows[k].getAttribute("RowEditable");
            var tempAddrowIDAbove = aAllRows[k].getAttribute("pasteAboveToRow");
            var tempAddrowIDBelow = aAllRows[k].getAttribute("pasteBelowToRow");
            var tempAddrowID ="";
            if(tempAddrowIDAbove && tempAddrowIDAbove!=""){
                tempAddrowID = tempAddrowIDAbove;
            }
            if(tempAddrowIDBelow && tempAddrowIDBelow!=""){
                tempAddrowID = tempAddrowIDBelow;
            }
            var toAdd =  emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@id = '" + tempAddrowID + "']");
            if(toAdd[0] && toAdd[0]!=null){
            var rowToAdd = new Array();
                rowToAdd[0] = toAdd[0].cloneNode(false);
                rowToAdd[0].setAttribute("o",tempOID);
                rowToAdd[0].setAttribute("r",tempRelID);
                rowToAdd[0].setAttribute("p",toAdd[0].getAttribute("p"));
                if(tempDir){
                rowToAdd[0].setAttribute("d",tempDir);
                }
                var nTempNewRows = null;
                if(toAdd[0] && toAdd[0].parentNode && tempAddrowIDAbove &&  tempAddrowIDAbove != ""){
                     var clonedRows = getCopiedRowXMLFromDB(rowToAdd,toAdd,"pasteAbove",dataStatus,RowEditable);
                     nTempNewRows =  emxUICore.selectNodes(clonedRows,"/mxRoot/rows//r");
                     toAdd[0].parentNode.insertBefore(nTempNewRows[0],toAdd[0]);
                }
                if(toAdd[0] && toAdd[0].parentNode && tempAddrowIDBelow &&  tempAddrowIDBelow != ""){
                     var clonedRows = getCopiedRowXMLFromDB(rowToAdd,toAdd,"pasteBelow",dataStatus,RowEditable);
                     nTempNewRows =  emxUICore.selectNodes(clonedRows,"/mxRoot/rows//r");
                     var rpasteBelow = toAdd[0].nextSibling;
                        if(rpasteBelow != null){
                             rpasteBelow.parentNode.insertBefore(nTempNewRows[0],rpasteBelow);
                        }else{
                             toAdd[0].parentNode.appendChild(nTempNewRows[0]);
                        }
                }
                if(dataStatus == "pending"){
                    var nRow = toAdd[0].parentNode;
                    nTempNewRows[0] = updateColumnForAddToSelected(nTempNewRows[0],aAllRows[k],"view");
                    nTempNewRows[0].setAttribute("status","add");
                    nTempNewRows[0].setAttribute("relType",aAllRows[k].getAttribute("relType"));
                    updatePostDataXMLForEdit("pasteAsChild",nTempNewRows[0],nRow,nTempNewRows[0].getAttribute("id"),true);
                    updateColumnForAddToSelected(nTempNewRows[0],aAllRows[k],"update");
                }
            }
        }
        //refresh row grouping after add to selected
        processRowGroupingToolbarCommand();
        reloadGSB = true;
        rebuildView();
        //code-END for addToselected (ABOVE/BELOW) Feature
    } else{

        for(var itr = 0; itr < cBoxArray.length; itr++) {
            var aIds = cBoxArray[itr].split("|");
            var id = aIds[3];
            var objectIds = "";
            var relIds = "";
            var directions = "";
            var rowEditableFlag ="";
            var tempRowEditableFlag = true;
            nRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + id + "']");
             //To expand the parent Rows if is not expanded initially
             var expand = nRow.getAttribute("expand");
            if(!expand){
                aExpandRowIds.push(id);
                var oLocalXML = emxUICore.getXMLData("../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp +
                                        "&levelId=" + id +"&IsStructureCompare="+isStructureCompare+ "&toolbarData=updateTableCache=true");

                if (oLocalXML) {
                    var aAllRows = emxUICore.selectNodes(oLocalXML, "/mxRoot/rows/r");
                    for (var i = 0; i < aAllRows.length; i++) {
                        nRow.appendChild(aAllRows[i].cloneNode(true));
                    }
                    nRow.setAttribute("display", "block");
                    nRow.setAttribute("expand", "true");
                    if(nRow.getAttribute("expandedLevels")== null){//367131
                        nRow.setAttribute("expandedLevels", "1");
                    }
                }
            }
            if (itr == 0) {
                strSelectedLevelIds = nRow.getAttribute("id");
            }
            else {
                strSelectedLevelIds += ":" + nRow.getAttribute("id");
            }

            var aAllRows = emxUICore.selectNodes(objDOM, "/mxRoot/data/item[@pid = '" + nRow.getAttribute("o") +"']");

            /*
            Need to build pid:oid:relid:direction for each connected object
            */
            for (var ctr = 0; ctr < aAllRows.length; ctr++) {
                if(!items[itr]) {
                    items[itr] = new Object();
                }
                if(!items[itr][ctr]) {
                    items[itr][ctr] = aAllRows[ctr];
                }
                if (ctr == 0) {
                    objectIds = aAllRows[ctr].getAttribute("oid");
                    relIds = aAllRows[ctr].getAttribute("relId");
                    directions = aAllRows[ctr].getAttribute("direction");
                    rowEditableFlag = aAllRows[ctr].getAttribute("RowEditable");
                    if(rowEditableFlag && (rowEditableFlag=="false"||rowEditableFlag=="true")){
                        tempRowEditableFlag = false;
                    }
                }
                else {
                    objectIds = objectIds + ":" + aAllRows[ctr].getAttribute("oid");
                    relIds += ":" + aAllRows[ctr].getAttribute("relId");
                    directions += ":"+aAllRows[ctr].getAttribute("direction");
                    rowEditableFlag += ":"+ aAllRows[ctr].getAttribute("RowEditable");
                    if(rowEditableFlag && (rowEditableFlag=="false"||rowEditableFlag=="true")){
                        tempRowEditableFlag = false;
                    }
                }
            }

            if (itr == 0) {
                cids = objectIds + "|" + relIds + "|" + directions+ "|" +rowEditableFlag;
            }
            else {
                cids += "~" + objectIds + "|"+relIds + "|"+directions +"|"+rowEditableFlag;
            }
        }

        var arrSelLevelIds = strSelectedLevelIds.split(":");
        var strSelectedLevelIdsNew = "";
        var arrChildIds = cids.split("~");
        var cidsNew = "";
        var cBoxArrayNew = new Array();
        if(dataStatus != "pending" && aExpandRowIds.length > 0){
            for (var l=0; l < arrSelLevelIds.length; l++){
                var nTemp = arrSelLevelIds[l];
                var tempFlagF = false;
                for (var k=0; k<aExpandRowIds.length; k++ ){
                    if(nTemp == aExpandRowIds[k]){
                        tempFlagF = true;
                        break;
                    }
                }
                if(tempFlagF){
                    continue;
                }
                var nRowNew = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + arrSelLevelIds[l] + "']");
                var oid = nRowNew.getAttribute("o");
                var pid = nRowNew.getAttribute("p");
                var relid = nRowNew.getAttribute("r");
                var rowid = nRowNew.getAttribute("id");
                var emxRowId = relid+"|"+oid+"|"+pid+"|"+rowid;
                cBoxArrayNew[cBoxArrayNew.length] = emxRowId;
                if(strSelectedLevelIdsNew.length > 0){
                    strSelectedLevelIdsNew = ":" +arrSelLevelIds[l] ;
                }else{
                    strSelectedLevelIdsNew = arrSelLevelIds[l] ;
                }
                if(cidsNew.length > 0){
                    cidsNew = ":" +arrChildIds[l] ;
                }else{
                    cidsNew = arrChildIds[l] ;
                }
             }
        }else{
            strSelectedLevelIdsNew = strSelectedLevelIds;
            cidsNew = cids;
            cBoxArrayNew = cBoxArray;
        }
        var strData = "";
        if(tempRowEditableFlag){
            strData = "sLevelIds=" + strSelectedLevelIdsNew + "&cids=" + cidsNew ; //+"&RowEditable="+ isRowEditableForPasteAsChild;
        }else{
            strData = "pacRowEditableFlag=true&sLevelIds=" + strSelectedLevelIdsNew + "&cids=" + cidsNew ; //+"&RowEditable="+ isRowEditableForPasteAsChild;
        }

        var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp +"&action=add&dataStatus=" +dataStatus+"&IsStructureCompare="+isStructureCompare;
        var childXML = emxUICore.getXMLDataPost(url, strData);
        for(var itr = 0; itr < cBoxArrayNew.length; itr++) {
            var aIds = cBoxArrayNew[itr].split("|");
            var id = aIds[3];
            nRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + id + "']");
            var expand = nRow.getAttribute("expand");
            //Added for BUG :348114
            var tempCutFlag = cutFlag;
            var tempResqFlag = resqFlag;
            cutFlag = 0;
            resqFlag = 0;
            var aAllRows = emxUICore.selectNodes(childXML, "/mxRoot/rows//r[@pid = '" + nRow.getAttribute("id") + "']");

            var xPath = "/mxRoot/rows//r[@id = '" + nRow.getAttribute("id") + "']";
            var disp=0,aAllRowsDisp = new Array();
            for (var i = 0; i < aAllRows.length; i++) {
                if(dataStatus == "pending"){
                    aAllRows[i] = updateColumnForAddToSelected(aAllRows[i],items[itr][i],"view");
                    aAllRows[i].setAttribute("status","add");
                    aAllRows[i].setAttribute("relType",items[itr][i].getAttribute("relType"));
                    updatePostDataXMLForEdit("pasteAsChild",aAllRows[i],nRow,aAllRows[i].getAttribute("id"),true);
                    if(nRow.getAttribute("display")=="block")
                        nRow.appendChild(aAllRows[i].cloneNode(true));
                    if(nRow.getAttribute("display")=="none"){
                        nRow.setAttribute("display","block");
                        nRow.appendChild(aAllRows[i].cloneNode(true));
                    }
                    updateColumnForAddToSelected(aAllRows[i],items[itr][i],"update");
                }else{
                    var display = nRow.getAttribute("display");
                    if (display == null || display == 'none')
                    {
                        nRow.setAttribute("display","block");
                    }
                    if(aAllRows[i].getAttribute("r")&& aAllRows[i].getAttribute("r")=="null"){
                        aAllRows[i].setAttribute("r","");
                    }
                    nRow.appendChild(aAllRows[i].cloneNode(true));
                    aAllRowsDisp[disp]=emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + aAllRows[i].getAttribute("id") + "']");
                    disp++;
                }
            }
            if(aAllRowsDisp.length > 0 ){
                fillupColumns(aAllRowsDisp, 0, aAllRowsDisp.length);
            }
        }
        cutFlag = tempCutFlag;
        resqFlag = tempResqFlag;

        if(selectAndUnselectRows!= undefined){
        	for (var e=0;e< selectAndUnselectRows.length;e++){
        		FreezePaneunregisterByRowId(selectAndUnselectRows[e]);
            }
        }

        if (displayView != "tree") {
			reloadGSB = true;
        rebuildView();
        } else {
			var aIds = cBoxArray[cBoxArray.length - 1].split("|");
			var id = aIds[3];
			var foundNode = findNode(tree.root, id);
			var childRows = emxUICore.selectNodes(foundNode.data.data, "r");
			if (foundNode.children.length > 0) {
			    for(i = 0; i < childRows.length; i++) {
			        var chOid = childRows[i].getAttribute("id");
			        var found = false;
			        for(j = 0; j < foundNode.children.length; j++) {
			            var fOid = foundNode.children[j].data.data.getAttribute("id");
			            if (fOid == chOid) {
			                found = true;
			                break;
			            }
			        }
			        if (!found) {
			            childRows = childRows.slice(i, childRows.length);
			            break;
			        }
			    }
			}

			var imageIds = [];
			for (i = 0; i < childRows.length; i++) {
				imageIds.push(childRows[i].getAttribute("id"));
			}
			var imageMap = new Object();
			if (imageIds.length > 0) {
				var responseXML = emxUICore.getXMLDataPost(
						"../common/emxFreezePaneGetData.jsp", getParams()
								+ "&rowIds=" + imageIds.join(":")
								+ "&sbImages=ImageOnly");
				var allrows = emxUICore.selectNodes(responseXML, "/mxRoot/rows//r");
				for (i = 0; i < allrows.length; i++) {
					var colNode = emxUICore.selectSingleNode(allrows[i], "c");
					imageMap[allrows[i].getAttribute("id")] = colNode;
				}
			}

			for (i = 0; i < childRows.length; i++) {
				childRows[i].appendChild(imageMap[childRows[i].getAttribute("id")]);
				foundNode.addChild({
					data : {
						data : childRows[i]
					}
				});
				foundNode.body.el.children[1].style.visibility = "visible";
			}
			if (!foundNode.expanded) {
			    foundNode.data.data.setAttribute("display", "none");
		(new swv6.ui.Action.Expand({
			type : "Expand",
			state : window.controller.state,
			node : foundNode
		})).run();
    }

			}
	}
	
    if(isIE){
        syncSB();
    }else {
        $(document).waitForImages(function(){
            syncSB();
        });
    }
}
function findNode(node, id) {
	if (node.data.data.getAttribute("id") == id) {
		return node;
	}
    for(var itr = 0; itr < node.children.length; itr++) {
        childId = node.children[itr].data.data.getAttribute("id");
        if (childId == id) {
            return node.children[itr];
        } else {
            var found = findNode(node.children[itr], id);
            if (found) {
                return found;
            }
        }
    }
}

function submitPostToSelfSB(url,formFieldValues,strTarget)
{
   formFieldValues = getKeyValuePairs(formFieldValues);

   var frame   = window.frames["listHidden"];
   var form    = frame.document.createElement('form');
   form.name   = "emxHiddenForm";
   form.id     = "emxHiddenForm";
   var existingForm = frame.document.forms["emxHiddenForm"]
   if(existingForm){
       frame.document.body.removeChild(existingForm);
   }
   frame.document.body.appendChild(form);

   for(var index=0; index<formFieldValues.length; index++)
   {
      var input   = frame.document.createElement('input');
      input.type  = "hidden";
      input.name  = formFieldValues[index].name;
      input.value = decodeURIComponent(formFieldValues[index].value);
      form.appendChild(input);
    }

    form.action = url;
    form.method = "post";
    if(!strTarget){
        strTarget = "_parent";
    }
    form.target = strTarget;
    form.submit();
}

/**
 * Added for User Defined Table
 * Check for refresh the Structure Browser
 * reset a parameter in urlParameters
 * @param parm The querystring parameter
 * @param val The parameter value
 */
function refreshSBTable(newTableName,customSortColumns,customSortDirections,persist){
    //modify persist behavior based on persistObjectIDs URL parameter
    var persistObjectIDs = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='persistObjectIDs']/text()");
    persistObjectIDs  = persistObjectIDs != null ? emxUICore.getText(persistObjectIDs) : "";
    persist = persistObjectIDs == "false"? persistObjectIDs : persist;

    if(persist != "true"){
        urlParameters = resetParameter("customSortColumns", customSortColumns);
        urlParameters = resetParameter("customSortDirections", customSortDirections);
    }else{
        getTopWindow().info=[];
        getTopWindow().info["oldXML"] = oXML;
        getTopWindow().info["scrollTop"]=editableTable.divListBody.scrollTop;
        getTopWindow().info["lastSelection"] = lastSelection;
        resetUrlParameters("persist","true");
        resetUrlParameters("timeStamp",timeStamp);
        persistGlobal =  true;
        updateToolbarDataParams();
    }
    if (fullTextSearchObj) {
            var fullSearch = fullTextSearchObj;
            fullSearch.setCustomAction(true);
            var aFrame =findFrame(getTopWindow(), "windowShadeFrame");
            if(aFrame&& aFrame.location.href.indexOf("emxFullSearch.jsp")>-1 ){
            } else {
                aFrame = getTopWindow();
            }
            var contentURL = new aFrame.Query(fullSearch.getContentUrl());
            contentURL.set("selectedTable", newTableName);
            urlPrameters = resetParameter("selectedTable", newTableName);
            contentURL.set("customSortColumns", customSortColumns);
            urlPrameters = resetParameter("customSortColumns", customSortColumns);
            contentURL.set("customSortDirections", customSortDirections);
            urlPrameters = resetParameter("customSortDirections", customSortDirections);
            contentURL.set("dynamic", "true");
            contentURL.set("persist", "true");
            contentURL.set("timeStamp", timeStamp);
            var fullTextObjCount = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name = 'fullTextObjCount']");
            if(fullTextObjCount){
               contentURL.set("fullTextObjCount", emxUICore.getText(fullTextObjCount));
            }
            urlPrameters = resetParameter("dynamic", "true");
            fullSearch.setContentUrl(contentURL.toString());
            fullSearch.formSearch();
            fullSearch.setCustomAction(false);
    }
    else {
        var subHeader,header;
        subHeader  = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='subHeader']/text()");
        subHeader  = subHeader != null ? emxUICore.getText(subHeader) : "";
        header     = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='header']/text()");
        header     = header != null ? emxUICore.getText(header) : "";
        urlParameters = resetParameter("subHeader", subHeader);
        urlParameters = resetParameter("header", header);
        urlParameters = resetParameter("selectedTable", newTableName);
        if(fullTextSearchObj && fullTextSearchObj.filters){
        urlParameters = resetParameter("filters", fullTextSearchObj.getFiltersJSONString());
        }
        urlParameters = resetParameter("dynamic", "true");
        program     = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='RequestValuesMap']/items/item[@name='program']/items/value/text()")
        program     = program != null ? emxUICore.getText(program) : "";
        if(program != "") {
            urlPrameters = resetParameter("program", program);
        }
        /*this.submitPostToSelfSB("../common/emxIndentedTable.jsp",urlParameters);*/
        reloadSBWithGet(urlParameters);
    }
}
function reloadSBWithGet(urlParameters){
    with(document.location){
        baseUrl = protocol;
        baseUrl += "//";
        baseUrl += host;
        baseUrl += pathname;
        baseUrl += "?";
        baseUrl += urlParameters;
        //baseUrl = encodeURI(baseUrl);
        this.document.location.href = baseUrl;
  }
}
function submitPostToSBSelf(url,formFieldValues)
{
   formFieldValues = getKeyValuePairs(formFieldValues);

   var frame   = window.frames["listHidden"];
   var form    = frame.document.createElement('form');
   form.name   = "emxHiddenForm";
   form.id     = "emxHiddenForm";

   frame.document.body.appendChild(form);

   for(var index=0; index<formFieldValues.length; index++)
   {
      var input   = frame.document.createElement('input');
      input.type  = "hidden";
      input.name  = formFieldValues[index].name;
      input.value = formFieldValues[index].value;
      form.appendChild(input);
}

    form.action = url;
    form.method = "post";
    form.target = "_parent";
    form.submit();
}

function reloadSBForSort(sortColumnName, sortDirection){
    turnOnProgress();
    if(typeof sortColumnName!="undefined" && typeof sortDirection!="undefined")
    {
        var columnNames = sortColumnName.split(",");
        var columnDirections = sortDirection.split(",");

        if(typeof columnNames != "undefined"){
            lSortColumnName[0]  = null;
            lSortColumnName[1]  = null;
            lSortColumnName[2]  = null;

            for(var colCnt=0; colCnt<columnNames.length; colCnt++){
                lSortColumnName[colCnt] = columnNames[colCnt];
            }
        }
        if(typeof columnDirections != "undefined"){
            lSortColumnDirection[0] = null;
            lSortColumnDirection[1] = null;
            lSortColumnDirection[2] = null;

            for(var colDirCnt=0; colDirCnt<columnDirections.length; colDirCnt++){
                lSortColumnDirection[colDirCnt] = columnDirections[colDirCnt];
            }
        }

        insertSortArrows();
    }

    parent.FullSearch.busy("Sorting by " + sortColumnName);
    resetParameter("sortColumnName", sortColumnName);
    resetParameter("sortDirection", sortDirection);
    resetParameter("currentPage", 1);
    resetParameter("filters", parent.FullSearch.getFiltersJSONString());
    editableTable.loadTextSearchResults(parent.FullSearch.getFiltersJSONString(), null, false);
    parent.FullSearch.notBusy();
    insertSortArrows();
    turnOffProgress();
}


/** Used to Update the postDataXML with Edit actions
 *@action (String)is the type of Action performed
 *@copiedObjects (Array)is the selected copied parts/Undo selected parts
 *@pasteSelectedobjects (Array)is the target pasteaschild/pasteAbove/pasteBelow selcted parts
 *@IdforNewlyAddedRow (String)is the Id of the newly added/resequenced part to structure
 *@differntLevel (Boolean)is Flag to indicate weather the paste opeartion(s) is on same level or different Level
 *
 */
 function updatePostDataXMLForEdit(action,copiedObjects,pasteSelectedObjects,IdforNewlyAddedRow,differentLevel)
  {
   if(!isDataModified()){
        disableExpandAllMenus();
      }
  var IdforNewlyAddedRow=IdforNewlyAddedRow;
    /* aCopiedRowsChecked is a Global array having the copied/cut Object Details*/

    if(action=="cut")
    {
         //Added code to send the params from the APPS
         var parmArray = pasteSelectedObjects;
         //Added for MarkUp Feature -Starts
         if(copiedObjects!=null){
            aCopiedRowsChecked=copiedObjects;
         }
         //Added for MarkUp Feature -Ends
         var nNewCopiedRow=null;
         for(var i=0;i<aCopiedRowsChecked.length;i++){
                nNewCopiedRow= aCopiedRowsChecked[i].cloneNode(true);
                var copiedObjectParentObjectID=aCopiedRowsChecked[i].parentNode.getAttribute("o");
                var copiedParentID=aCopiedRowsChecked[i].getAttribute("p");
                var copiedObjectID=aCopiedRowsChecked[i].getAttribute("o");
                var copiedRelID=aCopiedRowsChecked[i].getAttribute("r");
                var copiedRowId=aCopiedRowsChecked[i].getAttribute("id");
                var copiedObjectParentRowId =  aCopiedRowsChecked[i].parentNode.getAttribute("id");
                var newNode = postDataXML.createElement("object"); //for updating the postDataXML
                newNode.setAttribute("objectId",copiedObjectParentObjectID);
                newNode.setAttribute("rowId",copiedObjectParentRowId);
                var rootElement=postDataXML.documentElement;

                var existingRow=emxUICore.selectSingleNode(postDataXML,"/mxRoot/object[@objectId = '" + copiedObjectParentObjectID + "'and @rowId ='"+copiedObjectParentRowId+"']");
                if(existingRow!=null && existingRow.getAttribute("markup")=="changed"){
                       existingRow = null;
                }

                var newNodeMarked=postDataXML.createElement("object");
                    newNodeMarked.setAttribute("rowId",copiedRowId);
                    newNodeMarked.setAttribute("objectId",copiedObjectID);
                    copiedRelID = copiedRelID == null ? "" : copiedRelID;
                    newNodeMarked.setAttribute("relId",copiedRelID);
                 //To update param Values sent from apps
                    if(parmArray!=null & typeof parmArray!='undefined'){
                       for(var count=1;count<=parmArray.length;count++){
                          var paramName = "param"+count;
                          newNodeMarked.setAttribute(paramName,parmArray[count-1]);
                       }
                    }
                if(existingRow!=null){
                    var nNodes=emxUICore.selectSingleNode(postDataXML,"/mxRoot/object[@objectId = '" + copiedObjectParentObjectID + "']/object[@objectId='"+copiedObjectID+"'and @rowId='"+copiedRowId+"']");
                    if(nNodes!=null) {
                        nNodes.setAttribute("markup","cut");
                    }
                    else{
                        newNodeMarked.setAttribute("markup","cut");
                        existingRow.appendChild(newNodeMarked);
                    }
                }
                else{
                    rootElement.appendChild(newNode);
                    newNodeMarked.setAttribute("markup","cut");
                    newNode.appendChild(newNodeMarked);
                }
         }
    }

    if(action == "pasteAsChild")
    {   /* copiedObjects are the cloned copiedObjects having the setted Attribute values
         * pasteSelectedObjects are the pasteAsChild selected*/
          var IdforNewlyAddedRow = IdforNewlyAddedRow;

          var copiedParentID = copiedObjects.getAttribute("p");
          var copiedObjectID = copiedObjects.getAttribute("o");
          var copiedRelID = copiedObjects.getAttribute("r");
          var copiedRelType = copiedObjects.getAttribute("relType");
          var copiedLevel =  copiedObjects.getAttribute("level");
          var copiedDirection = copiedObjects.getAttribute("d");
          var copiedSelection = copiedObjects.getAttribute("s");
          if(copiedDirection==null){
            copiedDirection ="";
            }
          if(copiedSelection==null){
            copiedSelection ="";
            }
            var actionForXML = null;
            if(action == "pasteAsChild"){
                actionForXML = "paste-as-child";
            }
            var TargetRowID = pasteSelectedObjects.getAttribute("id");
        var TargetObjectID = pasteSelectedObjects.getAttribute("o");
        var TargetRelID = pasteSelectedObjects.getAttribute("r");

          var objectIdofPasteRow = pasteSelectedObjects.getAttribute("o");


          var newNode = postDataXML.createElement("object");
              newNode.setAttribute("objectId",objectIdofPasteRow);
              newNode.setAttribute("rowId",TargetRowID);
              newNode.setAttribute("lastOperation",lastOperation);
          var rootElement = postDataXML.documentElement;

          var existingRow = emxUICore.selectSingleNode(postDataXML,"/mxRoot/object[@rowId ='"+TargetRowID+"' and @objectId = '" + objectIdofPasteRow + "']");
                 if(existingRow!=null && existingRow.getAttribute("markup")=="changed"){
                       existingRow = null;
                 }

                    var newNodeMarked = postDataXML.createElement("object");
                        newNodeMarked.setAttribute("rowId",IdforNewlyAddedRow);
                        newNodeMarked.setAttribute("objectId",copiedObjectID);
                        newNodeMarked.setAttribute("relId",copiedRelID);
                        newNodeMarked.setAttribute("relType",copiedRelType);
                        newNodeMarked.setAttribute("level",copiedLevel);
                        newNodeMarked.setAttribute("direction",copiedDirection);
                        newNodeMarked.setAttribute("selection",copiedSelection);
                    var target = TargetObjectID+"|"+TargetRelID+"|"+TargetRowID;
                        newNodeMarked.setAttribute(actionForXML,target);

                    var achildNodes = new Array();
                    var achildNodesForResequence = new Array();
                    if(existingRow != null){
                        if(copiedParentID == objectIdofPasteRow&&cutFlag==1){
                                 var p = 0;
                                 var m = 0;
                                 var n = 0;
                                 var iLength = existingRow.childNodes.length;
                                     //to remove all the childrens
                                    for(var k = 0; k < iLength; k++){
                                        if(existingRow.childNodes[0].getAttribute("markup") == "add"){
                                            //string the edited columns values in array
                                            achildNodes[p] = existingRow.childNodes[0];
                                            p++;
                                            existingRow.removeChild(existingRow.childNodes[0]);
                                        }
                                        else if(existingRow.childNodes[0].getAttribute("markup") == "resequence"){
                                                //string the existing resequenced rows values in array
                                                achildNodesForResequence[n] = existingRow.childNodes[0];
                                                n++;
                                                existingRow.removeChild(existingRow.childNodes[0]);
                                        }
                                        else{
                                            existingRow.removeChild(existingRow.childNodes[0]);
                                        }
                                     }
                                var q = 0;
                                var r = 0;
                                //to include all the childs for the resequence
                                for(var t = 0;t < pasteSelectedObjects.childNodes.length;t++)
                                {
                                     var newTemp = postDataXML.createElement("object");
                                     var temp = pasteSelectedObjects.childNodes[t];
                                     if(temp.tagName == "r"){
                                         var TempObjectId = pasteSelectedObjects.childNodes[t].getAttribute("o");
                                         var TempRowId = pasteSelectedObjects.childNodes[t].getAttribute("id");
                                         var TempRelId = pasteSelectedObjects.childNodes[t].getAttribute("r");
                                         var TempParentId = pasteSelectedObjects.childNodes[t].getAttribute("p");
                                         var TempMarkup = pasteSelectedObjects.childNodes[t].getAttribute("status");

                                            //adding all the changed column values from the array stored
                                              if(TempMarkup == "resequence") {
                                                  newTemp.setAttribute("rowId",TempRowId);
                                                  newTemp.setAttribute("objectId",TempObjectId);
                                                  newTemp.setAttribute("relId",TempRelId);
                                                  newTemp.setAttribute("parentId",TempParentId);
                                                  newTemp.setAttribute("markup",TempMarkup);
                                                    if(achildNodesForResequence.length!=0){
                                                            var tempXML = achildNodesForResequence[r];
                                                            if(TempRowId==tempXML.getAttribute("rowId")){
                                                                existingRow.appendChild(achildNodesForResequence[r]);
                                                                deleteElement(achildNodesForResequence,r);
                                                            }
                                                            else{
                                                                existingRow.appendChild(newTemp);
                                                                updateColumnInfoForAddedRows(copiedObjects,newTemp);
                                                                newTemp.setAttribute(actionForXML,target);
                                                            }
                                                        }
                                                    else{
                                                        existingRow.appendChild(newTemp);
                                                        updateColumnInfoForAddedRows(copiedObjects,newTemp);
                                                        newTemp.setAttribute(actionForXML,target);
                                                    }
                                              }
                                              //adding all the added  column values from the array stored
                                              else if(TempMarkup == "add") {
                                                  newTemp.setAttribute("rowId",TempRowId);
                                                      newTemp.setAttribute("objectId",TempObjectId);
                                                  newTemp.setAttribute("relId",TempRelId);
                                                  newTemp.setAttribute("parentId",TempParentId);
                                                  newTemp.setAttribute("markup",TempMarkup);
                                                    if(achildNodes.length!=0)
                                                        existingRow.appendChild(achildNodes[q]);
                                                    else
                                                        existingRow.appendChild(newTemp);
                                                        q++;
                                              }
                                              else{
                                                  newTemp.setAttribute("rowId",TempRowId);
                                                  newTemp.setAttribute("objectId",TempObjectId);
                                                  newTemp.setAttribute("relId",TempRelId);
                                                  newTemp.setAttribute("parentId",TempParentId);
                                                      if(TempMarkup!= null)
                                                      newTemp.setAttribute("markup",TempMarkup);
                                                      //Adding all the column information for resequenced Row
                                                      if(TempMarkup=="resequence"){
                                                            updateColumnInfoForAddedRows(copiedObjects,newTemp);
                                                            newTemp.setAttribute(action,target);
                                                      }

                                                  existingRow.appendChild(newTemp);
                                              }
                                     }
                                }
                                removeCutRowsForResequence();
                            }
                        else{
                            newNodeMarked.setAttribute("markup","add");
                            newNodeMarked.setAttribute(actionForXML,target);
                            // Adding all the column information for newly added row
                            updateColumnInfoForAddedRows(copiedObjects,newNodeMarked);
                            existingRow.appendChild(newNodeMarked);
                        }
                   }
                   else{
                          rootElement.appendChild(newNode);
                          if(copiedParentID == objectIdofPasteRow&&cutFlag==1)
                          {   //to include all the childs for the resequence
                                for(var t = 0;t <pasteSelectedObjects.childNodes.length;t++) {
                                     var newTemp = postDataXML.createElement("object");
                                     var temp = pasteSelectedObjects.childNodes[t];
                                        if(temp.tagName == "r")
                                        {
                                         var TempObjectId = pasteSelectedObjects.childNodes[t].getAttribute("o");
                                         var TempRowId = pasteSelectedObjects.childNodes[t].getAttribute("id");
                                         var TempRelId = pasteSelectedObjects.childNodes[t].getAttribute("r");
                                         var TempParentId = pasteSelectedObjects.getAttribute("o");
                                         var TempMarkup = pasteSelectedObjects.childNodes[t].getAttribute("status");

                                             newTemp.setAttribute("rowId",TempRowId);
                                             newTemp.setAttribute("objectId",TempObjectId);
                                             newTemp.setAttribute("relId",TempRelId);
                                             newTemp.setAttribute("parentId",TempParentId);
                                               if(TempMarkup != null){
                                                    newTemp.setAttribute("markup",TempMarkup);
                                               }

                                              //Adding all the column information for resequenced Row
                                              if(TempMarkup=="resequence"){
                                                    updateColumnInfoForAddedRows(copiedObjects,newTemp);
                                                    newTemp.setAttribute(actionForXML,target);
                                              }
                                             newNode.appendChild(newTemp);
                                        }
                                }
                                removeCutRowsForResequence();
                            }
                            else{
                                newNodeMarked.setAttribute("markup","add");
                                newNodeMarked.setAttribute(actionForXML,target);
                                //Adding all the column information for newly added row
                                 updateColumnInfoForAddedRows(copiedObjects,newNodeMarked);
                                newNode.appendChild(newNodeMarked);
                            }
                   }
      }

     if(action == "pasteAbove"||action == "pasteBelow")//start-pasteAbove
     {
             /* copiedObjects are the cloned copiedObjects having the setted Attribute values
              * pasteSelectedObjects are the pasteAbove/pastebelow selected items*/
             var parentIDofPasteRow = pasteSelectedObjects.parentNode.getAttribute("o");
             var copiedParentID = copiedObjects.getAttribute("p");
                 var copiedObjectID = copiedObjects.getAttribute("o");
                 var copiedRelID = copiedObjects.getAttribute("r");
                 var copiedRelType = copiedObjects.getAttribute("relType");
                 var copiedLevel =  copiedObjects.getAttribute("level");
                 var copiedDirection = copiedObjects.getAttribute("d");
                     var copiedSelection = copiedObjects.getAttribute("s");
                 if(copiedDirection==null){
                    copiedDirection ="";
                }
                 if(copiedSelection==null){
                    copiedSelection ="";
                 }
            var actionForXML = null
            if(action == "pasteAbove"){
                actionForXML = "paste-above"
            }else{
                actionForXML = "paste-below";
            }

                var TargetRowID = pasteSelectedObjects.getAttribute("id");

            var TargetObjectID = pasteSelectedObjects.getAttribute("o");
            var TargetRelID = pasteSelectedObjects.getAttribute("r");

                var tempRowIdAttr = pasteSelectedObjects.parentNode.getAttribute("id");
                   var newNode = postDataXML.createElement("object");
                   newNode.setAttribute("objectId",parentIDofPasteRow);
                   newNode.setAttribute("rowId",tempRowIdAttr);
                   newNode.setAttribute("lastOperation",lastOperation);
                   var rootElement= postDataXML.documentElement; //for updating the postDataXML

                      if(!differentLevel)
                      {
                         var existingRow = emxUICore.selectSingleNode(postDataXML,"/mxRoot/object[@rowId ='"+tempRowIdAttr+"' and @objectId = '" + parentIDofPasteRow + "']");
                         if(existingRow!=null && existingRow.getAttribute("markup")=="changed"){
                             existingRow = null;
                         }

                         var newNodeMarked = postDataXML.createElement("object");
                             newNodeMarked.setAttribute("rowId",IdforNewlyAddedRow);
                             newNodeMarked.setAttribute("objectId",copiedObjectID);
                             newNodeMarked.setAttribute("relId",copiedRelID);
                             newNodeMarked.setAttribute("relType",copiedRelType);
                             newNodeMarked.setAttribute("level",copiedLevel);
                                newNodeMarked.setAttribute("direction",copiedDirection);
                                newNodeMarked.setAttribute("selection",copiedSelection);
                             var target = TargetObjectID+"|"+TargetRelID+"|"+TargetRowID;
                         newNodeMarked.setAttribute(actionForXML,target);
                                var achildNodes = new Array();
                                var achildNodesForResequence = new Array();
                                if(existingRow != null){
                                    //If cutFlag=1 and resqFlag=1 it indicates Resequence
                                    if((cutFlag == 1&&resqFlag == 1)||(cutFlag == 0&&resqFlag == 1&&copyFlag == 0)){
                                            var p = 0;
                                            var m = 0;
                                                var n = 0;
                                            var iLength = existingRow.childNodes.length;
                                                //to remove all the childrens
                                                for(var k = 0;k <iLength; k++) {
                                                   if(existingRow.childNodes[0].getAttribute("markup") == "add"){
                                                        //string the edited columns values in array
                                                        achildNodes[p] = existingRow.childNodes[0];
                                                        p++;
                                                        existingRow.removeChild(existingRow.childNodes[0]);
                                                    }
                                                     else if(existingRow.childNodes[0].getAttribute("markup") == "resequence"){
                                                        //string the edited columns values in array
                                                        achildNodesForResequence[n] = existingRow.childNodes[0];
                                                        n++;
                                                        existingRow.removeChild(existingRow.childNodes[0]);
                                                }
                                                    else{
                                                        existingRow.removeChild(existingRow.childNodes[0]);
                                                    }
                                                 }
                                            var q = 0;
                                            var r =0;
                                            //to include all the childs for the resequence
                                            for(var t = 0;t <pasteSelectedObjects.parentNode.childNodes.length;t++)
                                            {
                                              var newTemp = postDataXML.createElement("object");
                                              var temp = pasteSelectedObjects.parentNode.childNodes[t];
                                                 if(temp.tagName == "r"){
                                                       var TempObjectId = pasteSelectedObjects.parentNode.childNodes[t].getAttribute("o");
                                                       var TempRowId = pasteSelectedObjects.parentNode.childNodes[t].getAttribute("id");
                                                       var TempRelId = pasteSelectedObjects.parentNode.childNodes[t].getAttribute("r");
                                                       var TempParentId = pasteSelectedObjects.parentNode.getAttribute("o");
                                                       var TempMarkup = pasteSelectedObjects.parentNode.childNodes[t].getAttribute("status");

                                                            //adding all the changed column values from the array stored
                                                          if(TempMarkup == "resequence") {
                                                              newTemp.setAttribute("rowId",TempRowId);
                                                              newTemp.setAttribute("objectId",TempObjectId);
                                                              newTemp.setAttribute("relId",TempRelId);
                                                              newTemp.setAttribute("parentId",TempParentId);
                                                              newTemp.setAttribute("markup",TempMarkup);
                                                                if(achildNodesForResequence.length!=0){
                                                                        var tempXML = achildNodesForResequence[r];
                                                                        if(TempRowId==tempXML.getAttribute("rowId")){
                                                                            existingRow.appendChild(achildNodesForResequence[r]);
                                                                            deleteElement(achildNodesForResequence,r);
                                                                        }
                                                                        else{
                                                                            existingRow.appendChild(newTemp);
                                                                            updateColumnInfoForAddedRows(copiedObjects,newTemp);
                                                                            newTemp.setAttribute(actionForXML,target);
                                                                        }
                                                                }
                                                                else{
                                                                    existingRow.appendChild(newTemp);
                                                                    updateColumnInfoForAddedRows(copiedObjects,newTemp);
                                                                    newTemp.setAttribute(actionForXML,target);
                                                                }
                                                          }
                                                          //adding all the edited  column values from the array stored
                                                          else if(TempMarkup == "add") {
                                                                 newTemp.setAttribute("rowId",TempRowId);
                                                                      newTemp.setAttribute("objectId",TempObjectId);
                                                                  newTemp.setAttribute("relId",TempRelId);
                                                                  newTemp.setAttribute("parentId",TempParentId);
                                                                  newTemp.setAttribute("markup",TempMarkup);
                                                                if(achildNodes.length!=0)
                                                                    existingRow.appendChild(achildNodes[q]);
                                                                else
                                                                    existingRow.appendChild(newTemp);
                                                                q++;
                                                          }
                                                          else{
                                                              newTemp.setAttribute("rowId",TempRowId);
                                                              newTemp.setAttribute("objectId",TempObjectId);
                                                              newTemp.setAttribute("relId",TempRelId);
                                                              newTemp.setAttribute("parentId",TempParentId);
                                                                  if(TempMarkup!= null)
                                                                  newTemp.setAttribute("markup",TempMarkup);
                                                                  //Adding all the column information for resequenced Row
                                                                  if(TempMarkup=="resequence"){
                                                                        updateColumnInfoForAddedRows(copiedObjects,newTemp);
                                                                        newTemp.setAttribute(actionForXML,target);
                                                                  }

                                                              existingRow.appendChild(newTemp);
                                                          }
                                                    }
                                             }
                                             removeCutRowsForResequence();
                                   }
                                   else{
                                       newNodeMarked.setAttribute("markup","add");
                                      newNodeMarked.setAttribute(actionForXML,target);
                                      // Adding all the column information for newly added row
                                       updateColumnInfoForAddedRows(copiedObjects,newNodeMarked);
                                       existingRow.appendChild(newNodeMarked);
                                   }
                             }
                             else
                             {
                                rootElement.appendChild(newNode);
                                if((cutFlag ==  1&&resqFlag == 1)||(cutFlag == 0&&resqFlag == 1&&copyFlag == 0)){
                                    //to include all the childs for the resequence
                                    for(var t =0;t< pasteSelectedObjects.parentNode.childNodes.length;t++){
                                        var newTemp = postDataXML.createElement("object");
                                        var temp = pasteSelectedObjects.parentNode.childNodes[t];
                                             if(temp.tagName == "r"){
                                             var TempObjectId = pasteSelectedObjects.parentNode.childNodes[t].getAttribute("o");
                                             var TempRowId = pasteSelectedObjects.parentNode.childNodes[t].getAttribute("id");
                                             var TempRelId = pasteSelectedObjects.parentNode.childNodes[t].getAttribute("r");
                                             var TempParentId = pasteSelectedObjects.parentNode.getAttribute("p");
                                             var TempMarkup = pasteSelectedObjects.parentNode.childNodes[t].getAttribute("status");

                                              newTemp.setAttribute("rowId",TempRowId);
                                              newTemp.setAttribute("objectId",TempObjectId);
                                              newTemp.setAttribute("relId",TempRelId);
                                              newTemp.setAttribute("parentId",TempParentId);
                                                     if(TempMarkup !=null){
                                                        newTemp.setAttribute("markup",TempMarkup);
                                                     }

                                                      //Adding all the column information for resequenced Row
                                                      if(TempMarkup=="resequence"){
                                                            updateColumnInfoForAddedRows(copiedObjects,newTemp);
                                                            newTemp.setAttribute(action,target);

                                                      }

                                               newNode.appendChild(newTemp);
                                          }
                                   }
                                   removeCutRowsForResequence();
                                }
                                else
                                {
                                newNodeMarked.setAttribute("markup","add");
                                // Adding all the column information for newly added row
                                updateColumnInfoForAddedRows(copiedObjects,newNodeMarked);
                                newNode.appendChild(newNodeMarked);
                                }
                            }
                    }

                   if(differentLevel){
                            var pastedRowId = pasteSelectedObjects.getAttribute("id");//getting the parent node id
                            var parentIDofPasteRow = pasteSelectedObjects.getAttribute("p");
                            var tempRowIdAttr = pasteSelectedObjects.parentNode.getAttribute("id");
                                var TargetRowID = pasteSelectedObjects.getAttribute("id");
                        var TargetObjectID = pasteSelectedObjects.getAttribute("o");
                        var TargetRelID = pasteSelectedObjects.getAttribute("r");

                            var existingRow = emxUICore.selectSingleNode(postDataXML,"/mxRoot/object[@rowId ='"+tempRowIdAttr+"' and @objectId = '" + parentIDofPasteRow + "']");
                            if(existingRow!=null && existingRow.getAttribute("markup")=="changed"){
                                 existingRow = null;
                             }

                            var newNodeMarked = postDataXML.createElement("object");
                                newNodeMarked.setAttribute("rowId",IdforNewlyAddedRow);
                                newNodeMarked.setAttribute("objectId",copiedObjectID);
                                newNodeMarked.setAttribute("relId",copiedRelID);
                                newNodeMarked.setAttribute("relType",copiedRelType);
                                newNodeMarked.setAttribute("level",copiedLevel);
                                        newNodeMarked.setAttribute("direction",copiedDirection);
                                    newNodeMarked.setAttribute("selection",copiedSelection);
                                var target = TargetObjectID+"|"+TargetRelID+"|"+TargetRowID;
                            newNodeMarked.setAttribute(actionForXML,target);

                                    if(existingRow != null){
                                        newNodeMarked.setAttribute("markup","add");
                                        //Added to update all the column information for nelwy added row
                                       updateColumnInfoForAddedRows(copiedObjects,newNodeMarked);
                                        existingRow.appendChild(newNodeMarked);
                                    }
                                    else{
                                        rootElement.appendChild(newNode);
                                        newNodeMarked.setAttribute("markup","add");
                                        // Adding all the column information for newly added row
                                        updateColumnInfoForAddedRows(copiedObjects,newNodeMarked);
                                        newNode.appendChild(newNodeMarked);
                                    }
                   }
      }


  if(action == "Undo")
  {
              //copied Objects are selected Undo parts
              var RowsChecked = copiedObjects;

              var statusofRow = RowsChecked.getAttribute("status");
              var objectId = RowsChecked.getAttribute("o");

              var parentId = RowsChecked.getAttribute("p");
              var rowId = RowsChecked.getAttribute("id");
              var UndoRow = emxUICore.selectSingleNode(postDataXML,"/mxRoot/object[@objectId = '"+parentId+"']/object[@rowId='"+rowId+"'and @objectId='"+objectId+"'and @markup='"+statusofRow+"']");

                if(UndoRow != null){
                        if(statusofRow == "add"){
                           //j u k For Recursive UNDO Opearations-START (If a newly added row removed all it's children has to be removed)
                           var tempRootXML = emxUICore.createXMLDOM();
                           tempRootXML.loadXML("<mxRoot/>");
                           var rootElement= tempRootXML.documentElement;
                           rootElement.appendChild(RowsChecked);
                           var aModifiedRows = emxUICore.selectNodes(tempRootXML,"/mxRoot//r[@status = 'cut'or @status='add'or @status='resequence'or @status='changed']");
                           var aModifiedForUndoRows = emxUICore.selectNodes(tempRootXML,"/mxRoot//r[@status='add'or @status='resequence']");
                           //Saving undoing added/resequenced rows,to remove from cache
                           saveUndoSelectedRows(aModifiedForUndoRows);
                           for(var n=0;n<aModifiedRows.length;n++){
                               var RowId = aModifiedRows[n].getAttribute("id");
                            var UndoRowofChildrenADD = emxUICore.selectSingleNode(postDataXML,"/mxRoot/object[@rowId ='"+RowId+"']");
                                     if(UndoRowofChildrenADD!=null){
                                         UndoRowofChildrenADD.parentNode.removeChild(UndoRowofChildrenADD);
                                     }
                           }
                           //Recursive UNDO END
                           UndoRow.parentNode.removeChild(UndoRow);
                           var existingNode=emxUICore.selectSingleNode(postDataXML,"/mxRoot/object[@objectId = '"+parentId+"']");
                             //Removing the total parent Node if it not has children rows
                             if(existingNode!= null){
                                 if(existingNode.childNodes.length == 0){
                                    existingNode.parentNode.removeChild(existingNode);
                                 }
                             }
                         }
                         //added to remove the attribute cut if resequnce exists
                         else if(statusofRow =="cut")
                         {
                            var TempUndoRow = emxUICore.selectSingleNode(postDataXML,"/mxRoot/object[@objectId = '"+parentId+"']");
                             var flag = 0;
                             var iTemp;
                             for(var k=0 ;k<TempUndoRow.childNodes.length; k++)
                             {
                                if(TempUndoRow.childNodes[k].getAttribute("markup")=="resequence")
                                    flag =1;
                            }
                                 if(flag == 1) {
                                    UndoRow.removeAttribute("markup");
                                  }
                                 else {
                                      UndoRow.parentNode.removeChild(UndoRow);
                                      //Removing the total parent Node if it not has children rows
                                      if(TempUndoRow!= null){
                                        if(TempUndoRow.childNodes.length == 0){
                                            TempUndoRow.parentNode.removeChild(TempUndoRow);
                                         }
                                      }

                                 }
                          }
                         //resequence... removing all the unmarked rows frm postdataxml
                         else{
                             var TempUndoRows = emxUICore.selectNodes(postDataXML,"/mxRoot/object[@objectId = '"+parentId+"']/object[@markup='"+statusofRow+"']");
                             //only 1 resequence is there remove parent node also
                             if(TempUndoRows.length == 1){
                                 var nodeExisting = emxUICore.selectNodes(postDataXML,"/mxRoot/object[@objectId = '"+parentId+"']/object[@markup='add' or @markup='cut']");
                                    //checking if it has only single resequnce as child
                                    if(nodeExisting.length == 0){
                                        var nExistingNode = emxUICore.selectSingleNode(postDataXML,"/mxRoot/object[@objectId = '"+parentId+"']");
                                             if(nExistingNode != null){
                                                 nExistingNode.parentNode.removeChild(nExistingNode);
                                             }
                                    }
                                    //If resequence+some cut/add/change markup rows exists
                                    else{
                                        var nExistingRow = emxUICore.selectSingleNode(postDataXML,"/mxRoot/object[@objectId = '"+parentId+"']");
                                        var length = nExistingRow.childNodes.length;
                                        var noMarkupRows = new Array();
                                            for(var k= 0;k <length; k++){
                                                var status = nExistingRow.childNodes[k].getAttribute("markup");
                                                    if(status == "cut"||status =="add"){
                                                        continue;
                                                    }
                                                    else {
                                                        noMarkupRows.push(nExistingRow.childNodes[k]);
                                                    }
                                            }
                                            //deleting the non markup rowe if it's last resequence
                                            if(noMarkupRows != null){
                                                for(var j=0;j<noMarkupRows.length;j++){
                                                    //not to remove the children's
                                                    //if(noMarkupRows[j].childNodes.length == 0){ // commented to remove the resequence eventhough it having the children...
                                                        noMarkupRows[j].parentNode.removeChild(noMarkupRows[j]);
                                                    //}
                                                }
                                             }
                                     }
                              }
                              //if two or more resequence list is exsiting,remove the selected resequence
                              else{
                                 var existingRow = emxUICore.selectSingleNode(postDataXML,"/mxRoot/object[@objectId = '"+parentId+"']/object[@rowId='"+rowId+"']");
                                 existingRow.parentNode.removeChild(existingRow);
                                var tempRowDetails =null;
                        var aChildrenForReseqence  = emxUICore.selectSingleNode(postDataXML,"/mxRoot/object[@objectId = '"+parentId+"']");
                        //To store all the existing nodes in aChildren array()
                        var aChildren = new Array();
                                var count =0;
                        for(var m=0;m<aChildrenForReseqence.childNodes.length;){
                                    if(aChildrenForReseqence.childNodes[0].getAttribute("status")==null){
                                        tempRowDetails = aChildrenForReseqence.childNodes[0];
                                    }
                                    aChildren[count] = aChildrenForReseqence.childNodes[0];
                                    aChildrenForReseqence.removeChild(aChildrenForReseqence.childNodes[0]);
                                    count++;
                                 }
                                 //To view the cutted row after the resequence is DONE
                                 viewCutRows(RowsChecked);
                                 var TempRowIds = tempRowDetails.getAttribute("rowId");
                                 var tempNode = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id='"+TempRowIds+"']")
                                 var parentRowId = tempNode.parentNode.getAttribute("id");
                                 var aChildRowsForParent = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id='"+parentRowId+"']")
                                 //TO Include al the children in the postDatXML for that parent
                                 for(var t = 0;t <aChildRowsForParent.childNodes.length;t++) {
                                    var temp = aChildRowsForParent.childNodes[t];
                                    var displayRowAttribute = temp.getAttribute("displayRow");
                                    if(temp.tagName == "r" && displayRowAttribute != 'false'){
                                        var tempRowID = temp.getAttribute("id");
                                        var TempObjectId = temp.getAttribute("o");
                                        var TempRelId = temp.getAttribute("r");
                                        var TempMarkup = temp.getAttribute("status");
                                        var tempResFlag =0;
                                        for(var r=0;r<aChildren.length;r++){
                                            var tempXML = aChildren[r];
                                            if( tempRowID == tempXML.getAttribute("rowId")){
                                                aChildrenForReseqence.appendChild(aChildren[r]);
                                                tempResFlag =1;
                                            }
                                        }
                                        if(tempResFlag==0 ){
                                            var newNodeMarked = postDataXML.createElement("object");
                                            newNodeMarked.setAttribute("rowId",tempRowID);
                                            newNodeMarked.setAttribute("objectId",TempObjectId);
                                            newNodeMarked.setAttribute("relId",TempRelId);
                                            if(TempMarkup!=null)
                                            newNodeMarked.setAttribute("markup",TempMarkup);
                                            aChildrenForReseqence.appendChild(newNodeMarked);
                                        }
                                    }
                        }
                        removeCutRowsForResequence();
                              }
                         }
                 }
    }
   /* Added for calc rows Feature */
   callToBuildColumValues("add");
  }
 //end-updatePostDataXMLForEdit


/* used to pre validating tha Edit opeartions like cut/paste/resequence oparations
 * aRows (Array)--perform the validations on the selected rows/parts
 * action (String)- depending on the type of action validations taken place
 * */
 function preValidationsForEdit(aRows,action)
 {
    if(aRows.length == 0){
            alert(emxUIConstants.STR_SBEDIT_NO_SELECT_NODES);
            return true;
    }
    else
    {
         for(var i=0 ;i<aRows.length ;i++){
                var nRow = aRows[i];
                var level = nRow.getAttribute("level");
                    if(action!="paste-as-child"&& action!="undo"){
                        if(level == "0"){
                           alert(emxUIConstants.STR_SBEDIT_ROOT_NODE_OPERATION);
                           return true;
                        }
                    }
                    if(action=="cut" || action=="copy"){
                        var statusofRow = aRows[i].getAttribute("status");
                        if(statusofRow == "cut"||statusofRow == "add"||statusofRow == "resequence"||statusofRow == "changed"){
                            alert(emxUIConstants.STR_SBEDIT_NO_EDIT_OPERATION);
                            return true;
                        }
                    }
                    if(action!="undo"){
                        var statusofRow = aRows[i].getAttribute("status");
                        if(statusofRow == "cut"||statusofRow == "resequence"||statusofRow == "changed"){
                            alert(emxUIConstants.STR_SBEDIT_NO_EDIT_OPERATION);
                            return true;
                        }
                    }
         }

    }
 }

/* To Unregistering the selected rows
 * aRows -Rows passed for the unSelection/unCheck of checkbox/radio boxs*/
function unRegisterSelectedRows(aRows)
{
    for(var i=0; i<aRows.length; i++){
              var oid = aRows[i].getAttribute("o");
              var id = aRows[i].getAttribute("id");
              var p = aRows[i].getAttribute("p");
              var relId = aRows[i].getAttribute("r");
              if (relId == null || relId == "null")
                   relId = "";
              if (p == null || p == "null")
                p = "";
              var strVal = relId+"|"+oid+"|"+p+"|"+id;
              FreezePaneunregister(strVal);
    }
}

/* Cut() to cut the selected part(s)
 * It uses the global array "aCopiedRowsChecked" ,to Store the "cut" part.
 * It shows the cut part with Red strike through visul cue
 * */


function cut(){
    editableTable.cut();
}

emxEditableTable.prototype.cut = function __cut(cutRowIds)
{
        aCopiedRowsChecked = new Array();
          aCopiedRowsChecked = getSelectedRowObjects(cutRowIds);

        for(var i=0; i<aCopiedRowsChecked.length; i++){
            aCopiedRowsChecked[i].setAttribute("checked", "");
        }

        //372493
        if(preValidationsForEdit(aCopiedRowsChecked)){
            aCopiedRowsChecked = new Array();
            rebuildView();
            return;
        }
        //end

        arrObjectId = new Array();
        var toolBarFrame = this;
        parent.ids = "";

        if (toolBarFrame && toolBarFrame.toolbars && toolBarFrame.toolbars.setListLinks) {
                toolBarFrame.toolbars.setListLinks( isAnyRowChecked(),'structureBrowser', editableTable.mode);
        }


        var amodfiedrowsChecked = new Array();
        amodfiedrowsChecked = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked' and (@status = 'cut'or @status='add'or @status='resequence'or @status='changed')]");
        if(amodfiedrowsChecked.length > 0){
            alert(emxUIConstants.STR_SBEDIT_NO_EDIT_OPERATION);
            aCopiedRowsChecked = new Array();
            rebuildView();
            return;
        }
        doCut(aCopiedRowsChecked);

        lastOperation = "cut";

        rebuildView();
}
//--End cut opeartion


// The function is used for cut, copy, pasteBelow, pasteAbove to get the selected rows
function getSelectedRowObjects(rowIds){
    var selectedRows = [];
    var theRoot = oXML.documentElement;
    if(rowIds && rowIds instanceof Array){
        for(var i = 0;i<rowIds.length;i++){
            var rowId = rowIds[i];
            var rowObj = getNode(theRoot,"/mxRoot/rows//r[@id='"+rowId+"']");
            if(rowObj){
                selectedRows.push(rowObj);
            }
        }
    }else{
        selectedRows  = getNodes(theRoot,"/mxRoot/rows//r[@checked='checked']");
    }
    return selectedRows;
}


/**
 * This function will cut (strikeout with red visual cue) the rows whose level ids are passed in the argument.
 * @parma aLevelIds = An array of level ids of respective rows.
 * @since V6R2011 (FTR: BOM Effectivity feature)
 */
emxEditableTable.prototype.cutRows = function __cutRows(alevelIds) {
    aCutRowsPassed = [];
    for (var i = 0; i < alevelIds.length; i++) {
        var levelId = alevelIds[i];
        aCutRowsPassed = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@id ='" + levelId + "']");
    }
    if(aCutRowsPassed.length > 0 ){
        doCut(aCutRowsPassed);
    }
}

/* doCut() to cut the selected part(s) called from cut method or directly from loadMarkUpXML function
 * It uses the global array "aCopiedRowsChecked" ,to Store the "cut" part.
 * It shows the cut part with Red strike through visul cue
 * */
function doCut(aCopiedRowsChecked,MarkUp,paramArray)
{

    var IsTrue=true;
    if(aCopiedRowsChecked.length !=0 ){
        if(!MarkUp){
        IsTrue=validateCutOperation(aCopiedRowsChecked);
    }
    if(IsTrue){
        updatePostDataXMLForEdit("cut",aCopiedRowsChecked,paramArray);
            for(var i=0;i <aCopiedRowsChecked.length; i++){
                var rowId = aCopiedRowsChecked[i].getAttribute("id");
                   if(aCopiedRowsChecked[i].getAttribute("display")=="block")
                       aCopiedRowsChecked[i].setAttribute("display","none");
                    aCopiedRowsChecked[i].setAttribute("status","cut");
            }
        }
    }
   cutFlag=1;
   resqFlag=1;
}
/* Copy() to copy the selected part(s)
 * It uses the global array "aCopiedRowsChecked" ,to copy the part in this Array()
 * */
function copy(){
    editableTable.copy();
}

emxEditableTable.prototype.copy = function __copy(copiedRowIds)
{
    aCopiedRowsChecked = new Array();
    aCopiedRowsChecked = getSelectedRowObjects(copiedRowIds);

    for(var i=0; i<aCopiedRowsChecked.length; i++){
        aCopiedRowsChecked[i].setAttribute("checked", "");
    }

    arrObjectId = new Array();
    var toolBarFrame = this;
    parent.ids = "";

    if (toolBarFrame && toolBarFrame.toolbars && toolBarFrame.toolbars.setListLinks) {
            toolBarFrame.toolbars.setListLinks( parent.ids.length > 1,'structureBrowser', editableTable.mode);
    }

    var amodfiedrowsChecked = new Array();
    amodfiedrowsChecked = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked' and (@status = 'cut'or @status='add'or @status='resequence'or @status='changed')]");
    if(amodfiedrowsChecked.length > 0){
        alert(emxUIConstants.STR_SBEDIT_NO_EDIT_OPERATION);
        aCopiedRowsChecked = new Array();
        rebuildView();
        return;
    }

    lastOperation="copy";

    cutFlag = 0;
    resqFlag = 0;
    rebuildView();

}

/* Used to delete an element from array()
 * array is the Array passed to delete element
 * n is the position of element on th Array()
 * */
function deleteElement(array, n)
{
  var length = array.length;
  if (n >= length || n<0)
    return;
  for (var i=n; i<length-1; i++)
    array[i] = array[i+1];
  array.length--;
}

/* To Store all the newly added or resequenced row(s) in Global Array to remove from the cache
*/
function saveUndoSelectedRows(undoSelectedRows){
    for(var k=0;k<undoSelectedRows.length;k++) {
        var tempStatus = undoSelectedRows[k].getAttribute("status");
        var temRowId = undoSelectedRows[k].getAttribute("id");
        if(tempStatus=="add" || tempStatus=="resequence"){
            if(aUndoPasteOrResqRows.find(temRowId) == -1)
            aUndoPasteOrResqRows.push(temRowId);
        }
    }
}
/*To remove all those newly added/resequenced rows from cache */
function removeRowsFromCache(aTempRows){
    var rowIds = null;
    if(typeof aTempRows == "undefined"){
        for(var itr=0;itr<aUndoPasteOrResqRows.length;itr++){
            if(itr==0)
                 rowIds = aUndoPasteOrResqRows[itr];
             else
                 rowIds = rowIds+":"+aUndoPasteOrResqRows[itr];
        }
    }else{
        for(var itr=0;itr<aTempRows.length;itr++){
            if(itr==0)
                 rowIds = aTempRows[itr].getAttribute("id");
             else
                 rowIds = rowIds+":"+aTempRows[itr].getAttribute("id");
        }
    }
    //TO remove the cut rows from the cache
    if(rowIds!=null){
        var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp+"&IsStructureCompare=" + isStructureCompare+"&action=remove";
        var childXML = emxUICore.getDataPost(url, "sLevelIds="+rowIds);
    }
    aUndoPasteOrResqRows = new Array();
}
/* Used to Undo the selected Edit action
 * It uses the selected row details for UNDO
 * Attribute changes/Newly Added Row/Resequeced Rows/ cut parts
 */

function undo(){
    var aRowsChecked = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked']");
    editableTable.undo(aRowsChecked);
}

emxEditableTable.prototype.undo = function __undo(aRowsChecked, withValidation)
{
    //pre validations-Start
       if(preValidationsForEdit(aRowsChecked,"undo")){
            aRowsChecked = new Array();
            rebuildView();
            return;
       }
    unRegisterSelectedRows(aRowsChecked);
   //pre validations-END
if(withValidation != false )   {
    var okMessage = confirm(emxUIConstants.STR_SBEDIT_UNDO_SELECT_NODES);
    if(okMessage == 1){
    saveUndoSelectedRows(aRowsChecked);
    for(var i=0; i<aRowsChecked.length; i++){

         var statusofRow = aRowsChecked[i].getAttribute("status");
            if( statusofRow == "cut" && statusofRow != null){
                updatePostDataXMLForEdit("Undo",aRowsChecked[i]);
            }

            if(statusofRow == "cut") {
                  aRowsChecked[i].removeAttribute("status");
                  aRowsChecked[i].removeAttribute("e");
                  if(aCopiedRowsChecked == null){
                    break;
                  }
                    for(var k=0; k<aCopiedRowsChecked.length; k++){
                            if(aCopiedRowsChecked[k]==aRowsChecked[i]){
                               deleteElement(aCopiedRowsChecked,k);
                                     if(aCopiedRowsChecked.length == 0){
                                        aCopiedRowsChecked = null;
                                     }
                            }
                            if(aCopiedRowsChecked == null){
                               break;
                            }
                     }
               //rebuildView();
            }
            if(statusofRow == "add"||statusofRow=="resequence"){
                cutFlag = 1;
                resqFlag = 1;
                aRowsChecked[i].parentNode.removeChild(aRowsChecked[i]);
                if(statusofRow == "resequence"){
                    viewCutRows(aRowsChecked[i]);
                }
                rebuildView();
            }
            if(statusofRow=="changed"){
                aRowsChecked[i].removeAttribute("e");
                aRowsChecked[i].removeAttribute("status");
                    for(var m=0; m<aRowsChecked[i].childNodes.length; m++){
                        aRowsChecked[i].childNodes[m].removeAttribute("edited");
                    }
            }

            if(statusofRow == "new" || statusofRow == "lookup"){
                _removeNewRows([aRowsChecked[i]]);
            }
            if( statusofRow != "cut" && statusofRow != "changed" && statusofRow != null){
                updatePostDataXMLForEdit("Undo",aRowsChecked[i]);
            }
    }

for (var rowid in arrUndoRows)
  {
        //checking with the rowIds's
        for(var j=0; j<aRowsChecked.length; j++)
        {
            // For the selected row only ,UNDO works
            if(rowid == aRowsChecked[j].getAttribute("id"))
                 {
                     //Updating postdatxml-start
                     var objectId = aRowsChecked[j].getAttribute("o");
                     var UndoRowAttr = emxUICore.selectSingleNode(postDataXML,"/mxRoot/object[@rowId='"+rowid+"'and @objectId='"+objectId+"']");
                     if(UndoRowAttr != null){
                        postDataXML.documentElement.removeChild(UndoRowAttr);
                     }

                     var columnInfo = arrUndoRows[rowid];
                     var xmlRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id = '" + rowid + "']");

                        for (var columnId in columnInfo)
                        {
                           var tempColumnId = new Number(columnId)+1;
                           xmlRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id = '" + rowid + "']/c[" +  tempColumnId + "]");
                              if (xmlRow == null)
                              {
                                continue;
                              }
                           if(isDynamicURLValue(columnInfo[columnId]))
                            {
                                var objDOM = emxUICore.createXMLDOM();
                                objDOM.loadXML(columnInfo[columnId]);
                                setMxLinkText(xmlRow, "");
                                var mxLinkValue = emxUICore.selectSingleNode(objDOM, "/mxRoot/mxLink");
                                xmlRow.appendChild(mxLinkValue);
                                var objDOMnew = emxUICore.createXMLDOM();
                                var mxLinkDisplayValue = emxUICore.selectSingleNode(objDOM, "/mxRoot/text()");
                                if(mxLinkDisplayValue)
                                    {
                                    var objNewText = objDOMnew.createTextNode(mxLinkDisplayValue.nodeValue);
                                    xmlRow.appendChild(objNewText);
                                    }
                                xmlRow.removeAttribute("edited");
                                xmlRow.parentNode.removeAttribute("e");
                                xmlRow.parentNode.removeAttribute("status");
                             }
                             else
                             {
                                var tempVal = columnInfo[columnId];
                                if (tempVal == null) {
                                    tempVal = "";
                                }
                                for(var itr=0; itr<xmlRow.childNodes.length; itr++) {
                                    var childNode = xmlRow.childNodes[itr];
                                    xmlRow.removeChild(childNode);
                                    itr--;
                                }
                                emxUICore.setText(xmlRow, tempVal);
                                xmlRow.removeAttribute("edited");
                                xmlRow.parentNode.removeAttribute("e");
                                xmlRow.parentNode.removeAttribute("status");
                                emxUICore.setText(xmlRow, tempVal);
                             }
                        }
                }
            }
        }
    }
    }
    else
    {
     for(var i=0; i<aRowsChecked.length; i++){
         var statusofRow = aRowsChecked[i].getAttribute("status");
         if(statusofRow == "new" || statusofRow == "lookup"){
                _removeNewRows([aRowsChecked[i]]);
            }
            if( statusofRow != "cut" && statusofRow != "changed" && statusofRow != null){
                updatePostDataXMLForEdit("Undo",aRowsChecked[i]);
            }
         }
    }
    //To remove Rows from cache
    removeRowsFromCache();
    rebuildView();
 }
/*Method to perform undo(Close) markup operation on selected row
 * It internally calls undo method by passing rows and its childNodes
 * return {void}
 * @param {void}
 */
function undoMarkUp()
{
    editableTable.undoMarkUp();
}
emxEditableTable.prototype.undoMarkUp= function __undoMarkUp()
{
    var aRowsChecked = new Array();
    aRowsChecked = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked']");
    var totalRowChecked = aRowsChecked.length;
    var sendRowtoUndo=new Array();
    for(var i=0;i<totalRowChecked;i++){
        var undoRow = aRowsChecked[i].childNodes;
        var totalChilds=undoRow.length;
        var statusOfRow = aRowsChecked[i].getAttribute("status");
        var objId = aRowsChecked[i].getAttribute("o");

        if(statusOfRow=="changed"){
            undoChangedAttribute(objId);
        }
        for(var j=0;j<totalChilds;j++){
            if(undoRow[j].tagName == "r"){
                sendRowtoUndo[0]=undoRow[j];
                var statusOfChild = undoRow[j].getAttribute("status");
                if(statusOfChild=='changed'){
                    var childId = undoRow[j].getAttribute("o");
                    undoChangedAttribute(childId);
                }
                editableTable.undo(sendRowtoUndo);
            }
        }
        sendRowtoUndo[0]=aRowsChecked[i]; //Undo the root Node too
        editableTable.undo(sendRowtoUndo);
    }
    unRegisterSelectedRows(aRowsChecked);
    rebuildView();
    }
/*Method to perform undo(Close) markup operation on selected row for changed Attribute on row
 * It update postData XML
 * return {void}
 * @param {objId}
 */

function undoChangedAttribute(objId)
{

    var checkPostDataXML = emxUICore.selectSingleNode(postDataXML,"/mxRoot/object[@objectId='"+objId+"']");
    var childNodes=checkPostDataXML.childNodes;
    for(var j = 0; j < childNodes.length ; j++){
        var k;
        var columnName = childNodes[j].getAttribute("name");
        var MxRootPath = "/mxRoot/columns//column";
        var nColumn = emxUICore.selectNodes(oXML, MxRootPath);
        for(k=0;k<nColumn.length;k++){ //To get the column id;
            var Tempname=nColumn[k].getAttribute("name");
            if(Tempname == columnName){
                k+=1;
                break;
            }
        }
        var xmlRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@o = '" + objId + "']/c[" +  k + "]");
        var setVal = xmlRow.getAttribute("a");
        emxUICore.setText(xmlRow,setVal);
        //To update postDataXML
        checkPostDataXML.parentNode.removeChild(checkPostDataXML);

}

}

/* paste as child used to paste the copied part As a child to the selected part
 * It uses the "aCopiedRowsChecked" -having all the copied parts for the Paste Operation
 * It uses aPastedRowsChecked -global array used to store the selected parts for pasting
 * */

function pasteAsChild(){
      editableTable.pasteAsChild();
}

emxEditableTable.prototype.pasteAsChild = function __pasteAsChild()
{
    var nNewRow =new Array();
    var pastedRows = new Array();
    aPastedRowsChecked=new Array();
    aPastedRowsChecked = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked']");
    unRegisterSelectedRows(aPastedRowsChecked);

        //pre validations-Start
        if(preValidationsForEdit(aPastedRowsChecked,"paste-as-child")){
            aPastedRowsChecked = new Array();
            rebuildView();
            return;
        }
        if(aCopiedRowsChecked == null||aCopiedRowsChecked.length==0 ){
            alert(emxUIConstants.STR_SBEDIT_NO_NODES_COPIED);
            rebuildView();
            return;
        }
        //pre validations-END

        if(!validatePasteOperation("paste-as-child",aPastedRowsChecked,aCopiedRowsChecked)){
            rebuildView();
            return;
        }
        pasteRels = pasteRels.reverse();
        //alert("pasteRels\n\n"+pasteRels);
        doPasteAsChild(aPastedRowsChecked,aCopiedRowsChecked);

}

/*  To get the RowXML from Bean side
    copiedRows - Array of copied/cut rows
    selectedRows - Array of selected rows for paste operation(s)
    action -pasteAschild
    datastatus -pending/success
*/
function getCopiedRowXMLFromDB(copiedRows,selectedRows,action,dataStatus,RowEditable)
{
    var strSelectedLevelIds = null;
    var cids = null;
    var objectIds = null;
    var relIds = null;
    var aRelIds = new Array();
    var aParentIds = new Array();
    var directions = null;
    var rowIdofPaste = new Array();

	// The dataStatus is not always here as an argument, it should be 'pending' by default
	if (!dataStatus) {
		dataStatus = "pending";
	}

    for(var itr =0;itr<selectedRows.length;itr++){
       if(action=="pasteAsChild"){
            if (itr == 0){
                strSelectedLevelIds = selectedRows[itr].getAttribute("id");
            }else {
                strSelectedLevelIds += ":" + selectedRows[itr].getAttribute("id");
            }
        }else{
            var rowSelected = selectedRows[itr].parentNode;
            var rowIdSelected = getMarkupParentRowId(rowSelected);
            if (itr == 0){
                strSelectedLevelIds = rowIdSelected;
                rowIdofPaste[itr] =     selectedRows[itr].getAttribute("id");
            }else {
                strSelectedLevelIds += ":" + rowIdSelected;
                rowIdofPaste[itr] =     selectedRows[itr].getAttribute("id");
            }
        }
        //Building the  pid:oid:relid:direction for each connected object
        for (var ctr = 0; ctr < copiedRows.length; ctr++) {
            if (ctr == 0) {
                objectIds = copiedRows[ctr].getAttribute("o");
                relIds = copiedRows[ctr].getAttribute("r");
                aRelIds[ctr]= relIds;
                directions = copiedRows[ctr].getAttribute("d");
            }else {
                objectIds = objectIds + ":" + copiedRows[ctr].getAttribute("o");
                relIds += ":" + copiedRows[ctr].getAttribute("r");
                aRelIds[ctr]= copiedRows[ctr].getAttribute("r");
                directions += ":"+copiedRows[ctr].getAttribute("d");
            }
            aParentIds[ctr]= copiedRows[ctr].getAttribute("p");
        }
        if (itr == 0){
            cids = objectIds + "|" + relIds + "|" + directions;
        }else {
            cids += "~" + objectIds + "|"+relIds + "|"+directions;
        }
    }
    var strData = "sLevelIds=" + strSelectedLevelIds + "&cids=" + cids;
    var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp + "&action=add" + "&dataStatus="+dataStatus+"&IsStructureCompare="+isStructureCompare;
    if(typeof dataStatus!= "undefined"&& dataStatus == "noMarkupRows"){
        url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp + "&action=add&RowEditable="+RowEditable + "&dataStatus=success&IsStructureCompare="+isStructureCompare;

    }
    var childXML = emxUICore.getXMLDataPost(url, strData);

    //To update the copied RelId,ParentId to new Cloned Nodes
    //modifiying the level if "strSelectedLevelIds" has a row group id
    var rowGrouping = false;
    if(strSelectedLevelIds.indexOf('L')!=-1){
        rowGrouping = true;
    }

    var clonedNodes = emxUICore.selectNodes(childXML,"/mxRoot/rows//r");
    for(var p=0;p<clonedNodes.length;){
        for(var st=0;st<aRelIds.length;st++){
            clonedNodes[p].setAttribute("r",aRelIds[st]);
            clonedNodes[p].setAttribute("p",aParentIds[st]);
            if(rowGrouping){
                var level = clonedNodes[p].getAttribute("level");
                level = parseInt(level);
                level++;
                clonedNodes[p].setAttribute("level",level);
            }
            p++;
        }
    }

    return childXML;
}

function expandPasteRows(aPastedRowsChecked){
    for(var k=0;k<aPastedRowsChecked.length;k++){
    var expand = aPastedRowsChecked[k].getAttribute("expand");
         if(!expand){
            var oLocalXML = emxUICore.getXMLData("../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp +
                                                                            "&levelId=" + aPastedRowsChecked[k].getAttribute("id") + "&IsStructureCompare=" + isStructureCompare+"&toolbarData=updateTableCache=true");
            if (oLocalXML) {
                var aAllRows = emxUICore.selectNodes(oLocalXML, "/mxRoot/rows/r");
                 for (var m = 0; m < aAllRows.length; m++) {
                     aPastedRowsChecked[k].appendChild(aAllRows[m].cloneNode(true));
                 }
                 aPastedRowsChecked[k].setAttribute("display", "block");
                aPastedRowsChecked[k].setAttribute("expand", "true");
            }
        }
    }
}

//--paste As child opeartion END
/* it is used to paste the copied part As a child to the selected part
 * It uses the "aCopiedRowsChecked" -having all the copied parts for the Paste Operation OR
 * row passed from loadMarkUpXML method
 * aPastedRowsChecked -global array used to store the selected parts for pasting or Row passed from loadMarkUpXML
 * */
function doPasteAsChild(aPastedRowsChecked,aCopiedRowsChecked)
{
    var nNewRow =new Array();
    var count=0;
    var columnInfo = emxUICore.selectSingleNode(oXML,"/mxRoot/columns")
    var columnChilds = columnInfo.childNodes;
      expandPasteRows(aPastedRowsChecked);
    //to clone the copied row/node
     var clonedRows = getCopiedRowXMLFromDB(aCopiedRowsChecked,aPastedRowsChecked,"pasteAsChild");
    var iClone = 0;
    var nTempvariable = 0;
    var nCopiedRowsLength = aCopiedRowsChecked.length;
    for(var i=0; i<aPastedRowsChecked.length; i++){
            var nNewRow =new Array();
            var nTempNewRows =  emxUICore.selectNodes(clonedRows,"/mxRoot/rows//r");
              for(;iClone<(nTempvariable + nCopiedRowsLength);iClone++){
                  nNewRow.push(nTempNewRows[iClone].cloneNode(true));
              }
              nTempvariable = nTempvariable + nCopiedRowsLength;
                   for(var k=0; k<nNewRow.length; k++){
                       var levelofPasteRow = aPastedRowsChecked[i].getAttribute("level");
                       var parentIDofPasteRow = aPastedRowsChecked[i].getAttribute("o");
                        var expand = aPastedRowsChecked[i].getAttribute("expand");
                        var rowID = aPastedRowsChecked[i].getAttribute("id");
                        //toggle(pastedRowId);

                       var IdforNewlyAddedRow = nNewRow[k].getAttribute("id");
                       var copiedParentID = nNewRow[k].getAttribute("p");
                       var copiedObjectID = nNewRow[k].getAttribute("o");
                       var copiedRelID = nNewRow[k].getAttribute("r");

                       nNewRow[k].setAttribute("relType",pasteRels.pop());

                       var nTempRow = nNewRow[k].cloneNode(true);
                            nTempRow.setAttribute("level",new Number(levelofPasteRow)+1);
                            nTempRow.setAttribute("p",parentIDofPasteRow);
                            //nTempRow.setAttribute("id",IdforNewlyAddedRow);
                            nTempRow.setAttribute("checked","");
                         //To determine the resequence Operation
                         if(copiedParentID == parentIDofPasteRow && cutFlag ==1 ){
                                  aPastedRowsChecked[i].appendChild(nTempRow).setAttribute("status","resequence");
                                  updatePostDataXMLForEdit("pasteAsChild",nNewRow[k],aPastedRowsChecked[i],IdforNewlyAddedRow,false);
                                  hideCutRows(nNewRow[k]);
                                  //cutFlag=0;
                                  resqFlag=2;
                                  pasteFlag=0;
                          }

                          else if(copiedParentID == parentIDofPasteRow && cutFlag == 0 && resqFlag == 2&&(copyFlag == 0 || copyFlag ==1)){
                                  alert(emxUIConstants.STR_SBEDIT_NO_RESEQ_OPERATION);
                                  rebuildView();
                                  return;
                            }else{
                                if(!expand){
                                    var oLocalXML = emxUICore.getXMLData("../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp +
                                                                            "&levelId=" + rowID + "&IsStructureCompare=" + isStructureCompare+"&toolbarData=updateTableCache=true");
                                    if (oLocalXML) {
                                        var aAllRows = emxUICore.selectNodes(oLocalXML, "/mxRoot/rows/r");
                                        for (var m = 0; m < aAllRows.length; m++) {
                                            aPastedRowsChecked[i].appendChild(aAllRows[m].cloneNode(true));
                                        }
                                        aPastedRowsChecked[i].setAttribute("display", "block");
                                        aPastedRowsChecked[i].setAttribute("expand", "true");
                                    }

                                    nTempRow.removeAttribute("displayRow");
                                    //To show the relation attributes as BLANK ..for newly added row
                                    nTempRow = showBlankRelAttribForAddedRow(nTempRow);
                                    aPastedRowsChecked[i].appendChild(nTempRow).setAttribute("status","add");
                                    }else{
                                        //To show the relation attributes as BLANK ..for newly added row
                                        nTempRow = showBlankRelAttribForAddedRow(nTempRow);
                                        nTempRow.removeAttribute("displayRow");
                                        aPastedRowsChecked[i].appendChild(nTempRow).setAttribute("status","add");
                                    }
                                    updatePostDataXMLForEdit("pasteAsChild",nNewRow[k],aPastedRowsChecked[i],IdforNewlyAddedRow,true);
                                    pasteFlag=1;
                            }
        }
        if(pasteFlag==0)
        cutFlag=0;
        rebuildView();
    }
}
//--paste As child opeartion END

/* used to assign the unique row ID for the nelwyadded row/resequeced Row
 * */
function getCurrTimeStamp()
{
    return ""+((new Date()).getTime());
}

/* pasteAbove used to paste the copied part Above to the selected part
 * It uses the "aCopiedRowsChecked" -having all the copied parts for the Paste Operation
 * aPastedRowsChecked -global array used to store the selected parts for pasting
 * */
function pasteAbove(){
      editableTable.pasteAbove();
}

emxEditableTable.prototype.pasteAbove = function __pasteAbove(rowIds)
{
    var nNewRow =new Array();
    var pastedRows=new Array();
    var count=0;
    var columnInfo = emxUICore.selectSingleNode(oXML,"/mxRoot/columns")
    var columnChilds = columnInfo.childNodes;
    aPastedRowsChecked=new Array();
    aPastedRowsChecked = getSelectedRowObjects(rowIds);

        unRegisterSelectedRows(aPastedRowsChecked);
        //pre validations-Start
        if(preValidationsForEdit(aPastedRowsChecked)){
            aPastedRowsChecked = new Array();
            rebuildView();
            return;
        }

        if(aCopiedRowsChecked == null ||aCopiedRowsChecked.length==0 ){
            alert(emxUIConstants.STR_SBEDIT_NO_NODES_COPIED);
            rebuildView();
            return;
        }
        //pre validations-end
        if(!validatePasteOperation("paste-above",aPastedRowsChecked,aCopiedRowsChecked)){
            rebuildView();
            return;
        }
        pasteRels = pasteRels.reverse();

        //to clone the copied row/node
      var iClone = 0;
      var nTempvariable = 0;
      var nCopiedRowsLength = aCopiedRowsChecked.length;
      var clonedRows = getCopiedRowXMLFromDB(aCopiedRowsChecked,aPastedRowsChecked,"pasteAbove");
      for(var i=0; i<aPastedRowsChecked.length; i++){
          var statusofRow = aPastedRowsChecked[i].getAttribute("status");
           var nNewRow =new Array();
        var nTempNewRows =  emxUICore.selectNodes(clonedRows,"/mxRoot/rows//r");
        for(;iClone<(nTempvariable + nCopiedRowsLength);iClone++){
            nNewRow.push(nTempNewRows[iClone].cloneNode(true));
        }
        nTempvariable = nTempvariable + nCopiedRowsLength;
                  for(var k=0; k<nNewRow.length; k++){
                         var levelofPasteRow = aPastedRowsChecked[i].getAttribute("level");
                         var pastedRowId = aPastedRowsChecked[i].parentNode.getAttribute("id");
                         var parentIDofPasteRow = aPastedRowsChecked[i].parentNode.getAttribute("o");
                         var selectedPastedParentID = aPastedRowsChecked[i].getAttribute("p");

                         // to update the postdata XML
                         var newNode = postDataXML.createElement("object");
                         newNode.setAttribute("objectId",parentIDofPasteRow);
                         var rootElement = postDataXML.documentElement;
                         // end-update postdataXML

                         var copiedParentID = nNewRow[k].getAttribute("p");
                         var copiedObjectID = nNewRow[k].getAttribute("o");
                         var copiedRelID = nNewRow[k].getAttribute("r");
                         nNewRow[k].setAttribute("relType",pasteRels.pop());

                         //checking weather the parent Nodes are matching
                         if(selectedPastedParentID == copiedParentID){
                              var IdforNewlyAddedRow = nNewRow[k].getAttribute("id");
                              var nTempRow = nNewRow[k].cloneNode(true);
                                  //nTempRow.setAttribute("id",IdforNewlyAddedRow);
                                  nTempRow.setAttribute("p",parentIDofPasteRow);
                                  nTempRow.setAttribute("checked","");

                                    if(cutFlag == 1 && resqFlag == 1){
                                        aPastedRowsChecked[i].parentNode.insertBefore(nTempRow,aPastedRowsChecked[i]).setAttribute("status","resequence");
                                        updatePostDataXMLForEdit("pasteAbove",nNewRow[k],aPastedRowsChecked[i],IdforNewlyAddedRow,false);
                                        hideCutRows(nNewRow[k]);
                                        copyFlag = 1;
                                        pasteFlag = 0;
                                    }
                                    else if(cutFlag == 0 && resqFlag == 1&&copyFlag == 0){
                                        aPastedRowsChecked[i].parentNode.insertBefore(nTempRow,aPastedRowsChecked[i]).setAttribute("status","resequence");
                                        updatePostDataXMLForEdit("pasteAbove",nNewRow[k],aPastedRowsChecked[i],IdforNewlyAddedRow,false);
                                        hideCutRows(nNewRow[k]);
                                        copyFlag = 2;
                                        pasteFlag = 0;
                                    }
                                    else if(cutFlag == 0 && resqFlag == 0){
                                        //To show the relation attributes as BLANK ..for newly added row
                                        nTempRow = showBlankRelAttribForAddedRow(nTempRow);
                                        nTempRow.removeAttribute("displayRow");
                                        aPastedRowsChecked[i].parentNode.insertBefore(nTempRow,aPastedRowsChecked[i]).setAttribute("status","add");
                                        updatePostDataXMLForEdit("pasteAbove",nNewRow[k],aPastedRowsChecked[i],IdforNewlyAddedRow,false);
                                    }
                                    else{
                                        alert(emxUIConstants.STR_SBEDIT_NO_RESEQ_OPERATION);
                                        rebuildView();
                                        return;
                                    }
                          }
                          // To paste the item on different Level as a simple paste
                          else{
                                var levelofPasteRow = aPastedRowsChecked[i].getAttribute("level");
                                var pastedRowId = aPastedRowsChecked[i].getAttribute("id");
                                var parentIDofPasteRow = aPastedRowsChecked[i].getAttribute("p");
                                var IdforNewlyAddedRow = nNewRow[k].getAttribute("id");

                                var nTempRow = nNewRow[k].cloneNode(true);
                                    //nTempRow.setAttribute("id",IdforNewlyAddedRow);
                                    nTempRow.setAttribute("p",parentIDofPasteRow);
                                    nTempRow.setAttribute("checked","");
                                    nTempRow.setAttribute("level",new Number(levelofPasteRow));
                                 //To show the relation attributes as BLANK ..for newly added row
                                 nTempRow = showBlankRelAttribForAddedRow(nTempRow);
                                nTempRow.removeAttribute("displayRow");
                                 aPastedRowsChecked[i].parentNode.insertBefore(nTempRow,aPastedRowsChecked[i]).setAttribute("status","add");

                                 updatePostDataXMLForEdit("pasteAbove",nNewRow[k],aPastedRowsChecked[i],IdforNewlyAddedRow,true);
                                 pasteFlag = 1;
                           }
                    }
                    if(pasteFlag==0)
                    cutFlag=0;
                    rebuildView();
      }
      rebuildView();
 }
//end-paste Above



/* pasteBelow used to paste the copied part Below to the selected part
 * It uses the "aCopiedRowsChecked" -having all the copied parts for the Paste Operation
 * aPastedRowsChecked -global array used to store the selected parts for pasting
 * */

function pasteBelow(){
      editableTable.pasteBelow();
}

emxEditableTable.prototype.pasteBelow = function __pasteBelow(rowIds)
{
    var nNewRow = new Array();
    var pastedRows = new Array();
    aPastedRowsChecked=new Array();
    var count=0;
    var columnInfo = emxUICore.selectSingleNode(oXML,"/mxRoot/columns");
    var columnChilds = columnInfo.childNodes;
    aPastedRowsChecked = getSelectedRowObjects(rowIds);

    unRegisterSelectedRows(aPastedRowsChecked);

        //pre validations-Start
        if(preValidationsForEdit(aPastedRowsChecked)){
            aPastedRowsChecked=new Array();
            rebuildView();
            return;
        }
        if(aCopiedRowsChecked == null ||aCopiedRowsChecked.length==0 ){
            alert(emxUIConstants.STR_SBEDIT_NO_NODES_COPIED);
            rebuildView();
            return;
        }
        //pre validations-END

        if(!validatePasteOperation("paste-above",aPastedRowsChecked,aCopiedRowsChecked)){
            rebuildView();
            return;
        }
        pasteRels = pasteRels.reverse();

        //to clone the copied row/node
        var iClone = 0;
        var nTempvariable = 0;
        var nCopiedRowsLength = aCopiedRowsChecked.length;
        var clonedRows = getCopiedRowXMLFromDB(aCopiedRowsChecked,aPastedRowsChecked,"pasteBelow");
   for(var i=0;i< aPastedRowsChecked.length; i++){
               var nNewRow =new Array();
            var nTempNewRows =  emxUICore.selectNodes(clonedRows,"/mxRoot/rows//r");
              for(;iClone<(nTempvariable + nCopiedRowsLength);iClone++){
                  nNewRow.push(nTempNewRows[iClone].cloneNode(true));
              }
              nTempvariable = nTempvariable + nCopiedRowsLength;
              nNewRow.reverse();
             var statusofRow = aPastedRowsChecked[i].getAttribute("status");
             var levelofPasteRow = aPastedRowsChecked[i].getAttribute("level");
             var pastedRowId = aPastedRowsChecked[i].parentNode.getAttribute("id");
             var parentIDofPasteRow = aPastedRowsChecked[i].parentNode.getAttribute("o");
             var selectedPastedParentID = aPastedRowsChecked[i].getAttribute("p");

                 for(var k=0;k<nNewRow.length;k++){

                    var pasteBelow = aPastedRowsChecked[i].nextSibling;
                    var IdforNewlyAddedRow = nNewRow[k].getAttribute("id");
                    var copiedParentID = nNewRow[k].getAttribute("p");
                    var copiedObjectID = nNewRow[k].getAttribute("o");
                    var copiedRelID = nNewRow[k].getAttribute("r");
                    nNewRow[k].setAttribute("relType",pasteRels.pop());

                    var newNode = postDataXML.createElement("object");
                    newNode.setAttribute("objectId",parentIDofPasteRow);
                    var rootElement = postDataXML.documentElement;

                    //checking weather the parent Nodes are matching
                    if(selectedPastedParentID == copiedParentID){
                        if(pasteBelow != null){
                          var nTempRow = nNewRow[k].cloneNode(true);
                          //nTempRow.setAttribute("id",IdforNewlyAddedRow);
                          nTempRow.setAttribute("p",parentIDofPasteRow);
                          nTempRow.setAttribute("checked","");

                                     if(cutFlag == 1 && resqFlag == 1){
                                         if(pasteBelow != null){
                                         pasteBelow.parentNode.insertBefore(nTempRow,pasteBelow).setAttribute("status","resequence");
                                         }
                                         else{
                                         pasteBelow.parentNode.appendChild(nTempRow).setAttribute("status","resequence");
                                         }
                                         updatePostDataXMLForEdit("pasteBelow",nNewRow[k],aPastedRowsChecked[i],IdforNewlyAddedRow,false);
                                         hideCutRows(nNewRow[k]);
                                         copyFlag = 1;
                                         pasteFlag = 0;
                                     }
                                     else if(cutFlag == 0 && resqFlag == 1 && copyFlag == 0)
                                     {
                                         if(pasteBelow != null){
                                         pasteBelow.parentNode.insertBefore(nTempRow,pasteBelow).setAttribute("status","resequence");
                                         }
                                         else{
                                         pasteBelow.parentNode.appendChild(nTempRow).setAttribute("status","resequence");
                                         }
                                         updatePostDataXMLForEdit("pasteBelow",nNewRow[k],aPastedRowsChecked[i],IdforNewlyAddedRow,false);
                                         hideCutRows(nNewRow[k]);
                                         copyFlag = 2;
                                         pasteFlag = 0;
                                     }
                                     else if(cutFlag == 0 && resqFlag == 0)
                                     {
                                          //To show the relation attributes as BLANK ..for newly added row
                                          nTempRow = showBlankRelAttribForAddedRow(nTempRow);
                                          nTempRow.removeAttribute("displayRow");
                                          pasteBelow.parentNode.insertBefore(nTempRow,pasteBelow).setAttribute("status","add");
                                          updatePostDataXMLForEdit("pasteBelow",nNewRow[k],aPastedRowsChecked[i],IdforNewlyAddedRow,false);
                                     }
                                     else
                                     {
                                         alert(emxUIConstants.STR_SBEDIT_NO_RESEQ_OPERATION);
                                         rebuildView();
                                         return;
                                     }
                         }
                         //if it is the last node in the level i.e pasteBelow is NULL
                         else{
                              var pasteBelow = aPastedRowsChecked[i];
                              var nTempRow = nNewRow[k].cloneNode(true);
                              //nTempRow.setAttribute("id",IdforNewlyAddedRow);
                              nTempRow.setAttribute("p",parentIDofPasteRow);
                              nTempRow.setAttribute("checked","");


                                       if(cutFlag == 1&& resqFlag == 1){
                                           pasteBelow.parentNode.appendChild(nTempRow).setAttribute("status","resequence");
                                           updatePostDataXMLForEdit("pasteBelow",nNewRow[k],aPastedRowsChecked[i],IdforNewlyAddedRow,false);
                                           hideCutRows(nNewRow[k]);
                                           copyFlag = 1;
                                           pasteFlag = 0;
                                       }
                                       else if(cutFlag == 0 && resqFlag == 1&& copyFlag == 0){
                                           pasteBelow.parentNode.appendChild(nTempRow).setAttribute("status","resequence");
                                           updatePostDataXMLForEdit("pasteBelow",nNewRow[k],aPastedRowsChecked[i],IdforNewlyAddedRow,false);
                                            hideCutRows(nNewRow[k]);
                                           copyFlag = 2;
                                           pasteFlag = 0;
                                       }
                                       else if(cutFlag == 0 && resqFlag == 0){
                                           //To show the relation attributes as BLANK ..for newly added row
                                           nTempRow = showBlankRelAttribForAddedRow(nTempRow);
                                           nTempRow.removeAttribute("displayRow");
                                           pasteBelow.parentNode.appendChild(nTempRow).setAttribute("status","add");
                                           updatePostDataXMLForEdit("pasteBelow",nNewRow[k],aPastedRowsChecked[i],IdforNewlyAddedRow,false);
                                       }
                                       else{
                                           alert(emxUIConstants.STR_SBEDIT_NO_RESEQ_OPERATION);
                                           rebuildView();
                                           return;
                                       }
                           }
                   }
                   // To paste the item on different Level as a simple paste
                   else{
                        var levelofPasteRow = aPastedRowsChecked[i].getAttribute("level");
                        var pastedRowId = aPastedRowsChecked[i].getAttribute("id");
                        var parentIDofPasteRow = aPastedRowsChecked[i].getAttribute("p");
                        var selectedPastedParentID = aPastedRowsChecked[i].getAttribute("p");
                              var nTempRow = nNewRow[k].cloneNode(true);
                              //nTempRow.setAttribute("id",IdforNewlyAddedRow);
                              nTempRow.setAttribute("level", levelofPasteRow);
                              nTempRow.setAttribute("p",parentIDofPasteRow);
                              nTempRow.setAttribute("checked","");
                              //To show the relation attributes as BLANK ..for newly added row
                              nTempRow = showBlankRelAttribForAddedRow(nTempRow);
                              nTempRow.removeAttribute("displayRow");
                         if(pasteBelow!= null){
                              pasteBelow.parentNode.insertBefore(nTempRow,pasteBelow).setAttribute("status","add");
                              updatePostDataXMLForEdit("pasteBelow",nNewRow[k],aPastedRowsChecked[i],IdforNewlyAddedRow,true);
                         }
                         else{
                              aPastedRowsChecked[i].parentNode.appendChild(nTempRow).setAttribute("status","add");
                              updatePostDataXMLForEdit("pasteBelow",nNewRow[k],aPastedRowsChecked[i],IdforNewlyAddedRow,true);
                         }
                         pasteFlag=1;
                   }
               }
     if(pasteFlag == 0)
     cutFlag=0;
     rebuildView();
  }

rebuildView();
}
//end-paste below



//validations

/**
 * isEditRelPassed
 */
 function isEditRelPassed() {
    var editRelList = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name='editRelationship']/text()");
    if(editRelList != null){
        return true;
    }else{
        return false;
    }
 }

/**
 * isRelPassed
 */
 function isRelPassed() {
    var relList= trim(emxUICore.getText(emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name='relationship']/text()")));
    if(relList == "*"){
        return false;
    }else{
        return true;
    }
 }
/**
 * isTypePassed
 */
 function isTypePassed() {
    var typeList= trim(emxUICore.getText(emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name='type']/text()")));
    if(typeList == "*"){
        return false;
    }else{
        return true;
    }
 }

/**
 * isExpandProgPassed
 */
 function isExpandProgPassed() {
    var expandProgram = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name='expandProgram']/text()");
    if(expandProgram != null){
        return true;
    }else{
        return false;
    }
 }

/**
 * isExpProgMenuPassed
 * @param {}
 */
 function isExpProgMenuPassed() {
    var expandProgramMenu =  emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='expandProgramMenu']/text()");
    if(expandProgramMenu != null){
        return true;
    }else{
        return false;
    }
 }

/**
 * isSelectedProgPassed
 * @param {}
 */
 function isSelectedProgPassed() {
    var selectedProgram =  emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='selectedProgram']/text()");
    if(selectedProgram != null){
        return true;
    }else{
        return false;
    }
 }

/**
 * isReseqRelPassed
 */
 function isReseqRelPassed() {
    var reseqRelList = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name='resequenceRelationship']/text()");
    if(reseqRelList != null){
        return true;
    }else{
        return false;
    }
 }

/**
 * isConnecProgPassed
 */
 function isConnecProgPassed() {
    var connProgram =  emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name='connectionProgram']/text()");
    if(connProgram != null){
        return true;
    }else{
        return false;
    }
 }


/**
 * isEditRelMatch
 * @param {String} relName
 */
 function isEditRelMatch(relName) {
    var editRelList = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name='editRelationship']/text()");
    if(editRelList != null){
        editRelList = emxUICore.getText(editRelList).split(",");
        for(var i=0; i<editRelList.length; i++) {
            if(relName == editRelList[i]){
                return true;
            }
        }
    }else{
        return false;
    }
 }

/**
 * isReseqRelMatch
 * @param {String} relName
 */
 function isReseqRelMatch(relName) {
    var reseqRelList = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name='resequenceRelationship']/text()");
    if(reseqRelList != null){
        reseqRelList = emxUICore.getText(reseqRelList).split(",");
        for(var i=0; i<reseqRelList.length; i++) {
            if(relName == reseqRelList[i]){
                return true;
            }
        }
    }else{
        return false;
    }
 }

 /**
 * getPossibleRels
 * @param {Element, Element} nChild, nParent
 */
 function getPossibleRels(nChild, nParent) {
    var parentId = getAttribute(nParent, "o");
    if(parentId == "")
    {
        parentId = getText(emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name='objectId']"));
    }
    return trim(emxUICore.getData("emxGetNameFromId.jsp?action=rellist&objectId="+nChild.getAttribute("o")+"&parentId="+parentId));
 }

/**
 * getFirstPossSchemaRel
 * @param {Element, Element} nChild, nParent
 */
 function getFirstPossibleRel(nChild, nParent) {
    return getPossibleRels(nChild, nParent).split("|")[0];

 }

/**
 * getCutMatchEditRel
 * @param {String} relName
 */
 function getCutMatchEditRel(relName) {
    if(isEditRelPassed()){
        var editRelList = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name='editRelationship']/text()");
        editRelList = emxUICore.getText(editRelList).split(",");
        for(var i=0; i<editRelList.length; i++) {
            if(relName == editRelList[i]){
                return relName;
            }
        }
        return null;
    }else{
        return null;
    }
 }


/**
 * getPasteMatchEditRel
 * @param {Element, Element} nChild, nParent
 */
 function getPasteMatchEditRel(nChild, nParent) {
    var possibleRels = getPossibleRels(nChild, nParent);
    if(possibleRels.length >= 1 && isEditRelPassed()){
        var editRelList = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name='editRelationship']/text()");
        editRelList = emxUICore.getText(editRelList).split(",");
        possibleRels = possibleRels.split("|");
        for(var i=0; i<possibleRels.length; i++) {
            for(var j=0; j<editRelList.length; j++) {
                if(editRelList[j] == possibleRels[i]){
                    return editRelList[j];
                }
            }
        }
        return null;
    }else{
        return null;
    }
 }

/**
 * getReseqMatchRel
 * @param {String} relName
 */
 function getReseqMatchRel(relName) {
    if(isReseqRelPassed()){
        var reseqRelList = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name='resequenceRelationship']/text()");
        reseqRelList = emxUICore.getText(reseqRelList).split(",");
        for(var i=0; i<reseqRelList.length; i++) {
            if(relName == reseqRelList[i]){
                return relName;
            }
        }
        return null;
    }else{
        return null;
    }
 }

/**
 * isValidForCut
 * @param {Element} cutRow
 */
 function isValidForCut(cutRow) {
    relId = cutRow.getAttribute("r");
    relName = trim(emxUICore.getData("emxGetNameFromId.jsp?action=relname&relId="+relId));
    if((isRelPassed() || isTypePassed())){
        if(isEditRelPassed()){
            if(getCutMatchEditRel(relName) != null){
                return true;
            }else{
                alert(emxUIConstants.STR_SBEDIT_NO_MATCH_EDITREL_URL);
                return false;
            }
        }else{
            alert(emxUIConstants.STR_SBEDIT_NO_EDITREL_URL);
            return false;
        }
    }else if(isExpandProgPassed() || isExpProgMenuPassed() || isSelectedProgPassed()){
        switch (cutRow.getAttribute("allowEdit")) {
            case "true":
                return true;
                break;
            case "false":
                alert(emxUIConstants.STR_SBEDIT_ALLOWEDIT_FLAG_FALSE);
                return false;
                break;
            default:
                if(isEditRelPassed()){
                    if(getCutMatchEditRel(relName) != null){
                    return true;
                    }else{
                        alert(emxUIConstants.STR_SBEDIT_NO_MATCH_EDITREL_URL);
                        return false;
                    }
                }else{
                alert(emxUIConstants.STR_SBEDIT_NO_EDITREL_URL);
                return false;
            }
                break;
        }
    }else{
        return false;
    }
 }

/**
 * isValidForResequence
 * @param {Element, Element} nChild ,nParent
 */
 function isValidForResequence(nChild, nParent) {
    relName = trim(emxUICore.getData("emxGetNameFromId.jsp?action=relname&relId="+nChild.getAttribute("r")));

    // Trim the trailing new line character as emxGetNameFromId.jsp introduces one at the last
    relName = relName.replace(/^[\r\n]+/g, "").replace(/[\r\n]+$/g, "");

    if(isConnecProgPassed()){
        if(isExpandProgPassed() || isExpProgMenuPassed() || isSelectedProgPassed()){
            switch (nParent.getAttribute("allowEdit")) {
            case "true":
                return true;
                break;
            case "false":
                alert(emxUIConstants.STR_SBEDIT_ALLOWEDIT_FLAG_FALSE);
                return false;
                break;
            default:
                if(isReseqRelPassed()){
                    if(isReseqRelMatch(relName)){
                        return true;
                    }else{
                        alert(emxUIConstants.STR_SBEDIT_NO_MATCH_RESEQREL_URL);
                        return false;
                    }
                }else{
                    alert(emxUIConstants.STR_SBEDIT_NO_RESEQREL_URL);
                    return false;
                }
                break;
            }
        }else if((isRelPassed() || isTypePassed())){
            if(isReseqRelPassed()){
                if(isReseqRelMatch(relName)){
                    return true;
                }else{
                    alert(emxUIConstants.STR_SBEDIT_NO_MATCH_RESEQREL_URL);
                    return false;
                }
            }else{
                alert(emxUIConstants.STR_SBEDIT_NO_RESEQREL_URL);
                return false;
            }
        }else{
            return false;
        }
    }else{
        alert(emxUIConstants.STR_SBEDIT_NO_CONNECTJPO_URL);
        return false;
    }
 }

/**
 * isValidForPaste
 * @param {Element, Element} nChild, nParent
 */
 function isValidForPaste(nChild, nParent) {
    if((isRelPassed() || isTypePassed())){
        if(getPossibleRels(nChild, nParent).length >= 1){
            if(isEditRelPassed()){
                if(getPasteMatchEditRel(nChild, nParent) != null){
                    pasteRels.push(getPasteMatchEditRel(nChild, nParent));
                    return true;
                }else{
                    alert(emxUIConstants.STR_SBEDIT_NO_MATCH_EDITREL_URL);
                    return false;
                }
            }else{
                alert(emxUIConstants.STR_SBEDIT_NO_EDITREL_URL);
                return false;
            }
        }else{
            alert(emxUIConstants.STR_SBEDIT_NO_POSSIBLE_REL_SCHEMA);
            return false;
        }
    }else if(isExpandProgPassed() || isExpProgMenuPassed() || isSelectedProgPassed()){
        switch (nParent.getAttribute("allowEdit")) {
            case "true":
                return true;
                break;
            case "false":
                alert(emxUIConstants.STR_SBEDIT_ALLOWEDIT_FLAG_FALSE);
                return false;
                break;
            default:
                if(getPossibleRels(nChild, nParent).length >= 1){
                    if(isEditRelPassed()){
                        if(getPasteMatchEditRel(nChild, nParent) != null){
                            pasteRels.push(getPasteMatchEditRel(nChild, nParent));
                            return true;
                        }else{
                            if(isConnecProgPassed()){
                                return true;
                            }else{
                                alert(emxUIConstants.STR_SBEDIT_NO_MATCH_EDITREL_URL);
                                return false;
                            }
                        }
                    }else{
                        if(isConnecProgPassed()){
                            return true;
                        }else{
                            alert(emxUIConstants.STR_SBEDIT_NO_EDITREL_URL);
                            return false;
                        }
                    }
                }else{
                    if(isConnecProgPassed()){
                        return true;
                    }else{
                        alert(emxUIConstants.STR_SBEDIT_NO_POSSIBLE_REL_SCHEMA);
                        return false;
                    }
                }
                break;
        }
    }else{
        return false;
    }
 }

/**
 * validateCutOperation
 * @param {}
 */
 function validateCutOperation(nRows) {
    var isValid = true;
    if(isConnecProgPassed()){
        return true;
    }else{
        for(var i=0; i<nRows.length; i++) {
            isValid = isValidForCut(nRows[i]);
            if(isValid == false){
                return false;
            }
        }
        return true;
    }
 }

 var pasteRels = new Array();
/**
 * validatePasteOperation
 * @param {String} action
 * @param {Array} pCheckedRows
 */
 function validatePasteOperation(action, pCheckedRows, nCopiedRows) {
    pasteRels = new Array();
    isValid = true;
    for(var i=0; i<pCheckedRows.length; i++) {
        for(var j=0; j<nCopiedRows.length; j++) {
            if(cutFlag == 1){//cut and paste
                if(action == "paste-as-child"){
                    if(nCopiedRows[j].parentNode == pCheckedRows[i]){
                        isValid = isValidForResequence(nCopiedRows[j],pCheckedRows[i]);
                    }else{
                        isValid = isValidForPaste(nCopiedRows[j],pCheckedRows[i]);
                    }

                }else{
                    if(nCopiedRows[j].parentNode == pCheckedRows[i].parentNode){
                        isValid = isValidForResequence(nCopiedRows[j],pCheckedRows[i].parentNode);
                    }else{
                        isValid = isValidForPaste(nCopiedRows[j],pCheckedRows[i].parentNode);
                    }
                }
            }else{
                if(action == "paste-as-child"){
                    isValid = isValidForPaste(nCopiedRows[j],pCheckedRows[i]);
                }else{
                    isValid = isValidForPaste(nCopiedRows[j],pCheckedRows[i].parentNode);
                }
            }
            if(isValid == false){
                return false;
            }
        }
    }
    return true;
 }


/* used to Update the new Relid's / visual cues using the Schema based return XML
 * objXML is the return XML ,after the postDataXML is submitted to the DB server
 * */
function  updateoXML(objXML)
{
     //alert(objXML.xml);
     var aRows =  emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@status ='cut' or @status='add' or @status='resequence'or @status='changed' or @status='new']");

     var cached = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[(@status = 'cut'or @status='add'or @status='resequence'or @status='changed' or @status='new') and (@cached='true')]");
     for(var i = 0; i < cached.length; i++)
     {
         //cached[i].removeAttribute("status");
         cached[i].removeAttribute("e");
         cached[i].removeAttribute("cached");
     }

     var action = emxUICore.selectSingleNode(objXML,"/mxRoot/action/text()");
     var strAction = emxUICore.getText(action);

    /* var data=emxUICore.selectSingleNode(objXML,"/mxRoot/data");
     var dataStatus=data.getAttribute("status");alert("datastatus"+dataStatus);
     var aItems=emxUICore.selectNodes(objXML,"/mxRoot/data//item");*/
     /*if(dataStatus=="pending"){
        alert("pending");
        return;
     }*/
        var strDataCut = null;
        var strChgdAttr = null;
        var strChgdAttrForAdd = null;
        for(var i=0; i<aRows.length; i++){
             var markup;
             var strDataAdd = null ;
             var cids = null;
             var objectIds = null;
             var relIds = null;
             var directions = null;
             var chgdRowIds =null;
             var chgdAttr = null;
             var chgdAttrForAdd = null;
             markup = aRows[i].getAttribute("status");

            if(markup == "changed" && (strAction =="success"|| strAction =="refresh")){
                aRows[i].removeAttribute("status");
                aRows[i].removeAttribute("e");
                chgdRowIds = aRows[i].getAttribute("id");
                for(var j=0,k=0;j<aRows[i].childNodes.length;j++){
                if(aRows[i].childNodes[j].tagName == "c"){
                    var value = aRows[i].childNodes[j].getAttribute("newA");
                    if(!value){
                        value = emxUICore.getText(aRows[i].childNodes[j]);
                    }

                    if(aRows[i].childNodes[j].getAttribute("date") != null){
                        value = aRows[i].childNodes[j].getAttribute("date");
                    }

                    var columnNames =emxUICore.selectNodes(oXML,"/mxRoot/columns//column");
                    if(aRows[i].childNodes[j].getAttribute("edited")=="true"){
                        var columnName  = columnNames[k].getAttribute("name");
                        if(chgdAttr!=null){
                            chgdAttr = chgdAttr+"~"+columnName+"="+value;
                        }else{
                            chgdAttr = columnName+"="+value;
                        }

                        //On save content of "msValueNew" should be put to "msValue" and "msValueNew", "newA" to be removed.
                        var tempMSValue = aRows[i].childNodes[j].getAttribute("msValueNew");
                        if(tempMSValue != null){
                            aRows[i].childNodes[j].setAttribute("msValue",tempMSValue);
                        }

                        aRows[i].childNodes[j].removeAttribute("msValueNew");
                        aRows[i].childNodes[j].setAttribute("a",value);
                        aRows[i].childNodes[j].removeAttribute("d");
                        aRows[i].childNodes[j].removeAttribute("newA");
                        aRows[i].childNodes[j].setAttribute("edited","false");
                    }
                    k++;
                    }
                }
                    if(strChgdAttr!=null){
                        strChgdAttr = strChgdAttr+"|~|"+chgdRowIds+"|`|"+chgdAttr;
                    }else{
                        strChgdAttr = chgdRowIds+"|`|"+chgdAttr;
                    }
            }
            else if(markup == "cut"){
                 var strSelectedIds = aRows[i].getAttribute("id");
                 if(strDataCut!=null)
                 strDataCut =  strDataCut+":"+ strSelectedIds;
                 else
                 strDataCut = strSelectedIds;
                aRows[i].parentNode.removeChild(aRows[i]);
            }
            else {
                //For Add
                var data = emxUICore.selectSingleNode(objXML,"/mxRoot/data");
                var dataStatus = data.getAttribute("status");
                //if(markup == "add")
                //{
                  //aRows[i].removeAttribute("status");
                //}
                //375750- LG Copy From
                var aItems = emxUICore.selectNodes(objXML,"/mxRoot/data//item[@markup = 'add' or @markup = 'resequence' or @markup = 'new']");
                var columnNames =emxUICore.selectNodes(oXML,"/mxRoot/columns//column");
                for(var k=0; k<aItems.length; k++){
                    var rowId = aItems[k].getAttribute("rowId");
                    var relId = aItems[k].getAttribute("relId");
                    var oId = aItems[k].getAttribute("oId");
                        //var aRow=emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@rowId='"+rowId+"']");
                        if((aRows[i].getAttribute("id")== rowId)&& dataStatus == "commited"){
                            aRows[i].setAttribute("r",relId);
                            aRows[i].setAttribute("o",oId);

                            if(markup == "new")
                            {
                                var cols = emxUICore.selectNodes(aRows[i],"c");
                                //while(aRows[i].childNodes.length >;
                                for(var z = 0; z < cols.length; z++) {
                                    cols[z].parentNode.removeChild(cols[z]);
                                }

                            }else
                            {

                                for(var j=0; j<aRows[i].childNodes.length; j++){
                                    if(aRows[i].childNodes[j].tagName=="c"){
                                        //juk-added ( Added for IR-159663V6R2013)
                                        if(aRows[i].childNodes[j].getAttribute("edited")=="true"){
                                            value = aRows[i].childNodes[j].getAttribute("newA");
                                        }else{
                                            value = aRows[i].childNodes[j].getAttribute("a");
                                        }
                                        // End
                                    if (!value)
                                        value = emxUICore.getText(aRows[i].childNodes[j]);

                                    if(value !=null && value != "" && aRows[i].childNodes[j].getAttribute("date") != null){
                                        value = aRows[i].childNodes[j].getAttribute("date");
                                    }
                                    var columnName  = columnNames[j].getAttribute("name");
                                    if(chgdAttrForAdd!=null){
                                        chgdAttrForAdd = chgdAttrForAdd+"~"+columnName+"="+value;
                                    }else{
                                        chgdAttrForAdd = columnName+"="+value;
                                    }
                                    aRows[i].childNodes[j].setAttribute("a",value);
                                    aRows[i].childNodes[j].removeAttribute("d");
                                    aRows[i].childNodes[j].setAttribute("edited","false");
                                  }
                                }
                            }
                        }
                  }
                  for(var j=0;j<aRows[i].childNodes.length; j++){
                        if(aRows[i].childNodes[j].tagName=="c")
                        aRows[i].childNodes[j].setAttribute("edited","false");
                    }
                    //375750- LG Copy From
                    //aRows[i].removeAttribute("status");
                        //To Update cache after the apply
                    //375750- LG Copy From




                    //TO Add the newly added row in the cache
                    //375750- LG Copy From
                    /*if(strDataAdd!=null){
                        var strData = "&sLevelIds=" + strDataAdd + "&cids=" + cids;
                        var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp + "&action=add" +"&dataStatus=success" +"&IsStructureCompare="+isStructureCompare;
                        var childXML = emxUICore.getXMLDataPost(url, strData);
                        var newRow = emxUICore.selectSingleNode(childXML,"/mxRoot/rows/r");
                        if(newRow!=null){
                            aRows[i].setAttribute("id",newRow.getAttribute("id"));
                            if(strChgdAttrForAdd!=null){
                                strChgdAttrForAdd = strChgdAttrForAdd+"|~|"+newRow.getAttribute("id")+"|`|"+chgdAttrForAdd;
                            }else{
                                strChgdAttrForAdd = newRow.getAttribute("id")+"|`|"+chgdAttrForAdd;
                            }
                        }
                    }*/
                    //To update the children of the newly added row in cache(Which are already commited in DB)
                    var aRowTobeCached = new Array();
                    var aParentRow = new Array();
                    var strTemRowId = aRows[i].getAttribute("id");
                    var aMarkupChilds = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@id='"+strTemRowId+"']//r");
                    for(var n=0;n<aMarkupChilds.length;n++){
                        aRowTobeCached[0] = aMarkupChilds[n];
                        aParentRow[0] = aMarkupChilds[n].parentNode;
                        var tempStatus = aMarkupChilds[n].getAttribute("status");
                        if(aMarkupChilds[n].tagName=="r" && (tempStatus == null ||tempStatus == "changed" )){
                            var tempChildXML = getCopiedRowXMLFromDB(aRowTobeCached,aParentRow,"pasteAsChild","noMarkupRows");
                            var tempNewRow = emxUICore.selectSingleNode(tempChildXML,"/mxRoot/rows/r");
                            aMarkupChilds[n].setAttribute("id",tempNewRow.getAttribute("id"));
                        }
                    }
            }
       }

        //375750- LG Copy From
        var arrMarkupAddParentRows = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[child::r[(@status = 'add' or @status = 'resequence' or @status = 'new') and not(@cached='true')]]");
        var arrMarkupRootParentRows = emxUICore.selectNodes(oXML,"/mxRoot/rows[child::r[@status = 'add' or @status = 'resequence' or @status = 'new' and not(@cached='true')]]");
        arrMarkupAddParentRows      = arrMarkupAddParentRows.concat(arrMarkupRootParentRows);
        for(var itr = 0 ; itr < arrMarkupAddParentRows.length; itr++){
            var nMarkupAddParentRow = arrMarkupAddParentRows[itr];
            var arrChildAddRows = emxUICore.selectNodes(nMarkupAddParentRow,"r[@status = 'add' or @status = 'resequence' or @status = 'new']");
            var objectIds = null;
            var relIds = null;
            var directions = null;
            for(var ctr = 0 ; ctr < arrChildAddRows.length; ctr++){
                if (objectIds == null) {
                        objectIds = arrChildAddRows[ctr].getAttribute("o");
                        relIds = arrChildAddRows[ctr].getAttribute("r");

                        if(arrChildAddRows[ctr].getAttribute("d")!=null){
                        directions = arrChildAddRows[ctr].getAttribute("d");
                        }
                        else{
                        directions= "";
                        }
                    }
                    else {
                        objectIds = objectIds + ":" + arrChildAddRows[ctr].getAttribute("o");
                        relIds += ":" + arrChildAddRows[ctr].getAttribute("r");

                        if(arrChildAddRows[ctr].getAttribute("d")!=null){
                        directions += ":"+arrChildAddRows[ctr].getAttribute("d");
                        }
                        else{
                        directions += ":"+"";
                        }
                    }
                    arrChildAddRows[ctr].removeAttribute("status");
                    arrChildAddRows[ctr].removeAttribute("e");
            }

            var strSelectedIds = getMarkupParentRowId(nMarkupAddParentRow);
            strSelectedIds = strSelectedIds != null ? strSelectedIds : "0";
            if(strDataAdd!=null){
                strDataAdd =  strDataAdd+":"+ strSelectedIds;
            }
            else{
                strDataAdd = strSelectedIds;
            }
            //Mixing the objectId,relId,Directions
            if(cids==null){
                cids = objectIds + "|"+relIds + "|"+directions;
            }
            else{
                cids += "~" + objectIds + "|"+relIds + "|"+directions;
            }
        }
        //375750- LG Copy From

                    //TO Add the newly added row in the cache
                    if(strDataAdd!=null){
                        var strData = "&sLevelIds=" + strDataAdd + "&cids=" + cids;
                        var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp + "&action=add" +"&dataStatus=success" +"&IsStructureCompare="+isStructureCompare;
                        var childXML = emxUICore.getXMLDataPost(url, strData);
                        var newRows = emxUICore.selectNodes(childXML,"/mxRoot/rows//r");
                        for(var i =0; i < newRows.length; i++)
                        {
                            var newRow = newRows[i];
                            var Oid1 =newRow.getAttribute("o");
                            var rid1 =newRow.getAttribute("r");
                            var pid1 =newRow.getAttribute("p");
                            var aTempRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@o='"+Oid1+"' and @r='"+rid1+"' and @p='"+pid1+"' ]");
                            if(aTempRow!=null){
                                aTempRow.setAttribute("id",newRow.getAttribute("id"));
                            }
                        }
                    }

                    //TO remove the cut rows from the cache
                    if(strDataCut!=null){
                        var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp+"&IsStructureCompare=" + isStructureCompare+"&action=remove";
                        var childXML = emxUICore.getDataPost(url, "&sLevelIds="+strDataCut);
                    }
                      //TO Update the Changed attributes in the Cache
                    if(strChgdAttr!=null){
                        var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp+"&IsStructureCompare=" + isStructureCompare+"&action=changed";
                        var childXML = emxUICore.getDataPost(url, "&sLevelIds="+strChgdAttr);
                    }
                      //TO Update the Changed attributes For Newly added Items in the Cache
                    if(strChgdAttrForAdd!=null){
                        var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp+"&IsStructureCompare=" + isStructureCompare+"&action=changed";
                        var childXML = emxUICore.getDataPost(url, "&sLevelIds="+strChgdAttrForAdd);
                    }
}



/**
 * validateAddedRowsOnApply
 * @param {void}
 */

function validateAddedRowsOnApply()
{
//  var root = oXML.documentElement;
//  var xpath = "//r[@status = 'add']";
//  var addedRows = emxUICore.selectNodes(root,xpath);
var msg = "";
var arrValidator = getAllValidators();
var len = arrValidator.length;
if(len > 0){
     for(var i = 0; i < len; i++){
        var index = arrValidator[i].getColumnIndex()+1;
        //if(isIE){index--};
        var theValidator = arrValidator[i].getColumnFunction();
        var objColumn = colMap.getColumnByIndex(index - 1);
        //375750- LG Copy From
        //dont call validate if ValidateAll=true
        var strValidateAll = objColumn.getSetting("ValidateAll");
        if(strValidateAll != undefined && strValidateAll == "true"){
            continue;
        }
        //375750- LG Copy From
        //build xpath
        var xpath = "//r[@status = 'add']/c["+ index +"]";
        //got root?
        var root = oXML;
        // get nodeList
        var nodeList = emxUICore.selectNodes(root,xpath);
        //apply validators
        var nodeListLen = nodeList.length;
        if(nodeListLen > 0){
            //loop through the nodelist
            for(var j = 0; j < nodeListLen; j++){
                //set currentCell
                var edited = nodeList[j].getAttribute("editedAfterAdd"); // For Bug 354346
                if(edited != "true") { // For Bug 354346
                //Commented  for BUG : 072836
                //currentCell.target = nodeList[j];
                //currentCell.target.setAttribute("position",index);
                currentRow = nodeList[j].parentNode;
                currentColumnPosition = index;

                //Added for BUG : 347156
                var theColumn = colMap.getColumnByIndex(index-1);
                var cellVal = nodeList[j].getAttribute("newA");
                if(!cellVal)
                {
                    if(nodeList[j].lastChild){
                        cellVal = nodeList[j].lastChild.nodeValue;
                    }else{
                        cellVal = nodeList[j].nodeValue;
                    }
                    if(cellVal == null){
                        cellVal = "";
                    }
                    if("true" == theColumn.getSetting("UOMAssociated"))
                    {
                        var splittedCellValue  = cellVal.split(" ");
                        var updatedCellValue   = splittedCellValue[0];
                        var length = updatedCellValue.length;
                        updatedCellValue      += " ";
                        updatedCellValue      += theColumn.getRangeValues(cellVal.substring(length+1));
                        cellVal = updatedCellValue;
                    }
                }
                var strInputType = theColumn.getSetting("Input Type");
                if(strInputType != undefined && strInputType == "combobox"){
                    var tempCellVal = theColumn.getRangeValues(cellVal.replace(/\s/g," "));
                    if(tempCellVal!=undefined || tempCellVal!=null){
                        cellVal = tempCellVal;
                    }
                }
                //Ended for BUG : 347156
                //alert("cellVal : "+cellVal);
                //apply the validator
                var tempCellVal = escapeValueForEval(cellVal);
                msg = eval(theValidator + "('" +tempCellVal+ "')");
                //alert("message : "+msg);
                if(msg != true){
                    //alert(msg);
                    return false;
                }
                msg = "";
            } // For Bug 354346
        }
     }
}
}
return true;

}

/**
 * getAllValidators
 * @param {void}
 */
 function getAllValidators() {
    //create an array of validators and return them
    var validatorArray = new Array();
    //loop through columns
    var len = colMap.columns.length;
    for(var i = 0; i < len; i++){
        //get validators
        var setting = colMap.columns[i].getSetting("Validate");
        var onChangeSett = colMap.columns[i].getSetting("On Change Handler");
        if(onChangeSett && onChangeSett.length > 0){
            setting = onChangeSett;
        }
        if(!!setting){
            //create a validator object
            var objValidator = new validator();
            objValidator.setColumnIndex(i);
            objValidator.setColumnName(colMap.columns[i].name);
            objValidator.setColumnFunction(setting);
            validatorArray[validatorArray.length] = objValidator;
        }
    }
    return validatorArray;
 }

/* updateColumnInfoForAddedRows
 * To Updatethe column information for the newly added row.
 * Including the all column information .
 * */
 function updateColumnInfoForAddedRows(copiedObjects,newNodeMarked)
 {
         var count=0;
         var columnInfo = emxUICore.selectSingleNode(oXML,"/mxRoot/columns")
         var columnChilds = columnInfo.childNodes;
           for(var b=0;b<columnChilds.length;b++){
                var columnName = columnChilds[b].getAttribute("name");
                var val = emxUICore.getText(copiedObjects.childNodes[b]);
                var colNode = postDataXML.createElement("column");
                    colNode.setAttribute("name",columnName);
                var textNode = postDataXML.createTextNode(val);
                    colNode.appendChild(textNode);
                    newNodeMarked.appendChild(colNode);
            }
 }
/* validateColumnsInfo
 * To validate the column information in postDataXML for the newly added rows
 * Removing the unedited rows,and sending only the edited attributes to DB
 *
 * */
function validateColumnsInfo()
{
    var columnsInfo = emxUICore.selectNodes(postDataXML,"/mxRoot/object//object[@markup='add']");
    for(var i=0;i<columnsInfo.length;i++){
        var childNodesInfo = columnsInfo[i].childNodes;
        var aDeleteCols= new Array();
        var childLength = childNodesInfo.length;
         for(var j=0;j<childLength;j++){
            var edited = childNodesInfo[j].getAttribute("edited");
            if(edited !="true"){
                aDeleteCols.push(childNodesInfo[j]);
            }
            /*else{
                childNodesInfo[j].removeAttribute("edited");
            }*/
         }
         for(var k=0;k<aDeleteCols.length;k++){
            var deleteCol = aDeleteCols[k];
            deleteCol.parentNode.removeChild(deleteCol);
         }
    }
}

emxEditableTable.prototype.getChildRowId = function __getChildRowId(prwId,cobId,crlId)
{
    var xpath = "/mxRoot//r[@id='"+ prwId +"']/r[@o='"+ cobId +"' and @r='"+ crlId +"']";
    var child = getNode(oXML,xpath);
    return child != null ? getId(child) : null;
}

 /*
* It apply MarkUp information for checked rows with visual cues
* newPostDataXML is XML returned by the url passed as parameter to this method
* @param {XML}
*/
function loadMarkUpXML(strURL,isXML)
{
    editableTable.loadMarkUpXML(strURL,isXML);
}
emxEditableTable.prototype.loadMarkUpXML = function __loadMarkUpXML(strURL,isXML)
{
    var rowsChecked =new Array();
    rowsChecked = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked']");
    var rowsCheckedSibling = null;
    if(rowsChecked[0] != null){
        rowsCheckedSibling = rowsChecked[0].nextSibling;
    }
    //If xml is passed as String to this then following block will be executed
    if(typeof isXML!='undefined' && isXML!=null ){
        var  newpostDataXML = emxUICore.createXMLDOM();
        newpostDataXML.loadXML(strURL);
        emxUICore.checkDOMError(newpostDataXML);
    }
    //If url is passed to this method then following block will be executed
    else{
        var elementToSend=document.emxTableForm.getElementsByTagName("input");
        var selectedRow="";
        var c=0;
        for(var counter=0; counter<elementToSend.length ; counter++){
            if(elementToSend[counter].name == "emxTableRowId"){
                c++;
                if(c==1){
                    selectedRow=elementToSend[counter].value;
                }else{
                    selectedRow+="&emxTableRowId=";
                    selectedRow+=elementToSend[counter].value;
                }
            }
        }
        rowsChecked = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked']");
        if(rowsChecked.length==0 ){
            alert(emxUIConstants.STR_SBMARKUP_SELECT_TO_LOADMARKUP);
            return;
        }
        var  newpostDataXML = emxUICore.getXMLData(strURL+"?emxTableRowId="+selectedRow);  //Ajax call to get the XML from the application
    }
    //alert('newpostDataXML is'+newpostDataXML.xml) //User Can check the xml return from apps by alerting this

    //fetch added rows using single server call
    //375750- LG Copy From
    var parentIdForAddedRows = "";
    var markupAddObjectIds = "";
    var addedRowsCount = 0;
    var markupParentRows = emxUICore.selectNodes(newpostDataXML.documentElement,"/mxRoot/object");
    for(var lpItr = 0; lpItr < markupParentRows.length ; lpItr++){
        var markupAddRows = emxUICore.selectNodes(markupParentRows[lpItr],"object[@markup = 'add']");
        if(markupAddRows.length!=0){
            var parentNodeOid = markupParentRows[lpItr].getAttribute("objectId");
            var pRowId        = markupParentRows[lpItr].getAttribute("rowId");
            var parentNode = null;
            if(typeof pRowId!='undefined' && pRowId!=null){
                parentNode = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@o = '" + parentNodeOid + "'][@id='"+ pRowId +"']");
            }
            else{
                parentNode = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@o = '" + parentNodeOid + "']");
            }
            // for bug IR-148139V6R2013x
            if(parentNode){
            var expand  = parentNode.getAttribute("expand");
            if(!expand){
                var oLocalXML = emxUICore.getXMLData("../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp +
                                      "&levelId=" + parentNode.getAttribute("id") +"&IsStructureCompare="+isStructureCompare+ "&toolbarData=updateTableCache=true");
                  if (oLocalXML) {
                      var aAllRows = emxUICore.selectNodes(oLocalXML, "/mxRoot/rows/r");
                      for (var i = 0; i < aAllRows.length; i++) {
                            parentNode.appendChild(aAllRows[i].cloneNode(true));
                      }
                      parentNode.setAttribute("display", "block");
                      parentNode.setAttribute("expand", "true");
                      if(parentNode.getAttribute("expandedLevels")== null){//367131
                            parentNode.setAttribute("expandedLevels", "1");
                          }
                  }
            }
            }
            // end for bug IR-148139V6R2013x
        if(parentIdForAddedRows == "" && parentNode != null){
                parentIdForAddedRows = parentNode.getAttribute("id");
        }else if(parentNode != null){
                parentIdForAddedRows += ":" + parentNode.getAttribute("id");
            }else{
            /*******Replace with existing*******/
            var immParent = emxUICore.selectSingleNode(newpostDataXML.documentElement,"/mxRoot/object/object[@objectId = '" + parentNodeOid + "']").parentNode;
            var immParentOid = immParent.getAttribute("objectId");
            var immParentDir = immParent.getAttribute("direction");
            if(immParentDir == null || typeof immParentDir == 'undefined'){
                immParentDir = "";
            }
            var immParentNode = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@o = '" + immParentOid + "']");
            var immParentNodeId = immParentNode.getAttribute("id");
            //var updatedParentRowId = getUpdatedParentRowId(parentNodeOid,immParentDir,immParentNodeId);
            updatedParentRowId = "NEW|"+parentNodeOid+"^"+immParentDir+"^"+immParentNodeId;
            parentIdForAddedRows += ":" + updatedParentRowId;
            /*******Replace with existing*******/
            }
            var childOidList = "";
            var childDirList = "";
            for(var lpCtr = 0; lpCtr < markupAddRows.length ; lpCtr++){
                var mkAddObjectId = markupAddRows[lpCtr].getAttribute("objectId");
                var mkAddDir = markupAddRows[lpCtr].getAttribute("direction");
                if(mkAddDir == null || typeof mkAddDir == 'undefined'){
                    mkAddDir = "";
                }
                if(childOidList == ""){
                    childOidList = mkAddObjectId;
                }else{
                    childOidList += ":" + mkAddObjectId;
                }
                if(childDirList == ""){
                    childDirList = mkAddDir;
                }else{
                    childDirList += ":" + mkAddDir;
                }

                markupAddRows[lpCtr].setAttribute("addedId",addedRowsCount++);
            }
            if(markupAddObjectIds == ""){
                markupAddObjectIds = childOidList + "||" + childDirList;
            }else{
                markupAddObjectIds += "~" + childOidList + "||" + childDirList;
            }
        }
    }
    var childXML = getRowFromDB(markupAddObjectIds,parentIdForAddedRows);
    var addedRows = emxUICore.selectNodes(childXML, "/mxRoot/rows/r");
    for(var x = 0; x < addedRows.length; x++)
    {
        addedRows[x].setAttribute("addedId",x);
    }

    //375750- LG Copy From
    var sendMarkUpObject=new Array();
    var theRoot = newpostDataXML;
    var aCopiedObject=new Array();
    var nMarkUpRows=emxUICore.selectNodes(theRoot, "/mxRoot/object");
    var fromMarkUp=true;
    for (var count = 0; count <nMarkUpRows.length; count++)
    {

        var nRootNodeObjId = nMarkUpRows[count].getAttribute("objectId");
        var nRootNodeMarkUp = nMarkUpRows[count].getAttribute("markup");
        var nRootNodeRowId = nMarkUpRows[count].getAttribute("rowId");
        if(nRootNodeMarkUp!=null && typeof nRootNodeMarkUp!='undefined')
        {
            if(nRootNodeMarkUp=='changed')
            {
                var nRootNodeRelId = nMarkUpRows[count].getAttribute("relId");
                var xPath = null;
                var rowId = nMarkUpRows[count].getAttribute("rowId");
                if(typeof rowId!='undefined' && rowId!=null){
                    xPath = "/mxRoot/rows//r[@o = '" + nRootNodeObjId +"'][@r='"+ nRootNodeRelId +"'][@id='"+ rowId +"']";
                }
                else{
                    xPath = "/mxRoot/rows//r[@o = '" + nRootNodeObjId +"'][@r='"+ nRootNodeRelId +"']";
                }
                var nRows = emxUICore.selectSingleNode(oXML,xPath);
                if(nRows!=null && typeof nRows!='undefined'){
                    //added for bug - 343958
                    var arrRows = new Array();
                    arrRows[0] = nRows;
                    fillupColumns(arrRows, 0, arrRows.length);
                    //added for bug - 343958 - end
                    var nRootNoderowId = nRows.getAttribute("id");
                    var checkCount;
                    var childNodes=nMarkUpRows[count].childNodes;
                    var MxRootPath = "/mxRoot/columns//column";
                    var nColumn = emxUICore.selectNodes(oXML, MxRootPath);
                    var columnCount;

                    for(var count1 = 0; count1 < childNodes.length ; count1++){
                        var nColumnToChang = childNodes[count1].getAttribute("name");
                        var nColumnValue  = childNodes[count1].getAttribute("a");
                        var dispColumnValue  = emxUICore.getText(childNodes[count1]);
                        if(nColumnValue=='undefined'|| nColumnValue== null){
                            nColumnValue = dispColumnValue;
                        }
                        for(checkCount=0;checkCount<nColumn.length;checkCount++){
                            var Tempname=nColumn[checkCount].getAttribute("name");
                            if(Tempname==nColumnToChang){
                                columnCount = checkCount+1;
                                break;
                            }
                        }
                        updatePostXML(nRows, nColumnValue,columnCount,dispColumnValue);
                        nRows.setAttribute("status","changed");
                        var columnXML = null;
                        if(typeof rowId!='undefined' && rowId!=null){
                            columnXML = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@o = '" + nRootNodeObjId + "'][@r='"+ nRootNodeRelId +"'][@id='"+rowId+"']/c[" +columnCount+ "]");
                        }
                        else{
                            columnXML = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@o = '" + nRootNodeObjId + "'][@r='"+ nRootNodeRelId +"']/c[" +columnCount+ "]");
                        }
                        if(!arrUndoRows[nRootNoderowId]) {
                            arrUndoRows[nRootNoderowId] = new Object();
                        }
                        arrUndoRows[nRootNoderowId][columnCount-1] = emxUICore.getText(columnXML); //To getback Old columnValue when reset is called
                        columnXML.setAttribute("edited","true");
                        columnXML.setAttribute("d",emxUICore.getText(columnXML)); //to set 'd' attribute on column
                        emxUICore.setText(columnXML,dispColumnValue);
                    }
                }
                currentRow = nRows;
            }
        }
        else
        {
            var nChildMarkupRow = nMarkUpRows[count].childNodes;
            for(var varCount=0;varCount < nChildMarkupRow.length; varCount++){
                var pasteAction = nChildMarkupRow[varCount].getAttribute("pasteAction");
                var rowIdForPasteAction = nChildMarkupRow[varCount].getAttribute("rowIdForPasteAction");
                var nRows=new Array();
                var checkFlag = 0;
                var tempObjectId = nChildMarkupRow[varCount].getAttribute("objectId");
                var markUpStatus = nChildMarkupRow[varCount].getAttribute("markup");
                var relType = nChildMarkupRow[varCount].getAttribute("relType");
                var strRelId = nChildMarkupRow[varCount].getAttribute("relId");
                var childRowId = nChildMarkupRow[varCount].getAttribute("rowId");
                //To include param attributes in return XML
                var paramArray = new Array();
                for(var itr = 1; itr <100 ; itr++){
                    var paramName = "param"+itr;
                    var paramValue = nChildMarkupRow[varCount].getAttribute(paramName);
                    if(paramValue!=null && typeof paramValue!='undefined'){
                        paramArray.push(paramValue);
                    }else{
                        break;
                    }
                }
                //only objectId is choosen for selecting from oXml
                var xPath = "/mxRoot/rows//r[@o = '" + tempObjectId +"']";
                var strRelId    = nChildMarkupRow[varCount].getAttribute("relId");
                //var xPath = "/mxRoot/rows//r[@o = '" + tempObjectId +"'][@r='" + strRelId +"']"; //both oid and relid is choosen
                nRows[count] = emxUICore.selectSingleNode(oXML, xPath);
                var len = nChildMarkupRow[varCount].length;

                if(markUpStatus=="cut"){
                    var xPath = "/mxRoot/rows//r[@o = '" + nRootNodeObjId +"']";
                    var nRowToCheckExpand = emxUICore.selectSingleNode(oXML,xPath);
                    var rowIDs = nRowToCheckExpand.getAttribute("id");
                    var expand = nRowToCheckExpand.getAttribute("expand");
                    if(nRowToCheckExpand!=null && typeof nRowToCheckExpand!='undefined'){
                        if(!expand){
                            var oLocalXML = emxUICore.getXMLData("../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp +
                                    "&levelId=" + rowIDs + "&IsStructureCompare=" + isStructureCompare+"&toolbarData=updateTableCache=true");
                            if (oLocalXML) {
                                var aAllRows = emxUICore.selectNodes(oLocalXML, "/mxRoot/rows/r");
                                for (var m = 0; m < aAllRows.length; m++) {
                                    nRowToCheckExpand.appendChild(aAllRows[m].cloneNode(true));
                                }
                                nRowToCheckExpand.setAttribute("display", "block");
                                nRowToCheckExpand.setAttribute("expand", "true");
                            }
                        }
                        var nRowForCut;
                        if(typeof childRowId!='undefined' && childRowId!=null){
                            nRowForCut = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@o = '" + nRootNodeObjId + "']/r[@o = '" + tempObjectId +"'][@r='"+ strRelId +"'][@id='"+childRowId+"']");
                        }else{
                            nRowForCut = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@o = '" + nRootNodeObjId + "']/r[@o = '" + tempObjectId +"'][@r='"+ strRelId +"']");
                        }
                        if(typeof nRowForCut=='undefined' || nRowForCut==null){
                            alert(emxUIConstants.STR_SBMARKUP_NO_OBJ_TO_CUT);
                        }else{
                            sendMarkUpObject[0]=nRowForCut;
                            unRegisterSelectedRows(sendMarkUpObject);
                            doCut(sendMarkUpObject,fromMarkUp);//Call doCut  to perform the cut operation
                            checkFlag++;

                            //IR-038291
                            if(paramArray!=null & typeof paramArray!='undefined'){
                                updateParamValue(nRootNodeObjId,paramArray,nRowForCut.getAttribute("id"));
                            }
                        }
                    }
                }

                else if(markUpStatus=="add"){
                    var strDir = nChildMarkupRow[varCount].getAttribute("direction"); //Added Newly
                    var addedId = getAttribute(nChildMarkupRow[varCount], "addedId");
                    if(cutFlag>0){
                        cutFlag = 0;
                    }
                    var rowToAdd = null;
                    if(typeof nRootNodeRowId!='undefined' && nRootNodeRowId!=null){
                        rowToAdd = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@o = '" + nRootNodeObjId + "'][@id='"+nRootNodeRowId+"']");
                    }
                    else {
                        rowToAdd = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@o = '" + nRootNodeObjId + "']");
                    }
                    var expand = rowToAdd.getAttribute("expand");
                    var id = rowToAdd.getAttribute("id");
                    //To Toggle the parent node if it's not toggled intially
                    if(!expand){
                        var oLocalXML = emxUICore.getXMLData("../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp +
                                "&levelId=" + id +"&IsStructureCompare="+isStructureCompare+ "&toolbarData=updateTableCache=true");

                        if (oLocalXML) {
                            var aAllRows = emxUICore.selectNodes(oLocalXML, "/mxRoot/rows/r");
                            for (var i = 0; i < aAllRows.length; i++) {
                                rowToAdd.appendChild(aAllRows[i].cloneNode(true));
                            }
                            rowToAdd.setAttribute("display", "block");
                            rowToAdd.setAttribute("expand", "true");
                            if(rowToAdd.getAttribute("expandedLevels")== null){//367131
                                rowToAdd.setAttribute("expandedLevels", "1");
                            }
                        }
                    }
                    var dataStatus = "pending";
                    var strSelectedLevelIds =null;
                    if(rowToAdd!=null){
                        strSelectedLevelIds=rowToAdd.getAttribute("id");
                        if(strDir!=null && typeof strDir!='undefined'){
                            var cids = tempObjectId + "||" + strDir;
                        }else{
                            var cids = tempObjectId + "||" + ""; //direction is assigned to "to"
                        }
                        //375750- LG Copy From
                        //var childXML = getRowFromDB(cids,strSelectedLevelIds);
                        var id = rowToAdd.getAttribute("id");
                        var levelOfRow = rowToAdd.getAttribute("level");
                        var objID  = rowToAdd.getAttribute("o");
                        nRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + id + "']");
                        var expand = nRow.getAttribute("expand");

                        if(dataStatus == "pending"){
                            //375750- LG Copy From
                            var aAllRows = emxUICore.selectNodes(childXML.documentElement, "/mxRoot/rows//r[@o = '" + tempObjectId + "'][@pid = '" + id + "'][@addedId='" + addedId + "']");
                            var xPath = "/mxRoot/rows//r[@id = '" + nRow.getAttribute("id") + "']";

                            for (var i = 0; i < aAllRows.length; i++){
                                var newRowID = aAllRows[i].getAttribute("id");
                                aAllRows[i] = updateColumnForMarkUp(aAllRows[i],nChildMarkupRow[varCount],"getXML");
                                aAllRows[i].setAttribute("status","add");
                                aAllRows[i].setAttribute("relType",relType);
                                aAllRows[i].setAttribute("p",nRootNodeObjId);
                                aAllRows[i].setAttribute("level",new Number(levelOfRow)+1);
                                for (var ir = 0; ir < rowsChecked.length; ir++) {
                                    if(pasteAction == "pasteAbove"){
                                        if(rowsChecked[ir].getAttribute("id") == rowIdForPasteAction){
                                            rowsChecked[ir].parentNode.insertBefore(aAllRows[i].cloneNode(true),rowsChecked[ir]);
                                            break;
                                        }
                                    }else if(pasteAction == "pasteBelow"){
                                        if(rowsChecked[ir].getAttribute("id") == rowIdForPasteAction){
                                            rowsCheckedSibling = rowsChecked[ir].nextSibling;
                                            if(rowsCheckedSibling && rowsCheckedSibling != null){
                                                rowsCheckedSibling.parentNode.insertBefore(aAllRows[i].cloneNode(true),rowsCheckedSibling)
                                            }else{
                                                rowToAdd.appendChild(aAllRows[i].cloneNode(true));
                                            }
                                            break;
                                        }
                                    }else{
                                        rowToAdd.appendChild(aAllRows[i].cloneNode(true));
                                        break;
                                    }
                                }
                                if(rowsChecked.length == 0){
                                    var xPathForPaste = "/mxRoot/rows//r[@id = '" + rowIdForPasteAction +"']";
                                    var selectedRowForPaste = emxUICore.selectSingleNode(oXML,xPathForPaste);
                                    if(pasteAction == "pasteAbove"){
                                        if(selectedRowForPaste!=null){
                                            selectedRowForPaste.parentNode.insertBefore(aAllRows[i].cloneNode(true),selectedRowForPaste);
                                            break;
                                        }
                                    }else if(pasteAction == "pasteBelow"){
                                        if(selectedRowForPaste){
                                            rowsCheckedSibling = selectedRowForPaste.nextSibling;
                                            if(rowsCheckedSibling && rowsCheckedSibling != null){
                                                rowsCheckedSibling.parentNode.insertBefore(aAllRows[i].cloneNode(true),rowsCheckedSibling)
                                            }else{
                                                rowToAdd.appendChild(aAllRows[i].cloneNode(true));
                                            }
                                        }
                                    }else{
                                        rowToAdd.appendChild(aAllRows[i].cloneNode(true));
                                    }
                                }
                                updatePostDataXMLForEdit("pasteAsChild",aAllRows[i],rowToAdd,newRowID,true);
                                updateColumnForMarkUp(aAllRows[i],nChildMarkupRow[varCount],"update");
                                //To update param Values sent from apps
                                if(paramArray!=null & typeof paramArray!='undefined'){
                                    updateParamValue(nRootNodeObjId,paramArray,newRowID);
                                }
                            }
                        }
                    }
                }//Add markup function end here

                //Added code for resequence-Starts
                else if(markUpStatus=="resequence"){
                    var xPath = "/mxRoot/rows//r[@o = '" + nRootNodeObjId +"']";
                    var nRowToCheckExpand = emxUICore.selectSingleNode(oXML,xPath);
                    var rowIDs = nRowToCheckExpand.getAttribute("id");
                    var expand = nRowToCheckExpand.getAttribute("expand");
                    if(nRowToCheckExpand!=null && typeof nRowToCheckExpand!='undefined'){
                        if(!expand || expand==null){

                            var oLocalXML = emxUICore.getXMLData("../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp +
                                    "&levelId=" + rowIDs +"&IsStructureCompare=" + isStructureCompare +"&toolbarData=updateTableCache=true");
                            if (oLocalXML) {
                                var aAllRows = emxUICore.selectNodes(oLocalXML, "/mxRoot/rows/r");
                                for (var m = 0; m < aAllRows.length; m++) {
                                    nRowToCheckExpand.appendChild(aAllRows[m].cloneNode(true));
                                }
                                nRowToCheckExpand.setAttribute("display", "block");
                                nRowToCheckExpand.setAttribute("expand", "true");
                            }
                        }
                        rebuildView();
                        var rowToResequence = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@o = '" + nRootNodeObjId + "']/r[@o = '"+tempObjectId+"']");
                        if(typeof rowToResequence!='undefined' && rowToResequence!=null){
                            updatePostDataXMLForResequence(nChildMarkupRow[varCount],rowToResequence,nRootNodeObjId);
                            updateColumnForMarkUp(rowToResequence,nChildMarkupRow[varCount],"update",true);
                            rowToResequence.setAttribute("status","resequence");
                        }
                    }
                }
                //Added code for resequence-Ends
            }
            if(checkFlag>0){
                cutFlag = 1;
            }
        }
    }
    if(rowsChecked.length!=0 ){
        unRegisterSelectedRows(rowsChecked); //to uncheck checked Rows
    }
    rebuildView();
}
function updatePostDataXMLForResequence(markUpRow,RowsChecked,pId)
{
    var xPath = "/mxRoot//object[@objectId = '" + pId + "']";
    var rowOnPostDataXML = emxUICore.selectNodes(postDataXML, xPath);
    var rootElement = postDataXML.documentElement;
    if(typeof rowOnPostDataXML!='undefined' && rowOnPostDataXML!=null){
        var newParent=postDataXML.createElement("object");
        newParent.setAttribute("objectId",pId);
        var nChild = postDataXML.createElement("object");
        var copiedObjectID=RowsChecked.getAttribute("o");
        var copiedRelID=RowsChecked.getAttribute("r");
        var copiedRowId=RowsChecked.getAttribute("id");

        nChild.setAttribute("rowId",copiedRowId);
        nChild.setAttribute("objectId",copiedObjectID);
        nChild.setAttribute("relId",copiedRelID);
        nChild.setAttribute("markup","resequence");
        updateColumnInfoForAddedRows(RowsChecked,nChild); //To update all columns informations
        newParent.appendChild(nChild);
    }
    rootElement.appendChild(newParent);
}
/*This function update the postdata xml to include
 * Parameters passed from application
 *
 */
function updateParamValue(oParentId,paramArray,newRowID)
{
    //query with rowId to support same object added more than once to the same parent
    var xPath = "/mxRoot/object[@objectId = '" + oParentId + "']//object[@rowId = '" + newRowID + "']";
    var rowForUpdate = emxUICore.selectSingleNode(postDataXML, xPath);
    for(var count=1;count<=paramArray.length;count++){
        var paramName = "param"+count; //Dynamically create attributes to update postDataXML
        rowForUpdate.setAttribute(paramName,paramArray[count-1]);
    }
}
function getRowFromDB(cids,strSelectedLevelIds)
{
    var strData = "sLevelIds=" + strSelectedLevelIds + "&cids=" + cids;
    var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp +"&IsStructureCompare="+isStructureCompare+ "&action=add" + "&dataStatus=pending";
    var childXML = emxUICore.getXMLDataPost(url, strData);
    return childXML;
}
function updateColumnForMarkUp(aAllRows,markUpRow,action,Isresequence)
{
    var childNodes=markUpRow.childNodes;
    var nColumn = emxUICore.selectNodes(oXML, "/mxRoot/columns//column");
    var aAllRow = aAllRows.childNodes;
    for(var i=0;i<childNodes.length;i++){
        var columnName=childNodes[i].getAttribute("name");
        var IsEdited = childNodes[i].getAttribute("edited");
        //IR-076028V6R2012
        var actualVal= null;
        actualVal = childNodes[i].getAttribute("a");
        if(actualVal == null){
            actualVal = emxUICore.getText(childNodes[i]);
        }
        var displayVal= null;
        displayVal = emxUICore.getText(childNodes[i]);
        for(var k=0;k<nColumn.length;k++){
            var Tempname=nColumn[k].getAttribute("name");
            if(Tempname==columnName){
                if(Isresequence){
                    aAllRow[k].removeAttribute("a");
                }
                emxUICore.setText(aAllRow[k],displayVal);

                if(IsEdited=='true'){
                    aAllRow[k].setAttribute("edited","true");
                }
                //Added for making edited as true
                if(action=="update" && IsEdited ){
                        updatePostXML(aAllRow[k], actualVal,k+1);
                }
            }
        }
    }
    return aAllRows;
}
/*
* It returns a postdataXML for checked rows
* to save as markUp to the calling application
* @param {void}
*/
function getMarkUpXML()
{
    editableTable.getMarkUpXML();
}
emxEditableTable.prototype.getMarkUpXML = function __getMarkUpXML()
{
    var markUpXML = emxUICore.createXMLDOM();
    markUpXML.loadXML("<mxRoot/>");
    var xPath = "/mxRoot/object";
    var theRoot = markUpXML.documentElement;
    var nRows = emxUICore.selectNodes(postDataXML, xPath);
    for(var counter=0;counter<nRows.length;counter++){
    if(nRows[counter]!=null){
        var markUpRow= nRows[counter].cloneNode(true);
        theRoot.appendChild(markUpRow);
        }
    }
    var spaceChar = String.fromCharCode(160);
    var temp1 = emxUICore.selectNodes(markUpXML,"/mxRoot//column");
    for(var k=0;k<temp1.length;k++){
        var tempC =  temp1[k];
        var txe = emxUICore.getText(tempC);
        emxUICore.setText(tempC,txe.replace(new RegExp(spaceChar, "g"), " "));
        }
    return markUpXML;
}
//emxDynamicDiv class
function emxDynamicDiv(){
    //properties
    this.shadowDiv      = null;
    this.floatingDiv    = null;
    this.srcEvent       = null;
    this.currentEvent   = null;
    this.parentElement  = null;
    this.maxHeight      = 100;
    this.maxWidth       = 220;
    this.tableName      = null;
    this.colIndex       = null;
    this.theColumn      = null;
    this.colType        = null;
}

//The DynamicDiv Object
var mouseOverDiv = new emxDynamicDiv;

//function to create the floating div
emxDynamicDiv.prototype.createFloatingDiv = function _emxDynamicDiv_createFloatingDiv(e){
    if(this.floatingDiv != null)
    {
        this.destroyFloatingDiv();
    }
    this.setEvent(e);
    var targetNode = this.srcEvent.target;
    var targetName = targetNode.tagName.toLowerCase();
    if(emxUIRTE.RTE_TAGS.find(targetName) != -1){
        do{
            targetNode = targetNode.parentNode;
            targetName = targetNode.tagName.toLowerCase();
        }while(targetName != "td");
    }
    this.srcEvent.target = targetNode;
    if(this.srcEvent.target.tagName == "IMG" || this.srcEvent.target.tagName == "INPUT" || this.srcEvent.target.tagName == "DIV")
    {
        return;
    }
    if(this.srcEvent.target.innerHTML.toLowerCase().indexOf("input") > -1){
        return;
    }
    if(!(this.colType == "programHTMLOutput" || this.colType == "Image") && this.srcEvent.target.innerHTML == ""){
        return;
    }
    this.parentElement = this.srcEvent.target;

    this.floatingDiv = document.createElement("div");
    this.shadowDiv = document.createElement("div");
    this.floatingDiv.name = "mouseOverDiv";
    //we can use a class for div styles
    this.floatingDiv.className = "mx_mouseOverPopupDiv";
    this.shadowDiv.className = "mx_mouseOverShadowDiv";

    document.body.appendChild(this.floatingDiv);
    document.body.appendChild(this.shadowDiv);
    attachEventHandler(this.floatingDiv,"mouseover",function(){mouseOverDiv.setCurrentEvent(0)});
    attachEventHandler(this.floatingDiv,"mouseout",closeDiv);
    attachEventHandler(this.shadowDiv,"mouseover",function(){mouseOverDiv.setCurrentEvent(0)});
    attachEventHandler(this.shadowDiv,"mouseout",closeDiv);
    if(this.srcEvent.target.tagName == "A" || this.srcEvent.target.tagName == "SPAN"){
        this.srcEvent.target = this.srcEvent.target.parentNode;
    }
    if(this.floatingDiv){
        if((this.colType == "programHTMLOutput" || this.colType == "Image") && (typeof this.theColumn.getAttribute("alt") != "undefined")){
            this.floatingDiv.innerHTML = this.theColumn.getAttribute("alt");
        }else{
            this.floatingDiv.innerHTML = this.srcEvent.target.innerHTML;
        }
        this.floatingDiv.style.height = parseInt(this.floatingDiv.offsetHeight) >= 100 ? "100px" : "auto";
        this.floatingDiv.style.width = parseInt(this.floatingDiv.offsetWidth) >= 220 ? "220px" : "auto";
        if(parseInt(this.floatingDiv.offsetHeight) >= 100){
            this.floatingDiv.style.height = "102px";
            this.floatingDiv.style.overflowY = "auto";
        }
        if(parseInt(this.floatingDiv.offsetWidth) >= 220){
            this.floatingDiv.style.width = "222px";
            this.floatingDiv.style.overflowX = "auto";
        }
        this.floatingDiv.style.top = this.getYPos()+"px";
        this.floatingDiv.style.left = this.getXPos()+"px";
        this.shadowDiv.style.top = (parseInt(this.floatingDiv.style.top)+3)+"px";
        this.shadowDiv.style.left = (parseInt(this.floatingDiv.style.left)+3)+"px";
        this.shadowDiv.style.height = parseInt(this.floatingDiv.offsetHeight)+"px";
        this.shadowDiv.style.width = parseInt(this.floatingDiv.offsetWidth)+"px";
        this.shadowDiv.style.visibility = "visible";
        this.floatingDiv.style.visibility = "visible";
        this.floatingDiv.style.display = "block";
    }
}

//function to destroy the div
emxDynamicDiv.prototype.destroyFloatingDiv = function _emxDynamicDiv_destroyFloatingDiv(){
    if(this.floatingDiv){
            this.floatingDiv.parentNode.removeChild(this.floatingDiv);
            this.shadowDiv.parentNode.removeChild(this.shadowDiv);
            this.floatingDiv = null;
        }
}

//function to set the current event
emxDynamicDiv.prototype.setCurrentEvent = function _emxDynamicDiv_setCurrentEvent(timerId){
    if(this.currentEvent != null){
            clearTimeout(this.currentEvent);
        }
        this.currentEvent = timerId;
}
//function to set serEvent
emxDynamicDiv.prototype.setEvent = function _emxDynamicDiv_setEvent(e){
    this.srcEvent = e;
}

//function to set serEvent
emxDynamicDiv.prototype.isMouseOverDivEnabled = function _emxDynamicDiv_isMouseOverDivEnabled(target){
    try{
        var targetNode = target;
        var targetName = targetNode.tagName.toLowerCase();
        if(emxUIRTE.RTE_TAGS.find(targetName) != -1){
            do{
                targetNode = targetNode.parentNode;
                targetName = targetNode.tagName.toLowerCase();
            }while(targetName != "td");
        }
        target  = targetNode;
        this.colIndex = target.getAttribute("position")-1;
        if(target.tagName == "A" || target.tagName == "DIV" || target.tagName == "SPAN"){
            this.colIndex = target.parentNode.getAttribute("position")-1;
        }
        if (this.colIndex < 0) { // Why does this happen?
            return false;
        }
        this.theColumn = colMap.getColumnByIndex(this.colIndex);
        this.colType = this.theColumn .getSetting("Column Type");
        var tmp = this.theColumn.getSetting("Mouse Over Popup");
        if(tmp && tmp.toLowerCase() == "enable"){
            return true;
        }else{
            return false;
        }
    }catch(e){
        //do nothing
    }
}

//function to get the x-pos of the dynamic div
emxDynamicDiv.prototype.getXPos = function _emxDynamicDiv_getXPos(e){
    var divBody = document.getElementById("mx_divBody");
    var ww = parseInt(divBody.offsetWidth);//body width
        var dw = parseInt(this.floatingDiv.offsetWidth);//div width
        var num = this.srcEvent.clientX + dw;
        if(num > ww){
            this.srcEvent.clientX -= dw;
        }
        if(this.srcEvent.clientX < 0){
            this.srcEvent.clientX = 0;
        }
        return this.srcEvent.clientX;
}

//function to get the y-pos of the dynamic div
emxDynamicDiv.prototype.getYPos = function _emxDynamicDiv_getYPos(e){
    var divBody = document.getElementById("mx_divBody");
    var wh = parseInt(divBody.offsetHeight);//body height
        var dh = parseInt(this.floatingDiv.offsetHeight);//div height
        var num = this.srcEvent.clientY + dh;
        if(num > wh){
            this.srcEvent.clientY -= dh;
        }
        if(this.srcEvent.clientY < 0){
            this.srcEvent.clientY = 0;
        }
        return this.srcEvent.clientY;
}

//end of DynamicDiv object
function launchDiv(){
    var oEvent = {
        clientX:emxUICore.getEvent().clientX,
        clientY:emxUICore.getEvent().clientY,
        target:emxUICore.getEvent().target
    };
    if(!mouseOverDiv.isMouseOverDivEnabled(oEvent.target)){
        return;
    }
    oEvent.target.setAttribute("title","");
    mouseOverDiv.setCurrentEvent(setTimeout(function(){mouseOverDiv.createFloatingDiv(oEvent)},1000));
}

function closeDiv(){
    mouseOverDiv.setCurrentEvent(setTimeout(function(){mouseOverDiv.destroyFloatingDiv()},500));
}

/*To perform Synchronization
@param {dir}
*/
//Added for progress indicator
function synchronize(syncDir){

	if(portalMode == "true"){
		toggleProgress("visible");
	}else{
		turnOnProgress();
	}

	setTimeout(function(){
		synchronizeTimeout(syncDir);
	}, 10);
}

function synchronizeTimeout(syncDir)
{
    var cBoxArray = new Array();
    var checkboxes = getCheckedCheckboxes();
    for (var e in checkboxes){
            cBoxArray[cBoxArray.length] = e;
    }
    for(var itr = 0; itr < cBoxArray.length; itr++) {
        var aIds = cBoxArray[itr].split("|");
        var id = aIds[3];
        var nRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + id + "']");
        var checkLevel = nRow.getAttribute("level");
        if(checkLevel=='0'){
            alert(emxUIConstants.STR_SBCOMPARE_ROOT_OBJ_CANT_SYNC);
            var checkedRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked']");
            unRegisterSelectedRows(checkedRows);
            rebuildView();
            return;
        }
        var tempUndoRow = nRow.cloneNode(true);
        var totalChilds=tempUndoRow.childNodes.length;
        var removeFlag=0;
        for(var i=0;i<totalChilds;i++){
            if(tempUndoRow.childNodes[i].tagName == "r"){
                tempUndoRow.removeChild(tempUndoRow.childNodes[i]);
                totalChilds = tempUndoRow.childNodes.length;
                i--
            }
        }
        for(var i=0; i<tempUndoRow.childNodes.length; i++) {
            var columnInfo = tempUndoRow.childNodes[i];
            var sLevelId = tempUndoRow.getAttribute("id");
            if (columnInfo) {
                if(!arrUndoRows[sLevelId]) {
                    arrUndoRows[sLevelId] = new Object();
                }
                if(!arrUndoRows[sLevelId][i]) {
                    var objDOM = emxUICore.createXMLDOM();
                    objDOM.loadXML(columnInfo.xml);
                    var cNode = emxUICore.selectSingleNode(objDOM, "/c/mxLink");
                    var val;
                    if(cNode) {
                        var mxLinkValue = emxUICore.selectSingleNode(objDOM, "/c/text()");
                        arrUndoRows[sLevelId][i] = "<mxRoot>" + cNode.xml + mxLinkValue.xml + "</mxRoot>";
                    }else {
                        arrUndoRows[sLevelId][i] = emxUICore.getText(columnInfo)+"|"+columnInfo.getAttribute("i");
                    }
                }
            }
        }

        var syncStatus = nRow.getAttribute("syncDone");
        if(syncStatus == "true"){
            continue;
        }else{
            nRow.setAttribute("syncDone","true");
        }
        doSynch(nRow,syncDir);
    }
    var checkedRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked']");
    unRegisterSelectedRows(checkedRows);
    rebuildView();
    
    if(portalMode == "true"){
    	setTimeout('toggleProgress("hidden")', 10);
    }else{
    	setTimeout("turnOffProgress()", 10);
    }
}

function doSynch(nRow,syncDir)
{
    try{
        //var checkedRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked']");
        //fillupColumns(checkedRows, 0, checkedRows.length);
        var rColVal = new Array();
        var lColVal = new Array();
        var id = nRow.getAttribute("id");
        var matchresult = nRow.getAttribute("matchresult");
        var rowColumns = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@id = '" + id + "']/c");
            var columnCount = rowColumns.length;
            var columnHalf = columnCount/2;
            var k = columnHalf;
            var dispValRHS, actualValRHS, dispValLHS, actualValLHS, rSideImage, lSideImage;
            for( var temp = 0 ; temp < columnHalf ; temp++ ){
                rSideImage = rowColumns[k].getAttribute('i');
                rSideImage = rSideImage ? rSideImage : "";
                lSideImage = rowColumns[temp].getAttribute('i');
                lSideImage = lSideImage ? lSideImage : "";

                dispValLHS = trim(emxUICore.getText(rowColumns[temp]));
                dispValLHS = dispValLHS ? dispValLHS : "";
                dispValRHS = trim(emxUICore.getText(rowColumns[k]));
                dispValRHS = dispValRHS ? dispValRHS : "";

                actualValLHS = trim(rowColumns[temp].getAttribute('a'));
                actualValLHS = actualValLHS ? actualValLHS : "";
                actualValRHS = trim(rowColumns[k].getAttribute('a'));
                actualValRHS = actualValRHS ? actualValRHS : "";

                if(actualValLHS || dispValLHS || lSideImage){
                    lColVal.push((actualValLHS + "|" + dispValLHS + "|" + lSideImage));
                }else{
                    lColVal.push("empty");
                }

                if(actualValRHS || dispValRHS || rSideImage){
                    rColVal.push((actualValRHS + "|" + dispValRHS + "|" + rSideImage));
                }else{
                    rColVal.push("empty");
                }
                k++;
            }
            if(matchresult!='common'){
                if( syncDir == matchresult ){
                    deleteRowForSynch(nRow,syncDir,rColVal,lColVal,rowColumns); //Connection Program need to be passed to the same
                }
                else{
                    addRowForSynch(nRow,syncDir,rColVal,lColVal,rowColumns);
                }
            }else{
                modifyRowForSynch(nRow,syncDir,rColVal,lColVal,rowColumns);
            }
    } catch(e){
        alert(emxUIConstants.STR_JS_ExceptionIs + " "+ e.message);
    }
}
var syncDataXML = emxUICore.createXMLDOM();
syncDataXML.loadXML("<mxRoot/>");

function addRowForSynch(nRow,syncDir,rColVal,lColVal,rowColumns)
{
    var newNode = syncDataXML.createElement("column");
    var leftColSize = lColVal.length;
    var rightColSize = rColVal.length;
    var columnCount = rowColumns.length;
    var halfpart = columnCount/2;
    nRow.setAttribute("syncDone","true");
    nRow.setAttribute("status","add"); //added for markup while perform sync operation
    var MxRootPath = "/mxRoot/columns//column";
    var nColumn = colMap.columns;//emxUICore.selectNodes(oXML, MxRootPath);
    var i = 0;
    var syncStart, syncEnd, syncColumnData;
    if(syncDir=='right'){
        syncStart = halfpart;
        syncEnd = columnCount;
        syncColumnData = lColVal;
    }else{
        syncStart = 0;
        syncEnd = halfpart;
        syncColumnData = rColVal;
                    }
	
	//Added for sync entire row
    var syncType = "businessobject";
    var isSyncEntireRow = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='syncEntireRow']/text()");
    if(isSyncEntireRow != null){
        if(isSyncEntireRow.nodeValue == "true" || isSyncEntireRow.nodeValue == "TRUE"){
            syncType = isSyncEntireRow.nodeValue;
        }
    }
	
    for( var temp=syncStart ; temp < syncEnd ; temp++ ){
            var columnNode= syncDataXML.createElement("column");
        if(syncColumnData[i] != "empty"){
            var colSplit = syncColumnData[i].split("|");
            if(colSplit[2]){
                rowColumns[temp].setAttribute("i",colSplit[2]);
                    }
            rowColumns[temp].setAttribute("a",colSplit[0]);
            emxUICore.setText(rowColumns[temp],colSplit[1]);
                    columnNode.setAttribute("name",nColumn[i].getAttribute("name"));
            emxUICore.setText(columnNode,colSplit[0]);
			
			if(nColumn[i].getAttribute("type") != syncType){
                        newNode.appendChild(columnNode);
                    }
			
            rowColumns[temp].setAttribute("columnSynch","true"); //Added temp
        }
        i++;
    }
    updateSyncXML("add",nRow,syncDir,newNode);
}
function deleteRowForSynch(nRow,syncDir,rColVal,lColVal,rowColumns)
{
    nRow.setAttribute("syncDone","true");
    nRow.setAttribute("status","cut"); //added for markup while perform sync operation
    var leftColSize = lColVal.length;
    var rightColSize = rColVal.length;
    var columnCount = rowColumns.length;
    /*var halfpart = columnCount/2;
    var i = 0;
    if(syncDir=="right"){
        for( var temp=halfpart ; temp < columnCount ; temp++ ){
            //rowColumns[temp].removeAttribute('i');
            //emxUICore.setText(rowColumns[temp],"");
        }
    }
    else{
        for(var temp=0 ; temp < halfpart ; temp++ ){
            //rowColumns[temp].removeAttribute('i');
           // emxUICore.setText(rowColumns[temp],"");
    }
    }*/
    updateSyncXML("cut",nRow,syncDir); //No column information is sent
}
/*method to modify columns info */

function modifyRowForSynch(nRows,syncDir,rColVal,lColVal,rowColumns)
{
    nRows.setAttribute("syncDone","true");
    var newNode = syncDataXML.createElement("column");
    var leftColSize = lColVal.length;
    var rightColSize = rColVal.length;
    var columnCount = rowColumns.length;
    var halfpart = columnCount/2;
    var i = 0;
    var MxRootPath = "/mxRoot/columns//column";
    var nColumn = colMap.columns;//emxUICore.selectNodes(oXML, MxRootPath);
    var syncStart, syncEnd, syncColumnData;

    //Added for sync entire row
    var syncType = "businessobject";
    var isSyncEntireRow = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='syncEntireRow']/text()");
    if(isSyncEntireRow != null){
        if(isSyncEntireRow.nodeValue == "true" || isSyncEntireRow.nodeValue == "TRUE"){
            syncType = isSyncEntireRow.nodeValue;
        }
    }

    if(syncDir=="right"){
        syncStart = halfpart;
        syncEnd = columnCount;
        syncColumnData = lColVal;
    }else if(syncDir=="left"){
        syncStart = 0;
        syncEnd = halfpart;
        syncColumnData = rColVal;
    }
    for( var temp=syncStart ; temp < syncEnd ; temp++ ){
                var columnNode= syncDataXML.createElement("column");
        var colSplit = syncColumnData[i].split("|");
    	//var tempVar 	= emxUICore.getText(rowColumns[temp]);
    	var tempAcVal 	= trim(rowColumns[temp].getAttribute('a'));
    	
        if(colSplit[0] == "empty"){
            colSplit[0] = "";
            colSplit[1] = "";
        }

    	if(colSplit[0] != tempAcVal)
                {
            if(nColumn[i].getAttribute("type") != syncType){
                emxUICore.setText(rowColumns[temp],colSplit[1]);
                rowColumns[temp].setAttribute("a", colSplit[0]);
                        rowColumns[temp].setAttribute("columnSynch","true");
                        rowColumns[temp].setAttribute("edited","true");//will be deleted
                        columnNode.setAttribute("name",nColumn[i].getAttribute("name"));
                        emxUICore.setText(columnNode,colSplit[0]);
                        newNode.appendChild(columnNode);
                    }
                }
        i++
    }
    updateSyncXML("changed",nRows,syncDir,newNode);
}
function updateSyncXML(action,nRows,syncDir,ColumnNodes)
{
    var matchResult = nRows.getAttribute("matchresult");
    var rootElement = syncDataXML.documentElement;
    if(syncDir=='right'){
        if(matchResult == 'common'){
            var objId  =  nRows.getAttribute("o2");
            var objPid = nRows.getAttribute("p2");
            var objRelId = nRows.getAttribute("r2");
        }else{
            var objPid = nRows.parentNode.getAttribute("o2");
            if(objPid == null){
                objPid = nRows.parentNode.getAttribute("o");
            }
            var objId  =  nRows.getAttribute("o");
            var objRelId = nRows.getAttribute("r");
        }
        var objRowId = nRows.getAttribute("id");

    }else{
        if(matchResult == 'common'){
            var objId  =  nRows.getAttribute("o");
            var objPid = nRows.getAttribute("p");
            var objRelId = nRows.getAttribute("r");
        }else{
            var objPid = nRows.parentNode.getAttribute("o");
            var objId = nRows.getAttribute("o");
            var objRelId = nRows.getAttribute("r");
        }
        var objRowId = nRows.getAttribute("id");
    }
    //Creating Synch Data XML
    var newNode = syncDataXML.createElement("object");
    newNode.setAttribute( "objectId" ,objPid);
    var newObjEle = syncDataXML.createElement("object");
    newObjEle.setAttribute("objectId",objId);
    newObjEle.setAttribute("relId",objRelId);
    newObjEle.setAttribute("rowId",objRowId);
    newObjEle.setAttribute("markup",action);  //these  are new attributes on Object
    newObjEle.setAttribute("syncDir",syncDir); //these  are new attributes on Object
    newObjEle.setAttribute("matchresult",matchResult);//these  are new attributes on Object
    
    var syncType = "false";
    var isSyncEntireRow = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='syncEntireRow']/text()");
    if(isSyncEntireRow != null){
        if(isSyncEntireRow.nodeValue == "true" || isSyncEntireRow.nodeValue == "TRUE"){
            syncType = isSyncEntireRow.nodeValue;
        }
    }
    
    if("true" != syncType){
    if(action=='add'){
        var getRelToConnect = trim(emxUICore.getData("emxGetNameFromId.jsp?action=rellist&objectId="+objId+"&relId="+objRelId+"&parentId="+objPid));
        newObjEle.setAttribute("relType",getRelToConnect);
    }
    }
    
    if(action!='changed'){
    newNode.appendChild(newObjEle);
    }
    if(action!='cut'){
        childNodeXML= ColumnNodes.childNodes.length;
        for(var j=0;j<childNodeXML;j++){
            var tempXML = ColumnNodes.childNodes[j];
            newObjEle.appendChild(ColumnNodes.childNodes[j].cloneNode(true));
        }
    }

    //Incase of modify no need of parent. Directly append child Object which is modified
    if(action=='changed' &&typeof ColumnNodes!='undefined'){
        rootElement.appendChild(newObjEle);
    }
    else{
        rootElement.appendChild(newNode);
    }

   //Only incase of delete column informations are not appended to syncXML
 }


function resetSyncEdits(){
	
    //if Sync data is not modified, just return
    if(!isSynchDataModified()){
        alert(emxUIConstants.STR_SBCOMPARE_NOOBJ_TO_RESET);
        return;
    }
    //Bug -344297
    if(!confirm(emxUIConstants.STR_SYNC_RESET_MSG))
    {
        return;
    }
    
    if(portalMode == "true"){
		toggleProgress("visible");
	}else{
		turnOnProgress();
	}
	
	setTimeout(function(){
		resetSyncEditsTimeout();
    }, 10);
}

function resetSyncEditsTimeout()
{
    
    for (var rowid in arrUndoRows) {
        var columnInfo = arrUndoRows[rowid];
        var xmlRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id = '" + rowid + "']");
        
        if(xmlRow != null){ //Added for IE issue.
        xmlRow.removeAttribute("syncDone");
        xmlRow.removeAttribute("status");
        }
        
        for (var columnId in columnInfo) {
            var tempColumnId = new Number(columnId) + 1;
            xmlCell = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id = '" + rowid + "']/c[" +  tempColumnId + "]");
            if (xmlCell == null) {
                continue;
            }
            if(isDynamicURLValue(columnInfo[columnId])) {
                var objDOM = emxUICore.createXMLDOM();
                objDOM.loadXML(columnInfo[columnId]);
                setMxLinkText(xmlCell, "");
                var mxLinkValue = emxUICore.selectSingleNode(objDOM, "/mxRoot/mxLink");
                xmlCell.appendChild(mxLinkValue);
                var objDOMnew = emxUICore.createXMLDOM();
                var mxLinkDisplayValue = emxUICore.selectSingleNode(objDOM, "/mxRoot/text()");
                if(mxLinkDisplayValue) {
                    var objNewText = objDOMnew.createTextNode(mxLinkDisplayValue.nodeValue);
                    xmlCell.appendChild(objNewText);
                }
            }
            else {
                var tempVal = columnInfo[columnId].split("|")[0];
                var typeImage = columnInfo[columnId].split("|")[1];
                if (tempVal == null) {
                    tempVal = "";
                }
                emxUICore.setText(xmlCell, tempVal);
                if(typeImage != null && typeImage != "" && typeImage != "null"){
                    xmlCell.setAttribute("i",typeImage);
                }else{
                    xmlCell.removeAttribute("i");
                }
                xmlCell.removeAttribute("columnSynch");
            }
        }
    }
    arrUndoRows = new Object();
    syncDataXML.loadXML("<mxRoot/>");
   /* var checkedRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked']");
    unRegisterSelectedRows(checkedRows);*/
    rebuildView();
    
    if(portalMode == "true"){
    	setTimeout('toggleProgress("hidden")', 10);
    }else{
    	setTimeout("turnOffProgress()", 10);
    }
}

function openPreviousPage()
{
    var prevURL = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='prevURL']/text()");
    //alert(prevURL.nodeValue);
    window.location.href = prevURL.nodeValue;
}


function applySyncEdits(){
	
    //if Sync data is not modified, just return
    if(!isSynchDataModified()){
        alert(emxUIConstants.STR_SBCOMPARE_NOOBJ_TO_APPLY);
        return;
    }
	
	if(portalMode == "true"){
		toggleProgress("visible");
	} else {
		turnOnProgress();
	}
	
	setTimeout(function(){
		applySyncEditsTimeout();
    }, 10);
}

function applySyncEditsTimeout()
{
    performXMLDataPost("emxFreezePaneProcessXML.jsp?isSync=true&timeStamp="+timeStamp+ "&strSortColumnNames=" + sortColumnList + globalStrData, syncDataXML);
    //var checkedRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked']");
   // unRegisterSelectedRows(checkedRows);
    rebuildView();
	
	if(portalMode == "true"){
    	setTimeout('toggleProgress("hidden")', 10);
    }else{
    	setTimeout("turnOffProgress()", 10);
    }
}

function isSynchDataModified()
{
    var retLength = 0;
    var root = syncDataXML;
    var existingObjNode = emxUICore.selectSingleNode(root,"/mxRoot/object");
    if(existingObjNode != null){
        retLength = syncDataXML.documentElement.childNodes.length;
    }
    return retLength;
}

function updateColumnForAddToSelected(actualRow,responseXMLItem,action)
{
    //get all the column values from the response XML
    var nChangeColumns = responseXMLItem.childNodes;
    for(var i=0; i<actualRow.childNodes.length; i++) {
        var columnName=colMap.getColumnByIndex(i).getAttribute("name");
        for(var j=0; j<nChangeColumns.length; j++) {
            var tempName=nChangeColumns[j].getAttribute("name");
            if(tempName==columnName){
                var actualVal = nChangeColumns[j].getAttribute("actual");
                var isHTML = (nChangeColumns[j].getAttribute("isHTML") == "true")?true:false;
                var displayVal;
                if(isHTML){
                    displayVal = nChangeColumns[j].childNodes[0].cloneNode(true);
                }else{
                    displayVal = emxUICore.getText(nChangeColumns[j]);
                }
                if(displayVal == null){
                     displayVal = "";
                }
                if(actualVal == null){
                     actualVal = displayVal;
                }
                //update the column info of the child XML using the response XML
                if(isHTML){
                    if(action == "view"){
                        actualRow.childNodes[i].appendChild(displayVal);
                    }
                }else{
                    emxUICore.setText(actualRow.childNodes[i],displayVal);
                }
                actualRow.childNodes[i].setAttribute("edited","true");
                if(action=="update"){
                    updatePostXML(actualRow.childNodes[i], actualVal,i+1);
                }
            }
        }
    }
    return actualRow;
}

function updateoXMLForSync(xmlResponse)
{
	var aRows = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@syncDone = 'true']");
	var aItems = emxUICore.selectNodes(xmlResponse,"/mxRoot/data//item");
	var oxmlRowsLen = aRows.length;

	for(var i=0; i<oxmlRowsLen; i++){

		var oxmlRowId = aRows[i].getAttribute("id");
		aRows[i].removeAttribute("syncDone");
		
		var itemsRowLen = aItems.length;

		for(var k=0; k<itemsRowLen; k++){

			var rowId = aItems[k].getAttribute("rowId");
			var oId = aItems[k].getAttribute("oId");
			var pId = aItems[k].getAttribute("pId");
			var relId = aItems[k].getAttribute("relId");
			var markup = aItems[k].getAttribute("markup");
			var syncDir = aItems[k].getAttribute("syncDir");

			if((oxmlRowId == rowId)){

				if(markup == "add"){
					var diffcode 	= aRows[i].getAttribute("diffcode");
					var omxlOId 	= aRows[i].getAttribute("o");

					//Code added for removing re-seq row if another reseq is synced
					if("RESEQ" == diffcode){
						var reSeqRows = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@diffcode = 'RESEQ' and not(@id = '" + oxmlRowId + "')]");
						var reSeqRowslen = reSeqRows.length;
						for(var r=0; r < reSeqRowslen; r++){
							var oid = reSeqRows[r].getAttribute("o")
							if(oId == oid){
								reSeqRows[r].setAttribute("displayRow","false");
							}
						}
					}

					aRows[i].setAttribute("matchresult","common");
					aRows[i].removeAttribute("syncDone");
					aRows[i].removeAttribute("status");

					if(syncDir == "right" || syncDir == "left"){
						aRows[i].setAttribute("o2",oId);
						aRows[i].setAttribute("r2",relId);
						aRows[i].setAttribute("p2",pId);
					}
					//aRows[i].removeAttribute("matchresult");
					var childNodes = aRows[i].childNodes;
					for(var j=0;j<childNodes.length;j++){
						if(childNodes[j].tagName == "c"){
							childNodes[j].removeAttribute("columnSynch");
						}

					}
				}else if(markup == "cut"){
					
					aRows[i].setAttribute("displayRow","false");
					
				}else if(markup == "changed"){
					var childNodes = aRows[i].childNodes;
					aRows[i].removeAttribute("syncDone");
					for(var j=0;j<childNodes.length;j++){
						if(childNodes[j].tagName == "c"){
							childNodes[j].removeAttribute("compareResult");
							childNodes[j].removeAttribute("columnSynch");
							childNodes[j].removeAttribute("edited");
						}
					}
				}else if("refresh" == markup){ //Addded to remove markup if row is not synced.. specially for delete operation
					aRows[i].removeAttribute("syncDone");
					aRows[i].removeAttribute("status");
				}
			}
		}
	}

	//code added for removing row from compare page
	aRows 	= emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@displayRow='false']");
	oxmlRowsLen = aRows.length;
	var selectedLevelIds = "";

	for(var i=0; i<oxmlRowsLen; i++){
		var oxmlRowId = aRows[i].getAttribute("id");
		aRows[i].parentNode.removeChild(aRows[i]);

		if (i==0) {
			selectedLevelIds = oxmlRowId;
		}else {
			selectedLevelIds += ":" + oxmlRowId;
		}
	}

	if(oxmlRowsLen >0){
		var strData = "&sLevelIds=" + selectedLevelIds;
		var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp+"&action=remove&IsStructureCompare="+isStructureCompare;
		emxUICore.getDataPost(url, strData);
	}
}
/* To Hide the cut row if it is resequenced
 * */
function hideCutRows(copiedRow)
{
    var objectId = copiedRow.getAttribute("o");
    var relId = copiedRow.getAttribute("r");
    var rowCut =  emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@o ='"+objectId+"' ][@r = '"+relId+"'][@status='cut']");
    if(rowCut!=null){
        rowCut.setAttribute("displayRow","false");
        rebuildView();
    }
}
/* If user undo the resequenced row...show the cut for that row.
 * */
function viewCutRows(copiedRow)
{
    var objectId = copiedRow.getAttribute("o");
    var relId = copiedRow.getAttribute("r");
    var rowCut =  emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@o ='"+objectId+"' ][@r = '"+relId+"'][@status='cut']");
    if(rowCut!=null){
        rowCut.removeAttribute("status");
        rowCut.setAttribute("displayRow","true");
        rebuildView();
    }
}

/* To Update the postDataXML
 * Removal of the cut row from postDataXML ,if it is resequenced.
 *
 * */

function removeCutRowsForResequence()
{   var aRows = new Array();
    aRows =  emxUICore.selectNodes(postDataXML,"/mxRoot/object//object[@markup='resequence']");
    var iLength = aRows.length;
    for(var i=0;i<iLength; i++){
        var objectId = aRows[i].getAttribute("objectId");
        var relId = aRows[i].getAttribute("relId");
        var aRow = emxUICore.selectSingleNode(postDataXML,"/mxRoot/object//object[@objectId='"+objectId+"'][@relId='"+relId+"'][@markup ='cut']");
        //alert(aRow.xml);
        if(aRow!=null)
        aRow.parentNode.removeChild(aRow);
    }
}

/* To show the newly added row's relationship attributes as BLANK
 *
 * */
 function showBlankRelAttribForAddedRow(nNewRow)
 {
    var count=0;
    var columnInfo = emxUICore.selectSingleNode(oXML,"/mxRoot/columns")
    var columnChilds = columnInfo.childNodes;

    //To show the relation attributes as BLANK ..for newly added row
    for(var p=0;p<nNewRow.childNodes.length;p++){
        if(nNewRow.childNodes[p].tagName != "r"){
            for(var b=0;b<columnChilds.length;b++){
                var columnType = columnChilds[b].getAttribute("typeofColumn");
                if(columnType == "relationship"){
                    emxUICore.setText(nNewRow.childNodes[b],"");
                }
            }
        }
    }
    return nNewRow;
 }


function removedeletedRows(response)
{

    var responseDOM = emxUICore.createXMLDOM();
    responseDOM.loadXML(response);
    emxUICore.checkDOMError(responseDOM);

    var deletedRows    = emxUICore.selectNodes(responseDOM, "/mxRoot/item");
    var strSelectedIds = "";

    if(!deletedRows.length)
        return;

   var checkboxes = getCheckedCheckboxes();
    for (var i = 0; i < deletedRows.length; i++)
    {
        var id = deletedRows[i].getAttribute("id");
         for (var e in checkboxes)
         {
             var aId    = e.split("|");
             var rowid  = aId[3];
             if(id == rowid) {
                postDataStore(e, "remove");
                break;
             }
         }

        var nRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + id + "']");
        if(nRow) {
            if(nRow.parentNode)
                nRow.parentNode.removeChild(nRow);
        }
        //When row is removed that row should be removed from postDataXML also
        //start
        nRow = emxUICore.selectNodes(postDataXML, "/mxRoot//object[@rowId = '" + id + "']");
        //For loop is required for multiple root object
         for (var itr = 0; itr < nRow.length; itr++)
         {
            var currentRow = nRow[itr];
             if(currentRow) {
                if(currentRow.parentNode)
                    currentRow.parentNode.removeChild(currentRow);
             }
         }
        //end
        if (i==0) {
            strSelectedIds = id;
        }
        else {
            strSelectedIds += ":" + id;
        }
    }

    var strData = "sLevelIds=" + strSelectedIds;
    var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp+"&IsStructureCompare=" + isStructureCompare+"&action=remove";

    var childXML = emxUICore.getDataPost(url, strData);
    // so recalculate display rows again.
    aDisplayRows = getDisplayRows();
    totalRows = aDisplayRows.length;
    var nTotalRows = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name = 'total-rows']");
    emxUICore.setText(nTotalRows, totalRows);

    // redraw table and tree part
        if (displayView != "tree") {
    rebuildView();
    reloadGSB = true;
        } else {
			for (var i = 0; i < deletedRows.length; i++) {
				var delId = deletedRows[i].getAttribute("id");
				var foundNode = findNode(tree.root, delId);
            if (foundNode.parent.children.length == 1) {
                foundNode.parent.body.el.children[1].style.visibility = "hidden";
            }
            foundNode.parent.removeChild(foundNode);
        }
        }

    var checkedRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked = 'checked']");
    if(!checkedRows.length)
    {
        resetToolbarLinks();
        if(getTopWindow().retainedSearch)  {
            getTopWindow().retainedSearch.storeSelected(parent.ids,"~");
        }
    }else
    {
        parent.ids = "";
        var objCheckbox = new Object();
        objCheckbox.checked = true;
        doFreezePaneChecks(objCheckbox, checkedRows, 0, checkedRows.length);
    }
    applyExistingAutoFilterSelections();
}

/*
* It user to get the object id's that are selected by the user and forwards to emxTabl.jsp
* @param {void}
*/
function triggerValidation()
{
        var sCheckObj = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked']");
        var sObjectId = new Array();
        for(i=0;i<sCheckObj.length;i++)
        {
            sObjectId.push(sCheckObj[i].getAttribute("o"));
        }
        showModalDialog("../common/emxTable.jsp?table=AEFValidateTrigger&program=emxTriggerValidationBase:getCheckTriggers&header=emxFramework.Label.TriggerValidation&customize=false&multiColumnSort=false&objectBased=false&SubmitURL=emxTriggerIntermediatePage.jsp&SubmitLabel=emxFramework.Button.Next&Style=dialog&CancelLabel=emxFramework.Button.Cancel&CancelButton=true&multipleObjects=true&selectedObjIds="+sObjectId.toString()+"&selection=multiple&HelpMarker=emxhelptriggervalidationrules", 850, 750, true);
}
/*
 * Method to update the row xml as a string for a given id
 */
emxEditableTable.prototype.updateXMLByRowId = function __updateXMLByRowId(rowId,xmlCellData,columnId){
    var oldColumn = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + rowId + "']/c["+columnId+"]");
    var row = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + rowId + "']");
    var objDOM = emxUICore.createXMLDOM();
    objDOM.loadXML(xmlCellData);
    row.replaceChild(objDOM.documentElement,oldColumn);
    rebuildView();
}

emxEditableTable.refreshStructure = function __refreshStructure(sortColumnName, sortDirection){

    refreshRows(sortColumnName, sortDirection);

}
function refreshStructureWithOutSort(){
    var aCols = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[not(@calc) and not(@rg)]/c");
    for(var k=0;k<aCols.length;k++){
        aCols[k].parentNode.removeChild(aCols[k]);
    }

    var aRows = "";
    if(isStructureCompare == "TRUE" ){
    	aRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[not(@calc) and not(@displayRow='false')]");
    }else{
    	aRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[not(@calc)]");
    }
   
    fillupColumns(aRows, 0, aRows.length);
    callToBuildColumValues("firstTime",true);
}
emxEditableTable.refreshStructureWithOutSort = function __refreshStructureWithOutSort(){
    refreshStructureWithOutSort();
    rebuildView();
}

emxEditableTable.getBooleanColumn = function __getBooleanColumn(rowId, columnName){
	var columns = emxUICore.selectNodes(oXML, "/mxRoot/columns/column");
	for (var i = 0; i < columns.length; i++) {
		var name = columns[i].getAttribute("name");
		if (name == columnName) {
			var colIndex = i + 1
			var col = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + rowId + "']/c[" + colIndex + "]");
			return emxUICore.getText(col);
		}
	}

}

emxEditableTable.setBooleanColumn = function __setBooleanColumn(rowId, columnName, value, refresh){
	var columns = emxUICore.selectNodes(oXML, "/mxRoot/columns/column");
	for (var i = 0; i < columns.length; i++) {
		var name = columns[i].getAttribute("name");
		if (name == columnName) {
			var colIndex = i + 1
			var col = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + rowId + "']/c[" + colIndex + "]");
			if (value) {
				emxUICore.setText(col, "true");
				col.setAttribute("a", "true");
			} else {
				emxUICore.setText(col, "false");
				col.setAttribute("a", "false");
			}
			break;
		}
	}

  if (refresh == null || refresh)
	emxEditableTable.refreshRowByRowId(rowId, true);
}

/* "emxEditableTable.refreshRowByRowId" refreshes all the rows for which rowId's are passed.
* The argument "rowId" can be single rowId or an array of rowId's
* @since V6R2013x
* @author zgx
*/
emxEditableTable.refreshRowByRowId = function __refreshRowByRowId(rowId, clientRefresh){
	if (typeof clientRefresh == 'undefined') {
		clientRefresh = false;
	}
    var arrRowID = [];
    if(rowId && rowId instanceof Array) {
        arrRowID = rowId;
    } else {
        arrRowID.push(rowId);
    }
	if (!clientRefresh) {
    for(i=0; i < arrRowID.length; i++) {
        var nRow =  emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@id = '" + arrRowID[i] + "']");
        var aCols = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@id = '" + arrRowID[i] + "']/c");
    for(var k=0;k<aCols.length;k++){
        aCols[k].parentNode.removeChild(aCols[k]);
    }
    fillupColumns(nRow, 0, 1);
    }
    callToBuildColumValues("firstTime",true);
	}
    if(displayView == "detail" ||displayView =="thumbnail"){
        rebuildView();
	} else if(displayView == "tree") {
		if (!clientRefresh) {
			var responseXML = emxUICore.getXMLDataPost("../common/emxFreezePaneGetData.jsp", getParams()+ "&rowIds=" + arrRowID.join(":") + "&sbImages=ImageOnly");
			allrows = emxUICore.selectNodes(responseXML, "/mxRoot/rows//r");
			var imageMap= new Object();
			for (i = 0; i < allrows.length; i++) {
				var colNode = emxUICore.selectSingleNode(allrows[i], "c");
				imageMap[allrows[i].getAttribute("id")] = colNode;
			}
		}

		for(i=0; i < arrRowID.length; i++) {
			var foundNode = findNode(tree.root, arrRowID[i]);
			if (foundNode) {
				if (!clientRefresh) {
					foundNode.data.data.appendChild(imageMap[arrRowID[i]]);
				}
				foundNode.body.el.removeChild(foundNode.body.el.firstChild);
				drawThumbnailTileText(foundNode.data.data, foundNode.body.el);
				drawThumbnailTileImage(foundNode.data.data, foundNode.body.el.firstChild);
				enableDragging(foundNode.body.el.children[0].children[0]);
				enableDropping(foundNode.body.el.children[0].children[0]);
			}
		}
    }
}

/* "emxEditableTable.refreshSelectedRows" refreshes all the rows selected (through checkbox/radiobuttons) in the UI
* This API can be used for operations such as Mass Update, Mass Promote, Mass Demote on selected rows
* Example: Refer emxMassPromoteDemote.jsp
* @since V6R2013x (23-May-2012)
* @author zgx
*/
emxEditableTable.refreshSelectedRows = function __refreshSelectedRows(){
    var arrRows, row, rowLen, i=0,arrIds=[];
    arrRows = getCheckedRows();
    rowLen = arrRows.length;
    if(rowLen > 0){
        for(i; i < rowLen; i++){
            //get the ids of each row
            row = arrRows[i];
            arrIds.push(row.getAttribute("id"));
        }
    }
    emxEditableTable.refreshRowByRowId(arrIds);
}

// Added method to check table data modified or not and available to the user.
emxEditableTable.checkDataModified = function __checkDataModified(){
    if(isDataModified()){
        return true;
    } else {
        return false;
    }
}

//Added for SB Scroll improvements
var Transformation =
{
        __tree  : null
    ,    __table : null
    ,   __tableheader : null
    ,   __treeheader : null
    ,   __toolbar : null
    ,   Init  : function (table,tree,tableheader,treeheader,toolbar) {
        if(isIE) {
          var xslt           = XMLHelper.GetXSLTemplate();//new ActiveXObject("Msxml2.XSLTemplate");
          xslt.stylesheet = tree;
          this.__tree       = xslt.createProcessor();
          xslt.stylesheet = table;
          this.__table       = xslt.createProcessor();
          xslt.stylesheet = tableheader;
          this.__tableheader = xslt.createProcessor();
          xslt.stylesheet = treeheader;
          this.__treeheader = xslt.createProcessor();
          xslt.stylesheet = toolbar;
          this.__toolbar = xslt.createProcessor();
        } else {
          this.__tree = new XSLTProcessor();
          this.__table = new XSLTProcessor();
          this.__tableheader = new XSLTProcessor();
          this.__treeheader = new XSLTProcessor();
          this.__toolbar = new XSLTProcessor();
          this.__tree.importStylesheet(tree);
          this.__table.importStylesheet(table);
          this.__tableheader.importStylesheet(tableheader);
          this.__treeheader.importStylesheet(treeheader);
          this.__toolbar.importStylesheet(toolbar);
        }
    }
    ,   GetTableHeader : function _GetTableHeader(xml) {
        //ElapsedTimer.enter('GetTableHeader');
        var tableheader;
        if(isIE) {
          this.__tableheader.input = xml;
          this.__tableheader.transform();
          tableheader = this.__tableheader.output;
        } else {
          tableheader = this.__result(this.__tableheader.transformToDocument(xml));
        }
        //ElapsedTimer.exit(tableheader.length + ' chars');
        return tableheader;
    }
    ,   GetTreeHeader : function _GetTreeHeader(xml) {
        //ElapsedTimer.enter('GetTreeHeader');
        var treeheader;
        if(isIE) {
          this.__treeheader.input = xml;
          this.__treeheader.transform();
          treeheader = this.__treeheader.output;
        } else {
          treeheader = this.__result(this.__treeheader.transformToDocument(xml));
        }
        //ElapsedTimer.exit(treeheader.length + ' chars');
        return treeheader;
    }
    ,   GetToolbar : function _GetToolbar(xml) {
        //ElapsedTimer.enter('GetToolbar');
        var toolbar;
        if(isIE) {
          this.__toolbar.input = xml;
          this.__toolbar.transform();
          toolbar = this.__toolbar.output;
        } else {
          toolbar = this.__result(this.__toolbar.transformToDocument(xml));
        }
        //ElapsedTimer.exit(toolbar.length + ' chars');
        return toolbar;
    }
    ,   GetTree : function _GetTree(xml) {
        var tree;
        if(isIE) {
          this.__tree.input = xml;
          this.__tree.transform();
          tree = this.__tree.output;
        } else {
          tree = this.__result(this.__tree.transformToDocument(xml));
        }
        return tree;
    }
    ,   GetTable : function _GetTable(xml) {
        var table;
        if(isIE) {
          this.__table.input = xml;
          this.__table.transform();
          table = this.__table.output;
        } else {
          table = this.__result(this.__table.transformToDocument(xml));
        }
        return table;
    }
    ,   __result : function ___result(trans) {
//      //ElapsedTimer.enter();
        var result = null;
        if (trans.documentElement.tagName == "result") {
            result = trans.documentElement.xml;
            result = result.substring(result.indexOf(">")+1, result.indexOf("</transformiix:result>"));
        }
        var ret = result != null ? result : trans.xml;
//      //ElapsedTimer.exit(ret.length + ' chars');
        return ret;
    }
}

function getParams()
{
    var fetchparams  = null;
    if(fetchparams == null){
        fetchparams = "fpTimeStamp=" + timeStamp;
        if (outputFormat) {
             fetchparams += "&outputFormat=" + outputFormat;
        }
        fetchparams +="&IsStructureCompare=" + isStructureCompare;
    }
    return fetchparams;
}

function MergeXMLResponse(xmldom, rowsWithNoColumns)
{
    return;
    //ElapsedTimer.enter('MXR' + " dom rows count=" + xmldom.documentElement.childNodes[0].childNodes.length + "; rwnc count=" + rowsWithNoColumns.length);
    var oRows      = xmldom.documentElement.childNodes[0];
    var isReport = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='reportType']/text()");
    for(var i = 0; i < oRows.childNodes.length && i < rowsWithNoColumns.length; i++)
    {
        var aColumnNodes = oRows.childNodes[i].childNodes;
        diffCode = oRows.childNodes[i].getAttribute("diffcode");
        if(diffCode == null){
            diffCode = "";
        }
        var updateRow = true;
        var diffCommon = false;
        for(var j = 0; j < oRows.childNodes[i].childNodes.length; j++) {
           var nNewColumn = oRows.childNodes[i].childNodes[j].cloneNode(true);
           if (isStructureCompare && isReport ){
                if (isReport.nodeValue == "Difference_Only_Report") {
                    if (rowsWithNoColumns[i].getAttribute("matchresult") != null && rowsWithNoColumns[i].getAttribute("matchresult") == "common") {
                        diffCommon = true;
                        if (nNewColumn.getAttribute("compareResult") != null && nNewColumn.getAttribute("compareResult") == "different"){
                           updateRow = false;
                        }
                    }
                }
           }
           rowsWithNoColumns[i].appendChild(nNewColumn);
        }
        if (isStructureCompare && isReport){
               if (isReport.nodeValue == "Complete_Summary_Report"){
                var diffCode = oRows.childNodes[i].getAttribute("diffcode");
                if(diffCode == null){
                    diffCode = "";
                }
                rowsWithNoColumns[i].setAttribute("diffcode",diffCode);
            }
        }
        if (diffCommon){
            if (updateRow)
                rowsWithNoColumns[i].setAttribute("displayRow","false");
        }
    }
    xmldom = null;
    objHTTP = null;

    //ElapsedTimer.exit('MXR');
}

function MergeXMLResponsePreFetched(oResponseXML, aRows) {
    return;
    try {
        checkActionError(oResponseXML);
        if (bScrollStarted) {
            setTimeout(function(){MergeXMLResponsePreFetched(oResponseXML, aRows);}, 1000);
            //ElapsedTimer.log("MergeXMLResponsePrefetched postponed to give precedence to scrolling performance");
            return;
        }
        MergeXMLResponse(oResponseXML, aRows);
        oResponseXML = null;
        PreFetch(); // continue from lastPrefetchPos
    } catch (err) {
        alert(emxUIConstants.STR_JS_ErrorPrefetch + "\n" + err.message);
    }
}

function MergeXMLResponseAndRender(oResponseXML, aRows) {
    return;
    try {
        checkActionError(oResponseXML);
        MergeXMLResponse(oResponseXML, aRows);
        //recomputeViewport();
        RefreshView();
        oResponseXML = null;
        PreFetch(firstRow + scrollPageSize + 1); // start prefetching from below last loaded row
    } catch (err) {
        alert(emxUIConstants.STR_JS_Error + " " + err.message);
    }
}

function PreFetch(nStart, nRows) {
    return;
    if (nRows == null) {
        nRows = preFetchPageSize; // TODO smarter calculation
    }

    if (nStart == null) {
        if (lastPreFetchPos < 0) {
            return;  // all display rows already fetched
        } else {
            nStart = lastPreFetchPos + 1;
        }
    }

    if (preFetchPageSize) {
        //ElapsedTimer.info("Scheduling PreFetch " + nStart + " " + nRows);
        setTimeout(function() { onPreFetchTimeout(nStart, nRows); }, 100);
    } else {
        //ElapsedTimer.info("Pre-Fetch disable");
}

}

var lastPreFetchPos = 0;
var nDisplayStartRow = 0;
var nDisplayEndRow = 0;

// Create a copy of global xml, but substitute in given rows.
// if mode == tree, copy only columns left of split
function CloneDisplayRowsIntoNewXML(aDisplayRows, nStart, nEnd, mode){
    //ElapsedTimer.enter();
    var oLocalXML = emxUICore.createXMLDOM();
    var nRoot     = oLocalXML.createElement("mxRoot");
    oLocalXML.appendChild(nRoot);


    if (nStart < 0) {
        nStart = 0;
    }
    if (nEnd >= aDisplayRows.length) {
        nEnd = aDisplayRows.length - 1;
    }
    //save for use
    nDisplayStartRow = nStart;
    nDisplayEndRow = nEnd;

    for(var i = 0;  i < oXML.documentElement.childNodes.length; i++){
        var node = oXML.documentElement.childNodes[i];
        nRoot.appendChild(node.cloneNode(node.nodeName != "rows"));
    }
    //ElapsedTimer.timeCheck("after cloning top-level nodes");

    var nRows = emxUICore.selectSingleNode(oLocalXML, "/mxRoot/rows");
    for (var i = nStart; i <= nEnd; i++) {
        var nClonedRow = aDisplayRows[i].cloneNode(false);

        var sLevelId   = nClonedRow.getAttribute("id");
        var nColumnCounter = 1;
        var columnNodes = emxUICore.selectNodes(aDisplayRows[i], "c");

        var firstCol = 0, lastCol = columnNodes.length - 1;
        if (mode == 'tree' && lastCol >= splitPos) {
            lastCol = splitPos - 1;
        }

        for (var j = firstCol; j <= lastCol; j++) {
            var nColumn = columnNodes[j];
            if (aMassUpdate[sLevelId] && aMassUpdate[sLevelId][nColumnCounter]) {
                nColumn.setAttribute("edited", "true");
                if(!arrUndoRows[sLevelId]) {
                    arrUndoRows[sLevelId] = new Object();
                }
                if(!arrUndoRows[sLevelId][nColumnCounter-1]) {
                    arrUndoRows[sLevelId][nColumnCounter-1] = emxUICore.getText(nColumn);
                }
                nColumn.setAttribute("d", emxUICore.getText(nColumn));
                nColumn.setAttribute("newA", aMassUpdate[sLevelId][nColumnCounter]);
                emxUICore.setText(nColumn, aMassUpdate[sLevelId][nColumnCounter]);
                aMassUpdate[sLevelId][nColumnCounter] = null;
            }
            var nClonedColumn = nColumn.cloneNode(true);
            nClonedColumn.setAttribute("index", j+1);
            nClonedRow.appendChild(nClonedColumn);
            nColumnCounter++;
        }

        nRows.appendChild(nClonedRow);
    }

    var columnNodes = emxUICore.selectNodes(nRoot, "columns/column");
    var firstCol = 0, lastCol = columnNodes.length;
    for (var j = firstCol; j < lastCol; j++) {
        columnNodes[j].setAttribute("index", j+1);
    }

    //ElapsedTimer.exit("Cloned " + (nEnd - nStart + 1) + " rows");
    return oLocalXML;
}

function enableScrollOnDrop(containers){
	var mouseoverTimer = {};
	jQuery(containers).on("dragenter", function(event){
		if(event.originalEvent.target == this){
			delete mouseoverTimer[jQuery(this).attr('id')];
		}
	})
	.on("dragleave", function(event){
		if(event.originalEvent.target == this){
			delete mouseoverTimer[jQuery(this).attr('id')];
		}
	})
	.on("drop", function(event){
		delete mouseoverTimer[jQuery(this).attr('id')];
	})
	.on("dragover", function(event){
		var delayToScroll = 1500; //1.5 second
		var edge = 25;
		var step = 10;
		var position = event.originalEvent.pageY > (jQuery(this).offset().top + jQuery(this).height() - edge) ? "south" :
												event.originalEvent.pageY < (jQuery(this).offset().top + edge) ? "north" :
						event.originalEvent.pageX > (jQuery(this).offset().left + jQuery(this).width() - edge) ? "east" :
												event.originalEvent.pageX < (jQuery(this).offset().left + edge) ? "west" : "other" ;
		var table = null;
		if(this == editableTable.divTreeBody){
			table = editableTable.tblTreeBody;
		}
		else if(this == editableTable.divListBody){
			table = editableTable.tblListBody;
		}
		if(table){
			var lastRow = null;
			switch(position){
			case "south":
				lastRow = table.rows[table.rows.length - 1];
				break;
			case "north":
				lastRow = table.rows[1];
				break;
			}
			if(lastRow && jQuery(event.originalEvent.target).closest("tr").get(0) == lastRow && jQuery(lastRow).attr("id") == null){ //allow for virtual scrolling
				return;
			}
		}
		if(position == "other"){
			delete mouseoverTimer[jQuery(this).attr('id')];
		}
		else{
			if(!mouseoverTimer[jQuery(this).attr('id')]){
				mouseoverTimer[jQuery(this).attr('id')] = new Date();
				return;
			}
			else if (mouseoverTimer[jQuery(this).attr('id')] != "expired" && new Date().getTime() - mouseoverTimer[jQuery(this).attr('id')].getTime() >= delayToScroll){
				mouseoverTimer[jQuery(this).attr('id')] = "expired";
			}
			if(mouseoverTimer[jQuery(this).attr('id')] != "expired") {
				return;
			}
			switch(position){
			case "south" :
				jQuery(this).scrollTop(jQuery(this).scrollTop() + step);
				break;
			case "north" :
				jQuery(this).scrollTop(jQuery(this).scrollTop() - step);
				break;
			case "east" :
				jQuery(this).scrollLeft(jQuery(this).scrollLeft() + step);
				break;
			case "west" :
				jQuery(this).scrollLeft(jQuery(this).scrollLeft() - step);
				break;
			}
		}

	})
}

function disableDraggingOfChildren(element) {
	var children = element.children;
	for(var i = 0; i < children.length; i++) {
		if (!children[i].classList.contains("find-in-result")) {
			children[i].setAttribute("draggable", "false");
		}
		disableDraggingOfChildren(children[i]);
	}
}
function enableDragging(node) {
	require(['DS/ENODragAndDrop/ENODragAndDrop'], function (Dnd) {
		for (var j = 0; j < colMap.columns.length; j++) {
			var isDraggable = colMap.getColumnByIndex(j).getSetting("Draggable");
			if (isDraggable && isDraggable == "true") {
				var allRows;
				var colIndex;
				if (node) {
					allRows = new Array();
					allRows.push(node);
					node.onmousedown = function (evt) {
						if (evt.button != 2) evt.stopPropagation();
					}
				} else {
					if (displayView == "thumbnail") {
						allRows = $.find("#mx_divThumbnailBody .thumbnail-container");
					} else if (displayView == "tree") {
						allRows = $.find("#mx_divTreeGraphBody .thumbnail-container");
					} else {
						// check if DnD events are already registered.
						var dragColumns = editableTable.divTreeBody.firstChild.getAttribute("data-Drag");
						if (dragColumns && dragColumns.contains(colMap.getColumnByIndex(j).name)) {
							return;
						} else {
							if (dragColumns) {
								dragColumns += "," + colMap.getColumnByIndex(j).name;
							} else {
								dragColumns = colMap.getColumnByIndex(j).name;
							}
							editableTable.divTreeBody.firstChild.setAttribute("data-Drag", dragColumns);
						}
						if (j < editableTable.divTreeBody.firstChild.tBodies[0].rows[1].cells.length - 1) {
							allRows = editableTable.divTreeBody.firstChild.tBodies[0].rows;
							colIndex = j + 1;
						} else {
							allRows = editableTable.divListBody.firstChild.tBodies[0].rows;
							colIndex = j - editableTable.divTreeBody.firstChild.tBodies[0].rows[1].cells.length + 1;
						}
					}
				}

				for (var i = 0; i < allRows.length; i++) {
					var oid = allRows[i].getAttribute("o");
					var rid = allRows[i].getAttribute("r");
					var id = allRows[i].getAttribute("id");
					if(id == null){
						continue; //row for virtual scrolling, or mx_hidden-row.
					}
					// check if DnD event is already registered.
					if (displayView != "detail") {
						var isDragRegistered = allRows[i].getAttribute("data-Drag");
						if (isDragRegistered) {
							continue;
						} else {
							allRows[i].setAttribute("data-Drag", "true");
						}
					}

					var row = emxUICore.selectSingleNode(oXML, "//r[@id='" + id + "']");
					var type = row.getAttribute("type");
					var icon = row.getAttribute("i");
					Dnd.draggable((displayView != "detail") ? allRows[i] : allRows[i].cells[colIndex], {
						data: JSON.stringify({
							oid: oid,
							rid: rid,
							id: id,
							type: type,
							icon: icon
						}),
						start: function (element, evt) {
							var crt = document.createElement("div");
							crt.setAttribute("id", "ghost");
							var tablename = getTableNameFromXML();
							var dragOperation = $.localStorage.get('SB',tablename, 'dropAction');
							if (dragOperation == "Move") {
								crt.className = "dragged-object move";
							} else {
								crt.className = "dragged-object add";
							}
							crt.style.top = "0px";
							crt.style.left = "0px";
							if (!isIE) {
								crt.style.position = "absolute";
								crt.style.zIndex = "-1";
							}
							var selection = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@checked='checked']");
							var dragPayLoad = new Object();
							dragPayLoad.action = dragOperation;
							dragPayLoad.window = window.name;
							dragPayLoad.objects = new Array();
							var imageSrc = "images/iconStatusObjectHold.gif";
							if (selection && selection.length > 0) {
								for (var i = 0; i < selection.length; i++) {
									var id = selection[i].getAttribute("id");
									var type = selection[i].getAttribute("type");
									var icon = selection[i].getAttribute("i");
									if (i == 0) {
										imageSrc = icon;
									} else if (imageSrc != icon) {
										imageSrc = "images/iconStatusObjectHold.gif";
									}
									var rid = selection[i].getAttribute("r");
									var oid = selection[i].getAttribute("o");
									dragPayLoad.objects.push({id: id, oid: oid, rid: rid, type: type, icon: icon});
								}
								var countDiv = document.createElement("div");
								countDiv.className = "drop-count";
								countDiv.innerHTML = selection.length;
								crt.appendChild(countDiv);
							} else {
								var dragData = JSON.parse(evt.dataTransfer.getData("text"));
								dragPayLoad.objects.push(dragData);
								imageSrc = dragData.icon;
							}
							evt.dataTransfer.setData("text", JSON.stringify(dragPayLoad));

							var img = document.createElement("img");
							img.setAttribute("src", imageSrc);
							crt.appendChild(img);
							if (!isIE) {
								document.body.appendChild(crt);
								evt.dataTransfer.setDragImage(crt, 0, 0);
							} else {
								try{
									evt.dataTransfer.setDragImage(crt, evt.currentTarget, 0);
								}
								catch(e){
									console.log("SB: setDragImage failed in IE.");
								}
							}
							var storage = $.sessionStorage;
							storage.set("DnD", evt.dataTransfer.getData("text"));
							console.log("dragPatLoad = " + dragPayLoad.window);
							if (getTopWindow().closeWindowShadeDialog)
							getTopWindow().closeWindowShadeDialog(false, true);
						},
						stop: function () {
							console.log("stop");
							var elem = document.getElementById('ghost');
							if (elem)
							elem.parentNode.removeChild(elem);
							//getTopWindow().showWindowShadeDialog('', true, true, false, true);
		}
	});
					if(displayView == "detail"){
						disableDraggingOfChildren(allRows[i].cells[colIndex]);
					}
				}
				if (displayView != "detail") {
					break;
				}
			}
		}
	});
}

function validateDrop(dragData, dropid) {
	var settingDropTypes = emxUICore.selectSingleNode(oXML, "/mxRoot/columns/column/settings/setting[@name = 'Drop Types Hirarchy']");
	var dropTypes = emxUICore.getText(settingDropTypes).split(",");

	var found = true;
	var unFoundType = null;
	for (var j = 0; j < dragData.objects.length; j++) {
		if ($.inArray(dragData.objects[j].type, dropTypes) < 0) {
			found = false;
			unFoundType = dragData.objects[j].type;
			break;
		}
	}

	if (!found) {
		throw "Object of type " + unFoundType + " is not allowed";
	}

	var settingAction = emxUICore.selectSingleNode(oXML, "/mxRoot/columns/column/settings/setting[@name = 'Drop Action']");
	var dropAction = "Copy";
	if (settingAction) {
		dropAction = emxUICore.getText(settingAction);
	}
	if (dropAction.indexOf(dragData.action) < 0) {
		throw "Invalid operation. Only " + dropAction + " supported";
	}

	var settingItems = emxUICore.selectSingleNode(oXML, "/mxRoot/columns/column/settings/setting[@name = 'Drop Items']");
	var dropItems = "Single";
	if (settingItems) {
		dropItems = emxUICore.getText(settingAction);
	}
	if (dropItems == "Single" && dragData.objects.length > 1) {
		throw "Cannot drop multiple objects";
	}

	if (dropid) {
		var dropRow = emxUICore.selectSingleNode(oXML, "//r[@id = '" + dropid + "']");
		for (var j = 0; j < dragData.objects.length; j++) {
			var matchedRows = emxUICore.selectNodes(dropRow, "ancestor-or-self::r[@o = '" + dragData.objects[j].oid + "']");
			if (matchedRows.length > 0) {
				throw "Cannot add parent object as child"
				break;
			}
		}
	}
}

function enableDropping(node) {
	require(['DS/ENODragAndDrop/ENODragAndDrop'], function (Dnd) {
		'use strict';
		for (var j = 0; j < colMap.columns.length; j++) {
			var isDroppable = colMap.getColumnByIndex(j).getSetting("Droppable");
			if (isDroppable && isDroppable == "true") {
				var allRows;
				var colIndex;
				var dragTypes = colMap.getColumnByIndex(j).getSetting('Drag Types');
				var dropTypes = colMap.getColumnByIndex(j).getSetting('Drop Types');
				var rels = colMap.getColumnByIndex(j).getSetting('Drop Relationships');
				var directions = colMap.getColumnByIndex(j).getSetting('Drop Directions');
				if (node) {
					allRows = new Array();
					allRows.push(node);
				} else {
					if (displayView == "thumbnail") {
						allRows = $.find("#mx_divThumbnailBody .thumbnail-container");
					} else if (displayView == "tree") {
						allRows = $.find("#mx_divTreeGraphBody .thumbnail-container");
					} else {
						// check if DnD events are already registered.
						var dropColumns = editableTable.divTreeBody.firstChild.getAttribute("data-Drop");
						if (dropColumns && dropColumns.contains(colMap.getColumnByIndex(j).name)) {
							return;
						} else {
							if (dropColumns) {
								dropColumns += "," + colMap.getColumnByIndex(j).name;
							} else {
								dropColumns = colMap.getColumnByIndex(j).name;
							}
							editableTable.divTreeBody.firstChild.setAttribute("data-Drop", dropColumns);
						}

						if (j < editableTable.divTreeBody.firstChild.tBodies[0].rows[1].cells.length - 1) {
							allRows = editableTable.divTreeBody.firstChild.tBodies[0].rows;
							colIndex = j + 1;
						} else {
							allRows = editableTable.divListBody.firstChild.tBodies[0].rows;
							colIndex = j - editableTable.divTreeBody.firstChild.tBodies[0].rows[1].cells.length + 1;
						}
					}
				}
				for (var i = 0; i < allRows.length; i++) {
					var id = allRows[i].getAttribute("id");
					if(id == null){
						continue; //row for virtual scrolling, or mx_hidden-row.
					}
					// check if DnD event is already registered.
					if (displayView != "detail") {
						var isDropRegistered = allRows[i].getAttribute("data-Drop");
						if (isDropRegistered) {
							continue;
						} else {
							allRows[i].setAttribute("data-Drop", "true");
						}
					}
					Dnd.droppable((displayView != "detail") ? allRows[i] : allRows[i].cells[colIndex], {
						counter: 0,
						enter: function (element) {
							var id;
							var styleElem;
							if (displayView != "detail") {
								styleElem = element.parentNode;
								id = element.getAttribute("id");
							} else {
								styleElem = element;
								id = element.parentNode.getAttribute("id");
							}
							var storage = $.sessionStorage;
							var dragData = storage.get("DnD");
							if (dragData instanceof String) {
								dragData = JSON.parse(dragData);
							}
							var dropValid = true;
							try {
								validateDrop(dragData, id);
							} catch(err) {
								dropValid = false;
							}
							this.counter++;
							if (this.counter == 3) {
								this.counter = 2;
							}
							if (dropValid) {
								styleElem.classList.add("drop-yes");
							} else {
								styleElem.classList.add("drop-no");
							}
						},

						leave: function (element) {
							var styleElem;
							if (displayView != "detail") {
								styleElem = element.parentNode;
							} else {
								styleElem = element;
							}

							this.counter--;
							if (this.counter === 0) {
								styleElem.classList.remove("drop-yes");
								styleElem.classList.remove("drop-no");
							}
						},

						drop: function (data, element, event) {
							var infoElem;
							var styleElem;
							if (displayView != "detail") {
								styleElem = element.parentNode;
								infoElem = element;
							} else {
								styleElem = element;
								infoElem = element.parentNode;
							}

							styleElem.classList.remove("drop-yes");
							styleElem.classList.remove("drop-no");
							var dragInfo = JSON.parse(data);
							try {
								var id = infoElem.getAttribute("id")
								validateDrop(dragInfo, id);
							} catch (err) {
								require(['DS/UIKIT/Alert'], function (Alert) {
									var myAlert = new Alert({
										closable: true,
										visible: true,
										autoHide: true
									}).inject(getTopWindow().document.body);
									myAlert.add({ className: "error", message: err });
								});
								return;
							}
							var dropInfo = new Object();
							dropInfo.columnName = (emxUICore.selectSingleNode(oXML, "/mxRoot/columns/column/settings/setting[@name = 'Droppable' and text() = 'true']/../..")).getAttribute("name");
							dropInfo.timestamp = timeStamp;
							dropInfo.window = window.name;
							dropInfo.object = new Object();
							dropInfo.object.oid = infoElem.getAttribute('o');
							dropInfo.object.rid = infoElem.getAttribute('r');
							dropInfo.object.id = infoElem.getAttribute('id');
							var postData = new Object();
							postData.drag = dragInfo;
							postData.drop = dropInfo;
							$.ajax({
								url: "emxFreezePaneDropProcess.jsp",
								type: 'POST',
								dataType: 'json',
								data: JSON.stringify(postData),
								contentType: 'application/json',
								mimeType: 'application/json',

								success: function (data) {
									var className = "error";
									if (data.result == 'pass') {
										var relIds = null;
										if (data.relIds) {
											relIds = data.relIds.split(",");
										}
										className = "success";
										if (data.onDrop) {
											var customJSFunction = null;
											var evalString = "customJSFunction = " + data.onDrop;
											eval(evalString);
											customJSFunction();
										} else {
											var addXML = "<mxRoot>";
											addXML += "<action><![CDATA[add]]></action>";
											addXML += "<data status=\"committed\" fromRMB=\"true\">";
											for (var i = 0; i < dragInfo.objects.length; i++) {
												var relId = "";
												if (relIds != null) {
													relId = relIds[i];
												}
												addXML += "<item oid=\"" + dragInfo.objects[i].oid + "\" relId=\"" + relId + "\" pid=\"" + dropInfo.object.oid + "\" direction=\"\" pasteBelowToRow=\"" + dropInfo.object.id + "\" />";
											}
											addXML += "</data>";
											addXML += "</mxRoot>";
											emxEditableTable.addToSelected(addXML);
											if (dragInfo.action == "Move") {
												var removeXML = "<mxRoot>";
												removeXML += "<action refresh=\"true\" fromRMB=\"true\"><![CDATA[remove]]></action>";
												for (var i = 0; i < dragInfo.objects.length; i++) {
													removeXML += "<item id=\"" + dragInfo.objects[i].id + "\" />";
												}
												removeXML += "<message><![CDATA[]]></message>";
												removeXML += "</mxRoot>";
												removedeletedRows(removeXML);
											}
										}
									}
									//Modified by jh.Lee Start
									if(data.result == 'fail'){
										alert(data.message);
									}
									//Modified by jh.Lee End
									var context = getTopWindow().require ? getTopWindow(): window; //IR-358673-3DEXPERIENCER2015x
									context.require(['DS/UIKIT/Alert'], function (Alert) {
										var myAlert = new Alert({
											closable: true,
											visible: true,
											autoHide: true
										}).inject(getTopWindow().document.body);
									myAlert.add({ className: className, message: data.message});
									});
								},
								error:function(data,status,er) {
									alert("error: "+data+" status: "+status+" er:"+er);
								}
							});
						}
					});
				}
				if (displayView != "detail") {
					break;
				}
			}
		}
	});
}


function DrawWireFrame() {
    //ElapsedTimer.enter();
    aDisplayRows = getDisplayRows();
	var oLocalXML = CloneDisplayRowsIntoNewXML(aDisplayRows, windowFirstRow, windowFirstRow + scrollPageSize -1, 'tree');
    updateDrawnRowNumbers(firstRow);
    editableTable.divTreeBody.innerHTML = Transformation.GetTree(oLocalXML);
    //ElapsedTimer.timeCheck("after setting Tree innerHTML");
    editableTable.initDomVars();
    enableDragging();
    enableDropping();

//    // assign event handlers
//    editableTable.assignEventHandlers();
//
//    if (editableTable.tblTreeHead && editableTable.tblTreeBody){
//       for (var itr = 0; itr < editableTable.tblTreeHead.rows[0].cells.length;itr++ ){
//            editableTable.tblTreeBody.rows[0].cells[itr].width = editableTable.tblTreeHead.rows[0].cells[itr].width;
//        }
//    }
//    if(currentCell.target != null){
//      setSelectedColumn(currentCell.tableName);
//    }
    //ElapsedTimer.exit();
}

function DrawCompleteList(aRows, oLocalXML){
    //ElapsedTimer.enter();
    if (aRows == null) {
        aRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[(@level = '0' or count(ancestor::r[not(@display) or @display = 'none']) = '0')]");
    }
    if (oLocalXML == null) {
        oLocalXML = CloneDisplayRowsIntoNewXML(aRows, 0, aRows.length - 1);
    }

    var savedFR = _setSetting(oLocalXML, "/mxRoot", 'first-row', 0);
    var savedPS = _setSetting(oLocalXML, "/mxRoot", 'page-size', aRows.length);

    editableTable.divListBody.innerHTML = TH = Transformation.GetTable(oLocalXML);
    //editableTable.divListHead.innerHTML = Transformation.GetTableHeader(oLocalXML);
    //ElapsedTimer.timeCheck("after setting Table innerHTML");

    _setSetting(oLocalXML, "/mxRoot", 'first-row', savedFR);
    _setSetting(oLocalXML, "/mxRoot", 'page-size', savedPS);


    editableTable.initDomVars();
    editableTable.restoreViewState();
    bFullListDrawn = true;

    //ElapsedTimer.exit();
}

function DrawCompleteTree(aRows, oLocalXML){
    //ElapsedTimer.enter();
    if (aRows == null) {
        aRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[(@level = '0' or count(ancestor::r[not(@display) or @display = 'none']) = '0')]");
    }
    if (oLocalXML == null) {
        oLocalXML = CloneDisplayRowsIntoNewXML(aRows, 0, aRows.length - 1, 'tree');
    }

    var savedFR = _setSetting(oLocalXML, "/mxRoot", 'first-row', 0);
    var savedPS = _setSetting(oLocalXML, "/mxRoot", 'page-size', aRows.length);

    editableTable.divTreeBody.innerHTML = TH = Transformation.GetTree(oLocalXML);

    enableDragging();
    enableDropping();

    //editableTable.divTreeHead.innerHTML = Transformation.GetTreeHeader(oLocalXML);
    ////ElapsedTimer.timeCheck("after setting Tree innerHTML");
    _setSetting(oLocalXML, "/mxRoot", 'first-row', savedFR);
    _setSetting(oLocalXML, "/mxRoot", 'page-size', savedPS);

    editableTable.initDomVars();
    bFullTreeDrawn = true;
    editableTable.restoreViewState();
    ////ElapsedTimer.exit();
    editableTable.adjustTreeLastColumn();
}
function RefreshSelections(id, checked){
    if (editableTable.tblTreeBody) {
        RefreshSelectionsOfTreeOrList(id, checked, editableTable.tblTreeBody);
    }
    if (editableTable.tblListBody) {
        RefreshSelectionsOfTreeOrList(id, checked, editableTable.tblListBody);
    }
    RefreshObjectCounts();
}
function RefreshSelectionsOfTreeOrList(curid, checked, tbl){
    var selectedRowStyle = 'mx_rowSelected';
    for (var i = 1; i < tbl.rows.length; i++) {
        var tr = tbl.rows[i];
        var id = tr.getAttribute('id');
        if(id == curid) {
            if(checked){
                addClass(tr,selectedRowStyle);
          }else{
                removeClass(tr,selectedRowStyle);
      }

            if(tbl.id == "treeBodyTable" && tr.cells[0]) {
                var chkbox = tr.cells[1].getElementsByTagName('input');
                if(chkbox != null && chkbox.length > 0)  {
                    chkbox[0].checked = checked;
                }
            }
            if(!hasMergedCells)
            break;
        }
    }
}

function RefreshAllSelections(checked, tbl, disableRows){
    if (!tbl) {
        if (editableTable.tblTreeBody) {
            RefreshAllSelections(checked, editableTable.tblTreeBody,disableRows);
        }
        if (editableTable.tblListBody) {
            RefreshAllSelections(checked, editableTable.tblListBody,disableRows);
        }
        RefreshObjectCounts();
    } else {
        var selectedrow = "mx_rowSelected";
        var len = tbl.rows.length;
        for (var i = 1; i < tbl.rows.length; i++) {
            var tr = tbl.rows[i];
            var trId = tr.getAttribute("id");
            if(disableRows.indexOf(trId)== -1){
        if(checked) {
                if(tr.className.indexOf(selectedrow) == -1){
                addClass(tr,selectedrow);
            }
          }else{
                removeClass(tr,selectedrow);
          }
      }
        }
    }
}

function addClass(objElement,className){
    objElement.className = objElement.className + ' ' + className
}

function removeClass(objElement,className){
    objElement.className = objElement.className.replace(' ' + className , '');
    objElement.className = objElement.className.replace(className , '');
}

var bFullTreeDrawn = false;
var bFullListDrawn = false;

var lastRefreshPos = -2;
var isFirstTimeLoad = "TRUE";

function fixColorizationColumnWidth(){
	var colorizeSetting = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name='colorize']");
	if(colorizeSetting != null && emxUICore.getText(colorizeSetting).toLowerCase() === 'yes'){
		jQuery("tr.mx_hidden-row td[position=-1]", editableTable.divTreeBody).attr("width", COLORIZATION_COL_WIDTH);
	}
	else{
		jQuery("tr.mx_hidden-row td[position=-1]", editableTable.divTreeBody).attr("width", 1); //0 width problematic for IE
	}
}

function RefreshViewScroll() {
var time0 = new Date();
    if(isIE && isMaxIE8){
	    if(portalMode == "true"){
		    toggleProgress("visible");
	    }else{
		    turnOnProgress();
	    }
	    setTimeout("RefreshViewScrollTimeout()", 1);
	}else{
	    RefreshViewScrollTimeout();
	}
var time1 = new Date();
console.log(">>>RefreshViewScroll="+(time1-time0) + "(" + (time1-time0) + ")");
}

function RefreshViewScrollTimeout() {
var time0 = new Date();
	var pageSizeOffset = 0;
	var actualTopHiddenHeight = parseInt(jQuery('div#mx_divTableBody tr td.bgPattern')[0].parentNode.getAttribute('height'));
	var scrollDir = '';
	if(gblScrTop < editableTable.divListBody.scrollTop){
		scrollDir = 'down';
	}else{
		scrollDir = 'up';
	}
	var locPreviousFirstRowDrawn = previousFirstRowDrawn;
    var prevRowId = aDisplayRows[previousFirstRowDrawn].getAttribute('id');

	if(gblScrTop < editableTable.divListBody.scrollTop){//scrolldown
		pageSizeOffset = pageSize * 2;
		if( (previousLastRowDrawn != 0) && ( (previousLastRowDrawn - firstRow) > pageSizeOffset  ) ){//scrolldown
			return;
		}
	}else if (gblScrTop > editableTable.divListBody.scrollTop && actualTopHiddenHeight < editableTable.divListBody.scrollTop){//scrollup
		pageSizeOffset = pageSize;
		if((firstRow > pageSizeOffset) && ( firstRow + pageSizeOffset >= previousFirstRowDrawn )){
			return;
		}
	}
	
	
	
    var tmpListWidth = editableTable.tblListBody.width;
    var tmpTreeWidth = editableTable.tblTreeBody.width;
    var oLocalXML = CloneDisplayRowsIntoNewXML(aDisplayRows, firstRow, firstRow + scrollPageSize - 1);
	updateDrawnRowNumbers(firstRow);
    var bRepair = false;
    editableTable.attachOrDetachEventHandlers(false);
var time1 = new Date();
console.log(">>>RefreshViewScrollTimeout time1="+(time1-time0) + "(" + (time1-time0) + ")");

    if (bFullListDrawn) {} else if (totalRows <= maxFullDrawRows) {
        DrawCompleteList(aDisplayRows);
    } else {
        editableTable.divListBody.innerHTML = TH = Transformation.GetTable(oLocalXML);
        editableTable.initDomVars();
        editableTable.tblListBody.width = tmpListWidth;
        bRepair=true;
    }
var time2 = new Date();
console.log(">>>RefreshViewScrollTimeout time2="+(time2-time1) + "(" + (time2-time0) + ")");

    //this copies the table row heights to oXML, then gets a fresh copy of the xml to draw the tree
	/*********************************************
	* Start for performance 20170228
	*********************************************/	
    //updateTableHeightInXML(oLocalXML);
	/*********************************************
	* End for performance 20170228
	*********************************************/	

var time3 = new Date();
console.log(">>>RefreshViewScrollTimeout time3="+(time3-time2) + "(" + (time3-time0) + ")");

    if (bFullTreeDrawn) {} else if (totalRows <= maxFullDrawRows) {
        DrawCompleteTree(aDisplayRows);
    } else {
        editableTable.divTreeBody.innerHTML = TH = Transformation.GetTree(oLocalXML);
        enableDragging();
        enableDropping();
        editableTable.initDomVars();
        editableTable.tblTreeBody.width = tmpTreeWidth;
        bRepair=true;
        if(isStructureCompare == "TRUE") {
            editableTable.restoreViewState();
        }
    }

var time4 = new Date();
console.log(">>>RefreshViewScrollTimeout time4="+(time4-time3) + "(" + (time4-time0) + ")");

    if(bRepair){
    	editableTable.restoreViewState();
    }
    fixColorizationColumnWidth();
    bScrollStarted = false;
	/*********************************************
	* Start for performance 20170228
	*********************************************/	
    //editableTable.divTreeBody.scrollTop = editableTable.divListBody.scrollTop;
    setTimeout("editableTable.divTreeBody.scrollTop = editableTable.divListBody.scrollTop",10);
	/*********************************************
	* End for performance 20170228
	*********************************************/	
    editableTable.attachOrDetachEventHandlers(true);

    if (bFullTreeDrawn) {
        editableTable.tblListHead.style.position = "relative";
        editableTable.tblListHead.style.left = -editableTable.divListBody.scrollLeft + "px";
        editableTable.tblTreeHead.style.position = "relative";
        editableTable.tblTreeHead.style.left = -editableTable.divTreeBody.scrollLeft + "px";
        editableTable.divTreeBody.scrollTop = editableTable.divListBody.scrollTop;
    }
var time5 = new Date();
console.log(">>>RefreshViewScrollTimeout time5="+(time5-time4) + "(" + (time5-time0) + ")");

    if(isIE){
        syncSB();
    }else {
        $(document).waitForImages(function(){
            syncSB();
        });
    }
var time6 = new Date();
console.log(">>>RefreshViewScrollTimeout time6="+(time6-time5) + "(" + (time6-time0) + ")");

    var scrollOffsetVal;
	if(!isNaN(gblScrollPageSize) && scrollDir === 'up'){
        scrollOffsetVal = parseInt((3 * parseInt(gblScrollPageSize)) / 4) + 2;
	}
	var centerDivClass = editableTable.divCenterDiv.className;
	if(scrollDir === 'up' && centerDivClass.indexOf('mx_wrap-all') != -1 && (locPreviousFirstRowDrawn - firstRow) <= scrollOffsetVal){
	   scrollToSelected(prevRowId);
	}
    forTab = false;
var time7 = new Date();
console.log(">>>RefreshViewScrollTimeout time7="+(time7-time6) + "(" + (time7-time0) + ")");

}

function RefreshView(adjustColumns){

    if(displayView != "detail"){
        if(!isresized){
        showDisplayView(displayView);
        return;
        }else{
            isresized = false;
        }

    }

    var treeScrollPosition=0;
    var listScrollPosition=0;
    if(isFirstTimeLoad=="FALSE") {
    	if(!bFullTreeDrawn) {
    		treeScrollPosition=editableTable.divTreeBody.scrollLeft;
    	}
    	if(!bFullListDrawn) {
    		listScrollPosition=editableTable.divListBody.scrollLeft;
    	}
    }


    recomputeViewport();

    aDisplayRows = getDisplayRows();
	changeHeightSettings(false); 
    var oLocalXML = CloneDisplayRowsIntoNewXML(aDisplayRows, firstRow, firstRow + scrollPageSize - 1);
	updateDrawnRowNumbers(firstRow);

    var nRowHeight = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name='rowHeight']");

    rowHeight = parseInt(emxUICore.getText(nRowHeight));
    if (rowHeight < editableTable.rowhgt) {
        rowHeight = editableTable.rowhgt;
        emxUICore.setText(nRowHeight, rowHeight);
    }
    //IE Memory leak Fix-Start
    editableTable.attachOrDetachEventHandlers(false);
    //IE Memory leak Fix-END
    var bRepair = false;
    if (bFullListDrawn) {
        //ElapsedTimer.timeCheck("** skipped Table innerHTML; already fully rendered");
    } else if (totalRows <= maxFullDrawRows) {
        DrawCompleteList(aDisplayRows);
    } else {
        editableTable.divListBody.innerHTML = TH = Transformation.GetTable(oLocalXML);
        //ElapsedTimer.timeCheck("after setting Table innerHTML");
        bRepair = true;
    }
    editableTable.initDomVars();
    updateTableHeightInXML(oLocalXML);

    var ext = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@status='lookup' and @o='']");
    _setSetting(oLocalXML, "/mxRoot", 'editState', ext.length > 0 ? "lookup" : "apply");

    if (bFullTreeDrawn) {
            //ElapsedTimer.timeCheck("** skipped Tree innerHTML; already fully rendered");
    } else if (totalRows <= maxFullDrawRows) {
            if(getTopWindow().isMobile){
                // this is absolutely needed for ipad, as it needs a delay to draw the tree
                setTimeout(function(){DrawCompleteTree(aDisplayRows);}, 300);
            } else {
        DrawCompleteTree(aDisplayRows);
            }
    } else {
        editableTable.divTreeBody.innerHTML = TH = Transformation.GetTree(oLocalXML);
        enableDragging();
        enableDropping();
            //ElapsedTimer.timeCheck("after setting Tree innerHTML");
        bRepair = true;
    }
    if(getTopWindow().isMobile){
        editableTable.tblListBody.style.tableLayout="fixed";
        setTimeout(function(){
             editableTable.tblTreeBody.style.tableLayout="fixed";
        }, 310);
    }
	var isFiltered;
    if(sbPage){
     	isFiltered= jQuery('setting[name="isFiltered"]', sbPage.oXML);
	} else {
		isFiltered = jQuery('setting[name="isFiltered"]', getTopWindow().sb.oXML);
	}
    if(getTopWindow().filterApplied && isFiltered.length == 0){
          var isFiltered = oXML.createElement("setting");
          isFiltered.setAttribute("name", "isFiltered");
        emxUICore.setText(isFiltered, "true");
        oXML.documentElement.appendChild(isFiltered);
        getTopWindow().filterApplied = false;
    }

    insertSortArrows();
    if(adjustColumns){
//        FreezePaneUtils.adjustTreeColumns();
//        FreezePaneUtils.adjustTableColumns();
    }
    var divMassUpdate = document.getElementById("divMassUpdate");
    if(divMassUpdate){
        if(getTopWindow().isMobile){
        setTimeout(function(){
            divMassUpdate.innerHTML = Transformation.GetToolbar(oLocalXML);
        }, 100);
        }else{
            divMassUpdate.innerHTML = Transformation.GetToolbar(oLocalXML);
        }
    }


    styleMandatoryColumns();
    bScrollStarted = false;
    if(isFirstTimeLoad === "TRUE"){
        setGrabberPosition();
        isFirstTimeLoad = "FALSE";
    }

    if (bRepair) {
        // initialize table variables
        editableTable.initDomVars();
        editableTable.restoreViewState();
    }

    // assign event handlers
    editableTable.attachOrDetachEventHandlers(true);

    editableTable.restoreViewState(true, currentCell);
	if(adjustColumns){
    editableTable.adjustTreeLastColumn();
    editableTable.adjustTableLastColumn();
	}

    //changeHeightSettings(false);

    editableTable.tblListHead.style.position="relative";
    if(isFirstTimeLoad=="FALSE") {
    	if(!bFullTreeDrawn) {
    		jQuery(editableTable.divTreeBody).scrollLeft(treeScrollPosition);
    	}
    	if(!bFullListDrawn) {
    		jQuery(editableTable.divListBody).scrollLeft(listScrollPosition);
    	}
    }
    editableTable.tblListHead.style.left = -editableTable.divListBody.scrollLeft+"px";
    editableTable.tblTreeHead.style.position="relative";
    editableTable.tblTreeHead.style.left = -editableTable.divTreeBody.scrollLeft+"px";
    setTimeout("editableTable.divTreeBody.scrollTop = (editableTable.divListBody.scrollTop)",25);

    if(isIE){
                syncSB();
    }else {
        $(document).waitForImages(function(){
            if(getTopWindow().isMobile){
                setTimeout(function(){
                    syncSB();
                }, 320);
            }else{
            syncSB();
            }
        });
    }

    forTab = false;
    isresized = false;
}

function RefreshTableHeaders(){
    var aDisplayRows = getDisplayRows();
    var oLocalXML = CloneDisplayRowsIntoNewXML(aDisplayRows, firstRow, firstRow + scrollPageSize - 1);
	updateDrawnRowNumbers(firstRow);
    editableTable.divListHead.innerHTML = TH = Transformation.GetTableHeader(oLocalXML);

    editableTable.divTreeHead.innerHTML = TH = Transformation.GetTreeHeader(oLocalXML);
    if(getTopWindow().emxUIAutoFilter) {
        getTopWindow().emxUIAutoFilter._setFilterIcons();
    }
    /*if(editableTable.divTreeBody.firstChild.offsetHeight - editableTable.divListBody.firstChild.offsetHeight > 2){
        setTimeout(function(){
            syncTreeRowsToBody(oLocalXML);
            editableTable.divTreeHead.innerHTML = TH = Transformation.GetTreeHeader(oLocalXML);
        }, 500);
    }*/
    editableTable.initDomVars();
    FreezePaneUtils.adjustTableColumns();
    FreezePaneUtils.adjustTreeColumns();
}
/*Gets the height of each list row and sets the height in the xml*/
function updateTableHeightInXML(oLocalXML){
	var firstrowhgt = editableTable.rowhgt;
	var hasImagecol = false;
	var imgColName;
	var imgcolheight = editableTable.rowhgt;
    for(var i =1, len = editableTable.tblListBody.rows.length; i < len; i++){
        var tblListBodyRows = editableTable.tblListBody.rows[i];
        var listsideid = tblListBodyRows.id;
        var tempHeight = editableTable.rowhgt;
        var nRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + listsideid + "']");
        var isGroupRow = false;
        if(nRow){
            if(nRow.getAttribute("rg") != null){
                isGroupRow = true;
            }
        }
         if(isMoz){
            tempHeight = tblListBodyRows.clientHeight;
        }else{
			if(cellWrapVal){
            tempHeight = tblListBodyRows.offsetHeight;
			}else{
				if(isIE){
					if(fastloadinIE){
						if(i == 1){
							  for (var j = 0; j < colMap.columns.length; j++) {
								  var objCol = colMap.columns[j];
								  var colType     = FreezePaneUtils.getColType(objCol).toLowerCase();
								  if(colType == FreezePaneUtils.COLTYPE_IMAGE){
									  hasImagecol = true;
									  imgColName = objCol.getAttribute("name");
									  imgcolheight = FreezePaneUtils.getImageColumnHeight(objCol);
									  break;
								  }
							  }

							if(hasImagecol){
								//var colValue = emxEditableTable.getCellValueByRowId(listsideid,imgColName);
								firstrowhgt = imgcolheight;
							} else {
								firstrowhgt = tblListBodyRows.offsetHeight;
								if(firstrowhgt < editableTable.rowhgt){
									firstrowhgt = editableTable.rowhgt;
								}
							}
						}
						tempHeight = editableTable.rowhgt;
					} else {
						tempHeight = tblListBodyRows.offsetHeight;
					}
				} else {
					tempHeight = tblListBodyRows.offsetHeight;
				}
			}
        }

        if(tempHeight < editableTable.rowhgt){
            tempHeight = editableTable.rowhgt;
        }
		
        if(nRow){
          if(hasMergedCells){
            if(i%2 == 0){
                nRow.setAttribute("height_row2", tempHeight);
            } else {
                nRow.setAttribute("height", tempHeight);
            }
          } else {
              nRow.setAttribute("height", tempHeight);
          }
        }
        var nLocRow = emxUICore.selectSingleNode(oLocalXML, "/mxRoot/rows//r[@id = '" + listsideid + "']");
        if(nLocRow){
          if(hasMergedCells){
            if(i%2 == 0){
                nLocRow.setAttribute("height_row2", tempHeight);
            } else {
                nLocRow.setAttribute("height", tempHeight);
            }
          } else {
              nLocRow.setAttribute("height", tempHeight);
          }
        }
    }

}

/*Syncs the table and tree height in html and XML*/
function syncSB(wrap){
    //Temporary Hack till we fix it in CSS.
    if(Browser.SAFARI){
         setTimeout(function(){
             editableTable.tblListBody.style.tableLayout = "auto";
         }, 10);
         setTimeout(function(){
             editableTable.tblListBody.style.tableLayout="fixed";
         }, 10);
    }

	var treerowhgt = editableTable.rowhgt;
	var tblrowhgt = editableTable.rowhgt;
	var hasImagecol = false;
	var imgColName;
	var imgcolheight = editableTable.rowhgt;

    for(var i =1, len = editableTable.tblListBody.rows.length; i < len; i++){
        var tblListBodyRows = editableTable.tblListBody.rows[i];
        var tblTreeBodyRows= editableTable.tblTreeBody.rows[i];
        var listsideid = tblListBodyRows.id;
        if(listsideid !=""){
            if(!isIE || hasMergedCells){
                tblListBodyRows.setAttribute("height","");
                tblTreeBodyRows.setAttribute("height","");
            }
			var treeHeight;
	        var tableHeight;
			if(cellWrapVal){
				treeHeight = isMoz? tblTreeBodyRows.clientHeight : tblTreeBodyRows.offsetHeight; //TODO Use Jquery
				tableHeight = isMoz ? tblListBodyRows.clientHeight :tblListBodyRows.offsetHeight;
				if(isIE && hasMergedCells){
					if(tblTreeBodyRows.cells && tblTreeBodyRows.cells.length > 0){
				   	 	treeHeight =tblTreeBodyRows.cells[1].offsetHeight;
					}
					if(tblListBodyRows.cells && tblListBodyRows.cells.length > 0){
				   	 	tableHeight = tblListBodyRows.cells[0].offsetHeight;
					}
				}
			}else{
				if(isIE){
					if(fastloadinIE) {
						if(i == 1){
							  for (var j = 0; j < colMap.columns.length; j++) {
								  var objCol = colMap.columns[j];
								  var colType     = FreezePaneUtils.getColType(objCol).toLowerCase();
								  if(colType == FreezePaneUtils.COLTYPE_IMAGE){
									  hasImagecol = true;
									  imgColName = objCol.getAttribute("name");
									  imgcolheight = FreezePaneUtils.getImageColumnHeight(objCol);
									  break;
								  }
							  }
							if(hasImagecol){
								treerowhgt = imgcolheight;
								tblrowhgt = imgcolheight;
							}else {
								treerowhgt = tblTreeBodyRows.offsetHeight;
								if(treerowhgt < editableTable.rowhgt){
									treerowhgt = editableTable.rowhgt;
								}

								tblrowhgt = tblListBodyRows.offsetHeight;
								if(tblrowhgt < editableTable.rowhgt){
									tblrowhgt = editableTable.rowhgt;
								}
							}
						}
						treeHeight = treerowhgt;
						tableHeight = tblrowhgt;
					} else {
						treeHeight = tblTreeBodyRows.offsetHeight;
						tableHeight = tblListBodyRows.offsetHeight;
					}
				} else if (isMoz){
					treeHeight = tblTreeBodyRows.clientHeight;
					tableHeight = tblListBodyRows.clientHeight;
				}else{
					treeHeight = tblTreeBodyRows.offsetHeight;
					tableHeight = tblListBodyRows.offsetHeight;
				}
			}
            
            var updatedHeight = tableHeight >= treeHeight ? tableHeight : treeHeight;
            var nRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + listsideid + "']");
            var isGroupRow = false;
            if(nRow){
                if(nRow.getAttribute("rg") != null){
                    isGroupRow = true;
                }
            }
			/*if(nRow && nRow.getAttribute("height")!=updatedHeight){
				updatedHeight = nRow.getAttribute("height");
			}*/
            if(updatedHeight < editableTable.rowhgt){
                updatedHeight = editableTable.rowhgt;
            }
            var rowCells = false;
            if(tblListBodyRows.cells[0]){
                rowCells = true;
            }
            if(hasMergedCells && isGroupRow && !rowCells){
                tblListBodyRows.setAttribute("height",'');
                tblTreeBodyRows.setAttribute("height",'');
            }else{
                tblListBodyRows.setAttribute("height",updatedHeight);
                    tblTreeBodyRows.setAttribute("height",updatedHeight);
            }
            if(nRow){
              if(hasMergedCells){
                if(i%2 == 0){
                    nRow.setAttribute("height_row2", updatedHeight);
                } else {
                    nRow.setAttribute("height", updatedHeight);
                }
              } else {
                  nRow.setAttribute("height", updatedHeight);
              }
            }
        }

    }



}
/*****************************/
/*Code for smart adjusting column widths
 * author: ixk
 * required global objects: editableTable,oXML and objCol
 * required global method : synchTreeandTable
 **/

/*This code works only for columns right to the freeze pane*/
var FreezePaneUtils = {};

FreezePaneUtils.COLTYPE_FILE        = 'file';
FreezePaneUtils.COLTYPE_IMAGE       = 'image';
FreezePaneUtils.COLTYPE_SEPARATOR   = 'separator';
FreezePaneUtils.COLTYPE_ICON        = 'icon';

FreezePaneUtils.COLEXPR_DESCR       = 'description';
FreezePaneUtils.COLEXPR_REV         = 'revision';

FreezePaneUtils.FOMAT_THUMBNAIL     = 'format_mxThumbnailImage';
FreezePaneUtils.FOMAT_SMALL         = 'format_mxSmallImage';
FreezePaneUtils.FOMAT_MEDIUM        = 'format_mxMediumImage';
FreezePaneUtils.FOMAT_LARGE         = 'format_mxLargeImage';
FreezePaneUtils.FOMAT_IMAGE         = 'format_mxImage';
FreezePaneUtils.FOMAT_THUMBNAIL_SIZE= emxUIConstants.FOMAT_THUMBNAIL_SIZE;
FreezePaneUtils.FOMAT_SMALL_SIZE    = emxUIConstants.FOMAT_THUMBNAIL_SIZE;
FreezePaneUtils.FOMAT_MEDIUM_SIZE   = emxUIConstants.FOMAT_THUMBNAIL_SIZE;
FreezePaneUtils.FOMAT_LARGE_SIZE    = emxUIConstants.FOMAT_THUMBNAIL_SIZE;

FreezePaneUtils.COLSETTING_WIDTH     = 'Width';
FreezePaneUtils.COLSETTING_IMAGESIZE = 'Image Size';
FreezePaneUtils.COLSETTING_COLUMNTYPE= 'Column Type';

FreezePaneUtils.COLATTR_EXPRESSION   = 'expression';

FreezePaneUtils.DESCR_COLUMN_WIDTH  = emxUIConstants.STR_SB_DESCR_WIDTH;
FreezePaneUtils.REV_COLUMN_WIDTH    = 50;
FreezePaneUtils.IMAGE_COLUMN_WIDTH  = emxUIConstants.STR_SB_IMAGE_WIDTH;
FreezePaneUtils.MIN_COLUMN_WIDTH    = emxUIConstants.STR_SB_MIN_WIDTH;
FreezePaneUtils.AVG_WIDTH           = null;
FreezePaneUtils.LAST_COL_CORRECTION = 17;
FreezePaneUtils.IS_PREDEFINED_WIDTH = true;
FreezePaneUtils.LAST_COL_WIDTH      = null;
FreezePaneUtils.TREE_LAST_COL_WIDTH = null;

FreezePaneUtils.getColWidth = function _getColWidth(objCol){
    return objCol.getSetting(this.COLSETTING_WIDTH);
}

FreezePaneUtils.getColImageSize = function _getColImageSize(objCol){
    var imageSize = (objCol.getSetting(this.COLSETTING_IMAGESIZE) == null )? "" :objCol.getSetting(this.COLSETTING_IMAGESIZE);
    return imageSize;
}

FreezePaneUtils.getColType = function _getColType(objCol){
    var colType = (objCol.getSetting(this.COLSETTING_COLUMNTYPE) == null )? "" :objCol.getSetting(this.COLSETTING_COLUMNTYPE);
    return colType;
}

FreezePaneUtils.getColExpression = function _getColExpression(objCol){
    var colExpr = (objCol.getAttribute(this.COLATTR_EXPRESSION) == null )? "" :objCol.getAttribute(this.COLATTR_EXPRESSION);
    return colExpr;
}

FreezePaneUtils.setColWidth = function _setColWidth(objCol,actualWidth, indexcounter){
    var cellIndex = objCol.index - indexcounter - parseInt(split) - 1;
    var colType     = this.getColType(objCol).toLowerCase();
    //to set the default width of column as 40 incase width setting of column is less than 40
    if(colType != "icon" && colType != "separator" && colType != "image" && colType != "file" && actualWidth < COL_MIN){
        actualWidth = COL_MIN;
    }
    editableTable.initDomVars();
    var tblhd       = editableTable.tblListHead.tBodies[0];
    var tbl         = editableTable.tblListBody.tBodies[0];
    if(hasMergedCells && objCol.getSetting("Row Number")!= "1"){
        colsInSecondRow++;
    }

    if(objCol.getSetting("Row Number")== "1"){
        var cIndex = cellIndex;
        cIndex -= colsInSecondRow ;
        var headCell    = tblhd.rows[0].cells[cIndex*2];
        var bodyCell    = tbl.rows[0].cells[cIndex];
        if(headCell && bodyCell){
            headCell.setAttribute("width", actualWidth - 2);
            bodyCell.setAttribute("width", actualWidth);
        }
    }
    var tblhdr = "";
    for(var i=1; i<tblhd.rows.length; i++){
        if(tblhd.rows[i] != undefined){
            tblhdr=tblhd.rows[i];
            for(var j=0;j<tblhdr.cells.length;j++){
                if(tblhdr.cells[j].className != "mx_separator" && tblhdr.cells[j].id == objCol.name){
                    cellIndex=j;
                    resetColWidth(tblhdr,cellIndex,actualWidth,objCol.index);
                }
            }
        }
    }

    _setSetting(oXML, "/mxRoot/columns/column[" + objCol.index + "]/settings", "Width", actualWidth - 2);
}

FreezePaneUtils.setTreeColWidth = function _setTreeColWidth(objCol,actualWidth, indexcounter,splitCount){
    var colType     = this.getColType(objCol).toLowerCase();
    var cellIndex = objCol.index - 1;
    //assign width of 200 to first column at tree side that has checkbox,expand n label
    if(cellIndex == 0 && this.getColWidth(objCol) == undefined && (actualWidth < TREE_FIRST_COL_WIDTH)){
        actualWidth = TREE_FIRST_COL_WIDTH;
    }
    //to set the default width of column as 40 incase width setting of column is less than 40
    if(colType != "icon" && colType != "separator" && colType != "image" && colType != "file" && actualWidth < COL_MIN){
        actualWidth = COL_MIN;
    }
    var tblhd       = editableTable.tblTreeHead.tBodies[0];
    if(hasMergedCells && objCol.getSetting("Row Number")!= "1"){
        colsInSecondRow ++;
    }
    if(objCol.getSetting("Row Number")== "1"){
        var cIndex = cellIndex;
        cIndex -= colsInSecondRow ;
        var hasDiffCodeColumn = emxUICore.selectSingleNode(oXML,"/mxRoot/tableControlMap//setting[@name='HasDiffCodeColumn']/value");
        var hasDiffCode = emxUICore.getText(hasDiffCodeColumn ).toLowerCase();
        var isReport = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='reportType']/text()");
        // InCase of Structure Compare the cIndex is incremented by 1 inorder to skip the Diff Code column while assigning the widths
        if (isStructureCompare == "TRUE") {
             // If HasDiffCodeColumn setting is false then cell index should not be incremented by 1
             if(hasDiffCode == "true" || !(isReport.nodeValue == "Complete_Summary_Report" || isReport.nodeValue == "Unique_toLeft_Report" || isReport.nodeValue == "Unique_toRight_Report")){
                 cIndex = cIndex + 1;
             }
        }
        var headCell    = tblhd.rows[0].cells[cIndex*2 + 2]; //two additional cells for colorization
        if(headCell){
            headCell.setAttribute("width", actualWidth - 2);
        }
    }
    var tblhdr = "";
    for(var i=0; i<tblhd.rows.length; i++){
        if(tblhd.rows[i] != undefined){
            tblhdr=tblhd.rows[i];
         for(var j=0;j<tblhdr.cells.length;j++){
         if(tblhdr.cells[j].className != "mx_separator" && tblhdr.cells[j].id == objCol.name){
            cellIndex=j;
            resetColWidth(tblhdr,cellIndex,actualWidth,objCol.index);
        }
    }
    }
    }
    _setSetting(oXML, "/mxRoot/columns/column[" + (objCol.index) + "]/settings", "Width", actualWidth - 2);

}

FreezePaneUtils.getImageColumnWidth = function _getImageColumnWidth(objCol){
    var colWidth = this.getColWidth(objCol);
    var imageSize   = this.getColImageSize(objCol);
    if(colWidth != null){
        return colWidth;
    }
    switch (imageSize){
    case this.FOMAT_THUMBNAIL:
        colWidth = this.FOMAT_THUMBNAIL_SIZE;
        break;
    case this.FOMAT_SMALL:
        colWidth = this.FOMAT_SMALL_SIZE;
        break;
    case this.FOMAT_MEDIUM:
        colWidth = this.FOMAT_MEDIUM_SIZE;
        break;
    case this.FOMAT_LARGE:
        colWidth = this.FOMAT_LARGE_SIZE;
        break;
    case this.FOMAT_IMAGE:
    default :
        colWidth = this.IMAGE_COLUMN_WIDTH;
    }
    return colWidth;
}

FreezePaneUtils.getImageColumnHeight = function _getImageColumnHeight(objCol){
    var imageSize   = this.getColImageSize(objCol);
    var colhgt;
    switch (imageSize){
		case this.FOMAT_THUMBNAIL:
			colhgt = emxUIConstants.FOMAT_THUMBNAIL_SIZE;
			break;
		case this.FOMAT_SMALL:
			colhgt = emxUIConstants.FOMAT_SMALL_SIZE;
			break;
		case this.FOMAT_MEDIUM:
			colhgt = emxUIConstants.FOMAT_MEDIUM_SIZE;
			break;
		case this.FOMAT_LARGE:
			colhgt = emxUIConstants.FOMAT_LARGE_SIZE;
			break;
		case this.FOMAT_IMAGE:
		default :
			colhgt = this.IMAGE_COLUMN_WIDTH;
    }
    return colhgt;
}

FreezePaneUtils.getActualWidth = function _getActualWidth(objCol,avgWidth){

    var colType     = this.getColType(objCol).toLowerCase();
    var colExpr     = this.getColExpression(objCol).toLowerCase();
    var colWidth = this.getColWidth(objCol);
    switch (colType){
    case this.COLTYPE_FILE:
    case this.COLTYPE_ICON:
        colWidth = 30;
        break;
    case this.COLTYPE_SEPARATOR:
        colWidth = 6;
        break;
    case this.COLTYPE_IMAGE:
        colWidth = this.getImageColumnWidth(objCol);
        break;
    }
    if (colWidth == null && colExpr != null && colExpr == this.COLEXPR_DESCR){
        if(this.DESCR_COLUMN_WIDTH < avgWidth){
            colWidth = avgWidth;
        }else{
            colWidth = this.DESCR_COLUMN_WIDTH;
        }
    }

    if (colWidth == null && colExpr != null && colExpr == this.COLEXPR_REV){
        colWidth = this.REV_COLUMN_WIDTH;
    }

    if(colWidth == null && avgWidth != null){
        colWidth = (avgWidth > this.MIN_COLUMN_WIDTH)? avgWidth : this.MIN_COLUMN_WIDTH;
    }
    //alert(objCol.name + "<<<>>>" +colWidth);
    if(colWidth == null && this.IS_PREDEFINED_WIDTH){
        this.IS_PREDEFINED_WIDTH = false;
    }
    return colWidth;
}

FreezePaneUtils.getAvgWidth = function _getAvgWidth(){
    var tableWidth      = null;
    var isReport = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='reportType']/text()");
    if(isStructureCompare == "TRUE" && !(isReport.nodeValue == "Unique_toLeft_Report" || isReport.nodeValue == "Unique_toRight_Report")) {
        tableWidth = getWindowWidth()/2;
    }
    else {
        tableWidth = editableTable.divListBody.offsetWidth - this.LAST_COL_CORRECTION;
    }
    var sumDefWidth     = 0;
    var availColCount   = 0;
    var sumWidth        = 0;
    var descrColWidth   = null;
    var lastColWidth    = null;
    for(var i = parseInt(split); i < colMap.columns.length; i++){
        var theColumn = colMap.columns[i];
        var dm = theColumn.getSetting('Display Mode');
        if(dm) {
            if((editableTable.mode == 'view' && dm == 'edit')  || (editableTable.mode == 'edit' && dm == 'view') ){
                continue;
            }
        }
        var aColWidth   = this.getActualWidth(theColumn);
        var colExpr     = this.getColExpression(theColumn).toLowerCase();
        if (colExpr != null && colExpr == this.COLEXPR_DESCR){
            descrColWidth = parseInt(aColWidth);
        }
        if(i == colMap.columns.length - 1){
            lastColWidth = parseInt(aColWidth);
        }
        if(aColWidth != null && theColumn.getSetting("Row Number")== "1"){
            sumWidth += parseInt(aColWidth);
        }else{
            availColCount++;
        }
    }
    var actualColWidth  = tableWidth - sumWidth;
    var avgWidth        = parseInt (actualColWidth / availColCount);
    //do the correction if avgwidth is more than descr col width
    if(descrColWidth != null && descrColWidth < avgWidth){
        avgWidth = parseInt((actualColWidth + descrColWidth)/(availColCount + 1));
    }
    if(this.IS_PREDEFINED_WIDTH && actualColWidth > 0){
        this.LAST_COL_WIDTH = actualColWidth + lastColWidth;
    }

    return avgWidth;

}
FreezePaneUtils.getTreeAvgWidth = function _getAvgWidth(splitCount){
    var treeWidth      = null;
    var isReport = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='reportType']/text()");
    if(isStructureCompare == "TRUE" && !(isReport.nodeValue == "Unique_toLeft_Report" || isReport.nodeValue == "Unique_toRight_Report")) {
        treeWidth = getWindowWidth()/2;
    } else {
        treeWidth = editableTable.divTreeBody.offsetWidth;
    	var colorizeSetting = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name='colorize']");
    	if(colorizeSetting != null && emxUICore.getText(colorizeSetting).toLowerCase() === 'yes'){
    		treeWidth -= COLORIZATION_COL_WIDTH; //ignore colorization column
    	}
    }
    var sumDefWidth     = 0;
    var availColCount   = 0;
    var sumWidth        = 0;
    var descrColWidth   = null;
    var lastColWidth    = null;
    var firstColWidth   = null;
    var isLastColumn = false;
    for(var i = 0; i < parseInt(split); i++){
        var theColumn = colMap.columns[i];
        var dm = theColumn.getSetting('Display Mode');
        if(dm) {
            if((editableTable.mode == 'view' && dm == 'edit')  || (editableTable.mode == 'edit' && dm == 'view') ){
                continue;
            }
        }
        var aColWidth   = this.getActualWidth(theColumn);
        if((i == (parseInt(split)) - 1) && aColWidth != undefined){
            lastColWidth = parseInt(aColWidth);
            isLastColumn = true;

        }
        if((i == 0) && !aColWidth && theColumn.getSetting("Row Number")== "1"){
            // For structure comapre we are not setting the width to 200 for the first column on tree side.It should be uniform on both tree and table sides
            if(isStructureCompare != "TRUE"){
            sumWidth += TREE_FIRST_COL_WIDTH;
        }
        }
        if(aColWidth != null && theColumn.getSetting("Row Number")== "1"){
            sumWidth += parseInt(aColWidth);
        }else{
            availColCount++;
        }
    }
    var actualColWidth  = treeWidth - sumWidth;
    var avgWidth        = parseInt (actualColWidth / availColCount);
    //to get the last column width only if column has predefined width set in business else donothing
    if((splitCount > 1) && isLastColumn && (actualColWidth > 0) && (lastColWidth < actualColWidth)){
        this.TREE_LAST_COL_WIDTH = actualColWidth;
    }
    return avgWidth;
}

FreezePaneUtils.adjustTableColumns = function _adjustTableColumns(){
    var avgWidth = this.getAvgWidth();
    var indexcounter = 0;
    for(var coli = parseInt(split); coli < colMap.columns.length; coli++){
        var theColumn = colMap.columns[coli];
        var dm = theColumn.getSetting('Display Mode');
        if(dm) {
            if((editableTable.mode == 'view' && dm == 'edit')  || (editableTable.mode == 'edit' && dm == 'view') || (dm !='edit' && dm != 'view')){
                indexcounter += 1;
                continue;
            }
        }
        // get Local Storage for coloumn persistence
        var actualWidth = getLocalStorageforColumnwidth( theColumn.name );
        if(actualWidth == null || actualWidth == 'undefined' || actualWidth == "")
        {
        	actualWidth = this.getActualWidth(theColumn,avgWidth);
        }
        if(coli == colMap.columns.length - 1){
            if(this.LAST_COL_WIDTH){
                actualWidth = this.LAST_COL_WIDTH;
            }
        }
        var colWidth = this.getColWidth(theColumn);
        var colLabel = theColumn.label.toLowerCase();
        if(colWidth == null && colLabel && colLabel.length * 9 > actualWidth && colLabel.indexOf("&lt;img") == -1 && colLabel.indexOf("<img") == -1 && theColumn.type != this.COLTYPE_SEPARATOR){
            actualWidth = colLabel.length * 9;
        }
        this.setColWidth(theColumn,actualWidth, indexcounter);
        if(coli == colMap.columns.length - 1){
            LAST_TABLE_COL_WIDTH = actualWidth;
        }
    }
    colsInSecondRow=0;
    adjustWithCellWidth(editableTable.tblListHead);
    adjustWithCellWidth(editableTable.tblListBody);

}

/*V6R2014 UKU
 * THis method wil return the current active TAB Channel if SB loaded.
 * */
FreezePaneUtils.getCurrentChannelName = function _getCurrentChannelName(){
    if(portalMode == "true"){
        return parent.$(".tab-active")[0].title;
    }else{
        return "";
    }

}

FreezePaneUtils.adjustTreeColumns = function _adjustTreeColumns(){
    var splitCount=parseInt(split);
    var avgWidth = this.getTreeAvgWidth(splitCount);
    var indexcounter = 0;
    for(var coli = 0 ; coli < splitCount; coli++){
        var theColumn = colMap.columns[coli];
        var dm = theColumn.getSetting('Display Mode');
        if(dm) {
            if((editableTable.mode == 'view' && dm == 'edit')  || (editableTable.mode == 'edit' && dm == 'view') ){
                indexcounter += 1;
                continue;
            }
        }
     // get Local Storage for freeze pane tree coloumn persistence
        var actualWidth = getLocalStorageforColumnwidth( theColumn.name );
        if(actualWidth == null || actualWidth == 'undefined' || actualWidth == "")
        {
        	actualWidth = this.getActualWidth(theColumn,avgWidth);
        }
        //var actualWidth = this.getActualWidth(theColumn,avgWidth);
        // to adjust the last column width in tree side
        if((splitCount > 1) && coli == splitCount - 1){
            if(this.TREE_LAST_COL_WIDTH){
                actualWidth = this.TREE_LAST_COL_WIDTH;
            }
        }
        var colWidth = this.getColWidth(theColumn);
        var colLabel = theColumn.label.toLowerCase();
        if(colWidth == null && colLabel && colLabel.length * 9 > actualWidth && colLabel.indexOf("&lt;img") == -1 && colLabel.indexOf("<img") == -1 && theColumn.type != this.COLTYPE_SEPARATOR){
            actualWidth = colLabel.length * 9;
        }
        this.setTreeColWidth(theColumn,parseInt(actualWidth), indexcounter,splitCount);

    }
    colsInSecondRow=0;
}
/*****************************/

//This method is depricated and need to cleanedup
function synchTreeandTable(bSynctree){
    //FIX for IR-076708V6R2012
    if(!editableTable.tblListBody) return;

    if(bFullListDrawn && bFullTreeDrawn){
        if(bSynctree){
            for(var i =1; i < editableTable.tblListBody.rows.length; i++){
                var tempHeight = editableTable.tblListBody.rows[i].clientHeight;
                if(tempHeight >0 && tempHeight < editableTable.rowhgt){
                    tempHeight = editableTable.rowhgt;
                }
                editableTable.tblListBody.rows[i].setAttribute("height",tempHeight);
                editableTable.tblTreeBody.rows[i].setAttribute("height",tempHeight);
            }
        }else{
        for(var i =1; i < editableTable.tblListBody.rows.length; i++){
            var tempHeight = editableTable.tblListBody.rows[i].clientHeight;
            if(tempHeight < editableTable.rowhgt){
                tempHeight = editableTable.rowhgt;
                editableTable.tblListBody.rows[i].setAttribute("height",tempHeight);
            }
            var rowNum = '';
            if(editableTable.tblTreeBody.rows[i].cells[1]) {
                rowNum = editableTable.tblTreeBody.rows[i].cells[1].getAttribute("rowNumber");
            }
            if(hasMergedCells && rowNum != '1'){
                editableTable.tblTreeBody.rows[i].setAttribute("height",'');
            }else{
                editableTable.tblTreeBody.rows[i].setAttribute("height",tempHeight);
            }
        }
        }
    }else {
    var treeindex = 1;
        var index = nDisplayStartRow;
    for(var i =1; i < editableTable.tblListBody.rows.length; i++){
        var listsideid = editableTable.tblListBody.rows[i].id;

        var tempHeight = editableTable.rowhgt;
        tempHeight = editableTable.tblListBody.rows[i].clientHeight;
        if(tempHeight < editableTable.rowhgt){
            tempHeight = editableTable.rowhgt;
            editableTable.tblListBody.rows[i].setAttribute("height",tempHeight);
        }
            if (listsideid != "") {
                var nRow = aDisplayRows[index++];
            nRow.setAttribute("height", tempHeight);
        }

        if(i == 1) {
            for(var j =1; j < editableTable.tblTreeBody.rows.length; j++){
                var treesideid = editableTable.tblTreeBody.rows[j].id;
                if(treesideid == listsideid){
                    treeindex = j;
                    var rowNum = '1';
                    if(editableTable.tblTreeBody.rows[treeindex].cells[1]){
                        rowNum = editableTable.tblTreeBody.rows[treeindex].cells[1].getAttribute("rowNumber");
                    }
                    if(hasMergedCells && rowNum != '1'){
                        if(!isIE) {
                            setTimeout(function(){editableTable.tblTreeBody.rows[treeindex].setAttribute("height",'');}, 0);
                        } else {
                            editableTable.tblTreeBody.rows[treeindex].setAttribute("height",'');
                        }
                    }else{
                        if(!isIE) {
                            setTimeout(function(){editableTable.tblTreeBody.rows[treeindex].setAttribute("height",tempHeight);}, 0);
                        } else {
                            editableTable.tblTreeBody.rows[treeindex].setAttribute("height",tempHeight);
                        }
                    }
                    break;
                }
            }
        } else {
            treeindex++;
            var rowNum = '1';
            if(editableTable.tblTreeBody.rows[treeindex].cells[1]){
                rowNum = editableTable.tblTreeBody.rows[treeindex].cells[1].getAttribute("rowNumber");
            }
            if(hasMergedCells && rowNum != '1'){
                if(!isIE) {
                    setTimeout(function(){editableTable.tblTreeBody.rows[treeindex].setAttribute("height",'');}, 0);
                } else {
                    editableTable.tblTreeBody.rows[treeindex].setAttribute("height",'');
                }
            }else{
                    editableTable.tblTreeBody.rows[treeindex].setAttribute("height",tempHeight);
                }
            }
        }
    }
    editableTable.tblListHead.style.position="relative";
    editableTable.tblListHead.style.left = -editableTable.divListBody.scrollLeft+"px";
    editableTable.tblTreeHead.style.position="relative";
    editableTable.tblTreeHead.style.left = -editableTable.divTreeBody.scrollLeft+"px";

    if(isIE) {
        setTimeout("editableTable.divTreeBody.scrollTop = (editableTable.divListBody.scrollTop)",25);
    } else {
        editableTable.divTreeBody.scrollTop  = editableTable.divListBody.scrollTop;
    }

}

function GetNextPage () {
var time0 = new Date();
    changeHeightSettings(true);
    RefreshViewScroll();
	/*********************************************
	* Start for performance 20170228
	*********************************************/	
    //gblScrTop = editableTable.divListBody.scrollTop;
    setTimeout("gblScrTop = editableTable.divListBody.scrollTop",10);
	/*********************************************
	* End for performance 20170228
	*********************************************/	
var time1 = new Date();
console.log(">>>GetNextPage="+(time1-time0) + "(" + (time1-time0) + ")");
}
//Ended for SB Scroll improvements

function changeHeightSettings(isScroll){
	var scrollDirection;
    if(gblScrTop < editableTable.divListBody.scrollTop){//scrolldown
        scrollDirection = 'down';
    }else if (gblScrTop > editableTable.divListBody.scrollTop){//scrollup
        scrollDirection = 'up';
    }
    //console.log("scrollDirection  " + scrollDirection);


    var totheight = 0;
    var ntophiddenHeight = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name = 'tophiddenHeight']");
    
    
    var scrollOffsetVal;
	if(!isNaN(gblScrollPageSize) && scrollDirection){
        if(scrollDirection == 'down'){
            scrollOffsetVal = parseInt(parseInt(gblScrollPageSize) / 4);
        }else if((scrollDirection == 'up')) {
            scrollOffsetVal = parseInt(parseInt(gblScrollPageSize) / 2);
        }
	}else{
		scrollOffsetVal = 0;
	}
    //console.log("scrollOffsetVal  " + scrollOffsetVal);
  
    for(var i =0; i < aDisplayRows.length; i++){
        var tmpheight = aDisplayRows[i].getAttribute("height");
        if(!tmpheight){
            tmpheight = editableTable.rowhgt;
        }
        tmpheight = tmpheight * 1;
        if(totheight + tmpheight > editableTable.divListBody.scrollTop - (editableTable.rowhgt*scrollOffsetVal)){
            windowFirstRow = i;
            emxUICore.setText(ntophiddenHeight, totheight);
            break;
        }

        totheight = totheight + tmpheight
    }

    if(windowFirstRow >= aDisplayRows.length){
        windowFirstRow = aDisplayRows.length - 1;
    }

    if(windowFirstRow < 0){
        windowFirstRow = 0;
    }

    var pageSizeLast = (windowFirstRow + scrollPageSize < aDisplayRows.length ) && (totalRows > maxFullDrawRows) ? windowFirstRow + scrollPageSize :  aDisplayRows.length;
    totheight = 0;

    for(var i = windowFirstRow; i < pageSizeLast; i++){
        var tmpheight = aDisplayRows[i].getAttribute("height");
        if(!tmpheight)  tmpheight = editableTable.rowhgt;
        tmpheight = tmpheight * 1;
        totheight = totheight + tmpheight;
    }

    while(totheight < editableTable.divListBody.clientHeight){
        if(windowFirstRow > 0)
            windowFirstRow--;
        else
            break;

        var tmpheight = aDisplayRows[windowFirstRow].getAttribute("height");
        if(!tmpheight){
            tmpheight = editableTable.rowhgt;
        }
        tmpheight = tmpheight * 1;
        totheight = totheight + tmpheight;
        emxUICore.setText(ntophiddenHeight, (emxUICore.getText(ntophiddenHeight) * 1) - tmpheight);
    }

    var nbottomhiddenHeight = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name = 'bottomhiddenHeight']");
    if( aDisplayRows.length - pageSizeLast > 0){
        totheight = 0;
        for(var i = pageSizeLast; i < aDisplayRows.length; i++){
            var tmpheight = aDisplayRows[i].getAttribute("height");
            if(!tmpheight){
                tmpheight = editableTable.rowhgt;
            }
            tmpheight = tmpheight * 1;
            totheight = totheight + tmpheight;
        }
        var nbottomhiddenHeight = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name = 'bottomhiddenHeight']");
        emxUICore.setText(nbottomhiddenHeight, totheight);
    } else {
        emxUICore.setText(nbottomhiddenHeight, 0);
    }

    if(windowFirstRow < 0){
        windowFirstRow = 0;
    }

    firstRow = windowFirstRow;
    var nfirstrow = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name = 'first-row']");
    emxUICore.setText(nfirstrow, firstRow);
}
// Added for bug 354871
// This method is added to support the viewer functionality from SB. This method is used in emxCommonFileBase jpo's getViewerURL method
// Author: NUW
function openViewer(objectId, action, fileName, format, refresh, closeWindow, appName, appDir, partId, version)
{
    var FilterFramePage = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name = 'FilterFramePage']")
    var s = emxUICore.getText(FilterFramePage);
    if(s != undefined && s != null)
    {
        var objHTTP = emxUICore.createHttpRequest();
        objHTTP.open("get", s, false);
        objHTTP.send(null);
        var result = objHTTP.responseText;
        var objWin = null;
        if(!isIE)
        {
            objWin = showModalDialog(s,"730","450",true,true);
            if(objWin != null)
            {
                objWin.onload = function () {
                objWin.callCheckout(objectId, action, fileName, format, refresh, closeWindow, appName, appDir, partId, version,true);
                   };
            }
           }
           else
           {
               objWin = window.open("");
               if(objWin != null)
               {
                   objWin.document.open("text/html","replace");
                objWin.document.write(result);
                objWin.document.close();
                   objWin.callCheckout(objectId, action, fileName, format, refresh, closeWindow, appName, appDir, partId, version,true);
               }
           }
       }
}

/*
 * Method to Select multiple rows
 * Introduced in V6R2009-HF23
 */
emxEditableTable.select = function __select(arrRowIds, selectCallBack){
    var nSelection = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='selection']");
    //Start:Cross Highlighting Change
    var strSelection =  (nSelection == null || typeof nSelection == "undefined") ? "none" : emxUICore.getText(nSelection);
    var totheight = 0;
    //End:Cross Highlighting Change
    if(strSelection == "single"){
        var nSelectRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + arrRowIds[0] + "']");
        if(nSelectRow != null){
            var attrChecked = nSelectRow.getAttribute("checked");
            var isSelected = false;
            if(attrChecked != null && attrChecked =="checked"){
                isSelected = true;
            }
            var id = nSelectRow.getAttribute("id");
            var oid = nSelectRow.getAttribute("o");
            var relid = nSelectRow.getAttribute("r");
            if (relid == null || relid == "null") {
                relid = "";
            }
            var parentId = nSelectRow.getAttribute("p");
            if (parentId == null || parentId == "null") {
                parentId = "";
            }
            if(!isSelected){
                nSelectRow.setAttribute("checked","checked");
                FreezePaneregister(relid + "|" + oid + "|" + parentId + "|" + id);
				if (displayView == "detail") {
					try {
						var treeRowCSSSelector = "#treeBodyTable tr#" + arrRowIds[0].replace(/,/g , "\\,");
						var treeRows = $(treeRowCSSSelector);
						treeRows[0].classList.add("mx_rowSelected");
						treeRows[1].cells[3].firstChild.setAttribute("checked", "checked");
						$("#bodyTable tr#" + arrRowIds[0].replace(/,/g , "\\,"))[0].classList.add("mx_rowSelected");
					} catch(ex) {
						// row is not in visible area. Do nothing in UI
					}
				} else if (displayView == "tree") {
					var foundNode = findNode(tree.root, arrRowIds[0]);
					foundNode.body.el.firstChild.classList.remove("selected");
				}
            }
        }
    }else if(strSelection == "multiple" || strSelection == "none"){
        for(var itr = 0 ; itr < arrRowIds.length; itr++){
            var nSelectRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + arrRowIds[itr] + "']");
            if(nSelectRow == null || typeof nSelectRow == "undefined"){
                continue;
            }
            var attrSelect = nSelectRow.getAttribute("selection");
            if(attrSelect == null){
                attrSelect = "none";
            }
            if(nSelectRow != null){
                var attrChecked = nSelectRow.getAttribute("checked");
                var isSelected = false;
                if(attrChecked != null && attrChecked =="checked"){
                    isSelected = true;
                }
                var id = nSelectRow.getAttribute("id");
                var oid = nSelectRow.getAttribute("o");
                var relid = nSelectRow.getAttribute("r");
                if (relid == null || relid == "null") {
                    relid = "";
                }
                var parentId = nSelectRow.getAttribute("p");
                if (parentId == null || parentId == "null") {
                    parentId = "";
                }
                if(!isSelected){
                    nSelectRow.setAttribute("checked","checked");
                    if(strSelection == "none" || strSelection == "multiple" || attrSelect == "multiple" || (attrSelect == "single" && itr == 0)){
                        FreezePaneregister(relid + "|" + oid + "|" + parentId + "|" + id, selectCallBack);
                    }
                    if (displayView == "detail") {
						try {
							var treeRowCSSSelector = "#treeBodyTable tr#" + arrRowIds[itr].replace(/,/g , "\\,");
							var treeRows = $(treeRowCSSSelector);
							treeRows[0].classList.add("mx_rowSelected");
							treeRows[1].cells[3].firstChild.setAttribute("checked", "checked");
							$("#bodyTable tr#" + arrRowIds[itr].replace(/,/g , "\\,"))[0].classList.add("mx_rowSelected");
						} catch(ex) {
							// row is not in visible area. Do nothing in UI
						}
					} if (displayView == "tree") {
						var foundNode = findNode(tree.root, arrRowIds[itr]);
						foundNode.body.el.firstChild.classList.remove("selected");
					}
                }
            }

        }

    }else{
        //do nothing
    }
    scrollToSelected(arrRowIds[arrRowIds.length-1]);
    if (displayView == "detail") {
    rebuildView();
	} else if (displayView == "tree") {
		if(strSelection == "multiple" || strSelection == "none") {
			for(var itr = 0 ; itr < arrRowIds.length; itr++){
				var foundNode = findNode(tree.root, arrRowIds[itr]);
				foundNode.body.el.firstChild.classList.add("selected");
			}
		} else {
			var foundNode = findNode(tree.root, arrRowIds[0]);
			foundNode.body.el.firstChild.classList.add("selected");
		}
	}
    //RefreshView();
}

/************** Cross Highlight Changes Start***************/
emxEditableTable.unselect = function __unselect(arrRowIds, selectCallBack){
    var nSelection = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='selection']");
    //Start:Cross Highlighting Change
    var strSelection =  (nSelection == null || typeof nSelection == "undefined") ? "none" : emxUICore.getText(nSelection);
    //End:Cross Highlighting Change
    if(strSelection == "single"){
        var nSelectRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + arrRowIds[0] + "']");
        if(nSelectRow != null){
            var attrChecked = nSelectRow.getAttribute("checked");
            var isSelected = false;
            if(attrChecked != null && attrChecked =="checked"){
                isSelected = true;
            }
            var id = nSelectRow.getAttribute("id");
            var oid = nSelectRow.getAttribute("o");
            var relid = nSelectRow.getAttribute("r");
            if (relid == null || relid == "null") {
                relid = "";
            }
            var parentId = nSelectRow.getAttribute("p");
            if (parentId == null || parentId == "null") {
                parentId = "";
            }
            if(isSelected){
                nSelectRow.removeAttribute("checked");
                FreezePaneunregister(relid + "|" + oid + "|" + parentId + "|" + id);
				if (displayView == "detail") {
					try {
						var treeRowCSSSelector = "#treeBodyTable tr#" + arrRowIds[0].replace(/,/g , "\\,");
						var treeRows = $(treeRowCSSSelector);
						treeRows[0].classList.remove("mx_rowSelected");
						treeRows[1].cells[3].firstChild.removeAttribute("checked");
						$("#bodyTable tr#" + arrRowIds[0].replace(/,/g , "\\,"))[0].classList.remove("mx_rowSelected");
					} catch(ex) {
						// row is not in visible area. Do nothing in UI
					}
				} else if (displayView == "tree") {
					var foundNode = findNode(tree.root, arrRowIds[0]);
					foundNode.body.el.firstChild.classList.remove("selected");
				}
            }
        }
    }else if(strSelection == "multiple" || strSelection == "none"){
        for(var itr = 0 ; itr < arrRowIds.length; itr++){
            var nSelectRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + arrRowIds[itr] + "']");
            if(nSelectRow == null || typeof nSelectRow == "undefined"){
                continue;
            }
            var attrSelect = nSelectRow.getAttribute("selection");
            if(attrSelect == null){
                attrSelect = "none";
            }
            if(nSelectRow != null){
                var attrChecked = nSelectRow.getAttribute("checked");
                var isSelected = false;
                if(attrChecked != null && attrChecked =="checked"){
                    isSelected = true;
                }
                var id = nSelectRow.getAttribute("id");
                var oid = nSelectRow.getAttribute("o");
                var relid = nSelectRow.getAttribute("r");
                if (relid == null || relid == "null") {
                    relid = "";
                }
                var parentId = nSelectRow.getAttribute("p");
                if (parentId == null || parentId == "null") {
                    parentId = "";
                }
                if(isSelected){
                    nSelectRow.removeAttribute("checked");
                    if(strSelection == "none" || strSelection == "multiple" || attrSelect == "multiple" || (attrSelect == "single" && itr == 0)){
                        FreezePaneunregister(relid + "|" + oid + "|" + parentId + "|" + id, selectCallBack);
                    }
                    if (displayView == "detail") {
						try {
							var treeRowCSSSelector = "#treeBodyTable tr#" + arrRowIds[itr].replace(/,/g , "\\,");
							var treeRows = $(treeRowCSSSelector);
							treeRows[0].classList.remove("mx_rowSelected");
							treeRows[1].cells[3].firstChild.removeAttribute("checked");
							$("#bodyTable tr#" + arrRowIds[itr].replace(/,/g , "\\,"))[0].classList.remove("mx_rowSelected");
						} catch(ex) {
							// row is not in visible area. Do nothing in UI
						}
					} if (displayView == "tree") {
						var foundNode = findNode(tree.root, arrRowIds[itr]);
						foundNode.body.el.firstChild.classList.remove("selected");
					}
                }
            }
        }
    }else{
        //do nothing
	}
}
/************** Cross Highlight Changes End***************/
/*
 * Method to Expand multiple rows to a specified level
 * Introduced in V6R2009-HF23
 */
emxEditableTable.expand = function __expand(arrRowIds,level,refreshClient){
	if (typeof refreshClient == "undefined") {
		refreshClient = true;
	}
	reloadGSB = true;
    if(isDataModified()){
        alert(emxUIConstants.STR_EXPANDALLALERT);
        if(portalMode == "true"){
            setTimeout("toggleProgress('hidden')", 100);
        }
        return;
    }
    if(level == null){
        level = "1";
    }



    var dirRelType = "&";
    var direction = "";
    var whereExp = "";
    var matchCount = 0;
    //get to and from
    var toVal = (document.getElementById("to"))?document.getElementById("to").checked:0;
    var fVal = (document.getElementById("from"))?document.getElementById("from").checked:0;
    if (document.getElementById("to")) {
        if(toVal && fVal){
            resetParameter("direction","both");
            dirRelType += "&direction=both";
            direction = "both";
        }else if(toVal){
            resetParameter("direction","to");
            dirRelType += "&direction=to";
        }else if(fVal){
            resetParameter("direction","from");
            dirRelType += "&direction=from";
        }else{
            resetParameter("direction","both");
            dirRelType += "&direction=both";
            direction = "both";
        }
    }
    if(level == "All" && direction == "both"){
        alert(emxUIConstants.STR_ALLLEVEL_ERROR);
        if(portalMode == "true"){
            setTimeout("toggleProgress('hidden')", 100);
        }
        return;
    }
    //get filters type
    var formItem = document.getElementById("select_type");
    var typeFilter = (formItem && formItem.options)?formItem[formItem.selectedIndex].value:0;

    if(typeFilter){
        resetParameter("selectedType",typeFilter);
        dirRelType += "&selectedType=" + typeFilter;
    }
    //relationship
    formItem = document.getElementById("select_relationship");
    var relFilter = (formItem && formItem.options)?formItem[formItem.selectedIndex].value:0;

    if(relFilter){
        resetParameter("selectedRelationship",relFilter);
        dirRelType += "&selectedRelationship=" + relFilter;
    }

    for(var itr = 0 ; itr < arrRowIds.length; itr++){
        var nExpandRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + arrRowIds[itr] + "']");
        if(nExpandRow == null || typeof nExpandRow == "undefined"){
            continue;
        }
        if(nExpandRow != null){
            var id = nExpandRow.getAttribute("id");
            // Check if row has already been expanded
            // if not then query server to get expanded nodes
            var expand = nExpandRow.getAttribute("expand");
            var display = nExpandRow.getAttribute("display");
            var updateTableCache = "false";
            var toolbarData = getToolbarData(true);
            var expandedLevel = nExpandRow.getAttribute("expandedLevels");

            if (level != null){
                if((expandedLevel != null && (expandedLevel != level || manualExpand)) || (expandedLevel == null)){
                    expand = false;
                    updateTableCache = "true";
                }
                //If the level is "All" we want to re-expand
                if(level == "All"){
                    expand = false;
                    updateTableCache = "true";
                }
                if (!expand) {
                    var childNodes = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@id ='" + arrRowIds[itr] + "']/r");
                    for (var ctr = 0; ctr < childNodes.length; ctr++){
                        childNodes[ctr].parentNode.removeChild(childNodes[ctr]);
                    }
                }
            }

            if (!expand) {
                if(matchCount == 0){
                    //displayMask();
                    matchCount++;
                }
                whereExp = "&levelId=" + arrRowIds[itr] + dirRelType;
                bExpandOperation = true;
                var oLocalXML = null;
                //var requestMap = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='expandFilter']/text()");


                    oLocalXML = emxUICore.getXMLData("emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp + "&expandLevel=" +level+
                                         "&levelId=" + arrRowIds[itr] + dirRelType + toolbarData+"|updateTableCache=" + updateTableCache+"&IsStructureCompare="+isStructureCompare);

                    if(editableTable.mode == "edit" && ((preProcessURL && preProcessURL !="") || (preProcessJPO && preProcessJPO !="")))
                    {
                        var action = processHookIn("pre", arrRowIds[itr]);
                        if (action.toLowerCase() == "stop") {
                            if(portalMode == "true"){
                                setTimeout("toggleProgress('hidden')", 100);
                            }
                            return;
                        }
                        oLocalXML = emxUICore.getXMLDataPost("emxFreezePaneGetData.jsp?fpTimeStamp=" + timeStamp + "&expandLevel=" +level+
                                         "&levelId=" + arrRowIds[itr] + dirRelType + toolbarData+"&IsStructureCompare="+isStructureCompare);
                    }
                    nExpandRow.setAttribute("expandedLevels", level);



                    if (oLocalXML) {
                    //ixk: sb performace
                    /*
                    var aAllTempRows = emxUICore.selectNodes(oLocalXML, "/mxRoot/rows//r");
                    for(var p=0;p<aAllTempRows.length;p++){
                        if(aAllTempRows[p].getAttribute("display")==null)
                            aAllTempRows[p].setAttribute("display","block");
                    }*/
                    var aAllRows = emxUICore.selectNodes(oLocalXML, "/mxRoot/rows/r");
                    for (var i = 0; i < aAllRows.length; i++) {
                        nExpandRow.appendChild(aAllRows[i].cloneNode(true));
                    }
                }
                nExpandRow.setAttribute("expand", "true");
                nExpandRow.setAttribute("display", "block");
				var afterExpandJS = getParameter("afterExpandJS");
				if (!expand && afterExpandJS && afterExpandJS.length > 0) {
					eval(afterExpandJS + "('" + arrRowIds[itr] + "')");
				}
            }
        }
    }

    /*else{
        finishLongOperation();
    }*/

    //row grouping post expand.
    applyExistingAutoFilterSelections();
    processRowGroupingToolbarCommand("processPostExpand");

    // As row has been expanded or collapsed, the display rows will change
    // so recalculate display rows again.
    aDisplayRows = getDisplayRows();
    totalRows = aDisplayRows.length;
    var nTotalRows = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name = 'total-rows']");
    emxUICore.setText(nTotalRows, totalRows);
    listHidden.document.location.href = "../common/emxMQLNoticeWrapper.jsp";
    turnOffProgress();
    if(portalMode == "true"){
        setTimeout("toggleProgress('hidden')", 100);
    }
	if (refreshClient) {
		rebuildView(false);
    doCheckSelectAll();
}
}

function RefreshObjectCounts(){
    //Update the counter everytime to reflect the number of objects present in table
    var fullTextSearch = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name = 'fullTextSearch']");
    var fullTextObjCount = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name = 'fullTextObjCount']");

    if(emxUICore.getText(fullTextSearch) == 'true'){
        var fullTextObjectCount = parseInt(emxUICore.getText(fullTextObjCount));
        if(fullTextSearchObj){
            fullTextSearchObj.setResultsCount(fullTextObjectCount);
        }
        var objCount = parseInt(totalObjectCount(false))
        var curpage = getParameter('currentPage');
        var pgAction = getParameter('pgAction');
        var paginationRange = getParameter('paginationRange');
        var pageSize = getParameter('pageSize');
        if(paginationRange == null || paginationRange == 'undefined' || paginationRange == '') {
            paginationRange = emxUIConstants.STR_PAGE_SIZE;
        }
        if(!(pageSize == null || pageSize == 'undefined' || pageSize == '')) {
            paginationRange = pageSize;
        }
        if(fullTextSearchObj){
            //If block added for Autonomy Search Fill-Pages feature
            if(isFillPagesOn()) {
                var nextFTSIndex = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name = 'nextFTSIndex']");
                var prevFTSIndex = emxUICore.selectSingleNode(oXML, "/mxRoot/requestMap/setting[@name = 'prevFTSIndex']");
                if(nextFTSIndex != null) {
                    nextFTSIndex =  parseInt(emxUICore.getText(nextFTSIndex));
                }
                if(prevFTSIndex != null) {
                    prevFTSIndex =  parseInt(emxUICore.getText(prevFTSIndex));
                }
                var curFTSIndex = getParameter('curFTSIndex');
                editableTable.mx_resultCount.innerHTML = fullTextSearchObj.doNewPagination(fullTextObjectCount,curpage,pgAction,objCount,countSelectedObjects(), paginationRange, nextFTSIndex, prevFTSIndex, curFTSIndex, curPageCounter);
            }
            else {
            editableTable.mx_resultCount.innerHTML = fullTextSearchObj.doPagination(fullTextObjectCount,curpage,pgAction,objCount,countSelectedObjects(), paginationRange);
        }
        }
        //For Bug 366863
        var _pageSize = document.getElementById("numobjsperpage");
        if(_pageSize != null) {
            _pageSize.value = paginationRange;
        }
    }
    else {
        var totcnt = totalObjectCount();
        var aObjCount = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[((@level = '0' or count(ancestor::r[not(@display) or @display = 'none']) = '0') and (not(@filter) or @filter != 'true') and not(@rg) and not(@calc))]");
        var totcnt1 = aObjCount.length;

            try {
                var headerHeight = 130;//TODO calculate this variable ?jQuery(editableTable.divPageHead).height()? + stacked table headers
            var winsize = {"size": parseInt(totcnt1+1)*51 + headerHeight},
                parNode = window.frameElement.parentNode,
                parNodeWin = parNode.ownerDocument.defaultView;
                parNodeWin.jQuery(parNode).trigger("resize_me", [winsize]);
            /*editableTable.divCenterDiv.style.bottom = '26px';
                jQuery(editableTable.mxDivFoot).css({
                    'height': '26px',
                    'border-top': 'none',
                    'border-bottom': '1px solid #d8d8d8',
                    'background-color': 'white'
            });*/
            }catch(e){
                //do nothing
            }

        if(editableTable.mx_objectCount){
               editableTable.mx_objectCount.innerHTML = "" + totcnt + countSelectedObjects();
        }
    }

    var oTop = bpsTagNavConnector.getTNWindow();
    if (fullTextSearchObj && "true"==fullTextSearchObj.getTagsMode()) {
        oTop.jQuery(oTop.document).trigger("sb_selection_changed.bps_fts");
    }
    if (!fullTextSearchObj && oTop && oTop.showSlideInDialog && oTop.showSlideInDialog.mode == "tag navigator") {
        oTop.jQuery(oTop.document).trigger("sb_selection_changed.bps_sb");
    }


}

emxEditableTable.prototype.handleTagCollectFTS  = function _handleTagCollectFTS() {
    var aSBRowNodes = new Array();
    var aSBRowNodesChecked = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked = 'checked']");

      var oids = '';
      var aSBRowNodes='';

      for(var i =0;i<aSBRowNodesChecked.length;i++){
            var objectId = aSBRowNodesChecked[i].getAttribute("o");
            oids += objectId + ',';
    	  }

      oids= oids.replace(/,(?=[^,]*$)/, '');
      if(oids && oids != ''){
          aSBRowNodes = getPhyscicalIds(oids);
      }

      for(var i=0;i<aSBRowNodes.length;i++){
		aSBRowNodes[i]="pid://"+aSBRowNodes[i];
      }
      fullTextSearchObj.focusUnFocus(aSBRowNodes);
};

function setDragging() {}    // obsolete; TODO: remove references from jsp/xsl
function stopResizeDivs() {} // obsolete; TODO: remove references from jsp/XSL

// Sub-class generic DragDrop for splitter specific behavior
SplitterDragger.prototype = new DragDrop();
SplitterDragger.constructor = SplitterDragger;

function SplitterDragger() {
    this.dragVertical = false;
    this.setPosition = function (newX, newY) {
        var leftEdge = isIE ? 0 : 10;  // // Where are the extra 10px coming from?
        newX = newX < leftEdge ? leftEdge : newX;
        SplitterDragger.prototype.setPosition(newX, newY);
        adjustPanes();
    }
}

///////////////////////////////////////////////////////////////////////
// Generic Drag/Drop code; captures mouse events and moves element.  //
// "Sub-class" this to add app-specific behavior                     //
// TODO: move generic DragDrop code into a separate JS file
//       careful! attachEventHandler is part of SB code, will need to
//       copy that as well; perhaps as member functions of DragDrop
//       Same with isIE
///////////////////////////////////////////////////////////////////////
DragDrop.prototype.activeDrag = null; // "static" member representing d&d operation in progress
function DragDrop() {
    this.dragHorizontal = true;
    this.dragVertical = true;
    this.initialMouse = undefined;
    this.initialMouseY = undefined;
    this.startX = undefined;
    this.startY = undefined;
    this.draggedObject = undefined;
    this.initElement = function _initElement(element) {
        if (typeof element == 'string') {
            element = document.getElementById(element);
        }
        element.onmousedown = this.startDragMouse;
        element.dragger = this;
        //element.style.zIndex = 10000;
    };
    this.startDragMouse = function _startDragMouse(e) {
        var evt = e || window.event;
        if (isIE) {
            DragDrop.prototype.activeDrag = evt.srcElement.dragger;
            if(!DragDrop.prototype.activeDrag){
                DragDrop.prototype.activeDrag = evt.srcElement.parentElement.dragger;
            }
        } else {
            DragDrop.prototype.activeDrag = evt.currentTarget.dragger;
        }
        var ad = DragDrop.prototype.activeDrag;
        ad.startDrag(this);
        ad.initialMouseX = evt.clientX;
        ad.initialMouseY = evt.clientY;
        attachEventHandler(document,'mousemove',ad.dragMouse);
        attachEventHandler(document,'mouseup',ad.releaseElement);
        return false;
    };
    this.startDrag =  function _startDrag(obj) {
        var ad = DragDrop.prototype.activeDrag;
        if (ad.draggedObject){
            ad.releaseElement();
        }
        ad.startX = obj.offsetLeft;
        ad.startY = obj.offsetTop;
        ad.draggedObject = obj;
        obj.className += ' dragged';
        if (isIE) {
            obj.setCapture();
        } else {
            // dang; in FF, releasing mouse while dragging outside window loses up event
        }
    };
    this.dragMouse = function _dragMouse(e) {
        var ad = DragDrop.prototype.activeDrag;
        var evt = e || window.event;
        var dX = evt.clientX - ad.initialMouseX;
        var dY = evt.clientY - ad.initialMouseY;
        var newX = ad.startX + (ad.dragHorizontal ? dX : 0);
        var newY = ad.startY + (ad.dragVertical ? dY : 0);
        ad.setPosition(newX, newY);
        return false;
    };
    this.setPosition = function _setPosition(newX,newY) {
        var ad = DragDrop.prototype.activeDrag;
        ad.draggedObject.style.left = newX + 'px';
        ad.draggedObject.style.top = newY + 'px';
    };
    this.releaseElement = function _releaseElement() {
        var ad = DragDrop.prototype.activeDrag;
        detachEventHandler(document,'mousemove',ad.dragMouse);
        detachEventHandler(document,'mouseup',ad.releaseElement);
        ad.draggedObject.className = ad.draggedObject.className.replace(/dragged/,'');
        if (isIE) {
            ad.draggedObject.releaseCapture();
        } else {
            // no capture implemented for FF
        }
        ad.draggedObject = null;
    }
}

//Start X+5 feature APIs
function completeCellInfo(rowInf,cellInf,columnName){
    this.rowID = rowInf.getAttribute("id");
    this.columnName = columnName;
    this.relid = rowInf.getAttribute("r");
    this.objectid = rowInf.getAttribute("o");
    this.type = rowInf.getAttribute("type");
    this.level =  rowInf.getAttribute("level");
    this.direction = rowInf.getAttribute("d");
    this.value = new Object();
    this.value.current = new Object();
    this.value.old = new Object();
    this.value.current.display = emxUICore.getText(cellInf);
    this.value.old.actual = cellInf.getAttribute("a");
    if(cellInf && cellInf.getAttribute("edited") == "true"){
        var tmpDisplay = cellInf.getAttribute("d");
        if(tmpDisplay) {
            tmpDisplay = tmpDisplay.replace(/&#160;/g," ");
            this.value.old.display = tmpDisplay;
        }
        //For Bug 367299
        var date = cellInf.getAttribute("date");
        this.value.current.actual = date != null ? date : cellInf.getAttribute("newA");
    }else{
        var tmpDisplay = emxUICore.getText(cellInf);
        tmpDisplay = tmpDisplay.replace(/&#160;/g," ");
        this.value.old.display = tmpDisplay;
        this.value.current.actual = cellInf.getAttribute("a");
    }
    var spaceChar = String.fromCharCode(160);
    this.value.old.display = this.value.old.display != null ? this.value.old.display.replace(new RegExp(spaceChar, "g"), " "):null;
    this.value.old.actual = this.value.old.actual != null ? this.value.old.actual.replace(new RegExp(spaceChar, "g"), " "):null;
    this.value.current.display = this.value.current.display != null ? this.value.current.display.replace(new RegExp(spaceChar, "g"), " "):null;
    this.value.current.actual = this.value.current.actual != null ? this.value.current.actual.replace(new RegExp(spaceChar, "g"), " "):null;
    this.editable = cellInf.getAttribute("editMask");
}

function getTotalCellInfo(tRow,colName){
    if(!tRow){
        return null;
    }
    var objColumn = colMap.getColumnByName(colName);
    if(objColumn){
        var colIndex = objColumn.index;
        if(tRow.childNodes.length == 0){
            var aTempRows = new Array();
            aTempRows[0] = tRow;
            fillupColumns(aTempRows, 0, 1);
        }
        var tCell = emxUICore.selectSingleNode(tRow, "c[" + colIndex + "]");
        var rtnObject = new completeCellInfo(tRow,tCell,colName);
        return rtnObject;
   }
}

function setCellEditableByRowIdHelp(tRow,colName,boolTrueRFalse,objColumn,isRefreshView){
    if(tRow.childNodes.length == 0){
        var aTempRows = new Array();
        aTempRows[0] = tRow;
        fillupColumns(aTempRows, 0, 1);
    }
    var colIndex = objColumn.index;
    var columnInfo = emxUICore.selectSingleNode(tRow, "c[" + colIndex + "]");
    if(boolTrueRFalse){
        if(columnInfo && columnInfo.getAttribute("editMask")!=null)
            columnInfo.removeAttribute("editMask");
    }else{
        columnInfo.setAttribute("editMask","false");
    }
    //To Show the cell as editable if it is in Edit mode
    if(editableTable.mode == "edit" && !isRefreshView == false){
        rebuildView();
    }
}

function updateoXMLandpostXML(tRow,colName,colIndex,cellValue,cellDisplayValue,rowId,boolValue){
    // To set the current column row and current Column position
    var tCurrentRow = currentRow;
    var tCurrentColumnPosition = currentColumnPosition;
    currentRow = tRow;
    currentColumnPosition = colIndex;
    //Checking for NF & PF
    var objColumn = colMap.getColumnByName(colName);
    var isNFEnabled = objColumn.getSetting("isNF");
    var isPFEnabled = objColumn.getSetting("isPF");
    var symbol = "%";
    cellDisplayValue = cellDisplayValue+"";
    if(isNFEnabled == "true"){
        cellDisplayValue = getFormattedNumber(cellDisplayValue);
    }
    if(isPFEnabled == "true" && cellDisplayValue != ""){
        cellDisplayValue = cellDisplayValue + symbol;
    }
    var tmp = emxUICore.selectSingleNode(tRow, "c[" + colIndex + "]");
    //Calling the Validate Function on that column
    if(cellDisplayValue != emxUICore.getText(tmp)){
        var onChangeHandler = objColumn.getSetting("On Change Handler");
        var validateFun = objColumn.getSetting("Validate");
        var validatedVal = true;
        if(validateFun && validateFun.length > 0){
            // Not reqd for this IR-204974 Eval with New Line char Failing
            // IR-220977 Caused due to the replace used on number
            var tempVal = escapeValueForEval(cellValue);

            validatedVal = eval(validateFun + "('" +tempVal+"')");
        }
        if(validatedVal){
            var date = tmp.getAttribute("date");
            var oldVal = emxUICore.getText(tmp);
            if(tmp.getAttribute("d")==null){
                tmp.setAttribute("d",oldVal);
            }
            if(!arrUndoRows[rowId]){
                arrUndoRows[rowId] = new Object();
                arrUndoRows[rowId][colIndex-1] = oldVal;
            }
            if(!arrUndoRows[rowId][colIndex-1] && arrUndoRows[rowId][colIndex-1]!=""){
                arrUndoRows[rowId][colIndex-1] = oldVal;
            }
            //setting the new values on the column
            if(date && date != null){
                 tmp.setAttribute("date", cellValue);
                 //367300
                 var stamp = Date.parse(cellValue);
                 if(typeof stamp == "number") {
                    tmp.setAttribute("msValueNew", stamp);
                 }
            }else{
                tmp.setAttribute("newA",cellValue);
            }
            emxUICore.setText(tmp,cellDisplayValue);
            //To Update attributes on oXML
            tmp.setAttribute("edited","true");
            var currentStatus = tRow.getAttribute("status");
            if(currentStatus != "add" && currentStatus != "new" && currentStatus != "lookup") {
                tRow.setAttribute("status","changed");
            }
            var rowId = tRow.getAttribute("id");
            //Updating postDataXML
            updatePostXML(tRow, cellValue, colIndex);
             if(onChangeHandler && onChangeHandler.length > 0){
                reloadCellType.push({Type :"onChange",Target :objColumn.name});
                var aTemp = onChangeHandler.split(":");
                //lastUpdatedColumn = objColumn.name;
                //lastUpdatedColumnValue= cellValue;
                for(var k=0; k < aTemp.length; k++){
                    var  tempVal = escapeValueForEval(cellValue);  //cellValue.replace(/(\r\n|\n|\r)/gm,"");
                    eval(aTemp[k]+"('" +tempVal+ "','"+ rowId +"','"+ objColumn.name + "')");
                }
                reloadCellType.pop();
            }
            if(boolValue != false)
                rebuildView();
        }

        callToBuildColumValues(objColumn.name);
    }
    currentRow = tCurrentRow;
    currentColumnPosition= tCurrentColumnPosition;
}

function updateoXMLWithHTML(tRow,colName,colIndex,strHTML,rowId,boolValue){
    // To set the current column row and current Column position
    var tCurrentRow = currentRow;
    var tCurrentColumnPosition = currentColumnPosition;
    currentRow = tRow;
    currentColumnPosition = colIndex;
    var tmp = emxUICore.selectSingleNode(tRow, "c[" + colIndex + "]");
    //Calling the Validate Function on that column
    var objHTML = emxUICore.createXMLDOM();
    objHTML.loadXML(strHTML);
    emxUICore.checkDOMError(objHTML);
    var strReplaceHTML = "";
    var oldDisplayValue = tmp.getAttribute("d");

    if( oldDisplayValue == null){
        oldDisplayValue = "";
        for(var i = 0 ; i < tmp.childNodes.length ; i++) {
            oldDisplayValue = oldDisplayValue + tmp.childNodes[i].xml;
        }
    }
    for(var i = 0 ; i < objHTML.documentElement.childNodes.length; i++) {
        strReplaceHTML = strReplaceHTML + objHTML.documentElement.childNodes[i].xml;
    }

    objHTML.documentElement.setAttribute("d", oldDisplayValue);
    objHTML.documentElement.setAttribute("edited", "true");
    if(tRow){
        tRow.replaceChild(objHTML.documentElement,tmp);
    }
    if(!arrUndoRows[rowId]){
        arrUndoRows[rowId] = new Object();
        arrUndoRows[rowId][colIndex-1] = oldDisplayValue;
    }
    if(!arrUndoRows[rowId][colIndex-1] && arrUndoRows[rowId][colIndex-1]!=""){
        arrUndoRows[rowId][colIndex-1] = oldDisplayValue;
    }
    var iSplit = parseInt(split,10);
    var pTable = editableTable.tblListBody;
    if(iSplit > colIndex){
        pTable = editableTable.tblTreeBody;
    }

    var objTR = undefined;
    for(var i=0;i<pTable.rows.length;i++){
        var rowObj = pTable.rows[i];
        var rowID = rowObj.getAttribute("id");
        if(rowID == rowId){
            objTR = rowObj;
            break;
        }
    }
    //var objTR = pTable.rows[rowId];
    var objTD = null;
    if(objTR){
      if(hasMergedCells){
            objTR2 = objTR.nextSibling;
            for(var i = 0; i < objTR.cells.length; i++){
                  var cell = objTR.cells[i];
                  var pos = parseInt(cell.getAttribute("position"),10);
                  if(pos && pos == colIndex){
                        objTD = cell;
                        break;
                  }
            }
            if(objTD == null){
                  for(var i = 0; i < objTR2.cells.length; i++){
                        var cell = objTR2.cells[i];
                        var pos = parseInt(cell.getAttribute("position"),10);
                        if(pos && pos == colIndex){
                              objTD = cell;
                              break;
                        }
                  }
            }
      }else{
            objTD = objTR.cells[colIndex];
      }
    }
    //earlier even if false is passed for isRefreshView the image used to get appear on UI because of innerHTML
    if(objTD && boolValue != true) {
        objTD.innerHTML = strReplaceHTML;
    } else {
        rebuildView();
    }
    syncRowHeightsAfterEdit(rowId);
    currentRow = tCurrentRow;
    currentColumnPosition= tCurrentColumnPosition;
}

emxEditableTable.getCellValueByRowId = function __getCellValueByRowId(rowId ,colName){
    var tRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id='"+rowId+"']");
     return getTotalCellInfo(tRow,colName);
}

emxEditableTable.getCellValueByObjectRelId = function __getCellValueByObjectRelId(relId,objectId ,colName){
    var tRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@r='"+relId+"' and @o='"+objectId+"']");
       return getTotalCellInfo(tRow,colName);
}

emxEditableTable.setCellValueByRowId = function __setCellValueByRowId(rowId,colName,cellValue,cellDisplayValue,isRefreshView){
    var tRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id='"+rowId+"']");
    if(!tRow){
        return null;
    }
    var objColumn = colMap.getColumnByName(colName);
    if(objColumn && editableTable.mode == "edit"){
        var rtnVal  = null;
        var colIndex = objColumn.index;
        if(tRow.childNodes.length == 0){
            var aTempRows = new Array();
            aTempRows[0] = tRow;
            fillupColumns(aTempRows, 0, 1);
        }
        updateoXMLandpostXML(tRow,colName,colIndex,cellValue,cellDisplayValue,rowId,isRefreshView);
   }else{
           return null;
   }
}

emxEditableTable.setCellHTMLValueByRowId = function __setCellHTMLValueByRowId(rowId,colName,strHTML,isRefreshView){
    var tRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id='"+rowId+"']");
    if(!tRow){
        return null;
    }
    var objColumn = colMap.getColumnByName(colName);
    if(objColumn && editableTable.mode == "edit"){
        var rtnVal  = null;
        var colIndex = objColumn.index;
        if(tRow.childNodes.length == 0){
            var aTempRows = new Array();
            aTempRows[0] = tRow;
            fillupColumns(aTempRows, 0, 1);
        }
        updateoXMLWithHTML(tRow,colName,colIndex,strHTML,rowId,isRefreshView);
   }else{
           return null;
   }
}

emxEditableTable.setCellValueByObjectRelId = function __setCellValueByObjectRelId(relId,objectId,colName,cellValue,cellDisplayValue,isRefreshView){
    var tRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@r='"+relId+"' and @o='"+objectId+"']");
    if(!tRow){
        return null;
    }
    var rowId = tRow.getAttribute("id");
    var objColumn = colMap.getColumnByName(colName);
    if(objColumn && editableTable.mode == "edit"){
        var rtnVal  = null;
        var colIndex = objColumn.index;
        if(tRow.childNodes.length == 0){
            var aTempRows = new Array();
            aTempRows[0] = tRow;
            fillupColumns(aTempRows, 0, 1);
        }
        updateoXMLandpostXML(tRow,colName,colIndex,cellValue,cellDisplayValue,rowId,isRefreshView);
   }else{
           return null;
   }
}

emxEditableTable.setCellEditableByRowId = function __setCellEditableByRowId(rowId,colName,boolTrueRFalse,isRefreshView){
    var tRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id='"+rowId+"']");
    if(!tRow){
        return null;
    }
    var objColumn = colMap.getColumnByName(colName);
    if(objColumn){
           setCellEditableByRowIdHelp(tRow,colName,boolTrueRFalse,objColumn,isRefreshView);
    }else{
           return null;
   }
}

emxEditableTable.setCellEditableByObjectRelId = function __setCellEditableByObjectRelId(relId,objectId11,colName,boolTrueRFalse,isRefreshView){
    var tRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@r='"+relId+"' and @o='"+objectId11+"']");
    if(!tRow){
        return null;
    }
    var objColumn = colMap.getColumnByName(colName);
    if(objColumn){
           setCellEditableByRowIdHelp(tRow,colName,boolTrueRFalse,objColumn,isRefreshView);
    }else{
           return null;
   }
}

emxEditableTable.getCurrentCell = function __getCurrentCell(){
    if(editableTable.mode == "edit" && currentRow!=null){
        var colName = colMap.getColumnByIndex(currentColumnPosition-1).getAttribute("name");
        return getTotalCellInfo(currentRow,colName);
    }else{
        return null;
    }
}

emxEditableTable.getParentRowId= function __getParentRowId(rowId){
    var tRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id='"+rowId+"']");
    if(tRow && tRow.parentNode){
        return tRow.parentNode.getAttribute("id");
    }else{
        return null;
    }
}

emxEditableTable.getChildrenRowIds= function __getChildrenRowIds(rowId){
    var aRow = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@id='"+rowId+"']/r");
    if(aRow.length != 0){
         var aRtn = new Array();
        for(var k=0;k<aRow.length;k++){
            aRtn[k] = aRow[k].getAttribute("id");
        }
        return aRtn;
    }else{
        return null;
    }
}

emxEditableTable.getChildrenColumnValues = function __getChildrenColumnValues(rowId,colName,level){
    var aRow = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@id='"+rowId+"']//r[@level = '"+level+"']");
    if(aRow.length != 0){
         var aRtn = new Array();
         var objColumn = colMap.getColumnByName(colName);
        var colIndex = objColumn.index;
        for(var k=0;k<aRow.length;k++){
            var tCell = emxUICore.selectSingleNode(aRow[k], "c[" + colIndex + "]");
            aRtn.push(tCell);
        }
        return aRtn;
    }else{
        return "";
    }
}
emxEditableTable.getParentColumnValue= function __getParentColumnValue(rowId,colName,level){
    var tRow = emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id='"+rowId+"']");
    var strParent = "";
    for(var i=0; i<parseInt(level); i++) {
        strParent += ".parentNode";
    }
    var tParentRow = eval("tRow"+strParent);
    if(tRow && tParentRow){
        var objColumn = colMap.getColumnByName(colName);
        var colIndex = objColumn.index;
        var tCell = emxUICore.selectSingleNode(tParentRow, "c[" + colIndex + "]");
        if(tCell != null){
            //return emxUICore.getText(tCell);
            return tCell;
        }else{
            return null;
        }
    }else{
        return null;
    }
}

emxEditableTable.getRowColumnValues  = function  _getRowColumnValues(rowId) {

    var row = getRow(rowId);
    var columnValues =  [];
    if(row != null)
    {
        var columns = getColumns(row);
        for(var i = 0; i < colMap.columns.length; i++){
            var tCol        = colMap.getColumnByIndex(i);
            var tColName    = tCol.getAttribute("name");
            var tColValue   = (columns[i].getAttribute("edited") == "true") ? columns[i].getAttribute("newA") : columns[i].getAttribute("a");
            columnValues.push({ Name : tColName, Value : encodeURIComponent(tColValue) });
        }
    }
    return columnValues;
}

emxEditableTable.reloadCell = function __reloadCell(colName, rowId){

    var objColoumnArray = new Array();
    objColoumnArray = colName.split(",");
    var colIndex = new Array();
    var reloadProgram= new Array();
    var reloadFunction =new Array();
    var inputType =new Array();
    var rangeHref =new Array();
    var format =new Array();
    var isBoolean =new Array();
    var rcType =new Array();
    var rcTarget =new Array();
    var totalVals = "";
    var rdata = [];
    var flag = false;

    for(var i=0;i<objColoumnArray.length;i++){  //for each column
        var objColumn = colMap.getColumnByName(objColoumnArray[i]);
        var reloadRow = rowId ? emxUICore.selectSingleNode(oXML,"/mxRoot/rows//r[@id='"+rowId+"']") : currentRow;
        if(objColumn){
            colIndex[i] = objColumn.index;
            var rProgram = objColumn.getSetting("Reload Program");
            if(typeof rProgram!="undefined"){
                reloadProgram[i]=rProgram;
            }
            var rFunction = objColumn.getSetting("Reload Function");
            if(typeof rFunction!="undefined"){
                reloadFunction[i]=rFunction;
            }
            inputType[i] = objColumn.getSetting("Input Type");
            rangeHref[i] = objColumn.getAttribute("rangeHref");
            format[i] = objColumn.getSetting("format");
            isBoolean[i] = objColumn.getAttribute("BooleanAttribute");
            rcType[i] = null;
            rcTarget[i] = null;
            if(reloadCellType.length != 0){
                rcType[i] = reloadCellType[reloadCellType.length-1].Type;
                rcTarget[i] = reloadCellType[reloadCellType.length-1].Target;
            }

            if(reloadProgram[i] && reloadFunction[i] && reloadProgram[i].length > 0 && reloadFunction[i].length > 0 && reloadRow != null){
                var columnValues = emxUICore.selectNodes(reloadRow,"c");
                if(flag!=true){
                    flag=true;
                    for(var k=0;k < columnValues.length;k++){
                        var tCol = colMap.getColumnByIndex(k);
                        if(!tCol) {
                            continue;
                        }
                        var tColName = tCol.getAttribute("name");
                        var columnValue = (columnValues[k].getAttribute("edited") == "true") ? columnValues[k].getAttribute("newA") : columnValues[k].getAttribute("a");
                        if(totalVals == ""){
                            totalVals = tColName+"|=|"+columnValue;
                        }else{
                            totalVals += "|~|"+ tColName+"|=|"+columnValue;
                        }
                    }
                    totalVals = encodeURIComponent(totalVals);
                    rdata.push("{\"objectId\":\""    + reloadRow.getAttribute("o")     + "\"");
                    rdata.push("\"relId\":\""        + reloadRow.getAttribute("r")     + "\"");
                    rdata.push("\"parentId\":\""     + reloadRow.getAttribute("p")     + "\"");
                    rdata.push("\"rowId\":\""        + reloadRow.getAttribute("id")    + "\"");
                    rdata.push("\"level\":\""       + reloadRow.getAttribute("level") + "\"");
                    rdata.push("\"type\":\""         + reloadRow.getAttribute("type")  + "\"");
                    rdata.push("\"relationship\":\"" + reloadRow.getAttribute("rel")   + "\"}");
                }
            }
        }
    }

    var url = "../common/emxFreezePaneGetData.jsp?fpTimeStamp="+ timeStamp+"&columnIndex="+colIndex+"&ReloadProgram="+reloadProgram+"&ReloadFunction="+reloadFunction+"&rcType="+rcType+"&rcTarget="+rcTarget+"&colNames="+objColoumnArray+"&inputType="+inputType;
    var childXML = emxUICore.getXMLDataPost(url,"columnValues="+totalVals + "&rowValues=" + rdata.join());
    //Added to get newInputType from oXML--START
    var inputNodes = emxUICore.selectNodes(childXML,"/mxRoot/column");
    for (var i=0; i<inputNodes.length;i++){
        var objColumn = colMap.getColumnByName(objColoumnArray[i]);
        var inputTypeNode=emxUICore.selectSingleNode(inputNodes[i],"Settings");
        for(var q=0; q<inputTypeNode.childNodes.length; q++){
            var childNode = inputTypeNode.childNodes[q];
            var settingName = childNode.getAttribute("name");
            if(settingName == "Input Type"){
                var newInputType = emxUICore.getText(childNode);
                if(inputType[i]!=newInputType && newInputType!="" && !(rangeHref[i])){
                    inputType[i]=newInputType;
                    // The column name may contain ' (single quote). Use " (double quotes) to enclose the name.
                    var nNode = emxUICore.selectSingleNode(oXML,"/mxRoot/columns/column[@name=\""+objColoumnArray[i]+"\"]/settings/setting[@name='Input Type']");
                    emxUICore.setText(nNode,newInputType);
                    objColumn.setSetting("Input Type",newInputType);
                }else {
                    inputType[i]=inputType[i];
                    // The column name may contain ' (single quote). Use " (double quotes) to enclose the name.
                    var nNode = emxUICore.selectSingleNode(oXML,"/mxRoot/columns/column[@name=\""+objColoumnArray[i]+"\"]/settings/setting[@name='Input Type']");
                    emxUICore.setText(nNode,inputType[i]);
                           objColumn.setSetting("Input Type",inputType[i]);
                }
                var columnInfo = emxUICore.selectSingleNode(reloadRow, "c[" + (objColumn.index) + "]");
                if('textarea' == newInputType && columnInfo.getAttribute("rte")? columnInfo.getAttribute("rte") == "true":inputTypeNode.getAttribute("RichTextEditor")){
                    columnInfo.setAttribute("rte","true");
                }
                       //Added to get newInputType from oXML--END
                if(inputType[i]=="textbox" ||inputType[i]=="textarea" || format[i]=="date" ||isBoolean[i] == "true"){
                    var newNode = emxUICore.selectSingleNode(inputNodes[i],"SelectedValues/setting");
                    if(newNode!=null){
                        var selectActualVal = newNode.getAttribute("name");
                        var selectDisplayVal = emxUICore.getText(newNode);
                        updateoXMLandpostXML(reloadRow,objColoumnArray[i],colIndex[i],selectActualVal,selectDisplayVal,reloadRow.getAttribute("id"),false);
                    }
                }else if(inputType[i]=="combobox" || inputType[i]=="listbox" || inputType[i]=="checkbox" || inputType[i]=="radiobutton" || inputType[i]=="listboxmanual" ){
                    var newNode = emxUICore.selectSingleNode(inputNodes[i],"RangeValues");
                    if(newNode!=null){
                        var selectActualVal = newNode.getAttribute("name");
                        var selectDisplayVal = emxUICore.getText(newNode);
                        //To update the JS Object for Range Values
                        objColumn.rangeValues = new Object();
                        var newRangeValues = emxUICore.selectNodes(inputNodes[i],"RangeValues/setting");
                        if(newRangeValues!=null){
                            for(var l=0;l<newRangeValues.length;l++){
                                if(typeof newRangeValues[l] != "function"){
                                    objColumn.setRangeValues(emxUICore.getText(newRangeValues[l]),newRangeValues[l].getAttribute("name"));
                                }
                            }
                        }
                        //To Update oXML attributes
                        // The column name may contain ' (single quote). Use " (double quotes) to enclose the name.
                        var colXML = emxUICore.selectSingleNode(oXML,"/mxRoot/columns/column[@name=\""+objColoumnArray[i]+"\"]");
                        var rangeNode = emxUICore.selectSingleNode(colXML,"RangeValues");
                        if(rangeNode){
                            if(rangeNode.parentNode){
                                rangeNode.parentNode.replaceChild(newNode,rangeNode);
                            }
                        }else{
                            //Added for Safari 5.1 support
                            if(isIE){
                            colXML.appendChild(newNode);
                            }else{
                                var node = document.importNode(newNode, true);
                                colXML.appendChild(node);
                            }
                        }
                    }
                   //To show the selected Values in View
                   var newNode = emxUICore.selectSingleNode(inputNodes[i],"SelectedValues/setting");
                   if(newNode!=null){
                       var selectActualVal = newNode.getAttribute("name");
                       var selectDisplayVal = emxUICore.getText(newNode);
                       updateoXMLandpostXML(reloadRow,objColoumnArray[i],colIndex[i],selectActualVal,selectDisplayVal,currentRow.getAttribute("id"),false);
                    }
                }
                else{
                    return null;
                }
            }else{
               var settingValue = emxUICore.getText(childNode);
               objColumn.setSetting(settingName, settingValue);
            }
        }
    }
};

/**
 * Function is used to display inline error notices on mouse hover event on an image in Structure Browser.
 *
 * @param error is an XML containing details of the message.
 * Sample example: <mxRoot><object rowId=\"0,0,1\"><error>Error: Object with the same name already exists.</error></object><object rowId=\"0,0,3\"><error>Error: Multiple connections are not permitted.</error></object></mxRoot>
 */
emxEditableTable.displayValidationMessages = function __displayValidationMessages(error){

    if(error){
        var errorRows = emxUICore.createXMLDOM();
        errorRows.loadXML(error);
        var rows = emxUICore.selectNodes(errorRows, "/mxRoot//object");

        for(var itr = 0 ; itr < rows.length; itr++){
            var rowId = rows[itr].getAttribute("rowId");

            var msg = emxUICore.getText(emxUICore.selectSingleNode(rows[itr], "error"));

            if(msg != null && msg != ""){
                var nSelectRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + rowId + "']");
                if(nSelectRow != null){
                    nSelectRow.setAttribute("e", msg);
                }
            }
        }
        rebuildView();
    }
}

function errorTip(e, ele,errorRows){
    if(errorRows == null || errorRows == "") return;
    errorRows = getError(errorRows);
    emxUITooltips.SHOW_DELAY = 500;
    emxUITooltips.PADDING = "4px";
    emxUITooltips.BGCOLOR = "#ffffee";
    emxUITooltips.MOVEWITHMOUSE = true;
    var tooltip = new emxUITooltipManager();
    tooltip.tips = [];
    tooltip.tips.push(errorRows);
        var objEvent = e;
        if(!e){
            objEvent = emxUICore.getEvent();
        }
    tooltip.addTooltipFor(ele, errorRows, true, objEvent);
}

function getTDValueForSelectList(objTD){
    return objTD.firstChild ? objTD.firstChild.nodeValue:"";
}


var previousClick = null;

var tnTextColumns = null;
var tnImageColumn = null;
var singleRoot;
function showDetailsView(persist){

    setTimeout("turnOnProgress()",10);
    var obj = findToolbarItem(objContextToolbar,"toggleSBWrap()");
    if(obj){
        obj.enable();
    }
    parent.ids = parent.ids ? parent.ids : "~";
    if(portalMode == "true"){
        if(isIE){
            setTimeout("toggleProgress('visible')",50);
        }else{
            toggleProgress("visible");
        }
    }else{
        turnOnProgress();
    }


    if(firstTime){

        setInitialHeight();


        try{
            // Get display window height
            windowSize = Math.ceil(editableTable.divListBody.clientHeight / rowHeight);

            // determine page size.
            pageSize = windowSize * pageFactor + 1;
			scrollPageSize = getPageSize();

            Transformation.Init(oXSLTable,oXSLTree, oXSLTableHeader, oXSLTreeHeader, oXSLToolbar);

            var groupHeader = emxUICore.selectSingleNode(oXML,"//setting[@name='Group Header']/text()");
            var isIndentedView = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='isIndentedView']/text()");
            var rootNodes = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@level ='0']");
            singleRoot = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id ='0']");
            var multiRoot = false;
            if(isIndentedView && isIndentedView.nodeValue=='true'){
                if(!singleRoot) {
                    multiRoot = true;
                    disableExpandMenus();
                }
            }
            var hasImageorProgramHTML1 = emxUICore.selectNodes(oXML, "/mxRoot/columns//column [@type = 'Image' or @type = 'image' or @type = 'programHTMLOutput']");
                if(hasImageorProgramHTML1 && hasImageorProgramHTML1.length > 0){
                    hasImageorProgramHTML = true;
                }
            var expandByDefaultNode = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='expandByDefault']");
            var expandByDefault = true;
            if(multiRoot){
                /* for multiRoot table, expandByDefault should be false by default.*/
                expandByDefault = false;
            }
            if(expandByDefaultNode != null && emxUICore.getText(expandByDefaultNode)=="false"){
                expandByDefault = false;
            }
            if(multiRoot && expandByDefaultNode != null && emxUICore.getText(expandByDefaultNode)=="true"){
                expandByDefault = true;
            }
                var aAllTempRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r");
                for(var p=0;p<aAllTempRows.length;p++){
                    if(singleRoot && !expandByDefault){
                        aAllTempRows[p].setAttribute("display","none");
                    } else if(aAllTempRows[p].getAttribute("display")==null) {
                        aAllTempRows[p].setAttribute("display","block");
                    } else {
                        //do nothing
                    }
                }
                if(isStructureCompare == "TRUE"){
                    var isDisplayEntireStructure = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='displayEntireStructure']/text()");
                    var displayEntireStructure = (isDisplayEntireStructure != null && (isDisplayEntireStructure.nodeValue == "true" || isDisplayEntireStructure.nodeValue == "TRUE"))?true:false;

                    if(!displayEntireStructure){
                    var nRootNode = emxUICore.selectNodes(oXML.documentElement, "/mxRoot/rows//r");
                    for(var b=0;b<nRootNode.length;b++){
                        var matchRes = nRootNode[b].getAttribute("matchresult");
                        if(matchRes == "left" || matchRes == "right" ){
                            var aChilds =emxUICore.selectNodes(nRootNode[b], "r");
                            for(var bd=0;bd<aChilds.length;bd++){
                                if(aChilds[bd].parentNode){
                                    aChilds[bd].parentNode.removeChild(aChilds[bd]);
                                }
                            }
                        }
                    }
                    }
                    var nTotalRows = emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name = 'total-rows']");
                    var ncount = emxUICore.selectNodes(oXML, "/mxRoot/rows//r");
                    emxUICore.setText(nTotalRows, ncount.length);
                }

            //Adjusts the last column width
            diff = 2;
            // Sets all the heights of all the divisions
            if (isIE) {
                editableTable.divCenterDiv.style.top = "";
            }

            setInitialHeight(groupHeader);

            //setGrabberPosition();

            var hasMergedCellsNode = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='HasMergedCell']");

            if(hasMergedCellsNode){
                if(emxUICore.getText(hasMergedCellsNode) == 'true')
                    hasMergedCells = true;
                else
                    hasMergedCells = false;
            }

            //set mode if passed in
            if(typeof freezePaneMode!='undefined' && freezePaneMode == 'edit'){
                editableTable.mode='edit';
            }
            if(editableTable.mode == "edit"){
                setMode();
            }
            //Switching to view Mode [Added to support Structure Browser - Edit Mode Toolbar]
            else
            {
                var cancelHookIn = true;
                viewMode(cancelHookIn,true);
            }

            configuredTableName = getRequestSetting('selectedTable');
            // Sets the multicolumn sort information

            lSortColumnDirection = sortDirection.split(",");
            if(sortColumnName != null && sortColumnName != '' && sortColumnName != 'null' && sortColumnName != 'undefined') {
                lSortColumnName = sortColumnName.split(",");
            } else {
                lSortColumnName[0] = colMap.getColumnByIndex(0).name;
            }

            if(lSortColumnDirection != null && lSortColumnDirection != '' && lSortColumnDirection != 'null' && lSortColumnDirection != 'undefined') {
                lSortColumnDirection = sortDirection.split(",");
            } else {
                lSortColumnDirection[0] = "ascending";
            }

            insertSortArrows();

            splitPos = emxUICore.getText(emxUICore.selectSingleNode(oXML, "/mxRoot/setting[@name = 'split']"));
            splitPos = new Number(splitPos);

            require(['bpsUWADnF'],function(bpsUWADnF){
                var widgetId = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='widgetId']/text()");
                if(widgetId){
                    var dnfOpts = {};
                    dnfOpts.widgetId = emxUICore.getText(widgetId);
                    bpsUWADnF.handleDnF(dnfOpts);
                }
            });
        }catch(objError){
            alert("showDetailsView : " + objError.message)
            //IR-058044V6R2011x
            if(fullTextSearchObj) {
                fullTextSearchObj.enableFormSearchButton();
                fullTextSearchObj.splashFrame.style.display="block";
                fullTextSearchObj.results.style.display="none";
            }
        }
        turnOffProgress();
        if(portalMode == "true"){
            setTimeout("toggleProgress('hidden')", 100);
        }

        var obj = document.getElementById("listHidden");
        if (obj)
        {
            addEvent(obj, "load", getActionXML);
            var clearLimitNotice = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='clearLimitNotice']/text()");
            if(clearLimitNotice && clearLimitNotice.nodeValue == 'true') {
				listHidden.document.location.href = "../common/emxMQLNoticeWrapper.jsp?clearLimitNotice=true";
			} else {
            listHidden.document.location.href = "../common/emxMQLNoticeWrapper.jsp";
        }
        }

        setTimeout("removeHiddenToolbarItems()",500);
        //added to change toggle button label for FullSearch
        if(fullTextSearchObj && fullTextSearchObj.getFirstTimeFormBased() == "true")
        {   var func = "";
        if(getTopWindow().FullSearch){
            func = "getTopWindow().FullSearch";
        } else {
            func = "parent.FullSearch";
        }
        func += ".setToggleButtonLabel()";
        setTimeout(func,500);
        }
        //FreezePaneUtils.adjustTableColumns();

        //editableTable.adjustTableLastColumn();
        firstTime = false;
    }
    RefreshTableHeaders();

   if(persist != "true"){
    initExpand(expandByDefault);
    }else{
        //required to call for state persistence in order to retreive previous selection/expand/scoll
        callToBuildColumValues("firstTime",true);
        rebuildView();
    }
    if(getTopWindow().info && persist == "true" ){
        editableTable.divTreeBody.scrollTop = editableTable.divListBody.scrollTop = getTopWindow().info["scrollTop"];
          //clear the getTopWindow().info
          getTopWindow().info=[];
          resetUrlParameters("persist","false");
      }

    //not necessary as called by initExpand through rebuildView.
    //RefreshView(true);
    editableTable.adjustTreeLastColumn();
    setTimeout("turnOffProgress()",10);
if(portalMode == "true"){
        setTimeout("toggleProgress('hidden')", 100);
        }



}

function showThumbnailsView(){
    var obj = findToolbarItem(objContextToolbar,"toggleSBWrap()");
    if(obj){
        obj.disable();
    }
    bScrollStarted = false;
     var bodyDiv = document.getElementById("mx_divThumbnailBody");
     var bodyHeight = bodyDiv.style.top;
     if(!bodyHeight){
         setInitialHeight();
     }
    setTimeout("turnOnProgress()",10);
    if(tnTextColumns == null)
        tnTextColumns = getTextColumnsThumbnail();

    if(tnImageColumn == null)
        tnImageColumn = getImageColumnThumbnail();

    var xmlNode = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r/c//img");

    if(editableTable.divTNPageContent != null){
        while ( editableTable.divTNPageContent.hasChildNodes() )
        {
            editableTable.divTNPageContent.removeChild(editableTable.divTNPageContent.firstChild)
        }
    }

    var pageContentDiv = document.getElementById("pageContentDiv");
    if(!pageContentDiv){
        pageContentDiv = document.createElement("div");
        pageContentDiv.setAttribute("id", "pageContentDiv");
        pageContentDiv.setAttribute("onscroll", "thumbnailOnScroll()");
        editableTable.divThumbnail.appendChild(pageContentDiv);
        if(!Browser.CHROME) {
            enableScrollOnDrop(pageContentDiv);
        }
    }
    editableTable.divTNPageContent = pageContentDiv;
    var strSelection        = getRequestSetting('selection');

    attachEventHandler(editableTable.divTNPageContent, "scroll", thumbnailOnScroll);
    attachEventHandler(editableTable.divTNPageContent, "contextmenu", function(evt) {
		                                                                                clickRight(evt, getParameter("appendRMBMenu"));
		                                                                            }
		              );

    var aDisplayRows = getDisplayRows();
    if( aDisplayRows == null ||  aDisplayRows.length == 0) return;

    var isRowGrouped = aDisplayRows[0].getAttribute("rg") ? true : false;

   if( !isRowGrouped && aDisplayRows.length > 1 ){
       isRowGrouped = aDisplayRows[1].getAttribute("rg")? true: false;

   }


    if(!isRowGrouped){
        document.body.className = "thumbnail-gallery";
        for (var i = 0;  i < aDisplayRows.length; i++) {
            var row = aDisplayRows[i];
            var tempTNTile = document.createElement("div");
            editableTable.divTNPageContent.appendChild(tempTNTile);
            tempTNTile.setAttribute("id", "tn-" + row.getAttribute("id"));
            tempTNTile.setAttribute("oid", row.getAttribute("id"));

                if(row.getAttribute("checked") == "checked"){
                    tempTNTile.className = "thumbnail-tile selected";
                    previousClick = tempTNTile.id;
                } else {
                    tempTNTile.className = "thumbnail-tile";
        }

                tempTNTile.onclick = thumbnailClick;
                jQuery(tempTNTile).hover(thumbnailHover, thumbnailHoverOut);
    }
    }else{
        document.body.className = "thumbnail-gallery grouped";
        var setdiv = false;
        var rgclass = null;
        var i = 0
        var isSingleRoot = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id ='0']");

        if(isSingleRoot){
        var row = aDisplayRows[i];
            var rowGroup = row.getAttribute("rg");
        var tempTNTile = document.createElement("div");
        tempTNTile.setAttribute("id", "tn-" + row.getAttribute("id"));
        tempTNTile.setAttribute("oid", row.getAttribute("id"));
            editableTable.divTNPageContent.appendChild(tempTNTile);
            if(row.getAttribute("checked") == "checked"){
                tempTNTile.className = "thumbnail-tile selected";
                previousClick = tempTNTile.id;
            } else {
                tempTNTile.className = "thumbnail-tile";
            }

            tempTNTile.onclick = thumbnailClick;
            jQuery(tempTNTile).hover(thumbnailHover, thumbnailHoverOut);
            isSingleRoot = false;
            i++;

        }

        for (i;  i < aDisplayRows.length; i++) {
            var row = aDisplayRows[i];
        var rowGroup = row.getAttribute("rg");
            var tempTNTile = document.createElement("div");
            tempTNTile.setAttribute("id", "tn-" + row.getAttribute("id"));
            tempTNTile.setAttribute("oid", row.getAttribute("id"));

        if(rowGroup){


                editableTable.divTNPageContent.appendChild(tempTNTile);
            tempTNTile.className = rowGroup + " heading";
            var groupName = isIE ? row.firstChild.text : row.firstChild.textContent ;
            tempTNTile.innerHTML = "";
            var innerHTML = "";
                innerHTML += "<table ><tr id='"+row.getAttribute("id")+"' o='' r=''><td ><a href=\"javascript:toggleRowGrouping('"+row.getAttribute("id")+"')\"><img id='img_"+row.getAttribute("id")+"' ";
            if(row.getAttribute("display") == "none"){
                    innerHTML += "src=\"images/utilTreeLineNodeClosedSB.gif\" alt=''></a></td>";
            }else{
                    innerHTML += "src=\"images/utilTreeLineNodeOpenSB.gif\" alt='' ></a></td>";
            }if(strSelection && strSelection!="single"){
                innerHTML += "<td ><input name='emxTableRowIdGroup' class='small' id='rmbrowgp-"+row.getAttribute("id")+"' value='"+row.getAttribute("id")+"' onclick=\"doThumbNailRowGroupCheckboxClick('"+row.getAttribute("id")+"', this.checked);\" type='checkbox' ";
            if(row.getAttribute("checked")){
                innerHTML += "checked='checked'></td>";
            }else{
                innerHTML += "></td>";
            }
            }
                innerHTML += "<td title='"+groupName+"' position='1' rmb='' rmbid='' rmbrow='"+row.getAttribute("id")+"'><span>"+groupName+"</span><span>&nbsp;("+row.getAttribute("count")+")</span></td></tr></table>";
            tempTNTile.innerHTML = innerHTML;
                setdiv = true;
                rgclass = rowGroup;
            } else if(setdiv ){
                 var tempTNTile1 = document.createElement("div");
                 editableTable.divTNPageContent.appendChild(tempTNTile1);

                 tempTNTile1.className = rgclass;

                 tempTNTile1.appendChild(tempTNTile);

            if(row.getAttribute("checked") == "checked"){
                tempTNTile.className = "thumbnail-tile selected";
                previousClick = tempTNTile.id;
            } else {
                tempTNTile.className = "thumbnail-tile";
            }
                     tempTNTile.onclick = thumbnailClick;
                     setdiv = false;

            } else {

                editableTable.divTNPageContent.lastChild.appendChild(tempTNTile);
                if(row.getAttribute("checked") == "checked"){
                    tempTNTile.className = "thumbnail-tile selected";
                    previousClick = tempTNTile.id;
                } else {
                    tempTNTile.className = "thumbnail-tile";
                }
            tempTNTile.onclick = thumbnailClick;
        }
        jQuery(tempTNTile).hover(thumbnailHover, thumbnailHoverOut);
    }

    }

    enableDragging();
    enableDropping();

    scrollTimeout = setTimeout("thumbnailOnScrollTimeout()", 0 );
    setTimeout("turnOffProgress()",10);
    setRequestSetting("thumbNailView", "true");
    if( fullTextSearchObj && fullTextSearchObj.getTagsMode()=="true" ){
        fullTextSearchObj.loadTaxonomies();
    }
    RefreshObjectCounts();
}

function rotateTree() {
    var layout = window.tree.getLayout(),
        location = layout.getLocation(),
        r = {
        'Top': 'Left',
        'Left': 'Bottom',
        'Bottom': 'Right',
        'Right': 'Top'
        };

    layout.setLocation(r[location]);
    layout.layout();
        var storage = $.localStorage;
        var orientation = storage.get('SB', getTableNameFromXML(), 'orientation');

	var treeDiv = document.getElementById("mx_divTreeGraphBody");
	var cls = treeDiv.classList[0];
	if (!cls) {
	    cls = "";
	}
	var newOrientation = "";
        switch (orientation) {
        case "top":
            newOrientation = "orientation-left";
            storage.set('SB', getTableNameFromXML(), 'orientation', 'left');
            break;

        case "bottom":
            newOrientation = "orientation-right";
            storage.set('SB', getTableNameFromXML(), 'orientation', 'right');
            break;

        case "left":
            newOrientation = "orientation-bottom";
            storage.set('SB', getTableNameFromXML(), 'orientation', 'bottom');
            break;

        case "right":
            newOrientation = "orientation-top";
            storage.set('SB', getTableNameFromXML(), 'orientation', 'top');
            break;
        }

	if (treeDiv.classList.length == 2)
		treeDiv.className = newOrientation + " " + treeDiv.classList[1];
	else
		treeDiv.className = newOrientation;
}

function zoomTree(direction) {
    if (direction == "in") {
            window.controller.camera.zoom(window.controller.camera.getCurrentZoom() * 1.15);
        } else {
            window.controller.camera.zoom(window.controller.camera.getCurrentZoom() / 1.15);
        }
}

function fitToWindow() {
                (new swv6.ui.Action.Camera({
                    state: window.controller.state,
                    position: {
                        type: 'fit',
                        el: window.controller.camera.scene,
                        padding: window.controller.camera.padding
                    },
                    duration: 200
                })).run();
}

function expandTree() {
    (new swv6.ui.Action.Expand({
    type: 'Expand',
    state: window.controller.state,
    node: expandNode
    })).run();
}

var reloadGSB = true;
function showGraphicalSB() {
	var obj = findToolbarItem(objContextToolbar,"toggleSBWrap()");
	if(obj){
		obj.disable();
	}
    var bodyDiv = document.getElementById("mx_divTreeGraphBody");
    var bodyHeight = bodyDiv.style.top;
    if(!bodyHeight){
        setInitialHeight();
    }
    singleRoot = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id ='0']");

    jQuery("div.thumbnail-tile", editableTable.divTreeGraph).each(function(){
    	var node = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id ='" + jQuery(this).attr("oid") + "']");
    	if(node && node.getAttribute("checked")){
    		jQuery(this).addClass("selected");
    	}else{
    		jQuery(this).removeClass("selected");
    	}
    })
    if(!reloadGSB)
        return;

    'use strict';
    editableTable.divTreeGraph.innerHTML = "";
    editableTable.divTreeGraph.className = "";
    try {

        var viewport = new swv6.html.Div({
                cls: 'viewport',
                parent: editableTable.divTreeGraph
            }),
            scene = new swv6.html.Div({
                cls: 'scene',
                parent: viewport
            }),
            camera = new swv6.ui.Camera({
                scene: scene,
                viewport: viewport,
                padding: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20
                }
            }),
            layout = new swv6.ui.VisualLayout({
                /*groupNodePadding: 20,
                minorGapBetweenNodes: 60,
                majorGapBetweenNodes: 120,
                gapBetweenLevels: 120,*/
                groupNodePadding: 10,
                minorGapBetweenNodes: 30,
                majorGapBetweenNodes: 60,
                gapBetweenLevels: 60,
                location: 'Top',
                alignmentInLevel: 'TowardsRoot',
                edgeType: 'H'
            }),
            treeCtor = (location.search === '?svg') ? swv6.ui.SampleSVGTree : swv6.ui.SampleTree,
            tree = new treeCtor({
                layout: layout,
                parent: scene
            }),
            sideControlbar = new swv6.html.Element({
                tag: 'aside',
                cls: 'side-control',
                parent: editableTable.divTreeGraph
            }),
            buttonDiv = new swv6.html.Div({
                parent: sideControlbar,
                cls: ' buttonbar-mini'
            }),
            txtFind = new swv6.html.Element({
                tag: 'input',
        attr: {
            type: 'text',
            placeholder: emxUIConstants.GSB_FIND_TXT
        },
                parent: buttonDiv
            }),
            buttonFindDiv = new swv6.html.Div({
                parent: buttonDiv,
                cls: ' button-mini find',
                attr: {
                    title: emxUIConstants.GSB_FIND
                }

            }),
            buttonFindA = new swv6.html.Element({
                tag: 'a',
                href: '#',
                parent: buttonFindDiv
            }),
            buttonFindImg = new swv6.html.Element({
                tag: 'img',
        attr: {
            src: '../common/images/iconActionSmallFind.png'
        },
                parent: buttonFindA
            }),

            buttonHideImgDiv = new swv6.html.Div({
                parent: buttonDiv,
                cls: '  button-mini',
                attr: {
                    title: emxUIConstants.GSB_IMAGE
                }
            }),
            buttonHideImgA = new swv6.html.Element({
                tag: 'a',
                href: '#',
                parent: buttonHideImgDiv
            }),
            buttonHideImg = new swv6.html.Element({
                tag: 'img',
        attr: {
            src: '../common/images/iconActionHideImages.png'
        },
                parent: buttonHideImgA
            }),

            buttonRotDiv = new swv6.html.Div({
                parent: buttonDiv,
                cls: '  button-mini',
                attr: {
                    title: emxUIConstants.GSB_ROTATE
                }
            }),
            buttonRotA = new swv6.html.Element({
                tag: 'a',
                href: '#',
                parent: buttonRotDiv
            }),
            buttonRotImg = new swv6.html.Element({
                tag: 'img',
        attr: {
            src: '../common/images/iconActionRotate.png'
        },
                parent: buttonRotA
            }),

            buttonFitDiv = new swv6.html.Div({
                parent: buttonDiv,
                cls: '  button-mini',
                attr: {
                    title: emxUIConstants.GSB_FIT_TO_PAGE
                }
            }),
            buttonFitA = new swv6.html.Element({
                tag: 'a',
                href: '#',
                parent: buttonFitDiv
            }),
            buttonFitImg = new swv6.html.Element({
                tag: 'img',
        attr: {
            src: '../common/images/iconActionFitToPage.png'
        },
                parent: buttonFitA
            }),

            buttonOCMinDiv = new swv6.html.Div({
                parent: buttonDiv,
                cls: '  button-mini switch',
                attr: {
                    title: emxUIConstants.GSB_MINI_MAP
                }
            }),
            buttonOCMinA = new swv6.html.Element({
                tag: 'a',
                href: '#',
                parent: buttonOCMinDiv
            }),
            buttonOCMinImg = new swv6.html.Element({
                tag: 'img',
        attr: {
            src: '../common/images/iconActionOpenCloseMiniMap.png'
        },
                parent: buttonOCMinA
            }),

            miniMapContainer = new swv6.html.Div({
                parent: sideControlbar,
                cls: 'mini-map-container'
            }),
            slider = new swv6.ui.Slider(
	            editableTable.divTreeGraph,
                camera.getCurrentZoom() * 100,
                camera.minZoom * 100,
                camera.maxZoom * 100
            ),
            miniMap = new swv6.ui.MiniMap({
                parent: miniMapContainer,
                tree: tree,
                camera: camera
            }),
            marquee = new swv6.html.Div({ // the dashed zoom/select box
                parent: viewport,
                style: {
                    border: '1px dashed black',
                    position: 'absolute',
                    display: 'none',
                    MozBoxSizing: 'border-box',
                    boxSizing: 'border-box',
                }
            }),
            history = new swv6.ui.History(),
            state = new swv6.ui.State({
                history: history,
                visualTree: tree,
                camera: camera,
                miniMap: miniMap,
                searchFn: function (term, node) {
                    var cols = emxUICore.selectNodes(node.data.data, "c");
                    var found = false;
                    for (i = 0; i < cols.length; i++) {
                        if (cols[i].xml.indexOf(term) >= 0) {
                            found = true;
                            break;
                        }
                    }
                    return found;
                }
//                search: search,
//                controller: controller,
//                titleLabel: swv6.$('treetitle')
            }),
            controller = new swv6.sample.Controller({
                history: history,
                viewport: viewport,
                tree: tree,
                state: state,
                marquee: marquee,
                minimap: miniMap,
                camera: camera
            });
            buttonHideImgA.sub('onclick', null, function () {
                var treeDiv = document.getElementById("mx_divTreeGraphBody");
                var storage = $.localStorage;
                var tablename = getTableNameFromXML();
                var showImage = storage.get('SB',tablename, 'image');

                if (showImage == 'true') {
			storage.set('SB',tablename, 'image', 'false');
    		        treeDiv.className = treeDiv.className + " " + "thumbnail-delete";
                } else {
			storage.set('SB',tablename, 'image', 'true');
     		        treeDiv.className = treeDiv.classList[0];
                }
                var layout = window.tree.getLayout(),
                location = layout.getLocation(),
                r = {
                        'Top': 'Top',
                        'Left': 'Left',
                        'Bottom': 'Bottom',
                        'Right': 'Right'
                };
                layout.setLocation(r[location]);
                layout.layout();
            });
            if(emxUIConstants.STORAGE_SUPPORTED){
                var storage = $.localStorage;
                var tablename = getTableNameFromXML();

                var showMiniMap = 'true';
                if (storage.isEmpty('SB',tablename, 'minimap')) {
                    storage.set('SB',tablename, 'minimap', 'true');
                } else {
                    showMiniMap = storage.get('SB',tablename, 'minimap');
                }

                var orientation = 'top';
                if (storage.isEmpty('SB',tablename, 'orientation')) {
                    storage.set('SB',tablename, 'orientation', 'top');
                } else {
                    orientation = storage.get('SB',tablename, 'orientation');
                }

                var showImage = 'true';
                if (storage.isEmpty('SB',tablename, 'image')) {
                    storage.set('SB',tablename, 'image', 'true');
                } else {
                    showImage = storage.get('SB',tablename, 'image');
                }

                if (showMiniMap == 'false') {
                    miniMapContainer.el.style.display = 'none';
                } else {
                    miniMapContainer.el.style.display = 'block';
                }

                var treeDiv = document.getElementById("mx_divTreeGraphBody");
                treeDiv.className = "orientation-" + orientation;
                if (showImage == 'false') {
                    treeDiv.className = treeDiv.className + " thumbnail-delete";
                }
            }
            buttonOCMinA.sub('onclick', miniMapContainer.el, function () {
                if(this.style.display == 'none') {
                    this.style.display = 'block';
                    miniMap.refresh()
                    if(emxUIConstants.STORAGE_SUPPORTED){
                        var tablename = getTableNameFromXML();
                        var storage = $.localStorage;
                        storage.set('SB',tablename, 'minimap', 'true');
                    }
                } else {
                    this.style.display = 'none';
                    if(emxUIConstants.STORAGE_SUPPORTED){
                        var tablename = getTableNameFromXML();
                        var storage = $.localStorage;
                        storage.set('SB',tablename, 'minimap', 'false');
                    }
                }
            });
            buttonRotA.sub('onclick', null, function () {
                rotateTree();
            });
            buttonFitA.sub('onclick', null, function () {
                fitToWindow();
            });
            buttonFindA.sub('onclick', txtFind.el, function () {
                (new swv6.ui.Action.Search({
                                               state: window.controller.state,
                                               type: 'new',
                                               searchTerm: this.value
                                           })).run();
            });

            camera.subscribe('zoom', undefined, function (value) {
        var maxPct = 1,
        minPct = 0.4,
        logBase = Math.log(2),
        maxLog = Math.log(maxPct) / logBase,
        minLog = Math.log(minPct) / logBase,
        limited = (value < minPct) ? minPct : ((value > maxPct) ? maxPct: value),
        limitedLog = Math.log(limited) / logBase,
        scale = Math.pow(2, ((maxLog - minLog) - (limitedLog - minLog)));
/*
        borderRule.style.strokeWidth = (scale * 3);
        connectorRule.style.strokeWidth = (scale * 1.5);
        connectorSearchPathRule.style.strokeWidth = (scale * 2);

        swv6.$('sidebarZoomPercent').innerHTML = Math.round(value * 100) + '%';*/
        slider.setValue(value * 100);
        });

            state.controller = controller;

            scene.getX = function () {
                return tree.getX();
            };
            scene.getY = function () {
                return tree.getY();
            };
            scene.getWidth = function () {
                return tree.getWidth()
            };
            scene.getHeight = function () {
                return tree.getHeight()
            };

            (function () {
                var inside = false; // avoid potential loop.
                slider.subscribe('change', undefined, function (value) {
                    if (!inside) {
                        inside = true;
                        camera.zoom(value / 100, undefined, undefined, undefined, false);
                        inside = false;
                    }
                });
            }());

        (function () {
            var storage = $.localStorage;
            var tablename = getTableNameFromXML();
            var orientation = storage.get('SB', tablename, 'orientation');
            // load the tree
            new swv6.sample.Action.LoadTree({
                state: state,
                rootLocation: orientation.charAt(0).toUpperCase() + orientation.slice(1)
            }).run();

        }());

 window.tree = tree;
 window.controller = controller;
        sbToolbarResize();

    } catch (e) {
        debugger;
    }
    reloadGSB = false;
}

function showDisplayView(view){

    if(emxUIConstants.STORAGE_SUPPORTED){
        var tablename = getTableNameFromXML();
        var storage = $.localStorage;
        storage.set('SB',tablename, 'displayView', view);
    }

    previousClick = null;

    //if(view == displayView && firstTime != true)
    //  return;

    var previousDisplayView = displayView;
    displayView = view;
    aDisplayRows = getDisplayRows();
    totalRows = aDisplayRows.length;
    if(totalRows <= 0 && view != "detail"){
        return;
    }

    var cols = emxUICore.selectNodes(oXML.documentElement,"/mxRoot/columns//column");
    if(cols && cols.length <= 0){
        alert(emxUIConstants.STR_NO_COLUMNS);
        return;
    }

    editableTable.initDivDomVars();

    if(view == "detail"){
        enableExpandMenus(); //IR-150073V6R2013
        $(".find-in-wrapper")[0].style.display = "inline"
        displayMode(previousDisplayView, displayView);
        editableTable.divCenterDiv.style.display = "block";
        editableTable.divThumbnail.style.display = "none";
        editableTable.divTreeGraph.style.display = "none";
        document.body.className = bodyClass;
        var persist = getParameter("persist");
        setRequestSetting("thumbNailView", "false");
        setTimeout(function(){ showDetailsView(persist) },10);
    } else if (view == "tree"){
		enableExpandMenus();
		$(".find-in-wrapper")[0].style.display = "none"
        displayMode(previousDisplayView, displayView);
        editableTable.divCenterDiv.style.display = "none";
        editableTable.divThumbnail.style.display = "none";
        editableTable.divTreeGraph.style.display = "block";
        setTimeout("showGraphicalSB()", 10);
    } else if (view == "thumbnail"){
        disableExpandAllMenus();
        $(".find-in-wrapper")[0].style.display = "none"
        displayMode(previousDisplayView, displayView);
        editableTable.divCenterDiv.style.display = "none";
        editableTable.divThumbnail.style.display = "block";
        editableTable.divTreeGraph.style.display = "none";
        setRequestSetting("thumbNailView", "true");
        setTimeout("showThumbnailsView()", 10);
    } else {
        displayView = previousDisplayView;
        alert("unknown display type");
    }

}

function drawThumbnailTileText(row,parent){

	//Add
	var columnsTable = emxUICore.selectNodes(oXML,"/mxRoot/columns//column");
	var appliedColumnIndex = "";
	for(i=0;i<columnsTable.length;i++){
		var cVal = columnsTable[i].getAttribute("colorize")
		if(cVal === "yes"){
			appliedColumnIndex = i;
			break;
		}
	}

	var columns = emxUICore.selectNodes(row, "c");
	var colorCodeCSS = "";
	if(appliedColumnIndex !== ""){
		colorCodeCSS = ""+columns[0].getAttribute("facetColoring"); //always use facet color of first column
	}
	//[@colorize = 'yes']

    var strResult = "";

    var tempTNTile = null;
    if (parent) {
        tempTNTile = document.getElementById("tn-grph-" + row.getAttribute("id"));
    } else {
        tempTNTile = document.getElementById("tn-" + row.getAttribute("id"));
    }

    if(tempTNTile == null) {
        tempTNTile = document.createElement("div");
        if (parent) {
			if (parent.firstChild) {
				parent.insertBefore(tempTNTile, parent.firstChild);
			} else {
            parent.appendChild(tempTNTile);
			}
            tempTNTile.setAttribute("id", "tn-grph-" + row.getAttribute("id"));
        } else {
            editableTable.divTNPageContent.appendChild(tempTNTile);
            tempTNTile.setAttribute("id", "tn-" + row.getAttribute("id"));
        }
        tempTNTile.setAttribute("oid", row.getAttribute("id"));

        if(row.getAttribute("checked") == "checked"){
                tempTNTile.className = "thumbnail-tile selected";
            } else {
                tempTNTile.className = "thumbnail-tile";
        }

        tempTNTile.onclick = thumbnailClick;
    }

    if(tempTNTile.getAttribute("textLoaded") == "loaded") return;

    if(emxUICore.selectNodes(row, "c").length > 0)
        tempTNTile.setAttribute("textLoaded", "loaded");

    var innerHTML = "";

    if(tempTNTile.firstChild != null){
        innerHTML = tempTNTile.innerHTML;
    }
    var image = null;
    var columns = emxUICore.selectNodes(row, "c");
    for(var i = 0;  i < columns.length; i++){
		var textColumn = columns[i].getAttribute("i");
        if(textColumn){
            image = textColumn;
            break;
        }
    }


    tempTNTile.innerHTML = "";
    innerHTML += "<div class='thumbnail-container'"+" rmbrow='"+ row.getAttribute("id")+ "' rmbid='" + row.getAttribute("o") +
                    "' o='" + row.getAttribute("o") + "' id='" + row.getAttribute("id") + "' r='" + row.getAttribute("r") + "'>";
    if(colorCodeCSS !== ""){
    	innerHTML += "<ul class='"+colorCodeCSS+"' onmouseover = 'thumbnailMouseOver(this)' onmouseout = 'thumbnailMouseOut(this)'>";
    }else{
    	innerHTML += "<ul onmouseover = 'thumbnailMouseOver(this)' onmouseout = 'thumbnailMouseOut(this)'>";
    }

    //innerHTML += "<ul onmouseover = 'thumbnailMouseOver(this)' onmouseout = 'thumbnailMouseOut(this)'>";
    //FIX for IR-076379V6R2012WIM

    var fields = 0;
    var fields = tnTextColumns.length;
    fields = fields>5 ? fields = 5 : (fields<=0 ? fields = 1 :fields);


    for(var i = 0;  i < fields; i++){
        var textColumn = emxUICore.selectSingleNode(row, 'c[position()=' + tnTextColumns[i].position + ']');
        var displayValue = emxUICore.getXML(textColumn);
        var isDynamicURL = isDynamicURLValue(displayValue);
        if(textColumn == null || textColumn.firstChild == null || (textColumn.firstChild.data == null && isDynamicURL && textColumn.getAttribute("iFH") != "true")){
            innerHTML += "<li>&nbsp;</li>";
            loaded = false;
            continue;
        }

        var fieldDisplayValue = textColumn.firstChild.data;
		if(fieldDisplayValue != null || fieldDisplayValue != undefined){
			fieldDisplayValue = fieldDisplayValue.replace(/0x08/g, " | ");
		}
        if(i == 0 && row.getAttribute("ra")=='t') {
            var fieldvalue = fieldDisplayValue;
            if(fieldDisplayValue && fieldDisplayValue.length >18){
                fieldvalue = fieldDisplayValue.substr(0,16);
                fieldvalue += '..';
            }

            var rmbMenu = emxUICore.selectSingleNode(tnTextColumns[i].setting, '//setting[@name = "RMB Menu"]');
            if(!rmbMenu || rmbMenu == null) {
                innerHTML += "<li class='object graph-node' title = '"+ fieldDisplayValue +"' rmbrow='"+ row.getAttribute("id")+ "' rmbid='" + row.getAttribute("o") + "' rmb=''><span class='icon'><img src='"+image+"'></img></span><a class='object' onclick='event.cancelBubble=true;' href=\"javascript:link(";
            }else{
                innerHTML += "<li class='object graph-node' title = '"+ fieldDisplayValue +"' rmbrow='"+ row.getAttribute("id")+ "' rmbid='" + row.getAttribute("o") + "' rmb='" + rmbMenu.textContent + "'><span class='icon'><img src='"+image+"'></img></span><a class='object' onclick='event.cancelBubble=true;' href=\"javascript:link(";
            }
            innerHTML += "'" + tnTextColumns[i].position + "',";
            innerHTML += "'" + row.getAttribute("o")  + "',";
            if(row.getAttribute("r")!= null)
                innerHTML += "'" + row.getAttribute("r")  + "',";
            else
                innerHTML += "'',";
            if(row.getAttribute("p")!= null)
                innerHTML += "'" + row.getAttribute("p")  + "',";
            else
                innerHTML += "'',";
            innerHTML += "'" + textColumn.firstChild.data + "')";
            innerHTML += "\";>" + displayValue + "</a></li>"
        } else {

            var fieldvalue = fieldDisplayValue;
            if(fieldDisplayValue && fieldDisplayValue.length > 24){
                fieldvalue = fieldDisplayValue.substr(0,22);
                fieldvalue += '..';
            }

            if(textColumn.getAttribute("iFH") == "true"){
                innerHTML += "<li title = '"+ displayValue +"'>" + displayValue + "</li>";
            }else if(isDynamicURL){
                try{
                     var objDOM = emxUICore.createXMLDOM();
                     displayValue = displayValue.replace(/&/g, "&amp;");
                     objDOM.loadXML("<mxRoot>"+displayValue+"</mxRoot>");
                     innerHTML += "<li>" + emxUICore.selectSingleNode(objDOM, "/mxRoot/mxLink").xml  + "</li>";
                }catch(e){
                    innerHTML += "<li title = '"+ fieldDisplayValue +"'>" + fieldvalue + "</li>";
                }
            }else{
				var href = tnTextColumns[i].setting.getAttribute("href");
				if (href) {
					innerHTML += "<li title = '"+ fieldDisplayValue +"' >" + "<a onclick='event.cancelBubble=true;' href=\"javascript:link(";
					innerHTML += "'" + tnTextColumns[i].position + "',";
					innerHTML += "'" + row.getAttribute("o")  + "',";
					if(row.getAttribute("r")!= null)
						innerHTML += "'" + row.getAttribute("r")  + "',";
					else
						innerHTML += "'',";
					if(row.getAttribute("p")!= null)
						innerHTML += "'" + row.getAttribute("p")  + "',";
					else
						innerHTML += "'',";
					innerHTML += "'" + textColumn.firstChild.data + "')";
					innerHTML += "\";>" + displayValue + "</a></li>"
				} else {
                innerHTML += "<li title = '"+ fieldDisplayValue +"' >" + displayValue + "</li>";
			}
            }
        }
    }
    innerHTML += "</ul>";
    innerHTML += "</div>";
    innerHTML += "</div>";

    tempTNTile.innerHTML = innerHTML;

}

function drawThumbnailTileImage(row, tempTNTile){
    if (!tempTNTile)
       tempTNTile = document.getElementById("tn-" + row.getAttribute("id"));

    jQuery(tempTNTile).hover(thumbnailHover, thumbnailHoverOut);

    if(tempTNTile.getAttribute("imageLoaded") == "loaded") return;

    if(emxUICore.selectNodes(row, "c").length > 0)
        tempTNTile.setAttribute("imageLoaded", "loaded");

var innerHTML = tempTNTile.firstChild.innerHTML;

    var imageColumn = row.firstChild;
    if (row.childNodes.length > 1) {
        imageColumn = row.lastChild;
    }
    if(imageColumn != null &&  imageColumn.firstChild!= null ){

            for(var i=0; i < imageColumn.childNodes.length; i++){
            if(isIE){
                innerHTML += imageColumn.childNodes[i].xml;
            } else {
                innerHTML += (new XMLSerializer()).serializeToString(imageColumn.childNodes[i]);
            }
          }

    }
    if(tempTNTile.firstChild){
    tempTNTile.firstChild.innerHTML = innerHTML;
}
    var checkBoxColumn = emxUICore.selectSingleNode(oXML, "/mxRoot/columns/column/settings/setting[@name = 'True Image']/../..");
    if (checkBoxColumn) {
        var columnName = checkBoxColumn.getAttribute("name");
        var column = colMap.getColumnByName(columnName);
        if (displayView != "tree") {
            row = emxUICore.selectSingleNode(oXML, "//r[@id = '" + row.getAttribute("id") + "']");
        }
        var columnValue = emxUICore.selectSingleNode(row, "c[" + column.index + "]").getAttribute("a");
        if (columnValue != "none") {
			var trueImage = column.getSetting("True Image");
			var falseImage = column.getSetting("False Image");
			var trueTT = column.getSetting("True Tooltip");
			var falseTT = column.getSetting("False Tooltip");
			var booleanSpan = document.createElement("span");
			booleanSpan.className = "badge-3D";
			var img = document.createElement("img");
			if (columnValue == "true") {
				img.src = trueImage;
				if(trueTT) {
					img.title = trueTT;
				}
			} else {
				img.src = falseImage;
				if (falseTT) {
					img.title = falseTT;
				}
			}
			img.setAttribute("onclick", "booleanToggleImg(this, '" + row.getAttribute("id") + "', '" + columnName + "')");
			booleanSpan.appendChild(img);
			tempTNTile.firstChild.appendChild(booleanSpan);
		}
    }
}

var initialtop;
function thumbnailMouseOver(ulelem){
    var showImage = 'true';
    if (displayView == "tree") {
        var storage = $.localStorage;
        var tablename = getTableNameFromXML();
        showImage = storage.get('SB',tablename, 'image');
    }

    if (showImage == 'false') {
        return;
    }
    if (ulelem.el)
        ulelem = ulelem.el;
     if(!initialtop)
         initialtop = ulelem.offsetTop;
    var obj = jQuery(ulelem);
    ulelem.style.top =  (obj.parent().get(0).offsetHeight-obj[0].offsetHeight) + 'px';
}

function thumbnailMouseOut(ulelem){
    var showImage = 'true';
    if (displayView == "tree") {
        var storage = $.localStorage;
        var tablename = getTableNameFromXML();
        showImage = storage.get('SB',tablename, 'image');
    }

    if (showImage == 'false') {
        return;
    }

    if (ulelem.el)
        ulelem = ulelem.el;
    ulelem.style.top= initialtop+'px';
}

function thumbnailHover(){
    jQuery(".viewer.icon", this).show();
}

function thumbnailHoverOut(){
    jQuery(".viewer.icon", this).hide();
}

function launchImageManager(id){
		require(["../components/emxUIImageManagerInPlace"], function(ImageMananger){
			new ImageMananger( id );
		});
}

function thumbnailClick(){
    var event = emxUICore.getEvent();
    if(event.target.className === "viewer icon"){
        return;
    }
    var obj = this;
    var strSelection        = getRequestSetting('selection');
    var hideRootSelection = getRequestSetting('hideRootSelection');

    var selXMLNode = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id ='" + obj.getAttribute('oid') +"']");
    var tnSelected = false;
    if((obj.className == 'thumbnail-tile selected' && strSelection == "single") ||
            !(strSelection == "single" || strSelection == "multiple") ||
            (obj.getAttribute('oid') == '0' && strSelection == "multiple" && hideRootSelection == "true") ||
            (selXMLNode.getAttribute("disableSelection") == "true")){
        return;
    }

    if(obj.className == 'thumbnail-tile' || obj.className == 'thumbnail-tile hover') {
        obj.className = 'thumbnail-tile selected';
        tnSelected = true;
    }
    else if(obj.className == 'thumbnail-tile selected') {
        obj.className = 'thumbnail-tile';
    }

    if(event.shiftKey && strSelection != "single"){
        if(previousClick != null){
            var previous = document.getElementById(previousClick);
            var current = document.getElementById(obj.id);

            var reverse = false;

            if(current.offsetTop == previous.offsetTop ){
                if(current.offsetLeft > previous.offsetLeft){
                    reverse = true;
                }
            }
            if(current.offsetTop > previous.offsetTop ){
                reverse = true;
            }

            var temp = current;
            while(temp.id != previous.id ){
                temp = reverse? temp.previousSibling : temp.nextSibling ;
                if(temp.id == previous.id ){
                    break;
                }
                temp.className = 'thumbnail-tile selected';
                var xmlNode = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id ='" + temp.getAttribute('oid') +"']");
                var id          = xmlNode.getAttribute("id");
                var oid         = xmlNode.getAttribute("o");
                var relid       = xmlNode.getAttribute("r");
                var parentId    = xmlNode.getAttribute("p");
                xmlNode.setAttribute("checked", "checked");
                FreezePaneregister(relid + "|" + oid + "|" + parentId + "|" + id);
            }


        }
    }

    if(strSelection == "single" && previousClick != null){
        var previous = document.getElementById(previousClick);
        var xmlNode = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id ='" + previous.getAttribute('oid') +"']");
        var id          = xmlNode.getAttribute("id");
        var oid         = xmlNode.getAttribute("o");
        var relid       = xmlNode.getAttribute("r");
        var parentId    = xmlNode.getAttribute("p");
        if(previous.className == 'thumbnail-tile selected') {
            previous.className = 'thumbnail-tile';
        }
        if(xmlNode.getAttribute("checked") == "checked") {
            xmlNode.removeAttribute("checked");
            FreezePaneunregister(relid + "|" + oid + "|" + parentId + "|" + id);
        }
    }

    if(tnSelected)
        previousClick = obj.id;
    else
        previousClick = null;


    var id          = selXMLNode.getAttribute("id");
    var oid         = selXMLNode.getAttribute("o");
    var relid       = selXMLNode.getAttribute("r");
    var parentId    = selXMLNode.getAttribute("p");

    if (relid == null || relid == "null") {
        relid = "";
    }
    if (parentId == null || parentId == "null") {
        parentId = "";
    }

    if(selXMLNode.getAttribute("checked") == "checked") {
        selXMLNode.removeAttribute("checked");
        FreezePaneunregister(relid + "|" + oid + "|" + parentId + "|" + id);
    }
    else {
        selXMLNode.setAttribute("checked", "checked");
        FreezePaneregister(relid + "|" + oid + "|" + parentId + "|" + id);
    }

    if(editableTable.mx_objectCount != null)
        editableTable.mx_objectCount.innerHTML = "" + totalObjectCount() + countSelectedObjects();

    event.cancelBubble=true;
    //document.releaseCapture();
    var oTop = bpsTagNavConnector.getTNWindow();
    //we need to determine if we are filtering in refinement or tag navigator
    if (fullTextSearchObj && "true"==fullTextSearchObj.getTagsMode()) {
        oTop.jQuery(oTop.document).trigger("sb_selection_changed.bps_fts");
    }
    if (!fullTextSearchObj && oTop && oTop.showSlideInDialog && oTop.showSlideInDialog.mode == "tag navigator") {
        oTop.jQuery(oTop.document).trigger("sb_selection_changed.bps_sb");
    }
}


function displayMode(previousDisplayView, displayView){

    //Iterate through toolbars [Added to support Structure Browser - Display Mode]
    for(var toolbarIndex=0; toolbarIndex<toolbars.length; toolbarIndex++)
    {
        var currentToolbar = toolbars[toolbarIndex];
        disableOrEnableToolbarItemsViewMode(currentToolbar, previousDisplayView, displayView);
    }
}

/*
 * Disables or Enables Toolbar Items[Added to Support Structure Browser - Edit Mode Toolbar]
 * @param disableMode
 * @param enableMode
 */
 function disableOrEnableToolbarItemsViewMode(currentToolbar, disableMode ,enableMode){
     if(disableMode == enableMode){
         return;
     }
     //Iterate through currentToolbar Items
     for(var toolbarItemIndex=0; toolbarItemIndex<currentToolbar.items.length; toolbarItemIndex++)
     {
         var toolbarCurrentItem = currentToolbar.items[toolbarItemIndex];

         //Mode check for Items in Toolbar
         currentMode = toolbarCurrentItem.getViewMode();

         if(currentMode != ""){
             if(currentMode == disableMode)
             {
                  if(toolbarCurrentItem.enabled == true)
                  {
                      toolbarCurrentItem.disable();
                      //check for HTML control element
                      if(toolbarCurrentItem.hasOwnProperty("htmlControl"))
                      {
                           disableOrEnableHTMLElement(toolbarCurrentItem, true);
                      }
                  }
                  continue;
              }
             else if(currentMode == enableMode)
             {
                 if(toolbarCurrentItem.enabled != true)
                 {
                     toolbarCurrentItem.enable();
                     //check for HTML control element
                     if(toolbarCurrentItem.hasOwnProperty("htmlControl"))
                     {
                          disableOrEnableHTMLElement(toolbarCurrentItem, false);
                     }
                 }
             }
         }

         //if toolbarCurrentItem is a menu
         if (toolbarCurrentItem.menu != null)
         {
            for(var index=0; index<toolbarCurrentItem.menu.items.length; index++)
            {
               disableOrEnableSubMenusandCommands(toolbarCurrentItem.menu.items[index], disableMode, enableMode);
            }
         }
      }
 }

 function thumbnailOnScroll(){
     if(editableTable.divTNPageContent == null) return;

     if (scrollTimeout) {
         clearTimeout(scrollTimeout);
     }

     if (true) {
         scrollTimeout = setTimeout("thumbnailOnScrollTimeout()", scrollDelay );
     } else {
         setTimeout("bScrollStarted=false",100);
     }
 }

 var thumbnailHeight = 0;
 var thumbnailWidth = 0;

 function thumbnailOnScrollTimeout(){

     if(bScrollStarted) return;

     if(editableTable.divTNPageContent == null) return;

     var thumbnailWidth = jQuery(".thumbnail-tile").get(0).clientWidth;
     var thumbnailHeight =jQuery(".thumbnail-tile").get(0).clientHeight;

     if(thumbnailWidth ==0 || thumbnailHeight==0){
         thumbnailWidth = 154;
         thumbnailHeight = 118;
     }

     hTilesNumber = Math.floor((editableTable.divTNPageContent.clientWidth - 20 )/ (thumbnailWidth + 8) );
     vTilesNumber = Math.ceil((editableTable.divTNPageContent.clientHeight - 20 )/ (thumbnailHeight + 8) ) ;

     pageSize = hTilesNumber * (vTilesNumber + 1);

     topElementNo = Math.floor((editableTable.divTNPageContent.scrollTop - 10)/ (thumbnailHeight + 8)) * hTilesNumber + 1;
     aDisplayRows   = getDisplayRows();
     if(topElementNo < 0) topElementNo = 1;

     var nStart     = topElementNo - 1;
     var nEnd       = topElementNo + pageSize -1;
     var xpath      = "";
     var displayRows = [];
     var needRows = [];
     xpath          = "/mxRoot/rows//r[(@level = '0' or count(ancestor::r[not(@display) or @display = 'none']) = '0') and not(@rg)]";

     if(nEnd >= aDisplayRows.length) nEnd = aDisplayRows.length -1;

     for (var i = nStart; i <= nEnd; i++){
         var tempColumns = emxUICore.selectNodes(aDisplayRows[i], "c");
         var rowGroup = aDisplayRows[i].getAttribute("rg");
         if(!rowGroup){
             displayRows.push(aDisplayRows[i]);
             if(tempColumns.length == 0) {
                 needRows.push(aDisplayRows[i]);
             }
         }
     }
     var imageAndTextIDs  = [];
     for(var i = 0 ; i < needRows.length ; i++) {
         imageAndTextIDs.push(needRows[i].getAttribute("id"));
     }
     imageAndTextIDs  = imageAndTextIDs.join(":");
     if (imageAndTextIDs.length > 0){
         if (objHTTP) {
             objHTTP.abort();
             //ElapsedTimer.info('aborted prior request');
         }

         //ElapsedTimer.log("** About to fetch " + needRows.length + " rows");
         objHTTP = emxUICore.getXMLDataPost("../common/emxFreezePaneGetData.jsp", (getParams()+ "&rowIds=" + imageAndTextIDs),  MergeXMLResponseAndRenderText, displayRows);
     }else{
         //ElapsedTimer.log("** No fetch required");
         MergeXMLResponseAndRenderText(null, displayRows);
     }

     setTimeout("adjustFieldLength()",0);

}

 var fieldlengthset = true;
 function adjustFieldLength(){
           fieldlengthset = false;
		jQuery('#mx_divThumbnailBody .thumbnail-container li .object').each(function(){

            var totalWidth = $(this).parent().innerWidth();
            var totwidth =  $(this).innerWidth();
            if(totwidth+23 > totalWidth){
            var fieldName = $(this).get(0).innerHTML;

            if(fieldName.length >18){
                fieldName = fieldName.substr(0,17);
            }
            fieldName = fieldName.substr(0,fieldName.length-3);
            fieldName += "..";
            $(this)[0].innerHTML = fieldName;
            fieldlengthset = true;
            }

    });

		jQuery('#mx_divThumbnailBody .thumbnail-container li:not(.object)').each(function(){

            var totalWidth = $(this).parent().innerWidth();
            var totwidth =  $(this).get(0).scrollWidth;
            if(totwidth+4 > totalWidth){
                var fieldName = $(this).get(0).innerHTML;
                if(fieldName.length >24){
                    fieldName = fieldName.substr(0,23);
                }
                fieldName = fieldName.substr(0,fieldName.length-4);
                fieldName += "..";
                $(this).get(0).innerHTML = fieldName;
                 fieldlengthset = true;
            }


    });
        if(fieldlengthset){
        adjustFieldLength();
        }


 }

function booleanToggleImg(element, id, colmnName) {
	event.stopPropagation();
	var column = colMap.getColumnByName(colmnName);
	var onChangeHandler = column.getSetting("On Change Handler");
	var row = emxUICore.selectSingleNode(oXML, "//r[@id = '" + id + "']");
	var cols = emxUICore.selectNodes(row, "c");
	var trueImage = column.getSetting('True Image');
	var trueTT = column.getSetting('True Tooltip');
	var falseImage = column.getSetting('False Image');
	var falseTT = column.getSetting('False Tooltip');

	var columnValue = cols[column.index - 1].getAttribute("a");
	if (columnValue == "true") {
		cols[column.index - 1].setAttribute("a", "false");
		emxUICore.setText(cols[column.index - 1], "false");
		element.src = falseImage;
		if (falseTT) {
			element.title = falseTT;
		}
	} else {
		cols[column.index - 1].setAttribute("a", "true");
		emxUICore.setText(cols[column.index - 1], "true");
		element.src = trueImage;
		if (trueTT) {
			element.title = trueTT;
		}
	}
	if (displayView != "tree") {
		window.reloadGSB = true;
	}
	if (onChangeHandler) {
		eval(onChangeHandler + "('" + id + "')");
	}
 }

 function MergeXMLResponseAndRenderText(oResponseXML, aRows) {
     try {
         if(oResponseXML != null)
             checkActionError(oResponseXML);

         var displayRows = [];
         var imageIds = [];

         MergeXMLTextResponseThumbnail(oResponseXML, aRows);

         for(var i = 0; i < aRows.length ; i++){
             drawThumbnailTileText(aRows[i]);
             var rowGroup = aRows[i].getAttribute("rg");
             if(!rowGroup){
                 if(oImageXML == null){
                     imageIds.push(aRows[i].getAttribute("id"));
                 } else {
                     var imageRow = emxUICore.selectSingleNode(oImageXML, "/mxRoot/rows/r[@id='"+aRows[i].getAttribute("id")+"']");
                     if( imageRow == null){
                         imageIds.push(aRows[i].getAttribute("id"));
                     } else {
                         displayRows.push(imageRow);
                     }
                 }
             }
         }

         imageIds  = imageIds.join(":");
         var tnTextColumns = getTextColumnsThumbnail();
         if (imageIds.length > 0){
             if (objHTTP) {
                 objHTTP.abort();
                 //ElapsedTimer.info('aborted prior request');
             }
             if(tnTextColumns.length > 0){
             objHTTP = emxUICore.getXMLDataPost("../common/emxFreezePaneGetData.jsp", (getParams()+ "&rowIds=" + imageIds + "&sbImages=ImageOnly"),  MergeXMLResponseAndRenderImage, displayRows);
         }else{
                objHTTP = emxUICore.getXMLDataPost("../common/emxFreezePaneGetData.jsp", (getParams()+ "&rowIds=" + imageIds + ""),  MergeXMLResponseAndRenderImage, displayRows);
             }
         }else{
             //ElapsedTimer.log("** No fetch required");
             MergeXMLResponseAndRenderImage(null, displayRows);
         }

         oResponseXML = null;
     } catch (err) {
         alert("Error: " + err.message);
     }
 }

 function MergeXMLResponseAndRenderImage(oResponseXML, aRows) {
     try {
         if(oResponseXML != null)
             checkActionError(oResponseXML);

         MergeXMLImageResponseThumbnail(oResponseXML, aRows);

         for(var i = 0; i < aRows.length ; i++){
             drawThumbnailTileImage(aRows[i]);
         }

         oResponseXML = null;
     } catch (err) {
         alert("Error: " + err.message);
     }
 }

  function getTextColumnsThumbnail(){
     var tnTextColumns = new Array();
     var tnTextColumnsCount = 0;
     var columns = emxUICore.selectNodes(oXML, '/mxRoot/columns/column');
     for (var i = 0;  i < columns.length; i++) {
         var settings = emxUICore.selectNodes(columns[i], 'settings//setting');
         if(tnTextColumnsCount < thumbnailFieldCount){
             for (var j = 0;  j < settings.length; j++) {
                 if(settings[j].getAttribute("name") == "Display View"){
                     if (settings[j].firstChild.data.indexOf("thumbnail") >= 0)
                         tnTextColumns[tnTextColumnsCount++] = {position: i + 1, setting: columns[i]} ;
                 }
             }
         }
     }

     if(tnTextColumnsCount == 0){
         for (var i = 0;  i < columns.length; i++) {
             var columnType = columns[i].getAttribute("type");
             if(columnType == "businessobject" || columnType == "relationship" || columnType == "program"){
                 tnTextColumns[tnTextColumnsCount++] = {position: i + 1, setting: columns[i]};
             }
             if(tnTextColumnsCount >= thumbnailFieldCount) break;
         }

     }

     return tnTextColumns;
 }

 function getImageColumnThumbnail(){
     var tnImageColumn = null;
     var columns = emxUICore.selectNodes(oXML, '/mxRoot/columns/column');
     for (var i = 0;  i < columns.length; i++) {
         if(columns[i].getAttribute("type") == "Image"){
             tnImageColumn = i + 1;
             break;
         }
     }

     if(tnImageColumn == null)
         tnImageColumn = columns.length + 1;

     return tnImageColumn;
 }

 function MergeXMLTextResponseThumbnail(xmldom, rowsWithNoColumns)
 {
     if (xmldom == null) return;
     //ElapsedTimer.enter('MXR' + " dom rows count=" + xmldom.documentElement.childNodes[0].childNodes.length + "; rwnc count=" + rowsWithNoColumns.length);

     var oRows      = xmldom.documentElement.childNodes[0];
     var count = 0;
     for(var i = 0; i < oRows.childNodes.length; i++)
     {
         while(oRows.childNodes[i].getAttribute("id") != rowsWithNoColumns[count].getAttribute("id")){
             count++;
         }
         for(var j = 0; j < oRows.childNodes[i].childNodes.length; j++) {
             var nNewColumn = oRows.childNodes[i].childNodes[j].cloneNode(true);
             rowsWithNoColumns[count].appendChild(nNewColumn);
         }
     }
     xmldom = null;
     objHTTP = null;

     //ElapsedTimer.exit('MXR');
 }

 function MergeXMLImageResponseThumbnail(xmldom, rowsWithNoColumns)
 {
     if (xmldom == null) return;

     //ElapsedTimer.enter('MXR' + " dom rows count=" + xmldom.documentElement.childNodes[0].childNodes.length + "; rwnc count=" + rowsWithNoColumns.length);

     if(oImageXML == null) {
         oImageXML = xmldom;
         var displayRows = emxUICore.selectNodes(xmldom, "/mxRoot/rows/r");
         for(var i = 0; i < displayRows.length; i++)
             rowsWithNoColumns.push(displayRows[i]);
         return;
     } else {
         var resultEl = xmldom.documentElement.firstChild;
         for(var i = 0; i < resultEl.childNodes.length; i++){
             var nNewColumn = resultEl.childNodes[i].cloneNode(true);
             oImageXML.documentElement.firstChild.appendChild(nNewColumn);
             rowsWithNoColumns.push(nNewColumn);
         }
     }

     xmldom = null;
     objHTTP = null;

     //ElapsedTimer.exit('MXR');
 }

 function toggleEditButton(obj,imageoldName, imageNewName, defaultOldText, defaultNewText,customOldText,customNewText)
 {
            strText = obj.element.innerHTML;
            if(strText.indexOf(">") > -1){
                var strText1= [];
                strText1 = strText.split(">");
                var imageName = strText1[0];
                var textLabel = obj.element.textContent;
                var textTitle = obj.element.title;

                imageName= imageName.replace(imageoldName, imageNewName);
                if(textTitle.indexOf(defaultOldText)> -1){
                    textTitle = textTitle.replace(RegExp(defaultOldText, "gi"), defaultNewText);
                    obj.element.title = textTitle;
                }
                else{ //  IR-391380-3DEXPERIENCER2016x
                    textTitle = textTitle.replace(RegExp(customOldText, "gi"), customNewText);
                    obj.element.title = textTitle;
                }
                if (obj.parent.maxLabelChars > -1 && textTitle.length > obj.parent.maxLabelChars) {
                    textTitle = textTitle.substring(0, Math.min(obj.parent.maxLabelChars, textTitle.length)) + "...";
                }
                strText=imageName+">";
                obj.element.innerHTML = strText;
           }
            else{
                strText = obj.element.title;
                if(strText.indexOf(defaultOldText) > -1){
                    strText= strText.replace(defaultOldText, defaultNewText);
                    obj.element.title = strText;
                } else{
                    strText= strText.replace(customOldText, customNewText);
                    obj.element.title = strText;
                }
               /* if (obj.parent.maxLabelChars > -1 && strText.length > obj.parent.maxLabelChars) {
                    strText = strText.substring(0, Math.min(obj.parent.maxLabelChars, strText.length)) + "...";
                }
                obj.element.innerHTML = strText;*/

            }

 }

//Added for Autonomy Search Fill-Pages feature
function isFillPagesOn() {
    var fillPages = getParameter('fillPages');
    if(fillPages == null || fillPages == "") {
        fillPages = emxUIConstants.STR_FILL_PAGES;
    }
    return (fillPages === "true" || fillPages === "TRUE");
}

//globals used for Row Grouping.
var groupData = [];
var indexRowGouping1 = 0;
var indexRowGouping2 = 0;
var indexRowGouping3 = 0;
var mapGroupId = {}
var comboMap = {}
var rowSelections = [];

function processRowGrouping(columnList)
{
    if (oXML == null)
        return;

    var startTime = (new Date()).valueOf();

    var sortGroups = function(a, b)
    {
        if (groupSortOrder == "descending" || groupSortOrder == "ascending") {
            var direction = (groupSortOrder.toLowerCase() == "descending") ? -1 : 1
            if (groupSortType.toLowerCase() == "date")
            {
                return (Number(a.groupElement.firstChild.getAttribute("msValue")) > Number(b.groupElement.firstChild.getAttribute("msValue"))) ? direction : direction * -1;
            }
            else
            {
                if (groupSortType.toLowerCase() == "integer")
                {
                    //numeric sort.
                    return (Number(a.groupHeader) > Number(b.groupHeader)) ? direction : direction * -1;
                }
                else
                {
                    //text sort.
                    return (a.groupHeader > b.groupHeader) ? direction : direction * -1;
                }
            }
        } else if (groupSortOrder == "initial") {
            return (Number(a.getAttribute("initialRGOrderList")) > Number(b.getAttribute("initialRGOrderList"))) ? 1 : -1;
        } else {
            //dont sort.
            return 0;
        }
    };

    var removeGroupElements = function(rootElement, groupObjectList /*, level */) {
        var level = arguments[2];
        var xmlRefreshed = false;

        for (var i=0; i < groupObjectList.length; i++) {
            var groupObject = groupObjectList[i];
            if (level != null && level == 0) {
                //check element and make sure it is still connected to rootElement; otherwise XML reefreshed.
                var groupRows = emxUICore.selectNodes(oXML,"/mxRoot/rows//r[@rg]");
                if (groupRows.length == 0) {
                    xmlRefreshed = true;
                    break;
                }
                level = null;
            }
            if (groupObject.groupSubGroups.length > 0) {
                removeGroupElements(rootElement, groupObject.groupSubGroups);
            } else {
                var row = groupObject.groupElement.getElementsByTagName("r")[0];
                while (row != null) {
                    var initialRGOrder = row.getAttribute("initialRGOrderList");
                    if (initialRGOrder == null) {
                        newRows++;
                        var newOrder = prevOrder + (newRows / 10000.0);
                        row.setAttribute("initialRGOrderList", newOrder);
                    } else {
                        prevOrder = Number(initialRGOrder);
                    }
                    initialRGOrderList.push(row);
                    row = row.nextSibling;
                }
            }
            groupObject.groupElement.parentNode.removeChild(groupObject.groupElement);
        }
        if (xmlRefreshed == false)
        {
            groupSortOrder = "initial";
            initialRGOrderList.sort(sortGroups);
            var len = initialRGOrderList.length
            for (var j=0; j < len; j++) {
                var row = initialRGOrderList[j];
                rootElement.appendChild(row);
            }
        }
    };

    var insertGroupElements = function(rootElement, groupObjectList, level, columnList) {
        groupSortOrder = columnList[level*3+1]
        groupSortType = columnList[level*3+2]
        groupObjectList.sort(sortGroups);

        for (var i=0; i < groupObjectList.length; i++) {
            var groupObject = groupObjectList[i];
            groupObject.groupElement.setAttribute("count", groupObject.groupCount);
            rootElement.appendChild(groupObject.groupElement);
            if (groupObject.groupSubGroups.length > 0) {
                insertGroupElements(groupObject.groupElement, groupObject.groupSubGroups, level+1, columnList);
            }
        }
    };

    var addNewGroup = function(mapGroupId, groupId, parentObject, cellNode, level, filter, predefinedColumnChoices)
    {
        //create xml data.
        var newElement = oXML.createElement("r");

        var newCell = cellNode.cloneNode(true);
        var styleRow = "rg" + (level+1);
        var groupedColumnName = "";
        if(styleRow == "rg1"){
            groupedColumnName = colMap.getColumnByIndex(columnList[0]).name;
        }else if(styleRow == "rg2"){
            groupedColumnName = colMap.getColumnByIndex(columnList[3]).name;
        }else if(styleRow == "rg3"){
            groupedColumnName = colMap.getColumnByIndex(columnList[6]).name;
        }
        newCell.setAttribute("editMask", "false");

        newElement.appendChild(newCell);
        newElement.setAttribute("o", "");
        newElement.setAttribute("p", "");
        newElement.setAttribute("r", "");
        newElement.setAttribute("level", level);
         if(filter){
        newElement.setAttribute("filter", filter);
            }
        newElement.setAttribute("rg", styleRow);
        newElement.setAttribute("id", groupId);
        newElement.setAttribute("display", "block");
        newElement.setAttribute("groupedColumnName", groupedColumnName);

        //add dummy cells
        for(var i = 0; i < colMap.columns.length - 1; i++)
        {
            var dummyCell = oXML.createElement("c");
            dummyCell.setAttribute("editMask", "false");
            newElement.appendChild(dummyCell);
        }

        var groupName = trim(emxUICore.getText(cellNode));
        while(groupName.indexOf("'")!=-1){
            groupName=groupName.replace("'","&quot;");
        }
        var newGroup =
        {
            "groupHeader" : groupName.toLowerCase(),
            "groupIndex" : parentObject.length,
            "groupCount" : 0,
            "groupElement" : newElement,
            "groupSubGroups" : []
        }

        parentObject.push(newGroup);
        mapGroupId[groupId] = newGroup;

        //add JPO-Based Range Values.
        var i = level + 1;
        var choices = predefinedColumnChoices[i];
        if (choices != null && choices.length > 0)
        {
            var groupIdPrefix = groupId
            for (var j=0; j < choices.length; j++)
            {
                var choice = trim(choices[j]);
                groupId = groupIdPrefix + "L" + j + choice;
                var cellNode = oXML.createElement("c");
                var textNode = oXML.createTextNode(choice);
                cellNode.appendChild(textNode);
                addNewGroup(mapGroupId, groupId, newGroup.groupSubGroups, cellNode, i, false, predefinedColumnChoices);
            }
        }

        return newGroup;
    }

    try{
        var isIndentedView = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='isIndentedView']/text()");
        var groupSortOrder;
        var rootNodes;
        var rowsElement;
        var singleRoot = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id ='0']");
        if(isIndentedView && isIndentedView.nodeValue == 'true')
        {
            rootNodes = emxUICore.selectNodes(oXML, "/mxRoot/rows/r[@level = '0']");
            if(singleRoot)
            {
                rowsElement = rootNodes[0];
            }else{
                rowsElement = emxUICore.selectNodes(oXML, "/mxRoot/rows")[0];
            }
        }
        else
        {
            rowsElement = emxUICore.selectNodes(oXML, "/mxRoot/rows")[0];
        }
        var initialRGOrderList = [];
        var newRows = 0;
        var prevOrder = 0;
        removeGroupElements(rowsElement, groupData, 0);
        clearGroupCache();
        if (columnList.length == 0) {
            return;
        }
        _setSetting(oXML, "/mxRoot", 'groupLevel', columnList.length / 3);

        if(isIndentedView && isIndentedView.nodeValue == 'true')
        {
            //for single root structure, perform row grouping against child (level 1) nodes.
            //rootNodes = emxUICore.selectNodes(oXML, "/mxRoot/rows/r[@level = '0']");
            //rowsElement = rootNodes[0];
            if(singleRoot)
            {
                rootNodes = emxUICore.selectNodes(rowsElement, "r");
            } else {
                rootNodes = emxUICore.selectNodes(oXML, "/mxRoot/rows/r");
            }
        }else
        {
            //rootNodes = emxUICore.selectNodes(oXML, "/mxRoot/rows/r[@filter != 'true']");
            rootNodes = emxUICore.selectNodes(oXML, "/mxRoot/rows/r");
        }

        //determine predefined group range values per column.
        var predefinedColumnChoices = {};
        var allColumnJPOValues = {};
        for (var j=0; j < columnList.length; j+=3)
        {
            var choices = [];
            var columnObject = colMap.getColumnByIndex(columnList[j]);
            var columnChoices = columnObject.getSetting("Row Grouping Choices");  //undocumented setting.
            if (columnChoices != null)
            {
                choices = columnChoices.split(",");
            } else {
                var bRowGrouping = columnObject.settings["Row Grouping Range Program"] ? true : false;
                if (bRowGrouping)
                {
                    var jpoValuesList = columnObject.groupedRangeValues;
                    if (jpoValuesList != null)
                    {
                        for(var key in jpoValuesList)
                        {
                            choices.push(key);
                        }
                    }
                }
            }

            if (choices.length > 0)
            {
                columnList[j + 1] = "no-sort";
                columnList[j + 2] = "na";
            }
            predefinedColumnChoices[j/3] = choices;
            allColumnJPOValues[j/3] = jpoValuesList;
        }

        //add pre-defined groups for level 0; additional levels are recursive as necessary.
        var choices = predefinedColumnChoices[0];
        var jpoValues = allColumnJPOValues[0];
        if (choices.length > 0) {
            for (var i=0; i < choices.length; i++) {
                var choice = trim(choices[i]);
                var groupId = "L0" + jpoValues[choice];
                var cellNode = oXML.createElement("c");
                var textNode = oXML.createTextNode(choice);
                cellNode.appendChild(textNode);
                cellNode.setAttribute("a",jpoValues[choice]);
                addNewGroup(mapGroupId, groupId, groupData, cellNode, 0, false, predefinedColumnChoices);
            }
        }

        for (var i=0; i < rootNodes.length; i++) {

            var calcAttributeVal = rootNodes[i].getAttribute("calc");
        	if(calcAttributeVal){
        		if(rootNodes[i].parentNode){
        			rootNodes[i].parentNode.removeChild(rootNodes[i]);
        		}else{
        			var nxtRow = rootNodes[i].nextSibling;
        			var preRow = rootNodes[i].previousSibling;
        			preRow.nextSibling = nxtRow;
        		}
        		continue;
        	}

            var groupIdPrefix = ""
            var groupObject = groupData
            var filter = rootNodes[i].getAttribute("filter");
            var cellNodes = emxUICore.selectNodes(rootNodes[i], "c");
            for (var j=0; j < columnList.length; j+=3) {
                var cellNode = cellNodes[columnList[j]];
                var groupName = trim(emxUICore.getText(cellNode));

                if(isStructureCompare){
                    var columnIndex = columnList[j];
                    var columnName = colMap.columns[columnIndex].name;
                    var columnNodes = emxUICore.selectNodes(oXML, "/mxRoot/columns/column[@name='"+columnName+"']");
                    if(columnNodes.length>1){
                        var noOfColsInEachTable = ((colMap.columns.length)/2);
                        var rightSideCellNode = cellNodes[columnIndex];
                        var leftSideCellNode = cellNodes[columnIndex-noOfColsInEachTable] ? cellNodes[columnIndex-noOfColsInEachTable]: cellNodes[columnIndex+noOfColsInEachTable];
                        cellNode = oXML.createElement("c");
                        groupName = getNewGrpName(cellNode,leftSideCellNode,rightSideCellNode);
                    }
                }
                // End
                while(groupName.indexOf("'")!=-1){
                    groupName=groupName.replace("'","&quot;");
                }
                var groupId = groupIdPrefix + "L" + j + groupName
                if (mapGroupId[groupId] == null) {
                    //new grouping encountered; create element placeholder.
                    var parentObject;
                    if (j==0) {
                        parentObject = groupObject
                    } else {
                        parentObject = groupObject.groupSubGroups
                    }
                    groupObject = addNewGroup(mapGroupId, groupId, parentObject, cellNode, j/3, filter, predefinedColumnChoices);
                }
                else {
                    groupObject = mapGroupId[groupId]
                }
                if (filter != "true") {
                    //incr count.
                    groupObject.groupCount += 1;
                    groupObject.groupElement.setAttribute("filter", "false");
                }
                groupIdPrefix = groupId
            }
            var row = rowsElement.removeChild(rootNodes[i]);
            groupObject.groupElement.appendChild(row);
            //initialRGOrderList.push(row);
            row.setAttribute("initialRGOrderList", i+1);
        }

        insertGroupElements(rowsElement, groupData, 0, columnList);
        var hasRowGroupingCal=false;
        for(var id=0; id<colMap.columns.length; id++) {
        	var theColumn = colMap.columns[id];
     		var rgCalculation = theColumn.getSetting("RowGroupCalculation");
     		var calculations = getRequestSetting('calculations');
    		if(rgCalculation && calculations=='true'){
    			hasRowGroupingCal=true;
    			break;
    		}
        }
        if(hasRowGroupingCal){
       		callToBuildColumValues("firstTime",true);
       		parseArithmethicExpr();
    	}

    }
    catch(e){
        alert(e.message);
    }
    var endTime = (new Date()).valueOf()
    //alert("total time: " + (endTime-startTime) + " ms.");
    return;
}

if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function indexOf(item, i) {
        i || (i = 0);
        var length = this.length;
        if (i < 0) i = length + i;
        for (; i < length; i++)
            if (this[i] === item)
                return i;
        return -1;
    }
}

// In Case of SB compare table, there are two instances of same column (left & Right).
// Now if a column is selected for "Row Grouping", both the columns should be considered for forming group header.
// If the left side column valus is blank, consider the right one else vice versa.
// If both column having some value, then merge them together with "-" between them.
function getNewGrpName(newCell,leftSideCellNode,rightSideCellNode){

    var leftSideGrpName = getCellValue(leftSideCellNode);
    var leftSideGrpLabel = emxUICore.getText(leftSideCellNode);

    var rightSideGrpName = getCellValue(rightSideCellNode);
    var rightSideGrpLabel = emxUICore.getText(rightSideCellNode);

    var groupName = undefined;
    var groupLabel = undefined;

    if(leftSideGrpName!="" && rightSideGrpName==""){
        groupName = leftSideGrpName;
        groupLabel = leftSideGrpLabel;
    }else if(leftSideGrpName=="" && rightSideGrpName!=""){
        groupName = rightSideGrpName;
        groupLabel = rightSideGrpLabel;
    }else if(leftSideGrpName!="" && rightSideGrpName!=""){
        if(leftSideGrpName == rightSideGrpName){
            groupName = leftSideGrpName;
            groupLabel = leftSideGrpLabel;
        }else{
            groupName = leftSideGrpName+rightSideGrpName;
            groupLabel = leftSideGrpLabel+"-"+rightSideGrpLabel;

        }
    }else if(leftSideGrpName=="" && rightSideGrpName==""){
        groupName = "";
        groupLabel = "";
    }

    newCell.setAttribute("a", groupName);
    emxUICore.setText(newCell,groupLabel);
    return groupName;
}
// End

function getCellValue(cellNode)
{
    var cellValue = null;
    var firstChild = cellNode.firstChild;
    if (firstChild != null)
    {
        cellValue = firstChild.nodeValue;
    }
    if (cellValue == null || cellValue.length == 0)
    {
        cellValue = cellNode.getAttribute("a");
    }
    return cellValue;
}

function processRowGroupingToolbarCommand(action) {
    var rowGroupingDiv = document.getElementById("mx_divFilters");
    var rowGouping1 = document.getElementById("rowGouping1");
    var rowGouping2 = document.getElementById("rowGouping2");
    var rowGouping3 = document.getElementById("rowGouping3");
    if (action == "open/close") {
        if (rowGroupingDiv){
            if (rowGroupingDiv.style.display == "block") {
                rowGroupingDiv.style.display = "none";
            } else {
                rowGouping1.options[indexRowGouping1].selected=true;
                rowGouping2.options[indexRowGouping2].selected=true;
                rowGouping3.options[indexRowGouping3].selected=true;
                rowGroupingDiv.style.display = "block"
            }
            setInitialHeight();
        }
    } else if (action == "apply") {
        indexRowGouping1 = rowGouping1.selectedIndex;
        indexRowGouping2 = rowGouping2.selectedIndex;
        indexRowGouping3 = rowGouping3.selectedIndex;
        if (indexRowGouping3 == indexRowGouping2 || indexRowGouping3 == indexRowGouping1) {
            indexRowGouping3 = 0;
        }
        if (indexRowGouping2 == indexRowGouping1) {
            indexRowGouping2 = 0;
        }
        if (indexRowGouping2 == 0) {
            indexRowGouping2 = indexRowGouping3;
            indexRowGouping3 = 0;
        }
        if (indexRowGouping1 == 0) {
            indexRowGouping1 = indexRowGouping2;
            indexRowGouping2 = indexRowGouping3;
            indexRowGouping3 = 0;
        }
        processRowGroupingToolbarCommand("processPostApply");
    } else if (action == "processPostApply" || action == null || action == "postExpand") {
        rowGouping1.options[indexRowGouping1].selected=true;
        rowGouping2.options[indexRowGouping2].selected=true;
        rowGouping3.options[indexRowGouping3].selected=true;

        var columnList = [];
        var columnNames = [rowGouping1.value, rowGouping2.value, rowGouping3.value]
    var rowgroupingnames = [rowGouping1.name, rowGouping2.name, rowGouping3.name]
        for(var i=0; i < columnNames.length; i++) {
            var columnName = columnNames[i];
            if (columnName != "") {
                var objColumn = colMap.getColumnByName(columnName);
                var columnIndex = objColumn.index -1;
                columnList.push(columnIndex);
                var sortIndex = lSortColumnName.indexOf(columnName);
                sortIndex != -1 ? columnList.push(lSortColumnDirection[sortIndex]) : columnList.push("ascending");
                var sortingType = colMap.columns[columnIndex].getSetting("Sort Type");
                sortingType != null ? columnList.push(sortingType) : columnList.push("alphanumeric");
            var keyvalue = columnNames[i];
            var configuredTableName = getRequestSetting('selectedTable');
            if(configuredTableName == null || configuredTableName == 'undefined' || configuredTableName == "")
            	configuredTableName = getTableNameFromXML();
            getTopWindow().setPersistenceData(rowgroupingnames[i] , keyvalue , configuredTableName );
            }
        }
        processRowGrouping(columnList);
        if (action == "processPostApply" || (columnList.length > 0 && action == "postExpand")) {
            rebuildView();
        }
        var singleRootNode = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id ='0']");
        if(singleRootNode && singleRootNode.getAttribute("display") == "none"){
            toggle(singleRootNode.id);
        }
    } else if (action == "reset") {
        indexRowGouping1 = 0;
        indexRowGouping2 = 0;
        indexRowGouping3 = 0;
        rowGouping1.options[0].selected=true;
        rowGouping2.options[0].selected=true;
        rowGouping3.options[0].selected=true;
    var tablename = getTableNameFromXML();
    var rowgroupingnames = [rowGouping1.name, rowGouping2.name, rowGouping3.name]
    var configuredTableName = getRequestSetting('selectedTable');
    if(configuredTableName == null || configuredTableName == 'undefined' || configuredTableName == "")
    	configuredTableName = getTableNameFromXML();
    if(rowgroupingnames != null && tablename != null)
    {
        for(var i=0; i < rowgroupingnames.length; i++)
        {
        	getTopWindow().removePersistenceData(rowgroupingnames[i] , configuredTableName );
        }
    }
        processRowGrouping("");
        _setSetting(oXML, "/mxRoot", 'groupLevel', 0);
        rebuildView();
    } else if (action == "cloneComboValues" || action == "resetComboMap") {
        for(var i=0; i < rowGouping1.options.length; i++) {
            var label = rowGouping1.options[i].text;
            var value = rowGouping1.options[i].value;
            if (action == "cloneComboValues") {
            var newOption2 = document.createElement('option');
            newOption2.text = label;
            newOption2.value = value;
            var newOption3 = document.createElement('option');
            newOption3.text = label;
            newOption3.value = value;
            try{
               rowGouping2.add(newOption2,null);
               rowGouping3.add(newOption3,null);
            }
            catch(ex){
               rowGouping2.add(newOption2);
               rowGouping3.add(newOption3);
            }
            }
            comboMap[value] = i;
        }
    } else if (action == "processPostExpand") {
        processRowGroupingToolbarCommand("resetComboMap");
        processRowGroupingToolbarCommand("postExpand");
    } else if (action == "processInitialGrouping") {
        var rowGrouping = getRequestSetting('rowGrouping');
        var rowGroupingColumnNames = getRequestSetting('rowGroupingColumnNames');

    // Check for the persistence, if it is there then load it from the local
	// storage for row grouping values
    if(rowGroupingColumnNames == null || rowGroupingColumnNames == 'undefined' || rowGroupingColumnNames == "" )
    {

    	var configuredTableName = getRequestSetting('selectedTable');
    	if(configuredTableName == null || configuredTableName == 'undefined' || configuredTableName == "")
        	configuredTableName = getTableNameFromXML();
        var rowgroupingnames = [rowGouping1.name, rowGouping2.name, rowGouping3.name]
    	rowGroupingColumnNames ="";
        for(var i=0; i < rowgroupingnames.length; i++) {
        	rowGroupingColumnNames += getTopWindow().getPersistenceData(rowgroupingnames[i] , configuredTableName );
        	rowGroupingColumnNames+=",";
         }
    }


        if (rowGroupingColumnNames != null && rowGroupingColumnNames != "") {
            var columnList = [];
            var columnNames = rowGroupingColumnNames.split(",");
            for(var i=0; i < columnNames.length; i++) {
                var columnName = trim(columnNames[i]);
                if (columnName != "" && comboMap[columnName] != null) {
                    var objColumn = colMap.getColumnByName(columnName);
                    var columnIndex = objColumn.index -1;
                    columnList.push(columnIndex);
                    var sortIndex = lSortColumnName.indexOf(columnName);
                    sortIndex != -1 ? columnList.push(lSortColumnDirection[sortIndex]) : columnList.push("ascending");
                    var sortingType = colMap.columns[columnIndex].getSetting("Sort Type");
                    sortingType != null ? columnList.push(sortingType) : columnList.push("alphanumeric");
                    if (columnList.length == 3)
                        indexRowGouping1 = comboMap[columnName];
                    else if (columnList.length == 6)
                        indexRowGouping2 = comboMap[columnName];
                    else if (columnList.length == 9)
                        indexRowGouping3 = comboMap[columnName];
                    //clear out this index so it cant be used again in case URL includes duplicates.
                    comboMap[columnName] = null;
                }
            }
            if (columnList != "") {
                if (rowGrouping == null || rowGrouping.toLowerCase() != "false") {
                    processRowGroupingToolbarCommand("open/close");
                }
                processRowGrouping(columnList);
            }
        }
    }
}
function clearGroupCache() {
    groupData = [];
    mapGroupId = {};
}
function toggleRowGrouping(id) {
    var selectedGroup = mapGroupId[id];
    var display = selectedGroup.groupElement.getAttribute("display");
    display = (!display || display == "none") ? "block" : "none";
    selectedGroup.groupElement.setAttribute("display", display);
    rebuildView();
}
function doRowGroupCheckboxClick(id, checked /*,groupObject  */) {
    var groupObject = arguments[2] || mapGroupId[id];
    var subGroups = groupObject.groupSubGroups;
    var checkedStr = checked == true ? "checked" : "";
    groupObject.groupElement.setAttribute("checked", checkedStr);
    if (subGroups.length == 0) {
        var rows = groupObject.groupElement.childNodes;
        var len = rows.length
        for (var i=0; i < len; i++) {
            var id = rows[i].getAttribute("id");
            if (id == null) continue;
            var disableSelection =  rows[i].getAttribute("disableSelection");
            if (disableSelection == "true") continue;
            var filter = rows[i].getAttribute("filter");
            if (filter == "true") continue;
            rows[i].setAttribute("checked", checkedStr);
            rowSelections.push(id);
            var checkbox = document.getElementById("rmbrow-" + id);
            if (checkbox == null) continue;
            checkbox.checked = checked;
       }
    } else {
        for (var i=0; i < subGroups.length; i++) {
            var subGroup = subGroups[i];
            var rowId = subGroup.groupElement.getAttribute("id");
            var checkbox = document.getElementById("rmbrowgp-" + rowId);
            if (checkbox != null) {
                checkbox.checked = checked;
            }
            doRowGroupCheckboxClick(id, checked, subGroup);
        }
    }
    if (arguments[2] == null) {
        refreshRowSelections(checked, null, rowSelections);
        rowSelections = [];
    }
}

// to Sync Tree and Table Row Height after Edit
function syncRowHeightsAfterEdit(rowId){
    var nRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + rowId + "']");
    var curTreeRow = editableTable.tblTreeBody.rows.namedItem(rowId);
    var curTableRow = editableTable.tblListBody.rows.namedItem(rowId);
    curTreeRow.setAttribute("height",curTableRow.offsetHeight);
    if(nRow){
        nRow.setAttribute("height", curTableRow.offsetHeight);
    }
    if(hasMergedCells){
        var nextTreeRow = curTreeRow.nextSibling;
        var nextTableRow = curTableRow.nextSibling;
        if(isIE && isMinIE9){
            nextTreeRow = curTreeRow.nextElementSibling;
            nextTableRow = curTableRow.nextElementSibling;
        }
        if(nextTreeRow && nextTableRow && nextTreeRow.id == curTreeRow.id && nextTableRow.id == curTableRow.id){
            nextTreeRow.setAttribute("height",nextTableRow.offsetHeight);
            if(nRow){
                nRow.setAttribute("height_row2", nextTableRow.offsetHeight);
            }

        }
    }
}

function doThumbNailRowGroupCheckboxClick(id, checked) {
    var divId = "tn-"+id;
    var div = document.getElementById(divId);
    var divClass = div.getAttribute("class");
    var selectedClass;
    if(divClass == "rg1 heading"){
        selectedClass = 'rg1 heading';
    }else if(divClass == "rg2 heading"){
        selectedClass = 'rg1 heading rg2 heading';
    }else{
        selectedClass = 'rg1 heading rg2 heading rg3 heading"';
    }
    if(divClass == "rg1 heading" || divClass == "rg2 heading" || divClass == "rg3 heading"){
        var chkBox = div.getElementsByTagName("input");
        if(checked){
            chkBox[0].setAttribute("checked","checked");
            FreezePaneregisterByRowId(id);
        }else{
            chkBox[0].removeAttribute("checked");
            FreezePaneunregisterByRowId(id);
        }
        var nxtDiv = div.nextSibling;

        while(nxtDiv && (selectedClass.indexOf(nxtDiv.getAttribute("class")) < 0 || nxtDiv.getAttribute("class").length == 3)){
            var nxtDivClass = nxtDiv.getAttribute("class");
            var nxtId = nxtDiv.getAttribute("oid");
            if(nxtDivClass == "rg1 heading" || nxtDivClass == "rg2 heading" || nxtDivClass == "rg3 heading"){
                var nxtChkBox = nxtDiv.getElementsByTagName("input");
                if(checked){
                    nxtChkBox[0].setAttribute("checked","checked");
                    FreezePaneregisterByRowId(nxtId);
                }else{
                    nxtChkBox[0].removeAttribute("checked");
                    FreezePaneunregisterByRowId(nxtId);
                }
            }else if(nxtDivClass == "rg1" || nxtDivClass == "rg2" || nxtDivClass == "rg3" ) {
                 nxtDiv1 = nxtDiv.childNodes[0];
                 var nxtId1 = nxtDiv1.getAttribute("oid");
                 while(nxtDiv1 && nxtId1 ){
                     if(checked ){
                         nxtDiv1.setAttribute("class","thumbnail-tile selected");
                         FreezePaneregisterByRowId(nxtId1);
            }else if(!checked){
                         nxtDiv1.setAttribute("class","thumbnail-tile");
                         FreezePaneunregisterByRowId(nxtId1);
                     }
                     nxtDiv1 = nxtDiv1.nextSibling;
                     if(nxtDiv1){
                         nxtId1 = nxtDiv1.getAttribute("oid");
                    }
                 }
            }
            nxtDiv = nxtDiv.nextSibling;
        }
    }
    rebuildView();
}

function refreshRowSelections(checked, tbl, idList){
    if (!tbl) {
        if (editableTable.tblTreeBody) {
            refreshRowSelections(checked, editableTable.tblTreeBody, idList);
        }
        if (editableTable.tblListBody) {
            refreshRowSelections(checked, editableTable.tblListBody, idList);
        }
        RefreshObjectCounts();
    } else {
        var selectedrow = "mx_rowSelected";
        var len = tbl.rows.length;
        for (var i = 1; i < tbl.rows.length; i++) {
            var tr = tbl.rows[i];
            var id = tr.getAttribute('id');
            if(idList.indexOf(id) != -1) {
                if(checked) {
                    addClass(tr,selectedrow);
                }else{
                    removeClass(tr,selectedrow);
                }
            }
        }
    }
}

//Start - Inline Edit API's

emxEditableTable.createNewChildRow = function _createNewChildRow() {
    _newInlineChild("new","current");
}

emxEditableTable.createNewChildRowAbove = function _createNewChildRowAbove() {
    _newInlineChild("new","above");
}

emxEditableTable.createNewChildRowBelow = function _createNewChildRowBelow() {
    _newInlineChild("new","below");
}

emxEditableTable.addExistingChildRow = function _addExistingChildRow() {
    _newInlineChild("lookup","current");
}

emxEditableTable.addExistingChildRowAbove = function _addExistingChildRowAbove() {
    _newInlineChild("lookup","above");
}

emxEditableTable.addExistingChildRowBelow = function _addExistingChildRowBelow() {
    _newInlineChild("lookup","below");
}


emxEditableTable.removeNewRows = function _removeNewRows(){
    removeNewRows();
}

//END - Inline Edit API's
/*
 * To escape the Cell Values before passing it to the eval function.
 */
function escapeValueForEval(cellValue){
    if(typeof cellValue == "string"){
        //To replace the newLine Char
        cellValue = cellValue.replace(/(\r\n|\n|\r)/gm,"");
        //To escape backSlash in the cell value
        cellValue = cellValue.replace(/\\/g,"\\\\");
        //To Escape Single Quotes
        cellValue = cellValue.replace(/'/g, "\\'");
    }
    return cellValue;
}

function toggleDrop() {
    var tablename = getTableNameFromXML();
	var storage = $.localStorage;
	var dropAction = storage.get('SB',tablename, 'dropAction');
	if (dropAction == "Move") {
		toggleDropIcon("iconActionDropActionMove","iconActionDropActionAdd",emxUIConstants.DRAG_MOVE, emxUIConstants.DRAG_COPY);
		storage.set('SB',tablename, 'dropAction', 'Copy');
	} else {
		toggleDropIcon("iconActionDropActionAdd","iconActionDropActionMove",emxUIConstants.DRAG_COPY, emxUIConstants.DRAG_MOVE);
		storage.set('SB',tablename, 'dropAction', 'Move');
	}
}


function toggleSBWrap(){
    var nRow, currRowId,updatedHeight,obj;
    var divB = document.getElementById("mx_divBody");
    if(divB.className.indexOf("mx_wrap-all")!= -1){
        toggleWrapIcon("iconActionWordWrapOff","iconActionWordWrapOn",emxUIConstants.STR_UNWRAP,emxUIConstants.STR_WRAP);
        removeClass(divB,"mx_wrap-all");

        if(emxUIConstants.STORAGE_SUPPORTED){
            var tablename = getTableNameFromXML();
            var storage = $.localStorage;
            storage.set('SB',tablename, 'cellwrap', 'false');
			cellWrapVal = false;
        }
    }else{
        toggleWrapIcon("iconActionWordWrapOn","iconActionWordWrapOff",emxUIConstants.STR_WRAP,emxUIConstants.STR_UNWRAP);
        addClass(divB,"mx_wrap-all")

        if(emxUIConstants.STORAGE_SUPPORTED){
            var tablename = getTableNameFromXML();
            var storage = $.localStorage;
            storage.set('SB',tablename, 'cellwrap', 'true');
			cellWrapVal = true;
        }
    }
    adjustTableHeight();
	if(isIE){
		for(var i =0; i < aDisplayRows.length; i++) {
			aDisplayRows[i].removeAttribute('height');
			aDisplayRows[i].removeAttribute('height_row2');
		}
		rebuildView();
	}
    syncSB(true);

}


// Method to get the toolbar item
function findToolbarItem(toolbar, url){
    var obj;
    for(var j = 0; j < toolbar.items.length ; j++){
        var iurl = toolbar.items[j].url;
        if(iurl && iurl.indexOf(url) >= 0){
            obj = toolbar.items[j];
            break;
        }
    }
    return obj;
}
//Method to get the toolbar item from the overflow menu
function findOverflowItem(toolbar, url){
    var obj;
    var overFlowMenu = toolbar.items[toolbar.items.length-1];
    if(overFlowMenu && overFlowMenu.menu){
        for(var j = 0; j < overFlowMenu.menu.items.length ; j++){
            var iurl = overFlowMenu.menu.items[j].url;
            if(iurl && iurl.indexOf(url) >= 0){
                obj = overFlowMenu.menu.items[j];
                break;
            }
        }
    }
    return obj;
}

// Method to toggle copy paste
function toggleDropIcon(oldImageName,newImageName,oldLabel, newLabel){
	var obj = findToolbarItem(objContextToolbar,"toggleDrop()");
	if(obj && obj.element){
		obj.element.innerHTML = obj.element.innerHTML.replace(oldImageName,newImageName);
		if(obj.element.title) {
	       obj.element.title = newLabel;
	    }
	}
	var objToggle = findOverflowItem(objContextToolbar,"toggleDrop()");
	if(objToggle && objToggle.rowElement){
	    var objTR = objToggle.rowElement;
	    var objIcon = $(objTR).find("span")[0];
	    var objText = $(objTR).find("label")[0];

	    // Replace the image & label
	    objIcon.innerHTML = objIcon.innerHTML.replace(oldImageName,newImageName);
	    objText.innerHTML = newLabel;
	}
}

//Method to toggle the wrap-Unwrap icon
function toggleWrapIcon(oldImageName,newImageName,oldLabel, newLabel){
    var obj = findToolbarItem(objContextToolbar,"toggleSBWrap()");
    if(obj && obj.element){
        obj.element.innerHTML = obj.element.innerHTML.replace(oldImageName,newImageName);
        if(obj.element.title) {
           obj.element.title = newLabel;
        }
    }
    var objToggle = findOverflowItem(objContextToolbar,"toggleSBWrap()");
    if(objToggle && objToggle.rowElement){
        var objTR = objToggle.rowElement;
        var objIcon = $(objTR).find("span")[0];
        var objText = $(objTR).find("label")[0];

        // Replace the image & label
        objIcon.innerHTML = objIcon.innerHTML.replace(oldImageName,newImageName);
        objText.innerHTML = newLabel;
    }
}

emxEditableTable.getCheckedRows = function __getCheckedRows(){
    var checkedRows = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked']");
    return checkedRows;
}

function getTableNameFromXML(){
    var tableName = getRequestSetting('table');
    if(tableName == null){
        tableName = getRequestSetting('selectedTable');
    }
    return tableName;
}
function encodeAngularBracketsText(valueTemp,codecVal){
	var lastobj = emxUICore.selectSingleNode(currentRow, "c[" + currentColumnPosition + "]");
    var isiFHTrue = lastobj.getAttribute("iFH")==null?false:true;
    var isRTEEnabled = lastobj.getAttribute("rte")==null?false:true;
    var aHREFSHolder=[];
    var valHolder=valueTemp.toLowerCase();
	if(valHolder.indexOf("<a href")>-1 || isiFHTrue){
		if(!isRTEEnabled){
			aHREFSHolder=valueTemp.match(/(<A href="[a-zA-z:]*\(\'http:\/\/[a-zA-z0-9.,' )"]*>[a-zA-Z0-9.]*<\/A>)/g);
			valHolder= replaceAnchorTagsWithPlaceholders(valueTemp,aHREFSHolder);
			if(codecVal) {
				valHolder= valHolder.replace(/</g,"&lt;").replace(/>/g,"&gt;");
			}else {
				valHolder= valHolder.replace(/&lt;/,"<").replace(/&gt;/,">");
			}

			valHolder= replacePlaceholdersWithAnchorTags(valHolder,aHREFSHolder)
			return valHolder;
		}
		else
			return valueTemp;
	}
	else{
		if(codecVal && !isRTEEnabled) {
			value= valueTemp.replace(/</g,"&lt;").replace(/>/g,"&gt;");
		}else {
			value= valueTemp
		}
		return value;
	}
}
function replaceAnchorTagsWithPlaceholders(valueTemp,anchorHolder){
    if(anchorHolder!=null){
        for(var i=0;i<anchorHolder.length;i++){
            valueTemp=valueTemp.replace(anchorHolder[i],"#A#N#C#H#O#R");
        }
    }
    return valueTemp;
}
function replacePlaceholdersWithAnchorTags(valueTemp,anchorHolder){
    if(anchorHolder!=null){
        for(var i=0;i<anchorHolder.length;i++){
            valueTemp=valueTemp.replace("#A#N#C#H#O#R",anchorHolder[i]);
        }
    }
    return valueTemp;
}

function getMarkupParentRowId(nMarkupParentRow){
    var nMarkupParentRowId = nMarkupParentRow.getAttribute("id");
    var groupRowName = nMarkupParentRow.getAttribute("groupedColumnName");
    if(groupRowName){
        return getMarkupParentRowId(nMarkupParentRow.parentNode)
    } else{
        return nMarkupParentRowId;
    }
}


// called to scroll the table to make the row in viewport. Doesn't scroll if row is already visible.
// returns true if it is scrolled otherwise it returns false.
emxEditableTable.scrollRowToView = function (rowId){
	var div = document.getElementById("mx_divTableBody");
	var aTR = $("#bodyTable tr#" + rowId.replace(new RegExp("," , "g"), "\\,"));
	var isTrInViewport = false;
	if (aTR && aTR.length > 0) {
		var tr = aTR[0];
		var trRect = tr.getBoundingClientRect();
		var divRect = div.getBoundingClientRect();
		var isTrInViewport = (
			trRect.top >= divRect.top &&
			trRect.bottom <= divRect.bottom
		);
	}
	if (isTrInViewport) {
		return false;
	}

	var scrollTop = 0;
	for(var i = 0; i < aDisplayRows.length; i++) {
		var id = aDisplayRows[i].getAttribute("id");
		if (id == rowId) {
			break;
		} else {
			var height = aDisplayRows[i].getAttribute("height");
			if (!height) {
				height = 34;
			}
			scrollTop = Number(scrollTop) + Number(height);
		}
	}
    document.getElementById("mx_divTableBody").scrollTop = scrollTop;
    return true;
}
//Step through changes
function moveNextOrPreviousChanges(action){
	var shouldUnChecked = false;
	
	//Get all modified rows from oXML
	var modifiedRows 	= emxUICore.selectNodes(oXML, "/mxRoot/rows//r[ (not(@filter) or @filter != 'true') and (@level = '0' or count(ancestor::r[not(@display) or @display = 'none']) = '0') and @disableSelection='false']");
	var modRowLen 		= modifiedRows.length;
	
	//Get checked rows
	var checkedRows 	= emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@checked='checked' and not(@considered='true')]");
	var checkedRowsLen 	= checkedRows.length;
	
	//Get a row which already navigated by move next, previous, first or last command
	var navigatedRow = emxUICore.selectNodes(oXML, "/mxRoot/rows//r[@navigated='true']");
	var count 		 = navigatedRow.length;
	
	var highLightedRowId 		= null;
	var lastSelectedObjRowId 	= null;
	var isConsidered			= false;
	
	if(checkedRowsLen >0){
		var position = 0;
		if(action =='next'){
			position = checkedRowsLen -1;
			lastSelectedObjRowId = checkedRows[position].getAttribute("id");
		}else if(action == 'previous'){
			lastSelectedObjRowId = checkedRows[position].getAttribute("id");
		}
		
		isConsidered = checkedRows[position].getAttribute("considered");
		
		for(var i=0;i<checkedRowsLen;i++){
			checkedRows[i].setAttribute("considered","true");
		}
		
		checkedRows[position].removeAttribute("navigated");
		checkedRows[position].removeAttribute("moveNext");
		checkedRows[position].removeAttribute("movePrevious");
		
		if('true' != isConsidered){
			checkedRows[position].setAttribute("considered","true");
		}
		
	}
	
	//Get already highlighted row
	if(count>0){
		highLightedRowId = navigatedRow[0].getAttribute("id");	
		navigatedRow[0].removeAttribute("navigated");
		navigatedRow[0].removeAttribute("moveNext");
		navigatedRow[0].removeAttribute("movePrevious");
	}
	
	if((lastSelectedObjRowId == null && highLightedRowId != null) || 'true' == isConsidered){
		lastSelectedObjRowId = highLightedRowId;
	}else if(lastSelectedObjRowId != null && highLightedRowId != null && lastSelectedObjRowId != highLightedRowId){
		var ids = [];
		ids.push(highLightedRowId);
		emxEditableTable.unhighlight(ids);
	}

	//Start moving from where previouslly stopped
	var startCount= 0;
	if(lastSelectedObjRowId != null){
		
		if(action =='next'){
			for(var i = 0; i < modRowLen; i++){
				var id = modifiedRows[i].getAttribute("id");

				if(lastSelectedObjRowId === id){
					startCount = i+1;
					break;
				}
			}
		}else if(action == 'previous'){
			for(var i = modRowLen-1; i > 0; i--){
				var id = modifiedRows[i].getAttribute("id");

				if(lastSelectedObjRowId === id){
					startCount = i-1;
					break;
				}
			}
		}
	}

	//Move Next
	if(action =='next'){
		for(var i = startCount; i < modRowLen; i++){
			var id 				= modifiedRows[i].getAttribute("id");
			var matchResult 	= modifiedRows[i].getAttribute("matchresult");
			var moveNext 		= modifiedRows[i].getAttribute("moveNext");

			modifiedRows[i].removeAttribute("navigated");

			if("parent" != matchResult && 'done'!= moveNext){

				modifiedRows[i].setAttribute("moveNext","done");
				modifiedRows[i].setAttribute("navigated","true");

				var ids = [];
				ids.push(id);
				emxEditableTable.highlight(ids);

				//Keep last difference selected
				if(modRowLen != i+1){
					shouldUnChecked = true;
				}else if(id != lastSelectedObjRowId){
					shouldUnChecked = true;
				}

				break;

			}
		}

	}else if(action == 'previous'){

		if(startCount == 0 && count == 0){
			startCount = modRowLen-1;
		}

		for(var i = startCount; i >= 0; i--){
			var id 			= modifiedRows[i].getAttribute("id");
			var matchResult = modifiedRows[i].getAttribute("matchresult");
			var movePrevious = modifiedRows[i].getAttribute("movePrevious");
			
			modifiedRows[i].removeAttribute("navigated");

			if("parent" != matchResult && 'done'!= movePrevious){

				modifiedRows[i].setAttribute("movePrevious","done");
				modifiedRows[i].setAttribute("navigated","true");

				var ids = [];
				ids.push(id);
				emxEditableTable.highlight(ids);

				if(i != 0){
					shouldUnChecked = true;
				}else if(id != lastSelectedObjRowId){
					shouldUnChecked = true;
				}

				break;
			}
		}
		
	}else if('first' == action){
		modifiedRows[0].setAttribute("navigated","true");
		var id = modifiedRows[0].getAttribute("id");
		
		if(id != lastSelectedObjRowId){
			var ids = [];
			ids.push(id);
			emxEditableTable.highlight(ids);
			shouldUnChecked = true;
		}
		
	}else if('last' == action){
		var position = modRowLen-1;
		modifiedRows[position].setAttribute("navigated","true");
		var id = modifiedRows[position].getAttribute("id");

		if(id != lastSelectedObjRowId){
			var ids = [];
			ids.push(id);
			emxEditableTable.highlight(ids);
			shouldUnChecked = true;
		}
	}

	//Un-select previous selected row
	if(lastSelectedObjRowId != null && shouldUnChecked){
		var ids = [];
		ids.push(lastSelectedObjRowId);
		emxEditableTable.unhighlight(ids);
		
	}else if(lastSelectedObjRowId != null && !shouldUnChecked){
		
		navigatedRow[0].setAttribute("navigated","true");
		navigatedRow[0].setAttribute("moveNext","done");
		navigatedRow[0].setAttribute("movePrevious","done");
	}
}

emxEditableTable.highlight = function __highlight(arrRowIds){
	var nSelection = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='selection']");
	var strSelection =  (nSelection == null || typeof nSelection == "undefined") ? "none" : emxUICore.getText(nSelection);
	var totheight = 0;
	
	//Scrolled the structure
	scrollToSelected(arrRowIds[arrRowIds.length-1]);

	if(strSelection == "single"){
		var nSelectRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + arrRowIds[0] + "']");
		if(nSelectRow != null){

			if (displayView == "detail") {
				try {
					var treeRowCSSSelector = "#treeBodyTable tr#" + arrRowIds[0].replace(/,/g , "\\,");
					var treeRows = $(treeRowCSSSelector);
					treeRows[0].classList.add("mx_rowHighlight");
					$("#bodyTable tr#" + arrRowIds[0].replace(/,/g , "\\,"))[0].classList.add("mx_rowHighlight");
				} catch(ex) {
					// row is not in visible area. Do nothing in UI
				}
			} else if (displayView == "tree") {
				var foundNode = findNode(tree.root, arrRowIds[0]);
				foundNode.body.el.firstChild.classList.remove("selected");
			}

		}
	}else if(strSelection == "multiple" || strSelection == "none"){
		var arrRowsLen = arrRowIds.length;
		
		for(var itr = 0 ; itr < arrRowsLen; itr++){

			var nSelectRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + arrRowIds[itr] + "']");
			if(nSelectRow == null || typeof nSelectRow == "undefined"){
				continue;
			}

			if (displayView == "detail") {

				try {
					var treeRowCSSSelector = "#treeBodyTable tr#" + arrRowIds[itr].replace(/,/g , "\\,");
					var treeRows = $(treeRowCSSSelector);
					treeRows[0].classList.add("mx_rowHighlight");
					$("#bodyTable tr#" + arrRowIds[itr].replace(/,/g , "\\,"))[0].classList.add("mx_rowHighlight");
				} catch(ex) {
					// row is not in visible area. Do nothing in UI
				}

			} if (displayView == "tree") {
				var foundNode = findNode(tree.root, arrRowIds[itr]);
				foundNode.body.el.firstChild.classList.remove("selected");
			}
		}

	}
	
	if (displayView == "tree") {
		if(strSelection == "multiple" || strSelection == "none") {
			for(var itr = 0 ; itr < arrRowIds.length; itr++){
				var foundNode = findNode(tree.root, arrRowIds[itr]);
				foundNode.body.el.firstChild.classList.add("selected");
			}
		} else {
			var foundNode = findNode(tree.root, arrRowIds[0]);
			foundNode.body.el.firstChild.classList.add("selected");
		}
	}
}

emxEditableTable.unhighlight = function __unhighlight(arrRowIds){
    var nSelection = emxUICore.selectSingleNode(oXML,"//requestMap/setting[@name='selection']");
    var strSelection =  (nSelection == null || typeof nSelection == "undefined") ? "none" : emxUICore.getText(nSelection);

    if(strSelection == "single"){
        var nSelectRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + arrRowIds[0] + "']");
        if(nSelectRow != null){
        	
        	if (displayView == "detail") {
        		try {
        			var treeRowCSSSelector = "#treeBodyTable tr#" + arrRowIds[0].replace(/,/g , "\\,");
        			var treeRows = $(treeRowCSSSelector);
        			treeRows[0].classList.remove("mx_rowHighlight");
        			$("#bodyTable tr#" + arrRowIds[0].replace(/,/g , "\\,"))[0].classList.remove("mx_rowHighlight");
        		} catch(ex) {
        			// row is not in visible area. Do nothing in UI
        		}
        	} else if (displayView == "tree") {
        		var foundNode = findNode(tree.root, arrRowIds[0]);
        		foundNode.body.el.firstChild.classList.remove("selected");
        	}

        }
    }else if(strSelection == "multiple" || strSelection == "none"){
        for(var itr = 0 ; itr < arrRowIds.length; itr++){
            var nSelectRow = emxUICore.selectSingleNode(oXML, "/mxRoot/rows//r[@id = '" + arrRowIds[itr] + "']");
            if(nSelectRow == null || typeof nSelectRow == "undefined"){
                continue;
            }
            
            if(nSelectRow != null){
            	if (displayView == "detail") {
            		try {
            			var treeRowCSSSelector = "#treeBodyTable tr#" + arrRowIds[itr].replace(/,/g , "\\,");
            			var treeRows = $(treeRowCSSSelector);
            			treeRows[0].classList.remove("mx_rowHighlight");
            			$("#bodyTable tr#" + arrRowIds[itr].replace(/,/g , "\\,"))[0].classList.remove("mx_rowHighlight");
            		} catch(ex) {
            			// row is not in visible area. Do nothing in UI
            		}

            	} if (displayView == "tree") {
            		var foundNode = findNode(tree.root, arrRowIds[itr]);
            		foundNode.body.el.firstChild.classList.remove("selected");
            	}
            }
        }
    }
}
