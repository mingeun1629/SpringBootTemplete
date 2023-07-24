package com.dmonster.reward.member;


import com.dmonster.reward.api.ResVo;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberVo {
	
	private int idx;
		
	private String mt_id;
	
	private int mt_level;
	
	private String mt_nick;
	
	private String mt_name;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String mt_di;
	
	private String mt_wdate;
	
	private String mt_edate;
	
	private String mt_rdate;
	
	private String mt_code;
	
	private int mt_type;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String mt_jwt;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String mt_app_token;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String mt_pwd;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String mt_pwd_new;

}
