# Where the data is stored

The integration keeps its data in Home Assistant's own storage folder, `config/.storage/`:

| File | Holds |
| --- | --- |
| `magic_card_templates` | All templates, keyed by name |
| `magic_card_utils.animations` | The animation library, keyed by animation id |

Both are JSON files managed by Home Assistant. Don't edit them while Home Assistant is running; it would overwrite your changes.

## Backups

Home Assistant backups include `config/.storage/`, so a backup has your templates and animations. Restoring the backup brings them back.

## Removing the integration

Deleting the integration under **Settings → Devices & Services** leaves both files in place. Adding the integration again picks up the same templates and animations.

To delete the data as well, stop Home Assistant, delete the two files and start Home Assistant again.

The linked-card count isn't stored; it's worked out from your dashboards each time. See [How linked cards are counted](templates.md#how-linked-cards-are-counted).
