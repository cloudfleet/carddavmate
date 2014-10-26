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

// globalAccountSettings must be an array (can be undefined if you use globalNetworkCheckSettings or globalNetworkAccountSettings)
//  the href value is a "principal URL" - the last character in href must be '/'
//    principal URL != collection URL -> the client automatically detects collections for each principal URL
//    PROPER principal URL looks like:
//      https://server.com:8443/principals/users/USER/
//      https://server.com:8443/caldav.php/USER/
//    INVALID principal URL looks like:
//      https://server.com:8443/principals/users/USER/collection/	<- url to collection
//      https://server.com:8443/caldav.php/USER/collection/		<- url to collection
//      https://server.com:8443/principals/users/USER			<- missing '/'
//      https://server.com:8443/caldav.php/USER				<- missing '/'
// the hrefLabel sets the server name in the resource header - useful if your server name is 'something.server.com' and you want to see only the 'something' as the server name; if undefined, empty or or null, href value is used (see above)
// the crossDomain sets jQuery ajax crossDomain value (must be true if your installation has not the same [protocol,hostname,port] as your server - by default null = autodetect /detected setting is shown in the console/)
// the forceReadOnly sets the resource or list of collections as "read-only" - if true then the whole resource will be "read-only"; if an array of URL encoded collections or regexes (for example: ['/caldav.php/user/calendar/', '/caldav.php/user%40domain.com/calendar/', new RegExp('^/caldav.php/user/calendar[0-9]/$', 'i')]) then specified collections will be marked as "read-only"; if null (default), unset or unknown then server detected privileges are used
// the withCredentials sets jQuery's ajax withCredentials value for cross domain queries (if true, Access-Control-Allow-Origin "*" is not allowed)
// the syncInterval sets how often (in miliseconds) to asynchronously sync the active collection on background (but only if the browser window has focus or globalBackgroundSync is set to true /default/)
// the timeOut sets the timeout for jQuery .ajax call (in miliseconds)
// the lockTimeOut sets the LOCK Timeout value if resource locking is used (in miliseconds)
// the showHeader shows (true) or hides (false) the resource header in the interface
// the settingsAccount sets the account where client properties are saved during logout and resource synchronisation (note: set it to true only for ONE account)
// the checkContentType enables content-type checking for server response (only objects with proper content-type are inserted into interface) - if you cannot see data in the interface you may try to disable it (useful if your server return wrong value in "propstat/prop/getcontenttype"); if undefined content-type checking is enabled
// the delegation sets additional delegated resources - if true then delegation is enabled for all available resources; if false (default) then delegation is disabled; if an array of URL encoded resources or regexes (for example: ['/caldav.php/user/', '/caldav.php/user%40domain.com/', new RegExp('^/caldav.php/a[b-x].+/$', 'i')] then delegation is enabled for all specified resources
//var globalAccountSettings=[{href: 'https://server1.com:8443/caldav.php/USERNAME1/', hrefLabel: null, crossDomain: null, forceReadOnly: null, withCredentials: false, showHeader: true, settingsAccount: true, checkContentType: true, userAuth: {userName: 'USERNAME1', userPassword: 'PASSWORD1'}, syncInterval: 60000, timeOut: 30000, lockTimeOut: 10000, delegation: false}, {href: 'https://server1.com:8443/principals/users/USERNAME2/', hrefLabel: null, crossDomain: null, forceReadOnly: null, withCredentials: false, showHeader: true, settingsAccount: false, checkContentType: true, userAuth: {userName: 'USERNAME2', userPassword: 'PASSWORD2'}, syncInterval: 60000, timeOut: 30000, lockTimeOut: 10000, delegation: false}];

// if set, the client authenticates against the href URL (the last character in href must be '/') and if the authentication is successful it appends the USER + '/' to end of href and sets the userAuth: {userName: USER, userPassword: PASSWORD}
// then the client uses the modified globalNetworkCheckSettings in the same way as the globalAccountSettings
// this option ivokes a login screen and disallows access until successfull authentication
// the additionalResources array can contain additional resources (shared resources accessible by all users), for example: additionalResources: ['company','customers'] ... href values for these resources are created in the same way as described above for the USER
// see globalAccountSettings for more information
// Lion server example (http + https setup; see misc/readme_lion.txt for server setup):
//var globalNetworkCheckSettings={href: 'http://lion.server.com:8008/principals/users/', hrefLabel: null, crossDomain: null, additionalResources: [], forceReadOnly: null, withCredentials: false, showHeader: true, settingsAccount: true, syncInterval: 60000, timeOut: 30000, lockTimeOut: 10000, delegation: false}
//var globalNetworkCheckSettings={href: 'https://lion.server.com:8443/principals/users/', hrefLabel: null, crossDomain: null, additionalResources: [], forceReadOnly: null, withCredentials: false, showHeader: true, settingsAccount: true, syncInterval: 60000, timeOut: 30000, lockTimeOut: 10000, delegation: false}
// DAViCal example (for cross-domain setup see misc/config_davical.txt):
//var globalNetworkCheckSettings={href: 'http://davical.server.com:8080/caldav.php/', hrefLabel: null, crossDomain: null, additionalResources: [], forceReadOnly: null, withCredentials: false, showHeader: true, settingsAccount: true, syncInterval: 60000, timeOut: 30000, lockTimeOut: 10000, delegation: false}
// Davical example (client installed into Davical subdirectory - works out of the box, no additional setup required):
var globalNetworkCheckSettings={href: location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '')+location.pathname.replace(RegExp('/+[^/]+/*(index\.html)?$'),'')+'/caldav.php/', hrefLabel: null, crossDomain: null, additionalResources: [], forceReadOnly: null, withCredentials: false, showHeader: true, settingsAccount: true, checkContentType: true, syncInterval: 60000, timeOut: 30000, lockTimeOut: 10000, delegation: false}

// if set, the configuration is loaded from the network (using HTTP auth) - the returned configuration XML settings are added
//  to globalAccountSettings ... it is possible to combine this option with the globalAccountSettings although it is not recommended
// this option ivokes a login screen and disallows access until the client get correct XML configuration file from the server
// the syncInterval is currently unused (the configuration XML is loaded only once)
// the timeOut sets the timeout for jQuery .ajax call (in miliseconds)
//var globalNetworkAccountSettings={href: 'https://www.config-server.com/auth/', crossDomain: null, withCredentials: false, syncInterval: 0, timeOut: 30000};
// default configuration if the auth module is located in the currect subdirectory
//var globalNetworkAccountSettings={href: location.protocol+'//'+location.hostname+(location.port ? ':'+location.port : '')+location.pathname.replace(RegExp('index\.html$'),'')+'auth/', crossDomain: false, withCredentials: false, syncInterval: 0, timeOut: 30000};

// use jQuery .ajax() auth or custom header for HTTP basic auth (default)
// set this option to true if your server uses digest auth (note: you may experience auth popups on some browsers)
//  if undefined (or empty), custom header for HTTP basic auth is used
//var globalUseJqueryAuth=false;

// default interface language - see localization.js
//  supported languages (note: value is case sensitive):
//   cs_CZ (Čeština [Czech])
//   da_DK (Dansk [Danish]; thanks Niels Bo Andersen)
//   fr_FR (Français [French]; thanks John Fischer)
//   de_DE (Deutsch [German]; thanks Marten Gajda and Thomas Scheel)
//   en_US (English [English/US])
//   it_IT (Italiano [Italian]; thanks Luca Ferrario)
//   hu_HU (Magyar [Hungarian])
//   nl_NL (Nederlands [Dutch]; thanks Johan Vromans)
//   sk_SK (Slovenčina [Slovak])
//   tr_TR (Türkçe [Turkish]; thanks Selcuk Pultar)
var globalInterfaceLanguage='en_US';

// if defined and not empty then only languages listed here are shown at the login screen (for example: ['en_US','sk_SK']),
//  otherwise (default) all languages are shown
//  values in the array must refer to an existing localization defined in the common.js (see the option above)
var globalInterfaceCustomLanguages=[];

// JavaScript localeCompare() or custom alphabet for data sorting
//  custom alphabet is used by default because the JavaScript localeCompare() not support collation and often returns "wrong" result
//var globalSortAlphabet=null;	// use localeCompare()
var globalSortAlphabet=' 0123456789AÀÁÂÄÆÃÅĀBCÇĆČDĎEÈÉÊËĒĖĘĚFGĞHIÌÍÎİÏĪĮJKLŁĹĽMNŃÑŇOÒÓÔÖŐŒØÕŌPQRŔŘSŚŠȘșŞşẞTŤȚțŢţUÙÚÛÜŰŮŪVWXYÝŸZŹŻŽaàáâäæãåābcçćčdďeèéêëēėęěfgğhiìíîïīįıjklłĺľmnńñňoòóôöőœøõōpqrŕřsśšßtťuùúûüűůūvwxyýÿzźżž';	// use custom alphabet sorting (note: the first character is "space")
// search functionality character equivalence (transformation to ASCII: key = regex text, value = result character)
var globalSearchTransformAlphabet={'[ÀàÁáÂâÄäÆæÃãÅåĀā]': 'a', '[ÇçĆćČč]': 'c', '[Ďď]': 'd', '[ÈèÉéÊêËëĒēĖėĘęĚě]': 'e', '[Ğğ]': 'g', '[ÌìÍíÎîİıÏïĪīĮį]': 'i', '[ŁłĹĺĽľ]': 'l', '[ŃńÑñŇň]': 'n', '[ÒòÓóÔôÖöŐőŒœØøÕõŌō]': 'o', '[ŔŕŘř]': 'r', '[ŚśŠšȘșŞşẞß]': 's', '[ŤťȚțŢţ]': 't', '[ÙùÚúÛûÜüŰűŮůŪū]': 'u', '[ÝýŸÿ]': 'y', '[ŹźŻżŽž]': 'z'};

// update notification will be shown only to users with login names defined in this array (for example: ['admin','peter'])
//  if undefined (or empty), update notifications will be shown to all users
var globalNewVersionNotifyUsers=[];

// set the datepicker format (see http://docs.jquery.com/UI/Datepicker/formatDate for valid values)
// note: date format is now predefined for each localization - use this option only if you want to use custom date format instead of the predefined one
//var globalDatepickerFormat='dd.mm.yy';

// set the datepicker first day of the week: Sunday is 0, Monday is 1, etc.
var globalDatepickerFirstDayOfWeek=1;

// editor hide information message (success, error) after X miliseconds
var globalHideInfoMessageAfter=1800;

// editor fade in/out animation duration (editing or saving)
var globalEditorFadeAnimation=750;

// if more than one resource (server account) is configured, sort resources alphabetically?
var globalResourceAlphabetSorting=true;

// show login names in resource header information?
var globalResourceHeaderShowLogin=true;

// asynchronously sync resources on background every X miliseconds (used for detection of collection changes in resources)
var globalSyncResourcesInterval=300000;

// enable background sync even if browser window has no focus (if false, sync is performed only if browser window/tab is focused)
//  if undefined or not false, background sync is enabled
var globalBackgroundSync=true;

// enable keyboard navigation?
//  if undefined or not false, keyboard navigation is enabled
var globalEnableKbNavigation=true;

// where to store user settings such as: active view, selected calendars, ... (we store them into DAV property on the server)
// note: not all servers support storing DAV properties (some servers support only subset /or none/ of these URLs)
//  if 'principal-URL', '', null or undefined (default) - settings are stored to principal-URL
//  if 'addressbook-home-set' - settings are are stored to addressbook-home-set
//var globalSettingsType='';

// automatic search filter cleanup on collection (not vCard group) change?
//  if undefined or not true automatic cleanup is disabled
var globalSearchAutocleanup=false;

// compatibility settings
//  anniversaryOutputFormat:
//  different clients use different (and incompatible) approach to store anniversary date in vCard
//   Apple stores this attribute as 'itemX.X-ABDATE;TYPE=pref:2000-01-01\r\nitemX.X-ABLabel:_$!<Anniversary>!$_\r\n'
//   other clients store this attribute as 'X-ANNIVERSARY:2000-01-01\r\n'
//  choose 'apple' or 'other' (lower case) for your 3rd party client compatibility (you can chose both: ['apple', 'other'] but it can cause many problems in the future, for example: duplicate anniversary dates, invalid/old anniversary date in your clients, and many others ...)
var globalCompatibility={anniversaryOutputFormat: ['apple']}

// set the collection sorting and displaying - set an array of values/variables for each option (see the NOTE below)
//  possible variables in values: last, middle, first, prefix, suffix
// NOTE: in globalCollectionDisplay and globalContactStoreFN you also need to define a separator in the array values
// for example:
//   the default value is globalCollectionDisplay=['last',' middle',' first'] (space in the second and third elements)
// if you want comma separator between last, middle and firstname in the interface you should use:
//   globalCollectionDisplay=['last',', middle',', first'] (comma and space in the second and third elements)
var globalCollectionSort=['last','middle','first'];		// do not use separators here (use only an array of variables)
var globalCollectionDisplay=['last',' middle',' first'];
var globalContactStoreFN=['prefix',' last',' middle',' first',' suffix'];

// display "company name" (ORG attribute) for company contacts (true) or use N/FN instead
//  if undefined or not false, it is enabled by default
var globalCollectionDisplayOrg=true;

// set the URI handlers for EMAIL, TEL, URL and X-SOCIALPROFILE attributes (set to null or comment out to disable)
var globalUriHandlerTel='tel:';	// if 'tel' is not supported by system/browser, you can use 'callto' or 'skype'
var globalUriHandlerEmail='mailto:';
var globalUriHandlerUrl='http://';	// the value is used only if no URI handler is defined in the URL
var globalUriHandlerProfile={'twitter': 'http://twitter.com/%u', 'facebook': 'http://www.facebook.com/%u', 'flickr': 'http://www.flickr.com/photos/%u', 'linkedin': 'http://www.linkedin.com/in/%u', 'myspace': 'http://www.myspace.com/%u', 'sinaweibo': 'http://weibo.com/n/%u'}

// default country for new address fields (must be defined in addressTypes variable - see common.js)
var globalDefaultAddressCountry='us';
// if there is no X-ABADR defined for the ADR attribute and the country name not matches any country name defined in the common.js the globalDefaultAddressCountry is used unless you define alternativne country names here
//  the country must refer to an existing country defined in the common.js and the regex is any regex string which matches the given country (note: regex match is case insensitive)
var globalAddressCountryEquivalence=[{country: 'de', regex: '^\\W*Deutschland\\W*$'}, {country: 'sk', regex: '^\\W*Slovensko\\W*$'}];
// countries listed here are shown at the top of the ADR country list (for example: ['de','sk'])
//  values in the array must refer to an existing country defined in the common.js
var globalAddressCountryFavorites=[];

// set addressbook to be selected by default after login (URL encoded path to the addressbook, for example: 'USER/addressbook/')
// if empty or undefined the first available addressbook is selected automatically
//var globalAddressbookSelected='';
