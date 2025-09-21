from flask import Flask, request, jsonify, render_template
import pandas as pd
import os


def load_recommendations(csv_path: str) -> pd.DataFrame:
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"Fichier introuvable: {csv_path}")
    df = pd.read_csv(csv_path)
    # Normalisation des colonnes attendues
    expected_cols = {"ID_Membre", "Formations"}
    missing = expected_cols - set(df.columns)
    if missing:
        raise ValueError(f"Colonnes manquantes dans {csv_path}: {missing}")
    # Types
    df["ID_Membre"] = pd.to_numeric(df["ID_Membre"], errors="coerce").astype("Int64")
    df = df.dropna(subset=["ID_Membre"]).copy()
    return df


def create_app() -> Flask:
    app = Flask(__name__)

    # Chargement au démarrage
    csv_path = os.environ.get(
        "RECOMMENDATION_CSV_PATH",
        os.path.join(os.path.dirname(__file__), "recommendation.csv"),
    )
    try:
        app.reco_df = load_recommendations(csv_path)
    except Exception as exc:
        # En cas d'erreur de chargement, on démarre quand même mais on renverra 503
        app.reco_df = None
        app.reco_error = str(exc)

    @app.get("/")
    def index():
        return render_template("index.html")

    @app.get("/health")
    def health():
        if app.reco_df is None:
            return jsonify({"status": "degraded", "error": app.reco_error}), 503
        return jsonify({"status": "ok"})

    @app.get("/recommendations/<int:member_id>")
    def get_recommendations(member_id: int):
        if app.reco_df is None:
            return jsonify({"error": f"Données indisponibles: {app.reco_error}"}), 503
        row = app.reco_df.loc[app.reco_df["ID_Membre"] == member_id]
        if row.empty:
            return jsonify({"ID_Membre": member_id, "Predicted_Formations": None}), 404
        formations = row.iloc[0]["Formations"]
        return jsonify({"ID_Membre": member_id, "Predicted_Formations": formations})

    @app.post("/predict_formations")
    def predict_formations():
        if app.reco_df is None:
            return jsonify({"error": f"Données indisponibles: {app.reco_error}"}), 503
        payload = request.get_json(silent=True) or {}
        if "ID_Membre" not in payload:
            return jsonify({"error": "Champ requis manquant: ID_Membre"}), 400
        try:
            member_id = int(payload["ID_Membre"])  # tolérant aux strings
        except Exception:
            return jsonify({"error": "ID_Membre doit être un entier"}), 400

        row = app.reco_df.loc[app.reco_df["ID_Membre"] == member_id]
        if row.empty:
            return jsonify({"ID_Membre": member_id, "Predicted_Formations": None}), 404
        formations = row.iloc[0]["Formations"]
        return jsonify({"ID_Membre": member_id, "Predicted_Formations": formations})

    return app


app = create_app()


#if __name__ == "__main__":
   # port = int(os.environ.get("PORT", 5000))
   # app.run(host="0.0.0.0", port=port, debug=True)


