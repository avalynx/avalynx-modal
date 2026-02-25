/**
 * AvalynxModal
 *
 * AvalynxModal is a simple modal system for web applications with fullscreen support. Based on Bootstrap >=5.3 without any framework dependencies.
 *
 * @version 1.0.3
 * @license MIT
 * @author https://github.com/avalynx/avalynx-modal/graphs/contributors
 * @website https://github.com/avalynx/
 * @repository https://github.com/avalynx/avalynx-modal.git
 * @bugs https://github.com/avalynx/avalynx-modal/issues
 *
 * @param {string} id - The ID of the element to attach the modal to.
 * @param {object} options - An object containing the following keys:
 * @param {boolean} options.modalFullscreen - Enable fullscreen mode (default: false).
 * @param {string} options.title - The title of the modal (default: '').
 * @param {boolean} options.titleIsHtml - Treat the title as HTML (default: false).
 * @param {string} options.body - The body content of the modal (default: '').
 * @param {boolean} options.bodyIsHtml - Treat the body content as HTML (default: false).
 * @param {string} options.bodyAjaxUrl - URL to fetch the body content from (default: '').
 * @param {array} options.buttons - An array of button objects. Each object should have a `label`, `class`, and `onClick` function (default: []).
 * @param {boolean} options.safeInstance - Keep the modal instance after it's closed (default: false).
 * @param {boolean} options.disableFullscreen - Disable the fullscreen button (default: false).
 * @param {boolean} options.disableClose - Disable the close button (default: false).
 * @param {boolean} options.removeFullscreenBtn - Remove the fullscreen button (default: false).
 * @param {boolean} options.removeCloseBtn - Remove the close button (default: false).
 * @param {object} options.loader - An instance of AvalynxLoader to use as the loader for the modal (default: null).
 * @param {function} options.onModalCreated - A callback function to execute when the modal is created (default: null).
 * @param {function} options.onFullscreenToggled - A callback function to execute when the fullscreen mode is toggled (default: null).
 * @param {function} options.onModalClosed - A callback function to execute when the modal is closed (default: null).
 *
 */

class AvalynxModal {
    constructor(id, options = {}, language = {}) {
        this.id = id;
        if (options === null || typeof options !== 'object') {
            options = {};
        }
        this.options = {
            modalFullscreen: false,
            title: '',
            titleIsHtml: false,
            body: '',
            bodyIsHtml: false,
            bodyAjaxUrl: '',
            buttons: [],
            safeInstance: false,
            disableFullscreen: false,
            disableClose: false,
            removeFullscreenBtn: false,
            removeCloseBtn: false,
            loader: null,
            onModalCreated: null,
            onFullscreenToggled: null,
            onModalClosed: null,
            ...options
        };
        if (language === null || typeof language !== 'object') {
            language = {};
        }
        this.language = {
            ...language
        };
        this.init();
    }

    init() {
        this.ensureTemplatesExist();

        const template_avalynx_modal = document.getElementById("avalynx-modal-template").content.cloneNode(true);
        this.modal = template_avalynx_modal.querySelector('.modal');
        this.setTitle(this.options.title, this.options.titleIsHtml);

        if (this.options.body) {
            this.setBody(this.options.body, this.options.bodyIsHtml);
        }
        this.setButtons(this.options.buttons);

        const fullscreenBtn = this.modal.querySelector('.avalynx-modal-btn-fullscreen');
        if (fullscreenBtn) {
            if (this.options.removeFullscreenBtn) {
                fullscreenBtn.remove();
            } else if (this.options.disableFullscreen) {
                fullscreenBtn.disabled = true;
            } else {
                fullscreenBtn.addEventListener('click', () => this.toggleFullscreen(this.modal));
            }
        }

        const closeBtn = this.modal.querySelector('.avalynx-modal-btn-close');
        if (closeBtn) {
            if (this.options.removeCloseBtn) {
                closeBtn.remove();
            } else if (this.options.disableClose) {
                closeBtn.disabled = true;
            }
        }

        document.body.appendChild(this.modal);

        this.modalInstance = new bootstrap.Modal(this.modal, {
            backdrop: 'static',
            keyboard: false
        });

        if (this.options.modalFullscreen) {
            this.toggleFullscreen(this.modal);
        }

        if (this.options.onModalCreated && typeof this.options.onModalCreated === 'function') {
            this.options.onModalCreated(this);
        }

        this.setupOverlayAndLoader();

        if (this.options.bodyAjaxUrl) {
            this.fetchData(this.options.bodyAjaxUrl, this.options.bodyIsHtml);
        }

        if (this.options.safeInstance !== true) {
            this.modal.addEventListener('hidden.bs.modal', () => {
                this.modal.remove();
                this.modalInstance = null;
                if (this.options.onModalClosed && typeof this.options.onModalClosed === 'function') {
                    this.options.onModalClosed(this);
                }
            });
        } else {
            this.modal.addEventListener('hidden.bs.modal', () => {
                if (this.options.onModalClosed && typeof this.options.onModalClosed === 'function') {
                    this.options.onModalClosed(this);
                }
            });
        }
    }

    async fetchData(url, isHtml) {
        if (this.options.loader === null) {
            const overlay = document.getElementById(`${this.id}-overlay`);
            if (overlay) {
                overlay.style.display = 'flex';
            }
        } else {
            this.options.loader.load = true;
        }

        try {
            const response = await fetch(url);
            const data = await response.text();
            this.setBody(data, isHtml);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            if (this.options.loader === null) {
                const overlay = document.getElementById(`${this.id}-overlay`);
                if (overlay) {
                    overlay.style.display = 'none';
                }
            } else {
                this.options.loader.load = false;
            }
        }
    }

    ensureTemplatesExist() {
        this.addTemplateIfMissing("avalynx-modal-template", `
<div class="avalynx-modal modal fade" tabindex="-1" id="${this.id}" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable avalynx-modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
                <div class="flex-grow-1"></div>
                <button type="button" class="btn-close avalynx-modal-btn-fullscreen" aria-label="Fullscreen"></button>
                <button type="button" class="btn-close avalynx-modal-btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="${this.id}-body"></div>
            <div class="modal-footer"></div>
        </div>
    </div>
</div>
        `);
    }

    addTemplateIfMissing(id, content) {
        if (!document.getElementById(id)) {
            const template = document.createElement('template');
            template.id = id;
            template.innerHTML = content;
            document.body.appendChild(template);
        }
    }

    toggleFullscreen(modal) {
        const dialog = modal.querySelector('.modal-dialog');
        dialog.classList.toggle('modal-fullscreen');
        dialog.classList.toggle('avalynx-modal-dialog');
        if (this.options.onFullscreenToggled && typeof this.options.onFullscreenToggled === 'function') {
            this.options.onFullscreenToggled(this);
        }
    }

    setTitle(content, isHtml = this.options.titleIsHtml) {
        const modalTitleElement = this.modal.querySelector('.modal-title');
        if (isHtml) {
            modalTitleElement.innerHTML = content;
        } else {
            modalTitleElement.innerText = content;
        }
    }

    setBody(content, isHtml = this.options.bodyIsHtml) {
        const modalBodyElement = this.modal.querySelector('.modal-body');
        if (isHtml) {
            modalBodyElement.innerHTML = content;
        } else {
            modalBodyElement.innerText = content;
        }
    }

    setButtons(buttons) {
        const modalFooter = this.modal.querySelector('.modal-footer');
        modalFooter.innerHTML = '';
        buttons.forEach(button => {
            const btn = document.createElement('button');
            btn.className = `btn ${button.class}`;
            btn.innerText = button.label;
            if (button.onClick) {
                btn.addEventListener('click', button.onClick);
            }
            modalFooter.appendChild(btn);
        });
    }

    setLoader(loader) {
        this.options.loader = loader;
    }

    open() {
        this.modalInstance.show();
    }

    close() {
        if (this.modalInstance) {
            this.modalInstance.hide();
        }
    }

    setupOverlayAndLoader() {
        if (this.options.loader === null) {
            const overlay = document.createElement('div');
            overlay.id = `${this.id}-overlay`;
            overlay.style.position = 'absolute';
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.display = 'none';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.backgroundColor = 'rgba(var(--bs-body-bg-rgb, 0, 0, 0), 0.7)';
            overlay.style.zIndex = '1000';

            const spinner = document.createElement('div');
            spinner.className = 'spinner-border text-primary';
            spinner.role = 'status';
            spinner.innerHTML = '<span class="visually-hidden">Loading...</span>';

            overlay.appendChild(spinner);
            this.modal.querySelector('.modal-body').appendChild(overlay);
        }
    }
}

/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AvalynxModal
}
