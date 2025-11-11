import * as vscode from 'vscode'

export class Parser {
    public is_supported_lang = true;

    // get extention settings
    private contributions = vscode.workspace.getConfiguration('line-length-warning'); 
    
    // warn values
    private warn_color = this.contributions.warn_color;
    private warn_options: vscode.DecorationRenderOptions = {backgroundColor: this.warn_color};
    private warn_decoration = vscode.window.createTextEditorDecorationType(this.warn_options);
    private warn_ranges: Array<vscode.DecorationOptions> = [];
    private warn_line = this.contributions.warn_line;

    // alert values
    private alert_color = this.contributions.alert_color;
    private alert_options: vscode.DecorationRenderOptions = {backgroundColor: this.alert_color};
    private alert_decoration = vscode.window.createTextEditorDecorationType(this.alert_options);
    private alert_ranges: Array<vscode.DecorationOptions> = [];
    private alert_line = this.contributions.alert_line;

    /*
    Checks if current document language is suppeorted.
    
    Input:  language_code (string) - language code, provided by vs code.
    Output: void. parser.is_supported_lang updates. */
    public CheckIfSupportedLang(language_code: string): void {
        if (language_code === "cpp" || language_code === "c" ||
            language_code === "python" || language_code === "typescript") {
            this.is_supported_lang = true;
        } else {
            this.is_supported_lang = false;
        }
    }
    
    /*
    Finds all alert lines and update parser.alert_ranges.
    
    Input:  cur_editor (vscode.TextEdito) - current vs code editor.
    Output: void. parser.alert_ranges updates. */
    public FindAlertLines(cur_editor: vscode.TextEditor): void {
        let text = cur_editor.document.getText();
        let match: any;
        this.alert_ranges = [];
        let regexp = new RegExp(".{" + String(this.alert_line) + ",}", "ig"); // .{n:} regexp
        while (match = regexp.exec(text)) {
            let start_pos = cur_editor.document.positionAt(match.index + this.alert_line);
            let end_pos = cur_editor.document.positionAt(match.index + match[0].length);
            let range = { range: new vscode.Range(start_pos, end_pos) };
            this.alert_ranges.push(range);
        }
    }
    /*
    Finds all warn lines and update parser.warn_ranges.
    
    Input:  cur_editor (vscode.TextEdito) - current vs code editor.
    Output: void. parser.warn_ranges updates. */
    public FindWarnLines(cur_editor: vscode.TextEditor): void {
        let text = cur_editor.document.getText();
        let match: any;
        this.warn_ranges = [];
        let regexp = new RegExp(".{" + String(this.warn_line) + ",}", "ig"); // .{n:} regexp
        while (match = regexp.exec(text)) {
            let start_pos = cur_editor.document.positionAt(match.index + this.warn_line);
            let end_pos = cur_editor.document.positionAt(match.index + this.warn_line + Math.min(match[0].length - this.warn_line, this.alert_line - this.warn_line));
            let range = { range: new vscode.Range(start_pos, end_pos) };
            this.warn_ranges.push(range);
        }
    }
    
    /*
    Apply decorations according to warn/alert ranges and parser.alert/warn_decoration.
    
    Input:  cur_editor (vscode.TextEdito) - current vs code editor.
    Output: void. Decorations will be set. */
    public ApplyDecorations(cur_editor: vscode.TextEditor): void {
        cur_editor.setDecorations(this.warn_decoration, this.warn_ranges);
        cur_editor.setDecorations(this.alert_decoration, this.alert_ranges);
    }
}