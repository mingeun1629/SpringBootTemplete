<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- <script src="//cdn.ckeditor.com/4.14.0/standard-all/ckeditor.js"></script> -->
<div class="container-scroller">
	<!-- 상단바 시작 -->
	<nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
		<div class="navbar-brand-wrapper d-flex justify-content-center">
			<div class="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
				<a class="navbar-brand brand-logo" href="./">
					<img src="/resources/image/logo.png" alt="logo" style="width:auto;height:35px;" />
				</a>
				<a class="navbar-brand brand-logo-mini" href="./">
					<img src="/resources/image/favicon-32x32.png" alt="logo" />
				</a>
				<button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize"> <span class="mdi mdi-sort-variant"></span></button>
			</div>
		</div>
		<div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
			<ul class="navbar-nav navbar-nav-right">
				<li class="nav-item nav-profile dropdown">
					<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown"><span class="nav-profile-name">${MyMemberVo.getMt_id()}님 반갑습니다.</span></a>
					<div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
<!-- 						<a href="#" class="dropdown-item" target="_blank"> <i class="mdi mdi-home text-primary"></i> 홈페이지</a> -->
						<a href="/mng/logout" class="dropdown-item"> <i class="mdi mdi-logout text-primary"></i> 로그아웃</a>
					</div>
				</li>
			</ul>
			<button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas"> <span class="mdi mdi-menu"></span></button>
		</div>
	</nav>
	<!-- 상단바 끝 -->
	<script>
		console.log("${path}")
	</script>

	<div class="container-fluid page-body-wrapper">
		<!-- 왼쪽메뉴 시작 -->
		<nav class="sidebar sidebar-offcanvas" id="sidebar">
			<ul class="nav">
				<li class="nav-item <c:if test="${path eq '/mng/index'}">active</c:if>">
					<a class="nav-link" href="/mng/"> <i class="mdi mdi-home menu-icon"></i>
						<span class="menu-title">홈</span>
					</a>
				</li>
                <!-- 회원관리 -->
                <li class="nav-item <c:if test="${path eq '/mng/member_list' or path eq '/mng/mng_list'}">active</c:if>">
					<a class="nav-link" data-toggle="collapse" href="#member" 
						<c:choose>
							<c:when test="${path eq '/mng/member_list' or path eq '/mng/mng_list'}">aria-expanded="true"</c:when>
							<c:otherwise>aria-expanded="false"</c:otherwise>
						</c:choose>
					 aria-controls="member">
						<i class="mdi mdi-clipboard-account menu-icon"></i>
							<span class="menu-title">회원관리</span>
						<i class="menu-arrow"></i>
					</a>
					<div class="collapse <c:if test="${path eq '/mng/member_list' or path eq '/mng/mng_list'}">show</c:if>" id="member">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"> <a class="nav-link <c:if test="${path eq '/mng/member_list'}">active</c:if>" href="./member_list">회원목록</a></li>
                        </ul>
					</div>
				</li>  
			</ul>
		</nav>
		<!-- 왼쪽메뉴 끝 -->

		<div class="main-panel">