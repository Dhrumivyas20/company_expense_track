// ExpenseX Application
const credentials = {
    'admin':    { password: 'admin123', role: 'admin', name: 'System Administrator', id: 1 },
    'john_manager': { password: 'manager123', role: 'manager', name: 'John Smith', id: 2 },
    'jane_employee': { password: 'employee123', role: 'employee', name: 'Jane Doe', id: 3 },
    'cfo':      { password: 'cfo123', role: 'cfo', name: 'Chief Financial Officer', id: 4 }
};

const sampleExpenses = [
    { id: 1, employee: 'Jane Doe', employee_id: 3, manager_id: 2, department: 'Sales', amount: 456.78, category: 'Travel', description: 'Client meeting in Boston', date: '2024-10-01', status: 'pending_manager_approval', receipt: true },
    { id: 2, employee: 'Jane Doe', employee_id: 3, manager_id: 2, department: 'Sales', amount: 89.50, category: 'Meals', description: 'Business lunch', date: '2024-10-02', status: 'manager_approved', receipt: true },
    { id: 3, employee: 'John Smith', employee_id: 2, manager_id: 2, department: 'Sales', amount: 234.56, category: 'Travel', description: 'Conference travel', date: '2024-09-30', status: 'approved', receipt: true }
];

const cfoMetrics = {
    totalCompanySpend: 2400000,
    costPerEmployee: 9720,
    policyCompliance: 94.3,
    roiOnTravelExpense: 3.2,
    budgetVariance: 2.3,
    quarterlyGrowth: 12.5
};

// Utility functions for login
function validateLogin(username, password) {
    return credentials[username] && credentials[username].password === password;
}
function getUserRole(username) {
    return credentials[username] ? credentials[username].role : null;
}

class ExpenseXAI {
    constructor(app) {
        this.app = app;
        this.context = {
            currentUser: null,
            currentRole: null,
            currentPage: null,
            systemData: {}
        };
    }
    async processMessage(message) {
        const lowerMessage = message.toLowerCase();
        this.updateContext();
        if (lowerMessage.includes('expense') && lowerMessage.includes('summary')) {
            return this.getExpenseSummary();
        } else if (lowerMessage.includes('budget')) {
            return this.getBudgetInfo();
        } else if (lowerMessage.includes('how') && lowerMessage.includes('submit')) {
            return this.getSubmissionGuide();
        } else if (lowerMessage.includes('team') || lowerMessage.includes('department')) {
            return this.getTeamInfo();
        } else if (lowerMessage.includes('compliance') || lowerMessage.includes('policy')) {
            return this.getComplianceInfo();
        } else if (lowerMessage.includes('report')) {
            return this.getReportInfo();
        } else if (lowerMessage.includes('help') || lowerMessage.includes('navigation')) {
            return this.getNavigationHelp();
        } else {
            return this.getGeneralResponse(message);
        }
    }
    updateContext() {
        this.context = {
            currentUser: this.app.currentUser,
            currentRole: this.app.currentRole,
            currentPage: this.app.currentPage,
            systemData: {
                expenses: this.app.expenses,
                totalExpenses: this.app.expenses.length,
                pendingCount: this.app.expenses.filter(e => e.status.includes('pending')).length,
                approvedCount: this.app.expenses.filter(e => e.status.includes('approved')).length
            }
        };
    }
    getExpenseSummary() {
        const user = this.context.currentUser;
        const role = this.context.currentRole;
        if (role === 'employee') {
            const personalExpenses = this.app.expenses.filter(e => e.employee_id === user.id);
            const total = personalExpenses.reduce((sum, e) => sum + e.amount, 0);
            const pending = personalExpenses.filter(e => e.status.includes('pending')).length;
            return `📊 <b>Your Expense Summary:</b><br>• <b>Total Expenses:</b> $${total.toLocaleString()}<br>• <b>Submitted:</b> ${personalExpenses.length} expenses<br>• <b>Pending Approval:</b> ${pending} expenses<br>• <b>This Month:</b> ${personalExpenses.filter(e => e.date.startsWith('2024-10')).length} expenses`;
        } else if (role === 'manager') {
            const teamExpenses = this.app.expenses.filter(e => e.manager_id === user.id);
            const total = teamExpenses.reduce((sum, e) => sum + e.amount, 0);
            const pending = teamExpenses.filter(e => e.status === 'pending_manager_approval').length;
            return `📊 <b>Team Expense Summary:</b><br>• <b>Team Total:</b> $${total.toLocaleString()}<br>• <b>Team Expenses:</b> ${teamExpenses.length} total<br>• <b>Awaiting Your Approval:</b> ${pending} expenses<br>• <b>Team Members:</b> 9 people`;
        } else if (role === 'cfo') {
            const total = this.app.expenses.reduce((sum, e) => sum + e.amount, 0);
            return `📊 <b>Executive Expense Summary:</b><br>• <b>Total Company Spend:</b> $2.4M<br>• <b>Cost Per Employee:</b> $9,720<br>• <b>Policy Compliance:</b> 94.3%<br>• <b>ROI on T&E:</b> 3.2x<br>• <b>Budget Variance:</b> +2.3% (within tolerance)`;
        } else {
            const total = this.app.expenses.reduce((sum, e) => sum + e.amount, 0);
            return `📊 <b>Company Expense Summary:</b><br>• <b>Total Company Spend:</b> $${total.toLocaleString()}<br>• <b>Total Expenses:</b> ${this.app.expenses.length}<br>• <b>Pending Approvals:</b> ${this.context.systemData.pendingCount}<br>• <b>Active Users:</b> 247`;
        }
    }
    getBudgetInfo() {
        const role = this.context.currentRole;
        if (role === 'manager') {
            return `💰 <b>Team Budget Information:</b><br>• <b>Monthly Budget:</b> $25,000<br>• <b>Spent This Month:</b> $17,000 (68%)<br>• <b>Remaining:</b> $8,000<br>• <b>Status:</b> On Track ✅<br><br><b>Category Breakdown:</b><br>• Travel: $8,500 / $12,000 (70.8%)<br>• Meals: $2,800 / $4,000 (70.0%)<br>• Marketing: $3,200 / $6,000 (53.3%)`;
        } else if (role === 'cfo') {
            return `💰 <b>Executive Budget Overview:</b><br>• <b>Total Company Budget:</b> $2.4M annually<br>• <b>Q4 Utilization:</b> 89.5%<br>• <b>Cost Per Employee:</b> $9,720<br>• <b>Budget Variance:</b> +2.3% (within tolerance)<br><br><b>Risk Areas:</b><br>• Marketing: 82% utilization<br>• Engineering: 84.9% utilization`;
        } else {
            return `💰 <b>Budget Information:</b><br>Submit expenses promptly for better tracking.<br>Include detailed descriptions and receipts for fast approval.<br>Check with your manager for department-specific limits.`;
        }
    }
    getSubmissionGuide() {
        return `📋 <b>How to Submit an Expense:</b><br><br><b>Step 1:</b> Go to "Submit Expense"<br><b>Step 2:</b> Fill required fields: Amount, Category, Description, Date<br><b>Step 3:</b> Upload receipt (recommended)<br><b>Step 4:</b> Click "Submit Expense"<br><br><b>💡 Pro Tips:</b><br>• Upload CSV for bulk submissions<br>• Submit within 30 days<br>• Keep digital receipt copies<br>• Be specific in descriptions`;
    }
    getTeamInfo() {
        const role = this.context.currentRole;
        if (role === 'manager') {
            return `👥 <b>Your Team Information:</b><br>• <b>Team Size:</b> 9 members<br>• <b>Department:</b> Sales<br>• <b>Recent Activity:</b> 3 pending approvals<br>• <b>Team Compliance:</b> 94.2%<br><br><b>Top Performers:</b><br>• Sarah Wilson: $3,200<br>• Jane Doe: $2,450`;
        }
        return `👥 <b>Department Information:</b><br>I can provide information about department budgets, utilization, performance metrics, and compliance rates. What specific department information do you need?`;
    }
    getNavigationHelp() {
        const role = this.context.currentRole;
        let navigation = `🧭 <b>Navigation Help:</b><br><br>`;
        if (role === 'admin') {
            navigation += `<b>Admin Dashboard:</b><br>🏠 Dashboard - System overview<br>💳 Expenses - All expenses<br>👥 Users - User management<br>📊 Reports - System reports`;
        } else if (role === 'manager') {
            navigation += `<b>Manager Dashboard:</b><br>🏠 Dashboard - Team overview<br>✅ Approvals - Review expenses<br>👥 Team - Team management<br>💰 Budget - Budget monitoring`;
        } else if (role === 'employee') {
            navigation += `<b>Employee Dashboard:</b><br>🏠 Dashboard - Personal overview<br>➕ Submit Expense - Add new expense<br>📝 My Expenses - View history`;
        } else if (role === 'cfo') {
            navigation += `<b>CFO Dashboard:</b><br>📊 Executive Dashboard - Company KPIs<br>💰 Financial Overview - Financial metrics<br>📈 Strategic Analytics - Business insights<br>⚠️ Risk Management - Risk assessment<br>✅ Compliance - Regulatory compliance<br>📋 Executive Reports - Strategic reports`;
        }
        return navigation + `<br><br>Need help with specific pages? Just ask!`;
    }
    getComplianceInfo() {
        return `✅ <b>Compliance Information:</b><br>• <b>Policy Compliance:</b> 94.3%<br>• <b>Receipt Attachment Rate:</b> 91%<br>• <b>Approval Workflow:</b> 97% compliance<br><br>Always attach receipts and follow proper approval channels for best compliance.`;
    }
    getReportInfo() {
        return `📋 <b>Report Information:</b><br>You can generate various reports from your dashboard. What type of report do you need?<br><br>• Performance Reports<br>• Budget Analysis<br>• Compliance Reports<br>• Expense Summaries<br><br>Let me know which one interests you!`;
    }
    getGeneralResponse(message) {
        const responses = [
            "I'm here to help with ExpenseX questions! Try asking about expenses, budgets, or system features.",
            "I can assist with expense management, budget tracking, policy questions, and navigation. What would you like to know?",
            "Feel free to ask about your expenses, team budget, compliance policies, or any ExpenseX features!",
            "I have access to all your expense data and can help with analytics, reporting, budgets, and guidance. How can I help?"
        ];
        return responses[Math.floor(Math.random() * responses.length)] +
               "<br><br><b>Popular questions:</b><br>• Show me my expense summary<br>• What's my team budget status?<br>• How do I submit an expense?<br>• Help me navigate the system";
    }
}

// Chatbot Functions
function openChatbot() {
    const chatbot = document.getElementById('ai-chatbot');
    const launcher = document.querySelector('.chatbot-launcher');
    
    if (chatbot && launcher) {
        chatbot.classList.add('open');
        launcher.style.display = 'none';
    }
}

function closeChatbot() {
    const chatbot = document.getElementById('ai-chatbot');
    const launcher = document.querySelector('.chatbot-launcher');
    
    if (chatbot && launcher) {
        chatbot.classList.remove('open');
        launcher.style.display = 'flex';
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        setTimeout(() => {
            window.expenseAI.processMessage(message).then((response) => {
                addMessage(response, 'bot');
            });
        }, 800);
    }
}

function askAI(question) {
    addMessage(question, 'user');
    setTimeout(() => {
        window.expenseAI.processMessage(question).then((response) => {
            addMessage(response, 'bot');
        });
    }, 600);
}

function addMessage(content, type) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = content.replace(/\n/g, '<br>');
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleChatKeyPress(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}

// ExpenseX Main App
class ExpenseXApp {
    constructor() {
        this.currentUser = null;
        this.currentRole = null;
        this.currentPage = null;
        this.expenses = [...sampleExpenses];
        window.expenseAI = new ExpenseXAI(this);
        window.app = this;
        this.initializeApp();
    }

    initializeApp() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindEvents());
        } else {
            this.bindEvents();
        }
    }

    bindEvents() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Bind navigation buttons using event delegation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-btn') && e.target.dataset.page) {
                e.preventDefault();
                this.switchPage(e.target.dataset.page);
            }
        });

        const expenseForm = document.getElementById('expense-form');
        if (expenseForm) {
            expenseForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitExpense();
            });
        }

        // Set default date for expense form
        const expenseDate = document.getElementById('expense-date');
        if (expenseDate) {
            expenseDate.value = new Date().toISOString().split('T')[0];
        }
    }

    fillDemoCredentials(username, password) {
        const usernameInput = document.getElementById('login-username');
        const passwordInput = document.getElementById('login-password');
        
        if (usernameInput && passwordInput) {
            usernameInput.value = username;
            passwordInput.value = password;
            this.hideLoginError();
        }
    }

    handleLogin() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        if (!validateLogin(username, password)) {
            this.showLoginError('Invalid username or password.');
            return;
        }
        
        this.currentUser = credentials[username];
        this.currentRole = credentials[username].role;
        this.switchRoleInterface();
    }

    showLoginError(msg) {
        const errorMessage = document.getElementById('error-message');
        const loginError = document.getElementById('login-error');
        
        if (errorMessage && loginError) {
            errorMessage.textContent = msg;
            loginError.classList.remove('hidden');
        }
    }

    hideLoginError() {
        const loginError = document.getElementById('login-error');
        if (loginError) {
            loginError.classList.add('hidden');
        }
    }

    switchRoleInterface() {
        // Hide login page
        const loginPage = document.getElementById('login-page');
        if (loginPage) {
            loginPage.classList.remove('active');
        }

        // Hide all role interfaces
        document.querySelectorAll('.role-interface').forEach(e => e.classList.remove('active'));
        
        // Show current role interface
        const roleInterface = document.getElementById(this.currentRole + '-interface');
        if (roleInterface) {
            roleInterface.classList.add('active');
        }

        // Update user name in navbar
        const userNameElement = document.getElementById(this.currentRole + '-user-name');
        if (userNameElement) {
            userNameElement.textContent = this.currentUser.name;
        }

        // Set dashboard as default page
        this.switchPage(this.currentRole + '-dashboard');
    }

    switchPage(pageId) {
        this.currentPage = pageId;
        
        // Hide all role pages
        document.querySelectorAll('.role-page').forEach(e => e.classList.remove('active'));
        
        // Show target page
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.add('active');
        }

        // Update navigation active state
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll(`[data-page='${pageId}']`).forEach(b => b.classList.add('active'));

        // Load page-specific data and charts
        this.loadPageData(pageId);
    }

    loadPageData(pageId) {
        // Load data based on current page
        if (this.currentRole === 'employee' && pageId === 'employee-expenses') {
            this.renderEmployeeExpenses();
        }
        if (this.currentRole === 'manager' && pageId === 'manager-approvals') {
            this.renderApprovals();
        }
        if (this.currentRole === 'manager' && pageId === 'manager-dashboard') {
            this.renderManagerDashboard();
        }
        if (this.currentRole === 'cfo' && pageId === 'cfo-dashboard') {
            this.renderCFODashboard();
        }
        if (this.currentRole === 'cfo' && pageId === 'cfo-financial') {
            this.renderCFOFinancial();
        }
        if (this.currentRole === 'cfo' && pageId === 'cfo-analytics') {
            this.renderCFOAnalytics();
        }
        if (this.currentRole === 'admin' && pageId === 'admin-dashboard') {
            this.renderAdminDashboard();
        }
        if (this.currentRole === 'employee' && pageId === 'employee-dashboard') {
            this.renderEmployeeDashboard();
        }
    }

    logout() {
        this.currentUser = null;
        this.currentRole = null;
        this.currentPage = null;
        
        // Hide all role interfaces
        document.querySelectorAll('.role-interface').forEach(e => e.classList.remove('active'));
        
        // Show login page
        const loginPage = document.getElementById('login-page');
        if (loginPage) {
            loginPage.classList.add('active');
        }

        // Reset login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.reset();
        }
        this.hideLoginError();

        // Reset chatbot
        const launcher = document.querySelector('.chatbot-launcher');
        const chatbot = document.getElementById('ai-chatbot');
        if (launcher && chatbot) {
            launcher.style.display = 'flex';
            chatbot.classList.remove('open');
        }
    }

    submitExpense() {
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const date = document.getElementById('expense-date').value;
        const category = document.getElementById('expense-category').value;
        const description = document.getElementById('expense-description').value.trim();
        const receipt = document.getElementById('expense-receipt').files.length > 0;

        if (!amount || !date || !category || !description) {
            alert('Please fill all required fields.');
            return;
        }

        const newExpense = {
            id: this.expenses.length + 1,
            employee: this.currentUser.name,
            employee_id: this.currentUser.id,
            manager_id: this.currentUser.role === 'employee' ? 2 : this.currentUser.id,
            department: 'Sales',
            amount,
            category,
            description,
            date,
            status: 'pending_manager_approval',
            receipt
        };

        this.expenses.push(newExpense);
        alert('Expense submitted successfully! Your manager will be notified for approval.');
        document.getElementById('expense-form').reset();
        document.getElementById('expense-date').value = new Date().toISOString().split('T')[0];
        this.renderEmployeeExpenses();
    }

    renderEmployeeExpenses() {
        const container = document.getElementById('employee-expenses-list');
        if (!container) return;

        const myExpenses = this.expenses.filter(e => e.employee_id === this.currentUser.id);
        
        if (myExpenses.length === 0) {
            container.innerHTML = '<p>No expenses found. Submit your first expense to get started!</p>';
            return;
        }

        container.innerHTML = myExpenses.map(e => `
            <div class='expense-item'>
                <div class='expense-details'>
                    <h4>${e.category} - ${e.description}</h4>
                    <p><strong>Date:</strong> ${e.date} | <strong>Status:</strong> ${this.formatStatus(e.status)}</p>
                </div>
                <div class='expense-amount'>$${e.amount.toFixed(2)}</div>
                <div class='expense-status'>
                    <span class='status ${this.getStatusClass(e.status)}'>${this.formatStatus(e.status)}</span>
                </div>
            </div>
        `).join('');
    }

    renderEmployeeDashboard() {
        setTimeout(() => {
            this.createChart('employee-monthly-chart', {
                type: 'bar',
                data: {
                    labels: ['Aug', 'Sep', 'Oct'],
                    datasets: [{
                        label: 'My Expenses',
                        data: [180, 220, 546],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });

            this.createChart('employee-category-chart', {
                type: 'doughnut',
                data: {
                    labels: ['Travel', 'Meals', 'Office'],
                    datasets: [{
                        data: [456.78, 89.50, 0],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }, 100);
    }

    renderApprovals() {
        const container = document.getElementById('approvals-list');
        if (!container) return;

        const teamExpenses = this.expenses.filter(e => e.manager_id === this.currentUser.id && e.status === 'pending_manager_approval');
        
        if (teamExpenses.length === 0) {
            container.innerHTML = '<p>No pending approvals at this time.</p>';
            return;
        }

        container.innerHTML = teamExpenses.map(e => `
            <div class='approval-item'>
                <div class='approval-details'>
                    <h4>${e.employee}</h4>
                    <p><strong>${e.category}</strong> - ${e.description}<br>
                    <strong>Date:</strong> ${e.date} | <strong>Receipt:</strong> ${e.receipt ? '✅ Attached' : '❌ Missing'}</p>
                </div>
                <div class='approval-amount'>$${e.amount.toFixed(2)}</div>
                <div class='approval-actions'>
                    <button class='btn btn--success btn--sm' onclick='app.approveExpense(${e.id})'>Approve</button>
                    <button class='btn btn--danger btn--sm' onclick='app.rejectExpense(${e.id})'>Reject</button>
                </div>
            </div>
        `).join('');
    }

    approveExpense(expenseId) {
        const expense = this.expenses.find(e => e.id === expenseId);
        if (expense) {
            expense.status = 'manager_approved';
            alert(`Expense approved successfully! ${expense.employee} will be notified.`);
            this.renderApprovals();
        }
    }

    rejectExpense(expenseId) {
        const expense = this.expenses.find(e => e.id === expenseId);
        if (expense) {
            const reason = prompt('Please provide a reason for rejection:');
            if (reason && reason.trim()) {
                expense.status = 'manager_rejected';
                expense.rejection_reason = reason;
                alert(`Expense rejected. ${expense.employee} will be notified with the reason.`);
                this.renderApprovals();
            }
        }
    }

    renderManagerDashboard() {
        setTimeout(() => {
            this.createChart('manager-trends-chart', {
                type: 'line',
                data: {
                    labels: ['Aug', 'Sep', 'Oct'],
                    datasets: [{
                        label: 'Team Expenses',
                        data: [14200, 16800, 17000],
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });

            this.createChart('manager-category-chart', {
                type: 'doughnut',
                data: {
                    labels: ['Travel', 'Meals', 'Marketing'],
                    datasets: [{
                        data: [8500, 2800, 3200],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }, 100);
    }

    renderCFODashboard() {
        setTimeout(() => {
            this.createChart('cfo-spend-trends', {
                type: 'line',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [{
                        label: 'Company Spend',
                        data: [500000, 600000, 700000, 600000],
                        borderColor: '#1FB8CD',
                        backgroundColor: '#ECEBD5',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });

            this.createChart('cfo-dept-performance', {
                type: 'bar',
                data: {
                    labels: ['Sales', 'Marketing', 'Engineering'],
                    datasets: [{
                        label: 'Performance %',
                        data: [92, 82, 85],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }, 100);
    }

    renderCFOFinancial() {
        setTimeout(() => {
            this.createChart('cfo-financial-chart', {
                type: 'line',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [{
                        label: 'Financial Performance',
                        data: [320000, 470000, 620000, 600000],
                        borderColor: '#5D878F',
                        backgroundColor: '#ECEBD5',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }, 100);
    }

    renderCFOAnalytics() {
        setTimeout(() => {
            this.createChart('cfo-analytics-chart', {
                type: 'radar',
                data: {
                    labels: ['Efficiency', 'ROI', 'Compliance', 'Growth', 'Risk', 'Innovation'],
                    datasets: [{
                        label: 'Performance Indicators',
                        data: [85, 92, 94, 78, 88, 82],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.2)',
                        pointBackgroundColor: '#1FB8CD'
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }, 100);
    }

    renderAdminDashboard() {
        setTimeout(() => {
            this.createChart('admin-activity-chart', {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'System Activity',
                        data: [120, 135, 180, 165, 195, 210],
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });

            this.createChart('admin-dept-chart', {
                type: 'bar',
                data: {
                    labels: ['Sales', 'Marketing', 'Engineering'],
                    datasets: [{
                        label: 'Department Expenses',
                        data: [800000, 400000, 1200000],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }, 100);
    }

    // Utility functions
    createChart(canvasId, config) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        // Destroy existing chart if any
        if (canvas.chart) {
            canvas.chart.destroy();
        }

        try {
            canvas.chart = new Chart(canvas.getContext('2d'), config);
        } catch (error) {
            console.error('Error creating chart:', error);
        }
    }

    formatStatus(status) {
        const statusMap = {
            'pending_manager_approval': 'Pending Manager Approval',
            'manager_approved': 'Manager Approved',
            'manager_rejected': 'Manager Rejected',
            'approved': 'Approved',
            'rejected': 'Rejected'
        };
        return statusMap[status] || status;
    }

    getStatusClass(status) {
        const classMap = {
            'pending_manager_approval': 'status--warning',
            'manager_approved': 'status--success',
            'manager_rejected': 'status--error',
            'approved': 'status--success',
            'rejected': 'status--error'
        };
        return classMap[status] || 'status--info';
    }
}

// Global chart creation function
window.createChart = function(canvasId, config) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    if (canvas.chart) {
        canvas.chart.destroy();
    }
    
    try {
        canvas.chart = new Chart(canvas.getContext('2d'), config);
    } catch (error) {
        console.error('Error creating chart:', error);
    }
};

// Initialize the application
const app = new ExpenseXApp();
