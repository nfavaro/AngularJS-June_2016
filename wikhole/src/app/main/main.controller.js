(function() {
  'use strict';

  angular
    .module('template')
    .controller('MainController', MainController)
    .service('wikiService', wikiService);

  /** @ngInject */
  function MainController(wikiService) {
    var self = this;

    // Handles search
    self.searchArticles = function (searchTerm) {
      if (!searchTerm) return clearSearch();
      var search = wikiService.searchArticles(searchTerm);
      return search.then(processSearch, console.error);
    };

    // Gets links and imgs from wikiService and processes them
    self.getLinks = function (id, title) {
      wikiService.getAllLinks(id, title).then(processLinks, console.error, processLinks);
    };

    function thisWork() {
      console.log("notifying?");
    }

    // Handles search object
    function processSearch(searchObject) {
      self.searchTerms = searchObject.query.search;
      self.numSearchResults = searchObject.query.searchinfo.totalhits;
      self.searchSuggestion = searchObject.query.searchinfo.suggestion;
      return self.searchTerms.map(function (searchTerm) {
        return searchTerm.title;
      });
    }

    // Clears search data
    function clearSearch() {
      self.searchTerms = [];
      self.numSearchResults = undefined;
      self.searchSuggestion = undefined;
    }

    // Processes links and img thumbnails
    function processLinks(linksObject) {
      // console.log(linksObject);
      var page, pages = linksObject.pages;
      self.links = [];

      angular.forEach(Object.keys(pages), function (pageid) {
        page = pages[pageid];
        if (page.pageid && page.thumbnail)
          self.links.push(page);
      });
    }
  }

  function wikiService($resource, $q, WIKI_DEFAULTS) {
    var self = this;

    // Sets up ngResource
    var wikiResource = $resource(WIKI_DEFAULTS.API_END_POINT, 
      {
        action: 'query',
        format: 'json',
        callback: 'JSON_CALLBACK'
      }, 
      {
        getLinks: {
          method: 'JSONP',
          params: {
            generator: 'links',
            prop: 'info|pageimages',
            gpllimit: WIKI_DEFAULTS.MAX_LINKS,
            gplnamespace: 0,
            pilimit: 'max',
            pithumbsize: WIKI_DEFAULTS.THUMB_SIZE,
          },
          isArray: false,
          headers: {
            accept: 'application/json'
          }
        },
        searchByTitle: {
          method: 'JSONP',
          params: {
            list: 'search'
          },
          isArray: false,
          headers: {
            accept: 'application/json'
          }
        }
      });

    // Returns list of articles
    self.searchArticles = function (searchTerm) {
      if (!searchTerm) return;

      var res = wikiResource.searchByTitle({
        srsearch: 'intitle:' + searchTerm
      });

      return res.$promise;
    };

    // Returns list of ALL links with img thumbnails for given article (handles paginated results)
    self.getAllLinks = function (id, title, c, deferred, counter, res) {
      var deferred = deferred || $q.defer(),
          results = res || {},
          counter = counter || 0;

      // call getLinks() function and return its promise...
      getLinks(id, title, c).then(function (data) {
        // ...then merge new results with previous results
        angular.merge(results, data.query);

        // if data has 'continue' property and we're not at max image page limit, 
        // then make recursive call to continue retrieval and return that promise
        if (data.continue && counter++ < WIKI_DEFAULTS.MAX_IMAGE_PAGES)
          return self.getAllLinks(id, title, data.continue, deferred, counter, results);

        // otherwise resolve deferred promise
        deferred.resolve(results);
      }, function (error) {
        // or reject deferred promise
        deferred.reject(error);
      });

      // progressively update results
      deferred.notify(results);
      return deferred.promise;
    };

    // Returns list of links with img thumbnails for given article (one page of results)
    function getLinks(id, title, c) {
      var cont = c || {},
          res = wikiResource.getLinks({
        titles: title,
        pageids: id,
        continue: cont.continue,
        picontinue: cont.picontinue,
        gplcontinue: cont.gplcontinue
      });
      console.log(res);
      return res.$promise;
    };
  }


})();
