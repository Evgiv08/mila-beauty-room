# 💅 Mila Beauty Room

Сайт-визитка салона красоты на Jekyll. Деплой — GitHub Pages, домен `mila-room.beauty`.
Весь контент (тексты, цены, товары, фото) редактируется вручную прямо в коде — через файлы в `_data/`.

## 📁 Структура проекта

```
mila-beauty-room/
├── _config.yml           # Конфиг сайта (title, description, url)
├── CNAME                  # Кастомный домен для GitHub Pages
├── _layouts/
│   └── default.html      # Базовый шаблон (head, шрифты, favicon, OG-теги)
├── _includes/
│   ├── navbar.html       # Навигация
│   ├── footer.html       # Футер
│   └── icon.html         # Инлайн SVG-иконки (scissors, droplet, pin, clock…)
├── _data/                 # ✏️ Весь редактируемый контент сайта
│   ├── header.yml         # Название салона в шапке/футере
│   ├── hero.yml           # Главный экран (заголовок, фото, кнопки)
│   ├── about.yml          # Блок «О нас»
│   ├── services.yml       # Карточки услуг на главной
│   ├── price.yml          # Прайс-лист (категории → услуги)
│   ├── products.yml        # Товары Dr.Sorbie на странице /price
│   ├── page_price.yml      # Тексты страницы «Прайс»
│   ├── page_gallery.yml    # Тексты страницы «Галерея»
│   ├── gallery.yml         # Фото галереи + карусель «До и после»
│   ├── contacts.yml        # Адрес, телефон, часы работы, соцсети
│   └── cta.yml             # Тексты призыва к действию
├── assets/
│   ├── css/style.css
│   ├── js/script.js       # Навбар, лайтбокс, карусели, поиск товаров
│   └── images/
│       ├── products/       # Фото товаров (36 шт., единый белый фон)
│       ├── before-after/    # Коллажи «до/после» для карусели галереи
│       ├── og-image.png     # Превью ссылки для соцсетей/мессенджеров
│       └── favicon*.png, apple-touch-icon.png
├── favicon.ico
├── index.html
├── price.html
├── gallery.html
└── Gemfile
```

## ✏️ Как редактировать контент

Никакой CMS/админки нет — все правки делаются в `.yml`-файлах внутри `_data/` (структура понятная, по образцу соседних записей) или напрямую в `.html`-шаблонах, если меняется вёрстка. После изменений — коммит и пуш в `main`, GitHub Pages пересоберёт сайт автоматически за 30–90 секунд.

Примеры:
- Добавить услугу в прайс → `_data/price.yml`
- Добавить/изменить товар → `_data/products.yml`
- Добавить фото в галерею или карусель «До и после» → `_data/gallery.yml` (сами файлы фото — в `assets/images/`)
- Поменять контакты, часы работы, адрес → `_data/contacts.yml`

## 🚀 Запуск локально

```bash
# macOS — установить Ruby через Homebrew (если нет)
brew install ruby

# Установить зависимости
gem install bundler
bundle install

# Запустить сервер
bundle exec jekyll serve
# Сайт: http://localhost:4000
```

## 📦 Деплой на GitHub Pages

Деплой автоматический: любой пуш в ветку `main` пересобирает и публикует сайт на `https://mila-room.beauty` (домен закреплён файлом `CNAME`).

```bash
git add .
git commit -m "..."
git push origin main
```

Настройки репозитория: Settings → Pages → Branch: `main` / (root).

---
Создано с ❤️
