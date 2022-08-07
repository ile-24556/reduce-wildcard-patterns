import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('reduce-wildcard-patterns.reduce', () => {
    });

    context.subscriptions.push(disposable);
}
