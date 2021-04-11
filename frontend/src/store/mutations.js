export default {
  setUserId(state, id) {
    state.id = id;
  },
  setUsername(state, username) {
    state.username = username;
  },
  setUserEmail(state, email) {
    state.email = email;
  },
  setToken(state, token) {
    state.token = `Token ${token}`;
  },
  setUserLocation(state, location) {
    state.location = location;
  },
  setImg(state, img) {
    state.profileImg = img;
  },
  toggleDrawerOpen(state) {
    state.drawerOpen = !state.drawerOpen;
  },
};
