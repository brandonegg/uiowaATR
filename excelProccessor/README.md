# Importing Data

The purpose of the import script is to take the formatted excel sheet (found in /data/atr_data.xlsx) and upload it to the remote mongoDB server.

# Tutorial
This script is currently in early stages and was initially designed to simplify uploading the assets until a more permanent web UI could be built for the task. Therefore this utility is very low-level and likely requires some tinkering outside its intended use case.

## Setup
1. Open import/main.py
2. Configure the two globals:
```python
MONGO_URL = "enter mongo DB URL"
MONGO_DB = "name of DB"
```
3. Make sure dependencies are intalled with `poetry install`

## Run
The script takes one parameter which is simply the path of your excel sheet.
```sh
poetry run python import/main.py $PATH
```
For example; if uploading the data provided in this repository you can run the following:
```sh
poetry run python import/main.py ../data/atr_data.xlsx
```
You should see output showing the individual objects it extracted from your excel sheet along with a success message at the end.

# Expected Data Format
See {project_root}/data/atr_data.xlsx