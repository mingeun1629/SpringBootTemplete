package com.dmonster.reward.logic;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
@Service
@Slf4j
public class PageLogic {
	
	public Map<String, Object> getPagingQuery(HttpServletRequest request, Map<String, Object> map){
		
		String pg = request.getParameter("pg");
		String row = request.getParameter("row");
		String search_value = request.getParameter("search_value");
		String search_filter = request.getParameter("search_filter");
		String search_type = request.getParameter("search_type");
		String search_sdate = request.getParameter("search_sdate");
		String search_edate = request.getParameter("search_edate");
		String search_sdate2 = request.getParameter("search_sdate2");
		String search_edate2 = request.getParameter("search_edate2");
		String search_order = request.getParameter("search_order");
		
		if (pg == null || "null".equals(pg)) {pg = "1";}
		if (row == null || "null".equals(row)) {row = "10";}
		if (search_value == null || "null".equals(search_value)) {search_value = "";}
		if (search_filter == null || "null".equals(search_filter)) {search_filter = "";}
		if (search_sdate == null || "null".equals(search_sdate)) {search_sdate = "";}
		if (search_edate == null || "null".equals(search_edate)) {search_edate = "";}
		if (search_sdate2 == null || "null".equals(search_sdate2)) {search_sdate2 = "";}
		if (search_edate2 == null || "null".equals(search_edate2)) {search_edate2 = "";}
		if (search_type == null || "null".equals(search_type)) {search_type = "";}
		if (search_order == null || "null".equals(search_order)) {search_order = "ASC";}
		
		int offset = 0;
		int cur_page = 0;
		int fetch = 10;
		
		try {
			cur_page = Integer.parseInt(pg);
			fetch = Integer.parseInt(row);
			
			//최소 row 1개 이상
			if(fetch < 1) {
				fetch = 1;
			}
			
			//최대 row 100개 이하
			if(fetch > 100) {
				fetch = 100;
			}
			
			//offset 계산
			if(cur_page > 1) {
				offset = (fetch * (cur_page - 1));
			}
			
		} catch (Exception e) {
			offset = 0;
			fetch = 10;
			cur_page = 1;
		}
		
		// 현재 페이지
		map.put("cur_page", cur_page);
		// 시작row
		map.put("offset", offset);
		// 페이지 row갯수
		map.put("fetch", fetch);
		map.put("row", fetch);
		
		// 검색 유형
		map.put("search_type", search_type);
		
		// 검색어
		map.put("search_value", search_value);
		
		// 검색필터
		map.put("search_filter", search_filter);
		
		// 기간1-from
		map.put("search_sdate", search_sdate);
		
		// 기간1-to
		map.put("search_edate", search_edate);
		
		// 기간2-from
		map.put("search_sdate2", search_sdate2);
		
		// 기간2-to
		map.put("search_edate2", search_edate2);
		
		// 정렬
		map.put("search_order", search_order);
		
		return map;
	}
	
	public Map<String, Object> getPagingCalc(Map<String, Object> map, int total_count) {
		
		int total_page = 0;
		int start_page = 0;
		int end_page = 0;
		
		List<Integer> pageList = new ArrayList<Integer>();
		
		try {
			
			int cur_page = (int)map.get("cur_page");
			
			//전체 페이지수
			total_page = (int)Math.ceil( (total_count*1.0) / (int)map.get("fetch") );
			
			for(int i = -2; i < 3; i++) {
				int pageNum = cur_page + i;
				
				//1보다 작을때
				if(pageNum >= 1 && pageNum <= total_page) {
					pageList.add(pageNum);
				}
			}
			
			start_page = Collections.min(pageList);
			end_page = Collections.max(pageList);     
			
			if((end_page == 3 || end_page == 4) && total_page > 3) {
				end_page = total_page == 4 ? 4 : 5;
			}
			
			
			log.debug("total_count: "+total_count+", "+"total_page: "+total_page+", "+"start_page: "+start_page+", "+"end_page: "+end_page+", "+"cur_page: "+map.get("cur_page"));
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		log.info(String.valueOf(total_page));
		
		//전체갯수
		map.put("total_count", total_count);
		//마지막페이지
		map.put("start_page", start_page);
		//마지막페이지
		map.put("end_page", end_page);
		//총페이지
		map.put("total_page", total_page);

		return map;
	}
	
}
