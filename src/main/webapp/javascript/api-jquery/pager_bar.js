/*global $:true, Pager:true, settings */
function PagerBar(params) {
    var methods, 
        settings, 
        element, 
        pager,
        spinner;
    
    settings = $.extend(true, {
                    itemCallback: function(){},
                    currentPage: 1,
                    pagesToShow: 10,
                    pageSize: 25,
                    spinner: spinner,
                    pageRequester: {
                        requestPage: function(config, callback){
                            callback({
                                totalItems: 0,
                                pageSize: 25
                            });
                        }
                    }
               }, params);
    
    methods = {
        init: function(){
            pager = new Pager({
                pageSize: settings.pageSize,
                currentPage: settings.currentPage,
                pageRequester: settings.pageRequester,
                itemCallback: settings.itemCallback,
                spinner: settings.spinner
            });
            pager.updateCallback(function(){
                methods.insertPages(methods.currentPageInterval());
                methods.setActivePage(methods.findPageElement(pager.currentPage()));
            });            
            element = $("<ul></ul>");
            element.append(this.createPreviousPagesLink());
            element.append(this.createPreviousPageLink());
            element.append(this.createNextPageLink());
            element.append(this.createNextPagesLink());
            element.append(this.createPageSizeSelector());

            pager.updateCallback(); 
        },
        firstPageToShow: function(interval) {
            return (interval * settings.pagesToShow) + 1;
        },
        lastPageToShow: function(interval){
            return pager.numberOfPages() >  this.greatestPageOfTheInterval(interval) ? this.greatestPageOfTheInterval(interval) : pager.numberOfPages();
        },
        greatestPageOfTheInterval: function(interval){
            return (interval + 1) * settings.pagesToShow;
        },
        currentPageInterval: function() {
            return (Math.floor((pager.currentPage() - 1) / settings.pagesToShow));
        },
        createNextPagesLink: function() {
            return this.createLi("nextPages", "»").click(function(){
                methods.goToNextPageInterval();
            });  
        },
        goToNextPageInterval: function() {
            var nextPageInterval = this.currentPageInterval() + 1;

            if(this.firstPageToShow(nextPageInterval) < (pager.numberOfPages())){
                pager.currentPage(this.firstPageToShow(nextPageInterval));
                methods.insertPages(nextPageInterval);
                methods.setActivePage(methods.findPageElement(this.firstPageToShow(nextPageInterval)));
            }
        },
        createNextPageLink: function() {
            return this.createLi("nextPage", "→").click(function(){
                var newPage;
                
                pager.nextPage();
                newPage = pager.currentPage();
                methods.setActivePage(methods.findPageElement(newPage));
            });
        },
        createPreviousPagesLink: function() {
            return this.createLi("previousPages", "«").click(function(){
                methods.goToPreviousPageInterval();
            });  
        },
        goToPreviousPageInterval: function(){
            var previousPageInterval = this.currentPageInterval() - 1;
            if(this.firstPageToShow(previousPageInterval) > 0){
                pager.currentPage(this.firstPageToShow(previousPageInterval));
                methods.insertPages(previousPageInterval);
                methods.setActivePage(methods.findPageElement(this.firstPageToShow(previousPageInterval)));
            }
        },
        createPreviousPageLink: function(){
            return this.createLi("previousPage", "←").click(function(){
                var newPage;
                
                pager.previousPage();
                newPage = pager.currentPage();
                methods.setActivePage(methods.findPageElement(newPage));
            });
        },
        findPageElement: function(pageNumber){
            return $(element).children(".page").filter(function(index){
                return parseInt($(this).text(), 10) === pageNumber;
            });
        },
        createLi : function(className, text) {
            if (arguments.length === 1) {
                return $("<li></li>").addClass(className).append('<a href="#"></a>');
            }
            return $("<li></li>").addClass(className).append('<a href="#"></a>').children().append(text).parent();
        },
        insertPages: function(interval){
            var pageNumber, firstPage, lastPage;
            
            firstPage = this.firstPageToShow(interval);
            lastPage = this.lastPageToShow(interval);
            
            $(element).find(".page").remove();
            
            if (firstPage >= 11){
                this.createPage(1).insertBefore($(element).find(".nextPage"));
                this.createLi("page", "...").insertBefore($(element).find(".nextPage").last());
            }                                    
            
            for (pageNumber = firstPage; pageNumber <= lastPage; pageNumber += 1) {
                this.createPage(pageNumber).insertBefore($(element).find(".nextPage"));
            }
            
            $(element).children(".page").first().addClass("active");
            
            if(pager.numberOfPages() > lastPage){
                this.createLi("page", "...").insertBefore($(element).find(".nextPage").last());
                this.createPage(pager.numberOfPages()).insertBefore($(element).find(".nextPage").last());
            }
        },
        createPage : function(pageNumber) {
            var link, pageElement;
            pageElement = methods.createLi("page", pageNumber)
                                 .click(function() {                                     
                                   methods.changePage(pageNumber);
                                   return false;
                               });

            pageElement.append(link);
            return pageElement;
        },
        changePage: function(pageNumber){
            pager.currentPage(parseInt(pageNumber, 10));
            methods.setActivePage(methods.findPageElement(pageNumber));  
        },
        createPageSizeSelector: function(){
            var pageSize, select;
            pageSize = 25;
            select = $("<select class='span2'></select>");
            
            for(pageSize = 25; pageSize <= 100; pageSize += 25){
                select.append($("<option></option>").val(pageSize).text(pageSize));
            }
            
            $(select).change(function(){
                methods.changePageSize($(this).val());
            });
            
            return this.createLi("pageSizeSelector").append(select);
        },
        changePageSize: function(pageSize){
            pager.changePageSize(pageSize);
        },
        setActivePage: function(pageElement){
            $(element).children(".page.active").removeClass("active");
            $(pageElement).addClass("active");
        }
    };
    
    methods.init();
    
    element.currentPage = function(pageNumber){
        if(pageNumber){
            pager.currentPage(pageNumber);
            methods.setActivePage(methods.findPageElement(pageNumber));
         }
         else{
             return pager.currentPage();
         }
    };
    
    element.nextPage = function(){
        pager.nextPage();
        methods.setActivePage(methods.findPageElement(pager.currentPage()));
    };
    
    element.previousPage = function(){
        pager.previousPage();
        methods.setActivePage(methods.findPageElement(pager.currentPage()));
    };
    
    element.changePageSize = function(pageSize){
      pager.changePageSize(pageSize);
    };
    
    return element;
}