import * as vscode from 'vscode'

export class Parser {
    public is_supported_lang = true;

    private contributions = vscode.workspace.getConfiguration('line-length-warning');
    
    private warn_color = this.contributions.warn_color;
    private warn_options: vscode.DecorationRenderOptions = {backgroundColor: this.warn_color};
    private warn_decoration = vscode.window.createTextEditorDecorationType(this.warn_options);
    private warn_ranges: Array<vscode.DecorationOptions> = [];
    private warn_line = this.contributions.warn_line;

    private alert_color = this.contributions.alert_color;
    private alert_options: vscode.DecorationRenderOptions = {backgroundColor: this.alert_color};
    private alert_decoration = vscode.window.createTextEditorDecorationType(this.alert_options);
    private alert_ranges: Array<vscode.DecorationOptions> = [];
    private alert_line = this.contributions.alert_line;

    public CheckIfSupportedLang(language_code: string): void {
        if (language_code === "cpp" || language_code === "c" || language_code === "python") {
            this.is_supported_lang = true;
        } else {
            this.is_supported_lang = false;
        }
    }
    
    public FindAlertLines(activeEditor: vscode.TextEditor): void {
        let text = activeEditor.document.getText();
        let match: any;
        this.alert_ranges = [];
        let regexp = new RegExp(".{" + String(this.alert_line) + ",}", "ig");
        while (match = regexp.exec(text)) {
            let start_pos = activeEditor.document.positionAt(match.index + this.alert_line);
            let end_pos = activeEditor.document.positionAt(match.index + match[0].length);
            let range = { range: new vscode.Range(start_pos, end_pos) };
            this.alert_ranges.push(range);
        }
    }
    public FindWarnLines(active_editor: vscode.TextEditor): void {
        let text = active_editor.document.getText();
        let match: any;
        this.warn_ranges = [];
        let regexp = new RegExp(".{" + String(this.warn_line) + ",}", "ig");
        while (match = regexp.exec(text)) {
            let start_pos = active_editor.document.positionAt(match.index + this.warn_line);
            let end_pos = active_editor.document.positionAt(match.index + this.warn_line + Math.min(match[0].length - this.warn_line, this.alert_line - this.warn_line));
            let range = { range: new vscode.Range(start_pos, end_pos) };
            this.warn_ranges.push(range);
        }
    }
    
    public ApplyDecorations(activeEditor: vscode.TextEditor): void {
        activeEditor.setDecorations(this.warn_decoration, this.warn_ranges);
        activeEditor.setDecorations(this.alert_decoration, this.alert_ranges);
    }
}