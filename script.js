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
    statusList.innerHTML = "<h3>📊 Status de Serviços</h3>";

    if (reports.length === 0) {
        statusList.innerHTML += "<p>Nenhum problema reportado até agora.</p>";
        return;
    }

    reports.forEach(report => {
        const reportElement = document.createElement("div");
        reportElement.classList.add("status-item");

        reportElement.innerHTML = `
            <span>🔹 Serviço: ${report.service}</span>
            <span>⚠️ Problema: ${report.issue}</span>
            <span>📅 Reportado em: ${report.timestamp}</span>
        `;

        statusList.appendChild(reportElement);
    });
}

// Carrega os relatórios ao iniciar a página
window.onload = displayReports;
