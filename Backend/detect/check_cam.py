import cv2
import numpy as np
from cv2 import dnn
from numpy.lib.type_check import imag
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.python.framework.ops import device
import tensorflow as tf
import base64
from datetime import datetime
import urllib.request
from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img , img_to_array
from post_data import *
from imutils.video import WebcamVideoStream
from imutils.video import FPS
# import schedule
import time
from datetime import timedelta, datetime,date
classes = ['Box_cardboard_paper', 'glass_metal_plastic', 'organic', 'other']
# img_file="/content/drive/MyDrive/garbage/Garbage classification/Garbage classification/glass_metal_plastic/Plastico_480.jpg"
# model = load_model("detect/model_mobinetv2_35_epoch.h5")

# process an image to be mobilenet friendly
# def process_image(img_path):
#   img = load_img(img_path, target_size=(224, 224))
#   img_array = img_to_array(img)
  
#   img_array = np.expand_dims(img_array, axis=0)
#   pImg = preprocess_input(img_array)
#   return pImg
url='http://192.168.31.106/cam-lo.jpg'
# def save_img(filename,img):
#   cv2.imwrite(filename,img)
cam=cv2.VideoCapture(0)
model=tf.keras.models.load_model(r'Flask_BE\detect\model_mobinetv2_35_epoch.h5')
while True:
    ret,frame=cam.read()
    # img=urllib.request.urlopen(url)
    # img_np= np.array(bytearray(img.read()),dtype=np.uint8)
    # frame=cv2.imdecode(img_np,-1)
    boxes=[[0,0,280,280]]
    if boxes is not None:
      # print(boxes)
      for (x,y,w,h) in boxes:
          img=frame[y+5:h+5, x+15:w+10]
          img = cv2.resize(img,(256,256))
          
          # schedule.every(2).seconds.do(save_img,filename=file_name,img=img)
        #   img = load_img(img_path, target_size=(224, 224))
        #   img_array = img_to_array(img)
          
        #   img_array = np.expand_dims(img_array, axis=0)
        #   print(img)
        #   pImg = preprocess_input(img_array)


        # # process the test image
        #   # pImg = process_image(img_array)

        #   # make predictions on test image using mobilenet
        #   prediction = model.predict(pImg)
        #   prediction=prediction[0]

        #   predicted_class = np.argmax(prediction[0], axis=-1)
        #   pro=prediction[predicted_class]
        #   s=str(predicted_class)+"    xsuat"+ str(pro)
        #   print(predicted_class)
          # # print(prediction)
          # print(f"label {s}")
          # if pro>0.6:
          # # faces.append(face2)
          # label=None
          # pred = model.predict(face2)
          # idx_max = np.argmax(pred[0])
          # class_names = ['Angry','Fear','Happy','Neutral']
          # cv2.putText(frame, class_names[idx_max], (x+5, y-15),cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)
          # label=class_names[idx_max]
          # # if label is not None:
          #     # schedule.every(10).minutes.do(up_data(id_cam,face2,label,device))
          # print(label)

        #   up_data(5,face,label)
          # print(data)

          # filename = str(datetime.now())+'.jpg'
          # with open(filename,"wb") as f:
          #     f.write(base64.b64decode(data['image'].encode('utf-8')))
          cv2.rectangle(frame, (x+10,y+5), (w+10,h+5), (255,0,0), 2)
          # cv2.putText(frame, s , (x+5, y-15),cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)
          camera_run(1,img,1)

      
    cv2.imshow("frame", frame)
    if cv2.waitKey(10) & 0xFF == ord('q'):
            break
# cam.release()
cv2.destroyAllWindows()