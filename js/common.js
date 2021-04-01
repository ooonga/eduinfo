// 앵커 이벤트 차단
$('a[href="#"]').click(function(event){
  event.preventDefault();
});
// Header : 언어 변경 옵션
$('.inner.top div').click(function(){
  $(this).toggleClass('active');
});
// Header : 전체 사이트맵 작동
$('.nav_btn').click(function(){
  $('#nav').addClass('active');
  $('.nav_close').click(function(){
    $('#nav').removeClass('active');
  });
});
// Header : 글로벌 메뉴 작동
$('.s_s_title').hide();
$('.s_s_title').parent('li').mouseenter(function() {
  $('.s_s_title').hide();
  const target = $(this);
  target.children('.s_s_title').css('display','block');
  target.children('a').addClass('mouseon');
  $('.s_s_title').mouseleave(function(){
    $(this).css('display','none');
    $(this).siblings('a').removeClass('mouseon');
  });
}).mouseleave(function(){
    $(this).children('a').removeClass('mouseon');
})
// Header : QnA 회원가입 페이지 로드
$('.qna_btn').click(function(){
  return confirm('로그인이 필요합니다. 로그인 화면으로 이동하시겠습니까?');
});
// Footer : 상단 이동 TOP 버튼
$('.top_btn').click(function() {
  if($('body').hasClass('main')){
    $.fn.fullpage.moveTo(1);
  } else {
    $('html, body').animate({ scrollTop : 0 },400);
  }
});