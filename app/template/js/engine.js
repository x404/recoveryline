$(document).ready(function(){
	$('#home-carousel').slick({
		lazyLoad: 'progressive',
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
		arrows : true,
		responsive: [
			{
			  breakpoint: 1250,
			  settings: {
			    slidesToShow: 3,
			    slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 991,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 767,
			  settings: {
			  	arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
		        centerMode: true,
		        centerPadding: '90px'
			  }
			},
			{
			  breakpoint: 500,
			  settings: {
			  	arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
		        centerMode: true,
		        centerPadding: '60px'
			  }
			},
			{
			  breakpoint: 420,
			  settings: {
			  	arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
		        centerMode: true,
		        centerPadding: '30px'
			  }
			},
			{
			  breakpoint: 370,
			  settings: {
			  	arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
		        centerMode: true,
		        centerPadding: '15px'
			  }
			},
			{
			  breakpoint: 300,
			  settings: {
			  	arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
		        centerMode: true,
		        centerPadding: '10px'
			  }
			}
	    ]
	});


	$('#card__thumbs').slick({
		dots: false,
		prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Назад"></button>',
		nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Вперед"></button>',
		slidesToShow: 4,
		slidesToScroll: 2,
		autoplay: false,
		autoplaySpeed: 4000,
		adaptiveHeight: true,
		arrows : true,
		responsive: [
			{
			  breakpoint: 470,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 430,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			}
	    ]
	});

	$('#similar-carousel').slick({
		dots: false,
		prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Назад"></button>',
		nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Вперед"></button>',
		slidesToShow: 4,
		slidesToScroll: 2,
		autoplay: false,
		autoplaySpeed: 4000,
		adaptiveHeight: true,
		arrows : true,
		appendArrows : $('.prevnext'),
		responsive: [
			{
			  breakpoint: 1250,
			  settings: {
			    slidesToShow: 3,
			    slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 991,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 767,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 430,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 370,
			  settings: {
			  	arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
		        centerMode: true,
		        centerPadding: '40px'
			  }
			}
	    ]
	});


	// mobile-menu
	$('#mobnavbar').each(function(){
		var $this = $(this),
			$link = $('.navbar-toggle'),
			$close = $('.close-menu'),

			init = function(){
				$link.on('click', openMenu);
				$close.on('click', closeMenu);
			},
			openMenu = function(e){
				e.preventDefault();
				// h = $(document).height();
				$('body').addClass('o-menu');
				// $('#mobnavbar').height(h);

			},
			closeMenu = function(e){
				e.preventDefault();
				$('body').removeClass('o-menu');
				// $('#navbar').height('auto');
			};
		init();
	});	

	$('#totop').click(function (){
		$('body, html').animate({
			scrollTop:0
		}, 800);
		return false;
	});

	var thankcallback = '<div class="thank text-center"><p>В ближайщее время с вами свяжутся наши менеджеры для уточнения всех деталей</p></div>';
	var thankfaq = '<div class="thank text-center"><p>Ваш вопрос отправлен</p></div>';
	var thankreview = '<div class="thank text-center"><p>Ваш отзыв отправлен</p></div>';
	var errorTxt = 'Форма не отправлена. Попробуйте позже.';
	// validation forms
	$('#callback-form').validate({
        // rules : {
        //     tel:{validphone:true}           
        // },
		submitHandler: function(form){
			var strSubmit=$(form).serialize();
			// $(form).find('fieldset').hide();
			$(form).append('<div class="sending">Идет отправка ...</div>');

			$.ajax({
				type: "POST",
				url: $(form).attr('action'),
				data: strSubmit,
				success: function(){
					document.querySelector('.sending').remove();
					$(form).append(thankcallback);
					startClock('callback-form');
				},
				error: function(){
					alert(errorTxt);
					$(form).find('fieldset').show();
					$('.sending').remove();
				}
			})
			.fail(function(error){
				alert(errorTxt);
			});
		}
	});


	$('#feedback-form').validate({
		submitHandler: function(form){
			var strSubmit=$(form).serialize();
			$(form).append('<div class="sending">Идет отправка ...</div>');
			$.ajax({type: "POST",url: $(form).attr('action'),data: strSubmit,
				success: function(){
					document.querySelector('.sending').remove();
					$('#feedback-form').append(thankcallback);
					startClock('feedback-form');
				}
			}).fail(function(error){alert(errorTxt)});
		}
	}); 



	$('#order-one-click-form').validate({
		submitHandler: function(form){
			var strSubmit=$(form).serialize();
			$(form).append('<div class="sending">Идет отправка ...</div>');
			$.ajax({type: "POST",url: $(form).attr('action'),data: strSubmit,
				success: function(){
					document.querySelector('.sending').remove();
					$('#order-one-click-form').append(thankcallback);
					startClock('order-one-click-form');
				}
			}).fail(function(error){alert(errorTxt)});
		}
	}); 	


	// products counters
	$('.card__count .plus').on('click', function(e){
		e.preventDefault();
		var $this = $(this),
			form = $this.closest('form'),
			submit = form.find('.product__submit'),
			priceEl = form.find('.shk-price'),
			countEl = $this.prev('input'),
			price = countEl.data('price').split(' ').join(''),
			cnt = parseInt(countEl.val())+1,
			cost = 0;

		cost = cnt * price;

		countEl.val(cnt);
		priceEl.text(splitNums(' ', cost.toString()));
		$('.product__submit-active').removeClass('product__submit-active');
		submit.addClass('product__submit-active');
		submit.removeAttr('disabled');
	});

	$('.card__count .minus').on('click', function(e){
		e.preventDefault();
		var $this = $(this),
			form = $this.closest('form'),
			submit = form.find('.product__submit'),
			priceEl = $this.closest('form').find('.shk-price'),
			countEl = $this.next('input'),
			price = countEl.data('price').split(' ').join(''),
			cnt = parseInt(countEl.val())-1,
			cost = 0;


		$('.product__submit-active').removeClass('product__submit-active');

		if ( cnt <= 0 ) {
			cnt = 1;
			// submit.prop('disabled', 'disabled');
		} else {
			// submit.addClass('product__submit-active');			
		};

		cost = cnt * price;
		countEl.val(cnt);
		priceEl.text(splitNums(' ', cost.toString()));
	});


	$('.quantity').keyup(function() {
		var $this = $(this),
			form = $this.closest('form'),
			submit = form.find('.product__submit'),
			priceEl = form.find('.shk-price'),
			price = $this.data('price').split(' ').join(''),
			cnt = 0,
			cost = 0;

		cnt = $(this).val();

		// $('.product__submit-active').removeClass('product__submit-active');		

		if ( cnt <= 0 ) {
			cnt = 1;
			// submit.prop('disabled', 'disabled');
		} else {
			// submit.removeAttr('disabled');
			// submit.addClass('product__submit-active');			
		};

		$this.val(cnt);
		cost = cnt *  price;
		priceEl.text(splitNums(' ', cost.toString()));
	});

});
	

var timer,
	sec = 3;


function showTime(sendform){
	sec = sec-1;
	if (sec <=0) {
		stopClock();

		switch (sendform){
			// case 'qorder-form':
			// 	$('.qorder__box .thank').fadeOut('normal',function(){
			// 		$('.qorder__box .thank').remove();
			// 		$('.qorder__box .form-control, .qorder__box textarea').val('');
			// 	});
			// 	break;
			case 'feedback-form':
				$('.feedback .thank').fadeOut('normal',function(){
					$('.feedback .thank').remove();
					$('.feedback .form-control, .feedback textarea').val('');
					$('.feedback__form fieldset').show();
				});
				break;
			// case 'cart-form':
			// 	$('.cart .thank').fadeOut('normal',function(){
			// 		$('.cart .thank').remove();
			// 		// $('.cart .form-control, .cart textarea').val('');
			// 		// $('.cart__form fieldset').show();
			// 	});
			// 	break;	
			default:
				modal = $("#" + sendform).closest('.modal');
				modal.modal('hide');
				modal.find('.thank').remove();
				modal.find('.form-control, textarea').val('');
				break;
		}


	}
}
function stopClock(){
	window.clearInterval(timer);
	timer = null;
	sec = 3;
}

function startClock(sendform){
	if (!timer)
		timer = window.setInterval("showTime('" + sendform + "')",1000);
}


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


function splitNums(delimiter, str){   
	str = str.replace(/(\d+)(\.\d+)?/g,
	function(c,b,a){return b.replace(/(\d)(?=(\d{3})+$)/g, '$1'+delimiter) + (a ? a : '')});
	return str;
}


// показываем второй  уровень меню
$(document).on('click', '.o-menu #mobnavbar .folder > a, .o-menu #mobnavbar .folder > span', function(e){
	e.preventDefault();
	var $this = $(this),
		$subnav = $this.next('.subnav');

	$this.next('.subnav').slideToggle('normal', function(){
		$this.toggleClass('open');
		// $subnav.toggleClass('open');
	});
})

$(document).on('click', '.o-menu .nav-lev-1 > a, .o-menu .nav-lev-1 > span', function(e){
	e.preventDefault();
	var $this = $(this);
	$this.next('ul').slideToggle('normal', function(){
		$this.toggleClass('open')
	});
})