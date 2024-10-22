# Формы

Используется библиотека - [informed](https://joepuzzo.github.io/informed/?path=/story/introduction--getting-started)

## Cоздание своей формы

- Создайте класс (Например `DetailsForm`)
- Отнаследуйте его от `FormBase` (вы получите состояние формы и вспомогательные методы)
- `FormBase` ничего не знает об библиотеке [informed](https://joepuzzo.github.io/informed/?path=/story/introduction--getting-started)
- Метод `submit` в `FormBase` - Шаблонный метод
- Переопряделять `submit` не надо, просто передайте `this.submit` в `buildSubmit` билдера
- Только одна операция в `submit` обязательна для переопределения - `makeSubmitRequest`

## Построение формы

- Найдите подходящий `FormBuilder` (класс наследник `FormBuilderBase`)
- Конкретный builder знает об [informed](https://joepuzzo.github.io/informed/?path=/story/introduction--getting-started)
- Если подходящего `FormBuilder-a` нет, создайте свой (должен быть подклассом `FormBuilderBase`)
- Переопределите метод `createForm`
- Вызывайте методы построения элементов GUI (`buildInput`, `buildAutocomplete` и т.п)
- Верните в конце метода `createForm` `builder.getForm()`
- Вызовите `buildForm`
