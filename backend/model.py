from pydantic import BaseModel

class Inventory(BaseModel):
    uid:str
    title: str
    category: str
    description: str
    quantity: int
    price: float
    