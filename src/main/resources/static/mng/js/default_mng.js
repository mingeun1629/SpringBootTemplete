var eng_num = /[^a-zA-Z0-9_-]/g;

var eng_kor = /[^a-zA-Zㄱ-ㅎ가-힣]/g;

var eng_kor_num = /[^a-zA-Zㄱ-ㅎ가-힣0-9]/g;

var num = /[^0-9]/g;

var eng = /[^a-zA-Z]/g;

var kor = /[ㄱ-ㅎ가-힣]/g;

var email = /[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; ;

var emailf = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

var password = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;

var space = /\s/g;

function f_point_return(idx){
	$.post('./point_update.php', {act: 'content_view', idx: idx}, function (data) {
		if(data) {
			$('#modal-default-content').html(data);
			$('#modal-default').modal();
		}
	});

	return false;
}

function del(url) {
	if(confirm("정말 삭제하시겠습니까? 삭제된 자료는 복구되지 않습니다.")) {
		hidden_ifrm.location.href = url;
	}

	return false;
}

function group_complete(idx){
    if(idx > 0){
		if(confirm("정말 완료하시겠습니까?")) {
			$.post('./group_update.php', {act: 'group_complete', idx: idx}, function (data) {
				if(data=='Y') {
					alert('처리되었습니다.');
				} else {
					alert('잘못된 접근입니다.');
				}
				document.location.reload();            
			});
		}
    }
}

function group_cancel(){
    var obj = f_checkbox_cnt();
    var ot_pcode = obj.ot_pcode;
    
    if(ot_pcode=='') {
		return false;
	}
	if(confirm("정말 취소하시겠습니까?")) {
		$.post('./group_update.php', {act: 'group_cancel', ot_pcode: ot_pcode}, function (data) {
			if(data=='Y') {
				alert('처리되었습니다.');
			} else if(data=='gt_complete') {
				alert('입금 완료된 건은 취소되지 않습니다.');
			} else {
				alert('잘못된 접근입니다.');
			}
			document.location.reload();
		});
	}
}

function f_checkbox_all(obj) {
	$('input:checkbox[name="'+obj+'[]"]').each(function() {
		if($(this).prop('checked')==true) {
			$(this).prop('checked', false);
		} else {
			$(this).prop('checked', true);
		}
	});

	return false;
}

function f_notice_form(division, idx){
    var url = "notice_form.php";
    
    if(division=='update'){
        url = url + '?act=update&nt_idx='+idx;
    }
    document.location.href = url;

}

function f_product_del(pt_idx,st_type) {

    if(confirm("정말 삭제하시겠습니까? 삭제된 자료는 복구되지 않습니다.")) {

        $.post('./product_update.php', {act: 'delete', pt_idx: pt_idx}, function (data) {

            if(data=='Y') {

                alert('삭제되었습니다.');

                document.location.href = "./product_list.php?st_type="+st_type;

                //document.location.reload();

            } else {

                alert('잘못된 접근입니다.');

                document.location.reload();

            }

        });

    }



    return false;

}



function f_post_del(url, idx) {

	if(confirm("정말 삭제하시겠습니까? 삭제된 자료는 복구되지 않습니다.")) {

		$.post(url, {act: 'delete', idx: idx}, function (data) {

			if(data=='Y') {

				alert('삭제되었습니다.');

				document.location.reload();

			}

		});

	}



	return false;

}



function f_del(url, act, idx) {

    if(confirm("정말 삭제하시겠습니까? 삭제된 자료는 복구되지 않습니다.")) {

        $.post(url, {act: act, idx: idx}, function (data) {

            if(data=='Y') {

                alert('삭제되었습니다.');

                document.location.reload();

            }

        });

    }



    return false;

}



$(document).ready(function () {

	$(document).on("keyup", "input:text[numberOnly]", function() {$(this).val( $(this).val().replace(/[^0-9]/gi,"") );});

	$(document).on("keyup", "input:text[datetimeOnly]", function() {$(this).val( $(this).val().replace(/[^0-9:\-]/gi,"") );});

});



(function ($) {

	'use strict';

	$(function () {

		$('[data-toggle="offcanvas"]').on("click", function () {

			$('.sidebar-offcanvas').toggleClass('active')

		});

        $('.filebox').on("click", ".btn_remove", function (evt) {

            evt.preventDefault();

            evt.stopPropagation();

            var ele = $(this).parent();

            ele.find('input[type="file"]').val('');

            // ele.find('.file_box').css('border', '1px dashed #ddd');

            ele.find('.file_box').html('<i class="mdi mdi-plus"></i>');

            ele.find('.file_on').val('');

            ele.find('.del').val('1');

            ele.find('.btn_remove').hide();

        });

	});

})(jQuery);



(function ($) {

	'use strict';

	$(document).on('mouseenter mouseleave', '.sidebar .nav-item', function (ev) {

		var body = $('body');

		var sidebarIconOnly = body.hasClass("sidebar-icon-only");

		var sidebarFixed = body.hasClass("sidebar-fixed");

		if (!('ontouchstart' in document.documentElement)) {

			if (sidebarIconOnly) {

				if (sidebarFixed) {

					if (ev.type === 'mouseenter') {

						body.removeClass('sidebar-icon-only');

					}

				} else {

					var $menuItem = $(this);

					if (ev.type === 'mouseenter') {

						$menuItem.addClass('hover-open')

					} else {

						$menuItem.removeClass('hover-open')

					}

				}

			}

		}

	});

})(jQuery);



(function ($) {

	'use strict';

	$(function () {

		var body = $('body');

		var contentWrapper = $('.content-wrapper');

		var scroller = $('.container-scroller');

		var footer = $('.footer');

		var sidebar = $('.sidebar');

		sidebar.on('show.bs.collapse', '.collapse', function () {

			sidebar.find('.collapse.show').collapse('hide');

		});

		applyStyles();



		function addActiveClass(element) {

			if (current === "") {

				//for root url

				if (element.attr('href').indexOf("index.html") !== -1) {

					element.parents('.nav-item').last().addClass('active');

					if (element.parents('.sub-menu').length) {

						element.closest('.collapse').addClass('show');

						element.addClass('active');

					}

				}

			} else {

				//for other url

				if (element.attr('href').indexOf(current) !== -1) {

					//element.parents('.nav-item').last().addClass('active');

					if (element.parents('.sub-menu').length) {

						element.closest('.collapse').addClass('show');

						element.addClass('active');

					}

					if (element.parents('.submenu-item').length) {

						element.addClass('active');

					}

				}

			}

		}

		var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');

		$('.nav li a', sidebar).each(function () {

			var $this = $(this);

			addActiveClass($this);

		})



		function applyStyles() {

			if (!body.hasClass("rtl")) {

				if ($('.settings-panel .tab-content .tab-pane.scroll-wrapper').length) {

					const settingsPanelScroll = new PerfectScrollbar('.settings-panel .tab-content .tab-pane.scroll-wrapper');

				}

				if ($('.chats').length) {

					const chatsScroll = new PerfectScrollbar('.chats');

				}

				if (body.hasClass("sidebar-fixed")) {

					if ($('#sidebar').length) {

						var fixedSidebarScroll = new PerfectScrollbar('#sidebar .nav');

					}

				}

			}

		}

		$('[data-toggle="minimize"]').on("click", function () {

			if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {

				body.toggleClass('sidebar-hidden');

			} else {

				body.toggleClass('sidebar-icon-only');

			}

		});

		$(".form-check label,.form-radio label").append('<i class="input-helper"></i>');

		$('[data-toggle="horizontal-menu-toggle"]').on("click", function () {

			$(".horizontal-menu .bottom-navbar").toggleClass("header-toggled");

		});

		var navItemClicked = $('.horizontal-menu .page-navigation >.nav-item');

		navItemClicked.on("click", function (event) {

			if (window.matchMedia('(max-width: 991px)').matches) {

				if (!($(this).hasClass('show-submenu'))) {

					navItemClicked.removeClass('show-submenu');

				}

				$(this).toggleClass('show-submenu');

			}

		})

		$(window).scroll(function () {

			if (window.matchMedia('(min-width: 992px)').matches) {

				var header = $('.horizontal-menu');

				if ($(window).scrollTop() >= 70) {

					$(header).addClass('fixed-on-scroll');

				} else {

					$(header).removeClass('fixed-on-scroll');

				}

			}

		});

	});

})(jQuery);





function f_chag_seller(mt_idx) {

	$.post('./member_update.php', {act: 'chg_seller', mt_idx_t: mt_idx}, function (data) {

		if(data=='Y') {

			alert('판매자로 전환되었습니다.');

			document.location.reload();

		}

	});



	return false;

}



function f_retire_mem(mt_idx) {

	if(confirm("정말 탈퇴처리하겠습니까?")) {

		$.post('./member_update.php', {act: 'retire', mt_idx_t: mt_idx}, function (data) {

			if(data=='Y') {

				alert('관리자권한 회원탈퇴 처리되었습니다.');

				document.location.reload();

			}else if(data=='Point'){
				alert('보유 포인트가 있습니다.');

				document.location.reload();                
            }

		});

	}



	return false;

}



function f_copy_product(pt_idx) {

	if(confirm("선택된 상품으로 복사등록하시겠습니까?")) {

		alert(pt_idx);

	}



	return false;

}



function f_select_category(tt, st_type) {

	$.post('./product_update.php', {act: 'select_category', tt_t: tt, st_type: st_type}, function (data) {

		if(data) {

			$('#select_category_box').html(data);

		}

	});



	if(tt=='1') {

		$('#f_select_category_btn1').addClass('btn-info text-white');

		$('#f_select_category_btn2').removeClass('btn-info text-white');

	} else {

		$('#f_select_category_btn1').removeClass('btn-info text-white');

		$('#f_select_category_btn2').addClass('btn-info text-white');

	}



	return false;

}



(function ($) {

	'use strict';

	$(function () {

		/* Code for attribute data-custom-class for adding custom class to tooltip */

		if (typeof $.fn.popover.Constructor === 'undefined') {

			throw new Error('Bootstrap Popover must be included first!');

		}

		var Popover = $.fn.popover.Constructor;

		// add customClass option to Bootstrap Tooltip

		$.extend(Popover.Default, {

			customClass: ''

		});

		var _show = Popover.prototype.show;

		Popover.prototype.show = function () {

			// invoke parent method

			_show.apply(this, Array.prototype.slice.apply(arguments));

			if (this.config.customClass) {

				var tip = this.getTipElement();

				$(tip).addClass(this.config.customClass);

			}

		};

		$('[data-toggle="popover"]').popover()

	});

})(jQuery);



function f_category_select_reset(ct_rlevel) {

	if(ct_rlevel==0) {

		$('#category_selectecd1').html('<li class="list-group-flush d-flex justify-content-between align-items-center product_category_list_group"><span class="pl-2 pb-2">중분류</span></li>');

		// $('#category_selectecd2').html('<li class="list-group-flush d-flex justify-content-between align-items-center product_category_list_group"><span class="pl-2 pb-2">소분류</span></li>');

		// $('#category_selectecd3').html('<li class="list-group-flush d-flex justify-content-between align-items-center product_category_list_group"><span class="pl-2 pb-2">제조방법</span></li>');

		// $('#category_selectecd4').html('<li class="list-group-flush d-flex justify-content-between align-items-center product_category_list_group"><span class="pl-2 pb-2">소재</span></li>');

		// $('#category_selectecd5').html('<li class="list-group-flush d-flex justify-content-between align-items-center product_category_list_group"><span class="pl-2 pb-2">공정</span></li>');

	} else if(ct_rlevel==1) {

		// $('#category_selectecd2').html('<li class="list-group-flush d-flex justify-content-between align-items-center product_category_list_group"><span class="pl-2 pb-2">소분류</span></li>');

		// $('#category_selectecd3').html('<li class="list-group-flush d-flex justify-content-between align-items-center product_category_list_group"><span class="pl-2 pb-2">제조방법</span></li>');

		// $('#category_selectecd4').html('<li class="list-group-flush d-flex justify-content-between align-items-center product_category_list_group"><span class="pl-2 pb-2">소재</span></li>');

		// $('#category_selectecd5').html('<li class="list-group-flush d-flex justify-content-between align-items-center product_category_list_group"><span class="pl-2 pb-2">공정</span></li>');

	} else if(ct_rlevel==2) {

		$('#category_selectecd3').html('<li class="list-group-flush d-flex justify-content-between align-items-center product_category_list_group"><span class="pl-2 pb-2">제조방법</span></li>');

		$('#category_selectecd4').html('<li class="list-group-flush d-flex justify-content-between align-items-center product_category_list_group"><span class="pl-2 pb-2">소재</span></li>');

		$('#category_selectecd5').html('<li class="list-group-flush d-flex justify-content-between align-items-center product_category_list_group"><span class="pl-2 pb-2">공정</span></li>');

	} else if(ct_rlevel==3) {

		$('#category_selectecd4').html('<li class="list-group-flush d-flex justify-content-between align-items-center product_category_list_group"><span class="pl-2 pb-2">소재</span></li>');

		$('#category_selectecd5').html('<li class="list-group-flush d-flex justify-content-between align-items-center product_category_list_group"><span class="pl-2 pb-2">공정</span></li>');

	} else if(ct_rlevel==4) {

		$('#category_selectecd5').html('<li class="list-group-flush d-flex justify-content-between align-items-center product_category_list_group"><span class="pl-2 pb-2">공정</span></li>');

	}



	return false;

}



function f_category_select(ct_rlevel, ct_id) {

	$.post('./product_update.php', {act: 'category_rlevel', ct_rlevel: ct_rlevel, ct_id: ct_id}, function (data) {

		if(data) {

			$('#category_selectecd'+ct_rlevel).html(data);



			f_category_select_reset(ct_rlevel);

		}

	});



	return false;

}



function f_category_selected(ct_level, ct_id) {

	$('.category_selected').each(function(i, obj) {

		$('.category_selected').removeClass('category_selected_active');

	});

	$('#category_selected_'+ct_id).addClass('category_selected_active');



	$.post('./product_update.php', {act: 'category_selectecd', ct_level: ct_level, ct_id: ct_id}, function (data) {

		var json_data = JSON.parse(data);



		if(json_data.ca_name_breadcrumb_t) {

			$('#selected_category_t').html(json_data.ca_name_breadcrumb_t);

			$('#serach_category_txt').val('');

			$('#serach_category_box').hide();

			$('#ct_id').val(json_data.ct_id);

			$('#ct_pid').val(json_data.ct_pid);



			/*if (json_data.ct_pid==='13') { // 바로배송 고정

                f_pt_supplement_select('Y');

                $(document).find('.supplement_wrap').removeClass('d-none');

            } else {

                $(document).find('.supplement_wrap').addClass('d-none');

			}*/

		}



		if(json_data.ct_level) {

			f_category_select_reset(json_data.ct_level);

		} else {

			f_category_select_reset(ct_level);

		}

	});



	return false;

}



function f_search_category(stxt) {

	$('#serach_category_box').show();

	$.post('./product_update.php', {act: 'search_category', stxt: stxt}, function (data) {

		if(data) {

			$('#serach_category_box').html(data);

		}

	});



	return false;

}



function f_pt_selling_date_chk(chk_t) {

	if(chk_t=='Y') {

		$('#pt_selling_date_box').show();

		$('#pt_selling_date_box').css('list-style', 'none');

		$('#pt_selling_date_chk1').addClass('btn-info text-white');

		$('#pt_selling_date_chk2').removeClass('btn-info text-white');

	} else {

		$('#pt_selling_date_box').hide();

		$('#pt_selling_date_chk1').removeClass('btn-info text-white');

		$('#pt_selling_date_chk2').addClass('btn-info text-white');

	}

	$('#pt_selling_date_chk').val(chk_t);



	return false;

}



function f_pt_sale_chk(chk_t) {

	if(chk_t=='Y') {

		$('#f_pt_sale_box1').show();

		$('#f_pt_sale_box2').show();

		$('#f_pt_sale_box1').css('list-style', 'none');

		$('#f_pt_sale_box2').css('list-style', 'none');



		$('#f_pt_sale_btn1').addClass('btn-info text-white');

		$('#f_pt_sale_btn2').removeClass('btn-info text-white');

	} else {

		$('#f_pt_sale_box1').hide();

		$('#f_pt_sale_box2').hide();

		$('#pt_discount').val('');

        f_pt_discount(0);



        $('#f_pt_sale_btn1').removeClass('btn-info text-white');

		$('#f_pt_sale_btn2').addClass('btn-info text-white');

	}

	$('#pt_sale_chk').val(chk_t);



	return false;

}



function f_pt_sale_type_chk(chk_t) {

	if(chk_t=='Y') {

		$('#f_pt_sale_type_chk1').addClass('btn-info text-white');

		$('#f_pt_sale_type_chk2').removeClass('btn-info text-white');

	} else {

		$('#f_pt_sale_type_chk1').removeClass('btn-info text-white');

		$('#f_pt_sale_type_chk2').addClass('btn-info text-white');

	}

	$('#pt_sale_type_chk').val(chk_t);

    f_pt_discount();



	return false;

}



function f_pt_selling_date_range(nm, sd, ed) {

	var nm_t = Number(nm-1);



	$('#pt_selling_sdate').val(sd);

	$('#pt_selling_edate').val(ed);



	$('.c_pt_selling_date_range').each(function(i, obj) {

		if(nm_t==i) {

			$('#f_pt_selling_date_range'+nm).addClass('btn-info text-white');

		} else {

			$('#f_pt_selling_date_range'+Number(i+1)).removeClass('btn-info text-white');

		}

	});



	return false;

}



function f_pt_tax_type(nm) {

	var nm_t = Number(nm-1);



	$('.c_pt_tax_type').each(function(i, obj) {

		if(nm_t==i) {

			$('#f_pt_tax_type'+nm).addClass('btn-info text-white');

		} else {

			$('#f_pt_tax_type'+Number(i+1)).removeClass('btn-info text-white');

		}

	});

	$('#pt_tax_type').val(nm);



	return false;

}



function f_pt_option_chk_1(chk_t) {

	if(chk_t=='1') {

		$('#f_pt_option_chk1').addClass('btn-info text-white');

		$('#f_pt_option_chk2').removeClass('btn-info text-white');

		$('.c_pt_option_chk1').hide();

	} else {

		$('#f_pt_option_chk1').removeClass('btn-info text-white');

		$('#f_pt_option_chk2').addClass('btn-info text-white');

		$('.c_pt_option_chk1').show();

		$('.c_pt_option_chk1').css('list-style', 'none');

	}

	$('#pt_option_chk').val(chk_t);



	return false;

}



function f_pt_option_direct(chk_t) {

	if(chk_t=='3') {

		$('#f_pt_option_chk3').addClass('btn-info text-white');

		$('#f_pt_option_chk4').removeClass('btn-info text-white');

		$('.c_pt_option_chk2').hide();

	} else {

		$('#f_pt_option_chk3').removeClass('btn-info text-white');

		$('#f_pt_option_chk4').addClass('btn-info text-white');

		$('.c_pt_option_chk2').show();

		$('.c_pt_option_chk2').css('list-style', 'none');

	}

	$('#pt_option_direct').val(chk_t);



	return false;

}



function preview_image_sigle_selected(e) {

	var files = e.target.files;

	var filesArr = Array.prototype.slice.call(files);



	filesArr.forEach(function(f) {

		if(!f.type.match("image.*")) {

			alert("확장자는 이미지 확장자만 가능합니다.");

			return;

		}



		var reader = new FileReader();

		reader.onload = function(e) {

			// $("#pt_image1_box").css('border', 'none');

			$("#nt_image1_box").html('<img src="'+e.target.result+'" />');

			$('#nt_image1_on').val(e.target.result)

		}

		reader.readAsDataURL(f);

	});

}



//업로드 이미지 미리보기

function upload_preview(input) {

    var id = input.getAttribute('id');

    if (!id) { id = $(input)[0].getAttribute('id'); }

    if (!id) { id = $(input).attr('id'); }



    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {



            var image = new Image();

            image.src = e.target.result;

            image.onload = function () {

            	var imgKb = input.files[0].size / 1024;

                console.log(this.width, this.height, input.files[0].size, Math.floor(imgKb / 1024));

                if (Math.floor(imgKb / 1024) >= 2) {

                    alert("이미지 용량이 2MB이상 입니다. 용량을 조금 줄여서 업로드해주세요");

                    this.value = null;

                    return false;

				}

                if (this.width > 3100) {//this.height > 3100 ||

                    alert("이미지 사이즈가 3000이상 입니다. 사이즈를 조금 줄여서 업로드해주세요");

                    this.value = null;

                    return false;

                } else {

                    $("#"+id+"_box").html('<img src="'+e.target.result+'" />');

                    //$("#"+id+"_on").val(e.target.result);

                    $("#"+id+"_on").parent().find('.btn_remove').show();

				}

            }

        }

        reader.readAsDataURL(input.files[0]);

    } else {

        $("#"+id+"_box").html('<i class="mdi mdi-plus"></i>');

        $("#"+id+"_on").val('');

        $("#"+id+"_on").parent().find('.btn_remove').hide();

	}

}



var sel_files = [];



function preview_image_multi_selected(e, obj_id) {

	var files = e.target.files;

	var filesArr = Array.prototype.slice.call(files);



	if(filesArr.lengths>9) {

		alert("추가이미지는 최대 9개까지 가능합니다.");

		return;

	} else {

		filesArr.forEach(function(f) {

			if(!f.type.match("image.*")) {

				alert("확장자는 이미지 확장자만 가능합니다.");

				return;

			}



			sel_files.push(f);



			var reader = new FileReader();

			reader.onload = function(e) {

				// $("#pt_image"+obj_id+"_box").css('border', 'none');

				$("#nt_image"+obj_id+"_box").html('<img src="'+e.target.result+'" />');

			}

			reader.readAsDataURL(f);

		});

	}

}



function f_pat_kc_chk(chk_t) {

	if(chk_t=='Y') {

		$('#f_pat_kc_chk1').addClass('btn-info text-white');

		$('#f_pat_kc_chk2').removeClass('btn-info text-white');

		$('#f_pat_kc_chk_box').show();

	} else {

		$('#f_pat_kc_chk1').removeClass('btn-info text-white');

		$('#f_pat_kc_chk2').addClass('btn-info text-white');

		$('#f_pat_kc_chk_box').hide();

	}

	$('#pat_kc_chk').val(chk_t);



	return false;

}



function f_pat_used(chk_t) {

	if(chk_t=='N') {

		$('#f_pat_used1').addClass('btn-info text-white');

		$('#f_pat_used2').removeClass('btn-info text-white');

	} else {

		$('#f_pat_used1').removeClass('btn-info text-white');

		$('#f_pat_used2').addClass('btn-info text-white');

	}

	$('#pat_used').val(chk_t);



	return false;

}



function f_pat_child(chk_t) {

	if(chk_t=='Y') {

		$('#f_pat_child1').addClass('btn-info text-white');

		$('#f_pat_child2').removeClass('btn-info text-white');

	} else {

		$('#f_pat_child1').removeClass('btn-info text-white');

		$('#f_pat_child2').addClass('btn-info text-white');

	}

	$('#pat_child').val(chk_t);



	return false;

}



function f_ppt_chk(ppt_chk, pt_idx) {

	$.post('./product_provide_update.php', {act:'provide_content', ppt_chk: ppt_chk, pt_idx: pt_idx}, function (data) {

		if(data) {

			$('#ppt_content_box').html(data);

		}

	});



	return false;

}



function f_pdt_chk(chk_t) {

	if(chk_t=='Y') {

		$('#f_pdt_chk1').addClass('btn-info text-white');

		$('#f_pdt_chk2').removeClass('btn-info text-white');

		$('#pdt_chk_box').show();

	} else {

		$('#f_pdt_chk1').removeClass('btn-info text-white');

		$('#f_pdt_chk2').addClass('btn-info text-white');

		$('#pdt_chk_box').hide();

	}

	$('#pdt_chk').val(chk_t);



	return false;

}



function f_pdt_type(nm) {

	$('.c_pdt_type').each(function(i, obj) {

		var ii = Number(i+1);

		if(nm==ii) {

			$('#f_pdt_type'+ii).addClass('btn-info text-white');

		} else {

			$('#f_pdt_type'+ii).removeClass('btn-info text-white');

		}

	});

	$('#pdt_type').val(nm);



	return false;

}



function f_pdt_attritute(chk_t) {

	if(chk_t=='1') {

		$('#f_pdt_attritute1').addClass('btn-info text-white');

		$('#f_pdt_attritute2').removeClass('btn-info text-white');

	} else {

		$('#f_pdt_attritute1').removeClass('btn-info text-white');

		$('#f_pdt_attritute2').addClass('btn-info text-white');

	}

	$('#pdt_attritute').val(chk_t);



	return false;

}



function f_pdt_set_chk(chk_t) {

	if(chk_t=='Y') {

		$('#f_pdt_set_chk1').addClass('btn-info text-white');

		$('#f_pdt_set_chk2').removeClass('btn-info text-white');

	} else {

		$('#f_pdt_set_chk1').removeClass('btn-info text-white');

		$('#f_pdt_set_chk2').addClass('btn-info text-white');

	}

	$('#pdt_set_chk').val(chk_t);



	return false;

}



function f_pdt_price_type(pdt_pay_type, pt_idx) {

	$.post('./product_deliveryInfo_update.php', {act:'pay_type', pdt_pay_type: pdt_pay_type, pt_idx: pt_idx}, function (data) {

		$('#pdt_price_type_box').html(data);

	});



	return false;

}



function f_pdt_price_type_template(pdt_pay_type, ptl_idx) {

	$.post('./product_deliveryInfo_update.php', {act:'pay_type', pdt_pay_type: pdt_pay_type, ptl_idx: ptl_idx}, function (data) {

		$('#pdt_price_type_box').html(data);

	});



	return false;

}



function f_pdt_price_section_type(chk_t) {

	if(chk_t=='2') {

		$('#pdt_price_section_type2_box').show();

		$('#pdt_price_section_type3_box').hide();

	} else {

		$('#pdt_price_section_type2_box').hide();

		$('#pdt_price_section_type3_box').show();

	}



	return false;

}



function f_pdt_add_section_price_chk(chk_t) {

	if(chk_t=='Y') {

		$('#pdt_add_section_price_chk_box').show();

	} else {

		$('#pdt_add_section_price_chk_box').hide();

	}



	return false;

}



function f_pdt_add_section_price_type_chk(chk_t) {

	if(chk_t=='2') {

		$('#pdt_add_section_price_type_chk1_box').show();

		$('#pdt_add_section_price_type_chk2_box').hide();

	} else {

		$('#pdt_add_section_price_type_chk1_box').hide();

		$('#pdt_add_section_price_type_chk2_box').show();

	}



	return false;

}



function f_pdt_install_price(chk_t) {

	if(chk_t=='Y') {

		$('#f_pdt_install_price1').addClass('btn-info text-white');

		$('#f_pdt_install_price2').removeClass('btn-info text-white');

	} else {

		$('#f_pdt_install_price1').removeClass('btn-info text-white');

		$('#f_pdt_install_price2').addClass('btn-info text-white');

	}

	$('#pdt_install_price').val(chk_t);



	return false;

}



function f_pt_supplement_select(chk_t) {

	if(chk_t=='Y') {

		$('#f_pt_supplement_select1').addClass('btn-info text-white');

		$('#f_pt_supplement_select2').removeClass('btn-info text-white');

		$('#f_pt_supplement_select_box').show();

	} else {

		$('#f_pt_supplement_select1').removeClass('btn-info text-white');

		$('#f_pt_supplement_select2').addClass('btn-info text-white');

		$('#f_pt_supplement_select_box').hide();

	}

	$('#pt_supplement_select').val(chk_t);



	return false;

}



function f_pt_supplement_name_num(num) {

	$('#f_pt_supplement_input_box').html('');



	if(num>0) {

		for(var i=1;i<=num;i++) {

			$('#f_pt_supplement_input_box').append('<li class="row align-items-center mt-2"><div class="col-sm-4"><p>추가상품명</p><input type="text" name="pst_title[]" id="pst_title'+i+'" value="" class="form-control form-control-sm" /></div><div class="col-sm-8"><p>추가상품값</p><input type="text" name="pst_value[]" id="pst_value'+i+'" value="" class="form-control form-control-sm" /></div></li>');

		}

	}

}



function f_ppbt_point_chk(chk_t) {

	if(chk_t=='Y') {

		$('#f_ppbt_point_chk1').addClass('btn-info text-white');

		$('#f_ppbt_point_chk2').removeClass('btn-info text-white');

	} else {

		$('#f_ppbt_point_chk1').removeClass('btn-info text-white');

		$('#f_ppbt_point_chk2').addClass('btn-info text-white');

	}

	$('#ppbt_point_chk').val(chk_t);



	return false;

}



function f_pt_card_free_interest(chk_t) {

	if(chk_t=='Y') {

		$('#f_pt_card_free_interest1').addClass('btn-info text-white');

		$('#f_pt_card_free_interest2').removeClass('btn-info text-white');

	} else {

		$('#f_pt_card_free_interest1').removeClass('btn-info text-white');

		$('#f_pt_card_free_interest2').addClass('btn-info text-white');

	}

	$('#pt_card_free_interest').val(chk_t);



	return false;

}



function f_product_option(pt_idx) {

    $.post('./product_update.php', {act: 'product_option', pt_idx: pt_idx}, function (data) {

        if(data) {

            $('#modal-default-content').html(data);



            $('#modal-default').modal();

        }

    });



    return false;

}

function f_product_option_input() {

    f_pt_option_input_num(2);



    var f = document.getElementById('product_option');

    var formData = new FormData(f);



    var object = {};

    formData.forEach((value, key) => {

        if(!Reflect.has(object, key)){

            object[key] = value;



            return;

        }

        if(!Array.isArray(object[key])){

            object[key] = [object[key]];

        }

        object[key].push(value);

    });



	$('#pt_option_val1').val('');

    $('#pt_option_val2').val('');

    $('#modal-default').modal('toggle');



    return false;

}



function f_get_cafegory(ct_level, ct_id, tbl) {

    if (ct_level==='0') {

        $('#ct_id2').val('');

    }

    $.post(get_url + '/proc.php', {act: 'sch_category', ct_level: ct_level, ct_id: ct_id, tbl: tbl}, function (data) {

        data = JSON.parse(data);

        if(data) {

			$('#ct_id2').html(data.result);

        }

    });



    return false;

}

function f_cafegory(ct_level, ct_id, option_size, obj_idx) {

	$.post(get_url + '/proc.php', {act: 'sch_category', ct_level: ct_level, ct_id: ct_id}, function (data) {

		data = JSON.parse(data);

		if(data) {

		}

	});



    return false;

}



function f_pt_option_input_num(num) {

	$('#f_pt_option_input_box').html('');



	if(num>0) {

		for(var i=1;i<=num;i++) {

			var placeholder_msg = "예) S,M,L,XL";

			var small_msg = "";

			var is_readonly = "";

			$('#f_pt_option_input_box').append('<li class="row mt-2"><div class="col-sm-4"><p>옵션명'+i+'</p><input type="text" name="pt_option_name'+i+'" id="pt_option_name'+i+'" value="" class="form-control form-control-sm" maxlength="50" placeholder="예)사이즈" /></div><div class="col-sm-8"><p>옵션값'+i+'</p><input type="text" name="pt_option_val'+i+'" id="pt_option_val'+i+'" value="" class="form-control form-control-sm" maxlength="100" placeholder="'+placeholder_msg+'" '+is_readonly+' />'+small_msg+'</div></li>');

		}

	}

}



function f_pt_option_input_direct(num) {

	$('#f_pt_option_list_box').html('');



	if(num>0) {

		for(var i=1;i<=num;i++) {

			$('#f_pt_option_list_box').append('<li class="mt-2"><input type="text" name="pt_option_direct_val[]" id="pt_option_direct_val'+i+'" value="" class="form-control form-control-sm" maxlength="100" placeholder="예)색상" /></li>');

		}

	}

}



function f_update_product_info(form_act, pt_idx) {

	$.post('./product_update.php', {act: 'update_info', pt_idx: pt_idx}, function (data) {

		var json_data = JSON.parse(data);

		var product_t = json_data.data.product_t;

		var setup_t = json_data.data.setup_t;

		// var product_afterservice_info_t = json_data.data.product_afterservice_info_t;

		var product_attribute_t = json_data.data.product_attribute_t;

		// var product_deliveryInfo_t = json_data.data.product_deliveryInfo_t;

		var product_option_t = json_data.data.product_option_t;

		//var product_provide_t = json_data.data.product_provide_t;

		// var product_purchase_benefit_t = json_data.data.product_purchase_benefit_t;

		// var product_search_config_t = json_data.data.product_search_config_t;

		// var product_sellercode_t = json_data.data.product_sellercode_t;

		var product_supplement_t = json_data.data.product_supplement_t;



		if(product_t.pt_idx) {

			$('#act').val(form_act);

			$('#pt_idx').val(product_t.pt_idx);



			$('#ct_id').val(product_t.ct_id);

			$('#ct_pid').val(product_t.ct_pid);

			f_category_selected('', product_t.ct_id);



			$('#pt_title').val(product_t.pt_title);



			$('#pt_selling_price').val(product_t.pt_selling_price);

			/*

			$('#pt_ipga_price').val(product_t.pt_ipga_price);

			$('#pt_price_add1').val(product_t.pt_price_add1);

			$('#pt_price_add2').val(product_t.pt_price_add2);

			$('#pt_price_add3').val(product_t.pt_price_add3);

			$('#pt_price_add4').val(product_t.pt_price_add4);

			$('#pt_price_add5').val(product_t.pt_price_add5);

			$('#pt_price_add6').val(product_t.pt_price_add6);

			$('#pt_price_add7').val(product_t.pt_price_add7);

			$('#pt_price_add8').val(product_t.pt_price_add8);



            var st_price_rate_t = setup_t.st_price_rate;

			$('#pt_price_add8_dong').val(product_t.pt_price_add8*st_price_rate_t);

			*/



			$('#pt_sale_chk').val(product_t.pt_sale_chk);

			f_pt_sale_chk(product_t.pt_sale_chk);



			if(product_t.pt_sale_chk=='Y') {

				$('#pt_sale_type_chk').val(product_t.pt_sale_type_chk);

				$('#pt_discount').val(product_t.pt_discount);

				setTimeout(function() {

					f_pt_discount(product_t.pt_discount);

				}, 100);

				f_pt_sale_type_chk(product_t.pt_sale_type_chk);

				f_pt_selling_date_chk(product_t.pt_selling_date_chk);

				$('#pt_selling_sdate').val(product_t.pt_selling_sdate);

				$('#pt_selling_edate').val(product_t.pt_selling_edate);

				$('#pt_tax_type').val(product_t.pt_tax_type);

			}



			f_pt_tax_type(product_t.pt_tax_type);

			$('#pt_jaego').val(product_t.pt_jaego);



			$('#pt_option_chk').val(product_t.pt_option_chk);

			if(product_t.pt_option_chk=='2') {

				f_pt_option_chk_1(product_t.pt_option_chk);

				$("input:radio[id='pt_option_type"+product_t.pt_option_type+"']").prop("checked", true);

				$('#pt_option_input_num').val(product_t.pt_option_name_cnt);

				f_pt_option_input_num(product_t.pt_option_name_cnt);



				if(product_t.pt_option_name1) {

					$('#pt_option_name1').val(product_t.pt_option_name1);

					$('#pt_option_val1').val(product_t.pt_option_val1);

				}

				if(product_t.pt_option_name2) {

					$('#pt_option_name2').val(product_t.pt_option_name2);

					$('#pt_option_val2').val(product_t.pt_option_val2);

				}

				if(product_t.pt_option_name3) {

					$('#pt_option_name3').val(product_t.pt_option_name3);

					$('#pt_option_val3').val(product_t.pt_option_val3);

				}

				f_product_option_list(pt_idx);

			}

			if(product_t.pt_option_direct=='4') {

				f_pt_option_direct(product_t.pt_option_direct);

				f_pt_option_input_direct(product_t.pt_option_direct_cnt);

				$('#pt_option_direct_val1').val(product_t.pt_option_direct_val1);

				$('#pt_option_direct_val2').val(product_t.pt_option_direct_val2);

				$('#pt_option_direct_val3').val(product_t.pt_option_direct_val3);

				$('#pt_option_direct_val4').val(product_t.pt_option_direct_val4);

				$('#pt_option_direct_val5').val(product_t.pt_option_direct_val5);

			}



			if (product_t.pt_image1) {

				$('#pt_image1_on').val(product_t.pt_image1);

				// $("#pt_image1_box").css('border', 'none');

				$("#pt_image1_box").html('<img src="'+product_t.pt_image1_url+'" />');

            }



			for(var i=2;i<12;i++) {

				var pt_image_url_chk = "product_t.pt_image"+i+"_url";

				pt_image_url_chk = eval(pt_image_url_chk);

				var pt_image_chk = "product_t.pt_image"+i+"_on";

				pt_image_chk = eval(pt_image_chk);



				if(pt_image_url_chk) {

					$('#pt_image'+i+'_on').val(pt_image_chk);

					// $('#pt_image'+i+'_box').css('border', 'none');

					$('#pt_image'+i+'_box').html('<img src="'+pt_image_url_chk+'" />');

				}

			}

			if (product_t.pt_origin_image1_url) {

                $('#pt_origin_image1_box').html('<img src="'+product_t.pt_origin_image1_url+'" />');

            }



			$('#pt_content').val(product_t.pt_content);



			$('#pat_model_fitting').val(product_attribute_t.pat_model_fitting);

			$('#pat_model').val(product_attribute_t.pat_model);

            // $('#pat_MD_comment').val(product_attribute_t.pat_MD_comment);

			// $('#pat_brand').val(product_attribute_t.pat_brand);

			// $('#pat_jejosa').val(product_attribute_t.pat_jejosa);

			$('#pat_kc_chk').val(product_attribute_t.pat_kc_chk);

			f_pat_kc_chk(product_attribute_t.pat_kc_chk);

			$('#pat_kc_info').val(product_attribute_t.pat_kc_info);



			$('#pat_origin1').val(product_attribute_t.pat_origin1);

			setTimeout(function() {

				f_pat_origin('2', product_attribute_t.pat_origin1);

				setTimeout(function() {

					$('#pat_origin2').val(product_attribute_t.pat_origin2);

					f_pat_origin('3', product_attribute_t.pat_origin2);

					$('#pat_origin3').val(product_attribute_t.pat_origin3);



                    /*if (product_attribute_t.pat_origin2==null) {

                        $('#pat_origin2').val('기타');

                        $('#pat_origin_box2').show();

                        $('#pat_origin_etc').prop('required', true);

                    }*/

				}, 200);

			}, 100);



			$('#pat_origin_etc').val(product_attribute_t.pat_origin_etc);

			$('#pat_used').val(product_attribute_t.pat_used);

			f_pat_used(product_attribute_t.pat_used);

			$('#pat_jejo_date').val(product_attribute_t.pat_jejo_date);

			$('#pat_valid_date').val(product_attribute_t.pat_valid_date);

			$('#pat_child').val(product_attribute_t.pat_child);

			f_pat_child(product_attribute_t.pat_child);



			/*

			$('#ppt_chk').val(product_provide_t.ppt_chk);

			f_ppt_chk(product_provide_t.ppt_chk, pt_idx);



			$('#pdt_chk').val(product_deliveryInfo_t.pdt_chk);

			f_pdt_chk(product_deliveryInfo_t.pdt_chk);

			$('#pdt_type').val(product_deliveryInfo_t.pdt_type);

			f_pdt_type(product_deliveryInfo_t.pdt_type);

			$('#pdt_attritute').val(product_deliveryInfo_t.pdt_attritute);

			f_pdt_attritute(product_deliveryInfo_t.pdt_attritute);

			$('#pdt_set_chk').val(product_deliveryInfo_t.pdt_set_chk);

			f_pdt_set_chk(product_deliveryInfo_t.pdt_set_chk);

			$('#pdt_price_type').val(product_deliveryInfo_t.pdt_price_type);

			f_pdt_price_type(product_deliveryInfo_t.pdt_price_type, pt_idx);



			f_pdt_add_section_price_chk(product_deliveryInfo_t.pdt_add_section_price_chk);

			$("input:radio[id='pdt_add_section_price_chk"+product_deliveryInfo_t.pdt_add_section_price_chk_t+"']").prop("checked", true);



			if(product_deliveryInfo_t.pdt_add_section_price_chk=='Y') {

				f_pdt_add_section_price_type_chk(product_deliveryInfo_t.pdt_add_section_price_type_chk);

				$("input:radio[id='pdt_add_section_price_type_chk"+product_deliveryInfo_t.pdt_add_section_price_type_chk_t+"']").prop("checked", true);

			}



			if(product_deliveryInfo_t.pdt_add_section_price_type_chk=='2') {

				$('#pdt_add_section_price2_1').val(product_deliveryInfo_t.pdt_add_section_price2);

			} else {

				$('#pdt_add_section_price2_2').val(product_deliveryInfo_t.pdt_add_section_price2);

			}

			$('#pdt_add_section_price3').val(product_deliveryInfo_t.pdt_add_section_price3);

			$('#pdt_add_section_etc').val(product_deliveryInfo_t.pdt_add_section_etc);

			$('#pdt_install_price').val(product_deliveryInfo_t.pdt_install_price);

			f_pdt_install_price(product_deliveryInfo_t.pdt_install_price);

			$('#pt_start_place_zip').val(product_deliveryInfo_t.pt_start_place_zip);

			$('#pt_start_place_add1').val(product_deliveryInfo_t.pt_start_place_add1);

			$('#pt_start_place_add2').val(product_deliveryInfo_t.pt_start_place_add2);



			$('#pt_return_logis').val(product_deliveryInfo_t.pt_return_logis);

			$('#pt_return_price').val(product_deliveryInfo_t.pt_return_price);

			$('#pt_exchange_price').val(product_deliveryInfo_t.pt_exchange_price);

			$('#pt_return_place_zip').val(product_deliveryInfo_t.pt_return_place_zip);

			$('#pt_return_place_add1').val(product_deliveryInfo_t.pt_return_place_add1);

			$('#pt_return_place_add2').val(product_deliveryInfo_t.pt_return_place_add2);

			*/



			/*

			$('#pait_tel').val(product_afterservice_info_t.pait_tel);

			$('#pait_info').val(product_afterservice_info_t.pait_info);

			$('#pait_unusual').val(product_afterservice_info_t.pait_unusual);

			*/



			f_pt_supplement_select(product_t.pt_supplement_select);



            if(product_t.pt_supplement_select=='Y') {

                $('#pt_supplement_name_num').val(product_t.pt_supplement_name_num);

                f_pt_supplement_name_num(product_t.pt_supplement_name_num);

                setTimeout(function() {

                    for(var i=1;i<11;i++) {

                        var pst_title_t = "product_supplement_t.pst_title"+i;

                        pst_title_t = eval(pst_title_t);

                        var pst_value_t = "product_supplement_t.pst_value"+i;

                        pst_value_t = eval(pst_value_t);

                        var pst_price_t = "product_supplement_t.pst_price"+i;

                        pst_price_t = eval(pst_price_t);



                        if(pst_title_t) {

                            $('#pst_title'+i).val(pst_title_t);

                            $('#pst_value'+i).val(pst_value_t);

                            $('#pst_price'+i).val(pst_price_t);

                        }

                    }

                }, 100);

                f_product_supplement_list(pt_idx);

            }



            /*

            $('#ppbt_min_pay_qty').val(product_purchase_benefit_t.ppbt_min_pay_qty);

            $('#ppbt_max_pay_once').val(product_purchase_benefit_t.ppbt_max_pay_once);

            $('#ppbt_multi_pay_chk').val(product_purchase_benefit_t.ppbt_multi_pay_chk);

            f_ppbt_multi_pay_chk(product_purchase_benefit_t.ppbt_multi_pay_chk);

            $('#ppbt_multi_pay_price').val(product_purchase_benefit_t.ppbt_multi_pay_price);

            $('#ppbt_multi_pay_sale_chk1').val(product_purchase_benefit_t.ppbt_multi_pay_sale_chk1);

            f_ppbt_multi_pay_sale_chk1(product_purchase_benefit_t.ppbt_multi_pay_sale_chk1);

            $('#ppbt_multi_pay_sale_price_per').val(product_purchase_benefit_t.ppbt_multi_pay_sale_price_per);

            $('#ppbt_multi_pay_sale_chk2').val(product_purchase_benefit_t.ppbt_multi_pay_sale_chk2);

            f_ppbt_multi_pay_sale_chk2(product_purchase_benefit_t.ppbt_multi_pay_sale_chk2);

            $('#ppbt_multi_pay_sale_sdate').val(product_purchase_benefit_t.ppbt_multi_pay_sale_sdate);

            $('#ppbt_multi_pay_sale_edate').val(product_purchase_benefit_t.ppbt_multi_pay_sale_edate);

            $('#ppbt_point_price').val(product_purchase_benefit_t.ppbt_point_price);

            $('#ppbt_point_chk').val(product_purchase_benefit_t.ppbt_point_chk);

            f_ppbt_point_chk(product_purchase_benefit_t.ppbt_point_chk);

            $('#ppbt_nointerest_chk').val(product_purchase_benefit_t.ppbt_nointerest_chk);

            f_ppbt_nointerest_chk(product_purchase_benefit_t.ppbt_nointerest_chk);

            $('#ppbt_nointerest_term').val(product_purchase_benefit_t.ppbt_nointerest_term);

            f_ppbt_nointerest_term(product_purchase_benefit_t.ppbt_nointerest_term);

            $('#ppbt_nointerest_sdate').val(product_purchase_benefit_t.ppbt_nointerest_sdate);

            $('#ppbt_nointerest_edate').val(product_purchase_benefit_t.ppbt_nointerest_edate);

            $('#ppbt_freebie').val(product_purchase_benefit_t.ppbt_freebie);

            $('#ppbt_event').val(product_purchase_benefit_t.ppbt_event);

            */



			// $('#psct_tag').val(product_search_config_t.psct_tag);

			// $('#psct_page_title').val(product_search_config_t.psct_page_title);

			// $('#psct_meta_description').val(product_search_config_t.psct_meta_description);



			// $('#pst_code1').val(product_sellercode_t.pst_code1);

			// $('#pst_code2').val(product_sellercode_t.pst_code2);



			// f_pt_sale_now(product_t.pt_sale_now);

			f_pt_show(product_t.pt_show);

		}

	});



	return false;

}



function f_pt_jaego() {

    var pt_jaego = $('#pt_jaego').val()*1;

	if (pt_jaego>0) {

        $(document).find('input[name^=pot_jaego]').each(function() {

            $(this).val(pt_jaego);

        });

	}

}

function f_pt_discount(price) {

	/*if($('#pt_selling_price').val()=='') {

		$('#pt_discount').val('');

		alert('판매가를 먼저 입력바랍니다.');

		$('#pt_selling_price').focus();

		return false;

	}*/



    var pt_price = 0;

    var pt_price_cal = 0;

    var pt_selling_price = $('#pt_selling_price').val()*1;

    var pt_discount = $('#pt_discount').val()*1;

    var pt_discount_per = pt_discount;

    var pt_weight = $('#pt_weight').val()*1;



	if(pt_discount>0) { // price



		if($('#pt_sale_type_chk').val()=='Y') {

			pt_price = (pt_selling_price - pt_discount);

			pt_price_cal = pt_discount;

            pt_discount_per = Math.floor(pt_discount/pt_selling_price*100);

		} else {

			if(pt_discount>=90) {

				alert('할인율은 90%를 넘을 수 없습니다.');

				return false;

			} else {

				pt_price_cal = Math.floor(pt_selling_price*(pt_discount/100));

				pt_price = (pt_selling_price - pt_price_cal);

			}

		}

	} else {

        pt_price_cal = 0;

        pt_price = pt_selling_price;

	}



		if(pt_price<1) {

			$('#pt_price').val('');

			$('#pt_price_t1').html('0');

			$('#pt_price_t2').html('0');

			$('#pt_sale_price').val('0');

			$('#pt_discount').val('');



			alert('판매가보다 할인가가 높을 수 없습니다. 할인가를 확인바랍니다.');

			return false;

		} else {

			$('#pt_price').val(pt_price);

			$('#pt_price_t1').html(comma_num(pt_price));

			$('#pt_price_t2').html(comma_num(pt_price_cal));

			$('#pt_sale_price').val(pt_price_cal);

            $('#pt_discount_per').val(pt_discount_per);

		}



		/*

		var st_commission_t = 0;

		var st_commission_card_t = 0;

		var st_send_cost_t = 0;

		var st_price_rate_t = 0;



		var pt_price_add1_t = 0;

		var pt_price_add2_t = 0;

		var pt_price_add3_t = 0;

		var pt_price_add4_t = 0;

		var pt_price_add5_t = 0;

		var pt_price_add6_t = 0;

		var pt_price_add7_t = 0;

		var pt_price_add8_t = 0;

		$.post(get_url+'/mng/setup_update.php', {act:'commission', pt_price: pt_price, pt_weight: pt_weight}, function (data) {

			if(data) {

				var json_data = JSON.parse(data);

				console.log(json_data);



				st_commission_t = Number(json_data.st_commission);

				st_commission_card_t = Number(json_data.st_commission_card);

				st_send_cost_t = Number(json_data.st_send_cost);

				st_price_rate_t = Number(json_data.st_price_rate);



				pt_price_add1_t = st_send_cost_t*1; //국제운송비

				pt_price_add2_t = (st_commission_t/100); //판매수수료

				pt_price_add3_t = (st_commission_card_t/100); //결제수수료

				pt_price_add4_t = 0; //- 한국부가가치세

				// ((판매가 x KOCO 수수료 10%)+배송비) x 카드수수료 0.45% = 최종소비자가격

                var calc_price = ((pt_price + (pt_price * pt_price_add2_t)) + pt_price_add1_t);

				pt_price_add5_t = Math.floor(calc_price + (calc_price * pt_price_add3_t)); //국내최종과세가격

				pt_price_add6_t = (10/100); //베트남관세

				pt_price_add7_t = 0; //베트남부가가치세

				pt_price_add8_t = (pt_price_add5_t); //



				$('#pdt_price').val(pt_price_add1_t); //국제운송비

				$('#pt_price_add1').val(pt_price_add1_t); //국제운송비

				$('#pt_price_add2').val(pt_price_add2_t); //판매수수료

				$('#pt_price_add3').val(pt_price_add3_t); //결제수수료

				$('#pt_price_add4').val('-'+pt_price_add4_t); //한국부가가치세

				$('#pt_price_add5').val(pt_price_add5_t); //국내최종과세가격

				$('#pt_price_add6').val(pt_price_add6_t); //베트남관세

				$('#pt_price_add7').val(pt_price_add7_t); //베트남부가가치세



				$('#pt_price_add8').val(pt_price_add8_t); //최종소비자가격

				$('#pt_price_add8_dong').val(pt_price_add8_t*st_price_rate_t); //최종소비자가격 x ⑥환율 24.00원 = 최종소비자가격



				//------------------------------------------------------------------------------------------------------

                calc_price = ((pt_selling_price + (pt_selling_price * pt_price_add2_t)) + pt_price_add1_t);

                pt_price_add5_t = Math.floor(calc_price + (calc_price * pt_price_add3_t)); //



                $('#pt_price_add9').val(pt_price_add5_t); //할인 적용전 가격

                //------------------------------------------------------------------------------------------------------

			}

		});

		*/

	//} else {

		// alert('할인가는 0보다 크게 입력바랍니다.');

		// return false;

	//}



	return false;

}



function f_product_option_list(update_chk) {

	if($('#pt_option_name1').val()=='') {

		alert('옵션명1을 입력바랍니다.');

		$('#pt_option_name1').focus();

		return false;

	}

	if($('#pt_option_val1').val()=='') {

		alert('옵션값1을 입력바랍니다.');

		$('#pt_option_val1').focus();

		return false;

	}



	var pt_option_type_chk = '';

	/*$('input:radio[name="pt_option_type"]').each(function() {

		if($(this).prop('checked')==true) {

			pt_option_type_chk = $(this).val();

		}

	});*/

    pt_option_type_chk = $('input[name="pt_option_type"]').val()*1;



    var pt_jaego = $(document).find('#pt_jaego').val()*1;



	$.post('./product_update.php', {

		act:'product_option_list',

		pt_option_name1: $('#pt_option_name1').val(),

		pt_option_name2: $('#pt_option_name2').val(),

		pt_option_name3: $('#pt_option_name3').val(),

		pt_option_val1: $('#pt_option_val1').val(),

		pt_option_val2: $('#pt_option_val2').val(),

		pt_option_val3: $('#pt_option_val3').val(),

		pt_option_type: pt_option_type_chk,

		update_chk: update_chk,

        jaego: pt_jaego,

	}, function (data) {

		if(data!='error') {

			$('#product_option_list_box').html(data);

		} else {

			//alert('잘못된 접근입니다.');

		}

	});



	return false;

}



function f_pat_origin(pat_origin_level, pat_origin2_value) {

    $('#pat_origin_box1').hide();

    $('#pat_origin_box2').hide();

    $('#pat_origin_etc').prop('required', false);

	/*if(pat_origin2_value=='Korea') {

        $('#pat_origin_box1').hide();

        // $('#pat_origin_box2').show();

    } else if(pat_origin2_value=='기타') {

        $('#pat_origin_box2').show();

        $('#pat_origin_etc').prop('required', true);

	} else {

		$('#pat_origin_box1').show();

		$('#pat_origin_box2').hide();



		if(pat_origin_level=='3') {

			var pat_origin1_value = $('#pat_origin1').val();

		}

		$.post('./product_update.php', {act:'pat_origin', pat_origin_level: pat_origin_level, pat_origin2_value: pat_origin2_value, pat_origin1_value: pat_origin1_value}, function (data) {

			if(data) {

				$('#pat_origin'+pat_origin_level).html(data);

			}

		});

	}*/



	return false;

}



function f_product_supplement_list(update_chk) {

	if(update_chk=='') {

		if($('#pst_title1').val()=='') {

			alert('추가상품명1을 입력바랍니다.');

			$('#pst_title1').focus();

			return false;

		}

		if($('#pst_value1').val()=='') {

			alert('추가상품값1을 입력바랍니다.');

			$('#pst_value1').focus();

			return false;

		}

		/*if($('#pst_price1').val()=='') {

			alert('추가상품가1을 입력바랍니다.');

			$('#pst_price1').focus();

			return false;

		}*/



		if($('#product_supplement_list_chk').val()=='N') {

			$('#product_supplement_list_chk').val('Y');

		} else {

			$('#product_supplement_list_chk').val('N');

		}



		var pst_title_t = $('input[name="pst_title[]"]').map(function(){

			return this.value;

		}).get();

		var pst_value_t = $('input[name="pst_value[]"]').map(function(){

			return this.value;

		}).get();

		var pst_price_t = $('input[name="pst_price[]"]').map(function(){

			return this.value;

		}).get();

	}



	$.post('./product_update.php', {

		act:'product_supplement_list',

		pst_title: pst_title_t,

		pst_value: pst_value_t,

		pst_price: pst_price_t,

		update_chk: update_chk,

	}, function (data) {

		if(data!='error') {

			$('#product_supplement_list_box').html(data);

		} else {

			alert('잘못된 접근입니다.');

		}

	});



	return false;

}



function f_pot_delete(obj_q) {

	var cnt = $('.c_pot_list ').length;



	// if(cnt>1) {

		$('#pot_list_'+obj_q).remove();

	// }



	return false;

}



function f_pst_delete(obj_q) {

	var cnt = $('.c_pst_list ').length;



	if(cnt>1) {

		$('#pst_list_'+obj_q).remove();

	}



	return false;

}



function f_ppbt_multi_pay_chk(chk_t) {

	if(chk_t=='Y') {

		$('#f_ppbt_multi_pay_chk1').addClass('btn-info text-white');

		$('#f_ppbt_multi_pay_chk2').removeClass('btn-info text-white');

		$('#f_ppbt_max_pay_man_box').show();

	} else {

		$('#f_ppbt_multi_pay_chk1').removeClass('btn-info text-white');

		$('#f_ppbt_multi_pay_chk2').addClass('btn-info text-white');

		$('#f_ppbt_max_pay_man_box').hide();

	}

	$('#ppbt_multi_pay_chk').val(chk_t);



	return false;

}



function f_ppbt_multi_pay_sale_chk1(chk_t) {

	if(chk_t=='Y') {

		$('#f_ppbt_multi_pay_sale_chk1_1').addClass('btn-info text-white');

		$('#f_ppbt_multi_pay_sale_chk1_2').removeClass('btn-info text-white');

	} else {

		$('#f_ppbt_multi_pay_sale_chk1_1').removeClass('btn-info text-white');

		$('#f_ppbt_multi_pay_sale_chk1_2').addClass('btn-info text-white');

	}

	$('#ppbt_multi_pay_sale_chk1').val(chk_t);



	return false;

}



function f_ppbt_multi_pay_sale_chk2(chk_t) {

	if(chk_t=='Y') {

		$('#f_ppbt_multi_pay_sale_chk2_1').addClass('btn-info text-white');

		$('#f_ppbt_multi_pay_sale_chk2_2').removeClass('btn-info text-white');

	} else {

		$('#f_ppbt_multi_pay_sale_chk2_1').removeClass('btn-info text-white');

		$('#f_ppbt_multi_pay_sale_chk2_2').addClass('btn-info text-white');

	}

	$('#ppbt_multi_pay_sale_chk2').val(chk_t);



	return false;

}



function f_ppbt_nointerest_chk(chk_t) {

	if(chk_t=='Y') {

		$('#f_ppbt_nointerest_chk1').addClass('btn-info text-white');

		$('#f_ppbt_nointerest_chk2').removeClass('btn-info text-white');

		$('#f_ppbt_nointerest_chk_box').show();

	} else {

		$('#f_ppbt_nointerest_chk1').removeClass('btn-info text-white');

		$('#f_ppbt_nointerest_chk2').addClass('btn-info text-white');

		$('#f_ppbt_nointerest_chk_box').hide();

	}

	$('#ppbt_nointerest_chk').val(chk_t);



	return false;

}



function f_ppbt_nointerest_term(chk_t) {

	$('.c_ppbt_nointerest_term').each(function(i, obj) {

		var ii = Number((i+1)*3);



		if(chk_t==ii) {

			$('#f_ppbt_nointerest_term'+ii).addClass('btn-info text-white');

		} else {

			$('#f_ppbt_nointerest_term'+ii).removeClass('btn-info text-white');

		}

	});

	$('#ppbt_nointerest_term').val(chk_t);



	return false;

}



function f_swipe_image(pt_idx) {

	$.post('./product_update.php', {act: 'swipe_image', pt_idx: pt_idx}, function (data) {

		if(data) {

			$('#modal-default-content').html(data);

            $('#modal-default-size').css('max-width', '500px');



			$('#product-swiper').slick({

				dots: true,

				infinite: false,

				speed: 300,

				variableWidth: true,

				slidesToShow: 1,

			});



			$('#modal-default').modal();

		}

	});



	return false;

}



function f_review_swipe_image(rt_idx) {

	$.post('./review_update.php', {act: 'swipe_image', rt_idx: rt_idx}, function (data) {

		if(data) {

			$('#modal-default-content').html(data);



			$('#product-swiper').slick({

				dots: true,

				infinite: false,

				speed: 300,

				variableWidth: true,

				slidesToShow: 1,

			});



			$('#modal-default').modal();

		}

	});



	return false;

}



function f_review_content(rt_idx) {

	$.post('./review_update.php', {act: 'content_view', rt_idx: rt_idx}, function (data) {

		if(data) {

			$('#modal-default-content').html(data);

			$('#modal-default').modal();

		}

	});



	return false;

}



function f_pt_sale_now(chk_t) {

	if(chk_t=='Y') {

		$('#f_pt_sale_now_btn1').addClass('btn-info text-white');

		$('#f_pt_sale_now_btn2').removeClass('btn-info text-white');

	} else {

		$('#f_pt_sale_now_btn1').removeClass('btn-info text-white');

		$('#f_pt_sale_now_btn2').addClass('btn-info text-white');

	}

	$('#pt_sale_now').val(chk_t);



	return false;

}



function f_pt_show(chk_t) {

    if(chk_t=='1') {

        $('#f_pt_show_btn1').addClass('btn-info text-white');

        $('#f_pt_show_btn2').removeClass('btn-info text-white');

        $('#f_pt_show_btn3').removeClass('btn-info text-white');

    } else if(chk_t=='2') {

        $('#f_pt_show_btn1').removeClass('btn-info text-white');

        $('#f_pt_show_btn2').addClass('btn-info text-white');

        $('#f_pt_show_btn3').removeClass('btn-info text-white');

    } else if(chk_t=='3') {

        $('#f_pt_show_btn1').removeClass('btn-info text-white');

        $('#f_pt_show_btn2').removeClass('btn-info text-white');

        $('#f_pt_show_btn3').addClass('btn-info text-white');

    } else {

        $('#f_pt_show_btn1').removeClass('btn-info text-white');

        $('#f_pt_show_btn2').removeClass('btn-info text-white');

        $('#f_pt_show_btn3').removeClass('btn-info text-white');

	}

	$('#pt_show').val(chk_t);



	return false;

}



function f_pat_show(chk_t) {

    if(chk_t=='Y') {

        $('#f_pat_show_btn1').addClass('btn-info text-white');

        $('#f_pat_show_btn2').removeClass('btn-info text-white');

    } else {

        $('#f_pat_show_btn1').removeClass('btn-info text-white');

        $('#f_pat_show_btn2').addClass('btn-info text-white');

    }

    $('#pat_show').val(chk_t);



    return false;

}



function f_pat_status(chk_t) {

    if(chk_t=='1') {

        $('#f_pat_status_btn1').addClass('btn-info text-white');

        $('#f_pat_status_btn2').removeClass('btn-info text-white');

        $('#f_pat_status_btn3').removeClass('btn-info text-white');

    } else if(chk_t=='2') {

        $('#f_pat_status_btn1').removeClass('btn-info text-white');

        $('#f_pat_status_btn2').addClass('btn-info text-white');

        $('#f_pat_status_btn3').removeClass('btn-info text-white');

    } else if(chk_t=='3') {

        $('#f_pat_status_btn1').removeClass('btn-info text-white');

        $('#f_pat_status_btn2').removeClass('btn-info text-white');

        $('#f_pat_status_btn3').addClass('btn-info text-white');

    }

    $('#pat_status').val(chk_t);



    return false;

}



function f_sel_ct_id(sel_ct_level, sel_ct_id) {

	var nm_t = Number(sel_ct_level)+1;



	$.post('./product_update.php', {act: 'sel_ct_level', sel_ct_level: sel_ct_level, sel_ct_id: sel_ct_id}, function (data) {

		if(data) {

			$("#sel_ct_id"+nm_t).html(data);

		}

	});



	return false;

}



function f_product_view(pt_idx) {

    location.href = "./product_view.php?pt_idx="+pt_idx;

    // location.href = "./product_form.php?act=update&pt_idx="+pt_idx;



    return false;

}



function f_qna_content(qt_idx) {

	$.post('./qna_update.php', {act: 'content_view', qt_idx: qt_idx}, function (data) {

		if(data) {

			$('#modal-default-content').html(data);

			$('#modal-default').modal();

		}

	});



	return false;

}



function f_qna_seller_content(qt_idx) {

	$.post('./qna_seller_update.php', {act: 'content_view', qt_idx: qt_idx}, function (data) {

		if(data) {

			$('#modal-default-content').html(data);

			$('#modal-default').modal();

		}

	});



	return false;

}



function f_search_seller(stxt) {

	$('#search_seller_box').show();

	$.post('./taxinvoice_update.php', {act: 'search_seller', stxt: stxt}, function (data) {

		if(data) {

			$('#search_seller_box').html(data);

		}

	});



	return false;

}



function f_search_seller_selected(slt_idx, slt_company_name, slt_company_num) {

	if(slt_idx) {

		$('#mt_seller_idx').val(slt_idx);

	}

	if(slt_company_name) {

		$('#slt_company_name').val(slt_company_name);

	}

	if(slt_company_num) {

		$('#slt_company_num').val(slt_company_num);

	}



	$('#search_seller').val('');

	$('#search_seller_box').html('');



	return false;

}



function f_view_order(ot_code, type, st_idx) {

	var url = './order_update.php';

	if (type==='delivery_center') {

        url = get_url+'/delivery/order_update.php';

	}

	$.post(url, {act: 'view_order', ot_code: ot_code, st_idx: st_idx}, function (data) {

		if(data) {

			$('#modal-default-content').html(data);

			$('#modal-default-size').css('max-width', '800px');

			$('#modal-default').addClass('modal-dialog-centered');

			$('#modal-default').addClass('modal-dialog-scrollable');

			$('#modal-default').modal();

		}

	});



	return false;

}



function f_checkbox_cnt() {

	var chk_cnt = 0;

	var ot_pcode = '';

	var ot_code = '';



	$('input:checkbox[name="chk_all[]"]').each(function() {

		if($(this).prop('checked')==true) {

			chk_cnt++;

			ot_pcode += $(this).val()+'|';

            ot_code += $(this).data('code')+'|';

		}

	});



	if(chk_cnt<1) {

		alert('처리할 주문을 선택해주세요.');

		return false;

	}



	return {ot_pcode: ot_pcode, ot_code: ot_code};

}



function f_list_update(f, act) {

    var l = document.getElementsByName('chk_all[]');

    var i;

    var j = 0;



    for (i = 0; i < l.length; i++) {

        if(l[i].checked == true) j++;

    }

    if (j == 0) {

        alert('선택된 내용이 없습니다.');

        return false;

    }



    $('#modal-default-content').html('<div class="frm_loading text-center pt-3"><img src="'+get_url+'/images/loading.gif" alt="" /><p>잠시만 기다려주세요..</p></div>');

    $('#modal-default-size').css('max-width', '600px');

    $('#modal-default').modal();



    f.act.value = act;

    var formData = new FormData(f);

    $.ajax({

        url: get_url + '/proc.php',

        type: 'POST',

        data: formData,

        cache: false,

        contentType: false,

        processData: false,

        success: function (args) {

            args = JSON.parse(args);

            console.log(args);

            $('#modal-default').modal('hide');

            if(args.resCode=='Y') {

                alert('처리되었습니다.');

            } else {

                alert('잘못된 접근입니다.');

            }

            document.location.reload();

        }

    });



    return false;

}



function f_order_cancel(ct_status) {

	var obj = f_checkbox_cnt();

    var ot_pcode = obj.ot_pcode;

    var ot_code = obj.ot_code;



	if(ot_pcode=='' || typeof ot_pcode=='undefined') {

		return false;

	}



	$.post('./order_update.php', {act: 'cancel_modal', ot_pcode: ot_pcode, ot_code: ot_code, ct_status: ct_status}, function (data) {

		if(data) {

			$('#modal-default-content').html(data);

			$('#modal-default').modal();

		}

	});



	return false;

}



function f_ot_status_chk(chg_status) {

	var obj = f_checkbox_cnt();

    var ot_pcode = obj.ot_pcode;



	if(ot_pcode=='' || typeof ot_pcode=='undefined') {

		return false;

	}



    $('#modal-default-content').html('<div class="frm_loading text-center pt-3"><img src="'+get_url+'/images/loading.gif" alt="" /><p>잠시만 기다려주세요..</p></div>');

    $('#modal-default-size').css('max-width', '600px');

    $('#modal-default').modal();



	$.post('./order_update.php', {act: 'status_chg', ot_pcode: ot_pcode, chg_status: chg_status}, function (data) {

        $('#modal-default').modal('hide');

		if(data=='Y') {

			alert('처리되었습니다.');

		} else {

			alert('잘못된 접근입니다.');

		}

		document.location.reload();

	});



	return false;

}



function f_order_modal(act) {

	var obj = f_checkbox_cnt();

    var ot_pcode = obj.ot_pcode;



	if(ot_pcode=='' || typeof ot_pcode=='undefined') {

		return false;

	}



	$.post('./order_update.php', {act: act, ot_pcode: ot_pcode}, function (data) {

		if(data) {

			$('#modal-default-content').html(data);

			$('#modal-default-size').css('max-width', '800px');

			$('#modal-default').modal();

		}

	});



	return false;

}



function f_cancel_modal(act, idx, status) {



    if(act==''||idx=='') {

        return false;

    }



    $.post('./'+act+'_update.php', {act: 'cancel_modal', idx: idx, status: status}, function (data) {

        if(data) {

            $('#modal-default-content').html(data);

            $('#modal-default').modal();

        }

    });



    return false;

}



function frmSubmit1(fid) {



	for(var i=0;i<$("#"+fid+" .required").length;i++) {

        var v = $("#"+fid+" .required:eq("+i+")").val();

        if(v == "") {

            alert("필수내용을 입력해주세요.");

            $("#"+fid+" .required:eq("+i+")").focus();

            return false;

        }

    }



    $("#"+fid).append('<div class="frm_loading text-center pt-3"><img src="'+get_url+'/images/loading.gif" alt="" /><p>잠시만 기다려주세요..</p></div>');

    var params = $("#"+fid).serialize();

    var params_obj = $("#"+fid).serializeObject();

    $.post(get_url + '/proc.php', params, function (args) {

        if (args) {

            args = JSON.parse(args);

            console.log(args);

            if (args.msg) {

                $("#"+fid).find('.frm_loading').remove();

                alert(args.msg);

                return false;

            } else {

                if (args.resCode==='0000' || args.resCode==='Y') {

                    console.log(params_obj.act, args.returnParam);



					alert('처리되었습니다.');

					document.location.reload();

                } else {

                    alert('잘못된 접근입니다.');

                    document.location.reload();

                }

            }

        }

    });



    return false;

}



function toDataUrl(url, callback) {

    var xhr = new XMLHttpRequest();

    xhr.onload = function() {

        var reader = new FileReader();

        reader.onloadend = function() {

            callback(reader.result);

        }

        reader.readAsDataURL(xhr.response);

    };

    xhr.open('GET', url);

    xhr.responseType = 'blob';

    xhr.send();

}



function f_ct_delivery_type(t, obj_id) {

	if(t=='2') {

		$('#ct_delivery_com'+obj_id).attr("disabled", false);

		$('#ct_delivery_number'+obj_id).attr("disabled", false).attr("required", true).addClass("required");

	} else {

		$('#ct_delivery_com'+obj_id).attr("disabled", true);

		$('#ct_delivery_number'+obj_id).attr("disabled", true).attr("required", false).removeClass("required");

	}



	return false;

}



function f_excel_delivery_upload() {

	$.post('./order_update.php', {act: 'excel_delivery_upload'}, function (data) {

		if(data) {

			$('#modal-default-content').html(data);

			$('#modal-default').modal();

		}

	});



	return false;

}



function f_order_search_date_range(nm, sd, ed) {

	$('#sel_search_sdate').val(sd);

	$('#sel_search_edate').val(ed);



	$('.c_pt_selling_date_range').removeClass('btn-info text-white');

	$('#f_order_search_date_range'+nm).addClass('btn-info text-white');



	return false;

}



function f_sel_ct_status(nm) {

	var nm_t = Number(nm-1);



	$('.c_sel_ct_status').each(function(i, obj) {

		if(nm_t==i) {

			$('#sel_ct_status'+nm).addClass('btn-info text-white');

		} else {

			$('#sel_ct_status'+Number(i+1)).removeClass('btn-info text-white');

		}

	});

	$('#sel_ct_status').val(nm);



	return false;

}



function f_sel_btn(nm,v,fid) {

    var nm_t = Number(nm-1);



    $('.c_sel_btn').each(function(i, obj) {

        if(nm_t==i) {

            $('#sel_btn'+nm).addClass('btn-info text-white');

        } else {

            $('#sel_btn'+Number(i+1)).removeClass('btn-info text-white');

        }

    });



    var label = $('.c_sel_btn').closest('.btn-group').attr('aria-label');

    $('#'+label).val(v);



    $("#"+fid).submit();



    return false;

}



function f_sel_ct_delivery_type(nm) {

	var nm_t = Number(nm-1);



	$('.c_sel_ct_delivery_type').each(function(i, obj) {

		if(nm_t==i) {

			$('#sel_ct_delivery_type'+nm).addClass('btn-info text-white');

		} else {

			$('#sel_ct_delivery_type'+Number(i+1)).removeClass('btn-info text-white');

		}

	});

	$('#sel_ct_delivery_type').val(nm);



	return false;

}



function preview_image_multi_selected_store(e, obj_id) {

	var files = e.target.files;

	var filesArr = Array.prototype.slice.call(files);



	if(filesArr.lengths>5) {

		alert("추가이미지는 최대 5개까지 가능합니다.");

		return;

	} else {

		filesArr.forEach(function(f) {

			if(!f.type.match("image.*")) {

				alert("확장자는 이미지 확장자만 가능합니다.");

				return;

			}



			sel_files.push(f);



			var reader = new FileReader();

			reader.onload = function(e) {

				// $("#st_store_image"+obj_id+"_box").css('border', 'none');

				$("#st_store_image"+obj_id+"_box").html('<img src="'+e.target.result+'" />');

			}

			reader.readAsDataURL(f);

		});

	}

}



function f_checkbox_sel_one(msg) {

	var chk_cnt = 0;

	var sel_idx = '';



	$('input:checkbox[name="chk_all[]"]').each(function() {

		if($(this).prop('checked')==true) {

			chk_cnt++;

			sel_idx += $(this).val();

		}

	});



	if(chk_cnt<1) {

		alert(msg);

		return false;

	}



	if(chk_cnt>1) {

		alert('1개만 선택바랍니다.');

		return false;

	}



	return sel_idx;

}



function f_list_order(st_idx, sdate, edate) {



    $.post(get_url+'/order_list_sub.php', {st_idx: st_idx, sdate: sdate, edate: edate, status: 'calculate', page: 1}, function (data) {

        if(data) {

            $(document).find('.setList').removeClass('d-none').html(data);

        }

    });



    return false;

}



function f_calc_modal(ot_pcode, mk_idx, st_idx, sdate, edate, tdate) {



    $.post('./calculate_update.php', {act: 'calc_modal', ot_pcode: ot_pcode, mk_idx: mk_idx, st_idx: st_idx, sdate: sdate, edate: edate, tdate: tdate}, function (data) {

        if(data) {

            $('#modal-default-content').html(data);

            $('#modal-default-size').css('max-width', '500px');

            $('#modal-default').modal();

        }

    });



    return false;

}

function f_calc_file_modal(idx) {



    $.post('./calculate_update.php', {act: 'calc_file_modal', idx: idx}, function (data) {

        if(data) {

            $('#modal-default-content').html(data);

            $('#modal-default').modal();

        }

    });



    return false;

}

function f_calc_update(idx) {

    var params = $('#frm_form').serializeArray();

	params.push({name: 'act', value: 'update_calculate'});

	params.push({name: 'idx', value: idx});

    console.log(params);



    $.post(get_url + '/proc.php', params, function (data) {

        data = JSON.parse(data);

        console.log(data);

        document.location.reload();

    });

	/*

    // var f = document.frm;

    // var params = new FormData(f);

    // var fileValue = f.cat_file.value.split("\\");

    // var fileName = fileValue[fileValue.length-1];

    //

    // if (confirm("파일명 ("+fileName+")이 맞는지 확인해주십시오")) {

        $.ajax({

            url: './calculate_update.php',

            type: 'POST',

            data: params,

            cache:false,

            contentType: false,

            processData: false,

            success: function (data) {

            	console.log(data);

                if(data) {

                    $('#modal-default').modal('hide');

                    alert('저장되었습니다.');

                    document.location.reload();

                }

            },

            error: function(err){

                console.log('에러 '+err);

            }

        });

	//}

    return false;

    */

}



function layerPop(act, idx, idx2, idx3) {

    $.post(get_url+'/popup_form.php', {act: act, idx: idx, idx2: idx2, idx3: idx3}, function (data) {

        if(data) {

        	/*if (act==='update_order') {

                $('#modal-cart-content').html(data);

                $('#modal-cart').modal();

			} else {}*/

			$('#modal-default-content').html(data);

			$('#modal-default').modal();

        }

    });



    return false;

}



function imagePop(tbl, idx) {

    $.post(get_url+'/popup_form.php', {act: 'swiper_image', tbl: tbl, idx: idx}, function (data) {

        if(data) {

            $('#modal-default-content').html(data);



            $('#product-swiper').slick({

                dots: true,

                infinite: false,

                speed: 300,

                variableWidth: true,

                slidesToShow: 1,

            });



            $('#modal-default').modal();

        }

    });



    return false;

}



function f_delivery_free(chk_t) {

    if(chk_t=='Y') {

        $('#delivery_free1').addClass('btn-info text-white');

        $('#delivery_free2').removeClass('btn-info text-white');

        if ($('#delivery_free_wrap').length) {

            $('#delivery_free_wrap').removeClass('d-none');

        }

    } else {

        $('#delivery_free1').removeClass('btn-info text-white');

        $('#delivery_free2').addClass('btn-info text-white');

        if ($('#delivery_free_wrap').length) {

            $('#delivery_free_wrap').addClass('d-none');

        }

    }

    $('#delivery_free').val(chk_t);



    return false;

}



function f_point_type(id, chk_t) {

    $('#'+id).parent().find('.btn').removeClass('btn-info text-white');

    $('#'+id).addClass('btn-info text-white');

    $('#'+id).parent().parent().find('.point_type').val(chk_t);



    return false;

}



$(function() {

    //------------------------------------------------------------------------------------------------------------------

    $(document).on("click", ".btn_search_item", function() {

    	var srel = $(this).closest('.srel');

    	var tbl = $(this).data('tbl');

    	var mk_idx = $(this).data('mk_idx');

        var ct_id = srel.find(".sch_relation").val();

        var pt_title = $.trim(srel.find('input[name="sch_name"]').val());

        var $relation = srel.find(".relation");



        if(ct_id == "" && pt_title == "") {

            $relation.html("상품의 분류를 선택하시거나 상품명을 입력하신 후 검색하여 주십시오.");

            return false;

        }



        $.post(get_url + '/proc.php', {act: 'get_rel_product', tbl: tbl, mk_idx: mk_idx, ct_id: ct_id, pt_title: pt_title}, function (data) {

            data = JSON.parse(data);

            console.log(data);

            if(data) {

                srel.find(".relation").html(data.result);

            }

        });

    });



    $(document).on("click", ".relation .add_item", function() {

        // 이미 등록된 상품인지 체크

        var id = $(this).closest(".relation").data('id');

        var $li = $(this).closest("li");

        var pt_idx = $li.find("input:hidden").val();

        var pt_idx2;

        var dup = false;

        $('.reg_relation[data-id="'+id+'"] input[name="re_pt_idx[]"]').each(function() {

            pt_idx2 = $(this).val();

            if(pt_idx == pt_idx2) {

                dup = true;

                return false;

            }

        });



        if(dup) {

            alert("이미 선택된 상품입니다.");

            return false;

        }



        var cont = "<li class=\"list-group-item\">"+$li.html().replace("add_item", "del_item").replace("추가", "삭제")+"</li>";

        var count = $('.reg_relation[data-id="'+id+'"] li').length;



        if(count > 0) {

            $('.reg_relation[data-id="'+id+'"] li:last').after(cont);

        } else {

            $('.reg_relation[data-id="'+id+'"]').html("<ul class=\"list-group\">"+cont+"</ul>");

        }



        $li.remove();

    });



    $(document).on("click", ".reg_relation .del_item", function() {

        if(!confirm("상품을 삭제하시겠습니까?"))

            return false;



        $(this).closest("li").remove();



        var count = $(".reg_relation li").length;

        if(count < 1)

            $(".reg_relation").html("<p>선택된 상품이 없습니다.</p>");

    });

    //------------------------------------------------------------------------------------------------------------------



    $( ".intercept" ).on( "click", function() {

        var tbl = $( this ).data("tbl");

        var mt_id = $( this ).data("id");

        var mt_idx = $( this ).data("idx");

        var status = $( this ).val();



        // if ($(this).is(":checked") == true) { status = "N";

        // } else { status = "Y";

        // }

        console.log({act: 'set_intercept', tbl: tbl, status: status, mt_id: mt_id, mt_idx: mt_idx});



        $.post(get_url + '/proc.php', {act: 'set_intercept', tbl: tbl, status: status, mt_id: mt_id, mt_idx: mt_idx}, function (args) {

            args = JSON.parse(args);

            if (args.msg) {

                alert(args.msg);

                return;

            } else {

                if (status==='Y') {

                    $(this).prop('checked', false);

                } else {

                    $(this).prop('checked', true);

                }

            }

        });

    });



    $('.sort_link').on('click', function (evt) {

        evt.preventDefault();

        evt.stopPropagation();



        var frm = $(this).closest('form');

        frm.find('input[name="sst"]').val($(this).data('sst'));

        frm.find('input[name="sod"]').val($(this).data('sod'));



        frm.submit();

    });

});