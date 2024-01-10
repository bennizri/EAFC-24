from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import requests
from lxml import html
from bs4 import BeautifulSoup
app = Flask(__name__)
CORS(app)

@app.route("/player_data")
def player_data():
    try:
        male_players_data = pd.read_csv("backend/csv/male_players.csv").head(25)
        female_players_data = pd.read_csv("backend/csv/female_players.csv").head(25)
        combined_data = pd.concat([male_players_data, female_players_data], ignore_index=True)
        combined_data_sorted = combined_data.sort_values(by="overall", ascending=False)
        
        return combined_data_sorted.to_json(orient="records")

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/findPlayer/<int:id>")
def one_player_data(id):
    male_players_data = pd.read_csv("backend/csv/male_players.csv")
    female_players_data = pd.read_csv("backend/csv/female_players.csv")
    combined_data = pd.concat([male_players_data, female_players_data], ignore_index=True)
    player_data = combined_data.query(f'player_id == {id}')
    player_dict = player_data.head(1).to_json(orient='records')
    return player_dict
@app.route("/findPlayerByName/<string:name>")
def find_player_by_name(name):
    try:
        male_players_data = pd.read_csv("backend/csv/male_players.csv")
        female_players_data = pd.read_csv("backend/csv/female_players.csv")
        
        combined_data = pd.concat([male_players_data, female_players_data], ignore_index=True)
        
        combined_data = combined_data.drop_duplicates(subset="short_name", keep="first")
        
        player_data = combined_data[combined_data['short_name'].str.contains(name, case=False, na=False) & (combined_data['update_as_of'] =='2023-09-22')]
        
        player_data_sorted = player_data.sort_values(by="overall", ascending=False)
        player_dict = player_data_sorted.head(50).to_json(orient='records')
        return player_dict

    except Exception as e:
        return jsonify({"error": str(e)})
    
@app.route("/findPlayersByRating/<int:rating>/")
def find_players_by_rating(rating):
    try:
        male_players_data = pd.read_csv("backend/csv/male_players.csv")
        female_players_data = pd.read_csv("backend/csv/female_players.csv")
        combined_data = pd.concat([male_players_data, female_players_data], ignore_index=True)
        players_with_rating = combined_data[(combined_data['overall'] == rating)& (combined_data['update_as_of'] == '2023-09-22')]
        unique_players = players_with_rating.drop_duplicates(subset=['player_id'], keep='first')

        player_dict = unique_players.to_json(orient='records')
        return player_dict

    except Exception as e:
        return jsonify({"error": str(e)})
@app.route("/findPlayerByPos/<string:pos>")
def find_player_by_pos(pos):
    try:
        male_players_data = pd.read_csv("backend/csv/male_players.csv")
        female_players_data = pd.read_csv("backend/csv/female_players.csv")
        combined_data = pd.concat([male_players_data, female_players_data], ignore_index=True)
        players_pos = combined_data[(combined_data['player_positions'].str.contains(pos, case=False, na=False)) & (combined_data['update_as_of'] == '2023-09-22')]
        player_data_sorted = players_pos.sort_values(by="overall", ascending=False)
        player_dict = player_data_sorted.head(50).to_json(orient='records')
        return player_dict
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
