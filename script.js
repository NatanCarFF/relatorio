// Recupera os relatórios salvos no localStorage (se houver)
let reports = JSON.parse(localStorage.getItem("reports")) || [];

// Função para reportar um novo problema
function reportIssue() {
    const service = document.getElementById("service").value;
    const issue = document.getElementById("issue").value.trim();

    if (issue === "") {
        alert("Por favor, descreva o problema.");
        return;
    }

    const newReport = {
        service: service,
        issue: issue,
        timestamp: new Date().toLocaleString()
    };

    reports.push(newReport);
    localStorage.setItem("reports", JSON.stringify(reports));

    displayReports();
    document.getElementById("issue").value = ""; // Limpa o campo de entrada
}

// Função para exibir os relatórios na tela
function displayReports() {
    const statusList = document.getElementById("status-list");
    statusList.innerHTML = "<h2>📊 Status dos Serviços</h2>";

    if (reports.length === 0) {
        statusList.innerHTML += "<p>🔎 Nenhum problema reportado até agora.</p>";
        return;
    }

    reports.forEach((report, index) => {
        const reportElement = document.createElement("div");
        reportElement.classList.add("status-item");

        reportElement.innerHTML = `
            <span>🔹 Serviço: ${report.service}</span>
            <span>⚠️ Problema: ${report.issue}</span>
            <span>📅 Reportado em: ${report.timestamp}</span>
            <button class="delete-btn" onclick="deleteReport(${index})">❌ Remover</button>
        `;

        statusList.appendChild(reportElement);
    });
}

// Função para remover um relatório específico
function deleteReport(index) {
    if (confirm("Tem certeza que deseja remover este relatório?")) {
        reports.splice(index, 1);
        localStorage.setItem("reports", JSON.stringify(reports));
        displayReports();
    }
}

// Carrega os relatórios ao iniciar a página
window.onload = displayReports;
