<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div class="space-y-6">
        <ComponentCard title="Default Inputs">
          <DefaultInputs />
        </ComponentCard>
        <ComponentCard title="Select Inputs">
          <SelectInput />
        </ComponentCard>
        <ComponentCard title="Inputs States">
          <TextArea />
        </ComponentCard>
        <ComponentCard title="Inputs States">
          <InputState />
        </ComponentCard>
      </div>
      <div class="space-y-6">
        <ComponentCard title="Inputs Group"> <InputGroup /> </ComponentCard>
        <ComponentCard title="File Input"> <FileInput /> </ComponentCard>
        <ComponentCard title="Checkboxes">
          <CheckboxInput />
        </ComponentCard>
        <ComponentCard title="Dropzone">
          <Dropzone />
        </ComponentCard>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@admin/components/common/PageBreadcrumb.vue'
import AdminLayout from '@admin/components/layout/AdminLayout.vue'
import DefaultInputs from '@admin/components/forms/FormElements/DefaultInputs.vue'
import ComponentCard from '@admin/components/common/ComponentCard.vue'
import SelectInput from '@admin/components/forms/FormElements/SelectInput.vue'
import InputState from '@admin/components/forms/FormElements/InputState.vue'
import TextArea from '@admin/components/forms/FormElements/TextArea.vue'
import InputGroup from '@admin/components/forms/FormElements/InputGroup.vue'
import Dropzone from '@admin/components/forms/FormElements/Dropzone.vue'
import FileInput from '@admin/components/forms/FormElements/FileInput.vue'
import CheckboxInput from '@admin/components/forms/FormElements/CheckboxInput.vue'

const currentPageTitle = ref('Form Elements')
</script>
