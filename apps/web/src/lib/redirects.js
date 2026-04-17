
export const redirectToBibleAlpha = (e) => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
  window.open('https://bibliaalpha.studiologos.com.br/', '_blank', 'noopener,noreferrer');
};
