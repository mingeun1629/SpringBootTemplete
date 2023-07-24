<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set var="req" value="${pageContext.request}" />
<c:set var="url">${req.requestURL}</c:set>
<c:set var="uri" value="${req.requestURI}" />
<c:set var="baseURL" value="${fn:substring(url, 0, fn:length(url) - fn:length(uri))}${req.contextPath}" />
<%-- <c:set var="path" value="${fn:replace( requestScope['javax.servlet.forward.servlet_path'], '/', '')}" />  --%>
<c:set var="path" value="${requestScope['javax.servlet.forward.servlet_path']}" /> 
<c:set var="pg" value="${param.pg}" />
<c:if test="${empty pg}">
<c:set var="pg" value="1"/></c:if>