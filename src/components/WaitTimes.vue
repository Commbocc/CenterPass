<template>
  <div id="app">

    <div v-if="loading" class="border p-5">
      <p class="h3 font-italic text-center">Loading Wait Times...</p>
    </div>

    <div v-else class="table-responsive">
      <table class="table table-striped table-bordered table-sm">
        <thead>
          <tr>
            <th>Service</th>
            <th class="text-center">Customers <wbr> in Line</th>
            <!-- <th>Total Served</th> -->
            <!-- <th>Average Wait Time</th> -->
            <!-- <th>Max Wait Time</th> -->
            <th class="text-center">Apprx. <wbr> Wait Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in services" :key="service.id">
            <td>{{ service.name }}</td>
            <td class="text-center">{{ service.customersInLine }}</td>

            <!-- <td>{{ service.stats.TotalServed }}</td> -->

            <!-- <td>{{ service.averageWaitTime }}</td> -->

            <!-- <td>{{ service.stats.MaxWT }}</td> -->

            <td class="text-center">{{ service.apprxWaitTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <pre>{{ $data }}</pre> -->

  </div>
</template>

<script>
import Service from '../models/Service'

export default {
  name: 'waittimes',
  data: () => ({
    loading: false,
    services: null
    // autoRefresh: false,
    // refreshInterval: null,
  }),
  methods: {
    getServices () {
      this.loading = true
      this.services = null
      Service.getServices().then(data => {
        // console.log('data', data)
        this.services = data
        this.loading = false
      }).catch(this.handleErr)
    },
    handleErr (err) {
      console.error('Error in fetch', err);
    }
  },
  // watch: {
  // },
  mounted () {
    this.getServices()
  }
}
</script>
