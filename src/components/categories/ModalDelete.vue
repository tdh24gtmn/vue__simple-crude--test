<template>
  <!--delete category modal  -->
  <b-modal
    :id="modalName"
    hide-header-close
    hide-header
    hide-footer
    title="Remove category modal"
    no-close-on-backdrop
  >
    <p class="my-4 text-center">Are you sure you want to delete a category?</p>
    <div style="display: flex; justify-content: center; align-items: center">
      <div style="display: flex; justify-content: center; align-items: center">
        <b-button variant="danger" class="mx-2" @click="deleteSelectedCategory"
          >Delete</b-button
        >
        <b-button variant="dark" class="mx-2" @click="deleteModalClose"
          >No</b-button
        >
      </div>
    </div>
  </b-modal>
  <!--  -->
</template>

<script>
import { deleteDataByIdFromStorage } from '../../api/categoriApi'

export default {
  props: {
    id: {
      type: Number,
      required: false
    },
    modalName: {
      type: String,
      required: true
    }
  },
  methods: {
    deleteSelectedCategory () {
      deleteDataByIdFromStorage(this.id)

      this.deleteModalClose()
    },
    deleteModalClose () {
      this.$emit('close')
    }
  }
}
</script>
