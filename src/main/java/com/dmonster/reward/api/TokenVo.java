package com.dmonster.reward.api;

import com.dmonster.reward.main.MainVo;
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
public class TokenVo {
	private String accessToken;
	private String refreshToken;
}
