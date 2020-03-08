<template>
  <div class="popup-wrapper">
    <div class="popup-inner-wrapper">
      <div class="popup">
        <div class="popup-title-wraper">
          <div class="popup-title">Confirmation</div>
        </div>
        <div class="popup-content-wraper">
          <div class="popup-content">
            <div class="popup-content-first">{{popupcontent.firstcontent}}</div>
            <div class="popup-content-second">{{popupcontent.secondcontent}}</div>
          </div>
        </div>
        <div class="popup-controllers-wraper">
          <table class="popup-controllers-inner-wrapper">
            <tbody>
            <tr>
              <td class="popup-controller"
                  @click="$emit('close')"
              >Cancel</td>
              <td class="popup-controller"
                  @click="$emit('close')"
              >Yes</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'Popup',
		props: {
			popupcontent: Object
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .popup-wrapper{
    position: absolute;
    z-index: 1000;
    display: table;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    height: 100%;
    background: rgba(110,111,110,0.8);
  }
  .popup-inner-wrapper{
    display: table-cell;
    vertical-align: middle;
  }
  .popup{
    width: 350px;
    height: 256px;
    overflow: hidden;
    margin: 0 auto;
    background: white;
  }
  .popup-title-wraper{
    padding: 20px;
    text-align: center;
    color:gray;
  }
  .popup-title{
    font-size: 20px;
    display: inline-block;
  }
  .popup-content-wraper{
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 16px;
    color: #003333;
    padding-top: 5px;
    height: 140px;
    overflow: hidden;
  }
  .popup-content{
    display: inline-block;
  }
  .popup-content-first{
    padding-bottom: 30px;
  }
  .popup-content-second{}
  .popup-controllers-wraper{
    display: table;
    width: 100%;
    font-size: 19px;
  }
  .popup-controllers-inner-wrapper{
    display: table;
    width: 100%;
  }
  .popup-controller{
    width: 50%;
    padding: 10px;
    display: table-cell;
    text-align: center;
    border-top: 1px solid grey;
    cursor: pointer;
  }
  .popup-controller:hover{
    color: rgba(128, 128, 128, 0.7);
  }
  .popup-controllers-inner-wrapper td:nth-child(1){
    border-right: 1px solid grey;
  }
</style>
