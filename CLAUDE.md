# UVR — Український військовий рух

Vue 3 + TypeScript web application for Ukrainian volunteer coordination. Ukrainian is the default UI language.

## Commands

```bash
npm run dev       # Vite dev server at http://localhost:5173
npm run build     # vue-tsc type-check + vite build
npm run lint      # ESLint fix
npm run format    # Prettier fix
npm run cc        # Hygen component generator (MANDATORY for new components)
```

## Stack

| Layer | Library |
|-------|---------|
| Framework | Vue 3.3 Composition API (`<script setup>`) |
| Build | Vite 5 |
| Language | TypeScript 5.3 strict mode |
| Styling | Tailwind CSS 3 + SCSS (scoped) |
| HTTP | Axios → Supabase Edge Functions (`/functions/v1/`) |
| Async state | `async-source` library |
| Forms | VeeValidate 4 + Yup |
| i18n | vue-i18n 9 (uk default, en fallback) |
| Routing | Vue Router 4 |
| Events | mitt (event bus) |
| Icons | Heroicons, Font Awesome |
| Maps | vue3-svg-map + @svg-maps/ukraine |

**Path alias:** `~/*` → `./src/*` (configured in `tsconfig.json` and `vite.config.ts`)

---

## Component Architecture — Atomic Design

All components live in `src/components/` grouped by level:

```
src/components/
├── atoms/      # prefix a-   basic building blocks
├── molecules/  # prefix m-   groups of atoms
├── organisms/  # prefix o-   complex page sections
└── pages/      # prefix p-   full route components
```

### Composition rules
- **Atoms** — only HTML elements, Vue directives, composables
- **Molecules** — atoms + HTML + composables
- **Organisms** — atoms + molecules + HTML + composables
- **Pages** — all of the above

### Mandatory folder structure
Every component **must** have exactly two files:

```
a-button/
├── a-button.vue
└── index.ts        ← export { default } from './a-button.vue';
```

No exceptions — the `index.ts` is required.

### Creating components
**Always use Hygen**, never create files manually:

```bash
npm run cc
```

### Importing components
Always import the directory (resolves to `index.ts`), never the `.vue` file directly:

```typescript
// ✅ correct
import AButton from '~/components/atoms/a-button';
import MFormField from '~/components/molecules/m-form-field';
import OHeader from '~/components/organisms/o-header';

// ❌ wrong
import AButton from '~/components/atoms/a-button/a-button.vue';
```

### Template usage
PascalCase component names in templates:

```vue
<AButton @click="handleClick">Submit</AButton>
<MFormField v-model="email" label="Email" />
```

### Props and emits pattern
```vue
<script setup lang="ts">
interface Props {
  modelValue: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'submit': []
}>()
</script>
```

---

## API Service Layer

### Centralized Axios client
`src/services/api/api-client.ts` — single Axios instance. **Never create another axios instance.**

- Reads `VITE_API_BASE_URL` from env (Supabase base URL)
- Injects `Authorization: Bearer <token>` from `localStorage.getItem('token')`, falls back to Supabase anon key
- 401 response: removes token from localStorage

### Service files
One file per domain in `src/services/api/`:

```
auth-api-service.ts
projects-api-service.ts
regions-api-service.ts
news-api-service.ts
home-api-service.ts
team-api-service.ts
categories-api-service.ts
upload-api-service.ts
```

Never call `apiClient` directly from components — always through a service function.

### URL constants
All endpoints are string constants in `src/constants/url-constants.ts`. Import them in service files:

```typescript
import { FUNCTIONS_V1_PUBLIC_PROJECTS } from '~/constants/url-constants';

export async function fetchPublicProjects() {
  const response = await apiClient.get(FUNCTIONS_V1_PUBLIC_PROJECTS);
  return response.data;
}
```

### AsyncSource — reactive async state

Wrap every API service function with `AsyncSource` for automatic loading/error state:

```typescript
import AsyncSource from 'async-source';
import { reactive, computed } from 'vue';
import { fetchPublicProjects } from '~/services/api/projects-api-service';
import { handleApiError } from '~/services/notification-service';

const projectsSource = reactive(new AsyncSource(fetchPublicProjects, handleApiError));

const isLoading = computed(() => projectsSource.isLoading);
const projects = computed(() => projectsSource.data?.data.projects ?? []);

function load() {
  projectsSource.push(onSuccess);
}
```

Always use `reactive()` on the `AsyncSource` instance — without it Vue won't track changes.

### Shared AsyncSource
For data shared across multiple components use `getSharedAsyncSource` / `removeSharedAsyncSource` from `src/services/async-source-service.ts`:

```typescript
import { getSharedAsyncSource, removeSharedAsyncSource } from '~/services/async-source-service';
import { onBeforeUnmount } from 'vue';

const SOURCE_KEY = 'homeData';
const source = getSharedAsyncSource(SOURCE_KEY, fetchHomeData, handleApiError);

onBeforeUnmount(() => removeSharedAsyncSource(SOURCE_KEY));
```

### Error handling
Always use the centralized helpers from `src/services/notification-service.ts`:

```typescript
import { handleApiError, notifySuccess, notifyError } from '~/services/notification-service';
```

---

## State Management — Composables

No Pinia or Vuex. State lives in module-level `ref`/`reactive` variables inside composable files.

### Convention
- `src/composables/use-<domain>-store.ts` — global/shared state (e.g., `use-user-store.ts`, `use-home-store.ts`)
- `src/composables/use-<feature>.ts` — local feature logic (e.g., `use-registration-form.ts`)

### Pattern
```typescript
// module-level — shared across all consumers of this composable
const user = ref<User | null>(null);
const isAuthenticated = ref(false);

export function useUserStore() {
  // computed + methods that read/write module state

  return {
    user: readonly(user),          // expose readonly
    isAuthenticated: readonly(isAuthenticated),
    login,
    logout,
  };
}
```

### Event bus
Use the mitt-based event bus for cross-component communication (modals, auth flow):

```typescript
import { useEventBus } from '~/composables/use-event-bus';
import { EVENTS } from '~/constants/event-bus-constants';

const { BUS } = useEventBus();

BUS.emit(EVENTS.SHOW_LOGIN_MODAL);
BUS.on(EVENTS.SUCCESS_LOGIN, handleLoginSuccess);
```

Event names are constants in `src/constants/event-bus-constants.ts`.

---

## Routing

### Route constants
All routes are defined in `src/constants/router-constants.ts`:

```typescript
export const ROUTE_NAMES = {
  HOME: 'HOME',
  PROGRAMS: 'PROGRAMS',
  PROGRAM_DETAIL: 'PROGRAM_DETAIL',
  REGION_DETAILS: 'REGION_DETAILS',
} as const;

export const ROUTES: RouteRecordRaw[] = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    component: () => import('~/components/pages/p-home'),   // lazy, directory import
  },
  {
    path: '/programs/:slug',
    name: ROUTE_NAMES.PROGRAM_DETAIL,
    component: () => import('~/components/pages/p-program-detail'),
    props: true,
  },
];
```

Route names: `SCREAMING_SNAKE_CASE`. Paths: `kebab-case`. Always lazy-load with `() => import(...)`.

### Navigation
```typescript
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from '~/constants/router-constants';

const router = useRouter();
router.push({ name: ROUTE_NAMES.PROGRAMS });                        // ✅
router.push({ name: ROUTE_NAMES.PROGRAM_DETAIL, params: { slug } }); // ✅
router.push('/programs');                                            // ❌ no hardcoded paths
```

### Protected routes
```typescript
{
  path: '/leadership',
  name: ROUTE_NAMES.LEADERSHIP,
  component: () => import('~/components/pages/p-leadership'),
  meta: {
    requiresAuth: true,
    permissions: [Permission.VIEW_ACTIVE_PROJECTS],
  },
}
```

---

## i18n / Translations

Default locale: **Ukrainian (`uk`)**. Fallback: English (`en`).

### Composable
Always use `useTranslation()`, never import `useI18n()` directly:

```typescript
import { useTranslation } from '~/composables/use-translation';

const { t, T_KEYS } = useTranslation();
```

### Translation key constants
All keys are exported from `src/constants/translation-keys.ts` as `T_KEYS`. Never hardcode key strings:

```vue
<!-- ✅ -->
<button>{{ t(T_KEYS.COMMON.BUTTONS.SEND) }}</button>

<!-- ❌ -->
<button>{{ t('common.buttons.send') }}</button>
```

### Adding new translations
1. Add the constant to `src/constants/translation-keys.ts`
2. Add the value to `src/i18n/locales/en.json`
3. Add the value to `src/i18n/locales/uk.json`

---

## Constants & Enums

Everything goes in `src/constants/`. File names: `kebab-case-constants.ts`.

| Type | Case | Example |
|------|------|---------|
| Primitive constants | `SCREAMING_SNAKE_CASE` | `MAX_FILE_SIZE_MB` |
| Enums | `PascalCase` | `UserCategory`, `ApplicationStatus` |
| Maps / lookup objects | `camelCase` | `statusLabels`, `categoryColors` |

Always use `as const` on object/array constants:

```typescript
export const ALLOWED_IMAGE_TYPES = ['jpg', 'png', 'webp'] as const;

export const STATUS_LABELS = {
  [ApplicationStatus.PENDING]: 'На розгляді',
  [ApplicationStatus.APPROVED]: 'Схвалено',
} as const;
```

Enums belong in `src/constants/`, **not** inside interface or type files.

Key constant files:
- `url-constants.ts` — API endpoint strings
- `router-constants.ts` — route names and `ROUTES` array
- `permission-constants.ts` — `Permission` enum and role mappings
- `event-bus-constants.ts` — `EVENTS` object (mitt event names)
- `translation-keys.ts` — `T_KEYS` object
- `status-constants.ts` — status enums + label maps
- `geographic-constants.ts` — `UkraineRegion` enum, region labels, cities
- `validation-constants.ts` — regex patterns, length limits, error messages
- `navigation-constants.ts` — navigation menu items

---

## Styling

### Strategy
1. **Tailwind utility classes** — primary approach
2. **SCSS scoped styles** — `<style lang="scss" scoped>` in every component
3. Mix both with `@apply` inside SCSS blocks

### Custom theme (tailwind.config.js)
- Colors: `primary` (blue-based), `secondary` (#1A1A1A), extended `red/green/yellow/blue/gray`
- Fonts: `sans` (Inter), `heading` (Montserrat)
- Custom sizes: `display-1`, `display-2`, `h1`–`h6`
- CSS custom properties auto-generated for all colors (usable as `var(--color-primary-500)`)

### BEM class names
Class names mirror the component prefix:

```scss
// a-button.vue
.a-button { }
.a-button.variant-primary { }
.a-button.size-md { }
.a-button.is-loading { }
```

### Dynamic styles
```scss
// v-bind() for reactive CSS values
.o-ukraine-map :deep(.region) {
  fill: v-bind('props.defaultColor');
}
```

### Child component overrides
Use `:deep()` (not `>>>` or `/deep/`):

```scss
:deep(.vue3-svg-map .region) {
  stroke: #1976d2;
}
```

---

## TypeScript Conventions

- Strict mode, no unused vars/params (`tsconfig.json`)
- `~/*` alias for all `src/` imports
- **Interfaces** (API shapes, component props shapes) → `src/interfaces/`
- **Type aliases, declaration files** → `src/types/`
- **Enums** → `src/constants/` (never in interface files)
- Composable return types should be annotated explicitly
- API response types follow `{ success: boolean; data: T; message?: string }`

---

## Project-Specific Features

### Ukraine SVG map
- Component: `src/components/organisms/o-ukraine-map/`
- Library: `vue3-svg-map` + `@svg-maps/ukraine`
- SVG region IDs → backend region IDs: `src/utils/region-mapping.ts`
- Region name constants (UA/EN): `src/constants/geographic-constants.ts` (`UkraineRegion` enum, `UKRAINE_REGION_LABELS`)
- Hover tooltip: `src/components/molecules/m-map-tooltip/` (fixed positioning, viewport-aware)

### Region details page
- Route: `/regions/:region_id` → `p-region-details`
- Tabs: Leadership, News, Contacts
- Data normalization: `src/utils/regions-normalizers.ts` (`normalizeLeadership()`)
- API: `src/services/api/regions-api-service.ts`

### Multi-step registration
- 5 steps: `m-registration-step-one` … `m-registration-step-five`
- Logic composables: `use-registration-form.ts`, `use-registration-data.ts`, `use-registration-validation.ts`
- Submission: multipart/form-data with document uploads via `upload-api-service.ts`

### Permissions
- Enum: `Permission` in `src/constants/permission-constants.ts`
- Roles: User, Coordinator, Moderator, Admin
- Runtime check: `usePermissions()` composable
- Route-level guard: `meta.permissions` array checked in `router.beforeEach`

### Auth flow
- Token stored in `localStorage` key `token`
- `useUserStore()` composable manages auth state globally
- Events: `EVENTS.SUCCESS_LOGIN`, `EVENTS.LOGOUT`, etc. trigger modal close / redirect

---

## Directory Reference

```
src/
├── components/
│   ├── atoms/          a-* components
│   ├── molecules/      m-* components
│   ├── organisms/      o-* components
│   └── pages/          p-* route components
├── composables/        use-*.ts composables (state + logic)
├── constants/          all enums, maps, string constants
├── interfaces/         TypeScript interfaces (API/domain shapes)
├── types/              TypeScript type aliases and .d.ts files
├── services/
│   ├── api/            one service file per domain + api-client.ts
│   ├── async-source-service.ts
│   └── notification-service.ts
├── router/             index.ts (imports ROUTES from constants)
├── i18n/
│   └── locales/        en.json, uk.json
├── utils/              pure transformation functions
├── directives/         custom Vue directives
├── assets/             images, global CSS, SCSS variables
└── main.ts
```
