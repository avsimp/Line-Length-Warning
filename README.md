Author: Ladaev Timofey M3101 501902

# Line Length Warning

Line Length Warning can help you with tracking your **lines' lengths**. It will mark your "out of bound" code by highlighting it. Extention has two types of highlighting: **warning** and **alert**. You can set your own colors and warn and alert values.

## Features

If a line has more characters then the `warn_line` value, but less then the `alert_line` value, it will be highlighted in the `warn_color`.\
If a line has more characters then the `alert_line` value, it will be highlighted by `alert_color`.

Example:
![example](https://raw.githubusercontent.com/avsimp/Line-Length-Warning/main/media/example.gif)

Extention works with typescript, c++, c and python files.

## Extension Settings

This extension contributes the following settings:

* `line-length-warning.warn_color`: color for warnings (`#E3BD405C` by default).
* `line-length-warning.warn_line`: limit for line length before a warning (`80` by default).
* `line-length-warning.alert_color`: color for alerts (`#d64f3f5C` by default).
* `line-length-warning.alert_line`: limit for line length before an alert (`100` by default).

## Release Notes

### 1.0.0

Initial release of Line Length Warning

## Commit History

- `56e97b4` - Delete line-length-warning-1.0.0 directory.
- `2fd2a23` - v1.0.0 readme gif test.
- `fc30a7c` - v1.0.0 author added.
- `1ac03b8` - v1.0.0 release version.
- `443d934` - v0.1.1 codestyle fixes, minor package fixes.
- `4d23025` - v0.1 stable build without documentation.



