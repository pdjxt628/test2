var time = 30;
var counter = 0;
var rand;
var set;
var music = new Audio('./sound/shot.mp3');
var cart = new Audio('./sound/cart.mp3');

var repeat = function() {
  time--;
  $('.time').val(time);
  set = setTimeout(repeat, 1000);
  if(time==0){
    clearTimeout(set);
    $('.score').append("ハイスコア："+counter+" pt");
  }
}

// 初期化

var ini = function(){
  // ここから
  $('.score').empty();
  clearTimeout(set);
  counter = 0;
  time = 30;
  $('.time').val(time);
  // ここまで追加
  $('.point').val(counter+' pt');
  $('.game_area').empty();
  for(var i=0;i<10;i++){
    var data0 = '<div class="box box'+i+'">';
    var data1 = '<div class="circle circle'+i+'">';
    var data2 = '<div class="hitbox hitbox'+i+'">';
    var data3 = '</div></div><div class="stick stick'+i+'"></div></div>';
    var data = data0+data1+data2+data3;
    $('.game_area').append(data);
    if(i<5){
      $('.box'+i).css('left',250+(i*200)+'px');
      $('.box'+i).css('top','40%');
    }else{
      $('.box'+i).css('left',200+((i-5)*200)+'px');
      $('.box'+i).css('top','58%');
    }
  }
}

$('.ini').on('mousedown',function(){
  ini();
  $('.hitbox').on('mousedown',function(){
    music.play();
    counter = counter+100;
    $('.point').val(counter+' pt');
    // start()を消して以下を追加
    $('.box').css('display','none');
    rand = Math.floor(Math.random() * ((9 + 1) - 0)) + 0;
    $('.box'+rand).css('display','block');
    setTimeout(function(){
      music.pause();
      music.currentTime = 0;
      cart.play();
    },400);
  })
});

// スタート
var start = function(){
  repeat();
  $('.box').css('display','none');
  rand = Math.floor(Math.random() * ((9 + 1) - 0)) + 0;
  $('.box'+rand).css('display','block');
};

$('.start').on('mousedown',function(){
  start();
});

ini();
