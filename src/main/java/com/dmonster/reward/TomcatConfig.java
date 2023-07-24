package com.dmonster.reward;

import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TomcatConfig implements WebServerFactoryCustomizer<TomcatServletWebServerFactory> {
    // tomcat8 이상 부터, parameter에 특수문자 전달 시 거부 됨, 전달받을 수 있도록 처리(내부톰켓에서만 정상동작, 외부톰켓 사용시 따로 설정필요)
    @Override
    public void customize(TomcatServletWebServerFactory factory) {
        factory.addConnectorCustomizers((TomcatConnectorCustomizer) connector -> connector.setAttribute("relaxedQueryChars", "<>[\\]^`{|}"));   
    }
}