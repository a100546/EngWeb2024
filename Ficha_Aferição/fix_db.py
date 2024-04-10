import json

def fix_db(input_filename):
    with open(input_filename, "r", encoding="utf-8") as f:
        pessoas = []

        data = json.load(f)

        for pessoa in data["pessoas"]:
            if "BI" in pessoa:
                pessoa["_id"] = pessoa.pop("BI")
            elif "CC" in pessoa:
                pessoa["_id"] = pessoa.pop("CC")

            pessoas.append(pessoa)

        return pessoas

if __name__ == "__main__":
    input = ["dataset.json","dataset-extra1.json", "dataset-extra2.json", "dataset-extra3.json"]

    for dataset in input:
        fixedDB = fix_db("datasets/"+dataset)

        with open("datasets/"+dataset, 'w', encoding="utf-8") as file:
            json.dump(fixedDB, file, indent=2)

