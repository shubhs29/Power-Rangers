from fastapi import APIRouter
from fastapi.responses import JSONResponse
from routes import generate_data
from apply_label import apply_ai_labels, apply_clustering
from dashboard import get_chart_data

middleware_router = APIRouter()

@middleware_router.post("/run-analysis")
def run_analysis_pipeline():
    try:
        # Step 1: Generate data
        data_resp = generate_data()
        if "error" in data_resp:
            return JSONResponse(content={"step": "generate", "error": data_resp["error"]}, status_code=500)

        # Step 2: Label data
        label_resp = apply_ai_labels()
        if "error" in label_resp:
            return JSONResponse(content={"step": "labeling", "error": label_resp["error"]}, status_code=500)

        # Step 3: Apply clustering
        cluster_resp = apply_clustering()
        if "error" in cluster_resp:
            return JSONResponse(content={"step": "clustering", "error": cluster_resp["error"]}, status_code=500)
        
        return {
            "message": "All steps completed successfully.",
            "steps": {
                "data_generation": data_resp["message"],
                "labeling": label_resp["message"],
                "clustering": cluster_resp["message"]
            }
        }

    except Exception as e:
        return JSONResponse(content={"error": f"Unexpected error: {str(e)}"}, status_code=500)
