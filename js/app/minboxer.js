define(["jquery", "json2", "backbone"], function($,Backbone) {
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
						//mnbx.log('pre-parse: "resp":');
						//mnbx.log(resp);
						_.each(resp.gallery_items, function(data) {
										//mnbx.log('Gallery parse: inside each, here is "data":');
										//mnbx.log(data);
										this.models.push( new mnbx.GalleryItem({model: data}) ); // genius, essential
						}, this);
						//mnbx.log(this);
				},
				initialize: function() {
					//mnbx.log('collection initialize: "this":');
					//mnbx.log(this);
				}
			});
			
			/*
			VIEW / collection: List view to render the gallery into
			-----------------------------------------------------------------*/
			var GalleryView = Backbone.View.extend({
				el: $('#galleryitems'),
				initialize: function() {
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
										//mnbx.log('inside each, here is "data":');
										//mnbx.log(data);
										self.$el.append( new GalleryItemView({model: data.attributes.model}).render().el);  // genius, essential
								}, this);
						
						 }
						// clean up results, apply styles, etc here
						
						// PRESENTING: superduper ghetto pagination!
						//should really install a true backbone paginator, but, Judo!
							function pager(rec){
							if (rec <= 24) {return 1}
							if (rec <= 48) {return 2}
							if (rec <= 72) {return 3}
							if (rec <= 96) {return 4}
							if (rec <= 120) {return 5}
							if (rec <= 144) {return 6}
							if (rec <= 168) {return 7}
							if (rec <= 192) {return 8}
							if (rec <= 216) {return 9}
							if (rec <= 240) {return 10}
							if (rec <= 264) {return 11}
							if (rec <= 288) {return 12}
							if (rec <= 312) {return 13}
							if (rec <= 336) {return 14}
							if (rec <= 360) {return 15}
							return 0;
						}
						mnbx.rec = 0;
						$('.item-wrap').parent().each(function(){
								mnbx.rec = mnbx.rec+1;
								var page = pager(mnbx.rec);
								$(this).addClass('page'+page).addClass('results').addClass('hidden');
								$(this).addClass('hidden');
						});
						
						$('.page1').removeClass('hidden');
						mnbx.currentpage = 1;
						
						
						mnbx.pagecount = parseInt(results.length/24)+1;
						
						for(i=1;i<=mnbx.pagecount;i++){
							$('#paginator').append('<a class="pager" id="page' + i + '">' + i + '</div>');
						}
						
						
						
						$('.pager').click(function() {
						
							var pageid = $(this).prop('id');
							$('.pager').removeClass('thispage');
							$('.page' + mnbx.currentpage).addClass('hidden');
							$('.'+pageid).removeClass('hidden');
							$('#'+pageid).addClass('thispage');
							mnbx.currentpage = pageid.replace('page','');
							
						});
						
						$('#page1').addClass('thispage');
						
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
