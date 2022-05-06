# from flask import Blueprint
#
# blue = Blueprint("first_blue",__name__)
#
# def init_first_blue(App):
#     App.register_blueprint(blueprint=blue)
#
# @blue.route('/')
# def index():
#     return 'Flask Index'
# =========================================分割线========================================================

# 引入hashlib，即摘要算法，可以对密码进行MD5加密
import hashlib
# 在这个user中依次引入Blueprint（蓝图，用于子系统的分离）、render_template（模板渲染）、
# session（用户对话）、redirect（重定向）、url_for（Flask中提供的URL生成函数）
from flask import Flask, Blueprint, render_template, session, redirect, url_for, request, Response
# 这里注意要导入models中的models，而不是extends中的models
from App.models import db, Room, Order
from datetime import datetime
# 申明一个蓝图对象user
roomblue = Blueprint('roomblue', __name__)

# 配置路由
# 用户修改自己的个人信息
@roomblue.route('/smartroom/roommoney', methods=['POST', 'GET'])
def roommoney():
    item = session.get('user')
    roomid = item.get("roomid")
    userid = item.get('id')
    room = Room.query.filter(Room.roomid == roomid).first()

    if request.method == 'GET':
        return render_template('smartroom/roommoney.html',room = room)

# qqt
    else:
        order = Order()
        order.orderid = order.query.count() + 1

        if request.form.get('roommoney_lightlave') != None:
            order.lightcost = request.form.get('roommoney_lightlave')
            room.lightlave = int(room.lightlave) + int(request.form.get('roommoney_lightlave'))

        if request.form.get('roommoney_waterlave') != None:
            order.watercost = request.form.get('roommoney_waterlave')
            room.waterlave = int(room.waterlave) + int(request.form.get('roommoney_waterlave'))
        order.orderdate = datetime.now()
        order.id = userid
        db.session.add(order)
        db.session.add(room)
        db.session.commit()

        return render_template('smartroom/roommoney.html',room = room)
