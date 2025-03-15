from flask import Flask, request, jsonify
import time
import threading

app = Flask(__name__)

# Constants
ANNUAL_INTEREST_RATE = 0.04  # 4% annual interest
EARLY_WITHDRAWAL_PENALTY = 0.1  # 10% penalty for early withdrawal
MONTH_DURATION = 10  # 1 month = 10 seconds (configurable)
TOTAL_YEARS = 20  # Simulation period

# Savings account
savings = {"balance": 10000}  # Starting balance

# List of active CDs
certificates = []

def update_cds():
    """Simulates CD interest growth over time."""
    for year in range(1, TOTAL_YEARS + 1):
        time.sleep(12 * MONTH_DURATION)  # Wait for 1 year (12 months)
        for cd in certificates:
            if not cd["withdrawn"] and cd["years"] > (year - cd["start_year"]):
                cd["balance"] *= (1 + ANNUAL_INTEREST_RATE)  # Apply annual interest
                cd["balance"] = round(cd["balance"], 2)

        print(f"Year {year}/{TOTAL_YEARS} - CD balances updated.")

@app.route("/cd/invest", methods=["POST"])
def invest_cd():
    """User invests in a CD with a specified duration."""
    data = request.json
    amount = data.get("amount")
    years = data.get("years")

    if amount <= 0 or years <= 0:
        return jsonify({"error": "Invalid amount or duration"}), 400
    if amount > savings["balance"]:
        return jsonify({"error": "Insufficient funds"}), 400

    # Deduct from savings and create CD
    savings["balance"] -= amount
    cd = {"start_year": 0, "years": years, "balance": amount, "withdrawn": False}
    certificates.append(cd)

    return jsonify({"message": "CD purchased", "cd": cd})

@app.route("/cd/withdraw", methods=["POST"])
def withdraw_cd():
    """Withdraw funds from a CD (with or without penalty)."""
    data = request.json
    index = data.get("index")

    if index < 0 or index >= len(certificates):
        return jsonify({"error": "Invalid CD index"}), 400

    cd = certificates[index]
    if cd["withdrawn"]:
        return jsonify({"error": "CD already withdrawn"}), 400

    years_held = cd["start_year"]  # Simulated years passed
    if years_held < cd["years"]:
        penalty = cd["balance"] * EARLY_WITHDRAWAL_PENALTY
        cd["balance"] -= penalty

    savings["balance"] += cd["balance"]
    cd["withdrawn"] = True

    return jsonify({"message": "CD withdrawn", "amount": cd["balance"], "savings": savings["balance"]})

@app.route("/cd/status", methods=["GET"])
def get_cd_status():
    """Get current CD balances."""
    return jsonify({"savings": savings, "certificates": certificates})

# Start CD simulation in a background thread
threading.Thread(target=update_cds, daemon=True).start()

if __name__ == "__main__":
    app.run(debug=True)
