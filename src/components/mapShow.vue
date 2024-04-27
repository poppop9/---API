<template>
    <div class="row">
        <h3 class="text-center">地图展示</h3>
    </div>
    <hr>
    <div class="row d-flex">
        <div class="col-6 mx-auto">
            <div ref="mapContainer" id="container" style="height: 500px;">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const mapContainer = ref(null);

onMounted(() => {
    window._AMapSecurityConfig = {
        securityJsCode: "8d53d6cb7dfbae0cd6da8a9615c64ccd",
    };

    const script = document.createElement('script');
    script.src = "https://webapi.amap.com/loader.js";
    script.onload = () => {
        window.AMapLoader.load({
            key: "b64d1cb2f3c46d04d9490ed78ec72691", // 你的高德地图 Key
            version: "2.0", // 高德地图版本
            plugins: ['AMap.Geolocation'] // 加载定位插件
        })
            .then((AMap) => {
                const map = new AMap.Map(mapContainer.value);

                const geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true, // 是否使用高精度定位，默认:true
                    timeout: 10000, // 超过10秒后停止定位，默认：无穷大
                    maximumAge: 0, // 定位结果缓存0毫秒，默认：0
                    convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                });

                map.addControl(geolocation);
                geolocation.getCurrentPosition();
            })
            .catch((e) => {
                console.error(e);
            });
    };
    document.body.appendChild(script);
});
</script>
