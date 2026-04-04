"""One-off local runner: uploads remote shell script and executes over SSH."""
import os
import sys
from pathlib import Path

import paramiko

HOST = "46.173.20.153"
USER = "root"
PASSWORD = os.environ.get("VPS_ROOT_PASSWORD", "")
REMOTE_PATH = "/root/vps_deploy_remote.sh"
SCRIPT_LOCAL = Path(__file__).resolve().parent / "vps_deploy_remote.sh"


def main() -> int:
    if not PASSWORD:
        print("Set VPS_ROOT_PASSWORD", file=sys.stderr)
        return 1
    body = SCRIPT_LOCAL.read_text(encoding="utf-8")
    remote = f'export DEPLOY_HOST="{HOST}"\n{body}'

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(HOST, username=USER, password=PASSWORD, timeout=60)

    sftp = client.open_sftp()
    with sftp.file(REMOTE_PATH, "w") as f:
        f.write(remote)
    sftp.chmod(REMOTE_PATH, 0o755)
    sftp.close()

    stdin, stdout, stderr = client.exec_command(
        f"bash -x {REMOTE_PATH}",
        get_pty=True,
    )
    stdin.close()
    for line in iter(stdout.readline, ""):
        sys.stdout.write(line)
    err = stderr.read().decode(errors="replace")
    if err.strip():
        sys.stderr.write(err)
    code = stdout.channel.recv_exit_status()
    client.close()
    return code


if __name__ == "__main__":
    raise SystemExit(main())
