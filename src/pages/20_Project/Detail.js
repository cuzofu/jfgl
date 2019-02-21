import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import { matchParamsPath } from '@/utils/menuDataUtils';

// import styles from './SampleList.less';

const tripLastSlash = path => {
  // return path.replace(/\/$/gi, '');
  const temp = path.replace(/\/$/gi, '');
  if (path === temp) {
    return path;
  }
  return tripLastSlash(temp);
};

const replaceAllSlash = (path, toStr = '_') => path.replace(/\//g, toStr);

@connect(({ project, panes, loading }) => ({
  project,
  panes,
  loading: loading.models.project,
}))
@Form.create()
export default class Detail extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      location: { pathname },
      panes: { routes, panes, activeKey },
    } = this.props;

    if (activeKey === replaceAllSlash(tripLastSlash(pathname))) return;
    const isExist =
      panes.filter(item => item.key === replaceAllSlash(tripLastSlash(pathname))).length > 0;
    if (isExist) {
      dispatch({
        type: 'panes/changeTabStatus',
        payload: {
          activeKey: replaceAllSlash(tripLastSlash(pathname)),
        },
      });
    } else {
      const matchPath = matchParamsPath(pathname, routes);
      const { closable, name, path } = matchPath;
      dispatch({
        type: 'panes/changeTabStatus',
        payload: {
          panes: panes.concat([
            {
              key: replaceAllSlash(tripLastSlash(pathname)),
              path,
              name,
              closable,
              url: pathname,
            },
          ]),
          activeKey: replaceAllSlash(tripLastSlash(pathname)),
        },
      });
    }
  }

  render() {
    return (
      <GridContent>
        <Card bordered={false}>
          <div>工程详细信息</div>
        </Card>
      </GridContent>
    );
  }
}
