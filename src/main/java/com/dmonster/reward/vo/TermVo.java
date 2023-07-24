package com.dmonster.reward.vo;


import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TermVo {
	
	private int idx;
		
	private int tt_level;
	
	private int tt_type;
	
	private String tt_title;
	
	private String tt_content;
	
	private String tt_wdate;
	
	private String tt_edate;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String tt_rdate;
	
}
