---
to: "<% return path + kebabName + '.vue'%>"
---

<template>
    <div class="<%= kebabName %>" >
        This is <%= pascalName %>
    </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';

export default defineComponent({
    name: '<%= pascalName %>',
    components: {

    },
    props: {},
    emits: {},
    setup() {

    }
});
</script>

<style lang="scss" src="./<%= kebabName %>.scss" />
