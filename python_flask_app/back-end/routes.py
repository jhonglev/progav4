from config import *
from models import Sapato


@app.route("/")
def index():
    return "<a href='/pagina_principal'>Listar Sapatos</a>"

@app.route("/pagina_principal")
def pagina_principal():
    sapatos = db.session.query(Sapato).all()
    json_sapatos = [x.json() for x in sapatos]
    resposta = jsonify(json_sapatos)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


@app.route("/incluir_sapato", methods=["POST"])
def incluir_sapato():
    resposta = jsonify({"status": "passou",
                      "detalhes": "nenhum detalhe"})
    data_post = request.get_json()
    try:
        new = Sapato(**data_post)
        db.session.add(new)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"status": "erro",
                          "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/excluir_sapato/<int:sapato_id>", methods=["DELETE"])
def excluir_sapato(sapato_id):
    resposta = jsonify({"status": "passou",
                      "detalhes": "nenhum detalhe"})
    try:
        Sapato.query.filter(Sapato.id==sapato_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"status": "erro",
                          "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta