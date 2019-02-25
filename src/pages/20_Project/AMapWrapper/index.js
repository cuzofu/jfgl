import React, {Component} from 'react';

import {Map} from 'react-amap';
import SearchLayer from './SearchLayer';

import { GenUuid } from "@/utils/utils";

export default class AMapWrapper extends Component {

  constructor() {
    super();
    this.plugins = ['Scale'];
    this.amapEvents = {
      created: (mapInstance) => {
        console.log(mapInstance);
      }
    };
    this.markerEvents = {
      created: (markerInstance) => {
        console.log(markerInstance.getPosition());
      }
    };
  }

  componentWillMount() {
  }

  render() {
    const {
      height = window.innerHeight-300,
      width = '100%',
      id = GenUuid(),
      zoom = 15,
      center = {
        longitude: 111.286723,
        latitude: 30.692746,
      }
    } = this.props;
    return (
      <div id={id} style={{width, height}}>
        <Map
          zoom={zoom}
          center={center}
          useAMapUI
          plugins={this.plugins}
          events={this.amapEvents}
          amapKey="6bc3a5a160c4030f103b037c821e5fd6"
        >
          <SearchLayer />
        </Map>
      </div>
    );
  }
}
