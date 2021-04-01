$.ajax({
  type:'GET',
  dadaType: 'json',
  url:'../json/report.json',
  success: function(report){
    var reportList = $('.report_wrap');
    $.each(report, function(index, report){
      var addList = '';
      addList += '<li>';
      addList += '<a><img src="'+report.image+'"alt="report_img'+index+'"/></a>';
      addList += '<div class="text_box">';
      addList += '<p>'+report.title+'</p>';
      addList += '<p>'+report.name+'</p>';
      addList += '<p>'+report.date+'</p>';
      addList += '</div>';
      addList += '</li>';
      reportList.append(addList);
    });
    pageBoard();
  }
});
// 게시판 페이징
function pageBoard(){
  $('.report_wrap').each(function() {
    var pageCount = 5;  //한 화면 최대 페이지 번호 갯수
    var currentPage = 0;
    var listCount = 8;  //목록의 수
    var $table = $(this); 

    var listRows = $table.find('li').length;
    var totalList = Math.ceil(listRows / listCount);

    if (totalList==0) return;

    // 생성 조건
    var $paginate = $('<div id="paging" class="pagination"></div>');
    var nowPage = currentPage;
    var endPage = nowPage+listCount;
    //페이지를 클릭하면 다시 셋팅
    // .bind(이벤트이름, 이벤트핸들러) 이벤트 이름을 인자로 넘겨받은 뒤 핸들러가 실행된다.
    $table.bind('rePaginate', function() {
      $table.find('li').hide().slice(currentPage * listCount, (currentPage + 1) * listCount).show();
      //기본적으로 모두 감춘 뒤, 리스트 갯수 0에서 보여줄 리스트 갯수만큼 출력.
      
      if (totalList > 1) { // 한페이지 이상이면 리스트 생성
        if (currentPage < 5 && totalList-currentPage >= 5) {
          nowPage = 0;
          endPage = pageCount;
          // 페이지가 5 이하이면 첫페이지부터 최대 페이지까지 생성.
        } else {
          nowPage = currentPage-1;
          endPage = nowPage+pageCount;
          // 페이지가 5 이상이면 첫페이지부터 다음 페이지까지 생성.
        }
        if (totalList < endPage) {
          endPage = totalList;
          nowPage = totalList-pageCount;
           // 가져야할 목록의 수가 한페이지에 표시될 최대 목록 수 보다 작으면
           // 현재페이지에서 시작페이지를 갯수 -10
        }
      } else { // 한페이지 이하면 한페이지만 생성
          nowPage = 0;
          endPage = totalList;
      }
      nowPage = 0;
    // 페이징 해줄 목록 생성
      $("#paging").html("");
    // 처음
      $('<button type="button" class="page-number"><span>처음</span><<</button>').bind('click', {newPage: page},function(event) {
        currentPage = 0;  
        $table.trigger('rePaginate');  
        $($(".page-number")[2]).addClass('active').siblings().removeClass('active');
     }).appendTo($paginate);
    // 이전
     $('<button type="button" class="page-number"><span>이전</span><</button>').bind('click', {newPage: page},function(event) {
        if(currentPage == 0) return;
        currentPage = currentPage-1;
        $table.trigger('rePaginate');
        $($(".page-number")[(currentPage-nowPage)+2]).addClass('active').siblings().removeClass('active');
      }).appendTo($paginate);
    // 숫자 목록
      for (var page = nowPage ; page < endPage; page++) {
        $('<button type="button" class="page-number"></button>').text(page + 1).bind('click', {newPage: page}, function(event) {
          currentPage = event.data['newPage'];
          $table.trigger('rePaginate');
          $($(".page-number")[(currentPage-nowPage)+2]).addClass('active').siblings().removeClass('active');
        }).appendTo($paginate);
      }
    // 다음
      $('<button type="button" class="page-number"><span>다음</span>></button>').bind('click', {newPage: page},function(event) {
        if(currentPage == totalList-1) return;
        currentPage = currentPage+1;
        $table.trigger('rePaginate');
        $($(".page-number")[(currentPage-nowPage)+2]).addClass('active').siblings().removeClass('active');
      }).appendTo($paginate);
    // 끝
      $('<button type="button" class="page-number"><span>끝</span>>></button>').bind('click', {newPage: page},function(event) {
         currentPage = totalList-1;
         $table.trigger('rePaginate');
         $($(".page-number")[endPage-nowPage+1]).addClass('active').siblings().removeClass('active');
      }).appendTo($paginate);
   
      $($(".page-number")[2]).addClass('active');
  // reSortColors($table);
    });
    $paginate.insertAfter($table).find('span.page-number:first').next().next().addClass('active');
    $paginate.appendTo('.si5_2');
    $table.trigger('rePaginate');
  });
}