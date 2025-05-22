```xml
<?xml version="1.0" encoding="utf-8"?>
<?xml-stylesheet type="text/xsl" href="http://example.com/stylesheet.xsl"?>
<rss version="2.0" xml:lang="en-US" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Feed Title</title>
    <description>This is my personnal feed!</description>
    <link>http://example.com/</link>
    <pubDate>Fri, 19 Jul 2019 11:45:14 GMT</pubDate>
    <lastBuildDate>Mon, 30 Sep 2019 11:45:14 GMT</lastBuildDate>
    <category>Category Foo</category>
    <category domain="http://example.com/category">Category Bar</category>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <generator>https://example.com/generator</generator>
    <language>en-US</language>
    <copyright>Copyright © 2025 KazariEX</copyright>
    <ttl>60</ttl>
    <image>
      <url>http://example.com/image.png</url>
      <title>Feed Title</title>
      <link>http://example.com/</link>
    </image>
    <atom:link rel="self" href="http://example.com/rss" type="application/rss+xml"/>
    <atom:link rel="hub" href="wss://example.com/hub"/>
    <item>
      <title>Hello World</title>
      <guid isPermaLink="false">https://example.com/hello-world?id=this&amp;that=true</guid>
      <link>https://example.com/hello-world</link>
      <pubDate>Fri, 19 Jul 2019 11:45:14 GMT</pubDate>
      <category>Category Foo</category>
      <category domain="http://example.com/category">Category Bar</category>
      <description><![CDATA[This is an article about Hello World.]]></description>
      <content:encoded><![CDATA[Content of the item.]]></content:encoded>
      <author>mimori@example.com (Mimori)</author>
      <author>yamabuki@example.com (Yamabuki)</author>
      <enclosure url="https://example.com/hello-world.jpg" length="0" type="image/jpg"/>
      <extend:foo>
        <about>just an extend item foo</about>
        <dummy>foo</dummy>
      </extend:foo>
      <extend:bar>
        <about>just an extend item bar</about>
        <dummy>bar</dummy>
      </extend:bar>
    </item>
    <extend:baz>
      <about>just an extend item baz</about>
      <dummy>baz</dummy>
    </extend:baz>
  </channel>
</rss>
```
