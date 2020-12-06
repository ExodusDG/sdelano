(function ($) {






	$.fn.baSlider = function (options) {
		var defaults = {
			wrapperClass: "ba-slider",
			wrapperBASlider: "before-after-slider",
			wrapperHeight: "auto"
		};
		var settings = $.extend({}, defaults, options);

		$(this).each(function () {
			var $wrapper = $(this);
			//console.log($wrapper)

			// check if slick slider is present
			var passed = true;
			var error = '';
			var color = 'red';

			if (!jQuery().slick) {
				error = 'Slick plugin required!';
				passed = false;
			}
			else if (!jQuery().slider) {
				error = 'jQuery UI required!!';
				passed = false;
			}
			else {
				color = 'green';
				error = 'All passed! You can used BA slider now.';
			}

			//console.log("%c" + error, "color:" + color + ';font-weight:' + 'bold;');

			if (!passed) {
				return;
			}

			var BA = {
				sliderElem: [],
				main_width: $wrapper.width(),
				init: function () {
					this.addClasses();
					this.slickInit();
					this.responsiveFn();
				},
				addClasses: function () {
					$wrapper.addClass(settings.wrapperClass);
				},

				slickInit: function () {
					var $this = this;
					$wrapper.on('init', function () {
						$wrapper.find('.slick-track').children().each(function () {
							var child = $(this);
							$this.sliderElem.push(child);
						});
						$this.baInit();

						var slide = $('.slick-slide');
						slide.each(function () {

							$("<span class='knob'></span>").appendTo($(this).find('.slide').find(".ui-slider-handle"));
							//if(slide.slider('value') > 0) return;
							var w = $(this).find('.slide').width();
							// console.log(w);
							$(this).find('.slide').slider('value', w / 2);
						})
						//var count_slide=$(".slick-dots li").length
						//console.log(count_slide)//count-bilo-stalo
					});

					$wrapper.on('beforeChange', function () {
						$(".cd-handle").css('left', '50%');
						$(".cd-resize-img").width("50%");

						var slide = $('.slick-active');

						var count_slide = $(this).find(".slick-dots li").length
						var current_slide = $(this).find(".slick-dots li.slick-active button").html()
						$(this).nextAll(".bilo-stalo-ul").find(".count-bilo-stalo").html(current_slide + " / " + count_slide);

						//console.log($this.main_width);

						$("<span class='knob'></span>").appendTo(slide.find(".ui-slider-handle"));
						//if(slide.slider('value') <$this.main_width / 2) {

						//return;
						//}
						slide.each(function () {

							//if(slide.slider('value') > 0) return;
							var w = $(this).find('.slide').width();
							$(this).find('.slide').slider('value', w / 2);
						})



					});

					$wrapper.slick({
						draggable: false,
						swipe: false,
						dots: true,
						lazyLoad: 'progressive',
						responsive: [
							{
								breakpoint: 768,
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1,
								}
							}

						],
						slidesToShow: 2,
						slidesToScroll: 2,
						adaptiveHeight: true
					});


				},
				baInit: function () {
					var $this = this;
					for (var i = 0; i < $this.sliderElem.length; i++) {
						var slide = $this.sliderElem[i];
						var _width = slide.find('.slide').width();

						$("<div class='slide'></div>")
							.appendTo(slide.children())
							.slider({
								step: 1,
								max: slide.find('.slide').width(),
								min: 0,
								animate: 400,
								value: 0,
								slide: function (event, ui) {
									var x = $(this).siblings(".before");

									if ($(event.currentTarget).hasClass("slide")) {
										x.animate({ width: ui.value, duration: 200 });
									} else {
										x.css("width", ui.value);
									}

									if (ui.value <= 30 || ui.value >= _width - 30) {
										//console.log(ui.value);
										//x.stop();
										//y.stop().animate({width: 31, duration: 200});
										//y.animate({width: 31, duration: 0});
									}

									// console.log(_width);
									// console.log(ui.value);

									event.stopPropagation();
								},
								change: function (event, ui) {
									var y = $(this).siblings(".before");

									if (event.altKey === undefined) {
										y.stop().animate({ width: ui.value, duration: 200 });
									} else {
										//ui.value=_width/2;
										if (ui.value === _width - 30 || ui.value === 30) {
											y.css("width", ui.value - 20);
										}
									}
									//console.log(ui.value);
									if (ui.value <= 30) {
										//y.stop().animate({width: 31, duration: 200});
										//y.animate({width: 31, duration: 0});
									}


								}
							}).draggable();
					}

				},
				responsiveFn: function () {
					$(window).on('resize', function () {
						var _width = $wrapper.width();

						$wrapper.find(".slick-active").each(function () {
							var _width = $(this).find('.slide').width();
							$(this).find('.slide').slider({ "max": _width, "value": _width / 2 })
						});
					});
				}
			}

			BA.init();

			$(".album-bilo-stalo").each(function () {

				var count_slide = $(this).find(".slick-dots li").length
				var current_slide = $(this).find(".slick-dots li.slick-active button").html()
				$(this).nextAll(".bilo-stalo-ul").eq(0).find(".count-bilo-stalo").html(current_slide + " / " + count_slide);

			});

		})
	};


})(jQuery);

