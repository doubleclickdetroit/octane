define(function(require) {

    'use strict';


    var globals;
    globals = {};

    /*
     * Environment
    */
    globals.ENVIRONMENT = {
        'DEV' : '',
        'UAT' : 'uat.',
        'PROD': ''
    };

    /*
     * App
    */
    globals.APP = {
        'NAME'       : 'Octane',
        'VERSION'    : '3.0',
        'ENVIRONMENT': globals.ENVIRONMENT.DEV,
        'EMAIL_ADDRESS_VALIDATION_PATTERN': '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$',
        'ZIP_CODE_PATTERN'                : '/\\d{5}-\\d{4}|\\d{5}|[A-Z]\\d[A-Z] \\d[A-Z]\\d/'
    };

    /*
     * Defaults
    */
    globals.DEFAULT = {
        'PAGE_TRANSITION': 'none',
        'LOCATION'       : '04101',
        'FUEL_TYPE'      : 'Gasoline',
        'FUEL_TYPE_GRADE': 'Unleaded Regular',
        'SORT_BY'        : 'Price',
        'START_LOCATION' : 'currentLocation',
        'FILETYPE_NORMAL': '.png',
        'FILETYPE_RETINA': '@2x.png',
        'UNDEFINED'      : undefined,
        'EMPTY_STRING'   : ''
    };

    /*
     * Brands
    */
    globals.BRANDS                  = require('brands');
    globals.BRANDS['UNBRANDED']     = 'generic';
    globals.BRANDS['GENERAL_LOGO']  = 'generic';
    globals.BRANDS['USER_LOCATION'] = 'currentlocation';

    /*
     * Database
    */
    globals.DATABASE = {
        'DATABASE_NAME'        : 'Database',
        'DATABASE_VERSION'     : '1.0',
        'DATABASE_DISPLAY_NAME': 'octane',
        'TIMEOUT'              : 200000,
        'SUCCESS'              : 'Database operation successful.'
    };

    /*
     * Media Queries
    */
    globals.MEDIA_QUERY = {
        'MOBILE': 'screen and (min-width: 320px)',
        'RETINA': 'screen and (-webkit-min-device-pixel-ratio: 2)'
    };

    /*
     * Fuel Type
    */
    globals.FUEL_TYPE = {};
    globals.FUEL_TYPE.constants = {
        'GASOLINE': globals.DEFAULT.FUEL_TYPE,
        'DIESEL'  : 'Diesel'
    };
    globals.FUEL_TYPE.configuration = {
        'GASOLINE': {
            'label': globals.FUEL_TYPE.constants.GASOLINE,
            'value': globals.FUEL_TYPE.constants.GASOLINE
        },
        'DIESEL': {
            'label': globals.FUEL_TYPE.constants.DIESEL,
            'value': globals.FUEL_TYPE.constants.DIESEL
        }
    };

    /*
     * Sort By
    */
    globals.SORT_BY = {};
    globals.SORT_BY.constants = {
        'PRICE'   : globals.DEFAULT.SORT_BY,
        'DISTANCE': 'Distance'
    };
    globals.SORT_BY.configuration = {
        'PRICE': {
            'label'  : globals.SORT_BY.constants.PRICE,
            'value'  : globals.SORT_BY.constants.PRICE,
            'default': globals.DEFAULT.SORT_BY === globals.SORT_BY.constants.PRICE
        },
        'DISTANCE': {
            'label'  : globals.SORT_BY.constants.DISTANCE,
            'value'  : globals.SORT_BY.constants.DISTANCE,
            'default': globals.DEFAULT.SORT_BY === globals.SORT_BY.constants.DISTANCE
        }
    };

    /*
     * Rate the App
     */
     globals.RATE_IT = {
        'MESSAGE'          : 'If you like Octane, please rate it. Thanks for your support!',
        'URL_IOS'          : 'itms://itunes.apple.com/us/app/octane/id480887516?ls=1&mt=8',
        'URL_ANDROID'      : 'market://details?id=com.wex.octane',
        'APPLICATION_COUNT': 'appOpenCount',
        'BUTTON_NAMES'     : 'Rate It,Remind Me Later, No Thanks',
        'TITLE'            : 'Rate Octane',
        'NO_THANKS'        : 'noThanks',
        'LATER'            : 'later',
        'IS_RATED'         : 'isRated'
     };

    /*
     * Webservices
    */
    globals.WEBSERVICE = {
        'ROOT_URL': 'https://'+ globals.APP.ENVIRONMENT +'account.wexmobile.com/mobileweb/siteLocator'
    };
    // Fuelsites
    globals.WEBSERVICE.FUEL_SITE = {
        'URL'         : globals.WEBSERVICE.ROOT_URL + '/fuelSites',
        'FUEL_SITES'  : '/fuelSites',
        'LONGITUDE'   : '/longitude/',
        'LATITUDE'    : '/latitude/',
        'RADIUS'      : '/radius/' ,
        'FUEL_TYPE'   : '/fuelType/',
        'SORT_BY'     : '/sortBy/',
        'FILTER_TODAY': '/filterToday/',
        'PAGE_NUMBER' : '/pageNumber/',
        'PAGE_SIZE'   : '/pageSize/',
        'BRAND'       : '?brand='
    };
    // Feedback
    globals.WEBSERVICE.FEEDBACK = {
    	'URL'     : globals.WEBSERVICE.ROOT_URL + '/feedback',
    	'SUBJECT' : 'OCTANE FEEDBACK'
    };
    // FuelTypes
    globals.WEBSERVICE.FUEL_TYPES = {
        'URL' : globals.WEBSERVICE.ROOT_URL + '/fuelTypes'
    };
    // Brands
    globals.WEBSERVICE.BRANDS = {
        'URL' : globals.WEBSERVICE.ROOT_URL + '/limitedBrands'
    };

    /*
     * Search Details
    */
    globals.SEARCH_DETAILS = {
        'START_LOCATION' : globals.DEFAULT.START_LOCATION,
        'RADIUS'         : '5.0',
        'FUEL_TYPE'      : globals.DEFAULT.FUEL_TYPE_GRADE,
        'SORT_BY'        : globals.DEFAULT.SORT_BY,
        'FILTER_TODAY'   : 'no',
        'PAGE_NUMBER'    : 0,
        'PAGE_SIZE'      : 10,
        'BRAND'          : 'All',
        'UPDATED_RESULT' : globals.DEFAULT.EMPTY_STRING,
        'LIMIT_RESULT'   : globals.DEFAULT.EMPTY_STRING,
        'FAVORITES_NAME' : globals.DEFAULT.EMPTY_STRING,
        'VIEW_MODE'      : 'default'
    };

    /*
     * Connectivity
    */
    globals.CONNECTIVITY = {
        'NONE'    : 'No network',
        'UNKNOWN' : 'Unknown connection',
        'ETHERNET': 'Ethernet connection',
        'WIFI'    : 'WiFi connection',
        'CELL_2G' : 'Cell 2G connection',
        'CELL_3G' : 'Cell 3G connection',
        'CELL_4G' : 'Cell 4G connection'
    };

    /*
     * Page :: Search
    */
    globals.search = {};
    globals.search.constants = {
        'VIEW_MODE': globals.SEARCH_DETAILS.VIEW_MODE,
        'SEARCH_BY_ADDRESS'         : 'enterLocation',
        'SEARCH_BY_CURRENT_LOCATION': 'currentLocation',
        'DEFAULT_SEARCH_YES' : 'YES',
        'DEFAULT_SEARCH_NO'  : 'NO',
        'NAME_SEARCH_BY'     : 'searchBy',
        'NAME_LOCATION'      : 'location',
        'NAME_RADIUS'        : 'radius',
        'NAME_FUEL_TYPE'     : 'fuelType',
        'NAME_BRAND'         : 'brand',
        'NAME_SORT_BY'       : 'sortBy',
        'NAME_DEFAULT_SEARCH': 'setDefault',
        'INVALID_LOCATION_MESSAGE': 'Current location cannot be found. Please enter a location.'
    };
    globals.search.configuration = {
        'searchBy': [
            {
                'label'  : 'Current location',
                'value'  : globals.search.constants.SEARCH_BY_CURRENT_LOCATION,
                'id'     : 'searchByRadio1',
                'name'   : globals.search.constants.NAME_SEARCH_BY,
                'default': true
            },
            {
                'label': 'Enter location',
                'value': 'enterLocation',
                'id'   : 'searchByRadio2',
                'name'   : globals.search.constants.NAME_SEARCH_BY,
                'default': false
            }
        ],
        'location': {
            'name': globals.search.constants.NAME_LOCATION
        },
        'radius': {
            'label' : 'Radius',
            'name'  : globals.search.constants.NAME_RADIUS,
            'values': [
                {
                    'label': '5 Miles',
                    'value': '5.0'
                },
                {
                    'label': '7.5 Miles',
                    'value': '7.5'
                },
                {
                    'label': '10 Miles',
                    'value': '10'
                },
                {
                    'label': '15 Miles',
                    'value': '15'
                },
                {
                    'label': '20 Miles',
                    'value': '20'
                },
                {
                    'label': '30 Miles',
                    'value': '30'
                }
            ]
        },
        'fuelType': {
            'label' : 'Fuel Type',
            'name'  : globals.search.constants.NAME_FUEL_TYPE,
            'values': []
        },
        'brand': {
            'label' : 'Brand',
            'name'  : globals.search.constants.NAME_BRAND,
            'values': []
        },
        'sortBy': {
            'label' : 'Sort by',
            'name'  : globals.search.constants.NAME_SORT_BY,
            'values': [
                globals.SORT_BY.configuration.PRICE,
                globals.SORT_BY.configuration.DISTANCE
            ]
        },
        'defaultSearch': {
            'label' : 'Set as default search',
            'name'  : globals.search.constants.NAME_DEFAULT_SEARCH,
            'values': [
                {
                    'label': 'NO',
                    'value': globals.search.constants.DEFAULT_SEARCH_NO
                },
                {
                    'label': 'YES',
                    'value': globals.search.constants.DEFAULT_SEARCH_YES
                }
            ]
        }
    };

    /*
     * Page :: Alerts
    */
    globals.alerts = {};
    globals.alerts.constants = {
        'LOCATION'               : globals.DEFAULT.LOCATION,
        'DEFAULT_FUEL_TYPE'      : globals.DEFAULT.FUEL_TYPE,
        'DEFAULT_FORECAST_CHANGE': 'Strongly',
        'ALERT_ENABLED'          : 'On',
        'ALERT_DISABLED'         : 'Off'
    };
    globals.alerts.configuration = {
        'notifications': [
            {
                'label': 'OFF',
                'value': globals.alerts.constants.ALERT_DISABLED
            },
            {
                'label': 'ON',
                'value': globals.alerts.constants.ALERT_ENABLED
            }
        ],
        'fuelType': [
            globals.FUEL_TYPE.configuration.GASOLINE,
            globals.FUEL_TYPE.configuration.DIESEL
        ],
        'forecastChange': [
            {
                'label': 'Strongly Up or Down',
                'value': globals.alerts.constants.DEFAULT_FORECAST_CHANGE
            },
            {
                'label': 'Slightly Up or Down',
                'value': 'Slightly'
            }
        ]
    };

    /*
     * Page :: Forecast
    */
    globals.forecast = {};
    globals.forecast.constants = {
        'LOCATION'          : globals.DEFAULT.LOCATION,
        'DEFAULT_FUEL_TYPE' : globals.DEFAULT.FUEL_TYPE,
        'DATA_INDICATOR_KEY': 'data-indicator',
        'DISCLAIMER_TEXT'   : 'Lorem ipsum dolor sit amet, consectetur adispisicing elit.'
    };
    globals.forecast.configuration = {
        'fuelType': [
            {
                'label' : globals.FUEL_TYPE.configuration.GASOLINE.label,
                'value' : globals.FUEL_TYPE.configuration.GASOLINE.value,
                'grades': [
                    globals.DEFAULT.UNDEFINED,
                    'Gasoline',
                    'Unleaded Regular',
                    'Unleaded Plus',
                    'Unleaded Premium'
                ]
            },
            {
                'label' : globals.FUEL_TYPE.configuration.DIESEL.label,
                'value' : globals.FUEL_TYPE.configuration.DIESEL.value,
                'grades': [
                    'Diesel',
                    'Diesel Regular',
                    'Diesel Premium'
                ]
            }
        ],
        'disclaimer': globals.forecast.constants.DISCLAIMER_TEXT,
        'dataIndicator': globals.forecast.constants.DATA_INDICATOR_KEY
    };

    /*
     * Page :: Fuelsites
    */
    globals.fuelsites = {};
    globals.fuelsites.constants = {
        'WEBSERVICE'   : globals.WEBSERVICE.FUEL_SITE,
        'VIEW_MODE'    : globals.SEARCH_DETAILS.VIEW_MODE, // fuelsites is default view_mode for search details
        'DEFAULT_BRAND': globals.SEARCH_DETAILS.BRAND,     // fuelsites has the default brand
        'IMG_PATH'     : 'img/',
        'MARKER_PATH'  : 'img/map_marker/',
    };
    globals.fuelsites.configuration = {
        'sortBy': {
            'title'  : 'Sort by',
            'buttons': [
                {
                    'id'   : 'a',
                    'label': globals.SORT_BY.configuration.PRICE.label,
                    'type' : 'button',
                    'close': true
                },
                {
                    'id'   : 'b',
                    'label': globals.SORT_BY.configuration.DISTANCE.label,
                    'type' : 'button',
                    'close': true
                }
            ]
        },
        'marker': {
            'shape': {
                'type' : 'rect',
                'coord': [1, 1, 40, 43]
            }
        },
        'bubble': {
            'shadowStyle'        : 1,
            'padding'            : 0,
            'backgroundColor'    : 'rgb(57,57,57)',
            'borderRadius'       : 4,
            'arrowSize'          : 10,
            'borderWidth'        : 1,
            'borderColor'        : '#2c2c2c',
            'disableAutoPan'     : true,
            'hideCloseButton'    : false,
            'closeBoxMargin'     : '10px 2px 2px 2px',
            'arrowPosition'      : 30,
            'backgroundClassName': 'phoney',
            'arrowStyle'         : 2,
            'closeBoxURL': globals.fuelsites.constants.IMG_PATH + 'close_button.png'
        }
    };

    /*
     * Page :: Favorites
    */
    globals.favorites = {};
    globals.favorites.constants = {
        VIEW_MODE         : 'favorites',
        CLASSNAME_EDITABLE: 'ui-editable-favorite',
        CONFIRM_MESSAGE   : 'Are you sure you want to remove this favorite?'
    };
    globals.favorites.configuration = {
        'save': {
            'title': 'Save Search',
            'error': 'Search Name is required.',
            'buttons': [
                {
                    'id'   : 'a',
                    'label': 'Save',
                    'type' : 'submit',
                    'close': false
                },
                {
                    'id'   : 'b',
                    'label': 'Cancel',
                    'type' : 'button',
                    'close': true
                }
            ],
            'fields': [
                {
                    'type'       : 'text',
                    'placeholder': 'Enter Search Name'
                }
            ]
        },
        'confirm': {
            'message': globals.favorites.constants.CONFIRM_MESSAGE
        },
        'editable': {
            'done': 'Done',
            'edit': 'Delete'
        }
    };

    /*
     * Page :: Feedback
     */
    globals.feedback = {};
    globals.feedback.constants = {
    	'WEBSERVICE': globals.WEBSERVICE.FEEDBACK,
        'CONFIRMATION_TITLE'           : 'Feedback',
        'CONFIRMATION_BUTTON'          : 'OK',
        'CONFIRMATION_SUCCESS_TEXT'    : 'Thank you for your feedback.',
        'ERROR_ALL_FIELDS_REQUIRED'    : 'All fields are required',
        'ERROR_EMAIL_REQUIRED_FIELD'   : 'Email is required',
        'ERROR_FEEDBACK_REQUIRED_FIELD': 'Message is required',
        'ERROR_EMAIL_INVALID'          : 'Invalid Email Address'
    };
    globals.feedback.configuration = {
        'sender': {
        	'label'      : '',
        	'placeholder': 'Enter Email',
        	'value'      : ''
        },
        'messageBody': {
        	'label'      : '',
        	'placeholder': 'Enter Message',
        	'value'      : ''
        }
    };


    return globals;
});
