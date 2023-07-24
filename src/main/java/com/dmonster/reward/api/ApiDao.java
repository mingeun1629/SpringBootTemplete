package com.dmonster.reward.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.dmonster.reward.member.MemberVo;
import com.dmonster.reward.rss.NewsVo;
import com.dmonster.reward.vo.TermVo;

@Repository
@Mapper
public interface ApiDao {

	int updateToken(MemberVo memberVo);

	MemberVo getMemberById(MemberVo memberVo);
	
	MemberVo getMemberByIdx(MemberVo memberVo);
	
	MemberVo getMemberByToken(MemberVo memberVo);

	int countMemberById(MemberVo memberVo);

	int countMemberByDi(MemberVo memberVo);

	int setMember(MemberVo memberVo);

	int setMemberCode(MemberVo memberVo);

	List<TermVo> getTerms();

	int memberLeave(MemberVo memberVo);

	int memberPassword(MemberVo memberVo);
	
	int setNews(List<NewsVo> batchList);

	AppVo appConfig();

	ArrayList<NewsVo> news(Map<String, Object> map);

	int newsCount(Map<String, Object> map);

}
