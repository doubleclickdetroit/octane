<div data-role="content" data-theme="c">
    {{#fields}}
        <input type="{{type}}" placeholder="{{placeholder}}">
    {{/fields}}

    <div class="ui-grid-a">
        {{#buttons}}
            <div class="ui-block-{{id}}">
                <input value="{{label}}" type={{type}} {{#close}}rel="close"{{/close}} data-role="button" data-theme="c">
            </div>
        {{/buttons}}
    </div>
</div>