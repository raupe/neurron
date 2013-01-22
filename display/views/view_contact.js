(function(){

	display.views.contact = (function(){

        var left = '\
        <div class="contact_outerwrap">\
			<div class="contact_innerwrap round">\n\
				<h1>contact</h1><br/>\
				<div class="contacttext">\
					For questions refering<br/>\
					neurron - END OF THE TUNNEL</br>\
					please contact us via<br/>\
					<br/>\
					<a class="contacttext" href="mailto:info@neurron.com">info@neurron.com</a>\
				</div>\n\
				<br/>\n\
				<div class="contacttext">impressum | Name | Straße | Berlin | Tel.: | email: </div>\
			</div>\
		</div>',

		right = '';

		return { left: left, right: right };

	})();

	var site;


    display.logic.contact = function(){

		if ( !site ) site = document.getElementById('site');
		site.textContent = 'main';
	};

})();
