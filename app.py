from flask import Flask, request, render_template, jsonify
from playlist_notebooklm import flask_main_door

app = Flask(__name__)

@app.route("/")
def home():        
    return render_template("index.html")

@app.route("/get-link", methods=["POST"])
def get_link():
    data = request.json
    playlist_link = data.get("playlist_link")
    print(playlist_link)
    print("https://youtube.com/playlist" not in playlist_link)
    if "https://youtube.com/playlist" in playlist_link:
        warning_text = None
    else:
        warning_text = "Invalid URL! Please Enter a valid URL"
    if warning_text == None:
        batch_of_videos_link,Total_number_of_videos_in_the_playlist,Total_number_of_batches = flask_main_door(playlist_link)
    if warning_text == None:
        return jsonify({
                "batch_of_videos_link": batch_of_videos_link,
                "Total_number_of_videos_in_the_playlist": Total_number_of_videos_in_the_playlist,
                "Total_number_of_batches": Total_number_of_batches,
                "warning": warning_text
            })
    else: 
        return jsonify({
                "warning": warning_text
            })

if __name__ == "__main__":
    app.run(debug=True)