$(document).ready(function () {
	$('.tu').on('click',function(){
		window.open('https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwj7qMGzr5XVAhUFErwKHe2GByYQFggnMAA&url=https%3A%2F%2Fsteamcommunity.com%2Fid%2Fme%2Ftradeoffers%2Fprivacy&usg=AFQjCNEZor_1PhpkVynm7lzVCD95whnDyg');});



	$('.Youtube').on('click',function(){
		window.open('https://www.youtube.com/channel/UCYxQbRyNneXaO8fgFA2BLlw');
	});

	$('.Youtube').on('mousedown',function(e){
		 e.preventDefault();
    	console.log(e.which);
    	console.log(e.type);
    
    	if(e.type=="contextmenu"){
       		console.log("Context menu prevented.");
       		return;
    		}
		if(e.which==2){
			e.preventDefault();
			window.open('https://www.youtube.com/channel/UCYxQbRyNneXaO8fgFA2BLlw');	}
	});


	
	$('.Twitter').on('click',function(){
		window.open('https://twitter.com/_vincerla');
	});

	$('.Twitter').on('mousedown',function(e){
		 e.preventDefault();
    	console.log(e.which);
    	console.log(e.type);
    
    	if(e.type=="contextmenu"){
       		console.log("Context menu prevented.");
       		return;
    		}
		if(e.which==2){
			e.preventDefault();
			window.open('https://twitter.com/_vincerla');	}
	});



	$('.Facebook').on('click',function(){
		window.open('https://www.facebook.com/Vincerla-1964906390420344/?ref=bookmarks');
	});

	$('.Facebook').on('mousedown',function(e){
		 e.preventDefault();
    	console.log(e.which);
    	console.log(e.type);
    
    	if(e.type=="contextmenu"){
       		console.log("Context menu prevented.");
       		return;
    		}
		if(e.which==2){
			e.preventDefault();
			window.open('https://www.facebook.com/Vincerla-1964906390420344/?ref=bookmarks');	}
	});



	$('.Twitch').on('click',function(){
		window.open('https://www.twitch.tv/vincerla');
	});

	$('.Twitch').on('mousedown',function(e){
		 e.preventDefault();
    	console.log(e.which);
    	console.log(e.type);
    
    	if(e.type=="contextmenu"){
       		console.log("Context menu prevented.");
       		return;
    		}
		if(e.which==2){
			e.preventDefault();
			window.open('https://www.twitch.tv/vincerla');	}
	});



	$('.Instagram').on('click',function(){
		window.open('https://www.facebook.com/Vincerla-1964906390420344/?ref=bookmarks');
	});

	$('.Instagram').on('mousedown',function(e){
		 e.preventDefault();
    	console.log(e.which);
    	console.log(e.type);
    
    	if(e.type=="contextmenu"){
       		console.log("Context menu prevented.");
       		return;
    		}
		if(e.which==2){
			e.preventDefault();
			window.open('https://www.facebook.com/Vincerla-1964906390420344/?ref=bookmarks');	}
	});



	$('h5.paypal').on('click',function(){
		window.open('https://www.paypal.me/Arjun983');
	});

	$('h5.paypal').on('mousedown',function(e){
		 e.preventDefault();
    	console.log(e.which);
    	console.log(e.type);
    
    	if(e.type=="contextmenu"){
       		console.log("Context menu prevented.");
       		return;
    		}
		if(e.which==2){
			e.preventDefault();
			window.open('https://www.paypal.me/Arjun983');	}
	});
});