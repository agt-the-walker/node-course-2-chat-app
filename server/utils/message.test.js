const expect = require('expect')

const {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Mike'
    const text = 'Hello everybody'

    const res = generateMessage(from, text)

    expect(res).toMatchObject({from, text})
    expect(typeof res.createdAt).toBe('number')
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Admin'
    const latitude = 2
    const longitude = -1

    const res = generateLocationMessage(from, latitude, longitude)
    const expectedUrl = 'https://www.google.com/maps?q=2,-1'

    expect(res).toMatchObject({from, url: expectedUrl})
    expect(typeof res.createdAt).toBe('number')
  })
})
