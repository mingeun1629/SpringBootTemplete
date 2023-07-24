package com.dmonster.reward.jwt;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.dmonster.reward.member.MemberVo;

import org.springframework.beans.factory.annotation.Value;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@SuppressWarnings("all")
public class JwtTokenProvider {

    @Value("${jwt.secretkey}")
    private String secretKey;
    
    @Value("${jwt.secretkey2}")
    private String secretKey2;
    
    //Access 토큰 발행
    public String createAccessToken(MemberVo memberVo) {
    	Claims claims = Jwts.claims().setSubject("Jwt-Access-Token");
        claims.put("userRole", memberVo.getMt_type());
        claims.put("userIdx", memberVo.getIdx());
        claims.put("userId", memberVo.getMt_id());
        Date now = new Date();
        Date validity = new Date(now.getTime() + 1800000); //3600000

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
    
    //Refresh 토큰 발행
    public String createRefreshToken(MemberVo memberVo) {
        Claims claims = Jwts.claims().setSubject("Jwt-Refresh-Token");
        claims.put("userRole", memberVo.getMt_type());
        claims.put("userIdx", memberVo.getIdx());
        claims.put("userId", memberVo.getMt_id());
        Date now = new Date();
        Date validity = new Date(now.getTime() + 1209600000);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey2)
                .compact();
    }
    
    
    //Bearer Token에서 토큰값 추출
    public String resolveToken(HttpServletRequest req) {
    	try {
            String bearerToken = req.getHeader("Authorization");
            if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
                return bearerToken.substring(7);
            }
            return null;
		} catch (Exception e) {
			return null;
		}
    }
    
    //access 토큰 유효 여부 확인
    public HashMap validateAccessToken(String token) {
    	
    	HashMap<String, Object> map = new HashMap<String, Object>();
    	map.put("authorized", "false");
    	
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            map.put("authorized", "true");
        }
        catch (ExpiredJwtException e) {
        	map.put("authorized", "false");
        	map.put("error", "Token Expired");
		}
        catch (MalformedJwtException e) {
        	map.put("authorized", "false");
        	map.put("error", "Token Malformed");
		}
        catch (SignatureException e) {
        	map.put("authorized", "false");
        	map.put("error", "Token Signature Unmatch");
		}
        catch (JwtException | IllegalArgumentException e) {
        	map.put("authorized", "false");
        	map.put("error", "Token Unauthorized");
        }
        finally {
			return map;
		}
    }
    
    //refresh 토큰 유효 여부 확인
    public HashMap validateRefreshToken(String token) {
    	
    	HashMap<String, Object> map = new HashMap<String, Object>();
    	map.put("authorized", "false");
    	
        try {
            Jwts.parser().setSigningKey(secretKey2).parseClaimsJws(token);
            map.put("authorized", "true");
        }
        catch (ExpiredJwtException e) {
        	map.put("authorized", "false");
        	map.put("error", "Token Expired");
		}
        catch (MalformedJwtException e) {
        	map.put("authorized", "false");
        	map.put("error", "Token Malformed");
		}
        catch (SignatureException e) {
        	map.put("authorized", "false");
        	map.put("error", "Token Signature Unmatch");
		}
        catch (JwtException | IllegalArgumentException e) {
        	map.put("authorized", "false");
        	map.put("error", "Token Unauthorized");
        }
        finally {
			return map;
		}
    }
    
    //토큰에서 id, idx 가져오기
    public MemberVo getMemberFromToken(String token) {
    	MemberVo memberVo = new MemberVo();
    	memberVo.setIdx((int) Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("userIdx"));
    	memberVo.setMt_id((String) Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("userId"));
    	return memberVo;
    }
    

    

}