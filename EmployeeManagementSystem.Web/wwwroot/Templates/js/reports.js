//================= choose category sales_Report Modal =================
function initCategories(categories) {
    function buildCategoryTree(categories) {
        const map = {};
        const roots = [];

        categories.forEach(cat => {
            cat.children = [];
            map[cat.Value] = cat;
        });

        categories.forEach(cat => {
            if (cat.ParentId) {
                map[cat.ParentId]?.children.push(cat);
            } else {
                roots.push(cat);
            }
        });

        return roots;
    }
    function renderOptions(categories, level = 0) {
        let html = '';
        categories.forEach(cat => {
            const prefix = level > 0 ? '-'.repeat(level) + ' ' : '';
            html += `<option value="${cat.Value}">${prefix}${cat.Text}</option>`;
            if (cat.children.length > 0) {
                html += renderOptions(cat.children, level + 1);
            }
        });
        return html;
    }
    const tree = buildCategoryTree(categories);
    let optionsHtml = `<option value="">${localization.chooseCategory}</option>`;
    optionsHtml += renderOptions(tree);
    $('#js-Categories').html(optionsHtml);
}

//================= Report Modal =================
(function () {

    const modal = $("#reportModal");
    const overlay = $("#reportOverlay");
    const modalBody = $("#reportModalBody");

    $(".js-report-settings").on("click", function () {
        let reportId = $(this).data("report-id");

        modal.show();
        overlay.show();
        modalBody.html("<div class='text-center'>جاري التحميل...</div>");
        modalBody.load(`/AdminPanel/Reports/ReportsPartials/${reportId}`, function () {
            initSelect2();
            initCategories(window.reportCategories);
        });
    });
    $(".js-close-report, #reportOverlay").on("click", function () {
        modal.hide();
        overlay.hide();
        modalBody.empty();
    });

})();



// ================= Select2 =================
function initSelect2() {
    $('#reportModal .select2').each(function () {
        if ($(this).hasClass("select2-hidden-accessible")) {
            $(this).select2('destroy');
        }
        $(this).select2({
            dir: "rtl",
            width: "100%",
            allowClear: true,
            minimumResultsForSearch: -1,
            dropdownParent: $('#reportModal')
        });

    });
}
