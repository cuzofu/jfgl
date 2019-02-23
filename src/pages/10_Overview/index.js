import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Empty } from 'antd';
import numeral from 'numeral';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import {
  Pie,
} from '@/components/Charts';
import NumberInfo from '@/components/NumberInfo';
import Result from '@/components/Result';

import ScatterChart from '../99_components/ScatterChart';

import styles from './index.less';

@connect(({ ov, loading }) => ({
  ov,
  loading: loading.models.ov,
}))
class HomePage extends Component {
  state = {
  };

  componentDidMount() {
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'ov/fetchTzxmzlData',
      payload: {},
    });
    dispatch({
      type: 'ov/fetchZlaqjcData',
      payload: {},
    });
  }

  componentWillUnmount() {
  }

  // 总览
  renderOverview = () => {
    const {
      loading,
      ov: {
        tzxmzl: {
          tzze, // 投资总额
          zjxm, // 在建项目数
          jgxm, // 竣工项目数
          tgxm, // 停工项目数
          cbxm, // 筹备中
        },
      }
    } = this.props;
    return (
      <Card loading={loading} bordered={false} bodyStyle={{ height: 500, padding: 10 }}>
        <Card.Meta
          title="总览"
          description={(
            <Row gutter={12}>
              <Col span={6}>
                <NumberInfo
                  subTitle={<span>投资总额</span>}
                  total={`${numeral(tzze).format('0,0')}元`}
                />
              </Col>
              <Col span={5}>
                <NumberInfo
                  subTitle={<span>在建项目</span>}
                  total={`${numeral(zjxm).format('0,0')}个`}
                />
              </Col>
              <Col span={5}>
                <NumberInfo
                  subTitle={<span>竣工项目</span>}
                  total={`${numeral(jgxm).format('0,0')}个`}
                />
              </Col>
              <Col span={4}>
                <NumberInfo
                  subTitle={<span>停工</span>}
                  total={`${numeral(tgxm).format('0,0')}个`}
                />
              </Col>
              <Col span={4}>
                <NumberInfo
                  subTitle={<span>筹备中</span>}
                  total={`${numeral(cbxm).format('0,0')}个`}
                />
              </Col>
            </Row>
          )}
        />
      </Card>
    );
  };

  // 质量安全监测
  renderZlaqjc = () => {
    const {
      loading,
      ov: {
        zlaqjc: {
          zl = 0,
          aq = 0,
        }
      }
    } = this.props;
    const zlPercent = zl === 0 ? 0 : (zl / (zl + aq) * 100).toFixed(2);
    const aqPercent = aq === 0 ? 0 : (aq / (zl + aq) * 100).toFixed(2);
    return (
      <Card loading={loading} bordered={false} bodyStyle={{ height: 250, padding: 10 }}>
        <Card.Meta
          title="质量安全监测"
          description={(
            <Row>
              <Col span={12}>
                <Pie percent={zlPercent} subTitle="质量问题" total={`${zlPercent}%`} height={180} />
              </Col>
              <Col span={12}>
                <Pie percent={aqPercent} subTitle="安全问题" total={`${aqPercent}%`} height={180} color="yellow" />
              </Col>
            </Row>
          )}
        />
      </Card>
    );
  };

  render() {
    const {
      loading,
      ov: {
        tzxmzl,
      }
    } = this.props;

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: { marginBottom: 24 },
    };

    return (
      <GridContent>
        <div>
          <Row gutter={12}>
            <Col span={14}>
              {this.renderOverview()}
            </Col>
            <Col span={10}>
              <Card loading={loading} bordered={false} bodyStyle={{ height: 250, padding: 10 }}>
                <Card.Meta
                  title="投资分布"
                  description={(
                    <ScatterChart height={220} />
                  )}
                />
              </Card>
              <Card loading={loading} bordered={false} bodyStyle={{ height: 250, padding: 10 }}>
                <Card.Meta
                  title="进度总览"
                  description={(
                    <Empty />
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
        <div style={{marginTop: 12}}>
          <Row gutter={12}>
            <Col span={14}>
              <Row gutter={12}>
                <Col span={12} style={{marginBottom: 12}}>
                  {this.renderZlaqjc()}
                </Col>
                <Col span={12} style={{marginBottom: 12}}>
                  <Card loading={loading} bordered={false} bodyStyle={{ height: 250, padding: 10 }}>
                    <Card.Meta
                      title="施工图审查"
                      description={(
                        <Empty />
                      )}
                    />
                  </Card>
                </Col>
                <Col span={12} style={{marginBottom: 12}}>
                  <Card loading={loading} bordered={false} bodyStyle={{ height: 250, padding: 10 }}>
                    <Card.Meta
                      title="工程检测（不合格报告）"
                      description={(
                        <Empty />
                      )}
                    />
                  </Card>
                </Col>
                <Col span={12} style={{marginBottom: 12}}>
                  <Card loading={loading} bordered={false} bodyStyle={{ height: 250, padding: 10 }}>
                    <Card.Meta
                      title="诚信动态"
                      description={(
                        <Empty />
                      )}
                    />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={10}>
              <Card loading={loading} bordered={false} bodyStyle={{ height: 250, padding: 10 }}>
                <Card.Meta
                  title="资金消耗"
                  description={(
                    <Empty />
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>

      </GridContent>
    );
  }
}

export default HomePage;
