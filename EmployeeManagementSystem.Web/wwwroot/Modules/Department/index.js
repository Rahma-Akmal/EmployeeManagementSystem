var dt;

$(document).ready(function () {

    dt = $("#DepartmentsTable").DataTable({
        searching: false,
        serverSide: true,
        processing: false,
        ajax: {
            url: "/Department/GetDepartments",
            type: "POST",
            contentType: "application/json",
            headers: {
                "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
            },
            data: function (d) {
                return JSON.stringify({
                    pageNumber: d.start,
                    pageSize: d.length,
                    sortColumn: d.columns[d.order[0].column].data,
                    sortDirection: d.order[0].dir,
                    search: $("#js-Search").val()
                });
            },
            beforeSend: function () { ShowLoading('processingLoader'); },
            complete: function () { EndLoading('processingLoader'); }
        },
        order: [[0, 'asc']],
        columns: [
            {
                data: "id",
                orderable: false,
                render: function (data, type, row, meta) {
                    let index = meta.row + meta.settings._iDisplayStart + 1;
                    return index.toString().padStart(3, '0');
                }
            },
            { data: "name" },
            { data: "employeeCount" }
        ],
        drawCallback: function () {
            EndLoading('processingLoader');
            const container = this.api().table().container();
            const length = container.querySelector('.dt-length');
            if (length) document.querySelector('.target-length').appendChild(length);
            const filter = container.querySelector('.dt-search');
            if (filter) document.querySelector('.target-search').appendChild(filter);
            const paging = container.querySelector('.dt-paging');
            if (paging) document.querySelector('.target-pagination').appendChild(paging);
            const info = container.querySelector('.dt-info');
            if (info) document.querySelector('.target-info').appendChild(info);
        }
    });

    $("#js-Search").on("keyup", function (e) {
        if (e.key === "Enter") {
            ShowLoading('processingLoader');
            activateResetFilter();
            dt.ajax.reload(null, false);
        }
    });

    $("#btnReset").on("click", function () {
        $("#js-Search").val("");
        deactivateResetFilter();
        ShowLoading('processingLoader');
        dt.ajax.reload();
    });

});

function activateResetFilter() {
    $('.reset-filter').addClass('reset');
}

function deactivateResetFilter() {
    $('.reset-filter').removeClass('reset');
}