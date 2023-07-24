package com.dmonster.reward.mng;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.dmonster.reward.member.MemberVo;

@Repository
@Mapper
//MngMapper.xml와 연결할 인터페이스 클레스
public interface MngDao {
	
	int setMember(MemberVo memberVo);

	MemberVo getMember(MemberVo memberVo);

	List<MemberVo> getMemberList(Map<String, Object> map);

	int getMemberListCount(Map<String, Object> map);
	
}
