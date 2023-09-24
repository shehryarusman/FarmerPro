from RegionClassifier import *
import pandas as pd
from statistics import mean
import os


def control(lat, long, commodities):
    file = "Produce_location_prices.csv"
    directory = "backend"
    package = "data"
    filepath = os.path.join(package, file)
    print(filepath)
    df = pd.read_csv(filepath)
    
    region = get_region(lat, long)

    mask = df["region"].isin([region, "National"])
    df = df[mask]

    print(df[["commodity", "region"]])

    mask = df["commodity"].isin(commodities)
    df = df[mask]
    print(df[["commodity", "region", "wtd avg price"]])

    prices = {}
    for commodity in commodities:
        mask = df["commodity"].isin([commodity])
        rows = df[mask]
        print(commodity, rows)
        try:
            prices[commodity] = mean(rows["wtd avg price"])
        except:
            prices[commodity] = -1
    return prices

if __name__ == '__main__':
    answer = control(41.06104324059672, -81.51734366383978, ["Carrots", "orange", "watermelon"])
    print(answer)