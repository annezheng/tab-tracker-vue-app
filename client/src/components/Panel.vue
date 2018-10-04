<template>
  <div>
    <div v-if="height" class="white elevation-2" v-bind:style="{ height: height + 'px' }">
      <v-toolbar flat dense :class="toolbarColor" dark>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <slot name="action"></slot>
      </v-toolbar>
      <v-container grid-list-md>
        <slot>No Slot content defined</slot>
      </v-container>
    </div>
    <div v-else class="white elevation-2">
      <v-toolbar flat dense :class="toolbarColor" dark>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <slot name="action"></slot>
      </v-toolbar>
      <v-container grid-list-md>
        <slot>No Slot content defined</slot>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'toolbarColor', 'height']
}
</script>
