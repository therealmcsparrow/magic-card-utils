# Magic Card Utils

[![HACS][hacs-badge]][hacs-url]
[![GitHub Version][version-badge]][version-url]
[![GitHub License][license-badge]][license-url]
[![GitHub Last Commit][last-commit-badge]][last-commit-url]
[![GitHub Issues][issues-badge]][issues-url]

## Introduction

Welcome to Magic Card Utils! This integration for Home Assistant provides a shared template storage for the [Magic Card](https://github.com/your-repo/magic-card) frontend. It allows you to create, manage, and reuse templates for your Magic Cards directly within Home Assistant.

## Features

- **Shared Template Storage:** Store and manage your Magic Card templates in a centralized location.
- **Websocket API:** Provides a websocket API for creating, reading, updating, and deleting templates.
- **Easy Configuration:** Configure the integration through the Home Assistant UI.

## Installation

### HACS (Home Assistant Community Store)

1.  Go to HACS.
2.  Go to "Integrations".
3.  Click the 3 dots in the top right corner and select "Custom repositories".
4.  Add the URL to the repository and select the category "Integration".
5.  Click the "ADD" button.
6.  You will now find the "Magic Card Utils" integration in the list.
7.  Click on it and then click "INSTALL".
8.  Restart Home Assistant.

### Manual Installation

1.  Copy the `magic_card_utils` folder from the `custom_components` folder in this repository to the `custom_components` folder in your Home Assistant configuration directory.
2.  Restart Home Assistant.

## Configuration

1.  Go to "Settings" -> "Devices & Services".
2.  Click the "+ ADD INTEGRATION" button.
3.  Search for "Magic Card Utils" and click on it.
4.  Follow the on-screen instructions to complete the setup.

## Usage

Once the integration is installed and configured, you can use the websocket API to manage your templates. If you have enabled the side panel, you can access it from the Home Assistant sidebar to view all your saved templates.

The side panel displays a table with the following columns:
- **Name:** The name of the template.
- **Description:** A short description of the template.
- **Linked Cards:** The number of cards linked to the template.
- **Created:** The date the template was created.
- **Last Updated:** The date the template was last updated.

## Support

If you have any issues with this integration, please [open an issue on GitHub](https://github.com/McSparrow/magic-card-utils/issues).

## Contributing

Contributions are welcome! If you would like to contribute to this project, please read the [contributing guidelines](https://github.com/McSparrow/magic-card-utils/blob/main/CONTRIBUTING.md).

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](https://github.com/McSparrow/magic-card-utils/blob/main/LICENSE) file for details.


[hacs-badge]: https://img.shields.io/badge/HACS-Custom-41BDF5.svg
[hacs-url]: https://hacs.xyz/
[version-badge]: https://img.shields.io/github/package-json/v/therealmcsparrow/magic-card-utils
[version-url]: https://github.com/therealmcsparrow/magic-card-utils/releases
[license-badge]: https://img.shields.io/github/license/therealmcsparrow/magic-card-utils
[license-url]: https://github.com/therealmcsparrow/magic-card-utils/blob/main/LICENSE
[last-commit-badge]: https://img.shields.io/github/last-commit/therealmcsparrow/magic-card-utils
[last-commit-url]: https://github.com/therealmcsparrow/magic-card-utils/commits/main
[issues-badge]: https://img.shields.io/github/issues/therealmcsparrow/magic-card-utils
[issues-url]: https://github.com/therealmcsparrow/magic-card-utils/issues
