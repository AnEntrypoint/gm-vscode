const vscode = require('vscode');

class GlootieExtension {
  constructor(context) {
    this.context = context;
    this.isActive = false;
  }

  async activate() {
    this.isActive = true;
    console.log('Glootie extension activated');
    this.registerCommands();
    this.registerViews();
    this.setupConfiguration();
    this.showCodeSearchInfo();
  }

  registerCommands() {
    this.context.subscriptions.push(
      vscode.commands.registerCommand('gm.activate', () => {
        vscode.window.showInformationMessage('Glootie activated');
      }),
      vscode.commands.registerCommand('gm.deactivate', () => {
        vscode.window.showInformationMessage('Glootie deactivated');
      }),
      vscode.commands.registerCommand('gm.showState', () => {
        vscode.window.showInformationMessage('Glootie state machine');
      })
    );
  }

  registerViews() {}

  setupConfiguration() {
    const config = vscode.workspace.getConfiguration('gm');
    this.isActive = config.get('autoActivate', true);
  }

  showCodeSearchInfo() {
    const message = 'Glootie uses semantic code search - describe intent ("find auth logic") not regex. Use code-search to explore your codebase across files. Open README.md for details.';
    vscode.window.showInformationMessage(message, 'Learn More').then(selection => {
      if (selection === 'Learn More') {
        vscode.commands.executeCommand('workbench.action.openAbstractDialog');
      }
    });
  }

  deactivate() {
    this.isActive = false;
    console.log('Glootie extension deactivated');
  }
}

let gm;

function activate(context) {
  gm = new GlootieExtension(context);
  gm.activate();
}

function deactivate() {
  if (gm) {
    gm.deactivate();
  }
}

module.exports = { activate, deactivate };
