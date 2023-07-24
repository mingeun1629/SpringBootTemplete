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
public class AppVo {
	private String app_url;
	private String app_name;
	private String app_version;
	private String app_version_android;
	private String app_version_ios;
	private String app_status;
	private String app_maintenance;
	private String app_maintenance_start;
	private String app_maintenance_end;
}
