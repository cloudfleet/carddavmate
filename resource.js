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

function CardDAVloadResources(resourceList, forceLoad)
{
	if(forceLoad!=true && globalWindowFocus==false)
		return false;

	if(!(resourceList instanceof Array))
		resourceList=[resourceList];

	// i.pad((resourceList.length+'').length) is used for custom sorting
	//for(var i=0;i<resourceList.length;i++)
	var i = 0;
	CardDAVnetFindResource(resourceList[0], i.pad((resourceList.length+'').length), forceLoad, 0);
}

// ResourceCardDAVList Class
function ResourceCardDAVList()
{
	this.collections=new Array();
	this.addressbookLoaded=null;

	this.reset=function()
	{
		this.collections.splice(0,this.collections.length);
		this.addressbookLoaded=null;
	}

	// resource header value
	this.getHeaderValue=function(inputResource)
	{
		if(typeof inputResource.hrefLabel=='string' && inputResource.hrefLabel!='')
			var result=inputResource.hrefLabel;
		else
		{
			var re=new RegExp('^(https?://)([^@/]+(?:@[^@/]+)?)@([^/]+).*/([^/]*)/','i');
			var tmp=inputResource.accountUID.match(re);
			var result=tmp[3].replace(RegExp(':[0-9]+$'),'')+'/'+decodeURIComponent(tmp[4]).replace(RegExp('(@.*)?$'),'');
		}

		if(typeof globalResourceHeaderShowLogin!='undefined' && globalResourceHeaderShowLogin==true)
			result+=' ['+inputResource.userAuth.userName.replace(RegExp('@.*$'),'')+']'

		return result;
	}

	this.getSortKey=function(inputResource, forHeader, inputResourceIndex)
	{
		var re=new RegExp('^(https?://)([^@/]+(?:@[^@/]+)?)@([^/]+)(.*/)([^/]+/)([^/]+/)([^/]*)','i');
		var tmp=inputResource.uid.match(re);
		var out='';

		// custom sorting (instead of alphabetical)
		if(typeof globalResourceAlphabetSorting!='undefined' && globalResourceAlphabetSorting!=true)
			out+=inputResourceIndex;

		if(forHeader==true)
			out+=tmp[1]+tmp[3]+'/'+(inputResource.hrefLabel==undefined || inputResource.hrefLabel==null ? tmp[5] : '')+' '+inputResource.userAuth.userName;
		else
			out+=tmp[1]+tmp[3]+'/'+tmp[5]+' '+inputResource.userAuth.userName+' '+inputResource.displayvalue;

		return out;
	}

	// Resource list is not sorted, instead "insert sort" is performed
	this.insertResource=function(inputResource, inputResourceIndex)
	{
		inputResource.sortkey=this.getSortKey(inputResource, false, inputResourceIndex);

		var makeActive=null;

		// do not insert entry with duplicate UID
		for(var i=0;i<this.collections.length;i++)
			if(this.collections[i].uid!=undefined && this.collections[i].uid==inputResource.uid)
			{
				if(this.collections[i].displayvalue==inputResource.displayvalue && this.collections[i].permissions.read_only==inputResource.permissions.read_only)
				{
					this.collections[i]=$.extend(inputResource, {syncToken: this.collections[i].syncToken, forceSyncPROPFIND: this.collections[i].forceSyncPROPFIND, loaded: this.collections[i].loaded});
					return 0;
				}
				else
				{
					if(this.addressbookLoaded.uid==inputResource.uid)
						makeActive=inputResource.uid;

					// the collection name is changed and must be moved to correct place (we first remove it and then reinsert)
					this.removeResource(inputResource.uid,false);
					break;
				}
			}

		// create the header
		var headerObject={headerOnly: true, sortkey: this.getSortKey(inputResource, true, inputResourceIndex), displayvalue: this.getHeaderValue(inputResource)};

		// find the index where to insert the new resource O(n*log(n))
		insertIndex=0;
		low=0;
		high=this.collections.length-1;
		if(this.collections.length>0)
			while(low<high)
			{
				insertIndex=low+Math.round((high-low)/2);
				result=(this.collections[insertIndex].headerOnly!=undefined ? cmp_str=this.collections[insertIndex].sortkey : cmp_str=this.collections[insertIndex].sortkey).customCompare(inputResource.sortkey,globalSortAlphabet,1,false);
				if(result==-1)
				{
					if(insertIndex+1==this.collections.length-1 && typeof this.collections[insertIndex+1]!='undefined' && (cmp_str=this.collections[insertIndex+1].sortkey).customCompare(inputResource.sortkey,globalSortAlphabet,1,false)==-1)
					{
						insertIndex+=2;
						break;
					}
					else
						low=++insertIndex;
				}
				else if(result==1)
				{
					if((cmp_str=this.collections[insertIndex-1].sortkey).customCompare(inputResource.sortkey,globalSortAlphabet,1,false)==-1)
						break;
					else
						high=--insertIndex;
				}
			}

		// check for header existence
		var headerMiss=1;
		for(var i=0;i<this.collections.length;i++)
			if(this.collections[i].headerOnly!=undefined && this.collections[i].headerOnly==true && this.collections[i].displayvalue==headerObject.displayvalue)
				{headerMiss=0; break;}

		// insert header if not exists
		if(headerMiss)
			this.collections.splice(insertIndex,0,headerObject);
		// insert the resource
		this.collections.splice(insertIndex+headerMiss,0,inputResource);

		// insert header to interface if not exists
		if(headerMiss)
		{
			var newElement=$('#ResourceCardDAVListTemplate').find('.resourceCardDAV_header').clone().wrap('<div>');
			newElement=newElement.text(headerObject.displayvalue);
			newElement=newElement.parent().html();
			$('#ResourceCardDAVList').children().eq(insertIndex).after(newElement);
		}

		// insert the resource to interface
		var newElement=$('#ResourceCardDAVListTemplate').find('.resourceCardDAV_item').clone().wrap('<div>');
		// the onclick event is disabled until the last drag&drop operation is completed
		newElement.find('.resourceCardDAV').attr('onclick','if($(this).parents(\':eq(1)\').find(\'[class^="r_"]\').length>0) return false; else globalResourceCardDAVList.loadAddressbookByUID(this.getAttribute(\'data-id\'));');
		if(inputResource.permissions.read_only)
			newElement.find('.resourceCardDAV').addClass('resourceCardDAV_ro');
		newElement.find('.resourceCardDAV').attr('data-id',inputResource.uid);
		
		if(globalCardDAVInitLoad)
			newElement.find('.resourceCardDAV').addClass('r_operate');
		newElement.find('.resourceCardDAV').text(inputResource.displayvalue);
		newElement=newElement.parent().html();

		$('#ResourceCardDAVList').children().eq(insertIndex+headerMiss).after(newElement);
				
		// make the area droppable if the collection is not read-only
		if(!inputResource.permissions.read_only)
			$('#ResourceCardDAVList').children().eq(insertIndex+headerMiss+1).find('.resourceCardDAV').droppable({
				accept: '.ablist_item',
				tolerance: 'pointer',
				hoverClass: 'resourceCardDAV_dropped_to',
				drop: function(event, ui){
					// animate the clone of the dropped (draggable) element
					var tmp=ui.helper.clone();
					tmp.appendTo('body')
					.animate({opacity: 0, color: 'transparent', height: 0, width: 0, fontSize: 0, lineHeight: 0, paddingLeft: 0, paddingRight: 0},750,function(){tmp.remove()});

					// disallow to drag the original dropped element until the processing is finished
					ui.draggable.draggable('option', 'disabled', true);

					// animate the original dropped element
					ui.draggable.animate({opacity: 0.3}, 750);

					// disallow to drop any new element until the processing is finished
					$(this).droppable('option', 'disabled', true);

					// show the loader icon
					$(this).addClass('r_operate');

					// moving contact between different collections in same resource
					if($(this).attr('data-id').replace(RegExp('[^/]+/$'),'')==ui.draggable.attr('data-id').replace(RegExp('[^/]+/[^/]+$'),''))
					{
						var tmp2=globalAddressbookList.getContactByUID(ui.draggable.attr('data-id'));
						// here we generate the destination for MOVE (we don't use the old vCard file name to minimalize the possible conflict situations)
						var tmp3=($(this).attr('data-id')+hex_sha256(tmp2.vcard+(new Date().getTime()))+'.vcf').match(RegExp('^(https?://)([^@/]+(?:@[^@/]+)?)@([^/]+)(.*/)([^/]+/)([^/]*)','i'));
						tmp2.moveDestUID=$(this).attr('data-id');
						tmp2.moveDest=tmp3[1]+tmp3[3]+tmp3[4]+tmp3[5]+tmp3[6];
						// we need to store the ui object references for error handling in the GUI
						tmp2.uiObjects={contact: ui.draggable, resource: $(this).attr('data-id')};
						lockAndPerformToCollection(tmp2, $('#AddContact').attr('data-filter-url'), 'MOVE');
					}
					// inter-resource contact "move" (put + delete)
					else
					{
						var tmp2=globalAddressbookList.getContactByUID(ui.draggable.attr('data-id'));
						// here we generate the destination for MOVE (we don't use the old vCard file name to minimalize the possible conflict situations)
						tmp2.newAccountUID=globalResourceCardDAVList.getCollectionByUID($(this).attr('data-id')).accountUID;
						tmp2.newUid=$(this).attr('data-id');

						// we need to store the ui object references for error handling in the GUI
						tmp2.uiObjects={contact: ui.draggable, resource: $(this).attr('data-id')};
						lockAndPerformToCollection(tmp2, $('#AddContact').attr('data-filter-url'), 'IRM_DELETE');
					}
				}
			});

		// load the updated collection (because we first deleted it, we need to set it active)
		if(makeActive!=null)
		{
			// make the resource active
			$('#ResourceCardDAVList').find('.resourceCardDAV_item').find('.resourceCardDAV').removeClass('resourceCardDAV_selected');
			$('#ResourceCardDAVList').children().eq(insertIndex+headerMiss+1).find('.resourceCardDAV').addClass('resourceCardDAV_selected');
			globalResourceCardDAVList.loadAddressbookByUID(inputResource.uid);
		}
	}

	this.removeResource=function(inputUid,loadNext)
	{
		for(var i=this.collections.length-1;i>=0;i--)
			if(this.collections[i].uid==inputUid)
			{
				var nextCandidateToLoad=null;
				var uidRemoved=this.collections[i].uid;
				var item=$('#ResourceCardDAVList').find('[data-id^="'+jqueryEscapeSelector(this.collections[i].uid)+'"]');
				var item_prev=item.parent().prev();

				// select the nearest candidate to load
				if((i+1)<=(this.collections.length-1))
				{
					if(this.collections[i+1].headerOnly!=true)
						nextCandidateToLoad=this.collections[i+1];
					else if((i+2)<=(this.collections.length-1))
						nextCandidateToLoad=this.collections[i+2];
				}
				if(nextCandidateToLoad==null && (i-1)>0)
				{
					if(this.collections[i-1].headerOnly!=true)
						nextCandidateToLoad=this.collections[i-1];
					else if((i-2)>0)
						nextCandidateToLoad=this.collections[i-2];
				}

				// remove the item
				item.remove();
				this.collections.splice(i,1);

				// if (next item undefined or is header) and previous item is header delete the header
				if((this.collections[i]==undefined || this.collections[i].headerOnly==true) && this.collections[i-1].headerOnly==true)
				{
					item_prev.remove();
					this.collections.splice(--i,1);
				}

				if(loadNext && this.addressbookLoaded.uid==uidRemoved)
				{
					this.addressbookLoaded=null;
					if(nextCandidateToLoad!=null)
						this.loadAddressbookByUID(nextCandidateToLoad.uid);
					else
						this.loadFirstAddressbook();
				}
				break;
			}
	}

	this.removeOldResources=function(inputUidBase, inputTimestamp)
	{
		for(var i=this.collections.length-1;i>=0;i--)
			if(this.collections[i].timestamp!=undefined && this.collections[i].uid.indexOf(inputUidBase)==0 && this.collections[i].timestamp<inputTimestamp)
			{
				var nextCandidateToLoad=null;
				var uidRemoved=this.collections[i].uid;
				var item=$('#ResourceCardDAVList').find('[data-id^="'+jqueryEscapeSelector(this.collections[i].uid)+'"]');
				var item_prev=item.parent().prev();

				// select the nearest candidate to load
				if((i+1)<=(this.collections.length-1))
				{
					if(this.collections[i+1].headerOnly!=true)
						nextCandidateToLoad=this.collections[i+1];
					else if((i+2)<=(this.collections.length-1))
						nextCandidateToLoad=this.collections[i+2];
				}
				if(nextCandidateToLoad==null && (i-1)>0)
				{
					if(this.collections[i-1].headerOnly!=true)
						nextCandidateToLoad=this.collections[i-1];
					else if((i-2)>0)
						nextCandidateToLoad=this.collections[i-2];
				}

				// remove the item
				item.remove();
				this.collections.splice(i,1);

				// if (next item undefined or is header) and previous item is header delete the header
				if((this.collections[i]==undefined || this.collections[i].headerOnly==true) && this.collections[i-1].headerOnly==true)
				{
					item_prev.remove();
					this.collections.splice(--i,1);
				}

				if(this.addressbookLoaded.uid==uidRemoved)
				{
					this.addressbookLoaded=null;
					if(nextCandidateToLoad!=null)
						this.loadAddressbookByUID(nextCandidateToLoad.uid);
					else
						this.loadFirstAddressbook();
				}
			}
	}

	this.loadFirstAddressbook=function()
	{
		if(this.addressbookLoaded==null && this.collections.length>1)
			this.loadAddressbookByUID(this.collections[1].uid);
	}

	this.loadAddressbookByUID=function(inputUID)
	{
		var tmp=inputUID.match(RegExp('(^.*/)(.*)'),'');

		for(var i=0;i<this.collections.length;i++)
			if(this.collections[i].uid!=undefined && this.collections[i].uid==tmp[1])
			{
				this.collections[i].filterUID=inputUID;
				// if the loaded collection is changed
				if(this.addressbookLoaded==null || this.addressbookLoaded.uid!=tmp[1])
				{
					this.addressbookLoaded=this.collections[i];

					// Set the current addressbook uid to data-url attribute of "add" new contact button (todo: for multicollection support move it to load contact /the new contact will be saved to the collection of the loaded contact/)
					if(this.collections[i].permissions.read_only==true)
						$('#AddContact').addClass('element_no_display');
					else
						$('#AddContact').removeClass('element_no_display');

					$('#AddContact').attr('data-url',this.collections[i].uid.replace(RegExp('[^/]+$'),''));
					// Set the current addressbook filter uid
					$('#AddContact').attr('data-filter-url',this.collections[i].filterUID);

					$('#AddContact').attr('data-account-uid',this.collections[i].accountUID);

					// remove a value from the search box + cleanup the search (part 1)
					if(typeof globalSearchAutocleanup!='undefined' && globalSearchAutocleanup==true)
					{
						$('input[data-type="search"]').val('');
						$('img[data-type="reset"]').css('display','none');
					}

//X - move to better place (now we can enable it only once)
					// enable quicksearch plugin
					if(globalQs==null)
						globalQs=$('input[data-type="search"]').quicksearch('#ABList > div.ablist_item',
						{
							delay: 250,
							hide: function(){
								var tmp=globalAddressbookList.getContactByUID($(this).attr('data-id'));
								tmp.search_hide=true;
							},
							show: function(){
								var tmp=globalAddressbookList.getContactByUID($(this).attr('data-id'));
								tmp.search_hide=false;
							},
							prepareQuery: function (val){
								return val.multiReplace(globalSearchTransformAlphabet).toLowerCase().split(' ');
							},
							onBefore: function(){
								if($('#SearchBox').find('input[data-type="search"]').val()=='')
									$('#SearchBox').find('img[data-type="reset"]').css('display','none');
								else
									$('#SearchBox').find('img[data-type="reset"]').css('display','');
							},
							onAfter: function(){
								globalAddressbookList.applyABFilter($('#AddContact').attr('data-filter-url'),false);
// maybe useful for somebody
//								if((selected_contact=$('#ABList').find('.ablist_item_selected')).length==1)
//									$('#ABList').scrollTop($('#ABList').scrollTop()+selected_contact.offset().top-$('#ABList').offset().top-$('#ABList').height()*globalKBNavigationPaddingRate);
							}
						});
					else
					{
						// remove a value from the search box + cleanup the search (part 2)
						if(typeof globalSearchAutocleanup!='undefined' && globalSearchAutocleanup==true)
							globalQs.search('');
						globalQs.cache();
					}

					// Show the progress loader ...
					if(this.collections[i].loaded==undefined || this.collections[i].loaded==false)
					{
						this.collections[i].loaded=true;	// otazka ci to dat sem alebo tam kre sa to realne nacita (ak to bude na druhom mieste, tak sa mozes stat ze user klikne vela krat a bude vela paralelnych loadov)
					}
					// Make the selected collection active
					if(!globalCardDAVInitLoad)
					{
						$('#ResourceCardDAVList').find('.resourceCardDAV_item').find('.resourceCardDAV_selected').removeClass('resourceCardDAV_selected');
						$('#ResourceCardDAVList').find('[data-id='+jqueryEscapeSelector(this.collections[i].uid)+']').addClass('resourceCardDAV_selected');

						if(this.collections[i].filterUID[this.collections[i].filterUID.length-1]!='/')
							$('#ResourceCardDAVList').find('[data-id='+jqueryEscapeSelector(this.collections[i].filterUID)+']').addClass('resourceCardDAV_selected');
					}
					// find the original settings for the resource and user (needed for syncInterval)
					var tmp=this.addressbookLoaded.accountUID.match(RegExp('^(https?://)([^@/]+(?:@[^@/]+)?)@([^/]+)(.*/)','i'));
					var resource_href=tmp[1]+tmp[3]+tmp[4];
					var resource_user=tmp[2];
					for(var i=0;i<globalAccountSettings.length;i++)
						if(globalAccountSettings[i].href==resource_href && globalAccountSettings[i].userAuth.userName==resource_user)
							var resourceSettings=globalAccountSettings[i];
				}
				else
				{
					// update the data-url for add contact (saving contact groups support)
					$('#AddContact').attr('data-filter-url',this.collections[i].filterUID);

					// update the filterUID for the currently loaded addressbook (needed for 
					//  keeping the filter active during timed resource reloads)
					this.addressbookLoaded.filterUID=this.collections[i].filterUID;
					// collection is not changed, we need to update only the group filter (last argument is true because one contact is already selected and we need to re-select the last loaded/stored contact for the collection)
					globalAddressbookList.applyABFilter(this.collections[i].filterUID, true);

					// Make the selected collection and contact group active
					if(!globalCardDAVInitLoad)
					{
						$('#ResourceCardDAVList').find('.resourceCardDAV_item').find('.resourceCardDAV_selected').removeClass('resourceCardDAV_selected');
						$('#ResourceCardDAVList').find('[data-id='+jqueryEscapeSelector(this.collections[i].uid)+']').addClass('resourceCardDAV_selected');
						$('#ResourceCardDAVList').find('[data-id='+jqueryEscapeSelector(this.collections[i].filterUID)+']').addClass('resourceCardDAV_selected');
					}
					return true;
				}
			}
	}

	this.getCollectionByUID=function(inputUID)
	{
		for(var i=0;i<this.collections.length;i++)
			if(this.collections[i].uid==inputUID)
				return this.collections[i];

		return null;
	}

	this.setCollectionFlagByUID=function(inputUID, inputFlagName, inputFlagValue)
	{
		for(var i=0;i<this.collections.length;i++)
			if(this.collections[i].uid==inputUID)
			{
				this.collections[i][inputFlagName]=inputFlagValue;
				return this.collections[i];
			}

		return null;
	}

	this.getCollectionPrivByUID=function(inputUID)
	{
		for(var i=0;i<this.collections.length;i++)
			if(this.collections[i].uid!=undefined && this.collections[i].uid==inputUID)
				return this.collections[i].permissions.read_only;

		return null;
	}

	this.getLoadedAddressbook=function()
	{
		return this.addressbookLoaded;
	}
}
