package com.dmonster.reward.jwt;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.dmonster.reward.api.ApiRole;
import com.dmonster.reward.api.ResVo;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
	
    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        try {

            //API ROLE에 등록된 토큰 정보가 필요없는 요청
            if(ApiRole.ROLE_ANONYMOUS.contains(request.getServletPath())) {
            	log.debug("토큰 정보가 필요없는 요청");
            	//pass
            }
            
            //API ROLE에 등록된 토큰 정보가 필요한 요청
            else if(ApiRole.ROLE_ADMIN.contains(request.getServletPath()) || ApiRole.ROLE_USER.contains(request.getServletPath())) {
            	
            	//Bearer Token 정보 가져오기
                String token = jwtTokenProvider.resolveToken(request);
                
                //헤더에서 토큰 정보 확인 불가
                if(token == null) {
                	log.debug("헤더에서 토큰 정보 확인 불가");
                	response = returnResponseError(response, 401, "Token Unauthorized");
                	return;
                }
                
				HashMap<String, String> map = jwtTokenProvider.validateAccessToken(token);
				
				//유효한 토큰
                if(map.get("authorized").equals("true")) {
                	log.debug("유효한 토큰");
                	request.setAttribute("Jwt-Access-Token", token);
                }
                //유효하지 않은 토큰
                else {
                	log.debug("유효하지 않은 토큰");
                	response = returnResponseError(response, 401, map.get("error"));
                	return;
                }
                
            }
            
            //API ROLE에 등록되어있지 않은 요청
            else {
            	log.debug("API ROLE에 등록되어있지 않은 요청");
            	response = returnResponseError(response, 405, "Request Method Not Allowed");
            	return;
            }
            
          
        } 
        //오류 발생된 요청
        catch (JwtException e) {
        	response = returnResponseError(response, 403, "Request Forbidden");
            return;
        }
        
        //chaining
        chain.doFilter(request, response);
    }
    
    
    private HttpServletResponse returnResponseError(HttpServletResponse response, int StatusCode, String FailDetail) {
    	
    	try {
        	ResponseEntity<?> re =  new ResVo().fail(StatusCode, FailDetail);
        	response.setStatus(re.getStatusCodeValue());
        	response.addHeader("Content-Type", "application/json;charset=UTF-8");
        	response.getWriter().write(new ObjectMapper().writeValueAsString(re.getBody()));
		} catch (Exception e) {
			try {
				log.debug("returnResponseError Error: " + e);
				ResponseEntity<?> re =  new ResVo().fail();
	        	response.setStatus(re.getStatusCodeValue());
	        	response.addHeader("Content-Type", "application/json;charset=UTF-8");
	        	response.getWriter().write(new ObjectMapper().writeValueAsString(re.getBody()));
			} catch (Exception e2) {
				response.setStatus(400);
				return response;
			}
		}
    	return response;
    }
}