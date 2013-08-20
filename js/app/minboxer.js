define(["jquery", "json2", "backbone"], function($,Backbone,df_auth) {
  mnbx.minboxer = function() {
  	require(['backbone'], function (Backbone) {
  	
  		mnbx.baseurl = '//stage.minbox.com/api';
  		mnbx.apikey = 'access_token=nE92neTwflBTmHDpw0nkliIr4BCdNJKH5SQN9lGE';
			mnbx.defaultGallery = 'Kh8ciPDKyg';
  		
  		/*
			MODEL: individual GalleryItem
			-----------------------------------------------------------------*/
			mnbx.GalleryItem = Backbone.Model.extend({
				defaults: {
				},
				create: function() {
					this.save();
				},
				url: mnbx.baseurl + '/gallery_items/' + '?gallery_id=' + mnbx.defaultGallery + '&' + mnbx.apikey
			});
			
			/*
			VIEW / model: Item view for a single GalleryItem - uses templates
			-----------------------------------------------------------------*/
			var GalleryItemView = Backbone.View.extend({
				model:mnbx.GalleryItem,
				/* tagName: "li", */     // auto-wrap in an html element
				template: _.template($('#galleryItem-template').html()),
				render: function() {
						this.$el.html(this.template(this.model));
						return this;
				},
				events: {
					'click .item': 'showDetails'
				},
				showDetails: function(event){
					mnbx.log( 'GalleryItem ' + this.model.query + ' clicked' );
					mnbx.log(this);
				}
			});

			/*
			COLLECTION: Galleries are lists of GalleryItems
			-----------------------------------------------------------------*/
			var Gallery = Backbone.Collection.extend({
				model: mnbx.GalleryItem,
				//url: mnbx.baseurl + '/galleries/' + mnbx.defaultGallery + '?' + mnbx.apikey,
				url: "js/data/gallery.json",
				parse: function(resp) {
						mnbx.log('pre-parse: "resp":');
						mnbx.log(resp);
						_.each(resp.gallery_items, function(data) {
										mnbx.log('Gallery parse: inside each, here is "data":');
										mnbx.log(data);
										this.models.push( new mnbx.GalleryItem({model: data}) ); // genius, essential
						}, this);
						mnbx.log(this);
				},
				initialize: function() {
					mnbx.log('collection initialize: "this":');
					mnbx.log(this);
				}
			});
			
			/*
			VIEW / collection: List view to render the gallery into
			-----------------------------------------------------------------*/
			var GalleryView = Backbone.View.extend({
				el: $('#galleryitems'),
				initialize: function() {
						// not sure these are doing anything
						this.collection.on("reset", this.render, this);
    				this.collection.on("add", this.render, this);
    				this.collection.on("remove", this.render, this);
    				this.collection.on("push", this.render, this);
						this.render();
				},
				render: function() {
						mnbx.log('post-parse: GalleryView "this.collection":');
						mnbx.log(this.collection);
						mnbx.log(results);
						var results = this.collection.models;
            mnbx.log('backbone got ' + results.length + ' galleryitems');
						
						if (results.length === 0) {
							this.$el.html('<h4>Sorry, we could not find any records</h4>');
						} else {
								this.$el.html('');
								
								var self = this;
								_.each(results, function(data) {
										mnbx.log('inside each, here is "data":');
										mnbx.log(data);
										self.$el.append( new GalleryItemView({model: data.attributes.model}).render().el);  // genius, essential
								}, this);
						
						 }
						// here you can clean up results, apply styles, etc
					}
			});

			

			/*
			START get remote data and begin. (use this OR section below)
			----------------------------------------------------------------*/

			  if(typeof mnbx.gallery == 'undefined') {
					mnbx.gallery = new Gallery();
				} 

				mnbx.gallery.fetch({
					  //dataType: "jsonp",
						success: function() {
								mnbx.spinner();
								mnbx.log('backbone collection activated: user logged in');
								if(typeof mnbx.galleryView == 'undefined') {
									mnbx.galleryView = new GalleryView({collection: mnbx.gallery});
								} else {
									//push new results into existing collectionview
									mnbx.galleryView.render();
								}
						},
						error: function() {
								mnbx.log('backbone collection activated: oh noes fetch fail');
						}
				}); 

		
			//to ADD a record, this works awesome
			/*
			mnbx.gallery.models.push( new mnbx.GalleryItem({model: {"id":"5","query":"inside my love disco"} }) );
			mnbx.galleryView.render();
			*/


			
			
    }) // end require	
  };  // end mnbx.minboxer
});  // end define
