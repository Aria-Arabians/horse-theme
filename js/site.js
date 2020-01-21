// SITE js
const SITE = {
	isMobile() {
		if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
			return true;
		} else {
			return false;
		}
	},
	isTablet() {
		if(/Android|iPad/i.test(navigator.userAgent)) {
			return true;
		} else {
			return false;
		}
	},
	toTop() {
			jQuery('html, body')
				.animate({
					scrollTop: 0
				}, 'slow');
	},
	initMobileMenu() {
		jQuery('#mobile_menu').menu({
			selectedClass  : "current_page_item"
		});
	},
	showErrorBox(error) {
		const errorbox = '<div id="error-messages" class="error-popup mfp-hide"> <h2>Oops!</h2><ul id="error-list"></ul></div>';
		if (jQuery("#error-messages").size() === 0) {
			jQuery(errorbox)
				.appendTo("body");
		}

		jQuery("#error-list")
			.empty()
			.append(error);

		jQuery.magnificPopup.open({
		  items: {src: '#error-messages'},
		  type: 'inline'
		}, 0);

		return false;
	},
	toTitleCase(str) {
		 return str.replace(
		 		/\w\S*/g,
		 		(txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		 );
	},
	equalHeight(el) {
		if (jQuery(el).size() > 0) {
			jQuery(el).matchHeight(true);
		}
	},
  eqChild2() {
    if (jQuery('.eq-parent2').size() > 0) {
	    const hChild = jQuery(".eq-parent2").height();
	    const HSubChild = HChild / 2;

	    jQuery(".eq-child2")
	    	.css("height", HSubChild);
    }

  },
	initAccordion(){
		const oAccordion = jQuery('.accordion_container');
		if (oAccordion.size() > 0) {
			const menu_ul = jQuery('.accordion_container > li > div.accordion_content');
			const menu_a = jQuery('.accordion_container > li > a')
			const default_open_slide = jQuery('.accordion_container > li > div.default_open_slide');

			menu_ul.hide();
			default_open_slide.show();
			menu_a.click(e => {
				e.preventDefault();

				if (!jQuery(this).hasClass('active')) {
					menu_a.removeClass('active');
					menu_ul
						.filter(':visible')
						.slideUp('normal');

					jQuery(this)
						.addClass('active')
						.next()
						.stop(true,true)
						.slideDown('normal');
				} else {
					jQuery(this).removeClass('active');
					jQuery(this)
						.next()
						.stop(true,true)
						.slideUp('normal');
				}
			});
		}
	},
	socialShare(o) {
		const $a = jQuery(o);
		const social = $a.data('social');
		const params = $a.data("share-params");

		switch(social) {
			case "facebook":
				url = `https://www.facebook.com/sharer/sharer.php?${params}`;
				break;
			case "twitter":
				url = `https://twitter.com/intent/tweet?${params}`;
				break;
			case "pinterest":
				url = `https://pinterest.com/pin/create/button/?${params}`;
				break;
			case "gplus":
				url = `https://plus.google.com/share?${params}`;
				break;
			default:
				break;
		}

		window.open(url, 'social-share-dialog', 'width=626,height=436');
		return false;
	},
	initTabs() {
		jQuery(".tabs").on("click", "a" , event => {
      event.preventDefault();

      jQuery(this)
      	.parent()
      	.addClass("active");
      jQuery(this)
      	.parent()
      	.siblings()
      	.removeClass("active");

      const tab = jQuery(this).attr("href");
      jQuery(".tab-content").hide();
      jQuery(tab).show();
    });
	},
	initSlider(slider,numSlides) {
		let slideOptions = {}
		if (numSlides === 1) {
			slideOptions = {
				controls: false,
				responsive: true,
				auto: true,
				mode: 'fade',
				pause: 20000
			}
		} else if (numSlides === 3) {
			slideOptions = {
				controls: false,
				responsive: true,
				infiniteLoop: false,
				slideWidth: 380,
				minSlides: 1,
				maxSlides: 3,
				moveSlides: 1,
				slideMargin: 0,
				auto: true,
				mode: 'fade',
				pause: 15000
			}
		} else if (numSlides === 4) {
			let slide_width = 300;

			if (SITE.isMobile()) {
				slide_width = 340;
			};

			slideOptions = {
				pager: false,
				responsive: true,
				infiniteLoop: false,
				nextSelector: '#team_next',
				prevSelector: '#team_prev',
				slideWidth: slide_width,
				minSlides: 1,
				maxSlides: 4,
				moveSlides: 1,
				slideMargin: 0,
				auto: true,
				mode: 'fade'
			}
		}
		jQuery(slider).bxSlider(slideOptions);
	},
	scrollToSection() {
			const selector = '#primary-menu a';

  		//Removes click event of each li
  		jQuery(selector).unbind('click');

  		//Add click event
  		jQuery(selector).bind('click', () => {
				const contentMenuHeight = jQuery('.header').height();
				jQuery('html,body')
					.animate({
						scrollTop: jQuery(this.hash).offset().top - contentMenuHeight + 1
					}, 'slow');

				jQuery(selector).removeClass('active');
				jQuery(this).addClass('active');
			});
	},
	stickyHeader() {
		if (jQuery(window).width() > 768) {
			if (jQuery('body').scrollTop() >= 200) {
				const iCurScrollPos = jQuery('body').scrollTop();
			    if (iCurScrollPos >= iScrollPos) {
		        //Scrolling Down
		        jQuery('.header').addClass('sticky-header');
			    } else {
			    	//Scrolling Up
			    	jQuery('.header').addClass('sticky-header');
			    }
			    iScrollPos = iCurScrollPos;
			} else {
				jQuery('.header').removeClass('sticky-header');
			}
		} else {
			jQuery('.header').removeClass('sticky-header');
		}
	},
	testmonialsSlider() {
		jQuery('.testmonialsSlider').bxSlider({
		  adaptiveHeight: false,
		  captions: true,
		  pager: false,
		  controls : false,
		  auto:true,
		  mode: 'fade',
			pause: 8000
		});
	},
	simpleTab() {
		if (jQuery('.simple-tab-wrapper').size() > 0) {
			let currentIndex = 0;
			jQuery('.simple-tab-wrapper .simple-tab-content:first-child')
				.show()
				.addClass('active');
			jQuery('.simple-tab-links li:first-child a')
				.addClass('selected');

			jQuery('.simple-tab-links a').click(() => {
				jQuery(this)
					.parents('.simple-tab-links')
					.find('a')
					.removeClass('selected');

				jQuery(this).addClass('selected');

				const currentTab = jQuery(this).attr('href');
				jQuery(this)
					.parents('.caregoryPopup')
					.find('.simple-tab-content')
					.hide();
				jQuery(currentTab)
					.show()
					.addClass('active');
				jQuery('.eq-child').removeAttr('style');

				SITE.equalHeight(".eq-parent .eq-child");

				return false;
			});
		}
	},
	alignCentered(customTop) {
		if (jQuery('.align-centered').size() > 0) {
			jQuery('.align-centered').each(() => {
				const cBox = jQuery(this);
				const parentCBoxHeight = cBox.parent().height() - (parseInt(cBox.parent().css("padding-top")) + parseInt(cBox.parent().css("padding-bottom")));
				const CBoxHeight = cBox.height();
				const pTop =  Math.round((parentCBoxHeight - CBoxHeight) / 2);
				cBox.css('paddingTop', pTop);

				//if process page on tablet
				if (SITE.isTablet()) {
					if (jQuery("#process-steps-link").size() > 0) {
						cBox.css('paddingTop', pTop+20 );
					}
				}
				jQuery('.large-website-banner-content').css('visibility','visible');
				jQuery('.noScrollLandingBannerFormMain').css('visibility','visible');
			});
		}
	},
  fitVideo() {
    if (jQuery('.fitVideo').size() > 0) {
    	jQuery(".fitVideo").fitVids();
    }
  }
};
let SITEForms = {
	onlyInteger() {
    jQuery('.only-integer').keypress(event => {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (
      	charCode > 31
      	&& (charCode < 48 || charCode > 57)
      	&& charCode != 37
      	&& charCode != 39
      	&& charCode != 46
      	) {
          return false;
      }
      return true;
    });
  },
	onlyFloat() {
    jQuery('.only-float').keypress(event => {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (
        	charCode > 31
        	&& (charCode < 48 || charCode > 59)
        	&& charCode != 37
        	&& charCode != 39
        	&& charCode != 46
        ) {
        	return false;
        } // prevent if not number/dot
        if (charCode == 46 && jQuery(this).val().indexOf('.') != -1) {
            return false;
        } // prevent if already dot
        return true;
    });
  },
	isValidEmail(v) {
		const filter_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (filter_email.test(v) === false) {
			return false;
		} else {
			return true;
		}
	},
	isValidZip(v) {
		const filter_zipcode =  /^(\d{5}-\d{4}|\d{5}|\d{9})$|^([a-zA-Z]\d[a-zA-Z]( )?\d[a-zA-Z]\d)$/;
		if (filter_zipcode.test(v) === false) {
			return false;
		} else {
			return true;
		}
	},
	isValidPhone(v) {
		const filter_phone = /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/;
		if (filter_phone.test(v) === false) {
			return false;
		} else {
			return true;
		}
	},
	getValue: function(fieldID){
		const value = jQuery.trim(jQuery("#"+fieldID).val());
		jQuery("#" + fieldID).val(value);
		return value;
	},
	isInt(n) {
		return Number(n) === n && n % 1 === 0;
	},
	isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
	},
	submitAjax(formID) {
		const frm = jQuery('#' + formID);
		const formId = formID;
		jQuery.ajax({
			type: "post",
			url: '/wp-content/themes/arabian/ajax-submission.php',
			data: frm.serialize(),
			success(data) {
				if (data=="0") {

				} else {
					console.log(frm)

					if (formID === "MemberbookForm") {
						document.location.href = jQuery("#redirect_to_member").val();
					} else {
						document.getElementById(formId).submit();
					}

				}
			}
		});
		return false;
	},
	bookForm(formID) {
		const isOK = true;
		let msg = "";
		const d = jQuery('#'+formID);
		const fname = d.find("input[name='fname']").val();
		const lname = d.find("input[name='lname']").val();
		const email = d.find("input[name='email']").val();
		const phone = d.find("input[name='phone']").val();
		const course;
		const code;

		if (fname == "") {
			msg += "Please enter first name\n";
			isOK = false;
		}
		if (lname == "") {
			msg += "Please enter last name\n";
			isOK = false;
		}
		if (email == "") {
			msg += "Please enter email\n";
			isOK = false;
		} else {
			if (SITEForms.isValidEmail(email) === false) {
				msg += "Please enter valid email\n";
				isOK = false;
			}
		}
		if (phone == "") {
			msg += "Please enter phone\n";
			isOK = false;
		}
		//For memeber area
		if (formID == "MemberbookForm") {
			const course = jQuery("#course_type option:selected").val();
			const code = d.find("input[name='code']").val();

			if (course == "") {
				msg += "Please select course\n";
				isOK = false;
			}
			if (code == "") {
				msg += "Please enter Code\n";
				isOK = false;
			}
		}
		//End
		if (code!='' && formID === "MemberbookForm") {
			var data = {
				'action': 'my_action',
				'codes': code
			};
			var ajaxurl = {
				'url' : '/wp-admin/admin-ajax.php',
			}

			jQuery.post(
				ajaxurl,
				data,
				(response) => {
					if (response=="0") {
						msg += 'Please enter valid code.\n';
						isOK = false;

						if (isOK == false) {
							alert(msg);
							return false;
						}

					} else {
						if (isOK === false) {
							alert(msg);
							return false;
						}

						if (isOK === true) {
							SITEForms.submitAjax(formID);
							return false;
						}
					}
				}
			)

		} else {
			if (isOK === false) {
				alert(msg);
				return false;
			}

			if (isOK === true) {
				SITEForms.submitAjax(formID);
				return false;
			}
		}
		return false;
	}
}

function checkScript() {
	console.log("Good to Go");
}

checkScript();

jQuery(document).ready(function() {

	// Collection Page - Menu functionality
	// When a menu element (horse type) is clicked...
	jQuery('ul.horse-type li').click(() => {

		// Pull the horse type
		const tab_id = jQuery(this).attr('data-tab');

		// Show clicked horse type, hide the rest.
		jQuery('ul.horse-type li').removeClass('current');
		jQuery('.tab-content').removeClass('current');

		jQuery(this).addClass('current');
		jQuery("#" + tab_id).addClass('current');
	})


	// Header menu mobile toggle functionality
	jQuery('#toggleNav').click(() => {
		jQuery('#mobileNav').slideToggle(300, () => {
			jQuery('#openNav').toggleClass('hide');
			jQuery('#closeNav').toggleClass('hide');
		})
	})

});
