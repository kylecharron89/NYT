key = "27783df9b9704a738d179c8eddff7601";

var sectionsParams = "Home,Opinion,World,National,Politics,Upshot,NY Region,Business,\
Technology,Science,Health,Sports,Arts,Books,Movies,Theater,\
Sunday Review,Fashion,T Magazine,Food,Travel,Magazine,Real Estate,\
Automobiles,Obituaries,Insider";

var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
url = url + '?' + $.param({'api-key': key});

// Initial AJAX call to get number of articles and article sections
$.ajax({
  url: url,
  method: 'GET',
  }).done(function(result) {
    initialParser(result);
  }).fail(function(err) {
  throw err;
});

function initialParser(nytObj){
  getSections();
}

function getNumberOfArticles(nytNum){
  document.getElementById("numArticles").innerHTML = "Articles found: " + nytNum;
}

// Add sections to dropdown menu
function getSections() {
  sectionsParams = sectionsParams.split(",");
  var sections = [];
  var select = document.getElementById("select");
  for (var i = 0; i < sectionsParams.length; i++) {
      sections.push(sectionsParams[i]);
      // Create new element then append to
      var el = document.createElement("option");
      el.textContent = sectionsParams[i];
      el.value = sectionsParams[i];
      select.appendChild(el);
    }
  }


function changeSection(sec) {
  // Change API section
  // remove all spaces
  sec = sec.replace(/\s/g, '');
  // remove all dots
  sec = sec.replace(/\./g, '');
  // remove all slashes
  sec = sec.replace(/\//g, '');
  // make lowercase
  section = sec.toLowerCase();
  console.log(section);
  // Change API params
  var url = "https://api.nytimes.com/svc/topstories/v2/" + section + ".json";
  url = url + '?' + $.param({'api-key': key});
  // New API call
  $.ajax({
    url: url,
    method: 'GET',
    }).done(function(result) {
      // Update number of articles
      getNumberOfArticles(result.num_results);
      displayArticles(result.results, result.num_results)
      }).fail(function(err) {
    throw err;
  });
}

function displayArticles(articles, num_articles){
  // removes articles from the last time a section was changed, if so
  $(".article-clone").remove();
  // create a clone of the section
  var clone = $('#articleTemplate').clone();
  // iterate over all nyt articles in the feed
  for (var i = 0; i < num_articles; i++){
    clone = $('#articleTemplate').clone();
    $(clone).attr("href", articles[i].url);
    $(clone).attr("target", "_blank");
    $(clone).addClass("article-clone");
    $(clone).removeAttr("id");
    $(clone).children("h2").text(articles[i].title);
    $(clone).children("p").text(articles[i].abstract);
    try {
      $(clone).css('background-image', 'url(' + articles[i].multimedia[4].url + ')');
    }
    catch(error) {
      $(clone).css('background-image', "url('assets/images/nyt-logo.svg')");
    }
    $("#nytArticles").append(clone).html();
  }
}
