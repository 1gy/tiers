## Install fnm and Node.js
curl -fsSL https://fnm.vercel.app/install | bash
export PATH="~/.local/share/fnm:$PATH"
eval "`fnm env`"
fnm install --lts

# Enable corepack
corepack enable pnpm
