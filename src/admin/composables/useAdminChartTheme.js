import { computed } from 'vue'
import { useTheme } from '@admin/components/layout/ThemeProvider.vue'
import {
  ADMIN_CHART_PRIMARY,
  ADMIN_CHART_SECONDARY,
} from '@admin/constants/theme'

export function useAdminChartTheme() {
  const { isDarkMode } = useTheme()

  const primary = ADMIN_CHART_PRIMARY
  const secondary = ADMIN_CHART_SECONDARY

  const axisColor = computed(() => (isDarkMode.value ? '#94a3b8' : '#9ca3af'))
  const gridColor = computed(() =>
    isDarkMode.value ? 'rgba(255, 255, 255, 0.08)' : '#f2f4f7'
  )
  const foreColor = computed(() => (isDarkMode.value ? '#e2e8f0' : '#374151'))

  const baseChart = computed(() => ({
    fontFamily: 'Outfit, sans-serif',
    foreColor: foreColor.value,
    toolbar: { show: false },
  }))

  const baseAxis = computed(() => ({
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: axisColor.value, fontSize: '12px' } },
  }))

  const baseGrid = computed(() => ({
    borderColor: gridColor.value,
    strokeDashArray: 0,
    yaxis: { lines: { show: true } },
    xaxis: { lines: { show: false } },
  }))

  const tooltipTheme = computed(() => (isDarkMode.value ? 'dark' : 'light'))

  return {
    isDarkMode,
    primary,
    secondary,
    axisColor,
    gridColor,
    foreColor,
    baseChart,
    baseAxis,
    baseGrid,
    tooltipTheme,
  }
}
