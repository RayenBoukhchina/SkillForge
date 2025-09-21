# Projet de Prédiction de Formations pour les Membres de l'Entreprise

## Présentation Claire de l’Approche Adoptée

Ce projet vise à prédire les formations les plus pertinentes pour les membres de l'entreprise en se basant sur leurs caractéristiques et leurs activités passées. L'approche adoptée comprend les étapes suivantes :

1.  **Collecte et préparation des données :** Les données sont collectées à partir de fichiers CSV, nettoyées pour supprimer les valeurs manquantes et les incohérences, et prétraitées pour encoder les variables catégorielles.
2.  **Sélection des caractéristiques :** Les caractéristiques les plus pertinentes pour la prédiction des formations sont sélectionnées.
3.  **Entraînement du modèle :** Un modèle de classification multi-label est entraîné sur les données préparées. Plusieurs modèles sont évalués, et le meilleur est sélectionné.
4.  **Prédiction des formations :** Le modèle entraîné est utilisé pour prédire les formations les plus pertinentes pour les nouveaux membres.
5.  **Création d'une API :** Une API Flask est créée pour permettre aux applications web d'accéder aux prédictions du modèle.

## Justification des Choix Algorithmiques et Techniques

* **Classification multi-label :** Le problème de la prédiction des formations est formulé comme un problème de classification multi-label, car un membre peut être intéressé par plusieurs formations.
* **Modèles évalués :** Plusieurs modèles de classification multi-label ont été évalués, notamment Random Forest, Gradient Boosting, Decision Tree, Logistic Regression, Linear SVM, Gaussian Naive Bayes, Multinomial Naive Bayes, K-Nearest Neighbors, Neural Network, XGBoost et LightGBM.
* **Gaussian Naive Bayes :** Le modèle Gaussian Naive Bayes a été sélectionné comme le meilleur modèle en raison de ses performances supérieures en termes de F1-score macro sur l'ensemble de validation. Bien que Naive Bayes soit généralement simple, dans ce cas spécifique, il a montré une capacité surprenante à généraliser.
* **Flask pour l'API :** Flask a été choisi pour créer l'API en raison de sa simplicité, de sa légèreté et de sa flexibilité. Il permet de créer rapidement des API RESTful avec Python.
* **Pickle pour la sérialisation du modèle :** Pickle est utilisé pour sérialiser le modèle entraîné, ce qui permet de le sauvegarder dans un fichier et de le charger facilement dans l'API Flask.

## Instructions Pour Exécuter le Projet

1.  **Cloner le dépôt :**
    ```bash
    git clone <URL_DU_DEPOT>
    cd <NOM_DU_DEPOT>
    ```
2.  **Créer un environnement virtuel (recommandé) :**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # Pour Linux/macOS
    venv\Scripts\activate  # Pour Windows
    ```
3.  **Installer les dépendances :**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Exécuter l'API Flask :**
    ```bash
    python app.py
    ```
    L'API sera accessible à l'adresse [http://127.0.0.1:5000/](http://127.0.0.1:5000/).
5.  **Utiliser l'API :**
    * Envoyer une requête POST à l'adresse [http://127.0.0.1:5000/predict_formations](http://127.0.0.1:5000/predict_formations) avec un corps JSON contenant les informations du membre :
        ```json
        {
            "ID_Membre": 123,
            "Projets_Realisés": 5,
            "Soft_Skills": 8,
            "Filiere": "IIA",
            "Cellule": "Web",
            "Indice_Engagement": 7
        }
        ```
    * La réponse sera un JSON contenant l'ID du membre et les formations prédites :
        ```json
        {
            "ID_Membre": 123,
            "Predicted_Formations": "Python, ReactJS, Web Development"
        }
        ```
