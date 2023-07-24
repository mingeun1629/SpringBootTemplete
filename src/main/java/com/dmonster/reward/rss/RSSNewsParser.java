package com.dmonster.reward.rss;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.events.Characters;
import javax.xml.stream.events.XMLEvent;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RSSNewsParser {
	
	static final String RSSURL = "http://taptalk.net/news/rss/1GDtaJNph0";
	static final String LANGUAGE = "language";
	static final String CHANNEL = "channel";
	static final String ITEM = "item";
	static final String TITLE = "title";
	static final String DESCRIPTION = "description";
	static final String LASTBUILDDATE = "lastBuildDate";
	static final String COPYRIGHT = "copyright";
	static final String LINK = "link";
	static final String AUTHOR = "author";
	static final String GUID = "guid";
	static final String PUBDATE = "pubDate";
	static final String CATEGORY = "category";
	static final String ENCLOSURE = "enclosure";
	static final String CREATOR = "creator";
	final URL url;
	
	//RSS 데이터 수집
	public static HashMap<String, Object> getRssData() {

		RSSNewsParser parser = new RSSNewsParser(RSSURL);
		
		return parser.readRss();
	}

	//URL 초기화
	private RSSNewsParser(String rssUrl) {
		try {
			this.url = new URL(rssUrl);
		} catch (MalformedURLException e) {
			throw new RuntimeException(e);
		}
	}
	
	//
	private HashMap<String, Object> readRss() {
		
		HashMap<String, Object> map = new HashMap<>();
		List<NewsVo> RSSList = new ArrayList<NewsVo>();
		RSSHeaderVo RSSHeader = null;
		
		try {
			boolean isRssHeader = true;
			String language = "";
			String title = "";
			String description = "";
			String lastBuildDate = "";
			String copyright = "";
			String link = "";
			String author = "";
			long guid = 0;
			String pubDate = "";
			String category = "";
			String enclosure = "";
			String creator = "";

			// First create a new XMLInputFactory
			XMLInputFactory inputFactory = XMLInputFactory.newInstance();
			// Setup a new eventReader
			InputStream in = read();
			XMLEventReader eventReader = inputFactory.createXMLEventReader(in);
			
			// read the XML document
			while (eventReader.hasNext()) {
				XMLEvent event = eventReader.nextEvent();
				if (event.isStartElement()) {
					String localPart = event.asStartElement().getName().getLocalPart();
					switch (localPart) {
					case LANGUAGE:
						language = getCharacterData(event, eventReader);
						break;
					case TITLE:
						title = getCharacterData(event, eventReader);
						break;
					case DESCRIPTION:
						description = getCharacterData(event, eventReader);
						break;
					case LINK:
						link = getCharacterData(event, eventReader);
						break;
					case COPYRIGHT:
						copyright = getCharacterData(event, eventReader);
						break;
					case LASTBUILDDATE:
						lastBuildDate = getCharacterData(event, eventReader);
						break;
					case ITEM:
						if (isRssHeader) {
							isRssHeader = false;
							RSSHeader = RSSHeaderVo.builder().title(title).description(description).link(link).copyright(copyright)
									.lastBuildDate(lastBuildDate).language(language).build();
						}
						event = eventReader.nextEvent();
						break;
					case GUID:
						guid = Long.parseLong(getCharacterData(event, eventReader));
						break;
					case CATEGORY:
						category = getCharacterData(event, eventReader);
						break;
					case ENCLOSURE:
						enclosure = getCharacterData(event, eventReader);
						break;
					case AUTHOR:
						author = getCharacterData(event, eventReader);
						break;
					case CREATOR:
						creator = getCharacterData(event, eventReader);
						break;
					case PUBDATE:
						pubDate = getCharacterData(event, eventReader);
						break;
					}
				} else if (event.isEndElement()) {
					if (event.asEndElement().getName().getLocalPart() == (ITEM)) {
						NewsVo message = NewsVo.builder().guid(guid).title(title).category(category)
								.link(link).enclosure(enclosure).author(author).creator(creator).pubDate(pubDate)
								.build();
						RSSList.add(message);
						event = eventReader.nextEvent();
						continue;
					}
				}
			}
		} catch (XMLStreamException e) {
			throw new RuntimeException(e);
		}
		
		map.put("RSSHeader", RSSHeader);
		map.put("RSSList", RSSList);
		
		return map;
	}

	private String getCharacterData(XMLEvent event, XMLEventReader eventReader) throws XMLStreamException {
		String result = "";
		event = eventReader.nextEvent();
		if (event instanceof Characters) {
			result = event.asCharacters().getData();
		}
		return result;
	}

	private InputStream read() {
		try {
			return url.openStream();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}
