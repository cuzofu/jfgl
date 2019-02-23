import React, {Component} from 'react';

import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts";

class ScatterChart extends Component {

  componentDidMount() {
  }

  render() {
    const {
      height = 500,
      title = {
        x: '日期',
        y: '投资额（元）',
      },
      data = [
        {
          "x": "西陵区",
          "type": "住宅工程",
          "y": 123
        }, {
          "x": "伍家区",
          "type": "公共建筑",
          "y": 1773.5
        }, {
          "x": "点军区",
          "type": "工业厂房",
          "y": 1145.56
        }, {
          "x": "猇亭区",
          "type": "构筑物",
          "y": 8695.15
        }, {
          "x": "夷陵区",
          "type": "市政工程",
          "y": 912.5
        }, {
          "x": "西陵区",
          "type": "绿化工程",
          "y": 490.5
        }, {
          "x": "夷陵区",
          "type": "其他",
          "y": 90.5
        },
      ]
    } = this.props;
    const scale = !title.y ? {} : {
      y: {
        alias: title.y,
      }
    };
    return (
      <div>
        <Chart
          scale={scale}
          height={height}
          data={data}
          forceFit
        >
          <Tooltip
            crosshairs={{
              type: "cross"
            }}
          />
          <Axis
            name="x"
            tickLine={null}
            subTickCount={1}
            subTickLine={{
              lineWidth: 1,
              stroke: "#BFBFBF",
              length: 4
            }}
            grid={{
              align: "center",
              // 网格顶点从两个刻度中间开始
              lineStyle: {
                stroke: "#E9E9E9",
                lineWidth: 1,
                lineDash: [3, 3]
              }
            }}
          />
          <Axis
            name="y"
            grid={null}
            title={{
              // autoRotate: false,
              textStyle: {
                fontSize: '12',
                textAlign: 'center',
                // fill: '#000000',
                fontWeight: 'bold',
                // rotate: 0
              },
              // position: 'start',
            }}
            line={{
              fill: '#BFBFBF',
              lineWidth: 1
            }}
          />
          <Legend reversed />
          <Geom
            type="point"
            position="x*y"
            color="type"
            opacity={0.65}
            shape="circle"
            size={4}
          />
        </Chart>
      </div>
    );
  }
}

export default ScatterChart;
