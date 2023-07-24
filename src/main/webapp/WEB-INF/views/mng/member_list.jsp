<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<jsp:include page="inc/head.jsp"/>
<%@ include file="inc/config.jsp"%>
<%@ include file="inc/side.jsp"%>
<div class="content-wrapper">
	<div class="row">
		<div class="col-md-12 grid-margin stretch-card">
			<div class="card">
				<div class="card-body">
					<h4 class="card-title">회원 관리 > 회원목록</h4>
                    <div class="float-left">
					<div name="frm_search" id="frm_search" class="form-inline">
		
						<div class="form-group mx-sm-1">
                            <select name="search_type" id="search_type" class="form-control form-control-sm">
                                <option value="all" <c:if test="${empty param.search_type or param.search_type eq 'all'}">selected</c:if>>전체회원</option>
                                <option value="user" <c:if test="${param.search_type eq 'user'}">selected</c:if>>일반회원</option>
                                <option value="admin" <c:if test="${param.search_type eq 'admin'}">selected</c:if>>관리자회원</option>
                            </select>
                        </div>
                        
                        <div class="form-group mx-sm-1">
                            <select name="search_filter" id="search_filter" class="form-control form-control-sm">
                                <option value="all" <c:if test="${empty param.search_filter}">selected</c:if>>통합검색</option>
                                <option value="mt_id" <c:if test="${param.search_filter eq 'mt_id'}">selected</c:if>>아이디</option>
                                <option value="mt_name" <c:if test="${param.search_filter eq 'mt_name'}">selected</c:if>>회원명</option>
                            </select>
                        </div>
                                                
						<div class="form-group mx-sm-1">
							<input type="text" class="form-control form-control-sm" style="width:200px;" name="search_txt" id="search_value" value="${param.search_value}" onKeyPress="if( event.keyCode==13 ){do_search();}" placeholder="검색어"/>
						</div>
                        
                        <div class="form-group mx-sm-1">
							<div class="input-group">
								<input placeholder="FROM" type="text" name="search_sdate" id="search_sdate" value="${param.search_sdate}" class="form-control" style="width:120px; height:42px;" readonly /> <span class="m-2">~</span> <input placeholder="TO" type="text" name="search_edate" id="search_edate" value="${param.search_edate}" class="form-control"  style="width:120px; height:42px" readonly />
							</div>
						</div>
						<script>
						(function($) {
                            'use strict';
                            $(function() {
                                jQuery.datetimepicker.setLocale('ko');
                                jQuery('#search_sdate').datetimepicker({
                                    format: 'Y.m.d',
                                    onShow: function (ct) {
                                        this.setOptions({
                                            maxDate: jQuery('#search_edate').val() ? jQuery('#search_edate').val() : false
                                        })
                                    },
                                    timepicker: false
                                });
                                jQuery('#search_edate').datetimepicker({
                                    format: 'Y.m.d',
                                    onShow: function (ct) {
                                        this.setOptions({
                                            minDate: jQuery('#search_sdate').val() ? jQuery('#search_sdate').val() : false
                                        })
                                    },
                                    timepicker: false
                                });
                            });
                        })(jQuery);
						</script>
                        

						<div class="form-group mx-sm-1">
							<input type="button" class="btn btn-primary" value="검색"  onclick="do_search();"/>
						</div>
						<div class="form-group mx-sm-1">
							<input type="button" class="btn btn-secondary" value="초기화" onclick="location.href='${path}'" />
						</div>
					</div>
					</div>

                    <div class="float-right">
					 	<div class="form-group p-0">
                            <select name="search_row" id="search_row" class="form-control form-control-sm" onchange="set_row(this.value)">
                                <option value="5" <c:if test="${row eq 5}">selected</c:if>>5개</option>
                                <option value="10" <c:if test="${row eq 10}">selected</c:if>>10개</option>
                                <option value="20" <c:if test="${row eq 20}">selected</c:if>>20개</option>
                                <option value="50" <c:if test="${row eq 50}">selected</c:if>>50개</option>
                                <option value="100" <c:if test="${row eq 100}">selected</c:if>>100개</option>
                            </select>
                        </div>
                    </div> 

                    <div style="overflow-x:scroll; width:100%;">
					<table class="table table-striped table-hover">
						<thead>
							<tr>
								<th class="text-center">
		                            번호							
								</th>
		                        <th class="text-center">
									회원 아이디
								</th>
								<th class="text-center">
									회원 명
								</th>
								<th class="text-center">
									회원 유형
								</th>
		                        <th class="text-center">
		                            가입일
		                        </th>
							</tr>
						</thead>
						<tbody>
							<c:choose>
								<c:when test="${empty MemberList }">
									<tr>
										<th colspan="5" class="text-center align-middle"><b>자료가 없습니다.</b></th>
									</tr>
								</c:when>
								<c:otherwise>
									<c:forEach items="${MemberList}" var="MemberVo">
										<tr>
											<td class="text-center align-middle">${startIndex }</td>
											<td class="text-center align-middle">${MemberVo.mt_id }</td>
											<td class="text-center align-middle">${MemberVo.mt_name }</td>
											<td class="text-center align-middle">
												<c:if test="${MemberVo.mt_type eq 1}">일반</c:if><c:if test="${MemberVo.mt_type eq 2}">관리자</c:if>
											</td>
											<td class="text-center align-middle">${MemberVo.mt_wdate }</td>
										</tr>
										<c:set var="startIndex" value="${startIndex + 1}" />
									</c:forEach>
								</c:otherwise>
							</c:choose>
						</tbody>
					</table>
                    </div>
					<!-- 페이징처리 -->
					<%@ include file="inc/paging.jsp" %>
				</div>
			</div>
		</div>
	</div>
</div>
<script>
	//해당 페이지 검색옵션
	haveSearchValue = true,  haveSearchFilter = true, haveSearchType = true, haveDatePicker = true,
	haveDatePicker2 = false;
	
	function do_search(){
		console.log(make_search_path(`${path}`));
		location.href = make_search_path(`${path}`);
	}
</script>
<jsp:include page="inc/tail.jsp"/>