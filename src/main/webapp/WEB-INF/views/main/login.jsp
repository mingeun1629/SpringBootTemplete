<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<jsp:include page="inc/head.jsp"/>
<%@ include file="inc/config.jsp"%>
<c:set var="URL" value="${pageContext.request.contextPath}" />
<div class="container-scroller">
	<div class="container-fluid page-body-wrapper full-page-wrapper">
		<div class="content-wrapper d-flex align-items-center auth px-0">
			<div class="row w-100 mx-0">
				<div class="col-lg-4 mx-auto">
					<div class="auth-form-light text-left py-5 px-4 px-sm-5">
						<div class="brand-logo">
							<img src="/resources/image/logo.png" style="width:auto;height:150px;" alt="logo">
						</div>
						<h4>사용자 로그인</h4>
						<form class="pt-3">
							<div class="form-group">
								<input type="text" name="mt_id" id="mt_id" class="form-control form-control-lg" placeholder="아이디" required autofocus>
							</div>
							<div class="form-group">
								<input type="password" name="mt_pwd" id="mt_pwd" class="form-control form-control-lg" placeholder="비밀번호" required>
							</div>
							<div class="mt-3"><button class="btn btn-block btn-info btn-lg font-weight-medium auth-form-btn" type="button" onclick="doLoginValid();">로그인</button></div>
							<div class="mt-3"><button class="btn btn-block btn-secondary btn-lg font-weight-medium auth-form-btn" type="button" onclick="location.href='./join'">회원가입</button></div>
							<div class="mt-3"><button class="btn btn-block btn-muted btn-lg font-weight-medium auth-form-btn" type="button" onclick="location.href='/mng'">관리자모드</button></div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script>
function doLoginValid(){
	if($("#mt_id").val().trim() == '' || $("#mt_pwd").val() == ''){
		alert("아이디와 비밀번호를 모두 입력해주세요.");
		return;
	}
	doLogin();
}

async function doLogin(){
    try {
        let params = {
        	mt_id: $("#mt_id").val(),
        	mt_pwd:  $("#mt_pwd").val(),
        }
        
        let res = await awaitPost('/main/login.do', params, false);   
		console.log(res);
		if(res.result == 'success'){
			location.replace('/main/index');
		}else if(res.result == 'fail'){
			alert("비밀번호가 일치하지않습니다.");
		}else{
			alert("오류발생");
		}
    } catch (error) {
    	console.log(error);
    	alert("오류발생");
    }
}
</script>
<jsp:include page="inc/tail.jsp"/>