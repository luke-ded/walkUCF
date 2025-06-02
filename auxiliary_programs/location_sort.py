import json


with open("./auxiliary_files/locations.json", "r") as f:
    data = f.read()

f.close()


data = json.loads(data)
data.sort(key=lambda entry: entry['Name'])

i = 1
for entry in data:
    entry['key'] = str(i)
    i += 1


with open("./auxiliary_files/locations.json", "w") as f:
    f.write(json.dumps(data, indent = 2))

f.close()