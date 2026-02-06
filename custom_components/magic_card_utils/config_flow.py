"""Config flow for Magic Card Utils."""
import voluptuous as vol

from homeassistant import config_entries
from homeassistant.helpers import config_validation as cv

from .const import DOMAIN


@config_entries.HANDLERS.register(DOMAIN)
class MagicCardUtilsConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Magic Card Utils."""

    VERSION = 1
    CONNECTION_CLASS = config_entries.CONN_CLASS_CLOUD_POLL

    def __init__(self):
        """Initialize the config flow."""
        self._errors = {}

    async def async_step_user(self, user_input=None):
        """Handle the initial step."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            return self.async_create_entry(
                title="Magic Card Utils",
                data=user_input
            )

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Optional("show_side_panel", default=True): cv.boolean,
                }
            ),
        )

    @staticmethod
    def async_get_options_flow(config_entry):
        """Get the options flow for this handler."""
        return MagicCardUtilsOptionsFlowHandler(config_entry)


class MagicCardUtilsOptionsFlowHandler(config_entries.OptionsFlow):
    """Handle the options flow for Magic Card Utils."""

    def __init__(self, config_entry):
        """Initialize the options flow."""
        super().__init__(config_entry)

    async def async_step_init(self, user_input=None):
        """Handle the initial step."""
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        # Get current value from options, falling back to data, then default to True 
        current_value = self.config_entry.options.get(
            "show_side_panel",
            self.config_entry.data.get("show_side_panel", True)
        )

        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Optional(
                        "show_side_panel",
                        default=current_value,
                    ): cv.boolean,
                }
            ),
        )
