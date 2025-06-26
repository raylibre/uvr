<template>
    <div
        class="m-content-section"
        :class="[
            padding,
            background,
            { 'rounded-lg': rounded, 'shadow-sm': shadow },
            extraClass
        ]"
    >
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Flexible content section container for page and card sections.
 * @prop {string} padding - Tailwind padding classes (default: 'p-6')
 * @prop {boolean} rounded - Whether to apply rounded corners (default: true)
 * @prop {boolean} shadow - Whether to apply shadow (default: true)
 * @prop {string} background - Tailwind background class (default: 'bg-white')
 * @prop {string} class - Extra classes to apply
 */
export default defineComponent({
    name: 'MContentSection',
    components: {

    },
    props: {
        padding: {
            type: String,
            default: 'p-6'
        },
        rounded: {
            type: Boolean,
            default: true
        },
        shadow: {
            type: Boolean,
            default: true
        },
        background: {
            type: String,
            default: 'bg-white'
        },
        class: {
            type: String,
            default: ''
        }
    },
    emits: {},
    setup() {

    },
    computed: {
        extraClass(): string {
            return this.class;
        }
    }
});
</script>

<style lang="scss" src="./m-content-section.scss" />
