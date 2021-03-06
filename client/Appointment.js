import React, {Component} from 'react'
import {Card, CardText} from 'material-ui/Card'
import moment from 'moment-timezone'

export default props => {
  const createdAppointment = props.createdAppointment
  let startTime
  let endTime

  if(createdAppointment) {
    startTime = JSON.stringify(
      moment(createdAppointment.appointment_start).tz('America/Los_Angeles')
      .format('MMMM Do YYYY, h:mm a z'))
    endTime = JSON.stringify(
      moment(createdAppointment.appointment_end).tz('America/Los_Angeles')
      .format('MMMM Do YYYY, h:mm a z'))
  }

  if(createdAppointment.error) {
    return <Card>
      <blockquote></blockquote>
      <CardText>
        <strong>{createdAppointment.error} </strong>
      </CardText>
      <CardText>
        {createdAppointment.reason}
      </CardText>
    </Card>
  } else {
    return <Card>
      <blockquote></blockquote>
      <CardText>
        <strong>Your appointment is with: </strong>
        {createdAppointment
          ? createdAppointment.coach_handle
          : unavailable
        }
      </CardText>
      <CardText>
        <strong>At: </strong>
        <span>{startTime} - {endTime}</span>
      </CardText>
      <CardText>
        <strong>Attendees:</strong>
        {createdAppointment
          ? createdAppointment.mentee_handles.map((mentee, i) => <div key={i}>{mentee}</div>)
          : ' 0'
        }
      </CardText>
    </Card>
  }
}
