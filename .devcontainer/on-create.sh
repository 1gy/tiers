## Install fnm and Node.js
curl -fsSL https://fnm.vercel.app/install | bash
export PATH="~/.local/share/fnm:$PATH"
eval "`fnm env`"
fnm install --lts

# Install pnpm
npm install -g pnpm
