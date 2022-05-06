# qqt
from flask import Flask, Blueprint, render_template, session, redirect, url_for, request, Response
from datetime import datetime
from App.models import db,  Pet

petblue = Blueprint('petblue', __name__)
@petblue.route('/smartroom/roompet', methods = ['POST','GET'])
def roompet():
    item = session.get('user')
    print(item)
    petid = item.get('petid')
    print(petid)
    pet = Pet.query.filter_by(petid = petid).first()
    print(pet)
    print(pet.FeedTime)
    if request.method == 'GET':
        nowtime =datetime.now();
        print((nowtime - pet.FeedTime).seconds)
        if ((nowtime - pet.FeedTime).seconds > pet.Feedinginterval):
            pet.starvation = "hungry"
        return render_template('smartroom/roompet.html', pet = pet)
    else:

        # print("fuck")
        # print(pet.starvation)
        if(pet.starvation =="hungry"):
            pet.starvation = "full"
        pet.FeedTime = datetime.now()

        db.session.add(pet)
        db.session.commit(

        )
        return render_template('smartroom/roompet.html', pet = pet)


