# AvalynxModal

AvalynxModal is a simple modal system for web applications with fullscreen support. Based on Bootstrap >=5.3 without any framework dependencies.

## Features

- **Customizable Modals**: Supports various customization options like fullscreen mode, custom title, body content, buttons, and more.
- **Bootstrap Integration**: Designed for seamless integration with Bootstrap >= 5.3.
- **Easy to Use**: Simple API for creating and managing modals within your web applications.

## Example

Here's a simple example of how to use AvalynxModal in your project:

* [Overview](https://avalynx-modal.jbs-newmedia.de/examples/index.html)
* [Simple Modal](https://avalynx-modal.jbs-newmedia.de/examples/modal.html)
* [Modal Permanent](https://avalynx-modal.jbs-newmedia.de/examples/modal-permanent.html)

## Installation

To use AvalynxModal in your project, you can directly include it in your HTML file. Ensure you have Bootstrap 5.3 or higher included in your project for AvalynxModal to work correctly.

First, include Bootstrap:

```html
<!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/js/bootstrap.bundle.min.js"></script>
```

Then, include AvalynxModal:

```html
<link href="path/to/avalynx-modal.css" rel="stylesheet">
<script src="path/to/avalynx-modal.js"></script>
```

Replace `path/to/avalynx-modal.js` and `path/to/avalynx-modal.css` with the actual path to the files in your project.

## Installation via jsDelivr ([Link](https://cdn.jsdelivr.net/npm/avalynx-modal/))

AvalynxModal is also available via [jsDelivr](https://www.jsdelivr.com/). You can include it in your project like this:

```html
<link href="https://cdn.jsdelivr.net/npm/avalynx-modal@0.0.1/dist/css/avalynx-modal.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/avalynx-modal@0.0.1/dist/js/avalynx-modal.js"></script>
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxModal displays correctly.

## Installation via NPM ([Link](https://www.npmjs.com/package/avalynx-modal))

AvalynxModal is also available as a npm package. You can add it to your project with the following command:

```bash
npm install avalynx-modal
```

After installing, you can import AvalynxModal into your JavaScript file like this:

```javascript
import { AvalynxModal } from 'avalynx-modal';
import 'avalynx-modal/dist/css/avalynx-modal.min.css';
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxModal displays correctly.

## Installation via Symfony AssetMapper

```bash
php bin/console importmap:require avalynx-modal
```

After installing, you can import AvalynxModal into your JavaScript file like this:

```javascript
import { AvalynxModal } from 'avalynx-modal';
import 'avalynx-modal/dist/css/avalynx-modal.min.css';
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxModal displays correctly.

## Installation via Composer ([Link](https://packagist.org/packages/avalynx/avalynx-modal))

AvalynxModal is also available as a Composer package. You can add it to your project with the following command:

```bash
composer require avalynx/avalynx-modal
```

After installing, you can import AvalynxModal into your HTML file like this:

```html
<link href="vendor/avalynx/avalynx-modal/dist/css/avalynx-modal.css" rel="stylesheet">
<script src="vendor/avalynx/avalynx-modal/dist/js/avalynx-modal.js"></script>
``` 

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxModal displays correctly.

## Usage

To create a modal dialog, simply instantiate a new `AvalynxModal` object with the desired options:

```javascript
new AvalynxModal("#myModal", {
  modalFullscreen: true,
  title: 'My Modal',
  body: 'This is the body of my modal.',
  buttons: [
    {
      label: 'Close',
      class: 'btn btn-primary',
      onClick: function() {
        // Close modal
      }
    }
  ]
});
```

## Options

AvalynxModal allows the following options for customization:

- `id`: (string) The ID of the element to attach the modal to.
- `options`: An object containing the following keys:
    - `modalFullscreen`: (boolean) Enable fullscreen mode (default: `false`).
    - `title`: (string) The title of the modal (default: `''`).
    - `titleIsHtml`: (boolean) Treat the title as HTML (default: `false`).
    - `body`: (string) The body content of the modal (default: `''`).
    - `bodyIsHtml`: (boolean) Treat the body content as HTML (default: `false`).
    - `bodyAjaxUrl`: (string) URL to fetch the body content from (default: `''`).
    - `buttons`: (array) An array of button objects. Each object should have a `label`, `class`, and `onClick` function (default: `[]`).
    - `safeInstance`: (boolean) Keep the modal instance after it's closed (default: `false`).
    - `disableFullscreen`: (boolean) Disable the fullscreen button (default: `false`).
    - `disableClose`: (boolean) Disable the close button (default: `false`).
    - `removeFullscreenBtn`: (boolean) Remove the fullscreen button (default: `false`).
    - `removeCloseBtn`: (boolean) Remove the close button (default: `false`).
    - `loader`: (object) An instance of AvalynxLoader to use as the loader for the modal (default: `null`).
    - `onModalCreated`: (function) A callback function to execute when the modal is created (default: `null`).
    - `onFullscreenToggled`: (function) A callback function to execute when the fullscreen mode is toggled (default: `null`).
    - `onModalClosed`: (function) A callback function to execute when the modal is closed (default: `null`).

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request with your changes or improvements. We're looking for contributions in the following areas:

- Bug fixes
- Feature enhancements
- Documentation improvements

Before submitting your pull request, please ensure your changes are well-documented and follow the existing coding style of the project.

## License

AvalynxModal is open-sourced software licensed under the [MIT license](LICENSE).

## Contact

If you have any questions, feature requests, or issues, please open an issue on our [GitHub repository](https://github.com/avalynx/avalynx-modal/issues) or submit a pull request.

Thank you for considering AvalynxModal for your project!
