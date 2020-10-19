from config import *

class Sapato(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    modelo = db.Column(db.String(128))
    tamanho = db.Column(db.String(128))
    cor = db.Column(db.String(128))

    def __str__(self):
        return str(self.id) + ", " + \
            self.modelo + ", " + \
            self.tamanho + ", " + \
            self.cor

    def json(self):
        return {
            "id": self.id,
            "modelo": self.modelo,
            "tamanho": self.tamanho,
            "cor": self.cor
        }


if __name__ == "__main__":
    if os.path.exists(db_path):
        os.remove(db_path)
    db.create_all()
    db.session.add(Sapato(modelo="Jordan",
                          tamanho="40",
                          cor="Preto"))
    db.session.add(Sapato(modelo="Chinelo",
                          tamanho="39",
                          cor="Branco"))
    db.session.commit()