# Line Length Warning

Line Length Warning can help you with tracking your lines' lengths. It will mark your "out of bound" code by highlighting it. Extention has two types of highlighting: warning and alert. You can set your own colors and warn and alert values.

## Features

If a line has more characters then the `warn_line` value, but less then the `alert_line` value, it will be highlighted in the `warn_color`.\
If a line has more characters then the `alert_line` value, it will be highlighted by `alert_color`.

Video example:
<video src="media/example.mp4" controls></video>

## Extension Settings

This extension contributes the following settings:

* `line-length-warning.warn_color`: color for warnings (`#E3BD405C` by default).
* `line-length-warning.warn_line`: limit for line length before a warning (`80` by default).
* `line-length-warning.alert_color`: color for alerts (`#d64f3f5C` by default).
* `line-length-warning.alert_line`: limit for line length before an alert (`100` by default).

## Release Notes

### 1.0.0

Initial release of Line Length Warning



