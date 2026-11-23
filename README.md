# Christmas theme for Claude Code

A few subtle Christmas touches for Claude Code in the Claude desktop app. It keeps the app's own colors and dark background and adds:

- a faint Christmas tree in the bottom-right corner, with a warm glow behind it
- a string of six small lights near the top, tied off with a holly sprig
- a little gingerbread cookie in the bottom-left
- a small Santa hat on the corner of your messages
- a countdown in the status line: "🎄 32 days to Christmas"

Nothing moves, so it costs nothing to draw. No snow.

Type `/christmas` to hide everything for a plain screen, and again to bring it back.

The decorations show in the desktop app (and the mobile app). The terminal shows the countdown only.

## Install

At the prompt of a Claude Code session in a terminal:

```
/plugin install christmas --marketplace Stan6Sabina/claude-christmas-theme
```

Answer `y` to add the marketplace, then press Enter to install it for your user.

Or from a shell:

```bash
claude plugin install christmas --marketplace Stan6Sabina/claude-christmas-theme
```

In the desktop app, where `/plugin` does not run: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `Stan6Sabina/claude-christmas-theme`, then **Add plugin**.

New sessions pick it up automatically. In a session that was already open, type `/reload-plugins`.
