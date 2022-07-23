<template>
  <div class="categories__comp">
    <h2>All categories:</h2>
    <b-button
      variant="primary"
      @click="modalShow(modal.createName)"
      style="margin-left: 45px"
      >Add</b-button
    >

    <p
      style="margin-left: 45px; margin-top: 30px"
      v-if="categories === null || categories.length === 0"
    >
      There are no categories. Please add a new category
    </p>

    <ul style="margin-top: 30px" v-else>
      <li
        v-for="(n, index) in categories"
        :key="index"
        style="display: flex; margin: 5px"
      >
        <span style="width: 70%">
          {{ n["ua"].title }}
        </span>
        <b-button variant="success" class="mx-3" @click="updateModal(index)"
          >Edit</b-button
        >
        <b-button variant="danger" @click="deleteModal(index)">Delete</b-button>
      </li>
    </ul>

    <!-- create category-modal -->
    <b-modal
      id="create-category"
      size="xl"
      header-class="modal-create-category-header"
      hide-footer
      title="Add Category"
      no-close-on-backdrop
    >
      <h3 style="text-align: center">Please edit the form for two languages</h3>

      <FormCreate @form-close-create="modalClose('create-category')" />
    </b-modal>
    <!--  -->

    <!-- edit category modal -->
    <b-modal
      id="editing-category"
      size="xl"
      header-class="modal-create-category-header"
      hide-footer
      title="Edit Category"
      no-close-on-backdrop
    >
      <h3 style="text-align: center">Please edit the form for two languages</h3>

      <FormUpdate
        v-if="idOfUpdateCategory !== null"
        :chosen-category="categories[idOfUpdateCategory]"
        :category-id="idOfUpdateCategory"
        @form-close-update="modalClose('editing-category')"
      />
    </b-modal>
    <!--  -->

    <!--delete category modal  -->
    <ModalDelete
      v-show="idOfDeleteCategory"
      :modalName="modal.deleteName"
      :id="idOfDeleteCategory"
      @close="modalClose(modal.deleteName)"
    />
    <!--  -->
  </div>
</template>
<script>
import FormCreate from '@/components/categories/FormCreate.vue'
import FormUpdate from '@/components/categories/FormUpdate.vue'
import ModalDelete from '@/components/categories/ModalDelete.vue'
import {
  storageAvailable,
  checkDataFromStorage,
  getDataFromStorage
} from '../api/categoriApi'

export default {
  name: 'category-page-content',
  components: {
    FormCreate,
    FormUpdate,
    ModalDelete
  },
  provide: {
    name: 'LearnVue'
  },
  data () {
    return {
      idOfDeleteCategory: null,
      idOfUpdateCategory: null,
      categories: null,
      modal: {
        createName: 'create-category',
        editName: 'editing-category',
        deleteName: 'remove-category'
      }
    }
  },
  beforeMount () {
    // Available can check in the main component (App.vue) ?
    storageAvailable('localStorage')
    checkDataFromStorage()
    this.getFetchAllCategories()
  },
  methods: {
    getFetchAllCategories () {
      this.categories = getDataFromStorage()
    },
    modalShow (modalName) {
      this.$bvModal.show(modalName)
    },
    modalHide (modalName) {
      this.$bvModal.hide(modalName)
    },
    updateModal (index) {
      this.idOfUpdateCategory = index
      this.modalShow(this.modal.editName)
    },
    deleteModal (index) {
      this.idOfDeleteCategory = index
      this.modalShow(this.modal.deleteName)
    },
    resetId () {
      this.idOfDeleteCategory = null
      this.idOfUpdateCategory = null
    },
    modalClose (modalName) {
      this.getFetchAllCategories()
      this.resetId()
      this.modalHide(modalName)
    }
  }
}
</script>
<style lang="scss">
.categories__comp {
  padding: 40px 5px 5px 5px;

  h2 {
    margin-left: 10px;
    margin-right: 10px;
  }

  .card {
    margin-left: 10px;
    margin-right: 10px;
  }

  .categories-table-label {
    margin: 5px auto;
    padding: 10px;
    width: 90%;
  }

  form {
    margin: 5px 10px;
  }

  fieldset.form-group {
    border: none !important;
  }
}

.modal-create-category-header {
  margin-left: 0px;
  margin-right: 0px;
}

.category-create-form-alert {
  margin-bottom: 0px;
}

fieldset.form-group {
  border: none;
  margin-bottom: 0px;
}
</style>
