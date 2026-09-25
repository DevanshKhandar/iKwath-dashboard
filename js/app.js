/* ========== iKwath Dashboard — Main Application Logic ========== */

document.addEventListener('DOMContentLoaded', () => {
    initData();
    initNavigation();
    initTopbar();
    initDashboard();
    initRecipes();
    initHistory();
    initInventory();
    initProfile();
    startBrewSimulation();
});

/* ========== NAVIGATION ========== */
function initNavigation() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            document.getElementById('section-' + section).classList.add('active');
            // Close mobile sidebar
            document.getElementById('sidebar').classList.remove('open');
        });
    });
    // Mobile menu toggle
    document.getElementById('menuToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });
}

/* ========== TOPBAR ========== */
function initTopbar() {
    // Date display
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('dateDisplay').textContent = now.toLocaleDateString('en-IN', options);

    // Profile name
    const profile = getData('profile', PROFILE_DEFAULT);
    document.getElementById('userName').textContent = profile.name;

    // Notification bell
    const bell = document.getElementById('notifBell');
    const dropdown = document.getElementById('notifDropdown');
    bell.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });
    document.addEventListener('click', () => dropdown.classList.remove('show'));
}

/* ========== DASHBOARD — BREW SIMULATION ========== */
let brewInterval;
let brewData = { temp: 72, weight: 425, pulses: 0, timeLeft: 720 };
let isBrewing = true; // Machine starts in brewing state for demo
const BREW_START_WEIGHT = 425;
const BREW_END_WEIGHT = 125;
const BREW_TOTAL_DROP = BREW_START_WEIGHT - BREW_END_WEIGHT; // 300g to lose

function startBrewSimulation() {
    brewInterval = setInterval(() => {
        // Gradually increase temperature
        if (brewData.temp < 87) {
            brewData.temp += (Math.random() * 0.5);
            if (brewData.temp > 87) brewData.temp = 87;
        } else {
            brewData.temp = 85 + Math.random() * 4; // Fluctuate 85-89
        }

        // Weight decreases (this is the master variable)
        if (brewData.weight > BREW_END_WEIGHT) {
            brewData.weight -= 0.4 + Math.random() * 0.2;
            if (brewData.weight < BREW_END_WEIGHT) brewData.weight = BREW_END_WEIGHT;
        }

        // Progress is DERIVED from weight (always in sync)
        const weightLost = BREW_START_WEIGHT - brewData.weight;
        const progress = Math.min((weightLost / BREW_TOTAL_DROP) * 100, 100);

        // UAE Pulses - tied to progress
        brewData.pulses = Math.min(Math.floor(progress / 5), 20);

        // Time countdown
        if (brewData.timeLeft > 0 && progress < 100) {
            brewData.timeLeft -= 1;
        } else if (progress >= 100) {
            brewData.timeLeft = 0;
        }

        // Update UI with calculated progress
        updateBrewUI(progress);
    }, 1000);
}

function updateBrewUI(pct) {
    const tempEl = document.getElementById('tempValue');
    const progressEl = document.getElementById('progressFill');
    const progressPct = document.getElementById('progressPercent');
    const weightEl = document.getElementById('brewWeight');
    const waterDispensedEl = document.getElementById('brewWaterDispensed');
    const kadhiBrewedEl = document.getElementById('brewKadhaBrewed');
    const timeEl = document.getElementById('brewTime');
    const gaugeEl = document.getElementById('gaugeFill');

    tempEl.textContent = Math.round(brewData.temp);
    progressEl.style.width = Math.min(pct, 100) + '%';
    progressPct.textContent = Math.round(pct) + '%';
    weightEl.textContent = Math.round(brewData.weight) + 'g';
    waterDispensedEl.textContent = '400 mL';
    // Kadha brewed = target output (100 mL for 1/4th) × progress
    const targetOutput = 100; // 400 mL ÷ 4 = 100 mL for standard 1/4th reduction
    const kadhaReady = Math.round(targetOutput * (Math.min(pct, 100) / 100));
    kadhiBrewedEl.textContent = kadhaReady + ' mL';

    const mins = Math.floor(brewData.timeLeft / 60);
    const secs = brewData.timeLeft % 60;
    timeEl.textContent = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');

    // Gauge arc (534 is full circumference)
    const tempPct = Math.min((brewData.temp - 20) / 80, 1); // 20-100 range
    gaugeEl.style.strokeDashoffset = 534 - (534 * tempPct);

    // Update phase steps
    const steps = document.querySelectorAll('.progress-steps .step');
    steps.forEach((s, i) => { s.classList.remove('done', 'active'); });
    if (pct >= 10) steps[0].classList.add('done');
    if (pct >= 25) steps[1].classList.add('done');
    if (pct >= 25 && pct < 60) steps[2].classList.add('active');
    if (pct >= 60) { steps[2].classList.add('done'); steps[3].classList.add('active'); }
    if (pct >= 85) { steps[3].classList.add('done'); steps[4].classList.add('active'); }
    if (pct >= 100) {
        steps[4].classList.add('done');
        steps[4].classList.remove('active');
        document.getElementById('brewBadge').textContent = 'Ready';
        document.getElementById('brewBadge').className = 'brew-badge ready';
        isBrewing = false;
    }
}

/* ========== DASHBOARD — STREAK CALENDAR ========== */
function initDashboard() {
    const streakData = getData('streak', generateStreakData());
    const cal = document.getElementById('streakCalendar');
    cal.innerHTML = '';

    // Day headers
    const days = ['S','M','T','W','T','F','S'];
    days.forEach(d => {
        const hdr = document.createElement('div');
        hdr.className = 'streak-day';
        hdr.style.fontWeight = '600';
        hdr.style.fontSize = '10px';
        hdr.style.color = '#8a8780';
        hdr.textContent = d;
        cal.appendChild(hdr);
    });

    // Find first day of the calendar
    const firstDate = new Date(streakData[0].date);
    const startPad = firstDate.getDay();
    for (let i = 0; i < startPad; i++) {
        const empty = document.createElement('div');
        empty.className = 'streak-day empty';
        cal.appendChild(empty);
    }

    streakData.forEach(day => {
        const el = document.createElement('div');
        el.className = 'streak-day ' + day.status;
        const d = new Date(day.date);
        el.textContent = d.getDate();
        el.title = day.date + ': ' + day.status;
        if (day.status === 'taken' || day.status === 'today') {
            el.addEventListener('click', () => {
                el.style.transform = 'scale(1.3)';
                setTimeout(() => el.style.transform = '', 200);
            });
        }
        cal.appendChild(el);
    });

    // Calculate streak
    let streak = 0;
    for (let i = streakData.length - 1; i >= 0; i--) {
        if (streakData[i].status === 'future') continue;
        if (streakData[i].status === 'taken' || streakData[i].status === 'today') streak++;
        else break;
    }
    document.getElementById('streakCount').textContent = '\uD83D\uDD25 ' + streak + ' days';
}

/* ========== RECIPE LIBRARY ========== */
function initRecipes() {
    renderRecipes(RECIPES);

    // Search
    document.getElementById('recipeSearch').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        const filtered = RECIPES.filter(r => r.name.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q) || r.ingredients.some(ing => ing.toLowerCase().includes(q)));
        renderRecipes(filtered);
    });

    // Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            if (filter === 'all') renderRecipes(RECIPES);
            else renderRecipes(RECIPES.filter(r => r.category === filter));
        });
    });

    // Modal close
    document.getElementById('modalClose').addEventListener('click', () => {
        document.getElementById('recipeModal').classList.remove('show');
    });
    document.getElementById('recipeModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('recipeModal')) {
            document.getElementById('recipeModal').classList.remove('show');
        }
    });
}

function renderRecipes(recipes) {
    const grid = document.getElementById('recipeGrid');
    grid.innerHTML = '';
    if (recipes.length === 0) {
        grid.innerHTML = '<p style="color:#8a8780;text-align:center;grid-column:1/-1;padding:40px;">No formulations found.</p>';
        return;
    }
    recipes.forEach(r => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <span class="recipe-category">${capitalize(r.category)}</span>
            <h4>${r.name}</h4>
            <p class="recipe-desc">${r.desc}</p>
            <div class="recipe-meta">
                <span><i class="fas fa-temperature-high"></i> ${r.temp}°C</span>
                <span><i class="fas fa-clock"></i> ${r.time}</span>
                <span><i class="fas fa-droplet"></i> ${r.reduction}</span>
            </div>
        `;
        card.addEventListener('click', () => openRecipeModal(r));
        grid.appendChild(card);
    });
}

function openRecipeModal(r) {
    const body = document.getElementById('modalBody');
    body.innerHTML = `
        <h3>${r.name}</h3>
        <span class="modal-category">${capitalize(r.category)}</span>
        <p style="color:#4a4845;margin-bottom:12px;">${r.desc}</p>
        <h4><i class="fas fa-mortar-pestle" style="color:#d4820c;margin-right:6px;"></i>Ingredients (Dravyas)</h4>
        <ul>${r.ingredients.map(i => '<li>' + i + '</li>').join('')}</ul>
        <div class="modal-info-grid">
            <div class="modal-info-item"><small>Water Volume</small><strong>${r.water} mL</strong></div>
            <div class="modal-info-item"><small>Temperature</small><strong>${r.temp}°C</strong></div>
            <div class="modal-info-item"><small>Reduction Ratio</small><strong>${r.reduction}</strong></div>
            <div class="modal-info-item"><small>Brew Time</small><strong>${r.time}</strong></div>
            <div class="modal-info-item"><small>Pod Price</small><strong>\u20B9${r.price}</strong></div>
            <div class="modal-info-item"><small>Output Volume</small><strong>~${r.reduction === '1/8th' ? Math.round(r.water/8) : Math.round(r.water/4)} mL</strong></div>
        </div>
        <button class="btn-primary full-width brew-modal-btn" onclick="orderKadha('${r.name}', ${r.price})">
            <i class="fas fa-cart-plus"></i> Order This Kadha
        </button>
    `;
    document.getElementById('recipeModal').classList.add('show');
}

window.orderKadha = function(recipeName, price) {
    const packPrice = price * 5;
    const confirmed = confirm(
        '🛒 Order: ' + recipeName + '\n\n' +
        'Pack of 5 pods — ₹' + packPrice + '\n' +
        'Pack of 10 pods — ₹' + (packPrice * 2) + '\n' +
        'Pack of 15 pods — ₹' + (packPrice * 3) + '\n\n' +
        'Click OK to place a simulated order for 5 pods.'
    );
    if (confirmed) {
        // Add 5 pods to inventory
        const inventory = getData('inventory', INVENTORY_DEFAULT);
        const existing = inventory.find(i => i.name === recipeName);
        if (existing) {
            existing.count = Math.min(existing.count + 5, existing.max);
        } else {
            inventory.push({ name: recipeName, count: 5, max: 15 });
        }
        setData('inventory', inventory);
        if (typeof renderInventory === 'function') renderInventory();
        
        const orderId = 'IKW-' + Date.now().toString(36).toUpperCase();
        alert('✅ Order Placed Successfully!\n\nOrder ID: ' + orderId + '\n' + recipeName + ' × 5 pods\nTotal: ₹' + packPrice + '\n\nDelivery in 2-3 business days.\nPods have been added to your inventory.');
        document.getElementById('recipeModal').classList.remove('show');
    }
}

/* ========== BREW HISTORY ========== */
function initHistory() {
    renderHistory();
    document.getElementById('clearHistory').addEventListener('click', () => {
        if (confirm('Clear all brew history?')) {
            setData('history', []);
            renderHistory();
        }
    });
}

function renderHistory() {
    const history = getData('history', BREW_HISTORY_DEFAULT);
    const tbody = document.getElementById('historyBody');
    tbody.innerHTML = '';
    if (history.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#8a8780;padding:40px;">No brew history yet.</td></tr>';
        return;
    }
    history.forEach(h => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${h.date}</td>
            <td><strong>${h.recipe}</strong></td>
            <td>${h.temp}°C</td>
            <td>${h.duration}</td>
            <td>${h.volume}</td>
            <td><span class="status-badge ${h.status}">${capitalize(h.status)}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

/* ========== POD INVENTORY ========== */
function initInventory() {
    renderInventory();

    // Add pod modal
    document.getElementById('addPodBtn').addEventListener('click', () => {
        populatePodSelect();
        document.getElementById('addPodModal').classList.add('show');
    });
    document.getElementById('addPodModalClose').addEventListener('click', () => {
        document.getElementById('addPodModal').classList.remove('show');
    });
    document.getElementById('addPodForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const recipeName = document.getElementById('podRecipeSelect').value;
        const qty = parseInt(document.getElementById('podQuantity').value);
        const inventory = getData('inventory', INVENTORY_DEFAULT);
        const existing = inventory.find(i => i.name === recipeName);
        if (existing) {
            existing.count = Math.min(existing.count + qty, existing.max);
        } else {
            inventory.push({ name: recipeName, count: qty, max: 15 });
        }
        setData('inventory', inventory);
        renderInventory();
        document.getElementById('addPodModal').classList.remove('show');
    });
}

function populatePodSelect() {
    const select = document.getElementById('podRecipeSelect');
    select.innerHTML = '';
    RECIPES.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r.name;
        opt.textContent = r.name;
        select.appendChild(opt);
    });
}

function renderInventory() {
    const inventory = getData('inventory', INVENTORY_DEFAULT);
    const grid = document.getElementById('inventoryGrid');
    grid.innerHTML = '';
    inventory.forEach(item => {
        const pct = (item.count / item.max) * 100;
        let barClass = 'good';
        if (pct <= 20) barClass = 'danger';
        else if (pct <= 40) barClass = 'warn';

        const card = document.createElement('div');
        card.className = 'inventory-card';
        card.innerHTML = `
            <h4>${item.name}</h4>
            <div class="inv-count ${item.count <= 3 ? 'low' : ''}">${item.count}</div>
            <div class="inv-label">pods remaining</div>
            <div class="inv-bar"><div class="inv-bar-fill ${barClass}" style="width:${pct}%"></div></div>
            ${item.count <= 3 ? '<div class="inv-warning"><i class="fas fa-exclamation-triangle"></i> Low stock! Reorder soon.</div>' : ''}
        `;
        grid.appendChild(card);
    });
}

/* ========== HEALTH PROFILE ========== */
function initProfile() {
    loadProfile();

    document.getElementById('editProfileBtn').addEventListener('click', () => {
        const profile = getData('profile', PROFILE_DEFAULT);
        document.getElementById('editName').value = profile.name;
        document.getElementById('editAge').value = profile.age;
        document.getElementById('editPrakriti').value = profile.prakriti;
        document.getElementById('editProfileModal').classList.add('show');
    });
    document.getElementById('editProfileModalClose').addEventListener('click', () => {
        document.getElementById('editProfileModal').classList.remove('show');
    });
    document.getElementById('editProfileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const profile = {
            name: document.getElementById('editName').value,
            age: parseInt(document.getElementById('editAge').value),
            prakriti: document.getElementById('editPrakriti').value
        };
        setData('profile', profile);
        loadProfile();
        document.getElementById('editProfileModal').classList.remove('show');
        // Update topbar
        document.getElementById('userName').textContent = profile.name;
    });
}

function loadProfile() {
    const profile = getData('profile', PROFILE_DEFAULT);
    document.getElementById('profileName').textContent = profile.name;
    document.getElementById('profileAge').textContent = 'Age: ' + profile.age;
    document.getElementById('prakritiType').innerHTML = '<i class="fas fa-om"></i> ' + profile.prakriti + ' Prakriti';
    document.querySelector('.profile-avatar-large').textContent = profile.name.charAt(0).toUpperCase();
    document.querySelector('.avatar span').textContent = profile.name.charAt(0).toUpperCase();
}

/* ========== HELPERS ========== */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
