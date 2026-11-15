"""Config flow for Magic Card Utils."""
import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers import config_validation as cv

from .const import DOMAIN
from .settings import CONF_GOOGLE_FONTS, CONF_LOOK_GALLERY


@config_entries.HANDLERS.register(DOMAIN)
class MagicCardUtilsConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Magic Card Utils."""

    VERSION = 1

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        """Return the options flow."""
        return MagicCardUtilsOptionsFlow()

    async def async_step_user(self, user_input=None):
        """Handle the initial step."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            return self.async_create_entry(title="Magic Card Utils", data=user_input)

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Optional("show_side_panel", default=True): cv.boolean,
                }
            ),
        )


class MagicCardUtilsOptionsFlow(config_entries.OptionsFlow):
    """Options for Magic Card Utils. Turning the look gallery on takes an information step and a confirm step."""

    def __init__(self) -> None:
        self._pending: dict[str, bool] | None = None

    async def async_step_init(self, user_input=None):
        """Manage the options."""
        # The entry by id, not self.config_entry: Home Assistant before 2024.11 has no such property.
        entry = self.hass.config_entries.async_get_entry(self.handler)
        options = entry.options if entry else {}
        fonts_now = options.get(CONF_GOOGLE_FONTS, False) is True
        gallery_now = options.get(CONF_LOOK_GALLERY, False) is True
        if user_input is not None:
            fonts = user_input.get(CONF_GOOGLE_FONTS, False) is True
            gallery = user_input.get(CONF_LOOK_GALLERY, False) is True
            data = {CONF_GOOGLE_FONTS: fonts, CONF_LOOK_GALLERY: gallery}
            if gallery and not gallery_now:
                self._pending = data
                return await self.async_step_gallery_info()
            return self.async_create_entry(data=data)

        # The advisory is informational: the same form, with a description that suggests Load Google Fonts.
        return self.async_show_form(
            step_id="init_advice" if gallery_now and not fonts_now else "init",
            data_schema=vol.Schema(
                {
                    vol.Optional(CONF_GOOGLE_FONTS, default=fonts_now): cv.boolean,
                    vol.Optional(CONF_LOOK_GALLERY, default=gallery_now): cv.boolean,
                }
            ),
        )

    async def async_step_init_advice(self, user_input=None):
        """The options form while the gallery is on and Load Google Fonts is off."""
        return await self.async_step_init(user_input)

    async def async_step_gallery_info(self, user_input=None):
        """Names the hosts the browser contacts. Stores nothing."""
        if user_input is not None:
            return await self.async_step_gallery_confirm()
        return self.async_show_form(step_id="gallery_info", data_schema=vol.Schema({}))

    async def async_step_gallery_confirm(self, user_input=None):
        """The step that stores the switches as chosen. It never changes Load Google Fonts."""
        if user_input is not None and self._pending is not None:
            return self.async_create_entry(data=self._pending)
        fonts_off = self._pending is not None and not self._pending[CONF_GOOGLE_FONTS]
        return self.async_show_form(
            step_id="gallery_confirm_advice" if fonts_off else "gallery_confirm",
            data_schema=vol.Schema({}),
        )

    async def async_step_gallery_confirm_advice(self, user_input=None):
        """The confirm step while Load Google Fonts is off."""
        return await self.async_step_gallery_confirm(user_input)
