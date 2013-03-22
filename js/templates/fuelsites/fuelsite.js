<a href="#{{id}}">
    <div class="ui-grid-b">
        <div class="ui-block-a Pricecolumn1">
            <div class="PriceContainer">
                <h1 id="price">
                    {{#format_ppg}}
                        ${{format_ppg}}
                        <sup>{{format_ppg_sup}}</sup>
                    {{/format_ppg}}
                    {{^format_ppg}}&nbsp;{{/format_ppg}}
                </h1>
                <span>{{format_time}}</span>
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