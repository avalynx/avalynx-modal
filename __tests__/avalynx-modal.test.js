import '@testing-library/jest-dom';
import * as bootstrap from 'bootstrap';
import { AvalynxModal } from '../src/js/avalynx-modal.esm.js';

document.body.innerHTML = `
<template id="avalynx-modal">
    <div class="avalynx-modal modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable avalynx-modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                    <div class="flex-grow-1"></div>
                    <button type="button" class="btn-close avalynx-modal-btn-fullscreen" aria-label="Fullscreen"></button>
                    <button type="button" class="btn-close avalynx-modal-btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer"></div>
            </div>
        </div>
    </div>
</template>
`;

describe('AvalynxModal', () => {
    let modal;
    beforeEach(() => {
        modal = new AvalynxModal('testModal', {
            title: 'Test Title',
            body: 'Test Body',
            buttons: [{ label: 'Close', class: 'btn-primary', onClick: () => modal.close() }]
        });
    });

    test('should open modal', () => {
        const spy = jest.spyOn(bootstrap.Modal.prototype, 'show');
        modal.open();
        expect(spy).toHaveBeenCalled();
    });

    test('should close modal', () => {
        const spy = jest.spyOn(bootstrap.Modal.prototype, 'hide');
        modal.open();
        modal.close();
        expect(spy).toHaveBeenCalled();
    });

    test('should call onModalCreated callback', () => {
        const onModalCreated = jest.fn();
        modal = new AvalynxModal('testModal', { onModalCreated });
        expect(onModalCreated).toHaveBeenCalledWith(modal);
    });

    test('should show loader overlay when fetching data', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => Promise.resolve('Fetched Content')
            })
        );

        modal = new AvalynxModal('testModal', {
            bodyAjaxUrl: 'https://example.com/test'
        });

        const overlay = document.getElementById('testModal-overlay');
        await modal.fetchData('https://example.com/test', false);
        expect(overlay.style.display).toBe('none');
    });

    test('should display custom loader when fetching data', async () => {
        const loader = { load: false };
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => Promise.resolve('Fetched Content')
            })
        );

        modal = new AvalynxModal('testModal', {
            bodyAjaxUrl: 'https://example.com/test',
            loader
        });

        await modal.fetchData('https://example.com/test', false);
        expect(loader.load).toBe(false);
    });

    test('should set title and body', () => {
        expect(modal.modal.querySelector('.modal-title').innerText).toBe('Test Title');
        expect(modal.modal.querySelector('.modal-body').innerText).toBe('Test Body');
    });

    test('should set buttons', () => {
        const buttons = modal.modal.querySelectorAll('.modal-footer button');
        expect(buttons.length).toBe(1);
        expect(buttons[0].innerText).toBe('Close');
        expect(buttons[0].className).toContain('btn-primary');
    });

    /*
    test('should toggle fullscreen', () => {
        const dialog = modal.modal.querySelector('.modal-dialog');
        expect(dialog.classList.contains('modal-fullscreen')).toBe(true);
        modal.toggleFullscreen(modal.modal);
        expect(dialog.classList.contains('modal-fullscreen')).toBe(false);
    });
     */

    test('should call onModalClosed callback', () => {
        const onModalClosed = jest.fn();
        modal = new AvalynxModal('testModal', { onModalClosed, safeInstance: true });
        modal.modal.dispatchEvent(new Event('hidden.bs.modal'));
        expect(onModalClosed).toHaveBeenCalledWith(modal);
    });

    /*
    test('should remove modal when safeInstance is false', () => {
        modal = new AvalynxModal('testModal', { safeInstance: false });
        modal.modal.dispatchEvent(new Event('hidden.bs.modal'));
        expect(document.getElementById('testModal')).toBeNull();
    });
     */
});
