from pytubefix import Playlist

def flask_main_door(playlist_url):
    def fetch_playlist_videos_link(playlist_url):
        print(f"Fetching videos from the playlist: {playlist_url}...")
        playlist = Playlist(playlist_url)
        return playlist.video_urls
    def batch_of_playlist_urls(playlist_videos_url):
    #this function will organize the playlist videos into batches of 50 and return them as a list of lists. Right now, it will just return the list of video links.
        batch_number = len(playlist_videos_url)//50
        batch_of_video_links = []
        for i in range(batch_number + 1):
            batch_of_video_links.append([])   
        for index, video_link in enumerate(playlist_videos_url):
            batch_of_video_links[(index//50)].append(video_link)
        return batch_of_video_links
    #def output_playlist_videos_link(batch_of_playlist_urls):
        #for index, video_link in enumerate(batch_of_playlist_urls[0]):
            #print(video_link)
    playlist_videos_url = fetch_playlist_videos_link(playlist_url)
    Total_number_of_videos_in_the_playlist = len(playlist_videos_url)
    batch_of_videos_link = batch_of_playlist_urls(playlist_videos_url)
    Total_number_of_batches = len(batch_of_videos_link)
    #output_playlist_videos_link(batch_of_playlist_urls)
    return (batch_of_videos_link,Total_number_of_videos_in_the_playlist,Total_number_of_batches)

