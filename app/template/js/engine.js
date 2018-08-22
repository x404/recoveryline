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
		arrows : true
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