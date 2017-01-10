const moment = require('moment')

const busyTimeData = [
  { start: moment().startOf('day').tz('America/Los_Angeles').add({h:10.5}),
    end: moment().startOf('day').tz('America/Los_Angeles').add({h:11.5})
  },
  { start: moment().startOf('day').tz('America/Los_Angeles').add({h:15}),
    end: moment().startOf('day').tz('America/Los_Angeles').add({h:16})
  },
]

const freeTimeData = [
  { start: moment.parseZone("2016-12-14T09:00:00.000-08:00"),
    end: moment.parseZone("2016-12-14T10:30:00.000-08:00") },
  { start: moment.parseZone("2016-12-14T11:30:00.000-08:00"),
    end: moment.parseZone("2016-12-14T15:00:00.000-08:00") },
  { start: moment.parseZone("2016-12-14T16:00:00.000-08:00"),
    end: moment.parseZone("2016-12-14T17:30:00.000-08:00") }
]

const freeTimeData2 = [
  { start: moment.parseZone("2016-12-14T09:00:00.000-08:00"),
    end: moment.parseZone("2016-12-14T09:15:00.000-08:00") },
  { start: moment.parseZone("2016-12-14T11:30:00.000-08:00"),
    end: moment.parseZone("2016-12-14T13:00.000-08:00") },
  { start: moment.parseZone("2016-12-14T16:00:00.000-08:00"),
    end: moment.parseZone("2016-12-14T17:30:00.000-08:00") }
]

const coachTestData = {
  github_handle: 'pllearns',
  email: 'pllearns@gmail.com',
  calendar_ids: ['pllearns@gmail.com']
}

module.exports = {
  busyTimeData,
  freeTimeData,
  freeTimeData2,
  coachTestData
}
