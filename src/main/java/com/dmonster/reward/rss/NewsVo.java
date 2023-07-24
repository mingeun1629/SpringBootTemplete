package com.dmonster.reward.rss;

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
public class NewsVo {
	long guid;
	String title;
	String category;
	String link;
	String enclosure;
	String author;
	String creator;
	String pubDate;
}
