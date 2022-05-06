from App.ext import db

# 用户数据模型
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)  # 编号
    username = db.Column(db.String(100))  # 姓名【个人信息】【不可修改】

    password = db.Column(db.String(100))  # 密码

    number = db.Column(db.String(100)) # 学号【个人信息】【不可修改】
    phone = db.Column(db.String(100)) # 手机号【个人信息】
    email = db.Column(db.String(100)) # 邮箱【个人信息】
    roomid = db.Column(db.Integer)
    roomname = db.Column(db.String(100)) #寝室地址【个人信息】【不可修改】
    department = db.Column(db.String(100)) #部门名称【个人信息】【不可修改】
    myclass = db.Column(db.String(100)) #班级名称【个人信息】【不可修改】
    roommate1 = db.Column(db.String(100)) #室友一【个人信息】【不可修改】
    roommate2 = db.Column(db.String(100)) #室友二【个人信息】【不可修改】
    roommate3 = db.Column(db.String(100)) #室友三【个人信息】【不可修改】

    # hzw
    roomidentity = db.Column(db.String(100))  # 寝室身份权限

    introduction = db.Column(db.String(100)) #个人简介
    userpic = db.Column(db.String(100))  # 个人图片
    # qqt
    petid = db.Column(db.Integer)  #宠物编号
    plantid = db.Column(db.Integer) #植物编号
    orders = db.relation('Order', backref='user')

# 智慧寝室部分
class Room(db.Model):
    roomid = db.Column(db.Integer, primary_key=True)  # 编号
    roomname = db.Column(db.String(100)) # 房间名
    roomadmin = db.Column(db.String(100)) # 宿管
    roomleader = db.Column(db.String(100)) # 寝室长
    # hzw
    currentnumber = db.Column(db.Integer)  # 当前人数

    intemperature = db.Column(db.String(100)) # 室内温度
    inhumidity = db.Column(db.String(100)) # 室内湿度
    outtemperature = db.Column(db.String(100))  # 室外温度
    outhumidity = db.Column(db.String(100))  # 室外湿度

    # hzw
    equipmentstatus = db.Column(db.String(100))  # 设备损坏情况
    suspecteddamage = db.Column(db.String(100))  # 可疑损坏设备
    reportinformation = db.Column(db.String(100))  # 上报信息
    cleancondition = db.Column(db.String(100))  # 寝室卫生
    safety = db.Column(db.String(100))  # 安全程度


    waterlave = db.Column(db.Integer) # 剩余水费
    lightlave = db.Column(db.Integer) # 剩余电费

    watermoney = db.Column(db.Integer) # 水费
    lightmoney = db.Column(db.Integer) # 电费

# qqt

#宠物部分
class Pet(db.Model):
    petid = db.Column(db.Integer, primary_key=True) #宠物编号
    petname = db.Column(db.String(100)) #宠物姓名
    starvation = db.Column(db.String(100)) #饥饿状态
    birth = db.Column(db.DateTime) #出生日期
    FeedTime = db.Column(db.DateTime) #上次喂食时间
    Feedinginterval = db.Column(db.Integer) #喂食间隔时间
    petpic = db.Column(db.String(100))  # 个人图片
# qqt
#花草世界
class Plant(db.Model):
    plantid = db.Column(db.Integer,primary_key=True)
    plantname = db.Column(db.String(100)) #植物姓名
    water = db.Column(db.String(100)) #缺水状况
    watertime = db.Column(db.DateTime) #上次浇水时间
    waterinterval = db.Column(db.Integer) #浇水时间间隔
    plantpic = db.Column(db.String(100)) #植物图片
# qqt
#账单信息
class Order(db.Model):
    orderid = db.Column(db.Integer,primary_key=True) #订单编号
    # id = db.Column(db.Integer)   #用户编号
    orderdate = db.Column(db.DateTime) #订单日期
    watercost = db.Column(db.Integer) #充值水费
    lightcost = db.Column(db.Integer) #充值电费
    id = db.Column(db.Integer, db.ForeignKey('user.id'))





