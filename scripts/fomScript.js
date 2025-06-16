const termsBox = document.getElementById("terms")
const link = document.getElementById("PreOrder")
termsBox.checked = false;
PreOrder.style.display = "none";
termsBox.addEventListener("change", () => {
    if (termsBox.checked) {
        PreOrder.style.display = "block";
    } else {
        PreOrder.style.display = "none";
    }
});