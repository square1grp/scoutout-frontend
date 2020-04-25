import axios from 'axios';
import router from '../../router';

export default {
  namespaced: true,

  state: {
    id: null,
  },
  actions: {
    userLogin(context, payLoad) {
      axios
        .post(process.env.VUE_APP_API_ENDPOINT + '/login', payLoad)
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          context.commit('setUserId', res.data.user_id);
          router.push('/home');
        }).catch(() => {
          context.commit('setUserId', null)
        })
    },
    checkLoginStatus(context) {
      const token = localStorage.getItem('token');
      axios
        .post(process.env.VUE_APP_API_ENDPOINT + '/verify-token', { 'token': token })
        .then((res) => {
          context.commit('setUserId', res.data.user_id);
          router.push('/home');
        }).catch(() => {
          localStorage.removeItem('token');
        })
    }
  },
  mutations: {
    setUserId(state, userId) {
      state.id = userId
    }
  }
}