import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  const scrollY = ref(1)

  const updateMove = (event: MouseEvent) => {
    x.value = (event.clientX / window.innerWidth) * 2 - 1
    y.value = -(event.clientY / window.innerHeight) * 2 + 1
  }

  const updateMobileTilt = (event: DeviceOrientationEvent) => {
    const beta = event.beta
    const gamma = event.gamma

    x.value = (beta ?? 90 / 180) * 2 - 1
    y.value = -(gamma ?? 45 / 90) * 2 + 1
  }

  const updateScroll = () => {
    console.log('SCROLLD!')
    const totalHeight = document.body.scrollHeight - window.innerHeight
    scrollY.value = (window.top?.scrollY ?? totalHeight)// ((window.top?.scrollY ?? totalHeight) / totalHeight) * 100
  }

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  onMounted(() => {
    window.addEventListener('scroll', updateScroll)
    if (isTouchDevice && window.DeviceOrientationEvent) window.addEventListener('deviceorientation', updateMobileTilt, true)
    else window.addEventListener('mousemove', updateMove)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
    if (isTouchDevice && window.DeviceOrientationEvent) window.removeEventListener('deviceorientation', updateMobileTilt)
    else window.removeEventListener('mousemove', updateMove)
  })
  return { x, y, scrollY }
}