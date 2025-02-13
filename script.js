document.addEventListener("DOMContentLoaded", function () {
    switchMode('manual'); // При загрузке ставим ручной ввод
});

function switchMode(mode) {
    if (mode === 'manual') {
        document.getElementById('manual-input').classList.add('active');
        document.getElementById('auto-input').classList.remove('active');
        document.getElementById('manual-input').classList.remove('hidden');
        document.getElementById('auto-input').classList.add('hidden');
    } else {
        document.getElementById('manual-input').classList.remove('active');
        document.getElementById('auto-input').classList.add('active');
        document.getElementById('manual-input').classList.add('hidden');
        document.getElementById('auto-input').classList.remove('hidden');
        startCamera();
    }
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="switchMode('${mode}')"]`).classList.add('active');
}

function calculate() {
    let price = parseFloat(document.getElementById("price").value);
    let weight = parseFloat(document.getElementById("weight").value);
    if (!isNaN(price) && !isNaN(weight) && weight > 0) {
        let pricePerKg = (price / weight) * 1000;
        addRow(price, weight, pricePerKg.toFixed(2));
    } else {
        alert("Введите корректные данные!");
    }
}

function resetTable() {
    document.getElementById("results").innerHTML = `
        <tr>
            <th>№</th>
            <th>Цена (тг)</th>
            <th>Вес (гр)</th>
            <th>Цена за кг</th>
        </tr>
    `;
}

function addRow(price, weight, pricePerKg) {
    let table = document.getElementById("results");
    let row = table.insertRow();
    row.insertCell(0).innerText = table.rows.length - 1;
    row.insertCell(1).innerText = price;
    row.insertCell(2).innerText = weight;
    row.insertCell(3).innerText = pricePerKg;
}

async function startCamera() {
    let stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    let video = document.getElementById("camera");
    video.srcObject = stream;
}

async function scanText() {
    let resultText = document.getElementById("scan-result");
    resultText.innerText = "Сканирую...";

    setTimeout(() => {
        let mockPrice = Math.floor(Math.random() * 1000) + 100;
        let mockWeight = Math.floor(Math.random() * 900) + 100;
        let detected = Math.random() > 0.2; // 80% шанс успешного распознавания

        if (detected) {
            let pricePerKg = (mockPrice / mockWeight) * 1000;
            addRow(mockPrice, mockWeight, pricePerKg.toFixed(2));
            resultText.innerText = `Цена: ${mockPrice} тг, Вес: ${mockWeight} г`;
        } else {
            resultText.innerText = "Текст не распознан!";
        }
    }, 2000);
}