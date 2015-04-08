$(document).ready(function() {
   $("#rssURL").val("http://feeds.bbci.co.uk/news/rss.xml?edition=uk");
    loadData();
});

function loadData()
{
    $("#feedContainer").empty();
    this.rssUrl = $("#rssURL").val();
    $.get(this.rssUrl , function (data) {
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