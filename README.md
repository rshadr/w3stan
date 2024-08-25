# w3stan - HTML picture slideshow

## What?
A simple implementation of a picture slideshow for web pages. It is meant
to be used as a frame, like so:

```html
...
<div class="my-container-whatever">
  <iframe src="/link/to/w3stan.html" data-w3stan-listing="/path/to/listing.json"></iframe>
</div>
...
```
The `data-w3stan-listing` attribute points to a origin-local JSON file of the following format:

```json
[
  "/first/local/file_path.png",
  "/second/file.jpg",
  "/another_file.gif"
]
```

It is self-contained in a single HTML file, the recommended way of using w3stan is
to copy it to your web server and link the iframe from there.

## Testing
This repository, once cloned, can be used as the root of a web server, e.g.:
```
$ quark -p 80 -d w3stan-repo
```

## Bugs
Please use the GitHub "Issues" feature to signal bugs or corrections to be made.
