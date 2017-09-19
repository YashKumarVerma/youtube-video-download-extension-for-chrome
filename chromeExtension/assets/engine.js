
// if possible, write automatically
$(document).ready(function(){
    // chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
    // var url = tabs[0].url;
    //     $("#url-input").val(url);
    // });
});

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