<template lang="html">
  <div class="card v-card border border-primary mb-3">
    <div class="card-header bg-primary text-white">
      <span class="fas fa-hand-paper fa-fw"></span>
      <strong class="font-weight-bold">
        Hillsborough County Customer Verification
      </strong>
    </div>
    <div class="card-body">
      <p>
        Center Pass is only available for Hillsborough County permitting and property development service customers. Before you visit our downtown service center, <strong>verify that your project is located in unincorporated Hillsborough County</strong>.
      </p>

      <form is="HcEsriSearchForm" source-selector @submit="reset" @result="handleResult" class="hc-esri-search-form"></form>

      <div v-if="searched" class="alert" :class="(verified) ? 'alert-info' : 'alert-warning'">
        <template v-if="verified">
          Your address is within Hillsborough County and not within an incorporated area, i.e. Tampa, Temple Terrace, Plant City.
        </template>
        <template v-else>
          <p>
            Your address is not in Hillsborough County or is within an incorporated area, i.e. Tampa, Temple Terrace, Plant City.
          </p>
          <div class="form-check checkbox-inline">
            <input v-model="override" class="form-check-input" type="checkbox" value="" id="countyVerification">
            <label class="form-check-label" for="countyVerification">
              That's OK, I know what I'm doing.
            </label>
          </div>
        </template>
      </div>

      <div class="row no-gutters mt-3">
        <div class="col-md-6 p-2">
          <a href="https://centerpass.hillsboroughcounty.org/wa" target="_blank" class="btn btn-primary btn-sm text-white btn-lg btn-block" :class="btnVerified">
            Get an eTicket
          </a>
        </div>
        <div class="col-md-6 p-2">
          <a href="https://centerpass.hillsboroughcounty.org/WA/en/WizardAppt/Services?groupBy=1" target="_blank" class="btn btn-primary btn-sm text-white btn-lg btn-block" :class="btnVerified">
            Make an Appointment
          </a>
        </div>
        <div class="col-md-6 p-2">
          <a href="https://centerpass.hillsboroughcounty.org/WA/en/MyEtickets/ETicketSearch" target="_blank" class="btn btn-primary btn-sm text-white btn-lg btn-block">
            My eTickets
          </a>
        </div>
        <div class="col-md-6 p-2">
          <a href="https://centerpass.hillsboroughcounty.org/WA/en/MyAppointments/CancelReschedule" target="_blank" class="btn btn-primary btn-sm text-white btn-lg btn-block">
            Manage Appointments
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import HcEsriSearchForm from '@hcflgov/vue-esri-search'

export default {
  components: { HcEsriSearchForm },
  data () {
    return {
      searched: false,
      verified: false,
      override: false
    }
  },
  methods: {
    reset () {
      // console.log('reset')
      this.searched = false
      this.verified = false
      this.override = false
    },
    handleResult (searchResult) {
      searchResult.queryFeatures({
        url: 'https://services.arcgis.com/apTfC6SUmnNfnxuF/ArcGIS/rest/services/CountyBoundary_Unincorporated/FeatureServer/0'
      }).then(features => {
        // console.log(features)
        this.verified = (features) ? true : false
      }).catch(() => {
        this.verified = false
      }).then(() => {
        this.searched = true
      })
    }
  },
  computed: {
    btnVerified () {
      return (this.verified || this.override) ? null : 'disabled'
    }
  }
}
</script>

<style>
.hide-map.embed-responsive {
  padding-bottom: 0;
}

.hc-esri-search-form .form-check-inline {
  position: relative;
  display: inline-block;
  padding-left: 20px;
  margin-bottom: 0;
  font-weight: 400;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 5px;
}

.hc-esri-search-form .form-check-inline input {
  position: absolute;
  margin-left: -15px;
}
</style>
