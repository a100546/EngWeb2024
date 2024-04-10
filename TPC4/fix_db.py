import json
import re
import sys

def fix_db(input_filename):
    with open(input_filename, "r", encoding="utf-8") as f:
        compositores = []
        periodos = {}
        periodos_DB = []

        data = json.load(f)

        for compositor in data["compositores"]:
            if(re.match(r'C\d+',compositor['id'])):
                periodo = compositor['periodo']
                if periodo not in periodos:
                    periodos[periodo] = []
                
                if(re.match(r'(\w+), (.+)',compositor['nome'])):
                    compositor['nome'] = re.sub(r'(\w+), (.+)',r'\2 \1',compositor['nome'])

                c = {
                    'id': compositor['id'],
                    'nome': compositor['nome'],
                    'bio': compositor['bio'],
                    'dataNasc': compositor['dataNasc'],
                    'dataObito': compositor['dataObito'],
                    'periodo': compositor['periodo']
                }

                compositores.append(c)

        for periodo in periodos.keys():
            periodos_DB.append({"id": periodo})

        fixedDB = {
            "compositores": compositores,
            "periodos": periodos_DB
        }

        return fixedDB

if __name__ == "__main__":
    input = sys.argv[1]
    output = "fix_" + input 

    fixedDB = fix_db(input)

    with open(output, 'w', encoding='utf-8') as file:
        json.dump(fixedDB, file, indent=2)

