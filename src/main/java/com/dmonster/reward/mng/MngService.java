package com.dmonster.reward.mng;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.dmonster.reward.member.MemberVo;
import com.dmonster.reward.session.CustomSessionRegistry;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Repository
//관리자 서비스단
public class MngService {
	
	@Autowired
	MngDao mngDao;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
    @Autowired
    private CustomSessionRegistry customSessionRegistry;
	
	//회원가입 처리
	public HashMap<String, Object> doJoin(@Valid MemberVo memberVo, BindingResult bindingResult) {
		
		HashMap<String,Object> map = new HashMap<String,Object>();
		map.put("result","error");
		
        //유효성 검증
        if (bindingResult.hasErrors()) {
            return map;
        }
		
		try {
			memberVo.setMt_pwd(passwordEncoder.encode(memberVo.getMt_pwd()));
			int insert_row = mngDao.setMember(memberVo);
			if(insert_row > 0) {
				map.put("result","success");
			}
		} catch (Exception e) {
			log.error(e+"");
			return map;
		}
		return map;
	}
	
	//로그인 처리
	public HashMap<String, Object> doLogin(@Valid MemberVo memberVo, BindingResult bindingResult, HttpServletRequest request) {
		
		HashMap<String,Object> map = new HashMap<String,Object>();
		map.put("result","error");
		
        //유효성 검증
        if (bindingResult.hasErrors()) {
            return map;
        }
        
        try {
        	//회원 정보
        	MemberVo memberVo2 = getMember(memberVo);
        	
	        //회원 확인
	        if(memberVo2 != null) {
	        	
	        	//인증정보 등록
	        	customSessionRegistry.setMember(memberVo2, request);
	        	
	        	//세션에 로그인 정보 저장
	        	HttpSession session = request.getSession();
	        	session.setAttribute("MyMemberVo", memberVo2);
	        	
	            map.put("result","success");
	        }else {
	        	map.put("result","fail");
	        }
        } catch (Exception e) {
			log.error(e+"");
			return map;
		}
		return map;
	}
	
	
	//회원 존재 확인 + 비밀번호 확인
	private MemberVo getMember(MemberVo memberVo) {
		try {
			MemberVo memberVo2 = mngDao.getMember(memberVo);
			if(memberVo2 != null) {
				if(passwordEncoder.matches(memberVo.getMt_pwd(), memberVo2.getMt_pwd())) {
					return memberVo2;
				}
			}
		} catch (Exception e) {
			log.error(e+"");
			return null;
		}
		return null;
	}

	public List<MemberVo> getMemberList(Map<String, Object> map) {
		return mngDao.getMemberList(map);
	}

	public int getMemberListCount(Map<String, Object> map) {
		return mngDao.getMemberListCount(map);
	}
}
