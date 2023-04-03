import base64
import os
# import datetime
# from ODT import ObjectDetection
from db.db import mysql
from flask import Flask, jsonify, render_template, redirect,url_for,request,Blueprint, flash, session
from datetime import timedelta, datetime,date
import cv2
import urllib.request
import numpy as np
import json
from utils.group import *
web=Blueprint('web',__name__)

# web.permanent_session_lifetime = timedelta(minutes=1)
@web.route("/")
@web.route("/home", methods=['GET','POST'])
def home():
    if request.method=='GET':
        """
        Get all information in all trash
        
        """
        cur=mysql.get_db().cursor()
        cur.execute("select Id_thungrac,ViTriThungRac from thungrac")
        listvitri=cur.fetchall()
        cur.execute("select khoangrac.ID_khoangrac, thungrac.ID_Thungrac, TenNhan, ViTriThungRac ,KhoiLuong,SoLanDo from ractrongkhoang,khoangrac, thungrac where thungrac.ID_thungrac=khoangrac.ID_Thungrac and khoangrac.ID_khoangrac=ractrongkhoang.ID_khoangrac and NgayRacVao>NgayDoRac order by thungrac.ID_Thungrac")
        khoangrac=cur.fetchall()
        print(f"khoangrac: {khoangrac}")
        if khoangrac is not None:
            dict_vitri=[]
            for id_khoangrac in listvitri:
                vt={}
                lskhuvuc=[]
                vt["ID_thungrac"]=id_khoangrac[0]
                vt["ViTriThungRac"]=id_khoangrac[1]
                kt=False
                dict_1={}
                for i in khoangrac:
                    if i[1]==id_khoangrac[0]:
                        # print(i[1])
                        dictkhuvuc={}
                        dictkhuvuc["ID_khoangrac"]=i[0]
                        # dictkhuvuc["ID_Thungrac"]=i[1]
                        dictkhuvuc['TenNhan']=i[2]
                        # dictkhuvuc['ViTriThungRac']=i[3]
                        # dictkhuvuc['SoLanDo']=i[4]
                        dictkhuvuc['KhoiLuong']=i[4]
                        lskhuvuc.append(dictkhuvuc)
                        # lskhuvuc=group_post(lskhuvuc)
                        # lskhuvuc.append()
                        kt=True
                print(lskhuvuc)
                if kt==True:
                    lskhuvuc=group_get(lskhuvuc)
                    vt['Khoangrac']=lskhuvuc
                    print(lskhuvuc)
                else:
                    lskhuvuc=group_get(lskhuvuc)
                    vt['Khoangrac']=lskhuvuc
                dict_vitri.append(vt)
            # print(lskhuvuc)
            # lskhuvuc=set(lskhuvuc)
            return jsonify({"status":"success","listkhuvuc":dict_vitri})
        else: return jsonify({"status":"faled","msg":"Does not exist"})
    if request.method=='POST':
        location=request.form['location']
        start_time=request.form['start_time']
        end_time=request.form['end_time']
        cur=mysql.get_db().cursor()
        if start_time and end_time and start_time<end_time:
            cur.execute(f"select NgayRacVao, KhoiLuong, TenNhan, ViTriThungRac, AnhRac from ractrongkhoang ,khoangrac, thungrac where thungrac.ID_thungrac='{location}' and thungrac.ID_Thungrac=khoangrac.ID_Thungrac and khoangrac.ID_khoangrac=ractrongkhoang.ID_khoangrac and NgayRacVao>='{start_time}' and NgayRacVao<='{end_time}' order by ractrongkhoang.NgayRacVao")
            db=cur.fetchall()
            if db is not None:
                dir_time=[]
                valuetime=db[0][0].strftime("%Y-%m-%d")
                ngay=[]
                for i in db:
                    ls_time={}
                    all_day={}
                    tm=i[0].strftime("%Y-%m-%d")
                    print(type(i))
                    if tm==valuetime:
                        ls_time['KhoiLuong']=i[1]
                        ls_time['TenNhan']=i[2]
                        ls_time["AnhRac"]=i[4]
                        ngay.append(ls_time)
                    else: 
                        ngay=group_post(ngay)
                        
                        # dir_time[valuetime]=ngay
                        all_day['Ngay']=valuetime
                        all_day['Rac']=ngay
                        dir_time.append(all_day)
                        ngay=[]
                        ls_time['KhoiLuong']=i[1]
                        ls_time['TenNhan']=i[2]
                        ls_time["AnhRac"]=i[4]
                        ngay.append(ls_time)
                        valuetime=tm
                       
                ngay=group_post(ngay)
                
                all_day['Ngay']=valuetime
                all_day['Rac']=ngay
                dir_time.append(all_day)
                print(dir_time)
                return jsonify({"status":"success","data": dir_time})
            else: return jsonify({"status":"failed", "mess":"lost date"})
        else: return jsonify({"status":"failed","mess":"khong co ngay"})


@web.route('/reset/<id_thungrac>/<id_khoangrac>',methods=['GET'])
def reset(id_thungrac,id_khoangrac):
    """
    reset KhoiLuong=0 and SoLanDo + 1
    """
    if request.method=='GET':
        id_thungrac=id_thungrac
        id_khoangrac=id_khoangrac
        # print(SoLanDo)
        print(id_khoangrac)
        print(id_thungrac)
        cur=mysql.get_db().cursor()
        cur.execute(f"select SoLanDo from khoangrac where ID_Thungrac='{id_thungrac}' and ID_khoangrac='{id_khoangrac}'")
        SoLanDo=cur.fetchall() 
        sl=SoLanDo[0][0]+1
        print(sl)
        lstime=str(datetime.now()).split(" ")
        time=lstime[0]
        print(time)

        cur.execute(f"update khoangrac set NgayDoRac='{time}',SoLanDo='{sl}' where ID_Thungrac='{id_thungrac}' and ID_khoangrac='{id_khoangrac}'")
        mysql.get_db().commit()
     
        return jsonify({"Status":"Success"})
@web.route("/push_from_AI",methods=['POST'])
def push_data():
    if request.method=='POST':
        try:
            data=request.get_json()
            # print(f"data: {data}")
            id_Thungrac=data['ID_Thungrac']
            TenNhan=data['TenNhan']
            AnhRac=data['AnhRac']
            NgayRacVao=datetime.now()

            directory = str(date.today())
            directory = str(date.today())
            # Parent Directory path
            parent_dir = os.getcwd()
            # Path
            # path = parent_dir+"\\"+"static"+"\\"+"images"+"\\"+directory
            path="..\\FE\my-app\src\images"
            # FE\my-app\src\images
            try:
                os.mkdir(path)
            except:
                print('Folder exist!')
            print(f"parent_dir: {parent_dir}")
            # print(f"TenNhan : {TenNhan}")
            dict_label={0:"box_cardboard_paper",1:"glass_metal_plastic",2:"organic",3:"other"}
            TenNhan=dict_label[TenNhan]
            # Process base64 string
            filename = str(datetime.now())
            specialChars = "!#$%^&*():.- "
            for specialChar in specialChars:
                filename = filename.replace(specialChar, '')

            url_save_to_db = filename+".jpg"
            print(f"url_save_to_db: {url_save_to_db}")
            url_img = path+"\\"+filename
            url_img += '.jpg'
            print(f"url_img: {url_img}")
            with open(url_img, "wb") as f:
                f.write(base64.b64decode(AnhRac.encode('utf-8')))
            cur=mysql.get_db().cursor()
            cur.execute(f"select ID_khoangrac from thungrac, khoangrac where thungrac.ID_thungrac=khoangrac.ID_Thungrac and thungrac.ID_thungrac='{id_Thungrac}' and TenNhan='{TenNhan}'")
            khoangrac=cur.fetchall()
            id_khoangrac=khoangrac[0][0]
            print(f"id_khoangrac {id_khoangrac}")
            print(f"url_save {url_save_to_db}")
            print(f"NgayRacVao {NgayRacVao}")
            cur.execute(f"INSERT INTO ractrongkhoang (ID_khoangrac,AnhRac,NgayRacVao, KhoiLuong) VALUES ('{id_khoangrac}','{url_save_to_db}','{NgayRacVao}', '10');")
            mysql.get_db().commit()
            return jsonify({"ID_thungrac":id_Thungrac,'ID_khoangrac':id_khoangrac,"AnhRac":AnhRac,"NgayRacVao":NgayRacVao,"TenNhan":TenNhan})
        except Exception as e:
            print(e)
            return jsonify({"status":"failed","msg":str(e)})

@web.route("/get_img",methods=['POST'])
def get_img():
    if request.method=='POST':
        start_time=request.form['start_time']
        end_time=request.form['end_time']
        location=request.form['location']
        cur=mysql.get_db().cursor()
        if start_time and end_time and start_time<=end_time:
            cur.execute(f"SELECT khoangrac.ID_khoangrac,AnhRac,TenNhan FROM iot.ractrongkhoang, khoangrac,thungrac where thungrac.ID_Thungrac='{location}' and  thungrac.ID_thungrac=khoangrac.ID_Thungrac and khoangrac.ID_khoangrac=ractrongkhoang.ID_khoangrac and NgayRacVao>=NgayDoRac and NgayRacVao>='{start_time}' and NgayRacVao<='{end_time}' order by khoangrac.ID_khoangrac")
            img=cur.fetchall()
            print(f"img: {img}")
            if img is not None:
                new_img=group_img(img)
                return jsonify({"status":"success","data":new_img})
            else: return jsonify({"status":"failed","msg":"database None"})
        else: return jsonify({"status":"failed","msg":"validate time"})
                
