from model import Inventory
import motor.motor_asyncio

client =motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')

database = client.InventoryManagement
collection = database.Inventory



async def fetch_all_inventory():
    inventorys=[]
    cursor=collection.find({})
    async for document in cursor:
        inventorys.append(Inventory(**document))
    return inventorys

    
async def fetch_all_inventory():
    inventorys=[]
    cursor=collection.find({})
    async for document in cursor:
        inventorys.append(Inventory(**document))
    return inventorys

async def create_inventory(inventory):
    document = inventory
    result = await collection.insert_one(document)
    return document

async def update_inventory(uid,title,category,description,quantity,price):
    print("This",uid)
    await collection.update_one({"uid":uid},{"$set":{
        "title":title,
        "category":category,
        "description":description,
        "quantity":quantity,
        "price":price
    }})
    
    document = await collection.find_one({"uid":uid})
    print(document)
    return document

async def remove_inventory(uid):
    a = await collection.delete_one({"uid":uid})
    return True