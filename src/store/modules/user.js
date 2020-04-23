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
          context.commit('setUserId', res.data.user_id);
          router.push('/home');
        }).catch(() => {
          context.commit('setUserId', null)
        })
    }
  },
  mutations: {
    setUserId(state, userId) {
      state.id = userId
    }
  }
}