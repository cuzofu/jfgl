import React from 'react';
import classnames from 'classnames';

import styles from './SearchLayer.less';

export default class SearchLayer extends React.Component {
  constructor() {
    super();
    this.loadUI();
    this.state = {
      selectedDataId: null,
    }
  }

  changeSelectedDataId = dataId => {
    this.setState({
      selectedDataId: dataId,
    });
  };

  isSelectedDataId = (dataId) => this.state.selectedDataId === dataId;

  loadUI = () => {
    window.AMapUI.loadUI(
      ['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
      (MarkerList, SimpleMarker, SimpleInfoWindow) => {
        this.initPage(MarkerList, SimpleMarker, SimpleInfoWindow);
      })
  };

  initPage = (MarkerList, SimpleMarker, SimpleInfoWindow) => {

    // this.initSimpleMarker(SimpleMarker);
    this.initMarkerList(MarkerList, SimpleInfoWindow, SimpleMarker);

  };

  initSimpleInfoWindow = SimpleInfoWindow => {
    console.log(SimpleInfoWindow);
  };

  initSimpleMarker = (SimpleMarker) => {
    const {
      __map__,
    } = this.props;

    // 这个例子来自官方文档 http://lbs.amap.com/api/javascript-api/guide/amap-ui/intro
    new SimpleMarker({
      // 前景文字
      iconLabel: 'A',
      // 图标主题
      iconTheme: 'default',
      // 背景图标样式
      iconStyle: 'red',
      // ...其他Marker选项...，不包括content
      map: __map__,
      position: [111.286723, 30.692746]
    });

  };

  initMarkerList = (MarkerList, SimpleInfoWindow, SimpleMarker) => {
    const {
      __map__,
    } = this.props;

    // 即jQuery/Zepto
    const $ = MarkerList.utils.$;

    const defaultIconStyle = (index) => `red-${(index + 1)}`; // 默认的图标样式
    const hoverIconStyle = (index) => `blue-${(index + 1)}`; // 鼠标hover时的样式
    const selectedIconStyle = (index) => `blue-${(index + 1)}`; // 选中时的图标样式

    const markerList = new MarkerList({
      map: __map__,
      // ListElement对应的父节点或者ID
      listContainer: this.markerListRef, // document.getElementById("myList"),
      // 选中后显示
      getDataId: (dataItem, index) => !dataItem.id ? index : dataItem.id,
      // 返回数据项的经纬度，AMap.LngLat实例或者经纬度数组
      getPosition: (dataItem) => dataItem.location,
      getMarker: (dataItem, context, recycledMarker) => {

        if (recycledMarker) {
          recycledMarker.setIconStyle(defaultIconStyle(context.index));
          return null;
        }

        return new SimpleMarker({
          iconTheme: 'numv1',
          containerClassNames: 'my-marker',
          iconStyle: defaultIconStyle(context.index),
        });

      },
      getInfoWindow: (dataItem, context, recycledInfoWindow) => {

        if (recycledInfoWindow) {

          recycledInfoWindow.setInfoTitle(dataItem.name);
          recycledInfoWindow.setInfoBody(dataItem.address);

          return recycledInfoWindow;
        }

        return new SimpleInfoWindow({
          infoTitle: dataItem.name,
          infoBody: dataItem.address,
          offset: new window.AMap.Pixel(0, -32)
        });
      },
      getListElement: (dataItem, context, recycledListElement) => {

        const label = `${(context.index + 1)}`;
        const url = dataItem.photos && dataItem.photos[0] && dataItem.photos[0].url;
        const template = `<div>
            ${!url ? '<div >' : `<div class="poiImgbox">
                <span class="poiImg" style={{backgroundImage: ${!url ? "none" : `url('${url}')`} />
              </div>`}
            <div class="poiInfoLeft">
              <h3 class="poiTitle">${label}. ${dataItem.name}</h3>
              <div class="poiInfo">
                <p class="poiAddr">地址：${dataItem.address}</p>
                ${!dataItem.tel ? '<div />' : `<p class="poiAddr">电话：${dataItem.tel}</p>`}
              </div>
            </div>
            <div class="clear" />
          </div>`;

        console.log(template);

        // 使用模板创建
        const innerHTML = MarkerList.utils.template(`${template}`, {dataItem, label,});

        if (recycledListElement) {
          // recycledListElement.innerHTML = innerHTML;
          return (
            <div>
              {dataItem.photos && dataItem.photos[0] ? (
                <div className={styles.poiImgbox}>
                  <span className={styles.poiImg} style={{backgroundImage: !dataItem.photos[0].url ? "none" :`url(${dataItem.photos[0].url})`}} />
                </div>
              ) : null}
              <div className={styles.poiInfoLeft}>
                <h3 className={styles.poiTitle}>{`${label}. ${dataItem.name}`}</h3>
                <div className={styles.poiInfo}>
                  <p className={styles.poiAddr}>地址：{`${dataItem.address}`}</p>
                  {!dataItem.tel ? null : <p className={styles.poiAddr}>电话：{`${dataItem.tel}`}</p>}
                </div>
              </div>
              <div className={styles.clear} />
            </div>
          );
        }

        console.log(innerHTML);
        // 返回一段html，MarkerList将利用此html构建一个新的dom节点
        const liStart = '<li className={styles.poibox}>';
        const liEnd = '</li>';
        return `${liStart}${innerHTML}${liEnd}`;
      },
      // 列表节点上监听的事件
      listElementEvents: ['click', 'mouseenter', 'mouseleave'],
      // marker上监听的事件
      markerEvents: ['click', 'mouseover', 'mouseout'],
      // makeSelectedEvents:false,
      selectedClassNames: 'selected',
      autoSetFitView: true
    });

    // 监听选中改变
    markerList.on('selectedChanged', (event, info) => {
      if (info.selected) {

        if (info.selected.marker) {
          // 更新为选中样式
          info.selected.marker.setIconStyle(selectedIconStyle(info.selected.index));
        }
      }

      if (info.unSelected && info.unSelected.marker) {
        // 更新为默认样式
        info.unSelected.marker.setIconStyle(defaultIconStyle(info.unSelected.index));
      }
    });

    // 监听Marker和ListElement上的点击，详见markerEvents，listElementEvents
    markerList.on('markerClick listElementClick', (event, record) => {
      if (record && record.marker) {
        // 非选中的id
        if (!this.isSelectedDataId(record.id)) {
          // 设置为hover样式
          record.marker.setIconStyle(hoverIconStyle(record.index));
          // this.closeInfoWindow();
        }

        this.changeSelectedDataId(record.id);
      }
    });

    const data = [{
      id: 'A',
      location: [116.020764, 39.904989],
      name: '工程_1',
      address: '发展大道',
      tel: '13886665321',
      photos: [
        {url: 'http://store.is.autonavi.com/showpic/5922017f93991319bc5061e631762e6c',}
      ],
    }, {
      id: 'B',
      location: [116.405285, 39.904989],
      name: '工程_2',
      address: '大连路',
      tel: '13954548625',
      photos: [
        {url: 'http://store.is.autonavi.com/showpic/ad8600dd79a47921aabd46e2de112f8e',}
      ],
    }, {
      id: 'C',
      location: [116.789806, 39.904989],
      name: '工程_3',
      address: '峡州大道',
      tel: '18565236531',
      photos: [
        {url: 'http://store.is.autonavi.com/showpic/04ab503bd5e616546a7ea5f5e1b5ad03',}
      ],
    }];

    window.markerList = markerList;

    let inited = false;
    const $keywords = $('#keywords');
    const $pagination = $('#pagination-demo');

    const goPage = (page, placeSearch) => {

      // 设置当前页
      placeSearch.setPageIndex(page);
      // 关键字查询
      placeSearch.search($keywords.val(), (status, result) => {

        if (status !== 'complete') {
          alert('返回数据出错!');
        }

        // render当前页的数据
        markerList.render(result.poiList.pois);

        if (!inited) {
          inited = true;
        }

      });
    };

    window.AMap.plugin(["AMap.PlaceSearch"], () => {

      // 构造地点查询类
      const placeSearch = new window.AMap.PlaceSearch({
        pageSize: 5,
        pageIndex: 1,
        extensions: 'all',
        city: "0717" // 城市
      });

      goPage(1, placeSearch);
      $keywords.on('keypress', (e) => {
        if (e.which === 13) {
          inited = false;
          goPage(1);
        }
      });
    });

    // 绘制数据源，Let's go!
    // markerList.render([]);

    // 清除数据
    // markerList.render([]);

  };

  render() {
    return (
      <div>
        <input className={styles.keywords} type="text" id="keywords" ref={ref => {this.keywordsRef = ref}} value="博物馆" onChange={(val) => {console.log(val)}} />
        <div id="panel" className={classnames(styles.panel, styles.scrollbar1)}>
          <ul id="pagination-demo" ref={ref => {this.paginationRef = ref}} className={classnames(styles.ulli, styles.pagination, styles.paginationSM)} />
          <ul id="myList" ref={ref => {this.markerListRef = ref}} className={classnames(styles.ulli, styles.pagination, styles.paginationSM)} />
        </div>
      </div>
    );
  }
}
