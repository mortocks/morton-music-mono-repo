$(document).ready(function(){


    $(function () {
        $('a.fluid').fluidbox();
    });


    $('.slider').slick({
        autoplay: true,
        autoplaySpeed: 7000,
    });

	$('#ajax-search-results input').keyup(function() {
    var term = this.value;
    $('#js-all-results').attr("href", "/?s=" + term);
    delay(function(){
      doSearch(term);
    }, 1000 );
	});




	$('li.search a').click(function(e){
		e.preventDefault();
		$('#ajax-search-results').slideToggle();
		$('#ajax-search-results input').focus();
	});

});



function doSearch(query){

	if (query == "") return;

    if (window.ga && ga.create){
        ga('send', 'pageview', 'search.php?s=' + query);
    }

	$.ajax({
    type : 'post',
    url : myAjax.ajaxurl,
    data : {
        action : 'ajax_search',
        query : query
    },
    dataType:'json',
    beforeSend: function() {
        //$input.prop('disabled', true);
        //$content.addClass('loading');
        $('#ajax-search-results').removeClass('loaded');

        $('#js-all-results').hide();
        $('#js-all-results').text('Show all results');
        $('#ajax-search-results .list').html('<li class="loading">Loading</li>');
        $('#ajax-search-results h3 em').html('');
        
    },
    success : function( response ) {
        //$input.prop('disabled', false);
        //$content.removeClass('loading');
        //$content.html( response );

        //console.log(response.composers);
        templateSearchResults('pieces', '#ajax-search-results .works', response.music, query);
        templateSearchResults('pages', '#ajax-search-results .pages', response.pages, query);
        templateSearchResults('', '#ajax-search-results .composers', response.composers, query);
        $('#js-all-results').show();
        if(response.count < 0){
        	$('#js-all-results').text('No results');
    			$('#js-all-results').attr("href", "#");
        }
        $('#ajax-search-results').addClass('loaded');
    }
	});
}



var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();




function templateSearchResults(posttype, className, results, query){

	var out = '';
	
	if (results.length == 0){
		out = "<li class='no-results'>No results</li>";
	} else {
		$(className + " h3 em").text("found " + results.length);
	}

	$(results).each(function(index, el){
		out += "<li><a href='" + el.href + "'>" + el.title + "</a></li>";
		if (index > 5) {
			out += "<li><a class='more-results' href='/?s=" + query + "&post_type=" + posttype + "'>More results</a></li>";
			return;
		}
	});

	$(className + ' .list').html(out);
}