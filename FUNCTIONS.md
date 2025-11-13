# Functions overview


## extention.ts

### UpdateDecorations
Finds all lines needed to highlight and apply decorations for them. \
**_Receive:_**\
cur_editor (vscode.TextEditor | undefined) - current vs code editor.\
parser (Parser) - current parser (from parser.ts).\
**_Return:_**\
void. if lines find they will be decorated.
```
UpdateDecorations(cur_editor, parser);
```

### vscode.window.onDidChangeActiveTextEditor
When current editor has changed, we update it. \
**_Receive:_**\
editor (vscode.TextEditor | undefined) - new current editor.\
**_Return:_**\
void.

### vscode.workspace.onDidChangeTextDocument
When curent document was updated, we update decorations. \
**_Receive:_**\
editor (vscode.TextEditor | undefined) - new current editor.\
**_Return:_**\
void.


## parser.ts

### CheckIfSupportedLang
Checks if current document language is suppeorted. \
**_Receive:_**\
language_code (string) - language code, provided by vs code.\
**_Return:_**\
void. parser.is_supported_lang updates.
```
parser.CheckIfSupportedLang(cur_editor.document.languageId);
```

### FindAlertLines
Finds all alert lines and update parser.alert_ranges. \
**_Receive:_**\
cur_editor (vscode.TextEdito) - current vs code editor.\
**_Return:_**\
void. parser.alert_ranges updates.
```
parser.FindAlertLines(cur_editor);
```
### FindWarnLines
Finds all warn lines and update parser.warn_ranges. \
**_Receive:_**\
cur_editor (vscode.TextEdito) - current vs code editor.\
**_Return:_**\
void. parser.warn_ranges updates.
```
parser.FindWarnLines(cur_editor);
```

### ApplyDecorations
Apply decorations according to warn/alert ranges and parser.alert/warn_decoration.\
**_Receive:_**\
cur_editor (vscode.TextEdito) - current vs code editor.\
**_Return:_**\
void. Decorations will be set.
```
parser.ApplyDecorations(cur_editor);
```