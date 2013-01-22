(function(){

	display.views.contact = (function(){

        var left = '<div class="contact_outerwrap"><div class="contact_innerwrap round">\n\
<h1>contact</h1><br/>\
<div class="contacttext">For questions refering<br/>neurron - END OF THE TUNNEL</br>please contact us via<br/><br/><a class="contacttext" href="mailto:info@neurron.com">info@neurron.com</a></div>\n\
<br/>\n\
<div id="contact_back_button" class="button button_color contact_back_button"><p>back</p></div>\n\
<br/><br/>\n\
<div class="contacttext">impressum | Name | Straße | Berlin | Tel.: | email: </div>\
</div></div>',

		right = '';

		return { left: left, right: right };

	})();

    display.logic.contact = function(){
        document.getElementById("contact_back_button").addEventListener("click", function(){

            $('.neurron').fadeOut(1000);
            $('.contact').fadeIn(1000);

            display.show('start');

            // I put the expected fadeIn Code for #qr_code into the start logic because it starts somehow very late
        });
	};

})();
