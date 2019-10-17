Vue.component('koma', {
  template:
  '<g  @click="chooseOrMove"'+
  ':transform="trans"><polygon  :points="points" stroke = "black" fill = "wheat"></polygon><text x="27" y="70" font-size="45">{{kanji()}}</text></g>',
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
  template: '<g transform = "translate(100,100)" >'+'<g transform = "translate(50,350)"><text>{{teban}}{{stage}}</text></g>'+
  '<g v-for="(r,i) in masu"> <rect v-for="(c,j) in r" :x="100+100*j" :y="100+100*i" width="100" height="100" stroke="black" :fill="masu[j][i]==0? white:pink" @click="masuClick(j,i)"></rect></g>'+
  '<koma v-for="(f,idx) in koma"  @action="act(0,idx)" :teban="f.teban" :x="f.x" :y="f.y" :idx="idx" :na ="f.na"></koma></g>',
  data: function(){
    return {
      koma:[{na:"fu",x:1,y:1,teban:0, nari:false},{na:"fu",x:3,y:3,teban:1,nari:false},{na:"ou",x:2,y:1,teban:0},{na:"ou",x:2,y:3,teban:1},
      {na:"gin",x:0,y:0,teban:0},{na:"gin",x:4,y:4,teban:1}],
      temochi:[1,1],
      masu:[[0,0,0],[0,0,0],[0,0,0]],
      ugoki:{fu:[[0,1]],gin:[[0,1],[1,1],[-1,1],[1,-1],[-1,-1]],ou:[[-1,1],[0,1],[1,1],[-1,0],[1,0],[-1,-1],[0,-1],[1,-1]]},
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
      let koma = this.koma[i];
      let dir = (this.teban == 0?1:-1);
      let positions =[];
      if (!koma.nari){
        //盤に収まるかどうか
        //of　で一つ一つがuに入っていく
        //持ち駒だった時　= 駒が置いていないところに置くことができる
        if(koma.x<1|koma.x>3){
          for(var i = 1; i<4;i++) {
            for(var j=1;j<4;j++)
            //現在地+動く方向　が盤面に収まっているか
            if(this.occupied(i,j,0)&&this.occupied(i,j,1)){
              positions.push({x:i,y:j});
            }

          }
        }else{
          for(let u of this.ugoki[koma.na]) {
            //現在地+動く方向　が盤面に収まっているか
            if(this.isInside(koma.x+dir*u[0],koma.y+dir*u[1]) && this.occupied(koma.x+dir*u[0],koma.y+dir*u[1],koma.teban)){
              positions.push({x:koma.x+dir*u[0],y:koma.y+dir*u[1]});
            }
          }
        }
        console.log("-------");
        console.log(positions);
        return positions;
      }
    },
    isInside(x,y){
      if(x>=1 && x<=3 && y>=1 && y<=3){
        return true;
      }
      else return false;

    },
    //自分の駒がないことを確認
    //駒があったらfalse
    occupied(x,y,teban){
      for (let k of this.koma){
        if(k.x == x && k.y == y && k.teban == teban){
          return false;
        }
      }
      return true;

    },
    //そこに相手の駒があるかをみる
    find(i,j){
      //インデックスにするためにinにする
      for(let k in this.koma){
        if(this.koma[k].x == j && this.koma[k].y == i && this.koma[k].teban !=this.teban  ) {
          return k;
          //このうちの何番目がそれですか
        }
      }
      return null;
    },
    //動けるところに色をつける
    act: function(k,i){
      if (this.stage == "choose") {
        //自分のコマか
        console.log("aaa");
        if (this.koma[i].teban == this.teban) {
          //色の反転
          //からの時は
          if(this.possiblePositionsFu(i).length == 0){
            return;
          }
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
    masuClick:function (j,i) {
      //console.log("きた");
      if (this.stage == "move") {
        console.log("きた");

        if (this.masu[j][i] == 1) {
          console.log([j,i]);
          //駒を動かす
          console.log("3333333");
          console.log(this.chosen);
          this.move(this.chosen,i,j);

          //もし相手の駒があったら持ち駒にする
          // if(!occupied(i,j,1-this.teban)){
          //
          // }
          //this.pickUp(j,i,this.teban)
          this.stage ="choose";
          //マス
          this.masu = [[0,0,0],[0,0,0],[0,0,0]];
          this.teban = 1 - this.teban;

        }

      }

    },
    mleave: function(i){
      this.masu = [[0,0,0],[0,0,0],[0,0,0]];
    },
    move: function(idx,i,j){
      //[{na:"fu",x:1,y:1,teban:0, nari:false}
      this.koma.splice(idx,1,{na:this.koma[idx].na,teban:this.koma[idx].teban,nari:this.koma[idx].nari, x:j+1,y:i+1});

      let k  = this.find(i+1,j+1);
      console.log(k);
      //
      if(k){
        let x =0;
        if(this.koma[k].teban==1){
          //上
          x = this.temochi[1];
          this.temochi[1]++;
        }
        else {
          x = 4-(this.temochi[0]);
          this.temochi[0]++;
        }

        this.koma.splice(k,1,{na:this.koma[k].na,teban:(1-this.koma[k].teban),nari:false,x:x,y:this.koma[k].teban==1?0:4});

      }
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
