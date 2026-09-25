from flask import Flask, request, render_template
from playlist_notebooklm import flask_main_door

app = Flask(__name__)

@app.route("/", methods=["GET","POST"])
def home():
    if request.method =="POST":
        playlist_link = request.form["playlist-link"]
        print(playlist_link)
        print("https://youtube.com/playlist" not in playlist_link)
        if "https://youtube.com/playlist" in playlist_link:
            warning_text = None
        else:
            warning_text = "Invalid URL! Please Enter a valid URL"
        if warning_text == None:
            batch_of_videos_link,Total_number_of_videos_in_the_playlist,Total_number_of_batches = flask_main_door(playlist_link)
        print(f"Total_number_of_batches: {Total_number_of_batches}")
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)