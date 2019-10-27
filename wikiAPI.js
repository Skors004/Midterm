function wikisearch(){
       //document.getElementById('header').reset();
       //document.getElementById('text').reset();
       const proxy = "https://cors-anywhere.herokuapp.com/";
       const usersearch = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
       var search = document.getElementById('Search');
       var artist = search.value;
       artist = artist.trim();
       console.log("search:" + artist);
       searchurl = usersearch + artist;
       console.log(searchurl);
       var myRequest = new Request(proxy + searchurl);
       fetchJSON(myRequest);
     }
       function fetchJSON(request){
        var result;
        fetch(request)
         .then(function(resp){
           return resp.json();
         })
         .then(function(data){
           console.log(data);
           getData(data);
          });
       }
       function getData(data){
         const content = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles="
         const proxy = "https://cors-anywhere.herokuapp.com/";
         var result = data[1][0];
         var node = document.createTextNode(result);
         var text = document.getElementById("header");
         text.appendChild(node);
         result = result.trim();
         result = result.replace(/\s+/g, '_');
         console.log(result);
         dataurl = content + result;
         var myRequest = new Request(proxy + dataurl);
         console.log(myRequest);
         fetchWebPage(myRequest);
       }
       function fetchWebPage(request){
         fetch(request)
         .then(function(resp){
           return resp.json();
         })
         .then(function(data){
           console.log(data);
           var pageID = Object.keys(data.query.pages)[0];
           console.log(pageID);
           var content = data.query.pages[pageID]['extract'];
           console.log(content);
           var node = document.createTextNode(content);
           var text = document.getElementById("text");
           text.appendChild(node);
          });
       }
