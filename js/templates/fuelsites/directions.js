<div class="ui-grid-a direction-page-address">
    {{#details}}
    <div class="ui-block-a">
        <div class="direction-address-header">
            {{name}}
        </div>
        <div class="direction-address">
            {{address}}<br/>
            {{city}}, {{state}} {{zip}}<br/>
            <a href="tel:{{format_telephone}}">{{telephone}}</a>
        </div>
    </div>
    {{/details}}

    <div class="ui-block-b">
        {{route.distance.text}}, {{route.duration.text}}
    </div>
</div>

{{#route}}
<ul data-role="listview" data-theme="c" data-dividertheme="d">
    {{#steps}}
    <li data-icon="speaker" style="padding:10px 0px;">
        <a href="#" class="text-to-speech">
            <div class="ui-grid-a direction-page-list">
                <div class="ui-block-a"></div>
                <div class="ui-block-b">{{{instructions}}}</div>
                <div class="ui-block-c">{{distance.text}}</div>
            </div>
        </a>
    </li>
    {{/steps}}
</ul>
{{/route}}