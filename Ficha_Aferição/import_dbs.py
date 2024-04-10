import json
import requests

datasets = ["dataset-extra1.json", "dataset-extra2.json", "dataset-extra3.json"]

for dataset in datasets:
    with open("datasets/" + dataset,"r",encoding="utf-8") as f:
        data = json.load(f)

        for pessoa in data:
            requests.post("http://localhost:3000/pessoas", json=pessoa)
       
        print("Dataset: " + dataset + "\nPeople added: " + str(len(data)))