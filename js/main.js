// 풀페이지 슬라이더 옵션
$('#fullpage').fullpage({
  //options here
  sectionSelertor: '.section',
  navigation: true,
  autoScrolling:true,
  css3: true
  // anchors: ['anchor1', 'anchor2', 'anchor3', 'anchor4'], 메뉴 클릭시 이동 가능 옵션
  // controlArrows: false, 슬라이드 컨트롤러
  // 섹션안에 .slide가 있으면 가로 슬라이드가 생성된다.
});
// Section1 숫자 카운터
function autoCount() {
  $('.counter').each(function () {
    var count = $(this);
    $({ Counter: 0 }).animate({ Counter: count.text() }, {
      duration: 1000,
      easing: 'swing', //디폴트값
      step: function () {
        //animate의 step 함수에는 인자를 2개를 받는다. now, fx 인데, 순서는 지켜져야 하고, 전달받는 이름은 마음대로 해도 된다.
        //step은 애니메이션 재생시간 중간에 다른일을 하고 싶을 때 사용한다고 이해하면 된다.
        count.text(Math.ceil(this.Counter));
      }
    });
  });
} autoCount();
// Section1 한줄공지
function showNotice() {
  var $UP_BTN = $('.ar_up'),
    $DOWN_BTN = $('.ar_down'),
    $news = $('.n_news a'),
    $currentIndex= 0;
    $news.eq($currentIndex).addClass('on');  
  function showNextNews() {
    var index = $currentIndex;
    var target = $news.eq(index);
    if(index==0||index<$currentIndex+1) {
      target.removeClass('on');
      target.next().addClass('on');
      if(index==4) {
        $news.removeClass('on');
        index = 0;
        $news.eq(index).addClass('on');
        $currentIndex = -1;
      }
      $currentIndex++;
    }
  }
  function showPrevNews() {
    var index = $currentIndex;
    var target = $news.eq(index);
    if(index==4||index-1<$currentIndex) {
      target.removeClass('on');
      target.prev().addClass('on');
      if(index==0) {
        $news.removeClass('on');
        index = 4;
        $news.eq(index).addClass('on');
        $currentIndex = 5;
      }
      $currentIndex--;
    }
  }
  $UP_BTN.click(showPrevNews);
  $DOWN_BTN.click(showNextNews);
} showNotice();
// Section5 협력업체 슬라이드 배너
function mainSlider() {
  var $BTN = $('.slide_btn .move'),
  $PAUSE_BTN = $('.pause'),
  $slider = $('.slide_content ul'),
  $item = $slider.children(),
  $itemWidth = 156,
  $currentIndex = 0;
  // 앞 뒤 아이템 추가 생성 & 가로 정렬
  function newItems() {
    $item.clone(true).prependTo($slider);
    $item.clone(true).appendTo($slider);
    var newSlider = $('.slide_content ul'),
        newItem = newSlider.children();
    newItem.each(function(index) {
      var width = index * $itemWidth + 'px';
      $(this).css({left:width});
    });
    $slider.css(
      {width:$itemWidth*newItem.length+'px',
      transform:'translateX('+(-$itemWidth)*$item.length+'px)'}
    );
  }
  newItems();
  // 자동 슬라이드
  function autoSlider(index) {
    index = $currentIndex+1;
    var goLeft = -index * $itemWidth + 'px';
    $slider.stop().animate({left:goLeft},800,'swing');
    $currentIndex++;
    if($currentIndex === $item.length||$currentIndex===-$item.length) {
      setTimeout(function(){
      $slider.finish();
      $currentIndex = 0;
      $slider.css({left:'0px'});
      },800)
    }
  }
  // 자동 슬라이드 동작 버튼
  var auto = setInterval(autoSlider,2000);
  $PAUSE_BTN.click(function() {
    if(!$(this).hasClass('stop')){
      $(this).addClass('stop');
      clearInterval(auto);
    }else{
      $(this).removeClass('stop');
      setInterval(autoSlider,2000);
    }
  });
  // 수동 슬라이드
  function controlSlider(index) {
    var goLeft = -index * $itemWidth + 'px';
    $slider.stop().animate({left:goLeft},500,'swing');
    $currentIndex = index;
    if($currentIndex === $item.length||$currentIndex===-$item.length) {
      setTimeout(function(){
      $slider.finish();
      $currentIndex = 0;
      $slider.css({left:'0px'});
      },500)
    }
  }
  // 수동 슬라이드 동작 버튼
  $BTN.click(function(event) {
    if($(this).hasClass('prev')) {
      controlSlider($currentIndex - 1);
    }else{
      controlSlider($currentIndex + 1);
    }
  });
} mainSlider();
// 재정용어검색
function miniSearch() {
  const $miniInput = $('#terms'),
        $openInput = $('#terms2'),
        $BTN_SEARCH1 = $('.search_btn1'),
        $BTN_SEARCH2 = $('.search_btn2'),
        $openWindow = $('.open_search'),
        $windowClose = $('.top_title button'),
        $changeValue = $('.bottom_contents h3 span');
  function openSearch() {
    var value = $miniInput.val();
    $openWindow.addClass('active');
    $changeValue.text('"'+value+'"');
    $miniInput.val('');
    $windowClose.click(function(event){
      event.preventDefault();
      $openWindow.removeClass('active');
    });
  };
  // 미니창에서 검색창으로 바뀌는 이벤트
  $BTN_SEARCH1.click(openSearch);
  $miniInput.keydown(function(event){
    if(event.keyCode == '13') {
      openSearch();
      return false;
    }
  });
  // 검색창 검색 이벤트
  function showingSearch() {
    var value = $openInput.val();
    $changeValue.text('"'+value+'"');
    $openInput.val('');
  }
  $BTN_SEARCH2.click(showingSearch);
  $openInput.keydown(function(event){
    if(event.keyCode == '13') {
      showingSearch();
      return false;
    }
  });
} miniSearch();