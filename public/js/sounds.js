$(function(){
	$('.sound').click(function(){
		var sound = $(this).data('file').substring( 0, $(this).data('file').indexOf('.mp3') );
		$.get( "play/" + sound, function( data ) {

		});
	});

	$('#say').submit(function(event) {
		var say_this = $("#say_input").val();
		console.log(say_this);
		$.ajax({
			type: "POST",
			url: "http://sound.roborich.com/say",
			data: JSON.stringify({"say" : say_this}),
			contentType: "application/json"
		});

		event.preventDefault();
		$("#say_input").val("");
	});

});