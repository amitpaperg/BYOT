/* BYOT - Build your own Tearsheet */

/*****************************************
TODO:
1. create form
2. Get ads
3. make event based (remove wait)
*****************************************/
var numAds = 0;
function OnLoadPage_Main()
{
	// applied only if entity pane exists
	if (!isTriggerExist())
		return;

	// TODO: remove delay of 20 seconds for ads to load
	// TODO: move to event based on button click
	setTimeout(LoadData(),20000);

	// Main
	ModifyUX();
}

OnLoadPage_Main();

function addOverlays(elms, width, height) {
	var arrOverlayPos = [];
	$.each( elms, function( key, val ) {
		console.log($(val));

		var pos = {top:$(val).offset().top - $(val).scrollTop(), left:$(val).offset().left - $(val).scrollLeft()};
		
		// skip if there is already an overlay in same position
		for	(var index = 0; index < arrOverlayPos.length; index++) {
		    if (arrOverlayPos[index].left == pos.left && arrOverlayPos[index].top == pos.top) {
		    	return true;
		    }
		}

		arrOverlayPos.push(pos);
		numAds++; // increment ads found
		var overlayNode = '<div class="byotBgColor byotOverLay" style="left: '
			+ pos.left +'px; top: '+ pos.top +'px; width: '+ width +'px; height: '+ height +'px;"> \
			 <div class="byotOverlayText"><span class="byotTextHL">Click</span> to show ad. Then, <span\
			 class="byotTextHL">Drag</span> to reposition</div>\
			</div>';
		
		// Two choices on where to place overlay
		//$(val).parent().append(overlayNode);
		$("body").append(overlayNode);
	});

}

function findAds() {
	// first we need to add position: relative to all the TDs
	// table based layouts return buggy offsetLeft/Top otherwise
	var elms = $("td");
	$.each( elms, function( key, val ) {
		$(val).css('position',$(val).css('position') || 'relative');
	});
	
	//300x250, 728x90, 160x600
	var elms300 = $("div,iframe,embed").filter(function(){
		return ($(this).outerWidth() == 300 && $(this).outerHeight() == 250);
	});
	addOverlays(elms300,300,250);

	var elms728 = $("div,iframe,embed").filter(function(){
		return ($(this).outerWidth() == 728 && $(this).outerHeight() == 90);
	});
	addOverlays(elms728,728,90);

	var elms160 = $("div,iframe,embed").filter(function(){
		return ($(this).outerWidth() == 160 && $(this).outerHeight() == 600);
	});
	addOverlays(elms160,160,600);

	// show message
	$("body").append("<div id='byotMsg' class='byotBgColor'></div>");
	$('#byotMsg').html('found '+numAds+' ads on this page.');
	$('#byotMsg').fadeIn().delay(5000).fadeOut();
	
	// show overlays
	$('.byotOverLay').delay(1000).fadeIn('fast');
}

// check if a condition is true
// useful if we want to block some sites etc.
function isTriggerExist() {
	return true;
}

function LoadData() {
	findAds();
}

// TODO: get ad tag from service
function GetAdTag(size) {
	if (size == 728) {
		GetAdTag = "<iframe frameborder='0'\
        scrolling='no'\
        marginwidth='0'\
        marginheight='0'\
        width='728'\
        height='90'\
        \
		src='http://ak-cdn.placelocal.com/js/v3/iframetag?creativeUrl=http%3A%2F%2Fcreative.placelocal.com%2Fv3.placelocal.com%2F19062476-ad62-11e4-9768-002590592b46%2Fleaderboard.js&campaignID=445831&dimension_name=leaderboard&domain_name=ak-cdn.placelocal.com&tracking_url=tracking.placelocal.com&clickTag=&random=&animationTime=0&landing_page=http%3A%2F%2Fwww.laboulangebakery.com'>\
		    <a href='http://tracking.placelocal.com/click?campaign_id=445831&dimension_name=leaderboard&random=&url=http%3A%2F%2Fwww.laboulangebakery.com' target='_blank' style='display:inline-block'>\
		        <img src='http://ak-cdn.placelocal.com/backup_image.php?campaign_id=445831&width=728&height=90' border='0' />\
		    </a>\
		    <img src='http://tracking.placelocal.com/pixel?campaign_id=445831&dimension_name=leaderboard&random=' border='0' style='display:none' />\
		\
		</iframe>";
	} else if (size == 160) {
		GetAdTag = "<iframe frameborder='0'\
        scrolling='no'\
        marginwidth='0'\
        marginheight='0'\
        width='160'\
        height='600'\
		\
        src='http://ak-cdn.placelocal.com/js/v3/iframetag?creativeUrl=http%3A%2F%2Fcreative.placelocal.com%2Fv3.placelocal.com%2F19062476-ad62-11e4-9768-002590592b46%2Fskyscraper.js&campaignID=445831&dimension_name=skyscraper&domain_name=ak-cdn.placelocal.com&tracking_url=tracking.placelocal.com&clickTag=&random=&animationTime=0&landing_page=http%3A%2F%2Fwww.laboulangebakery.com'>\
		    <a href='http://tracking.placelocal.com/click?campaign_id=445831&dimension_name=skyscraper&random=&url=http%3A%2F%2Fwww.laboulangebakery.com' target='_blank' style='display:inline-block'>\
		        <img src='http://ak-cdn.placelocal.com/backup_image.php?campaign_id=445831&width=160&height=600' border='0' />\
		    </a>\
		    <img src='http://tracking.placelocal.com/pixel?campaign_id=445831&dimension_name=skyscraper&random=' border='0' style='display:none' />\
		\
		</iframe>";
	} else {
		GetAdTag = "<iframe frameborder='0'\
        scrolling='no'\
        marginwidth='0'\
        marginheight='0'\
        width='300'\
        height='250'\
		\
        src='http://ak-cdn.placelocal.com/js/v3/iframetag?creativeUrl=http%3A%2F%2Fcreative.placelocal.com%2Fv3.placelocal.com%2F19062476-ad62-11e4-9768-002590592b46%2Fmedium_rectangle.js&campaignID=445831&dimension_name=medium_rectangle&domain_name=ak-cdn.placelocal.com&tracking_url=tracking.placelocal.com&clickTag=&random=&animationTime=0&landing_page=http%3A%2F%2Fwww.laboulangebakery.com'>\
		    <a href='http://tracking.placelocal.com/click?campaign_id=445831&dimension_name=medium_rectangle&random=&url=http%3A%2F%2Fwww.laboulangebakery.com' target='_blank' style='display:inline-block'>\
		        <img src='http://ak-cdn.placelocal.com/backup_image.php?campaign_id=445831&width=300&height=250' border='0' />\
		    </a>\
		    <img src='http://tracking.placelocal.com/pixel?campaign_id=445831&dimension_name=medium_rectangle&random=' border='0' style='display:none' />\
		    \
		</iframe>";
	}
	return GetAdTag;
}

function ModifyUX() {
	$(".byotOverLay").click(function(){
		$(this).removeClass('byotOverLay byotBgColor').addClass('byotAdPreview');

		var transparentDiv = "<div class='transparentOverlay'></div>";
		var adTag = GetAdTag($(this).width());

		$(this).html(adTag + transparentDiv);

		// allow the ad preview to be moved using mouse
		$( ".byotAdPreview" )
		.draggable(
			{ 
				opacity: 0.6, 
				cursor: "move"
			}
		);

		// support key stokes to move ad precisely
		$('body').on("keydown",function( event ) {
			// nothing to do if ad has not been inserted yet
			if ($(".byotAdPreview").length < 1) {
				return;
			}

			// set amount of pixels to move
			var shiftByPixels = 5;
			if (event.shiftKey) {
				shiftByPixels = 25;
			} else if (event.ctrlKey || event.metaKey) {
				shiftByPixels = 1;
			}

			// move ad
			  if ( event.which == 37 ) {
			  	// left key	
			   	event.preventDefault();
			   	$(".byotAdPreview").css('left',($(".byotAdPreview").offset().left-shiftByPixels)+'px');
			  } else if ( event.which == 38 ) {
			  	// up key
			   	event.preventDefault();
			   	$(".byotAdPreview").css('top',($(".byotAdPreview").offset().top-shiftByPixels)+'px');
			  } else if ( event.which == 39 ) {
			  	// right key
			   	event.preventDefault();
			   	$(".byotAdPreview").css('left',($(".byotAdPreview").offset().left+shiftByPixels)+'px');
			  } else if ( event.which == 40 ) {
			  	// down key
			   	event.preventDefault();
			   	$(".byotAdPreview").css('top',($(".byotAdPreview").offset().top+shiftByPixels)+'px');
			  }
		});

		// hide other placeholders
		$('.byotOverLay').fadeOut();
	});
}
/*
chrome.browserAction.onClicked.addListener(function() {
	OnLoadPage_Main();
});
*/

///////////////////////
// UTILITY FUNCTIONS
// TODO: remove
//////////////////////
function getQuery()
{
	return getUrlVars()["q"].replace(/\+|%20/ig, ' ');
}

function getUrlVars()
{
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function escapeRegExp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function replaceAll(find, replace, str) {
	str = str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	str = str.replace(/(and|or|the|vs)\s/gi, '');
	return str;
}

function getExtension(imageUrl) {
	return imageUrl.split('.').pop();
}