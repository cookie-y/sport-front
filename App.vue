<script>
export default {
  onLaunch() {
    // #ifdef APP-PLUS
    plus.screen.lockOrientation('portrait-primary');
    // #endif
    console.log('App Launch');
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
};
</script>

<style lang="scss">
@import '@/uni_modules/uview-plus/index.scss';
@import '@/static/css/iconfont.css';
@import '@/static/css/base.scss';
</style>
