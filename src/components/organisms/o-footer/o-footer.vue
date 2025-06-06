<template>
  <footer class="o-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Contact Us</h3>
        <p>Khreshchatyk St, 1, Kyiv, Ukraine</p>
        <p>info@uvr.org</p>
        <p>+380 44 123 4567</p>
      </div>
      <div class="footer-section">
        <h3>Quick Links</h3>
        <nav>
          <ALink to="/about">About Us</ALink>
          <ALink to="/programs">Our Programs</ALink>
          <ALink to="/news">News</ALink>
          <ALink to="/contact">Contact</ALink>
        </nav>
      </div>
      <div class="footer-section">
        <h3>Follow Us</h3>
        <div class="social-links">
          <ASocialLink
            v-for="social in socialLinks"
            :key="social.id"
            :href="social.url"
            :icon="social.icon"
          />
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} UVR. All rights reserved.</p>
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
      { id: 1, icon: 'fab fa-facebook', url: 'https://facebook.com/uvr' },
      { id: 2, icon: 'fab fa-twitter', url: 'https://twitter.com/uvr' },
      { id: 3, icon: 'fab fa-instagram', url: 'https://instagram.com/uvr' },
      { id: 4, icon: 'fab fa-linkedin', url: 'https://linkedin.com/company/uvr' }
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