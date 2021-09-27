<template>
  <div id="app">
    <div class="app-container">
      <div class="map-wrapper">
        <l-map
          :crs="crs"
          :options="mapOptions"
          :center="[mapConfig.centerY, mapConfig.centerX]"
        >
          <l-image-overlay
            :url="mapConfig.url"
            :bounds="mapConfig.bounds"
          ></l-image-overlay>
        </l-map>
      </div>
      <div class="slider-wrapper">
        <el-slider :min="0" :max="100" :step="1"></el-slider>
      </div>
    </div>
  </div>
</template>

<script>
import { LMap, LImageOverlay } from 'vue2-leaflet'

export default {
  components: {
    LMap,
    LImageOverlay
  },
  created() {
    // eslint-disable-next-line no-undef
    this.crs = L.CRS.Simple
    this.mapScale = 0.3
    this.mapOptions = {
      attributionControl: false,
      scrollWheelZoom: true,
      maxZoom: 4
    }
    this.mapConfig = {
      url: require('./images/map.png'),
      bounds: [
        [
          [-846 * this.mapScale, -1464 * this.mapScale],
          [846 * this.mapScale, 1464 * this.mapScale]
        ]
      ],
      centerX: 0,
      centerY: 0
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin center {
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  @include center;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #0f131a;

  .app-container {
    @include center;
    position: relative;
    width: 60%;
    height: 800px;
    background-color: #1a1d24;
    border-radius: 5px;
  }

  .map-wrapper {
    width: 80%;
    height: 80%;

    /deep/ .leaflet-container {
      background: transparent !important;
      border-radius: 5px;
    }
  }

  .slider-wrapper {
    position: absolute;
    bottom: 20px;
    left: 10%;
    width: 80%;
    padding: 4px 40px 0;
    height: 48px;
    background-color: #0f131a;

    /deep/ .el-slider__runway {
      background-color: #666;
    }
  }
}
</style>
