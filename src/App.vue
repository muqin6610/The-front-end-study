<template>
  <div id="app">
    <transition name="on" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  position:relative;
  width:100%;
  height:100%;
}
/**过度动画相关样式 */
.on-enter-active{
  transition: .2s ease;
}
.on-leave-active{
  transition: .3s ease;
}
.on-enter,.on-leave-to{
  opacity: 0;
}
</style>
