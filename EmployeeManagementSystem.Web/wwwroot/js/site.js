function ShowLoading(id) {
    $('#' + id).removeClass("d-none");
}
function EndLoading(id) {
    $('#' + id).addClass("d-none");
}

// ====================== MODAL FUNCTIONS ======================
function showConfirmSaveModal(message = "تأكيد حفظ التعديلات؟", iconPath = "/templates/assets/images/icons/confirm.svg", onConfirm = null) {
    $("#confirmSaveText").text(message);
    $("#confirmSaveIcon img").attr("src", iconPath);
    $("#confirmSaveCancel").off("click").on("click", () => $('#confirmSaveModal').modal('hide'));
    $("#confirmSaveBtn").off("click").on("click", function () {
        $('#confirmSaveModal').modal('hide');
        if (onConfirm) onConfirm();
    });
    $('#confirmSaveModal').modal('show');
}

function showSuccessModal(message = "تم الحفظ بنجاح!", iconPath = "/templates/assets/images/icons/sucess.svg") {
    $("#successText").text(message);
    $("#successIcon img").attr("src", iconPath);
    $("#successBtn").off("click").on("click", () => $('#successModal').modal('hide'));
    $('#successModal').modal('show');
}

function showErrorModal(message = "حدث خطأ أثناء الحفظ", iconPath = "/templates/assets/images/icons/alert.svg") {
    $("#errorText").text(message);
    $("#errorIcon img").attr("src", iconPath);
    $("#errorBtn").off("click").on("click", () => $('#errorModal').modal('hide'));
    $('#errorModal').modal('show');
}

function showDeleteModal(message = "سوف يتم مسح البيانات ولا يمكن استرجاعها", iconPath = "/templates/assets/images/icons/alert.svg", onConfirm = null) {
    $("#deleteText").text(message);
    $("#deleteIcon img").attr("src", iconPath);
    $("#deleteCancel").off("click").on("click", () => $('#confirmDeleteModal').modal('hide'));
    $("#deleteConfirm").off("click").on("click", function () {
        $('#confirmDeleteModal').modal('hide');
        if (onConfirm) onConfirm();
    });
    $('#confirmDeleteModal').modal('show');
}
function showSuccessWithActions(
    message = "تم الحفظ بنجاح",
    continueUrl = "",
    indexUrl = "",
    confirmText = "استكمال البيانات",
    laterText = "لاحقًا",
    iconPath = "/templates/assets/images/icons/sucess.svg"
) {
    $("#successText").text(message);
    $("#successIcon img").attr("src", iconPath);
    $("#successBtn").remove();

    const buttonsHtml = `
        <div class="modal-buttons">
            <button type="button" id="successConfirm" class="modal-button btn-confirm">
                ${confirmText}
            </button>
            <button type="button" id="successLater" class="modal-button btn-cancel">
                ${laterText}
            </button>
        </div>
    `;
    $(".modal-buttons").remove();
    $("#successModal .modal-content").append(buttonsHtml);

    $("#successLater").off("click").on("click", function () {
        $('#successModal').modal('hide');
        if (indexUrl) window.location.href = indexUrl;
    });

    $("#successConfirm").off("click").on("click", function () {
        $('#successModal').modal('hide');
        if (continueUrl) window.location.href = continueUrl;
    });

    $('#successModal').modal('show');
}


$(document).ready(function () {
    if ($.fn.select2) {
        $('select').each(function () {
            if ($(this).closest('.ql-toolbar').length > 0) {
                return;
            }
            if ($(this).hasClass('select2-hidden-accessible')) {
                $(this).select2('destroy');
            }
            $(this).select2({
                width: '100%',
                dir: 'rtl',
                allowClear: true,
                minimumResultsForSearch: 0
            });
        });
    }
});
