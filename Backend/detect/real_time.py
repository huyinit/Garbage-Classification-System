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
import time
# import schedule
import time
from datetime import timedelta, datetime,date
classes = ['Box_cardboard_paper',  'glass_metal_plastic', 'organic','other']
# img_file="/content/drive/MyDrive/garbage/Garbage classification/Garbage classification/glass_metal_plastic/Plastico_480.jpg"
# model = load_model("detect/model_mobinetv2_35_epoch.h5")

# process an image to be mobilenet friendly
# def process_image(img_path):
#   img = load_img(img_path, target_size=(224, 224))
#   img_array = img_to_array(img)
  
#   img_array = np.expand_dims(img_array, axis=0)
#   pImg = preprocess_input(img_array)
#   return pImg
# http://192.168.201.117
#   /cam-lo.jpg
#   /cam-hi.jpg
#   /cam-mid.jpg

url='http://192.168.201.117/cam-lo.jpg'
def save_img(filename,img):
  cv2.imwrite(filename,img)
# cam=cv2.VideoCapture(0)
model=tf.keras.models.load_model(r'BE\detect\model_mobinetv2_easy75.h5')

while True:
    # ret,frame=cam.read()
    img=urllib.request.urlopen(url)
    img_np= np.array(bytearray(img.read()),dtype=np.uint8)
    frame=cv2.imdecode(img_np,-1)
    box=[5,5,260,220]
    if box is not None:
      (x,y,w,h) =box[0],box[1], box[2],box[3]
      img=frame[y:h, x:w]
      img1 = cv2.resize(img,(224,224))
      img2 = cv2.resize(img,(256,256))
      img_array = np.expand_dims(img1, axis=0)
      pImg = preprocess_input(img_array)
      
      prediction = model.predict(pImg)
      prediction=prediction[0]
      predicted_class = np.argmax(prediction, axis=-1)
      pro=prediction[predicted_class]
      # s=str(predicted_class)+"    xsuat"+ str(pro)
      
      s="Label: {}".format(str(classes[predicted_class]))
      s2="Pro: {}".format(str(pro))

      print(prediction)
      print(f"label {s}")
      if (pro>0.5 and predicted_class!=3) or (0.5<pro<0.8 and predicted_class==3):
      
        #.....
        cv2.rectangle(frame, (x,y), (w,h), (255,0,0), 2)
        cv2.putText(frame, s , (x+5, y+15),cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)
        cv2.putText(frame, s2, (x+35, y+45),cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)
        print(f"predict class: {predicted_class}")
        print(f"img2: {img2}")
        camera_run(1,img2,0)
      # camera_run(1,img2,1)

      # time.sleep(0.5)  
    cv2.imshow("frame", frame)
    if cv2.waitKey(10) & 0xFF == ord('q'):
            break
# cam.release()
cv2.destroyAllWindows()