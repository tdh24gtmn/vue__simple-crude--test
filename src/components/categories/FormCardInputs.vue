<template>
  <b-card no-body>
    <b-tabs v-model="tabIndex" pills card fill>
      <b-tab title="Ukrainian" >
        <b-form-group
          v-for="(value, name, index) in form['ua']"
          :key="name"
          :label="inputsParams['ua'][index].label"
        >
          <b-form-textarea
            v-model="$v.form['ua'][name].$model"
            :rows="inputsParams['ua'][index].rows"
            :placeholder="inputsParams['ua'][index].placeholder"
            :state="validateState(name, 'ua')"
            required
          >
          </b-form-textarea>
        </b-form-group>
      </b-tab>
      <b-tab title="Russian" >
        <b-form-group
          v-for="(value, name, index) in form['ru']"
          :key="name"
          :label="inputsParams['ru'][index].label"
        >
          <b-form-textarea
            v-model="$v.form['ru'][name].$model"
            :rows="inputsParams['ru'][index].rows"
            :placeholder="inputsParams['ru'][index].placeholder"
            :state="validateState(name, 'ru')"
            required
          >
          </b-form-textarea>
        </b-form-group>
      </b-tab>
    </b-tabs>
    <b-form-group
      label="Priority:"
      label-for="input-category-priority"
    >
      <b-form-input
        v-model="$v.form.priority.$model"
        :rows="inputsParams['priority'].rows"
        :placeholder="inputsParams['priority'].placeholder"
        :state="validateState('priority')"
        required
        id="input-category-priority"
        type="number"
        min="0"
        number
      >
      </b-form-input>
    </b-form-group>
  </b-card>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'

const inputsParamsDescription = {
  ua: [
    { placeholder: 'Category Name', label: 'Name:', rows: 1 },
    { placeholder: 'Category Description', label: 'Description:', rows: 4 },
    { placeholder: 'Meta title category 70 characters', label: 'Meta title:', rows: 1 },
    { placeholder: 'Meta description category 150 characters', label: 'Meta description:', rows: 4 }
  ],
  ru: [
    { placeholder: 'Category Name', label: 'Name:', rows: 1 },
    { placeholder: 'Category Description', label: 'Description:', rows: 4 },
    { placeholder: 'Meta title category 70 characters', label: 'Meta title:', rows: 1 },
    { placeholder: 'Meta description category 150 characters', label: 'Meta description:', rows: 4 }
  ],
  priority: { placeholder: 'Enter the priority of the category', label: 'Priority:', rows: 1 }
}

export default {
  name: 'FormCardInputs',
  props: {
    updateCategory: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      form: {
        ua: {
          title: '',
          description: '',
          metaTitle: '',
          metaDescription: ''
        },
        ru: {
          title: '',
          description: '',
          metaTitle: '',
          metaDescription: ''
        },
        priority: null
      },
      inputsParams: inputsParamsDescription,
      tabIndex: 0
    }
  },
  validations: {
    form: {
      ua: {
        title: { required },
        description: { required },
        metaTitle: { required, maxLength: maxLength(70) },
        metaDescription: { required, maxLength: maxLength(150) }
      },
      ru: {
        title: { required },
        description: { required },
        metaTitle: { required, maxLength: maxLength(70) },
        metaDescription: { required, maxLength: maxLength(150) }
      },
      priority: { required }
    }
  },
  created () {
    if (this.updateCategory) {
      this.form = this.updateCategory
    }
  },
  methods: {
    validateState (name, lang) {
      const nestedObjectValue = lang ? this.$v.form[lang][name] : this.$v.form[name]
      const { $dirty, $error } = nestedObjectValue
      return $dirty ? !$error : null
    }
  }
}
</script>
