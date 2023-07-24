package com.dmonster.reward;

import java.net.URI;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dmonster.reward.api.ResVo;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class CustomErrorController implements ErrorController {
	
	//통합 에러 컨트롤러
    @RequestMapping("/errorPage")
    public ResponseEntity<?> handleError(HttpServletRequest request, HttpServletResponse response, Model model) {
    	
    	//접속 브라우저 확인
    	//웹 요청이면 웹 에러 페이지로 이동
    	if (isWebBrowser(request)) {
    		int StatusCode = Integer.valueOf(request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE).toString());
    		if(StatusCode == 400 || StatusCode == 403 || StatusCode == 404 || StatusCode == 500) {
    			HttpHeaders headers = new HttpHeaders();
    	        headers.setLocation(URI.create("/error/"+StatusCode));
    			return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    		}else {
    			HttpHeaders headers = new HttpHeaders();
    	        headers.setLocation(URI.create("/error/000"));
    			return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    		}
    	}
    	//API 요청이면 JSON 오브젝트로 리턴
    	else {
    		return new ResVo().fail();
    	}
    }
    
    //웹킷 확인
	private boolean isWebBrowser(HttpServletRequest request) {
	    String userAgent = request.getHeader("User-Agent");
	    return userAgent.contains("Mozilla") && userAgent.contains("WebKit");
	}
}

//에러별 컨트롤러
@Controller
@Slf4j
class RedirectErrorController{
	@GetMapping("/error/400")
    public String error400(HttpServletRequest request, Model model) {
		return "/error/400";
	}
	
	@GetMapping("/error/403")
    public String error403(HttpServletRequest request, Model model) {
		return "/error/403";
	}
	
	@GetMapping("/error/403_mng")
    public String error403Mng(HttpServletRequest request, Model model) {
		return "/error/403_mng";
	}
	
	@GetMapping("/error/404")
    public String error404(HttpServletRequest request, Model model) {
		return "/error/404";
	}
	
	@GetMapping("/error/500")
    public String error500(HttpServletRequest request, Model model) {
		return "/error/500";
	}
    
	@GetMapping("/error/000")
    public String errorDefault(HttpServletRequest request, Model model) {
		return "/error/000";
	}
}


