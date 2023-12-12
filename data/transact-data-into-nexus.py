import requests
import json
import pandas as pd
import pprint as pp

# Read CSV file into a pandas DataFrame
csv_file_path = 'data/hapiscore_whr.csv'
df = pd.read_csv(csv_file_path, skiprows=0, header=None)

# Extract header and data rows
header = df.iloc[0, :].tolist()
data_rows = df.iloc[1:, :]

# Convert to dictionary
result = {}
for _, row in data_rows.iterrows():
    country = row[0]
    for i in range(1, len(row)):
        year = int(header[i])
        score = str(row[i]) if pd.notna(row[i]) else "NaN"
        if year not in result:
            result[year] = []
        result[year].append({"country": country, "year": year, "score": score})
# Print the result
for year, entries in result.items():
    print(f"Year {year}:")
    dataset_id = "fluree-jld/387028092977976"
    api_key = "zlTg5tm0ZQAqH6ZiKYbYN-KukRR0_rpp4II9n_P3eErAgh_T82G--7XygevycEbVzzEgyCGoepsTCOWHbQkf6Q"

    transaction = {
        "ledger": dataset_id,
        "insert": result[year],
    }

    url = "https://data.flur.ee/fluree/transact"  # change to local host
    headers = {
        "Content-Type": "application/json",
        "Authorization": api_key,
    }

    try:
        response = requests.post(url, headers=headers,
                                 json=transaction)
        data = response.json()
        print(data)
    except Exception as e:
        print(e)
