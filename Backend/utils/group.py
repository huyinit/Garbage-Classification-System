def group_post(ngay):
    bin_1={"NhanRac":"box_cardboard_paper","KhoiLuong":0,"AnhRac": 0}
    kl_1,kl_2,kl_3,kl_4=0,0,0,0
    bin_2={"NhanRac":"glass_metal_plastic","KhoiLuong":0,"AnhRac": 0}
    bin_3={"NhanRac":"organic","KhoiLuong":0,"AnhRac": 0}
    bin_4={"NhanRac":"other","KhoiLuong":0,"AnhRac": 0}
    newngay=[]
    for d in ngay:
        if d["TenNhan"]=="box_cardboard_paper":
            bin_1['AnhRac']=d['AnhRac']
            bin_1["KhoiLuong"]+=d["KhoiLuong"]
        elif d["TenNhan"]=="glass_metal_plastic":
            bin_2['AnhRac']=d['AnhRac']
            bin_2["KhoiLuong"]+=d["KhoiLuong"]
        elif d["TenNhan"]=="organic":
            bin_3['AnhRac']=d['AnhRac']
            bin_3["KhoiLuong"]+=d["KhoiLuong"]
        else: 
            bin_4['AnhRac']=d['AnhRac']
            bin_4["KhoiLuong"]+=d["KhoiLuong"]
    newngay.append(bin_1)
    newngay.append(bin_2)
    newngay.append(bin_3)
    newngay.append(bin_4)
    return newngay
def group_get(lskhuvuc):
    bin_1={"NhanRac":"box_cardboard_paper","KhoiLuong":0,"ID_khoangrac":-1, "AnhRac": 0}
    kl_1,kl_2,kl_3,kl_4=0,0,0,0
    bin_2={"NhanRac":"glass_metal_plastic","KhoiLuong":0, "ID_khoangrac":-1, "AnhRac":0}
    bin_3={"NhanRac":"organic","KhoiLuong":0, "ID_khoangrac":-1, "AnhRac":0}
    bin_4={"NhanRac":"other","KhoiLuong":0 ,"ID_khoangrac":-1 , "AnhRac":0}
    newngay=[]
    for d in lskhuvuc:
        if d["TenNhan"]=="box_cardboard_paper":
            # bin_1['AnhRac']=d['AnhRac']
            bin_1['ID_khoangrac']=d['ID_khoangrac']
            bin_1["KhoiLuong"]+=d["KhoiLuong"]
        elif d["TenNhan"]=="glass_metal_plastic":
            # bin_2['AnhRac']=d['AnhRac']
            bin_2['ID_khoangrac']=d['ID_khoangrac']
            bin_2["KhoiLuong"]+=d["KhoiLuong"]
        elif d["TenNhan"]=="organic":
            # bin_3['AnhRac']=d['AnhRac']
            bin_3["KhoiLuong"]+=d["KhoiLuong"]
            bin_3['ID_khoangrac']=d['ID_khoangrac']
        else: 
            # bin_4['AnhRac']=d['AnhRac']
            bin_4['ID_khoangrac']=d['ID_khoangrac']
            bin_4["KhoiLuong"]+=d["KhoiLuong"]
    newngay.append(bin_1)
    newngay.append(bin_2)
    newngay.append(bin_3)
    newngay.append(bin_4)
    return newngay
def group_img(img):
    bin_1={"NhanRac":"box_cardboard_paper","ID_khoangrac":-1, "AnhRac": 0}
    bin_2={"NhanRac":"glass_metal_plastic","ID_khoangrac":-1, "AnhRac": 0}
    bin_3={"NhanRac":"organic","ID_khoangrac":-1, "AnhRac": 0}
    bin_4={"NhanRac":"other","ID_khoangrac":-1, "AnhRac": 0}

    img1,img2,img3,img4=[],[],[],[]
    newimg=[]
    for i in img:
        if i[2]=="box_cardboard_paper":
            # bin_1['AnhRac']=d['AnhRac']
            bin_1['ID_khoangrac']=i[0]
            img1.append(i[1])
        elif i[2]=="glass_metal_plastic":
            bin_2['ID_khoangrac']=i[0]
            img2.append(i[1])
        elif i[2]=="organic":
            bin_3['ID_khoangrac']=i[0]
            img3.append(i[1])
        else: 
            bin_4['ID_khoangrac']=i[0]
            img4.append(i[1])
    if len(img1)!=0:
        bin_1['AnhRac']=img1
    if len(img2)!=0:
        bin_2['AnhRac']=img2
    if len(img3)!=0:
        bin_3['AnhRac']=img3
    if len(img4)!=0:
        bin_4['AnhRac']=img4
    newimg.append(bin_1)
    newimg.append(bin_2)
    newimg.append(bin_3)
    newimg.append(bin_4)
    return newimg
