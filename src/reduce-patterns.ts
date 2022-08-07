import * as vscode from 'vscode';

export function main() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const selection = editor.selection;
    if (selection.isEmpty) {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(editor.document.lineCount, 0);
        const wholeRange = new vscode.Range(start, end);
        return reduce(editor, wholeRange);
    }
    const range = extendRangeToFullLines(selection);
    if (range.isSingleLine) {
        return;
    }
    return reduce(editor, range);
}

function extendRangeToFullLines(range: vscode.Range) {
    const extendedRange = new vscode.Range(
        range.start.line, 0, range.end.line + 1, 0);
    return extendedRange;
}

function reduce(editor: vscode.TextEditor, range: vscode.Range) {
    const lines = loadLines(editor, range);
    const uniqLines = makeLinesFight(lines);
    if (!uniqLines) {
        return;
    }
    dumpLines(editor, range, uniqLines);
}

function makeLinesFight(lines: string[]) {
    return lines;
}

function loadLines(editor: vscode.TextEditor, range: vscode.Range) {
    const text = editor.document.getText(range);
    const splitters = /\n|\r\n|\r/;
    const lines = text.split(splitters);
    const nonemptyLines = lines.filter(word => word);
    return nonemptyLines;
}

const NEWLINE = '\n';
function dumpLines(editor: vscode.TextEditor, range: vscode.Range, lines: string[]) {
    const text = lines.join(NEWLINE) + NEWLINE;
    editor.edit(editBuilder => editBuilder.replace(range, text));
}
