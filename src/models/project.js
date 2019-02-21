export default {
  namespace: 'project',

  state: {},

  effects: {},

  reducers: {
    save(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
