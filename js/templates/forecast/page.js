<div class="margin-bottom" id="forecastIndicator" {{dataIndicator}}="loading"></div>

<div class="ui-grid-a search_drop_grid margin-bottom">
    <div class="ui-block-a">
        <span class="widthmax label-for-text-field">
            <strong class="text-normal">Location:</strong>
        </span>
    </div>
    <div class="ui-block-b searchfieldtable">
        <div class="select-drop drop_lable">
            <input name="forecastLocation" id="forecastLocation" type="text" class="text-input-box" value="04101" />
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
            <select name="forecastFuelType" id="forecastFuelType">
                {{#fuelType}}
                    <option value="{{value}}">{{label}}</option>
                {{/fuelType}}
            </select>
        </div>
    </div>
</div>

<div class="margin-bottom-extra">
    <div class="button_conntainer_sub">
        <div class="button_conntainer_sub_btn">
            <button type="button" data-role="button" data-theme="a">Submit</button>
        </div>
    </div>
</div>

<div class="ui-body ui-body-b text-center">
    <small>{{disclaimer}}</small>
</div>