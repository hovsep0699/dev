# Diflow React

## Работа с проектом

Для установки нужен Node v10.14.0+ и Yarn v1.0+.

Установка:

```shell
yarn
```

Разработка:

```shell
yarn start
```

Сборка:

```shell
yarn build
```

### Описание команд

- `start`: делает предварительную сборку проектов `components` и `core` для использования в `app` и начитает слежение за файлами в режиме разработки.
- `start:tektorg`: делает то же, что и `start`, только для Tektorg. Для одновременной работы скрипты вызываются через модуль `concurrently`, так как название скрипта в `app` не `start`.
- `build`: вызывает скрипт `build` во всех проектах, копирует из `packages/app` содержимое папки `dist` в корень проекта в папку `build/[bundle]` и удаляет `dist`.
- `build:app`: собирает проект `app` - стандарную версию и Tektorg.
- `build:dependencies`: в `components` и `core` очищает старые файлы и компилирует новые.
- `clean`: удаляет вспомогательные файлы Typescript и папку `dist` во всех проектах.
- `clean:dependencies`: удаляет `node_modules` во всех проектах, кроме корневого.
- `test`: запустить тесты.
- `lint`: проверить на лексические ошибки.
- `storybook`: собрать и запустить Storybook.
- `analyze`: анализ кода.

## Сделать релиз

1. В React

   1. Установить зависимости: `yarn`.
   2. Уточнить номер последней версии: `git describe --abbrev=0`.
   3. Если релиз major или minor (подробнее про [Semantic versioning](https://docs.npmjs.com/about-semantic-versioning)):
      1. Создать новую ветку. В качестве названия использовать новый номер версии сборки. Например: `1.4`.
      2. Поменять ветку в `allowBranch` в `lerna.json`.
      3. Запушить: `git push`.
   4. Собрать проект через `yarn build` и закомитить с названием вида `v1.4.0`.
   5. Выполнить `npx lerna version --amend`. C `--amend` Lerna обновит текущий commit и сделает tag с названием вида `v1.4.0`.
      > Когда проект будет собираться через CI, `--amend` можно опустить и Lerna будет создавать commit и tag, и делать push автоматически.
   6. Сделать `git push` и `git push --tags`.
   7. Удалить ветку `1.4-build`: `git push origin --delete 1.4-build`
   8. Cоздать её заново и запушить в удалённый репозиторий.

## Структура

```
.
├── ...
├── packages
│   ├── app              # Основное React приложение
│   ├── components       # Компоненты и Storybook
│   └── core             # Логика
├── composer.json        # Для обновления версий в Diflow Multi
└── ...
```

## Установка новых зависимостей

Для установки зависимостей в root (для всех проектов) нужен флаг `-W`:

```shell
yarn add awesome-package -W -D
```

Для установки зависимостей для пределенного проекта можно их установить в нем как обычно или из корня через:

```shell
yarn workspace @distate/app add react react-dom
```

## Иконки

В `components` все иконки хранятся в `src/icons`, в том числе как компоненты в `src/icons/components`. Для добавления или обновления иконок нужно выполнить:
В `components` все иконки хранятся в `src/icons`, в том числе как компоненты в `src/icons/components`. Для добавления или обновления иконок нужно выполнить:

```shell
yarn workspace @distate/components svgr
```

После этого нужно их импортировать в `src/icons/index.js` и использовать как обычные компоненты во всех проектах.

В `app` иконки импортируются как обычные компоненты из `@distate/components`. Так же можно импортировать новые через [CRA](https://create-react-app.dev/docs/adding-images-fonts-and-files#adding-svgs):

```js
import { ReactComponent as IconAgenda } from '@distate/components/dist/agenda.svg';
```

## Husky

При каждом коммите в ветках не указанных в `BRANCHES_TO_SKIP` в файле `prepare-commit-msg.sh` будет добавляться название ветки к сообщению коммита вида `[ABC-123]`. Если прописать название ветки вручную, то второй раз оно **не** добавится.

Сделать скрипт исполняемым:

```shell
chmod u+x ./scripts/prepare-commit-msg.sh
```
