# 🎓 SkillForge - Système de Recommandation de Formations par IA

[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.0+-green.svg)](https://flask.palletsprojects.com)
[![Gunicorn](https://img.shields.io/badge/Gunicorn-Production-orange.svg)](https://gunicorn.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**SkillForge** est une application web full-stack qui utilise l'intelligence artificielle pour recommander des formations personnalisées aux employés d'une entreprise. Le système analyse 13 variables comportementales et académiques pour prédire les formations les plus pertinentes pour chaque membre.

## 🌟 **Fonctionnalités principales**

- 🤖 **IA de recommandation** : Classification multi-label avec comparaison de 11 algorithmes
- 🌐 **Interface web moderne** : Frontend responsive avec design professionnel
- 🚀 **API REST robuste** : Endpoints avec gestion d'erreurs et health checks
- 📊 **Analytics avancées** : Analyse de 4,952 enregistrements avec 13 variables
- ⚡ **Production-ready** : Déploiement Gunicorn multi-workers
- 📱 **Responsive design** : Compatible mobile, tablette et desktop

## 🎯 **Démonstration**

### Interface web
- **URL principale** : `http://localhost:8000/`
- **Recherche par ID** : Interface intuitive avec boutons d'exemple
- **Résultats visuels** : Affichage des formations sous forme de tags colorés

### API Endpoints
```http
GET  /health                    # Statut de l'API
GET  /recommendations/{id}      # Recommandations par ID membre
POST /predict_formations        # Prédiction via JSON
```

## 🔬 **Approche scientifique**

### **Pipeline Machine Learning**
1. **📊 Collecte et préparation** : Nettoyage de 4,952 enregistrements CSV
2. **🔧 Feature Engineering** : Encodage one-hot, standardisation, analyse de corrélation
3. **🤖 Modélisation** : Comparaison de 11 algorithmes de classification multi-label
4. **📈 Sélection** : Gaussian Naive Bayes (meilleur F1-score macro)
5. **🚀 Déploiement** : API Flask avec Gunicorn production

### **Variables analysées**
- **Académiques** : Âge, Moyenne Lycée, Filière (6 types)
- **Professionnelles** : Projets réalisés, Évaluation bureau, Expérience
- **Comportementales** : Soft skills, Score entretien, Indice engagement
- **Organisationnelles** : Cellule de travail, Autres clubs

### **Catégories de formations**
| Catégorie | Exemples |
|-----------|----------|
| **Tech** | Python, ReactJS, Web Development, Docker |
| **Leadership** | Management, Teamwork, Public Speaking |
| **Marketing** | Digital Marketing, Photoshop, Content Creation |
| **Business** | B2B Sales, CRM, Negotiation |
| **Qualité** | ISO9001, Quality Control, RSE |
| **Mobile** | Flutter, React Native, UI/UX |

## 🏗️ **Architecture technique**

```
Frontend (HTML/CSS/JS) ↔ Flask Routes ↔ API Endpoints ↔ CSV Data
        ↓                       ↓
   Interface Web         Gunicorn (4 workers)
```

### **Stack technologique**
- **Backend** : Python 3.9+, Flask 3.0+, Pandas, Scikit-learn
- **Frontend** : HTML5, CSS3 (animations), JavaScript (ES6+)
- **Production** : Gunicorn, environnement virtuel
- **Data Science** : NumPy, Matplotlib, Seaborn
- **Outils** : Jupyter Notebook pour l'analyse exploratoire

## 🚀 **Installation et lancement**

### **Prérequis**
- Python 3.9+
- pip et venv

### **Installation rapide**
```bash
# 1. Cloner le projet
git clone <votre-repo-url>
cd SkillForge

# 2. Créer l'environnement virtuel
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate   # Windows

# 3. Installer les dépendances
pip install -r requirements.txt

# 4. Lancer en développement
python app.py

# 5. Lancer en production
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

### **URLs d'accès**
- **Interface web** : http://localhost:8000/
- **API Health** : http://localhost:8000/health
- **API Docs** : Endpoints documentés dans l'interface

## 📊 **Exemples d'utilisation**

### **Interface web**
1. Ouvrir http://localhost:8000/
2. Saisir un ID membre (ex: 4748, 1200, 372)
3. Cliquer sur "Rechercher" ou utiliser les boutons d'exemple
4. Voir les formations recommandées

### **API REST**
```bash
# Test de santé
curl http://localhost:8000/health

# Recommandation par GET
curl http://localhost:8000/recommendations/4748

# Recommandation par POST
curl -X POST http://localhost:8000/predict_formations \
  -H "Content-Type: application/json" \
  -d '{"ID_Membre": 1200}'
```

### **Réponse type**
```json
{
  "ID_Membre": 4748,
  "Predicted_Formations": "Python, ReactJS, Web Development"
}
```

## 🧪 **Analyse exploratoire**

Le notebook [`JCR.ipynb`](JCR.ipynb) contient l'analyse complète :

- **Exploration des données** : Statistiques descriptives, distributions
- **Preprocessing** : Nettoyage, encodage, corrélations
- **Modélisation** : Comparaison de 11 algorithmes ML
- **Visualisations** : Matrices de corrélation, distributions

### **Modèles évalués**
- Random Forest
- Gradient Boosting  
- Decision Tree
- Logistic Regression
- Linear SVM
- **Gaussian Naive Bayes** ⭐ (sélectionné)
- Multinomial Naive Bayes
- K-Nearest Neighbors
- Neural Network
- XGBoost
- LightGBM

## 📁 **Structure du projet**

```
SkillForge/
├── 📄 app.py                 # Application Flask principale
├── 📓 JCR.ipynb             # Notebook d'analyse ML
├── 📊 train_data.csv        # Données d'entraînement (4,952 lignes)
├── 📊 test_data.csv         # Données de test
├── 📊 recommendation.csv    # Recommandations pré-calculées
├── 📋 requirements.txt      # Dépendances Python
├── 📖 README.md            # Documentation (ce fichier)
├── 🎨 templates/
│   └── index.html          # Interface utilisateur
├── 🎨 static/
│   ├── style.css           # Styles CSS modernes
│   └── script.js           # Logique JavaScript
└── 🐍 venv/                # Environnement virtuel
```

## 🎨 **Interface utilisateur**

### **Design moderne**
- **Dégradé violet** : Interface élégante et professionnelle
- **Cards Material** : Organisation claire des sections
- **Animations CSS** : Transitions fluides et feedback visuel
- **Icons FontAwesome** : Amélioration de l'UX
- **Responsive** : Adaptation automatique aux écrans

### **Fonctionnalités UX**
- ✅ Validation en temps réel des inputs
- ✅ Messages d'erreur contextuels
- ✅ Loading states avec spinners
- ✅ Auto-scroll vers les résultats
- ✅ Boutons d'exemple pour tests rapides
- ✅ Statut API en temps réel

## 🔧 **Configuration avancée**

### **Variables d'environnement**
```bash
# Chemin personnalisé pour les données
export RECOMMENDATION_CSV_PATH="/path/to/your/data.csv"

# Port personnalisé
export PORT=8080
```

### **Configuration Gunicorn**
Créer `gunicorn.conf.py` :
```python
bind = "0.0.0.0:8000"
workers = 4
timeout = 60
keepalive = 2
max_requests = 1000
max_requests_jitter = 100
```

Lancer avec :
```bash
gunicorn -c gunicorn.conf.py app:app
```

## 📈 **Performances et métriques**

### **Modèle ML**
- **Algorithm** : Gaussian Naive Bayes
- **Métrique** : F1-score macro (meilleure performance)
- **Dataset** : 4,952 enregistrements
- **Features** : 13 variables après preprocessing

### **Application web**
- **Workers** : 4 processus Gunicorn
- **Concurrence** : Plusieurs requêtes simultanées
- **Latence** : < 100ms pour une recommandation
- **Availability** : Health check endpoint

## 🛠️ **Développement**

### **Ajouter de nouvelles fonctionnalités**

1. **Nouveaux endpoints** : Modifier `app.py`
2. **Interface** : Éditer `templates/index.html`
3. **Styles** : Modifier `static/style.css`
4. **Logique** : Mettre à jour `static/script.js`

### **Tests**
```bash
# Test des endpoints
curl http://localhost:8000/health
curl http://localhost:8000/recommendations/4748

# Validation des données
python -c "import pandas as pd; print(pd.read_csv('recommendation.csv').info())"
```

## 🎯 **Cas d'usage métier**

### **RH et Formation**
- **Personnalisation** : Recommandations adaptées au profil
- **Optimisation** : Allocation efficace des budgets formation
- **Analytics** : Insights sur les besoins de compétences

### **Management**
- **Planification** : Identification des formations prioritaires
- **ROI** : Amélioration de l'efficacité des formations
- **Engagement** : Formations alignées avec les intérêts

## 🚀 **Déploiement production**

### **Docker (optionnel)**
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "app:app"]
```

### **Cloud deployment**
- **Heroku** : `git push heroku main`
- **AWS/GCP** : Configuration avec Gunicorn
- **DigitalOcean** : Droplet avec reverse proxy

## 📝 **Licence**

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 **Contribution**

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request


---

⭐ **Si ce projet vous aide, n'hésitez pas à lui donner une étoile !**
