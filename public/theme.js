(() => {
  let saved,updateControl,labels={};
  document.addEventListener('locale-ready',event=>{labels=event.detail;updateControl?.();});
  try { saved = localStorage.getItem('inbox-theme'); } catch {}
  const media = matchMedia('(prefers-color-scheme: dark)');
  const apply = () => {
    const theme = saved || (media.matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.bsTheme = theme;
  };
  apply();
  media.addEventListener('change', apply);
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    const update = () => {
      const dark = document.documentElement.dataset.theme === 'dark';
      button.setAttribute('aria-label', dark?(labels.theme_light||'Switch to light theme'):(labels.theme_dark||'Switch to dark theme'));
      button.setAttribute('aria-pressed', String(dark));
      button.querySelector('[data-theme-icon]').textContent = dark ? '☼' : '☾';
    };
    updateControl=update;
    button.addEventListener('click', () => {
      saved = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('inbox-theme', saved); } catch {}
      apply(); update();
    });
    media.addEventListener('change', update); update();
  });
})();
