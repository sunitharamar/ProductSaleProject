# import necessary libraries
import pandas as pd

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import (
    Flask,
    render_template,
    jsonify)

# from mysql.connector import (connection)
#cnx = connection.MySQLConnection(user='root', password='James007',
                                #host='localhost',
                                #database='prosaledata')
import mysql.connector
cnx = mysql.connector.connect(user='root', password='12345',
                              host='localhost',
                              database='prosaledata')

df_ora = pd.read_sql("SELECT * FROM saletran",con=cnx)


app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/inner/")
@app.route("/inner/<name>")
def index_files(name):
    return render_template("index_Products-Categories.html")


@app.route("/products/")
@app.route("/products/<name>")
def products(name):
    return render_template("index_TopBottom-Products.html")

@app.route("/topProducts")
def top_products():
    df = pd.read_sql("SELECT SOLD_UNITS, saletran.UNIT_PRICE, product.PRODUCTDESCRIPTION FROM saletran\
                        INNER JOIN product ON saletran.PRODUCT_CODE = product.PRODUCT_CODE",con=cnx)
    df["Total Revenue"] = df["SOLD_UNITS"] * df["UNIT_PRICE"]
    data = df.groupby("PRODUCTDESCRIPTION").sum().sort_values("Total Revenue", ascending=False).head()
    data = data.drop(["SOLD_UNITS", "UNIT_PRICE"], axis=1)

    return data.to_json(orient="split")

@app.route("/bottomProducts")
def bottomProducts():
    df = pd.read_sql("SELECT SOLD_UNITS, saletran.UNIT_PRICE, product.PRODUCTDESCRIPTION FROM saletran\
                        INNER JOIN product ON saletran.PRODUCT_CODE = product.PRODUCT_CODE",con=cnx)
    df["Total Revenue"] = df["SOLD_UNITS"] * df["UNIT_PRICE"]
    data = df.groupby("PRODUCTDESCRIPTION").sum().sort_values("Total Revenue", ascending=True).head()
    data = data.drop(["SOLD_UNITS", "UNIT_PRICE"], axis=1)
    return data.to_json(orient="split")

@app.route("/topStates")
def top_states():
    df = pd.read_sql("SELECT SOLD_UNITS, UNIT_PRICE, distributer.SHIP_STATE FROM saletran\
                        INNER JOIN distributer ON saletran.CUSTOMER_ID = distributer.CUSTOMER_ID",con=cnx)
    df["Total Revenue"] = df["SOLD_UNITS"] * df["UNIT_PRICE"]
    data = df.groupby("SHIP_STATE").sum().sort_values("Total Revenue", ascending=False).head()
    data = data.drop(["SOLD_UNITS", "UNIT_PRICE"], axis=1)
    return data.to_json(orient="split")

@app.route("/bottomStates")
def bottom_states():
    df = pd.read_sql("SELECT SOLD_UNITS, UNIT_PRICE, distributer.SHIP_STATE FROM saletran\
                        INNER JOIN distributer ON saletran.CUSTOMER_ID = distributer.CUSTOMER_ID",con=cnx)
    df["Total Revenue"] = df["SOLD_UNITS"] * df["UNIT_PRICE"]
    data = df.groupby("SHIP_STATE").sum().sort_values("Total Revenue", ascending=True).head()
    data = data.drop(["SOLD_UNITS", "UNIT_PRICE"], axis=1)
    return data.to_json(orient="split")

@app.route("/topZips")
def top_zips():
    df = pd.read_sql("SELECT SOLD_UNITS, UNIT_PRICE, distributer.SHIP_ZIP FROM saletran\
                        INNER JOIN distributer ON saletran.CUSTOMER_ID = distributer.CUSTOMER_ID",con=cnx)
    df["Total Revenue"] = df["SOLD_UNITS"] * df["UNIT_PRICE"]
    data = df.groupby("SHIP_ZIP").sum().sort_values("Total Revenue", ascending=False).head()
    data = data.drop(["SOLD_UNITS", "UNIT_PRICE"], axis=1)
    return data.to_json(orient="split")

@app.route("/bottomZips")
def bottom_zips():
    df = pd.read_sql("SELECT SOLD_UNITS, UNIT_PRICE, distributer.SHIP_ZIP FROM saletran\
                        INNER JOIN distributer ON saletran.CUSTOMER_ID = distributer.CUSTOMER_ID",con=cnx)
    df["Total Revenue"] = df["SOLD_UNITS"] * df["UNIT_PRICE"]
    data = df.groupby("SHIP_ZIP").sum().sort_values("Total Revenue", ascending=True).head()
    data = data.drop(["SOLD_UNITS", "UNIT_PRICE"], axis=1)
    return data.to_json(orient="split")



@app.route("/pivotdemo/")
@app.route("/pivotdemo/<name>")
def pivotdemo(name):  
    return render_template("indexpivottable.html")


@app.route("/bar")
def barreport(): 
    # = "data/saleonly1.csv"
    return render_template("indexbar_Sales-per-Product.html")

@app.route("/combine/")
@app.route("/combine/<name>")
def combine(name): 
    # = "data/saleonly1.csv"
    return render_template("index_Sales-per-Product.html")



if __name__ == "__main__":
    app.run(debug=True)



