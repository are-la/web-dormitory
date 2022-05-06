# qqt
from flask import Flask, Blueprint, render_template, session, redirect, url_for, request, Response
from App.models import db,Order
orderblue = Blueprint('orderblue',__name__)
@orderblue.route('/myinfo/mymoney',methods=['POST','GET'])
def mymoney():
    item = session.get('user')
    userid = item.get('id')
    print(userid)
    print(Order.query.filter(Order.id == userid).all())
    orders = Order.query.filter(Order.id == userid).all()
    print(orders)

    return render_template('myinfo/mymoney.html',orders = orders)
