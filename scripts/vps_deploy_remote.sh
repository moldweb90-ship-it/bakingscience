#!/bin/bash
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

apt-get update -y
apt-get install -y ca-certificates curl git nginx

# Ubuntu’s apt package "npm" pulls hundreds of node-* debs (node-colors, …) and looks frozen.
# NodeSource "nodejs" includes npm — never apt install npm here.
apt-get remove -y npm 2>/dev/null || true
apt-get autoremove -y 2>/dev/null || true

NEED_NODE=1
if command -v node >/dev/null 2>&1; then
  MAJOR=$(node -p "process.versions.node.split('.')[0]")
  if [ "${MAJOR}" -ge 20 ]; then NEED_NODE=0; fi
fi
if [ "${NEED_NODE}" -eq 1 ]; then
  apt-get remove -y nodejs libnode-dev nodejs-doc 2>/dev/null || true
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y --no-install-recommends nodejs
fi

APP_DIR=/var/www/bakingscience
mkdir -p /var/www
rm -rf "${APP_DIR}"
git clone --depth 1 https://github.com/moldweb90-ship-it/bakingscience.git "${APP_DIR}"
cd "${APP_DIR}"

printf '%s\n' "NEXT_PUBLIC_SITE_URL=http://${DEPLOY_HOST}" > .env.production.local

if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
npm run build

cat > /etc/systemd/system/bakingscience.service <<'UNIT'
[Unit]
Description=BakingScience Next.js
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/bakingscience
Environment=NODE_ENV=production
Environment=PORT=3000
EnvironmentFile=/var/www/bakingscience/.env.production.local
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable bakingscience
systemctl restart bakingscience

cat > /etc/nginx/sites-available/bakingscience <<'NGINX'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/bakingscience /etc/nginx/sites-enabled/bakingscience
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

systemctl --no-pager -l status bakingscience || true
curl -sS -o /dev/null -w "HTTP %{http_code}\n" http://127.0.0.1/ || true
