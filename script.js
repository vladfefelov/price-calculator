let activeTab = 0;
let items = [];

function switchTab(index) {
    activeTab = index;
    document.querySelectorAll(".tab-btn").forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
    });
    document.querySelectorAll(".page").forEach((page, i) => {
        page.classList.toggle("active", i === index);
    });

    if (index === 1) startCamera();
}

function addItem() {
    let price = parseFloat(document.getElementById("price").value);
    let weight = parseFloat(document.getElementById("weight").value);

    if (!price || !weight) return alert("Введите данные!");

    let pricePerKg = (price / weight) * 1000;
    items.push({ price, weight, pricePerKg });

    updateTable();
}

function resetTable() {
    items = [];
    updateTable();
}

function updateTable() {
    let tbody = document.getElementById("table-body");
    tbody.innerHTML = "";

    if (items.length < 2) {
        items.forEach((item, index) => {
            tbody.innerHTML += `<tr>
                <td>${index + 1}</td>
                <td>${item.price}</td>
                <td>${item.weight}</td>
                <td>${item.pricePerKg.toFixed(2)}</td>
            </tr>`;
        });
        return;
    }

    let minPrice = Math.min(...items.map(i => i.pricePerKg));
    let maxPrice = Math.max(...items.map(i => i.pricePerKg));

    items.forEach((item, index) => {
        let color = item.pricePerKg === minPrice ? "lightgreen" : item.pricePerKg === maxPrice ? "lightcoral" : "white";
        tbody.innerHTML += `<tr style="background:${color}">
            <td>${index + 1}</td>
            <td>${item.price}</td>
            <td>${item.weight}</td>
            <td>${item.pricePerKg.toFixed(2)}</td>
        </tr>`;
    });
}

function startCamera() {
    let video = document.getElementById("camera");

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.error("Ошибка доступа к камере", err);
        });
}

function scan() {
    alert("Здесь будет обработка изображения!");
}