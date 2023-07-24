package com.dmonster.reward.api;

import java.util.ArrayList;
import java.util.Arrays;

//API단으로 요청들어오는 항목들은 스프링 시큐리티에서 아래 권한 리스트 필터를 한번 거치도록 한다.
public class ApiRole {
	//사용자단
	public static ArrayList<String> ROLE_USER = new ArrayList<>(Arrays.asList(
			"/api/member/info",
			"/api/member/password",
			"/api/member/leave",
			"/api/news"
			));
	
	//관리자단
	public static ArrayList<String> ROLE_ADMIN = new ArrayList<>(Arrays.asList(
			"/api/member/info"
			));
	//헤더에 토큰정보가 필요없는 API 요청
	public static ArrayList<String> ROLE_ANONYMOUS = new ArrayList<>(Arrays.asList(
			"/api/app/config",
			"/api/login",
			"/api/token/access",
			"/api/token/refresh",
			"/api/join/registry",
			"/api/join/term",
			"/api/join/duplicate/id",
			"/api/join/duplicate/di",
			"/api/rss/update"
			));
}
