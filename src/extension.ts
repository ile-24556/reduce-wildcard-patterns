import * as vscode from 'vscode';
import { main } from './reduce-patterns';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('reduce-wildcard-patterns.reduce', main);
    context.subscriptions.push(disposable);
}
