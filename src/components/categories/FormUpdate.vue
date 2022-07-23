<template>
  <b-form
   @submit.prevent="formSubmit"
   style="margin-top: 20px"
  >
    <FormCardInputs
      ref="updatedCategoryCardRef"
      :update-category="clonedPropsData"
    />
    <div>
      <b-button
        class="category-create-form-submit mt-1"
        type="submit"
        variant="primary"
      >
        Save
      </b-button>
      <p class="typo__p mt-2" v-if="submitStatus === 'ERROR'">
        Please fill in all fields in two languages
      </p>
    </div>
  </b-form>
</template>

<script>
import { updateDataToStorage } from '../../api/categoriApi'
import FormCardInputs from './FormCardInputs.vue'
const cloneDeep = require('lodash.clonedeep')

export default {
  name: 'FormUpdate',
  components: {
    FormCardInputs
  },
  props: {
    chosenCategory: {
      type: Object,
      required: true
    },
    categoryId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      submitStatus: null,
      clonedPropsData: null
    }
  },
  methods: {
    formSubmit (event) {
      event.preventDefault()
      this.$refs.updatedCategoryCardRef.$v.$touch()

      if (this.$refs.updatedCategoryCardRef.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.fetchUpdateForm()
        this.$emit('form-close-update')
      }
    },
    fetchUpdateForm () {
      const sendData = this.$refs.updatedCategoryCardRef.form

      updateDataToStorage(sendData, this.categoryId)
    }
  },
  beforeMount () {
    this.clonedPropsData = cloneDeep(this.chosenCategory)
  }
}
</script>
