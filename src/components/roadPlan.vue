<template>
    <div class="row">
        <h3 class="text-center mt-2">路径规划</h3>
    </div>
    <hr>
    <div class="row">
        <div class="col-4">
            <div class="card ms-3">
                <div class="card-body">
                    <form>
                        <div class="row mb-2">
                            <div class="col-12 d-flex">
                                <label for="validationDefault01"
                                    class="form-label col-form-label flex-shrink-0">始发地：</label>
                                <input v-model="data.origin" ype="text" class="form-control" id="validationDefault01"
                                    required>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-12 d-flex">
                                <label for="validationDefault01"
                                    class="form-label col-form-label flex-shrink-0">终点：</label>
                                <input v-model="data.destination" type="text" class="form-control"
                                    id="validationDefault01" required>
                            </div>
                        </div>
                        <select class="form-select mb-3" v-model="tranSelect">
                            <option selected value="driving">驾车</option>
                            <option value="walking">步行</option>
                            <option value="transit/integrated">公交</option>
                        </select>
                    </form>
                    <button class="btn btn-primary d-block mx-auto" type="submit" @click="submit">开始规划</button>
                </div>
            </div>
        </div>
        <div class="col-8">
            <div class="card">
                <div class="card-header">
                    <h4 class="text-center">规划结果</h4>
                </div>
                <div class="card-body">
                    <div v-if="tranSelect == 'transit/integrated'">
                        <div v-for="(item, index) in roadPlan" :key="index">
                            <h5 class="text-success">路线 {{ index + 1 }}</h5>
                            <ul>
                                <li v-for="(stageone, index) in item.segments[0].walking.steps" :key="index">
                                    {{ stageone.instruction }}
                                </li>
                                <div v-if="item.segments[0].bus.buslines.length == 1">
                                    <li v-for="(stagetwo, index) in item.segments[0].bus.buslines" :key="index">
                                        从 {{ stagetwo.departure_stop.name }} 站上车，乘坐 {{ stagetwo.name }} 到 {{
                                    stagetwo.arrival_stop.name }} 站下车
                                    </li>
                                </div>
                                <div v-else>
                                    <li>
                                        从 {{ item.segments[0].bus.buslines[0].departure_stop.name }} 站上车
                                    </li>
                                    <ul>
                                        <li v-for="(stagetwo, index) in item.segments[0].bus.buslines" :key="index">
                                            乘坐 {{ stagetwo.name }} 到 {{ stagetwo.arrival_stop.name }} 站下车
                                        </li>
                                    </ul>
                                </div>
                                <li v-for="(stagethree, index) in item.segments[1].walking.steps" :key="index">
                                    {{ stagethree.instruction }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div v-else>
                        <ul>
                            <li v-for="(item, index) in roadPlan" :key="index">
                                {{ item.instruction }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios';

const data = ref({
    key: '518b07d5cd81f2223b969d4f31dca862',
    origin: '',
    destination: '',
});

// 请求结果
const roadPlan = ref();
const tranSelect = ref('driving');

function submit() {
    // 公交车请求
    if (tranSelect.value === 'transit/integrated') {
        axios.get('https://restapi.amap.com/v5/direction/transit/integrated', {
            params: {
                key: data.value.key,
                origin: data.value.origin,
                destination: data.value.destination,
                city1: '010',
                city2: '010'
            }
        }).then(res => {
            console.log(res.data);
            roadPlan.value = res.data.route.transits;
        }).catch(err => {
            // 输出错误信息到控制台
            console.error(err);
            alert('请求出错，请查看控制台了解详情。');
        });
    } else {
        // 驾车和步行请求
        axios.get('https://restapi.amap.com/v5/direction/' + tranSelect.value, {
            params: {
                key: data.value.key,
                origin: data.value.origin,
                destination: data.value.destination,
            }
        }).then(res => {
            console.log(res.data);
            roadPlan.value = res.data.route.paths[0].steps;
        }).catch(err => {
            // 输出错误信息到控制台
            console.error(err);
            alert('请求出错，请查看控制台了解详情。');
        });
    }
}
</script>