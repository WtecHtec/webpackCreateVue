<!-- App.vue -->
<template>
     <div id="root" class="main-container test">
    <!-- 左侧菜单区 -->
    <!-- 右侧视图 -->
    <div class="main-container-content"  style=" background: blue;">
      <!-- 上部导航区 -->
      <div class="content">
      sadadadadadadadadadadadadadadadadadadadad
   <svg-icon icon-class="lan"></svg-icon>
      </div>
  
      <!-- 子应用渲染区 -->
      <div class="main-container-view">
        <el-scrollbar class="wl-scroll">
          <div id="root-view" class="app-view-box" v-html="content"></div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>


<script>
import LayerTmpShape from './compentcoms/layerTmpShape.vue'
    //dsadasdasdsa
    export default {
        name: 'app',
        components:{
            LayerTmpShape
        },
        props: {
            loading: Boolean,
            content: String
        }
    }
</script>
<style scoped >
.test {
    width: 400px;
    
}
</style>
<style scoped src="./index.css"></style>

