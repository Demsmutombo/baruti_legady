<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Line Chart 1">
        <LineChartOne />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import LineChartOne from "@admin/components/charts/LineChart/LineChartOne.vue";
import ComponentCard from "@admin/components/common/ComponentCard.vue";
import PageBreadcrumb from "@admin/components/common/PageBreadcrumb.vue";
import AdminLayout from "@admin/components/layout/AdminLayout.vue";
import { ref } from "vue";
const currentPageTitle = ref("Line Chart");
</script>
