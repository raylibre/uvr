<template>
  <div data-at-p-home>
    <!-- Navigation -->
    <m-navigation @contact-us="scrollToContact" />

    <!-- Hero Section -->
    <section class="relative bg-gray-50 py-20 sm:py-32">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div class="lg:col-span-6">
            <h1 class="text-display-1 font-heading font-bold text-gray-900 mb-6">
              Our Work. <span class="text-gray-400">Your Vision Realized.</span>
            </h1>
            <p class="text-xl text-gray-600 mb-8">
              At Mason, every project tells a story - a story of trust, innovation, and excellence. Through our commercial construction and infrastructure services, our portfolio reflects our commitment to quality.
            </p>
            <div class="flex flex-wrap gap-4">
              <a-button variant="primary" @click="scrollToProjects">
                Our Services
              </a-button>
              <a-button variant="outline" @click="scrollToContact">
                Get in Touch
              </a-button>
            </div>
          </div>
          <div class="lg:col-span-6 mt-10 lg:mt-0">
            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-xl shadow-lg col-span-2 aspect-w-16 aspect-h-9 bg-gray-100">
                <div class="flex items-center justify-center text-gray-400">Hero Image 1</div>
              </div>
              <div class="rounded-xl shadow-lg aspect-w-4 aspect-h-3 bg-gray-100">
                <div class="flex items-center justify-center text-gray-400">Hero Image 2</div>
              </div>
              <div class="rounded-xl shadow-lg aspect-w-4 aspect-h-3 bg-gray-100">
                <div class="flex items-center justify-center text-gray-400">Hero Image 3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section id="projects" class="py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-h2 font-heading font-bold text-gray-900 mb-4">
            Discover Our Completed Projects
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Every project we complete is a reflection of our commitment to quality, precision, and client satisfaction. Here are some of our recent successes.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <m-project-card
            v-for="project in featuredProjects"
            :key="project.id"
            v-bind="project"
            @view-details="viewProject(project.id)"
          />
        </div>

        <div class="mt-12">
          <m-pagination
            v-model:currentPage="currentPage"
            :total-pages="5"
            :total-items="50"
            :per-page="9"
          />
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="bg-gray-50 py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-h2 font-heading font-bold text-gray-900 mb-4">
              Start Your Project With Us
            </h2>
            <p class="text-xl text-gray-600">
              Let's bring your vision to life. Whether it's a new commercial building, bridge expansion project, or infrastructure development, we're here to help.
            </p>
          </div>

          <m-contact-form @submit="handleContactSubmit" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useTitle } from '@vueuse/core';
import MNavigation from '~/components/molecules/m-navigation/m-navigation.vue';
import MProjectCard from '~/components/molecules/m-project-card/m-project-card.vue';
import MPagination from '~/components/molecules/m-pagination/m-pagination.vue';
import MContactForm from '~/components/molecules/m-contact-form/m-contact-form.vue';
import AButton from '~/components/atoms/a-button/a-button.vue';

export default defineComponent({
  name: 'PHome',

  components: {
    MNavigation,
    MProjectCard,
    MPagination,
    MContactForm,
    AButton
  },

  setup() {
    useTitle('Home | Mason Construction');

    const currentPage = ref(1);

    const featuredProjects = [
      {
        id: 1,
        image: '',
        title: 'Modern Office Housing Project',
        description: 'A state-of-the-art office complex featuring eco-friendly design and smart building technology.',
        category: 'Commercial',
        client: 'TechCorp Inc.',
        duration: '18 months',
        status: 'Completed'
      },
      {
        id: 2,
        image: '',
        title: 'Downtown Office Tower Build',
        description: 'A 25-story office tower in the heart of downtown, featuring premium amenities and sustainable design.',
        category: 'Commercial',
        client: 'Urban Developers',
        duration: '24 months',
        status: 'Completed'
      },
      {
        id: 3,
        image: '',
        title: 'Coastal Bridge Expansion',
        description: 'Major infrastructure project expanding the coastal bridge to accommodate increased traffic flow.',
        category: 'Infrastructure',
        client: 'City Council',
        duration: '36 months',
        status: 'In Progress'
      }
    ];

    function scrollToSection(id: string) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    function scrollToProjects() {
      scrollToSection('projects');
    }

    function scrollToContact() {
      scrollToSection('contact');
    }

    function viewProject(id: number) {
      console.log('Viewing project:', id);
      // Will be implemented when we add project details page
    }

    async function handleContactSubmit(formData: any) {
      console.log('Form submitted:', formData);
      // Will be implemented when we add API integration
    }

    function onInit() {
      // Initialization logic will go here
    }

    onInit();

    return {
      currentPage,
      featuredProjects,
      scrollToProjects,
      scrollToContact,
      viewProject,
      handleContactSubmit
    };
  }
});
</script>

<style src="./p-home.scss" lang="scss" scoped></style> 