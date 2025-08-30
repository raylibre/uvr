<template>
  <div class="a-form-datepicker" data-at="form-datepicker">
    <label v-if="label" :for="id" class="label">
      {{ label }}
      <span v-if="required" class="label__required">*</span>
    </label>

    <div class="datepicker-wrapper">
      <div v-if="icon" class="datepicker-icon">
        <i :class="[icon, 'datepicker-icon__icon']"/>
      </div>

      <input
        :id="id"
        :value="formattedValue"
        type="text"
        :placeholder="placeholder || 'dd.mm.yyyy'"
        :required="required"
        :disabled="disabled"
        readonly
        class="datepicker-input"
        :class="{
          'has-icon': icon,
          'has-error': error,
          'is-disabled': disabled
        }"
        v-bind="$attrs"
        @click="toggleDatepicker"
        @blur="$emit('blur', $event)"
      />

      <div class="datepicker-calendar-icon">
        <i class="datepicker-calendar-icon__icon fas fa-calendar"/>
      </div>
    </div>

    <!-- Datepicker Modal -->
    <div 
      v-if="isOpen" 
      class="datepicker-modal"
      @click.self="closeDatepicker"
    >
      <div class="datepicker-content">
        <div class="datepicker-header">
          <button 
            type="button"
            class="nav-button"
            @click="previousMonth"
          >
            <i class="fas fa-chevron-left"/>
          </button>
          <div class="month-year-container">
            <h3 class="month">{{ currentMonth }}</h3>
            <div class="year-selector">
              <button 
                type="button" 
                class="year" 
                @click="toggleYearSelector"
              >
                {{ currentYear }}
                <i class="fas fa-chevron-down ml-1" :class="{ 'rotate-180': showYearSelector }"/>
              </button>
              <div v-if="showYearSelector" class="year-dropdown">
                <div class="year-dropdown-content">
                  <button 
                    type="button"
                    class="year-nav-button"
                    @click="changeYearRange(-10)"
                  >
                    <i class="fas fa-chevron-up"/>
                  </button>
                  <div class="years-grid">
                    <button
                      v-for="year in availableYears"
                      :key="year"
                      type="button"
                      class="year-option"
                      :class="{ 'is-selected': year === currentYear }"
                      @click="selectYear(year)"
                    >
                      {{ year }}
                    </button>
                  </div>
                  <button 
                    type="button"
                    class="year-nav-button"
                    @click="changeYearRange(10)"
                  >
                    <i class="fas fa-chevron-down"/>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button 
            type="button"
            class="nav-button"
            @click="nextMonth"
          >
            <i class="fas fa-chevron-right"/>
          </button>
        </div>

        <div class="datepicker-calendar">
          <div class="weekdays">
            <div v-for="day in weekdays" :key="day" class="weekday">
              {{ day }}
            </div>
          </div>

          <div class="days">
            <button
              v-for="day in calendarDays"
              :key="`${day.month}-${day.date}`"
              type="button"
              class="day"
              :class="{
                'is-other-month': day.isOtherMonth,
                'is-today': day.isToday,
                'is-selected': day.isSelected
              }"
              @click="selectDate(day)"
            >
              {{ day.date }}
            </button>
          </div>
        </div>

        <div class="datepicker-footer">
          <button 
            type="button"
            class="cancel-button"
            @click="closeDatepicker"
          >
            {{ $t('common.datepicker.cancel') }}
          </button>
          <button 
            type="button"
            class="today-button"
            @click="selectToday"
          >
            {{ $t('common.datepicker.today') }}
          </button>
        </div>
      </div>
    </div>

    <p v-if="error" :id="`${id}-error`" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { UKRAINIAN_MONTHS, UKRAINIAN_DAYS_SHORT } from '../../../constants/datetime-constants';

interface CalendarDay {
  date: number;
  month: number;
  year: number;
  isOtherMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  fullDate: Date;
}

export default defineComponent({
  name: 'AFormDatepicker',

  inheritAttrs: false,

  props: {
    modelValue: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue', 'blur'],

  setup(props, { emit }) {
    const { locale } = useI18n();
    const isOpen = ref(false);
    const currentDate = ref(new Date());
    const showYearSelector = ref(false);
    const yearRangeStart = ref(Math.floor(currentDate.value.getFullYear() / 10) * 10);

    const weekdays = computed(() => {
      return locale.value === 'uk' 
        ? UKRAINIAN_DAYS_SHORT 
        : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    });
    
    const monthNames = computed(() => {
      return locale.value === 'uk' 
        ? UKRAINIAN_MONTHS 
        : ['January', 'February', 'March', 'April', 'May', 'June',
           'July', 'August', 'September', 'October', 'November', 'December'];
    });

    const formattedValue = computed(() => {
      if (!props.modelValue) return '';
      const date = new Date(props.modelValue);
      if (isNaN(date.getTime())) return '';

      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();

      return `${day}.${month}.${year}`;
    });

    const currentMonth = computed(() => {
      return monthNames.value[currentDate.value.getMonth()];
    });

    const currentYear = computed(() => {
      return currentDate.value.getFullYear();
    });

    const availableYears = computed(() => {
      const years = [];
      for (let i = 0; i < 10; i++) {
        years.push(yearRangeStart.value + i);
      }
      return years;
    });

    const currentMonthYear = computed(() => {
      return `${currentMonth.value} ${currentYear.value}`;
    });

    const calendarDays = computed((): CalendarDay[] => {
      const days: CalendarDay[] = [];
      const year = currentDate.value.getFullYear();
      const month = currentDate.value.getMonth();

      // Get first day of the month and how many days in month
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const firstDayWeekday = firstDay.getDay();
      const daysInMonth = lastDay.getDate();

      // Get previous month's last days
      const prevMonth = new Date(year, month - 1, 0);
      const daysInPrevMonth = prevMonth.getDate();

      for (let i = firstDayWeekday - 1; i >= 0; i--) {
        const date = daysInPrevMonth - i;
        const fullDate = new Date(year, month - 1, date);
        days.push({
          date,
          month: month - 1,
          year: year,
          isOtherMonth: true,
          isToday: isToday(fullDate),
          isSelected: isSelected(fullDate),
          fullDate
        });
      }

      // Current month days
      for (let date = 1; date <= daysInMonth; date++) {
        const fullDate = new Date(year, month, date);
        days.push({
          date,
          month,
          year,
          isOtherMonth: false,
          isToday: isToday(fullDate),
          isSelected: isSelected(fullDate),
          fullDate
        });
      }

      // Next month's first days
      const totalCells = 42; // 6 rows × 7 days
      const remainingCells = totalCells - days.length;

      for (let date = 1; date <= remainingCells; date++) {
        const fullDate = new Date(year, month + 1, date);
        days.push({
          date,
          month: month + 1,
          year: year,
          isOtherMonth: true,
          isToday: isToday(fullDate),
          isSelected: isSelected(fullDate),
          fullDate
        });
      }

      return days;
    });

    const isToday = (date: Date): boolean => {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    };

    const isSelected = (date: Date): boolean => {
      if (!props.modelValue) return false;
      const selectedDate = new Date(props.modelValue);
      if (isNaN(selectedDate.getTime())) return false;
      return date.toDateString() === selectedDate.toDateString();
    };

    const toggleDatepicker = () => {
      if (props.disabled) return;
      isOpen.value = !isOpen.value;

      if (isOpen.value && props.modelValue) {
        const selectedDate = new Date(props.modelValue);
        if (!isNaN(selectedDate.getTime())) {
          currentDate.value = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        }
      }
    };

    const closeDatepicker = () => {
      isOpen.value = false;
    };

    const previousMonth = () => {
      currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() - 1,
        1
      );
    };

    const nextMonth = () => {
      currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() + 1,
        1
      );
    };

    const selectDate = (day: CalendarDay) => {
      const selectedDate = day.fullDate;
      // Use local date formatting instead of UTC to prevent timezone issues
      const year = selectedDate.getFullYear();
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const date = selectedDate.getDate().toString().padStart(2, '0');
      emit('update:modelValue', `${year}-${month}-${date}`);
      closeDatepicker();
    };

    const selectToday = () => {
      const today = new Date();
      // Use local date formatting instead of UTC to prevent timezone issues
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const date = today.getDate().toString().padStart(2, '0');
      emit('update:modelValue', `${year}-${month}-${date}`);
      closeDatepicker();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen.value) {
        closeDatepicker();
      }
    };

    const toggleYearSelector = () => {
      showYearSelector.value = !showYearSelector.value;
    };

    const changeYearRange = (change: number) => {
      yearRangeStart.value += change;
    };

    const selectYear = (year: number) => {
      currentDate.value = new Date(year, currentDate.value.getMonth(), 1);
      showYearSelector.value = false;
    };

    // Close year selector when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showYearSelector.value && !target.closest('.year-selector')) {
        showYearSelector.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      isOpen,
      formattedValue,
      currentMonthYear,
      currentMonth,
      currentYear,
      calendarDays,
      weekdays,
      monthNames,
      showYearSelector,
      availableYears,
      toggleDatepicker,
      closeDatepicker,
      previousMonth,
      nextMonth,
      selectDate,
      selectToday,
      toggleYearSelector,
      changeYearRange,
      selectYear
    };
  }
});
</script>

<style lang="scss" scoped>
.a-form-datepicker {
  .label {
    @apply block text-sm font-medium text-gray-700 mb-1;

    &__required {
      @apply text-red-500;
    }
  }

  .datepicker-wrapper {
    @apply relative rounded-md shadow-sm;
  }

  .datepicker-icon {
    @apply absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none;

    &__icon {
      @apply text-gray-400 w-5 h-5;
    }
  }

  .datepicker-input {
    @apply block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm pl-4 pr-10 cursor-pointer;

    &.has-icon {
      @apply pl-10;
    }

    &.has-error {
      @apply border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500;
    }

    &.is-disabled {
      @apply bg-gray-50 text-gray-500 cursor-not-allowed;
    }
  }

  .datepicker-calendar-icon {
    @apply absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none;

    &__icon {
      @apply text-gray-400 w-4 h-4;
    }
  }

  .datepicker-modal {
    @apply fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50;
  }

  .datepicker-content {
    @apply bg-white rounded-lg shadow-xl max-w-sm w-full mx-4;
  }

  .datepicker-header {
    @apply flex items-center justify-between px-4 py-3 border-b border-gray-200;

    .nav-button {
      @apply p-1 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-800;
    }

    .month-year-container {
      @apply flex flex-col items-center;
    }

    .month {
      @apply text-lg font-semibold text-gray-900;
    }

    .year-selector {
      @apply relative;

      .year {
        @apply flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 py-1 px-2 rounded hover:bg-gray-100;
      }

      .rotate-180 {
        transform: rotate(180deg);
      }

      .year-dropdown {
        @apply absolute z-10 mt-1 bg-white rounded-md shadow-lg overflow-hidden;
        width: 200px;
        left: 50%;
        transform: translateX(-50%);

        .year-dropdown-content {
          @apply flex flex-col;
        }

        .year-nav-button {
          @apply p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100;
        }

        .years-grid {
          @apply grid grid-cols-3 gap-1 p-2;
        }

        .year-option {
          @apply text-sm text-gray-700 hover:bg-gray-100 py-1 px-2 rounded;

          &.is-selected {
            @apply bg-primary text-white font-semibold;
          }
        }
      }
    }
  }

  .datepicker-calendar {
    @apply p-4;

    .weekdays {
      @apply grid grid-cols-7 gap-1 mb-2;

      .weekday {
        @apply text-center text-sm font-medium text-gray-500 py-2;
      }
    }

    .days {
      @apply grid grid-cols-7 gap-1;

      .day {
        @apply w-8 h-8 text-sm rounded hover:bg-gray-100 flex items-center justify-center;

        &.is-other-month {
          @apply text-gray-400;
        }

        &.is-today {
          @apply bg-primary text-white font-semibold hover:bg-primary-dark;
        }

        &.is-selected {
          @apply bg-primary-dark text-white font-semibold;
        }

        &:not(.is-today):not(.is-selected) {
          @apply text-gray-900;
        }
      }
    }
  }

  .datepicker-footer {
    @apply flex justify-between px-4 py-3 border-t border-gray-200;

    .cancel-button {
      @apply px-3 py-2 text-sm text-gray-600 hover:text-gray-800 rounded hover:bg-gray-100;
    }

    .today-button {
      @apply px-3 py-2 text-sm bg-primary text-white rounded hover:bg-primary-dark;
    }
  }

  .error {
    @apply mt-1 text-sm text-red-600;
  }
}
</style> 
