

package com.dmonster.reward;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;

import com.dmonster.reward.jwt.JwtAuthenticationFilter;
import com.dmonster.reward.jwt.JwtTokenProvider;
import com.dmonster.reward.session.CustomSessionRegistry;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
//	@Autowired
//	@Qualifier("sessionRegistry")
//	private SessionRegistry sessionRegistry;
	
	@Autowired
    private CustomSessionRegistry customSessionRegistry;
	
	
    // 인증 예외처리
	@Bean
    public WebSecurityCustomizer configure() {
        return (web) -> 
        web.ignoring().antMatchers("/favicon.ico","/resources/**","/errorPage","/error/**");
    }
	
	//웹 - 일반 사용자용
    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    	
			http
//	    		.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//	        .and()
//	 			.antMatcher("/main/**").csrf().disable().authorizeRequests()
				.antMatcher("/main/**").authorizeRequests()
			    .antMatchers("/main/login","/main/login.do", "/main/join","/main/join.do").permitAll()
			    .antMatchers("/main/logout").authenticated()
			    .antMatchers("/main/**").hasRole("USER")
			    
	        .and()
				.formLogin()
			    .loginPage("/main/login")
			    .defaultSuccessUrl("/main/login")
			.and()
				.logout()
			    .logoutUrl("/main/logout")
				.logoutSuccessUrl("/main/login")
				.invalidateHttpSession(true)
				.deleteCookies("JSESSIONID")
			.and()
				.exceptionHandling()
				.accessDeniedPage("/main/login")
			
			.and()
				.sessionManagement()
				.sessionAuthenticationStrategy(customSessionRegistry)
				.maximumSessions(1)
				.maxSessionsPreventsLogin(true)
				.expiredUrl("/main/login");
		
		return http.build();
    }
    
    //웹 - 관리자용
    @Bean
    protected SecurityFilterChain securityFilterChain2(HttpSecurity http) throws Exception {
    	
    	 	http
//	    		.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//	        .and()
//    	 		.antMatcher("/mng/**").csrf().disable().authorizeRequests()
	    	 	.antMatcher("/mng/**").authorizeRequests()
	            .antMatchers("/mng/login","/mng/login.do", "/mng/join","/mng/join.do").permitAll()
	            .antMatchers("/mng/logout").authenticated()
	            .antMatchers("/mng/**").hasRole("ADMIN")
	        .and()
	        	.formLogin()
	            .loginPage("/mng/login")
	            .defaultSuccessUrl("/mng/index")
	        .and()
	        	.logout()
	            .logoutUrl("/mng/logout")
	            .logoutSuccessUrl("/mng/login")
	            .invalidateHttpSession(true)
				.deleteCookies("JSESSIONID")
			.and()
				.exceptionHandling()
				.accessDeniedPage("/mng/login")
	 		.and()
	 			.sessionManagement()
				.sessionAuthenticationStrategy(customSessionRegistry)
				.maximumSessions(1)
				.maxSessionsPreventsLogin(true)
				.expiredUrl("/mng/login");
	    	 
	    		return http.build();
    }
    

    //API용 jwt autowired & bean
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    @Bean
    public SecurityFilterChain SecurityFilterChainAPI(HttpSecurity http) throws Exception {
        return http
        		.antMatcher("/api/**")
            	.csrf().disable()
            	.authorizeRequests()
                .antMatchers("/api/**").permitAll()
            .and()
            	.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            	.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
            	.build();
    }
    
     
    @Bean
    public HttpFirewall defaultHttpFirewall() {
        return new DefaultHttpFirewall();
    }
    
    @Bean
    public PasswordEncoder getPasswordEncoder() {
       return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }
    

//    @Bean
//    public JwtAuthenticationFilter jwtAuthenticationFilter() {
//        return new JwtAuthenticationFilter(new JwtTokenProvider());
//    }

}
