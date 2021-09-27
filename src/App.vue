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
          <l-circle
            :lat-lng="safeConfig.pos"
            :radius="safeConfig.r"
            :stroke="false"
            fillColor="#fff"
            :fillOpacity="0.5"
          />
          <l-polygon
            :lat-lngs="getPoisonLatLngs"
            :stroke="false"
            fillColor="#5F22C1"
            :fillOpacity="0.5"
          ></l-polygon>
        </l-map>
      </div>
      <div class="slider-wrapper">
        <el-slider
          :min="sliderConfig.min"
          :max="sliderConfig.max"
          :step="sliderConfig.step"
          v-model="sliderValue"
        ></el-slider>
      </div>
    </div>
  </div>
</template>

<script>
import { LMap, LImageOverlay, LPolygon, LCircle } from 'vue2-leaflet'
import { onGenCirclePoints, onLerp } from './utils'

export default {
  components: {
    LMap,
    LImageOverlay,
    LPolygon,
    LCircle
  },
  data() {
    return {
      sliderValue: 0
    }
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
    this.poisonConfig = {
      outerR: 800 * this.mapScale,
      innerR: 100 * this.mapScale,
      outerPos: {
        x: 0 * this.mapScale,
        y: 0 * this.mapScale
      },
      innerPos: {
        x: 300 * this.mapScale,
        y: 300 * this.mapScale
      }
    }
    this.safeConfig = {
      r: this.poisonConfig.innerR,
      pos: [this.poisonConfig.innerPos.x, this.poisonConfig.innerPos.y]
    }
    this.sliderConfig = {
      min: 0,
      max: 100,
      step: 1
    }
  },
  computed: {
    getPoisonLatLngs() {
      // return (points) => this.onPolygonPoints(points)
      return this.onPolygonPoints(this.onLerpPoints(this.sliderValue))
    }
  },
  methods: {
    onLerpPoints(sliderValue) {
      const { outerR, innerR, outerPos, innerPos } = this.poisonConfig
      const { min, max } = this.sliderConfig
      const co = Math.min((sliderValue - min) / (max - min), 1)
      const r = onLerp(outerR, innerR, co)
      const x = onLerp(outerPos.x, innerPos.x, co)
      const y = onLerp(outerPos.y, innerPos.y, co)
      return onGenCirclePoints(r, { x, y })
    },
    onPolygonPoints(points = []) {
      return [
        [846 * this.mapScale, -1464 * this.mapScale],
        ...points,
        [846 * this.mapScale, -1464 * this.mapScale],
        [846 * this.mapScale, 1464 * this.mapScale],
        [-846 * this.mapScale, 1464 * this.mapScale],
        [-846 * this.mapScale, -1464 * this.mapScale]
      ]
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
