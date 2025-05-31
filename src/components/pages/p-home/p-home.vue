<template>
  <div class="p-home">
    <OHeroSection
      @services-click="scrollToProjects"
      @contact-click="scrollToContact"
    />

    <OProjectsSection
      :projects="featuredProjects"
      @view-details="viewProject"
    />

    <OContactSection @submit="handleContactSubmit" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTitle } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import type { Project } from '~/interfaces/project.interface';
import OHeroSection from '~/components/organisms/o-hero-section/o-hero-section.vue';
import OProjectsSection from '~/components/organisms/o-projects-section/o-projects-section.vue';
import OContactSection from '~/components/organisms/o-contact-section/o-contact-section.vue';

export default defineComponent({
  name: 'PHome',

  components: {
    OHeroSection,
    OProjectsSection,
    OContactSection
  },

  setup() {
    const { t } = useI18n();
    useTitle(t('common.navigation.home') + ' | Mason Construction');

    const featuredProjects: Project[] = [
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

    function handleContactSubmit(formData: any) {
      console.log('Form submitted:', formData);
      // Will be implemented when we add API integration
    }

    return {
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