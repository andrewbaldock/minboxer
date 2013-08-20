// declare the mnbx object
mnbx={};

requirejs.config({
    "baseUrl": "js/lib",
    shim: {   // defines dependencies between libraries
    	'underscore': {exports: '_'},
    	'backbone': {
      	deps: ['underscore','jquery'],
      	exports: 'Backbone'
    	}
  	},
    "paths": {
      "app": "../app",
      "jquery" : 						"//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min",
      "json2" : 						"//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min",
      "underscore" :  			"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min",
      "backbone" : 					"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min"
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);
