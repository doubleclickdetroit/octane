<div data-role="fieldcontain" class="searchBy_location">
    <fieldset class="searchBy" data-role="controlgroup" data-type="horizontal">
        {{#searchBy}}
            <input type="radio" name="{{name}}" id="{{id}}" value="{{value}}" {{#default}}checked="checked"{{/default}} />
            <label for="{{id}}" class="ui-icon-location searchtext">{{label}}</label>
        {{/searchBy}}
    </fieldset>

    <fieldset data-role="controlgroup">
    {{#location}}
        <input id="locationSearch" name="{{name}}" type="text" class="text-input-box" />
    {{/location}}
    </fieldset>

    <div class="ui-grid-a search_drop_grid">
    {{#radius}}
        <div class="ui-block-a">
            <span class="widthmax">
                <strong>{{label}}:</strong>
            </span>
        </div>
        <div class="ui-block-b searchfieldtable">
            <div class="select-drop radiusSelector drop_lable">
                <select id="radiusSelector" name="{{name}}">
                {{#values}}
                    <option value="{{value}}">{{label}}</option>
                {{/values}}
                </select>
            </div>
         </div>
     {{/radius}}
    </div>

    <div class="ui-grid-a search_drop_grid">
    {{#fuelType}}
        <div class="ui-block-a">
            <span class="widthmax">
                <strong>{{label}}:</strong>
            </span>
        </div>
        <div class="ui-block-b searchfieldtable">
            <span class="select-drop select-fuel">
                <select id="fuelTypesSelector" name="{{name}}">
                {{#values}}
                    <option value="{{value}}">{{label}}</option>
                {{/values}}
                </select>
            </span>
        </div>
        {{/fuelType}}
    </div>

    <div class="ui-grid-a search_drop_grid">
    {{#brand}}
        <div class="ui-block-a search_drop_grid " >
            <span class="widthmax">
                <strong>{{label}}:</strong>
            </span>
        </div>
        <div class="ui-block-b searchfieldtable" >
            <span class="select-drop select-brand">
                <select id="brandsSelector" name="{{name}}"></select>
            </span>
         </div>
     {{/brand}}
    </div>

    <div class="sort-by-grid ui-grid-a search_drop_grid">
    {{#sortBy}}
        <div class="ui-block-a">
            <span class="widthmax">
                <strong>{{label}}:</strong>
            </span>
        </div>
        <div class="ui-block-b searchfieldtable">
            <span class="select-drop sortBySelector">
                <select id="sortBySelector" name="{{name}}">
                {{#values}}
                    <option value="{{value}}" {{#default}}selected="selected"{{/default}}>{{label}}</option>
                {{/values}}
               </select>
            </span>
         </div>
     {{/sortBy}}
    </div>

    <div class="ui-corner-feedback margintop5 marginbottom3 minheight Yes-NO">
    {{#defaultSearch}}
        <div class="floatleft margin-set-default"><strong>{{label}}:</strong></div>
        <div class="floatright limitResult24hours">
            <select id="setDefaultSlider" name="{{name}}" data-role="slider">
            {{#values}}
                <option value="{{value}}">{{label}}</option>
            {{/values}}
            </select>
        </div>
    {{/defaultSearch}}
    </div>

    <div class="searchHold">
        <a href="#" id="submitCriteria-btn" type="submit" class="bottomSearch searchbuttoncenter">Search</a>
    </div>
</div>