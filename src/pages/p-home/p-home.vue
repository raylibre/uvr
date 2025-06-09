<template>
  <div class="p-home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1>{{ t(T_KEYS.HOME.HERO.TITLE) }}</h1>
          <p>{{ t(T_KEYS.HOME.HERO.DESCRIPTION) }}</p>
        </div>
        <div class="key-points">
          <div v-for="(point, index) in keyPoints" :key="index" class="key-point">
            <h3>{{ point.title }}</h3>
            <p>{{ point.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about">
      <div class="about-content">
        <div class="about-text">
          <h2>{{ t(T_KEYS.HOME.ABOUT.TITLE) }}</h2>
          <p>{{ t(T_KEYS.HOME.ABOUT.DESCRIPTION) }}</p>
        </div>
        <div class="about-image">
          <img :src="aboutImage" alt="About UVR" />
        </div>
      </div>
    </section>

    <!-- Programs Section -->
    <section class="programs">
      <h2>{{ t(T_KEYS.HOME.PROGRAMS.TITLE) }}</h2>
      <p class="programs-overview">{{ t(T_KEYS.HOME.PROGRAMS.OVERVIEW) }}</p>
      <div class="program-cards">
        <div v-for="program in programs" :key="program.id" class="program-card">
          <img :src="program.image" :alt="program.title" />
          <h3>{{ program.title }}</h3>
          <p>{{ program.description }}</p>
        </div>
      </div>
    </section>

    <!-- Representatives Section -->
    <section class="representatives">
      <h2>{{ t(T_KEYS.HOME.REPRESENTATIVES.TITLE) }}</h2>
      <div class="representatives-grid">
        <div v-for="rep in representatives" :key="rep.id" class="representative-card">
          <img :src="rep.image" :alt="rep.name" />
          <h3>{{ rep.name }}</h3>
          <p>{{ rep.position }}</p>
        </div>
      </div>
    </section>

    <!-- News Section -->
    <section class="news">
      <h2>{{ t(T_KEYS.HOME.NEWS.TITLE) }}</h2>
      <div class="news-grid">
        <div v-for="article in latestNews" :key="article.id" class="news-card">
          <img :src="article.image" :alt="article.title" />
          <div class="news-content">
            <h3>{{ article.title }}</h3>
            <p>{{ article.excerpt }}</p>
            <span class="date">{{ article.date }}</span>
          </div>
        </div>
      </div>
      <div class="more-news">
        <router-link to="/news" class="more-news-link">
          {{ t(T_KEYS.HOME.NEWS.VIEW_MORE) }}
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>{{ t(T_KEYS.FOOTER.CONTACT.TITLE) }}</h3>
          <p>{{ t(T_KEYS.FOOTER.CONTACT.ADDRESS) }}</p>
          <p>{{ t(T_KEYS.FOOTER.CONTACT.EMAIL) }}</p>
          <p>{{ t(T_KEYS.FOOTER.CONTACT.PHONE) }}</p>
        </div>
        <div class="footer-section">
          <h3>{{ t(T_KEYS.FOOTER.LINKS.TITLE) }}</h3>
          <nav>
            <router-link to="/about">{{ t(T_KEYS.FOOTER.LINKS.ABOUT) }}</router-link>
            <router-link to="/programs">{{ t(T_KEYS.FOOTER.LINKS.PROGRAMS) }}</router-link>
            <router-link to="/news">{{ t(T_KEYS.FOOTER.LINKS.NEWS) }}</router-link>
            <router-link to="/contact">{{ t(T_KEYS.FOOTER.LINKS.CONTACT) }}</router-link>
          </nav>
        </div>
        <div class="footer-section">
          <h3>{{ t(T_KEYS.FOOTER.SOCIAL.TITLE) }}</h3>
          <div class="social-links">
            <a
v-for="social in socialLinks" 
               :key="social.id" 
               :href="social.url" 
               target="_blank" 
               rel="noopener noreferrer">
              <i :class="social.icon"/>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} UVR. {{ t(T_KEYS.FOOTER.RIGHTS) }}</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useTranslation } from '~/composables/use-translation';

export default defineComponent({
  name: 'PHome',

  setup() {
    const { t, T_KEYS } = useTranslation();
    const currentYear = new Date().getFullYear();

    const keyPoints = ref([
      {
        title: t(T_KEYS.HOME.HERO.KEY_POINTS.POINT1.TITLE),
        description: t(T_KEYS.HOME.HERO.KEY_POINTS.POINT1.DESCRIPTION),
      },
      {
        title: t(T_KEYS.HOME.HERO.KEY_POINTS.POINT2.TITLE),
        description: t(T_KEYS.HOME.HERO.KEY_POINTS.POINT2.DESCRIPTION),
      },
      {
        title: t(T_KEYS.HOME.HERO.KEY_POINTS.POINT3.TITLE),
        description: t(T_KEYS.HOME.HERO.KEY_POINTS.POINT3.DESCRIPTION),
      },
    ]);

    const programs = ref([
      {
        id: 1,
        title: t(T_KEYS.HOME.PROGRAMS.PROGRAM1.TITLE),
        description: t(T_KEYS.HOME.PROGRAMS.PROGRAM1.DESCRIPTION),
        image: '/src/assets/images/programs/program1.jpg'
      },
      {
        id: 2,
        title: t(T_KEYS.HOME.PROGRAMS.PROGRAM2.TITLE),
        description: t(T_KEYS.HOME.PROGRAMS.PROGRAM2.DESCRIPTION),
        image: '/src/assets/images/programs/program2.jpg'
      },
      {
        id: 3,
        title: t(T_KEYS.HOME.PROGRAMS.PROGRAM3.TITLE),
        description: t(T_KEYS.HOME.PROGRAMS.PROGRAM3.DESCRIPTION),
        image: '/src/assets/images/programs/program3.jpg'
      },
      {
        id: 4,
        title: t(T_KEYS.HOME.PROGRAMS.PROGRAM4.TITLE),
        description: t(T_KEYS.HOME.PROGRAMS.PROGRAM4.DESCRIPTION),
        image: '/src/assets/images/programs/program4.jpg'
      }
    ]);

    const representatives = ref([
      {
        id: 1,
        name: t(T_KEYS.HOME.REPRESENTATIVES.REP1.NAME),
        position: t(T_KEYS.HOME.REPRESENTATIVES.REP1.POSITION),
        image: '/src/assets/images/representatives/rep1.jpg'
      },
      {
        id: 2,
        name: t(T_KEYS.HOME.REPRESENTATIVES.REP2.NAME),
        position: t(T_KEYS.HOME.REPRESENTATIVES.REP2.POSITION),
        image: '/src/assets/images/representatives/rep2.jpg'
      },
      {
        id: 3,
        name: t(T_KEYS.HOME.REPRESENTATIVES.REP3.NAME),
        position: t(T_KEYS.HOME.REPRESENTATIVES.REP3.POSITION),
        image: '/src/assets/images/representatives/rep3.jpg'
      },
      {
        id: 4,
        name: t(T_KEYS.HOME.REPRESENTATIVES.REP4.NAME),
        position: t(T_KEYS.HOME.REPRESENTATIVES.REP4.POSITION),
        image: '/src/assets/images/representatives/rep4.jpg'
      }
    ]);

    const latestNews = ref([
      {
        id: 1,
        title: t(T_KEYS.HOME.NEWS.ARTICLE1.TITLE),
        excerpt: t(T_KEYS.HOME.NEWS.ARTICLE1.EXCERPT),
        date: t(T_KEYS.HOME.NEWS.ARTICLE1.DATE),
        image: '/src/assets/images/news/news1.jpg'
      },
      {
        id: 2,
        title: t(T_KEYS.HOME.NEWS.ARTICLE2.TITLE),
        excerpt: t(T_KEYS.HOME.NEWS.ARTICLE2.EXCERPT),
        date: t(T_KEYS.HOME.NEWS.ARTICLE2.DATE),
        image: '/src/assets/images/news/news2.jpg'
      },
      {
        id: 3,
        title: t(T_KEYS.HOME.NEWS.ARTICLE3.TITLE),
        excerpt: t(T_KEYS.HOME.NEWS.ARTICLE3.EXCERPT),
        date: t(T_KEYS.HOME.NEWS.ARTICLE3.DATE),
        image: '/src/assets/images/news/news3.jpg'
      }
    ]);

    const socialLinks = ref([
      { id: 1, icon: 'fab fa-facebook', url: '#' },
      { id: 2, icon: 'fab fa-twitter', url: '#' },
      { id: 3, icon: 'fab fa-instagram', url: '#' },
      { id: 4, icon: 'fab fa-linkedin', url: '#' },
    ]);

    return {
      t,
      T_KEYS,
      currentYear,
      keyPoints,
      programs,
      representatives,
      latestNews,
      socialLinks,
      aboutImage: '/src/assets/images/about/about-uvr.jpg',
    };
  }
});
</script>

<style lang="scss" scoped>
.p-home {
  @apply min-h-screen;

  section {
    @apply py-16 px-4;
  }

  // Hero Section
  .hero {
    @apply relative min-h-[80vh] flex items-center;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-bg.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;

    .hero-content {
      @apply container mx-auto flex flex-col md:flex-row items-center justify-between;
    }

    .hero-text {
      @apply text-white md:w-1/2 mb-8 md:mb-0;

      h1 {
        @apply text-5xl font-bold mb-6;
      }

      p {
        @apply text-xl;
      }
    }

    .key-points {
      @apply md:w-1/2 grid gap-6;

      .key-point {
        @apply bg-white/90 p-6 rounded-lg;

        h3 {
          @apply text-xl font-semibold mb-2;
        }
      }
    }
  }

  // About Section
  .about {
    @apply bg-white;

    .about-content {
      @apply container mx-auto flex flex-col md:flex-row items-center gap-8;
    }

    .about-text {
      @apply md:w-1/2;

      h2 {
        @apply text-4xl font-bold mb-6;
      }
    }

    .about-image {
      @apply md:w-1/2;
      
      img {
        @apply rounded-lg shadow-lg w-full;
      }
    }
  }

  // Programs Section
  .programs {
    @apply bg-gray-50;

    .programs-overview {
      @apply text-center max-w-3xl mx-auto mb-12;
    }

    .program-cards {
      @apply container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8;
    }

    .program-card {
      @apply bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105;

      img {
        @apply w-full h-48 object-cover;
      }

      h3 {
        @apply text-xl font-semibold p-4;
      }

      p {
        @apply p-4 pt-0;
      }
    }
  }

  // Representatives Section
  .representatives {
    @apply bg-white;

    .representatives-grid {
      @apply container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8;
    }

    .representative-card {
      @apply text-center;

      img {
        @apply w-48 h-48 rounded-full mx-auto mb-4 object-cover;
      }

      h3 {
        @apply text-xl font-semibold;
      }
    }
  }

  // News Section
  .news {
    @apply bg-gray-50;

    .news-grid {
      @apply container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8;
    }

    .news-card {
      @apply bg-white rounded-lg shadow-lg overflow-hidden;

      img {
        @apply w-full h-48 object-cover;
      }

      .news-content {
        @apply p-4;

        h3 {
          @apply text-xl font-semibold mb-2;
        }

        .date {
          @apply text-sm text-gray-500;
        }
      }
    }

    .more-news {
      @apply text-center;

      .more-news-link {
        @apply inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors;
      }
    }
  }

  // Footer
  .site-footer {
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

        a {
          @apply hover:text-primary transition-colors;
        }
      }

      .social-links {
        @apply flex space-x-4;

        a {
          @apply text-2xl hover:text-primary transition-colors;
        }
      }
    }

    .footer-bottom {
      @apply container mx-auto mt-8 pt-8 border-t border-gray-700 text-center;
    }
  }
}
</style> 