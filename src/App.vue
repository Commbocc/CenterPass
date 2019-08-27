<script>
import CustomerValidation from './components/CustomerValidation.vue'
import WaitTimes from './components/WaitTimes.vue'

export default {
  install (Vue) {
    Vue.mixin({
      components: {
        CustomerValidation,
        WaitTimes
      }
    })
  }
}
</script>
