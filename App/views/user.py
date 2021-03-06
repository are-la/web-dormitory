from __future__ import print_function

import time
import numpy as np
import argparse
import cv2
import os
import shutil


def nms(boxes, probs=None, overlapThresh=0.3):
    # if there are no boxes, return an empty list
    if len(boxes) == 0:
        return []

    # if the bounding boxes are integers, convert them to floats -- this
    # is important since we'll be doing a bunch of divisions
    if boxes.dtype.kind == "i":
        boxes = boxes.astype("float")

    # initialize the list of picked indexes
    pick = []

    # grab the coordinates of the bounding boxes
    x1 = boxes[:, 0]
    y1 = boxes[:, 1]
    x2 = boxes[:, 2]
    y2 = boxes[:, 3]

    # compute the area of the bounding boxes and grab the indexes to sort
    # (in the case that no probabilities are provided, simply sort on the
    # bottom-left y-coordinate)
    area = (x2 - x1 + 1) * (y2 - y1 + 1)
    idxs = y2

    # if probabilities are provided, sort on them instead
    if probs is not None:
        idxs = probs

    # sort the indexes
    idxs = np.argsort(idxs)

    # keep looping while some indexes still remain in the indexes list
    while len(idxs) > 0:
        # grab the last index in the indexes list and add the index value
        # to the list of picked indexes
        last = len(idxs) - 1
        i = idxs[last]
        pick.append(i)

        # find the largest (x, y) coordinates for the start of the bounding
        # box and the smallest (x, y) coordinates for the end of the bounding
        # box
        xx1 = np.maximum(x1[i], x1[idxs[:last]])
        yy1 = np.maximum(y1[i], y1[idxs[:last]])
        xx2 = np.minimum(x2[i], x2[idxs[:last]])
        yy2 = np.minimum(y2[i], y2[idxs[:last]])

        # compute the width and height of the bounding box
        w = np.maximum(0, xx2 - xx1 + 1)
        h = np.maximum(0, yy2 - yy1 + 1)

        # compute the ratio of overlap
        overlap = (w * h) / area[idxs[:last]]

        # delete all indexes from the index list that have overlap greater
        # than the provided overlap threshold
        idxs = np.delete(idxs, np.concatenate(([last],
                                               np.where(overlap > overlapThresh)[0])))

    # return only the bounding boxes that were picked
    return boxes[pick].astype("int")


image_types = (".jpg", ".jpeg", ".png", ".bmp", ".tif", ".tiff")


def list_images(basePath, contains=None):
    # return the set of files that are valid
    return list_files(basePath, validExts=image_types, contains=contains)


def list_files(basePath, validExts=None, contains=None):
    print(basePath+">>>")
    # loop over the directory structure
    for (rootDir, dirNames, filenames) in os.walk(basePath):
        # loop over the filenames in the current directory
        for filename in filenames:
            # if the contains string is not none and the filename does not contain
            # the supplied string, then ignore the file
            if contains is not None and filename.find(contains) == -1:
                continue
            # determine the file extension of the current file
            ext = filename[filename.rfind("."):].lower()
            # check to see if the file is an image and should be processed
            if validExts is None or ext.endswith(validExts):
                # construct the path to the image and yield it
                imagePath = os.path.join(rootDir, filename)
                print("finally ===> "+ imagePath)
                yield imagePath


def remove_file(old_path, new_path):
    print(old_path)
    print(new_path)
    filelist = os.listdir(old_path)  # ?????????????????????????????????,listdir?????????????????????????????????????????????
    print(filelist)
    for file in filelist:
        src = os.path.join(old_path, file)
        dst = os.path.join(new_path, file)
        print('src:', src)
        print('dst:', dst)
        shutil.move(src, dst)


def resize(image, width=None, height=None, inter=cv2.INTER_AREA):
    dim = None
    (h, w) = image.shape[:2]
    # ??????????????????None???????????????
    if width is None and height is None:
        return image
    # ??????????????????None
    if width is None:
        # ???????????????????????????????????????????????????
        r = height / float(h)
        dim = (int(w * r), height)
    # ??????None
    else:
        # ????????????????????????????????????
        r = width / float(w)
        dim = (width, int(h * r))
    resized = cv2.resize(image, dim, interpolation=inter)
    # return the resized image
    return resized


def solve():
# if __name__ == '__main__':
    # construct the argument parse and parse the arguments
    # ap = argparse.ArgumentParser()
    # ap.add_argument("-i", "--images", default='test1', help="path to images directory")
    # args = [".\images\\"]
    # ????????? HOG ?????????/???????????????
    hog = cv2.HOGDescriptor()
    hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())

    print("?????")
    # loop over the image paths
    idx = 0
    for imagePath in list_images("D:\Projects\GithubProjects\dormitory-software\HouseBrain-Lite\App\images\\"):
        print(str(idx)+" ++++++++++++++++++++")
        idx += 1
        print(imagePath)
        print("!!!")
        # ?????????????????????????????????
        # ???1?????????????????????
        # ???2?????????????????????
        image = cv2.imread(imagePath)
        image = resize(image, width=min(400, image.shape[1]))
        orig = image.copy()
        print(image)
        # detect people in the image
        (rects, weights) = hog.detectMultiScale(image, winStride=(4, 4),
                                                padding=(8, 8), scale=1.05)
        # draw the original bounding boxes
        print(rects)
        for (x, y, w, h) in rects:
            cv2.rectangle(orig, (x, y), (x + w, y + h), (0, 0, 255), 2)
        # ????????????????????????????????????????????????????????????????????????????????????????????????????????????
        rects = np.array([[x, y, x + w, y + h] for (x, y, w, h) in rects])
        pick = nms(rects, probs=None, overlapThresh=0.65)
        # draw the final bounding boxes
        for (xA, yA, xB, yB) in pick:
            cv2.rectangle(image, (xA, yA), (xB, yB), (0, 255, 0), 2)
        # show some information on the number of bounding boxes
        filename = imagePath[imagePath.rfind("/") + 1:]
        print("[INFO] {}: {} original boxes, {} after suppression".format(
            filename, len(rects), len(pick)))
        # show the output images
        # cv2.imshow("Before NMS", orig)
        # cv2.imwrite("processed"+str(idx), orig)
        # cv2.imshow("After NMS", image)
        cv2.imwrite("../static/processed/" + str(idx) + ".jpg", image)
        cv2.waitKey(0)
        # time.sleep(2)


if __name__ == '__main__':
    solve()

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
# =========================================?????????========================================================

# ??????hashlib??????????????????????????????????????????MD5??????
import hashlib
# ?????????user???????????????Blueprint??????????????????????????????????????????render_template?????????????????????
# session?????????????????????redirect??????????????????url_for???Flask????????????URL???????????????
import os
import time

from flask import Flask, Blueprint, render_template, session, redirect, url_for, request, Response
# ?????????????????????models??????models????????????extends??????models
from App.models import db, User, Room

# ????????????????????????user
userblue = Blueprint('userblue', __name__)


# ????????????

@userblue.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        username = request.form.get('username')
        password = request.form.get('password')
        result = User.query.filter(User.username == username, User.password == password).first()
        # ?????????????????????????????????
        if result:
            # ??????????????????
            userItem = {}
            # ???????????????
            userItem['id'] = result.id
            userItem['username'] = result.username
            userItem['userpic'] = result.userpic
            userItem['roomid'] = result.roomid
            userItem['petid'] = result.petid
            userItem['plantid'] = result.plantid

            # session???http??????????????????????????????http?????????tcp?????????
            session['user'] = userItem
            # ????????????????????????Cookies??????
            # response = Response(render_template('indexmain',message='???????????????'))
            # response = Response(redirect('indexmain'))
            # response.set_cookie('username', username, max_age=7 * 24 * 3600)
            # response.set_cookie('password', password, max_age=7 * 24 * 3600)
            # return response

            # return redirect(url_for('userblue.index'))
            return render_template('index.html')

        else:
            return render_template('login.html', message='????????????????????????????????????')


# ????????????
@userblue.route('/getuser')
def getuser():
    result = User.query.filter(User.username == 'lgx').first()
    return result.username


@userblue.route('/index')
def index():
    return render_template('index.html')


@userblue.route('/account')
def account():
    return render_template('index.html')


# ????????????
@userblue.route('/logout', methods=['POST', 'GET'])
def logout():
    session.clear()
    return redirect(url_for('userblue.login'))


# ????????????
@userblue.route('/regist', methods=['POST', 'GET'])
def regist():
    user = User()
    user.username = request.form.get('regist_username')
    user.password = request.form.get('regist_password')
    user.email = request.form.get('regist_email')

    db.session.add(user)
    db.session.commit()

    return redirect(url_for('userblue.login'))


# ?????????????????????????????????
@userblue.route('/myinfo/myselect', methods=['POST', 'GET'])
def myselect():
    item = session.get('user')
    user = User.query.filter(User.username == item.get("username")).first()
    return render_template('myinfo/myselect.html', user=user)

#????????????
@userblue.route('/smartroom/roomphoto', methods=['POST', 'GET'])
def roomphoto():
    if request.method == 'GET':
        print("??????photo??????")
        return render_template('smartroom/roomphoto.html')
    else:
        print("??????????????????")
        num = request.form.get("photo_path")
        nw_photo_path = "/static/images/"+str(num)+".jpg"
        print(num)
        solve()
        new_path="/static/processed/"+str(num)+".jpg";
        return render_template('smartroom/roomnewphoto.html', origin_path=nw_photo_path, processed_path=new_path)


# ?????????????????????????????????
@userblue.route('/myinfo/myupdate', methods=['POST', 'GET'])
def myupdate():
    item = session.get('user')
    user = User.query.filter(User.username == item.get("username")).first()
    if request.method == 'GET':
        return render_template('myinfo/myupdate.html', user=user)
    else:
        user.email = request.form.get('myupdate_email')
        user.phone = request.form.get('myupdate_phone')
        user.password = request.form.get('myupdate_password')
        user.introduction = request.form.get('myupdate_introduction')
        db.session.add(user)
        db.session.commit()

        return render_template('myinfo/myupdate.html', user=user, message='????????????')


# targets ??????
@userblue.route('/smartroom/targets')
def targets():
    return render_template('smartroom/targets.html')


# roommoniter ??????
@userblue.route('/smartroom/roommoniter')
def roommoniter():
    return render_template('smartroom/roommoniter.html')


# ??????????????????
# ????????????
@userblue.route('/smartroom/human')
def human():
    return render_template('smartroom/human.html')


# ????????????
@userblue.route('/smartroom/humidity')
def humidity():
    return render_template('smartroom/humidity.html')


# ????????????
@userblue.route('/smartroom/temperature')
def temperature():
    return render_template('smartroom/temperature.html')


# hzw
# ??????????????????
@userblue.route('/smartroom/mainView')
def mainView():
    item = session.get('user')
    user = User.query.filter(User.username == item.get("username")).first()
    user1 = User.query.filter(User.username == user.roommate1).first()
    user2 = User.query.filter(User.username == user.roommate2).first()
    user3 = User.query.filter(User.username == user.roommate3).first()
    room = Room.query.filter(Room.roomid == item.get("roomid")).first()
    return render_template('smartroom/mainView.html', user=user, user1=user1, user2=user2, user3=user3, room=room)


# ??????????????????
@userblue.route('/smartroom/roomcheck', methods=['POST', 'GET'])
def roomcheck():
    item = session.get('user')
    room = Room.query.filter(Room.roomid == item.get("roomid")).first()
    if request.method == 'GET':
        return render_template('smartroom/roomcheck.html', room=room)
    else:
        room.reportinformation = request.form.get('check_reportinformation')
        db.session.add(room)
        db.session.commit()

        return render_template('smartroom/roomcheck.html', room=room, message='????????????')

