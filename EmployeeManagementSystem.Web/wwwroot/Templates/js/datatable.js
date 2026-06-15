$.extend(true, $.fn.dataTable.defaults, {

    language: {
        paginate: {
            previous: "‹",
            next: "›",
            first: "«",
            last: "»"
        },
        lengthMenu: "_MENU_ entries per page",
        info: "Showing _START_ to _END_ of _TOTAL_ entries",
        infoEmpty: "Showing 0 to 0 of 0 entries",
        zeroRecords: "No matching records found",
        emptyTable: "No data available"
    },

    processing: true,
    serverSide: true,
    pageLength: 10,
    lengthMenu: [5, 10, 25, 50, 100],
});