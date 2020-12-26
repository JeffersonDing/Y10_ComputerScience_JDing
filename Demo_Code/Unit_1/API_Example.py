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
print(f"The current time in {location} is {time} {data['abbreviation']}\n")


# Diversity Example

fname = 'Jefferson'
lname = 'Ding' 
url = "https://api.diversitydata.io/?fullname="+fname+"%20"+lname
r = requests.get(url)
data = r.json()
# {'fullname': 'jefferson ding', 'gender': 'male', 'ethnicity': 'asian', 'gender probability': 0.  4 9, 'ethnicity probability': 0.84}

print(f"{data['fullname']} is a {data['gender']} with a probability of {data['gender probability']}. {data['fullname']} is {data['ethnicity']} with a probability of {data['ethnicity probability']} out of 1.0 \n") 

# NASA (API-Key) Example

url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
response = requests.get(url)
# print (response.text)
data = response.json()
print (f"picture of the day: {data['url']}\n{data['title']}.html created")

file =open (f"{data['title']}.html", "w")
file.write("<html><body>")
file.write('<iframe src="' + data['url'] + '" width="100%" height="100%">')
file.write("</body></html>")
file.close()

