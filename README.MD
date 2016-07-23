<h2>Simple AngularJS Credit card Logo directive</h2>
```HTML
<div ng-app="myApp">
 <div cc-logo ng-model="cc" css="false" label="* Card Number" ></div>

-- OR --
<cc-logo 
    ng-model="cc" 
    css="false" 
    label="* Card Number">
</cc-logo>

</div>

Usage
Default

angular.module("myApp", ["ccLogo"]);
```
