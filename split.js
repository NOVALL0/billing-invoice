let itemCounter = 0;

function AddInvoiceItem() {
    itemCounter++;
    const newItemRow = `
        <tr id="itemRow${itemCounter}">
            <td><input type="text" class="form-control deskripsi" placeholder="Tambahkan deskripsi" required></td>
            <td><input type="number" class="form-control quantity" placeholder="Masukan quantity" required></td>
            <td><input type="number" class="form-control harga" placeholder="Masukan harga" required></td>
            <td><input type="text" class="form-control TotalItem" disabled readonly></td>
            <td><button type="button" class="btn btn-danger" onclick="removeInvoiceItem(${itemCounter})">Hapus item</button></td>
        </tr>`;
    $("#invoiceItems").append(newItemRow);
    updateTotalAmount();
}

function removeInvoiceItem(itemID) {
    $(`#itemRow${itemID}`).remove();
    updateTotalAmount();
}

function updateTotalAmount() {
    let totalAmount = 0;
    $("tr[id^='itemRow']").each(function () {
        const quantity = parseFloat($(this).find(".quantity").val()) || 0;
        const harga = parseFloat($(this).find(".harga").val()) || 0;
        const totalHarga = quantity * harga;
        $(this).find(".TotalItem").val(totalHarga.toFixed(2));
        totalAmount += totalHarga;
    });
    $("#Total-Amount").val(totalAmount.toFixed(2));
}

$(document).ready(function() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    $("#customerDate").val(formattedDate);
});

$("#invoiceForm").submit(function(event) {
    event.preventDefault();
    updateTotalAmount();
});

function printInvoice() {
    window.print();
}

function generateInvoice() {
    alert("Invoice has been generated!");
}
