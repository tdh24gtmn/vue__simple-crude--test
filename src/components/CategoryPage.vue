<template>
  <div style="max-width: 1600px">
    <div style="min-height: 100vh">
      <CategoryPageContent />
    </div>
  </div>
</template>

<script>
import CategoryPageContent from '@/components/CategoryPageContent.vue'

export default {
  name: 'category-page',
  components: {
    CategoryPageContent
  }
}
</script>
