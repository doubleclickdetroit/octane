{{#fuelsites}}
<li>
    <a href="#">
        <div class="ui-grid-b">
            <div class="ui-block-a Pricecolumn1">
                <div class="PriceContainer">
                    <h1 id="price">{{#mixin.format_ppg}}{{/mixin.format_ppg}}</h1>
                    <span>{{#mixin.format_time}}{{/mixin.format_time}}</span>
                </div>
            </div>
            <div class="ui-block-b brandlogocolumn">
                <i class="ui-logo" data-brand="{{brand}}">{{brand}}</i>
            </div>
            <div class="ui-block-c brandDetails">
                <div class="listdata_third_column">
                    <span>{{distance}} miles</span><br/>
                    <span class="brandClass"><h1 class="brandClassHeader">{{brand}}</h1></span>
                    <span class="address"> {{address}}</span>
                </div>
            </div>
        </div>
    </a>
</li>
{{/fuelsites}}

{{^fuelsites}}
<li>There are zero results for this criteria. Please try again.</li>
{{/fuelsites}}