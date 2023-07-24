<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="Generator" content="reward">
    <meta name="Author" content="reward">
    <meta name="Keywords" content="reward">
    <meta name="Description" content="reward">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <meta name="apple-mobile-web-app-title" content="reward">
    <meta content="telephone=no" name="format-detection">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta property="og:title" content="reward">
    <meta property="og:description" content="reward">
    <meta property="og:image" content="/resources/image/apple-touch-icon.png?v=1">
    <meta id="_csrf" name="_csrf" content="${_csrf.token}"/>
 	<meta id="_csrf_header" name="_csrf_header" content="${_csrf.headerName}"/>
 	<meta id="_csrf_parameter" name="_csrf_parameter" content="${_csrf.parameterName}"/>
 	
    <title>reward</title>
	<link rel="apple-touch-icon" sizes="180x180" href="/resources/image/apple-touch-icon.png?v=1" />
	<link rel="icon" type="image/png" sizes="32x32" href="/resources/image/favicon-32x32.png?v=1" />
	<link rel="icon" type="image/png" sizes="16x16" href="/resources/image/favicon-16x16.png?v=1" />
<!-- 	<link rel="manifest" href="/resources/image/site.webmanifest" /> -->
    
	<!-- resouces/mng/ -->
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/@mdi/font@6.5.95/css/materialdesignicons.min.css">
    <link href="/resources/mng/css/base.css" rel="stylesheet" />
	<link rel="stylesheet" type="text/css" href="/resources/mng/css/dataTables.bootstrap4.css" />
	<link rel="stylesheet" type="text/css" href="/resources/mng/css/default_mng.css" />
    <script type="text/javascript" src="/resources/mng/js/base.js"></script>
    <script type="text/javascript" src="/resources/mng/js/default_mng.js"></script>
	<script type="text/javascript" src="/resources/mng/js/Chart.min.js"></script>
	<script type="text/javascript" src="/resources/mng/js/jquery.dataTables.js"></script>
	<script type="text/javascript" src="/resources/mng/js/dataTables.bootstrap4.js"></script>
	<link rel="stylesheet" type="text/css" href="/resources/mng/datepicker/jquery.datetimepicker.min.css"/ >
	<script src="/resources/mng/datepicker/jquery.datetimepicker.full.min.js"></script>
	<script src="https://cdn.datatables.net/buttons/1.5.1/js/dataTables.buttons.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/pdfmake.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/vfs_fonts.js"></script>
	<script src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.html5.min.js"></script>
	<script src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.print.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.2/dist/jquery.validate.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/resources/mng/slick/slick.css"/>
	<link rel="stylesheet" type="text/css" href="/resources/mng/slick/slick-theme.css"/>
	<script type="text/javascript" src="/resources/mng/slick/slick.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js"></script>
	
	<!-- 	custom js -->
	<script type="text/javascript" src="/resources/js/logic.js"></script>
  </head>
  <body>