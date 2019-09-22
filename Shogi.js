Vue.component('fu', {
  template:
  '<g @click="move()":transform="trans"><polygon  :points="points" stroke = "black" fill = "wheat"></polygon><text x="50" y="50" font-size="35">歩</text></g>',
  props: ["x","y","teban"],
    computed:{
	trans: function(){
	    return "translate(" + parseInt(this.x)*100 + "," + parseInt(this.y)*100 + ")";
	},
    points:function(){
	if (this.teban==0){
          return "5 0 10 70 50 100 90 70 95 0";
      }
      else {
          return "5 100 10 30 50 0 90 30 95 100";
      }
    }
  },

  methods:{
      move:function(){
	  console.log("move");
	  this.$emit("move");
      }
  }
})

Vue.component('ban',{
    template: '<g> </g>'
})


Vue.component('ou', {
  template:
    '<g @click="move()":transform="trans"><polygon  :points="points" stroke = "black" fill = "wheat"></polygon><text x="50" y="50" font-size="35">玉</text></g>',
  props: ["x","y","teban"],
  computed:{
    trans: function(){
  	    return "translate(" + parseInt(this.x)*100 + "," + parseInt(this.y)*100 + ")";
  	},
    points:function(){
      if (this.teban==0){
         return "5 0 10 70 50 100 90 70 95 0";
      }
      else {
         return "5 100 10 30 50 0 90 30 95 100";
      }
    }
  },
  methods:{
    move:function(event){

      currentX = parseInt(event.offsetX/100);
     currentY  = parseInt(event.offsetY/100);
      //alert (currentX + " " +currentY);
      number = (currentY - 1)*3 + currentX -1;
alert(number);
    }
    // searchBlock: function(event){
    //
    //    // alert (currentY);
    // }

  }

})


Vue.component('gin', {
  template:
  '<g @click="move()":transform="trans"><polygon  :points="points" stroke = "black" fill = "wheat"></polygon><text x="27" y="70" font-size="45">銀</text></g>',
props: ["x","y","teban"],
  computed:{
    trans: function(){
        return "translate(" + parseInt(this.x)*100 + "," + parseInt(this.y)*100 + ")";
    },
    points:function(){
      if (this.teban==0){
         return "5 0 10 70 50 100 90 70 95 0";
      }
      else {
         return "5 100 10 30 50 0 90 30 95 100";
      }
    }
  },

  methods:{
    move:function(event){
      //   alert("aiueo")
      // this.$emit('move2')
      currentX = parseInt(event.offsetX/100);
     currentY  = parseInt(event.offsetY/100);
        //alert (currentX + " " +currentY);

        number = (currentY - 1)*3 + currentX -1;
  alert(number);
    }

  }

})


new Vue({
  el:"#app",
  data:{
    fu:[{x:1,y:1,teban:0},{x:3,y:3,teban:1}],
    ou:[{x:2,y:1,teban:0},{x:2,y:3,teban:1}],
    gin:[{x:0,y:0,teban:0},{x:4,y:4,teban:1}]
  },
  methods:{
    move:function(){
	alert("abc")
    }
  }
})
