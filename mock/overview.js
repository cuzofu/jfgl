const queryOverviewData = (req, res) =>
  res.json({
      code: 0,
      msg: 'success',
      data: {
        tzze: 12454323.23, // 投资总额
        zjxm: 9, // 在建项目数
        jgxm: 6, // 竣工项目数
        tgxm: 1, // 停工项目数
        cbxm: 2, // 筹备中
      },
    }
  );

const queryZlaqjcData = (req, res) =>
  res.json({
    code: 0,
    msg: 'success',
    data: {
      zl: 111,
      aq: 212,
    }
  });

export default {
  // 总览
  'GET /api/ov/overview': queryOverviewData,
  // 质量安全监测
  'GET /api/ov/zlaqjc': queryZlaqjcData,
};
