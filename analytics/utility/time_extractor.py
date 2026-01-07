import argparse
import re
import datetime


def get_post_id(url):
    regex = r"activity-([0-9]+)"
    match = re.search(regex, url)
    if match:
        return match.group(1)
    return None


def extract_unix_timestamp(post_id):
    as_binary = format(int(post_id), "064b")
    first42_chars = as_binary[:42]
    timestamp = int(first42_chars, 2)
    return timestamp


def unix_timestamp_to_human_date(timestamp):
    date_object = datetime.datetime.utcfromtimestamp(timestamp / 1000)
    human_date_format = date_object.strftime("%a, %d %b %Y %H:%M:%S (UTC)")
    return human_date_format


def get_date(url):
    post_id = get_post_id(url)
    if post_id:
        unix_timestamp = extract_unix_timestamp(post_id)
        human_date_format = unix_timestamp_to_human_date(unix_timestamp)
        return human_date_format
    return None


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract the date from a LinkedIn post URL.")
    parser.add_argument("url", help="LinkedIn post URL")  # <-- Fixed argument
    args = parser.parse_args()

    date = get_date(args.url)
    if date:
        print(f"Date: {date}")
    else:
        print("No valid post ID found in the provided URL.")
