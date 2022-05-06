# qqt
from flask import Flask, Blueprint, render_template, session, redirect, url_for, request, Response
from App.models import db,  Plant
from datetime import  datetime
plantblue = Blueprint('plantblue',__name__)
@plantblue.route('/smartroom/roomworld', methods = ['POST','GET'])
def roomplant():
    item = session.get('user')
    print(item)
    plantid = item.get('plantid')
    print(plantid)
    plant = Plant.query.filter_by(plantid = plantid).first()
    if request.method == 'GET':
        nowtime = datetime.now();
        # print((nowtime - pet.FeedTime).seconds)
        if ((nowtime - plant.watertime).seconds > plant.waterinterval):
            plant.water = "water shortage"
        return render_template('smartroom/roomworld.html', plant = plant)
    else:
        # print("fuck")
        # print(pet.starvation)
        if(plant.water =="water shortage"):
             plant.water = "full"
        plant.watertime = datetime.now()
        db.session.add(plant)
        db.session.commit()
        return render_template('smartroom/roomworld.html', plant = plant)