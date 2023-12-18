from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uuid 
import pandas as pd
from matplotlib import pyplot as plt
from database import *
import os
import numpy as np


app = FastAPI()
origins=['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get("/api/inventory/graph")
async def get_graph():
    res = await fetch_all_inventory()
    res = map(dict,res)
    data = pd.DataFrame(res)
    grouped_category =  data.groupby(['category'])['quantity'].sum().reset_index()
    fig = plt.figure(figsize=(8,4))
    plt.barh(grouped_category['category'], grouped_category['quantity'])
    for i, value in enumerate(grouped_category['quantity']):
        plt.text(value + 3, i+0.25,str(value))
    plt.xlabel('Quantity')
    plt.ylabel('Category')
    plt.title('Category V/s Quantity')
    name = 'category-wise'+str(uuid.uuid1())+'.png'
    plt.savefig('./graphs/'+name)
    plt.close()
    path = f"graphs/{name}" 
    return FileResponse(path)

@app.get("/api/inventory/graph_pie")
async def get_graph_pie():
    res = await fetch_all_inventory()
    res = map(dict,res)
    data = pd.DataFrame(res)
    grouped_title =  data.groupby(['title'])['quantity'].sum().reset_index()
    title =list(grouped_title['title'])
    quantity = list(grouped_title['quantity'] )

    def absolute_value(val):
        a  = np.round(val/100.*sum(quantity), 0)
        return a

    plt.pie(quantity, labels = title,autopct=absolute_value, startangle = 90)
    plt.legend()
    name = 'pie'+str(uuid.uuid1())+'.png'
    plt.savefig('./graphs/'+name)
    plt.close()
    path = f"graphs/{name}" 
    return FileResponse(path)
    

@app.get("/api/inventory")
async def get_inventory():
    res = await fetch_all_inventory()
    return res

@app.post("/api/inventory",response_model=Inventory)
async def post_inventory(inventory:Inventory):
    inventory = inventory.dict()
    uid = uuid.uuid1()
    inventory['uid'] = str(uid)
    res = await create_inventory(inventory)
    if res:
        return res
    raise HTTPException(400, "Bad request, something went wrong")

@app.put("/api/inventory/{uid}",response_model=Inventory)
async def put_inventory(uid:str,data:Inventory):
    res = await update_inventory(data.uid,data.title,data.category,data.description,data.quantity,data.price)
    if res:
        return res
    raise HTTPException(400, "Bad request, something went wrong")


@app.delete("/api/inventory/{uid}")
async def delete_inventory(uid):
    if uid!="":
        res = await remove_inventory(uid)
        if res:
            return "Successfully deleted item!"
    raise HTTPException(400, "Bad request, something went wrong")