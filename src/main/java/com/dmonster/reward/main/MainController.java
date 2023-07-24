package com.dmonster.reward.main;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dmonster.reward.member.MemberVo;

import lombok.extern.slf4j.Slf4j;

@Controller
@Order(Ordered.HIGHEST_PRECEDENCE)
@Slf4j
public class MainController {
	
	@Autowired
	MainService mainService;
	
	//루트 페이지
	@GetMapping("/main")
    public String rootMain() {
	    return "redirect:/main/index";
    }
	
	@GetMapping("/main/index")
    public String rootIndex(HttpServletRequest request, Model model, @AuthenticationPrincipal User user) {
		log.debug("/main/index");
		return "/main/index";
	}
	
	@GetMapping("/main/join")
    public String join(HttpServletRequest request, Model model) {
		log.debug("/main/join");
		return "/main/join";
	}
	
	@GetMapping("/main/login")
    public String login(HttpServletRequest request, Model model) {
		log.debug("/main/login");
		return "/main/login";
	}
	
	@GetMapping("/main/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		log.debug("/main/logout");
		HttpSession session= request.getSession(false);
		SecurityContextHolder.clearContext();
        session= request.getSession(false);
        if(session != null) {
            session.invalidate();
        }
		
//        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        return "redirect:/main/login";
    }
	
	//USER ROLE 로그인
	@PostMapping("/main/login.do")
	@ResponseBody
    public HashMap<String, Object> doLogin(@Valid @ModelAttribute MemberVo memberVo, BindingResult bindingResult, HttpServletRequest request, Model model) {
		log.debug("/main/login.do");
        return mainService.doLogin(memberVo, bindingResult, request);
	}
	
	//USER ROLE 회원가입
	@PostMapping("/main/join.do")
	@ResponseBody
    public HashMap<String, Object> doJoin(@Valid @ModelAttribute MemberVo memberVo, BindingResult bindingResult, HttpServletRequest request, Model model) {
		log.debug("/main/join.do");
        return mainService.doJoin(memberVo, bindingResult);
	}
}
