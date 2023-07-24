package com.dmonster.reward.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.dmonster.reward.jwt.JwtTokenProvider;
import com.dmonster.reward.logic.PageLogic;
import com.dmonster.reward.main.MainDao;
import com.dmonster.reward.member.JoinVo;
import com.dmonster.reward.member.MemberVo;
import com.dmonster.reward.rss.RSSHeaderVo;
import com.dmonster.reward.rss.NewsVo;
import com.dmonster.reward.rss.RSSNewsParser;
import com.dmonster.reward.vo.TermVo;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Repository
public class ApiService {

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	MainDao mainDao;

	@Autowired
	ApiDao apiDao;
	
	@Autowired
	PageLogic pageLogic;

	// 로그인 처리
	public ResponseEntity<?> doLogin(@Valid MemberVo memberVo, BindingResult bindingResult,
			HttpServletRequest request) {

		// 유효성 검증
		if (bindingResult.hasErrors()) {
			return new ResVo().fail(400, "Invalid Request Parameter");
		}

		try {
			// 회원 정보
			String mt_app_token = memberVo.getMt_app_token();
			memberVo = getMemberById(memberVo);

			// 회원 확인
			if (memberVo != null) {

				// 엑세스 토큰 발급
				String RefreshToken = jwtTokenProvider.createRefreshToken(memberVo);
				String AccessToken = jwtTokenProvider.createAccessToken(memberVo);
				memberVo.setMt_jwt(RefreshToken);
				memberVo.setMt_app_token(mt_app_token);

				// 토큰 저장
				int update_row = apiDao.updateToken(memberVo);
				if (update_row > 0) {
					// 토큰 리턴
					return new ResVo().success(new TokenVo(AccessToken, RefreshToken));
				}
			} else {
				return new ResVo().fail(200, "Wrong ID/PW or member does not exist");
			}

		} catch (Exception e) {
			log.error("doLogin Error: " + e);
			return new ResVo().fail();
		}
		return new ResVo().fail();
	}

	// 회원 정보 가져오기
	public ResponseEntity<?> getMemberInfo(HttpServletRequest request) {

		try {
			// 토큰에서 IDX, ID 가져오기
			MemberVo memberVo = jwtTokenProvider.getMemberFromToken((String) request.getAttribute("Jwt-Access-Token"));

			// 회원 IDX로 회원정보 가져오기
			memberVo = apiDao.getMemberByIdx(memberVo);

			// 회원 객체 리턴
			if (memberVo != null) {
				return new ResVo().success(memberVo);
			} else {
				return new ResVo().fail();
			}
		} catch (Exception e) {
			log.error("getMemberInfo Error: " + e);
			return new ResVo().fail();
		}
	}

	// access 토큰 발급
	public ResponseEntity<?> getAccessToken(@Valid TokenVo tokenVo, BindingResult bindingResult,
			HttpServletRequest request) {

		try {

			// 리프레시 토큰 유효성 확인
			HashMap<String, String> map = jwtTokenProvider.validateRefreshToken(tokenVo.getRefreshToken());

			// 유효한 토큰
			if (map.get("authorized").equals("true")) {

				// 토큰으로 회원정보 가져오기
				MemberVo memberVo = new MemberVo();
				memberVo.setMt_jwt(tokenVo.getRefreshToken());
				memberVo = apiDao.getMemberByToken(memberVo);

				// refresh 토큰이 일치하면 access 토큰 발급
				if (memberVo != null) {
					tokenVo.setAccessToken(jwtTokenProvider.createAccessToken(memberVo));
					// 기존 refresh 토큰과 신규 access 토큰 리턴
					return new ResVo().success(tokenVo);
				} else {
					return new ResVo().fail(401, "Unknown Token");
				}
			} else {
				return new ResVo().fail(401, map.get("error"));
			}

		} catch (Exception e) {
			log.error("getAccessToken Error: " + e);
			return new ResVo().fail();
		}
	}

	// refresh 토큰 발급
	public ResponseEntity<?> getRefreshToken(@Valid TokenVo tokenVo, BindingResult bindingResult,
			HttpServletRequest request) {

		try {

			// refresh 토큰 유효성 확인
			HashMap<String, String> map = jwtTokenProvider.validateRefreshToken(tokenVo.getRefreshToken());

			// 유효한 토큰
			if (map.get("authorized").equals("true")) {

				// 토큰으로 회원정보 가져오기
				MemberVo memberVo = new MemberVo();
				memberVo.setMt_jwt(tokenVo.getRefreshToken());
				memberVo = apiDao.getMemberByToken(memberVo);

				// 기존 refresh 토큰이 일치하면 새로운 refresh 토큰 발급
				if (memberVo != null) {

					tokenVo.setRefreshToken(jwtTokenProvider.createRefreshToken(memberVo));
					tokenVo.setAccessToken(jwtTokenProvider.createAccessToken(memberVo));

					// 신규 refresh 토큰으로 replace
					memberVo.setMt_jwt(tokenVo.getRefreshToken());

					// 신규 토큰 저장
					int update_row = apiDao.updateToken(memberVo);
					if (update_row > 0) {
						// 신규 refresh 토큰과 신규 access 토큰 리턴
						return new ResVo().success(tokenVo);
					} else {
						return new ResVo().fail(401, "Token Save Fail");
					}
				} else {
					return new ResVo().fail(401, "Unknown Token");
				}
			} else {
				return new ResVo().fail(401, map.get("error"));
			}

		} catch (Exception e) {
			log.error("getRefreshToken Error: " + e);
			return new ResVo().fail();
		}
	}

	// 회원 등록
	public ResponseEntity<?> joinRegistry(JoinVo joinVo, BindingResult bindingResult, HttpServletRequest request) {

		int cnt = countMemberById(MemberVo.builder().mt_id(joinVo.getMt_id()).mt_type(1).mt_level(1).build());

		if (cnt > 0) {
			return new ResVo().fail(200, "Can not use this ID");
		}

		cnt = countMemberByDi(MemberVo.builder().mt_di(joinVo.getMt_di()).mt_type(1).mt_level(1).build());

		if (cnt > 0) {
			return new ResVo().fail(200, "Can not use this DI");
		}

		MemberVo memberVo = MemberVo.builder().mt_id(joinVo.getMt_id())
				.mt_pwd(passwordEncoder.encode(joinVo.getMt_pwd())).mt_di(joinVo.getMt_di()).mt_level(1).mt_type(1)
				.mt_nick(joinVo.getMt_nick()).build();

		int insert_row = apiDao.setMember(memberVo);

		if (insert_row > 0) {

			insert_row = 0;

			// 추천인 코드 생성
			while (insert_row == 0) {
				memberVo.setMt_code(RandomStringUtils.randomAlphabetic(5));
				insert_row = apiDao.setMemberCode(memberVo);
			}

			// 약관동의 정보 생성
			// 가입 성공 리턴
			return new ResVo().success(joinVo, "Registration successful");
		}

		return new ResVo().fail(200, "Registration failed");
	}

	// 아이디 중복 확인
	public ResponseEntity<?> joinDuplicateId(JoinVo joinVo, BindingResult bindingResult, HttpServletRequest request) {
		try {
			int cnt = countMemberById(MemberVo.builder().mt_id(joinVo.getMt_id()).mt_type(1).mt_level(1).build());

			if (cnt > 0) {
				return new ResVo().fail(200, "Can not use this ID");
			}

			return new ResVo().success(joinVo.getMt_id(), "Can use this ID");
		} catch (Exception e) {
			log.debug("joinDuplicateId Error: " + e);
		}
		return new ResVo().fail();
	}

	// DI 중복 확인
	public ResponseEntity<?> joinDuplicateDi(JoinVo joinVo, BindingResult bindingResult, HttpServletRequest request) {

		try {
			int cnt = countMemberByDi(MemberVo.builder().mt_di(joinVo.getMt_di()).mt_type(1).mt_level(1).build());

			if (cnt > 0) {
				return new ResVo().fail(200, "Can not use this DI");
			}

			return new ResVo().success(joinVo.getMt_di(), "Can use this DI");
		} catch (Exception e) {
			log.debug("joinDuplicateDi Error: " + e);
		}
		return new ResVo().fail();
	}

	// 이용약관 불러오기
	public ResponseEntity<?> joinTerm(HttpServletRequest request) {

		List<TermVo> terms = apiDao.getTerms();

		return new ResVo().success(terms);
	}

	// 회원 탈퇴
	public ResponseEntity<?> memberLeave(HttpServletRequest request) {

		try {
			// 토큰에서 IDX, ID 가져오기
			MemberVo memberVo = jwtTokenProvider.getMemberFromToken((String) request.getAttribute("Jwt-Access-Token"));

			int update_row = apiDao.memberLeave(memberVo);

			if (update_row > 0) {
				return new ResVo().success("");
			}
		} catch (Exception e) {
			log.error("memberLeave Error: " + e);
			return new ResVo().fail();
		}
		return new ResVo().fail();
	}

	// 패스워드 재설정
	public ResponseEntity<?> memberPassword(@Valid MemberVo memberVo, BindingResult bindingResult,
			HttpServletRequest request) {
		try {

			// 유효성 검증
			if (bindingResult.hasErrors()) {
				return new ResVo().fail(400, "Invalid Request Parameter");
			}

			// DB에서 회원정보 가져오기
			MemberVo memberVo2 = apiDao.getMemberByIdx(
					jwtTokenProvider.getMemberFromToken((String) request.getAttribute("Jwt-Access-Token")));

			// 기존 패스워드 확인
			if (passwordEncoder.matches(memberVo.getMt_pwd(), memberVo2.getMt_pwd())) {

				memberVo2.setMt_pwd_new(passwordEncoder.encode(memberVo.getMt_pwd_new()));

				int update_row = apiDao.memberPassword(memberVo2);
				if (update_row > 0) {
					return new ResVo().success("");
				}
			} else {
				return new ResVo().fail(200, "Password is not match");
			}
		} catch (Exception e) {
			log.error("memberPassword Error: " + e);
			return new ResVo().fail();
		}
		return new ResVo().fail();
	}

	// 앱 설정 파일
	public ResponseEntity<?> appConfig(HttpServletRequest request) {

		try {
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("app", apiDao.appConfig());
			return new ResVo().success(map, "");
		} catch (Exception e) {
			log.debug("appConfig Error: " + e);
			return new ResVo().fail();
		}

	}
	
	//RSS 데이터 업데이트
	public ResponseEntity<?> rssUpdate() {
		HashMap<String, Object> map = RSSNewsParser.getRssData();

		int insert_row = 0;

		try {
			//RSS 데이터 10개씩 Insert
			List<NewsVo> RSSList = (List<NewsVo>) map.get("RSSList");
			int listSize = RSSList.size();
			int batchSize = 10;
			for (int i = 0; i < listSize; i += batchSize) {
				List<NewsVo> batchList = (List<NewsVo>) RSSList.subList(i, Math.min(i + batchSize, listSize));
				insert_row += apiDao.setNews(batchList);
			}

			// 헤더정보
			RSSHeaderVo RSSHeader = (RSSHeaderVo) map.get("RSSHeader");

			log.debug("rssUpdate cnt: " + insert_row);

		} catch (Exception e) {
			log.debug("rssUpdate Error: " + e);
			return new ResVo().fail(200, "rssUpdate Error: ");
		}
		return new ResVo().success(insert_row + " rows updated");
	}
	
	//뉴스 데이터 가져오기
	public ResponseEntity<?> news(HttpServletRequest request) {
		
		//mapper에서 사용할 검색 파라미터 객체 선언
		Map<String, Object> map = new HashMap<String, Object>();
		
		Map<String, Object> returnMap = new HashMap<String, Object>();
		
        //페이징, 로우갯수, 검색값 입력
        map = pageLogic.getPagingQuery(request, map);
        
        returnMap.put("rows", apiDao.news(map));
        returnMap.put("page", pageLogic.getPagingCalc(map, apiDao.newsCount(map)));
		
		return new ResVo().success(returnMap);
	}

	// 아이디로 회원 아이디 카운팅
	private int countMemberById(MemberVo memberVo) {
		return apiDao.countMemberById(memberVo);
	}

	// DI식별자로 회원 아이디 카운팅
	private int countMemberByDi(MemberVo memberVo) {
		return apiDao.countMemberByDi(memberVo);
	}

	// 회원 존재 확인 + 비밀번호 확인
	private MemberVo getMemberById(MemberVo memberVo) {
		try {
			MemberVo memberVo2 = apiDao.getMemberById(memberVo);
			if (memberVo2 != null) {
				if (passwordEncoder.matches(memberVo.getMt_pwd(), memberVo2.getMt_pwd())) {
					return memberVo2;
				}
			}
			return null;
		} catch (Exception e) {
			log.error("getMemberById Error" + e);
			return null;
		}
	}

}
