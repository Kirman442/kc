export const py1 = `point = (52.5170365, 13.3888599)
G = ox.graph_from_point(point, dist=15000, retain_all=True, simplify = True, network_type='all'`;

export const py2 = `
fig, ax = ox.plot_graph(Groads, node_size=0,figsize=(8, 8),
                                dpi = 300,bgcolor = bgcolor,
                                save = True, edge_color=roadColors,
                                edge_linewidth=roadWidths, edge_alpha=1,
                                filepath="data/" + city + ".png", close=True)`;

export const py3 = `
def deg_to_dms(deg, pretty_print = None):
#Convert from decimal degrees to degrees, minutes, seconds.

    m, s = divmod(abs(deg) * 3600, 60)
    d, m = divmod(m, 60)
    if deg < 0:
        d = -d
    d, m = int(d), int(m)

    if pretty_print:
        if pretty_print == 'latitude':
            hemi = 'N' if d >= 0 else 'S'
        elif pretty_print == 'longitude':
            hemi = 'E' if d >= 0 else 'W'
        else:
            hemi = '?'
        return '{d:d}°{m:d}′ {hemi:1s}'.format(d = abs(d), m = m, hemi = hemi)
    return d, m, s

#Take the lat / lon from the place name to convert to dms coordinates
geolocator = Nominatim(user_agent = "degdms")
location = geolocator.geocode(city, language = "en")
                                # Convert lat / lon to dms coordinates
lat = deg_to_dms(location.latitude, pretty_print = 'latitude')
lon = deg_to_dms(location.longitude, pretty_print = 'longitude')
coords = f"{lat} / {lon}"`;

export const py4 = `
#Take the name of the place and country from the geoaddress to write it on the image
firstWord, * middle, lastWord = location.address.split()

fontsize = 240
font = ImageFont.truetype("m:\\projekte\\Fonts\\CaviarDreams.ttf", size=fontsize)
font_dms = ImageFont.truetype("m:\\projekte\\Fonts\\BerlinSmallCaps.ttf", size=int(fontsize/3))
font_countryName = ImageFont.truetype("m:\\projekte\\Fonts\\BerlinSmallCaps.ttf", size=int(fontsize/2))
`;

export const py5 = `

with Image.open("data/" + city + ".png").convert("RGBA") as im_base:

    #Make image with the same size as original to compose them later together
    im_txt = Image.new("RGBA", im_base.size, (255, 255, 255, 0))
    draw_text = ImageDraw.Draw(im_txt)

    picWidth, picHeight = im_txt.size
    # Calculate the size of the inscription relative to the image for correct positioning

    wordLenghtInPixels = draw_text.textlength(city.upper(), font)
    word_dms = draw_text.textlength(coords, font_dms)
    word_country = draw_text.textlength(lastWord, font_countryName)

    # Writing the inscriptions
    draw_text.text((picWidth/2, picHeight /4), city.upper(), fill="#ffffff99", anchor="ms", font=font)
    draw_text.text((picWidth/2, ((picHeight /4) - fontsize + 10)), coords, fill="#ffffff80", anchor="ms", font=font_dms)
    draw_text.text((picWidth/2, ((picHeight /4) + fontsize / 2 + 20)), lastWord, fill="#ffffff80", anchor="ms", font=font_countryName)

    #compose and display the final image
    out = Image.alpha_composite(im_base, im_txt)
    # out.show()
    out.save("city of " + city + ".png" )
`;

export const Fluss1 = `
def normalize_width(upland_skm, min_width=.05, max_width=1.5, max_area=10000):
    # Any river segment with an elevation area >= max_area should have the maximum width
    normalized_width = min_width + \
    (max_width - min_width) * (upland_skm / max_area)
    return min(normalized_width, max_width)
# Apply the normalization function to the UPLAND_SKM field
gdf['line_width'] = gdf['UPLAND_SKM'].apply(normalize_width)
`;

export const Fluss2 = `
gdf = gdf[(gdf['UPLAND_SKM'] >10) & (gdf['ORD_FLOW'] <=5)]
# oder so:
gdf=gdf[(gdf['ORD_STRA'] <5) & (gdf['ORD_CLAS'] <=5)]
`;

export const Fluss3 = `
# Assign a color to each unique MAIN_RIV
unique_rivers = gdf['MAIN_RIV'].unique()
cmap = colormaps['Set2'] # You can choose a different colormap
colors = {river: cmap(i / len(unique_rivers))
for i, river in enumerate(unique_rivers)}

# Create a new column 'color' and set the colors based on MAIN_RIV
gdf['color'] = gdf['MAIN_RIV'].map(colors)
`;

export const Fluss4 = `
# Plot the rivers with different colors and line widths
fig, ax = plt.subplots(figsize=(15, 15), facecolor='none')
gdf.plot(ax=ax, color=gdf['color'], linewidth=gdf['line_width'], alpha=1)
`;

export const Cluster1 = `
{
"type": "Feature",
"properties": { "operator": "Vodafone", "city_name": "Hamburg", "deployment_type": "5G NR",
"status": "Commercial Availability" },
"geometry": { "type": "Point", "coordinates": [ 9.99368, 53.55108 ]
}
`;

export const Cluster2 = `
import geopandas as gpd
import json
import osmnx as ox
from arcgis.gis import GIS
from arcgis.features import FeatureLayerCollection

inputgeojson = r"m:\projekte\Ookla-5G\xc1301023_ookla_5g.geojson'
iputcsv = r'm:\projekte\Ookla-5G\DeutsclandStaedteListe.csv'
country_name = {'country': 'Germany'}

# Read the CSV file and create a dictionary mapping city names to land types
city_land_types = {}
with open(iputcsv, 'r', encoding='utf-8') as f:
    for line in f:
        res = (line.strip().split(','))
        city, land_type = res[0], res[-1].replace("(", "").replace(")", "")
        city_land_types[city] = land_type

# Load the GeoJSON file into a GeoDataFrame
with open(inputgeojson, 'r', encoding='utf-8') as f:
    geojson_data = json.load(f)

# Iterate through the features and add the land_type field
    for feature in geojson_data['features']:
        city_name = feature['properties']['city_name']
        if city_name in city_land_types:
            feature['properties']['land_type'] = city_land_types[city_name]
        else:
            feature['properties']['land_type'] = 'Unknown'

# Filter features based on city names
filtered_features = [feature for feature in geojson_data['features'] if feature['properties']['city_name'] in
city_land_types]

# Create a GeoDataFrame from the filtered features and set crs
filtered_gdf = gpd.GeoDataFrame.from_features(filtered_features).set_crs(epsg=4326, inplace=True)
`;

export const Cluster3 = `
{
"type": "Feature",
"properties": { "operator": "Vodafone", "city_name": "Hamburg", "deployment_type": "5G NR",
"status": "Commercial Availability", "land_type": "HH" },
"geometry": { "type": "Point", "coordinates": [ 9.99368, 53.55108 ]
}
`;

export const Cluster4 = `
# Get place boundary related to the place name as a geodataframe
multi_polygon_gdf = ox.geocode_to_gdf (country_name)

# make spatial join
points_in_polygons = gpd.sjoin(filtered_gdf, multi_polygon_gdf, how="inner", predicate='within')

# Delete index_right column after spatial join
if 'index_right' in points_in_polygons:
    points_in_polygons.drop(columns=['index_right'], inplace=True)

# convert gdf to json string
geojson_points_in_polygons = points_in_polygons.to_json()
`;

export const Cluster5 = `
portal = GIS("https://you_portal_address.maps.arcgis.com/", username="****", password="****")

item_properties = {
'type': 'GeoJson',
'title': 'Ookla GeoJSON 5G net',
'typeKeywords': ['Ookla', '5G', 'Mobile Netz', 'GeoJSON', '5G Tower'],
'description':'Ookla 5G Map Germany',
'tags': ['Ookla', '5G', 'Mobile Netz', 'GeoJSON', '5G Tower']
}

user = portal.users.search(query="username:****")
item_title = item_properties['title']
item_type = item_properties['type']

feature_item = portal.content.search(query = item_title)
`;

export const Cluster6 = `
if feature_item:
    content_item = user[0].items()
    # Getting the layers Id
    matching_numbers = [item.itemid for item in content_item if item.title == item_title and item.type == item_type]

    # We get the required layer, update and publish it.
    #Then we print its data for information.

    hosted_layer = portal.content.get(matching_numbers[0])
    hosted_layer.update(item_properties, geojson_points_in_polygons)
    hosted_layer.publish(overwrite = True, file_type='geojson')
    print(f"Item id : {hosted_layer.id}, Item type: {hosted_layer.type}.")
    print('layer updated')
else:
    # If no layer found, we simply publish a new one
    item = portal.content.add(item_properties, geojson_points_in_polygons)
    item.publish(overwrite = True, file_type='geojson')
    print(f"Item id : {hosted_layer.id}, Item type: {hosted_layer.type}.")
    print('layer added')

print('All jobs done')
`;

export const js1 = `
const layers = useMemo(() => {
        if (allData.length === 0 || allData[0].length === 0) return [];
        const commonProps = {
            data: allData[0],
            getPosition: (_, { index, data, target }) => {
                target[0] = data.src[index * 6];
                target[1] = data.src[index * 6 + 1];
                return target;
            },... the rest of the code
`;

export const js2 = `
getFillColor: (_, { index, data, target }) => {
                    target[0] = data.src[index * 6 + 3];
                    return activeColorScaleFunction(target * 5);
                },... the rest of the code
`;
