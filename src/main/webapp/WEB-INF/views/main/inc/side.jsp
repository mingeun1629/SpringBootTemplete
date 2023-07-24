<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
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
						<a href="/main/logout" class="dropdown-item"> <i class="mdi mdi-logout text-primary"></i> 로그아웃</a>
					</div>
				</li>
			</ul>
			<button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas"> <span class="mdi mdi-menu"></span></button>
		</div>
	</nav>
	<!-- 상단바 끝 -->

	<div class="container-fluid page-body-wrapper">
		<!-- 왼쪽메뉴 시작 -->
		<nav class="sidebar sidebar-offcanvas" id="sidebar">
			<ul class="nav">
				<li class="nav-item">
					<a class="nav-link" href="./"> <i class="mdi mdi-home menu-icon"></i>
						<span class="menu-title">홈</span>
					</a>
				</li>
			</ul>
		</nav>
		<!-- 왼쪽메뉴 끝 -->

		<div class="main-panel">