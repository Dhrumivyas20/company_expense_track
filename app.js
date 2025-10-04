// ExpenseX Multi-Role Management System
class ExpenseXApp {
    constructor() {
        this.currentUser = null;
        this.currentInterface = null;
        this.charts = {};
        
        // Initialize data from provided JSON
        this.initializeData();
        
        // Wait for DOM to be loaded before binding events
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindEvents());
        } else {
            this.bindEvents();
        }
    }

    initializeData() {
        // Users data
        this.users = [
            {
                id: 1,
                username: "admin",
                password: "admin123",
                role: "admin",
                full_name: "System Administrator",
                email: "admin@techsolutions.com"
            },
            {
                id: 2,
                username: "john_manager",
                password: "manager123",
                role: "manager",
                company_id: 1,
                full_name: "John Smith",
                email: "john@techsolutions.com",
                department: "Sales",
                title: "Sales Manager",
                team_members: [3, 6, 9, 15, 18, 21, 24, 27, 30],
                monthly_budget: 25000,
                spent_this_month: 17000
            },
            {
                id: 3,
                username: "jane_employee",
                password: "employee123",
                role: "employee",
                company_id: 1,
                full_name: "Jane Doe",
                email: "jane@techsolutions.com",
                department: "Sales",
                manager_id: 2
            }
        ];

        // Admin expenses data (50+ entries)
        this.adminExpenses = [
            {"id": 1, "employee": "John Smith", "department": "Sales", "amount": 456.78, "category": "Travel", "description": "Client meeting in Boston", "date": "2024-10-01", "status": "pending", "receipt": true},
            {"id": 2, "employee": "Sarah Johnson", "department": "Marketing", "amount": 89.50, "category": "Meals", "description": "Team lunch meeting", "date": "2024-10-02", "status": "approved", "receipt": true},
            {"id": 3, "employee": "Mike Davis", "department": "Engineering", "amount": 1299.00, "category": "Software", "description": "Annual IDE license", "date": "2024-10-01", "status": "approved", "receipt": true},
            {"id": 4, "employee": "Lisa Chen", "department": "HR", "amount": 245.30, "category": "Training", "description": "HR certification course", "date": "2024-09-30", "status": "pending", "receipt": false},
            {"id": 5, "employee": "David Wilson", "department": "Finance", "amount": 67.25, "category": "Office Supplies", "description": "Printer ink cartridges", "date": "2024-10-03", "status": "approved", "receipt": true},
            {"id": 6, "employee": "Emily Brown", "department": "Sales", "amount": 234.56, "category": "Travel", "description": "Conference attendance", "date": "2024-10-04", "status": "pending", "receipt": true},
            {"id": 7, "employee": "Robert Taylor", "department": "Marketing", "amount": 156.78, "category": "Marketing", "description": "Trade show booth", "date": "2024-10-05", "status": "approved", "receipt": false},
            {"id": 8, "employee": "Jennifer White", "department": "Engineering", "amount": 89.99, "category": "Software", "description": "Development tools", "date": "2024-10-06", "status": "pending", "receipt": true},
            {"id": 9, "employee": "Michael Green", "department": "HR", "amount": 345.67, "category": "Training", "description": "Leadership workshop", "date": "2024-10-07", "status": "approved", "receipt": true},
            {"id": 10, "employee": "Amanda Black", "department": "Finance", "amount": 123.45, "category": "Office Supplies", "description": "Office furniture", "date": "2024-10-08", "status": "pending", "receipt": false}
        ];

        // Manager team expenses
        this.managerTeamExpenses = [
            {"id": 301, "employee": "Jane Doe", "employee_id": 3, "amount": 456.78, "category": "Travel", "description": "Client meeting in Boston", "date": "2024-10-01", "status": "pending_manager_approval", "receipt": true, "urgent": false},
            {"id": 302, "employee": "David Miller", "employee_id": 6, "amount": 89.50, "category": "Meals", "description": "Client dinner meeting", "date": "2024-10-02", "status": "pending_manager_approval", "receipt": true, "urgent": false},
            {"id": 303, "employee": "Sarah Wilson", "employee_id": 9, "amount": 234.56, "category": "Travel", "description": "Conference travel", "date": "2024-10-03", "status": "pending_manager_approval", "receipt": true, "urgent": true},
            {"id": 304, "employee": "Mark Johnson", "employee_id": 15, "amount": 125.00, "category": "Marketing", "description": "Trade show materials", "date": "2024-10-01", "status": "manager_approved", "receipt": true, "approved_by": "john_manager"},
            {"id": 305, "employee": "Lisa Anderson", "employee_id": 18, "amount": 67.25, "category": "Office Supplies", "description": "Team supplies", "date": "2024-10-02", "status": "manager_approved", "receipt": true, "approved_by": "john_manager"}
        ];

        // Manager team members
        this.managerTeamMembers = [
            {"id": 3, "name": "Jane Doe", "role": "Sales Rep", "expenses_this_month": 2450, "pending_expenses": 1, "last_expense": "2024-10-01"},
            {"id": 6, "name": "David Miller", "role": "Senior Sales Rep", "expenses_this_month": 1890, "pending_expenses": 1, "last_expense": "2024-10-02"},
            {"id": 9, "name": "Sarah Wilson", "role": "Account Executive", "expenses_this_month": 3200, "pending_expenses": 1, "last_expense": "2024-10-03"},
            {"id": 15, "name": "Mark Johnson", "role": "Sales Rep", "expenses_this_month": 1575, "pending_expenses": 0, "last_expense": "2024-10-01"},
            {"id": 18, "name": "Lisa Anderson", "role": "Sales Rep", "expenses_this_month": 890, "pending_expenses": 0, "last_expense": "2024-10-02"}
        ];

        // Employee expenses
        this.employeeExpenses = [
            {"id": 401, "employee": "Jane Doe", "amount": 456.78, "category": "Travel", "description": "Client meeting in Boston", "date": "2024-10-01", "status": "pending_manager_approval", "receipt": true},
            {"id": 402, "employee": "Jane Doe", "amount": 89.50, "category": "Meals", "description": "Business lunch", "date": "2024-10-02", "status": "manager_approved", "receipt": true},
            {"id": 403, "employee": "Jane Doe", "amount": 67.25, "category": "Office Supplies", "description": "Notebooks", "date": "2024-10-03", "status": "pending_manager_approval", "receipt": false}
        ];

        // Chart data
        this.chartData = {
            monthlyTrends: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
                expenses: [25000, 28000, 32000, 29000, 35000, 38000, 33000, 41000, 39000, 42000],
                budget: [30000, 30000, 35000, 35000, 40000, 40000, 35000, 45000, 45000, 45000]
            },
            categories: {
                labels: ["Travel", "Meals", "Office Supplies", "Software", "Marketing", "Training", "Other"],
                data: [35000, 22000, 18000, 15000, 12000, 8000, 5000]
            },
            departments: {
                labels: ["Sales", "Marketing", "Engineering", "HR", "Finance", "Operations"],
                currentMonth: [25000, 18000, 32000, 12000, 8000, 15000],
                previousMonth: [22000, 15000, 28000, 10000, 7000, 13000]
            }
        };
    }

    bindEvents() {
        console.log('Binding events...');
        
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(e);
                return false;
            });
        }

        // Navigation links
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-link')) {
                e.preventDefault();
                const link = e.target.closest('.nav-link');
                const page = link.dataset.page;
                if (page) {
                    this.showPage(page);
                    this.setActiveNav(link);
                }
            }
        });

        // Profile dropdown functionality
        document.addEventListener('click', (e) => {
            if (e.target.closest('.dropdown-btn')) {
                e.preventDefault();
                this.toggleProfileDropdown();
            }
            
            // Close dropdown when clicking outside
            if (!e.target.closest('.user-dropdown')) {
                this.closeProfileDropdown();
            }
        });

        // Modal close
        document.addEventListener('click', (e) => {
            if (e.target.closest('.modal-overlay') || e.target.closest('.modal-close')) {
                this.closeModal();
            }
        });

        console.log('All events bound successfully');
    }

    // Demo credentials function
    fillDemoCredentials(username, password) {
        console.log('Filling demo credentials:', { username });
        
        const usernameInput = document.getElementById('login-username');
        const passwordInput = document.getElementById('login-password');
        
        if (usernameInput) usernameInput.value = username;
        if (passwordInput) passwordInput.value = password;
        
        this.hideLoginError();
    }

    // Login and Authentication
    handleLogin(e) {
        console.log('Login form submitted');
        
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        this.hideLoginError();
        
        if (!username || !password) {
            this.showLoginError('Please enter both username and password');
            return false;
        }
        
        const user = this.users.find(u => u.username === username && u.password === password);
        
        if (user) {
            console.log('Login successful for user:', user.role);
            this.currentUser = user;
            this.showInterface(user.role);
        } else {
            console.log('Login failed - invalid credentials');
            this.showLoginError('Invalid username or password');
        }
        
        return false;
    }

    showLoginError(message) {
        const errorDiv = document.getElementById('login-error');
        const errorMessage = document.getElementById('error-message');
        if (errorDiv && errorMessage) {
            errorMessage.textContent = message;
            errorDiv.classList.remove('hidden');
        }
    }

    hideLoginError() {
        const errorDiv = document.getElementById('login-error');
        if (errorDiv) {
            errorDiv.classList.add('hidden');
        }
    }

    // Profile Dropdown Functions
    toggleProfileDropdown() {
        const dropdown = document.querySelector('.dropdown-menu');
        if (dropdown) {
            const isVisible = dropdown.style.display === 'block';
            dropdown.style.display = isVisible ? 'none' : 'block';
        }
    }

    closeProfileDropdown() {
        const dropdown = document.querySelector('.dropdown-menu');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    }

    // Interface Management
    showInterface(role) {
        // Hide login page
        const loginPage = document.getElementById('login-page');
        if (loginPage) loginPage.classList.remove('active');
        
        // Hide all interfaces
        document.querySelectorAll('.admin-interface, .manager-interface, .employee-interface').forEach(iface => {
            iface.classList.remove('active');
        });
        
        // Show appropriate interface
        const interfaceId = `${role}-interface`;
        const targetInterface = document.getElementById(interfaceId);
        if (targetInterface) {
            targetInterface.classList.add('active');
            this.currentInterface = role;
            
            // Load default page for each role
            switch (role) {
                case 'admin':
                    this.showPage('admin-dashboard');
                    break;
                case 'manager':
                    this.showPage('manager-dashboard');
                    break;
                case 'employee':
                    this.showPage('employee-dashboard');
                    break;
            }
        }
    }

    showPage(pageId) {
        console.log('Showing page:', pageId);
        
        const [role, page] = pageId.split('-');
        const contentDiv = document.getElementById(`${role}-content`);
        
        if (!contentDiv) return;
        
        // Update active navigation
        const navLinks = document.querySelectorAll(`#${role}-interface .nav-link`);
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) activeLink.classList.add('active');
        
        // Generate page content
        let content = '';
        
        switch (pageId) {
            case 'admin-dashboard':
                content = this.generateAdminDashboard();
                break;
            case 'admin-expenses':
                content = this.generateAdminExpenses();
                break;
            case 'admin-budget':
                content = this.generateAdminBudget();
                break;
            case 'admin-analytics':
                content = this.generateAdminAnalytics();
                break;
            case 'admin-reports':
                content = this.generateAdminReports();
                break;
            case 'admin-users':
                content = this.generateAdminUsers();
                break;
            case 'admin-integration':
                content = this.generateAdminIntegration();
                break;
            case 'admin-notifications':
                content = this.generateAdminNotifications();
                break;
            case 'manager-dashboard':
                content = this.generateManagerDashboard();
                break;
            case 'manager-team-expenses':
                content = this.generateManagerTeamExpenses();
                break;
            case 'manager-approvals':
                content = this.generateManagerApprovals();
                break;
            case 'manager-team-budget':
                content = this.generateManagerTeamBudget();
                break;
            case 'manager-team-reports':
                content = this.generateManagerTeamReports();
                break;
            case 'manager-team-members':
                content = this.generateManagerTeamMembers();
                break;
            case 'manager-notifications':
                content = this.generateManagerNotifications();
                break;
            case 'employee-dashboard':
                content = this.generateEmployeeDashboard();
                break;
            case 'employee-submit-expense':
                content = this.generateEmployeeSubmitExpense();
                break;
            case 'employee-my-expenses':
                content = this.generateEmployeeMyExpenses();
                break;
            default:
                content = '<div class="page-container"><h1>Page not found</h1></div>';
        }
        
        contentDiv.innerHTML = content;
        
        // Initialize page-specific functionality
        this.initializePageFunctionality(pageId);
    }

    setActiveNav(clickedLink) {
        // Remove active class from all nav links in current interface
        const currentNav = clickedLink.closest('nav');
        if (currentNav) {
            currentNav.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            clickedLink.classList.add('active');
        }
    }

    // Admin Pages Generation
    generateAdminDashboard() {
        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>System Administrator Dashboard</h1>
                    <p>Complete overview of company expense management</p>
                </div>
                
                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-icon">💰</div>
                        <div class="stat-content">
                            <div class="stat-value">$125,847</div>
                            <div class="stat-label">Total Expenses</div>
                            <div class="stat-change positive">+12.5%</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">👥</div>
                        <div class="stat-content">
                            <div class="stat-value">247</div>
                            <div class="stat-label">Active Users</div>
                            <div class="stat-change positive">+5.2%</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⏳</div>
                        <div class="stat-content">
                            <div class="stat-value">23</div>
                            <div class="stat-label">Pending Approvals</div>
                            <div class="stat-change negative">-8.1%</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-content">
                            <div class="stat-value">89.5%</div>
                            <div class="stat-label">Budget Utilization</div>
                            <div class="stat-change positive">+3.2%</div>
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-charts">
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3>Monthly Expense Trends</h3>
                            <select class="chart-filter">
                                <option>Last 6 Months</option>
                                <option>Last Year</option>
                                <option>YTD</option>
                            </select>
                        </div>
                        <div style="position: relative; height: 300px;">
                            <canvas id="adminMonthlyTrendsChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3>Category Breakdown</h3>
                        </div>
                        <div style="position: relative; height: 300px;">
                            <canvas id="adminCategoryChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3>Department Spending</h3>
                        </div>
                        <div style="position: relative; height: 300px;">
                            <canvas id="adminDepartmentChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3>Approval Status</h3>
                        </div>
                        <div style="position: relative; height: 300px;">
                            <canvas id="adminApprovalChart"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="table-container">
                    <div class="table-header">
                        <h3>Recent Expenses</h3>
                        <a href="#" class="view-all-link">View All</a>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.adminExpenses.slice(0, 10).map(expense => `
                                <tr>
                                    <td>${expense.employee}</td>
                                    <td>${this.formatCurrency(expense.amount)}</td>
                                    <td>${expense.category}</td>
                                    <td>${this.formatDate(expense.date)}</td>
                                    <td><span class="status-badge ${expense.status}">${this.capitalizeFirst(expense.status)}</span></td>
                                    <td>
                                        <button class="action-btn primary" onclick="app.viewExpense(${expense.id})">View</button>
                                        <button class="action-btn" onclick="app.editExpense(${expense.id})">Edit</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    generateAdminExpenses() {
        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>Expense Management</h1>
                    <p>View and manage all company expenses</p>
                </div>
                
                <div class="table-container">
                    <div class="table-header">
                        <h3>All Company Expenses</h3>
                        <button class="btn btn--primary">Export Report</button>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Employee</th>
                                <th>Department</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Receipt</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.adminExpenses.map(expense => `
                                <tr>
                                    <td>#${expense.id}</td>
                                    <td>${expense.employee}</td>
                                    <td>${expense.department}</td>
                                    <td>${this.formatCurrency(expense.amount)}</td>
                                    <td>${expense.category}</td>
                                    <td>${expense.description}</td>
                                    <td>${this.formatDate(expense.date)}</td>
                                    <td><span class="status-badge ${expense.status}">${this.capitalizeFirst(expense.status)}</span></td>
                                    <td>${expense.receipt ? '✅' : '❌'}</td>
                                    <td>
                                        <button class="action-btn primary" onclick="app.viewExpense(${expense.id})">View</button>
                                        <button class="action-btn" onclick="app.editExpense(${expense.id})">Edit</button>
                                        <button class="action-btn success" onclick="app.approveExpense(${expense.id})">Approve</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    generateAdminBudget() {
        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>Budget Management</h1>
                    <p>Monitor and control company budgets by department and category</p>
                </div>
                
                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-icon">💼</div>
                        <div class="stat-content">
                            <div class="stat-value">$450,000</div>
                            <div class="stat-label">Annual Budget</div>
                            <div class="stat-change positive">+8.3%</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">💸</div>
                        <div class="stat-content">
                            <div class="stat-value">$125,847</div>
                            <div class="stat-label">YTD Spent</div>
                            <div class="stat-change positive">+12.5%</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-content">
                            <div class="stat-value">28%</div>
                            <div class="stat-label">Budget Used</div>
                            <div class="stat-change positive">On Track</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⚠️</div>
                        <div class="stat-content">
                            <div class="stat-value">3</div>
                            <div class="stat-label">Budget Alerts</div>
                            <div class="stat-change negative">Needs Attention</div>
                        </div>
                    </div>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>Department Budget Overview</h3>
                        <button class="btn btn--primary">Add Budget</button>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Department</th>
                                <th>Annual Budget</th>
                                <th>Spent YTD</th>
                                <th>Remaining</th>
                                <th>Utilization %</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sales</td>
                                <td>$120,000</td>
                                <td>$45,230</td>
                                <td>$74,770</td>
                                <td>38%</td>
                                <td><span class="status-badge approved">On Track</span></td>
                                <td><button class="action-btn">Manage</button></td>
                            </tr>
                            <tr>
                                <td>Marketing</td>
                                <td>$80,000</td>
                                <td>$35,680</td>
                                <td>$44,320</td>
                                <td>45%</td>
                                <td><span class="status-badge pending">Monitoring</span></td>
                                <td><button class="action-btn">Manage</button></td>
                            </tr>
                            <tr>
                                <td>Engineering</td>
                                <td>$150,000</td>
                                <td>$32,100</td>
                                <td>$117,900</td>
                                <td>21%</td>
                                <td><span class="status-badge approved">Under Budget</span></td>
                                <td><button class="action-btn">Manage</button></td>
                            </tr>
                            <tr>
                                <td>HR</td>
                                <td>$50,000</td>
                                <td>$12,837</td>
                                <td>$37,163</td>
                                <td>26%</td>
                                <td><span class="status-badge approved">On Track</span></td>
                                <td><button class="action-btn">Manage</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    generateAdminAnalytics() {
        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>Advanced Analytics</h1>
                    <p>Detailed insights and expense analytics</p>
                </div>
                
                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-content">
                            <div class="stat-value">15.2%</div>
                            <div class="stat-label">Cost Savings Potential</div>
                            <div class="stat-change positive">+2.1%</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🎯</div>
                        <div class="stat-content">
                            <div class="stat-value">92%</div>
                            <div class="stat-label">Policy Compliance</div>
                            <div class="stat-change positive">+5%</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⏱️</div>
                        <div class="stat-content">
                            <div class="stat-value">2.3 days</div>
                            <div class="stat-label">Avg Approval Time</div>
                            <div class="stat-change positive">-0.5 days</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">💡</div>
                        <div class="stat-content">
                            <div class="stat-value">8</div>
                            <div class="stat-label">Optimization Opportunities</div>
                            <div class="stat-change positive">New Insights</div>
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-charts">
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3>Quarterly Expense Trends</h3>
                            <select class="chart-filter">
                                <option>Current Year</option>
                                <option>Last Year</option>
                                <option>2 Year Comparison</option>
                            </select>
                        </div>
                        <div style="position: relative; height: 300px;">
                            <canvas id="analyticsQuarterChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3>Cost Savings Analysis</h3>
                        </div>
                        <div style="position: relative; height: 300px;">
                            <canvas id="analyticsSavingsChart"></canvas>
                        </div>
                    </div>

                    <div class="chart-container">
                        <div class="chart-header">
                            <h3>Compliance Metrics</h3>
                        </div>
                        <div style="position: relative; height: 300px;">
                            <canvas id="analyticsComplianceChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3>Expense Patterns by Day of Week</h3>
                        </div>
                        <div style="position: relative; height: 300px;">
                            <canvas id="analyticsDayChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>Top Expense Categories Analysis</h3>
                        <button class="btn btn--primary">Generate Detailed Report</button>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Total Amount</th>
                                <th>Count</th>
                                <th>Average</th>
                                <th>Trend</th>
                                <th>Compliance Rate</th>
                                <th>Recommendations</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Travel</td>
                                <td>$45,230</td>
                                <td>89</td>
                                <td>$508</td>
                                <td><span class="stat-change positive">+15%</span></td>
                                <td><span class="status-badge approved">95%</span></td>
                                <td>Consider travel policy review</td>
                            </tr>
                            <tr>
                                <td>Software</td>
                                <td>$32,100</td>
                                <td>24</td>
                                <td>$1,338</td>
                                <td><span class="stat-change positive">+8%</span></td>
                                <td><span class="status-badge pending">88%</span></td>
                                <td>Consolidate subscriptions</td>
                            </tr>
                            <tr>
                                <td>Meals</td>
                                <td>$22,450</td>
                                <td>156</td>
                                <td>$144</td>
                                <td><span class="stat-change positive">+12%</span></td>
                                <td><span class="status-badge approved">97%</span></td>
                                <td>Within policy limits</td>
                            </tr>
                            <tr>
                                <td>Office Supplies</td>
                                <td>$18,670</td>
                                <td>234</td>
                                <td>$80</td>
                                <td><span class="stat-change negative">-5%</span></td>
                                <td><span class="status-badge approved">99%</span></td>
                                <td>Bulk purchasing opportunities</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>Cost Optimization Recommendations</h3>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Opportunity</th>
                                <th>Potential Savings</th>
                                <th>Impact</th>
                                <th>Effort</th>
                                <th>Priority</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Negotiate corporate travel rates</td>
                                <td>$8,500/year</td>
                                <td><span class="stat-change positive">High</span></td>
                                <td><span class="status-badge pending">Medium</span></td>
                                <td><span class="status-badge approved">High</span></td>
                                <td><span class="status-badge pending">In Progress</span></td>
                            </tr>
                            <tr>
                                <td>Software license consolidation</td>
                                <td>$12,000/year</td>
                                <td><span class="stat-change positive">High</span></td>
                                <td><span class="status-badge approved">Low</span></td>
                                <td><span class="status-badge approved">High</span></td>
                                <td><span class="status-badge pending">Identified</span></td>
                            </tr>
                            <tr>
                                <td>Implement meal policy caps</td>
                                <td>$3,200/year</td>
                                <td><span class="stat-change pending">Medium</span></td>
                                <td><span class="status-badge approved">Low</span></td>
                                <td><span class="status-badge pending">Medium</span></td>
                                <td><span class="status-badge approved">Implemented</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    generateAdminReports() {
        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>Reports Center</h1>
                    <p>Generate and manage expense reports</p>
                </div>

                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-icon">📋</div>
                        <div class="stat-content">
                            <div class="stat-value">156</div>
                            <div class="stat-label">Reports Generated</div>
                            <div class="stat-change positive">+23%</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-content">
                            <div class="stat-value">12</div>
                            <div class="stat-label">Report Templates</div>
                            <div class="stat-change positive">+2 New</div>
                        </div>
                    </div>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>Report Templates</h3>
                        <button class="btn btn--primary">Create Template</button>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Template Name</th>
                                <th>Category</th>
                                <th>Last Used</th>
                                <th>Usage Count</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Monthly Expense Summary</td>
                                <td>Financial</td>
                                <td>Oct 3, 2024</td>
                                <td>45</td>
                                <td>
                                    <button class="action-btn primary">Generate</button>
                                    <button class="action-btn">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Department Budget Analysis</td>
                                <td>Budget</td>
                                <td>Oct 1, 2024</td>
                                <td>23</td>
                                <td>
                                    <button class="action-btn primary">Generate</button>
                                    <button class="action-btn">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>Recent Reports</h3>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Report Name</th>
                                <th>Generated By</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>October Expense Report</td>
                                <td>System Administrator</td>
                                <td>Oct 3, 2024</td>
                                <td><span class="status-badge approved">Complete</span></td>
                                <td>
                                    <button class="action-btn primary">Download</button>
                                    <button class="action-btn">View</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    generateAdminUsers() {
        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>User Management</h1>
                    <p>Manage system users and permissions</p>
                </div>

                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-icon">👥</div>
                        <div class="stat-content">
                            <div class="stat-value">247</div>
                            <div class="stat-label">Total Users</div>
                            <div class="stat-change positive">+12</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🔐</div>
                        <div class="stat-content">
                            <div class="stat-value">8</div>
                            <div class="stat-label">Administrators</div>
                            <div class="stat-change positive">Active</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">👔</div>
                        <div class="stat-content">
                            <div class="stat-value">15</div>
                            <div class="stat-label">Managers</div>
                            <div class="stat-change positive">+2</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">👤</div>
                        <div class="stat-content">
                            <div class="stat-value">224</div>
                            <div class="stat-label">Employees</div>
                            <div class="stat-change positive">+10</div>
                        </div>
                    </div>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>System Users</h3>
                        <button class="btn btn--primary">Add User</button>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Department</th>
                                <th>Last Login</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>John Smith</td>
                                <td>john@techsolutions.com</td>
                                <td>Manager</td>
                                <td>Sales</td>
                                <td>Oct 3, 2024</td>
                                <td><span class="status-badge approved">Active</span></td>
                                <td>
                                    <button class="action-btn">Edit</button>
                                    <button class="action-btn danger">Deactivate</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Jane Doe</td>
                                <td>jane@techsolutions.com</td>
                                <td>Employee</td>
                                <td>Sales</td>
                                <td>Oct 3, 2024</td>
                                <td><span class="status-badge approved">Active</span></td>
                                <td>
                                    <button class="action-btn">Edit</button>
                                    <button class="action-btn danger">Deactivate</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    generateAdminIntegration() {
        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>Integration Management</h1>
                    <p>Configure and monitor third-party integrations</p>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>Available Integrations</h3>
                        <button class="btn btn--primary">Add Integration</button>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Last Sync</th>
                                <th>Records Synced</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>💳 Corporate Credit Cards</td>
                                <td>Financial</td>
                                <td><span class="status-badge approved">Connected</span></td>
                                <td>Oct 3, 2024 2:30 PM</td>
                                <td>1,245</td>
                                <td>
                                    <button class="action-btn">Configure</button>
                                    <button class="action-btn primary">Sync Now</button>
                                </td>
                            </tr>
                            <tr>
                                <td>📊 Accounting Software</td>
                                <td>Financial</td>
                                <td><span class="status-badge approved">Connected</span></td>
                                <td>Oct 3, 2024 1:15 PM</td>
                                <td>892</td>
                                <td>
                                    <button class="action-btn">Configure</button>
                                    <button class="action-btn primary">Sync Now</button>
                                </td>
                            </tr>
                            <tr>
                                <td>📧 Email Notifications</td>
                                <td>Communication</td>
                                <td><span class="status-badge pending">Pending</span></td>
                                <td>-</td>
                                <td>0</td>
                                <td>
                                    <button class="action-btn primary">Setup</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    generateAdminNotifications() {
        const notifications = [
            { id: 1, type: 'expense', message: 'New expense submitted by Jane Doe', time: '2 hours ago', read: false },
            { id: 2, type: 'budget', message: 'Marketing department approaching budget limit', time: '4 hours ago', read: false },
            { id: 3, type: 'approval', message: '5 expenses awaiting final approval', time: '1 day ago', read: true },
            { id: 4, type: 'system', message: 'Monthly expense report generated', time: '2 days ago', read: true },
            { id: 5, type: 'user', message: 'New user registration: Mike Johnson', time: '3 days ago', read: true }
        ];

        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>Notifications Center</h1>
                    <p>Stay updated with system alerts and notifications</p>
                </div>

                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-icon">🔔</div>
                        <div class="stat-content">
                            <div class="stat-value">${notifications.filter(n => !n.read).length}</div>
                            <div class="stat-label">Unread Notifications</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📬</div>
                        <div class="stat-content">
                            <div class="stat-value">${notifications.length}</div>
                            <div class="stat-label">Total Notifications</div>
                        </div>
                    </div>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>Recent Notifications</h3>
                        <button class="btn btn--primary" onclick="app.markAllAsRead()">Mark All Read</button>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Message</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${notifications.map(notif => `
                                <tr ${!notif.read ? 'style="background: rgba(var(--color-primary-rgb), 0.05);"' : ''}>
                                    <td>
                                        ${notif.type === 'expense' ? '💳' : notif.type === 'budget' ? '📊' : notif.type === 'approval' ? '✅' : notif.type === 'system' ? '⚙️' : '👤'}
                                        ${this.capitalizeFirst(notif.type)}
                                    </td>
                                    <td>${notif.message}</td>
                                    <td>${notif.time}</td>
                                    <td>
                                        <span class="status-badge ${notif.read ? 'approved' : 'pending'}">
                                            ${notif.read ? 'Read' : 'Unread'}
                                        </span>
                                    </td>
                                    <td>
                                        ${!notif.read ? `<button class="action-btn primary" onclick="app.markAsRead(${notif.id})">Mark Read</button>` : ''}
                                        <button class="action-btn">View</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // Manager Pages Generation
    generateManagerDashboard() {
        const teamStats = {
            teamExpenses: 17000,
            pendingApprovals: 3,
            teamSize: 5,
            budgetUtilization: 68
        };

        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>Manager Dashboard</h1>
                    <p>Team overview and management</p>
                </div>
                
                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-icon">💰</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.formatCurrency(teamStats.teamExpenses)}</div>
                            <div class="stat-label">Team Expenses</div>
                            <div class="stat-change positive">+8.2%</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⏳</div>
                        <div class="stat-content">
                            <div class="stat-value">${teamStats.pendingApprovals}</div>
                            <div class="stat-label">Pending Approvals</div>
                            <div class="stat-change negative">Needs Action</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">👥</div>
                        <div class="stat-content">
                            <div class="stat-value">${teamStats.teamSize}</div>
                            <div class="stat-label">Team Members</div>
                            <div class="stat-change positive">Active</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-content">
                            <div class="stat-value">${teamStats.budgetUtilization}%</div>
                            <div class="stat-label">Budget Used</div>
                            <div class="stat-change positive">On Track</div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-charts">
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3>Team Expense Trends</h3>
                        </div>
                        <div style="position: relative; height: 300px;">
                            <canvas id="managerTeamTrendsChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3>Team Category Breakdown</h3>
                        </div>
                        <div style="position: relative; height: 300px;">
                            <canvas id="managerCategoryChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>Team Activity</h3>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Team Member</th>
                                <th>Recent Activity</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Action Required</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.managerTeamExpenses.filter(e => e.status === 'pending_manager_approval').slice(0, 5).map(expense => `
                                <tr>
                                    <td>${expense.employee}</td>
                                    <td>Submitted expense: ${expense.description}</td>
                                    <td>${this.formatCurrency(expense.amount)}</td>
                                    <td><span class="status-badge pending">Pending Approval</span></td>
                                    <td><button class="action-btn primary" onclick="app.showPage('manager-approvals')">Review</button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    generateManagerTeamExpenses() {
        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>Team Expenses</h1>
                    <p>View all expenses from your team members</p>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>All Team Expenses</h3>
                        <button class="btn btn--primary">Export Report</button>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Receipt</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.managerTeamExpenses.map(expense => `
                                <tr>
                                    <td>${expense.employee}</td>
                                    <td>${this.formatCurrency(expense.amount)}</td>
                                    <td>${expense.category}</td>
                                    <td>${expense.description}</td>
                                    <td>${this.formatDate(expense.date)}</td>
                                    <td><span class="status-badge ${expense.status}">${this.formatStatus(expense.status)}</span></td>
                                    <td>${expense.receipt ? '✅' : '❌'}</td>
                                    <td>
                                        <button class="action-btn primary" onclick="app.viewExpenseDetails(${expense.id})">View</button>
                                        ${expense.status === 'pending_manager_approval' ? 
                                            `<button class="action-btn success" onclick="app.showApprovalModal(${expense.id})">Approve</button>` : 
                                            ''
                                        }
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    generateManagerApprovals() {
        const pendingExpenses = this.managerTeamExpenses.filter(e => e.status === 'pending_manager_approval');
        
        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>Pending Approvals</h1>
                    <p>Review and approve team expense submissions</p>
                </div>

                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-icon">⏳</div>
                        <div class="stat-content">
                            <div class="stat-value">${pendingExpenses.length}</div>
                            <div class="stat-label">Pending Approvals</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">💰</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.formatCurrency(pendingExpenses.reduce((sum, e) => sum + e.amount, 0))}</div>
                            <div class="stat-label">Total Amount</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🚨</div>
                        <div class="stat-content">
                            <div class="stat-value">${pendingExpenses.filter(e => e.urgent).length}</div>
                            <div class="stat-label">Urgent Items</div>
                        </div>
                    </div>
                </div>

                <div class="approval-cards">
                    ${pendingExpenses.map(expense => `
                        <div class="approval-card ${expense.urgent ? 'urgent' : ''}">
                            <div class="approval-header">
                                <div class="employee-info">
                                    <div class="employee-avatar">${expense.employee.charAt(0)}</div>
                                    <div>
                                        <div class="employee-name">${expense.employee}</div>
                                        <div class="detail-label">Sales Team Member</div>
                                    </div>
                                </div>
                                ${expense.urgent ? '<span class="status-badge urgent">URGENT</span>' : ''}
                            </div>
                            
                            <div class="approval-details">
                                <div class="detail-item">
                                    <div class="detail-label">Amount</div>
                                    <div class="detail-value">${this.formatCurrency(expense.amount)}</div>
                                </div>
                                <div class="detail-item">
                                    <div class="detail-label">Category</div>
                                    <div class="detail-value">${expense.category}</div>
                                </div>
                                <div class="detail-item">
                                    <div class="detail-label">Date</div>
                                    <div class="detail-value">${this.formatDate(expense.date)}</div>
                                </div>
                                <div class="detail-item">
                                    <div class="detail-label">Receipt</div>
                                    <div class="detail-value">${expense.receipt ? '✅ Attached' : '❌ Missing'}</div>
                                </div>
                            </div>
                            
                            <div class="detail-item">
                                <div class="detail-label">Description</div>
                                <div class="detail-value">${expense.description}</div>
                            </div>
                            
                            <div class="approval-actions">
                                <button class="btn btn--secondary" onclick="app.rejectExpense(${expense.id})">❌ Reject</button>
                                <button class="btn btn--primary" onclick="app.approveExpense(${expense.id})">✅ Approve</button>
                            </div>
                        </div>
                    `).join('')}
                </div>

                ${pendingExpenses.length === 0 ? `
                    <div class="table-container">
                        <div class="table-header">
                            <h3>No Pending Approvals</h3>
                        </div>
                        <div style="padding: 40px; text-align: center; color: var(--color-text-secondary);">
                            <h3>✅ All caught up!</h3>
                            <p>There are no expenses pending your approval at this time.</p>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    generateManagerTeamBudget() {
        const manager = this.users.find(u => u.role === 'manager');
        const budgetUsed = (manager.spent_this_month / manager.monthly_budget) * 100;
        
        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>Team Budget</h1>
                    <p>Monitor team budget utilization and spending patterns</p>
                </div>

                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-icon">💼</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.formatCurrency(manager.monthly_budget)}</div>
                            <div class="stat-label">Monthly Budget</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">💸</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.formatCurrency(manager.spent_this_month)}</div>
                            <div class="stat-label">Spent This Month</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">💰</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.formatCurrency(manager.monthly_budget - manager.spent_this_month)}</div>
                            <div class="stat-label">Remaining Budget</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-content">
                            <div class="stat-value">${budgetUsed.toFixed(1)}%</div>
                            <div class="stat-label">Budget Utilization</div>
                            <div class="stat-change ${budgetUsed > 80 ? 'negative' : 'positive'}">${budgetUsed > 80 ? 'High Usage' : 'On Track'}</div>
                        </div>
                    </div>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>Team Member Budget Breakdown</h3>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Team Member</th>
                                <th>Monthly Spent</th>
                                <th>Average per Expense</th>
                                <th>Expense Count</th>
                                <th>Trend</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.managerTeamMembers.map(member => `
                                <tr>
                                    <td>${member.name}</td>
                                    <td>${this.formatCurrency(member.expenses_this_month)}</td>
                                    <td>${this.formatCurrency(member.expenses_this_month / Math.max(1, member.pending_expenses + 5))}</td>
                                    <td>${member.pending_expenses + 5}</td>
                                    <td><span class="stat-change positive">+12%</span></td>
                                    <td><span class="status-badge approved">Normal</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    generateManagerTeamReports() {
        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>Team Reports</h1>
                    <p>Generate and manage team-specific expense reports</p>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>Team Report Templates</h3>
                        <button class="btn btn--primary">Create Report</button>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Template Name</th>
                                <th>Type</th>
                                <th>Last Generated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Team Monthly Summary</td>
                                <td>Monthly</td>
                                <td>Oct 1, 2024</td>
                                <td>
                                    <button class="action-btn primary">Generate</button>
                                    <button class="action-btn">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Individual Performance Analysis</td>
                                <td>Performance</td>
                                <td>Sep 28, 2024</td>
                                <td>
                                    <button class="action-btn primary">Generate</button>
                                    <button class="action-btn">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Budget Utilization Report</td>
                                <td>Budget</td>
                                <td>Oct 2, 2024</td>
                                <td>
                                    <button class="action-btn primary">Generate</button>
                                    <button class="action-btn">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>Recent Team Reports</h3>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Report Name</th>
                                <th>Generated Date</th>
                                <th>Period</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sales Team - October Report</td>
                                <td>Oct 3, 2024</td>
                                <td>Oct 1-31, 2024</td>
                                <td><span class="status-badge approved">Ready</span></td>
                                <td>
                                    <button class="action-btn primary">Download</button>
                                    <button class="action-btn">Share</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Q3 Team Performance</td>
                                <td>Sep 30, 2024</td>
                                <td>Jul-Sep 2024</td>
                                <td><span class="status-badge approved">Ready</span></td>
                                <td>
                                    <button class="action-btn primary">Download</button>
                                    <button class="action-btn">Share</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    generateManagerTeamMembers() {
        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>Team Members</h1>
                    <p>Manage your team and monitor individual performance</p>
                </div>

                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-icon">👥</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.managerTeamMembers.length}</div>
                            <div class="stat-label">Team Members</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.formatCurrency(this.managerTeamMembers.reduce((sum, m) => sum + m.expenses_this_month, 0))}</div>
                            <div class="stat-label">Total Team Spending</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⏳</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.managerTeamMembers.reduce((sum, m) => sum + m.pending_expenses, 0)}</div>
                            <div class="stat-label">Pending Items</div>
                        </div>
                    </div>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>Team Directory</h3>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Monthly Expenses</th>
                                <th>Pending Expenses</th>
                                <th>Last Activity</th>
                                <th>Performance</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.managerTeamMembers.map(member => `
                                <tr>
                                    <td>
                                        <div class="employee-info">
                                            <div class="employee-avatar" style="width: 32px; height: 32px; font-size: 12px;">${member.name.charAt(0)}</div>
                                            <span style="margin-left: 8px;">${member.name}</span>
                                        </div>
                                    </td>
                                    <td>${member.role}</td>
                                    <td>${this.formatCurrency(member.expenses_this_month)}</td>
                                    <td>
                                        ${member.pending_expenses > 0 ? 
                                            `<span class="status-badge pending">${member.pending_expenses}</span>` : 
                                            '<span class="status-badge approved">0</span>'
                                        }
                                    </td>
                                    <td>${this.formatDate(member.last_expense)}</td>
                                    <td><span class="status-badge approved">Good</span></td>
                                    <td>
                                        <button class="action-btn primary" onclick="app.viewMemberDetails(${member.id})">View</button>
                                        <button class="action-btn">Message</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    generateManagerNotifications() {
        const managerNotifications = [
            { id: 1, type: 'approval', message: 'Jane Doe submitted new travel expense', time: '1 hour ago', read: false },
            { id: 2, type: 'budget', message: 'Team approaching 70% of monthly budget', time: '2 hours ago', read: false },
            { id: 3, type: 'approval', message: 'Sarah Wilson submitted urgent expense', time: '4 hours ago', read: false },
            { id: 4, type: 'team', message: 'David Miller uploaded receipt for previous expense', time: '1 day ago', read: true },
            { id: 5, type: 'system', message: 'Weekly team report is ready for review', time: '2 days ago', read: true }
        ];

        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>Manager Notifications</h1>
                    <p>Stay updated with team activities and approval requests</p>
                </div>

                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-icon">🔔</div>
                        <div class="stat-content">
                            <div class="stat-value">${managerNotifications.filter(n => !n.read).length}</div>
                            <div class="stat-label">Unread Notifications</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⏳</div>
                        <div class="stat-content">
                            <div class="stat-value">${managerNotifications.filter(n => n.type === 'approval').length}</div>
                            <div class="stat-label">Approval Requests</div>
                        </div>
                    </div>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>Recent Notifications</h3>
                        <button class="btn btn--primary" onclick="app.markAllAsRead()">Mark All Read</button>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Message</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${managerNotifications.map(notif => `
                                <tr ${!notif.read ? 'style="background: rgba(16, 185, 129, 0.05);"' : ''}>
                                    <td>
                                        ${notif.type === 'approval' ? '✅' : notif.type === 'budget' ? '📊' : notif.type === 'team' ? '👥' : '⚙️'}
                                        ${this.capitalizeFirst(notif.type)}
                                    </td>
                                    <td>${notif.message}</td>
                                    <td>${notif.time}</td>
                                    <td>
                                        <span class="status-badge ${notif.read ? 'approved' : 'pending'}">
                                            ${notif.read ? 'Read' : 'Unread'}
                                        </span>
                                    </td>
                                    <td>
                                        ${!notif.read ? `<button class="action-btn primary" onclick="app.markAsRead(${notif.id})">Mark Read</button>` : ''}
                                        <button class="action-btn">View</button>
                                        ${notif.type === 'approval' ? '<button class="action-btn success">Review</button>' : ''}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // Employee Pages Generation
    generateEmployeeDashboard() {
        const employeeStats = {
            monthlyExpenses: 613.53,
            pendingExpenses: 2,
            approvedExpenses: 1,
            reimbursementDue: 89.50
        };

        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>Employee Dashboard</h1>
                    <p>Track your expenses and reimbursements</p>
                </div>
                
                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-icon">💰</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.formatCurrency(employeeStats.monthlyExpenses)}</div>
                            <div class="stat-label">This Month's Expenses</div>
                            <div class="stat-change positive">+15.2%</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⏳</div>
                        <div class="stat-content">
                            <div class="stat-value">${employeeStats.pendingExpenses}</div>
                            <div class="stat-label">Pending Approval</div>
                            <div class="stat-change negative">Awaiting Review</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">✅</div>
                        <div class="stat-content">
                            <div class="stat-value">${employeeStats.approvedExpenses}</div>
                            <div class="stat-label">Approved Expenses</div>
                            <div class="stat-change positive">Ready for Reimbursement</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">💸</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.formatCurrency(employeeStats.reimbursementDue)}</div>
                            <div class="stat-label">Reimbursement Due</div>
                            <div class="stat-change positive">Processing</div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-charts">
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3>My Expense Categories</h3>
                        </div>
                        <div style="position: relative; height: 300px;">
                            <canvas id="employeeCategoryChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>Recent Expenses</h3>
                        <button class="btn btn--primary" onclick="app.showPage('employee-submit-expense')">Submit New Expense</button>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.employeeExpenses.map(expense => `
                                <tr>
                                    <td>${expense.description}</td>
                                    <td>${this.formatCurrency(expense.amount)}</td>
                                    <td>${expense.category}</td>
                                    <td>${this.formatDate(expense.date)}</td>
                                    <td><span class="status-badge ${expense.status}">${this.formatStatus(expense.status)}</span></td>
                                    <td>
                                        <button class="action-btn primary" onclick="app.viewExpenseDetails(${expense.id})">View</button>
                                        ${expense.status === 'pending_manager_approval' ? 
                                            '<button class="action-btn">Edit</button>' : 
                                            ''
                                        }
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    generateEmployeeSubmitExpense() {
        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>Submit New Expense</h1>
                    <p>Submit your business expenses for approval</p>
                </div>

                <div class="card">
                    <div class="card__body">
                        <form class="expense-form" id="expense-submit-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label">Expense Amount *</label>
                                    <input type="number" step="0.01" class="form-control" id="expense-amount" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Category *</label>
                                    <select class="form-control" id="expense-category" required>
                                        <option value="">Select Category</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Meals">Meals & Entertainment</option>
                                        <option value="Office Supplies">Office Supplies</option>
                                        <option value="Software">Software & Subscriptions</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Training">Training & Education</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label">Date *</label>
                                    <input type="date" class="form-control" id="expense-date" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Receipt</label>
                                    <input type="file" class="form-control" id="expense-receipt" accept="image/*,.pdf">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Description *</label>
                                <textarea class="form-control" id="expense-description" placeholder="Please provide details about this expense..." required></textarea>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Business Purpose *</label>
                                <textarea class="form-control" id="expense-purpose" placeholder="Explain the business purpose of this expense..." required></textarea>
                            </div>

                            <div style="display: flex; gap: 12px; justify-content: flex-end;">
                                <button type="button" class="btn btn--secondary" onclick="app.showPage('employee-dashboard')">Cancel</button>
                                <button type="submit" class="btn btn--primary">Submit Expense</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    generateEmployeeMyExpenses() {
        return `
            <div class="page-container">
                <div class="page-header">
                    <h1>My Expenses</h1>
                    <p>Track all your submitted expenses and their status</p>
                </div>

                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-icon">📋</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.employeeExpenses.length}</div>
                            <div class="stat-label">Total Expenses</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⏳</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.employeeExpenses.filter(e => e.status === 'pending_manager_approval').length}</div>
                            <div class="stat-label">Pending Approval</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">✅</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.employeeExpenses.filter(e => e.status === 'manager_approved').length}</div>
                            <div class="stat-label">Approved</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">💰</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.formatCurrency(this.employeeExpenses.reduce((sum, e) => sum + e.amount, 0))}</div>
                            <div class="stat-label">Total Amount</div>
                        </div>
                    </div>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h3>All My Expenses</h3>
                        <button class="btn btn--primary" onclick="app.showPage('employee-submit-expense')">Submit New Expense</button>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Date Submitted</th>
                                <th>Status</th>
                                <th>Receipt</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.employeeExpenses.map(expense => `
                                <tr>
                                    <td>${expense.description}</td>
                                    <td>${this.formatCurrency(expense.amount)}</td>
                                    <td>${expense.category}</td>
                                    <td>${this.formatDate(expense.date)}</td>
                                    <td><span class="status-badge ${expense.status}">${this.formatStatus(expense.status)}</span></td>
                                    <td>${expense.receipt ? '✅ Attached' : '❌ Missing'}</td>
                                    <td>
                                        <button class="action-btn primary" onclick="app.viewExpenseDetails(${expense.id})">View</button>
                                        ${expense.status === 'pending_manager_approval' ? 
                                            '<button class="action-btn">Edit</button>' : 
                                            ''
                                        }
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // Page functionality initialization
    initializePageFunctionality(pageId) {
        setTimeout(() => {
            if (pageId === 'admin-dashboard') {
                this.createAdminCharts();
            } else if (pageId === 'admin-analytics') {
                this.createAnalyticsCharts();
            } else if (pageId === 'manager-dashboard') {
                this.createManagerCharts();
            } else if (pageId === 'employee-dashboard') {
                this.createEmployeeCharts();
            } else if (pageId === 'employee-submit-expense') {
                this.bindExpenseSubmitForm();
            }
        }, 100);
    }

    // Chart creation functions
    createAdminCharts() {
        this.createChart('adminMonthlyTrendsChart', {
            type: 'line',
            data: {
                labels: this.chartData.monthlyTrends.labels,
                datasets: [{
                    label: 'Total Expenses',
                    data: this.chartData.monthlyTrends.expenses,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Budget',
                    data: this.chartData.monthlyTrends.budget,
                    borderColor: '#FFC185',
                    backgroundColor: 'rgba(255, 193, 133, 0.1)',
                    tension: 0.4,
                    fill: false,
                    borderDash: [5, 5]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top' }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: function(value) { return '$' + value.toLocaleString(); } }
                    }
                }
            }
        });

        this.createChart('adminCategoryChart', {
            type: 'doughnut',
            data: {
                labels: this.chartData.categories.labels,
                datasets: [{
                    data: this.chartData.categories.data,
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } }
            }
        });

        this.createChart('adminDepartmentChart', {
            type: 'bar',
            data: {
                labels: this.chartData.departments.labels,
                datasets: [{
                    label: 'Current Month',
                    data: this.chartData.departments.currentMonth,
                    backgroundColor: '#1FB8CD'
                }, {
                    label: 'Previous Month',
                    data: this.chartData.departments.previousMonth,
                    backgroundColor: '#FFC185'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: function(value) { return '$' + value.toLocaleString(); } }
                    }
                }
            }
        });

        this.createChart('adminApprovalChart', {
            type: 'pie',
            data: {
                labels: ['Approved', 'Pending', 'Rejected'],
                datasets: [{
                    data: [156, 23, 8],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    createAnalyticsCharts() {
        this.createChart('analyticsQuarterChart', {
            type: 'line',
            data: {
                labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024 (Projected)'],
                datasets: [{
                    label: 'Quarterly Expenses',
                    data: [89000, 95000, 102000, 98000],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Budget',
                    data: [95000, 100000, 105000, 105000],
                    borderColor: '#FFC185',
                    tension: 0.4,
                    borderDash: [5, 5]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: function(value) { return '$' + value.toLocaleString(); } }
                    }
                }
            }
        });

        this.createChart('analyticsSavingsChart', {
            type: 'bar',
            data: {
                labels: ['Travel Optimization', 'Software Consolidation', 'Meal Policy', 'Office Supplies', 'Training Programs'],
                datasets: [{
                    label: 'Potential Annual Savings',
                    data: [8500, 12000, 3200, 4500, 2800],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: function(value) { return '$' + value.toLocaleString(); } }
                    }
                }
            }
        });

        this.createChart('analyticsComplianceChart', {
            type: 'doughnut',
            data: {
                labels: ['Policy Compliant', 'Minor Issues', 'Major Issues'],
                datasets: [{
                    data: [92, 6, 2],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right' }
                }
            }
        });

        this.createChart('analyticsDayChart', {
            type: 'bar',
            data: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [{
                    label: 'Average Daily Expenses',
                    data: [2800, 3200, 3100, 3400, 2900, 800, 400],
                    backgroundColor: '#DB4545'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: function(value) { return '$' + value.toLocaleString(); } }
                    }
                }
            }
        });
    }

    createManagerCharts() {
        this.createChart('managerTeamTrendsChart', {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Team Expenses',
                    data: [3500, 4200, 3800, 5500],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true } },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: function(value) { return '$' + value.toLocaleString(); } }
                    }
                }
            }
        });

        this.createChart('managerCategoryChart', {
            type: 'doughnut',
            data: {
                labels: ['Travel', 'Meals', 'Office Supplies', 'Marketing'],
                datasets: [{
                    data: [8500, 3200, 2100, 3200],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } }
            }
        });
    }

    createEmployeeCharts() {
        this.createChart('employeeCategoryChart', {
            type: 'doughnut',
            data: {
                labels: ['Travel', 'Meals', 'Office Supplies'],
                datasets: [{
                    data: [456.78, 89.50, 67.25],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } }
            }
        });
    }

    createChart(canvasId, config) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        try {
            this.charts[canvasId] = new Chart(ctx, config);
        } catch (error) {
            console.error(`Error creating chart ${canvasId}:`, error);
        }
    }

    // Expense form handling
    bindExpenseSubmitForm() {
        const form = document.getElementById('expense-submit-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleExpenseSubmit();
                return false;
            });
            
            // Set today as default date
            const dateInput = document.getElementById('expense-date');
            if (dateInput) {
                dateInput.value = new Date().toISOString().split('T')[0];
            }
        }
    }

    handleExpenseSubmit() {
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const category = document.getElementById('expense-category').value;
        const date = document.getElementById('expense-date').value;
        const description = document.getElementById('expense-description').value;
        const purpose = document.getElementById('expense-purpose').value;
        const receipt = document.getElementById('expense-receipt').files[0];

        if (!amount || !category || !date || !description || !purpose) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        // Create new expense
        const newExpense = {
            id: Date.now(), // Simple ID generation
            employee: this.currentUser.full_name,
            amount: amount,
            category: category,
            description: description,
            date: date,
            status: 'pending_manager_approval',
            receipt: !!receipt
        };

        // Add to employee expenses
        this.employeeExpenses.unshift(newExpense);

        this.showToast('Expense submitted successfully!', 'success');
        
        // Navigate back to dashboard
        setTimeout(() => {
            this.showPage('employee-dashboard');
        }, 1500);
    }

    // Action handlers
    approveExpense(expenseId) {
        const expense = this.managerTeamExpenses.find(e => e.id === expenseId);
        if (expense) {
            expense.status = 'manager_approved';
            expense.approved_by = this.currentUser.username;
            expense.approved_date = new Date().toISOString();
            
            this.showToast('Expense approved successfully!', 'success');
            
            // Refresh current page
            if (this.currentInterface === 'manager') {
                setTimeout(() => {
                    const currentPage = document.querySelector(`#${this.currentInterface}-interface .nav-link.active`);
                    if (currentPage) {
                        this.showPage(currentPage.dataset.page);
                    }
                }, 1000);
            }
        }
    }

    rejectExpense(expenseId) {
        const expense = this.managerTeamExpenses.find(e => e.id === expenseId);
        if (expense) {
            expense.status = 'manager_rejected';
            expense.rejected_by = this.currentUser.username;
            expense.rejected_date = new Date().toISOString();
            
            this.showToast('Expense rejected', 'error');
            
            // Refresh current page
            if (this.currentInterface === 'manager') {
                setTimeout(() => {
                    const currentPage = document.querySelector(`#${this.currentInterface}-interface .nav-link.active`);
                    if (currentPage) {
                        this.showPage(currentPage.dataset.page);
                    }
                }, 1000);
            }
        }
    }

    viewExpenseDetails(expenseId) {
        let expense = null;
        
        // Find expense in appropriate data set
        if (this.currentInterface === 'admin') {
            expense = this.adminExpenses.find(e => e.id === expenseId);
        } else if (this.currentInterface === 'manager') {
            expense = this.managerTeamExpenses.find(e => e.id === expenseId);
        } else if (this.currentInterface === 'employee') {
            expense = this.employeeExpenses.find(e => e.id === expenseId);
        }
        
        if (!expense) return;
        
        this.showModal('Expense Details', `
            <div class="expense-details">
                <div class="detail-item">
                    <div class="detail-label">Employee</div>
                    <div class="detail-value">${expense.employee}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Amount</div>
                    <div class="detail-value">${this.formatCurrency(expense.amount)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Category</div>
                    <div class="detail-value">${expense.category}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Date</div>
                    <div class="detail-value">${this.formatDate(expense.date)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Status</div>
                    <div class="detail-value">
                        <span class="status-badge ${expense.status}">${this.formatStatus(expense.status)}</span>
                    </div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Receipt</div>
                    <div class="detail-value">${expense.receipt ? '✅ Attached' : '❌ Not provided'}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Description</div>
                    <div class="detail-value">${expense.description}</div>
                </div>
                ${expense.department ? `
                    <div class="detail-item">
                        <div class="detail-label">Department</div>
                        <div class="detail-value">${expense.department}</div>
                    </div>
                ` : ''}
            </div>
        `, `
            <button class="btn btn--secondary" onclick="app.closeModal()">Close</button>
        `);
    }

    viewExpense(expenseId) {
        this.viewExpenseDetails(expenseId);
    }

    editExpense(expenseId) {
        this.showToast('Edit functionality coming soon', 'warning');
    }

    viewMemberDetails(memberId) {
        const member = this.managerTeamMembers.find(m => m.id === memberId);
        if (!member) return;
        
        this.showModal(`Team Member: ${member.name}`, `
            <div class="expense-details">
                <div class="detail-item">
                    <div class="detail-label">Name</div>
                    <div class="detail-value">${member.name}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Role</div>
                    <div class="detail-value">${member.role}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Monthly Expenses</div>
                    <div class="detail-value">${this.formatCurrency(member.expenses_this_month)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Pending Expenses</div>
                    <div class="detail-value">${member.pending_expenses}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Last Activity</div>
                    <div class="detail-value">${this.formatDate(member.last_expense)}</div>
                </div>
            </div>
        `, `
            <button class="btn btn--secondary" onclick="app.closeModal()">Close</button>
            <button class="btn btn--primary">Send Message</button>
        `);
    }

    markAsRead(notificationId) {
        this.showToast('Notification marked as read', 'success');
    }

    markAllAsRead() {
        this.showToast('All notifications marked as read', 'success');
    }

    // Modal management
    showModal(title, body, footer = '') {
        const modal = document.getElementById('expense-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const modalFooter = document.getElementById('modal-footer');
        
        if (modal && modalTitle && modalBody && modalFooter) {
            modalTitle.textContent = title;
            modalBody.innerHTML = body;
            modalFooter.innerHTML = footer;
            modal.classList.remove('hidden');
        }
    }

    closeModal() {
        const modal = document.getElementById('expense-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // Toast notifications
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastIcon = toast.querySelector('.toast-icon');
        const toastMessage = toast.querySelector('.toast-message');
        
        // Set icon based on type
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        toastIcon.textContent = icons[type] || icons.info;
        toastMessage.textContent = message;
        
        // Remove all type classes and add current type
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 300);
        }, 3000);
    }

    // Logout function
    handleLogout() {
        this.currentUser = null;
        this.currentInterface = null;
        
        // Destroy all charts
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
        
        // Hide all interfaces
        document.querySelectorAll('.admin-interface, .manager-interface, .employee-interface').forEach(iface => {
            iface.classList.remove('active');
        });
        
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
        
        this.showToast('Logged out successfully', 'success');
    }

    // Utility functions
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount || 0);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatStatus(status) {
        const statusMap = {
            'pending': 'Pending',
            'approved': 'Approved',
            'rejected': 'Rejected',
            'pending_manager_approval': 'Pending Approval',
            'manager_approved': 'Manager Approved',
            'manager_rejected': 'Manager Rejected'
        };
        return statusMap[status] || status;
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize the application
const app = new ExpenseXApp();
window.app = app;

console.log('ExpenseX Multi-Role Management System initialized successfully');