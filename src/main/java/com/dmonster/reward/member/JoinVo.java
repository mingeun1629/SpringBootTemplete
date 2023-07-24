package com.dmonster.reward.member;


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
public class JoinVo {
	
	private int idx;
		
	private String mt_id;
	
	private String mt_nick;
	
	private String mt_di;
	
	private int[] tt_idx;
	
	private String mt_code;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String mt_pwd;

}
