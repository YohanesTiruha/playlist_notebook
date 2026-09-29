# YouTube Playlist to NotebookLM Links

A small Flask web app that turns a YouTube playlist into video URLs grouped into batches of up to 50, ready to add to Gemini Notebook(NotebookLM). Each batch can be copied to the clipboard from the results page.

## Run locally

Requires Python 3. Install the dependencies and start the Flask app:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```

Open [http://127.0.0.1:5000](http://127.0.0.1:5000), paste a YouTube playlist URL, and submit it. Select a batch to copy its links.

## Project files

- `app.py` — Flask routes and playlist request handling.
- `playlist_notebooklm.py` — fetches playlist video URLs and splits them into batches.
- `templates/` and `static/` — the web page, styling, scripts, fonts, and favicon assets.

Dependencies are listed in `requirements.txt`.
