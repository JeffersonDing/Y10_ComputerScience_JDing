# World Time API Experiment
import requests
# Sending GET requests via Python requests library
# Specipy the url to send GET request
url = "http://worldtimeapi.org/api/timezone/America/Toronto"
# Initiate the GET request
r = requests.get(url)
# GET request responce status code
status = str(r.status_code)
print("Responce Status Code: "+status)

# Get the request data as JSON
data = r.json()

# Get specific data from JSON responce
location = data['timezone'].split('/')[1]
# 2020-10-19T14:26:15.341793-0  3 4:00
time = data['datetime'].split('T')[1].split('.')[0]
# Print out the final data
print(f"The current time in {location} is {time} {data['abbreviation']}")
