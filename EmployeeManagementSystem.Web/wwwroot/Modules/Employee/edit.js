$(document).ready(function () {

    $('#department-select').select2({
        placeholder: "Select Department",
        allowClear: true,
        width: '100%',
        minimumResultsForSearch: -1
    });

    $('#status-select').select2({
        placeholder: "Select Status",
        allowClear: false,
        width: "100%",
        minimumResultsForSearch: -1
    });

    updateStatusColor();

});

function keepBodyModalOpen() {
    $('body').addClass('modal-open').css('padding-right', '0');
}

function validateForm() {

    let isValid = true;

    $(".text-danger").text("");

    if (!$("#FullName").val().trim()) {
        $("span[data-valmsg-for='FullName']").text("Full Name is required");
        isValid = false;
    }

    const email = $("#Email").val().trim();
    if (!email) {
        $("span[data-valmsg-for='Email']").text("Email is required");
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        $("span[data-valmsg-for='Email']").text("Invalid email format");
        isValid = false;
    }

    if (!$("#MobileNumber").val().trim()) {
        $("span[data-valmsg-for='MobileNumber']").text("Mobile is required");
        isValid = false;
    }

    if (!$("#JobTitle").val().trim()) {
        $("span[data-valmsg-for='JobTitle']").text("Job Title is required");
        isValid = false;
    }

    if (!$("#HireDate").val()) {
        $("span[data-valmsg-for='HireDate']").text("Hire Date is required");
        isValid = false;
    }

    if (!$("#department-select").val()) {
        $("span[data-valmsg-for='DepartmentId']").text("Department is required");
        isValid = false;
    }

    return isValid;
}


$("#btnUpdate").on("click", function (e) {

    e.preventDefault();

    if (!validateForm()) return;

    showConfirmSaveModal(
        "Are you sure you want to update this employee?",
        "/templates/assets/images/icons/confirm.svg",
        function () {

            let formData = $("#employeeForm").serialize();

            $.ajax({
                url: "/Employees/Edit",
                type: "POST",
                data: formData,
                success: function (response) {

                    keepBodyModalOpen();

                    if (response.isSuccess) {

                        showSuccessModal(
                            "Employee Updated Successfully",
                            "/templates/assets/images/icons/sucess.svg"
                        );

                        $('#successModal').on('hidden.bs.modal', function () {
                            window.location.href = "/Employees/Index";
                        });

                    } else {

                        showErrorModal(
                            response.message,
                            "/templates/assets/images/icons/alert.svg"
                        );
                    }
                },
                error: function (xhr) {

                    keepBodyModalOpen();


                    let errorMessage = "Unexpected Error";

                    if (xhr.responseJSON && xhr.responseJSON.message) {
                        errorMessage = xhr.responseJSON.message;
                    }

                    showErrorModal(
                        errorMessage,
                        "/templates/assets/images/icons/alert.svg"
                    );
                }
            });

        }
    );
});

function updateStatusColor() {

    let select = $("#status-select");

    let container = select
        .siblings(".select2")
        .find(".select2-selection--single");

    container.removeClass("active inactive");

    if (select.val() === "true")
        container.addClass("active");
    else
        container.addClass("inactive");
}

$("#status-select").on("change", updateStatusColor);