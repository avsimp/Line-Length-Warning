import * as vscode from 'vscode';
import { Parser } from './parser';

/*
Finds all lines needed to highlight and apply decorations for them.

Receive:	cur_editor (vscode.TextEditor | undefined) - current vs code editor.
			parser (Parser) - current parser (from parser.ts).
Return:		void. if lines find they will be decorated. */
function UpdateDecorations(cur_editor:vscode.TextEditor | undefined, parser: Parser) {
	if (!cur_editor) return;
	if (!parser.is_supported_lang) return;

	parser.FindWarnLines(cur_editor);
	parser.FindAlertLines(cur_editor);
	parser.ApplyDecorations(cur_editor);
};

// This method is called when extension is activated
export function activate(context: vscode.ExtensionContext) {
	let cur_editor: vscode.TextEditor | undefined;
	let parser: Parser = new Parser();

	if (vscode.window.activeTextEditor) { // during the launch we set current editor
		cur_editor = vscode.window.activeTextEditor;

		parser.CheckIfSupportedLang(cur_editor.document.languageId);
		UpdateDecorations(cur_editor, parser);
	}

	/*
	When current editor has changed, we update it.

	Receive: 	editor (vscode.TextEditor | undefined) - new current editor.
	Return:		void. */
	vscode.window.onDidChangeActiveTextEditor( (editor) => {
		cur_editor = editor;
		if (editor) {
			parser.CheckIfSupportedLang(editor.document.languageId);
			UpdateDecorations(cur_editor, parser);
		}
	});
	/*
	When curent document was updated, we update decorations.

	Receive:	editor (vscode.TextEditor | undefined) - new current editor.
	Return:		void. */
	vscode.workspace.onDidChangeTextDocument( (event) => {
		if (cur_editor && event.document === cur_editor.document) {
			UpdateDecorations(cur_editor, parser);
		}
	});
}

// This method is called when extension is deactivated
export function deactivate() {}
