import { xml2js } from 'xml-js'
import moment from 'moment'
import axios from 'axios'

export default class Service {

  constructor (service) {
    this.id = service._attributes.ServiceId
    this.name = service._attributes.ServiceName

    this.stats = {}

    for (var k in service) {
      if (service[k]._text) {
        this.stats[k] = service[k]._text
      }
    }
  }

  get customersInLine () {
    return parseInt(this.stats.WaitingCount)
  }

  get averageWaitTime () {
    let waitSecs = parseInt(this.stats.AvgWT)
    return moment.duration(waitSecs, 'seconds').humanize()
  }

  get maxWaitTime () {
    let waitSecs = parseInt(this.stats.MaxWT)
    return moment.duration(waitSecs, 'seconds').humanize()
  }

  // get apprxWaitTime () {
  //   let apprxWaitInSeconds = (this.customersInLine * this.averageWaitTime)
  //   return moment.duration(apprxWaitInSeconds, 'seconds').humanize()
  // }

  static getServices () {
    return axios(process.env.VUE_APP_IWT_URL)
    .then(res => xml2js(res.data, {compact: true}))
    .then(json => {
      // console.log(json)
      let services = json.Unit.Service.map(x => new Service(x))
      return services.sort((a, b) => (a.name > b.name) ? 1 : -1)
    })
  }

}
