// public/static-redirect.js
document.addEventListener('DOMContentLoaded', () => {
    const redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect !== location.pathname) {
      history.replaceState(null, null, redirect);
    }
  });