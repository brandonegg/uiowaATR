import typer
import pymongo
import pandas as pd
import numpy as np

MONGO_URL = "mongodb://localhost:27017/atr_db?replicaSet=test"
DATA_PATH = "/home/beggr/Documents/at_overview.xlsx"

def upload_to_mongo(resources, ar_col):
    ar_col.insert_many(resources)

def get_entry(row, col, default_val=np.nan):
    '''
    Parameters
    ----------
    default_val : any
        If NaN is returned for entry, default to this.
    '''
    if row.loc[col]['entry'] is np.nan:
        return default_val
    return row.loc[col]['entry']

def get_selected_options(row, col):
    return row.loc[col].dropna(inplace=False).index.to_list()

def get_range(row, col):
    return {
        "min": int(row.loc[col]['min']),
        "max": int(row.loc[col]['max'])
    }

def get_platform_links(row):
    platforms = row['Platforms:'].dropna(inplace=False)
    return [{"link": platforms[key], "platform": key} for key in platforms.index]

def main(path: str):
    df = pd.read_excel(DATA_PATH, header=[0,1])
    
    mongo_client = pymongo.MongoClient("mongodb://localhost:27017/atr_db?replicaSet=test")
    mongo_db = mongo_client["atr_db"]
    ar_col = mongo_db["AuditoryResource"]

    resources = []

    for i in range(0,len(df.index)):
        resource = {}

        resource["name"] = get_entry(df.iloc[i], 'Resource:', "n/a")
        resource["icon"] = get_entry(df.iloc[i], 'Icon:', "")
        resource["description"] = get_entry(df.iloc[i], 'Description:', "n/a")
        resource["manufacturer"] = get_entry(df.iloc[i], 'Manufacturer:', "")
        resource["platform_links"] = get_platform_links(df.iloc[i])
        resource["ages"] = get_range(df.iloc[i], 'Age Group:')
        resource["skills"] = get_selected_options(df.iloc[i], 'Skills:')
        resource["skill_levels"] = get_selected_options(df.iloc[i], 'Skill Level:')
        resource["payment_options"] = get_selected_options(df.iloc[i], 'Cost:')

        print(f"Finished parsing resource on line {i+2}:")
        print(resource)
        print(f"--------------------------------\n")

        resources.append(resource)

    print("Uploading to MongoDB...")
    upload_to_mongo(resources, ar_col)
    print("Upload success!")

if __name__ == "__main__":
    typer.run(main)