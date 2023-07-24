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
					<p>내정보</p>
					<div class="tab-content" style="border: 1px solid #f3f3f3;">
						<div class="tab-pane" id="con_tab1" role="tabpanel" aria-labelledby="tab_tab1" style="display:block;">
							<div class="row">
								<div class="col-sm-12">
									<div class="form-group row align-items-center">
										<label for="at_id" class="col-sm-3 col-form-label">회원 아이디</label>
										<div class="col-sm-9">
											<input type="text" name="mt_id" id="mt_id" value="${MyMemberVo.getMt_id()}" class="form-control form-control-sm" readonly/>
										</div>
									</div>
									<div class="form-group row align-items-center">
										<label for="at_id" class="col-sm-3 col-form-label">회원 유형</label>
										<div class="col-sm-9">
											<input type="text" mt_type="mt_id" id="mt_type" value="<c:choose><c:when test="${MyMemberVo.getMt_type() eq 2}">관리자</c:when><c:otherwise>일반</c:otherwise></c:choose>" class="form-control form-control-sm" readonly/>
										</div>
									</div>
									<div class="form-group row align-items-center">
										<label for="at_id" class="col-sm-3 col-form-label">회원 명</label>
										<div class="col-sm-9">
											<input type="text" name="mt_name" id="mt_name" value="${MyMemberVo.getMt_name()}" class="form-control form-control-sm" readonly/>
										</div>
									</div>
									<div class="form-group row align-items-center">
										<label for="at_id" class="col-sm-3 col-form-label">회원 가입일</label>
										<div class="col-sm-9">
											<input type="text" name="mt_wdate" id="mt_wdate" value="${MyMemberVo.getMt_wdate()}" class="form-control form-control-sm" readonly/>
										</div>
									</div>
								</div>
							</div>
						</div>															
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<jsp:include page="inc/tail.jsp"/>