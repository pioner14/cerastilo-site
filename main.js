/** Cerastilo — theme, mobile navigation, feature tabs, and footer year. */
'use strict';

/* ============================================================
   1. TRANSLATIONS
   ============================================================ */
const translations = {
  en: {
    'page.title': "Cerastilo — Christian Life and Ministry meeting scheduler",
    'page.description': "Cerastilo is a free, unofficial Christian Life and Ministry meeting scheduler for Windows, Linux, and Android tablets, with assignments, schedule printing, and S-89 forms.",
    'page.imageAlt': "Cerastilo logo and name",
    'nav.two': "Two apps",
    'nav.features': "Features",
    'nav.download': "Download",
    'nav.beta': "Testers",
    'nav.faq': "FAQ",
    'nav.feedback': "Feedback",
    'nav.donate': "Support",
    'theme.toggle': "Toggle theme",
    'lang.toggle': "Switch to the Russian version",
    'lang.label': "EN",
    'nav.menu': "Open menu",
    'nav.menuClose': "Close menu",
    'nav.menuLabel': "Site menu",
    'nav.top': "Cerastilo — back to top",
    'nav.footer': "Footer navigation",
    'nav.main': "Main navigation",
    'feat.month.alt': "Monthly board with assignments by week",
    'feat.today.alt': "The Today screen: urgent items and the next meeting",
    'feat.people.alt': "Publisher database with participant cards",
    'feat.stats.alt': "Workload statistics by assignment category",
    'feat.books.alt': "Importing a workbook by week",
    'feat.export.alt': "The weekly schedule table",
    'skip': "Skip to content",
    'hero.headline': "The Christian Life and Ministry meeting schedule — on your computer and your tablet",
    'hero.sub': "Cerastilo is a free scheduler for the Christian Life & Ministry meeting. Two apps: one for your computer (Linux and Windows) and one for your Android tablet. Each works on its own, and together they share one database.",
    'hero.cta1': "Download",
    'hero.cta2': "Become a beta tester",
    'hero.devices': "Cerastilo on a computer and on a tablet",
    'hero.altPc': "Cerastilo on a computer: the weekly schedule table",
    'hero.altTablet': "Cerastilo on a tablet: the monthly board",
    'two.title': "Two apps, one database",
    'two.sub': "Each app works fully on its own. If you have both a computer and a tablet, they sync over Wi-Fi and always show the same thing.",
    'two.pc.title': "Computer",
    'two.pc.desc': "Full planning: monthly board, auto-assignment, printing, export, e-mails to participants.",
    'two.pc.tag': "Linux · Windows",
    'two.tab.title': "Tablet",
    'two.tab.desc': "The same app with the same look. Works without a computer — handy to hold right at the meeting.",
    'two.tab.tag': "Android",
    'two.sync.title': "Wi-Fi sync",
    'two.sync.desc': "The tablet acts as the server and the computer connects by itself — with an address and a 6-character code. No firewall setup needed.",
    'two.sync.merge': "The databases are merged: the more recent edit wins, and a copy is saved before merging.",
    'two.sync.alt': "The sync window: address and code",
    'two.tablet.alt': "Meeting schedule in Cerastilo on an Android tablet",
    'two.pc.alt': "Weekly meeting schedule in Cerastilo on a computer",
    'two.note': "Need only a computer or only a tablet? Take just one app. Sync is optional.",
    'feat.title': "From the workbook to the schedule",
    'feat.sub': "Real screenshots of the app (demo data with fictional names). Click an image to open it full size.",
    'feat.month.title': "Monthly board and auto-assignment",
    'feat.month.l1': "Takes qualifications, gender, rest intervals and vacations into account.",
    'feat.month.l2': "Fills only empty items — your manual assignments stay.",
    'feat.month.l3': "Don’t like the result? Undo with one click.",
    'feat.today.title': "Today — what to do",
    'feat.today.l1': "Who has not replied to a notification and who has not been notified yet.",
    'feat.today.l2': "A card for the upcoming meeting.",
    'feat.today.l3': "Urgent to-dos on a single screen.",
    'feat.people.title': "Participants and history",
    'feat.people.l1': "Profile cards: qualifications, family, vacation, contacts.",
    'feat.people.l2': "Assignment history and “paired N times” — see who has already worked with whom.",
    'feat.stats.title': "Load statistics",
    'feat.stats.l1': "Charts by assignment category.",
    'feat.stats.l2': "See at a glance who is overloaded and who has not taken part for a while.",
    'feat.books.title': "Workbooks",
    'feat.books.l1': "Import from EPUB — you download the workbook yourself from its official source.",
    'feat.books.l2': "The program is laid out by weeks automatically.",
    'feat.export.title': "Print and export",
    'feat.export.l1': "PDF, Word, S-89 forms, printing.",
    'feat.export.l2': "E-mails to participants with a .ics calendar file.",
    'feat.export.l3': "The same schedule layout on the computer and on the tablet.",
    'dl.title': "Download Cerastilo",
    'dl.sub': "Free for personal use. Unofficial app.",
    'dl.android': "APK for arm64 Android tablets.",
    'dl.linux': "AUR package for Arch Linux and an AppImage (x86_64) for other distributions.",
    'dl.windows': "Extract the ZIP and run cerastilo.exe. Leave the other files as they are.",
    'dl.btnApk': "Download APK",
    'dl.btnAur': "AUR",
    'dl.btnAppimage': "AppImage",
    'dl.btnZip': "Download ZIP",
    'dl.releases': "All releases",
    'dl.version': "Version 0.1.0",
    'beta.title': "Looking for beta testers",
    'beta.body': "To publish Cerastilo on Google Play I need testers with an Android tablet or phone. What to do: install the app through Google Play (closed testing), use it for a couple of weeks and tell me about any bugs.",
    'beta.contact': "Write to me:",
    'beta.issues': "Or leave a message in GitHub Issues:",
    'faq.title': "Frequently asked questions",
    'faq.q1': "Is Cerastilo free?",
    'faq.a1': "Yes. Cerastilo is free for personal use. The source code can be viewed, but the project is not open source: modifying, redistributing or selling the app is allowed only with the author’s written permission. See the LICENSE file.",
    'faq.q2': "What platforms are supported?",
    'faq.a2': "Computer: Linux (AUR and x86_64 AppImage) and Windows (x64 ZIP). Android tablets: arm64 APK.",
    'faq.q3': "Is my congregation’s data private?",
    'faq.a3': "The data is stored in a local SQLite database on your device; the project has no servers of its own. Sync goes directly between your devices over your local Wi-Fi network: the tablet is the server and the computer connects to it. E-mails to participants go through your own SMTP server.",
    'faq.q9': "Do I need both devices?",
    'faq.a9': "No. Each app works on its own — you can use just the computer or just the tablet. Sync is needed only if you want both devices to hold the same database.",
    'faq.q4': "Do I need an internet connection?",
    'faq.a4': "Not for working with the schedule. The internet is needed only for sending and receiving e-mail.",
    'faq.q5': "Can I move assignment history from another program?",
    'faq.a5': "There is no direct import from NW Scheduler. Assignment history can be loaded from a CSV file.",
    'faq.q6': "Is the UI available in English?",
    'faq.a6': "Yes. The interface is available in Russian and English; choose the language in Settings (it applies after a restart).",
    'faq.q7': "Does the app include any Jehovah’s Witnesses publications?",
    'faq.a7': "No. Cerastilo contains no texts, images or other materials from JW.org and downloads nothing from that site. You download the workbook yourself for personal use and open it in the app. The app lays out the meeting program by weeks only on your own device and does not publish it anywhere. Cerastilo is free and non-commercial.",
    'faq.q8': "Is this an official app?",
    'faq.a8': "No. Unofficial application. Not affiliated with the Watch Tower Bible and Tract Society / JW.org.",
    'support.label': "Feedback and support",
    'feedback.title': "Suggest an improvement",
    'feedback.body': "I develop Cerastilo on my own. If you are missing a feature or found a bug, tell me what you were trying to do and what happened.",
    'feedback.channel': "Feature requests and bug reports go through GitHub Issues of the repository.",
    'donate.title': "Support the project",
    'donate.body': "Cerastilo is developed by one person in their spare time. The app is free, but if it helps you, you can support its development. This is entirely optional.",
    'donate.plansTitle': "Planned: macOS and iOS.",
    'donate.plansBody': "Cerastilo already runs on Linux, Windows, and Android. I also plan to bring it to Mac, iPhone, and iPad, but I need Apple devices to develop and test those versions, and I don’t have them yet. Donations will help me buy the devices and release those versions sooner.",
    'donate.btn5': "☕ €5",
    'donate.btnOwn': "💝 Custom amount",
    'footer.tagline': "A scheduler for the Christian Life & Ministry meeting.",
    'footer.author': "Nikolai Golotaistrov",
    'footer.license': "License (LICENSE)",
    'footer.built': "Built with ♥ and",
    'footer.disclaimer': "Unofficial application. Not affiliated with the Watch Tower Bible and Tract Society / JW.org.",
  },

  ru: {
    'page.title': "Cerastilo — планировщик встречи «Христианская жизнь и служение»",
    'page.description': "Cerastilo — бесплатный неофициальный планировщик встречи «Христианская жизнь и служение» для Windows, Linux и Android-планшета; назначения, печать расписания, бланки S-89.",
    'page.imageAlt': "Логотип и название Cerastilo",
    'nav.two': "Две программы",
    'nav.features': "Возможности",
    'nav.download': "Скачать",
    'nav.beta': "Тестерам",
    'nav.faq': "Вопросы",
    'nav.feedback': "Обратная связь",
    'nav.donate': "Поддержать",
    'theme.toggle': "Переключить тему",
    'lang.toggle': "Перейти на английскую версию",
    'lang.label': "RU",
    'nav.menu': "Открыть меню",
    'nav.menuClose': "Закрыть меню",
    'nav.menuLabel': "Меню сайта",
    'nav.top': "Cerastilo — в начало страницы",
    'nav.footer': "Навигация внизу страницы",
    'nav.main': "Основная навигация",
    'feat.month.alt': "Доска месяца с назначениями по неделям",
    'feat.today.alt': "Экран «Сегодня»: неотложные дела и ближайшая встреча",
    'feat.people.alt': "База возвещателей с карточками участников",
    'feat.stats.alt': "Статистика нагрузки по категориям назначений",
    'feat.books.alt': "Импорт рабочей тетради по неделям",
    'feat.export.alt': "Таблица недельного расписания",
    'skip': "Перейти к содержимому",
    'hero.headline': "Расписание встречи «Христианская жизнь и служение» — на компьютере и на планшете",
    'hero.sub': "Cerastilo — бесплатный планировщик встречи «Христианская жизнь и служение». Две программы: для компьютера (Linux и Windows) и для Android-планшета. Каждая работает сама по себе, а вместе — делят одну базу.",
    'hero.cta1': "Скачать",
    'hero.cta2': "Стать бета-тестером",
    'hero.devices': "Cerastilo на компьютере и на планшете",
    'hero.altPc': "Cerastilo на компьютере: таблица недельного расписания",
    'hero.altTablet': "Cerastilo на планшете: доска месяца",
    'two.title': "Две программы, одна база",
    'two.sub': "Каждая программа полностью работает сама по себе. Если у вас есть и компьютер, и планшет — они синхронизируются по Wi-Fi и всегда показывают одно и то же.",
    'two.pc.title': "Компьютер",
    'two.pc.desc': "Полноценное планирование: доска месяца, авто-распределение, печать, экспорт, письма участникам.",
    'two.pc.tag': "Linux · Windows",
    'two.tab.title': "Планшет",
    'two.tab.desc': "То же самое приложение и тот же вид. Работает без компьютера — удобно держать в руках прямо на встрече.",
    'two.tab.tag': "Android",
    'two.sync.title': "Синхронизация по Wi-Fi",
    'two.sync.desc': "Планшет становится сервером, компьютер подключается сам — по адресу и коду из 6 символов. Брандмауэр настраивать не нужно.",
    'two.sync.merge': "Базы объединяются: побеждает более свежая правка, а копия перед слиянием сохраняется.",
    'two.sync.alt': "Окно синхронизации: адрес и код",
    'two.tablet.alt': "Расписание встречи в Cerastilo на Android-планшете",
    'two.pc.alt': "Недельное расписание встречи в Cerastilo на компьютере",
    'two.note': "Нужен только компьютер или только планшет — берите одну программу. Синхронизация — по желанию.",
    'feat.title': "От рабочей тетради до расписания",
    'feat.sub': "Реальные скриншоты приложения (демо-база с вымышленными именами). Нажмите на картинку, чтобы открыть крупно.",
    'feat.month.title': "Доска месяца и авто-распределение",
    'feat.month.l1': "Учитывает квалификации, пол, отдых и отпуск.",
    'feat.month.l2': "Заполняет только пустые пункты — ваши ручные назначения остаются.",
    'feat.month.l3': "Не понравилось — откат одним нажатием.",
    'feat.today.title': "Сегодня — что сделать",
    'feat.today.l1': "Кто не ответил на уведомление и кто ещё не уведомлён.",
    'feat.today.l2': "Карточка ближайшей встречи.",
    'feat.today.l3': "Неотложные дела — на одном экране.",
    'feat.people.title': "Возвещатели и история",
    'feat.people.l1': "Карточки: квалификации, семья, отпуск, контакты.",
    'feat.people.l2': "История назначений и «в паре N раз» — видно, кто с кем уже был.",
    'feat.stats.title': "Статистика нагрузки",
    'feat.stats.l1': "Графики по категориям назначений.",
    'feat.stats.l2': "Сразу видно, кто перегружен, а кто давно не участвовал.",
    'feat.books.title': "Рабочие тетради",
    'feat.books.l1': "Импорт из EPUB — вы скачиваете тетрадь сами, из официального источника.",
    'feat.books.l2': "Программа автоматически раскладывается по неделям.",
    'feat.export.title': "Печать и экспорт",
    'feat.export.l1': "PDF, Word, бланки S-89, печать.",
    'feat.export.l2': "Письма участникам с файлом календаря .ics.",
    'feat.export.l3': "Один и тот же вид расписания на ПК и на планшете.",
    'dl.title': "Скачать Cerastilo",
    'dl.sub': "Бесплатно для личного использования. Неофициальное приложение.",
    'dl.android': "APK для Android-планшетов с архитектурой arm64.",
    'dl.linux': "AUR-пакет для Arch Linux и AppImage (x86_64) для других дистрибутивов.",
    'dl.windows': "Распакуйте ZIP и запустите cerastilo.exe. Остальные файлы оставьте без изменений.",
    'dl.btnApk': "Скачать APK",
    'dl.btnAur': "AUR",
    'dl.btnAppimage': "AppImage",
    'dl.btnZip': "Скачать ZIP",
    'dl.releases': "Все версии",
    'dl.version': "Версия 0.1.0",
    'beta.title': "Ищу бета-тестеров",
    'beta.body': "Чтобы опубликовать Cerastilo в Google Play, нужны тестеры с Android-планшетом или телефоном. Что делать: установить приложение через Google Play (закрытое тестирование), пользоваться им пару недель и рассказать мне об ошибках.",
    'beta.contact': "Напишите мне:",
    'beta.issues': "Или оставьте сообщение в разделе Issues на GitHub:",
    'faq.title': "Часто задаваемые вопросы",
    'faq.q1': "Cerastilo бесплатный?",
    'faq.a1': "Да. Cerastilo бесплатное для личного использования. Исходный код можно посмотреть, но проект не является открытым: изменять, распространять и продавать приложение можно только с письменного разрешения автора. Подробности — в файле LICENSE.",
    'faq.q2': "Какие платформы поддерживаются?",
    'faq.a2': "Компьютер: Linux (AUR и AppImage x86_64) и Windows (ZIP для x64). Android-планшеты: APK для arm64.",
    'faq.q3': "Данные собрания в безопасности?",
    'faq.a3': "Данные хранятся в локальной базе SQLite на вашем устройстве, своих серверов у проекта нет. Синхронизация идёт напрямую между вашими устройствами в локальной сети Wi-Fi: планшет — сервер, компьютер подключается к нему. Письма участникам уходят через ваш собственный SMTP-сервер.",
    'faq.q9': "Нужны ли оба устройства?",
    'faq.a9': "Нет. Каждая программа работает сама по себе — можно пользоваться только компьютером или только планшетом. Синхронизация нужна, только если вы хотите, чтобы на обоих устройствах была одна и та же база.",
    'faq.q4': "Нужен ли интернет?",
    'faq.a4': "Для работы с расписанием — нет. Интернет нужен только для отправки и получения писем.",
    'faq.q5': "Можно перенести историю назначений из другой программы?",
    'faq.a5': "Прямого импорта из NW Scheduler нет. Историю назначений можно загрузить из CSV-файла.",
    'faq.q6': "Есть ли английский интерфейс?",
    'faq.a6': "Да. Интерфейс есть на русском и английском; язык выбирается в «Настройках» и применяется после перезапуска.",
    'faq.q7': "Есть ли в приложении публикации Свидетелей Иеговы?",
    'faq.a7': "Нет. Cerastilo не содержит текстов, изображений и других материалов JW.org и сам ничего не скачивает с этого сайта. Рабочую тетрадь вы скачиваете сами для личного использования и открываете в программе. Она раскладывает программу встреч по неделям только на вашем устройстве и никуда её не публикует. Cerastilo бесплатное и некоммерческое.",
    'faq.q8': "Это официальное приложение?",
    'faq.a8': "Нет. Неофициальное приложение. Не связано с Watch Tower Bible and Tract Society / JW.org.",
    'support.label': "Обратная связь и поддержка",
    'feedback.title': "Предложить улучшение",
    'feedback.body': "Я разрабатываю Cerastilo самостоятельно. Если вам не хватает функции или вы нашли ошибку, напишите, что вы хотели сделать и что произошло.",
    'feedback.channel': "Для предложений и сообщений об ошибках — раздел Issues в репозитории на GitHub.",
    'donate.title': "Поддержать проект",
    'donate.body': "Cerastilo делает один человек в свободное время. Приложение бесплатное, но если оно вам помогает, вы можете поддержать разработку. Это совершенно необязательно.",
    'donate.plansTitle': "В планах: macOS и iOS.",
    'donate.plansBody': "Cerastilo уже работает на Linux, Windows и Android. Версии для Mac, iPhone и iPad тоже в планах, но для разработки и проверки под них нужны устройства Apple, которых у меня пока нет. Пожертвования помогут их приобрести и ускорят появление этих версий.",
    'donate.btn5': "☕ 5 €",
    'donate.btnOwn': "💝 Своя сумма",
    'footer.tagline': "Планировщик встречи «Христианская жизнь и служение».",
    'footer.author': "Николай Голотайстров",
    'footer.license': "Лицензия (LICENSE)",
    'footer.built': "Создано с ♥ и",
    'footer.disclaimer': "Неофициальное приложение. Не связано с Watch Tower Bible and Tract Society / JW.org.",
  },
};

/* ============================================================
   2. PAGE LANGUAGE AND PREFERENCES
   ============================================================ */

function readPreference(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Preferences still apply for the current page.
  }
}

const currentLang = document.documentElement.lang === 'en' ? 'en' : 'ru';

/* ============================================================
   3. THEME ENGINE
   ============================================================ */

/** Detect saved theme or fall back to 'auto'. */
function detectTheme() {
  return readPreference('cerastilo-theme') || 'auto';
}

/** Apply a theme ('light', 'dark', or 'auto') to the root element. */
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'auto') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', theme);
  }
}

/** Toggle between light and dark (never 'auto' via manual toggle). */
function toggleTheme() {
  const stored = document.documentElement.dataset.theme;
  let next;
  if (stored === 'dark') {
    next = 'light';
  } else if (stored === 'light') {
    next = 'dark';
  } else {
    // auto — check actual rendered scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    next = prefersDark ? 'light' : 'dark';
  }
  writePreference('cerastilo-theme', next);
  applyTheme(next);
}

function initTheme() {
  applyTheme(detectTheme());
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', toggleTheme);
}

/* ============================================================
   4. MOBILE NAV
   ============================================================ */
function initMobileNav() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!hamburger || !mobileMenu) return;

  const labels = translations[currentLang];

  function setMenuOpen(isOpen) {
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', labels[isOpen ? 'nav.menuClose' : 'nav.menu']);
    mobileMenu.classList.toggle('is-open', isOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  hamburger.addEventListener('click', () => {
    setMenuOpen(hamburger.getAttribute('aria-expanded') !== 'true');
  });

  // Close when a link is clicked
  mobileMenu.querySelectorAll('.mobile-menu__link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      hamburger.focus();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) closeMenu();
  });
}

/* ============================================================
   5. FOOTER YEAR
   ============================================================ */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   6. FEATURE TABS
   ============================================================ */
function initFeatureTabs() {
  const tabs = Array.from(document.querySelectorAll('.feat-tab'));
  const panels = Array.from(document.querySelectorAll('.feat-row[data-feat-panel]'));
  if (!tabs.length || !panels.length) return;

  function activateTab(index, focusTab = false) {
    tabs.forEach((tab, idx) => {
      const active = idx === index;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.setAttribute('tabindex', active ? '0' : '-1');
      if (active && focusTab) tab.focus();
    });
    panels.forEach((panel, idx) => {
      panel.classList.toggle('is-active', idx === index);
    });
  }

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => activateTab(idx));
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        activateTab((idx + 1) % tabs.length, true);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        activateTab((idx - 1 + tabs.length) % tabs.length, true);
      }
    });
  });

  activateTab(0);
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initFeatureTabs();
  initFooterYear();
  document.documentElement.classList.add('js');
});
