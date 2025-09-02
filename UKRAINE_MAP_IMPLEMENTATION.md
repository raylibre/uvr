# Интерактивная карта Украины - Реализация (Обновлено)

## Обновление: Переход на vue3-svg-map

### ✅ Установка совместимых зависимостей
```bash
npm install vue3-svg-map @svg-maps/ukraine
```

### ⚠️ Проблема с vue-svg-map
Оригинальная `vue-svg-map` НЕ совместима с Vue 3 из-за изменений в архитектуре (проблема с $createElement).

### ✅ Решение: vue3-svg-map
Используем `vue3-svg-map` + `@svg-maps/ukraine` для официальных данных карты Украины.

## Описание

Добавлена новая секция "Наша Структура" с интерактивной SVG картой Украины, которая показывает структуру организации по всей стране.

## Функциональность

### Основные возможности

1. **Интерактивная карта Украины**
   - 27 административных единиц Украины (официальные данные)
   - Hover эффекты с анимацией
   - Клик по областям для навигации
   - Tooltips с названиями областей на украинском языке
   - Адаптивный дизайн

2. **Секция структуры организации**
   - Заголовок и описание
   - Интерактивная карта
   - Дополнительная информация с карточками
   - Современный дизайн с градиентами

### Технические детали

#### Компоненты

1. **`OUkraineMap`** (`src/components/organisms/o-ukraine-map/`)
   - Использует `vue3-svg-map` с официальными данными `@svg-maps/ukraine`
   - Composition API (script setup) с TypeScript
   - Props для кастомизации цветов
   - События клика и hover
   - Tooltips с названиями областей
   - Адаптивный дизайн
   - Плавные анимации и переходы

2. **`OOrganizationStructureSection`** (`src/components/organisms/o-organization-structure-section/`)
   - Секция со структурой организации
   - Интегрирует карту Украины
   - Дополнительные информационные карточки

#### Стилизация

- Использование Tailwind CSS
- Плавные переходы и анимации
- Responsive дизайн
- Hover эффекты с подсветкой
- Градиентные фоны

## Использование

### Props компонента OUkraineMap

```vue
<OUkraineMap
  :default-color="'#e3f2fd'"
  :hover-color="'#2196f3'"
  :selected-color="'#4caf50'"
  :clickable="true"
  :selected-region="selectedRegionId"
  @region-click="handleRegionClick"
  @region-hover="handleRegionHover"
/>
```

#### Props

- `defaultColor` (string) - цвет областей по умолчанию
- `hoverColor` (string) - цвет областей при hover
- `selectedColor` (string) - цвет выбранной области
- `clickable` (boolean) - возможность клика по областям
- `selectedRegion` (string | null) - ID выбранной области

#### Events

- `regionClick` - событие клика по области `(regionId: string, regionName: string)`
- `regionHover` - событие hover по области `(regionId: string, regionName: string)`

### Интеграция в главную страницу

Секция добавлена в `p-home.vue` после hero-section:

```vue
<template>
  <div class="p-home">
    <OHeroSection />
    
    <OOrganizationStructureSection
      @region-click="handleRegionClick"
      @region-hover="handleRegionHover"
    />
    
    <!-- остальные секции -->
  </div>
</template>
```

## Структура файлов

```
src/
├── types/
│   └── svg-maps.d.ts (типы TypeScript)
├── components/
│   └── organisms/
│       ├── o-ukraine-map/
│       │   ├── o-ukraine-map.vue (обновлен для vue3-svg-map)
│       │   └── index.ts
│       └── o-organization-structure-section/
│           ├── o-organization-structure-section.vue
│           └── index.ts
└── components/pages/p-home/
    └── p-home.vue (обновлен)
```

## Области Украины

Карта использует официальные данные из `@svg-maps/ukraine` и включает все 27 административно-территориальных единиц:

### Английские ID (из @svg-maps/ukraine) → Украинские названия:
1. `cherkaska` → Черкаська область
2. `chernihivska` → Чернігівська область  
3. `chernivetska` → Чернівецька область
4. `dnipropetrovska` → Дніпропетровська область
5. `donetska` → Донецька область
6. `ivano-frankivska` → Івано-Франківська область
7. `kharkivska` → Харківська область
8. `khersonska` → Херсонська область
9. `khmelnytska` → Хмельницька область
10. `kirovohradska` → Кіровоградська область
11. `kyiv` → м. Київ
12. `kyivska` → Київська область
13. `luhanska` → Луганська область
14. `lvivska` → Львівська область
15. `mykolaivska` → Миколаївська область
16. `odeska` → Одеська область
17. `poltavska` → Полтавська область
18. `rivnenska` → Рівненська область
19. `sevastopol` → м. Севастополь
20. `sumska` → Сумська область
21. `ternopilska` → Тернопільська область
22. `vinnytska` → Вінницька область
23. `volynska` → Волинська область
24. `zakarpatska` → Закарпатська область
25. `zaporizka` → Запорізька область
26. `zhytomyrska` → Житомирська область
27. `avtonomna-respublika-krym` → Автономна Республіка Крим

## Навігація

При клике на область происходит переход на страницу программ (`/programs`). В будущем можно реализовать отдельные страницы для каждого региона.

## Адаптивность

- Карта адаптируется под размер экрана
- На мобильных устройствах уменьшена толщина границ
- Tooltips адаптированы для touch-устройств
- Секция полностью responsive

## Анимации

1. **Fade-in эффекты** при загрузке секции
2. **Hover анимации** для областей карты
3. **Pulse glow эффект** для выделенных областей
4. **Scale трансформации** для информационных карточек
5. **Selected glow эффект** для выбранной области

## Возможности для расширения

1. **Региональные страницы** - создание отдельных страниц для каждой области
2. **Статистика по регионам** - отображение данных о деятельности в каждом регионе
3. **Фильтрация карты** - возможность показывать только определенные области
4. **Темы оформления** - различные цветовые схемы карты
5. **Интеграция с API** - загрузка данных о региональных офисах

## TypeScript Support

Добавлены типы для vue3-svg-map и @svg-maps/ukraine в `src/types/svg-maps.d.ts`:

```typescript
declare module '@svg-maps/ukraine' {
  interface Location {
    id: string
    name: string
    path: string
    [key: string]: any
  }

  interface MapData {
    name: string
    id: string
    viewBox: string
    locations: Location[]
  }

  const Ukraine: MapData
  export default Ukraine
}

declare module 'vue3-svg-map' {
  import { DefineComponent } from 'vue'

  export const SvgMap: DefineComponent<{
    map: any
    locationClass?: (location: any, index: number) => string
  }>
}
```

## Поддержка браузеров

- Современные браузеры с поддержкой SVG
- IE11+ (с полифиллами для CSS Grid)
- Мобильные браузеры

## Производительность

- Официальная SVG карта от @svg-maps/ukraine
- Vue 3 совместимость через vue3-svg-map
- Efficient event handling
- CSS анимации вместо JavaScript
- Lazy loading компонентов

## Преимущества нового решения

✅ **vue3-svg-map**:
- Полная совместимость с Vue 3
- Официальные данные карты Украины
- TypeScript поддержка
- Современная архитектура
- Регулярные обновления

❌ **Старое решение (vue-svg-map)**:
- Несовместимо с Vue 3
- Проблемы с $createElement
- Отсутствие обновлений 