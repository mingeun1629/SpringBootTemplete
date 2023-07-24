<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>


<c:if test="${PageInfo['total_page'] > 1}">
    <div class="col-12 d-flex justify-content-center">         
           <nav aria-label="Page navigation">
               <ul class="pagination">
               		<c:if test="${PageInfo['cur_page'] > 1}">				
						<li class="page-item">
							<a class="page-link"href="javascript:go_page(${PageInfo['cur_page']-1}, ${PageInfo['row']});">
								<i class="mdi mdi-chevron-left"></i>
							</a>
						</li>
					</c:if>
					
					<c:if test="${PageInfo['total_page'] > 1}">
						<c:forEach var="i" begin="${PageInfo['start_page']}" end="${PageInfo['end_page']}">
							<c:choose>
								<c:when test="${PageInfo['cur_page'] ne i}">
									<li class="page-item"><a class="page-link" href="javascript:go_page(${i}, ${PageInfo['row']});">${i}</a></li>
								</c:when>
								<c:otherwise>
									<li class="page-item active"><a class="page-link" href="javascript:go_page(${i}, ${PageInfo['row']});">${i}</a></li>
								</c:otherwise>
							</c:choose>
						</c:forEach>
					</c:if>
					
					<c:if test="${PageInfo['cur_page'] < PageInfo['total_page'] && PageInfo['total_page'] > 1}">
						<li class="page-item">
							<a class="page-link" href="javascript:go_page(${PageInfo['cur_page']+1}, ${PageInfo['row']});">
								<i class="mdi mdi-chevron-right"></i>
							</a>
						</li>
					</c:if>

               </ul>
           </nav>
     </div>
</c:if>




<script>

var search_row = '${PageInfo['row']}';


function go_page(pg, row){

	let params = new URLSearchParams(window.location.search);
	params.set('pg', pg);
	params.set('row', row);
	location.href = location.protocol + '//' + location.host + location.pathname + '?' + params.toString();

}

function set_row(row){
	let params = new URLSearchParams(window.location.search);
	params.set('pg', 1);
	params.set('row', row);
	location.href = location.protocol + '//' + location.host + location.pathname + '?' + params.toString();
}

</script>


