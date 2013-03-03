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
        'PAGE_TRANSITION': 'none'
    };

    /*
     * Database
    */
    globals.Database = {
        'DATABASE_NAME'        : 'Database',
        'DATABASE_VERSION'     : '1.0',
        'DATABASE_DISPLAY_NAME': 'octane',
        'TIMEOUT'              : 200000,
        'SUCCESS'              : 'Database operation successful.'
    };

    /*
     * Page :: Alerts
    */
    globals.alerts = {};
    globals.alerts.constants = {
        'LOCATION'               : '04101',
        'DEFAULT_FUEL_TYPE'      : 'Gasoline',
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
        'LOCATION'          : '04101',
        'DEFAULT_FUEL_TYPE' : 'Gasoline',
        'DATA_INDICATOR_KEY': 'data-indicator',
        'DISCLAIMER_TEXT'   : 'Lorem ipsum dolor sit amet, consectetur adispisicing elit.'
    };
    globals.forecast.configuration = {
        'fuelType': [
            {
                'label' : 'Gasoline',
                'value' : globals.forecast.constants.DEFAULT_FUEL_TYPE,
                'grades': [
                    'Unleaded Regular',
                    'Unleaded Plus',
                    'Unleaded Premium'
                ]
            },
            {
                'label' : 'Diesel',
                'value' : 'Diesel',
                'grades': [
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