package com.dmonster.reward.rss;

import java.util.ArrayList;
import java.util.List;

import com.dmonster.reward.api.ResVo;

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
public class RSSHeaderVo {
    String title;
    String description;
    String link;
    String copyright;
    String lastBuildDate;
    String language; 
}
