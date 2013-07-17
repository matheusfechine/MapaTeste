/*global $:true, settings:true, pager:true, spinOptions: true*/
function Pager(options){
    var settings, pager, spinner;       
    
    settings = $.extend(true, {
        items: [],
        totalItems: 0,
        pageSize: 25,
        currentPage: 1,
        itemCallback: function(){},
        updateCallback: function(){},
        noResultMessage: "No results found",
        spinner: spinner,
        pageRequester: {
            requestPage: function(pageOptions, callback){
                callback();
            }
        }
    }, options);
    
    pager = {
            pageSize: function(){
                return settings.pageSize;
            },
            currentPage: function(pageNumber){
                if(pageNumber){
                    this.requestPage(pageNumber, settings.itemCallback);
                }
                else{
                    return settings.currentPage;
                }
            },
            items:function(){
                return settings.items;
            },
            numberOfPages: function(){
                if(settings.totalItems === 0){
                    return 1;
                }
                return Math.ceil(settings.totalItems/settings.pageSize);
            },
            requestPage: function(pageNumber, callback){
                settings.spinner.spin(spinOptions);
                settings.currentPage = pageNumber;
                var storeItemsAndProceed = function(pager){
                    if(pager){
                        settings.items = pager.items;
                        settings.totalItems =  pager.totalItems;
                        settings.callback = callback;
                        settings.updateCallback();

                        if(callback){
                            callback(pager.items, pager.noResultsMessage);
                        }
                    }
                };
                
                settings.pageRequester.requestPage({
                    currentPage: pageNumber,
                    pageSize: this.pageSize()
                  }, storeItemsAndProceed);
            },
            previousPage: function(){
                if(this.currentPage() > 1){
                    this.requestPage(this.currentPage() - 1, settings.itemCallback);
                }
            },
            nextPage: function(){
                if(this.currentPage() < this.numberOfPages()){
                    this.requestPage(this.currentPage() + 1, settings.itemCallback);
                }
            },
            updateCallback: function(callback){
                if(callback){
                    settings.updateCallback = callback;
                }
                else{
                    settings.updateCallback(); 
                }
            },
            changePageSize: function(numberOfItens){
                settings.pageSize = numberOfItens;
                this.currentPage(1);
            }
    };
    pager.requestPage(settings.currentPage, settings.itemCallback);
    return pager;
}