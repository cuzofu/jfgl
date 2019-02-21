import React, { Component } from 'react';
import { connect } from 'dva';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

// import styles from './index.less';

@connect(({ panes, loading }) => ({
  panes,
  loading: loading.models.panes,
}))
export default class Home extends Component {
  render() {
    return <GridContent />;
  }
}
