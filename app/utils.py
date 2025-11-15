# app/utils.py
from bson import ObjectId
from typing import Dict, Any

def doc_to_dict(doc: Dict[str, Any]) -> Dict[str, Any]:
    """
    Convert MongoDB document to JSON-serializable dictionary (convert _id to id).
    """
    if not doc:
        return {}
    out = {}
    for k, v in doc.items():
        if isinstance(v, ObjectId):
            out[k] = str(v)
        else:
            out[k] = v
    # make _id -> id
    if "_id" in out:
        out["id"] = out.pop("_id")
    return out
