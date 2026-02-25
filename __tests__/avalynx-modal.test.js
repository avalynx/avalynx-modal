/**
 * AvalynxModal Jest Tests
 * Comprehensive test suite for all important functionality
 */

const AvalynxModal = require('../src/js/avalynx-modal.js');

// Mock bootstrap Modal
global.bootstrap = {
    Modal: jest.fn().mockImplementation(function(element, options) {
        this.element = element;
        this.options = options;
        this._isShown = false;
        this.show = jest.fn(() => { this._isShown = true; });
        this.hide = jest.fn(() => { this._isShown = false; });
        return this;
    })
};

// Mock fetch globally
global.fetch = jest.fn();

describe('AvalynxModal', () => {
    let consoleErrorSpy;

    beforeEach(() => {
        document.body.innerHTML = '';
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        global.fetch.mockClear();
        global.bootstrap.Modal.mockClear();
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
        document.body.innerHTML = '';
    });

    describe('Constructor and initialization', () => {
        test('initializes with default options', () => {
            const modal = new AvalynxModal('test-modal');
            expect(modal.id).toBe('test-modal');
            expect(modal.options.modalFullscreen).toBe(false);
            expect(modal.options.title).toBe('');
            expect(modal.options.body).toBe('');
            expect(modal.options.buttons).toEqual([]);
            expect(modal.options.safeInstance).toBe(false);
        });

        test('merges custom options with defaults', () => {
            const modal = new AvalynxModal('test-modal', {
                modalFullscreen: true,
                title: 'Test Title',
                body: 'Test Body',
                safeInstance: true
            });
            expect(modal.options.modalFullscreen).toBe(true);
            expect(modal.options.title).toBe('Test Title');
            expect(modal.options.body).toBe('Test Body');
            expect(modal.options.safeInstance).toBe(true);
        });

        test('handles null options gracefully', () => {
            const modal = new AvalynxModal('test-modal', null);
            expect(modal.options.modalFullscreen).toBe(false);
            expect(modal.options.title).toBe('');
        });

        test('handles non-object options gracefully', () => {
            const modal = new AvalynxModal('test-modal', 'invalid');
            expect(modal.options).toBeDefined();
            expect(modal.options.title).toBe('');
        });

        test('handles null language gracefully', () => {
            const modal = new AvalynxModal('test-modal', {}, null);
            expect(modal.language).toBeDefined();
            expect(modal.language).toEqual({});
        });

        test('handles non-object language gracefully', () => {
            const modal = new AvalynxModal('test-modal', {}, 'invalid');
            expect(modal.language).toBeDefined();
            expect(modal.language).toEqual({});
        });

        test('creates modal DOM structure on initialization', () => {
            const modal = new AvalynxModal('test-modal');
            expect(modal.modal).toBeDefined();
            expect(modal.modal.classList.contains('modal')).toBe(true);
            expect(modal.modal.classList.contains('avalynx-modal')).toBe(true);
        });

        test('creates bootstrap Modal instance', () => {
            const modal = new AvalynxModal('test-modal');
            expect(global.bootstrap.Modal).toHaveBeenCalledWith(
                modal.modal,
                { backdrop: 'static', keyboard: false }
            );
            expect(modal.modalInstance).toBeDefined();
        });

        test('appends modal to document body', () => {
            const modal = new AvalynxModal('test-modal');
            const modals = document.querySelectorAll('.avalynx-modal');
            expect(modals.length).toBe(1);
        });
    });

    describe('Template creation', () => {
        test('creates template if missing', () => {
            const modal = new AvalynxModal('test-modal');
            const template = document.getElementById('avalynx-modal-template');
            expect(template).toBeTruthy();
            expect(template.tagName).toBe('TEMPLATE');
        });

        test('does not create duplicate templates', () => {
            new AvalynxModal('modal1');
            new AvalynxModal('modal2');
            const templates = document.querySelectorAll('#avalynx-modal-template');
            expect(templates.length).toBe(1);
        });

        test('template contains required structure', () => {
            const modal = new AvalynxModal('test-modal');
            const template = document.getElementById('avalynx-modal-template');
            const content = template.content.cloneNode(true);
            expect(content.querySelector('.modal')).toBeTruthy();
            expect(content.querySelector('.modal-dialog')).toBeTruthy();
            expect(content.querySelector('.modal-content')).toBeTruthy();
            expect(content.querySelector('.modal-header')).toBeTruthy();
            expect(content.querySelector('.modal-title')).toBeTruthy();
            expect(content.querySelector('.modal-body')).toBeTruthy();
            expect(content.querySelector('.modal-footer')).toBeTruthy();
        });
    });

    describe('setTitle method', () => {
        test('sets title as text by default', () => {
            const modal = new AvalynxModal('test-modal');
            modal.setTitle('Test Title');
            const title = modal.modal.querySelector('.modal-title');
            expect(title.innerText).toBe('Test Title');
        });

        test('sets title as HTML when titleIsHtml is true', () => {
            const modal = new AvalynxModal('test-modal', { titleIsHtml: true });
            modal.setTitle('<b>Bold Title</b>');
            const title = modal.modal.querySelector('.modal-title');
            expect(title.innerHTML).toBe('<b>Bold Title</b>');
        });

        test('respects titleIsHtml from options', () => {
            const modal = new AvalynxModal('test-modal', {
                title: '<em>Italic</em>',
                titleIsHtml: true
            });
            const title = modal.modal.querySelector('.modal-title');
            expect(title.innerHTML).toContain('<em>Italic</em>');
        });

        test('can override isHtml parameter', () => {
            const modal = new AvalynxModal('test-modal', { titleIsHtml: false });
            modal.setTitle('<b>Bold</b>', true);
            const title = modal.modal.querySelector('.modal-title');
            expect(title.innerHTML).toBe('<b>Bold</b>');
        });
    });

    describe('setBody method', () => {
        test('sets body as text by default', () => {
            const modal = new AvalynxModal('test-modal');
            modal.setBody('Test Body');
            const body = modal.modal.querySelector('.modal-body');
            expect(body.innerText).toBe('Test Body');
        });

        test('sets body as HTML when bodyIsHtml is true', () => {
            const modal = new AvalynxModal('test-modal', { bodyIsHtml: true });
            modal.setBody('<p>Paragraph</p>');
            const body = modal.modal.querySelector('.modal-body');
            expect(body.innerHTML).toContain('<p>Paragraph</p>');
        });

        test('respects bodyIsHtml from options', () => {
            const modal = new AvalynxModal('test-modal', {
                body: '<div>Div content</div>',
                bodyIsHtml: true
            });
            const body = modal.modal.querySelector('.modal-body');
            expect(body.innerHTML).toContain('<div>Div content</div>');
        });

        test('can override isHtml parameter', () => {
            const modal = new AvalynxModal('test-modal', { bodyIsHtml: false });
            modal.setBody('<span>Span</span>', true);
            const body = modal.modal.querySelector('.modal-body');
            expect(body.innerHTML).toContain('<span>Span</span>');
        });
    });

    describe('setButtons method', () => {
        test('creates buttons from array', () => {
            const modal = new AvalynxModal('test-modal');
            const buttons = [
                { label: 'Cancel', class: 'btn-secondary' },
                { label: 'OK', class: 'btn-primary' }
            ];
            modal.setButtons(buttons);
            const footer = modal.modal.querySelector('.modal-footer');
            const buttonElements = footer.querySelectorAll('button');
            expect(buttonElements.length).toBe(2);
            expect(buttonElements[0].innerText).toBe('Cancel');
            expect(buttonElements[1].innerText).toBe('OK');
        });

        test('applies correct CSS classes to buttons', () => {
            const modal = new AvalynxModal('test-modal');
            const buttons = [
                { label: 'Delete', class: 'btn-danger' }
            ];
            modal.setButtons(buttons);
            const buttonElement = modal.modal.querySelector('.modal-footer button');
            expect(buttonElement.classList.contains('btn')).toBe(true);
            expect(buttonElement.classList.contains('btn-danger')).toBe(true);
        });

        test('attaches onClick handlers to buttons', () => {
            const modal = new AvalynxModal('test-modal');
            const mockHandler = jest.fn();
            const buttons = [
                { label: 'Click Me', class: 'btn-primary', onClick: mockHandler }
            ];
            modal.setButtons(buttons);
            const buttonElement = modal.modal.querySelector('.modal-footer button');
            buttonElement.click();
            expect(mockHandler).toHaveBeenCalledTimes(1);
        });

        test('clears existing buttons before adding new ones', () => {
            const modal = new AvalynxModal('test-modal');
            modal.setButtons([{ label: 'First', class: 'btn-primary' }]);
            modal.setButtons([{ label: 'Second', class: 'btn-secondary' }]);
            const footer = modal.modal.querySelector('.modal-footer');
            const buttonElements = footer.querySelectorAll('button');
            expect(buttonElements.length).toBe(1);
            expect(buttonElements[0].innerText).toBe('Second');
        });

        test('handles empty button array', () => {
            const modal = new AvalynxModal('test-modal');
            modal.setButtons([]);
            const footer = modal.modal.querySelector('.modal-footer');
            expect(footer.innerHTML).toBe('');
        });

        test('initializes with buttons from options', () => {
            const buttons = [
                { label: 'Save', class: 'btn-success' }
            ];
            const modal = new AvalynxModal('test-modal', { buttons });
            const buttonElement = modal.modal.querySelector('.modal-footer button');
            expect(buttonElement).toBeTruthy();
            expect(buttonElement.innerText).toBe('Save');
        });
    });

    describe('Fullscreen functionality', () => {
        test('toggleFullscreen adds and removes modal-fullscreen class', () => {
            const modal = new AvalynxModal('test-modal');
            const dialog = modal.modal.querySelector('.modal-dialog');
            expect(dialog.classList.contains('modal-fullscreen')).toBe(false);

            modal.toggleFullscreen(modal.modal);
            expect(dialog.classList.contains('modal-fullscreen')).toBe(true);
            expect(dialog.classList.contains('avalynx-modal-dialog')).toBe(false);

            modal.toggleFullscreen(modal.modal);
            expect(dialog.classList.contains('modal-fullscreen')).toBe(false);
            expect(dialog.classList.contains('avalynx-modal-dialog')).toBe(true);
        });

        test('starts in fullscreen when modalFullscreen option is true', () => {
            const modal = new AvalynxModal('test-modal', { modalFullscreen: true });
            const dialog = modal.modal.querySelector('.modal-dialog');
            expect(dialog.classList.contains('modal-fullscreen')).toBe(true);
        });

        test('fullscreen button triggers toggleFullscreen', () => {
            const modal = new AvalynxModal('test-modal');
            const fullscreenBtn = modal.modal.querySelector('.avalynx-modal-btn-fullscreen');
            const dialog = modal.modal.querySelector('.modal-dialog');

            expect(dialog.classList.contains('modal-fullscreen')).toBe(false);
            fullscreenBtn.click();
            expect(dialog.classList.contains('modal-fullscreen')).toBe(true);
        });

        test('disableFullscreen disables the fullscreen button', () => {
            const modal = new AvalynxModal('test-modal', { disableFullscreen: true });
            const fullscreenBtn = modal.modal.querySelector('.avalynx-modal-btn-fullscreen');
            expect(fullscreenBtn.disabled).toBe(true);
        });

        test('removeFullscreenBtn removes the fullscreen button', () => {
            const modal = new AvalynxModal('test-modal', { removeFullscreenBtn: true });
            const fullscreenBtn = modal.modal.querySelector('.avalynx-modal-btn-fullscreen');
            expect(fullscreenBtn).toBeNull();
        });

        test('onFullscreenToggled callback is called when toggling', () => {
            const callback = jest.fn();
            const modal = new AvalynxModal('test-modal', { onFullscreenToggled: callback });
            modal.toggleFullscreen(modal.modal);
            expect(callback).toHaveBeenCalledWith(modal);
            expect(callback).toHaveBeenCalledTimes(1);
        });

        test('onFullscreenToggled is not called if not a function', () => {
            expect(() => {
                const modal = new AvalynxModal('test-modal', { onFullscreenToggled: 'not a function' });
                modal.toggleFullscreen(modal.modal);
            }).not.toThrow();
        });
    });

    describe('Close button functionality', () => {
        test('close button has data-bs-dismiss attribute', () => {
            const modal = new AvalynxModal('test-modal');
            const closeBtn = modal.modal.querySelector('.avalynx-modal-btn-close');
            expect(closeBtn.getAttribute('data-bs-dismiss')).toBe('modal');
        });

        test('disableClose disables the close button', () => {
            const modal = new AvalynxModal('test-modal', { disableClose: true });
            const closeBtn = modal.modal.querySelector('.avalynx-modal-btn-close');
            expect(closeBtn.disabled).toBe(true);
        });

        test('removeCloseBtn removes the close button', () => {
            const modal = new AvalynxModal('test-modal', { removeCloseBtn: true });
            const closeBtn = modal.modal.querySelector('.avalynx-modal-btn-close');
            expect(closeBtn).toBeNull();
        });
    });

    describe('open and close methods', () => {
        test('open method calls modalInstance.show()', () => {
            const modal = new AvalynxModal('test-modal');
            modal.open();
            expect(modal.modalInstance.show).toHaveBeenCalledTimes(1);
        });

        test('close method calls modalInstance.hide()', () => {
            const modal = new AvalynxModal('test-modal');
            modal.close();
            expect(modal.modalInstance.hide).toHaveBeenCalledTimes(1);
        });

        test('close method handles null modalInstance gracefully', () => {
            const modal = new AvalynxModal('test-modal');
            modal.modalInstance = null;
            expect(() => modal.close()).not.toThrow();
        });
    });

    describe('Lifecycle callbacks', () => {
        test('onModalCreated callback is called after initialization', () => {
            const callback = jest.fn();
            const modal = new AvalynxModal('test-modal', { onModalCreated: callback });
            expect(callback).toHaveBeenCalledWith(modal);
            expect(callback).toHaveBeenCalledTimes(1);
        });

        test('onModalCreated is not called if not a function', () => {
            expect(() => {
                new AvalynxModal('test-modal', { onModalCreated: 'not a function' });
            }).not.toThrow();
        });

        test('onModalClosed callback is called when modal is hidden (non-safe instance)', (done) => {
            const callback = jest.fn(() => {
                expect(callback).toHaveBeenCalledWith(modal);
                done();
            });
            const modal = new AvalynxModal('test-modal', { onModalClosed: callback });

            // Trigger the hidden.bs.modal event
            const event = new Event('hidden.bs.modal');
            modal.modal.dispatchEvent(event);
        });

        test('onModalClosed callback is called when modal is hidden (safe instance)', (done) => {
            const callback = jest.fn(() => {
                expect(callback).toHaveBeenCalledWith(modal);
                done();
            });
            const modal = new AvalynxModal('test-modal', {
                onModalClosed: callback,
                safeInstance: true
            });

            // Trigger the hidden.bs.modal event
            const event = new Event('hidden.bs.modal');
            modal.modal.dispatchEvent(event);
        });

        test('modal is removed from DOM when closed (non-safe instance)', () => {
            const modal = new AvalynxModal('test-modal');
            const modalElement = modal.modal;

            // Trigger the hidden.bs.modal event
            const event = new Event('hidden.bs.modal');
            modal.modal.dispatchEvent(event);

            expect(modalElement.parentNode).toBeNull();
            expect(modal.modalInstance).toBeNull();
        });

        test('modal is kept in DOM when closed (safe instance)', () => {
            const modal = new AvalynxModal('test-modal', { safeInstance: true });
            const modalElement = modal.modal;

            // Trigger the hidden.bs.modal event
            const event = new Event('hidden.bs.modal');
            modal.modal.dispatchEvent(event);

            expect(modalElement.parentNode).toBeTruthy();
            expect(modal.modalInstance).toBeTruthy();
        });
    });

    describe('Overlay and loader setup', () => {
        test('creates overlay when loader is null', () => {
            const modal = new AvalynxModal('test-modal');
            const overlay = document.getElementById('test-modal-overlay');
            expect(overlay).toBeTruthy();
            expect(overlay.style.display).toBe('none');
        });

        test('overlay has correct styles', () => {
            const modal = new AvalynxModal('test-modal');
            const overlay = document.getElementById('test-modal-overlay');
            expect(overlay.style.position).toBe('absolute');
            expect(overlay.style.top).toBe('0px');
            expect(overlay.style.left).toBe('0px');
            expect(overlay.style.width).toBe('100%');
            expect(overlay.style.height).toBe('100%');
            expect(overlay.style.zIndex).toBe('1000');
        });

        test('overlay contains spinner', () => {
            const modal = new AvalynxModal('test-modal');
            const overlay = document.getElementById('test-modal-overlay');
            const spinner = overlay.querySelector('.spinner-border');
            expect(spinner).toBeTruthy();
            expect(spinner.classList.contains('text-primary')).toBe(true);
        });

        test('overlay contains visually-hidden loading text', () => {
            const modal = new AvalynxModal('test-modal');
            const overlay = document.getElementById('test-modal-overlay');
            const hiddenText = overlay.querySelector('.visually-hidden');
            expect(hiddenText).toBeTruthy();
            expect(hiddenText.textContent).toBe('Loading...');
        });

        test('does not create overlay when custom loader is provided', () => {
            const customLoader = { load: false };
            const modal = new AvalynxModal('test-modal', { loader: customLoader });
            const overlay = document.getElementById('test-modal-overlay');
            expect(overlay).toBeNull();
        });
    });

    describe('setLoader method', () => {
        test('sets loader instance', () => {
            const modal = new AvalynxModal('test-modal');
            const customLoader = { load: false };
            modal.setLoader(customLoader);
            expect(modal.options.loader).toBe(customLoader);
        });

        test('allows changing loader after initialization', () => {
            const modal = new AvalynxModal('test-modal');
            expect(modal.options.loader).toBeNull();
            const customLoader = { load: false };
            modal.setLoader(customLoader);
            expect(modal.options.loader).toBe(customLoader);
        });
    });

    describe('AJAX content loading (fetchData)', () => {
        test('fetches data from URL and sets body', async () => {
            global.fetch.mockResolvedValueOnce({
                text: jest.fn().mockResolvedValue('Fetched content')
            });

            const modal = new AvalynxModal('test-modal');
            await modal.fetchData('https://example.com/data', false);

            expect(global.fetch).toHaveBeenCalledWith('https://example.com/data');
            const body = modal.modal.querySelector('.modal-body');
            expect(body.innerText).toBe('Fetched content');
        });

        test('shows overlay during fetch (when loader is null)', async () => {
            global.fetch.mockImplementationOnce(() =>
                new Promise(resolve => setTimeout(() => resolve({
                    text: jest.fn().mockResolvedValue('Content')
                }), 10))
            );

            const modal = new AvalynxModal('test-modal');
            const overlay = document.getElementById('test-modal-overlay');

            const fetchPromise = modal.fetchData('https://example.com/data', false);

            // Overlay should be visible during fetch
            expect(overlay.style.display).toBe('flex');

            await fetchPromise;

            // Overlay should be hidden after fetch
            expect(overlay.style.display).toBe('none');
        });

        test('uses custom loader during fetch if provided', async () => {
            global.fetch.mockResolvedValueOnce({
                text: jest.fn().mockResolvedValue('Content')
            });

            const customLoader = { load: false };
            const modal = new AvalynxModal('test-modal', { loader: customLoader });

            await modal.fetchData('https://example.com/data', false);

            // Custom loader should have been set to true and then false
            expect(customLoader.load).toBe(false);
        });

        test('handles fetch errors gracefully', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network error'));

            const modal = new AvalynxModal('test-modal');
            await modal.fetchData('https://example.com/data', false);

            expect(consoleErrorSpy).toHaveBeenCalled();
            const overlay = document.getElementById('test-modal-overlay');
            expect(overlay.style.display).toBe('none');
        });

        test('sets body as HTML when isHtml is true', async () => {
            global.fetch.mockResolvedValueOnce({
                text: jest.fn().mockResolvedValue('<p>HTML content</p>')
            });

            const modal = new AvalynxModal('test-modal', { bodyIsHtml: true });
            await modal.fetchData('https://example.com/data', true);

            const body = modal.modal.querySelector('.modal-body');
            expect(body.innerHTML).toContain('<p>HTML content</p>');
        });

        test('automatically fetches data if bodyAjaxUrl is provided', async () => {
            global.fetch.mockResolvedValueOnce({
                text: jest.fn().mockResolvedValue('AJAX content')
            });

            const modal = new AvalynxModal('test-modal', {
                bodyAjaxUrl: 'https://example.com/ajax-data'
            });

            // Wait for async initialization
            await new Promise(resolve => setTimeout(resolve, 0));

            expect(global.fetch).toHaveBeenCalledWith('https://example.com/ajax-data');
        });

        test('handles missing overlay element in finally block', async () => {
            global.fetch.mockResolvedValueOnce({
                text: jest.fn().mockResolvedValue('Content')
            });

            const modal = new AvalynxModal('test-modal');
            const overlay = document.getElementById('test-modal-overlay');
            overlay.remove();

            await expect(modal.fetchData('https://example.com/data', false)).resolves.not.toThrow();
        });
    });

    describe('Edge cases and error handling', () => {
        test('handles template without fullscreen or close buttons', () => {
            const template = document.createElement('template');
            template.id = 'avalynx-modal-template';
            template.innerHTML = `
                <div class="avalynx-modal modal fade" tabindex="-1" id="test-modal" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title"></h5>
                            </div>
                            <div class="modal-body"></div>
                            <div class="modal-footer"></div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(template);

            const modal = new AvalynxModal('test-modal');
            expect(modal.modal.querySelector('.avalynx-modal-btn-fullscreen')).toBeNull();
            expect(modal.modal.querySelector('.avalynx-modal-btn-close')).toBeNull();
        });

        test('handles multiple modals with different IDs', () => {
            const modal1 = new AvalynxModal('modal-1');
            const modal2 = new AvalynxModal('modal-2');

            expect(modal1.id).toBe('modal-1');
            expect(modal2.id).toBe('modal-2');
            expect(modal1.modal).not.toBe(modal2.modal);
        });

        test('handles complex button scenarios', () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();
            const handler3 = jest.fn();

            const modal = new AvalynxModal('test-modal', {
                buttons: [
                    { label: 'Button 1', class: 'btn-primary', onClick: handler1 },
                    { label: 'Button 2', class: 'btn-secondary', onClick: handler2 },
                    { label: 'Button 3', class: 'btn-success', onClick: handler3 }
                ]
            });

            const buttons = modal.modal.querySelectorAll('.modal-footer button');
            expect(buttons.length).toBe(3);

            buttons[0].click();
            buttons[1].click();
            buttons[2].click();

            expect(handler1).toHaveBeenCalledTimes(1);
            expect(handler2).toHaveBeenCalledTimes(1);
            expect(handler3).toHaveBeenCalledTimes(1);
        });

        test('handles button without onClick handler', () => {
            const modal = new AvalynxModal('test-modal', {
                buttons: [{ label: 'No Handler', class: 'btn-primary' }]
            });

            const button = modal.modal.querySelector('.modal-footer button');
            expect(() => button.click()).not.toThrow();
        });

        test('setTitle with empty string', () => {
            const modal = new AvalynxModal('test-modal');
            modal.setTitle('');
            const title = modal.modal.querySelector('.modal-title');
            expect(title.innerText).toBe('');
        });

        test('setBody with empty string', () => {
            const modal = new AvalynxModal('test-modal');
            modal.setBody('');
            const body = modal.modal.querySelector('.modal-body');
            expect(body.innerText).toBe('');
        });

        test('handles XSS protection with text mode', () => {
            const modal = new AvalynxModal('test-modal', {
                titleIsHtml: false,
                bodyIsHtml: false
            });
            modal.setTitle('<script>alert("XSS")</script>');
            modal.setBody('<script>alert("XSS")</script>');

            const title = modal.modal.querySelector('.modal-title');
            const body = modal.modal.querySelector('.modal-body');

            // Script tags should be treated as text, not executed
            expect(title.innerText).toContain('<script>');
            expect(body.innerText).toContain('<script>');
        });

        test('consecutive open and close calls', () => {
            const modal = new AvalynxModal('test-modal');
            modal.open();
            modal.open();
            expect(modal.modalInstance.show).toHaveBeenCalledTimes(2);

            modal.close();
            modal.close();
            expect(modal.modalInstance.hide).toHaveBeenCalledTimes(2);
        });

        test('bootstrap Modal is called with static backdrop and no keyboard', () => {
            const modal = new AvalynxModal('test-modal');
            expect(global.bootstrap.Modal).toHaveBeenCalledWith(
                modal.modal,
                expect.objectContaining({
                    backdrop: 'static',
                    keyboard: false
                })
            );
        });
    });

    describe('Integration scenarios', () => {
        test('full modal workflow: create, show, update content, close', () => {
            const onCreated = jest.fn();
            const onClosed = jest.fn();

            const modal = new AvalynxModal('test-modal', {
                title: 'Initial Title',
                body: 'Initial Body',
                onModalCreated: onCreated,
                onModalClosed: onClosed
            });

            expect(onCreated).toHaveBeenCalled();

            modal.open();
            expect(modal.modalInstance.show).toHaveBeenCalled();

            modal.setTitle('Updated Title');
            modal.setBody('Updated Body');

            const title = modal.modal.querySelector('.modal-title');
            const body = modal.modal.querySelector('.modal-body');
            expect(title.innerText).toBe('Updated Title');
            expect(body.innerText).toBe('Updated Body');

            modal.close();
            expect(modal.modalInstance.hide).toHaveBeenCalled();
        });

        test('modal with all options enabled', () => {
            const callbacks = {
                onModalCreated: jest.fn(),
                onFullscreenToggled: jest.fn(),
                onModalClosed: jest.fn()
            };

            const modal = new AvalynxModal('complex-modal', {
                modalFullscreen: true,
                title: 'Complex Modal',
                titleIsHtml: true,
                body: '<div>Body</div>',
                bodyIsHtml: true,
                buttons: [
                    { label: 'OK', class: 'btn-primary', onClick: jest.fn() }
                ],
                safeInstance: true,
                disableFullscreen: false,
                disableClose: false,
                removeFullscreenBtn: false,
                removeCloseBtn: false,
                ...callbacks
            });

            expect(callbacks.onModalCreated).toHaveBeenCalled();
            expect(modal.modal.querySelector('.modal-dialog').classList.contains('modal-fullscreen')).toBe(true);
            expect(modal.modal.querySelector('.modal-footer button')).toBeTruthy();
        });

        test('modal with custom loader integration', async () => {
            global.fetch.mockResolvedValueOnce({
                text: jest.fn().mockResolvedValue('Loaded content')
            });

            const customLoader = { load: false };
            const modal = new AvalynxModal('test-modal', {
                loader: customLoader,
                bodyAjaxUrl: 'https://example.com/data'
            });

            // Wait for fetch to complete
            await new Promise(resolve => setTimeout(resolve, 100));

            const body = modal.modal.querySelector('.modal-body');
            expect(body.innerText).toBe('Loaded content');
        });
    });
});
