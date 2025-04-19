import pandas as pd

def analyze_energy_usage(file_path):
    df = pd.read_csv(file_path)
    df['timestamp'] = pd.to_datetime(df['timestamp'])

    usage_summary = {}

    for device in df['device'].unique():
        device_data = df[df['device'] == device]
        total_usage = int(device_data['power_usage'].sum())
        active_hours = [int(hour) for hour in device_data['timestamp'].dt.hour.unique().tolist()]

        usage_summary[device] = {
            "total_usage": total_usage,
            "active_hours": active_hours,
        }

    wastage = []
    for device, data in usage_summary.items():
        if device == "AC" and any(hour > 1 for hour in data['active_hours']):
            wastage.append({
                "device": device,
                "issue": "Running all night",
                "consumption": data["total_usage"]
            })

    return {
        "summary": usage_summary,
        "wastage": wastage
    }
