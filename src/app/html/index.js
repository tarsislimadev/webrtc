const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }

const sendSignalingMessage = (params) => console.log('sendSignalingMessage', params)

const createPeerConnection = async () => {
  const conn = new RTCPeerConnection()
  conn.addEventListener('negotiationneeded', () => conn.createOffer().then((offer) => conn.setLocalDescription(offer)).then(() => sendSignalingMessage({ type: 'video-offer', sdp: conn.localDescription })))
  conn.addEventListener('signalingstatechange', () => console.log('signalingstatechange'))
  conn.addEventListener('icegatheringstatechange', () => console.log('icegatheringstatechange'))
  conn.addEventListener('icecandidate', () => console.log('icecandidate'))
  // conn.addEventListener('track', () => console.log('track'))
  // conn.addEventListener('removetrack', () => console.log('removetrack'))
  // conn.addEventListener('iceconnectionstatechange', () => console.log('iceconnectionstatechange'))
  const channel = conn.createDataChannel('chat')
  channel.addEventListener('open', (event) => console.log('open', event))
  channel.addEventListener('message', (event) => console.log('message', event))
}

createPeerConnection()
