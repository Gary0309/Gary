
var bookDataFromLocalStorage = [];

$(function(){
    loadBookData();
    var data = [
        {text:"資料庫",value:""},
        {text:"網際網路",value:""},
        {text:"應用系統整合",value:""},
        {text:"家庭保健",value:""},
        {text:"語言",value:""}
    ]
    $("#book_category").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        index: 0,
        change: onChange
    });
    $("#bought_datepicker").kendoDatePicker();
    $("#book_grid").kendoGrid({
        dataSource: {
            data: bookDataFromLocalStorage,
            schema: {
                model: {
                    fields: {
                        BookId: {type:"int"},
                        BookName: { type: "string" },
                        BookCategory: { type: "string" },
                        BookAuthor: { type: "string" },
                        BookBoughtDate: { type: "string" }
                    }
                }
            },
            pageSize: 20,
        },
        toolbar: kendo.template("<div class='book-grid-toolbar'><input class='book-grid-search' placeholder='我想要找......' type='text'></input></div>"),
        height: 550,
        sortable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            { field: "BookId", title: "書籍編號",width:"10%"},
            { field: "BookName", title: "書籍名稱", width: "50%" },
            { field: "BookCategory", title: "書籍種類", width: "10%" },
            { field: "BookAuthor", title: "作者", width: "15%" },
            { field: "BookBoughtDate", title: "購買日期", width: "15%" },
            { command: { text: "刪除", click: deleteBook }, title: " ", width: "120px" }
        ]
        
    });

  $('.book-grid-search').on('input', function () {
      var a=$('.book-grid-search').val();
      var grid=$("#book_grid").data('kendoGrid');
      console.log(grid);
      var filter = { logic: 'or', filters: [] };
          filter.filters.push({
              field: 'BookName',
              operator: 'contains',
              value: a
            });
          grid.dataSource.filter(filter);
  });

})
function loadBookData(){
    bookDataFromLocalStorage = JSON.parse(localStorage.getItem("bookData"));
    if(bookDataFromLocalStorage == null){
        bookDataFromLocalStorage = bookData;
        localStorage.setItem("bookData",JSON.stringify(bookDataFromLocalStorage));
    }
  }
  //更改照片
$("#book_category").change(function()
{
    if($("#book_category").data("kendoDropDownList").text()=="資料庫" )
      {
        $('.book-image').attr('src','image/database.jpg');
      }
    else if($("#book_category").data("kendoDropDownList").text()=="網際網路" )
      {
        $('.book-image').attr('src','image/internet.jpg');
      }
    else if($("#book_category").data("kendoDropDownList").text()=="應用系統整合" )
      {
        $('.book-image').attr('src','image/system.jpg');
      }
    else if($("#book_category").data("kendoDropDownList").text()=="家庭保健" )
      {
        $('.book-image').attr('src','image/home.jpg');
      }
    else if($("#book_category").data("kendoDropDownList").text()=="語言" )
      {
        $('.book-image').attr('src','image/language.jpg');
      }
})
function onChange(){}
  
function deleteBook(e)
  {
    var data=this.dataItem($(e.target).closest("tr"));//取那一行的值
    var bg=$("#book_grid").data("kendoGrid");//取資料表裡面的資料
    bg.dataSource.remove(data);//移除資料
    localStorage.setItem("bookData",JSON.stringify(bg.dataSource));//把bg.datasource的值給bookData

    for(var i=0;i<bookDataFromLocalStorage.length;i++)//刪掉陣列裡面的值再給cookie
    {
      if(data.BookId==bookDataFromLocalStorage[i].BookId)
      {
        bookDataFromLocalStorage.splice(i,1);
        localStorage.setItem("bookData",JSON.stringify(bookDataFromLocalStorage));
      }
    }
  }
  
//kendo window
  $("#open").kendoWindow({
    width: "400px",
    modal: true,
    title: "新增書籍",
    visible: false
  });
  $("#open1").click(function () {
    $("#open").data("kendoWindow").open();
  });
//新增功能
  $("#button").click( function () 
  {
    var b_c=$(".k-input").text();
    var b_n=$("#book_name").val();
    var b_a=$("#book_author").val();
    var b_d=$("#bought_datepicker").val();
    var book={//把book陣列的值設定成bookdata裡面的格式
      "BookId":bookDataFromLocalStorage[bookDataFromLocalStorage.length-1].BookId+1,
      "BookCategory":b_c,
      "BookName":b_n,
      "BookAuthor":b_a,
      "BookBoughtDate":b_d,
      
  } 
    $('#book_grid').data('kendoGrid').dataSource.add(book);
    bookDataFromLocalStorage.push(JSON.parse(JSON.stringify(book)));
    localStorage.setItem("bookData",JSON.stringify(bookDataFromLocalStorage));
   $("#book_name").val(null);
   $("#book_author").val(null);
});

