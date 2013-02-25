<h1>Forecast Alerts</h1>

<div class="ui-corner-feedback margintop5 marginbottom3 minheight Yes-NO">
    <div class="floatleft margin-set-default"><strong>Notifications:</strong></div>
    <div class="floatright">
        <select name="forecastAlertSlider" id="forecastAlertSlider" data-role="slider">
            {{#notifications}}
                <option value="{{value}}">{{label}}</option>
            {{/notifications}}
        </select>
    </div>
</div>

<div class="ui-grid-a search_drop_grid margin-bottom">
    <div class="ui-block-a">
        <span class="widthmax label-for-text-field">
            <strong class="text-normal">Location:</strong>
        </span>
    </div>
    <div class="ui-block-b searchfieldtable">
        <div class="select-drop drop_lable">
            <input name="alertLocation" id="alertLocation" type="text" class="text-input-box" value="" />
        </div>
    </div>
</div>

<div class="ui-grid-a search_drop_grid margin-bottom">
    <div class="ui-block-a">
        <span class="widthmax">
            <strong class="text-normal">Fuel Type:</strong>
        </span>
    </div>
    <div class="ui-block-b searchfieldtable">
        <div class="select-drop drop_lable">
            <select name="alertFuelType" id="alertFuelType">
                {{#fuelType}}
                    <option value="{{value}}">{{label}}</option>
                {{/fuelType}}
            </select>
        </div>
    </div>
</div>

<div class="ui-grid-a search_drop_grid margin-bottom-extra">
    <div class="ui-block-a">
        <span class="widthmax">
            <strong class="text-normal">Forecast Change:</strong>
        </span>
    </div>
    <div class="ui-block-b searchfieldtable">
        <div class="select-drop drop_lable">
            <select name="alertForecastChange" id="alertForecastChange">
                {{#forecastChange}}
                    <option value="{{value}}">{{label}}</option>
                {{/forecastChange}}
            </select>
        </div>
    </div>
</div>