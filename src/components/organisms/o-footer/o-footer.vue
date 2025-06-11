<template>
  <footer class="o-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Контакти</h3>
        <p>36008 м. Полтава, Київське шосе, б. 21а</p>
        <p>uvr_military@ukr.net</p>
        <p>+380503279160</p>
      </div>
      <div class="footer-section">
        <h3>Швидкі посилання</h3>
        <nav>
          <ALink to="/about">Про нас</ALink>
          <ALink to="/programs">Наші програми</ALink>
          <ALink to="/news">Новини</ALink>
          <ALink to="/contact">Контакти</ALink>
        </nav>
      </div>
      <div class="footer-section">
        <h3>Ми в соцмережах</h3>
        <div class="social-links">
          <ASocialLink
            v-for="social in socialLinks"
            :key="social.id"
            :href="social.url"
            :icon="social.icon"
            :label="social.label"
          />
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} Український Військовий Рух. Всі права захищено.</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ALink from '~/components/atoms/a-link';
import ASocialLink from '~/components/atoms/a-social-link';

export default defineComponent({
  name: 'OFooter',

  components: {
    ALink,
    ASocialLink
  },

  setup() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
      {
        id: 1,
        icon: 'fab fa-facebook',
        url: 'https://www.facebook.com/people/%D0%A3%D0%BA%D1%80%D0%B0%Dї%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B9-%D0%92%D1%96%D0%B9%D1%81%D1%8C%D0%BA%D0%BE%D0%B2%D0%B8%D0%B9-%D0%A0%D1%83%D1%85/61575094014594/',
        label: 'Facebook'
      },
      {
        id: 2,
        icon: 'fab fa-telegram',
        url: 'https://t.me/ukrainianmilitarymovement',
        label: 'Telegram'
      }
    ];

    return {
      currentYear,
      socialLinks
    };
  }
});
</script>

<style lang="scss" scoped>
.o-footer {
  @apply bg-gray-900 text-white py-12;

  .footer-content {
    @apply container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8;
  }

  .footer-section {
    h3 {
      @apply text-xl font-semibold mb-4;
    }

    nav {
      @apply flex flex-col space-y-2;
    }

    .social-links {
      @apply flex space-x-4;
    }
  }

  .footer-bottom {
    @apply container mx-auto mt-8 pt-8 border-t border-gray-700 text-center;
  }
}
</style>