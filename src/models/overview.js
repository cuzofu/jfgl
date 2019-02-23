import { queryOverviewData, queryZlaqjcData } from '@/services/api';

export default {
  namespace: 'ov',

  state: {
    // 投资项目信息总览
    tzxmzl: {},
    // 投资分布
    tzfb: [],
    // 项目进度总览
    xmjdList: [],
    // 质量安全监测（在建项目）
    zlaqjc: {
      zl: 0,
      aq: 0,
    },
    // 施工图审查
    sgtsc: [],
    // 工程检测（不合格报告）
    gcjcbhgbg: [],
    // 诚信动态
    cxdt: [],
    // 资金消耗
    zjxh: [],
  },

  effects: {
    // 获取投资项目信息总览
    *fetchTzxmzlData({ payload }, { call, put }) {
      let tzxmzl = {};
      try {
        const response = yield call(queryOverviewData);
        if (response && response.code === 0 && response.msg === 'success') {
          tzxmzl = response.data;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          tzxmzl,
        },
      });
    },
    *fetchZlaqjcData({ payload }, { call, put }) {
      let zlaqjc = { zl: 0, aq: 0 };
      try {
        const response = yield call(queryZlaqjcData);
        if (response && response.code === 0 && response.msg === 'success') {
          zlaqjc = response.data;
        }
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: {
          zlaqjc,
        },
      });
    }
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
        // 投资项目信息总览
        tzxmzl: {},
        // 投资分布
        tzfb: [],
        // 项目进度总览
        xmjdList: [],
        // 质量安全监测（在建项目）
        zlaqjc: {
          zl: 0,
          aq: 0,
        },
        // 施工图审查
        sgtsc: [],
        // 工程检测（不合格报告）
        gcjcbhgbg: [],
        // 诚信动态
        cxdt: [],
        // 资金消耗
        zjxh: [],
      };
    },
  },
};
