# 💅 Beauty Studio — Jekyll + Decap CMS

Сайт-визитка салона красоты на Jekyll с панелью управления контентом (Decap CMS).
Деплой — GitHub Pages. Тексты, прайс и галерея редактируются через браузер без кода.

## 📁 Структура проекта

```
beauty-studio/
├── _config.yml           # Конфиг + все тексты (название, контакты, hero, о нас)
├── _layouts/
│   └── default.html      # Базовый шаблон (обёртка всех страниц)
├── _includes/
│   ├── navbar.html       # Навигация
│   └── footer.html       # Футер
├── _data/
│   ├── services.yml      # ✏️ Услуги на главной
│   ├── price.yml         # ✏️ Прайс-лист
│   └── gallery.yml       # ✏️ Галерея
├── assets/
│   ├── css/style.css
│   ├── js/script.js
│   └── images/
├── admin/
│   ├── index.html        # Панель Decap CMS → /admin
│   └── config.yml        # Настройки CMS
├── index.html
├── price.html
├── gallery.html
└── Gemfile
```

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

```bash
git init
git add .
git commit -m "Initial Jekyll commit"
git remote add origin https://github.com/evgiv08/mila-beauty-room.git
git branch -M main
git push -u origin main
```

Затем: Settings → Pages → Branch: main / (root) → Save.
Сайт появится на: `https://ВАШ_ЛОГИН.github.io/beauty-studio/`

> В `_config.yml` установите `baseurl: "/beauty-studio"` и `url: "https://ВАШ_ЛОГИН.github.io"`

## ✏️ Подключение Decap CMS

1. В `admin/config.yml` замените `ВАШ_ЛОГИН/beauty-studio` на свой репозиторий
2. Зарегистрируйтесь на [netlify.com](https://netlify.com), подключите репозиторий
3. Site settings → **Identity** → Enable → **Git Gateway** → Enable
4. Identity → **Invite users** → пригласите себя по email
5. Откройте `ваш-сайт.netlify.app/admin/` — войдите и редактируйте

### Что редактируется через CMS

| Раздел | Что меняется |
|---|---|
| ⚙️ Настройки | Название, контакты, тексты hero и «О нас» |
| ✂️ Услуги | Карточки услуг на главной |
| 💰 Прайс-лист | Все категории и позиции с ценами |
| 🖼️ Галерея | Карусель и сетка фото |

---
Учебный проект. Создано с ❤️
