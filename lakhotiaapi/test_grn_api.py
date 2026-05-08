import requests

def test_grn_api():
    base_url = "http://127.0.0.1:5000/api/grn"
    
    # Test 1: Get batch codes
    try:
        res = requests.get(f"{base_url}/all-batch-codes")
        print(f"Batch codes status: {res.status_code}")
        print(f"Batch codes response: {res.json().get('success')}")
    except Exception as e:
        print(f"Batch codes error: {e}")

    # Test 2: Ready for GRN
    try:
        res = requests.get(f"{base_url}/ready-for-grn")
        print(f"Ready for GRN status: {res.status_code}")
        print(f"Ready for GRN count: {res.json().get('count', 0)}")
    except Exception as e:
        print(f"Ready for GRN error: {e}")

    # Test 3: Get all GRN
    try:
        res = requests.get(f"{base_url}/all")
        print(f"All GRN status: {res.status_code}")
        print(f"All GRN count: {res.json().get('count', 0)}")
    except Exception as e:
        print(f"All GRN error: {e}")

if __name__ == "__main__":
    test_grn_api()
