// store/camera.js

// State to store the camera stream
export const state = () => ({
  videoStream: null
})

// Mutations to update the state
export const mutations = {
  // Start the camera and update the videoStream
  start(state, video) {
    state.videoStream = video
  },
  // Stop the camera and release tracks
  stop(state) {
    if (state.videoStream) {
      state.videoStream.getTracks().forEach(track => track.stop())
      state.videoStream = null
    }
  }
}

// Actions to interact with the camera
export const actions = {
  // Start the camera and commit the stream to the state
  async startCamera({ commit, state }) {
    try {
      if (!state.videoStream && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        commit('start', stream);
        return stream;
      } else {
        throw new Error('Camera is already started or the browser doesn\'t support WebRTC');
      }
    } catch (error) {
      console.error('Error starting camera:', error);
      throw new Error('Unable to start camera. Please check permissions and try again.');
    }
  },
  // Stop the camera by committing a mutation
  stopCamera({ commit }) {
    commit('stop');
  }
}

// Getters to retrieve the camera state
export const getters = {
  isCameraStarted: (state) => {
    return !!state.videoStream;
  }
}
