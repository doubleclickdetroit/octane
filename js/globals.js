define(function(require) {

    'use strict';


    var globals;
    globals = {};

    /*
     * App
    */
    globals.APP = {
        'NAME'   : 'Octane',
        'VERSION': '1.0'
    };

    /*
     * Defaults
    */
    globals.DEFAULT = {
        'PAGE_TRANSITION': 'none',
        'LOCATION'       : '04101',
        'FUEL_TYPE'      : 'Gasoline',
        'UNDEFINED'      : undefined
    };

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
            {
                'label': 'Gasoline',
                'value': globals.alerts.constants.DEFAULT_FUEL_TYPE
            },
            {
                'label': 'Diesel',
                'value': 'Diesel'
            }
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
                'label' : 'Gasoline',
                'value' : globals.forecast.constants.DEFAULT_FUEL_TYPE,
                'grades': [
                    globals.DEFAULT.UNDEFINED,
                    'Gasoline',
                    'Unleaded Regular',
                    'Unleaded Plus',
                    'Unleaded Premium'
                ]
            },
            {
                'label' : 'Diesel',
                'value' : 'Diesel',
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


    return globals;
});