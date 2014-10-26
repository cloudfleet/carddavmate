/*
CardDavMATE - CardDav Web Client
Copyright (C) 2011-2013 Jan Mate <jan.mate@inf-it.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

$(document).on('click','#resourceCardDAVShow', function(evt){
	var transSpeedResource=200;
	var col1 = 225;
	var col2 = 476;

	if($('.integration_d').is(':visible'))
	{
		col1 += 50;
		col2 += 50;
	}

	$('.resourcesCardDAV_d, #ResourceCardDAVList, #ResourceCardDAVListOverlay').animate({width: 224}, transSpeedResource);
	$('.company_d, #SearchBoxCompany, #ABListCompany, #ABListOverlayCompany').animate({left: col1}, transSpeedResource);
	$('.collection_d, #SearchBox, #ABList, #ABListOverlay').animate({left: col1}, transSpeedResource);
	$('.contact_d, #ABMessage, #ABContact, #ABContactOverlay').animate({left: col2}, transSpeedResource);

	$('#resourceCardDAVShow').css('display', 'none');
	$('#resourceCardDAVHide').css('display', 'block');
});

$(document).on('click','#resourceCardDAVHide', function(evt){
	var transSpeedResource=200;
	var col1 = 0;
	var col2 = 251;

	if($('.integration_d').is(':visible'))
	{
		col1 += 50;
		col2 += 50;
	}

	$('.resourcesCardDAV_d, #ResourceCardDAVList, #ResourceCardDAVListOverlay').animate({width: 0}, transSpeedResource);
	$('.company_d, #SearchBoxCompany, #ABListCompany, #ABListOverlayCompany').animate({left: col1}, transSpeedResource);
	$('.collection_d, #SearchBox, #ABList, #ABListOverlay').animate({left: col1}, transSpeedResource);
	$('.contact_d, #ABMessage, #ABContact, #ABContactOverlay').animate({left: col2}, transSpeedResource);

	$('#resourceCardDAVHide').css('display', 'none');
	$('#resourceCardDAVShow').css('display', 'block');
});

$(document).on('click','#resourceCardDAVCompanyShow', function(evt){
	var transSpeedResource=200;
	var col1 = 225;
	var col2 = 450;
	var col3 = 701;

	if($('.integration_d').is(':visible'))
	{
		col1 += 50;
		col2 += 50;
		col3 += 50;
	}

	$('.resourcesCardDAV_d, #ResourceCardDAVList, #ResourceCardDAVListOverlay').animate({width: 224}, transSpeedResource);
	$('.company_d, #SearchBoxCompany, #ABListCompany, #ABListOverlayCompany').animate({left: col1}, transSpeedResource);
	$('.collection_d, #SearchBox, #ABList, #ABListOverlay').animate({left: col2}, transSpeedResource);
	$('.contact_d, #ABMessage, #ABContact, #ABContactOverlay').animate({left: col3}, transSpeedResource);

	$('#resourceCardDAVCompanyShow').css('display', 'none');
	$('#resourceCardDAVCompanyHide').css('display', 'block');
});

$(document).on('click','#resourceCardDAVCompanyHide', function(evt){
	var transSpeedResource=200;
	var col1 = 0;
	var col2 = 225;
	var col3 = 476;

	if($('.integration_d').is(':visible'))
	{
		col1 += 50;
		col2 += 50;
		col3 += 50;
	}

	$('.resourcesCardDAV_d, #ResourceCardDAVList, #ResourceCardDAVListOverlay').animate({width: 0}, transSpeedResource);
	$('.company_d, #SearchBoxCompany, #ABListCompany, #ABListOverlayCompany').animate({left: col1}, transSpeedResource);
	$('.collection_d, #SearchBox, #ABList, #ABListOverlay').animate({left: col2}, transSpeedResource);
	$('.contact_d, #ABMessage, #ABContact, #ABContactOverlay').animate({left: col3}, transSpeedResource);

	$('#resourceCardDAVCompanyHide').css('display', 'none');
	$('#resourceCardDAVCompanyShow').css('display', 'block');
});

function selectActiveAddressbook()
{
	for(var i=0; i<globalResourceCardDAVList.collections.length;i++)
		if(globalResourceCardDAVList.collections[i].uid!=undefined)
		{
			var inputResource=globalResourceCardDAVList.collections[i].uid;
			var par=inputResource.split('/');
			if(typeof globalSessionAddressbookSelected!='undefined' && globalSessionAddressbookSelected!=null && globalSessionAddressbookSelected!='')
			{
				if(typeof globalSessionAddressbookSelected=='string' && inputResource==globalSessionAddressbookSelected.substring(0,globalSessionAddressbookSelected.lastIndexOf('/')+1))
				{
					if($('#ResourceCardDAVList').find('.resourceCardDAV_selected').length == 0)
						$('#ResourceCardDAVList').find('[data-id="'+globalSessionAddressbookSelected+'"]').click();
				}
				else if(typeof globalSessionAddressbookSelected=='string' && globalSessionAddressbookSelected.charAt(globalSessionAddressbookSelected.length-1)=='/' && (par[par.length-3]+'/'+par[par.length-2]+'/')==globalSessionAddressbookSelected)
				{
					if($('#ResourceCardDAVList').find('.resourceCardDAV_selected').length == 0)
						$('#ResourceCardDAVList').find('[data-id="'+inputResource+'"]').click();
				}
				else if(typeof globalSessionAddressbookSelected=='string' && globalSessionAddressbookSelected.charAt(globalSessionAddressbookSelected.length-1)!='/')
				{
					if((par[par.length-3]+'/'+par[par.length-2]+'/') == globalSessionAddressbookSelected.substring(0,globalSessionAddressbookSelected.lastIndexOf('/')+1) && $('#ResourceCardDAVList').find('.resourceCardDAV_selected').length == 0)
					{
						if($('#ResourceCardDAVList').find('[data-id="'+inputResource+globalSessionAddressbookSelected.substring(globalSessionAddressbookSelected.lastIndexOf('/')+1,globalSessionAddressbookSelected.length)+'"]').length>0)
						$('#ResourceCardDAVList').find('[data-id="'+inputResource+globalSessionAddressbookSelected.substring(globalSessionAddressbookSelected.lastIndexOf('/')+1,globalSessionAddressbookSelected.length)+'"]').click();
					}
				}
				else if (typeof globalSessionAddressbookSelected=='object' && inputResource.match(globalSessionAddressbookSelected)!=null)
				{
					if($('#ResourceCardDAVList').find('.resourceCardDAV_selected').length == 0)
						$('#ResourceCardDAVList').find('[data-id="'+inputResource+'"]').click();
				}				
			}
		}
	if($('#ResourceCardDAVList').find('.resourceCardDAV_selected').length == 0)
		for(var i=0; i<globalResourceCardDAVList.collections.length;i++)
			if(globalResourceCardDAVList.collections[i].uid!=undefined)
			{
				var inputResource=globalResourceCardDAVList.collections[i].uid;
				var par=inputResource.split('/');
				if(typeof globalAddressbookSelected!='undefined' && globalAddressbookSelected!=null && globalAddressbookSelected!='')
				{
					globalSessionAddressbookSelected = globalAddressbookSelected;
					if(typeof globalAddressbookSelected=='string' && inputResource==globalAddressbookSelected.substring(0,globalAddressbookSelected.lastIndexOf('/')+1))
					{
						if($('#ResourceCardDAVList').find('.resourceCardDAV_selected').length == 0)
							$('#ResourceCardDAVList').find('[data-id="'+globalAddressbookSelected+'"]').click();
					}
					else if(typeof globalAddressbookSelected=='string' && globalAddressbookSelected.charAt(globalAddressbookSelected.length-1)=='/' && (par[par.length-3]+'/'+par[par.length-2]+'/')==globalAddressbookSelected)
					{
						if($('#ResourceCardDAVList').find('.resourceCardDAV_selected').length == 0)
							$('#ResourceCardDAVList').find('[data-id="'+inputResource+'"]').click();
					}
					else if(typeof globalAddressbookSelected=='string' && globalAddressbookSelected.charAt(globalAddressbookSelected.length-1)!='/')
					{
						if((par[par.length-3]+'/'+par[par.length-2]+'/') == globalAddressbookSelected.substring(0,globalAddressbookSelected.lastIndexOf('/')+1) && $('#ResourceCardDAVList').find('.resourceCardDAV_selected').length == 0)
						{
							if($('#ResourceCardDAVList').find('[data-id="'+inputResource+globalAddressbookSelected.substring(globalAddressbookSelected.lastIndexOf('/')+1,globalAddressbookSelected.length)+'"]').length>0)
							$('#ResourceCardDAVList').find('[data-id="'+inputResource+globalAddressbookSelected.substring(globalAddressbookSelected.lastIndexOf('/')+1,globalAddressbookSelected.length)+'"]').click();
						}
					}
					else if (typeof globalAddressbookSelected=='object' && inputResource.match(globalAddressbookSelected)!=null)
					{
						if($('#ResourceCardDAVList').find('.resourceCardDAV_selected').length == 0)
							$('#ResourceCardDAVList').find('[data-id="'+inputResource+'"]').click();
					}
					else if($('#ResourceCardDAVList').find('.resourceCardDAV_selected').length == 0)
					{
						globalSessionAddressbookSelected=par[par.length-3]+'/'+par[par.length-2]+'/';
						$('#ResourceCardDAVList').find('[data-id="'+inputResource+'"]').click();
					}
				}
				
			}
		if($('#ResourceCardDAVList').find('.resourceCardDAV_selected').length == 0 && $('#ResourceCardDAVList').find('.resourceCardDAV[data-id]').length > 0)
		{
			var ui_d = $('#ResourceCardDAVList').find('.resourceCardDAV[data-id]').eq(0).attr('data-id');
			var part_u = ui_d.split('/');
			globalSessionAddressbookSelected=part_u[part_u.length-3]+'/'+part_u[part_u.length-2]+'/';
			$('#ResourceCardDAVList').find('.resourceCardDAV[data-id]').eq(0).click();
		}
}

function CardDAVUpdateMainLoader(inputCollection)
{
	if(!globalCardDAVInitLoad)
		return false;
	globalAddressbookNumberCount++;
	$('#MainLoaderInner').html(localization[globalInterfaceLanguage].loadingAddressbooks.replace('%act%', (globalAddressbookNumberCount)).replace('%total%', globalAddressbookNumber));	
	
	inputCollection.isLoaded=true;
	$('#ResourceCardDAVList [data-id="'+inputCollection.uid+'"]').removeClass('r_operate');
	var unloadedCount=0;
	for(var i=0; i<globalResourceCardDAVList.collections.length;i++)
		if(globalResourceCardDAVList.collections[i].uid!=undefined && !globalResourceCardDAVList.collections[i].isLoaded)
				unloadedCount++;
	if(unloadedCount==0 && !isCardDAVLoaded)
	{
		globalCardDAVInitLoad=false;
		globalAddressbookList.renderContacs();
		selectActiveAddressbook();
		$('#AddContact').prop('disabled',false);
		loadNextApplication(true);
	}
}
function processEditorElements(processingType, inputIsReadonly)
{
	var cssShowAsTxtClass='element_show_as_text';
	var cssGrayedTxt='element_grayed';
	var cssElementNoDisplay='element_no_display';
	var cssElementHide='element_hide';

	if(processingType=='hide')
	{
		$('[id=vcard_editor]').attr('data-editor-state','show');
		var disabled=true;
		var readonly=true;
	}
	else
	{
		$('[id=vcard_editor]').attr('data-editor-state','edit');
		var disabled=false;
		var readonly=false;
	}

	// show "drag" border on photo & delete button
	$('#photo_drag').css('display', (disabled || readonly ? 'none': 'inline'));
	// if the editor state is "edit" show the "delete" button
	if(!$('[id="vcard_editor"] [data-type="photo"]').prop('src').match(RegExp('images/(company|user)\.svg$','')))
		$('#reset_img').css('display', (disabled || readonly ? 'none': 'inline'));

	// company checkbox and text
	var tmp=$('[id="vcard_editor"]').find('[data-type="isorg"]');
	tmp.prop('disabled',disabled);
	if(processingType=='hide' && !tmp.prop('checked'))
		tmp.parent().addClass(cssGrayedTxt);
	else
		tmp.parent().removeClass(cssGrayedTxt);

	$('[data-type^="date_"]').prop('disabled', disabled || readonly);

	// family name, given name, and organization name
	var typeList = new Array('family','given','middle','nickname','prefix','suffix','ph_firstname','ph_lastname','date_bday','date_anniversary','tags','title','department','org');
	for(i=0;i<typeList.length;i++)
		$('[id=vcard_editor]').find('[data-type="'+typeList[i]+'"]').prop('readonly',readonly);

	var tmp=$('[id=vcard_editor]').find('#tags_tag');
	tmp.prop('readonly',readonly);
	if(readonly)
		tmp.closest('div.tagsinput').addClass('readonly');
	else
		tmp.closest('div.tagsinput').removeClass('readonly');

	// set the visibility of the buttons
	var tmp=$('[id=vcard_editor]');
	if(processingType=='hide')
	{
		if(inputIsReadonly!=true)
			tmp.find('[data-type="edit"]').removeClass(cssElementNoDisplay);
		else
			tmp.find('[data-type="edit"]').addClass(cssElementNoDisplay);

		tmp.find('[data-type="save"]').addClass(cssElementNoDisplay);
		tmp.find('[data-type="cancel"]').addClass(cssElementNoDisplay);
		tmp.find('[data-type="delete_from_group"]').addClass(cssElementNoDisplay);
		tmp.find('[data-type="delete"]').addClass(cssElementNoDisplay);
	}
	else if(processingType=='add')
	{
		tmp.find('[data-type="edit"]').addClass(cssElementNoDisplay);
		tmp.find('[data-type="cancel"]').removeClass(cssElementNoDisplay);
		tmp.find('[data-type="delete_from_group"]').addClass(cssElementNoDisplay);
		tmp.find('[data-type="delete"]').addClass(cssElementNoDisplay);
	}
	else
	{
		tmp.find('[data-type="edit"]').addClass(cssElementNoDisplay);
		tmp.find('[data-type="save"]').removeClass(cssElementNoDisplay);
		tmp.find('[data-type="cancel"]').removeClass(cssElementNoDisplay);
		// show "Delete from Group" only if there is an active contact group
		if(globalResourceCardDAVList.getLoadedAddressbook().filterUID[globalResourceCardDAVList.getLoadedAddressbook().filterUID.length-1]!='/')
			tmp.find('[data-type="delete_from_group"]').removeClass(cssElementNoDisplay);
		tmp.find('[data-type="delete"]').removeClass(cssElementNoDisplay);
	}


	var typeList = new Array('\\%address','\\%phone','\\%email','\\%url','\\%person','\\%im','\\%profile','\\%categories','\\%note');
	for(i=0;i<typeList.length;i++)
	{
		var found_non_empty=0;

		tmp=$('[id=vcard_editor]').find('[data-type="'+typeList[i]+'"]');
		tmp.each(
			function(index,element)
			{
				var tmp=$(element).find('[data-type="value"]');

				var found=0;
				// check if there is any data present (if not, whe hide the element)
				if($(element).attr('data-type')=='%address')	// address is handled specially
					tmp.each(
						function(index,element)
						{
							if($(element).attr('data-addr-field')!='' && $(element).attr('data-addr-field')!='country' && $(element).val()!='')
							{
								found=1;
								return false;
							}
						}
					);
				else if(tmp.val()!='')	// other elements (not address)
					found=1;


				if(processingType=='hide')
				{
					if(found)
					{
						$(element).find('[data-type="\\%add"]').find('input[type="image"]').addClass(cssElementNoDisplay);
						$(element).find('[data-type="\\%del"]').find('input[type="image"]').addClass(cssElementNoDisplay);
						$(element).find('select').prop('disabled',disabled);
						$(element).find('textarea').prop('disabled',disabled);
						/*************************** BAD HACKS SECTION ***************************/
						if($.browser.msie || $.browser.mozilla)
						{
							var newSVG=$((disabled ? SVG_select_dis : SVG_select)).attr('data-type', 'select_icon').css({'pointer-events': 'none', 'z-index': '1', 'display': 'inline', 'margin-left': (disabled ? '-22px' : '-19px'), 'vertical-align': 'top', 'background-color': '#ffffff'});	// background-color = stupid IE9 bug
							$('#ABContact').find('svg[data-type="select_icon"]').replaceWith($('<div>').append($(newSVG).clone()).html());
						}
						/*************************** END OF BAD HACKS SECTION ***************************/
						tmp.prop('readonly',readonly);
						found_non_empty=1;
					}
					else
					{
						$(element).addClass(cssElementNoDisplay);
					}
				}
				else	// 'show'
				{
					$(element).removeClass(cssElementNoDisplay);
					$(element).find('[data-type="\\%add"]').find('input[type="image"]').removeClass(cssElementNoDisplay);
					$(element).find('[data-type="\\%del"]').find('input[type="image"]').removeClass(cssElementNoDisplay);
					$(element).find('select').prop('disabled',disabled);
					$(element).find('textarea').prop('disabled',disabled);
					/*************************** BAD HACKS SECTION ***************************/
					if($.browser.msie || $.browser.mozilla)
					{
						var newSVG=$((disabled ? SVG_select_dis : SVG_select)).attr('data-type', 'select_icon').css({'pointer-events': 'none', 'z-index': '1', 'display': 'inline', 'margin-left': (disabled ? '-22px' : '-19px'), 'vertical-align': 'top', 'background-color': '#ffffff'});	// background-color = stupid IE9 bug
						$('#ABContact').find('svg[data-type="select_icon"]').replaceWith($('<div>').append($(newSVG).clone()).html());
					}
					/*************************** END OF BAD HACKS SECTION ***************************/
					tmp.prop('readonly',readonly);
				}
			}
		);

		if(!found_non_empty)
		{
			if(processingType=='hide')
				tmp.prev().addClass(cssElementNoDisplay);
			else
				tmp.prev().removeClass(cssElementNoDisplay);
		}
	}
}

function imageLoaded(imgObj, real_width, real_height)
{
	var photo_div=$('[id="vcard_editor"] .photo_div');
	var div_width=photo_div.width();
	var div_height=photo_div.height();

	if(real_width-div_width<real_height-div_height)
		imgObj.css({width: div_width+'px', height: 'auto', 'margin-left': '0px', 'margin-top': Math.ceil((div_height-div_width/real_width*real_height)/2)+'px'});
	else
		imgObj.css({width: 'auto', height: div_height+'px', 'margin-left': Math.ceil((div_width-div_height/real_height*real_width)/2)+'px', 'margin-top': '0px'});

	imgObj.css('visibility', 'visible');
}

var globalLastScrollPos=0;
function CardDAVeditor_cleanup(inputLoadEmpty)
{
	CardDAVcleanupRegexEnvironment();

	// Cleanup the editor and select the default country
	$('#ABContact').html(cleanVcardTemplate);

	// hide the "-" button (we maybe change this in future)
	$('#ABContact').find('[data-type="\\%del"]').css('visibility', 'hidden');

	/*************************** BAD HACKS SECTION ***************************/
	/* IE or FF */
	if($.browser.msie || $.browser.mozilla)
	{
		// ADD empty SVG to interface (we will replace it later)
		$('<svg data-type="select_icon"></svg>').css('display', 'none').insertAfter($('#ABContact').find('select[data-type$="_type"]'));

		if($.browser.msie && parseInt($.browser.version, 10)==10) /* IE 10 (because there are no more conditional comments) */
			$('[data-type="\\%note"]').find('textarea[data-type="value"]').text('').attr('placeholder',$('[data-type="\\%note"]').find('textarea[data-type="value"]').attr('placeholder'));
	}
	/*************************** END OF BAD HACKS SECTION ***************************/

	var tmp=$('[id="vcard_editor"] [data-type="\\%address"]');
	var tmp_select=tmp.find('[data-type="country_type"]').attr('data-autoselect');
	if(tmp_select!='')
	{
		tmp.find('[data-type="country_type"]').children('[data-type="'+jqueryEscapeSelector(tmp_select)+'"]').prop('selected',true);
		tmp.find('[data-autoselect]').change();
	}

	$('#tags').tagsInput({
		'height': null,
		'width': '530px',
		'color': '#2d2d2d',
		'placeholderColor': '#e0e0e0',
		'useNativePlaceholder': true,
		'defaultText': localization[globalInterfaceLanguage].addCategory,
		'delimiter': ',',
		'allowDelimiterInValue': true,	// if true delimiter is escaped with '\' ('\' is escaped as '\\')
		'trimInput': false,
		'autocomplete_url': globalAddressbookList.getABCategories(true),
		'autocomplete': {
			'autoFocus': true,
			'minLength': 0
		},
		'onAddTag': function(value)
		{
			// copy the array
			var xList=globalAddressbookList.getABCategories(true);
			var currentTags=$(this).val().splitCustom(',');
			for(var i=xList.length-1; i>=0; i--)
			{
				for(var j=0; j<currentTags.length; j++)
					if(xList[i] == currentTags[j])
						xList.splice(i, 1);
			}
			$('#tags_tag').autocomplete('option', 'source', xList);
		},
		'onRemoveTag': function()
		{
			// copy the array
			var xList=globalAddressbookList.getABCategories(true);
			var currentTags=$(this).val().splitCustom(',');
			for(var i=xList.length-1; i>=0; i--)
			{
				for(var j=0; j<currentTags.length; j++)
					if(xList[i] == currentTags[j])
						xList.splice(i, 1);
			}
			$('#tags_tag').autocomplete('option', 'source', xList);
		}
	});
	/*************************** BAD HACKS SECTION ***************************/
	if($.browser.msie && parseInt($.browser.version, 10)==10)	/* IE 10 (because there are no more conditional comments) */
		$('#tags_tag').css({'padding-top': '1px', 'padding-left': '1px'});
	/*************************** END OF BAD HACKS SECTION ***************************/

	$('[data-type="org"]').autocomplete({'source': function(request, response){var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), 'i'); response($.grep(globalAddressbookList.getABCompanies(true), function(value){ value = value.label || value.value || value; return matcher.test(value) || matcher.test(value.multiReplace(globalSearchTransformAlphabet));}));}, 'minLength': 0, 'change': function(){$('[data-type="department"]').autocomplete({'source': function(request, response){ var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), 'i'); response($.grep(globalAddressbookList.getABCompanyDepartments($('[id="vcard_editor"] [data-type="org"]').val()), function(value){ value = value.label || value.value || value; return matcher.test(value) || matcher.test(value.multiReplace(globalSearchTransformAlphabet));}));}, 'minLength': 0})}});


	globalABListTop=$('#ABList').offset().top;
	globalABListLeft=$('#ABList').offset().left;
/*
	// rewrite it and use:
	// var start=document.elementFromPoint(globalABListLeft, globalABListTop);

	$('#ABList').scroll(function(e){
		$('#ABList').children('.ablist_header:visible').each(function(index, element){
			var headerWidth=$(element).outerWidth();
			var headerHeight=$(element).outerHeight();
			var floating_elem=$('#SystemCardDAV > .ablist_header');

			if(globalLastScrollPos<=$('#ABList').scrollTop())	// scrolling DOWN
			{
				var next_h=$(element).nextAll('.ablist_header:visible').first();	// next visible header
				if(next_h!=null && next_h.offset().top>globalABListTop)	// only if it is below to #ABList do action
				{
					var cloned=$(element).clone();
					// do not create the floating header with the same text twice
					if(floating_elem.filter(':contains("'+jqueryEscapeSelector(cloned.text())+'")').length==0)
					{
						// parameters for the fixed element
						cloned.css({'top': globalABListTop, 'left': globalABListLeft, 'width': headerWidth, 'position': 'fixed', 'z-index': 1});
						// remove the previous floating header
						floating_elem.remove();

						// set the opacity back to standard value (item is invisible scrolled above the ABlist top)
						$('#ABList > .ablist_header').each(function(index,element){
							if($(element).css('opacity')=='0'){$(element).css('opacity',0.85);}
						});

						// set the element opacity to 0 and "replace" it with floating element above it
						$(element).css('opacity',0);
						cloned.appendTo('#SystemCardDAV');
					}
					// move the previous floating header UP
					if(next_h.offset().top<globalABListTop+headerHeight)	// if next header offset is immediately below to top offset
						floating_elem.css('top',globalABListTop-(globalABListTop+headerHeight-next_h.offset().top));

					return false;
				}
			}
			else	// scrolling UP
			{
				if($(element).offset().top>=globalABListTop)
				{
					var prev_h=$(element).prevAll('.ablist_header').first();
					if(prev_h!=null)	// if there is a previous header in #ABList do action
					{
						var cloned=$(prev_h).clone();
						// do not create the floating header with the same text twice
						if(floating_elem.filter(':contains("'+jqueryEscapeSelector(cloned.text())+'")').length==0)
						{
							// parameters for the fixed element
//							cloned.css('top',globalABListTop-headerHeight);
							cloned.css({'top': Math.min(globalABListTop,$(element).offset().top-headerHeight), 'left': globalABListLeft, 'width': headerWidth, 'position': 'fixed', 'z-index': 1});

							// remove the previous floating header
							floating_elem.remove();

							// set the opacity back to standard value (item is invisible scrolled above the ABlist top)
							$('#ABList > .ablist_header').each(function(index,element){
								if($(element).css('opacity')=='0'){$(element).css('opacity',0.85);}
							});

							// set the previous element opacity to 0 and "replace" it with floating element above it
							$(prev_h).css('opacity',0);
							cloned.appendTo('#SystemCardDAV');
						}
					}
					// move the next floating header DOWN
					if(floating_elem.length!=0 && floating_elem.offset().top<globalABListTop)
						floating_elem.css('top',Math.min(globalABListTop,$(element).offset().top-headerHeight));

					return false;
				}
			}
		});

		globalLastScrollPos=$('#ABList').scrollTop();
	});
*/

	// cleanup old data form address fields
	globalAddressElementOldData={};

	// CUSTOM PLACEHOLDER (initialization for the editor)
	$('#ABContact').find('input[placeholder],textarea[placeholder]').placeholder();
	// enable autosize for textarea elements
	$('#ABContact').find('textarea[data-type="value"]').autosize();

	if(inputLoadEmpty==true)
		$('#EditorBox').fadeTo(100,1);
}

function animate_message(messageSelector,messageTextSelector,duration,operation)
{
	if(operation==undefined)
		operation='+=';
	var height=$(messageTextSelector).height()+14;
	var animation=500;

	$(messageSelector).animate({'max-height': height+'px', height: (operation==undefined ? '+=' : operation)+height+'px'}, animation,
		function()
		{
			if(operation=='+=')
				setTimeout(function(){animate_message(messageSelector,messageTextSelector,0,'-=');},duration);
		}
	);
	return duration+2*animation;
}

function show_editor_message(inputPosition,inputSetClass,inputMessage,inputDuration)
{
	if(inputPosition==undefined || inputPosition=='in')
	{
		$('#ABContact').scrollTop(0);
		messageSelector='#ABInMessage';
		messageTextSelector='#ABInMessageText';
	}
	else
	{
		messageSelector='#ABMessage';
		messageTextSelector='#ABMessageText';
	}

	$(messageTextSelector).attr('class',inputSetClass);
	$(messageTextSelector).text(inputMessage);
	return animate_message(messageSelector,messageTextSelector,inputDuration);
}

function set_address_country(inputSelectedAddressObj)
{
	var selectedCountry=$(inputSelectedAddressObj).find('option').filter(':selected').attr('data-type');
	var addressElement=$(inputSelectedAddressObj).closest('[data-type="\\%address"]');

	// store the previous data + cleanup the data-addr-fields, placeholders and values
	addressElement.find('[data-addr-fid]').each(
		function(index,element)
		{
			var tmp=$(element).find('input');
			var tmp_field_name=tmp.attr('data-addr-field');
			if(tmp_field_name!=undefined && tmp_field_name!='')
				globalAddressElementOldData[tmp_field_name]=tmp.val();
			tmp.attr({'data-addr-field': '', 'placeholder': ''}).unplaceholder();	// REMOVE CUSTOM PLACEHOLDER
			tmp.val('');
		}
	);

	if(addressTypes[selectedCountry]!=undefined)
		for(var i=1;i<addressTypes[selectedCountry].length;i++)
		{
			if(addressTypes[selectedCountry][i]['type']=='input')
			{
				var tmp=addressElement.find('[data-addr-fid="'+jqueryEscapeSelector(addressTypes[selectedCountry][i]['fid'])+'"]').find('input');
				tmp.attr('data-addr-field',addressTypes[selectedCountry][i]['data-addr-field']);
				tmp.attr('placeholder',addressTypes[selectedCountry][i]['placeholder']);

				// here we restore the data from globalAddressElementOldData variable
				if(globalAddressElementOldData[addressTypes[selectedCountry][i]['data-addr-field']]!=undefined)
					tmp.val(globalAddressElementOldData[addressTypes[selectedCountry][i]['data-addr-field']]);
			}
			else if(addressTypes[selectedCountry][i]['type']=='country')
			{
				var tmp=addressElement.find('[data-type="\\%country_container"]');
				tmp.find('select').find('option[data-type]').prop('selected',false);
				tmp.find('select').find('option[data-type="'+jqueryEscapeSelector(selectedCountry)+'"]').prop('selected',true);

				// the country selector is in wrong container -> we need to move it
				if(addressTypes[selectedCountry][i]['fid']!=tmp.closest('[data-addr-fid]').attr('data-addr-fid'))
					$(addressElement).find('[data-addr-fid="'+jqueryEscapeSelector(addressTypes[selectedCountry][i]['fid'])+'"]').append(tmp); 
			}
		}

	// hide the unused fields by changing the CSS
	addressElement.find('[data-type="container"]').each(
		function(index,element)
		{
			var found=0;
			$(element).find('[data-addr-field]').each(
				function(index,element)
				{
					if($(element).attr('data-addr-field')!='')
					{
						found=1;
						return false;
					}
				}
			);

			if(found)
				$(element).removeClass('element_no_display_af');
			else
				$(element).addClass('element_no_display_af');
		}
	);

	// CUSTOM PLACEHOLDER (reinitialization due to possible placeholder value change)
	addressElement.find('input[data-type="value"][placeholder],textarea[data-type="value"][placeholder]').placeholder();
}

function add_element(inputElementID, inputParentSelector, newElementSelector, inputAddClassSelector, inputDelClassSelector, maxElements, newElementID) // note: newElementSelector is always used with .last()
{
	// allow only maxElements items for this attribute 
	if((count=inputElementID.closest(inputParentSelector).parent().children(inputParentSelector).length) < maxElements)
	{
		newElement=$(newElementSelector).last().clone().wrap('<div>');

		// CUSTOM PLACEHOLDER
		// remove the "placeholder" data (custom placeholder label for IE)
		newElement.find('label').remove();
		newElement.find('[data-type="value"]').removeAttr('id','').removeClass('placeholder-input');

		// unselect each selected element
		newElement.find('option').prop('selected',false);
		// remove the form values
		newElement.find('[data-type$="value"]').val('');
		// hide custom types
		newElement.find('[data-type="custom_span"]').css('display', 'none');
		// add the data-id value
		newElement.closest(inputParentSelector).attr("data-id",newElementID);
		// disable the "add" on last element if maximum count is reached
		if(count==maxElements-1)
			newElement.find(inputAddClassSelector).css('visibility','hidden');

		newElement=newElement.closest(inputParentSelector).parent().html();

		// disable the "add" button on the current element
		inputElementID.filter(inputAddClassSelector).css('visibility','hidden');
		// add the new element (with enabled "add" button)
		inputElementID.parent().after(newElement);

		// CUSTOM PLACEHOLDER
		// enable custom placeholder support (it is enabled only if needed)
		$(newElementSelector).last().find('input[data-type="value"][placeholder],textarea[data-type="value"][placeholder]').placeholder();
		// enable autosize for textarea elements
		$(newElementSelector).last().find('textarea[data-type="value"]').autosize();

		// enable the "del" button on all elements
		$(inputParentSelector).find(inputDelClassSelector).css('visibility','');

		if(inputParentSelector=='[data-type="\\%address"]')
		{
			// execute the "autoselect"
			var tmp=inputElementID.closest(inputParentSelector).next();
			var tmp_select=tmp.find('[data-autoselect]').attr('data-autoselect');
			if(tmp_select!=null)
			{
				tmp.find('[data-type="country_type"]').children('[data-type="'+jqueryEscapeSelector(tmp_select)+'"]').prop('selected',true);
				tmp.find('[data-autoselect]').change();
			}
		}
		return true;
	}
	else
		return false;
}

function del_element(inputElementID, inputParentSelector, inputAddClassSelector, inputDelClassSelector)
{
	// all elements except the last can be removed
	if(inputElementID.closest(inputParentSelector).siblings(inputParentSelector).length > 0)
	{
		inputElementID.closest(inputParentSelector).remove();
		// enable the "add" button on last element
		$(inputParentSelector).last().find(inputAddClassSelector).css('visibility','');
		// hide the "del" button if only one element is present (we maybe change this in future)
		if($(inputParentSelector).length==1)
			$(inputParentSelector).last().find(inputDelClassSelector).css('visibility','hidden');
	}
	else	// currently not used because the "-" button is hidden on the last element (we maybe change this in future)
		inputElementID.closest(inputParentSelector).find('input[data-type="value"]').val('');
}

var globalCounter=new Object();
globalCounter['phoneID']=1;
globalCounter['emailID']=1;
globalCounter['urlID']=1;
globalCounter['personID']=1;
globalCounter['imID']=1;
globalCounter['profileID']=1;
globalCounter['addressID']=1;

/* BEGIN image manipulation */
function process_image(event){
	event.stopPropagation();
	event.preventDefault();

	// allow image manipulation only if the editor is in "edit" state
	if($('#vcard_editor').attr('data-editor-state')!="edit")
		return false;

	if(typeof event.originalEvent.dataTransfer!='undefined')
		var files=event.originalEvent.dataTransfer.files; // fileList object from drag&drop
	else
		var files=event.originalEvent.target.files; // fileList object from input type file

	// files is a FileList of File objects. List some properties.
	for(var i=0;i<files.length;i++)	// we handle only the first picture here ... (see below)
	{
		// only process image files
		if(!files[i].type.match(/image/i))
			continue;

		// do not accept images bigger than 64KiB
		if(!files[i].size>65536)
			continue;

		// show the image "delete" button
		$('#reset_img').css('display', 'inline');
		// remove the template related to previous image (start with clean one)
		vCard.tplM['contentline_PHOTO'][0]=null;

		var reader=new FileReader();
		// closure to capture the file information.
		reader.onload=(function(theFile){
			return function(e){
				//escape(files[i].name), files[i].type, files[i].size, files[i].lastModifiedDate
				$('[id="vcard_editor"] [data-type="photo"]').css('visibility', 'hidden').prop('src', e.target.result).one('load', function(){
					var newImg=new Image();
					newImg.src=(imgObj=$(this)).prop('src');
					newImg.onload=function(){
						imageLoaded(imgObj, newImg.width, newImg.height);
					};
				});
			};
		})(files[i]);

		reader.readAsDataURL(files[i]);
		break; // we handle only the first picture here ...
	}
}
$(document).on('dragover dragenter', '.photo_div', function(event) {
	event.stopPropagation();
	event.preventDefault();

	// allow image manipulation only if the editor is in "edit" state
	if($('#vcard_editor').attr('data-editor-state')!="edit")
		return false;

	event.originalEvent.dataTransfer.dropEffect='copy'; // explicitly show this is a copy
});
$(document).on('drop', '.photo_div', function(event){process_image(event)});
$(document).on('change', '#upload_file', function(event){process_image(event)});
/* END image manipulation */

$(document).on('keyup change', '[data-type="custom_value"]', function(event){
	$(this).parent().find('[data-type="invalid"]').css('display', (vCard.pre['custom_type'].test($(this).val()) ? 'none' : 'inline'));
});

$(document).on('keyup change', '[data-type^="date_"]', function(){
	if(!$(this).prop('readonly') && !$(this).prop('disabled'))
	{
		var valid=true;

		if($(this).val()!='')
		{
			try {$.datepicker.parseDate(globalSessionDatepickerFormat, $(this).val())}
			catch (e) {valid=false}
		}

		if(valid)
			$(this).parent().find('img').css('display','none');
		else
			$(this).parent().find('img').css('display','inline');
	}
});

$(document).on('focus', '[data-type^="date_"]', function(){if(!$(this).hasClass('hasDatepicker')){$(this).datepicker({disabled: $(this).prop('readonly') || $(this).prop('disabled'), showMonthAfterYear: true, prevText: '', nextText: '', monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'], dateFormat: globalSessionDatepickerFormat, defaultDate: '-'+Math.round(30*365.25-1), minDate: '-120y', maxDate: '+0', yearRange: 'c-120:+0', firstDay: (typeof globalDatepickerFirstDayOfWeek=='undefined' || globalDatepickerFirstDayOfWeek==null ? 1 : globalDatepickerFirstDayOfWeek), changeMonth: true, changeYear: true, showAnim: '',
	onChangeMonthYear: function(year, month, inst)
	{
		/*************************** BAD HACKS SECTION ***************************/
		// IE and FF datepicker selectbox problem fix
		if($.browser.msie || $.browser.mozilla)
		{
			var calendar=inst.dpDiv;
			setTimeout(function(){
				if($.browser.msie && parseInt($.browser.version, 10)==10)	/* IE 10 */
					calendar.find('select').css({'padding-top': '1px', 'padding-left': '0px', 'padding-right': '0px'});

				var newSVG=$(SVG_select).attr('data-type', 'select_icon').css({'pointer-events': 'none', 'z-index': '1', 'display': 'inline', 'margin-left': '-19px', 'vertical-align': 'top', 'background-color': '#ffffff'});	// background-color = stupid IE9 bug
				// ADD SVG to fullcalendar
				calendar.find('select').after($($('<div>').append($(newSVG).clone()).html()));
			},1);
		}
		else if(navigator.platform.toLowerCase().indexOf('win')==0 && $.browser.webkit && !!window.chrome)	/* Chrome on Windows */
		{
			var calendar=inst.dpDiv;
			setTimeout(function(){ calendar.find('select').css({'padding-left': '0px', 'padding-right': '13px'}); },1);
		}
		/*************************** END OF BAD HACKS SECTION ***************************/
	},
	beforeShow: function(input, inst)	// set the datepicker value if the date is out of range (min/max)
	{
		inst.dpDiv.removeClass('ui-datepicker-simple');
		/*************************** BAD HACKS SECTION ***************************/
		// IE and FF datepicker selectbox problem fix
		if($.browser.msie || $.browser.mozilla)
		{
			var calendar=inst.dpDiv;
			setTimeout(function(){
				if($.browser.msie && parseInt($.browser.version, 10)==10)	/* IE 10 */
					calendar.find('select').css({'padding-top': '1px', 'padding-left': '0px', 'padding-right': '0px'});

				var newSVG=$(SVG_select).attr('data-type', 'select_icon').css({'pointer-events': 'none', 'z-index': '1', 'display': 'inline', 'margin-left': '-19px', 'vertical-align': 'top', 'background-color': '#ffffff'});	// background-color = stupid IE9 bug

				// ADD SVG to fullcalendar
				calendar.find('select').after($($('<div>').append($(newSVG).clone()).html()));
			},1);
		}
		else if(navigator.platform.toLowerCase().indexOf('win')==0 && $.browser.webkit && !!window.chrome)	/* Chrome on Windows */
		{
			var calendar=inst.dpDiv;
			setTimeout(function(){
				calendar.find('select').css({'padding-left': '0px', 'padding-right': '13px'});
			},1);
		}
		/*************************** END OF BAD HACKS SECTION ***************************/

		var valid=true;
		try {var currentDate=$.datepicker.parseDate(globalSessionDatepickerFormat, $(this).val())}
		catch (e) {valid=false}

		if(valid==true)
		{
			var minDateText=$(this).datepicker('option', 'dateFormat', globalSessionDatepickerFormat).datepicker('option', 'minDate');
			var maxDateText=$(this).datepicker('option', 'dateFormat', globalSessionDatepickerFormat).datepicker('option', 'maxDate');

			var minDate=$.datepicker.parseDate(globalSessionDatepickerFormat, minDateText);
			var maxDate=$.datepicker.parseDate(globalSessionDatepickerFormat, maxDateText);

			if(currentDate<minDate)
				$(this).val(minDateText);
			else if(currentDate>maxDate)
				$(this).val(maxDateText);
		}

		// Timepicker hack (prevent IE to re-open the datepicker on date click + focus)
		var index=$(this).attr("data-type");
		var d = new Date();
		if(globalTmpTimePickerHackTime[index]!=undefined && d.getTime()-globalTmpTimePickerHackTime[index]<200)
			return false;
	},
	onClose: function(dateText, inst)	// set the datepicker value if the date is out of range (min/max) and reset the value to proper format (for example 'yy-mm-dd' allows '2000-1-1' -> we need to reset the value to '2000-01-01')
	{
		var valid=true;
		try {var currentDate=$.datepicker.parseDate(globalSessionDatepickerFormat, dateText)}
		catch (e) {valid=false}

		if(valid==true)
		{
			var minDateText=$(this).datepicker('option', 'dateFormat', globalSessionDatepickerFormat).datepicker('option', 'minDate');
			var maxDateText=$(this).datepicker('option', 'dateFormat', globalSessionDatepickerFormat).datepicker('option', 'maxDate');

			var minDate=$.datepicker.parseDate(globalSessionDatepickerFormat, minDateText);
			var maxDate=$.datepicker.parseDate(globalSessionDatepickerFormat, maxDateText);

			if(currentDate<minDate)
				$(this).val(minDateText);
			else if(currentDate>maxDate)
				$(this).val(maxDateText);
			else
				$(this).val($.datepicker.formatDate(globalSessionDatepickerFormat, currentDate));
		}

		// Timepicker hack (prevent IE to re-open the datepicker on date click + focus)
		var index=$(this).attr("data-type");
		var d = new Date();
		globalTmpTimePickerHackTime[index]=d.getTime();

		$(this).focus();
	}
});
$(this).mousedown(function(){
	if($(this).datepicker('widget').css('display')=='none')
		$(this).datepicker('show');
	else
		$(this).datepicker('hide');
});
$(this).blur(function(event){
	// handle onblur event because datepicker can be already closed
	// note: because onblur is called more than once we can handle it only if there is a value change!
	var valid=true;
	try {var currentDate=$.datepicker.parseDate(globalSessionDatepickerFormat, $(this).val())}
	catch (e) {valid=false}

	if(valid==true && $(this).val()!=$.datepicker.formatDate(globalSessionDatepickerFormat, currentDate))
	{
		var minDateText=$(this).datepicker('option', 'dateFormat', globalSessionDatepickerFormat).datepicker('option', 'minDate');
		var maxDateText=$(this).datepicker('option', 'dateFormat', globalSessionDatepickerFormat).datepicker('option', 'maxDate');

		var minDate=$.datepicker.parseDate(globalSessionDatepickerFormat, minDateText);
		var maxDate=$.datepicker.parseDate(globalSessionDatepickerFormat, maxDateText);

		if(currentDate<minDate)
			$(this).val(minDateText);
		else if(currentDate>maxDate)
			$(this).val(maxDateText);
		else
			$(this).val($.datepicker.formatDate(globalSessionDatepickerFormat, currentDate));
	}
})
}});

if(typeof globalEnableKbNavigation=='undefined' || globalEnableKbNavigation!==false)
{
	$(document.documentElement).keyup(function (event)
	{
		if(typeof globalActiveApp=='undefined' || globalActiveApp!='CardDavMATE' || typeof globalObjectLoading=='undefined' || globalObjectLoading==true)
			return true;

		//if($('#SystemCardDAV').css('display')!='none' && $('#ABListLoader').css('display')=='none' && $('#ABListOverlay').css('display')=='none' && !$('input[data-type="search"]').is(':focus'))
		if($('#SystemCardDAV').css('display')!='none' && isCardDAVLoaded && $('#ABListOverlay').css('display')=='none' && !$('input[data-type="search"]').is(':focus'))
		{
			// 37 = left, 38 = up, 39 = right, 40 = down
			var selected_contact=null, next_contact=null;
			if((selected_contact=$('#ABList').find('.ablist_item_selected')).length==1)
			{
				if(event.keyCode == 38 && (next_contact=selected_contact.prevAll('.ablist_item').filter(':visible').first()).attr('data-id')!=undefined || event.keyCode == 40 && (next_contact=selected_contact.nextAll('.ablist_item').filter(':visible').first()).attr('data-id')!=undefined)
					globalAddressbookList.loadContactByUID(next_contact.attr('data-id'));
			}
		}
	});

	$(document.documentElement).keydown(function(event)
	{		
		if(typeof globalActiveApp=='undefined' || globalActiveApp!='CardDavMATE' || typeof globalObjectLoading=='undefined' || globalObjectLoading==true)
			return true;
		//if($('#SystemCardDAV').css('display')!='none' && $('#ABListLoader').css('display')=='none' && $('#ABListOverlay').css('display')=='none' && !$('input[data-type="search"]').is(':focus'))
		if($('#SystemCardDAV').css('display')!='none' && isCardDAVLoaded && $('#ABListOverlay').css('display')=='none' && !$('input[data-type="search"]').is(':focus'))
		{
			// 37 = left, 38 = up, 39 = right, 40 = down
			var selected_contact=null, next_contact=null;
			if((selected_contact=$('#ABList').find('.ablist_item_selected')).length==1)
			{
				if(event.keyCode == 38 && (next_contact=selected_contact.prevAll('.ablist_item').filter(':visible').first()).attr('data-id')!=undefined || event.keyCode == 40 &&  (next_contact=selected_contact.nextAll('.ablist_item').filter(':visible').first()).attr('data-id')!=undefined)
				{
					switch(event.keyCode)
					{
						case 38:
							event.preventDefault();
							if($('#ABList').scrollTop()>$('#ABList').scrollTop()+next_contact.offset().top-$('#ABList').offset().top-$('#ABList').height()*globalKBNavigationPaddingRate)
								$('#ABList').scrollTop($('#ABList').scrollTop()+next_contact.offset().top-$('#ABList').offset().top-$('#ABList').height()*globalKBNavigationPaddingRate);
							else if($('#ABList').scrollTop()<$('#ABList').scrollTop()+next_contact.offset().top+next_contact.height()-$('#ABList').offset().top-$('#ABList').height()*(1-globalKBNavigationPaddingRate))	/* contact invisible (scrollbar moved) */
								$('#ABList').scrollTop($('#ABList').scrollTop()+next_contact.offset().top+next_contact.height()-$('#ABList').offset().top-$('#ABList').height()*(1-globalKBNavigationPaddingRate));
							else
								return false;
							break;
						case 40:
							event.preventDefault();
							if($('#ABList').scrollTop()<$('#ABList').scrollTop()+next_contact.offset().top+next_contact.height()-$('#ABList').offset().top-$('#ABList').height()*(1-globalKBNavigationPaddingRate))	/* contact invisible (scrollbar moved) */
								$('#ABList').scrollTop($('#ABList').scrollTop()+next_contact.offset().top+next_contact.height()-$('#ABList').offset().top-$('#ABList').height()*(1-globalKBNavigationPaddingRate));
							else if($('#ABList').scrollTop()>$('#ABList').scrollTop()+next_contact.offset().top-$('#ABList').offset().top-$('#ABList').height()*globalKBNavigationPaddingRate)
								$('#ABList').scrollTop($('#ABList').scrollTop()+next_contact.offset().top-$('#ABList').offset().top-$('#ABList').height()*globalKBNavigationPaddingRate);
							else
								return false;
							break;
						default:
							break;
					}
				}
				else	// no previous contact and up pressed || no next contact and down pressed
				{
					switch(event.keyCode)
					{
						case 38:
							$('#ABList').scrollTop(0);
							break;
						case 40:
							$('#ABList').scrollTop($('#ABList').prop('scrollHeight'));
							break;
						default:
							break;
					}
				}
			}
		}
	});
}

$(document).on("mouseover", ".ablist_item", function() {
	if(!$(this).is('.ui-draggable'))
	{
		$(this).draggable({
			delay: 250,
			revert: 'invalid',
			scroll: false,
			opacity: 0.8,
			stack: '#SystemCardDAV',
			containment: '#SystemCardDAV',
			appendTo: 'body',
			start: function( event, ui ){
				// disallow on read-only collection
				if(globalResourceCardDAVList.getCollectionPrivByUID($(this).attr('data-id').replace(RegExp('[^/]*$'),''))==true)
					return false;
			},
			helper: function(){
				$('#ResourceCardDAVList').find('.resourceCardDAV.ui-droppable').droppable( 'option', 'accept', false);
				$('#ResourceCardDAVList').find('.group.ui-droppable').droppable( 'option', 'accept', false);

				$('#ResourceCardDAVList').find('.resourceCardDAV[data-id!='+jqueryEscapeSelector($(this).attr('data-id').replace(RegExp('[^/]+$'),''))+'].ui-droppable').droppable( 'option', 'accept', '.ablist_item');
				var myContactGroups=globalAddressbookList.getMyContactGroups($(this).attr('data-id'));
				$('#ResourceCardDAVList').find('.group[data-id^='+jqueryEscapeSelector($(this).attr('data-id').replace(RegExp('[^/]+$'),''))+'].ui-droppable').not('.resourceCardDAV_selected').each(function(index, element){
					if(myContactGroups.indexOf($(element).attr('data-id'))==-1)
						$(element).droppable( 'option', 'accept', '.ablist_item');
				});

				var tmp=$(this).clone();
				tmp.addClass('ablist_item_dragged');
				// we cannot use .css() here, because we need to add !important (problem with Gecko based browsers)
				var tmp_style='max-width: '+$(this).outerWidth()+'px;';
				if($(this).css('background-image')!='none')
					tmp_style+='background-image: url(images/company_s_w.svg) !important;';
				tmp.attr('style', tmp_style);

				return tmp;
			}
		});
	}
});

var phoneMax=20;
$(document).on('click', '[data-type="\\%phone"] [data-type="\\%add"] input', function(ignoreMaxElements){add_element($(this).parent(),'[data-type="\\%phone"]','[data-type="\\%phone"]','[data-type="\\%add"]','[data-type="\\%del"]',phoneMax,globalCounter['phoneID']++)});
$(document).on('click', '[data-type="\\%phone"] [data-type="\\%del"] input', function(){del_element($(this).parent(),'[data-type="\\%phone"]','[data-type="\\%add"]','[data-type="\\%del"]')});
//$('[data-type="\\%phone"]').children().filter('[data-type="\\%add"]').click();

var emailMax=20;
$(document).on('click', '[data-type="\\%email"] [data-type="\\%add"] input', function(ignoreMaxElements){add_element($(this).parent(),'[data-type="\\%email"]','[data-type="\\%email"]','[data-type="\\%add"]','[data-type="\\%del"]',emailMax,globalCounter['emailID']++)});
$(document).on('click', '[data-type="\\%email"] [data-type="\\%del"] input', function(){del_element($(this).parent(),'[data-type="\\%email"]','[data-type="\\%add"]','[data-type="\\%del"]')});
//$('[data-type="\\%email"]').children().filter('[data-type="\\%add"]').click();

var urlMax=20;
$(document).on('click', '[data-type="\\%url"] [data-type="\\%add"] input', function(ignoreMaxElements){add_element($(this).parent(),'[data-type="\\%url"]','[data-type="\\%url"]','[data-type="\\%add"]','[data-type="\\%del"]',urlMax,globalCounter['urlID']++)});
$(document).on('click', '[data-type="\\%url"] [data-type="\\%del"] input', function(){del_element($(this).parent(),'[data-type="\\%url"]','[data-type="\\%add"]','[data-type="\\%del"]')});
//$('[data-type="\\%url"]').children().filter('[data-type="\\%add"]').click();

var personMax=20;
$(document).on('click', '[data-type="\\%person"] [data-type="\\%add"] input', function(ignoreMaxElements){add_element($(this).parent(),'[data-type="\\%person"]','[data-type="\\%person"]','[data-type="\\%add"]','[data-type="\\%del"]',personMax,globalCounter['personID']++)});
$(document).on('click', '[data-type="\\%person"] [data-type="\\%del"] input', function(){del_element($(this).parent(),'[data-type="\\%person"]','[data-type="\\%add"]','[data-type="\\%del"]')});
//$('[data-type="\\%person"]').children().filter('[data-type="\\%add"]').click();

var imMax=20;
$(document).on('click', '[data-type="\\%im"] [data-type="\\%add"] input', function(ignoreMaxElements){add_element($(this).parent(),'[data-type="\\%im"]','[data-type="\\%im"]','[data-type="\\%add"]','[data-type="\\%del"]',imMax,globalCounter['imID']++)});
$(document).on('click', '[data-type="\\%im"] [data-type="\\%del"] input', function(){del_element($(this).parent(),'[data-type="\\%im"]','[data-type="\\%add"]','[data-type="\\%del"]')});
//$('[data-type="\\%im"]').children().filter('[data-type="\\%add"]').click();

var profileMax=20;
$(document).on('click', '[data-type="\\%profile"] [data-type="\\%add"] input', function(ignoreMaxElements){add_element($(this).parent(),'[data-type="\\%profile"]','[data-type="\\%profile"]','[data-type="\\%add"]','[data-type="\\%del"]',imMax,globalCounter['profileID']++)});
$(document).on('click', '[data-type="\\%profile"] [data-type="\\%del"] input', function(){del_element($(this).parent(),'[data-type="\\%profile"]','[data-type="\\%add"]','[data-type="\\%del"]')});
//$('[data-type="\\%profile"]').children().filter('[data-type="\\%add"]').click();

var addrMax=20;
$(document).on('click', '[data-type="\\%address"] [data-type="\\%add"] input', function(ignoreMaxElements){add_element($(this).parent(),'[data-type="\\%address"]','[data-type="\\%address"]','[data-type="\\%add"]','[data-type="\\%del"]',imMax,globalCounter['addressID']++)});
$(document).on('click', '[data-type="\\%address"] [data-type="\\%del"] input', function(){del_element($(this).parent(),'[data-type="\\%address"]','[data-type="\\%add"]','[data-type="\\%del"]')});
//$('[data-type="\\%address"]').children().filter('[data-type="\\%add"]').click();
$(document).on('change', '[data-type="\\%address"] [data-type="country_type"]', function(){set_address_country(this); $(this).parent().find('[data-type="country_type"]').focus();});
