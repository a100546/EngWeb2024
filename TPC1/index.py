import xml.etree.ElementTree as ET
import os
from genPages import generate_street_pages

PAGES = "pages"
DATASET = "dataset/texto"

def get_nome(xml_file):
    tree = ET.parse(os.path.join(DATASET, xml_file))
    root = tree.getroot()
    nome = root.find('.//meta/nome').text
    return nome.lstrip().lower()

def generate_street_card(src,street,i):
    card = f"""
            <a href="{src}">
                <div class="card">
                    <div class="card-name">{i}. {street}</div>
                </div>
            </a>
            """

    return card

def generate_index(dir):
    xml_files = [file for file in os.listdir(dir)]
    xml_files.sort(key=get_nome)
    res=""

    for i,file in enumerate(xml_files):
        file = os.path.join(dir,file)

        root = ET.parse(file).getroot()
        nome_value = root.find('.//nome').text

        generate_street_pages(root, remove_spaces(nome_value))

        href = f"{remove_spaces(nome_value)}.html"
        res += generate_street_card(href, nome_value,i+1)

    return res

def remove_spaces(street_name):
    words = street_name.split()  
    spaceless_street = ''.join(words) 
    return spaceless_street


def main():  
    if not os.path.exists(PAGES):
                os.makedirs(PAGES)

    res = generate_index(DATASET)

    file_path = PAGES +"/index.html"
    with open("templates/main.html", 'r' , encoding="utf-8") as file:
        template = file.read()

    new = template.replace("{STREETS}", res)

    with open(file_path, 'w' , encoding="utf-8") as file:
        file.write(new)
if __name__ == '__main__':
     main()