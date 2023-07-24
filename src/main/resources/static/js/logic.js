//csrf token
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
var parameter = $("meta[name='_csrf_parameter']").attr("content");

//비동기 POST
function awaitPost(sendUrl, sendParams, progress){
	
	sendParams[parameter] = token;
	
    return new Promise((resolve, reject) => { // 1.
        $.ajax({
            url: sendUrl,
            type: "POST",
            cache: false,
            data: sendParams,
            success: (res) => {
                resolve(res);  // 2.
            },
            error: (e) => {
                reject(e);  // 3.
            },
			beforeSend: function(xhr) {
				xhr.setRequestHeader(parameter, token);
				if(progress)show_indicator();
			},
			complete: function () {
				if(progress)hide_indicator();
			},
		});
    });
}

//비동기 POST JSON형식
function awaitPostJson(sendUrl, sendParams, progress){
	
	sendParams[parameter] = token;
	
    return new Promise((resolve, reject) => { // 1.
        $.ajax({
            url: sendUrl,
            type: "POST",
            cache: false,
            data: sendParams,
            dataType: 'json',
            success: (res) => {
                resolve(res);  // 2.
            },
            error: (e) => {
                reject(e);  // 3.
            },
			beforeSend: function(xhr) {
				xhr.setRequestHeader(parameter, token);
				if(progress)show_indicator();
			},
			complete: function () {
				if(progress)hide_indicator();
			},
        });
    });
}

// Spinners, Indicator 설정

function show_indicator(){
//	$('.page_indicator').removeClass('d-none').addClass('d-flex');
}

function hide_indicator(){
//	$('.page_indicator').removeClass('d-flex').addClass('d-none');
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// validation

function isEmpty(value){    
    if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
      return true
    }else{
      return false
    }
  };

function validation_text(value){
	
	if(value == "" || value == null || value.trim() == ""){
		return false;
	}
	
	return true;
}


// 소수점둘째자리까지 숫자만 입력가능
function validation_decimal_point(value){
	  let str = value.split(".");
      str[0] = str[0].replace(/[^-\.0-9]/g,'').replace(/(.)(?=(\d{3})+$)/g,'$1,')
      
      if(str.length >= 2){
    	  str[1] = str[1].replace(/[^0-9]/,'');
    	  
    	  if(str[1].length > 2){
    		  str[1] = str[1].substr(0, 2);
    	  }
      }
      
      let fmStr = str.length >= 2 ? str[0] + '.' + str[1] : str[0];
      
      let fmStr2 = fmStr.replace(/[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\|ㄱ-ㅎ|ㅏ-ㅣ-ㅢ|가-힣|a-z|A-Z]/g,'');
	  
      return fmStr2;
}

//소수점 둘째자리까지 표시
function add_hundredths_place(value){
	if(value == ""){
		return value;
	}
	try{
		let str = value.split(".");
		return str.length == 1 ? value + ".00" : str[1].length == 1 ? value + "0" : value;
	}catch{
		return value;
	}
}

// 숫자에 쉼표삽입
function validation_decimal(value){
	let regex = /[^0-9]/g;
    return value.replace(regex, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 숫자빼고 모두제거
function validation_number(value){
	let regex = /[^0-9]/g;
    return value.replace(regex, "");
}

//휴대폰 하이픈
function validation_hypen(value){
	 return value.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "");
}

//비밀번호 확인 현재 8~50자 영문 대소문자, 특수문자포함
function valid_password(password){

    let regPw = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$");

    if(password == "" || password == undefined || password == null){
        return "비밀번호를 입력해주세요.";
    }

    if(!regPw.test(password)) {
        return "비밀번호는 대소문자/숫자/특수문자를 포함해서 8~50자리로 입력되어야 합니다.";
    }

    return "";
}

//두개의 비밀번호 비교
function check_two_password(password, password2){

    if(password2 == "" || password2 == undefined || password2 == null){
        return "비밀번호를 다시 입력해주세요.";
    }

    if(password !== password2) {
        return "두 비밀번호가 일치하지 않습니다.";
    }

    return "";

}

//인풋 입력값 감지
$(window).bind("pageshow", function(event) {
	$(document).on('blur', '.input_decimal_point', function(e) {
		$(this).val( add_hundredths_place( $(this).val() ) );

	});
	$(document).on('keyup', '.input_decimal_point', function(e) {
	    $(this).val( validation_decimal_point( $(this).val() ) );
	});
	
	$(document).on('blur', '.input_decimal', function(e) {
		$(this).val( validation_decimal( $(this).val() ) );
	});
	$(document).on('keyup', '.input_decimal', function(e) {
	    $(this).val( validation_decimal( $(this).val() ) );
	});
});

	
//검색어, 검색어필터, 검색유형/대상(버튼), 기간1-활성화, 기간2-활성화 사용여부
var haveSearchValue = false, haveSearchFilter = false, haveSearchType = false, haveDatePicker = false, haveDatePicker2 = false, 
haveSearchDay = false, haveSearchGroup = false;

//검색을 위한 파라미터 추가
function make_search_path(path){
	
		//검색어, 검색어필터, 검색유형/대상(버튼), 기간1-from, 기간1-to, 기간2-from, 기간2-to
		let search_value = null, search_filter = null, search_type = null, search_sdate = null, search_edate = null, search_sdate2 = null, search_edate2 = null, search_day = null, search_group = null;
		
		
		if(haveSearchValue){
			search_value = $('#search_value').val();
		}
		
		if(haveSearchFilter){
			search_filter = $('#search_filter').val();
		}
		
		if(haveSearchType){
			search_type = $('#search_type').val();
		}
		
		if(haveDatePicker){
			search_sdate = $('#search_sdate').val();
			search_edate = $('#search_edate').val();
		}
		
		if(haveDatePicker2){
			search_sdate = $('#search_sdate2').val();
			search_edate = $('#search_edate2').val();
		}
		
		if(haveSearchDay){
			search_day = $('#search_day').find('.on').val();
		}
		
		if(haveSearchGroup){
			search_group = $('#search_day').find('.on').val();
		}
		
		
		let param_cnt = 0;
		
		if(search_value != '' && search_value != null){
			path += param_cnt == 0 ? `?search_value=${search_value}` : `&&search_value=${search_value}`;
			param_cnt++;
		}
		
		if(search_filter != 'all' && search_filter != null){
			path += param_cnt == 0 ? `?search_filter=${search_filter}` : `&&search_filter=${search_filter}`;
			param_cnt++;
		}
		
		if(search_type != '' && search_type != null){
			path += param_cnt == 0 ? `?search_type=${search_type}` : `&&search_type=${search_type}`;
			param_cnt++;
		}
		
		if(search_day != '' && search_day != null){
			path += param_cnt == 0 ? `?search_day=${search_day}` : `&&search_day=${search_day}`;
			param_cnt++;
		}
		
		if(search_group != '' && search_group != null){
			path += param_cnt == 0 ? `?search_group=${search_group}` : `&&search_group=${search_group}`;
			param_cnt++;
		}
		
		if(search_sdate != null){
			path += param_cnt == 0 ? `?search_sdate=${search_sdate}` : `&&search_sdate=${search_sdate}`;
			param_cnt++;
		}
		
		if(search_edate != null){
			path += param_cnt == 0 ? `?search_edate=${search_edate}` : `&&search_edate=${search_edate}`;
			param_cnt++;
		}
		
		if(search_sdate2 != null){
			path += param_cnt == 0 ? `?search_sdate2=${search_sdate2}` : `&&search_sdate2=${search_sdate2}`;
			param_cnt++;
		}
		
		if(search_edate2 != null){
			path += param_cnt == 0 ? `?search_edate2=${search_edate2}` : `&&search_edate2=${search_edate2}`;
			param_cnt++;
		}
		

		path += param_cnt == 0 ? `?row=${search_row}` : `&&row=${search_row}`;
		
 		return path;
}