## Введение

В Google Apps Script нужно писать на языке Google Script (Java Script).

Что если ты хочешь писать на языке TypeScript?

Через команду `claps push` можно загрузить файлы (`appsscript.json`, `*.html`, `*.ts`) на Google Apps Script.
Команда `claps push` преобразует файл `*.ts` в `*.gs`.

## Установка

**Установка NodeJS**

```bash
sudo apt update && sudo apt install curl

curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash

sudo apt install -y nodejs
```

**Установка yarn**

```bash
sudo npm i -g yarn
```

**Установка make**

```bash
sudo apt update && sudo apt install make
```

**Установка git**

```bash
sudo apt update && sudo apt install git
```

**Клонирование репозитория**

```bash
ssh-keygen # Enter, Enter, Enter

cat ~/.ssh/id_rsa.pub # копируем и вставляем ключ сюда https://github.com/settings/ssh/new

git clone git@github.com:Pavel-Innokentevich-Galanin/GoogleAppsScript_TypeScript.git

cd GoogleAppsScript_TypeScript
```

**Установка пакетов**

```bash
yarn
```

## Разработка

Создаём проект на https://script.google.com/home

Попадем на адрес, с которого копируем `scriptId`:

```
https://script.google.com/home/projects/ТУТ_ИД/edit
```

В файле `.clasp.json` поменяй значение `scriptId` на своё.

```bash
make cpEnv  # копируем файл env (src/env.html.example -> src/env.html) 
yarn        # устанавливаем пакеты
make login  # входим в Google аккаунт
make watch  # отслеживание кода и автоматическая отправка на Google Apps Script
```

Открыть проект в браузере

```bash
make open
```

## Развёртывание

```bash
yarn clasp push # y
yarn clasp deploy --description "v1"
```

Подставляем ид в ссылку. Теперь можем стучаться по GET и POST

```
https://script.google.com/macros/s/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec
```

> Первый раз нужно будет дать права на скрипт.
>
> Открой скрипт:
>
> ```bash
> yarn clasp open
> ```
> 
> Выполни функцию main, нажав кнопку "Выполнить"
>
> Появится окно о подтверждении выдачи прав.

Удаление не нужных deployments

```bash
yarn clasp deployments # смотрим id deployments
yarn clasp undeploy xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
yarn clasp deployments
```

## Дерево папок и файлов

```bash
sudo apt update && sudo apt install tree
tree --charset ascii -a -I ".git|node_modules"
```

```bash
.
|-- .clasp.json             # настройки Google clasp
|-- .gitignore              # что игнорировать Git
|-- LICENSE                 # лицензия репозитория
|-- Makefile                # файл со скриптами
|-- package.json            # файл с зависимостями npm пакетов
|-- .prettierignore         # какие файлы игнорировать Prettier
|-- .prettierrc.json        # настройки Prettier
|-- README_bash_histoty.md  # история команд
|-- README.md               # файл обязательный для прочтения
|-- src                     # папка с кодом для Google Apps Script
|   |-- appsscript.json     # настройки Google Apps Script
|   |-- Code.ts             # файл с кодом Type Script, который станет Google Script
|   |-- env.html            # файл секретов, который попадет на Google Apps Script (игнорируется Git'ом)
|   `-- env.html.example    # копия файла секретов (не игнорируется Git'ом)
`-- yarn.lock               # пакеты для установки yarn

1 directory, 14 files
```

## Список использованных источников

1. Apps Script: Google CLASP (Command Line Apps Script Project) NEW TOOL - YouTube [Electronic resource]
Mode of access: https://www.youtube.com/watch?v=kcnxP-x-6s8.
Date of access: 17.03.2023.

1. CLASP Tutorial  - Google Apps Script - How to Install CLASP - YouTube [Electronic resource]
Mode of access: https://www.youtube.com/watch?v=4Qlt3p6N0es.
Date of access: 17.03.2023.
