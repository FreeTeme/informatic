// Простой клиентский роутер
const routes = {
  '/': '/index.html',
  '/product': '/product.html'
};

function router() {
  const path = window.location.pathname;
  const route = routes[path] || routes['/'];
  
  if (route) {
    fetch(route)
      .then(response => response.text())
      .then(html => {
        document.getElementById('app').innerHTML = html;
        // Обновляем историю браузера
        window.history.pushState({}, '', path);
      });
  }
}

// Обработчик навигации
window.addEventListener('popstate', router);

// Инициализация роутера
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      const href = e.target.getAttribute('href');
      window.history.pushState({}, '', href);
      router();
    }
  });
  
  router();
});