# Letter Signs

## Developer setup guide

Install [Git](https://git-scm.com/install) and [Bun](https://bun.com/) on your computer.

Once you've cloned this repo locally, run `bun i` command inside the clone to install dependencies.

### Linking packs

A symbolic link, or symlink for short, is a shortcut file pointing to another file or folder.
Most applications treat symlinks like a file or folder is actually there.

You can **run a script to create symlinks** inside local Minecraft data folders.
The symlinks will point to actual pack folders in this repo, so **Minecraft can recognize the packs**.

You don't have to work inside the com.mojang folder or copy the packs every time you make a change!

Create `.env` file at project root to set necessary environment variables. Edit the values to suit your needs.

```env
# Standard paths on Windows. Replace <USERNAME> with actual username.
LINK_BP_DEST=C:\Users\<USERNAME>\AppData\Roaming\Minecraft Bedrock\Users\Shared\games\com.mojang\development_behavior_packs\letter-signs
LINK_RP_DEST=C:\Users\<USERNAME>\AppData\Roaming\Minecraft Bedrock\Users\Shared\games\com.mojang\development_resource_packs\letter-signs
```

Run the script:

```bash
bun run link-packs
```

It will create symlinks at locations you specified in `.env`.
Open Minecraft and check the packs.

To delete the links:

```bash
bun run link-packs --delete
```
