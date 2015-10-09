$(document).ready(function() {
   $("#rssURL").val("http://k.img.com.ua/rss/ua/news.xml");
    loadData();
});

function loadData()
{
    $("#feedContainer").empty();
    this.rssUrl = $("#rssURL").val();
    $.get("http://k.img.com.ua/rss/ua/news.xml" , function (data) {
        console.log('========',data);
        $(data).find("item").each(function () { // or "item" or whatever suits your feed
            var el = $(this);
            var html = "<div style=\"margin-bottom:8px;\">";
            html += "<a href=\"" + el.find("link").text() + "\" target=\"_blank\">" + el.find("title").text() + "</a>";
            html += "<p>" + el.find("description").text() + "</p>";
            html += "</div>";

            $('#feedContainer').append(html);
        });
    });
}