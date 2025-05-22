```xml
<?xml version="1.0" encoding="utf-8"?>
<?xml-stylesheet type="text/xsl" href="http://example.com/stylesheet.xsl"?>
<feed xml:lang="en-US" xmlns="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <title>Feed Title</title>
  <subtitle>This is my personnal feed!</subtitle>
  <id>http://example.com/</id>
  <updated>2019-09-30T11:45:14.000Z</updated>
  <generator uri="https://example.com/generator" version="2.3.3">Generator</generator>
  <logo>http://example.com/image.png</logo>
  <icon>http://example.com/image.ico</icon>
  <rights>Copyright © 2025 KazariEX</rights>
  <link rel="alternate" href="http://example.com/"/>
  <link rel="self" href="http://example.com/atom" type="application/atom+xml"/>
  <link rel="hub" href="wss://example.com/hub"/>
  <author>
    <name>KazariEX</name>
    <email>kazariex@example.com</email>
    <uri>https://example.com/kazariex</uri>
  </author>
  <contributor>
    <name>Mimori</name>
    <email>mimori@example.com</email>
    <uri>https://example.com/mimori</uri>
  </contributor>
  <category term="foo" label="Category Foo"/>
  <category term="bar" label="Category Bar" scheme="http://example.com/category"/>
  <entry>
    <title type="html"><![CDATA[Hello World]]></title>
    <id>https://example.com/hello-world?id=this&amp;that=true</id>
    <link rel="alternate" href="https://example.com/hello-world"/>
    <link rel="enclosure" href="https://example.com/hello-world.jpg" type="image/jpeg" length="65535"/>
    <link rel="enclosure" href="https://example.com/hello-world.jpg" type="image/jpg"/>
    <updated>2019-09-30T11:45:14.000Z</updated>
    <published>2019-07-19T11:45:14.000Z</published>
    <category term="foo" label="Category Foo"/>
    <category term="bar" label="Category Bar" scheme="http://example.com/category"/>
    <summary type="html"><![CDATA[This is an article about Hello World.]]></summary>
    <content type="html"><![CDATA[Content of the item.]]></content>
    <author>
      <name>Mimori</name>
      <email>mimori@example.com</email>
      <uri>https://example.com/mimori</uri>
    </author>
    <author>
      <name>Yamabuki</name>
      <email>yamabuki@example.com</email>
      <uri>https://example.com/yamabuki</uri>
    </author>
    <author>
      <name>Yamabuki, Name Only</name>
    </author>
    <contributor>
      <name>Kumoyo</name>
      <email>kumoyo@example.com</email>
      <uri>https://example.com/kumoyo</uri>
    </contributor>
    <contributor>
      <name>Moriya</name>
      <email>moriya@example.com</email>
      <uri>https://example.com/moriya</uri>
    </contributor>
    <extend:foo>
      <about>just an extend item foo</about>
      <dummy>foo</dummy>
    </extend:foo>
    <extend:bar>
      <about>just an extend item bar</about>
      <dummy>bar</dummy>
    </extend:bar>
  </entry>
  <extend:baz>
    <about>just an extend item baz</about>
    <dummy>baz</dummy>
  </extend:baz>
</feed>
```
