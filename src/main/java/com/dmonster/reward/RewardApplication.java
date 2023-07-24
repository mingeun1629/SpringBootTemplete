package com.dmonster.reward;


import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;


@SpringBootApplication
@EnableScheduling
@Controller
@Slf4j
@SpringBootTest(classes = RewardApplication.class)
public class RewardApplication extends SpringBootServletInitializer {
	
	//외부톰캣사용시
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(RewardApplication.class);
	}
	
	public static void main(String[] args) {
		SpringApplication.run(RewardApplication.class, args);
	}
	
	// 파비콘
	@GetMapping("/favicon.ico")
    public void favicon() {
	}  
	
	// 루트 페이지
	@GetMapping("/")
    public String rootMain() {
	    return "redirect:/main/index";
    }
	// 루트 페이지
	@GetMapping("/index")
    public String rootIndex() {
	    return "redirect:/main/index";
    }
	
    // robots.txt 세팅
    @RequestMapping(value = "/robots.txt")
    @ResponseBody
    public void robotsBlock(HttpServletRequest request, HttpServletResponse response) {
        try {
            response.getWriter().write("User-agent: *\nDisallow: /\n");
        } catch (IOException e) {
            log.error("robots.txt error", e);
        }
    }
}
