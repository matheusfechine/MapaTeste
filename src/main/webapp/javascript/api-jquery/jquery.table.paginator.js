/*global jQuery:true, dwr:true, PagerBar:true, parent: true*/
(function($) {
    var methods, settings, container, pagerBar, createContainerId, appendItems, spinner;

    createContainerId = function() {
        $("table tbody").each(function(index, value) {
            var containerElement = settings.container[0];
            if (containerElement === value) {
                container.attr("id", "container_" + index);
            }
        });
    };

    appendItems = function(items, noResultsMessage) {
        container.empty();

        if (items && items.length === 0) {
            var message = (typeof(noResultsMessage) !== "undefined") ? noResultsMessage : settings.noResultsMessage;            
            container.append("<tr><td align='center' colspan=" + $(container).parent("table").find("th").length + ">" + message + "</td></tr>");
        } else {
            if (!container.attr("id")) {
                this.createContainerId();
            }
            dwr.util.addRows(container.attr("id"), items, settings.lineConstructor, { escapeHtml:false });
        }
        settings.spinner.spin(false);
        settings.onAppendItems();
    };

    methods = {
        init : function(options) {
            parent = $(this).parent();

            methods.removePagerBar(parent);

            settings = $.extend(true, {
                currentPage : 1,
                lineConstructor : [],
                noResultsMessage : "No results found",
                pageRequester : {
                    totalItems : 0,
                    pageSize : 25,
                    requestPage : function(pagerConfig, callback) {
                        callback();
                    }
                },
                spinner: spinner,
                onAppendItems: function(){}
            }, options);

            container = $(this).children("tbody");

            pagerBar = new PagerBar({
                pageSize: settings.pageRequester.pageSize,
                currentPage : settings.currentPage,
                pageRequester : settings.pageRequester,
                itemCallback : appendItems,
                spinner: settings.spinner
            });
            
            var elementDiv = $("<div></div>").addClass("pagination pagination-centered");
            elementDiv = elementDiv.append(pagerBar);
            
            $(this).after(elementDiv);
        },
        currentPage : function(pageNumber) {
            if (pageNumber) {
                pagerBar.currentPage(pageNumber);
            } else {
                return pagerBar.currentPage();
            }
        },
        nextPage : function() {
            pagerBar.nextPage();            
        },
        previousPage : function() {
            pagerBar.previousPage();
        },
        removePagerBar : function(parent) {
            parent.children(".pagination").remove();
        },
        changePageSize : function(pageSize){
            pagerBar.changePageSize(pageSize);
        }
    };

    $.fn.paginate = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(
                    arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }
    };
}(jQuery));