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

export function makeLinesFight(lines: string[]) {
    const uniqLines = Array.from(new Set(lines));
    const patterns: Pattern[] = [];
    for (const line of uniqLines) {
        patterns.push(new Pattern(line));
    }
    const length = patterns.length;
    for (let i = 0; i < length; i++) {
        const a = patterns[i];
        if (!a || !a.isAlive) {
            continue;
        }
        for (let j = i + 1; j < length; j++) {
            const b = patterns[j];
            if (!b || !b.isAlive) {
                continue;
            }
            else if (a.regex.test(b.text)) {
                b.isAlive = false;
            }
            else if (b.regex.test(a.text)) {
                a.isAlive = false;
            }
        }
    }
    return patterns.filter(pat => pat.isAlive).map(pat => pat.text);
}

class Pattern {
    public text: string;
    public regex: RegExp;
    public isPredatory = true;
    public isAlive = true;
    constructor(
        iText: string
    ) {
        this.text = compressConsecutiveStars(iText);
        this.regex = new RegExp(translateGlobIntoRegex(this.text));
        if (this.text.indexOf('*') === -1 && this.text.indexOf('?') === -1) {
            this.isPredatory = false;
        }
    }
};

function compressConsecutiveStars(text: string) {
    const pattern = /\*+/g;
    return text.replaceAll(pattern, '*');
}

function translateGlobIntoRegex(text: string) {
    text = escapeRegexSpecialChar(text);
    text = text.replaceAll('*', '.*');
    text = text.replaceAll('?', '[^*]');
    return '^' + text + '$';
}

const REGEX_SPECIAL_CHARS = '()[]{}+|^$\\.&~#';
function escapeRegexSpecialChar(text: string) {
    let result = '';
    for (const char of text) {
        if (REGEX_SPECIAL_CHARS.includes(char)) {
            result += '\\' + char;
        } else {
            result += char;
        }
    }
    return result;
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
