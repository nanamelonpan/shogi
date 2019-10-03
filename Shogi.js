Vue.component('koma', {
  template:
  '<g  @click="chooseOrMove"'+
  ':transform="trans"><polygon  :points="points" stroke = "black" fill = "wheat"></polygon><text x="50" y="50" font-size="35">{{kanji()}}</text></g>',

  props: ["x","y","teban", "idx","na"],

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
    chooseOrMove:function(){
      this.$emit("action", this.idx);
    },
    kanji:function() {
      if(this.na == "fu") {
        return "歩";
      }
      else if (this.na == "gin") {
        return "銀";

      }else{
        return "玉";
      }

    }
  }
})


Vue.component('ban',{
  template: '<g transform = "translate(100,100)" >'+
  '<g v-for="(r,i) in masu"> <rect v-for="(c,j) in r" :x="100+100*j" :y="100+100*i" width="100" height="100" stroke="black" :fill="masu[j][i]==0? white:pink" @click="masuClick(i,j)"></rect></g>'+
  '<koma v-for="(f,idx) in koma"  @action="act(0,idx)" :teban="f.teban" :x="f.x" :y="f.y" :idx="idx" :na ="f.na"></koma></g>',
  data: function(){
    return {
      koma:[{na:"fu",x:1,y:1,teban:0, nari:false},{na:"fu",x:3,y:3,teban:1,nari:false},{na:"ou",x:2,y:1,teban:0},{na:"ou",x:2,y:3,teban:1},
  {na:"gin",x:0,y:0,teban:0},{na:"gin",x:4,y:4,teban:1}],
      masu:[[0,0,0],[0,0,0],[0,0,0]],
      white:"white",
      pink:"pink",
      f:"fu",
      o:"ou",
      g:"gin",
      teban:0,
      stage:"choose",
      chosen:null
    };
  },
  methods:{
    possiblePositionsFu: function(i){
      if (!this.koma[i].nari){
        if (this.koma[i].teban==0){
          if (this.koma[i].y <= 1){
            return [{x:this.koma[i].x, y:this.koma[i].y+1}];
          }
          else {
            return [];
          }
        }
        else{
          if (this.koma[i].y >= 1){
            return [{x:this.koma[i].x, y:this.koma[i].y-1}];
          }
          else {
            return [];
          }
        }
      }
      else{
        return [];
      }
    },
    //i
    act: function(k,i){
      if (this.stage == "choose") {
        //自分のコマか

        if (this.koma[i].teban == this.teban) {
          //色の反転

          for (let p of this.possiblePositionsFu(i)){
            console.log(p);
            this.masu[p.x-1].splice(p.y-1,1,1);
          }
         console.log(k);
          this.stage ="move";
          this.chosen = i

        }

      } else {
       //move
       //現在どの駒が選択されているか

       if (this.masu) {

       }

      }
    },
    masuClick:function (i,j) {
//console.log("きた");
      if (this.stage == "move") {
    console.log("きた");

        if (this.masu[j][i] == 1) {
          console.log([i,j]);
          //駒を動かす
          this.move(this.chosen,i,j);


        }

      }

    },
    mleave: function(i){
      this.masu = [[0,0,0],[0,0,0],[0,0,0]];
    },
    move: function(idx,i,j){


      //[{na:"fu",x:1,y:1,teban:0, nari:false}
      this.koma.splice(idx,1,{na:this.koma[idx].na,teban:this.koma[idx].teban,nari:this.koma[idx].nari, x:j+1,y:i+1});
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
