let reports = JSON.parse(localStorage.getItem("reports")) || [];

function reportIssue() {
    const service = document.getElementById("service").value;
    const issue = document.getElementById("issue").value;

    if (issue.trim() === "") {
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
    document.getElementById("issue").value = "";
}

function displayReports() {
    const statusList = document.getElementById("status-list");
    statusList.innerHTML = "<h3>Status de Serviços</h3>";

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

window.onload = displayReports;
