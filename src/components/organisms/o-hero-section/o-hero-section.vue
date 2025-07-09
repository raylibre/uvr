<template>
  <section class="o-hero-section">
    <div class="hero-content">
      <div class="hero-logo">
        <img
          src="/images/Big_Logo_blue_text_bottom.png"
          alt="Logo"
          class="hero-logo-img"
          :style="logoTransformStyle"
          @mousemove="onLogoMouseMove"
          @mouseleave="onLogoMouseLeave"
        />
      </div>
      <div class="key-points">
        <div v-for="point in keyPoints" :key="point.title" class="key-point">
          <h3>{{ point.title }}</h3>
          <p>{{ point.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'OHeroSection',

  setup() {
    const keyPoints = [
      {
        title: 'Комплексна підтримка',
        description: 'Надання медичної, психологічної та соціальної допомоги ветеранам'
      },
      {
        title: 'Формування спільноти',
        description: 'Створення міцної мережі ветеранів та їхніх прихильників'
      },
      {
        title: 'Професійний розвиток',
        description: 'Допомога ветеранам у побудові успішної цивільної карʼєри'
      }
    ];

    const logoTransformStyle = ref('');

    const onLogoMouseMove = (e: MouseEvent) => {
      const img = e.currentTarget as HTMLElement;
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Range: -1 to 1
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;
      // Max tilt in degrees
      const maxTilt = 18;
      const rotateY = percentX * maxTilt;
      const rotateX = -percentY * maxTilt;
      logoTransformStyle.value = `transform: perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const onLogoMouseLeave = () => {
      logoTransformStyle.value = 'transform: perspective(600px) rotateX(0deg) rotateY(0deg)';
    };

    return {
      keyPoints,
      logoTransformStyle,
      onLogoMouseMove,
      onLogoMouseLeave
    };
  }
});
</script>

<style scoped>
.o-hero-section {
  @apply relative flex items-center py-6; /* Add vertical padding for mobile */
  min-height: 100vh;
  background: linear-gradient(to right, var(--color-yellow-light) 0%, var(--color-primary-dark) 75%);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

@screen md {
  .o-hero-section {
    @apply min-h-[80vh] py-0; /* Restore original min-height and remove extra padding for desktop */
  }
}

.hero-content {
  @apply container mx-auto flex flex-col md:flex-row items-center justify-between;
}

.hero-logo {
  @apply flex justify-center items-center md:w-1/2 mb-8 md:mb-0;
}

.hero-logo-img {
  max-width: 220px; /* Smaller logo for mobile */
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  will-change: transform;
}

@screen md {
  .hero-logo-img {
    max-width: 350px;
  }
}

.key-points {
  @apply md:w-1/2 grid gap-6;
}

.key-point {
  @apply bg-white/90 p-6 rounded-lg;
  transition: transform 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1);
  margin-bottom: 1rem;
}

.key-point:last-child {
  margin-bottom: 0;
}

.key-point:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 24px 0 rgba(30, 64, 175, 0.15);
  cursor: pointer;
}

.key-point h3 {
  @apply text-xl font-semibold mb-2;
}
</style>