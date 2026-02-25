# AvalynxModal

[![npm version](https://img.shields.io/npm/v/avalynx-modal)](https://www.npmjs.com/package/avalynx-modal)
[![npm downloads](https://img.shields.io/npm/dt/avalynx-modal)](https://www.npmjs.com/package/avalynx-modal)
[![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/avalynx-modal)](https://www.jsdelivr.com/package/npm/avalynx-modal)
[![License](https://img.shields.io/npm/l/avalynx-modal)](LICENSE)
[![Tests](https://github.com/avalynx/avalynx-modal/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/avalynx/avalynx-modal/actions/workflows/tests.yml)
[![codecov](https://codecov.io/gh/avalynx/avalynx-modal/branch/main/graph/badge.svg)](https://codecov.io/gh/avalynx/avalynx-modal)
[![GitHub stars](https://img.shields.io/github/stars/avalynx/avalynx-modal?style=flat&logo=github)](https://github.com/avalynx/avalynx-modal)

AvalynxModal ist ein einfaches Modal-System für Webanwendungen mit Vollbildunterstützung. Basierend auf Bootstrap >=5.3 ohne jegliche Framework-Abhängigkeiten.

## Funktionen

- **Anpassbare Modals**: Unterstützt verschiedene Anpassungsoptionen wie Vollbildmodus, benutzerdefinierte Titel, Hauptinhalt, Schaltflächen und mehr.
- **Bootstrap-Integration**: Entwickelt für die nahtlose Integration mit Bootstrap >= 5.3.
- **Einfach zu bedienen**: Einfache API zum Erstellen und Verwalten von Modals in Ihren Webanwendungen.

## Beispiel

Hier ist ein einfaches Beispiel für die Verwendung von AvalynxModal in Ihrem Projekt:

* [Übersicht](https://avalynx-modal.jbs-newmedia.de/examples/index.html)
* [Einfaches Modal](https://avalynx-modal.jbs-newmedia.de/examples/modal.html)
* [Permanentes Modal](https://avalynx-modal.jbs-newmedia.de/examples/modal-permanent.html)

## Installation

Um AvalynxModal in Ihrem Projekt zu verwenden, können Sie es direkt in Ihre HTML-Datei einbinden. Stellen Sie sicher, dass Sie Bootstrap 5.3 oder höher in Ihrem Projekt eingebunden haben, damit AvalynxModal korrekt funktioniert.

Binden Sie zuerst Bootstrap ein:

```html
<!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/js/bootstrap.bundle.min.js"></script>
```

Binden Sie dann AvalynxModal ein:

```html
<link href="path/to/avalynx-modal.css" rel="stylesheet">
<script src="path/to/avalynx-modal.js"></script>
```

Ersetzen Sie `path/to/avalynx-modal.js` und `path/to/avalynx-modal.css` durch den tatsächlichen Pfad zu den Dateien in Ihrem Projekt.

## Installation über jsDelivr ([Link](https://cdn.jsdelivr.net/npm/avalynx-modal/))

AvalynxModal ist auch über [jsDelivr](https://www.jsdelivr.com/) verfügbar. Sie können es wie folgt in Ihr Projekt einbinden:

```html
<link href="https://cdn.jsdelivr.net/npm/avalynx-modal@1.0.3/dist/css/avalynx-modal.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/avalynx-modal@1.0.3/dist/js/avalynx-modal.js"></script>
```

Stellen Sie sicher, dass Sie auch das JS/CSS von Bootstrap in Ihr Projekt einbinden, um sicherzustellen, dass AvalynxModal korrekt angezeigt wird.

## Installation über NPM ([Link](https://www.npmjs.com/package/avalynx-modal))

AvalynxModal ist auch als npm-Paket verfügbar. Sie können es mit dem folgenden Befehl zu Ihrem Projekt hinzufügen:

```bash
npm install avalynx-modal
```

Nach der Installation können Sie AvalynxModal wie folgt in Ihre JavaScript-Datei importieren:

```javascript
import { AvalynxModal } from 'avalynx-modal';
import 'avalynx-modal/dist/css/avalynx-modal.min.css';
```

Stellen Sie sicher, dass Sie auch das JS/CSS von Bootstrap in Ihr Projekt einbinden, um sicherzustellen, dass AvalynxModal korrekt angezeigt wird.

## Installation über Symfony AssetMapper

```bash
php bin/console importmap:require avalynx-modal
```

Nach der Installation können Sie AvalynxModal wie folgt in Ihre JavaScript-Datei importieren:

```javascript
import { AvalynxModal } from 'avalynx-modal';
import 'avalynx-modal/dist/css/avalynx-modal.min.css';
```

Stellen Sie sicher, dass Sie auch das JS/CSS von Bootstrap in Ihr Projekt einbinden, um sicherzustellen, dass AvalynxModal korrekt angezeigt wird.

## Installation über Symfony AssetComposer

Weitere Informationen zum Symfony AssetComposer Bundle finden Sie [hier](https://github.com/jbsnewmedia/asset-composer-bundle).

```twig
{% do addAssetComposer('avalynx/avalynx-modal/dist/css/avalynx-modal.css') %}
{% do addAssetComposer('avalynx/avalynx-modal/dist/js/avalynx-modal.js') %}
```

Stellen Sie sicher, dass Sie auch das JS/CSS von Bootstrap in Ihr Projekt einbinden, um sicherzustellen, dass AvalynxModal korrekt angezeigt wird.

## Installation über Composer ([Link](https://packagist.org/packages/avalynx/avalynx-modal))

AvalynxModal ist auch als Composer-Paket verfügbar. Sie können es mit dem folgenden Befehl zu Ihrem Projekt hinzufügen:

```bash
composer require avalynx/avalynx-modal
```

Nach der Installation können Sie AvalynxModal wie folgt in Ihre HTML-Datei einbinden:

```html
<link href="vendor/avalynx/avalynx-modal/dist/css/avalynx-modal.css" rel="stylesheet">
<script src="vendor/avalynx/avalynx-modal/dist/js/avalynx-modal.js"></script>
``` 

Stellen Sie sicher, dass Sie auch das JS/CSS von Bootstrap in Ihr Projekt einbinden, um sicherzustellen, dass AvalynxModal korrekt angezeigt wird.

## Verwendung

Um einen Modal-Dialog zu erstellen, instanziieren Sie einfach ein neues `AvalynxModal`-Objekt mit den gewünschten Optionen:

```javascript
new AvalynxModal("#myModal", {
  modalFullscreen: true,
  title: 'Mein Modal',
  body: 'Dies ist der Inhalt meines Modals.',
  buttons: [
    {
      label: 'Schließen',
      class: 'btn btn-primary',
      onClick: function() {
        // Modal schließen
      }
    }
  ]
});
```

## Optionen

AvalynxModal ermöglicht die folgenden Optionen zur Anpassung:

- `id`: (string) Die ID des Elements, an das das Modal angehängt werden soll.
- `options`: Ein Objekt, das die folgenden Schlüssel enthält:
    - `modalFullscreen`: (boolean) Vollbildmodus aktivieren (Standard: `false`).
    - `title`: (string) Der Titel des Modals (Standard: `''`).
    - `titleIsHtml`: (boolean) Den Titel als HTML behandeln (Standard: `false`).
    - `body`: (string) Der Hauptinhalt des Modals (Standard: `''`).
    - `bodyIsHtml`: (boolean) Den Hauptinhalt als HTML behandeln (Standard: `false`).
    - `bodyAjaxUrl`: (string) URL zum Abrufen des Hauptinhalts (Standard: `''`).
    - `buttons`: (array) Ein Array von Schaltflächenobjekten. Jedes Objekt sollte ein `label`, eine `class` und eine `onClick`-Funktion haben (Standard: `[]`).
    - `safeInstance`: (boolean) Die Modal-Instanz beibehalten, nachdem sie geschlossen wurde (Standard: `false`).
    - `disableFullscreen`: (boolean) Die Vollbild-Schaltfläche deaktivieren (Standard: `false`).
    - `disableClose`: (boolean) Die Schließen-Schaltfläche deaktivieren (Standard: `false`).
    - `removeFullscreenBtn`: (boolean) Die Vollbild-Schaltfläche entfernen (Standard: `false`).
    - `removeCloseBtn`: (boolean) Die Schließen-Schaltfläche entfernen (Standard: `false`).
    - `loader`: (object) Eine Instanz von AvalynxLoader, die als Loader für das Modal verwendet werden soll (Standard: `null`).
    - `onModalCreated`: (function) Eine Callback-Funktion, die ausgeführt wird, wenn das Modal erstellt wird (Standard: `null`).
    - `onFullscreenToggled`: (function) Eine Callback-Funktion, die ausgeführt wird, wenn der Vollbildmodus umgeschaltet wird (Standard: `null`).
    - `onModalClosed`: (function) Eine Callback-Funktion, die ausgeführt wird, wenn das Modal geschlossen wird (Standard: `null`).

## Beitragen

Beiträge sind willkommen! Wenn Sie etwas beitragen möchten, forken Sie bitte das Repository und senden Sie einen Pull-Request mit Ihren Änderungen oder Verbesserungen. Wir suchen nach Beiträgen in den folgenden Bereichen:

- Fehlerbehebungen (Bug fixes)
- Funktionserweiterungen
- Dokumentationsverbesserungen

Bevor Sie Ihren Pull-Request einreichen, stellen Sie bitte sicher, dass Ihre Änderungen gut dokumentiert sind und dem bestehenden Codierungsstil des Projekts entsprechen.

## Lizenz

AvalynxModal ist Open-Source-Software, die unter der [MIT-Lizenz](LICENSE) lizenziert ist.

## Kontakt

Wenn Sie Fragen, Funktionswünsche oder Probleme haben, öffnen Sie bitte ein Issue in unserem [GitHub-Repository](https://github.com/avalynx/avalynx-modal/issues) oder senden Sie einen Pull-Request.

Vielen Dank, dass Sie AvalynxModal für Ihr Projekt in Betracht ziehen!
