```json
{
  "version": "https://jsonfeed.org/version/1.1",
  "title": "Feed Title",
  "home_page_url": "http://example.com/",
  "feed_url": "http://example.com/json",
  "description": "This is my personnal feed!",
  "icon": "http://example.com/image.png",
  "favicon": "http://example.com/image.ico",
  "authors": [
    {
      "name": "KazariEX",
      "url": "https://example.com/kazariex"
    }
  ],
  "language": "en-US",
  "items": [
    {
      "id": "https://example.com/hello-world?id=this&that=true",
      "url": "https://example.com/hello-world",
      "title": "Hello World",
      "content_html": "Content of the item.",
      "summary": "This is an article about Hello World.",
      "image": "https://example.com/hello-world.jpg",
      "date_published": "2019-07-19T11:45:14.000Z",
      "date_modified": "2019-09-30T11:45:14.000Z",
      "authors": [
        {
          "name": "Mimori",
          "url": "https://example.com/mimori"
        },
        {
          "name": "Yamabuki",
          "url": "https://example.com/yamabuki"
        },
        {
          "name": "Yamabuki, Name Only"
        }
      ],
      "tags": [
        "Category Foo",
        "Category Bar"
      ],
      "attachments": [
        {
          "url": "https://example.com/hello-world.jpg",
          "mime_type": "image/jpeg",
          "size_in_bytes": 65535
        },
        {
          "url": "https://example.com/hello-world.jpg",
          "mime_type": "image/jpg"
        }
      ],
      "extend:foo": {
        "about": "just an extend item foo",
        "dummy": "foo"
      },
      "extend:bar": {
        "about": "just an extend item bar",
        "dummy": "bar"
      }
    }
  ],
  "extend:baz": {
    "about": "just an extend item baz",
    "dummy": "baz"
  }
}
```
