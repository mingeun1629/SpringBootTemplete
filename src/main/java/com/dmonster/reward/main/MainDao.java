package com.dmonster.reward.main;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.dmonster.reward.member.MemberVo;

@Repository
@Mapper
//MainMapper.xml와 연결할 인터페이스 클레스
public interface MainDao {

	int setMember(MemberVo memberVo);

	MemberVo getMember(MemberVo memberVo);

}
