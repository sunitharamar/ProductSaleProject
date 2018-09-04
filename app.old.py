# import necessary libraries
import pandas as pd

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import (
    Flask,
    render_template,
    jsonify)

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

# @app.route("/names")
# def names():
# data = getSampleList()
 #return  jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)