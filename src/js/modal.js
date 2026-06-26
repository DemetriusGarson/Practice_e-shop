import { refs } from './refs';

export function openModal() {
  refs.modal.classList.add('modal--is-open');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleEscKeyPress);
  refs.modalCloseButton.addEventListener('click', handleModalCloseButtonClick);
  refs.modal.addEventListener('click', handleBackdropClick);
}

export function closeModal() {
  refs.modal.classList.remove('modal--is-open');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleEscKeyPress);
  refs.modalCloseButton.removeEventListener(
    'click',
    handleModalCloseButtonClick
  );
  refs.modal.removeEventListener('click', handleBackdropClick);
}

function handleEscKeyPress(event) {
  console.log(event.code);
  if (event.code === 'Escape') {
    closeModal();
  }
}

function handleModalCloseButtonClick() {
  closeModal();
}

function handleBackdropClick(event) {
  if (event.target === refs.modal) {
    closeModal();
  }
}
