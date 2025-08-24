// such a mess to be honest, i should make something else instead of this garbage
let langs = {
    en: [
        "Start", "Programs", "Documents", "Settings", "Search", "Help", "Run...", "Suspend", "Shut Down...",
        "Notepad", "File", "Edit", "Search", "Help",
        "Shut Down Windows", "OK", "Cancel", "It is now safe to turn off your computer",
        "Yes", "No",
        "Are you sure you want to:", "Shut down the computer?", "Restart the computer?", "Restart the computer in MS-DOS mode?", "Close all programs and log on as a different user?",
        "Accessories", "Autorun", "Explorer", "MS-DOS Prompt", "Control panel", "Printers", "Taskbar", "(None)",
        "Apply", "Display Properties", "Background",
        "Screen Saver", "Appearance", "Settings", "Browse", "Browse...",
        "Pattern", "Wallpaper", "Black Thatch", "Blue Rivets", "Bubbles", "Carved Stone", "Circles", "Clouds", "Forest", "Gold Weave", "Houndstooth", "Metal Links", "Pinstripe", "Red Blocks", "Sandstone", "Setup", "Stitches", "Straw Mat", "Tiles", "Triangles", "Waves",
        "Display:", "Tile", "Center",
        "Arrange Icons", "Line up Icons", "Paste", "Paste Shortcut", "New", "Properties", "Please wait while your computer shuts down.",
        "Games", "Internet Tools", "System Tools", "Multimedia",
        "Enter a URL-address:",
        "My Computer", "Paint", "WordPad", "Calculator", "Character Map", "Dial-Up Networking", "Network Cable Connection", "HyperTerminal", "Imaging", "Online Registration", "Phone Dialer",
        "[?] is not accessible.\n\nThe device is not ready.", "Retry",
        "Start Menu", "Desktop",
        "Copyright Microsoft Corp", "Invalid directory", "Bad command or file name", "Required parameter missing",
        "Minesweeper", "Game", "New", "Beginner", "Intermediate", "Expert", "Custom...", "Custom Field", "Width:", "Height:", "Mines:", "Marks (?)", "Color", "Best Times...", "Exit"
    ],
    ru: [
        "Пуск", "Программы", "Документы", "Настройка", "Поиск", "Справка", "Выполнить", "Остановка", "Завершение работы...",
        "Блокнот", "Файл", "Правка", "Поиск", "?",
        "Завершение работы с Windows", "ОК", "Отмена", "Теперь питание компьютера можно отключить",
        "Да", "Нет",
        "Сейчас следует:", "Выключить компьютер", "Перезагрузить компьютер", "Перезагрузить компьютер в режиме эмуляции MS-DOS", "Войти в систему под другим именем",
        "Стандартные", "Автозагрузка", "Проводник", "Сеанс MS-DOS", "Панель управления", "Принтеры", "Панель задач", "(Нет)",
        "Применить", "Свойства: Display", "Фон",
        "Заставка", "Оформление", "Параметры", "Обзор", "Обзор...",
        "Фоновый узор", "Рисунок", "Паркет", "Заклёпки", "Пузырьки", "Орнамент", "Колечки", "Облака", "Лес", "Чешуя", "Клыки", "Кольчуга", "Полоски", "Красные блоки", "Наждак", "Установка", "Стежки", "Циновка", "Плитка", "Треугольники", "Волны",
        "Поместить:", "Размножить", "В центре",
        "Упорядочить значки", "Выстроить значки", "Вставить", "Вставить ярлык", "Создать", "Свойства",
        "Подождите, идёт подготовка к выключению компьютера.",
        "Игры", "Средства Internet", "Служебные программы", "Мультимедиа",
        "Введите URL-адрес:",
        "Мой компьютер", "Графический редактор Paint", "Текстовый редактор WordPad", "Калькулятор", "Таблица символов", "Удалённый доступ к сети", "Прямое соединение", "Программа связи", "Просмотр рисунков", "Интерактивная регистрация", "Номеронабиратель",
        "Нет доступа к '[?]'.\n\nУстройство не готово.", "Повтор",
        "Главное меню", "Рабочий стол",
        "Корпорация Microsoft", "Каталог задан неверно", "Имя команды или файла указано неверно", "Опущен обязательный параметр",
        "Сапёр", "Игра", "Новая игра", "Новичок", "Любитель", "Профессионал", "Настройка...", "Размер игрового поля", "Ширина:", "Высота:", "Число мин:", "Метки (?)", "Чемпионы...", "Выход"
    ],
};

let currentLang = langs[Intl.DateTimeFormat().resolvedOptions().locale.split("-")[0]] ? langs[Intl.DateTimeFormat().resolvedOptions().locale.split("-")[0]] : langs["en"];