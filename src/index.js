import * as Cesium from 'cesium'

/**
 * 坐标转换类
 * @param {Object} viewer 地球容器
 * @constructor
 */
class CoorTrans {
  constructor(viewer) {
    this._viewer = viewer;
    this._wmp = new Cesium.WebMercatorProjection();
  }

  /**
  * 屏幕坐标转世界坐标
  * @param {Number} [screenX] 屏幕坐标x
  * @param {Number} [screenY] 屏幕坐标y
  * @returns {Cartesian3} 世界坐标
  */
  fromScreenToCartesian3 (screenX, screenY) {
    let pick = new Cesium.Cartesian2(screenX, screenY);
    if (this._viewer.scene.mode === 3) {
      return this._viewer.scene.globe.pick(this._viewer.camera.getPickRay(pick), this._viewer.scene);
    } else {
      return this._viewer.camera.pickEllipsoid(pick, this._viewer.scene.globe.ellipsoid);
    }
  }

  /**
  * 世界坐标转地理坐标（弧度）
  * @param {Cartesian3} [cartesian] 世界坐标
  * @returns {Cartographic} 地理坐标（弧度）
  */
  fromCartesian3ToCartographic (cartesian) {
    return this._viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
  }

  /**
   * 世界坐标转屏幕坐标
   * @param {Cartesian3} [cartesian] 世界坐标
   * @returns {Cartesian2} 屏幕坐标
   */
  fromCartesian3ToScreen (cartesian) {
    return Cesium.SceneTransforms.wgs84ToWindowCoordinates(this._viewer.scene, cartesian);
  }

  /**
   * 世界坐标转经纬度坐标
   * @param {Cartesian3} cartesian  世界坐标
   * @returns {Object} 经纬度坐标
   */
  fromCartesian3ToDegree (cartesian) {
    let cartographic = this.fromCartesian3ToCartographic(cartesian);
    return this.fromCartographicToDegree(cartographic)
  }

  /**
   * 地理坐标（弧度）转经纬度坐标
   * @param {Cartographic} [cartographic] 地理坐标（弧度）
   * @returns {Object} 经纬度坐标
   */
  fromCartographicToDegree (cartographic) {
    return {
      "lon": Cesium.Math.toDegrees(cartographic.longitude),
      "lat": Cesium.Math.toDegrees(cartographic.latitude),
      "height": cartographic.height
    }
  }

  /**
   * 地理坐标（弧度）转世界坐标
   * @param {Cartographic} [cartographic] 地理坐标（弧度）
   * @returns {Cartesian3} 世界坐标
   */
  fromCartographicToCartesian3 (cartographic) {
    return this._viewer.scene.globe.ellipsoid.cartographicToCartesian(cartographic);
  }

  /**
   * 经纬度坐标转地理坐标（弧度）
   * @param {Object} [degrees] 经纬度坐标
   * @returns {Cartographic} 地理坐标（弧度）
   */
  fromDegreesToCartographic (degrees) {
    return Cesium.Cartographic.fromDegrees(degrees.lon, degrees.lat, degrees.height);
  }

  /**
   * 经纬度转世界坐标
   * @param {Object} [degrees] 经纬度坐标
   * @returns {Cartesian3} 世界坐标
   */
  fromDegreesToCartesian3 (degrees) {
    return Cesium.Cartesian3.fromDegrees(degrees.lon, degrees.lat, degrees.height);
  }

  /**
   * WGS84坐标转墨卡托
   * @param {Cartographic} cartographic 经纬度（弧度）
   * @returns {Cartesian3} 墨卡托坐标，单位米
   */
  fromWGS84ToMercator (cartographic) {
    return this._wmp.project(cartographic);
  }

  /**
   * 墨卡托坐标转WGS84
   * @param {Cartesian3} cartesian 墨卡托坐标，单位米，例如new Cartesian3(x,y,0)
   * @returns {Cartographic} 经纬度（弧度）
   */
  fromMercatorToWGS84 (cartesian) {
    return this._wmp.unproject(cartesian)
  }

}

export default {
  CoorTrans
}
