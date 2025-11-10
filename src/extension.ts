import * as vscode from 'vscode';
import { Parser } from './parser';

function UpdateDecorations(activeEditor:vscode.TextEditor | undefined, parser: Parser) {
	if (!activeEditor) return;
	if (!parser.is_supported_lang) return;

	parser.FindWarnLines(activeEditor);
	parser.FindAlertLines(activeEditor);
	parser.ApplyDecorations(activeEditor);
};
export function activate(context: vscode.ExtensionContext) {
	let active_editor: vscode.TextEditor | undefined;
	let parser: Parser = new Parser();

	if (vscode.window.activeTextEditor) {
		active_editor = vscode.window.activeTextEditor;

		parser.CheckIfSupportedLang(active_editor.document.languageId);
		UpdateDecorations(active_editor, parser);
	}

	vscode.window.onDidChangeActiveTextEditor( (editor) => {
		active_editor = editor;
		if (editor) {
			parser.CheckIfSupportedLang(editor.document.languageId);
			UpdateDecorations(active_editor, parser);
		}
	});

	vscode.workspace.onDidChangeTextDocument( (event) => {
		if (active_editor && event.document === active_editor.document) {
			UpdateDecorations(active_editor, parser);
		}
	});
}

// This method is called when your extension is deactivated
export function deactivate() {}
