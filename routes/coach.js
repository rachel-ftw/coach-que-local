const express = require('express')
const gcal = require('google-calendar')
const router = express.Router()
const {
  createUser,
  getActiveCoaches,
  deactivateCoach,
  findUserByHandle,
  updateUserByHandle
} = require('../io/database/users')
const { extractCalendarIds, extractEmailFromGoogleSession } = require('../models/calendar')
const { ensureGoogleAuth } = require('../middleware')

router.get('/active', (request, response) =>
  getActiveCoaches().then(coaches => response.json(coaches)))


router.get('/findCoach', (request, response) => {
  const github_handle = request.user.handle
  const { access_token, google_refresh_token } = request.session
  findUserByHandle(github_handle)
    .then( user => {
      if(user) {
        response.json(user)
      }
      else {
        response.json(null)
      }
    })
    .catch( error => error)
})

router.post('/activate', (request, response) => {
  const github_handle = request.user.handle
  updateUserByHandle(github_handle, {active_coach: true})
    .then(() => response.json({
      isCoach: true,
      message: 'You are activated!'
    }))
})

router.post('/deactivate', (request, response) => {
  const github_handle = request.user.handle
  deactivateCoach(github_handle)
    .then(() => response.json({
      isCoach: false,
      message: 'You are deactivated!'
    }))
})

router.post('/active', ensureGoogleAuth, (request, response) => {
  const github_handle = request.user.handle
  const {access_token, google_refresh_token} = request.session
  const googleEmail = extractEmailFromGoogleSession(request.session)
  findUserByHandle(github_handle).then(user => {
    gcal(access_token).calendarList.list((error, calendarListResp) => {
      if (error) {
        return response.send(500, error.stack)
      } else {
      // TODO let coaches choose which calendar we track/work with
        if (user) {
          updateUserByHandle(github_handle, {active_coach: true})
            .then(() => response.json({
              isCoach: true,
              message: 'Congrats! You are on coach duty!'
            }))
            .catch(error => response.json(error))
        } else {
          createUser({github_handle,
                      active_coach: true,
                      google_token: access_token,
                      google_refresh_token: google_refresh_token,
                      calendar_ids: extractCalendarIds(calendarListResp)})
            .then((coach) => response.json({
              isCoach: true,
              coach: coach,
              message: 'Congrats! You have been activated as a coach.'
            }))
            .catch(error => response.json(error))
        }
      }
    })
  })
  .catch(error => console.error(error))
})

router.delete('/active', (request, response) => {
  const github_handle = request.user.handle
  deactivateCoach(github_handle)
    .then(response.json({
      isCoach: false,
      message: "You're no longer coaching. Take a break."
    }))
})

module.exports = router
