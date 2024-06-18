<script setup lang="ts">
localStorage.setItem('selectedKey', "5");
import PPTInpView from "@/views/PPTView/PPTInpView.vue";
</script>

<template>
  <div class="div-overflow">
    <div class="div-inp">
      <PPTInpView></PPTInpView>
    </div>
    <!--    <iframe src="https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fbjcdn.openstorage.cn%2Fxinghuo-privatedata%2F%252Ftmp%2FapiTempFile56242e1c9b88474e8657f18f2593d59a5158001851905691948%2F%25E9%259B%2586%25E5%259B%25A2%25E5%25AE%25A2%25E6%2588%25B7%25E9%2583%25A82023%25E5%25B9%25B4%25E5%25BA%25A6%25E5%25B7%25A5%25E4%25BD%259C%25E6%2580%25BB%25E7%25BB%2593.pptx&wdOrigin=BROWSELINK" class="div-show"></iframe>-->
  </div>
</template>

<style scoped lang="less">
.div-overflow {
  width: 100%;
  height: 95.5vh;
  display: flex;

  .div-inp {
    width: 20%;
    height: 95.5vh;
    border-left: 1px solid @theme-border-color;
    border-right: 1px solid @theme-border-color;
  }

  .div-show {
    width: 80%;
    height: 95.5vh;
  }
}

</style>