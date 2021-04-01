// 지방교육재정 : 주요 서비스 이용안내 슬라이드
function serviceSlider() {
  var $slider = $('.slide_wrap'),
      $items = $('.slide_set'),
      $btns = $('.dot_set'),
      $DOTS_BTN = $btns.children(),
      $currentIndex = 0,
      $itemsWidth = 825;
  // 슬라이드 정렬
  function leftItem() {
    $items.each(function(index){
      $(this).css({left:index*$itemsWidth+'px'});
    });
    $slider.css({
      width:$items.length*$itemsWidth+'px',
      left:'0px'
    });
  } leftItem();
  // 슬라이드
  function slider(index){
    $slider.stop().animate({left:index*$itemsWidth+'px'},1000);
  }
  $DOTS_BTN.click(function(){
    var target = $(this).index();
    if(target===0){
      slider($currentIndex);
      $(this).addClass('on');
      $(this).next().removeClass('on');
    } else {
      slider($currentIndex-1);
      $(this).addClass('on');
      $(this).prev().removeClass('on');
    }
  })
} serviceSlider();
// 참여·소통 : FaQ 아코디언 메뉴
function accordion() {
  var $accordion = $('.accordion_click'),
      $SHOW_CN = 'show';
  $accordion.click(function() {
    var target = $(this).next();
    if(target.hasClass($SHOW_CN)){
      target.removeClass($SHOW_CN);
    } else {
      target.addClass($SHOW_CN);
      target.siblings().removeClass($SHOW_CN);
    }
  });
} accordion();