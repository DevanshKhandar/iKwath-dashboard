/* ========== DATA LAYER ==========
   All data is stored in localStorage.
   To migrate to Firebase later, replace the get/set functions below.
*/

const RECIPES = [
    { id: 1, name: "Dashamoola Kvatha", category: "joint", water: 400, desc: "Anti-inflammatory decoction for joint pain, sciatica, and Vata disorders.", ingredients: ["Bilva", "Agnimantha", "Shyonaka", "Patala", "Gambhari", "Brihati", "Kantakari", "Gokshura", "Shalaparni", "Prishniparni"], temp: "85-90", reduction: "1/4th", time: "12 min", price: 35 },
    { id: 2, name: "Guduchi Kvatha", category: "immunity", water: 400, desc: "Powerful immunomodulator for chronic fever and debility.", ingredients: ["Guduchi (Tinospora cordifolia)"], temp: "85-88", reduction: "1/4th", time: "10 min", price: 30 },
    { id: 3, name: "Triphala Kvatha", category: "digestive", water: 400, desc: "Digestive cleanser and mild laxative for gut health.", ingredients: ["Haritaki", "Bibhitaki", "Amalaki"], temp: "85-90", reduction: "1/4th", time: "10 min", price: 28 },
    { id: 4, name: "Trikatu Kvatha", category: "respiratory", water: 400, desc: "Clears respiratory congestion and boosts metabolism.", ingredients: ["Shunthi (Ginger)", "Maricha (Black Pepper)", "Pippali (Long Pepper)"], temp: "85-88", reduction: "1/4th", time: "8 min", price: 25 },
    { id: 5, name: "Panchakola Kvatha", category: "digestive", water: 400, desc: "Stimulates Agni (digestive fire) and relieves bloating.", ingredients: ["Pippali", "Pippalimula", "Chavya", "Chitraka", "Shunthi"], temp: "85-90", reduction: "1/4th", time: "10 min", price: 32 },
    { id: 6, name: "Punarnavadi Kvatha", category: "immunity", water: 400, desc: "Diuretic and anti-edema formulation for kidney support.", ingredients: ["Punarnava", "Shunthi", "Devadaru", "Guduchi", "Eranda"], temp: "85-88", reduction: "1/4th", time: "12 min", price: 35 },
    { id: 7, name: "Amritottara Kvatha", category: "fever", water: 480, desc: "Classical antipyretic for chronic and intermittent fevers.", ingredients: ["Guduchi", "Shunthi", "Dhamasa"], temp: "85-90", reduction: "1/8th", time: "14 min", price: 30 },
    { id: 8, name: "Rasnadi Kvatha", category: "joint", water: 400, desc: "Pain relief for rheumatoid arthritis and gout.", ingredients: ["Rasna", "Guduchi", "Eranda Mula", "Devadaru", "Shunthi"], temp: "85-90", reduction: "1/4th", time: "12 min", price: 38 },
    { id: 9, name: "Pathyadi Kvatha", category: "respiratory", water: 400, desc: "For sinusitis, headache, and upper respiratory infections.", ingredients: ["Haritaki", "Neem", "Guduchi", "Nimba"], temp: "85-88", reduction: "1/4th", time: "10 min", price: 30 },
    { id: 10, name: "Varanadi Kvatha", category: "digestive", water: 400, desc: "Anti-obesity and fat metabolism enhancer.", ingredients: ["Varana (Crataeva)", "Shigru", "Chitraka", "Haritaki", "Bibhitaki"], temp: "85-90", reduction: "1/4th", time: "12 min", price: 32 },
    { id: 11, name: "Mahatiktaka Kvatha", category: "immunity", water: 400, desc: "Blood purifier for chronic skin diseases and detox.", ingredients: ["Nimba", "Patola", "Katuka", "Guduchi", "Vasa"], temp: "85-90", reduction: "1/4th", time: "14 min", price: 40 },
    { id: 12, name: "Dhanvantara Kvatha", category: "joint", water: 400, desc: "Neurological disorders and Vata imbalance correction.", ingredients: ["Bala", "Yava", "Kola", "Kulattha", "Dashamoola"], temp: "85-90", reduction: "1/4th", time: "14 min", price: 42 },
    { id: 13, name: "Indukanta Kvatha", category: "digestive", water: 400, desc: "Digestive and rejuvenative tonic for post-illness recovery.", ingredients: ["Bala", "Shunthi", "Dasha Moola", "Chitraka", "Pippali"], temp: "85-88", reduction: "1/4th", time: "12 min", price: 38 },
    { id: 14, name: "Aragvadhadi Kvatha", category: "immunity", water: 400, desc: "Anti-fungal and anti-microbial for skin infections.", ingredients: ["Aragvadha", "Triphala", "Daruharidra", "Chandana"], temp: "85-90", reduction: "1/4th", time: "10 min", price: 32 },
    { id: 15, name: "Kokilaksha Kvatha", category: "immunity", water: 400, desc: "Urinary tract health and reproductive tonic.", ingredients: ["Kokilaksha (Asteracantha)", "Gokshura", "Punarnava"], temp: "85-88", reduction: "1/4th", time: "10 min", price: 30 },
    { id: 16, name: "Balarishta Base Kvatha", category: "immunity", water: 400, desc: "Strengthening tonic base for general debility.", ingredients: ["Bala", "Ashwagandha", "Kardamaka", "Shunthi"], temp: "85-90", reduction: "1/4th", time: "12 min", price: 35 },
    { id: 17, name: "Sahacharadi Kvatha", category: "joint", water: 400, desc: "Sciatica and lower back pain management.", ingredients: ["Sahachara", "Shunthi", "Devadaru", "Surasa", "Eranda"], temp: "85-90", reduction: "1/4th", time: "14 min", price: 38 },
    { id: 18, name: "Guggulutiktaka Kvatha", category: "joint", water: 400, desc: "Bone and joint health, osteoporosis support.", ingredients: ["Guggulu", "Nimba", "Guduchi", "Triphala", "Patola"], temp: "85-90", reduction: "1/4th", time: "14 min", price: 45 },
    { id: 19, name: "Nayopayam Kvatha", category: "respiratory", water: 400, desc: "Anti-asthmatic and bronchitis management.", ingredients: ["Shunti", "Bala", "Devadaru", "Erandamula"], temp: "85-88", reduction: "1/4th", time: "10 min", price: 32 },
    { id: 20, name: "Chirabilwadi Kvatha", category: "digestive", water: 400, desc: "Chronic diarrhea and IBS management.", ingredients: ["Chitraka", "Bilwa", "Musta", "Shunthi"], temp: "85-90", reduction: "1/4th", time: "10 min", price: 30 },
    { id: 21, name: "Manjisthadi Kvatha", category: "immunity", water: 400, desc: "Blood purifier and lymphatic cleanser.", ingredients: ["Manjishtha", "Triphala", "Guduchi", "Nimba"], temp: "85-88", reduction: "1/4th", time: "12 min", price: 35 },
    { id: 22, name: "Sukumara Kvatha", category: "digestive", water: 400, desc: "Gynecological health and menstrual regulation.", ingredients: ["Punarnava", "Shunthi", "Eranda Mula", "Bala", "Dasha Moola"], temp: "85-90", reduction: "1/4th", time: "14 min", price: 40 },
    { id: 23, name: "Vidaryadi Kvatha", category: "respiratory", water: 400, desc: "Respiratory health and chronic cough.", ingredients: ["Vidarikanda", "Shalaparni", "Prishniparni", "Bala"], temp: "85-88", reduction: "1/4th", time: "10 min", price: 32 },
    { id: 24, name: "Abhayarishta Base", category: "digestive", water: 400, desc: "Laxative base for chronic constipation.", ingredients: ["Haritaki", "Vidanga", "Musta", "Madhuka"], temp: "85-90", reduction: "1/4th", time: "10 min", price: 28 },
    { id: 25, name: "Shadangapaniya", category: "fever", water: 400, desc: "Classical antipyretic water for all fever types.", ingredients: ["Musta", "Parpata", "Ushira", "Chandana", "Udichya", "Shunthi"], temp: "85-88", reduction: "1/4th", time: "8 min", price: 25 },
    { id: 26, name: "Patoladi Kvatha", category: "fever", water: 400, desc: "Pitta-type fevers and burning sensation.", ingredients: ["Patola", "Katuka", "Chandana", "Guduchi"], temp: "85-90", reduction: "1/4th", time: "10 min", price: 30 },
    { id: 27, name: "Mustadi Kvatha", category: "fever", water: 400, desc: "Digestive fever and Ama-related conditions.", ingredients: ["Musta", "Parpata", "Ativisha", "Shunthi"], temp: "85-88", reduction: "1/4th", time: "10 min", price: 28 },
    { id: 28, name: "Balaguduchyadi Kvatha", category: "immunity", water: 400, desc: "General immunity booster and Rasayana.", ingredients: ["Bala", "Guduchi", "Ashwagandha"], temp: "85-90", reduction: "1/4th", time: "10 min", price: 35 },
    { id: 29, name: "Kaidarya Kvatha", category: "digestive", water: 400, desc: "Colic pain and abdominal cramps.", ingredients: ["Ela (Cardamom)", "Shunthi", "Pippali", "Nagara"], temp: "85-88", reduction: "1/4th", time: "8 min", price: 28 },
    { id: 30, name: "Brihatyadi Kvatha", category: "respiratory", water: 400, desc: "Cough, cold, and lower respiratory tract issues.", ingredients: ["Brihati", "Kantakari", "Shunthi", "Tulasi"], temp: "85-88", reduction: "1/4th", time: "10 min", price: 30 },
    { id: 31, name: "Maharasnadi Kvatha", category: "joint", water: 400, desc: "Complex formulation for all Vata disorders.", ingredients: ["Rasna", "Dashamoola", "Guduchi", "Eranda", "Devadaru", "Ashwagandha", "Shunthi"], temp: "85-90", reduction: "1/4th", time: "16 min", price: 48 },
    { id: 32, name: "Vasaguduchyadi Kvatha", category: "respiratory", water: 400, desc: "Bronchitis and productive cough management.", ingredients: ["Vasa", "Guduchi", "Bharangi", "Kantakari"], temp: "85-88", reduction: "1/4th", time: "10 min", price: 32 },
    { id: 33, name: "Phalatrikadi Kvatha", category: "fever", water: 400, desc: "Pitta pacifying fever remedy with cooling action.", ingredients: ["Triphala", "Guduchi", "Musta", "Parpata"], temp: "85-90", reduction: "1/4th", time: "12 min", price: 30 }
];

const BREW_HISTORY_DEFAULT = [
    { date: "24 Sep 2026, 07:30 AM", recipe: "Dashamoola Kvatha", temp: 87, duration: "12:04", volume: "400 → 102 mL", status: "completed" },
    { date: "23 Sep 2026, 07:15 AM", recipe: "Guduchi Kvatha", temp: 86, duration: "10:32", volume: "400 → 98 mL", status: "completed" },
    { date: "22 Sep 2026, 08:00 AM", recipe: "Trikatu Kvatha", temp: 88, duration: "8:45", volume: "400 → 105 mL", status: "completed" },
    { date: "21 Sep 2026, 07:45 AM", recipe: "Dashamoola Kvatha", temp: 87, duration: "12:10", volume: "400 → 100 mL", status: "completed" },
    { date: "20 Sep 2026, 06:50 AM", recipe: "Triphala Kvatha", temp: 85, duration: "10:20", volume: "400 → 101 mL", status: "completed" },
    { date: "19 Sep 2026, 07:30 AM", recipe: "Punarnavadi Kvatha", temp: 86, duration: "12:15", volume: "400 → 99 mL", status: "completed" },
    { date: "18 Sep 2026, 08:10 AM", recipe: "Dashamoola Kvatha", temp: 89, duration: "11:50", volume: "400 → 103 mL", status: "completed" },
    { date: "17 Sep 2026, 07:20 AM", recipe: "Guduchi Kvatha", temp: 86, duration: "10:40", volume: "400 → 97 mL", status: "completed" },
    { date: "16 Sep 2026, 07:35 AM", recipe: "Manjisthadi Kvatha", temp: 87, duration: "12:30", volume: "400 → 104 mL", status: "completed" },
    { date: "15 Sep 2026, 08:05 AM", recipe: "Pathyadi Kvatha", temp: 92, duration: "10:55", volume: "400 → 85 mL", status: "failed" }
];

const INVENTORY_DEFAULT = [
    { name: "Dashamoola Kvatha", count: 8, max: 15 },
    { name: "Guduchi Kvatha", count: 5, max: 15 },
    { name: "Trikatu Kvatha", count: 2, max: 15 },
    { name: "Triphala Kvatha", count: 10, max: 15 },
    { name: "Punarnavadi Kvatha", count: 6, max: 15 },
    { name: "Pathyadi Kvatha", count: 0, max: 15 },
    { name: "Amritottara Kvatha", count: 7, max: 15 },
    { name: "Rasnadi Kvatha", count: 4, max: 15 },
    { name: "Panchakola Kvatha", count: 9, max: 15 },
    { name: "Varanadi Kvatha", count: 3, max: 15 },
    { name: "Mahatiktaka Kvatha", count: 1, max: 15 },
    { name: "Manjisthadi Kvatha", count: 6, max: 15 },
    { name: "Shadangapaniya", count: 12, max: 15 },
    { name: "Brihatyadi Kvatha", count: 5, max: 15 },
    { name: "Maharasnadi Kvatha", count: 3, max: 15 }
];

const PROFILE_DEFAULT = {
    name: "Devansh",
    age: 21,
    prakriti: "Vata-Pitta"
};

// ========== localStorage helpers ==========
function getData(key, defaultVal) {
    const stored = localStorage.getItem('ikwath_' + key);
    return stored ? JSON.parse(stored) : defaultVal;
}

function setData(key, val) {
    localStorage.setItem('ikwath_' + key, JSON.stringify(val));
}

// Initialize data — always refresh defaults to pick up fixes
function initData() {
    setData('history', BREW_HISTORY_DEFAULT);
    setData('inventory', INVENTORY_DEFAULT);
    if (!localStorage.getItem('ikwath_profile')) {
        setData('profile', PROFILE_DEFAULT);
    }
    if (!localStorage.getItem('ikwath_streak')) {
        setData('streak', generateStreakData());
    }
    if (!localStorage.getItem('ikwath_cart')) {
        setData('cart', []);
    }
}

function generateStreakData() {
    const streak = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        if (i === 0) {
            streak.push({ date: dateStr, status: 'today' });
        } else if (Math.random() > 0.15) {
            streak.push({ date: dateStr, status: 'taken' });
        } else {
            streak.push({ date: dateStr, status: 'missed' });
        }
    }
    // Add 5 future days
    for (let i = 1; i <= 5; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() + i);
        streak.push({ date: d.toISOString().split('T')[0], status: 'future' });
    }
    return streak;
}
