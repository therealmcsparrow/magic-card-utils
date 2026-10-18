# Where the data is stored

The integration keeps its data in Home Assistant's own storage folder, `config/.storage/`:

| File | Holds |
| --- | --- |
| `magic_card_templates` | All templates, keyed by name |
| `magic_card_utils.animations` | The animation library, keyed by animation id |
| `magic_card_utils.icons` | The icon library, keyed by icon id |
| `magic_card_utils.shapes` | The shape library, keyed by shape id |
| `magic_card_utils.theme_presets` | The theme presets, keyed by id |

All of these are JSON files managed by Home Assistant. Don't edit them while Home Assistant is running; it would overwrite your changes.

## Backups

Home Assistant backups include `config/.storage/`, so a backup has your templates, animations, icons, shapes and theme presets. Restoring the backup brings them back.

## Removing the integration

Deleting the integration under **Settings → Devices & Services** leaves these files in place. Adding the integration again picks up the same templates, animations, icons, shapes and theme presets.

To delete the data as well, stop Home Assistant, delete the files and start Home Assistant again.

The linked-card count isn't stored; it's worked out from your dashboards each time. See [How linked cards are counted](templates.md#how-linked-cards-are-counted).
