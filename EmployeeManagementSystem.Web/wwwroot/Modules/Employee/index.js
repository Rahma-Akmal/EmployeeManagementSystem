var dt;

$(document).ready(function () {

    dt = $("#EmployeesTable").DataTable({
        searching: false,
        serverSide: true,
        processing: false,
        ajax: {
            url: "/Employees/GetEmployees",
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
                    search: $("#js-Search").val(),
                    departmentId: $("#DepartmentFilter").val() || null,
                    isActive: $("#StatusFilter").val() === "" ? null : $("#StatusFilter").val() === "true"
                });
            },
            beforeSend: function () {  },
            complete: function () {  }
        },
        order: [[0, 'desc']],
        columnDefs: [
            { targets: "_all", orderSequence: ["asc", "desc"] }
        ],
        columns: [
            {
                data: "id",
                orderable: false,
                render: function (data, type, row, meta) {
                    let index = meta.row + meta.settings._iDisplayStart + 1;
                    return index.toString().padStart(3, '0');
                }
            },
            { data: "fullName" },
            { data: "email" },
            { data: "mobileNumber" },
            { data: "departmentName" },
            { data: "jobTitle" },
            {
                data: "isActive",
                render: function (d) {
                    return d
                        ? '<span class="status-badge active">Active</span>'
                        : '<span class="status-badge inactive">Inactive</span>';
                }
            },
            {
                data: null,
                orderable: false,
                searchable: false,
                render: function (data, type, row) {
                    return `
                        <button class="toggle-btn" data-id="${row.id}" title="Toggle Status">
                            <img src="/templates/assets/images/icons/${row.isActive ? 'toggle_on.svg' : 'toggle_off.svg'}" class="toggle-icon">
                        </button>
                        <button onclick="ShowLoading('pagesLoading'); window.location.href='/Employees/Edit?id=${row.id}'">
                            <img src="/templates/assets/images/icons/edit2.svg" class="table-edit">
                        </button>
                        <button class="delete-btn" data-id="${row.id}" title="Delete">
                            <img src="/templates/assets/images/icons/delete.svg" class="table-edit">
                        </button>`;
                }
            }
        ],

        drawCallback: function () {

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

            activateResetFilter();
            dt.ajax.reload(null, false);
        }
    });

    $("#DepartmentFilter").on("change", function () {

        activateResetFilter();
        dt.ajax.reload();
    });

    $("#StatusFilter").on("change", function () {

        activateResetFilter();
        dt.ajax.reload();
    });

    $("#btnReset").on("click", function () {
        $("#js-Search").val("");
        $("#DepartmentFilter").val("").trigger("change");
        $("#StatusFilter").val("").trigger("change");
        deactivateResetFilter();

        dt.ajax.reload();
    });

    $(document).on("click", ".toggle-btn", function () {
        let btn = $(this);
        let row = btn.closest("tr");
        let rowData = dt.row(row).data();

        let confirmMessage = rowData.isActive
            ? "Are you sure you want to deactivate this employee?"
            : "Are you sure you want to activate this employee?";

        let confirmPhoto = rowData.isActive
            ? "/templates/assets/images/icons/alert.svg"
            : "/templates/assets/images/icons/confirm.svg";

        let confirmModal = $('#confirmSaveModal');
        let confirmBtn = confirmModal.find('#confirmSaveBtn');
        confirmBtn.removeClass('btn-delete');
        if (rowData.isActive) confirmBtn.addClass('btn-delete');

        showConfirmSaveModal(confirmMessage, confirmPhoto, function () {


            $.ajax({
                url: "/Employees/ToggleActive",
                type: "POST",
                headers: {
                    "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
                },
                data: { id: rowData.id },
                success: function (res) {
                    keepBodyModalOpen();
                    if (res.isSuccess) {
                        rowData.isActive = !rowData.isActive;
                        dt.row(row).data(rowData).invalidate();
                        let msg = rowData.isActive ? "Employee activated successfully" : "Employee deactivated successfully";
                        showSuccessModal(msg, "/templates/assets/images/icons/sucess.svg");
                    } else {
                        showErrorModal(res.message, "/templates/assets/images/icons/alert.svg");
                    }

                },
                error: function () {
                    keepBodyModalOpen();
                    showErrorModal("An error occurred", "/templates/assets/images/icons/alert.svg");
 
                }
            });
        });
    });

    $(document).on("click", ".delete-btn", function () {
        let btn = $(this);
        let row = btn.closest("tr");
        let rowData = dt.row(row).data();

        let confirmModal = $('#confirmSaveModal');
        let confirmBtn = confirmModal.find('#confirmSaveBtn');
        confirmBtn.addClass('btn-delete');

        showConfirmSaveModal(
            "Are you sure you want to delete this employee?",
            "/templates/assets/images/icons/alert.svg",
            function () {
                

                $.ajax({
                    url: "/Employees/Delete",
                    type: "POST",
                    headers: {
                        "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
                    },
                    data: { id: rowData.id },
                    success: function (res) {
                        keepBodyModalOpen();
                        if (res.isSuccess) {
                            showSuccessModal("Employee deleted successfully", "/templates/assets/images/icons/sucess.svg");
                            dt.ajax.reload(null, false);
                        } else {
                            showErrorModal(res.message, "/templates/assets/images/icons/alert.svg");
                        }

                    },
                    error: function () {
                        keepBodyModalOpen();
                        showErrorModal("An error occurred", "/templates/assets/images/icons/alert.svg");

                    }
                });
            }
        );
    });

    $('#successModal, #errorModal').on('hidden.bs.modal', function () {
        $('body').removeClass('modal-open').css('padding-right', '');
    });

});

function activateResetFilter() {
    $('.reset-filter').addClass('reset');
}

function deactivateResetFilter() {
    $('.reset-filter').removeClass('reset');
}

function keepBodyModalOpen() {
    $('body').addClass('modal-open').css('padding-right', '0');
}