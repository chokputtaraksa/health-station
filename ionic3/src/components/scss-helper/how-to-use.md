Let me describe briefly the steps to access SASS variables from within typescript source code:

1. Creating a SASS Helper Component

Create ../providers/sass-helper/sass-helper.component.scss:

$prefix: "--"; //Prefix string for custom CSS properties

//Merges a variable name with $prefix
@function custom-property-name($name) {
    @return $prefix + $name;
}

// Defines a custom property
@mixin define-custom-property($name, $value) {
    #{custom-property-name($name)}: $value;
}

body {
    // Append pre-defined colors in $colors:
    @each $name, $value in $colors {
        @include define-custom-property($name, $value);
    }

    // Append SASS variables which are desired to be accesible:
    @include define-custom-property('background-color', $background-color);
}
In this SCSS file, we simply create custom properties inside the body section of the DOM. You should add each SASS variable that you want to be accessible into this SCSS file by using the mixin called define-custom-property which expects two parameters: variable name and variable value.

As an example, I have added entries for all the colors defined in $colors as well as an entry for the SASS variable $background-color defined in my theme/variables.scss file. You can add as many variables as you wish.

Create ../providers/sass-helper/sass-helper.component.ts:

import { Component } from '@angular/core';

export const PREFIX = '--';

@Component({
    selector: 'sass-helper',
    template: '<div></div>'
})
export class SassHelperComponent {

    constructor() {

    }

    // Read the custom property of body section with given name:
    readProperty(name: string): string {
        let bodyStyles = window.getComputedStyle(document.body);
        return bodyStyles.getPropertyValue(PREFIX + name);
    }
}
2. Integrating SASS Helper Component

From now on, we can follow standard Ionic2 framework principles for component integration and usage.

Add the component class name (SassHelperComponent) into the declarations section of your NgModule in app.module.ts
Insert the following HTML code into the HTML template of your page from where you want to access those magic variables:

<sass-helper></sass-helper>
3. Using Helper Component

In your page's TS file, you should insert the following lines into your page class:

@ViewChild(SassHelperComponent)
private sassHelper: SassHelperComponent;
Finally, you can read the value of any SASS variable by just calling the child class method as follows:

// Read $background-color:
this.sassHelper.readProperty('background-color');

// Read primary:
this.sassHelper.readProperty('primary');