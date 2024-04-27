<template>
    <div class="row">
        <h3 class="text-center mb-0 mt-3">搜索地点</h3>
    </div>
    <hr>
    <div class="row ms-3 me-3">
        <div class="col-3">
            <div class="card">
                <div class="card-body">
                    <form>
                        <div class="row mb-2">
                            <div class="col-12 d-flex">
                                <label for="validationDefault01"
                                    class="form-label col-form-label flex-shrink-0">地点名称：</label>
                                <input v-model="location.keywords" type="text" class="form-control"
                                    id="validationDefault01" required>
                            </div>
                        </div>
                    </form>
                    <button @click="search" class="btn btn-primary d-block mx-auto px-4" type="submit">搜索</button>
                </div>
            </div>
        </div>
        <div class="col-9">
            <div class="card">
                <div class="card-header">
                    <h4>搜索结果</h4>
                </div>
                <div class="card-body pb-0">
                    <div class="row d-flex">
                        <div class="col-3 mb-3">
                            <div class="card">
                                <div class="card-body">
                                </div>
                            </div>
                        </div>
                        <div class="col-3 mb-3">
                            <div class="card">
                                <div class="card-body">
                                </div>
                            </div>
                        </div>                        <div class="col-3 mb-3">
                            <div class="card">
                                <div class="card-body">
                                </div>
                            </div>
                        </div>                        <div class="col-3 mb-3">
                            <div class="card">
                                <div class="card-body">
                                </div>
                            </div>
                        </div>                        <div class="col-3 mb-3">
                            <div class="card">
                                <div class="card-body">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from "axios";

const location = ref({
    key: '518b07d5cd81f2223b969d4f31dca862',
    keywords: '',
    region: '嘉兴市'
});

function search() {
    axios.get('https://restapi.amap.com/v5/place/text', {
        params: {
            key: location.value.key,
            keywords: location.value.keywords,
            region: location.value.region
        }
    }).then(res => {
        alert(res.data.pois);
    }).catch(err => {
        alert(err);
    });
}
</script>