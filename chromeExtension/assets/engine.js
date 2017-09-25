function getCurrentTabUrl(callback) {  
  var queryInfo = {
    active: true, 
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0]; 
    var url = tab.url;
    callback(url);
  });
}

// if possible, write automatically
$(document).ready(function(){
    getCurrentTabUrl(function(url){
        automateUrlCapture(url)
    });
});

function automateUrlCapture(x){
    $("#url-input").val(x);
}

$("#saveToDisk").on('click',function(){
    var url = $("#url-input").val();
    swal(
    'All set !',
    "We'll get to you when the download is complete ! ",
    'success'
    )

    $.ajax({
        url:"http://localhost/youtubeVideoDownloaderExtensionServer/index.php?url="+ encodeURIComponent(url) +"&method=SAVE",
        type:'GET',
        success: function(data){
            $("#response").html(data);
        }
    });
});

$("#giveLink").on('click',function(){
    var url = $("#url-input").val();
    // alert(url);
    $.ajax({
        url:"http://localhost/youtubeVideoDownloaderExtensionServer/index.php?url="+encodeURIComponent(url)+"&method=SHOW",
        type:'GET',
        success: function(data){
            $("#response").html(data);
            // alert(data);
        }
    });
});
