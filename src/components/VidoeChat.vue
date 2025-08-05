<template>
  <div class="flex flex-col items-center gap-4 p-6">
    <h1 class="text-2xl font-bold">WebRTC Video Chat</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <video ref="localVideo" autoplay muted playsinline class="w-full rounded-lg shadow" />
      <video ref="remoteVideo" autoplay playsinline class="w-full rounded-lg shadow" />
    </div>

    <div class="flex gap-4 mt-6">
      <button @click="joinRoom" class="px-4 py-2 bg-blue-600 text-white rounded">Join Call</button>
      <button @click="toggleMic" class="px-4 py-2 bg-gray-700 text-white rounded">
        {{ isMicMuted ? 'Unmute' : 'Mute' }}
      </button>
      <button @click="toggleCamera" class="px-4 py-2 bg-gray-700 text-white rounded">
        {{ isCameraOff ? 'Turn Camera On' : 'Turn Camera Off' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'


const socket = io('http://localhost:5000') // Update with server URL if deployed

const localVideo = ref(null)
const remoteVideo = ref(null)

const isMicMuted = ref(false)
const isCameraOff = ref(false)

let localStream
let remoteStream
let peerConnection
const config = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }
  ]
}

const roomId = 'test-room'

const joinRoom = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  localVideo.value.srcObject = localStream

  socket.emit('join', roomId)

  socket.on('user-joined', async (userId) => {
    peerConnection = createPeerConnection()

    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream)
    })

    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)

    socket.emit('offer', {
      target: userId,
      caller: socket.id,
      sdp: offer
    })
  })

  socket.on('offer', async ({ sdp, caller }) => {
    peerConnection = createPeerConnection()

    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream)
    })

    await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp))
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)

    socket.emit('answer', {
      target: caller,
      sdp: answer
    })
  })

  socket.on('answer', async ({ sdp }) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp))
  })

  socket.on('ice-candidate', async ({ candidate }) => {
    if (peerConnection) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
    }
  })
}

const createPeerConnection = () => {
  const pc = new RTCPeerConnection(config)

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('ice-candidate', {
        target: roomId,
        candidate: event.candidate
      })
    }
  }

  pc.ontrack = (event) => {
    if (!remoteStream) {
      remoteStream = new MediaStream()
      remoteVideo.value.srcObject = remoteStream
    }
    remoteStream.addTrack(event.track)
  }

  return pc
}

const toggleMic = () => {
  const track = localStream.getAudioTracks()[0]
  track.enabled = !track.enabled
  isMicMuted.value = !track.enabled
}

const toggleCamera = () => {
  const track = localStream.getVideoTracks()[0]
  track.enabled = !track.enabled
  isCameraOff.value = !track.enabled
}

onBeforeUnmount(() => {
  socket.disconnect()
  peerConnection?.close()
})
</script>
