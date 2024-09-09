# w3stan - HTML picture slideshow

![example](https://private-user-images.githubusercontent.com/88385774/361254752-9d43e550-49d0-4a49-b5a5-e1f63a8ea008.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjQ2MTQ4NTIsIm5iZiI6MTcyNDYxNDU1MiwicGF0aCI6Ii84ODM4NTc3NC8zNjEyNTQ3NTItOWQ0M2U1NTAtNDlkMC00YTQ5LWI1YTUtZTFmNjNhOGVhMDA4LmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MjUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODI1VDE5MzU1MlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTE2NmVlYjhhOWJlMjI1YTQ4YTQxNmMwMmNhZDdlZGIxMzhkNDgwMDRiODViNWFiMmFjNTQ2OTJhYmU0N2FlODUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.wDGh-QoLA4QpYx1SvzQSgBb0p3DJJ_91BeZKsIKk7ew)

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
