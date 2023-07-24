package com.dmonster.reward.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dmonster.reward.jwt.JwtTokenProvider;
import com.dmonster.reward.logic.PageLogic;
import com.dmonster.reward.member.JoinVo;
import com.dmonster.reward.member.MemberVo;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;


@Controller
@Order(Ordered.HIGHEST_PRECEDENCE)
@Slf4j
//API 컨트롤러
public class ApiController {
	
	@Autowired
	private ApiService apiService;
	
	@PostMapping("/api/app/config")
    public ResponseEntity<?> appConfig(HttpServletRequest request) {
    	log.debug("/api/app/config");
    	return apiService.appConfig(request);
    }
	
    @PostMapping("/api/login")
    public ResponseEntity<?> doLogin(MemberVo memberVo, BindingResult bindingResult, HttpServletRequest request) {
    	log.debug("/api/login");
    	return apiService.doLogin(memberVo, bindingResult, request);
    }

    @PostMapping("/api/member/info")
    public ResponseEntity<?> getMemberInfo(HttpServletRequest request) {
    	log.debug("/api/member/info");
        return apiService.getMemberInfo(request);
    }
    
    @PostMapping("/api/member/password")
    public ResponseEntity<?> memberPassword(MemberVo memberVo, BindingResult bindingResult, HttpServletRequest request) {
    	log.debug("/api/member/password");
        return apiService.memberPassword(memberVo, bindingResult, request);
    }
    
    @PostMapping("/api/member/leave")
    public ResponseEntity<?> memberLeave(HttpServletRequest request) {
    	log.debug("/api/member/leave");
        return apiService.memberLeave(request);
    }
    
    @PostMapping("/api/token/access")
    public ResponseEntity<?> getAccessToken(TokenVo tokenVo, BindingResult bindingResult, HttpServletRequest request) {
    	log.debug("/api/token/access");
        return apiService.getAccessToken(tokenVo, bindingResult, request);
    }
    
    @PostMapping("/api/token/refresh")
    public ResponseEntity<?> getRefreshToken(TokenVo tokenVo, BindingResult bindingResult, HttpServletRequest request) {
    	log.debug("/api/token/refresh");
        return apiService.getRefreshToken(tokenVo, bindingResult, request);
    }
    
    @PostMapping("/api/join/registry")
    public ResponseEntity<?> joinRegistry(JoinVo joinVo, BindingResult bindingResult, HttpServletRequest request) {
    	log.debug("/api/join/registry");
        return apiService.joinRegistry(joinVo, bindingResult, request);
    }
    
    @PostMapping("/api/join/duplicate/id")
    public ResponseEntity<?> joinDuplicateId(JoinVo joinVo, BindingResult bindingResult, HttpServletRequest request) {
    	log.debug("/api/join/duplicate/id");
        return apiService.joinDuplicateId(joinVo, bindingResult, request);
    }
    
    @PostMapping("/api/join/duplicate/di")
    public ResponseEntity<?> joinDuplicateDi(JoinVo joinVo, BindingResult bindingResult, HttpServletRequest request) {
    	log.debug("/api/join/duplicate/di");
        return apiService.joinDuplicateDi(joinVo, bindingResult, request);
    }
    
    @PostMapping("/api/join/term")
    public ResponseEntity<?> joinTerm(HttpServletRequest request) {
    	log.debug("/api/join/term");
        return apiService.joinTerm(request);
    }
    
    @PostMapping("/api/rss/update")
    public ResponseEntity<?> rssUpdate(HttpServletRequest request) {
    	log.debug("/api/rss/update");
        return apiService.rssUpdate();
    }
    
    @PostMapping("/api/news")
    public ResponseEntity<?> news(HttpServletRequest request) {
    	log.debug("/api/news");
        return apiService.news(request);
    }
    
}