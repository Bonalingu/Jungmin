var url = 'http://bonalee.net/';
var xhr = createCORSRequest('GET', url);
xhr.send();

var nav = ["work", "info"];
var works = [
{title: "The_Human_Side", text: "A revival of old book 'The Human side of animal' written by Royal Dixon(e-book released in 2006). It is to remake a book from the gutenberg.org."},
{title: "Incheon_Airport", text: "Incheon airport is one of the biggest and busiest airports in the world. I researched on dataset of airline traffics of this year(2019). After that, I made three images which are general look/landscape of the airport as visitors being there. Each images have multiple objects that is translated into numerals by OTF file. From 0 to 9, it started from the bottom of page, each glyph shown different objects which divided by 3 font styles with colors. <br>Base on this data, approximately 300 posters are in this book."},
{title: "FaceFaceFace", text: "Faces, objects, colours"},
{title: "All_that_Jazz", text: "This is a typeface inspired by the film Chicago. The project was a making different style poster not to use paper. Chicago movie is musical movie. The story is two characters struggle each other to catch people’s tension and spotlight. I inspired by spotlight and make typeface use with layers to make a shape of fonts. After that, for the movie poster, I combine the color sense and the sound of movie to object which seem like mobile."},
{title: "Cushion_Typo", text: "Inspired by Dave hardy an artist who works primarily in sculpture. Most of his works, He use industrial foam. These foams make some winkles and show the softy shape. I took these features to make typeface."}];

$(document).ready(function(){

	for (i=0; i < nav.length; i++) {
		navGenerate(nav[i]);
	}

	for (i=0; i < works.length; i++) {
		// works[i].description = works_text[i];
		selectedWorks(works[i]);

	}
	contactInfo();
	

	imgZoom();
	pdfShow("FaceFaceFace");



});

function navGenerate(name) {
		$("<div></>").attr("id", name)
					.addClass("page")
					.appendTo("#container")
		$("<div></>").html(name)
					.addClass("selected")
					.appendTo("nav")
					.wrap("<a href=\'#"+name+"\'></a>")
					.click(function(){
						$(".page").css("display", "none");
						$("#" + name).toggle();
						}
						)
					// .dblclick(function(){
					// 	$(".page").css("display", "none");
					// })

	}

// toggling for project view
function selectedWorks(name) {
	$("<div></>").attr("id", name.title)
					.html("<span>"+name.title.replace("_", " ").replace("_", " "))
					.addClass("projects")
					// .insertBefore("#intro_text")
					.appendTo("#work");

	// let re = new RegExp('C');
	var dir = "rsc/works/";
	var fileextension = ".png";
	// var str = /[A-Z,0-9]/;

	for (var j=0; j < 5; j++) {
		var img_path = dir + name.title + "/" + j + fileextension;

		$("<img></>")
					.attr("src", img_path)
					.attr("id", name.title +"_img_"+j)
					.addClass("work_img")
					.appendTo("#" + name.title);

	}
	// if there's error on src, replace the img with the default 
	$("#"+ name.title +"_img_"+j).error = function() {
			console.log("wow");
			$(this).attr("src", "missing.png")
		}

		$("<p></>").attr("id", name.title + "_text")
					.addClass("project_text")
					.html("<br>, " + name.text)
					.appendTo("#" + name.title);




	// $("#" + name).html("<p>"+name.replace("_", " "));
	// $.ajax({
 //            url: 'http://bonalee.net/rsc/works',
 //            success: function (data) {
 //                console.log(data);
 //            }
 //        });

}

function contactInfo() {

	$("<p></>").attr("id", "info_detail")
					.html(" Born in Daegu, SK<br> based in Arnhem, NL<br><a class=\"hover\" href=\"https://www.instagram.com/minnnn.b\">*</a><a class=\"hover\" href=\"mailto:bbonagood@gmail.com\">e-mail</a> for inquries on possible projects.")
					.addClass("contacts")
					.appendTo("#info");
}

var largeWord = "-large";

function imgZoom() {
	$("img").click( function() {

					var src = $(this).attr("src").split(".")[0];
					src  = src.split(largeWord)[0];

					var extension = $(this).attr("src").split(".")[1];

					$(this).toggleClass("wide_img")

					if( $(this).hasClass("wide_img") == true ) {
						console.log("i am wide " + extension)
						$(this).attr("src", src+ largeWord + "." + extension)
					} else {
						console.log("i am smol " + extension)
						$(this).attr("src", src + "." + extension)

					}
				}
	)}

function pdfShow(name) {
		$("#" + name + "_text").before(
			"<embed src=\"rsc/works/"+ name +"/"+ name +".pdf\" width=\"600px\" height=\"850px\" />")

}


// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}
