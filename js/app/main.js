/* github.com/andrewbaldock/soundora */

define(["jquery", "underscore", "json2", "backbone", "backbone-pageable", "app/minboxer"], function($) {
    
    $(function() {  
  
      mnbx.minboxer();
      
      
			//show utils are loaded in console.
			if(typeof $ !='undefined') {console.log("jquery loaded");}
			if(typeof JSON !='undefined') {console.log("json2 loaded");}
			if(typeof _ !='undefined') {console.log("underscore loaded");}
			if(typeof Backbone !='undefined') {console.log("backbone loaded");}
		
			mnbx.spinner = function (){
				$('#spinner').toggle();
			};
			
			
			mnbx.log = function(wut){
				if(typeof console != 0) {
					console.log(wut);
				}
			}
			
		
			/*
		  aB.arranger = function() {
		  	$('#savedsearches div').css({'display':'inline-block','height':'26px'});
		  }
		  aB.arranger();
		
			*/
			
    });
});

