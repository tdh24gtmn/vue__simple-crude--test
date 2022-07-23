<template>
  <div style="display: flex; justify-content: center; align-items: center">
    <b-button variant="danger" class="mx-2" @click="deleteSelectedCategory"
      >Delete</b-button
    >
    <b-button variant="dark" class="mx-2" @click="deleteModalClose"
      >No</b-button
    >
  </div>
</template>

<script>
import { deleteDataByIdFromStorage } from '../../api/categoriApi'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    deleteSelectedCategory () {
      deleteDataByIdFromStorage(this.id)

      this.deleteModalClose()
    },
    deleteModalClose () {
      this.$emit('reset-delete-id')
    }
  }
}
</script>
