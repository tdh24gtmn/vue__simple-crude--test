<template>
  <b-form @submit.stop.prevent="formSubmit" style="margin-top: 20px" novalidate>
    <FormCardInputs ref="createdCategoryCardRef" />
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
  </b-form>
</template>

<script>
import { saveDataToStorage } from '../../api/categoriApi'
import FormCardInputs from './FormCardInputs.vue'

export default {
  name: 'FormCreate',
  components: {
    FormCardInputs
  },
  data () {
    return {
      submitStatus: null
    }
  },
  methods: {
    formSubmit (event) {
      event.preventDefault()
      const nameRefForm = 'createdCategoryCardRef'
      console.log('this.$refs.createdCategoryCardRef.$v.$invalid:')
      console.log(this.$refs.createdCategoryCardRef.$v.$invalid)
      // form validation
      this.formValidation(nameRefForm)
      // if submit status validation  !'ERROR' -> save form Data
      if (this.submitStatus === 'OK') {
        this.saveFormData(nameRefForm)
        this.$emit('form-close-create')
      }
    },
    formValidation (nameRefForm) {
      this.$refs[nameRefForm].$v.$touch()

      if (this.$refs[nameRefForm].$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'OK'
      }
    },
    saveFormData (nameRefForm) {
      const sendFormData = this.$refs[nameRefForm].form
      // save to Storage
      saveDataToStorage(sendFormData)
    }
  }
}
</script>
