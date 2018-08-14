$(document).ready(function(){
	$('#home-carousel').slick({
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 4000,
		adaptiveHeight: true,
		arrows : false
	});


	$('#articles-carousel').slick({
		dots: false,
		prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Назад"></button>',
		nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Вперед"></button>',
		slidesToShow: 4,
		slidesToScroll: 2,
		autoplay: false,
		autoplaySpeed: 4000,
		adaptiveHeight: true,
		arrows : true
	});


	// mobile-menu
	$('#navbar').each(function(){
		var $this = $(this),
			$link = $('.navbar-toggle'),
			$close = $('.close-menu'),

			init = function(){
				$link.on('click', openMenu);
				$close.on('click', closeMenu);
			},
			openMenu = function(e){
				e.preventDefault();
				h = $(document).height();
				$('body').addClass('o-menu');
				$('#navbar').height(h);

			},
			closeMenu = function(e){
				e.preventDefault();
				$('body').removeClass('o-menu');
				$('#navbar').height('auto');
			};
		init();
	});	

	$('#totop').click(function (){
		$('body, html').animate({
			scrollTop:0
		}, 800);
		return false;
	});

});
	

$(function(){
	$('.policy input').click(function(){
		var $this = $(this),
			$submit = $this.closest('.form-policy');

		if ($this.is(':checked')){
			$submit.find('.input, .form-control, .submit, textarea, input[type=radio]').removeAttr('disabled');
		} else {
			$submit.addClass('disabled');
			$submit.find('.input, .form-control, .submit, textarea, input[type=radio]').attr('disabled', true);
		}
	})
});