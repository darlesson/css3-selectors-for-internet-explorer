/*!
* CSS3 Selectors for Internet Explorer v0.9.0 (Beta version)
*
* http://www.darlesson.com/
*
* Copyright 2010, Darlesson Oliveira
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* @requires jQuery v1.3.2 or above
*
* Reporting bugs, comments or suggestions: http://darlesson.com/contact/
* Documentation and other jQuery plug-ins: http://darlesson.com/jquery/
* Donations are welcome: http://darlesson.com/donate/
*/

// IE8 doesn't consider selectors that are unknown. Because of that, it is necessary
// to activate IE7 compatibility mode adding the following tag in your head element:
// <meta http-equiv="X-UA-Compatible" content="IE=7" />

// This code doesn't work for Internet Explorer 8 even adding the tag for compatibility mode in HTML5

// CSS3 Selectors for Internet Explorer
(function($){

    $.CSS3ForIE = function(){

        var numStyle = document.styleSheets.length;
        if( $.browser.msie ){
            for(var x = 0; x < numStyle; x++){
                var numCSSRules = document.styleSheets[x].rules.length;
                for(var z = 0; z < numCSSRules; z++){
                    cssRules = document.styleSheets[x].rules[z];
                    if(cssRules.style.selector) {
                        var selectors = cssRules.style.selector,
                            cssText = cssRules.style.cssText;

                        cssText = cssText.substring( 0,cssText.lastIndexOf(";") + 1 );

                        if( selectors.indexOf(",") > -1 ){
                            selectors = selectors.split(",");
                            for(var s = 0; s < selectors.length; s++){
                                if( selectors[s].toLowerCase().indexOf(":hover") > -1 )
                                    $.CSS3ForIE.ApplyHover( selectors, cssText );
                                else
                                    $.CSS3ForIE.Apply( selectors[s], cssText );
                            }
                        } else {
                            if ( selectors.toLowerCase().indexOf(":hover") > -1 )
                                $.CSS3ForIE.ApplyHover( selectors, cssText );
                            else
                                $.CSS3ForIE.Apply( selectors, cssText );
                        }
                    }
                }
            }
        };

    };

    $.extend($.CSS3ForIE,{

        Apply : function( selector, cssText ){
            var $selector = $( selector );

            if( $selector.css("selector") == undefined )
                $selector.attr("style",cssText);
        },

        ApplyHover : function( selector, cssText ){
            var hoverPosition = selector.toLowerCase().indexOf(":hover"),
                $selector = $( selector.substring( 0, hoverPosition ) ),
                $descendant =  selector.substring( hoverPosition + 7, selector.length ),
                isChildren = ( $descendant.indexOf(">") == 0 )? true:false,
                previousCssText = "";

            $descendant = ( isChildren )? $descendant.substring( 2, $descendant.length):$descendant;

            $selector.hover(function(){
                var $this = $(this),
                    $thisDescedant;
                if( $selector.css("selector") == undefined ) {
                    $thisDescedant = ( isChildren )? $this.children( $descendant ):$this.find( $descendant );

                    if( $thisDescedant.attr("style") != undefined )
                        previousCssText = $thisDescedant.attr("style");

                    $thisDescedant.attr("style",cssText);
                }
            }, function(){
                var $this = $(this),
                    $thisDescedant;
                if( $selector.css("selector") == undefined ) {
                    $thisDescedant = ( isChildren )? $this.children( $descendant ):$this.find( $descendant );

                    if ( previousCssText != "" )
                        $thisDescedant.attr("style",previousCssText);
                    else
                        $thisDescedant.removeAttr("style");
                }
            });
        }

    });

})(jQuery);
