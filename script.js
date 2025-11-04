// script.js

// Dados dinâmicos
const projects = [
    {name:"Distribuição de Alimentos", desc:"Entrega de cestas básicas em comunidades vulneráveis."},
    {name:"Educação Nutricional", desc:"Workshops de alimentação saudável e sustentável."},
    {name:"Hortas Comunitárias", desc:"Criação de hortas urbanas em escolas e bairros."},
    {name:"Campanha de Doação", desc:"Arrecadação de alimentos e recursos para famílias carentes."}
];

const reports = [
    {title:"Relatório anual 2023", link:"#"},
    {title:"Prestação de contas 2023", link:"#"},
    {title:"Relatório anual 2024", link:"#"},
    {title:"Prestação de contas 2024", link:"#"}
];

// Inicializa SPA
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav a:not(#toggle-theme)");
    const main = document.querySelector("main");

    const loadTemplate = (templateId) => {
        const template = document.getElementById(templateId);
        if (!template) return;
        main.innerHTML = template.innerHTML;

        // Inicializações por página
        if(templateId === "projetos-template") renderProjects();
        if(templateId === "cadastro-template") {
            renderUsers();
            document.getElementById("form-cadastro").addEventListener("submit", handleFormSubmit);
        }
        if(templateId === "relatorios-template") renderReports();
    };

    // Inicial: home
    loadTemplate("home-template");

    // Navegação SPA
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const page = link.getAttribute("href").replace(".html", "-template");
            loadTemplate(page);
        });
    });

    // Dark mode toggle
    const toggleBtn = document.getElementById("toggle-theme");
    toggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.classList.toggle("dark-mode");
        toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
});

// Renderiza lista de projetos e filtro
function renderProjects() {
    const list = document.getElementById("projects-list");
    const search = document.getElementById("search-project");
    const filtered = projects.map(p => `<div class="project-item"><strong>${p.name}</strong><p>${p.desc}</p></div>`).join("");
    list.innerHTML = filtered;

    search.addEventListener("input", () => {
        const query = search.value.toLowerCase();
        const filtered = projects
            .filter(p => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query))
            .map(p => `<div class="project-item"><strong>${p.name}</strong><p>${p.desc}</p></div>`).join("");
        list.innerHTML = filtered;
    });
}

// Validação de formulário e salvamento em LocalStorage
function handleFormSubmit(e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const idade = parseInt(document.getElementById("idade").value);
    const feedback = document.getElementById("feedback");
    feedback.innerHTML = "";

    let erros = [];
    if (nome.length < 3) erros.push("Nome deve ter pelo menos 3 caracteres.");
    if (!/\S+@\S+\.\S+/.test(email)) erros.push("E-mail inválido.");
    if (isNaN(idade) || idade < 1) erros.push("Idade deve ser maior que 0.");

    if (erros.length > 0) {
        feedback.innerHTML = erros.map(err => `<p style="color:red;">${err}</p>`).join("");
    } else {
        feedback.innerHTML = `<p style="color:green;">Cadastro enviado com sucesso!</p>`;
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        users.push({ nome, email, idade });
        localStorage.setItem("users", JSON.stringify(users));
        e.target.reset();
        renderUsers();
    }
}

// Renderiza usuários cadastrados
function renderUsers() {
    const list = document.getElementById("user-list");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    list.innerHTML = users.map(u => `<li>${u.nome} - ${u.email} - ${u.idade} anos</li>`).join("");
}

// Renderiza relatórios
function renderReports() {
    const list = document.getElementById("reports-list");
    list.innerHTML = reports.map(r => `<div class="report-item"><a href="${r.link}">${r.title}</a></div>`).join("");
} 