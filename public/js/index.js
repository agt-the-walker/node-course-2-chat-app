const socket = io()

function formattedTime(message) {
  return moment(message.createdAt).format('h:mm a')
}

socket.on('connect', () => console.log('Connected to server'))
socket.on('disconnect', () => console.log('Disconnected from server'))

socket.on('newMessage', message => {
  const template = jQuery('#message-template').html()
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime(message)
  })

  jQuery('#messages').append(html)
})

socket.on('newLocationMessage', message => {
  const template = jQuery('#location-message-template').html()
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime(message)
  })

  jQuery('#messages').append(html)
})

jQuery('#message-form').on('submit', (e) => {
  e.preventDefault()
  const messageTextbox = jQuery('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, () => 
    messageTextbox.val('')
  )
})

const locationButton = jQuery('#send-location')
locationButton.on('click', () => {
  if (!navigator.geolocation)
    return alert('Geolocation not supported by your browser.')

  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(position => {
    locationButton.removeAttr('disabled').text('Send location')

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  }, () => {
    locationButton.removeAttr('disabled').text('Send location')

    alert('Unable to fetch location.')
  })
})
