import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: '升思科技',
          title: '升思科技',
          href: 'http://www.jsgl.com.cn/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/cuzofu',
          blankTarget: true,
        },
        {
          key: 'cuzofu',
          title: 'cuzofu',
          href: 'http://www.cuzofu.com',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 湖北升思科技股份有限公司
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
