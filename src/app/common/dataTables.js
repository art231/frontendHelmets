export function dataTables() {
    let dataTables = $('.data-table');

    let customDataTable = function customDataTable(elem) {
        elem.find('.pagination').addClass('pagination-sm').closest('[class*="col"]')
          .removeClass('col-sm-12 col-md-7')
          .addClass('col-auto mt-2 px-1')
          .closest('.row')
          .addClass('no-gutters justify-content-center justify-content-md-between px-3 pb-3');
    };

    dataTables.length && dataTables.each(function (index, value) {
        let $this = $(value);
        let options = $.extend({
            searching:false,
            pageLength:3,
            info:false,
            lengthChange:false,
            sWrapper:"falcon-data-table-wrapper",
            dom:"<&#39;row mx-1&#39;<&#39;col-sm-12 col-md-6&#39;l><&#39;col-sm-12 col-md-6&#39;f>><&#39;table-responsive&#39;tr><&#39;row no-gutters px-1 py-3 align-items-center justify-content-center&#39;<&#39;col-auto&#39;p>>",
            language:
                {
                    paginate:
                        {
                            next:"<span class=\"fas fa-chevron-right\"></span>",
                            previous:"<span class=\"fas fa-chevron-left\"></span>"
                        }
                },
            responsive: false,
            // dom: "<'row mx-1'<'col-sm-12 col-md-6 px-3'l><'col-sm-12 col-md-6 px-3'f>>" + "<'table-responsive'tr>" + "<'row mx-1 align-items-center justify-content-center justify-content-md-between'<'col-auto mb-2 mb-sm-0'i><'col-auto'p>>"
        }, $this.data('options'));
        // $this.DataTable(options);
        let $wrpper = $this.closest('.dataTables_wrapper');
        customDataTable($wrpper);
        $this.on('draw.dt', function () {
            return customDataTable($wrpper);
        });
    });
}
