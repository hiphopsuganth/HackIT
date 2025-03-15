from flask import Flask, jsonify
import time
import threading

app = Flask(__name__)

# Constants
INITIAL_BALANCE = 1000  # Starting balance
ANNUAL_INTEREST_RATE = 0.05  # 5% annual interest
MONTHLY_INTEREST_RATE = ANNUAL_INTEREST_RATE / 12
MONTH_DURATION = 10  # 1 month = 10 seconds
YEARS = 20
TOTAL_MONTHS = YEARS * 12

# Global variable to store balance
savings_data = {"balance": INITIAL_BALANCE}

def update_savings():
    """Simulates savings account growth over time."""
    for month in range(1, TOTAL_MONTHS + 1):
        time.sleep(MONTH_DURATION)  # Wait for the duration of a month
        savings_data["balance"] *= (1 + MONTHLY_INTEREST_RATE)  # Apply interest
        savings_data["balance"] = round(savings_data["balance"], 2)  # Round to 2 decimals
        print(f"Month {month}/{TOTAL_MONTHS} (Year {month // 12 + 1}) - Balance: ${savings_data['balance']}")

    print("Simulation completed: 20 years of savings growth.")

@app.route("/savings", methods=["GET"])
def get_savings():
    """API endpoint to fetch the current balance."""
    return jsonify(savings_data)

# Start savings simulation in a background thread
threading.Thread(target=update_savings, daemon=True).start()

if __name__ == "__main__":
    app.run(debug=True)
