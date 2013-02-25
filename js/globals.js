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
        'PAGE_TRANSITION': 'slide'
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


    return globals;
});