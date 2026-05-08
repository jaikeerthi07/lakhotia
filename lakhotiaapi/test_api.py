import requests

def test_login():
    url = "http://127.0.0.1:5000/api/auth/login"
    payload = {
        "email": "test@example.com",
        "password": "password"
    }
    try:
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        if response.status_code == 200 and response.json().get("success"):
            print("Login API test PASSED")
        else:
            print("Login API test FAILED")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_login()
