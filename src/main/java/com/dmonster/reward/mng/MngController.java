package com.dmonster.reward.mng;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dmonster.reward.logic.PageLogic;
import com.dmonster.reward.main.MainService;
import com.dmonster.reward.member.MemberVo;
import com.dmonster.reward.session.CustomSessionRegistry;

import lombok.extern.slf4j.Slf4j;

@Controller
@Order(Ordered.HIGHEST_PRECEDENCE)
@Slf4j
//관리자 컨트롤러
public class MngController {

    @Autowired
    private CustomSessionRegistry customSessionRegistry;
   
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	MngService mngService;
	
	@Autowired
	PageLogic pageLogic;

	//루트 페이지
	@GetMapping("/mng")
    public String rootMain() {
	    return "redirect:/mng/index";
    }
	
	@GetMapping("/mng/index")
    public String rootIndex(HttpServletRequest request, Model model, @AuthenticationPrincipal User user) {
		log.debug("/mng/index");
//		log.debug(SecurityContextHolder.getContext().getAuthentication().getName());
//		HttpSession session = request.getSession();
//		log.debug((String)session.getAttribute("member"));
		return "/mng/index";
	}
	
	@GetMapping("/mng/join")
    public String join(HttpServletRequest request, Model model) {
		log.debug("/mng/join");
		return "/mng/join";
	}
	
	@GetMapping("/mng/login")
    public String login(HttpServletRequest request, Model model) {
		log.debug("/mng/login");
		
		return "/mng/login";
	}
	
	@GetMapping("/mng/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		log.debug("/mng/logout");
		HttpSession session= request.getSession(false);
		SecurityContextHolder.clearContext();
        session= request.getSession(false);
        if(session != null) {
            session.invalidate();
        }
		
//		new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        return "redirect:/mng/login";
    }
	
	//ADMIN ROLE 로그인
	@PostMapping("/mng/login.do")
	@ResponseBody
    public HashMap<String, Object> doLogin(@Valid @ModelAttribute MemberVo memberVo, BindingResult bindingResult, HttpServletRequest request, Model model) {
		log.debug("/mng/login.do");
        return mngService.doLogin(memberVo, bindingResult, request);
	}
	
	//ADMIN ROLE 회원가입
	@PostMapping("/mng/join.do")
	@ResponseBody
    public HashMap<String, Object> doJoin(@Valid @ModelAttribute MemberVo memberVo, BindingResult bindingResult, HttpServletRequest request, Model model) {
		log.debug("/mng/join.do");
        return mngService.doJoin(memberVo, bindingResult);
	}

	@GetMapping("/mng/member_list")
	public String memberList(HttpServletRequest request, Model model) {
		
		//mapper에서 사용할 검색 파라미터 객체 선언
		Map<String, Object> map = new HashMap<String, Object>();
		
        //페이징, 로우갯수, 검색값 입력
        map = pageLogic.getPagingQuery(request, map);
        
        //회원리스트
        List<MemberVo> list =  mngService.getMemberList(map);
        model.addAttribute("MemberList", list);

        //페이지수 계산
        map = pageLogic.getPagingCalc(map, mngService.getMemberListCount(map));
        
        //페이징 처리 정보 부여
        model.addAttribute("PageInfo", map);
		
		
//		customSessionRegistry.getLoginMembers();
		return "/mng/member_list";
	}
}
