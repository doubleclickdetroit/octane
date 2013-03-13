define([ 'jquery', 'libs/jquery/jquery.timeago' ],
function($) {

    'use strict';


    var mixin = {};

    // ppg formatting
    mixin.format_ppg = function() {
        return function (text, render) {
            var ppg = this.ppg;
            if (!ppg) return '&nbsp;';
            return parseFloat(ppg).toFixed(2) + ppg.substring(ppg.indexOf('.')+3).sup();
        }
    };

    // time formatting
    mixin.format_time = function() {
        return function(text, render) {
            var time = this.transactionTime;
            return (this.ppg && time) ? $.timeago(new Date(parseInt(time))) : 'Unavailable';
        }
    };


    return mixin;
});