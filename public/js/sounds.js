$(function(){
	$('.sound').click(function(){
		var sound = $(this).data('file').substring( 0, $(this).data('file').indexOf('.mp3') );
		$.get( "play/" + sound, function( data ) {

		});
	});
});