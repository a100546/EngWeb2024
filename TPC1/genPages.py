import os
import shutil
import xml.etree.ElementTree as ET

PAGES = "pages"
DATASET = "dataset/texto"

def generate_street_pages(root, name):
    file = f"pages/{name}.html"

    if not os.path.exists(file):
        shutil.copyfile("templates/street.html", file)

    name = root.find('.//nome').text

    number = root.find('.//número').text

    content = root.find('.//corpo')

    details = content.findall('.//para')
    details_div =""
    for detail in details:
        text = ''.join(detail.itertext())
        details_div += f"<p>{text}</p>\n"

    figures = content.findall('.//figura')
    figures_div = ""
    for figure in figures:
        img_path = figure.find('imagem').attrib['path'].replace("..", "../dataset")
        legenda_element = figure.find('legenda')
        legenda = legenda_element.text if legenda_element is not None else None
        figures_div += generate_images_html(img_path, legenda)

    houses = content.findall('.//lista-casas')
    houses_div = ""
    for lists in houses:
        houses_div += generate_houses_html(lists) + "\n"
        
    with open(file, 'r', encoding="utf-8") as f:
        html_content = f.read()

    new = html_content.replace("{STREET}", name)
    new = new.replace("{HOUSES}", houses_div)
    new = new.replace("{FIGURES}", figures_div)
    new = new.replace("{NUMBER}", number)
    new = new.replace("{DETAILS}", details_div)

    with open(file, 'w', encoding="utf-8") as f:
        f.write(new)    

def generate_images_html(img_path, legenda):
    res =f"""
            <div class="figure">
                <img src="{img_path}" />
        """
    if legenda:
        res += f"<h6>{legenda}</h6>"
    res += "</div>\n"
    return res

def generate_house(house):

    num = house.find(".//número").text
    enfiteuta_element = house.find(".//enfiteuta")
    enfiteuta = enfiteuta_element.text if enfiteuta_element is not None else "Unknown"

    foro_element = house.find(".//foro")
    foro = foro_element.text if foro_element is not None else "Unknown"

    desc_element = house.find(".//desc")
    desc = ET.tostring(desc_element, encoding='unicode', method='text').strip() if desc_element is not None else "Unknown"

    res =f"""
            <div class="house">
                <p><b>Número:</b> {num}</p>
                <p><b>Enfiteuta:</b> {enfiteuta}</p>
                <p><b>Foro:</b> {foro}</p>
                <p><b>Descrição:</b></p>
                <p>{desc}</p>
            </div>
        """
    return res

def generate_houses_html(houses):
    list = houses.findall(".//casa")
    res = ""
    for house in list:
        res += generate_house(house)
    return res
               
