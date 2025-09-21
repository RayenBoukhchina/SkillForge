// SkillForge Frontend JavaScript

// Éléments DOM
const searchForm = document.getElementById('searchForm');
const memberIdInput = document.getElementById('memberId');
const resultsSection = document.getElementById('resultsSection');
const errorSection = document.getElementById('errorSection');
const memberIdResult = document.getElementById('memberIdResult');
const formationsResult = document.getElementById('formationsResult');
const errorMessage = document.getElementById('errorMessage');

// Configuration API
const API_BASE_URL = window.location.origin;

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    searchForm.addEventListener('submit', handleSearch);
    checkAPIHealth();
});

// Fonction principale de recherche
async function handleSearch(event) {
    event.preventDefault();
    
    const memberId = memberIdInput.value.trim();
    if (!memberId) {
        showError('Veuillez saisir un ID de membre valide.');
        return;
    }
    
    await searchMember(parseInt(memberId));
}

// Recherche par ID membre (utilisée aussi par les boutons d'exemple)
async function searchMember(memberId) {
    try {
        showLoading();
        hideResults();
        hideError();
        
        const response = await fetch(`${API_BASE_URL}/recommendations/${memberId}`);
        const data = await response.json();
        
        hideLoading();
        
        if (response.ok) {
            if (data.Predicted_Formations) {
                showResults(data.ID_Membre, data.Predicted_Formations);
            } else {
                showError(`Aucune formation trouvée pour le membre ${memberId}.`);
            }
        } else if (response.status === 404) {
            showError(`Membre ${memberId} non trouvé dans la base de données.`);
        } else {
            showError(data.error || 'Erreur lors de la récupération des données.');
        }
        
    } catch (error) {
        hideLoading();
        showError('Erreur de connexion à l\'API. Vérifiez que le serveur est démarré.');
        console.error('Erreur API:', error);
    }
}

// Afficher les résultats
function showResults(memberId, formations) {
    memberIdResult.textContent = memberId;
    
    // Convertir la chaîne de formations en tableau
    const formationsList = formations.split(', ').map(f => f.trim());
    
    // Créer les tags de formation
    formationsResult.innerHTML = formationsList
        .map(formation => `<span class="formation-tag">${formation}</span>`)
        .join('');
    
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Afficher une erreur
function showError(message) {
    errorMessage.textContent = message;
    errorSection.style.display = 'block';
    errorSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Masquer les résultats
function hideResults() {
    resultsSection.style.display = 'none';
}

// Masquer les erreurs
function hideError() {
    errorSection.style.display = 'none';
}

// Afficher l'état de chargement
function showLoading() {
    const submitBtn = searchForm.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner loading"></i> Recherche...';
    submitBtn.disabled = true;
    submitBtn.dataset.originalContent = originalContent;
}

// Masquer l'état de chargement
function hideLoading() {
    const submitBtn = searchForm.querySelector('button[type="submit"]');
    if (submitBtn.dataset.originalContent) {
        submitBtn.innerHTML = submitBtn.dataset.originalContent;
        submitBtn.disabled = false;
        delete submitBtn.dataset.originalContent;
    }
}

// Vérifier la santé de l'API au chargement
async function checkAPIHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        
        if (response.ok && data.status === 'ok') {
            console.log('✅ API SkillForge opérationnelle');
            showSystemStatus('✅ API opérationnelle', 'success');
        } else {
            console.warn('⚠️ API en mode dégradé:', data);
            showSystemStatus('⚠️ API en mode dégradé', 'warning');
        }
    } catch (error) {
        console.error('❌ API inaccessible:', error);
        showSystemStatus('❌ API inaccessible', 'error');
    }
}

// Afficher le statut du système
function showSystemStatus(message, type) {
    const statusElement = document.createElement('div');
    statusElement.className = `system-status ${type}`;
    statusElement.textContent = message;
    statusElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Couleurs selon le type
    switch (type) {
        case 'success':
            statusElement.style.background = '#10b981';
            statusElement.style.color = 'white';
            break;
        case 'warning':
            statusElement.style.background = '#f59e0b';
            statusElement.style.color = 'white';
            break;
        case 'error':
            statusElement.style.background = '#ef4444';
            statusElement.style.color = 'white';
            break;
    }
    
    document.body.appendChild(statusElement);
    
    // Animation d'apparition
    setTimeout(() => {
        statusElement.style.opacity = '1';
    }, 100);
    
    // Suppression automatique après 5 secondes
    setTimeout(() => {
        statusElement.style.opacity = '0';
        setTimeout(() => {
            if (statusElement.parentNode) {
                statusElement.parentNode.removeChild(statusElement);
            }
        }, 300);
    }, 5000);
}

// Fonction utilitaire pour valider les IDs membres
function isValidMemberId(id) {
    return id && Number.isInteger(id) && id > 0;
}

// Auto-complétion pour l'input (fonctionnalité future)
function setupAutoComplete() {
    // À implémenter si vous voulez ajouter l'auto-complétion
    // basée sur les IDs disponibles dans votre dataset
}

// Gestion du clavier (Enter pour rechercher)
memberIdInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleSearch(event);
    }
});

// Nettoyage de l'input (seulement des chiffres)
memberIdInput.addEventListener('input', function(event) {
    // Permettre seulement les chiffres
    this.value = this.value.replace(/[^\d]/g, '');
});

// Feedback visuel pour les boutons d'exemple
document.querySelectorAll('.example-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Animation du bouton cliqué
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Gestion des erreurs globales
window.addEventListener('error', function(event) {
    console.error('Erreur JavaScript:', event.error);
});

// Analytics simples (optionnel)
function trackSearch(memberId, found) {
    console.log(`Recherche: ID ${memberId}, Résultat: ${found ? 'trouvé' : 'non trouvé'}`);
    // Ici vous pourriez ajouter Google Analytics ou autre
}

// Export des fonctions pour les tests (si nécessaire)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        searchMember,
        isValidMemberId,
        checkAPIHealth
    };
}
