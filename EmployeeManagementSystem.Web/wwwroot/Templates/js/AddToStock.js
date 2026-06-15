
// ================== Select2 ==================
$(document).ready(function () {
    $('.select2').each(function () {
        $(this).select2({
            placeholder: $(this).data("placeholder"),
            allowClear: true,
            dir: "rtl",
            width: "100%",
            minimumResultsForSearch: -1
        });
        initStatusSelects();
    });
    
});


// ================= Prevent default submit =================
$("#AddProductForm").on("submit", function (e) {
    e.preventDefault();
});

// ================= Language Switch =================
let currentLang = "ar";

$(".lang-btn").on("click", function () {
    $(".lang-btn").removeClass("active");
    $(this).addClass("active");
    currentLang = $(this).data("lang");
    syncLanguageFields();
});

function syncLanguageFields() {
    if (currentLang === "ar") {
        $("#NameEn").val($("#NameInput").val());
        $("#NameInput").val($("#NameAr").val());
        $("#DescriptionEn").val(quill.root.innerHTML);
        quill.root.innerHTML = $("#DescriptionAr").val() || "";
    } else {
        $("#NameAr").val($("#NameInput").val());
        $("#NameInput").val($("#NameEn").val());
        $("#DescriptionAr").val(quill.root.innerHTML);
        quill.root.innerHTML = $("#DescriptionEn").val() || "";
    }
}

// ================= Name Sync =================
$("#NameInput").on("input", function () {
    if (currentLang === "ar") {
        $("#NameAr").val(this.value);
        $("#js-NameArValidation").text("");
    } else {
        $("#NameEn").val(this.value);
        $("#js-NameEnValidation").text("");
    }
});

// ================= Sidebar Active =================
const currentPath = window.location.pathname.toLowerCase();
document.querySelectorAll(".sidebar-menu .menu-item a").forEach(link => {
    const page = link.getAttribute("href").toLowerCase().split("/").pop();
    if (currentPath.includes(page)) {
        link.parentElement.classList.add("active");
    }
});

// ================= Select2 =================
$(document).ready(function () {
    $(".select2").select2({
        dir: "rtl",
        width: "100%",
        minimumResultsForSearch: -1
    });
});

// ================= Status Select Color =================
function applyStatusColor() {
    const select = $("#status-select");
    const container = select.data("select2")?.$selection;
    if (!container) return;

    container.removeClass("active inactive");
    if (select.val() === "true") container.addClass("active");
    if (select.val() === "false") container.addClass("inactive");
}
$("#status-select").on("change", applyStatusColor);
$(document).ready(applyStatusColor);

// ================= Upload Cover & Gallery =================
let galleryFiles = [];

document.querySelectorAll(".upload-area input[type='file']").forEach(input => {
    input.addEventListener("change", function () {
        const area = this.closest(".upload-area");
        const icon = area.querySelector(".upload-icon");

        if (area.classList.contains("cover-upload")) {
            const img = area.querySelector(".preview-img");
            img.src = URL.createObjectURL(this.files[0]);
            img.style.display = "block";
            icon.style.display = "none";
        }

        if (area.classList.contains("gallery-upload")) {
            const preview = area.querySelector(".gallery-preview");
            preview.innerHTML = "";
            icon.style.display = "none";

            Array.from(this.files).forEach(file => {
                galleryFiles.push(file);
                const holder = document.createElement("span");
                const media = document.createElement(file.type.startsWith("image") ? "img" : "video");
                media.src = URL.createObjectURL(file);
                if (media.tagName === "VIDEO") media.controls = true;

                const del = document.createElement("span");
                del.className = "upload-delete-btn";
                del.textContent = "×";
                del.onclick = () => {
                    holder.remove();
                    galleryFiles = galleryFiles.filter(f => f !== file);
                    if (!galleryFiles.length) icon.style.display = "block";
                };

                holder.append(media, del);
                preview.appendChild(holder);
            });
        }

        this.value = "";
    });
});


// ================= Attribute Dropdown =================
const propDropdown = document.getElementById("propDropdown");
const openAttrBtn = document.getElementById("open-attr-btn");
const attrContainer = document.getElementById("attributes-container");

openAttrBtn.addEventListener("click", () => {
    propDropdown.style.display = propDropdown.style.display === "block" ? "none" : "block";
    renderPropDropdown();
});

function renderPropDropdown() {
    propDropdown.innerHTML = "";
    const used = [...attrContainer.children].map(b => b.id.replace("-block", ""));
    const available = PRODUCT_ATTRIBUTES.filter(a => !used.includes(a.value));

    if (!available.length) {
        propDropdown.innerHTML = `<div class="dropdown-item disabled">لا توجد خصائص</div>`;
        return;
    }

    available.forEach(attr => {
        const item = document.createElement("div");
        item.className = "dropdown-item";
        item.dataset.type = attr.value;
        item.dataset.name = attr.text;
        item.textContent = attr.text;
        propDropdown.appendChild(item);
    });
}

propDropdown.addEventListener("click", e => {
    const item = e.target.closest(".dropdown-item");
    if (!item?.dataset.type) return;
    propDropdown.style.display = "none";
    createAttributeBlock(item.dataset.type, item.dataset.name);
});

// ================= Create Attribute Block =================
function createAttributeBlock(type, name) {
    if (document.getElementById(type + "-block")) return;

    const block = document.createElement("div");
    block.className = "attribute-block";
    block.id = type + "-block";
    block.innerHTML = `
        <div class="title-row title-row-handle" style="margin-top:18px">
            <div class="permission-title">${name}</div>
            <img class="delete-icon remove-card" src="/Templates/assets/images/icons/delete.svg">
        </div>
        <div class="items-list" id="${type}-list"></div>
    `;
    attrContainer.appendChild(block);
    addAttributeValue(type);
}

// ================= Add Attribute Value =================
function addAttributeValue(type) {
    const list = document.getElementById(type + "-list");
    const values = ATTRIBUTE_VALUES[type] || [];
    if (!values.length) return;

    const item = document.createElement("div");
    item.className = "item";

    item.innerHTML = `
        <select class="variant-select">
            <option value="">اختر القيمة</option>
            ${values.map(v => `<option value="${v.value}">${v.text}</option>`).join("")}
        </select>
        <img class="save-icon" src="/Templates/assets/images/icons/ok.svg">
        <img class="delete-icon hidden" src="/Templates/assets/images/icons/delete.svg">
    `;

    list.appendChild(item);
    $(item).find(".variant-select").select2({ dir: "rtl", width: "100%", minimumResultsForSearch: -1 });

    const select = item.querySelector(".variant-select");
    const save = item.querySelector(".save-icon");
    const del = item.querySelector(".delete-icon");

    save.onclick = () => {
        if (!select.value) return;
        select.disabled = true;
        save.classList.add("hidden");
        del.classList.remove("hidden");
        scheduleUpdateVariants();
        addAttributeValue(type);
    };

    del.onclick = () => {
        item.remove();
        scheduleUpdateVariants();
    };
}

// ================== Remove Block ==================
document.addEventListener("click", e => {
    if (e.target.classList.contains("remove-card")) {
        const block = e.target.closest(".attribute-block");
        block.remove();
        scheduleUpdateVariants();
    }
});

// ================= Read Attributes =================
function readAttributeLists() {
    return [...document.querySelectorAll(".attribute-block")]
        .map(block =>
            [...block.querySelectorAll(".variant-select:disabled")]
                .map(s => s.value)
        ).filter(arr => arr.length);
}

// ================= Cartesian =================
function cartesianProduct(arr) {
    return arr.reduce((a, b) => a.flatMap(d => b.map(e => [...d, e])), [[]]);
}

function comboSku(combo) {
    return combo.join("-").replace(/\s+/g, "").toUpperCase();
}

// ================= Variants Table =================
function updateVariantsTable() {
    const tbody = document.querySelector(".main-table tbody");
    const lists = readAttributeLists();

    if (!lists.length) {
        tbody.innerHTML = `<tr><td colspan="12" class="text-muted text-center">لم يتم إضافة خصائص</td></tr>`;
        return;
    }

    tbody.innerHTML = "";
    cartesianProduct(lists).forEach((combo, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><input type="checkbox"></td>
            <td>
                <label class="upload-box">
                    <input type="file" class="upload-input">
                    <img class="upload-placeholder" src="/Templates/assets/images/icons/table_upload.svg">
                </label>
            </td>
            <td>${combo.join(" / ")}</td>
            ${Array(9).fill(`<td><input type="text" class="feature-input" value="0"></td>`).join("")}
        `;
        tbody.appendChild(tr);
        const uploadInput = tr.querySelector(".upload-input");
        const previewImg = tr.querySelector(".upload-placeholder");

        uploadInput.addEventListener("change", function () {
            if (!this.files || !this.files[0]) return;

            const reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        });


    });
}

// ================= Auto Update =================
let timer;
function scheduleUpdateVariants() {
    clearTimeout(timer);
    timer = setTimeout(updateVariantsTable, 150);
}

new MutationObserver(scheduleUpdateVariants)
    .observe(attrContainer, { childList: true, subtree: true });

// ================= Save Button =================
$("#SaveVariants").on("click", function () {
    $("#AddProductForm").trigger("submit");
});
