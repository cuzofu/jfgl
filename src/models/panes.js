export default {
  namespace: 'panes',

  state: {
    routes: [],
    panes: [
      {
        key: '_overview',
        path: '/overview',
        url: '/overview',
        name: '总览',
        closable: false,
      },
    ],
    activeKey: '_overview',
  },

  effects: {
    *changeTabStatus({ payload, callback }, { put }) {
      yield put({
        type: 'save',
        payload,
      });
      if (callback) {
        callback();
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        routes: [],
        panes: [
          {
            key: '_overview',
            path: '/overview',
            url: '/overview',
            name: '总览',
            closable: false,
          },
        ],
        activeKey: '_overview',
      };
    },
  },
};
